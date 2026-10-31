import { leadInputSchema, type LeadInput } from "./lead-schema.ts";
import { formatLeadMessage } from "./lead-details.ts";
import {
  assertIntakeBackend,
  checkIntakeResult,
  createRequestFingerprint,
  verifyTurnstileToken,
} from "./lead-intake-result.ts";

export type IntakeOptions = {
  ip: string;
  serverUrl: string | undefined;
  browserUrl: string | undefined;
  secret?: string;
  verifyToken?: typeof verifyTurnstileToken;
  save: (args: {
    p_fingerprint: string;
    p_started_at: number;
    p_lead: Record<string, string | null>;
  }) => PromiseLike<{ data: unknown; error: unknown }>;
};

/** Shared public intake: a receipt follows storage, never just an attempted RPC. */
export async function persistPublicLead(input: unknown, options: IntakeOptions) {
  const data: LeadInput = leadInputSchema.parse(input);
  if (data.website) return { ok: true as const };
  if (!(await (options.verifyToken || verifyTurnstileToken)(data.turnstileToken, options.ip))) {
    throw new Response("Security verification failed. Please try again.", { status: 400 });
  }
  assertIntakeBackend(options.serverUrl, options.browserUrl);
  const fingerprint = await createRequestFingerprint(options.ip, options.secret);
  const { data: result, error } = await options.save({
    p_fingerprint: fingerprint,
    p_started_at: data.startedAt,
    p_lead: {
      name: data.name,
      email: data.email.toLowerCase(),
      company: data.company || null,
      package: data.package || null,
      message: formatLeadMessage(data),
      source: data.source === "website_review" ? "contact_form" : data.source || "contact_form",
    },
  });
  if (error) throw new Error("Lead submission failed.");
  checkIntakeResult(result);
  return { ok: true as const };
}
