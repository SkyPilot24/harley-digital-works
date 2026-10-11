/**
 * Slack Interactive Action Handlers
 * Processes button clicks and interactive UI submissions from Slack Block Kit
 */

import type { SlackInteractionPayload, SlackInteractiveAction, SlackBlock } from "./types.ts";
import { buildActionResolutionBlock, buildFounderDailyDigest } from "./blocks.ts";
import { fetchFounderDigestData } from "./founder-digest.ts";
import { ensureClientWorkspace } from "../client-workspace.ts";

export async function handleSlackBlockAction(payload: SlackInteractionPayload): Promise<{
  replaceOriginal: boolean;
  text: string;
  blocks?: SlackBlock[];
}> {
  const action = payload.actions[0] as SlackInteractiveAction | undefined;
  if (!action) {
    return { replaceOriginal: false, text: "No action detected." };
  }

  const actionId = action.action_id;
  const username = payload.user.name || payload.user.username || "Robbie";
  const nowStr = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  });

  const { supabaseAdmin } = await import("../../integrations/supabase/client.server.ts");

  // 1. Mark Lead Contacted
  if (actionId === "lead_mark_contacted") {
    let leadId = "";
    try {
      const parsed = JSON.parse(action.value || "{}");
      leadId = parsed.leadId;
    } catch {
      leadId = action.value || "";
    }

    if (leadId) {
      await supabaseAdmin
        .from("leads")
        .update({ status: "contacted", updated_at: new Date().toISOString() })
        .eq("id", leadId);
    }

    return {
      replaceOriginal: true,
      text: `✅ Lead \`${leadId}\` marked Contacted by ${username}`,
      blocks: buildActionResolutionBlock({
        actionTitle: "Lead Status Updated",
        user: username,
        timestamp: nowStr,
        statusText: `Lead \`${leadId}\` is now marked as *Contacted*. Follow-up pending.`,
      }),
    };
  }

  // 2. Mark Lead Qualified
  if (actionId === "lead_mark_qualified") {
    let leadId = "";
    try {
      const parsed = JSON.parse(action.value || "{}");
      leadId = parsed.leadId;
    } catch {
      leadId = action.value || "";
    }

    if (leadId) {
      await supabaseAdmin
        .from("leads")
        .update({ status: "qualified", updated_at: new Date().toISOString() })
        .eq("id", leadId);
    }

    return {
      replaceOriginal: true,
      text: `⭐ Lead \`${leadId}\` marked Qualified by ${username}`,
      blocks: buildActionResolutionBlock({
        actionTitle: "Lead Qualified",
        user: username,
        timestamp: nowStr,
        statusText: `Lead \`${leadId}\` is now *Qualified* into active sales pipeline. Ready for Proposal.`,
      }),
    };
  }

  // 3. Convert Lead to Client Workspace
  if (actionId === "lead_convert_client") {
    let leadId = "";
    try {
      const parsed = JSON.parse(action.value || "{}");
      leadId = parsed.leadId;
    } catch {
      leadId = action.value || "";
    }

    let clientName = "Trade Client";
    if (leadId) {
      const { data: lead } = await supabaseAdmin
        .from("leads")
        .select("*")
        .eq("id", leadId)
        .maybeSingle();

      if (lead) {
        clientName = lead.company || lead.name;
        await ensureClientWorkspace(lead, {
          find: async (id) => {
            const { data } = await supabaseAdmin
              .from("clients")
              .select("*")
              .eq("id", id)
              .maybeSingle();
            return data;
          },
          insert: async (clientPayload) => {
            const { data, error } = await supabaseAdmin
              .from("clients")
              .insert(clientPayload)
              .select()
              .single();
            if (error) throw error;
            return data;
          },
        });
      }
    }

    return {
      replaceOriginal: true,
      text: `📁 Client workspace created for *${clientName}* by ${username}`,
      blocks: buildActionResolutionBlock({
        actionTitle: "Client Workspace Established",
        user: username,
        timestamp: nowStr,
        statusText: `Client record created for *${clientName}* (Ref: \`${leadId}\`). Status: \`lead\`. Ready for onboarding and milestone agreement.`,
      }),
    };
  }

  // 4. Founder Approval: Approve Request
  if (actionId === "approve_founder_request") {
    let approvalId = "";
    let type = "";
    try {
      const parsed = JSON.parse(action.value || "{}");
      approvalId = parsed.approvalId;
      type = parsed.type;
    } catch {
      approvalId = action.value || "";
    }

    if (approvalId && type === "project_launch") {
      await supabaseAdmin
        .from("projects")
        .update({ status: "launched", updated_at: new Date().toISOString() })
        .eq("id", approvalId);
    }

    return {
      replaceOriginal: true,
      text: `✅ Request approved by ${username}`,
      blocks: buildActionResolutionBlock({
        actionTitle: "Founder Sign-Off Confirmed",
        user: username,
        timestamp: nowStr,
        statusText: `Approval granted for request \`${approvalId}\`. Automation proceeding with next delivery stage.`,
      }),
    };
  }

  // 5. Founder Approval: Reject / Request Changes
  if (actionId === "reject_founder_request") {
    let approvalId = "";
    try {
      const parsed = JSON.parse(action.value || "{}");
      approvalId = parsed.approvalId;
    } catch {
      approvalId = action.value || "";
    }

    if (approvalId) {
      await supabaseAdmin
        .from("projects")
        .update({ status: "in_progress", updated_at: new Date().toISOString() })
        .eq("id", approvalId);
    }

    return {
      replaceOriginal: true,
      text: `❌ Revision requested by ${username}`,
      blocks: buildActionResolutionBlock({
        actionTitle: "Revision Requested",
        user: username,
        timestamp: nowStr,
        statusText: `Staged item \`${approvalId}\` sent back to development for requested modifications.`,
      }),
    };
  }

  // 6. Retry Failed Job / Automation
  if (actionId === "retry_failed_job") {
    const jobId = action.value || "";
    if (jobId) {
      await supabaseAdmin
        .from("lead_notification_jobs")
        .update({
          attempts: 0,
          status: "pending",
          lease_token: null,
          lease_until: null,
          next_attempt_at: new Date().toISOString(),
          last_error: "Manually re-queued via Slack command",
        })
        .eq("id", jobId);
    }

    return {
      replaceOriginal: true,
      text: `🔄 Job \`${jobId}\` reset for immediate retry by ${username}`,
      blocks: buildActionResolutionBlock({
        actionTitle: "Retry Triggered",
        user: username,
        timestamp: nowStr,
        statusText: `Notification queue lease cleared and job \`${jobId}\` queued for execution in the next minute run.`,
      }),
    };
  }

  // 7. Refresh Founder Digest
  if (actionId === "request_digest_refresh") {
    const digestData = await fetchFounderDigestData();
    const updatedBlocks = buildFounderDailyDigest(digestData);
    return {
      replaceOriginal: true,
      text: "👑 Founder Command Centre · Digest Updated",
      blocks: updatedBlocks,
    };
  }

  // 8. Acknowledge Exception
  if (actionId === "ack_exception") {
    const excId = action.value || "exception";
    return {
      replaceOriginal: true,
      text: `✅ Alert acknowledged by ${username}`,
      blocks: buildActionResolutionBlock({
        actionTitle: "Alert Acknowledged",
        user: username,
        timestamp: nowStr,
        statusText: `Exception \`${excId}\` marked as acknowledged.`,
      }),
    };
  }

  // Fallback
  return {
    replaceOriginal: false,
    text: `Action \`${actionId}\` acknowledged by ${username}.`,
  };
}
