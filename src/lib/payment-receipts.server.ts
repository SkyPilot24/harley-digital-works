import Stripe from "stripe";

export type PaymentContract = {
  sessionId: string;
  reference: string;
  amountPence: number;
  currency: string;
  livemode: boolean;
};

export type PaymentReceipt = PaymentContract & {
  eventId: string;
  paymentIntentId: string;
};

export type PaymentAdverseEvent = {
  eventId: string;
  paymentIntentId: string | null;
  providerObjectId: string;
  kind: "refund" | "dispute";
  status: string;
  amountPence: number;
  currency: string;
  livemode: boolean;
  created: number;
};

export interface PaymentReceiptStore {
  contractForSession(sessionId: string): Promise<PaymentContract | null>;
  // Must atomically persist the receipt and payment state with unique session/payment IDs.
  // A failed transaction must leave no processed marker; concurrent retries converge.
  recordPaid(receipt: PaymentReceipt): Promise<"recorded" | "duplicate">;
  recordAdverse(event: PaymentAdverseEvent): Promise<"recorded" | "duplicate">;
}

export async function receivePaymentEvent(options: {
  rawBody: string;
  signature: string | null;
  signingSecret: string | undefined;
  livemode: boolean;
  store: PaymentReceiptStore;
}): Promise<{ status: number; result: string }> {
  if (!options.signingSecret) return { status: 503, result: "unconfigured" };
  if (!options.signature || options.rawBody.length > 262144)
    return { status: 400, result: "invalid_request" };

  let event: Stripe.Event;
  try {
    event = await Stripe.webhooks.constructEventAsync(
      options.rawBody,
      options.signature,
      options.signingSecret,
      300,
      Stripe.createSubtleCryptoProvider(),
    );
  } catch {
    return { status: 400, result: "invalid_signature" };
  }

  if (event.livemode !== options.livemode || event.account)
    return { status: 400, result: "wrong_environment" };
  if (
    [
      "charge.refunded",
      "charge.dispute.created",
      "charge.dispute.updated",
      "charge.dispute.closed",
    ].includes(event.type)
  ) {
    const object = event.data.object as Stripe.Charge | Stripe.Dispute;
    const refund = event.type === "charge.refunded";
    const amount = refund ? (object as Stripe.Charge).amount_refunded : object.amount;
    const status = refund ? "refunded" : (object as Stripe.Dispute).status;
    const validStatuses = [
      "warning_needs_response",
      "warning_under_review",
      "warning_closed",
      "needs_response",
      "under_review",
      "won",
      "lost",
      "prevented",
    ];
    if (
      object.livemode !== options.livemode ||
      object.currency !== "gbp" ||
      !Number.isSafeInteger(amount) ||
      amount <= 0 ||
      !Number.isSafeInteger(event.created) ||
      event.created <= 0 ||
      (refund
        ? object.object !== "charge"
        : object.object !== "dispute" || !validStatuses.includes(status)) ||
      (object.payment_intent !== null &&
        (typeof object.payment_intent !== "string" || !object.payment_intent.startsWith("pi_")))
    )
      return { status: 400, result: "invalid_payment" };
    try {
      const result = await options.store.recordAdverse({
        eventId: event.id,
        paymentIntentId: object.payment_intent as string | null,
        providerObjectId: object.id,
        kind: refund ? "refund" : "dispute",
        status,
        amountPence: amount,
        currency: object.currency,
        livemode: object.livemode,
        created: event.created,
      });
      return { status: 200, result };
    } catch {
      return { status: 503, result: "storage_unavailable" };
    }
  }
  if (
    event.type !== "checkout.session.completed" &&
    event.type !== "checkout.session.async_payment_succeeded"
  )
    return { status: 200, result: "ignored" };

  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status !== "paid") return { status: 200, result: "unpaid" };
  // Subscription invoices have a separate lifecycle; never treat them as one-off deposits.
  if (session.mode !== "payment") return { status: 200, result: "ignored" };
  if (
    session.livemode !== options.livemode ||
    typeof session.payment_intent !== "string" ||
    !session.payment_intent.startsWith("pi_") ||
    !Number.isSafeInteger(session.amount_total) ||
    (session.amount_total ?? 0) <= 0
  )
    return { status: 400, result: "invalid_payment" };

  try {
    const contract = await options.store.contractForSession(session.id);
    // Provider metadata is a reference, not authority to choose a customer or price.
    if (!contract) return { status: 409, result: "unknown_contract" };
    if (
      contract.sessionId !== session.id ||
      contract.reference !== session.client_reference_id ||
      contract.amountPence !== session.amount_total ||
      contract.currency !== session.currency ||
      contract.livemode !== session.livemode
    )
      return { status: 409, result: "payment_mismatch" };

    const result = await options.store.recordPaid({
      ...contract,
      eventId: event.id,
      paymentIntentId: session.payment_intent,
    });
    return { status: 200, result };
  } catch {
    // Retry safely; never acknowledge a durable receipt that failed to persist.
    return { status: 503, result: "storage_unavailable" };
  }
}
