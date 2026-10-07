import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import { assertIntakeBackend, checkIntakeResult, trustedIntakeIp } from "@/lib/lead-intake-result";
import { leadInputSchema } from "@/lib/lead-schema";
import { siteConfig } from "@/lib/site-config";
import { formatLeadMessage, notifyWithoutFailingReceipt } from "@/lib/lead-details";

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => leadInputSchema.parse(input))
  .handler(async ({ data }) => {
    // Give basic form-filling bots a success response without storing or notifying.
    if (data.website) return { ok: true };

    assertIntakeBackend(process.env.SUPABASE_URL, import.meta.env.VITE_SUPABASE_URL);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const fingerprint = await createRequestFingerprint(getClientIp());

    const normalizedEmail = data.email.toLowerCase();

    const enrichedMessage = formatLeadMessage(data);

    const lead = {
      name: data.name,
      email: normalizedEmail,
      company: data.company || null,
      package: data.package || null,
      message: enrichedMessage,
      source: data.source || "contact_form",
    };

    const { data: result, error } = await supabaseAdmin.rpc("submit_public_lead", {
      p_fingerprint: fingerprint,
      p_started_at: data.startedAt,
      p_lead: lead,
    });
    if (error) throw new Error("Lead submission failed.");
    if (checkIntakeResult(result) === "duplicate") return { ok: true };

    await notifyWithoutFailingReceipt(
      () =>
        notifySlackOfLead({
          ...lead,
          websiteUrl: data.websiteUrl || null,
          budget: data.budget || null,
          timeline: data.timeline || null,
        }),
      () => console.error("[Lead intake] Lead saved; Slack notification failed. Check the CRM."),
    );
    return { ok: true };
  });

function getClientIp() {
  return trustedIntakeIp(getRequest().headers);
}

async function createRequestFingerprint(ip: string) {
  const secret = process.env.LEAD_RATE_LIMIT_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("Lead rate-limit secret is not configured.");

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(ip));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

async function notifySlackOfLead(lead: {
  name: string;
  email: string;
  company: string | null;
  package: string | null;
  message: string;
  websiteUrl?: string | null;
  budget?: string | null;
  timeline?: string | null;
}) {
  if (process.env.LEAD_NOTIFICATIONS_ENABLED !== "true") return;
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const fields = [
    { type: "mrkdwn", text: `*Name:*\n${lead.name}` },
    { type: "mrkdwn", text: `*Email:*\n${lead.email}` },
    { type: "mrkdwn", text: `*Company:*\n${lead.company || "—"}` },
    { type: "mrkdwn", text: `*Interested in:*\n${lead.package || "Not specified"}` },
  ];

  if (lead.websiteUrl) {
    fields.push({ type: "mrkdwn", text: `*Current Website:*\n${lead.websiteUrl}` });
  }
  if (lead.budget) {
    fields.push({ type: "mrkdwn", text: `*Budget:*\n${lead.budget}` });
  }
  if (lead.timeline) {
    fields.push({ type: "mrkdwn", text: `*Timeline:*\n${lead.timeline}` });
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    signal: AbortSignal.timeout(5_000),
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      text: `New lead from ${lead.name}`,
      blocks: [
        {
          type: "header",
          text: { type: "plain_text", text: "New website lead", emoji: true },
        },
        {
          type: "section",
          fields,
        },
        {
          type: "section",
          text: { type: "mrkdwn", text: `*Message:*\n${truncateForSlack(lead.message)}` },
        },
        {
          type: "context",
          elements: [{ type: "mrkdwn", text: `Source: ${siteConfig.canonicalUrl}contact` }],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Lead notification was not accepted.");
  }
}

function truncateForSlack(value: string) {
  return value.length > 1800 ? `${value.slice(0, 1800)}...` : value;
}
