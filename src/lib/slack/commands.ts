/**
 * Slack Slash Command Handlers
 * Allows the founder to query KPIs, inspect pipeline, and trigger actions directly from Slack
 */

import type { SlackCommandPayload, SlackBlock } from "./types.ts";
import { buildFounderDailyDigest, buildLeadCard } from "./blocks.ts";
import { fetchFounderDigestData } from "./founder-digest.ts";

export async function handleSlackCommand(
  payload: SlackCommandPayload,
): Promise<{ text: string; blocks?: SlackBlock[] }> {
  const subCommand = (payload.text || "").trim().toLowerCase().split(" ")[0];
  const { supabaseAdmin } = await import("../../integrations/supabase/client.server.ts");

  // 1. /thg status or /thg digest
  if (!subCommand || subCommand === "status" || subCommand === "digest") {
    const digest = await fetchFounderDigestData();
    const blocks = buildFounderDailyDigest(digest);
    return {
      text: `👑 Founder Command Centre Digest — MRR: £${digest.verifiedMRR.toFixed(
        2,
      )} | Builds: ${digest.activeBuildsCount}/3`,
      blocks,
    };
  }

  // 2. /thg leads
  if (subCommand === "leads") {
    const { data: leads } = await supabaseAdmin
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);

    if (!leads || leads.length === 0) {
      return { text: "📬 No recent leads in database." };
    }

    const blocks: SlackBlock[] = [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `📬 Recent Leads Pipeline (${leads.length} shown)`,
          emoji: true,
        },
      },
    ];

    for (const lead of leads) {
      const card = buildLeadCard({
        id: lead.id,
        brand: lead.source === "group_contact_form" ? "The Harley Group" : "Harley Digital Works",
        name: lead.name,
        company: lead.company,
        email: lead.email,
        packageInterest: lead.package,
        message: lead.message,
        source: lead.source || "contact_form",
        createdAt: lead.created_at,
      });
      blocks.push(...card);
      blocks.push({ type: "divider" });
    }

    return {
      text: `📬 Found ${leads.length} recent leads.`,
      blocks,
    };
  }

  // 3. /thg builds
  if (subCommand === "builds") {
    const { data: projects } = await supabaseAdmin
      .from("projects")
      .select("*, clients(name, contact_name)")
      .in("status", ["discovery", "in_progress", "review"])
      .order("created_at", { ascending: false });

    const activeList = projects ?? [];
    const blocks: SlackBlock[] = [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `🔨 Active Builds in Flight (${activeList.length}/3 Cap)`,
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            activeList.length === 0
              ? "✨ No active builds currently in flight. Capacity open for new onboarding."
              : activeList
                  .map(
                    (p) =>
                      `• *${p.name}* — Stage: \`${p.status.toUpperCase()}\` (Client: ${(p.clients as { name?: string } | null)?.name || "Trade Client"})`,
                  )
                  .join("\n"),
        },
      },
    ];

    return {
      text: `🔨 Active builds: ${activeList.length}/3`,
      blocks,
    };
  }

  // 4. /thg approvals
  if (subCommand === "approvals") {
    const { data: reviewProjects } = await supabaseAdmin
      .from("projects")
      .select("id, name, status")
      .eq("status", "review");

    const items = reviewProjects ?? [];
    if (items.length === 0) {
      return {
        text: "✨ No outstanding approvals required from founder. Standard workflows progressing.",
      };
    }

    const blocks: SlackBlock[] = [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `📋 Outstanding Founder Approvals (${items.length})`,
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: items
            .map((p) => `• Staged Preview Sign-Off: *${p.name}* (Ref: \`${p.id}\`)`)
            .join("\n"),
        },
      },
    ];

    return {
      text: `📋 ${items.length} approvals pending`,
      blocks,
    };
  }

  // 5. /thg retry
  if (subCommand === "retry") {
    const { data, error } = await supabaseAdmin
      .from("lead_notification_jobs")
      .update({
        attempts: 0,
        status: "pending",
        lease_token: null,
        lease_until: null,
        next_attempt_at: new Date().toISOString(),
        last_error: "Re-queued via /thg retry command",
      })
      .neq("status", "accepted")
      .select("id");

    const resetCount = data?.length ?? 0;
    return {
      text: `🔄 Reset ${resetCount} stuck outbox notification jobs for immediate delivery.`,
    };
  }

  // Help / fallback
  return {
    text:
      "🤖 *The Harley Group · Founder Slack Commands:*\n" +
      "• `/thg status` or `/thg digest` — Daily executive KPI briefing & capacity status\n" +
      "• `/thg leads` — Review recent enquiries with 1-click qualification buttons\n" +
      "• `/thg builds` — Active 14-day trade builds in flight\n" +
      "• `/thg approvals` — Pending founder sign-offs (staged previews, proposals)\n" +
      "• `/thg retry` — Reset stuck background notification jobs for immediate retry\n" +
      "• `/thg help` — Show this command reference",
  };
}
