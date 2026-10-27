import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import { assertIntakeBackend, checkIntakeResult, trustedIntakeIp } from "@/lib/lead-intake-result";
import { leadInputSchema } from "@/lib/lead-schema";
import { siteConfig } from "@/lib/site-config";
import { formatLeadMessage } from "@/lib/lead-details";

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
      source: data.source === "website_review" ? "contact_form" : data.source || "contact_form",
    };

    const { data: result, error } = await supabaseAdmin.rpc("submit_public_lead", {
      p_fingerprint: fingerprint,
      p_started_at: data.startedAt,
      p_lead: lead,
    });
    if (error) throw new Error("Lead submission failed.");
    if (checkIntakeResult(result) === "duplicate") return { ok: true };

    // The database commits the alert job with the lead; scheduled delivery cannot delay this receipt.
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
