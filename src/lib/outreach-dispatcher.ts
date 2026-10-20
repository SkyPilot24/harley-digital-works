import { z } from "zod";
import type { EmailDispatchInput } from "./email-delivery.ts";
import { dispatchAuthorizedEmail } from "./email-delivery.ts";

export const qualifiedProspectSchema = z.object({
  id: z.string().regex(/^P\d{2}$/),
  businessName: z.string().min(2).max(120),
  area: z.string().min(2).max(100),
  website: z.string().url(),
  recipientEmail: z.string().email(),
  recipientName: z.string().min(1).max(120),
  companyNumber: z.string().regex(/^\d{8}$/),
  accreditationEvidence: z.string().min(2),
  observationSummary: z.string().min(5),
  subject: z.string().min(3).max(200),
  plainTextBody: z.string().min(20).max(20_000),
  approvedForSending: z.boolean(),
});

export type QualifiedProspect = z.infer<typeof qualifiedProspectSchema>;

export type OutreachDispatchResult = {
  prospectId: string;
  recipientEmail: string;
  status:
    | "dispatched"
    | "prepared"
    | "skipped_concurrency_limit"
    | "skipped_not_approved"
    | "already_contacted"
    | "failed";
  providerId?: string;
  error?: string;
};

export async function processOutreachBatch(options: {
  prospects: QualifiedProspect[];
  enabled: boolean;
  apiKey?: string;
  senderEmail?: string;
  senderName?: string;
  replyToEmail?: string;
  activeBuildsCount: number;
  maxConcurrentBuilds: number;
  alreadyContactedIds: Set<string>;
  recordSent: (
    prospectId: string,
    receipt: { providerId?: string; sentAt: string },
  ) => Promise<void>;
  notifySlack?: (message: string) => Promise<void>;
  fetch: typeof fetch;
}): Promise<OutreachDispatchResult[]> {
  const results: OutreachDispatchResult[] = [];

  // Enforce Gate 1 pilot capacity guard: 3-customer pilot authorisation with a strict 2-concurrent-build active capacity guard
  if (options.activeBuildsCount >= options.maxConcurrentBuilds) {
    for (const p of options.prospects) {
      results.push({
        prospectId: p.id,
        recipientEmail: p.recipientEmail,
        status: "skipped_concurrency_limit",
        error: `Active builds cap reached (${options.activeBuildsCount}/${options.maxConcurrentBuilds}). Outbound outreach paused to safeguard capacity (Gate 1: 3-customer pilot authorisation with strict 2-concurrent-build guard).`,
      });
    }
    return results;
  }

  for (const prospect of options.prospects) {
    // Safety 1: Ensure prospect has explicit approval flag
    if (!prospect.approvedForSending) {
      results.push({
        prospectId: prospect.id,
        recipientEmail: prospect.recipientEmail,
        status: "skipped_not_approved",
        error: "Prospect is not marked approvedForSending.",
      });
      continue;
    }

    // Safety 2: Deduplication against already-contacted list
    if (options.alreadyContactedIds.has(prospect.id)) {
      results.push({
        prospectId: prospect.id,
        recipientEmail: prospect.recipientEmail,
        status: "already_contacted",
      });
      continue;
    }

    const emailInput: EmailDispatchInput = {
      recipientEmail: prospect.recipientEmail,
      recipientName: prospect.recipientName,
      companyName: prospect.businessName,
      subject: prospect.subject,
      templateType: "outreach",
      plainTextBody: prospect.plainTextBody,
      referenceId: prospect.id,
    };

    try {
      const dispatchResult = await dispatchAuthorizedEmail(emailInput, {
        authorize: async () => {}, // System background task runs authorized
        enabled: options.enabled,
        apiKey: options.apiKey,
        senderEmail: options.senderEmail,
        senderName: options.senderName || "Robbie Harley",
        replyToEmail: options.replyToEmail || options.senderEmail,
        fetch: options.fetch,
      });

      if (dispatchResult.accepted) {
        await options.recordSent(prospect.id, {
          providerId: dispatchResult.providerId,
          sentAt: new Date().toISOString(),
        });

        if (options.notifySlack) {
          await options.notifySlack(
            `🚀 *Automated Outreach Sent* to *${prospect.businessName}* (${prospect.id}) via ${prospect.recipientEmail}. Provider Receipt: \`${dispatchResult.providerId}\``,
          );
        }

        results.push({
          prospectId: prospect.id,
          recipientEmail: prospect.recipientEmail,
          status: "dispatched",
          providerId: dispatchResult.providerId,
        });
      } else {
        results.push({
          prospectId: prospect.id,
          recipientEmail: prospect.recipientEmail,
          status: "prepared",
        });
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      results.push({
        prospectId: prospect.id,
        recipientEmail: prospect.recipientEmail,
        status: "failed",
        error: errMsg,
      });
    }
  }

  return results;
}
