import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { sendSlackMessage } from "@/lib/slack/dispatcher";

const inboundPayloadSchema = z
  .object({
    from: z.string().optional(),
    to: z.union([z.string(), z.array(z.string())]).optional(),
    subject: z.string().optional(),
    text: z.string().optional(),
    html: z.string().optional(),
    email: z.string().optional(),
    data: z
      .object({
        from: z.string().optional(),
        to: z.union([z.string(), z.array(z.string())]).optional(),
        subject: z.string().optional(),
        text: z.string().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

export const Route = createFileRoute("/api/webhooks/domain-inbound")({
  server: {
    handlers: {
      GET: () =>
        new Response(JSON.stringify({ status: "ok", service: "domain-inbound-listener" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = inboundPayloadSchema.safeParse(body);

          const from = parsed.data?.from || parsed.data?.data?.from || "Unknown Sender";
          const subject = parsed.data?.subject || parsed.data?.data?.subject || "No Subject";
          const text = parsed.data?.text || parsed.data?.data?.text || "";

          const preview = text.length > 300 ? `${text.slice(0, 300)}...` : text || "(Empty body)";

          // Dispatch alert to Slack #sales
          const slackWebhookUrl = process.env.SLACK_WEBHOOK_SALES || process.env.SLACK_WEBHOOK_URL;
          if (slackWebhookUrl) {
            await sendSlackMessage(
              "#sales",
              {
                text: `📬 *NEW INBOUND EMAIL RECEIVED!*\n• *From:* ${from}\n• *Subject:* ${subject}\n• *Snippet:* "${preview}"\n• *Timestamp:* ${new Date().toLocaleTimeString("en-GB")}`,
              },
              {
                enabled: true,
                defaultWebhookUrl: slackWebhookUrl,
                channelWebhooks: {
                  "#sales": slackWebhookUrl,
                },
              },
            );
          }

          return new Response(
            JSON.stringify({ received: true, timestamp: new Date().toISOString() }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (error) {
          console.error("[Domain Inbound Webhook Error]:", error);
          return new Response(JSON.stringify({ error: "Failed to process inbound payload" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
