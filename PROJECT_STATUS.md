# The Harley Group — shared project status

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

