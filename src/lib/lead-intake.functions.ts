import { createServerFn } from "@tanstack/react-start";
import { getRequest, getRequestIP } from "@tanstack/react-start/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { leadInputSchema } from "@/lib/lead-schema";
import { siteConfig } from "@/lib/site-config";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 5;
const DUPLICATE_WINDOW_MS = 15 * 60 * 1000;
const MINIMUM_FORM_TIME_MS = 1200;
const ATTEMPT_RETENTION_MS = 24 * 60 * 60 * 1000;

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => leadInputSchema.parse(input))
  .handler(async ({ data }) => {
    // Give basic form-filling bots a success response without storing or notifying.
    if (data.website) return { ok: true };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const now = Date.now();
    const fingerprint = await createRequestFingerprint(getClientIp());

    await enforceRateLimit(supabaseAdmin, fingerprint, now);

    if (data.startedAt > now + 60_000 || now - data.startedAt < MINIMUM_FORM_TIME_MS) {
      throw new Response("Please wait before trying again.", { status: 429 });
    }

    const normalizedEmail = data.email.toLowerCase();
    const lead = {
      name: data.name,
      email: normalizedEmail,
      company: data.company || null,
      package: data.package || null,
      message: data.message,
    };

    const duplicateCutoff = new Date(now - DUPLICATE_WINDOW_MS).toISOString();
    const { data: duplicate, error: duplicateError } = await supabaseAdmin
      .from("leads")
      .select("id")
      .eq("email", normalizedEmail)
      .eq("message", data.message)
      .gte("created_at", duplicateCutoff)
      .limit(1)
      .maybeSingle();

    if (duplicateError) throw new Error("Lead duplicate check failed.");
    if (duplicate) return { ok: true };

    const { error } = await supabaseAdmin.from("leads").insert(lead);
    if (error) throw new Error("Lead submission failed.");

    await notifySlackOfLead(lead);
    return { ok: true };
  });

async function enforceRateLimit(
  client: SupabaseClient<Database>,
  fingerprint: string,
  now: number,
) {
  const windowStart = new Date(now - RATE_LIMIT_WINDOW_MS).toISOString();
  const { count, error: countError } = await client
    .from("lead_submission_attempts")
    .select("id", { count: "exact", head: true })
    .eq("fingerprint", fingerprint)
    .gte("created_at", windowStart);

  if (countError) throw new Error("Lead rate-limit check failed.");
  if ((count ?? 0) >= RATE_LIMIT_MAX_ATTEMPTS) {
    throw new Response("Too many requests. Please try again later.", { status: 429 });
  }

  const { error: insertError } = await client
    .from("lead_submission_attempts")
    .insert({ fingerprint });
  if (insertError) throw new Error("Lead rate-limit recording failed.");

  const retentionCutoff = new Date(now - ATTEMPT_RETENTION_MS).toISOString();
  const { error: cleanupError } = await client
    .from("lead_submission_attempts")
    .delete()
    .lt("created_at", retentionCutoff);
  if (cleanupError) console.error("[Lead intake] Rate-limit cleanup failed.");
}

function getClientIp() {
  const request = getRequest();
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    getRequestIP({ xForwardedFor: true }) ||
    "unknown"
  );
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
          elements: [{ type: "mrkdwn", text: `Source: ${siteConfig.canonicalUrl}contact` }],
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
