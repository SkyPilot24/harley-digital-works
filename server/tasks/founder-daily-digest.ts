import { defineTask } from "nitro/task";
import { fetchFounderDigestData } from "../../src/lib/slack/founder-digest";
import { dispatchFounderDailyDigest } from "../../src/lib/slack/dispatcher";

export default defineTask({
  meta: {
    name: "founder-daily-digest",
    description: "Generate and dispatch the 08:00 Founder Command Centre KPI Briefing to Slack",
  },
  async run() {
    try {
      const digestData = await fetchFounderDigestData();
      const result = await dispatchFounderDailyDigest(digestData);
      return { result: result.ok ? "dispatched" : "skipped_or_failed", error: result.error };
    } catch (error) {
      console.error("[Founder Daily Digest] Task execution failed:", error);
      return { result: "error", error: error instanceof Error ? error.message : "Task failure" };
    }
  },
});
