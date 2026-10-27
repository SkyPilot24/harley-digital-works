import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import {
  assertIntakeBackend,
  checkIntakeResult,
  trustedIntakeIp,
  createRequestFingerprint,
  verifyTurnstileToken,
} from "@/lib/lead-intake-result";
import { leadInputSchema } from "@/lib/lead-schema";
import { formatLeadMessage } from "@/lib/lead-details";

export { createRequestFingerprint, verifyTurnstileToken };

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => leadInputSchema.parse(input))
  .handler(async ({ data }) => {
    // Give basic form-filling bots a success response without storing or notifying.
    // Honeypot short-circuits first before Turnstile or database operations.
    if (data.website) return { ok: true };

    const clientIp = getClientIp();

    // Verify Cloudflare Turnstile token before any database call
    const turnstileValid = await verifyTurnstileToken(data.turnstileToken, clientIp);
    if (!turnstileValid) {
      throw new Error("Security verification failed. Please try again.");
    }

    assertIntakeBackend(process.env.SUPABASE_URL, import.meta.env.VITE_SUPABASE_URL);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const fingerprint = await createRequestFingerprint(clientIp);

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
  const ip = trustedIntakeIp(getRequest().headers);
  if (ip === "unknown" && process.env.NODE_ENV === "production") {
    console.warn(
      JSON.stringify({
        event: "trusted_intake_ip_unknown",
        level: "warn",
        message:
          "Client IP could not be resolved from trusted intake headers in production environment.",
        timestamp: new Date().toISOString(),
      }),
    );
  }
  return ip;
}
