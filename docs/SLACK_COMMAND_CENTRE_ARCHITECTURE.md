# Slack Operational Command Centre — Architecture & Systems Integration Guide

**Document Version:** 1.0  
**Date:** 7 October 2026  
**Status:** Mixed implementation and proposed design; see current operating limits below
**Governing Context:** [BUSINESS_DEFINITION.md](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/BUSINESS_DEFINITION.md), [PROJECT_STATUS.md](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/PROJECT_STATUS.md), [docs/COMMERCIAL_OFFER_MANAGED.md](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/docs/COMMERCIAL_OFFER_MANAGED.md)

---

## 1. Executive Summary & Founder Operating Model

### Current operating limits — 14 October 2026

The recorded founder preference in the 11 October integration-session handover is to keep one operational channel, `#all-the-harley-group`. The nine-channel matrix below is retained as a historical design proposal, not proof of deployed channels or permission to create them. Later `#sales` references require destination reconciliation; this review changes no Slack settings and sends no messages. Current live topology was not rechecked.

Digest times in this guide, the chief-of-staff schedule and the outreach schedule describe different jobs. Repository `nitro.config.ts` contains outreach cron `0 9 * * 1-5`; that expression alone does not prove 09:00 Europe/London execution or daylight-saving handling. The 14 October mirror briefing reports a timing discrepancy and unconfirmed send acknowledgement. Verify each scheduler's timezone, observed run timestamp and delivery acknowledgement before claiming unattended acceptance. No schedule altered here.

The Harley Group operates as the umbrella holding company; Harley Digital Works delivers managed website and digital operations services for UK trade contractors. The founder, Robbie Harley, manages the business alongside an NHS clinical career.

**Operating Mandate:** To eliminate constant dashboard context switching (Supabase, Stripe, Cloudflare, GitHub, CRM, Analytics), Slack is established as the founder's primary operational command cockpit. The business is architected for **Management by Exception**:

1. **Standard cases advance automatically** under defined commercial and quality rules without requiring manual approval for routine steps.
2. **Robbie retains high-level oversight** via a structured 08:00 daily executive briefing.
3. **Exceptions and approvals require 1-click Slack interactive resolution** rather than context switching into multiple web applications.

---

## 2. Operational Channel Topology & Routing Matrix

The historical expansion proposal specifies nine channels and notification rules. It remains unapproved for rollout under the recorded single-channel preference:

| Channel                  | Purpose                                                                              | Traffic Source                                                     | Interactive Controls                                            | Severity Tier                  |
| :----------------------- | :----------------------------------------------------------------------------------- | :----------------------------------------------------------------- | :-------------------------------------------------------------- | :----------------------------- |
| **`#founder-command`**   | Founder executive cockpit; private channel for Robbie                                | Scheduled daily digest, urgent approvals, high-severity exceptions | Slash commands (`/thg`), approve/reject buttons, refresh digest | Tier 1 (Urgent / Founder Only) |
| **`#sales`**             | Qualified pipeline, proposals generated, and deals won                               | Lead qualification events, proposal generation                     | `Create Client`, `View in CRM`                                  | Tier 2 (Commercial)            |
| **`#new-leads`**         | Inbound enquiries from HDW & THG website contact forms                               | Durable outbox delivery worker (`lead-notifications`)              | `📞 Contacted`, `⭐ Qualify`, `📁 Create Client`                | Tier 2 (Action Required)       |
| **`#customers`**         | Client onboarding, care desk tickets, monthly 30-min edit batches                    | Client portal submissions, `/care-desk` form                       | `Triage`, `Acknowledge`, `Assign`                               | Tier 2 (Client Support)        |
| **`#operations`**        | Active project delivery, 14-day SLA tracking, staged previews                        | Build stage transitions, SLA milestone monitors                    | `Sign-Off Preview`, `Open Staging`                              | Tier 2 (Delivery)              |
| **`#finance-alerts`**    | 50% deposits (£747.50), 50% balances (£747.50), £249/mo care debits, failed payments | Billing events, invoice requests                                   | `View Invoice`, `Retry Charge`                                  | Tier 1 (Financial)             |
| **`#system-alerts`**     | Route uptime, HTTP 500/404 errors, Edge SSR health, SSL status                       | 30-min diagnostic scans, SSR error wrapper                         | `Run Diagnostics`, `Inspect Route`                              | Tier 2 (Technical)             |
| **`#automation-alerts`** | Durable queue lease timeouts, webhook failures, retries                              | Scheduled worker retry monitors                                    | `🔄 Retry Job Now`, `Acknowledge`                               | Tier 2 (Automation)            |
| **`#deployments`**       | Cloudflare Worker deployments, GitHub main builds, migrations                        | CI/CD pipelines, release automation                                | `View Commit`, `Rollback`                                       | Tier 3 (Informational)         |

---

## 3. Two-Way Interactive Slack Workflows

Rather than passive notifications, all major signals in Slack are interactive Block Kit components that execute server-side business logic and update records idempotently:

```
+-------------------------------------------------------------------------+
| [⚡ New Enquiry · Harley Digital Works]                                 |
| Reference: lead_d7f9a12b       Business: Vance Electrical Bath Ltd      |
| Contact: Alex Vance            Interest: Managed (£1,495 + £249/mo)    |
| Message: Looking for a complete website overhaul and review booster... |
|                                                                         |
| [📞 Contacted]  [⭐ Qualify]  [📁 Create Client Workspace]  [CRM ↗]     |
+-------------------------------------------------------------------------+
                                    │
                                    │ (Button Click)
                                    ▼
       POST /api/slack/interactions (HMAC-SHA256 Verified)
                                    │
            ┌───────────────────────┴───────────────────────┐
            ▼                                               ▼
Update Supabase State                             In-Place Message Update
(e.g., status = 'qualified')                      "Action executed by Robbie at 14:45"
```

### Supported Interactive Actions:

1. **`lead_mark_contacted`**: Sets lead status to `contacted`.
2. **`lead_mark_qualified`**: Transitions lead into active sales pipeline (`qualified`).
3. **`lead_convert_client`**: Creates idempotent client workspace via `ensureClientWorkspace(lead)` without assuming unconfirmed revenue.
4. **`approve_founder_request`**: Approves staged preview sign-offs or DNS switches; updates project status to `launched`.
5. **`reject_founder_request`**: Flags required revisions and returns project status to `in_progress`.
6. **`retry_failed_job`**: Clears lease token and resets `attempts = 0` on stuck notification outbox records for immediate reprocessing.
7. **`request_digest_refresh`**: Recalculates live MRR, build counts, and pipeline, replacing the digest card in-place.

---

## 4. Founder Slash Command Reference

Robbie can inspect and command the entire operation from mobile or desktop Slack by typing `/thg` commands:

| Command                                | Action & Response                                                                                                                                                                               |
| :------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`/thg status`** or **`/thg digest`** | Displays the real-time **Founder Command Centre Briefing**: verified active MRR (£), active builds vs. 3-build part-time capacity cap, pipeline totals, outstanding approvals, and edge health. |
| **`/thg leads`**                       | Lists recent enquiries with 1-click Contacted, Qualify, and Convert Client buttons.                                                                                                             |
| **`/thg builds`**                      | Displays all projects in flight with 14-day SLA progress and staged preview links.                                                                                                              |
| **`/thg approvals`**                   | Lists pending sign-offs (staged previews, custom proposals).                                                                                                                                    |
| **`/thg retry`**                       | Immediately resets and re-queues any stuck outbox notification jobs.                                                                                                                            |
| **`/thg help`**                        | Displays the command palette and operational documentation.                                                                                                                                     |

---

## 5. Daily Founder Command Centre Experience

Every morning at **08:00 UK Time**, a scheduled Nitro task (`founder-daily-digest`) executes on Cloudflare Workers and delivers the executive briefing to `#founder-command`:

1. **Verified Active MRR:** Strictly sums active clients (`status = 'active'`) with non-zero monthly values; excludes unverified pipeline or lead interests.
2. **Capacity Gauge (Cap: 3 Builds):**
   - 🟢 `1/3 Builds Active`: Capacity healthy for new intake.
   - 🟡 `2/3 Builds Active`: 1 build slot remaining.
   - 🔴 `3/3 Builds Active`: Hard capacity reached. Enforces founder part-time protection alongside NHS commitments.
3. **Outstanding Approvals:** Staged preview reviews awaiting sign-off prior to live DNS cutover.
4. **Sales Pipeline Highlights:** Total leads, uncontacted count, and qualified pipeline value.
5. **Automation & Edge Pulse:** Cloudflare SSR status, database connectivity, and queue retry health.
6. **Quick Interactive Actions:** `[Refresh Digest]`, `[View Leads]`, `[Run Diagnostics]`, `[Open Admin]`.

---

## 6. Systems Architecture & Security Implementation

### Endpoints

- **`POST /api/slack/events`**: Handles Slack URL verification challenge (`url_verification`).
- **`POST /api/slack/interactions`**: Receives Block Kit button and interactive submissions.
- **`POST /api/slack/commands`**: Receives slash commands (`/thg`).

### Cryptographic Security & Anti-Replay

- All inbound requests from Slack are validated using HMAC-SHA256 (`v0=...`) against `SLACK_SIGNING_SECRET`.
- Implementation uses Web Crypto API (`crypto.subtle`) for native zero-dependency compatibility in Cloudflare Workers.
- Requests with `X-Slack-Request-Timestamp` older than 300 seconds are rejected to eliminate replay attacks.
- String comparison uses constant-time comparison (`timingSafeEqual`) to prevent timing side-channel attacks.

### Transport Modes & Multiplexing

The dispatcher (`src/lib/slack/dispatcher.ts`) automatically adapts to the available credentials:

1. **Bot Token Mode (`SLACK_BOT_TOKEN`)**: Uses Slack Web API `chat.postMessage` to post directly to channel IDs.
2. **Dedicated Channel Webhook Mode (`SLACK_WEBHOOK_*`)**: Posts to dedicated webhooks per channel.
3. **Single Webhook Fallback (`SLACK_WEBHOOK_URL`)**: In existing setups where only one webhook is installed (e.g. pointing to `#all-the-harley-group` or `#founder-command`), all dispatches gracefully multiplex through that webhook while preserving fallback notification text.

---

## 7. Verification & Automated Test Coverage

The integration is fully verified by automated tests running under `npm test`:

- **`scripts/slack-integration.test.mjs`**:
  - HMAC-SHA256 signature calculation, verification, and tamper detection.
  - Replay attack window enforcement (> 300s).
  - Block Kit builders format (Lead card, Daily digest, Exception alert, Billing alert, Resolution block).
  - Slash command execution (`/thg help`, `/thg status`).
  - Transport dispatch, webhook URL validation, and graceful disabled states.
- **`scripts/lead-notifications.test.mjs`**:
  - Durable queue leasing, atomic commits, and backward-compatible Slack webhook delivery.
- **`npm run typecheck`**: Zero TypeScript errors across all Slack handlers, types, and server functions.
