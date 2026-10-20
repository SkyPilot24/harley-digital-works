/**
 * Stripe Webhook HTTP Server Handler
 * Handles POST requests to /api/stripe/webhook and /api/webhooks/stripe
 */

import { processStripeWebhook } from "./payment-receiver.ts";
import type { ReceiptStorage } from "./types.ts";

export async function handleStripeIncomingRequest(
  request: Request,
  path: string,
  storage?: ReceiptStorage,
): Promise<Response | null> {
  if (path !== "/api/stripe/webhook" && path !== "/api/webhooks/stripe") {
    return null;
  }

  // Production aliases use the existing durable, contract-bound receiver.
  // Explicit storage injection retains the isolated legacy test harness only.
  if (!storage) {
    const { configuredPaymentWebhook } = await import("../payment-webhook.server.ts");
    return configuredPaymentWebhook(request);
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  const rawBody = await request.text();
  const signatureHeader =
    request.headers.get("stripe-signature") || request.headers.get("Stripe-Signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  if (!webhookSecret) {
    console.warn("[Stripe Webhook] Received request but STRIPE_WEBHOOK_SECRET is not configured.");
    return new Response(JSON.stringify({ error: "Webhook secret unconfigured" }), {
      status: 503,
      headers: { "content-type": "application/json" },
    });
  }

  const result = await processStripeWebhook({
    rawBody,
    signatureHeader,
    webhookSecret,
    storage,
    allowedLivemode: process.env.STRIPE_LIVEMODE === "true",
  });

  return new Response(
    JSON.stringify({
      status: result.status,
      receipt: result.receipt,
      reason: result.reason,
    }),
    {
      status: result.statusCode,
      headers: { "content-type": "application/json" },
    },
  );
}
