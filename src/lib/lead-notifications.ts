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
      const response = await options.fetch(destination.href, {
        method: "POST",
        signal: AbortSignal.timeout(5000),
        headers: { "content-type": "application/json" },
        // Keep personal enquiry details in the authenticated CRM.
        body: JSON.stringify({
          text: `New ${brand} enquiry. Reference: ${job.lead_id}\nReview securely: https://harleydigitalworks.com/admin/leads`,
          unfurl_links: false,
          unfurl_media: false,
        }),
      });
      ok = response.ok && (await response.text()).trim() === "ok";
      if (!ok) error = `Slack did not acknowledge delivery (HTTP ${response.status}).`;
    } catch (failure) {
      console.error("[Lead alert] Slack request failed", {
        name: failure instanceof Error ? failure.name : "Unknown",
        message:
          failure instanceof Error
            ? failure.message
                .replaceAll(destination.href, "[webhook]")
                .replace(/https?:\/\/\S+/g, "[url]")
                .slice(0, 200)
            : "Unknown failure",
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
