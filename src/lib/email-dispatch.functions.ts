import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const emailDispatchSchema = z.object({
  recipientEmail: z.string().email("Valid recipient email is required"),
  recipientName: z.string().min(1, "Recipient name is required"),
  companyName: z.string().optional().nullable(),
  subject: z.string().min(3, "Subject is required"),
  templateType: z.enum(["proposal", "invoice", "audit", "outreach"]),
  plainTextBody: z.string().min(10, "Email body is required"),
  htmlContent: z.string().optional().nullable(),
  referenceId: z.string().optional().nullable(),
});

export type EmailDispatchInput = z.infer<typeof emailDispatchSchema>;

export const dispatchTransactionalEmail = createServerFn({ method: "POST" })
  .validator((input: unknown) => emailDispatchSchema.parse(input))
  .handler(async ({ data }) => {
    const resendApiKey = process.env.RESEND_API_KEY;
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    const senderEmail = process.env.TRANSACTIONAL_SENDER_EMAIL || "hello@harleydigitalworks.com";
    const senderName = "Harley Digital Works";

    let delivered = false;
    let deliveryMethod: "resend" | "simulated" = "simulated";

    // 1. Try Resend if configured
    if (resendApiKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: `${senderName} <${senderEmail}>`,
            to: [data.recipientEmail],
            subject: data.subject,
            text: data.plainTextBody,
            html: data.htmlContent || undefined,
          }),
        });

        if (res.ok) {
          delivered = true;
          deliveryMethod = "resend";
        } else {
          const errData = await res.json().catch(() => ({}));
          console.warn("[Email Dispatch] Resend API responded with error:", errData);
        }
      } catch (err) {
        console.error("[Email Dispatch] Network error calling Resend API:", err);
      }
    }

    // 2. Notify Slack of outgoing transactional document
    if (slackWebhookUrl) {
      try {
        await fetch(slackWebhookUrl, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            text: `📤 Dispatched ${data.templateType.toUpperCase()} to ${data.recipientName} (${data.recipientEmail})`,
            blocks: [
              {
                type: "header",
                text: {
                  type: "plain_text",
                  text: `Transactional ${data.templateType.toUpperCase()} Sent`,
                  emoji: true,
                },
              },
              {
                type: "section",
                fields: [
                  { type: "mrkdwn", text: `*Recipient:*\n${data.recipientName}` },
                  { type: "mrkdwn", text: `*Email:*\n${data.recipientEmail}` },
                  { type: "mrkdwn", text: `*Type:*\n${data.templateType}` },
                  {
                    type: "mrkdwn",
                    text: `*Reference:*\n${data.referenceId || "N/A"}`,
                  },
                ],
              },
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*Subject:*\n${data.subject}\n\n*Delivery Method:* ${deliveryMethod === "resend" ? "✅ Resend Live Dispatch" : "📋 Prepared / Simulated (Fallback)"}`,
                },
              },
            ],
          }),
        });
      } catch (e) {
        console.error("[Email Dispatch] Slack notification failed:", e);
      }
    }

    const mailtoUrl = `mailto:${encodeURIComponent(data.recipientEmail)}?subject=${encodeURIComponent(
      data.subject,
    )}&body=${encodeURIComponent(data.plainTextBody)}`;

    return {
      success: true,
      delivered,
      deliveryMethod,
      recipientEmail: data.recipientEmail,
      mailtoUrl,
      message: delivered
        ? `Official ${data.templateType} successfully delivered to ${data.recipientEmail}.`
        : `Proposal prepared for ${data.recipientEmail}. Email client link ready.`,
    };
  });
