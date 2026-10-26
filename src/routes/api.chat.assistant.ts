import { createFileRoute } from "@tanstack/react-router";
import { processAssistantMessage } from "@/lib/ai-assistant/agent-core";
import type { AssistantBrand } from "@/lib/ai-assistant/types";

export const Route = createFileRoute("/api/chat/assistant")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          JSON.stringify({
            status: "online",
            system: "The Harley Group & Harley Digital Works AI Assistant Gateway",
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
            brand?: AssistantBrand;
          };

          const userMessage = body.message?.trim();
          if (!userMessage) {
            return new Response(JSON.stringify({ error: "Message is required." }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const brand: AssistantBrand = body.brand === "group" ? "group" : "hdw";
          const sessionId = body.sessionId || `session-${Date.now()}`;

          const result = await processAssistantMessage({
            message: userMessage,
            sessionId,
            brand,
          });

          return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          return new Response(
            JSON.stringify({
              error: err instanceof Error ? err.message : "Assistant temporarily unavailable",
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
