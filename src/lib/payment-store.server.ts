import type { SupabaseClient } from "@supabase/supabase-js";
import type { PaymentReceiptStore } from "./payment-receipts.server";

export function paymentReceiptStore(db: Pick<SupabaseClient, "from" | "rpc">): PaymentReceiptStore {
  return {
    async recordAdverse(event) {
      const { data, error } = await db.rpc("record_payment_adverse_event", {
        p_event_id: event.eventId,
        p_payment_intent_id: event.paymentIntentId,
        p_provider_object_id: event.providerObjectId,
        p_kind: event.kind,
        p_status: event.status,
        p_amount_pence: event.amountPence,
        p_currency: event.currency,
        p_livemode: event.livemode,
        p_created: event.created,
      });
      if (error || (data !== "recorded" && data !== "duplicate"))
        throw new Error("Payment exception persistence failed");
      return data;
    },
    async contractForSession(sessionId) {
      const { data, error } = await db
        .from("payment_contracts")
        .select("session_id,reference,amount_pence,currency,livemode")
        .eq("session_id", sessionId)
        .maybeSingle();
      if (error) throw new Error("Payment contract retrieval failed");
      if (!data) return null;
      if (
        typeof data.session_id !== "string" ||
        typeof data.reference !== "string" ||
        !Number.isSafeInteger(data.amount_pence) ||
        data.amount_pence <= 0 ||
        data.currency !== "gbp" ||
        typeof data.livemode !== "boolean"
      )
        throw new Error("Invalid stored payment contract");
      return {
        sessionId: data.session_id,
        reference: data.reference,
        amountPence: data.amount_pence,
        currency: data.currency,
        livemode: data.livemode,
      };
    },
    async recordPaid(receipt) {
      const { data, error } = await db.rpc("record_payment_receipt", {
        p_session_id: receipt.sessionId,
        p_reference: receipt.reference,
        p_amount_pence: receipt.amountPence,
        p_currency: receipt.currency,
        p_livemode: receipt.livemode,
        p_event_id: receipt.eventId,
        p_payment_intent_id: receipt.paymentIntentId,
      });
      if (error || (data !== "recorded" && data !== "duplicate"))
        throw new Error("Payment receipt persistence failed");
      return data;
    },
  };
}
