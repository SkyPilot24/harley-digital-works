import { defineTask } from "nitro/task";
import { supabaseAdmin } from "../../src/integrations/supabase/client.server";

export default defineTask({
  meta: {
    name: "prune-lead-attempts",
    description: "Prune expired lead submission attempts older than 24 hours retention window",
  },
  async run() {
    const { error } = await supabaseAdmin.rpc("prune_lead_submission_attempts");
    if (error) {
      console.error("[Retention Task] Failed to prune lead submission attempts:", error);
      throw new Error("Lead submission attempts retention cleanup failed");
    }
    return { result: "ok" };
  },
});
