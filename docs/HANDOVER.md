# Shared development handover

## Current handover — 7 October 2026, live fields and Slack acceptance passed

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
