/**
 * Server Functions for Slack Command Centre Admin Interface
 */

import { createServerFn } from "@tanstack/react-start";
import { fetchFounderDigestData } from "./founder-digest.ts";
import {
  dispatchFounderDailyDigest,
  dispatchLeadNotification,
  dispatchExceptionAlert,
  getSlackConfigFromEnv,
} from "./dispatcher.ts";

export const getSlackStatus = createServerFn({ method: "GET" }).handler(async () => {
  const config = getSlackConfigFromEnv();
  return {
    enabled: config.enabled,
    hasWebhook: !!config.defaultWebhookUrl,
    hasBotToken: !!config.botToken && config.botToken.startsWith("xoxb-"),
    hasSigningSecret: !!process.env.SLACK_SIGNING_SECRET,
    channels: [
      {
        name: "#founder-command",
        purpose: "Daily executive digest, urgent approvals & exceptions",
      },
      {
        name: "#new-leads",
        purpose: "Real-time inbound trade enquiries with 1-click status actions",
      },
      { name: "#sales", purpose: "Qualified leads, proposals, deal conversions" },
      { name: "#customers", purpose: "Client care requests, 30-min edit batches, onboarding" },
      { name: "#operations", purpose: "14-day SLA delivery updates, staged preview reviews" },
      {
        name: "#finance-alerts",
        purpose: "50% deposits, 50% balances, subscriptions, failed payments",
      },
      { name: "#system-alerts", purpose: "Edge health, HTTP 500/404 diagnostic checks, SSL" },
      {
        name: "#automation-alerts",
        purpose: "Durable queue retries, webhook failures, worker health",
      },
      { name: "#deployments", purpose: "Cloudflare Worker releases, GitHub branch activity" },
    ],
  };
});

export const triggerTestDailyBriefing = createServerFn({ method: "POST" }).handler(async () => {
  const digest = await fetchFounderDigestData();
  const res = await dispatchFounderDailyDigest(digest);
  return {
    ok: res.ok,
    message: res.ok
      ? "Daily briefing dispatched to #founder-command!"
      : `Dispatch failed: ${res.error || "Unknown error"}`,
  };
});

export const triggerTestLeadAlert = createServerFn({ method: "POST" }).handler(async () => {
  const res = await dispatchLeadNotification({
    id: `lead_test_${Date.now().toString(36)}`,
    brand: "Harley Digital Works",
    name: "Alex Vance (Test)",
    company: "Vance Electrical Services Ltd",
    email: "alex@vance-electrical.test",
    phone: "+44 7700 900555",
    website: "https://vance-electrical.test",
    packageInterest: "Managed Digital Presence (£1,495 + £249/mo)",
    message:
      "Looking for a complete done-for-you website and local review system for our 4-van electrical business in Bristol.",
    source: "contact_form",
    createdAt: new Date().toISOString(),
  });

  return {
    ok: res.ok,
    message: res.ok
      ? "Test lead enquiry card dispatched to #new-leads!"
      : `Dispatch failed: ${res.error || "Unknown error"}`,
  };
});

export const triggerTestExceptionAlert = createServerFn({ method: "POST" }).handler(async () => {
  const res = await dispatchExceptionAlert({
    id: `exc_test_${Date.now().toString(36)}`,
    category: "automation",
    severity: "high",
    title: "Simulated Durable Outbox Retrying (3/5 attempts)",
    description:
      "Scheduled worker encountered connection retry backoff. Founder action available via 1-click button.",
    stackOrDetails: "Error: Simulation test exception alert triggered from Admin Control Centre.",
    actionLabel: "🔄 Retry Job Now",
    actionId: "retry_failed_job",
    actionValue: "simulated_job_123",
    adminUrl: "https://harleydigitalworks.com/admin/diagnostics",
  });

  return {
    ok: res.ok,
    message: res.ok
      ? "Test exception alert dispatched to #automation-alerts & #founder-command!"
      : `Dispatch failed: ${res.error || "Unknown error"}`,
  };
});
