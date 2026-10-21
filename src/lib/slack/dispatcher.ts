/**
 * Slack Notification Dispatcher & Channel Router
 * The Harley Group & Harley Digital Works
 */

import type {
  SlackChannel,
  SlackMessagePayload,
  FounderDigestData,
  ExceptionAlertData,
  ApprovalRequestData,
  BillingAlertData,
  LeadEnquiryData,
} from "./types.ts";
import {
  buildLeadCard,
  buildFounderDailyDigest,
  buildExceptionAlert,
  buildApprovalRequest,
  buildBillingAlert,
} from "./blocks.ts";

export interface DispatcherConfig {
  enabled: boolean;
  botToken?: string;
  defaultWebhookUrl?: string;
  channelWebhooks?: Partial<Record<SlackChannel, string>>;
  fetchFn?: typeof fetch;
}

export function getSlackConfigFromEnv(): DispatcherConfig {
  const enabled =
    process.env.SLACK_NOTIFICATIONS_ENABLED === "true" ||
    process.env.LEAD_NOTIFICATIONS_ENABLED === "true";

  const botToken = process.env.SLACK_BOT_TOKEN;
  const defaultWebhookUrl = process.env.SLACK_WEBHOOK_URL;

  const channelWebhooks: Partial<Record<SlackChannel, string>> = {
    "#founder-command": process.env.SLACK_WEBHOOK_FOUNDER_COMMAND || defaultWebhookUrl,
    "#new-leads": process.env.SLACK_WEBHOOK_NEW_LEADS || defaultWebhookUrl,
    "#sales": process.env.SLACK_WEBHOOK_SALES || defaultWebhookUrl,
    "#customers": process.env.SLACK_WEBHOOK_CUSTOMERS || defaultWebhookUrl,
    "#operations": process.env.SLACK_WEBHOOK_OPERATIONS || defaultWebhookUrl,
    "#finance-alerts": process.env.SLACK_WEBHOOK_FINANCE_ALERTS || defaultWebhookUrl,
    "#system-alerts": process.env.SLACK_WEBHOOK_SYSTEM_ALERTS || defaultWebhookUrl,
    "#automation-alerts": process.env.SLACK_WEBHOOK_AUTOMATION_ALERTS || defaultWebhookUrl,
    "#deployments": process.env.SLACK_WEBHOOK_DEPLOYMENTS || defaultWebhookUrl,
  };

  return {
    enabled,
    botToken,
    defaultWebhookUrl,
    channelWebhooks,
    fetchFn: (input, init) => fetch(input, init),
  };
}

export async function sendSlackMessage(
  targetChannel: SlackChannel,
  payload: SlackMessagePayload,
  configOverride?: Partial<DispatcherConfig>,
): Promise<{ ok: boolean; status?: number; error?: string }> {
  const config = { ...getSlackConfigFromEnv(), ...configOverride };
  const fetcher = config.fetchFn || fetch;

  if (!config.enabled) {
    return { ok: true, error: "Slack notifications disabled in environment" };
  }

  // 1. Try Slack Bot Web API (chat.postMessage) if Bot Token is provided
  if (config.botToken && config.botToken.startsWith("xoxb-")) {
    try {
      const response = await fetcher("https://slack.com/api/chat.postMessage", {
        method: "POST",
        signal: AbortSignal.timeout(5000),
        headers: {
          "content-type": "application/json; charset=utf-8",
          Authorization: `Bearer ${config.botToken}`,
        },
        body: JSON.stringify({
          channel: targetChannel,
          text: payload.text,
          blocks: payload.blocks,
          unfurl_links: payload.unfurl_links ?? false,
          unfurl_media: payload.unfurl_media ?? false,
        }),
      });

      const data = (await response.json()) as { ok: boolean; error?: string };
      if (data.ok) return { ok: true };
      console.warn(`[Slack Web API] Post failed (${data.error}); falling back to webhook`);
    } catch (err) {
      console.error("[Slack Web API] Error sending via chat.postMessage:", err);
    }
  }

  // 2. Webhook Delivery (channel-specific or default webhook fallback)
  const webhookUrl = config.channelWebhooks?.[targetChannel] || config.defaultWebhookUrl;

  if (!webhookUrl) {
    return {
      ok: false,
      error: `No webhook configured for ${targetChannel} and no default SLACK_WEBHOOK_URL`,
    };
  }

  try {
    const destination = new URL(webhookUrl);
    const validSlackPath =
      destination.pathname.startsWith("/services/") ||
      destination.pathname.startsWith("/workflows/") ||
      destination.pathname.startsWith("/triggers/");

    if (
      destination.protocol !== "https:" ||
      destination.hostname !== "hooks.slack.com" ||
      !validSlackPath
    ) {
      return { ok: false, error: "Invalid Slack webhook URL" };
    }

    const response = await fetcher(destination.href, {
      method: "POST",
      signal: AbortSignal.timeout(5000),
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text: payload.text,
        blocks: payload.blocks,
        unfurl_links: payload.unfurl_links ?? false,
        unfurl_media: payload.unfurl_media ?? false,
      }),
    });

    const isOk = response.ok && (await response.text()).trim() === "ok";
    return { ok: isOk, status: response.status };
  } catch (err) {
    console.error(`[Slack Webhook] Delivery failed to ${targetChannel}:`, err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Slack delivery failed",
    };
  }
}

/**
 * High-Level Operational Dispatch Helpers
 */

export async function dispatchLeadNotification(
  lead: LeadEnquiryData,
  options?: { jobId?: string; attempts?: number },
  configOverride?: Partial<DispatcherConfig>,
) {
  const brand = lead.brand;
  const blocks = buildLeadCard(lead, options);
  const fallbackText = `New ${brand} enquiry. Reference: ${lead.id}\nReview securely: https://harleydigitalworks.com/admin/leads`;

  return sendSlackMessage(
    "#new-leads",
    {
      text: fallbackText,
      blocks,
      unfurl_links: false,
      unfurl_media: false,
    },
    configOverride,
  );
}

export async function dispatchFounderDailyDigest(
  digest: FounderDigestData,
  configOverride?: Partial<DispatcherConfig>,
) {
  const blocks = buildFounderDailyDigest(digest);
  const fallbackText = `👑 Founder Command Centre Daily Operating Digest — Verified MRR: £${digest.verifiedMRR.toFixed(
    2,
  )} | Active Builds: ${digest.activeBuildsCount}/${digest.maxBuildCapacity} | Leads: ${digest.newLeadsCount}`;

  return sendSlackMessage(
    "#founder-command",
    {
      text: fallbackText,
      blocks,
      unfurl_links: false,
      unfurl_media: false,
    },
    configOverride,
  );
}

export async function dispatchExceptionAlert(
  alert: ExceptionAlertData,
  configOverride?: Partial<DispatcherConfig>,
) {
  const targetChannel: SlackChannel =
    alert.category === "automation"
      ? "#automation-alerts"
      : alert.category === "system"
        ? "#system-alerts"
        : alert.category === "billing"
          ? "#finance-alerts"
          : "#operations";

  const blocks = buildExceptionAlert(alert);
  const fallbackText = `⚠️ Operational Exception: ${alert.title} (${alert.category})`;

  // If high severity, also mirror to #founder-command
  if (alert.severity === "high") {
    await sendSlackMessage(
      "#founder-command",
      { text: `🚨 URGENT: ${fallbackText}`, blocks },
      configOverride,
    );
  }

  return sendSlackMessage(targetChannel, { text: fallbackText, blocks }, configOverride);
}

export async function dispatchApprovalRequest(
  approval: ApprovalRequestData,
  configOverride?: Partial<DispatcherConfig>,
) {
  const blocks = buildApprovalRequest(approval);
  const fallbackText = `📋 Action Required: ${approval.title} for ${approval.clientOrEntityName}`;

  return sendSlackMessage("#founder-command", { text: fallbackText, blocks }, configOverride);
}

export async function dispatchBillingAlert(
  billing: BillingAlertData,
  configOverride?: Partial<DispatcherConfig>,
) {
  const blocks = buildBillingAlert(billing);
  const fallbackText = `💳 Billing Update: ${billing.clientName} - £${billing.grossPounds.toFixed(2)}`;

  return sendSlackMessage("#finance-alerts", { text: fallbackText, blocks }, configOverride);
}
