import { createServerFn } from "@tanstack/react-start";
import { leadInputSchema, type LeadInput } from "@/lib/lead-schema";
import { siteConfig } from "@/lib/site-config";

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => leadInputSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const lead = {
      name: data.name,
      email: data.email,
      company: data.company || null,
      package: data.package || null,
      message: data.message,
    };

    const { error } = await supabaseAdmin.from("leads").insert(lead);
    if (error) throw new Error(error.message);

    await notifySlackOfLead(lead);
    return { ok: true };
  });

async function notifySlackOfLead(lead: {
  name: string;
  email: string;
  company: string | null;
  package: string | null;
  message: string;
}) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const response = await fetch(webhookUrl, {
    method: "POST",
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
          fields: [
            { type: "mrkdwn", text: `*Name:*\n${lead.name}` },
            { type: "mrkdwn", text: `*Email:*\n${lead.email}` },
            { type: "mrkdwn", text: `*Company:*\n${lead.company || "—"}` },
            { type: "mrkdwn", text: `*Interested in:*\n${lead.package || "Not specified"}` },
          ],
        },
        {
          type: "section",
          text: { type: "mrkdwn", text: `*Message:*\n${truncateForSlack(lead.message)}` },
        },
        {
          type: "context",
          elements: [
            { type: "mrkdwn", text: `Source: ${siteConfig.canonicalUrl}contact` },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    console.error(`[Slack] Lead notification failed with status ${response.status}`);
  }
}

function truncateForSlack(value: string) {
  return value.length > 1800 ? `${value.slice(0, 1800)}...` : value;
}
