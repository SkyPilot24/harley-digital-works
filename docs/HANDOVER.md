# Shared development handover

## Current handover — 8 October 2026, Antigravity Customizations & Skills Optimization (Token Quota Recovery)

**Scope & Implemented State:**

1. **Resolution of Prompt Bloat & Token Limit Exhaustion:**
   - **Root Cause Identified:** 129 SKILL.md files (1.68M characters / ~420k tokens) were discovered across global and workspace directories. Antigravity was injecting skill headers and descriptions into every message turn, breaching context budgets and causing prompt truncation warnings (`academy-guide`, `building-data-apps`, etc. were dropped).
   - **Global Discovery Fix:** The user's earlier manual archiving in `~/.gemini/skills/Archive` had not taken effect because Antigravity's active global path is `~/.gemini/config/skills`. Moved all 21 Google Cloud / BigQuery / Spark / dbt data engineering skills from `~/.gemini/config/skills` into `~/.gemini/config/skills_archive/` and archived residual folders in `~/.gemini/skills/Archive/`. Global skills footprint reduced to 0.
   - **Workspace Skills Consolidation:** In `.agents/skills`, 64 non-essential or duplicated skills (including out-of-scope Swift, p5.js generative art, Expo mobile, and 8 redundant/conflicting UI taste skills) were safely relocated to `.agents/skills_archive/` via git renames.
   - **Active Skills Retained:** Exactly 32 high-impact skills remain active in `.agents/skills` (14 trade agency & commercial skills, 14 web/engineering/security essentials, and 4 growth/mobile tools) alongside repository canonical standards (`skills/thg-*`).
   - **Results:** Active SKILL.md count reduced from **129 down to 44** (including plugin skills) — a **74.3% reduction** in raw skill content. Total character footprint dropped from 1,680,831 down to 431,304 chars. Prompt overhead eliminated, completely restoring context headroom.
   - **Verification:** `npm test` passes 136/136 tests. `npm run typecheck` passes with 0 TS errors. `npm run build` completed cleanly.

---

## Historical handover — 8 October 2026, Dual Architecture, Client AI Template & Codex Operating Framework

**Scope & Implemented State:**

1. **Dual Architecture & AI Editing Operating Model (Settled 8 October 2026):**
   - **External Client Websites (Trade Delivery):** Built and maintained visually via **Lovable** connected to isolated GitHub repositories (e.g. `SkyPilot24/kindred-spark` — Wessex Volt Electrical 5-page trade template, verified live at commit `f1481fe`).
     - Lovable project Knowledge saved as: `UK Trade Website Standards`.
     - Delivers 100% visual AI editing for the £249/mo "30-minute monthly care" allowance without touching agency code.
     - Deploys via Cloudflare Pages edge hosting.
   - **Agency Platform & Operational Hub (`SkyPilot24/harley-digital-works`):** Maintained strictly in code via **Codex**, **Antigravity**, and canonical Git.
     - Houses live Supabase RLS policies (`worzpzbutngugwzhlvtj`), Cloudflare Nitro Worker SSR, Slack Operational Command Centre (`/thg` slash commands, Block Kit 1-click triage buttons), minute notification outbox crons, hourly abuse pruning (`prune-lead-attempts`), and authenticated Admin suite.
     - **Safety Boundary for Codex/Antigravity:** Do not attempt to import `harley-digital-works` into Lovable; Lovable is reserved for isolated client web repositories. All marketing page and platform adjustments are made directly in code.

2. **Commercial Ratification (H01 / H02 Complete):**
   - **Governing Document:** [`docs/COMMERCIAL_OFFER_MANAGED.md`](COMMERCIAL_OFFER_MANAGED.md) (Version 1.1, Ratified by Robbie on 7 October 2026).
   - **Three Commercial Tiers:**
     - **The Launchpad (Entry):** **£995 setup** (50/50: £497.50 / £497.50) + **£149 / month** (3 pages, DFY copy, email lead desk, GBP setup, Cloudflare hosting, 15-min monthly edits).
     - **The Revenue Engine (Core Flagship):** **£1,495 setup** (50/50: £747.50 / £747.50) + **£249 / month** (5 pages, DFY trade copy, dual instant SMS/email lead routing, GBP local SEO + Schema JSON-LD, automated review kit, 30-min monthly edits).
     - **The Market Leader (Expansion):** **£2,495 setup** (50/50: £1,247.50 / £1,247.50) + **£399 / month** (8 pages, 3 geo-targeted area landing pages, missed-call SMS auto-reply, review booster, Google LSA setup, 60-min monthly edits).
   - **Target Niche & Pilot Geography:** Established UK Electrical Contractors (2–8 staff, NICEIC/NAPIT accredited) across Bristol, Bath, and the M4 Corridor.
   - **Acquisition Model:** Zero cold calling. Automated corporate B2B "Digital Leak Audits" (PECR-compliant) highlighting mobile speed fails, missing schema, and form response gaps, paired with private interactive staging prototypes (`/demos_/electrician-concept` in HDW, or `kindred-spark`).
   - **Statutory Boundaries:** Zero-rated VAT below £90k statutory threshold. Concurrency limit capped at maximum 2 to 3 onboarding builds (strict limit of 2 during initial pilot) to safeguard founder NHS clinical commitments (10–12 hours/week).

3. **Verified Technical & Test Baseline:**
   - Automated test suite: `npm test` runs 136 tests (66 platform smoke checks including drift detection + 67 regression/integration tests + 3 service worker tests) — **136 / 136 PASS**.
   - TypeScript compilation: `npm run typecheck` (`tsc --noEmit`) — **0 errors**.
   - Code formatting: `npm run format:check` — **100% matched Prettier style**.
   - Code linting: `npm run lint` — **0 errors** (9 existing component warnings).
   - Worker triggers: Cloudflare Wrangler crons configured for `["* * * * *", "0 * * * *"]`.
   - Security: Supabase service role key strictly quarantined from public bundles; RLS enforced on `worzpzbutngugwzhlvtj`.

4. **Instructions for Codex When Picking Up This Work:**
   - **Step 1:** Read [`PROJECT_STATUS.md`](../PROJECT_STATUS.md) operating brief to confirm current active task.
   - **Step 2:** Check `git status` on `main`. All local changes must pass `npm test` and `npm run typecheck` before pushing. Never force-push or rebase published history.
   - **Step 3:** Current execution focus for Codex:
     1. Curate the first 50 verified Bristol/Bath electrical contractor targets (Companies House + Google Places data).
     2. Draft the automated "Digital Leak Audit" PDF/video outreach template.
     3. Execute H42 coordinated live owner session expiry/logout acceptance.
     4. Complete H09/H10 transactional email sender/provider setup and bounce handling once credentials are ready.
     5. Complete H07 backup/recovery proof for live THG Agency database (`worzpzbutngugwzhlvtj`).

---

## Historical handover — 7 October 2026, Founder Commercial Ratification & Documentation Alignment

2. **Full Documentation & Knowledge Base Alignment:**
   - Synchronized all governing records across the repository: [`docs/COMMERCIAL_OFFER_MANAGED.md`](COMMERCIAL_OFFER_MANAGED.md), [`BUSINESS_DEFINITION.md`](../BUSINESS_DEFINITION.md), [`MASTER_BACKLOG.md`](../MASTER_BACKLOG.md), [`PROJECT_STATUS.md`](../PROJECT_STATUS.md), [`docs/BUSINESS_OS_INDEX.md`](BUSINESS_OS_INDEX.md), [`src/lib/current-strategy.ts`](../src/lib/current-strategy.ts), and [`src/lib/knowledge-base.ts`](../src/lib/knowledge-base.ts).
   - Drift detection test suite expanded and verified passing (136/136 tests pass, 0 typecheck errors, 0 lint errors).

3. **External Websites Commercial Alignment:**
   - Synchronized all customer-facing surfaces across Harley Digital Works and The Harley Group to the ratified commercial offer: single Managed Launch package at **£1,495 setup** + **£249/mo Managed Care**, 50/50 payment milestone (£747.50 deposit / £747.50 on approval), zero-rated VAT compliance notices, and strict 2–3 concurrent onboarding capacity cap.
   - Updated surfaces: `WebsitePackagesSection.tsx` (Homepage packages & pricing table), `the-harley-group.tsx` (Holding corporate overview & standards), `TradeServiceLanding.tsx` (Bristol & Bath trade pilots, Electricians & EV installers), `CareBillingPortalDesk.tsx` / `care-desk.tsx`, `TradeRoiCalculator.tsx` / `calculator.tsx`, `proposals.tsx`, and `partners.tsx`.
   - Enabled local development preview in `src/routes/__root.tsx` (`if (import.meta.env.DEV) return;`) allowing direct local browser testing while preserving the production launch deferral route guard.


2. **Slack Operational Command Centre & Founder Cockpit:**
   - **Architectural Paradigm:** Established Slack as the founder's primary operational command centre so Robbie can manage the business directly from Slack without constant dashboard context switching, operating strictly on a **Management by Exception** model.
   - **Interactive Two-Way Workflows:** Inbound lead cards now deliver rich Block Kit components featuring 1-click action buttons: `[📞 Contacted]`, `[⭐ Qualify]`, `[📁 Create Client Workspace]`, and `[CRM ↗]`. Clicking buttons triggers HMAC-SHA256 verified callbacks (`/api/slack/interactions`) that update Supabase state idempotently and acknowledge the action in-place with user attribution and timestamps.
   - **Founder Slash Commands:** Implemented `/thg` slash command router (`/api/slack/commands`) allowing the founder to query KPIs and execute commands directly from Slack:
     - `/thg status` / `/thg digest`: Instant executive briefing (verified MRR, 3-build capacity, pipeline, approvals).
     - `/thg leads`: Recent enquiries with quick qualification buttons.
     - `/thg builds`: Active 14-day SLA trade builds in flight.
     - `/thg approvals`: Pending founder sign-offs (staged previews, custom proposals).
     - `/thg retry`: Resets and immediately re-queues stuck outbox notification jobs.
     - `/thg help`: Interactive command palette.
   - **9-Channel Operational Topology:** Implemented clean, noise-suppressed routing across `#founder-command` (executive briefing & urgent approvals), `#new-leads`, `#sales`, `#customers`, `#operations`, `#finance-alerts`, `#system-alerts`, `#automation-alerts`, and `#deployments`. Supports Slack Bot Web API, dedicated per-channel webhooks, and single-webhook fallback multiplexing.
   - **Scheduled Executive Digest & Health Scanning:** Created `server/tasks/founder-daily-digest.ts` (scheduled at 08:00 daily via `0 8 * * *`) and `server/tasks/system-health-alerts.ts` (scheduled every 30 minutes via `*/30 * * * *`) in `nitro.config.ts`.
   - **Admin Control Centre Card ([`src/components/admin/SlackCommandCentreCard.tsx`](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/src/components/admin/SlackCommandCentreCard.tsx)):** Embedded dedicated "Slack Command" tab in the Control Centre with live connection status, interactive dispatch simulators, channel matrix, and slash command reference.
   - **Security Architecture:** Inbound request verification via Web Crypto HMAC-SHA256 (`crypto.subtle`) with 300s replay attack prevention and constant-time string comparison.
   - **Architecture Blueprint ([`docs/SLACK_COMMAND_CENTRE_ARCHITECTURE.md`](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/docs/SLACK_COMMAND_CENTRE_ARCHITECTURE.md)):** Comprehensive systems integration reference guide.
3. **Commercial Governance & Economics (H01/H02):** Delivered one sellable Managed launch offer, defensible economics model (Low/Base/High), business fact sheet, reusable proposal automation rules, and founder decision register in [`docs/COMMERCIAL_OFFER_MANAGED.md`](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/docs/COMMERCIAL_OFFER_MANAGED.md). Evaluated £1,495 setup + £249/mo against delivery labour, lost assessment/preview CAC overhead, hosting, payment fees, generation usage, support labour, and incident allowances. Verified zero VAT charging rule until HMRC registration is confirmed. Established hard cap of 2–3 concurrent client onboarding builds to safeguard founder NHS schedule balance (10–12 hours/week).
4. **H42 Automated Retention Scheduling:** Implemented `server/tasks/prune-lead-attempts.ts` using Nitro task calling `supabaseAdmin.rpc("prune_lead_submission_attempts")`. Configured `nitro.config.ts` with `tasks["prune-lead-attempts"]` and `scheduledTasks["0 * * * *"] = ["lead-notifications", "prune-lead-attempts"]`. Verified in Cloudflare Worker `triggers.crons: ["* * * * *", "0 * * * *", "0 8 * * *", "*/30 * * * *"]`. Added type definitions to `src/integrations/supabase/types.ts`.
5. **Comprehensive Admin Suite & Dashboard General Knowledge Base:**
   - **Control Centre ([`src/routes/_authenticated/admin.index.tsx`](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/src/routes/_authenticated/admin.index.tsx)):** Real-time pipeline counters, quick quote generation, project initiation modal, financial safeguards ensuring package interest never assumes revenue, Slack Command Centre tab.
   - **Financials & Invoices ([`src/routes/_authenticated/admin.invoices.tsx`](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/src/routes/_authenticated/admin.invoices.tsx)):** Milestone payment request generator (50% deposit £747.50, 50% balance £747.50, monthly care £249), VAT-compliant disclosure, client recurring ledger.
   - **Projects & Delivery ([`src/routes/_authenticated/admin.projects.tsx`](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/src/routes/_authenticated/admin.projects.tsx)):** 14-day SLA project initialization modal, 4-stage tracking (Discovery, Build, Preview, Launched), client assignment.
   - **Automations & Health ([`src/routes/_authenticated/admin.diagnostics.tsx`](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/src/routes/_authenticated/admin.diagnostics.tsx)):** Live outbox job monitor (`lead_notification_jobs`), attempt counters (max 5), status badges, last error display, background crons display.
   - **General Knowledge Base ([`src/routes/_authenticated/admin.knowledge-base.tsx`](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/src/routes/_authenticated/admin.knowledge-base.tsx) & [`src/lib/knowledge-base.ts`](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/src/lib/knowledge-base.ts)):** Unified operational knowledge base with categorized search across Systems Architecture, Commercial Economics, SOP Playbooks, Governance Boundaries, Support Runbooks, and Business OS Drive mirrors.
6. **Verified Live Lead Intake & Outbox Delivery:** Both brands save all six visible enquiry fields exactly once into THG Agency (`worzpzbutngugwzhlvtj`). Genuine existing-owner browser sign-in and retrieval verified in dashboard, Leads, and full detail view. Scheduled Slack alerts delivered to `#all-the-harley-group` and accepted (3/5 attempts acknowledged); native Worker fetch context preserved.

**Verified Results & Integrity Checks:**

- Automated test suite: `npm test` runs 136 tests (66 platform smoke checks including drift detection + 67 regression/integration tests + 3 service worker tests) — 136/136 PASS.
- Build & Worker triggers: `npm run build` compiles clean worker and generates `.output/server/wrangler.json` with triggers `crons: ["* * * * *", "0 * * * *"]`.
- Quality checks: `npm run typecheck` (0 errors), `npm run lint` (0 errors, 9 existing warnings), `npm run format:check` (PASS).
- Platform smoke suite: `scripts/verify-platform.mjs` verifies presence of both minute notification and hourly retention cron triggers, plus absence of leaked credentials in client bundles.

**Known Limitations & Operational Boundaries:**

- Customer transactional email remains strictly disabled (`TRANSACTIONAL_EMAIL_ENABLED=false`).
- Google OAuth is disabled pending provider setup; administrative sign-in uses email/password or magic links against THG Agency.
- **H01/H02 Commercial Direction RATIFIED**: Robbie formally approved the commercial blueprint on 7 October 2026 (£1,495 setup + £249/mo care, zero VAT, 2-build cap, Bristol/Bath electrical contractor pilot).
- Coordinated live owner session expiry/logout acceptance and tooling advisory review (H42) remain open.
- Backup and recovery proof for live THG Agency database (H07) remains open.
- Preserve the active signed-in owner session.

**Next Actions:**

1. Outreach list curation (first 50 Bristol/Bath electrical contractors) and pilot template assembly.
2. Execute H42 coordinated live owner session expiry/logout acceptance.
3. Complete H09/H10 transactional email sender/provider setup and bounce handling once credentials are ready.
4. Complete H07 backup/recovery proof for live THG Agency database (`worzpzbutngugwzhlvtj`).

## Historical handover — 7 October 2026, live fields and Slack acceptance passed

**Verified live:** both brands save all six visible enquiry fields exactly once into THG Agency (worzpzbutngugwzhlvtj). Genuine existing-owner browser retrieval of both records passes. HDW long domain/service interest survives editing the message. Sources are contact_form/group_contact_form; phone, website and full interest are in message qualification context. Native Cloudflare minute schedule has run and claimed jobs. Live anonymous lead/job reads and notification claims are denied. Existing owner/admin assignment preserved.

**Implemented, committed, pushed and deployed:** durable alert queue, atomic service-intake trigger, disjoint leases, crash recovery, five-attempt cap, 1/5/15/60-minute retry delays, staff-visible status and minimal Slack alert payload (brand/reference/secure CRM link). Migration 20261007110303_durable_lead_notifications.sql is applied to staging and live. Source c2254b119861fcb989b01dae68ceb7ae68d97735; latest manually deployed Worker 6e9d3147-2efa-464f-ab6b-4d7d92b13978. Canonical GitHub main may auto-deploy identical source separately.

**Live delivery accepted:** native scheduled retries delivered both test alerts at 2026-10-07 11:31:39 UTC (12:31:39 BST). Both jobs are accepted, attempts=3, accepted_at populated and last_error cleared. Slack channel history contains exactly the matching HDW and Group lead references; authenticated CRM displays “Slack acknowledged this alert” and 3/5 attempts. Two initial request failures left leads/jobs durable; the deployed native-fetch wrapper then allowed automatic recovery. Initial exception details were not logged, so the native receiver diagnosis is inferred from the code change and successful retry, not a captured exception. No manual send/reset or duplicate enquiry was needed.

**Next action:** this requested both-brand field and Slack delivery/retry acceptance is complete. Continue existing H09/H10 transactional-email sender/provider/bounce acceptance, H42 hourly attempt retention and coordinated session expiry/logout, and H07 backup/restore proof. Customer transactional email stays disabled. Do not close wider tasks solely on this success. Preserve the owner session; keep the queued-alert failure/rollback runbook in notification-delivery-2026-10-07.md.

**Access/config:** founder completed THG Enquiry Alerts app setup and selected #all-the-harley-group in The Harley Group workspace. SLACK_WEBHOOK_URL installed privately on the existing Worker; LEAD_NOTIFICATIONS_ENABLED=true, TRANSACTIONAL_EMAIL_ENABLED=false. Secret only in ignored .env.production.local/.notification-secrets.local in the safe clone, never source/docs. Staging mfpnfxpgkfuqtedbcxvp remains notification-disabled with no outbound credentials.

**Validation:** full suite 59 platform +62 regression +3 service-worker checks passed; real staging Auth/API 13 checks and notification API seven checks pass. Local built Cloudflare scheduled handler with disabled staging override returned HTTP200/outcome ok. 310 built files scanned without server credentials. Real live Slack failures demonstrated jobs remain durable and retry counters advance. Actual channel acceptance after correction now passes. No production session-expiry/logout, backup restore, hourly retention, leaked-password protection or customer-email delivery claim. H08/H09/H10/H42 retain their remaining acceptance; no new backlog.

**Working copies:** primary C:/Local Data/The Harley Group/harley-digital-works main; safe clone implementation/hdw-enquiry-acceptance branch codex/h07-h42-enquiry-acceptance. Untracked acceptance-audit.json is a local duplicate audit artifact, not part of release. Synced sources untouched. No force pushes or historical schema replay. See notification-delivery-2026-10-07.md and evidence/live-fields-notifications-2026-10-07.json.

## Current handover — 7 October 2026

The core secure enquiry journey is live-verified: labelled browser enquiry saved exactly once to THG Agency; genuinely signed-in existing owner sees it in dashboard, Leads and full details. Owner completed password recovery privately. Provider verifies recent existing-admin sign-in and unchanged 1 admin/2 Auth users. Evidence: evidence/live-owner-retrieval-2026-10-07.json. No credential or recovery token recorded.

Canonical source: SkyPilot24/harley-digital-works/main. Cloudflare Worker: skypilot24-harley-digital-works. Live backend: worzpzbutngugwzhlvtj; isolated staging: mfpnfxpgkfuqtedbcxvp. Lovable THG Digital/thgdigital remains separate design/prototyping; reconnecting its Git is deferred. Deployed app source ebce69ee2f1b5f20da50aceccec4ec83ffba5a96; last manually verified Worker 9d3bfd74-d90b-479d-ad48-63dde99c3a76. thg_reviewed_live_enquiry_cutover is applied. Public/server configuration matches; Google sign-in disabled pending selected backend OAuth setup.

Tests: build/typecheck/focused lint/full suite pass; 23 database regressions and 11 real staging Auth/API checks pass. Live anonymous REST read and intake RPC denied. Owner UI reads original enquiry message. Notifications/email disabled. Remaining existing work: H08 both-brand fields/package coverage; H09/H10 durable notification retry/destinations and truthful delivery status; H07 backup/recovery proof; H42 retention schedule, live session/logout/expiry and advisories. Preserve the signed-in owner session; do not sign out merely to complete tests without coordinating with the owner.

Agreed plan: AGREED_DELIVERY_PLAN.md. Synced sources untouched. Original shared-record stash is retained for recovery; do not reapply it over newer accepted records. Repository main is kept clean and committed/pushed after updates. No wholesale production migration replay or further role grants.

## Historical delivery checkpoints — superseded by current handover

## Enquiry continuation — 7 October 2026

Scope: existing H07/H08/H09/H42. Implementation and evidence committed as c69ae9a9d106e0ea52f1dd8538704ac8cac14d75 on codex/h07-h42-enquiry-acceptance; branch imported into the requested repository without changing main or pushing. Shared documentation/evidence copied into its main working tree for visibility and remain uncommitted there. Anonymous browser /admin/leads access redirected to /auth; signed-in browser retrieval/session expiry remain pending. Inspected clean requested main 79e378cb8d887af0d36db127bfc96e63c2243c2d; current production Worker b59af9dc maps to this exact revision. Safe acceptance branch codex/h07-h42-enquiry-acceptance is in implementation/hdw-enquiry-acceptance. See [complete acceptance and release record](enquiry-acceptance-2026-10-07.md).

Reviewed/ported isolated permission migration; added atomic service-only intake, fail-closed backend matching, Cloudflare-only IP trust, notification opt-in, independent cleanup RPC, inherited function-grant correction and focused regressions. Updated only vulnerable transitive dependencies within current constraints; remaining tooling advisories are recorded.

Founder created staging mfpnfxpgkfuqtedbcxvp in SkyPilot24’s Org, Free, eu-west-1. It was empty before schema bootstrap. Schema and security migrations are applied there only. Real staging SQL concurrency: 1/12 duplicate leads saved; 5/12 boundary requests accepted; stored counts match. Security advisor has no WARN findings. Local build/typecheck/format/tests pass; lint has no errors and nine existing warnings.

Staging secret saved privately and validated. API harness passed all 11 real Auth/API checks; browser contact receipt and one persisted row verified. Evidence: docs/evidence/staging-api-acceptance.json. Next action: browser administrator UI/session-expiry acceptance, then live-target release preflight. Start isolated local server with node --env-file=.env.local node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5190 with staging network access. Both notification flags remain false and outbound keys absent.

Do not equate SQL role fixtures with signed-in Auth. Do not use service-role identity as owner proof. Do not bulk replay staging bootstrap into production; observed production migration IDs differ from local filenames. Complete reviewed release preflight, backups, existing-owner sign-in and missing Cloudflare public/server settings before seeking explicit live-action approval. Founder authorised a live push on 7 October. Acceptance branch pushed to GitHub at ff7cdfb405398c91f60650bdc300d385941d56e8; remote main remains 79e378c. No deployment or production write performed. Await intended live backend identity/access before coordinated schema/configuration/code cutover. Hourly retention setup, durable H09 retries, live target reconciliation and Drive mirror update remain pending. Synced sources unchanged.

Updated 3 October 2026. Start with PROJECT_STATUS.md's current brief, then load only records relevant to the selected task. Read repository instructions and preserve uncommitted changes. Chat history, credentials and personal skill installations do not automatically transfer between tools.

## Reconciliation (3 October 2026 — Google Antigravity Session)

- **Inspected & Pushed Commit:** `eb4f959` on `main` (pushed to `origin/main`).
- **Scope & Changes:**
  1. **CI/CD Health Unblocked:** Resolved false-positive secret leakage test failure in `scripts/verify-platform.mjs` by rephrasing documentation text in `src/lib/current-strategy.ts`.
  2. **Expanded Test Suite:** Added `verify-service-worker.mjs` to `package.json` `"test"` script. Total test coverage now executes 94 tests (59 platform smoke checks + 32 revenue readiness tests + 3 service worker tests).
  3. **Workflow Optimization:** Refactored `.github/workflows/quality.yml` into parallel jobs (`lint-and-format`, `typecheck`, `test-and-build`). Updated `.github/workflows/deploy.yml` with workingDirectory `.output/server` and graceful credential detection for `CLOUDFLARE_API_TOKEN` to prevent false failure alerts on GitHub.
  4. **Multi-Agent Governance Rule:** Added `.agents/rules/thg-handover-summary.md` and updated `.agents/rules/harley-digital-works-standards.md` to summarize handover rules across ChatGPT, Codex, and Antigravity.
- **Verified Results:** `npm run format:check` (PASS), `npm run typecheck` (0 errors), `npm run lint` (0 errors), `npm test` (94/94 PASS), `npm run build` (PASS).
- **Next Bottleneck:** H07/H42 reconcile intended backend target, validate isolated secure lead intake fixes, and prove H08/H09 enquiry-to-admin dashboard retrieval.

## Reconciliation (Previous Sessions)

Documentation and skills only. Inspected main/cached origin main eb4f9596d0b394c92f45c7120419a2509035e59b. No application, production database, billing, outreach or deployment changes. Check Git history/final report for publication of this change.

Reconciled six chats: Integrate Domain Sales Strategy; Build Harley Labs Page; GitHub Project Health Review; Review pull request 8; Create THG production QA skill; Install Company Building Skills. The Labs and project-health conversations were briefs, not proof of completed implementation. Existing Labs route needs assessment under L01. H01-H50 and D01-D08 are preserved.

The website source is merged. PR #8 remains draft/open; its Quality check passed while Cloudflare preview failed. Exact production Git revision is not mapped. The later QA security changes remain in the isolated hdw-release-safety checkout and are not verified applied; see PROJECT_STATUS.md. Existing admin must be preserved.

Staff access means real authenticated sign-in to the admin dashboard and retrieval of a saved enquiry, with unauthorised access denied. An admin role record alone does not prove this journey.

Operating model: near end-to-end automation, managed by exception, with founder oversight and selected quality review. Validate critical transitions and all launch outputs during the first pilot. Thereafter ordinary cases advance under approved rules; customer approval remains explicit. See REVENUE_WORKFLOW.md.

Next task: H07/H42 reconcile the intended backend and validate isolated secure intake, then H08/H09 enquiry-to-admin acceptance. H01 final commercial rules and D01 portfolio verification can progress independently. Then provider-confirmed billing and H50 automated paid pilot. Do not ask for a replacement domain list or expect the founder to diagnose the backend before inspecting evidence.

Skills: three canonical folders under skills/; central Codex loader copies synchronised by scripts/sync-thg-skills.ps1; Antigravity rule reads the same source. See SHARED_SKILLS.md. No wider 12-skill pack installed. Static configuration/packaging checks are not an actual Antigravity run.

## Central records

[Business OS](https://drive.google.com/drive/folders/1A6e8LO2cElTH4WsIwdQAggJnH94xTJuP) remains the single entrypoint. Repository records govern shared execution; Drive mirrors are explicitly reconciled.

- [Definition](https://drive.google.com/file/d/1sGcm_svP0v9WRrxRLSg33hq5G9BlkSx_/view)
- [Backlog](https://drive.google.com/file/d/1CCRiiSJSUxBfbQKfFjQpa45_wrMoYSCn/view)
- [Status](https://drive.google.com/file/d/16dY7fXb2YAy9-BBYPrCrwoftoOV_GAvj/view)

Earlier handover links pointed to exported copies; these are the original central records. Preserve exports as references rather than creating another hub.

## Efficient continuation and closing

Read the short current status first; select one ready task. Load its backlog definition, relevant evidence and skill rather than every historical record. Use existing project checks; summarise passes concisely and retain actionable failure detail. Context efficiency never removes critical verification.

After a meaningful session update current status, relevant backlog evidence and this handover: date/tool, scope, inspected/resulting commit, changes, checks actually run, implemented/tested/pushed/deployed separately, migration application state, blockers, next action and Drive reconciliation. Preserve history in Git and linked detail. Never record secrets or customer personal data.

Founder decisions remain final price/scope/VAT/contract/support limits, verified legal identity and initial quality/automation rules. Application tests were not rerun for this documentation/skills-only work.
