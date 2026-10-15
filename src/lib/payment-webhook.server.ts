import type { PaymentReceiptStore } from "./payment-receipts.server";
import { receivePaymentEvent } from "./payment-receipts.server.ts";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function configuredPaymentWebhook(request: Request): Promise<Response> {
  return paymentWebhook(request, {
    enabled: process.env.STRIPE_WEBHOOK_ENABLED === "true",
    signingSecret: process.env.STRIPE_WEBHOOK_SECRET,
    mode: process.env.STRIPE_WEBHOOK_MODE,
    store: async () => {
      const { supabaseAdmin } = await import("../integrations/supabase/client.server.ts");
      const { paymentReceiptStore } = await import("./payment-store.server.ts");
      // Migration is generated/applied independently; the generated legacy DB types lack it.
      return paymentReceiptStore(supabaseAdmin as unknown as SupabaseClient);
    },
  });
}

// No payment receiver is active until its environment is explicitly configured.
export async function paymentWebhook(
  request: Request,
  options: {
    enabled: boolean;
    signingSecret?: string;
    mode?: string;
    store: () => Promise<PaymentReceiptStore>;
  },
): Promise<Response> {
  const respond = (status: number, result: string) =>
    Response.json({ result }, { status, headers: { "Cache-Control": "no-store" } });
  if (request.method !== "POST") return respond(405, "method_not_allowed");
  if (!options.enabled || !options.signingSecret || !["test", "live"].includes(options.mode ?? ""))
    return respond(503, "unconfigured");
  if (!request.headers.get("Stripe-Signature")) return respond(400, "invalid_request");
  // Enforce the byte bound while reading, including chunked requests without a length header.
  const reader = request.body?.getReader();
  if (!reader) return respond(400, "invalid_request");
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 262144) {
        await reader.cancel();
        return respond(413, "payload_too_large");
      }
      chunks.push(value);
    }
  } catch {
    return respond(400, "invalid_request");
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  let rawBody: string;
  try {
    rawBody = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return respond(400, "invalid_request");
  }
  // Defer database configuration/access until signature validation has succeeded.
  const lazyStore: PaymentReceiptStore = {
    contractForSession: async (id) => (await options.store()).contractForSession(id),
    recordPaid: async (receipt) => (await options.store()).recordPaid(receipt),
    recordAdverse: async (event) => (await options.store()).recordAdverse(event),
  };
  const outcome = await receivePaymentEvent({
    rawBody,
    signature: request.headers.get("Stripe-Signature"),
    signingSecret: options.signingSecret,
    livemode: options.mode === "live",
    store: lazyStore,
  });
  return respond(outcome.status, outcome.result);
}
