/**
 * Stripe Webhook and Payment Receipt Types
 * Represents payment events, deposit receipts, and milestone verification.
 */

export interface StripeEvent<T = unknown> {
  id: string;
  object: "event";
  api_version?: string;
  created: number;
  data: {
    object: T;
  };
  livemode: boolean;
  type: string;
  account?: string;
}

export interface StripeCheckoutSession {
  id: string;
  object: "checkout.session";
  amount_total: number;
  currency: string;
  customer?: string | null;
  client_reference_id?: string | null;
  payment_status: "paid" | "unpaid" | "no_payment_required";
  status: "complete" | "open" | "expired";
  payment_intent?: string | null;
  metadata?: Record<string, string>;
  livemode: boolean;
}

export interface StripePaymentIntent {
  id: string;
  object: "payment_intent";
  amount: number;
  amount_received: number;
  currency: string;
  customer?: string | null;
  status:
    | "succeeded"
    | "processing"
    | "requires_payment_method"
    | "requires_confirmation"
    | "requires_action"
    | "canceled";
  metadata?: Record<string, string>;
  livemode: boolean;
  latest_charge?: string | null;
}

export interface DepositReceipt {
  id: string;
  stripe_event_id: string;
  stripe_checkout_id?: string | null;
  stripe_payment_intent_id: string;
  client_reference_id: string;
  amount_pence: number;
  currency: "gbp";
  milestone: "deposit";
  livemode: boolean;
  status: "recorded";
  received_at: string;
}

export interface ReceiptStorage {
  findReceiptByEventId: (eventId: string) => Promise<DepositReceipt | null>;
  findReceiptByPaymentIntent: (paymentIntentId: string) => Promise<DepositReceipt | null>;
  saveReceipt: (receipt: DepositReceipt) => Promise<DepositReceipt>;
  markClientDepositPaid: (clientReferenceId: string, receiptId: string) => Promise<boolean>;
}
