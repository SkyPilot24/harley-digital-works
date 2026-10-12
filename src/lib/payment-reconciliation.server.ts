import Stripe from "stripe";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { PaymentAdverseEvent } from "./payment-receipts.server";

type Charge = Pick<
  Stripe.Charge,
  "id" | "object" | "livemode" | "currency" | "amount" | "amount_refunded" | "payment_intent"
>;
type Dispute = Pick<
  Stripe.Dispute,
  "id" | "object" | "livemode" | "currency" | "amount" | "status" | "payment_intent" | "charge"
>;
export interface PaymentProviderReader {
  charge(id: string): Promise<Charge>;
  dispute(id: string): Promise<Dispute>;
}

const storedEvent = z.object({
  event_id: z.string().regex(/^evt_/),
  payment_intent_id: z.string().regex(/^pi_/).nullable(),
  provider_object_id: z.string(),
  kind: z.enum(["refund", "dispute"]),
  status: z.string(),
  amount_pence: z.number().int().positive().safe(),
  currency: z.literal("gbp"),
  livemode: z.boolean(),
  provider_created: z.number().int().positive().safe(),
});

// Server-only orchestration: snapshot the event generation BEFORE provider reads.
// A new signed event invalidates the commit; the caller must start a fresh read.
export async function persistPaymentReconciliation(
  db: Pick<SupabaseClient, "from" | "rpc">,
  eventId: string,
  reader: PaymentProviderReader,
  requestId: string,
) {
  const { data, error } = await db
    .from("payment_adverse_events")
    .select("*")
    .eq("event_id", eventId)
    .single();
  if (error) throw new Error("Stored financial event unavailable");
  const source = storedEvent.parse(data);
  const { count, error: countError } = await db
    .from("payment_adverse_events")
    .select("event_id", { count: "exact", head: true })
    .eq("livemode", source.livemode)
    .eq("provider_object_id", source.provider_object_id);
  if (countError || !count) throw new Error("Financial event snapshot unavailable");
  const observation = await reconcilePaymentObject(
    {
      eventId: source.event_id,
      paymentIntentId: source.payment_intent_id,
      providerObjectId: source.provider_object_id,
      kind: source.kind,
      status: source.status,
      amountPence: source.amount_pence,
      currency: source.currency,
      livemode: source.livemode,
      created: source.provider_created,
    },
    reader,
  );
  const result = await db.rpc("record_payment_reconciliation", {
    p_id: requestId,
    p_event_id: eventId,
    p_expected_count: count,
    p_charge_id: observation.chargeId,
    p_intent: observation.paymentIntentId,
    p_status: observation.status,
    p_amount: observation.amountPence,
    p_refunded: observation.refundedPence,
    p_blocked: observation.blocked,
  });
  if (result.error || !["recorded", "duplicate"].includes(result.data))
    throw new Error("Reconciliation commit rejected; refresh provider evidence");
  return result.data as "recorded" | "duplicate";
}

export function createPaymentProviderReader(
  secret: string,
  expectedAccount: string,
  livemode: boolean,
): PaymentProviderReader {
  const prefix = livemode ? /^(sk|rk)_live_/ : /^(sk|rk)_test_/;
  if (!prefix.test(secret) || !/^acct_[A-Za-z0-9]+$/.test(expectedAccount))
    throw new Error("Reconciliation configuration does not match environment");
  const stripe = new Stripe(secret, { maxNetworkRetries: 1, timeout: 10000 });
  let verified: Promise<void> | undefined;
  const verifyAccount = () =>
    (verified ??= (async () => {
      try {
        if ((await stripe.accounts.retrieveCurrent()).id !== expectedAccount)
          throw new Error("Account mismatch");
      } catch {
        throw new Error("Provider account could not be verified");
      }
    })());
  return {
    async charge(id) {
      await verifyAccount();
      try {
        return await stripe.charges.retrieve(id);
      } catch {
        throw new Error("Provider charge lookup unavailable");
      }
    },
    async dispute(id) {
      await verifyAccount();
      try {
        return await stripe.disputes.retrieve(id);
      } catch {
        throw new Error("Provider dispute lookup unavailable");
      }
    },
  };
}

function intent(value: Charge["payment_intent"]): string | null {
  if (value === null) return null;
  if (typeof value !== "string" || !/^pi_[A-Za-z0-9_]+$/.test(value))
    throw new Error("Provider payment identity unavailable");
  return value;
}
const positive = (value: number) => Number.isSafeInteger(value) && value > 0;
const disputeStatuses = new Set([
  "warning_needs_response",
  "warning_under_review",
  "warning_closed",
  "needs_response",
  "under_review",
  "won",
  "lost",
  "prevented",
]);

// Input must be the immutable stored signed event, not browser-supplied evidence.
// This returns an observation; saving it or clearing a hold is a separate transaction.
export async function reconcilePaymentObject(
  source: PaymentAdverseEvent,
  reader: PaymentProviderReader,
) {
  if (source.currency !== "gbp" || !positive(source.amountPence))
    throw new Error("Unsupported source event");
  let dispute: Dispute | undefined;
  let chargeId: string;
  if (source.kind === "refund") {
    if (!/^ch_[A-Za-z0-9_]+$/.test(source.providerObjectId))
      throw new Error("Invalid charge reference");
    chargeId = source.providerObjectId;
  } else {
    if (!/^(du|dp)_[A-Za-z0-9_]+$/.test(source.providerObjectId))
      throw new Error("Invalid dispute reference");
    dispute = await reader.dispute(source.providerObjectId);
    if (
      dispute.object !== "dispute" ||
      dispute.id !== source.providerObjectId ||
      dispute.livemode !== source.livemode ||
      dispute.currency !== source.currency ||
      !positive(dispute.amount) ||
      !disputeStatuses.has(dispute.status) ||
      typeof dispute.charge !== "string" ||
      !/^ch_[A-Za-z0-9_]+$/.test(dispute.charge)
    )
      throw new Error("Provider dispute does not match stored event");
    chargeId = dispute.charge;
  }
  const charge = await reader.charge(chargeId);
  if (
    charge.object !== "charge" ||
    charge.id !== chargeId ||
    charge.livemode !== source.livemode ||
    charge.currency !== source.currency ||
    !positive(charge.amount) ||
    !Number.isSafeInteger(charge.amount_refunded) ||
    charge.amount_refunded < 0 ||
    charge.amount_refunded > charge.amount ||
    (source.kind === "refund" && charge.amount_refunded < source.amountPence)
  )
    throw new Error("Provider charge does not match stored event");
  const paymentIntentId = intent(charge.payment_intent);
  if (
    (source.paymentIntentId !== null && source.paymentIntentId !== paymentIntentId) ||
    (dispute &&
      dispute.payment_intent !== null &&
      intent(dispute.payment_intent) !== paymentIntentId)
  )
    throw new Error("Provider payment identity mismatch");
  const status = dispute?.status ?? "refunded";
  return {
    eventId: source.eventId,
    providerObjectId: source.providerObjectId,
    chargeId,
    paymentIntentId,
    livemode: source.livemode,
    currency: charge.currency,
    status,
    amountPence: dispute?.amount ?? charge.amount_refunded,
    refundedPence: charge.amount_refunded,
    blocked:
      charge.amount_refunded > 0 ||
      (dispute !== undefined && !["won", "prevented", "warning_closed"].includes(status)),
    disposition:
      paymentIntentId === null ? ("legacy_charge" as const) : ("payment_intent" as const),
  };
}
