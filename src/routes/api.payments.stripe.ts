import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/payments/stripe")({
  server: {
    handlers: {
      GET: () => new Response(null, { status: 405, headers: { Allow: "POST" } }),
      HEAD: () => new Response(null, { status: 405, headers: { Allow: "POST" } }),
      POST: async ({ request }) => {
        const { configuredPaymentWebhook } = await import("@/lib/payment-webhook.server");
        return configuredPaymentWebhook(request);
      },
    },
  },
});
