import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import {
  trustedIntakeIp,
  createRequestFingerprint,
  verifyTurnstileToken,
} from "@/lib/lead-intake-result";
import { leadInputSchema } from "@/lib/lead-schema";
import { persistPublicLead } from "@/lib/lead-intake-service";

export { createRequestFingerprint, verifyTurnstileToken };

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => leadInputSchema.parse(input))
  .handler(async ({ data }) => {
    return persistPublicLead(data, {
      ip: getClientIp(),
      serverUrl: process.env.SUPABASE_URL,
      browserUrl: import.meta.env.VITE_SUPABASE_URL,
      save: async (args) => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        return supabaseAdmin.rpc("submit_public_lead", args);
      },
    });
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
