/**
 * Slack Block Kit Message Builders
 * The Harley Group & Harley Digital Works Operational Command Centre
 */

import type {
  SlackBlock,
  SlackBlockElement,
  FounderDigestData,
  ExceptionAlertData,
  ApprovalRequestData,
  BillingAlertData,
  LeadEnquiryData,
} from "./types.ts";

/**
 * Lead Enquiry Interactive Card
 */
export function buildLeadCard(
  lead: LeadEnquiryData,
  options?: { jobId?: string; attempts?: number },
): SlackBlock[] {
  const brandEmoji = lead.brand === "The Harley Group" ? "🏛️" : "⚡";
  const packageName = lead.packageInterest || "Managed Digital Presence (£1,495 + £249/mo)";
  const businessName = lead.company || "Trade Business";

  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `${brandEmoji} New Enquiry · ${lead.brand}`,
        emoji: true,
      },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Reference:*\n\`${lead.id}\``,
        },
        {
          type: "mrkdwn",
          text: `*Business / Prospect:*\n*${businessName}*`,
        },
        {
          type: "mrkdwn",
          text: `*Contact Name:*\n${lead.name}`,
        },
        {
          type: "mrkdwn",
          text: `*Package / Interest:*\n${packageName}`,
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Enquiry Summary:*\n>${lead.message.replace(/\n/g, "\n> ")}`,
      },
    },
    {
      type: "actions",
      block_id: `lead_actions_${lead.id}`,
      elements: [
        {
          type: "button",
          text: { type: "plain_text", text: "📞 Contacted", emoji: true },
          action_id: "lead_mark_contacted",
          value: JSON.stringify({ leadId: lead.id }),
          style: "primary",
        },
        {
          type: "button",
          text: { type: "plain_text", text: "⭐ Qualify", emoji: true },
          action_id: "lead_mark_qualified",
          value: JSON.stringify({ leadId: lead.id }),
        },
        {
          type: "button",
          text: { type: "plain_text", text: "📁 Create Client", emoji: true },
          action_id: "lead_convert_client",
          value: JSON.stringify({ leadId: lead.id }),
        },
        {
          type: "button",
          text: { type: "plain_text", text: "CRM ↗", emoji: true },
          action_id: "open_lead_crm",
          url: `https://harleydigitalworks.com/admin/leads?id=${lead.id}`,
        },
      ],
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `Source: \`${lead.source}\` · Received: <!date^${Math.floor(
            new Date(lead.createdAt).getTime() / 1000,
          )}^{date_num} {time_secs}|${lead.createdAt}>${
            options?.jobId ? ` · Queue Job: \`${options.jobId.slice(0, 8)}\`` : ""
          }`,
        },
      ],
    },
  ];
}

/**
 * Founder Command Centre Daily Briefing & KPI Digest
 */
export function buildFounderDailyDigest(digest: FounderDigestData): SlackBlock[] {
  const capacityPct = Math.round((digest.activeBuildsCount / digest.maxBuildCapacity) * 100);
  const capacityStatus =
    digest.activeBuildsCount >= digest.maxBuildCapacity
      ? "🔴 *CAPACITY REACHED* (Protect NHS / Part-time balance)"
      : digest.activeBuildsCount === digest.maxBuildCapacity - 1
        ? "🟡 *NEAR CAPACITY* (1 Build slot remaining)"
        : "🟢 *CAPACITY HEALTHY* (Slots available for intake)";

  const healthEmoji =
    digest.systemHealthStatus === "healthy"
      ? "✅ Healthy"
      : digest.systemHealthStatus === "warning"
        ? "⚠️ Warning"
        : "❌ Alert";

  const blocks: SlackBlock[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "👑 Founder Command Centre · Daily Operating Digest",
        emoji: true,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `Briefing generated: *${digest.generatedAt}* · Target Operating Model: *Managed by Exception*`,
        },
      ],
    },
    { type: "divider" },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Verified Active MRR:*\n*£${digest.verifiedMRR.toLocaleString("en-GB", {
            minimumFractionDigits: 2,
          })}* (${digest.activeClientsCount} active clients)`,
        },
        {
          type: "mrkdwn",
          text: `*Active Builds in Flight:*\n*${digest.activeBuildsCount} / ${digest.maxBuildCapacity}* (${capacityPct}% cap)\n${capacityStatus}`,
        },
        {
          type: "mrkdwn",
          text: `*Sales Pipeline:*\n*${digest.newLeadsCount}* Total (${digest.uncontactedLeadsCount} uncontacted)`,
        },
        {
          type: "mrkdwn",
          text: `*System & Edge Health:*\n${healthEmoji}\n_${digest.systemHealthSummary}_`,
        },
      ],
    },
    { type: "divider" },
  ];

  // Outstanding Approvals
  if (digest.pendingApprovals.length > 0) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*🚨 Action Required: ${digest.pendingApprovals.length} Outstanding Approval(s)*\n${digest.pendingApprovals
          .map((a) => `• *${a.title}* (\`${a.type}\`)`)
          .join("\n")}`,
      },
    });
  } else {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*✨ No Outstanding Approvals:* Standard delivery progressing automatically.",
      },
    });
  }

  // Active Exceptions
  if (digest.recentExceptions.length > 0) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*⚠️ Exceptions Monitored (${digest.recentExceptions.length}):*\n${digest.recentExceptions
          .map((e) => `• [${e.severity.toUpperCase()}] *${e.title}* — Category: _${e.category}_`)
          .join("\n")}`,
      },
    });
  }

  // Quick Action Buttons
  blocks.push(
    {
      type: "actions",
      block_id: "digest_command_actions",
      elements: [
        {
          type: "button",
          text: { type: "plain_text", text: "🔄 Refresh Digest", emoji: true },
          action_id: "request_digest_refresh",
        },
        {
          type: "button",
          text: { type: "plain_text", text: "📬 Uncontacted Leads", emoji: true },
          action_id: "view_uncontacted_leads",
          style: "primary",
        },
        {
          type: "button",
          text: { type: "plain_text", text: "🩺 Run Diagnostics", emoji: true },
          action_id: "trigger_system_diagnostics",
        },
        {
          type: "button",
          text: { type: "plain_text", text: "Admin Centre ↗", emoji: true },
          action_id: "open_admin_center",
          url: "https://harleydigitalworks.com/admin",
        },
      ],
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "Use `/thg status`, `/thg leads`, or `/thg retry` anytime in Slack.",
        },
      ],
    },
  );

  return blocks;
}

/**
 * Operational Exception & Automation Alert Card
 */
export function buildExceptionAlert(alert: ExceptionAlertData): SlackBlock[] {
  const severityBadge =
    alert.severity === "high"
      ? "🔴 HIGH SEVERITY"
      : alert.severity === "medium"
        ? "🟡 MEDIUM SEVERITY"
        : "ℹ️ INFO";

  const blocks: SlackBlock[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `⚠️ Operational Exception · ${alert.category.toUpperCase()}`,
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${severityBadge}*\n*${alert.title}*\n${alert.description}`,
      },
    },
  ];

  if (alert.stackOrDetails) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Error Detail:*\n\`\`\`${alert.stackOrDetails.slice(0, 500)}\`\`\``,
      },
    });
  }

  const actionElements: SlackBlockElement[] = [];

  if (alert.actionId && alert.actionLabel) {
    actionElements.push({
      type: "button",
      text: { type: "plain_text", text: alert.actionLabel, emoji: true },
      action_id: alert.actionId,
      value: alert.actionValue || alert.id,
      style: alert.severity === "high" ? "danger" : "primary",
    });
  }

  actionElements.push({
    type: "button",
    text: { type: "plain_text", text: "✅ Acknowledge", emoji: true },
    action_id: "ack_exception",
    value: alert.id,
  });

  if (alert.adminUrl) {
    actionElements.push({
      type: "button",
      text: { type: "plain_text", text: "Inspect in Admin ↗", emoji: true },
      action_id: "open_exception_admin",
      url: alert.adminUrl,
    });
  }

  blocks.push({
    type: "actions",
    block_id: `exception_actions_${alert.id}`,
    elements: actionElements,
  });

  return blocks;
}

/**
 * Founder Approval Request Card
 */
export function buildApprovalRequest(approval: ApprovalRequestData): SlackBlock[] {
  const blocks: SlackBlock[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `📝 Approval Required · ${approval.title}`,
        emoji: true,
      },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Target / Client:*\n*${approval.clientOrEntityName}*`,
        },
        {
          type: "mrkdwn",
          text: `*Requested By:*\n${approval.requestedBy}`,
        },
        {
          type: "mrkdwn",
          text: `*Approval Type:*\n\`${approval.type}\``,
        },
        {
          type: "mrkdwn",
          text: `*Ref ID:*\n\`${approval.approvalId}\``,
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Context & Justification:*\n${approval.details}`,
      },
    },
  ];

  const actionElements: SlackBlockElement[] = [
    {
      type: "button",
      text: { type: "plain_text", text: "✅ Approve & Proceed", emoji: true },
      action_id: "approve_founder_request",
      value: JSON.stringify({ approvalId: approval.approvalId, type: approval.type }),
      style: "primary",
    },
    {
      type: "button",
      text: { type: "plain_text", text: "❌ Request Changes", emoji: true },
      action_id: "reject_founder_request",
      value: JSON.stringify({ approvalId: approval.approvalId, type: approval.type }),
      style: "danger",
    },
  ];

  if (approval.previewUrl) {
    actionElements.push({
      type: "button",
      text: { type: "plain_text", text: "Preview Staging ↗", emoji: true },
      action_id: "view_staged_preview",
      url: approval.previewUrl,
    });
  }

  blocks.push({
    type: "actions",
    block_id: `approval_actions_${approval.approvalId}`,
    elements: actionElements,
  });

  return blocks;
}

/**
 * Billing & Payment Milestone Card
 */
export function buildBillingAlert(billing: BillingAlertData): SlackBlock[] {
  const milestoneLabel =
    billing.milestoneType === "deposit_50"
      ? "50% Setup Deposit Received"
      : billing.milestoneType === "balance_50"
        ? "50% Completion Balance Received"
        : billing.milestoneType === "monthly_care"
          ? "Monthly Digital Care Subscription Payment"
          : "⚠️ Payment Exception / Failed Transaction";

  const emoji = billing.milestoneType === "failed_payment" ? "🚨" : "💰";

  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `${emoji} ${milestoneLabel}`,
        emoji: true,
      },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Client / Trade:*\n*${billing.clientName}*`,
        },
        {
          type: "mrkdwn",
          text: `*Gross Collected (inc. VAT):*\n*£${billing.grossPounds.toFixed(2)}*`,
        },
        {
          type: "mrkdwn",
          text: `*Net Amount:*\n£${billing.amountPounds.toFixed(2)}`,
        },
        {
          type: "mrkdwn",
          text: `*20% UK VAT:*\n£${billing.vatPounds.toFixed(2)}`,
        },
      ],
    },
    ...(billing.notes
      ? [
          {
            type: "section" as const,
            text: {
              type: "mrkdwn" as const,
              text: `*Notes:*\n${billing.notes}`,
            },
          },
        ]
      : []),
    {
      type: "actions",
      block_id: `billing_actions_${billing.invoiceReference || "tx"}`,
      elements: [
        {
          type: "button",
          text: { type: "plain_text", text: "View Invoices ↗", emoji: true },
          action_id: "open_invoices_admin",
          url: "https://harleydigitalworks.com/admin/invoices",
        },
      ],
    },
  ];
}

/**
 * In-place resolution card returned after founder clicks an action button
 */
export function buildActionResolutionBlock(options: {
  actionTitle: string;
  user: string;
  timestamp: string;
  statusText: string;
  originalText?: string;
}): SlackBlock[] {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${options.actionTitle}*\n${options.statusText}`,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `Action executed by *${options.user}* at *${options.timestamp}* · Database updated`,
        },
      ],
    },
  ];
}
