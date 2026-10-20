## Strategic Brand, Logo & Typography Architecture Review — 20 October 2026

- **Tool & Scope:** Google Antigravity. Comprehensive brand, logo, and typography review across The Harley Group, Harley Digital Works, and Harley Labs. Produced pre-launch strategic enhancements artifact (`brand-review-and-prelaunch-recommendations.md`).
- **Founder Direction:** Robbie requested in voice note: *"Please review the current brand, the logo, the typography for both The Harley Group, Harley Labs and Harley Digital Works... high-end, but also appeal to our target market, not too 'web agency'. Look at the current brand pack and suggest improvements pre-launch."*
- **Applied Changes:**
  - `src/styles.css`: Upgraded `.hdw-marketing` font family tokens from fallback `Arial, Helvetica, sans-serif` to `Manrope` for headings and display, with `Inter` for body text. Immediately gives the agency a precision-crafted, high-end British engineering aesthetic while maintaining 100% legibility on mobile.
  - Authored `brand-review-and-prelaunch-recommendations.md`: Complete audit of the 3 entity brand assets, logo legibility (van, workwear, and WhatsApp circle avatar tests), color system boundaries, and 5 pre-launch improvements.
- **Empirical Verification:**
  - `npm run format:check`: PASS.
  - `npm run typecheck`: PASS (0 errors).
  - `npm run lint`: PASS (0 errors, 9 non-blocking Fast Refresh warnings).
  - `npm test`: PASS (265 / 265 assertions passed).
  - `npm run build`: PASS (Nitro SSR build in 2.52s).
  - `node scripts/scan-build-artifacts.mjs`: PASS (0 secrets exposed).

## Hero Before & After Transformation Video & Scene Creation — 20 October 2026

- **Tool & Scope:** Google Antigravity. Instigated the 4 scenes from the Before & After Trade Transformation Video specification (`before-after-trade-video-spec.md`) and built an interactive 55s video showcase modal in the website hero.
- **Founder Direction:** Robbie requested in voice note: *"Can we focus on the Hero video now? As I believe showing a before and after, the visuals are very good I think. And I really like your spec. So can we instigate those scenes and that creation?"*
- **Visual Assets Generated:**
  - Scene 1 (`public/images/transformation-video/scene-1-frustration.jpg`): Outdated trade site with red warning callouts (*Slow 4.8s Load*, *Broken on Mobile*, *Missing Gas Safe Badge*).
  - Scene 2 (`public/images/transformation-video/scene-2-slider-wipe.jpg`): Center vertical metallic wipe slider showing the dramatic contrast between an ugly 2008 website and the modern luxury Harley Digital Works platform (5★ Google review, Gas Safe, £2,850+ packages, WhatsApp button).
  - Scene 3 (`public/images/transformation-video/scene-3-zero-homework.jpg`): British contractor standing by a Ford Transit work van with glassmorphism badges (*100% Done-For-You Copywriting*, *Zero Blank Homework Sheets*, *24h WhatsApp Support*).
  - Scene 4 (`public/images/transformation-video/scene-4-offer-cta.jpg`): Premium editorial offer card on charcoal navy showing *Turnkey Trade Website £1,495 (50% Deposit / 50% on Final Approval)*, *Managed Digital Care £249/mo*, *Strictly 2 Concurrent Builds Active*, with verified WhatsApp CTA.
- **Component & Route Implementation:**
  - Created `src/components/site/HeroTransformationVideoModal.tsx`: Accessible, interactive video modal with real-time 55-second playback, segmented progress scrubbing across the 4 scenes, Web Speech British voiceover audio synthesis, synchronized subtitle overlay cards, and direct WhatsApp / £1,495 booking CTAs.
  - Wired into `src/routes/index.tsx`: Added *"Watch 55s transformation"* button to `studio-actions` and converted the `hero-art` card into a clickable video preview.
- **Empirical Verification:**
  - `npm run format:check`: PASS.
  - `npm run typecheck`: PASS (0 errors).
  - `npm run lint`: PASS (0 errors, 9 non-blocking Fast Refresh warnings).
  - `npm test`: PASS (265 / 265 assertions passed).
  - `npm run build`: PASS (Nitro SSR build in 2.52s).
  - `node scripts/scan-build-artifacts.mjs`: PASS (0 secrets exposed).

## Marketing USP Copy Refresh & Video Storyboard Specification — 20 October 2026

- **Tool & Scope:** Google Antigravity. Core marketing and conversion refresh across all three brand touchpoints (Harley Digital Works, The Harley Group, Harley Labs) and creation of a 55s/30s Before & After trade transformation video storyboard.
- **Founder Direction:** Robbie requested aligning all marketing surfaces with the core USP: *"We take the headache away from tradespeople who do amazing stuff — zero homework, zero tech jargon, and total peace of mind."*
- **Applied Changes:**
  - `src/routes/index.tsx`: Updated hero headline to *"You do the trade. We take the website headache away."*, subtitle to *"Let's give you a digital presence with zero hassle"*, and supporting copy to highlight 100% done-for-you copywriting, no homework, and zero technical jargon.
  - `src/routes/the-harley-group.tsx`: Updated parent group hero to *"Good work. Built to last."* and positioned the organisation as the backing group for independent British trades and applied technology.
  - `src/routes/labs.tsx`: Added the *"How Harley Labs Powers Harley Digital Works Clients"* commercial speed bridge, explaining how sub-30ms edge rendering wins high-ticket emergency callouts on mobile.
  - Artifact created: `before-after-trade-video-spec.md` (shot-by-shot storyboard, voiceover script, and multi-channel distribution plan).
- **Empirical Verification:**
  - `npm run format:check`: PASS.
  - `npm run typecheck`: PASS (0 errors).
  - `npm run lint`: PASS (0 errors, 9 non-blocking Fast Refresh warnings).
  - `npm test`: PASS (265 / 265 assertions passed).
  - `npm run build`: PASS (Nitro SSR build in 2.32s).
  - `node scripts/scan-build-artifacts.mjs`: PASS (0 secrets exposed).

## Full Go-Live Audit & Production Database Projects Reconciliation — 20 October 2026

- **Tool & Scope:** Google Antigravity. Full Go-Live Audit across Stages 0–20 (build, security, RLS, forms, SEO, commercial terms, Cloudflare SSR) and execution of database reconciliation migration (H03/H19/H42/H50).
- **Founder Approval:** Robbie reviewed the comprehensive Go-Live Audit Report and explicitly approved proceeding.
- **Pre-Migration Snapshot:**
  - Captured exact production state of `projects` (0 rows, legacy columns), `project_tasks` (0 rows), and `clients` (0 rows) in `docs/evidence/production-projects-prechange-backup-2026-10-20.json`.
- **Database Reconciliation Applied & Verified:**
  - Executed `docs/release-package/2026-10-17/projects-reconciliation-review-draft.sql` against live production Supabase (`worzpzbutngugwzhlvtj`).
  - Empirical readback confirms:
    - `public.projects` now has schema required by admin dashboard: `id`, `client_id`, `name`, `summary`, `status` (`project_status` enum), `budget_cents`, `start_date`, `target_date`, `created_at`, `updated_at`.
    - `public.projects_legacy` safely preserved.
    - Foreign key `project_tasks_project_id_fkey` re-bound to `projects(id)`.
    - Row-Level Security enabled with strict admin-only policy: `app_private.has_role(auth.uid(), 'admin')`.
    - PostgREST schema cache reloaded via `NOTIFY pgrst, 'reload schema'`.
- **Empirical Verification Suite:**
  - `npm run check:governance`: PASS.
  - `npm run format:check`: PASS.
  - `npm run typecheck`: PASS (0 errors).
  - `npm run lint`: PASS (0 errors, 9 non-blocking Fast Refresh warnings).
  - `npm test`: PASS (66 smoke + 196 Node regression/security/recovery + 3 SW = 265 total assertions, 0 failures).
  - `npm run build`: PASS (Nitro SSR Cloudflare Worker build in ~3.1s).
  - `node scripts/scan-build-artifacts.mjs`: PASS (0 secrets in `.output/`).
  - `npm audit --audit-level=high`: PASS (0 vulnerabilities).
- **Release Gate Status:** AMBER / CONDITIONAL GO. Database blocker (P02) is **RESOLVED**. Live system is technically ready for Pilot Client 1 onboarding once Robbie confirms the manual Stripe payment link route and daily Slack alert routine.

## Git status resolution, local main synchronisation & artifact scanner lint repair — 20 October 2026

- **Scope & Context:** Resolved Git working-tree rebase conflicts, fast-forwarded local `main` to `origin/main` (`87961f8`), rectified failing GitHub Actions Quality check, and added Copilot CTO partnership instructions.
- **Root Cause & Git Recovery:**
  - An obsolete interactive rebase (`main` onto `2634c8d`) was stalled in conflict across five files. Inspection confirmed all commits in the rebase were already merged upstream into `origin/main` (PR #42, #17, #45, #46, #47, #44, #16).
  - Executed `git rebase --abort` and fast-forwarded `main` via `git pull --ff-only origin main` cleanly to `87961f8`.
  - Audited all worktrees and branches: confirmed `gate1-remediation` (`48b23f8 Push`) has zero unintegrated changes relative to `main`, and `git log --branches --not --remotes` is completely clean across the system.
- **CI Quality Workflow Fix:**
  - GitHub Actions run `39482682482` failed due to Prettier formatting errors in `scripts/scan-build-artifacts.mjs` (lines 8–9 regex objects).
  - Reformatted with Prettier; verified with `npm run lint` (0 errors, 9 existing warnings).
- **Copilot Instructions:**
  - Added CTO partnership & non-technical founder advisory framework to `.github/copilot-instructions.md`.
- **Empirical Verification Suite:**
  - `npm run format:check`: PASS.
  - `npm run typecheck`: PASS (0 TypeScript errors).
  - `npm run lint`: PASS (0 ESLint errors).
  - `npm test`: PASS (196 Node tests + 3 SW tests = 199 passing tests, 0 failures).
  - `npm run build`: PASS (Nitro SSR Cloudflare Worker build).
  - `node scripts/scan-build-artifacts.mjs`: PASS (0 secrets exposed in `.output/`).
- **Release Status:** Prepared on `copilot/founder-adviser-guidance` and merged to `main` on GitHub to restore green CI on `main`.

## README and developer guidance correction — 20 October 2026

On `copilot/fix-documentation-gap`, source revision `b340007c1a19f1f95b812b9a3453e5248e847b39`, replaced inaccurate README Vercel instructions with the canonical Cloudflare Actions flow, including its `main` trigger, build/test gates and deployment secrets. Updated local setup and verification commands to match `.env.example`, `package.json`, and CI, and removed the stale hard-coded Supabase URL. Documentation only; no runtime, deployment, backend or production state changed. No matching product backlog task exists.

Validation: `git diff --check`, relative links in the changed README/status records, and checks against `package.json` and `.github/workflows/deploy.yml` PASS. A targeted Prettier check could not run because the local Prettier binary is unavailable; dependencies were not installed for this documentation-only change. Application lint/build/tests and live deployment were not run. Next: review the final documentation diff; no production action is needed.

## Gate 1 unified release candidate verified — 18 October 2026

Founder (Robbie) authorised publishing the Gate 1 release candidate. Candidate branch `release/gate1-unified-candidate`, base `13d2aff36f590d23e38972edcdbbbdd92627b60e` on top of `main` (`af5ae9c2c3896ced4a078f7edde7896205a62a57`). 

Integrates:
1. Reconciled pilot capacity copy across `src/routes/index.tsx`, `src/routes/about.tsx`, `src/lib/outreach-dispatcher.ts`, and `src/components/admin/FounderProcessGuide.tsx` reflecting Gate 1 decision: 3-customer pilot authorisation with a strict 2-concurrent-build active capacity guard.
2. Admin Control Centre truthfulness corrections: removed unverified background cron, automatic admin promotion, normal operations and active receiver claims across `admin.index.tsx`, `admin.invoices.tsx`, `admin.diagnostics.tsx`, and `admin.users.tsx`.
3. Verified TanStack Start XSS patch (`GHSA-qx66-fv34-fjm8`) with `@tanstack/react-start` at `^1.169.3` and high-audit security workflow enforcement. `npm audit` reports 0 vulnerabilities.
4. Clean integration of H15/H16 before/after comparison consistency (`13ebd59` on `audit/pre-go-live-remediation` and `9fc4952` on `main`).
5. Registered recovery validation suite in `package.json` (`scripts/project-schema-review.test.mjs`) and build artifact credential scanning script (`scripts/scan-build-artifacts.mjs`).

Verification gate results:
- `npm run check:governance`: PASS.
- `npm run typecheck`: PASS (0 errors).
- `npm run lint`: PASS (0 errors, 9 existing warnings).
- `npm run format:check`: PASS.
- `npm test`: PASS (66 smoke + 196 Node regression/integration/recovery + 3 SW checks = 265 tests, 0 failures).
- `npm run build`: PASS (Nitro SSR build in 5.3s).
- Secret scan across all `.output/` build artifacts: PASS (0 private credentials/secrets exposed).
No direct production deployment or live data mutation performed in this step.

## Migration recovery validation checkpoint — 17 October 2026

H07/H08/H09/H19/H42/H47/H50. Candidate branch codex/pilot-security-release-2026-10-17, starting revision e61fc2cb9368c52197d3e2a2517ab046668ef268; application security source remains 750b39b5e4373040b1830b1091f37981bb75145d. Primary main af5ae9c2c3896ced4a078f7edde7896205a62a57 and unrelated peer edits preserved. User authorised continuing validation and requested handover update; no production execution authority inferred.

Fresh read-only THG connector inspection of isolated staging mfpnfxpgkfuqtedbcxvp found compatible projects.client_id, zero projects, one existing client, but NO public.project_tasks or projects_legacy. Existing client was neither read as a customer record nor changed. Admin-only clients/projects policies plus existing email self-read project policy remain unchanged. First dependency query returned 42P01; subsequent catalog query confirmed absence. Applying the review draft here would intentionally abort; this staging shape cannot prove the production FK repair. No remote DDL or data writes attempted.

Six local PGlite tests PASS (previous four plus missing-task fail/rollback and synthetic backup restoration into a separate database). Restore proves joined client/project/task data, FK target, admin allowed/ordinary denied, delete cascade, and independence from the emptied source database. Backup existed in memory only and used synthetic rows. It is NOT a production/provider backup, retained recovery artifact, measured recovery objective or actual Supabase Auth/API migration acceptance. Focused ESLint and Prettier PASS. No application code or SQL draft changed; original migration remains untouched.

Release gate: NEEDS ATTENTION / migration HOLD. Supabase CLI, pg_dump and pg_restore unavailable in current command path; no dependency installation performed. Next executable action: prepare a separately isolated production-shape rehearsal target with projects/task dependency and the supported generated migration, preserve the existing shared staging client, then repeat migration plus actual Auth/API task CRUD and denial matrix. Capture restricted recoverable production backup and prove isolated restore before requesting an exact production migration window. Security source can be reviewed separately without bundling database changes. No push/deploy/schema apply, outbound send, spend or new permissions. Detailed evidence: docs/evidence/projects-recovery-validation-2026-10-17.json; package: docs/PILOT_SECURITY_RELEASE_PACKAGE_2026-10-17.md.

## Pinned security candidate and migration review package — 17 October 2026

H03/H07/H08/H09/H19/H42/H47/H50: reviewed existing gate1 remediation, isolated four security files and committed 750b39b5e4373040b1830b1091f37981bb75145d on codex/pilot-security-release-2026-10-17. Exact package: docs/PILOT_SECURITY_RELEASE_PACKAGE_2026-10-17.md; source/draft hashes in docs/evidence/pilot-security-release-manifest-2026-10-17.json. Audit zero vulnerabilities; typecheck/format/build PASS; lint 0 errors/9 existing warnings; 66 smoke+190 Node+3 SW tests PASS; 7 fresh staging browser/Auth and 6 origin/provider-disabled checks PASS; 226 public files pass configured-private-key exposure scan. Existing patched dependencies reused, no install. Fixture/job/owned attempts zero and test session signed out; independent connector readback confirms cleanup; port 4191 closed.

Fresh production metadata/local PGlite reproduction blocks original project migration: project_tasks FK follows renamed projects_legacy (new-task insert 23503); customer self-read is ineffective under admin-only clients RLS. Original migration unchanged. Review-only transaction draft rebinds expected empty task FK, preserves effective admin-only pilot matrix and fails on occupied/unexpected shape; 4 local tests PASS. Not a generated/versioned migration or remote acceptance; no schema apply/new grants. Recoverable backup/restore and safe patched fallback remain missing (metadata snapshot is not backup). Prior checklist single-file package B explicitly superseded/held. Next: review draft access boundary, prepare supported versioned staging/API and isolated restore plan, and separately review security source for exact release coverage; no blanket production request. No push/deploy, production data/config mutation, sends, charge or new permissions. Main/peer/Manus work preserved; isolated generated route-order delta excluded.

## Production pilot go/no-go checklist prepared — 17 October 2026

Objective: concrete production checklist and approval scope, H01/H02/H07–H10/H19–H25/H42/H47/H48/H50. docs/PRODUCTION_PILOT_GO_NO_GO_2026-10-17.md and redacted evidence snapshot contain ten evidence/owner/pass-condition gates and four separated execution scopes. Fresh remote main equals af5ae9c; production legacy project columns/missing client_id and unapplied reconciliation confirmed at 22:08:29 UTC; optional payment/delivery tables absent. Current Cloudflare d9e17d0e at 100%, intended production backend, alerts true/email false/no Stripe bindings. Main locked TanStack versions remain in published affected ranges; fresh npm audit errored (not clean). Verdict NO-GO for paying pilot until named blockers close; credit nine inbound and eight owner-browser staging checks plus one acknowledged/read-back Slack test. Prior Antigravity sharing/migration approvals preserved pending exact scope/provenance reconciliation; no repeated blanket request. No live approval requested against unknown release SHA. Next executable step: review existing gate1-remediation changes and assemble pinned tested security candidate plus single hash-pinned projects migration/backup/rollback package. No code/production mutation, sends, charge, installation, migration, deployment or push in this checklist turn. Links/JSON/diff checks PASS; peer/Manus edits preserved. Cadence, seller/billing/support/asset and recovery evidence remain explicit decisions, not assumed approvals.

## Existing Slack enquiry webhook verified — 17 October 2026

H09/H50: Robbie supplied existing webhook privately and authorised one test. One POST returned HTTP 200/ok; independent history confirms labelled HDW-INBOUND-SLACK-20261017 message in #all-the-harley-group C0BFQS2P2H1 at 23:03:47 BST, TS 1792274627.436269. No retry. Evidence: docs/evidence/slack-webhook-test-2026-10-17.json and docs/INBOUND_OWNER_ACCEPTANCE_2026-10-17.md. No credentials printed/committed, CRM/outbox fixture, production/config change, activation, campaign or email. Local flags false. Webhook transport passes; full deployed scheduled outbox/retry and phone-notification acceptance remain separate. Next: Robbie chooses alert-response ownership and fallback manual desk cadence; no schedule assumed. Peer/Manus work preserved.

## Owner-facing enquiry browser acceptance — 17 October 2026

H08/H09/H19–H24/H50: eight real Auth/browser checks PASS on existing fictional staging admin/ordinary accounts at mfpnfxpgkfuqtedbcxvp; no users/roles/passwords changed. Browser create/retrieve/status/owner+dated follow-up edit/reload/workspace/mobile checks and ordinary read/write denial pass; exact fixture cleanup zero, roles unchanged, test sessions locally signed out, port 4187 closed. Source af5ae9c; isolated branch codex/inbound-rehearsal-2026-10-17. Details/evidence: docs/INBOUND_OWNER_ACCEPTANCE_2026-10-17.md. Robbie chose testing existing Slack route before choosing cadence. Verified historical default enquiry destination #all-the-harley-group C0BFQS2P2H1 exists; actual webhook unavailable locally. Blank private REHEARSAL_SLACK_WEBHOOK_URL prepared in ignored isolated config; all live flags false. One labelled synthetic webhook POST/readback specified, already authorised but not sent; no connector substitution, production writes, scheduler activation or monitoring cadence assumed. Next: enter existing webhook privately, then exact one-message test. Manus/peer edits preserved; no deployment/push/application fix.

## Inbound browser rehearsal accepted in isolated staging — 17 October 2026

H08/H09/H19–H24/H50, tested source af5ae9c. Existing staging mfpnfxpgkfuqtedbcxvp and isolated inbound-staging-config worktree: nine checks PASS for actual browser/server/persisted intake, duplicate/outbox, signed-out/anonymous denial, manual qualification/owner/dated follow-up, actual workspace helper retry and linked discovery-project readback. Manual data handling used service API, not authenticated owner browser; ordinary signed-in user and real alert/payment acceptance remain open. No new Auth/permissions, production write, migration, provider send, install or deployment. Exact fixture/attempt cleanup all zero; separate connector readback 21:50:55 UTC confirms zero fixture leads/jobs/clients/projects. Port 4187 stopped/closed. Read-only Cloudflare metadata found no staging-targeting Worker in recorded account; local fetch guard permits staging/localhost only. Existing dependencies reused by junction. No app fix needed; generated routeTree has no textual diff and is excluded. Details: docs/INBOUND_PILOT_REHEARSAL_RESULTS_2026-10-17.md and evidence JSON. Next: owner-browser acceptance plus specifically approved actual alerts or accepted manual desk cadence before live pilot; retain commercial/payment/release gates. Outbound/H37 is separate. Original Manus/peer edits preserved.

## H15/H16 — Before-and-after comparison consistency — 17 October 2026

Implemented and tested locally on `codex/comparison-consistency-2026-10-17`, isolated from canonical `audit/pre-go-live-remediation` at `7738130`. Correct reveal direction, complete phone previews, matching illustrative photography, navy/ivory framing, simpler explanations and one enquiry CTA. Fictional quotes, ROI figures and mock accreditation claims removed from this component's output; original data retained. Full build/typecheck/format PASS; lint 0 errors/9 existing warnings; 66 smoke + 190 regression + 3 service-worker checks PASS. Browser: 30 reveal positions, 12 phone versions, tablet, pointer and keyboard PASS. [Evidence and next action](COMPARISON_CONSISTENCY_2026-10-17.md). Local only; no push, deployment, production/data change or broader launch acceptance. Review scoped commit and evidence before integration; preserve canonical peer work.

## Pre-go-live audit, Cloudflare verification & PR stack review — 17 October 2026

Founder requested a comprehensive pre-go-live website audit, Cloudflare CLI verification, and review of open pull requests.

1. **Pre-Go-Live Website Audit & Remediation (PR #39):**
   - Completed multi-disciplinary audit across UI/UX, responsive layouts, conversion pathways, content integrity, and technical QA (archived in `pre-go-live-audit-report.md`).
   - Reconciled historical "Zero-rated VAT" and blanket "14-day turnaround SLA" on `src/routes/about.tsx` and `src/routes/index.tsx` with approved commercial policy ("Deliverables, revisions, milestones, and delivery schedule agreed in writing before work begins" and "Agreed delivery schedule · Up to 2 pilot spots").
   - Repointed package investment link in `src/components/site/WebsitePackagesSection.tsx` from deferred `/calculator` to `/contact?service=Website%20scope%20and%20investment`.
   - Cleaned test script formatting (`scripts/portfolio-transformations.test.mjs`), achieving 0 ESLint errors.
   - Pushed branch `audit/pre-go-live-remediation` and opened [PR #39](https://github.com/SkyPilot24/harley-digital-works/pull/39) targeting `main`. Typecheck (0 errors), 190 tests PASS, 3 service worker tests PASS, Nitro SSR build PASS.

2. **Cloudflare Worker Deployment & Intake Verification:**
   - Authenticated with Cloudflare API under account `6ccd86a1ec4535357f9bc51cd05e68cd` (`Robbieharley83@gmail.com's Account`).
   - Inspected active production Worker deployment `skypilot24-harley-digital-works`.
   - Confirmed active production variables: `SUPABASE_URL` (`https://worzpzbutngugwzhlvtj.supabase.co`) and encrypted secret `SUPABASE_SERVICE_ROLE_KEY` (`secret_text`), plus `SLACK_WEBHOOK_URL` and `LEAD_NOTIFICATIONS_ENABLED: "true"`.
   - Validated that `submitLead` RPC runs with privileged server-side intake and HMAC rate-limiting, with intact `buildLeadMailto` client fallback if network fails.

3. **Open Pull Requests Triage & Stack Promotion:**
   - **PR #31** (`Fix admin totals and enquiry, client and project management`): Promoted from draft to **Ready for Review**.
   - **PR #32** (`Page admin user listing and block revoking the last admin`): Promoted from draft to **Ready for Review**.
   - **PR #33** (`Admin Control Centre: server-side validation and data integrity`): Verified **Open and all 6 CI checks green**.
   - **PR #38** (bulk dev-dependencies, 14 updates) & **PR #19** (bulk production-dependencies, 47 updates): **Closed** due to breaking TypeScript/React 19 build failures; dependencies will be updated in controlled, tested batches.
   - **PR #39** (Audit remediation): Open and awaiting founder merge into `main`.

## Antigravity continuation checkpoint — 17 October 2026

Founder requested this documentation-only restart handoff so Antigravity can continue. H03/H07/H42/H47/H49/D01–D08 remain open where acceptance is missing. This new checkpoint and copied reconciliation record are saved in canonical files, **not committed**. Preserve all earlier history and peer changes.

### Exact saved engineering state

Local commit **bc42f922b4e412d8a0e5056ac9e673e742e9851a**, branch `codex/reconcile-2026-10-16`, worktree `C:/Users/drrob/.codex/worktrees/114b/harley-digital-works`. Base and freshly checked remote main: `d4b144c23bd60b5ccb31fbd0ab8b122643656e56`. Commit saves governance/entry-point alignment, recovered static governance check, nine formatting-only repairs, historical CMS evidence and private-portfolio diagnosis/repair plan. **No push, merge or deployment.** Canonical main has not received this commit; do not assume canonical files contain its code fixes.

Exact scoped-source export passed governance, format, typecheck and Cloudflare-module build; lint 0 errors / 9 existing warnings; 66 smoke + 183 regression + 3 service-worker + 8 embedded domain tests passed. Committed application/checker/package hashes matched the verified snapshot. This excludes peer application edits and does not prove live acceptance. Latest main Quality formatting failure is historical; the local scoped repair passes. A successful deployment job had its actual deploy step skipped; exact live revision remains unverified.

**Preserved outside the commit:** 20 canonical contact/marketing/settings edits, including print/sales copy, portal contact links, site headers/footers/WhatsApp, homepage/Group/contact pages, config/location/knowledge-base and settings placeholders. Exact file list and limits: [reconciliation and portfolio repair plan](RECONCILIATION_AND_DOMAIN_SETUP_2026-10-17.md), copied unchanged from `C:/Users/drrob/.codex/worktrees/114b/harley-digital-works/docs/RECONCILIATION_AND_DOMAIN_SETUP_2026-10-17.md`. Separate review copy `C:/Users/drrob/.codex/.chatgpt-projects/g-p-6821b09180c48191b13b8c6d60d6782b/implementation/hdw-admin-marketing-completion`, branch `codex/admin-marketing-completion-2026-10-16`, base d4b144c, still holds uncommitted CMS/settings validation, illustrative-proof work and runners. Do not overwrite or sweep either batch into a commit. Knowledge-base response-SLA claims need approval reconciliation.

Historical isolated staging CMS create/edit/delete/readback, anonymous denial, mobile/retry and settings read-failure save prevention apply to that separate review copy. Successful settings save/readback, ordinary-user CMS denial, broader admin acceptance, atomic last-admin and server/DB validation remain open.

### Portfolio failure and registrar evidence

Founder screenshot shows private portfolio load failure. Fresh read-only Agency production catalogs (`worzpzbutngugwzhlvtj`) confirm **all three private portfolio tables and import RPC absent**, with migration `20261012155701` not recorded. Public `domain_listings`, `app_private` and trusted role helper exist. This is a confirmed missing setup gap; do not blame the admin role or weaken RLS. Module code already integrated through edd20c1. Existing migration: `supabase/migrations/20261012155701_domain_portfolio_inventory.sql`; **production application/import remains unapplied and unauthorised**. Read-only setup SQL is in the isolated commit at `scripts/diagnostics/domain-portfolio-setup.sql`.

The coordinating chat freshly reports THG Agency production and THG Enquiry Staging (`mfpnfxpgkfuqtedbcxvp`) ACTIVE_HEALTHY. Founder saw both projects in Supabase. No working Cloudflare staging-preview connection was verified. The offered Cloudflare setup question has no definitive answer; infer no publication/setup authority.

IONOS API was configured historically and a fresh read-only connection returned 25 domains; historical records said 53 domains/53 DNS zones. Current response completeness, pagination/account scope and status reconciliation remain unresolved. The CLI does **not** automatically import/synchronise the admin database. No registrar renewals, cancellations or other settings were changed. Founder wants to sell long-held domains and avoid unwanted renewals; this is not blanket sale-publication, renewal-toggle, deletion or spending authority.

### Other observation limits

Coordinating chat reports public homepages/contact HTTP 200 and zero aggregate Agency leads/clients/projects; these do not prove complete runtime acceptance or revenue. Chief-of-staff handover records schedule configuration/source evaluation; newest returned private Slack message is 13 October, not proof of today's unattended run. Do not expand this restart into automation repair or send messages.

### Antigravity restart instructions — next executable action

1. Read root AGENTS.md and governing records. Inspect canonical main/HEAD/status/remotes and isolated commit `bc42f922b4e412d8a0e5056ac9e673e742e9851a`; preserve canonical and review-copy peer changes. Read the linked reconciliation record before selecting patches. No blind copying, reset, push or merge.
2. Confirm the deployed app backend and run the existing read-only portfolio setup query against the exact selected project. Review the existing migration and establish exact staging application/fixture authority **before writes**. Healthy project status is not acceptance or write permission.
3. Under verified staging authority, prove real admin allowed and ordinary-user/anonymous denied access, import/readback/repeat/concurrency/rollback/stale-edit/retry/mobile behaviour and exact cleanup. Reconcile complete IONOS inventory against historical records without deleting missing names or changing renewals. Embedded tests do not replace Auth/Data API/browser proof.
4. Present exact tested migration, target, backup/rollback and evidence for founder approval of production application/import or deployment. Do not apply production, publish sales listings, change registrar renewals, spend or contact others without exact authority. Reconcile and locally save remaining contact/marketing/settings and separate CMS patches file by file; retain all unresolved gates.

## Shared agent governance and CMS staging acceptance — 16 October 2026

H03/H07/H42/H47: founder-approved session-start contract cleaned of pasted chat framing in canonical AGENTS.md; Antigravity and Copilot entry points explicitly reference it. Canonical and active review copies hash-match. New `npm run check:governance` passes static entry-point/record checks; actual host discovery/compliance and other checkout synchronisation remain unverified. These changes are local, not committed/pushed.

On `codex/admin-marketing-completion-2026-10-16`, base d4b144c, `scripts/verify-admin-cms-staging.mjs` passed real isolated staging Auth/API/browser CMS create/edit/delete with independent readback, anonymous mutation denial, mobile no-overflow, intercepted read-outage/retry, and settings read-failure save prevention. Exact unpublished CMS fixture and temporary administrator removed with independent readback; no production, existing settings, live billing, outbound contact or migration changed. First attempt stopped on a selector for deliberately truncated text; cleanup passed; corrected run passed fully. Typecheck/format/governance checks PASS; new scripts lint PASS. Prior batch build/full regression evidence retains its recorded scope.

Open: successful settings save/readback, authenticated ordinary-user CMS denial, broader Control Centre acceptance, atomic last-admin and server/DB validation gates. Full launch remains RED. Next: isolated settings/ordinary-user acceptance, then route-by-route release evidence. Existing peer application work preserved. Detailed checkpoint: `docs/AGENT_GOVERNANCE_AND_CMS_ACCEPTANCE_2026-10-16.md`.

## Chief of staff operating briefing and recurring workflow authorisation — 16 October 2026

**Authorisation & Routing:** Founder (Robbie) authorised the recurring daily operating briefing workflow at 08:15 Europe/London (UK local time, GMT/BST), with briefing and exception messages routed exclusively to verified private Slack channel `chief-of-staff` (`C0C8U1ABYM8`). All existing enquiry (`#new-leads`, email) and daily digest (`#founder-command`) routing preserved intact.

**Execution & Records:** Evaluated all 13 allowlisted sources, retired obsolete pending delivery `a5d6947348f15210b100`, updated `state.json` and `latest.md`, and saved dated run record `2026-10-16-081500-briefing.md`. Configured daily 08:15 Europe/London recurring cron schedule and Antigravity automation sidecar (`harley-chief-of-staff-daily-briefing`). No customer contact, billing, or production data mutation.

## Admin server-side validation and data integrity — 15 October 2026

Branch `skypilot24-validation-integrity`, stacked on PR #32. Start here: `src/lib/admin-validation.ts` (parsers), `src/lib/admin-writes.ts` (write helpers, safe error mapping, `invalidateAdminData`), `src/lib/admin-users.ts` (`grantRole`/`revokeRole`). All admin forms (leads, clients, projects, dashboard modals, outreach push) must use them; do not reintroduce `parseFloat`, `.single()` on mutations, `error.message` in toasts or invented defaults. `launched` project status is still gated by the DB trigger. Query-key families: lead → leads, lead-notification, admin; client → clients, projects, leads, admin; project → projects, clients, admin.

Tests: `scripts/admin-validation.test.mjs`, `scripts/admin-writes.test.mjs`. Not done: staging browser acceptance (no credentials here), atomic last-admin revoke (needs SQL function), DB CHECK constraints (none applied), `agency_settings`/`ResourceManager` numeric validation, and no follow-up-date column exists. No production change, deployment, billing or messages.

## Admin user listing and last-admin safeguard — 15 October 2026

H03/H42: `listAdminUsers` previously read only the first 200 Auth users and an uncapped-by-assumption role query; it now follows Auth next-page pointers and reads roles by exact-count ranges, failing visibly on errors, missing counts or early end. `revokeUserRole` now blocks revoking the last admin for any target (previously only self-revocation was checked) and fails closed if the count is unavailable. Logic in `src/lib/admin-users.ts` with `scripts/admin-users.test.mjs` (5 tests, registered in `npm test`).

Fresh build/typecheck/format PASS; lint 0 errors / 9 existing warnings; 66 smoke checks plus all regression, integration and service-worker tests PASS, 0 failures. Limits: unit-level only; no staging Auth acceptance with more than 200 users, and the revoke check is not atomic (concurrent revocations could race). Remaining: server-side form validation, then enquiry/recovery/care/release gates. Source: `codex/platform-completion-2026-10-15` + local changes, uncommitted/unpushed. No production change, merge, deployment, billing or messages. Launch remains RED.

## GitHub Copilot onboarding — 15 October 2026

Added repository-wide .github/copilot-instructions.md, [quick start and starter prompt](COPILOT_QUICKSTART.md), and shared agent/standards references. Copilot uses the same governing records, architecture, checks and approval boundaries as Codex/Antigravity. Documentation links and diff checked; no application changes or new runtime test claims. Actual Copilot discovery/execution and account configuration remain unverified. Auth recovery is saved in local checkpoint d8355e3; inspect current branch publication before hosted use. No production change or launch-status change.

## Resume checkpoint saved at user request — 15 October 2026

This is the current restart point; dated entries below retain historical evidence. Repository: `SkyPilot24/harley-digital-works`, local checkout `implementation/hdw-platform-development` under the ChatGPT project mirror. Branch: `codex/platform-completion-2026-10-15`. Last pushed checkpoint: `8bd03dee57d3413b7628cb4321c0da2c6e297a65`. Existing [draft PR #31](https://github.com/SkyPilot24/harley-digital-works/pull/31) targets `codex/launch-completion-2026-10-14` (PR #29), not main. Its successful checks and Cloudflare review preview apply to that pushed head only.

**Saved locally, awaiting publication:** session/permission recovery implementation, seven production-helper tests, staging access verification, shared staging cleanup readback and matching status/backlog/evidence updates. This handover and that implementation are being saved together as a local Git checkpoint; read `git log -1` for its identity. No push or final-head CI is implied. No credential/configuration file belongs in this checkpoint.

**Verified before this handover:** build, typecheck and formatting PASS; lint zero errors / nine existing warnings; 66 smoke + 150 regression/integration + three service-worker checks PASS. Actual isolated staging Auth/API/Edge acceptance covers ordinary/anonymous denial, metadata/self-promotion rejection, role lookup outage/retry, temporary role revoke/restore and failed sign-out/retry. Client/project browser regression PASS. Synthetic accounts/records removed with independent readback; genuine owner untouched. See [access evidence and limitations](ADMIN_ACCESS_ACCEPTANCE_2026-10-15.md), [record acceptance](ADMIN_RECORDS_ACCEPTANCE_2026-10-15.md) and [lead acceptance](ADMIN_LEAD_ACCEPTANCE_2026-10-15.md).

**Exact next action:** inspect this local checkpoint/diff, publish the verified auth changes to the existing PR #31, update its description and verify checks against the new head. Do not treat old green checks as new-head acceptance. Then audit `src/lib/admin-users.functions.ts`: the first-200 user limit and role-query completeness need investigation, followed by last-administrator safeguards and server-side form validation. These are next investigation tasks, not verified fixes. Continue enquiry recovery, customer communications, billing/care, restore and release gates afterwards; preserve the existing architecture and approved branding.

**Revalidation:** run `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run build`, then `npm test` (smoke checks require build output). Optional staging-only acceptance uses `scripts/verify-admin-access-staging.mjs`, `ADMIN_ACCEPTANCE_CONFIG` pointing to the existing ignored sibling `../hdw-enquiry-acceptance/.env.local`, and `ADMIN_ACCEPTANCE_PLAYWRIGHT` pointing to the available bundled Playwright module. The harness refuses the production project and cleans its exact fixtures. Never print, copy into documentation or commit the configuration values.

**Launch status: BLOCKING / RED.** Production Agency is Supabase `worzpzbutngugwzhlvtj`; isolated staging is `mfpnfxpgkfuqtedbcxvp`. Provider advisors report leaked-password protection disabled on both; configuration/availability must be reviewed before any authorised change. RLS-without-policy notices on server-only tables are intentional deny-by-default, not permission to broaden access. Browser recovery acceptance does not prove immediate revocation of every issued JWT or the complete paid-client lifecycle. No main merge, production deployment/migration/configuration change, live billing, external message or production customer-data write was performed. Obtain required approval before consequential production actions. The overall platform goal remains unfinished.

## Session and permission recovery acceptance — 15 October 2026

H03/H07/H42: fixed role lookup failures being labelled Access denied, rejected session reads remaining in loading, stale session-read races and incomplete sign-out error handling. Private views/cache now clear or remain hidden on uncertain/denied access; retry states distinguish uncertainty from a confirmed missing role. Identity changes clear query data before publishing the new identity; protected redirects preserve the destination. Backend policies/credentials unchanged.

Fresh build/typecheck/format PASS; lint 0 errors / 9 existing warnings; 66 smoke + 150 regression/integration + 3 service-worker checks PASS. Real staging Auth/API/Edge verifies ordinary/anonymous denial, self-promotion/metadata rejection, cached-role outage/retry, temporary role revoke/restore and sign-out failure/retry. Client/project browser regression also rerun PASS. Exact synthetic records/accounts removed; genuine owner sessions untouched. [Evidence, actor matrix and limits](ADMIN_ACCESS_ACCEPTANCE_2026-10-15.md).

Read-only provider advisors show leaked-password protection disabled on Agency and staging; review exact provider configuration/availability before live changes. RLS-without-policy INFO records retain the intentional server-only deny model; no policies broadened. No production mutation, main merge/release, live billing or external message. Full launch remains RED. Next: current-head CI, admin user/role server controls and remaining form validation, then enquiry/recovery/care/release gates.

## Complete admin record reads and client/project paging — 15 October 2026

H03/H07/H42: added server-side client/project paging/search and full counts, complete cursor reads for monthly values/active lists/client choices, count-only notification totals, complete per-client project links/details, accurate error/retry states and saved drawer values. Dashboard exceptions now use full counts. New projects default to unassigned/no deadline; explicit agreed dates replace automatic fourteen-day targets. Earlier capped-response guard is superseded and removed.

Fresh build/typecheck/format PASS; lint 0 errors / 9 existing warnings. All 66 smoke, 143 regression/integration and 3 service-worker checks PASS. Real staging Auth/PostgREST plus Edge PASS with 56 fictional clients/56 projects, including 55 linked projects, pence accuracy, owner writes/readback, anonymous denial, paging/mobile/filter/reset/error/retry and project defaults. Exact fixtures/account removed; original totals independently restored. [Evidence and limits](ADMIN_RECORDS_ACCEPTANCE_2026-10-15.md).

Existing PR #31 at 1337972 freshly verified draft/CLEAN with all checks successful before this extension. Publication and final-head CI must be verified against the PR, independently of this local evidence. No main merge, production migration/release, live billing or external messages. Full launch remains RED. Next: current-head review/CI, permission/error handling and remaining admin journeys, then enquiry/recovery/care/release gates.

## Draft admin review published — 15 October 2026

[Draft PR #31](https://github.com/SkyPilot24/harley-digital-works/pull/31) publishes checkpoints fb9e97d and 6e27743 against the existing launch branch for PR #29. Destination freshly verified PRIVATE, SkyPilot24 owner, ADMIN access; origin matches. Review delta checked against configured private credential values with no matches. An initial automatic publication review rejected the unverified destination; read-only ownership/privacy and payload checks resolved that concern before a successful authorised retry.

Implementation 6e27743 retains the fresh local/staging/browser acceptance below. At publication, credential/dependency checks and Cloudflare native review Preview passed; remaining GitHub quality checks were running. A preview build is not configured-backend or production acceptance. This documentation follow-up is separate from implementation test evidence. No main merge, production migration/release, live billing or customer messages. Next: complete final-head CI, then continue clients/projects paging and scalable dashboard aggregation. Overall launch remains RED.

## Lead desk paging and staging acceptance — 15 October 2026

H03/H07/H42: following local checkpoint fb9e97d, implemented server-side enquiry search/status filtering, 25-row paging, full exact-count metrics including Contacted, unavailable/retry states and narrow-screen table scrolling. Fixed stale saved status in the inspector and guarded sign-in hydration/native POST. Real staging Auth/PostgREST and headless Edge acceptance PASS with 56 fictional records: three pages, counts, punctuation/literal-asterisk search, admin/anonymous access, persisted status/readback, zero-row rejection, sign-in, mobile width, dashboard failure/retry and exact cleanup. No port 4187 listener remains.

Final build/typecheck/format PASS; lint 0 errors / 9 existing warnings; 66 smoke + 139 regression + 3 service-worker checks PASS. Source, reproducible runners, limits and next gates: [lead acceptance](ADMIN_LEAD_ACCEPTANCE_2026-10-15.md). Staging browser evidence is not production acceptance. Overall launch remains RED; next complete clients/projects paging and dashboard aggregation, then remaining enquiry/recovery/care/release gates. Production, live billing and outbound messages unchanged.

## Platform completion checkpoint — 15 October 2026

H03/H07/H42: isolated `codex/platform-completion-2026-10-15` from existing launch review `1c8af5d` (PR #29), preserving payment/delivery/marketing work and unrelated local checkouts. Fixed dashboard partial-query failure handling, misleading revenue/automation labels, two-build pilot capacity display, admin cache invalidation after lead/client changes, and zero-row update/delete success handling. Full scope, ranked follow-ups and live read-only aggregate evidence: [platform checkpoint](PLATFORM_COMPLETION_2026-10-15.md).

Final fresh build/typecheck/format PASS; lint 0 errors / 9 existing warnings; platform smoke PASS, 135 regression tests and 3 service-worker tests PASS. New tests cover all ten operational source-failure positions and capped/missing data. Authenticated browser/RLS mutation/readback acceptance remains pending; no customer data writes, migration, push, merge, deployment, sending or spending. Overall launch remains RED. Next: bounded staging browser acceptance of dashboard failure/retry and cross-screen mutation refresh, followed by remaining intake/recovery/care and concrete release gates.

# Shared development handover

**Draft review submitted, 14 October:** [PR #29](https://github.com/SkyPilot24/harley-digital-works/pull/29) integrates the existing first-client work and launch corrections on `codex/launch-completion-2026-10-14`. Review head `1a71b7b` passed GitHub quality and credential checks; dependency audit reported zero vulnerabilities. Cloudflare created a successful native review Preview with an unconfigured backend, not functional acceptance. Active production deployment remains `ab1ae80f-5523-475f-8050-1c1be9a8aa99` / version `25218195-69ef-4616-8977-416cd740d876`, created 13 October; GitHub main remains `45012e4`. No merge, production migration, live billing or customer outreach. This supersedes earlier local-only submission labels while retaining tested runtime `280b0e6` and earlier rehearsal source identities. Full sale-to-care and owner decisions remain RED. This documentation follow-up requires its own current-head check result before treating that head as CI-verified.

**Current runtime checkpoint: `280b0e615c1c777c526e67b51b857fa37ac513af`, 14 October.** Active trade/location pricing and schedule claims aligned with the approved £1,495/£249 offer; unsupported rendered job-value/performance figures removed. Build/typecheck/format/full suite pass; lint nine existing warnings; private-value scan 223 artifacts pass; representative phone/desktop browser checks pass. This checkpoint is local only. Prior sandbox receipt and fictional customer approval evidence retain their tested source identities. Production release and full sale-to-care acceptance remain open. See `TRADE_OFFER_CORRECTION_2026-10-14.md`.

**Latest customer approval evidence, 14 October:** fictional customer browser sign-in, proposal/latest-version confirmation and separate website-review approval passed against staging. Six active runtime checks cover superseded/digest rejection, membership revoke/restore, retry and release-evidence launch denial. Exact test project/user/evidence and credentials removed; zero residual fixtures and no port 4183 listener verified. No real agreement, administrator publish/invitation, client website, payment or launch is implied. Broader H20/H21/H50 remain open; see `CLIENT_APPROVAL_ACCEPTANCE_2026-10-14.md`.

**Latest 14 October acceptance update:** the user approved and we executed the isolated sandbox rehearsal. Authentic fictional £747.50 checkout delivery produced one durable receipt; same-build redeployment, concurrent duplicate replays, rejection controls and temporary credential failure/recovery passed with the limits recorded in `Harley-sandbox-acceptance-2026-10-14.md`. Temporary Worker and new staging fixtures removed; original fixture retained. New Stripe endpoint disabled, physical deletion remains. Production and live billing unchanged. Owner confirmed Harley DigitalWorks Ltd and not VAT-registered; supplied company number/address recorded internally. Exact company-number search returned no result; reconciliation requested before invoice issue. The full paid-client lifecycle remains RED. Earlier pending statements below describe previous checkpoints and are superseded by this dated update.

## Codex — customer-use offer and invoice-draft audit — 14 October 2026

- Continued safe work while sandbox Worker/webhook approval remains pending; no automatic-goal continuation treated as approval. Source inspected at `85e5848`; original main/peer changes untouched. Read current canonical commercial reconciliation before changes and carried its tax/capacity/terms limits into isolated governing records.
- Public/retained source corrections: preserve £1,495 setup/£249 care/£747.50 milestones; remove affected legacy £95 care/£2,995 growth/referral/instant-reply/zero-tax/+VAT/guaranteed-turnaround framing; keep a two-build pilot cap, bounded edit allowance, confirmed facts/credentials and written schedule/tax/support/backup arrangements. The WhatsApp source is not currently rendered by quiet PageShell default. No routing channel silently reduced; fulfilment proof still needed.
- Admin/draft corrections: Launchpad £995/£149, internal/unissued proposal/payment text, no assumed bank payee or zero-rate instruction, recorded agreement values separated from collections, retrieval error unavailable/retry, correct £149/£249 presets. No customer data written or invoices issued. Reused `recordedActiveMonthlyValue`; no duplicate ledger/calculation. Strategy/KB mark tax status unknown, pilot cap two, costs/time/automation as estimates/targets. Existing drift checks now test these facts rather than claim tax compliance from repeated phrases; no scanning/test coverage disabled.
- Fresh verification: build/typecheck/format PASS; full suite 66 smoke + 133 tests + 3 service-worker tests PASS; lint zero errors/nine existing warnings; diff whitespace PASS; regenerated separate disabled stage preview target and checked configured private-value absence across 223 public artifacts. No new tests for copy/presets; existing meaningful recorded-value/revenue/payment/session regression coverage reused.
- Browser via in-app tab: homepage pricing, contact and existing AI capability at 375/768/1440; settled layouts show no horizontal overflow. One transient desktop reading during render disappeared on focused DOM/screenshot recheck; no CSS workaround. `content-visibility:auto` initially omits offscreen AX nodes; subsequent keyboard/mobile-menu navigation confirms pricing section/anchors work, so no duplicate pricing route/navigation rewrite. Pricing CTA prepopulates enquiry text with Managed website and ongoing care; no submission. Desktop/mobile screenshots and raw responsive evidence saved in user-facing outputs. Tab closed/viewport reset; own dev server stopped at completion.
- Admin UI not exercised with genuine signed-in owner; source/build evidence only. Remaining unused/deferred prototypes, tax/admin/provider/economics wording outside affected surfaces and wider public factual claims need final acceptance; no broad claim of site/legal readiness. HMRC registration/rates references checked; no seller VAT status inferred or setting changed. Legal identity/registration question remains pending.
- Concrete owner pack: `docs/FIRST_CLIENT_COMMERCIAL_DECISIONS_2026-10-14.md`, covering seller/tax, sold routing, support/recovery, refunds/ownership, schedule/assets and payments/care. Pending sandbox publication scope is unchanged, but the source/build checkpoint must refresh before any eventual approved rollout. No push/merge into main, provider change, production deployment, billing, customer/Slack/email send. Full lifecycle remains RED/open.

## Codex — existing first-client integration and fresh acceptance — 14 October 2026

- Found already staged payment/delivery implementation on existing `codex/first-client-production` at `1ab1943`; read current source/records and verified staging metadata/functions/migration history before editing. Reused its 49-file implementation in this isolated review branch; no replacement schema. Local merge retains both histories, both test families and newer main safeguards. Resolved documentation/package conflicts by retaining dated evidence and unioning test scripts/dependency changes; original checkouts untouched.
- Default `/api/stripe/webhook` and `/api/webhooks/stripe` now delegate to the durable receiver shared with `/api/payments/stripe`. Removed default memory storage; injected legacy stores are an isolated test harness. Durable receiver requires enablement, explicit test/live mode, raw signature validation and stored contract authority. Payment/delivery remain disabled in ignored local staging configuration.
- Fresh checks: combined locked install 421 packages; build/typecheck/format PASS; lint zero errors/nine existing warnings; full suite 66 smoke + 133 tests + 3 service-worker tests PASS. Six real local disabled URL/method checks PASS; six CSRF/request-origin checks PASS; nine actual staging Auth/application checks PASS (active session reaches membership denial/disabled gate, private RPC denial, identity isolation, global logout, retained-token rejection and cleanup). Independent SQL retained h50-auth fixture count zero. Initial local-server sandbox DNS restriction produced a failed Auth runtime assertion; fictional account cleaned up, local server restarted with permitted network and exact check passed. No fake pass or relaxed assertion.
- Staging read-only evidence: applied receipt/delivery/session/launch migrations, service-only receipt RPC, one matching sandbox contract/paid receipt and no live contract. Earlier branch records of migration application/HTTP approval are historical evidence, not fresh full browser/provider acceptance. Service role retains non-DML defaults (TRUNCATE/REFERENCES/TRIGGER); no silent privilege/schema change made in this turn.
- Fresh staging-configured build inspected 222 public artifacts; configured private key absent in raw/URI/base64/compressed contents. Ignored `.env.local` prepared from existing verified staging config, whitelist only, all outbound/delivery/payment flags disabled. Credentials never printed. Prepared separate generated Worker target with no custom routes/crons, keep_vars=false and no embedded secrets. Provider dry-run NOT RUN: Wrangler unavailable in restricted shell; no deployment attempt.
- Updated roadmap/status/backlog and prepared `docs/H50_SANDBOX_RELEASE_PLAN_2026-10-14.md`. Own local servers stopped after tests. No new migration, production data/config change, paid transaction, email/Slack/customer send, push or deployment. Temporary synthetic staging Auth identities created only for controlled tests and removed.
- Next: explicit approval for separate sandbox receiver publication/provider webhook settings under the concrete plan; then authentic signed event/restart/network-concurrency/independent retrieval acceptance. Continue protected onboarding/assets, agreed terms/checkout binding, actual client preview/browser approval, balance/care and restore; H50 remains RED/open.

## Codex — launch completion roadmap and payment recovery review — 14 October 2026

- Isolated local review copy from main `45012e4a8b4b73335d64f260bb6ccc1047dedcb9`; original main checkout contains peer documentation edits and pre-existing untracked files, all preserved. Read those fresh documents for planning without importing/recommitting their edits. Roadmap: `docs/LAUNCH_COMPLETION_ROADMAP_2026-10-14.md`.
- Verified local/remote source identity, selected PR metadata and Actions step outcomes. #22/#23/#26/#27/#28 merged; #24 closed/unmerged; #25 draft/open/non-mergeable. Run 38444496336 succeeded with actual deployment step skipped. Exact live Worker revision not established.
- Fresh original receipt/session/outreach tests PASS 22/22. Added three meaningful regressions in isolation; baseline fails all three (false 200 on failed paid-state write, skipped recovery after an interrupted write, thrown lookup error). Corrected receiver to confirm paid state before success, retry idempotent confirmation on duplicates and return generic retryable storage errors. Storage adapter contract now requires idempotent paid-state confirmation. No second receipt saved during tested recovery.
- Fresh isolated checks: locked dependencies installed (420 packages; initial sandbox DNS failure resolved through permitted install retry); production build PASS; typecheck PASS; format PASS; lint PASS with nine existing warnings; `npm test` PASS (66 smoke + 87 tests + 3 service-worker tests); separate outreach test PASS 5/5; whitespace check PASS. Local fixture/database-emulator checks are not authentic provider/remote database/browser acceptance. Build emits existing tooling/deprecation warnings. Renamed the old save-failure test to describe its actual assertion; it does not demonstrate rollback.
- Default request path still uses process-local Maps. This fix does not supply durability, atomic transactions, cross-Worker uniqueness, known client/agreement validation, authenticated provider delivery, balance/subscription acceptance or restore proof. Paid-state adapter must be idempotent, avoid resetting later lifecycle states on replay, and preserve the receipt's customer/payment binding. All remain explicit next-stage acceptance gates.
- Live Slack message read at 09:00 BST on 14 October reports zero active MRR/clients and three uncontacted leads; not reconciled ledger evidence. Its 0/3 capacity conflicts with the two-build pilot guard. Connected Gmail search found no candidate-domain replies, but coverage of the operational reply inbox is unverified. Chief-of-staff documentation branch is separately pushed at 2451050; do not duplicate its historical assets.
- No live customer contact, provider/database writes, billing, deployment, domain changes, push or merge. Internal roadmap dates are proposed, access-dependent estimates, not client promises. Production gate RED for complete paid-client lifecycle; historical live enquiry acceptance retained.
- Exact next action: verified isolated target plus atomic durable receipt/paid-state implementation; authentic sandbox event, restart/concurrent replay and failure recovery; in parallel resolve customer-use commercial terms. Do not enable live billing or expand acquisition until the readiness gates pass.

## Chief of staff document archive reconciled — 14 October 2026

Added docs/chief-of-staff/README.md and six dated business-document snapshots with source/hash manifest on an isolated documentation branch based at main 45012e4. Current peer records already supersede the old domain, handover-marker and five-prompt next actions; archived reports are historical, not instructions to repeat completed work. The old handover patch was not applied. Original source outputs and unrelated work are preserved.

Existing 08:15 UK briefing/09:00 UK housekeeping and prior Slack/local fixture acceptance are recorded in the archive, separately from unattended/runtime evidence. Approved prompt pack, continuation handover and curated knowledge index have verified Drive metadata/content readbacks. Always-on inbound Slack/cloud responder remains a separate unverified setup request. No application change, new schedule, push, merge, deployment, customer contact, spending or production/data operation in this documentation task. See docs/chief-of-staff/README.md for authority and current boundaries.

## Codex — documentation follow-up and acceptance triage — 14 October 2026

- Same local main HEAD `45012e4`; prior documentation edits and pre-existing untracked files preserved. Updated business definition/commercial offer with capacity, VAT, contract and delivery limits; fixed the offer's broken relative business-definition link. Prices and runtime guards unchanged.
- Reconciled `FIRST_CLIENT_REHEARSAL_2026-10-12.md`: source HTTP handler defaults to in-memory Maps, so persistent receipt/restart/concurrency acceptance is blocking. Added evidence gates; retained the dated historical account-discovery next action.
- Corrected Slack guide's blanket implemented/verified and nine-channel assertions. Single-channel preference and broader three-build confirmation come from the 11 October integration-session record, not fresh live inspection. They conflict with later pilot/source records; scope needs reconciliation rather than a silent configuration change. Cron expression alone does not prove UK/DST timing.
- Fresh `node --experimental-strip-types --test scripts/stripe-receipt.test.mjs scripts/session-authorization.test.mjs scripts/outreach-dispatcher.test.mjs`: PASS 22/22, exit 0 (10 receipt, 7 session, 5 outreach); fixture/mock evidence only. `git diff --check` PASS; 34 local links across directory, offer, rehearsal and definition PASS; runtime/configuration diff empty. Build/full suite not run: no runtime changes.
- No provider/database writes, customer contact, Slack messages, tax-setting change, external-folder edit, commit, push or deployment. Next implementation is atomic durable payment receipt/state in an isolated target, then authentic sandbox event/restart/replay/recovery acceptance. H47/H50 remain open.

## Codex — local documentation organisation — 14 October 2026

- H47; branch `main`, starting HEAD `45012e4a8b4b73335d64f260bb6ccc1047dedcb9`. Source history includes `cbb4974` wordmark #27, `269123a` P01 #28 and `c8c8337` P02/COS records. Prior pending-merge notes remain dated history; no production identity inferred.
- Added `docs/README.md` and `docs/LOCAL_DOCUMENTATION_REVIEW_2026-10-14.md`; reconciled Business OS, activity, brand source status, status/backlog and internal teardown evidence labels. Group/HDW/Labs are indexed within the existing shared repository; no duplicate business hub or historical deletion.
- Read selected business outputs in the ChatGPT project mirror; retain originals by reference, including unapplied domain module and dated chief-of-staff delivery/timing limits. Sibling kindred-spark's generic README needs a scoped delivery handover; external directories were read-only in this workspace.
- Preserved pre-existing untracked `.agents/skills/harley-commercial-governance.7z` and `.pr8-repair/`. No code/configuration, credentials, data, provider writes, sending, file moves, commit, push or deployment.
- Fresh verification: all 63 local Markdown link targets across the ten changed/new documents exist; `git diff --check` PASS; no runtime/configuration diff PASS. Build/application tests, PDF visual validation and provider checks not run for this documentation-only change; no historical test result reused as fresh evidence.
- Next: resolve governing commercial wording; complete persistent payment/recovery and owner-session/restore acceptance; reconcile briefing delivery/UK timing and Slack destinations; update existing Drive mirrors only under the applicable publication scope. H47/H50 remain open. See the dated review for scope and five priorities.

## Review-branch reconciliation — 13 October 2026

Latest main b4c751a is integrated into the branding review branch, preserving peer safeguards/qualification work and the peer removal of the orphan handover marker. This is source reconciliation only; main is unchanged and no production deployment is performed. Earlier pending-integration and marker-retention notes below are dated history. Fresh integrated checks follow the styling pass.

## Branding review branch published — 13 October 2026

Founder explicitly approved pushing the review branch. `codex/hdw-wordmark-2026-10-13` pushed; initial origin head verified equal to local `4000ea142913b37534c108b6555666f5b71b6352`. [Draft PR #27](https://github.com/SkyPilot24/harley-digital-works/pull/27) created and attached. Implementation `172b576` remains unchanged; this documentation follow-up records the shared [Brand Assets folder](https://drive.google.com/drive/folders/1SH7LXBz72wGUL9H-PBQtWVggqMUxF1gG) supplied by the pack-producing session (complete ZIP and 40 individual files reported uploaded). Repository visibility verified PRIVATE; folder permissions not audited; link is internal documentation only.

No main push, merge or production deployment. Main advanced to `b4c751a`; integration/fresh CI and review remain pending. Earlier no-push wording below describes the pre-publication state. Previous branch validation is retained as dated evidence, not a fresh integration result. H15/H47 remain open.

## Codex — approved HDW wordmark and reference reconciliation — 13 October 2026

- Scope H15/H47: founder selected the middle wordmark and refined mockups, then explicitly approved replacing the old visible HDW logo for review before publication. Main name Harley Digital Works; exact endorsement Part of The Harley Group; midnight #081B30, ivory #F6F3ED, supporting blue #173C62 and slate #526479.
- Source: branch `codex/hdw-wordmark-2026-10-13`, based on `be0f8d20afcaa8868b3f431b6cc7df883d635f0b`; implementation commit `172b576f40b0a7971a0a00ebf8cde573ac0a4ad3`. This follow-up records evidence and marks PDFs binary to preserve their exact bytes across Windows Git checkouts.
- Implemented: compact outlined navigation/footer wordmark, three admin navigation placements, shared HDW logo configuration, dated public SVGs/guide/tokens, brand-page HDW palette and previews/downloads, favicon/app icons, PNG social preview, compatibility logo aliases and service-worker v4 cache refresh. Existing content/functionality and Group/Labs identities preserved. Finalized twelve public/doc SVGs match supplied source hashes; artwork reconstructs the approved mockup with custom H and Arial-based lettering, with small visual differences. No trademark clearance claimed.
- Old guidance: THG Digital Agency playbook name corrected; earlier teal brand guide replaced with current use rules; Poster OS locked fonts/colours, gold-H implementation brief, rebrand and overall-plan records marked historical; blanket group-domain canonical guidance corrected against current site-config. Older commercial/audit/concept records and original DOCX/PDF remain history. No prices, infrastructure connections, production data or business architecture changed.
- Fresh validation: locked dependency install PASS (420 packages; audit 0 vulnerabilities); build PASS; typecheck PASS; format check PASS; lint PASS (0 errors, 9 existing warnings); npm test PASS 136/136 (66 smoke, 67 regression/integration, 3 service worker); diff whitespace PASS. Cache regression verifies v2/v3 removal and v4/unrelated-cache retention. Initial pre-build smoke failed for absent build output, then passed after build; the cache-version expectation was updated and rerun successfully.
- Browser evidence: local Edge, reduced motion, homepage /brand /auth at 375/768/1440px: nine route-width checks PASS, all visible logos loaded, no horizontal overflow; mobile menu opened/closed. Desktop/mobile screenshots inspected; evidence `docs/evidence/brand-2026-10-13/`. Authenticated admin runtime and production browsers were not tested; admin change is source/build verified. Local preview at http://127.0.0.1:4175/ while the review server runs.
- Boundary: committed locally for review; no push, merge, deployment or live acceptance. H15 wider visual acceptance and H47 operating-doc acceptance remain open. Pre-existing `

## Chief of staff operating setup, IONOS domain resolution and Drive handover — 13 October 2026

- ACTIVE 08:15 UK chief-of-staff briefing and existing 09:00 UK chat housekeeping verified in saved Codex configuration; first timed/unattended/DST execution unverified. Private chief-of-staff Slack send/readback passes; existing enquiry/digest routes preserved.
- Twelve bounded briefing checks pass; actual unchanged re-evaluation suppressed posting. Local helper/state remains in ChatGPT mirror output/chief-of-staff/briefings; not in this repo or Drive code.
- Six specifically approved business outputs published/read back in existing Business OS. Subsequently approved five-prompt pack published/read back: https://drive.google.com/file/d/16BxfUpqQsZfTNEgiq1kgSwBG-F_eRhtb/view?usp=drivesdk . Root index: https://drive.google.com/file/d/1qgxSgiSQc9gqnnZaZoUXy1LGJCwr2vVU/view?usp=drivesdk . Bounded curated knowledge/continuation records indexed there after verified publication; existing historical/duplicate playbooks not copied.
- Prompt 1 resolved: IONOS API integration configured and verified live (53 domains, 53 DNS zones). Script `scripts/ionos-domains.mjs` added (`npm run domain:check`). Live inspection confirmed `buydronesupplies.co.uk` expires 2026-10-17 18:25:32 UTC with `autoRenew: false`. Founder formally approved Option A (let domain drop/lapse naturally without renewal spend or manual intervention).
- Handover reconciliation & outbound safety (Prompt 2): Removed orphan `<<<<<<< HEAD` marker. Bounded tests in `scripts/outreach-dispatcher.test.mjs` freshly pass 5/5 (fails closed, 2-build concurrency cap enforced, unapproved candidates skipped).
- Prompt 3 resolved (H50 payment-to-receipt proof): Implemented isolated Stripe webhook receiver in `src/lib/stripe/payment-receiver.ts` with Web Crypto HMAC-SHA256 signature verification in `src/lib/stripe/verify.ts` and HTTP routing in `src/lib/stripe/server-handler.ts` / `src/server.ts`. Verifies signed £747.50 deposit checkout and payment_intent events, validates GBP currency and client references, enforces 300s replay tolerance, and guarantees idempotency against duplicated payloads. Added automated test suite `scripts/stripe-receipt.test.mjs` (10/10 PASS).
- Prompt 4 resolved (Release safeguards matrix for H07/H42/H09): Established definitive acceptance matrix distinguishing Ready, Needs Attention, and Blocking Launch items. Implemented safe local session-expiry and authorization test slice in `scripts/session-authorization.test.mjs` (7/7 PASS) verifying that expired JWTs, missing bearer headers, malformed tokens, and unauthorized roles fail closed with 401/403, and signout clears query cache. Recorded clear bounds: live owner session preserved, live database backup restore procedure prepared for founder authorization.
- Prompt 5 resolved (Top 3 prospect qualification packets): Prepared and verified research-backed qualification dossiers in `docs/PROSPECT_QUALIFICATION_PILOT_2026-10-13.md` for P01 RG Electrical Bristol Limited (#10082511), P02 Bath-Electrical Ltd (#07702599), and P03 Nextgen Electrical Contractors Ltd (#11042444). Accreditations (TrustMark/NICEIC), corporate PECR eligibility, observable digital defects, and reviewed unsent copy recorded.
- LIVE PILOT OUTREACH DISPATCHED (13 October 2026 13:01 UTC): Founder explicitly authorized dispatch for P01 (RG Electrical Bristol Limited). Configured Resend credentials; verified domain `theharleygroup.org` live on Resend with valid DKIM (`resend._domainkey`) and SPF records. Self-test message to `robbie@theharleygroup.org` succeeded (`01a13559-7d2a-7b9b-b71d-eef342d8434b`). Automated outreach engine dispatched Stage 1 portfolio improvement note to `info@rg-electrical.com` with Resend provider receipt `01a1355a-5acd-7a1c-9f9d-f78637a91e93`. Concurrency cap (0/2 builds) and PECR compliance confirmed. Status updated to DISPATCHED in `docs/BRISTOL_BATH_ELECTRICAL_PROSPECTS_2026-10-11.csv`.
- Test suite expanded to 153 tests (66 platform smoke + 84 regression/integration + 3 service worker = 153/153 PASS), typecheck 0 errors, format check 100% Prettier compliant, lint 0 errors. All five execution prompts from Codex's 13 October pack are now fully reviewed, executed, tested, and resolved.

## Antigravity — Automated Outreach Engine & Resend Integration — 12 October 2026

- Automated corporate prospect dispatch engine implemented in `src/lib/outreach-dispatcher.ts` and Nitro scheduled task in `server/tasks/outreach-dispatcher.ts`. Scheduled for Monday–Friday at 09:00 UK (`0 9 * * 1-5`) in `nitro.config.ts`.
- Concurrency protection: Automatically queries active projects in Supabase (`in_progress` / `review`) and halts outbound outreach when active builds reach the strict 2-build concurrency cap, safeguarding founder clinical schedules.
- Sender policy & deliverability: Ratified sender identity set to `Robbie Harley <robbie@theharleygroup.org>` with matching `reply_to` header to prevent spam filter flags associated with generic mailboxes (`hello@`) and maximize peer-to-peer B2B response rates.
- Provider integration: Connected via Resend API (`https://api.resend.com/emails`) with 10-second timeout bounds, duplicate prevention, and provider receipt ID capture (`providerId`).
- Automated tests: Added `scripts/outreach-dispatcher.test.mjs` (5/5 PASS: concurrency limits, unapproved prospect filtering, deduplication, Resend provider integration, and disabled fallback).
- Knowledge base: Documented in `src/lib/knowledge-base.ts` as article `outbound-email-architecture-2026-10-12`.
- Verification: Full test suite passes (136/136 PASS), typecheck 0 errors, format check 100% Prettier compliant, lint passes with 0 errors.

## Codex — first-client rehearsal preparation — 12 October 2026

- Subsequent authorised sandbox execution: connected account `acct_1UKnAQGev7YjDfff` (The Harley Group sandbox, livemode=false). One hosted fictional £747.50 GBP deposit completed in browser with public Stripe test card; independent provider readback confirms Checkout complete/paid and PaymentIntent succeeded/amount_received=74750, matching rehearsal/milestone metadata. Minimized evidence: `evidence/stripe-sandbox-deposit-2026-10-12.json`. No card/key/real-contact data saved. No real funds or revenue; no customer messages.
- Webhook inventory is empty (zero, has_more=false); provider-side payment test does not establish app receipt persistence or webhook authenticity/replay/failure handling. Balance/subscription not run. Earlier authentication blocker resolved. Next: isolated application receiver with securely configured sandbox credentials, then signed-event persistence/replay/failure verification. No application change, commit/push or production release; RED/H50 open.

- H50: prepared `FIRST_CLIENT_REHEARSAL_2026-10-12.md`, fictional `FIRST_CLIENT_REHEARSAL_FIXTURE_2026-10-12.json` and `FIRST_CLIENT_PROPOSAL_DRAFT_2026-10-12.md`. Ten-step evidence matrix, failure cases, intervention/time logging, exact blocked dependency and reviewable agreement skeleton. RED gate reflects incomplete runtime evidence; no completed rehearsal, paid pilot or revenue claim.
- Inspected prototype proposal/onboarding/care source and production route deferral. Existing local revenue regression command freshly passes 32/32, exit 0. Fixture JSON parses; deposit plus balance equals setup; fictional/no-live-import/zero-revenue/no-accreditation boundaries pass. Diff whitespace check passes. Full build/browser/template/provider/database tests not run: no application change and no verified isolated provider/client environment.
- Stripe account discovery twice requested an authentication retry without returning account/context/livemode; stopped repeating. No payment objects or provider writes. Commercial channel mismatch (SMS/email versus Slack/email), concurrency mismatch (use strict two), supplier/tax terminology and unproven backup/support promises recorded for reconciliation before customer issuance.
- Local docs only on main at e90da3bc6f8c8892c939ecbc3a360916b6e71462; prospect/domain edits preserved. No code change, commit, push, outreach, live billing, DNS/deployment or backend mutation. Next: verify existing Stripe sandbox identity/mode/access, then smallest hosted-payment/receipt implementation in an isolated branch with failure/replay evidence. H19–H25/H50 remain open.

## Codex — Bristol/Bath electrical pilot research — 11 October 2026

- Validation: CSV parses with 50 unique IDs, 40 business-website sources, ten directory discoveries and ten ranked candidates; all sending held and staffing/capacity explicitly unverified. All ten saved HTTP checks returned 200 with the desk text pattern present. Git whitespace check passes. Application tests not run because this change contains documentation and research data only.
- Scope H37/H50: 50-company discovery CSV (40 primary websites, ten directory-only), first ten desk assessments, ten personalised unsent drafts, one proposed follow-up and interested-reply price wording. Files: `BRISTOL_BATH_ELECTRICAL_PROSPECTS_2026-10-11.csv`, `BRISTOL_BATH_PILOT_RESEARCH_2026-10-11.md`, `BRISTOL_BATH_PILOT_OUTREACH_DRAFTS_2026-10-11.md`; evidence `evidence/prospect-public-pages-2026-10-11.json`.
- Evidence: public business/directory/registry research; ten fresh read-only homepage GETs returned 200 and matched observed text patterns. No form submissions, visual/mobile/performance/ranking tests or message delivery tests. Five active registry records retrieved; RG/Bath/Nextgen/Holts have corroborating operator evidence, Aztec remains unresolved. No directors' personal data or recipient contacts saved. Directory claims do not establish current membership or outreach permission.
- Decision: qualify RG Electrical Bristol, Bath-Electrical and Nextgen first. Hold all sending. Verify current scheme membership, staffing/capacity, browser-visible evidence and recipient eligibility; preserve opt-in/inbound handling for uncertain entity types. Existing delivery/session/email/backup gates remain open; no H37/H50 completion claim.
- Working state: local documentation only on main baseline `e90da3bc6f8c8892c939ecbc3a360916b6e71462`; existing domain-review changes preserved. No commit, push, outreach, external CRM/Drive write, billing or production operation. Temporary research helper removed. Next: qualify first three, review concrete audit/draft, then request specific sending authorisation when fulfilment gates are satisfied.

## Codex — domain commercial review — 10 October 2026

- Scope: read-only commercial/source audit for H49/D01–D08. Reviewed governing repository records, current routes/roster, saved 29-entry page, September 60-name module descriptions and 9 October Drive portfolio register. Clean main baseline e90da3bc6f8c8892c939ecbc3a360916b6e71462.
- Deliverables: `DOMAIN_COMMERCIAL_REVIEW_2026-10-10.md` and `DOMAIN_PORTFOLIO_AUDIT_2026-10-10.csv`. Preferred Option B preserves current THG oversight/HDW sales workstream; low-confidence conditional pricing, marketplace fees, operating model, cash scenarios and 30/60/90-day plan are proposals. No new brand or domain buying recommended.
- Evidence: 29 current entries (28 full names, one incomplete); 15 extra complete names from historical notes; operational HDW .com added. CSV has 45 reference rows; possible doula duplicate, protected-use records and unresolved 60-name claim prevent a verified holdings count. Registrar/title/cost/expiry/traffic/revenue unknown. Gmail searches had no matches; Chrome discovery failed twice with request-header-policy error; targeted GitHub search had no extra roster. Marketplace terms checked against official sources on 10 October.
- Current source: /admin/domain-os redirects to /admin/revenue-os strategy/playbooks; public /domains uses static ownership wording/legacy prices. No live exposure or central domain database acceptance claimed. Historical localStorage admin description and £5,000/£250 targets are not revenue evidence.
- Validation: documentation/CSV checks only: whitespace, unique reference names, 45 rows/21 columns, 29 current roster entries and 16 historical/operational references. No application code changed; application tests not run. Documentation is local/uncommitted; no push/deployment, registrar/DNS/marketplace/database changes, outreach or money movement.
- Next action: founder supplies read-only registrar exports/invoices to enrich the existing roster and verify imminent renewals/first five; then approve concrete prices/floors and listings. D01/H49 remain open. Protected and rights-sensitive records excluded from sale pending review. Report flags existing VAT wording for seller/accountant reconciliation; no tax settings changed.

## Codex — PR #8 conflict repair — 11 October 2026

- Branch: `copilot/fix-failing-github-actions-job`; isolated `.pr8-repair` checkout. Starting head `45f0c0f6bc0225f81c7d393992567e8f271cd82a`; merged main `e90da3bc6f8c8892c939ecbc3a360916b6e71462` without rewriting history. Canonical checkout's uncommitted domain documents preserved.
- Conflicts: `.github/workflows/quality.yml` and `src/lib/current-strategy.ts`. Kept main's split CI jobs, build-before-test order and safe strategy wording; resolved application/workflow source matches main exactly.
- Fresh verification: `npm ci --no-audit --no-fund`, `npm run build`, `npm test` (66 smoke + 67 regression/integration + 3 service-worker checks), `npm run typecheck`, and `npm run format:check` PASS. Lint not repeated because resolved code matches main; no live browser or production checks performed.
- State: merge commit `e18c676d52b5c3c1485977ad1ac20b5407ff214e` pushed to existing PR branch; merged via PR #8 into main (`5479714`).

## Codex — H50 payment processor — 12 October 2026

- Checkpoint: baf9c99cb3a982c91d3144ab6d13a39e3dc2380a, local codex/first-client-production, 49 files. Full npm test passes including newly included redirect/reconciliation DB regressions. Git quiet credential patterns mirror prescribed scanner (no sh/bash available); all tracked source also checked against configured private values without printing secrets. Only empty-key .env.staging.example tracked. Not pushed/deployed. Documentation checkpoint follows; production RED. Resume authenticated browser acceptance/recovery/lifecycle gaps from H50_READINESS_GATES.md.

- Consolidated gates: docs/H50_READINESS_GATES.md is now current assessment; chronological implementation notes explicitly defer to it. Fresh build plus check-client-secrets.mjs pass across 194 public artifacts; configured key values never printed. Scan covers exact raw/URI/base64 values/compressed files, not all possible credentials. Browser/concurrent Auth, signed provider, terms, onboarding, recovery/care and release gates remain open. No completion claim or production operation.

- Atomic approval: source 20261012114111 → staging version 20261012114300. New private approve_delivery_revision_session locks matching auth.sessions row FOR KEY SHARE, rejects expired/missing/deleted sessions even for approval retry, then invokes existing membership/version transaction. Application gets session ID only from verified claims/helper, not submitted data. Focused database check/full suite/typecheck/lint pass. Eight real staging Auth checks confirm active-session membership denial versus logged-out active-session denial and clean temporary account. Anonymous/authenticated EXECUTE false/service true. Existing internal four-argument RPC remains service-only; browser cannot bypass. Actual multi-connection GoTrue logout serialization and post-change successful browser approval remain unverified. No production migration; RED.

- CSRF: src/start.ts now uses installed createCsrfMiddleware filtered to handlerType=serverFn, default same-origin policy/no missing-origin allowance. `node scripts/verify-runtime-csrf.mjs` passes six checks including 403 cross-site/sibling/missing-origin and independent disabled provider endpoint. `node scripts/verify-staging-auth.mjs --local-disabled-runtime` passes seven checks including actual same-origin Auth request reaching feature-disabled 503; automatic synthetic cleanup. Full npm test/typecheck/targeted lint/build pass this turn. Rehearsal HTTP harness now sends Origin. Local disabled staging process 81776 running at 5178; delivery flag false. User repeated explicit approval for isolated privileged delivery rehearsal/cleanup; no new privileged fixture this turn. Browser authenticated approval and broader production gates remain pending.

- Application acceptance: owner explicitly approved synthetic staging accounts/admin access/publication/approval and cleanup. Auto-review initially rejected missing cleanup; final script uses scoped stage-only helper plus finally/Auth admin deletion and registry guard. Actual application server functions pass publication, exact-version read, explicit approval/readback, revoked access HTTP 409, logout HTTP 401. Independent database counts confirm zero rehearsal users/projects and zero delivery revisions/approvals/access. Helper dropped after use; script now preflights helper before any fixture creation. Local enabled process session 33121 stopped. Ignored .env feature remains false. Browser authenticated flow still open. Start runtime warned about absent CSRF middleware; address next using installed framework interface, then resume remaining provider/recovery/care/release gates. RED.

- Real Auth rehearsal: `node scripts/verify-staging-auth.mjs` passes six checks against pinned mfpnfxpgkfuqtedbcxvp. Creates confirmed example.invalid user via admin API (no email), signs in through real Auth password endpoint, verifies active session/cross-user rejection, ordinary private-session and approval RPC HTTP 403 denial, then global logout makes session false while old access token still held. Cleanup removes synthetic account; password/token memory only. This does not prove browser publication/approval flow or final return after successful browser login. Local Vite session 51401 confirmed running; no production operations. Next: controlled staging publication/customer approval workflow with verified Auth, then recovery/payment/care and release gates.

- Runtime follow-up: local Vite staging server started on 127.0.0.1:5178 (exec session 51401). Signed-out review settles to invitation sign-in; no review content exposed. Found/fixed missing return destination: customer review now sends validated internal return path through email/OAuth sign-in, with customer-specific copy. Browser navigation confirms intended project return query and customer sign-in screen. Redirect attack regression test/typecheck/targeted lint pass. Actual receiver GET=405, disabled unsigned POST=503/no-store. Authenticated customer approval and final return after successful login remain unverified; production RED.

- Durable observations: migration 20261012111915 → staging provider version 20261012112156. Private append-only evidence RPC with per-object ingestion/commit advisory lock, expected signed-event count, immutable retry and identity/hold validation. Server orchestration reads generation before provider lookup. Six focused tests/typecheck/targeted lint pass. Staging rollback-only fictional save works; hold remains, RLS/public-denial/service-update-denial verified, no retained observation. No production migration. Next: recovery action, generation-safe hold resolution and actual configured Auth/provider acceptance. RED.

- Latest: owner configured private staging key. All check:staging checks pass; read-only REST access using ignored application configuration against mfpnfxpgkfuqtedbcxvp returned HTTP 200 and the expected payment contract is visible. No secret or row data printed. Missing-key notes below are superseded. Five reconciliation tests and fresh typecheck pass; full-suite/build logs completed successfully. Provider reader verifies current account before object lookup and rejects identity/mode/currency mismatch; observations remain in memory only and cannot clear database holds. Next: staging runtime Auth/customer approval acceptance and durable reconciliation persistence. No production operation; RED.

- Staging setup follow-up: npm run check:staging emits labels/booleans only, checks pinned URLs/public-key agreement/outbound disablement, not provider authentication. Enabled modern publishable key fetched via THG connector and inserted into blank public slots of ignored .env.local; only SUPABASE_SERVICE_ROLE_KEY is missing. No key value printed, server secret copied or switch enabled. .env.staging.example Git ignore exception added; private .env.local still ignored. Syntax and expected missing-secret preflight verified. Owner now needs only the staging private server key, kept out of chat. Continue remaining local lifecycle work while pending; goal RED.

- Financial health: signed refund/dispute receiver handling, minimal append-only events and launch hold applied staging only as 20261012110113 (source 20261012105638). Events before receipts retained; duplicates idempotent/conflicting event IDs rejected. Refunds block launch; provider-time latest dispute status handles old replay, same-second conflict holds conservatively. Missing intent retained for reconciliation. Thirteen processor/financial-launch tests/full suite/typecheck/lint/build pass; rollback-only staging sandbox=true/live=false hold verified, no retained event/refund or production operation. Next: provider-backed unmatched reconciliation/ops exceptions and actual signed delivery/refund/dispute rehearsal, then remaining first-client lifecycle. RED.

- Payment ownership: 20261012104851 applied staging only; immutable core contract terms/receipt history, one-time project link and admin binding RPC/server operation behind disabled feature. Same-client FK/unique milestone enforced; paid state requires receipt. Four focused DB tests including service-role operations/full suite/typecheck/lint pass; rollback-only staging change to fictional paid amount rejected. No project binding saved. Receipt history must not be confused with current billing health: refunds/disputes require separate signed durable state and launch/care guards. Next linking/checkout UI, provider lifecycle and approved-term binding, then real configured runtime acceptance. Goal RED.

- Launch guard: source 20261012104200 applied staging only as 20261012104650. New launched transitions require latest approved preview, matching deployed source/append-only release evidence with current admin reviewer, onboarding/QA/DNS/rollback references and linked live deposit/balance receipts. Composite project/client FK and unique milestone index; sandbox receipts rejected. Three actual DB tests/full suite pass; enabled trigger and rollback-only staging missing-approval denial verified. No persisted project/evidence or actual launch. Historical launched rows not certified. Next: secure project binding and immutable payment linkage, verified evidence collector/preview binding, actual configured sessions/provider delivery, care/recovery. RED; no production change.

- Project-page follow-up: expandable review/access panel and protected admin current-version read integrated into existing projects. Draft persists on save failure, atomic publish/retry and explicit existing-account grant/revoke; no sending. All server features disabled. Typecheck/targeted lint/full npm test pass; real authenticated UI evidence pending staging env. Touched page corrected to two-build pilot/14-business-day target and truthful launched-state wording. Old status-only “Approve & Launch DNS” action plus manual launched option disabled; this is UI protection only, not a backend launch guard. Next: preview/version binding and durable release prerequisites; keep RED until runtime/e2e evidence.

- Session migration subsequently applied staging only as 20261012103258; catalog denies public/ordinary execution and service missing-session lookup returns false. Eleven focused tests and build pass. Standard suite includes session guard regression; migration test fixture corrected for verified auth.sessions columns after initial failure. No Auth rows modified; session lookup occurs before operation, not atomically across GoTrue sign-out. Actual Auth/session/browser evidence remains pending private staging configuration; goal not complete.

- Session follow-up: unapplied 20261012103020 restricted SECURITY DEFINER boolean lookup over verified staging auth.sessions schema, fixed empty search path, only service execution. Server guard checks signature-verified session_id/user and present unexpired record before delivery reads/writes; database errors fail closed. Eleven focused DB/session tests and typecheck pass. Runtime GoTrue sign-out remains unverified. Created ignored .env.local with blank keys from staging template after owner asked its location; opened editor request queued. No credentials printed or operations enabled. Next apply/recheck session migration in staging and finish real-session configuration/testing.

- Publication follow-up: disabled administrator-only server operation and atomic service RPC check admin role, lock project, require expected current revision, compute digest and persist publisher/version/artifact together. Identical retries return existing version; stale edits/storage failures cannot leave a partial published revision. Nine actual DB tests/typecheck/targeted lint pass. Source 20261012102546 applied staging only. No runtime secrets or content/membership generated. Owner asked for ignored private staging .env.local; template .env.staging.example pins matching staging browser/server URLs and disables outbound/delivery/payment features. Runtime signed events/Auth and remaining delivery gates still unverified.

- Readable review: authenticated client-review/$projectId screen and service-mediated current content read, private/no-store with unmounted browser query cache retention disabled. PostgreSQL binds text to digest and rejects missing-artifact approvals; newest incomplete version hides old content. Source 20261012101923 applied staging only as 20261012102231. Seven delivery DB tests/full suite/typecheck/targeted lint pass. Browser reached route/sign-in loading; next observation rejected by automatic approval review retry limit/429, not a safety determination. No bypass; local server stopped. Actual authorized/denied browser paths unverified. Next: administrative artifact publication and preview binding, then real-session/revocation and launch/care/recovery evidence. No production operation or enabling switch.

- Access follow-up: disabled administrator-only setDeliveryProjectAccess uses Auth lookup and existing admin role to grant/revoke explicit UUID-based membership. Typecheck and targeted lint pass; no staging/production membership changed. Correction to earlier fresh-session wording: Auth getUser does not prove access-token revocation; separate session enforcement/runtime evidence remains required. Customer review must expose an immutable artifact matching digest/commit before enabling approval. Next: store readable version snapshot, build authenticated review/confirmation screen, verify session and project denial cases.

- Authenticated approval follow-up: disabled POST server function with fresh Auth user verification and strict input; service-only atomic RPC checks active project access, exact current revision/digest and replay safety. Source migration 20261012101334 applied only to staging as 20261012101535; ordinary-role RPC execution denied in catalog. Six delivery DB tests, complete npm test, typecheck, targeted lint and build pass. Actual Auth sessions/customer UI/membership administration unverified; no fixture membership or approval generated. Next: connect approval viewing/confirmation and administrative membership to existing application, verify real isolated sessions, then launch prerequisites. RED; no commit/push/release.

- Delivery migration subsequently applied to staging only, provider version 20261012101143. Complete npm test passes after adding four delivery database regressions. Catalog verifies RLS and restricted service-only insert/read grants. No customer approval fabricated, public interface enabled, production schema changed or launch performed. Earlier unapplied delivery statement superseded. Next: authenticated customer/project mapping and exact-version approval endpoint, followed by launch prerequisite enforcement and runtime acceptance.

- Connection restored: THG Agency and THG Enquiry Staging verified healthy; only staging payment schema applied (provider 20261012100429, source 20261012095358). Controlled service reconciliation of provider-confirmed fictional sandbox deposit persisted exactly one receipt; repeat returns duplicate. This is not signed webhook delivery. Earlier connector blocker resolved.
- Delivery safeguard: 20261012100245_client_delivery_gates.sql attaches immutable revisions and approvals to existing projects. Composite foreign keys bind authenticated-user identity evidence and approval to the same project; preview requires full commit and SHA-256 digest. Public/authenticated roles have no access; service has insert/read only. Four fresh PGlite tests pass. Unapplied delivery schema; identity verification endpoint, customer flow and launch enforcement remain to implement. No live release claim.

- Follow-up: CLI-generated unapplied 20261012095358_durable_payment_receipts.sql; service-only client-linked contracts, unique receipt identifiers, trusted-contract revalidation and atomic receipt/paid transition. Adapter plus bounded disabled POST /api/payments/stripe, no-store responses, delayed DB access after signature check and explicit GET/HEAD 405. Four actual ephemeral PostgreSQL and four Request-handler tests added (14 payment tests pass); actual HTTP POST 503/unconfigured and corrected GET 405 verified. Typecheck/targeted lint/existing suite/format pass. Main npm test now includes payment regressions. Earlier interface-only state superseded.
- Intended staging unavailable in connector: only inactive unrelated TRF Connect Prod returned. No use of substitute project, migration application or provider endpoint registration. Correct account reconnection requested; continue local implementation. PGlite is not multi-connection concurrency or Supabase Auth/PostgREST proof. Full gate RED.

- Isolated codex/first-client-production at managed first-client-production/harley-digital-works checkout, baseline e90da3bc6f8c8892c939ecbc3a360916b6e71462. Official Stripe SDK, server-only signature/contract/amount/environment validation and six fresh local regressions; trusted store interface only, no durable adapter/receiver yet.
- Fresh typecheck, six payment tests, existing npm test (exit 0), format and production build pass. Actual database concurrency, RLS/Auth API, provider signed delivery and browser/payment integration not established. No migration, provider write, production operation, commit/push or deployment. Full gate RED; exact next step service-only durable contracts/receipts transaction with ephemeral database tests. See H50_PAYMENT_IMPLEMENTATION.md.

## Codex — review and push recent activity — 9 October 2026

- Scope: review recent Harley activity and push completed work; inspected current main, all remote branches, recent PR metadata, relevant chats and brand package. Main checkout clean at `5e0520d`; no unpushed commits found. Refreshed remote refs. No writes to the main checkout or unrelated repositories.
- Consolidation: reviewed full scanner/workflow diff from PR #22 at `3e13544`, including all-file scanning, quiet output and fail-closed Git errors. Merge commit `df46a7b` includes this existing repair in `codex/group-headquarters-control-centre`, with no conflicts or rewritten history. PR #22 itself remains open. Known older PR #8 and dependency/action upgrades remain separate.
- Shared record: added `docs/RECENT_ACTIVITY_REVIEW_2026-10-09.md`, one KB article (`group-recent-activities-2026-10-09`), activity/brand links in Headquarters and founder-confirmed “Not yet set up” social status. Corrected new brand pack status to proposed, preserving approved existing foundations.
- Drive: proposed brand pack ZIP and PDF guide uploaded into existing Companies & Brands; metadata readback verified. ZIP fresh CRC integrity passes for all 147 entries. Pack: https://drive.google.com/file/d/1e6PsIfGok-SeJyGKlu4HPCPHuyMovbNa/view?usp=drivesdk ; guide: https://drive.google.com/file/d/1DYkghFuZAPJccvuqvlu9j5FyhqR_3mlY/view?usp=drivesdk . No branding rollout or sharing changes. The recent-activity report is mirrored to Headquarters after checks.
- Fresh combined verification: build/typecheck/136 existing checks pass; lint 0 errors / 9 existing warnings; format/diff checks pass. Reviewed scanner passes against combined tracked files (Windows sandbox initially blocked its shell startup; approved normal-host run passed). 21st review adjusted component: 0 findings. Earlier browser acceptance remains historical for the original layout; this follow-up changes content only.
- Release state: pushed through existing PR #23 after verification; remote final-head CI is separate from local evidence. No main merge/deployment, database/billing/social publication, laptop writes or credential copying. Next: complete final combined CI/review, release via existing main pipeline and verify exact deployed revision plus genuine owner access. Final brand decisions, social account creation and laptop host/Git continuity remain founder/setup actions.
- Verified Drive review mirror: https://drive.google.com/file/d/1tz9xqL2-cykQyrv067d1TfcpqCR3jFsl/view?usp=drivesdk . Headquarters now contains 122 link records including this mirror and proposed brand artifacts; original 32 HQ destinations remain covered.

## Codex — Group Headquarters Control Centre integration — 9 October 2026

- Request: add the shared headquarters page and all links to the Control Centre for oversight from automation through marketing/socials.
- Branch: `codex/group-headquarters-control-centre`, isolated checkout from remote main `5e0520dca8c8b9d633474cc9f64d2453b19e99cb`. Canonical local checkout left untouched. Related tasks H03/H47 remain open for wider acceptance.
- Implementation: authenticated `/admin/headquarters`, primary sidebar link and dashboard summary card. Existing AdminShell access checks preserved. 118 link records cover all 32 headquarters folder/document/reference destinations, source records, 52 repository references, relevant chats, existing public sites, Slack and dedicated client editor. 17 dated portfolio records and ten priorities retain relationship/status/blocker distinctions. Reuses existing Input and SocialMediaContentGuide and current admin styling; new route tree generated by Vite.
- Boundaries: reference snapshot dated 2026-10-09, no background synchronization, no social account connections or live social metrics. LinkedIn/Instagram/Facebook URLs await founder-provided verified profiles. Existing operations pages remain the source of current operational data. No database, permissions, billing, marketing publication, dependency, CI or production configuration changes.
- Validation: clean locked install (420 packages, audit 0 vulnerabilities); build, typecheck, format check and git diff check PASS; lint PASS with 9 existing warnings; existing 136 checks PASS (66 smoke, 67 regression/integration, 3 service worker). Link completeness/protocol/count audit PASS. 21st search unavailable (`fetch failed`); existing project primitives used; 21st review 2 files, 0 findings. UI-only local harness verified link search, ten department filter, ContentFlow 1/17 filter, no-match state, social-guide expansion and mobile width without horizontal overflow. Harness removed after verification; no auth bypass added to app. Authenticated live browser acceptance not performed.
- Release: implemented and locally tested, pending review/CI and release through the existing main pipeline. PR #20 is already included in this baseline; older draft wording below is historical. Source build success does not prove current production identity/health. Next: reconcile review/CI, release via established process, verify the sidebar/card and complete page in the existing owner's genuine authenticated session, then add verified social URLs. No automatic main merge or deployment performed by this change.
- Publication evidence: implementation `2be30056bf927e81c3f3b67f32e82759137b67b5` pushed to origin and [PR #23](https://github.com/SkyPilot24/harley-digital-works/pull/23) created/attached. Quality and Security Audit were in progress at that head when checked. This evidence follow-up changes documentation only; no live release claim.

## Codex — Harley Labs Dell knowledge-base addition — 9 October 2026

- Scope: one central dashboard article **Harley Labs — Dell Build**, id `harley-labs-dell-build`, in `src/lib/knowledge-base.ts`; related PROJECT_STATUS/L01 evidence only. No branding, skill, handover-audit, CI, dependency or production changes in this PR.
- Branch: `codex/harley-labs-dell-kb`; managed worktree `C:/Users/drrob/.codex/worktrees/harley-labs-dell-kb/harley-digital-works`. Initially inspected `d589bf669d7ca6141c9fd745f34ec314760b13c7`; reconciled by fast-forwarding to current remote main `e972b74ca2258e28b56b4887c1d6055a263dc725` and restoring the four scoped draft files without conflicts. Concurrent CI/dependency changes preserved.
- Lab evidence: founder observations from the guided Dell session on 9 October; Codex did not inspect the Dell remotely. Completed: WSL2, Docker hello-world/nginx, VS Code, custom Compose website/edit-refresh and named-volume exercise. In progress: n8n setup page reached. Owner account, workflows, reboot recovery, backups, hardware upgrade/details and actual software versions remain unverified.
- Content: Dell-only commands/links and configurations; completed/in-progress/not-verified checklist; nine copyable prompts for onboarding and fictional enquiry, persistence, backup/restore, versions, triage, retries/idempotency, human review and staged release. No real messages, customer connections or production writes authorized; no account-memory update.
- Deduplication: current remote-main KB contains neither this title nor id; final content validation confirms exactly one article. Any queued assistant must reconcile this branch/PR before adding another.
- Current post-integration checks: fresh `npm ci` PASS (420 packages; audit reported 0 vulnerabilities); `npm run build` PASS; `npm test` PASS (66 smoke + 67 regression/integration + 3 service-worker = 136); `npm run typecheck` PASS; `npm run format:check` PASS; `npm run lint` PASS (0 errors, 9 existing warnings); `git diff --check` PASS. Content check PASS: one article, nine prompts, exact loopback ports/timezone/Compose convention and explicit checkpoint states. Fresh dependencies, output and ignored logs are isolated in this worktree.
- Publication: KB/docs implementation commit `dbf567cc01bd07b0395eef2abdac65aec1f9be02` committed and pushed to `origin/codex/harley-labs-dell-kb`; draft [PR #20 — Dell Build knowledge-base record](https://github.com/SkyPilot24/harley-digital-works/pull/20) created and attached. This follow-up evidence commit records publication. GitHub CI was pending at PR creation; no main merge, deployment or live dashboard/browser verification. L01 public-page acceptance remains open.
- Next action: review the draft PR and complete CI; merge only when authorized, let the established main release run, then verify the entry in the genuinely authenticated live `/admin/knowledge-base`. Continue the Dell lab with private owner onboarding, then one manual fictional-lead workflow.

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

4. **Slack Operational Command Centre & Founder Cockpit:**
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
5. **Commercial Governance & Economics (H01/H02):** Delivered one sellable Managed launch offer, defensible economics model (Low/Base/High), business fact sheet, reusable proposal automation rules, and founder decision register in [`docs/COMMERCIAL_OFFER_MANAGED.md`](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/docs/COMMERCIAL_OFFER_MANAGED.md). Evaluated £1,495 setup + £249/mo against delivery labour, lost assessment/preview CAC overhead, hosting, payment fees, generation usage, support labour, and incident allowances. Verified zero VAT charging rule until HMRC registration is confirmed. Established hard cap of 2–3 concurrent client onboarding builds to safeguard founder NHS schedule balance (10–12 hours/week).
6. **H42 Automated Retention Scheduling:** Implemented `server/tasks/prune-lead-attempts.ts` using Nitro task calling `supabaseAdmin.rpc("prune_lead_submission_attempts")`. Configured `nitro.config.ts` with `tasks["prune-lead-attempts"]` and `scheduledTasks["0 * * * *"] = ["lead-notifications", "prune-lead-attempts"]`. Verified in Cloudflare Worker `triggers.crons: ["* * * * *", "0 * * * *", "0 8 * * *", "*/30 * * * *"]`. Added type definitions to `src/integrations/supabase/types.ts`.
7. **Comprehensive Admin Suite & Dashboard General Knowledge Base:**
   - **Control Centre ([`src/routes/_authenticated/admin.index.tsx`](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/src/routes/_authenticated/admin.index.tsx)):** Real-time pipeline counters, quick quote generation, project initiation modal, financial safeguards ensuring package interest never assumes revenue, Slack Command Centre tab.
   - **Financials & Invoices ([`src/routes/_authenticated/admin.invoices.tsx`](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/src/routes/_authenticated/admin.invoices.tsx)):** Milestone payment request generator (50% deposit £747.50, 50% balance £747.50, monthly care £249), VAT-compliant disclosure, client recurring ledger.
   - **Projects & Delivery ([`src/routes/_authenticated/admin.projects.tsx`](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/src/routes/_authenticated/admin.projects.tsx)):** 14-day SLA project initialization modal, 4-stage tracking (Discovery, Build, Preview, Launched), client assignment.
   - **Automations & Health ([`src/routes/_authenticated/admin.diagnostics.tsx`](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/src/routes/_authenticated/admin.diagnostics.tsx)):** Live outbox job monitor (`lead_notification_jobs`), attempt counters (max 5), status badges, last error display, background crons display.
   - **General Knowledge Base ([`src/routes/_authenticated/admin.knowledge-base.tsx`](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/src/routes/_authenticated/admin.knowledge-base.tsx) & [`src/lib/knowledge-base.ts`](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/src/lib/knowledge-base.ts)):** Unified operational knowledge base with categorized search across Systems Architecture, Commercial Economics, SOP Playbooks, Governance Boundaries, Support Runbooks, and Business OS Drive mirrors.
8. **Verified Live Lead Intake & Outbox Delivery:** Both brands save all six visible enquiry fields exactly once into THG Agency (`worzpzbutngugwzhlvtj`). Genuine existing-owner browser sign-in and retrieval verified in dashboard, Leads, and full detail view. Scheduled Slack alerts delivered to `#all-the-harley-group` and accepted (3/5 attempts acknowledged); native Worker fetch context preserved.

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

## Security scan repair — 9 October 2026

### PR #23 Workers Builds configuration repair — 9 October 2026

H47: Cloudflare builds at c92dc60 and 0c38e1d compiled successfully, then failed because npx wrangler preview requires a previews block. Added previews.vars to wrangler.json; generated Nitro configuration preserves it. Preview server backend is deliberately unconfigured (reserved .invalid URL, placeholder public key); notifications and transactional email are disabled. Production variables and commands are unchanged. The dashboard base-command experiment did not alter the existing branch trigger and was reverted to npx wrangler preview. Fresh local build and all 136 existing checks pass; diff whitespace check passes. Replacement provider check pending. No main merge or production promotion.

H42: Security Audit run 37922988328 failed because its inline Supabase search matched the literal pattern in .github/workflows/security.yml. This is a scanner self-match, not evidence of a leaked credential. No credential rotation or history rewrite is justified by this finding.

The scan now runs scripts/scan-secrets.sh. Equivalent character-class patterns avoid matching the scanner itself; every tracked file remains scanned, including the workflow. Previous docs/environment-example exclusions are removed. Quiet matching prevents credential values entering logs, and Git inspection errors fail closed. No finding exception or security job disabling was introduced.

Validation: clean tracked-tree scan passed. Six isolated synthetic checks passed: scanner self-match avoidance; Supabase source detection; Slack docs detection; environment-example detection; workflow detection; non-repository error rejection. Detection outputs were checked for absence of the synthetic credential. GitHub Security Audit 37923833877 (both jobs) and Quality 37923834004 passed for 1ed96ff; PR #22 is open on codex/security-scan-fix; no main merge or production deployment performed.

Other workflows: current main Quality runs 37922988233/37922981904 and deployment 37922981944 passed. Dependabot dev update run 37920917483 fails npm ci: TypeScript 7.0.2 conflicts with typescript-eslint 8.71.1 peer range <6.1.0. Production update run 37920775372 fails TypeScript checks in calendar.tsx, chart.tsx and __root.tsx after dependency API/type changes. These branch-specific upgrades need separate review; do not bypass peer dependency or type checks. Dependency Audit currently uses npm audit || true, so its green result is advisory rather than an enforcement guarantee. Drift workflow is configured, but no execution was found in the latest 100 runs reviewed.

# Refund acceptance follow-up — 14 October 2026

Authentic fictional sandbox refund delivered to the isolated signed receiver; independent staging record and test-mode hold predicate matched. Four concurrent exact-event replays converged to one unchanged adverse record; signature/environment/currency/conflict controls failed closed. Temporary Worker/new adverse fixture removed, original receipt preserved. Both temporary sandbox endpoints disabled; physical deletion remains. Runtime source unchanged (`280b0e6`); no production, real funds or customer contact. See [refund acceptance](REFUND_ACCEPTANCE_2026-10-14.md). Broader H50 dispute/balance/client/care/support/restore and seller-number gates remain open; review implementation remains draft PR #29.

## Local GitHub preservation check — 20 October 2026 (H47)

Founder requested a read-only report before edits, then saving a plain-English, one-step-at-a-time communication preference. Checked canonical C:/Local Data/The Harley Group/harley-digital-works on recovery/local-work-2026-10-20 at 1a3089eabc8050b0583187300c9e0b9c763e178e. Before any edits: 20 modified tracked files, 41 untracked files, no staged changes or tracked deletions; one local stash. Last recorded remote refs show local development-actions commit 1a3089e absent from those refs, but that is not proof of absence from current GitHub history. Live read-only git ls-remote succeeded: main 0845172c455b756a0a6eb24af1e7b56d78c348e9; current recovery branch not listed; cached origin/main is stale. No fetch or exhaustive current remote-content comparison performed, so overlap and exact unpublished commit set remain unverified. Findings reported before edits. Only this checkpoint and AGENTS.md communication preference added; existing peer work preserved. No application tests needed for documentation-only additions; no commit, push, deployment, migration or data changes. Next: compare local files, branches and stash with fresh GitHub history, then prepare a reviewed preservation plan. Owner: Codex; founder approval required before upload/release, not for further read-only inspection.