import { createFileRoute } from "@tanstack/react-router";
import { processReceptionistCall } from "@/lib/receptionist-agent";
import { BUILTIN_RECEPTIONIST_TENANTS } from "@/lib/receptionist-tenants";

export const Route = createFileRoute("/api/receptionist/call")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          JSON.stringify({
            status: "online",
            service: "The Harley Group Multi-Tenant AI Virtual Phone Receptionist",
            voiceCatalog: [
              { id: "en-GB-Neural2-B", name: "British Male (Deep, Professional)", sample: "en-GB" },
              { id: "en-GB-Neural2-F", name: "British Female (Warm, Crisp)", sample: "en-GB" },
              { id: "en-GB-Neural2-C", name: "British Female (Calm, Reassuring)", sample: "en-GB" },
            ],
            primaryHdwAgentId: "4eb1d76c-5561-4f63-a7d0-5a1d5e1687c3",
            activeTenants: BUILTIN_RECEPTIONIST_TENANTS.map((t) => ({
              slug: t.tenantSlug,
              businessName: t.businessName,
              tradeType: t.tradeType,
              assignedDid: t.assignedDid,
              tier: t.tier,
            })),
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        ),
      POST: async ({ request }) => {
        try {
          const contentType = request.headers.get("Content-Type") || "";
          let callerMessage = "";
          let sessionId = "";
          let tenantId = "hdw-primary";
          let mode: "hdw_agency" | "contractor_upsell" | "tenant_switchboard" = "hdw_agency";

          // Support standard JSON and incoming telephony form webhooks (e.g. Twilio / Telnyx)
          if (contentType.includes("application/json")) {
            const body = (await request.json()) as {
              message?: string;
              callerMessage?: string;
              sessionId?: string;
              tenantId?: string;
              mode?: "hdw_agency" | "contractor_upsell" | "tenant_switchboard";
            };
            callerMessage = (body.message || body.callerMessage || "").trim();
            sessionId = body.sessionId || `call-${Date.now()}`;
            tenantId = body.tenantId || "hdw-primary";
            mode = body.mode || "hdw_agency";
          } else if (contentType.includes("application/x-www-form-urlencoded")) {
            const formData = await request.formData();
            callerMessage =
              formData.get("SpeechResult")?.toString() ||
              formData.get("TranscriptionText")?.toString() ||
              formData.get("Body")?.toString() ||
              "";
            sessionId = formData.get("CallSid")?.toString() || `tel-${Date.now()}`;
            const dialedTo = formData.get("To")?.toString();
            if (dialedTo) {
              tenantId = dialedTo;
            }
            mode = "tenant_switchboard";
          }

          if (!callerMessage) {
            return new Response(
              JSON.stringify({ error: "Caller message or speech is required." }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          const result = await processReceptionistCall(callerMessage, sessionId, tenantId, mode);

          return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          return new Response(
            JSON.stringify({
              error: err instanceof Error ? err.message : "Virtual phone service unavailable.",
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      },
    },
  },
});
