import { createFileRoute } from "@tanstack/react-router";
import { processReceptionistCall } from "@/lib/receptionist-agent";

export const Route = createFileRoute("/api/receptionist/call")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          JSON.stringify({
            status: "online",
            service: "HDW 24/7 Virtual Phone Receptionist",
            voice: "en-GB-Neural2-B (British English)",
            agentId: "4eb1d76c-5561-4f63-a7d0-5a1d5e1687c3",
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        ),
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            message?: string;
            sessionId?: string;
            mode?: "hdw_agency" | "contractor_upsell";
          };

          const callerMessage = body.message?.trim();
          if (!callerMessage) {
            return new Response(JSON.stringify({ error: "Caller message is required." }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const sessionId = body.sessionId || `call-${Date.now()}`;
          const mode = body.mode || "hdw_agency";

          const result = await processReceptionistCall(callerMessage, sessionId, mode);

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
