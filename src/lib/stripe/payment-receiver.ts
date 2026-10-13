/**
 * Stripe Payment Event Receiver & Deposit Receipt Processor
 * Validates incoming webhook events, prevents duplicates/replays,
 * and records exactly one immutable deposit receipt for H50 milestone.
 */

import { verifyStripeSignature } from "./verify.ts";
import type {
  StripeEvent,
  StripeCheckoutSession,
  StripePaymentIntent,
  DepositReceipt,
  ReceiptStorage,
} from "./types.ts";

export const EXPECTED_DEPOSIT_PENCE = 74750; // £747.50 (50% of £1,495 Managed Launch)
export const EXPECTED_CURRENCY = "gbp";

export interface ProcessEventResult {
  status: "success" | "duplicate" | "rejected";
  receipt?: DepositReceipt;
  reason?: string;
  statusCode: number;
}

/**
 * Validates and processes a raw incoming Stripe webhook request
 */
export async function processStripeWebhook(options: {
  rawBody: string;
  signatureHeader: string | null;
  webhookSecret: string;
  storage: ReceiptStorage;
  allowedLivemode?: boolean; // Default false (sandbox protection)
  nowInSeconds?: number;
}): Promise<ProcessEventResult> {
  const {
    rawBody,
    signatureHeader,
    webhookSecret,
    storage,
    allowedLivemode = false,
    nowInSeconds,
  } = options;

  // 1. Signature Verification
  const verification = await verifyStripeSignature({
    webhookSecret,
    signatureHeader,
    rawBody,
    nowInSeconds,
  });

  if (!verification.valid) {
    return {
      status: "rejected",
      reason: verification.reason || "Invalid signature",
      statusCode: 401,
    };
  }

  // 2. JSON Parse
  let event: StripeEvent;
  try {
    event = JSON.parse(rawBody) as StripeEvent;
  } catch {
    return {
      status: "rejected",
      reason: "Malformed JSON payload",
      statusCode: 400,
    };
  }

  // 3. Environment / Livemode Guard
  if (event.livemode !== allowedLivemode) {
    return {
      status: "rejected",
      reason: `Livemode mismatch: expected ${allowedLivemode}, received ${event.livemode}`,
      statusCode: 400,
    };
  }

  // 4. Idempotency Check: Event ID already processed?
  const existingByEvent = await storage.findReceiptByEventId(event.id);
  if (existingByEvent) {
    return {
      status: "duplicate",
      receipt: existingByEvent,
      reason: "Event has already been recorded",
      statusCode: 200,
    };
  }

  // 5. Route by Event Type
  if (event.type === "checkout.session.completed") {
    return handleCheckoutSessionCompleted(event as StripeEvent<StripeCheckoutSession>, storage);
  }

  if (event.type === "payment_intent.succeeded") {
    return handlePaymentIntentSucceeded(event as StripeEvent<StripePaymentIntent>, storage);
  }

  // Ignored / Unhandled event type
  return {
    status: "rejected",
    reason: `Unhandled event type: ${event.type}`,
    statusCode: 200,
  };
}

async function handleCheckoutSessionCompleted(
  event: StripeEvent<StripeCheckoutSession>,
  storage: ReceiptStorage,
): Promise<ProcessEventResult> {
  const session = event.data.object;

  // Verify payment status
  if (session.payment_status !== "paid" || session.status !== "complete") {
    return {
      status: "rejected",
      reason: `Payment not completed (payment_status=${session.payment_status}, status=${session.status})`,
      statusCode: 400,
    };
  }

  // Verify currency
  if ((session.currency || "").toLowerCase() !== EXPECTED_CURRENCY) {
    return {
      status: "rejected",
      reason: `Currency mismatch: expected ${EXPECTED_CURRENCY}, received ${session.currency}`,
      statusCode: 400,
    };
  }

  // Verify amount
  if (session.amount_total !== EXPECTED_DEPOSIT_PENCE) {
    return {
      status: "rejected",
      reason: `Amount mismatch: expected ${EXPECTED_DEPOSIT_PENCE}p (£747.50), received ${session.amount_total}p`,
      statusCode: 400,
    };
  }

  // Client reference resolution
  const clientRef =
    session.client_reference_id || session.metadata?.client_id || session.metadata?.rehearsal_id;

  if (!clientRef) {
    return {
      status: "rejected",
      reason: "Missing client reference ID in checkout session",
      statusCode: 400,
    };
  }

  const paymentIntentId = (session.payment_intent as string) || `pi_from_${session.id}`;

  // Idempotency Check by Payment Intent ID
  const existingByPi = await storage.findReceiptByPaymentIntent(paymentIntentId);
  if (existingByPi) {
    return {
      status: "duplicate",
      receipt: existingByPi,
      reason: "Payment intent has already been recorded",
      statusCode: 200,
    };
  }

  // Create immutable receipt
  const receipt: DepositReceipt = {
    id: `rcpt_${event.id.slice(4)}`,
    stripe_event_id: event.id,
    stripe_checkout_id: session.id,
    stripe_payment_intent_id: paymentIntentId,
    client_reference_id: clientRef,
    amount_pence: session.amount_total,
    currency: "gbp",
    milestone: "deposit",
    livemode: session.livemode,
    status: "recorded",
    received_at: new Date(event.created * 1000).toISOString(),
  };

  try {
    const saved = await storage.saveReceipt(receipt);
    await storage.markClientDepositPaid(clientRef, saved.id);

    return {
      status: "success",
      receipt: saved,
      statusCode: 200,
    };
  } catch (err) {
    return {
      status: "rejected",
      reason: `Receipt persistence error: ${err instanceof Error ? err.message : String(err)}`,
      statusCode: 500,
    };
  }
}

async function handlePaymentIntentSucceeded(
  event: StripeEvent<StripePaymentIntent>,
  storage: ReceiptStorage,
): Promise<ProcessEventResult> {
  const pi = event.data.object;

  if (pi.status !== "succeeded") {
    return {
      status: "rejected",
      reason: `Payment intent status is not succeeded (status=${pi.status})`,
      statusCode: 400,
    };
  }

  if ((pi.currency || "").toLowerCase() !== EXPECTED_CURRENCY) {
    return {
      status: "rejected",
      reason: `Currency mismatch: expected ${EXPECTED_CURRENCY}, received ${pi.currency}`,
      statusCode: 400,
    };
  }

  if (pi.amount_received !== EXPECTED_DEPOSIT_PENCE) {
    return {
      status: "rejected",
      reason: `Amount mismatch: expected ${EXPECTED_DEPOSIT_PENCE}p, received ${pi.amount_received}p`,
      statusCode: 400,
    };
  }

  const clientRef = pi.metadata?.client_id || pi.metadata?.rehearsal_id;
  if (!clientRef) {
    return {
      status: "rejected",
      reason: "Missing client reference in payment intent metadata",
      statusCode: 400,
    };
  }

  const existingByPi = await storage.findReceiptByPaymentIntent(pi.id);
  if (existingByPi) {
    return {
      status: "duplicate",
      receipt: existingByPi,
      reason: "Payment intent has already been recorded",
      statusCode: 200,
    };
  }

  const receipt: DepositReceipt = {
    id: `rcpt_${event.id.slice(4)}`,
    stripe_event_id: event.id,
    stripe_payment_intent_id: pi.id,
    client_reference_id: clientRef,
    amount_pence: pi.amount_received,
    currency: "gbp",
    milestone: "deposit",
    livemode: pi.livemode,
    status: "recorded",
    received_at: new Date(event.created * 1000).toISOString(),
  };

  try {
    const saved = await storage.saveReceipt(receipt);
    await storage.markClientDepositPaid(clientRef, saved.id);

    return {
      status: "success",
      receipt: saved,
      statusCode: 200,
    };
  } catch (err) {
    return {
      status: "rejected",
      reason: `Receipt persistence error: ${err instanceof Error ? err.message : String(err)}`,
      statusCode: 500,
    };
  }
}
