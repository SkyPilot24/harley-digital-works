import { createFileRoute } from "@tanstack/react-router";
import type { LeadCaptureRequest, LeadCaptureResponse } from "@/lib/ai-assistant/types";

export const Route = createFileRoute("/api/chat/lead-capture")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as LeadCaptureRequest;

          if (!body.name || !body.email) {
            return new Response(
              JSON.stringify({ ok: false, message: "Name and email are required." }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          const brand = body.brand === "group" ? "group" : "hdw";
          const source = brand === "group" ? "group_contact_form" : "contact_form";

          // Format high-clarity notes for CRM follow-up
          const noteLines = [
            `[Captured via ${brand === "group" ? "The Harley Group AI Advisor" : "Harley Digital Works AI Sales Assistant"}]`,
            body.trade ? `Trade: ${body.trade}` : null,
            body.phone ? `Phone: ${body.phone}` : null,
            body.serviceNeeded ? `Service Interest: ${body.serviceNeeded}` : null,
            body.company ? `Company: ${body.company}` : null,
            body.notes ? `Visitor Note: ${body.notes}` : null,
          ].filter(Boolean);

          const enrichedMessage = noteLines.join("\n");

          // Save into Supabase CRM if configured
          if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
            try {
              const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

              // Compute simple HMAC fingerprint for rate-limiting
              const secret =
                process.env.LEAD_RATE_LIMIT_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
              const key = await crypto.subtle.importKey(
                "raw",
                new TextEncoder().encode(secret),
                { name: "HMAC", hash: "SHA-256" },
                false,
                ["sign"],
              );
              const signature = await crypto.subtle.sign(
                "HMAC",
                key,
                new TextEncoder().encode(`chat-${body.email}`),
              );
              const fingerprint = Array.from(new Uint8Array(signature), (byte) =>
                byte.toString(16).padStart(2, "0"),
              ).join("");

              await supabaseAdmin.rpc("submit_public_lead", {
                p_fingerprint: fingerprint,
                p_started_at: Date.now() - 5000,
                p_lead: {
                  name: body.name.trim().slice(0, 100),
                  email: body.email.trim().toLowerCase().slice(0, 255),
                  company: body.company ? body.company.trim().slice(0, 120) : null,
                  package: body.serviceNeeded ? body.serviceNeeded.trim().slice(0, 60) : null,
                  message: enrichedMessage.slice(0, 3900),
                  source,
                },
              });
            } catch (dbErr) {
              console.warn(
                "[AI Assistant Lead Capture] Database intake skipped or unconfigured:",
                dbErr,
              );
            }
          }

          const response: LeadCaptureResponse = {
            ok: true,
            message: `Thank you, ${body.name}. Your details have been registered directly with Robbie Harley. We will be in touch shortly.`,
          };

          return new Response(JSON.stringify(response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          return new Response(
            JSON.stringify({
              ok: false,
              message:
                err instanceof Error
                  ? err.message
                  : "Unable to process enquiry. Please call 07394 041487.",
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
