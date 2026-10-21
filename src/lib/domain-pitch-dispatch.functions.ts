import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sendSlackMessage } from "@/lib/slack/dispatcher";

export const domainPitchDispatchSchema = z.object({
  recipientEmail: z.string().trim().email("Please provide a valid email address"),
  recipientName: z.string().trim().min(1),
  companyName: z.string().trim().min(1),
  domain: z.string().trim().min(3),
  subject: z.string().trim().min(3),
  plainTextBody: z.string().trim().min(10),
  targetId: z.string().optional(),
  slackWebhookUrl: z.string().url().optional().or(z.literal("")),
});

export type DomainPitchDispatchInput = z.infer<typeof domainPitchDispatchSchema>;

export const dispatchDomainPitchViaResend = createServerFn({ method: "POST" })
  .validator((input: unknown) => domainPitchDispatchSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    const senderEmail = process.env.TRANSACTIONAL_SENDER_EMAIL || "robbie@theharleygroup.org";
    const senderName = process.env.TRANSACTIONAL_SENDER_NAME || "Robbie Harley";

    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured on the server environment.");
    }

    // 1. Dispatch email via Resend REST API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(15_000),
      body: JSON.stringify({
        from: `${senderName} <${senderEmail}>`,
        to: [data.recipientEmail],
        reply_to: senderEmail,
        subject: data.subject,
        text: data.plainTextBody,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      let parsedMessage = errText;
      try {
        const parsed = JSON.parse(errText);
        parsedMessage = parsed.message || errText;
      } catch {
        // ignore JSON parse error
      }
      throw new Error(`Resend API dispatch failed (${response.status}): ${parsedMessage}`);
    }

    const receipt = (await response.json()) as { id?: string };
    if (!receipt.id) {
      throw new Error("Resend accepted the request but returned no provider message ID.");
    }

    // 2. Post alert to Slack (if Slack webhook is configured)
    const slackUrl =
      data.slackWebhookUrl || process.env.SLACK_WEBHOOK_SALES || process.env.SLACK_WEBHOOK_URL;
    let slackDelivered = false;

    if (slackUrl) {
      try {
        const slackRes = await sendSlackMessage(
          "#sales",
          {
            text: `🚀 *Domain Outbound Pitch Dispatched via Resend!*\n• *Domain:* \`${data.domain}\`\n• *Target:* *${data.companyName}* (${data.recipientEmail})\n• *Recipient Role:* ${data.recipientName}\n• *Sender:* ${senderName} <${senderEmail}>\n• *Provider ID:* \`${receipt.id}\`\n• *Timestamp:* ${new Date().toLocaleTimeString("en-GB")}`,
          },
          {
            enabled: true,
            defaultWebhookUrl: slackUrl,
            channelWebhooks: {
              "#sales": slackUrl,
            },
          },
        );
        slackDelivered = slackRes.ok;
      } catch (slackErr) {
        console.warn(
          "[Slack Dispatch Warning]: Could not deliver pitch notification to Slack:",
          slackErr,
        );
      }
    }

    return {
      success: true,
      providerId: receipt.id,
      sentAt: new Date().toISOString(),
      recipientEmail: data.recipientEmail,
      targetId: data.targetId,
      sender: `${senderName} <${senderEmail}>`,
      slackDelivered,
    };
  });

export const testSlackWebhookSchema = z.object({
  webhookUrl: z
    .string()
    .trim()
    .url("Please enter a valid Slack webhook URL (https://hooks.slack.com/...)"),
});

export const testDomainSlackWebhook = createServerFn({ method: "POST" })
  .validator((input: unknown) => testSlackWebhookSchema.parse(input))
  .handler(async ({ data }) => {
    const slackRes = await sendSlackMessage(
      "#sales",
      {
        text: `🟢 *The Harley Group · Domain Outbound Deal Engine Connected!*\nSlack channel alerts are now active for domain pitches, inbound responses, and escrow payments.\n_Tested at ${new Date().toLocaleTimeString("en-GB")}_`,
      },
      {
        enabled: true,
        defaultWebhookUrl: data.webhookUrl,
        channelWebhooks: {
          "#sales": data.webhookUrl,
        },
      },
    );

    if (!slackRes.ok) {
      throw new Error(slackRes.error || "Slack rejected the webhook payload.");
    }

    // Synchronise verified webhook into .env.local in development so all other app routes (leads, finance, command centre) have it
    try {
      if (process.env.NODE_ENV !== "production") {
        const fs = await import("fs");
        const path = await import("path");
        const envLocalPath = path.resolve(process.cwd(), ".env.local");
        if (fs.existsSync(envLocalPath)) {
          let envContent = fs.readFileSync(envLocalPath, "utf-8");
          if (!envContent.includes("SLACK_WEBHOOK_URL=")) {
            envContent += `\nSLACK_NOTIFICATIONS_ENABLED=true\nSLACK_WEBHOOK_URL=${data.webhookUrl}\nSLACK_WEBHOOK_SALES=${data.webhookUrl}\n`;
          } else {
            envContent = envContent.replace(
              /SLACK_WEBHOOK_URL=.*/,
              `SLACK_WEBHOOK_URL=${data.webhookUrl}`,
            );
            if (!envContent.includes("SLACK_WEBHOOK_SALES=")) {
              envContent += `\nSLACK_WEBHOOK_SALES=${data.webhookUrl}\n`;
            } else {
              envContent = envContent.replace(
                /SLACK_WEBHOOK_SALES=.*/,
                `SLACK_WEBHOOK_SALES=${data.webhookUrl}`,
              );
            }
          }
          fs.writeFileSync(envLocalPath, envContent, "utf-8");
        }
        process.env.SLACK_NOTIFICATIONS_ENABLED = "true";
        process.env.SLACK_WEBHOOK_URL = data.webhookUrl;
        process.env.SLACK_WEBHOOK_SALES = data.webhookUrl;
      }
    } catch (syncErr) {
      console.warn("[Slack Sync Warning]: Could not persist webhook to .env.local:", syncErr);
    }

    return { success: true };
  });

export const logInboundOfferSchema = z.object({
  domain: z.string().trim().min(3),
  companyName: z.string().trim().min(1),
  senderEmail: z.string().trim().email(),
  offerAmountGbp: z.number().optional().nullable(),
  messageSnippet: z.string().trim().min(3),
  slackWebhookUrl: z.string().url().optional().or(z.literal("")),
});

export const logInboundDomainOffer = createServerFn({ method: "POST" })
  .validator((input: unknown) => logInboundOfferSchema.parse(input))
  .handler(async ({ data }) => {
    const slackUrl =
      data.slackWebhookUrl || process.env.SLACK_WEBHOOK_SALES || process.env.SLACK_WEBHOOK_URL;
    let slackDelivered = false;

    if (slackUrl) {
      try {
        const offerText = data.offerAmountGbp
          ? `£${data.offerAmountGbp.toLocaleString("en-GB")}`
          : "Negotiation Inquiry";
        const slackRes = await sendSlackMessage(
          "#sales",
          {
            text: `🚨 *INBOUND DOMAIN DEAL ACTIVITY!*\n• *Domain:* \`${data.domain}\`\n• *Buyer / Prospect:* *${data.companyName}* (<${data.senderEmail}>)\n• *Offer / Signal:* *${offerText}*\n• *Message:* "${data.messageSnippet}"\n• *Action Required:* Review in Control Centre or reply from \`robbie@theharleygroup.org\`.`,
          },
          {
            enabled: true,
            defaultWebhookUrl: slackUrl,
            channelWebhooks: {
              "#sales": slackUrl,
            },
          },
        );
        slackDelivered = slackRes.ok;
      } catch (slackErr) {
        console.warn(
          "[Slack Dispatch Warning]: Could not deliver inbound notification to Slack:",
          slackErr,
        );
      }
    }

    return {
      success: true,
      loggedAt: new Date().toISOString(),
      slackDelivered,
    };
  });
