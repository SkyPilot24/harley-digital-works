import { createFileRoute } from "@tanstack/react-router";

function methodNotAllowedResponse() {
  return new Response(null, {
    status: 405,
    headers: { Allow: "POST", "Cache-Control": "no-store" },
  });
}

export const Route = createFileRoute("/api/webhooks/resend")({
  server: {
    handlers: {
      GET: methodNotAllowedResponse,
      HEAD: methodNotAllowedResponse,
      POST: async ({ request }) => {
        const { configuredResendOutreachWebhook } =
          await import("@/lib/resend-outreach-webhook.server");
        return configuredResendOutreachWebhook(request);
      },
    },
  },
});
