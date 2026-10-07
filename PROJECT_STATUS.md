# The Harley Group — shared project status

## Start here - short operating brief

- **Goal:** first paid pilot of a near end-to-end automated trade digital service; founder manages exceptions and retains quality review.
- **Verified state:** 7 October: production Cloudflare version b59af9dc maps to source 79e378c; runtime/build backend configuration is absent. Secure intake fixes are implemented in the isolated acceptance branch; separate staging mfpnfxpgkfuqtedbcxvp has reviewed schema and passing SQL concurrency evidence. Real staging Auth/API passes all 11 checks; browser form receipt and exactly one stored enquiry verified. Browser admin UI/session expiry remain pending. No revenue total verified.
- **Bottleneck / one next task:** H07/H08/H09/H42 complete browser admin UI/session acceptance, then review the coordinated production release. No production changes authorised.
- **Decisions:** final scope, prices, VAT, terms, support capacity and initial quality/automation limits. D01 portfolio verification can progress independently.
- **Load on demand:** BUSINESS_DEFINITION.md for commercial rules; MASTER_BACKLOG.md for the selected task; docs/REVENUE_WORKFLOW.md for lifecycle; docs/HANDOVER.md for continuation; docs/SHARED_SKILLS.md for skill availability. Detailed evidence and historical snapshots below need reading only where relevant.
- **Close each meaningful session:** update this brief, task evidence and handover; record actual checks/release state, then reconcile Drive mirrors. Do not omit blockers to save context.

## Current enquiry acceptance — 7 October 2026

This supersedes older environment/deployment claims below. See [dated enquiry acceptance](docs/enquiry-acceptance-2026-10-07.md) for environment map, root causes, migration state, test evidence, access actions and release gate.

- Inspected requested repository: clean main, 79e378cb8d887af0d36db127bfc96e63c2243c2d. Safe versioned branch: codex/h07-h42-enquiry-acceptance in implementation/hdw-enquiry-acceptance.
- Cloudflare current active version b59af9dc links that revision; Git is connected to SkyPilot24/harley-digital-works/main. Lovable separately remains connected to SkyPilot24/thgdigital/main. No runtime secrets or build variables are configured on the production Worker.
- Existing application configuration and Lovable project-info record identify sprljifjcpbnagsxefrp; accessible THG Agency metadata and stale CLI config identify worzpzbutngugwzhlvtj. Neither was retargeted or written. Current Lovable inspection confirms public insert bypass, missing attempt table, enabled signup-admin bootstrap and one existing admin. The owner now has a password configured; sign-in remains unproved.
- Founder created genuinely separate staging mfpnfxpgkfuqtedbcxvp in SkyPilot24’s Org, Ireland, Free. Empty preflight passed. Reviewed schema/hardening and follow-up inherited-function grant fix are applied only there. Notifications disabled; no production data copied.
- Local tests prove owner preservation, denied public/ordinary lead access and self-promotion, atomic intake, quota/timing, failure rollback/retry and restricted cleanup. Real staging SQL: 12 duplicate requests -> 1 saved/11 duplicates/1 lead; 12 boundary requests -> 5 saved/7 rejected/5 attempts. Privileged SQL is not Auth/API or browser proof.
- Fresh build/typecheck/format passed. Test suite passed; lint has nine existing warnings and no errors. Critical dependency advisories cleared within existing constraints; nine tooling moderate/high findings remain. Staging security advisor has no warnings; service-only attempt-table INFO is intentional.
- **Blocking launch:** browser admin UI/session acceptance; missing live runtime/build configuration; final live target/backup/schema reconciliation and explicit release approval. Retention schedule and durable notifications remain unfinished.
- Implemented locally and schema applied in isolated staging; no code push, app deployment or production mutation. Synced sources untouched. Drive mirrors not updated automatically.

## Current reconciliation - 3 October 2026

This section supersedes older status below. Inspected local main and cached origin/main: eb4f9596d0b394c92f45c7120419a2509035e59b. The website changes and shared-context commit 87aa5ce are present; September statements that none of this was pushed are historical. No application tests or production changes were performed during this documentation reconciliation.

| Revenue requirement | Evidence | Remaining acceptance |
|---|---|---|
| Approved offer | Setup plus monthly direction settled; prices are proposals | H01: one approved scope, price, VAT and terms record |
| Credible public website | Refresh is present in current source; earlier browser checks reported passes | H12/H46: verify exact deployed revision and live multi-brand journeys |
| Secure enquiry capture | Shared intake exists; later QA found anonymous direct inserts and missing lead_submission_attempts | H07/H08/H42: reconcile backend, repair safely, prove persistence and abuse controls |
| Admin dashboard access | Existing admin role and local auth investigation recorded | H09/H42: real sign-in, authorised lead retrieval, forbidden access tests and notification handling |
| Payment and subscription | Implementation/configuration not equivalent to confirmed collection | H23/H24: verified provider events, replay safety and reconciliation |
| Repeatable fulfilment | Templates and workflow intent exist | H50: paid pilot validates automated lifecycle, quality review and exception recovery |
| Domains | Existing roster and D01-D08 retained | Verify authority, renewals and sale status; progress independently of website pilot |
| Revenue | No collected revenue/customer count verified | Reconcile actual receipts; do not report zero or forecast as actual |

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

| Evidence | Implemented locally | Remaining release condition |
|---|---|---|
| 843f0d8 | Server-side admin authentication/authorisation for transactional email; explicit prepared versus provider-accepted status; sending disabled by default | Verify real backend roles, provider, quotas and operational monitoring before enabling |
| 843f0d8 | Shared validated intake, phone/source preservation and corporate form; notification failure does not invalidate saved enquiry | Verify persistence and notification delivery against intended backend; durable retry remains outstanding |
| 843f0d8 | Prototype public tools gated to contact; source retained for deferred work | Deploy and verify public routes; do not describe deferred tools as complete |
| 410eece | Prospect workspace creation no longer declares a won sale or invents recurring revenue; retry/concurrency handling; honest admin errors and revenue labels | Verify DB policies and real authenticated journeys; connect reconciled billing later |
| Latest local verification | 75 tests passed, typecheck and production build passed; targeted lint passed | Repository-wide lint/format debt, production QA and release checks remain |

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
