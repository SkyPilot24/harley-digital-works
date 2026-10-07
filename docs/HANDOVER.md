# Shared development handover

## Approved plan and live release — 7 October 2026

Canonical repository: SkyPilot24/harley-digital-works; production: Cloudflare; backend: THG Agency worzpzbutngugwzhlvtj; isolated staging: mfpnfxpgkfuqtedbcxvp. Lovable stays a separate prototype/design workspace; reconnecting its Git is deferred. Live Google OAuth uses native Supabase if explicitly enabled, currently disabled; no Lovable Auth delegation. Founder explicitly approved the reviewed schema cutover after automatic approval rejection. thg_reviewed_live_enquiry_cutover applied successfully, preserving 1 administrator/2 Auth users/0 previous leads; permission checks pass. Worker 6a2b6017 deployed and labelled live browser contact produces one saved enquiry. Further auth clarification is being built and released. Owner sign-in tab handed off to founder for final real-browser retrieval; never impersonate owner with a service key. Notifications/email disabled. Remaining: owner retrieval/session expiry, retention scheduling, durable retries, leaked-password setting/tooling advisory assessment and backup/restore proof. See PROJECT_STATUS.md for current superseding evidence. Historical sections below retain earlier states.

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
