export type NotificationJob = {
  id: string;
  lead_id: string;
  lease_token: string;
  attempts: number;
  source: string;
};
export async function deliverLeadNotifications(options: {
  enabled: boolean;
  webhookUrl?: string;
  claim: () => Promise<NotificationJob[]>;
  finish: (job: NotificationJob, accepted: boolean, error: string | null) => Promise<void>;
  fetch: typeof fetch;
}) {
  // Disabled or unconfigured environments leave durable jobs untouched.
  if (!options.enabled || !options.webhookUrl) return { accepted: 0, failed: 0, disabled: true };
  const destination = new URL(options.webhookUrl);
  if (
    destination.protocol !== "https:" ||
    destination.hostname !== "hooks.slack.com" ||
    !destination.pathname.startsWith("/services/")
  )
    throw new Error("Invalid Slack webhook configuration");
  const jobs = await options.claim();
  let accepted = 0,
    failed = 0;
  for (const job of jobs) {
    let ok = false;
    let error: string | null = null;
    try {
      const brand =
        job.source === "group_contact_form" ? "The Harley Group" : "Harley Digital Works";
      const { buildLeadCard } = await import("./slack/blocks.ts");
      const blocks = buildLeadCard(
        {
          id: job.lead_id,
          brand,
          name: "Trade Enquiry",
          email: "enquiry@harleydigitalworks.com",
          message: `Enquiry reference ${job.lead_id}. Review full details securely in authenticated CRM.`,
          source: job.source,
          createdAt: new Date().toISOString(),
        },
        { jobId: job.id, attempts: job.attempts },
      );

      const response = await options.fetch(destination.href, {
        method: "POST",
        signal: AbortSignal.timeout(5000),
        headers: { "content-type": "application/json" },
        // Keep personal enquiry details in the authenticated CRM.
        body: JSON.stringify({
          text: `New ${brand} enquiry. Reference: ${job.lead_id}\nReview securely: https://harleydigitalworks.com/admin/leads`,
          blocks,
          unfurl_links: false,
          unfurl_media: false,
        }),
      });
      ok = response.ok && (await response.text()).trim() === "ok";
      if (!ok) error = `Slack did not acknowledge delivery (HTTP ${response.status}).`;
    } catch (failure) {
      console.error("[Lead alert] Slack request failed", {
        reason:
          failure instanceof Error && /Illegal invocation|incorrect this/i.test(failure.message)
            ? "Native fetch receiver rejected"
            : failure instanceof Error && /timeout|aborted/i.test(failure.name)
              ? "Request timed out or aborted"
              : "Request failed",
      });
      error = "Slack request failed or timed out; acknowledgement unknown.";
    }
    // If acknowledgement storage fails, the lease expires and another run retries.
    // Slack webhooks cannot guarantee exactly-once delivery after ambiguous failures.
    await options.finish(job, ok, error);
    if (ok) accepted++;
    else failed++;
  }
  return { accepted, failed, disabled: false };
}
