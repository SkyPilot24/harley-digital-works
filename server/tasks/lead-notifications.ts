import { defineTask } from "nitro/task";
import { supabaseAdmin } from "../../src/integrations/supabase/client.server";
import { deliverLeadNotifications, type NotificationJob } from "../../src/lib/lead-notifications";

export default defineTask({
  meta: {
    name: "lead-notifications",
    description: "Deliver durable enquiry alerts with bounded retries",
  },
  async run() {
    const result = await deliverLeadNotifications({
      enabled: process.env.LEAD_NOTIFICATIONS_ENABLED === "true",
      webhookUrl: process.env.SLACK_WEBHOOK_URL,
      // Native Cloudflare fetch must retain its global receiver.
      fetch: (input, init) => fetch(input, init),
      async claim() {
        const { data, error } = await supabaseAdmin.rpc("claim_lead_notifications");
        if (error) throw new Error("Notification queue unavailable");
        return data as NotificationJob[];
      },
      async finish(job, accepted, errorMessage) {
        const { data, error } = await supabaseAdmin.rpc("finish_lead_notification", {
          p_id: job.id,
          p_lease_token: job.lease_token,
          p_accepted: accepted,
          p_error: errorMessage,
        });
        if (error || data !== true)
          throw new Error("Notification acknowledgement could not be stored");
      },
    });
    return { result };
  },
});
