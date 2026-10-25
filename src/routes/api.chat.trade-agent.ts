import { createFileRoute } from "@tanstack/react-router";
import { getTradeAgentResponse } from "@/lib/trade-agent";

export const Route = createFileRoute("/api/chat/trade-agent")({
  server: {
    handlers: {
      GET: () =>
        new Response(JSON.stringify({ status: "online", agent: "Trade Estimator Agent" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { message?: string; sessionId?: string };
          const userMessage = body.message?.trim();

          if (!userMessage) {
            return new Response(JSON.stringify({ error: "Message is required." }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const sessionId = body.sessionId || `web-${Date.now()}`;
          const result = await getTradeAgentResponse(userMessage, sessionId);

          return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          return new Response(
            JSON.stringify({
              error: err instanceof Error ? err.message : "Chat service unavailable",
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
