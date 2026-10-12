# The Harley Group — shared project status

## H50 production-gate implementation — 12 October 2026

Local implementation checkpoint: baf9c99cb3a982c91d3144ab6d13a39e3dc2380a on codex/first-client-production. Full suite now includes redirect/reconciliation DB regressions and passes. Repository quiet credential patterns plus configured-private-value scan of tracked source pass; only blank staging template tracked, private config ignored. Windows shell equivalent of prescribed secret patterns used because sh/bash unavailable. Not pushed/deployed; full readiness remains RED.

Current gate summary: docs/H50_READINESS_GATES.md consolidates workflow requirements and verified versus missing evidence; older paragraphs are chronological. Fresh build and configured-private-key exposure check pass across 194 public artifacts (raw/URI/base64/compressed). Does not replace general credential scan, reviewed commit/deployment provenance or full lifecycle acceptance. Production RED.

Atomic approval follow-up: application now passes signature-verified session ID into approval transaction; matching unexpired Auth session is locked while project membership/version approval executes. Source 20261012114111 applied staging only as 20261012114300. Database expired/deleted/missing-session/retry checks and full suite pass; actual Auth rehearsal verifies active session reaches membership denial and logged-out session fails before project lookup. Eight real Auth checks pass with cleanup; private RPC grants confirmed. Successful post-change browser approval and concurrent GoTrue logout acceptance still open; production RED.

CSRF follow-up: framework request middleware protects browser server functions. Actual runtime denies foreign/missing origin, cross-site and sibling-site fetch metadata (403); same-origin real Auth token passes to disabled feature gate (503). Six origin/provider runtime checks and seven real Auth/runtime checks pass; synthetic identity cleaned. Fresh full suite/typecheck/targeted lint/build pass. Signed payment endpoint stays outside browser-origin filter and disabled/no-store. Application/browser delivery acceptance and remaining commercial/provider/recovery/care/release gates still open; RED.

Application delivery acceptance: running local staging server with process-only delivery flag passed real administrator publication, invited customer exact-version retrieval/explicit approval/readback, revoked membership denial HTTP 409 and logged-out request denial HTTP 401. Synthetic fixture/admin grants/accounts cleaned in finally; independent staging counts confirm users/projects/revisions/approvals/access all zero. Temporary cleanup helper removed and enabled local process stopped. This is HTTP server-function acceptance, not authenticated browser happy-path or production release proof. Framework CSRF middleware warning identified for next hardening step. Overall RED.

Actual staging Auth evidence: synthetic account created through Auth admin API without email, password sign-in succeeds; private session RPC recognises active session, rejects another user identity, denies ordinary user execution, and returns false after real global logout despite retained old JWT. Direct ordinary-user approval RPC denied HTTP 403. Temporary account removed, credentials never printed or retained. Repeatable verify-staging-auth.mjs pins staging URL and isolates fixtures. These establish Auth/session/RPC gates only; successful application publication/customer approval and cross-project browser acceptance remain open. RED.

Runtime follow-up: signed-out customer review tested in local staging browser; invitation sign-in shown without project content. Fixed customer sign-in return path with same-origin validation and customer copy. Browser confirms review return query/sign-in screen; redirect regression/typecheck/lint pass. Local payment receiver GET=405 and disabled POST=503/no-store. Authenticated approval and production runtime remain unverified; RED.

Durable reconciliation follow-up: source migration 20261012111915 applied only to staging as 20261012112156. Server orchestration snapshots signed-event count before provider reads; append-only commit rejects intervening events, identity mismatches and conflicting retries. Six focused tests, typecheck and targeted lint pass. Actual staging rollback-only save verified; RLS enabled, public access and service UPDATE denied, retained observations zero. Evidence does not yet clear launch holds or expose an admin recovery action. Runtime acceptance and recovery integration remain open; RED.

Latest staging verification: ignored private configuration passes all presence/isolation/outbound checks. A read-only application-key request to the pinned staging payment_contracts endpoint returned HTTP 200 with the expected stored contract visible; no secret or row content printed. This supersedes the missing-key blocker below. Five provider reconciliation tests and fresh typecheck pass; full-suite/build logs completed successfully. Reconciliation observations are not yet persisted and runtime Auth/browser/signed-payment acceptance remains open. Production remains RED.

Runtime configuration follow-up: enabled public staging key retrieved through THG connector and placed in both blank public fields of ignored .env.local. Secret-free check:staging passes all URL/public-key/outbound checks, fails only missing server secret. No secret value retrieved or printed. Blank template now shareable while private config remains ignored. Actual runtime/browser/provider gates remain open; RED.

Financial health follow-up: signed refund/dispute persistence and launch holds implemented; staging-only migration 20261012110113. Thirteen focused processor/launch-financial tests plus full suite/typecheck/lint/build pass; rollback-only staging sandbox/live separation verified. No provider refund or adverse event retained. Unmatched reconciliation, care alerts and actual signed/provider/browser acceptance remain open; RED.

Payment ownership follow-up: immutable contract terms/verified receipt state and one-time same-client project binding implemented; migration applied only to staging. Four focused service-role launch/binding tests and full suite/typecheck/lint pass. Actual rollback-only staging amount mutation denied. No staging project linked or billing enabled. Refund/dispute lifecycle, terms/checkout binding and actual runtime workflow still open; RED.

Backend launch follow-up: staging-only 20261012104650 trigger requires latest preview approval, matching append-only release evidence/admin reviewer and linked live deposit/balance receipts before new launched transitions. Three launch DB regressions/full suite pass; rollback-only actual staging denial verified. This enforces recorded prerequisites, not independent evidence collection. Contract linkage/reassignment protections, approved terms, preview binding, real sessions/provider/browser and care/recovery remain open; production RED.

Project-page follow-up: expandable admin review publication/access controls implemented; disabled server feature retained. Typecheck/lint/full suite pass; browser acceptance pending configured staging. Capacity display corrected to two pilot builds and delivery target to 14 business days. Misleading status-only launch action and launched selection disabled; backend launch guard still missing. Full production RED.

Session schema applied to staging only as 20261012103258; service-only execute grants verified, missing session denied. Eleven focused tests/build pass; migration-suite fixture updated with verified Auth session columns. All delivery handlers enforce verified-token session lookup. Real Auth/browser sign-out acceptance and remaining lifecycle still open; RED.

Session follow-up: restricted auth.sessions boolean lookup and server guard implemented for all four delivery operations; rejects missing/wrong-user/deleted/expired sessions and fails closed on database uncertainty. Eleven focused delivery/session tests and typecheck pass. Source migration 20261012103020 is not yet applied. Ignored .env.local created from staging template with blank keys for owner configuration; all features remain disabled. Actual Auth runtime acceptance still open; RED.

Publication follow-up: disabled administrator operation atomically publishes digest-bound revision/artifact with publisher identity, retry safety and optimistic revision checks. Migration 20261012102546 applied only to staging; nine DB tests/typecheck/lint pass. Staging server credentials absent from isolated runtime; requested private ignored .env.local setup, with .env.staging.example covering matching browser/server values. No content published or feature enabled. RED.

Customer review route and immutable readable artifacts implemented, disabled on server. Staging migration 20261012102231 enforces text/digest match and artifact-required approval; seven delivery database tests/full npm test/typecheck/lint pass. Local browser reaches review/sign-in loading; further browser observation blocked by automatic approval review HTTP 429, so no authenticated acceptance claim. Publication/preview binding/session enforcement and remaining workflow gates open; RED.

Access follow-up: disabled administrator-only project membership operation implemented using current Auth user plus existing admin role; typecheck/lint pass. No membership changed. Auth token/session revocation remains unverified (getUser is not proof of revocation). Next customer interface requires immutable readable revision content in addition to digest/commit. Production RED.

Latest: authenticated exact-version approval server operation implemented, disabled by default. Explicit project membership, fresh Auth user, matching current revision/digest and atomic replay-safe approval are required. Migration applied only to staging as 20261012101535; six delivery DB tests/full npm test/typecheck/lint/build pass. Customer interface, membership administration, real Auth runtime checks and launch/care/recovery still open. No production changes; RED.

Delivery migration subsequently applied only to isolated staging as 20261012101143. Full npm test passes with four added approval regressions. Earlier unapplied delivery wording is superseded; customer identity/interface and launch enforcement remain incomplete.

Current follow-up supersedes connector/unapplied state below: THG account and isolated staging verified. Payment migration applied only to mfpnfxpgkfuqtedbcxvp (provider version 20261012100429). Fictional sandbox deposit reconciled into one durable receipt; repeat returns duplicate. Service-only immutable project revision, identity-evidence and approval migration implemented; four fresh ephemeral PostgreSQL tests pass for exact-version approval, project separation, source evidence and denied access/rewrites. Delivery migration not applied yet. Signed webhook delivery, customer identity/approval interface and remaining launch/care/recovery gates remain unverified; production RED. No production change, commit/push or deployment.

Follow-up: durable contracts/receipts migration (unapplied), adapter and bounded disabled Stripe POST endpoint implemented. Four ephemeral database tests plus four request-handler tests added: 14 payment tests pass. Actual local HTTP POST 503/unconfigured and GET 405 verified. Typecheck/lint/existing suite/format pass; no provider receiver registered or staging schema applied. Supabase connector exposes only unrelated inactive TRF Connect Prod; correct THG Agency/staging connection requested. Earlier interface-only state below is superseded; full gate remains RED.

Isolated branch codex/first-client-production: server-only Stripe signed-event processor and six payment regressions implemented; typecheck, existing test suite, format and production build pass. Durable database adapter and endpoint remain to implement; no staging/live configuration, migration, push or release. See docs/H50_PAYMENT_IMPLEMENTATION.md. Full first-client production gate remains RED.

## PR #23 Cloudflare build repair — 9 October 2026

H47: Cloudflare builds at c92dc60 and 0c38e1d compiled successfully, then failed because npx wrangler preview requires a previews block. Added previews.vars to wrangler.json; generated Nitro configuration preserves it. Preview server backend is deliberately unconfigured (reserved .invalid URL, placeholder public key); notifications and transactional email are disabled. Production variables and commands are unchanged. The dashboard base-command experiment did not alter the existing branch trigger and was reverted to npx wrangler preview. Fresh local build and all 136 existing checks pass; diff whitespace check passes. Replacement provider check pending. No main merge or production promotion.

## Recent activity review and consolidated push — 9 October 2026

Canonical main checkout freshly verified clean at `5e0520d`, with no unpushed commits. Reviewed scanner-fix PR #22 (`3e13544`) merged into the Headquarters review branch without conflicts or history rewriting (`df46a7b`), removing the known scanner self-match blocker from the combined source. Fresh combined scan/build/typecheck/136 checks pass; lint retains 9 existing warnings. `docs/RECENT_ACTIVITY_REVIEW_2026-10-09.md` and one central KB article record recent commercial/Slack/skills/CI work already in main, Dell source merged but recovery/live acceptance pending, completed proposed brand pack now in Drive and unresolved laptop continuity. Founder confirms socials are not yet set up; dashboard copy updated. Proposed brand decisions and untested dependency upgrades remain separate. Publication is via existing PR #23; main release and live owner acceptance remain pending.

## Group Headquarters in Control Centre — 9 October 2026

H03/H47: added authenticated `/admin/headquarters`, a primary navigation item and a Control Centre summary card on `codex/group-headquarters-control-centre`, based on main `5e0520dca8c8b9d633474cc9f64d2453b19e99cb`. The page links the existing shared Drive headquarters and every folder/document/reference (32 destinations), with 118 link records, 17 portfolio records and ten priorities from the 9 October audit. It provides automation, sales/marketing, finance and live-operations shortcuts and reuses the existing social content guide. Social profile URLs/scheduler/analytics are explicitly awaiting connection. Portfolio/priorities are dated reference records, not live telemetry or automatic Drive sync. Source is implemented and locally validated; publication/deployment/live admin acceptance remain pending. See the matching handover section for checks and limits.

Reconciliation: PR #20 is included in the fetched main baseline above; its older draft wording below is historical. This does not establish the current live deployment revision.

## Harley Labs Dell knowledge-base addition — 9 October 2026 (draft review preparation)

Codex prepared one dashboard entry, **Harley Labs — Dell Build** (`harley-labs-dell-build`), in `src/lib/knowledge-base.ts` on `codex/harley-labs-dell-kb`, reconciled with remote main `e972b74ca2258e28b56b4887c1d6055a263dc725`. It records founder-observed Dell progress, exact local commands, explicit unverified steps and nine reusable continuation prompts. n8n onboarding was reached; owner completion, workflows, reboot persistence and backup/restore remain unverified. Committed/pushed in `dbf567c` and available as draft [PR #20](https://github.com/SkyPilot24/harley-digital-works/pull/20); dashboard publication and deployment remain pending review and an authorized main release. Validation results are recorded in the matching handover section. Next lab action: privately complete onboarding, then one manual fictional-enquiry workflow. Production/business next actions below are unchanged.

## Current handover — 8 October 2026, Dual Architecture, Client AI Template, and Commercial Ratification

**Verified live & implemented:**

- Both brands save all six visible enquiry fields exactly once into THG Agency (`worzpzbutngugwzhlvtj`).
- Genuine existing-owner browser sign-in and retrieval verified in dashboard, Leads, and detail view.
- Scheduled Slack alerts delivered to `#all-the-harley-group` and accepted (3/5 attempts acknowledged); native Worker fetch context preserved.
- **Slack Operational Command Centre implemented**: Two-way interactive Block Kit actions (`[📞 Contacted]`, `[⭐ Qualify]`, `[📁 Create Client]`, `[🔄 Retry]`), `/thg` slash commands (`status`, `leads`, `builds`, `approvals`, `retry`, `help`), clean 9-channel routing topology, 08:00 daily founder briefing task (`0 8 * * *`), 30-min health scanner (`*/30 * * * *`), HMAC-SHA256 request verification, and dedicated Admin Control Centre Slack panel.
- H42 hourly attempt retention task `prune-lead-attempts` implemented in Nitro with `0 * * * *` scheduled trigger, invoking `prune_lead_submission_attempts()` via `supabaseAdmin`.
- **H01/H02 Commercial Direction RATIFIED**: Robbie formally approved the commercial blueprint on 7 October 2026. Ratified terms: Managed Revenue Engine (£1,495 setup + £249/mo care, with £995/£149 entry and £2,495/£399 expansion tiers), zero-rated VAT below £90k, hard limit of 2 concurrent builds during pilot, and initial focus on established Electrical Contractors in Bristol/Bath / M4 corridor.
- **Dual Architecture & Client Template Established (8 October 2026)**: Wessex Volt 5-page trade template built and verified in `SkyPilot24/kindred-spark` (commit `f1481fe`) connected to Lovable with project knowledge `UK Trade Website Standards`. Agency platform (`harley-digital-works`) remains governed directly in code by Codex/Antigravity to safeguard server tasks, Slack commands, and Supabase RLS security.
- Comprehensive operational Admin suite deployed: Control Centre (`admin.index.tsx`), Invoices milestone generator (`admin.invoices.tsx`), Projects stage tracker (`admin.projects.tsx`), Diagnostics outbox monitor (`admin.diagnostics.tsx`), and the General Knowledge Base (`admin.knowledge-base.tsx` & `src/lib/knowledge-base.ts`).
- 136/136 test suite passed (66 smoke including drift detection + 67 regression/integration + 3 service worker), 0 typecheck errors, 0 lint errors.

**Next action:** Outreach list curation (first 50 Bristol/Bath electrical contractors) and pilot template assembly. Continue technical track: H42 coordinated owner session expiry/logout acceptance and tooling advisory review, H09/H10 transactional email sender/provider setup and bounce handling once credentials are ready (customer transactional email stays disabled), and H07 backup/recovery proof for live THG Agency database (`worzpzbutngugwzhlvtj`). Preserve existing owner session.

## Start here - short operating brief

- **Goal:** first paid pilot of a near end-to-end automated trade digital service; founder manages exceptions and retains quality review.
- **Verified state:** 8 October: live secure enquiry saved exactly once to THG Agency and retrieved by the genuinely signed-in existing owner in dashboard, Leads and full detail view. Minute Slack outbox alerts acknowledged. Hourly retention pruning scheduled. Canonical GitHub source and Cloudflare release are deployed; client trade template active in `kindred-spark` via Lovable. Full operational knowledge base active in dashboard. H01/H02 commercial terms ratified by Founder. No revenue total verified.
- **Bottleneck / one next task:** Commercial terms ratified and client template active. Active execution tracks: Pilot lead sourcing (50 Bristol/Bath electrical contractors) & outreach template setup; H42 live owner session expiry/logout acceptance; H09/H10 transactional email setup (customer email disabled); H07 live database backup/restore proof.
- **Decisions:** Launch offer (£1,495 setup + £249/mo), legal entity/VAT status, UK-wide/Bristol-Bath positioning, and 2 concurrent builds cap RATIFIED by Robbie on 7 October 2026. D01 portfolio verification can progress independently. Dual architecture (Lovable for client sites, code for agency platform) settled 8 October 2026.
- **Load on demand:** docs/COMMERCIAL_OFFER_MANAGED.md for ratified offer & economics; BUSINESS_DEFINITION.md for commercial rules; MASTER_BACKLOG.md for the selected task; docs/REVENUE_WORKFLOW.md for lifecycle; docs/HANDOVER.md for continuation; src/lib/knowledge-base.ts for operational knowledge base.
- **Close each meaningful session:** update this brief, task evidence, handover, and dashboard knowledge base; record actual checks/release state, then reconcile Drive mirrors. Do not omit blockers to save context.

## Live owner acceptance — 7 October 2026

**Core revenue bottleneck resolved:** authorised live browser contact submission displayed a receipt, persisted exactly one labelled enquiry to THG Agency, and the existing owner completed recovery privately and signed in. Browser verification confirms the same enquiry and full original message in dashboard/Leads/detail. Provider metadata confirms recent existing-admin sign-in, 1 admin, 2 Auth users and exactly 1 labelled enquiry. No new administrator or owner impersonation. Evidence: docs/evidence/live-owner-retrieval-2026-10-07.json.

Deployed application source ebce69ee2f1b5f20da50aceccec4ec83ffba5a96; last manually verified Worker 9d3bfd74-d90b-479d-ad48-63dde99c3a76. Source is committed/pushed to canonical main, schema applied to live THG Agency, and secure capture plus genuine owner retrieval live-verified. Google sign-in remains disabled; email/password and recovery use THG Agency. Notifications/email remain disabled.

**Ready:** secure live enquiry persistence and genuine owner retrieval; staging concurrency/ordinary-user isolation; bounded live anonymous REST/RPC denial. **Needs attention:** both-brand field/package coverage, production owner logout/expiry, retention scheduling, durable notifications, backup/restore proof, leaked-password protection and tooling advisories. Do not mark H07/H08/H09/H42 wholly complete; acceptance evidence resolves the core journey only.

## Agreed architecture and live release — 7 October 2026

Founder approved: SkyPilot24/harley-digital-works is the canonical application source; Cloudflare is production hosting; THG Agency (worzpzbutngugwzhlvtj) is the live backend; mfpnfxpgkfuqtedbcxvp remains isolated staging. Lovable THG Digital/SkyPilot24/thgdigital remains a separate design/prototype workspace. Reconnecting Lovable to canonical Git is a later reviewed action, not performed. Existing Lovable build tooling remains; live Google Auth no longer delegates to Lovable and stays disabled until THG Agency OAuth is explicitly configured. Email/password Auth uses THG Agency.

Exact database approval received and thg_reviewed_live_enquiry_cutover applied successfully. Verified 0 pre-existing leads, 1 admin and 2 Auth users preserved; unsafe lead policies/bootstrap removed, anonymous read/insert and authenticated intake-RPC denied. Deployed Worker 6a2b6017-2705-4a48-8653-46facc145b46 with matching backend and server secret. Labelled live contact browser submission displayed receipt and exactly one matching THG Agency row (thg-live-check-20261007@example.test). Notifications/email stay disabled. Sign-in feedback clarification is deployed.

Build/test/typecheck pass; 23 DB regressions, 11 staging Auth/API checks and prior secret scan across 310 outputs pass. Existing-owner browser sign-in and full enquiry retrieval now pass. Live expiry/logout remains untested. Advisor leaves intentional service-only attempt-table INFO and leaked-password protection WARN; retention schedule, durable notifications and remaining tooling advisories remain open. Prepared metadata snapshot is not a tested backup/restore.

## Historical enquiry checkpoints — superseded by live owner acceptance

This supersedes older environment/deployment claims below. See [dated enquiry acceptance](docs/enquiry-acceptance-2026-10-07.md) for environment map, root causes, migration state, test evidence, access actions and release gate.

- Inspected requested repository: clean main, 79e378cb8d887af0d36db127bfc96e63c2243c2d. Safe versioned branch: codex/h07-h42-enquiry-acceptance in implementation/hdw-enquiry-acceptance.
- Cloudflare current active version b59af9dc links that revision; Git is connected to SkyPilot24/harley-digital-works/main. Lovable separately remains connected to SkyPilot24/thgdigital/main. No runtime secrets or build variables are configured on the production Worker.
- Existing application configuration and Lovable project-info record identify sprljifjcpbnagsxefrp; accessible THG Agency metadata and stale CLI config identify worzpzbutngugwzhlvtj. Neither was retargeted or written. Current Lovable inspection confirms public insert bypass, missing attempt table, enabled signup-admin bootstrap and one existing admin. The owner now has a password configured; sign-in remains unproved.
- Founder created genuinely separate staging mfpnfxpgkfuqtedbcxvp in SkyPilot24’s Org, Ireland, Free. Empty preflight passed. Reviewed schema/hardening and follow-up inherited-function grant fix are applied only there. Notifications disabled; no production data copied.
- Local tests prove owner preservation, denied public/ordinary lead access and self-promotion, atomic intake, quota/timing, failure rollback/retry and restricted cleanup. Real staging SQL: 12 duplicate requests -> 1 saved/11 duplicates/1 lead; 12 boundary requests -> 5 saved/7 rejected/5 attempts. Privileged SQL is not Auth/API or browser proof.
- Fresh build/typecheck/format passed. Test suite passed; lint has nine existing warnings and no errors. Critical dependency advisories cleared within existing constraints; nine tooling moderate/high findings remain. Staging security advisor has no warnings; service-only attempt-table INFO is intentional.
- **Blocking launch:** browser admin UI/session acceptance; missing live runtime/build configuration; final live target/backup/schema reconciliation. Live-release approval received; prerequisites remain. Retention schedule and durable notifications remain unfinished.
- Implemented locally and schema applied in isolated staging; acceptance branch pushed to GitHub (ff7cdfb); no push to main, app deployment or production mutation. Synced sources untouched. Drive mirrors not updated automatically.

## Current reconciliation - 3 October 2026

This section supersedes older status below. Inspected local main and cached origin/main: eb4f9596d0b394c92f45c7120419a2509035e59b. The website changes and shared-context commit 87aa5ce are present; September statements that none of this was pushed are historical. No application tests or production changes were performed during this documentation reconciliation.

| Revenue requirement      | Evidence                                                                                                                 | Remaining acceptance                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| Approved offer           | **RATIFIED BY FOUNDER**: £1,495 setup + £249/mo care (3 tiers: £995, £1,495, £2,495) in docs/COMMERCIAL_OFFER_MANAGED.md | H01/H02: Ratified on 7 October 2026. Zero VAT, 2 builds concurrency cap, and Bristol/Bath electrical niche confirmed. |
| Credible public website  | Refresh live; Cloudflare Worker edge SSR, SEO metadata, canonicals and Schema JSON-LD passing                            | H12/H46: verify live multi-brand domain journeys                                                                      |
| Secure enquiry capture   | **ACCEPTED LIVE**: Both brands save 6 fields to THG Agency (worzpzbutngugwzhlvtj); Slack alerts ok                       | H09/H10: transactional email sender/bounce (customer email disabled); H07 live backup/restore proof                   |
| Admin dashboard access   | **ACCEPTED LIVE**: Existing owner sign-in and retrieval verified; full admin suite & KB deployed                         | H42: live owner session expiry/logout acceptance and tooling advisory review                                          |
| Payment and subscription | Milestone payment request generator active; zero-rated VAT rules enforced                                                | H23/H24: verified provider events, replay safety and reconciliation                                                   |
| Repeatable fulfilment    | 8-Step delivery SOP and trade vertical playbooks established in Dashboard Knowledge Base                                 | H50: paid pilot validates automated lifecycle, quality review and exception recovery                                  |
| Domains                  | Existing roster and D01-D08 retained                                                                                     | Verify authority, renewals and sale status; progress independently of website pilot                                   |
| Revenue                  | Zero unverified revenue; pipeline strictly separated from collected ledger payments                                      | Reconcile actual receipts; do not report zero or forecast as actual                                                   |

**Single next bottleneck:** prove a secure enquiry-to-admin-dashboard journey against the correct backend in an isolated acceptance environment, then verify the coordinated production release. This combines H07/H08/H09/H42; installing another CRM does not resolve it. H01 commercial decisions and D01 portfolio verification can proceed independently.

### Security and release evidence

The later production QA chat reported an enabled first-admin signup trigger, anonymous direct lead insertion and a missing public.lead_submission_attempts table. One existing admin must be preserved. Proposed fixes and migration 20261003090748_restrict_signup_admin_and_public_intake.sql are in the isolated hdw-release-safety checkout, based on b5a7967, not in inspected main and not verified applied. Do not remove anonymous insert permission before the secure server intake is deployed and tested. Review docs/release-safety.md and docs/staging-acceptance.md in that checkout before porting anything.

Isolated checkout: C:/Users/drrob/.codex/.chatgpt-projects/g-p-6821b09180c48191b13b8c6d60d6782b/implementation/hdw-release-safety. Its reported 54 smoke and 32 behaviour/database tests are historical isolated-fix evidence, not current-main or live verification.

Backend references remain conflicting: the September 29 Lovable mapping identifies sprljifjcpbnagsxefrp; CLI/older records name worzpzbutngugwzhlvtj. Direct metadata access to the latter does not prove the application uses it. Connector access is no longer the sole blocker. Confirm deployed configuration and intended ownership before writes. Local sign-in investigation does not prove a staff member can open the dashboard and retrieve a persisted enquiry.

GitHub PR #8 was read on 3 October: open, draft, unmerged; head 45f0c0f6bc0225f81c7d393992567e8f271cd82a. Quality run 37127221878 succeeded. Cloudflare subsequently reported a failed preview build at 13:45:04 UTC (build f836e931-0efe-4275-ae63-12c0b74de51e). Earlier dashboard observations of no Git integration/build history are therefore historical. A successful GitHub check is not a successful Cloudflare deployment. Local main contains related CI improvements, but this does not establish PR #8 merged.

Earlier Cloudflare inspection recorded manually deployed worker skypilot24-harley-digital-works, active version prefix 52739fd4, serving Digital Works and Group domains. Exact deployed Git revision remains unmapped. Branch preview URLs do not establish backend isolation. Do not retarget or deploy from this record alone.

### First paid pilot and founder workflow

1. Resolve the secure enquiry/admin acceptance bottleneck; agree H01 rules in parallel.
2. Prove proposal, provider-confirmed payment and repeatable onboarding with test data.
3. Run one paid pilot through templated build, automated QA, founder quality review, customer approval and controlled launch.
4. Prove recurring billing/care, retries and exception escalation; measure founder time and contribution.
5. Allow standard cases to advance under validated rules; keep selected quality reviews and an exception queue. See docs/REVENUE_WORKFLOW.md.

Founder view should show each customer, current stage, next action/owner, age, payment evidence, quality status and exceptions. Review urgent security/payment/delivery failures when alerted and a concise routine quality/operations digest; cadence is to be agreed. No manual chasing of every normal transition.

### Reconciliation coverage

Sources: Integrate Domain Sales Strategy; Build Harley Labs Page; GitHub Project Health Review; Review pull request 8; Create THG production QA skill; Install Company Building Skills; current repository and PR #8. Labs and project-health chats supplied improved briefs, not proof of completed implementation/audit. A Labs route exists but needs assessment against the simpler requested brief (L01). The production QA skill exists locally; other proposed skills and suggested sales tools are not verified installed/connected. Preserve current TanStack/Cloudflare work rather than migrate for a proposed tool list.

Updated 2 October 2026. Read this current summary before the historical snapshot below.

## Current evidence and limits

- Active repository: SkyPilot24/harley-digital-works; default branch main. Inspected baseline: 36b550d8ffddd2a1df37f05d84ab08a153d163cf, “Merge branch 'codex/revenue-readiness'”, dated 29 September. The September 28 statement that the work had not been pushed is historical; the branch merge is now present. This does not establish a deployed release or prove every original acceptance criterion.
- Shared documentation is being added to main in the context-setup commit. Its own SHA belongs in the Git history; successor work must record the exact HEAD it inspects.
- No application tests, typecheck, build or production checks were rerun during this documentation setup. The historical 75-test result is historical evidence only.
- No paying-customer or revenue figure has been verified. Pipeline and forecasts are not collected revenue.

## Backend target must be reconciled before writes

Direct Supabase metadata access to THG Agency, worzpzbutngugwzhlvtj, succeeded on 2 October: ACTIVE_HEALTHY, eu-west-1. The connected project list omitted it; that omission does not establish lack of access. Schema, RLS, deployed configuration and application writes have not been verified in this session.

Repository README and [local admin sign-in investigation](docs/local-admin-signin.md) instead say the existing Lovable Cloud backend is sprljifjcpbnagsxefrp, verified via Lovable on 29 September, and warns that supabase/config.toml is stale. Earlier Business OS notes name worzpzbutngugwzhlvtj. The September 29 investigation specifically identifies worzpzbutngugwzhlvtj as the stale CLI reference and records a Lovable project_info lookup identifying sprljifjcpbnagsxefrp as the actual backend. This is newer, more specific evidence than the imported Business OS snapshot; direct metadata access to THG Agency does not retarget the application. Inspect current deployed environment, application configuration and Lovable project mapping, then document the intended target and evidence before migrations or data changes. Do not create a replacement database or touch unrelated TRF Connect.

The September 29 investigation also records read-only Lovable database access working, one admin role, local environment loading and recovery-page work; end-to-end sign-in remained unverified. It reports Lovable linked to SkyPilot24/thgdigital rather than this repository, so automatic Lovable sync is unverified despite the preserved AGENTS.md warning. See that investigation before repeating access restoration or authentication work.

Stripe configuration, live email delivery, production permissions, payment reconciliation and end-to-end fulfilment still need verification. Do not infer credentials or live readiness from installed plugins.

## Commercial direction and next actions

The Harley Group remains parent; Harley Digital Works remains customer-facing. Setup/build fee plus monthly is settled; proposed prices/scope remain unapproved. Domains are an established commercial workstream within the same roadmap (H49, D01–D08), with a later evidence-based Harley Domains brand decision.

1. H07: reconcile backend target; inspect schema/auth/RLS and confirm access.
2. D01: reuse existing portfolio; verify ownership/mandates, costs, renewals and current sale status. Saved page has 29 entries; older notes describe 60. Neither establishes the complete current total.
3. H01: approve scope, pricing and terms; older £95/month/14-day claims are not approved current terms.
4. H08/H09 and D03/D04: prove persisted enquiry handling and extend existing domain catalogue/intake.
5. Follow the integrated backlog to settlement, recurring services and a controlled website pilot.

## Historical Business OS status — retained for traceability

The following is the imported September 28 record plus its October 2 commercial update. Where it conflicts with the summary above, use current evidence above and investigate unresolved differences.

---

# The Harley Group — current project status

Updated 28 September 2026. Central business records: The Harley Group / Business OS in Google Drive. Current direction: setup/build fee plus monthly digital service for trades. Prices are proposed, not approved.

## Health

Reusable website/application foundation and a complete 50-item production audit exist. Revenue readiness is not established: production backend access, real enquiry handling, payment configuration and end-to-end fulfilment remain unverified. No paying-customer or revenue figure has been verified; this is not evidence that the figures are zero.

## Verified implementation

Authoritative active repository: SkyPilot24/harley-digital-works. Local checkout: C:/Local Data/The Harley Group/harley-digital-works. Branch codex/revenue-readiness; baseline 7f52f8a. Recovered Development exports and the older inspection checkout are reference copies, not the active release source.

| Evidence                  | Implemented locally                                                                                                                                        | Remaining release condition                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 843f0d8                   | Server-side admin authentication/authorisation for transactional email; explicit prepared versus provider-accepted status; sending disabled by default     | Verify real backend roles, provider, quotas and operational monitoring before enabling                   |
| 843f0d8                   | Shared validated intake, phone/source preservation and corporate form; notification failure does not invalidate saved enquiry                              | Verify persistence and notification delivery against intended backend; durable retry remains outstanding |
| 843f0d8                   | Prototype public tools gated to contact; source retained for deferred work                                                                                 | Deploy and verify public routes; do not describe deferred tools as complete                              |
| 410eece                   | Prospect workspace creation no longer declares a won sale or invents recurring revenue; retry/concurrency handling; honest admin errors and revenue labels | Verify DB policies and real authenticated journeys; connect reconciled billing later                     |
| Latest local verification | 75 tests passed, typecheck and production build passed; targeted lint passed                                                                               | Repository-wide lint/format debt, production QA and release checks remain                                |

These commits have not been pushed or deployed as part of this work. No live email, payment, campaign or production database migration was performed.

## Access and infrastructure

Lovable project THG Digital: f2aa963f-2beb-4507-b37e-a1865915cda7. Its configuration confirms intended Supabase project worzpzbutngugwzhlvtj. The separately connected Supabase account exposes only unrelated TRF Connect. Lovable database inspection was refused because the connector lacks projects:write scope. Restore the correct access; do not create a replacement database or modify TRF Connect.

Stripe account retrieval has not succeeded because authentication repeats. Account, products, prices, webhooks and trading status are unverified.

Cloudflare currently serves the brand domains through skypilot24-harley-digital-works; the previously inspected live release predates these local fixes. Production Supabase configuration, multi-domain routing/canonicals and release rollback need verification.

## Next execution sequence

1. Approve final Managed scope, price, VAT treatment and contract/support terms; model choice is already settled as setup plus monthly.
2. Restore access to the existing Lovable/Supabase backend and intended Stripe account; inspect roles, policies and configuration.
3. Prove one enquiry persists, is visible to an authorised operator and generates an accurately reported notification.
4. Align public offer, factual proof and legal information; retain only working launch journeys.
5. Implement hosted proposal/payment and structured onboarding, using verified payment events and duplicate protection.
6. Complete critical security, privacy, accessibility and deployment checks; release and verify against a recorded deployed commit.
7. Deliver one controlled pilot; measure time and cost before scaling outreach.

Detailed task definitions, priorities, owners, dependencies and acceptance criteria are in MASTER_BACKLOG.md. No whole audit task is marked complete solely because part of its code was changed.

## Commercial roadmap update — 2 October 2026

Domains are now a separately measured commercial workstream under The Harley Group, marketed through Harley Digital Works. MASTER_BACKLOG H49 was revised and D01–D08 added for verified inventory, offers/mandates, catalogue, intake, assisted settlement/transfer, renewals, reporting/cross-sell and later brand/product review. Existing setup-plus-monthly direction and production-readiness sequence remain. This is a planning/documentation update only; no inventory ownership, code deployment, buyer messaging, purchase, payment integration or transaction completion is implied. Prices remain proposals. The central Business Definition in The Harley Group / Business OS was updated to match.

## Security audit repair — 9 October 2026

H42: scanner self-match in security.yml diagnosed and fixed on codex/security-scan-fix. Clean-tree and six synthetic/redaction/error checks passed. GitHub Security Audit 37923833877 and Quality 37923834004 passed for 1ed96ff; PR #22 open, no main merge or deployment. See docs/HANDOVER.md for related Dependabot failures and audit limitations.
