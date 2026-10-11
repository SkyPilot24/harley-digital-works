import test from "node:test";
import assert from "node:assert/strict";

import { verifySlackSignature } from "../src/lib/slack/verify.ts";
import {
  buildLeadCard,
  buildFounderDailyDigest,
  buildExceptionAlert,
  buildApprovalRequest,
  buildBillingAlert,
  buildActionResolutionBlock,
} from "../src/lib/slack/blocks.ts";
import { handleSlackCommand } from "../src/lib/slack/commands.ts";
import { handleSlackBlockAction } from "../src/lib/slack/actions.ts";
import { sendSlackMessage } from "../src/lib/slack/dispatcher.ts";

test("verifySlackSignature enforces HMAC-SHA256 and replay protection", async () => {
  const secret = "test_signing_secret_12345";
  const now = Math.floor(Date.now() / 1000);
  const body = "command=/thg&text=status";

  // Calculate valid signature
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(`v0:${now}:${body}`));
  const hashHex = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const validSig = `v0=${hashHex}`;

  // 1. Valid signature passes
  const validResult = await verifySlackSignature({
    signingSecret: secret,
    signatureHeader: validSig,
    timestampHeader: String(now),
    rawBody: body,
    nowInSeconds: now,
  });
  assert.equal(validResult.valid, true);

  // 2. Tampered body fails
  const tamperedResult = await verifySlackSignature({
    signingSecret: secret,
    signatureHeader: validSig,
    timestampHeader: String(now),
    rawBody: body + "&tampered=true",
    nowInSeconds: now,
  });
  assert.equal(tamperedResult.valid, false);

  // 3. Expired timestamp (> 300s) fails replay check
  const expiredResult = await verifySlackSignature({
    signingSecret: secret,
    signatureHeader: validSig,
    timestampHeader: String(now - 301),
    rawBody: body,
    nowInSeconds: now,
  });
  assert.equal(expiredResult.valid, false);
  assert.match(expiredResult.reason, /replay/i);

  // 4. Missing secret or headers fails gracefully
  const missingResult = await verifySlackSignature({
    signingSecret: "",
    signatureHeader: validSig,
    timestampHeader: String(now),
    rawBody: body,
  });
  assert.equal(missingResult.valid, false);
});

test("Block Kit builders format interactive Slack elements correctly", () => {
  // 1. Lead Card
  const leadBlocks = buildLeadCard({
    id: "lead_test_001",
    brand: "Harley Digital Works",
    name: "John Miller",
    company: "Miller Electrical Bath",
    email: "john@miller-bath.test",
    packageInterest: "Managed Digital Presence (£1,495 + £249/mo)",
    message: "Need a high authority website and review collection setup.",
    source: "contact_form",
    createdAt: "2026-10-07T12:00:00Z",
  });

  assert.equal(leadBlocks[0].type, "header");
  assert.match(leadBlocks[0].text.text, /Harley Digital Works/);
  const actionsBlock = leadBlocks.find((b) => b.type === "actions");
  assert.ok(actionsBlock);
  const actionIds = actionsBlock.elements.map((el) => el.action_id);
  assert.ok(actionIds.includes("lead_mark_contacted"));
  assert.ok(actionIds.includes("lead_mark_qualified"));
  assert.ok(actionIds.includes("lead_convert_client"));
  assert.ok(actionIds.includes("open_lead_crm"));

  // 2. Founder Daily Digest
  const digestBlocks = buildFounderDailyDigest({
    generatedAt: "07/10/2026 08:00 BST",
    verifiedMRR: 1245.0,
    activeClientsCount: 5,
    activeBuildsCount: 2,
    maxBuildCapacity: 3,
    newLeadsCount: 4,
    uncontactedLeadsCount: 1,
    qualifiedPipelineCount: 2,
    stuckJobsCount: 0,
    recentExceptions: [
      {
        title: "1 uncontacted lead awaiting trade qualification",
        category: "lead",
        severity: "medium",
      },
    ],
    pendingApprovals: [
      {
        id: "proj_99",
        title: "Bristol Spark Ltd Staged Preview",
        type: "project_review",
      },
    ],
    systemHealthStatus: "healthy",
    systemHealthSummary: "Cloudflare Edge 200 OK",
  });

  assert.equal(digestBlocks[0].type, "header");
  assert.match(digestBlocks[0].text.text, /Founder Command Centre/);
  const digestActions = digestBlocks.find((b) => b.type === "actions");
  assert.ok(digestActions);
  const digestActionIds = digestActions.elements.map((el) => el.action_id);
  assert.ok(digestActionIds.includes("request_digest_refresh"));
  assert.ok(digestActionIds.includes("view_uncontacted_leads"));
  assert.ok(digestActionIds.includes("trigger_system_diagnostics"));

  // 3. Exception Alert
  const alertBlocks = buildExceptionAlert({
    id: "exc_01",
    category: "automation",
    severity: "high",
    title: "Slack Queue Job Leased Timeout",
    description: "Worker retrying with exponential backoff.",
    actionLabel: "🔄 Retry Process",
    actionId: "retry_failed_job",
    actionValue: "job_01",
    adminUrl: "https://harleydigitalworks.com/admin/diagnostics",
  });
  assert.equal(alertBlocks[0].type, "header");
  assert.match(alertBlocks[0].text.text, /Operational Exception/);

  // 4. Billing Alert
  const billingBlocks = buildBillingAlert({
    milestoneType: "deposit_50",
    clientName: "Apex Heating Ltd",
    amountPounds: 747.5,
    vatPounds: 149.5,
    grossPounds: 897.0,
    invoiceReference: "INV-2026-004",
  });
  assert.match(billingBlocks[0].text.text, /50% Setup Deposit Received/);
});

test("Slack action resolution block renders user attribution and timestamp", () => {
  const resolution = buildActionResolutionBlock({
    actionTitle: "Lead Contacted",
    user: "Robbie",
    timestamp: "14:45",
    statusText: "Lead is now in Contacted state.",
  });

  assert.equal(resolution.length, 2);
  assert.match(resolution[0].text.text, /Lead Contacted/);
  assert.match(resolution[1].elements[0].text, /Robbie/);
  assert.match(resolution[1].elements[0].text, /14:45/);
});

test("handleSlackCommand returns command reference and handles digest fallback", async () => {
  // 1. /thg help returns command documentation
  const helpResult = await handleSlackCommand({
    command: "/thg",
    text: "help",
    user_name: "robbie",
  });
  assert.match(helpResult.text, /Founder Slack Commands/);
  assert.match(helpResult.text, /\/thg status/);
  assert.match(helpResult.text, /\/thg leads/);
  assert.match(helpResult.text, /\/thg builds/);
  assert.match(helpResult.text, /\/thg retry/);

  // 2. /thg status generates valid digest card even with fallback database
  const statusResult = await handleSlackCommand({
    command: "/thg",
    text: "status",
    user_name: "robbie",
  });
  assert.ok(statusResult.blocks);
  assert.match(statusResult.text, /Founder Command Centre/);
});

test("sendSlackMessage handles webhook validation, fallback, and disabled flag", async () => {
  // 1. Disabled flag returns ok without making request
  const disabledRes = await sendSlackMessage(
    "#founder-command",
    { text: "Test message" },
    { enabled: false },
  );
  assert.equal(disabledRes.ok, true);

  // 2. Invalid webhook url fails validation
  const invalidRes = await sendSlackMessage(
    "#system-alerts",
    { text: "Test message" },
    {
      enabled: true,
      defaultWebhookUrl: "https://evil.com/webhook",
    },
  );
  assert.equal(invalidRes.ok, false);
  assert.match(invalidRes.error, /Invalid Slack webhook URL/);

  // 3. Valid webhook posts cleanly
  let postedBody = null;
  const validRes = await sendSlackMessage(
    "#founder-command",
    { text: "Operational Alert" },
    {
      enabled: true,
      defaultWebhookUrl: "https://hooks.slack.com/services/T00/B00/VALID",
      fetchFn: async (url, init) => {
        postedBody = JSON.parse(init.body);
        return new Response("ok", { status: 200 });
      },
    },
  );
  assert.equal(validRes.ok, true);
  assert.equal(postedBody.text, "Operational Alert");
});
