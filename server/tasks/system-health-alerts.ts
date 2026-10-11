import { defineTask } from "nitro/task";
import { supabaseAdmin } from "../../src/integrations/supabase/client.server";
import { dispatchExceptionAlert } from "../../src/lib/slack/dispatcher";

export default defineTask({
  meta: {
    name: "system-health-alerts",
    description:
      "Scan for stuck automation jobs, capacity thresholds, and system health exceptions",
  },
  async run() {
    try {
      // 1. Check for failing lead notification jobs
      const { data: stuckJobs } = await supabaseAdmin
        .from("lead_notification_jobs")
        .select("id, attempts, last_error, created_at")
        .neq("status", "accepted")
        .gt("attempts", 2);

      if (stuckJobs && stuckJobs.length > 0) {
        for (const job of stuckJobs) {
          await dispatchExceptionAlert({
            id: `job_stuck_${job.id}`,
            category: "automation",
            severity: job.attempts >= 4 ? "high" : "medium",
            title: `Lead Notification Retrying (${job.attempts}/5 attempts)`,
            description: `Durable outbox job ${job.id} has failed ${job.attempts} times. Last error: ${job.last_error || "Unknown error"}.`,
            actionLabel: "🔄 Retry Job Now",
            actionId: "retry_failed_job",
            actionValue: job.id,
            adminUrl: "https://harleydigitalworks.com/admin/diagnostics",
          });
        }
      }

      // 2. Check for active build capacity threshold (Robbie's NHS part-time constraint: max 3)
      const { count: activeBuilds } = await supabaseAdmin
        .from("projects")
        .select("id", { count: "exact", head: true })
        .in("status", ["discovery", "in_progress", "review"]);

      if (typeof activeBuilds === "number" && activeBuilds >= 3) {
        await dispatchExceptionAlert({
          id: `capacity_warning_${Date.now()}`,
          category: "capacity",
          severity: "medium",
          title: `Build Capacity Cap Reached (${activeBuilds}/3 Active Builds)`,
          description:
            "Operational delivery capacity is at 100%. Protect founder time budget alongside NHS schedule. Pause new client onboarding until in-flight builds launch.",
          adminUrl: "https://harleydigitalworks.com/admin/projects",
        });
      }

      return { result: "ok", checkedStuckJobs: stuckJobs?.length || 0 };
    } catch (error) {
      console.error("[System Health Alerts] Scan failed:", error);
      return {
        result: "error",
        error: error instanceof Error ? error.message : "Health check error",
      };
    }
  },
});
