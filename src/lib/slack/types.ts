/**
 * Slack Integration & Command Centre Types
 * The Harley Group & Harley Digital Works
 */

export type SlackChannel =
  | "#founder-command"
  | "#sales"
  | "#new-leads"
  | "#customers"
  | "#operations"
  | "#finance-alerts"
  | "#system-alerts"
  | "#automation-alerts"
  | "#deployments";

export interface SlackTextObject {
  type: "plain_text" | "mrkdwn";
  text: string;
  emoji?: boolean;
  verbatim?: boolean;
}

export interface SlackButtonElement {
  type: "button";
  text: SlackTextObject;
  action_id: string;
  value?: string;
  url?: string;
  style?: "primary" | "danger";
  confirm?: {
    title: SlackTextObject;
    text: SlackTextObject;
    confirm: SlackTextObject;
    deny: SlackTextObject;
  };
}

export type SlackBlockElement = SlackButtonElement;

export interface SlackHeaderBlock {
  type: "header";
  text: SlackTextObject;
}

export interface SlackSectionBlock {
  type: "section";
  text?: SlackTextObject;
  fields?: SlackTextObject[];
  accessory?: SlackBlockElement;
}

export interface SlackActionsBlock {
  type: "actions";
  block_id?: string;
  elements: SlackBlockElement[];
}

export interface SlackContextBlock {
  type: "context";
  elements: (SlackTextObject | { type: "image"; image_url: string; alt_text: string })[];
}

export interface SlackDividerBlock {
  type: "divider";
}

export type SlackBlock =
  SlackHeaderBlock | SlackSectionBlock | SlackActionsBlock | SlackContextBlock | SlackDividerBlock;

export interface SlackMessagePayload {
  channel?: string;
  text: string;
  blocks?: SlackBlock[];
  unfurl_links?: boolean;
  unfurl_media?: boolean;
  thread_ts?: string;
}

export interface SlackUser {
  id: string;
  username: string;
  name: string;
  team_id?: string;
}

export interface SlackInteractiveAction {
  action_id: string;
  block_id?: string;
  text?: SlackTextObject;
  value?: string;
  action_ts?: string;
  type: string;
}

export interface SlackInteractionPayload {
  type: "block_actions" | "view_submission" | "shortcut";
  user: SlackUser;
  api_app_id?: string;
  token?: string;
  container?: Record<string, unknown>;
  trigger_id?: string;
  team?: { id: string; domain: string };
  channel?: { id: string; name: string };
  message?: {
    ts: string;
    text: string;
    blocks?: SlackBlock[];
  };
  response_url?: string;
  actions: SlackInteractiveAction[];
}

export interface SlackCommandPayload {
  token?: string;
  team_id?: string;
  team_domain?: string;
  channel_id?: string;
  channel_name?: string;
  user_id?: string;
  user_name?: string;
  command: string;
  text: string;
  api_app_id?: string;
  response_url?: string;
  trigger_id?: string;
}

export interface FounderDigestData {
  generatedAt: string;
  verifiedMRR: number;
  activeClientsCount: number;
  activeBuildsCount: number;
  maxBuildCapacity: number;
  newLeadsCount: number;
  uncontactedLeadsCount: number;
  qualifiedPipelineCount: number;
  stuckJobsCount: number;
  recentExceptions: {
    title: string;
    category: string;
    severity: "high" | "medium" | "info";
  }[];
  pendingApprovals: {
    id: string;
    title: string;
    type: "project_review" | "custom_quote" | "invoice_release";
  }[];
  systemHealthStatus: "healthy" | "warning" | "error";
  systemHealthSummary: string;
}

export interface ExceptionAlertData {
  id: string;
  category: "lead" | "automation" | "project" | "capacity" | "billing" | "system";
  severity: "high" | "medium" | "info";
  title: string;
  description: string;
  stackOrDetails?: string;
  actionLabel?: string;
  actionId?: string;
  actionValue?: string;
  adminUrl?: string;
}

export interface ApprovalRequestData {
  approvalId: string;
  type: "project_launch" | "custom_proposal" | "expense" | "dns_switch";
  title: string;
  clientOrEntityName: string;
  details: string;
  previewUrl?: string;
  requestedBy: string;
}

export interface BillingAlertData {
  milestoneType: "deposit_50" | "balance_50" | "monthly_care" | "failed_payment";
  clientName: string;
  amountPounds: number;
  vatPounds: number;
  grossPounds: number;
  invoiceReference?: string;
  notes?: string;
}

export interface LeadEnquiryData {
  id: string;
  brand: "Harley Digital Works" | "The Harley Group";
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  website?: string | null;
  packageInterest?: string | null;
  enquiryContext?: string | null;
  message: string;
  source: string;
  createdAt: string;
}
