# Harley Digital Works — Complete Remediation Plan

**Created:** 1 August 2026  
**Source audit:** `docs/harley-digital-works-full-audit-2026-08-01.md`  
**Scope:** Resolution of HDW-001 through HDW-024, including previously unverified production areas  
**Target:** Safe public launch in 10 working days; production maturity programme completed in 12 weeks

## 1. Outcome and delivery principles

The programme is complete when Harley Digital Works has:

- one reproducible deployment path and a known production revision;
- no broken intended public routes;
- protected and non-indexable admin routes;
- abuse-resistant lead capture;
- no live payment path without an auditable fulfilment lifecycle;
- enforced type, lint, test and build gates;
- verified Supabase permissions and recovery controls;
- accessible public and admin journeys at required viewport sizes;
- complete indexation, metadata, legal and consent handling;
- minimal conversion analytics and operational monitoring;
- a repeatable lead-to-client-to-recurring-revenue workflow;
- documented owners, runbooks, rollback and incident response.

### Non-negotiable rules

1. Keep the Lovable-connected branch history linear and recoverable; never force-push or rewrite published commits.
2. Ship small, independently reversible changes. Do not combine auth, database and visual redesign work in one release.
3. Make every database change through a reviewed migration and test RLS before deployment.
4. Never weaken RLS, expose a service-role key, or enable live Stripe payments to make a test pass.
5. Use preview → automated checks → owner acceptance → production → production smoke for every release.
6. Keep domain sales enquiry-only until the payment release gate in §9 is passed.
7. Do not invent legal entity details, proof, testimonials, results or product availability.

## 2. Planning assumptions and capacity

The schedule assumes:

- one senior full-stack engineer at 4 focused delivery days per week;
- the founder/product owner available for two 45-minute decisions and one acceptance review weekly;
- specialist input from a legal reviewer, email/DNS administrator and hosting/Supabase/Stripe account owner;
- no simultaneous major redesign or ContentFlow product build.

If engineering capacity is below this, preserve the order and extend dates. Never compress security, payment or recovery verification. Estimated total engineering effort is **38–58 days**, plus legal/content review. The launch-safe subset is **7–10 days**.

## 3. Governance, environments and release gates

### Required environments

| Environment | Purpose | Data/integrations | Rule |
|---|---|---|---|
| Local | Development/unit tests | Local or isolated Supabase; Stripe test | No production secrets/data |
| Preview | Integration/E2E/acceptance | Non-production Supabase; test email/Stripe | One preview per change set |
| Production | Customer traffic | Production services | Promotion only after signed gate |

### Branch and change policy

- Use `codex/<short-scope>` branches for implementation batches.
- Keep migrations immutable after deployment; correct mistakes with a new migration.
- Require review for auth, RLS, service-role, payments, headers and legal/consent changes.
- Record release commit, migration list, environment changes, smoke result and rollback reference.

### Definition of done for every ticket

- Acceptance criteria pass in local and preview.
- Relevant automated tests are added and pass.
- Loading, error, empty and success states are covered.
- Keyboard/mobile behavior is checked where UI changes.
- No new secret, personal data or console leakage is introduced.
- Documentation and environment examples are updated.
- Production smoke and monitoring confirmation are recorded after release.

### Global quality gate

Required before production promotion:

```text
npm ci
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run test:integration
npm run test:e2e
npm run build
npm audit --omit=dev --audit-level=high
route, link, accessibility and bundle-budget checks
```

Commands not currently configured are deliverables in Workstream B.

## 4. Prioritised programme

| Phase | Timing | Release objective | Exit gate |
|---|---|---|---|
| 0. Freeze and baseline | Day 1 | Stop drift and capture production state | Target host/revision/env agreed |
| A. Launch blockers | Days 1–10 | Safe public launch | Launch Gate passed |
| B. Conversion and operations | Weeks 3–5 | Qualified leads and recurring attach | Lead lifecycle measured end-to-end |
| C. Quality and compliance | Weeks 4–8 | WCAG/SEO/performance/legal maturity | Quality Gate passed |
| D. Automation and growth | Weeks 7–12 | Lower admin load and scalable MRR | Operational Growth Gate passed |

Only one high-risk change should be in progress at once. Low-risk documentation, test and content tasks may run alongside it.

## 5. Phase 0 — Freeze and baseline (Day 1)

### P0-01 Establish the single production target

- **Findings:** HDW-001, HDW-017
- **Owner:** Technical lead + hosting owner
- **Actions:** Decide whether Cloudflare or Vercel is authoritative; document build/install/output commands, domain ownership and deployment trigger. Remove conflicting target configuration only after a preview proves the choice. Rename operator-facing worker/project identifiers without changing immutable history.
- **Files/systems:** `vercel.json`, `vite.config.ts`, package scripts, Cloudflare/Vercel settings, README/runbook.
- **Acceptance:** A clean checkout builds the same target as production; release commit is visible in production metadata/logs; rollback procedure names an exact prior deployment.
- **Estimate:** 0.5–1 day.

### P0-02 Capture configuration and ownership matrix

- **Findings:** Unverified deployment, email, analytics, OAuth and monitoring areas
- **Owner:** Product owner
- **Actions:** Inventory production/preview environment variable names without values; record system owner and expiry/rotation process for Supabase, Stripe, email, DNS, hosting, Search Console and analytics. Add missing `SITE_URL`/`VITE_SITE_URL` documentation.
- **Acceptance:** No credential values in repository; every production integration has an owner and verification status.
- **Estimate:** 0.5 day.

### P0-03 Freeze unsafe payment behavior

- **Finding:** HDW-003
- **Owner:** Technical lead + product owner
- **Actions:** Confirm whether production Stripe secret is present. If present, disable public buy-now and present an enquiry/reservation CTA until Phase D payment controls pass.
- **Acceptance:** No unauthenticated production route can create a live chargeable session.
- **Estimate:** 0.25 day.

## 6. Phase A — Launch blockers (Days 1–10)

### Workstream A1 — Build, deployment and route parity

#### A1-01 Fix the TypeScript failure

- **Findings:** HDW-004
- **Action:** Narrow/filter `source_asset_name` to `string[]` before the Supabase `.in()` call; retain intended duplicate-task behavior.
- **Tests:** Unit test candidates with missing names; typecheck; diagnostics integration test.
- **Acceptance:** `npx tsc --noEmit` passes without casts that hide nullability.
- **Files:** `src/lib/admin-diagnostics.functions.ts`.
- **Owner/estimate:** Technical lead, 0.25 day.

#### A1-02 Deploy all intended public routes

- **Findings:** HDW-001
- **Action:** Preview and promote `/work`, `/privacy`, and the three capability pages; validate all current public and asset routes, 404 behavior, trailing slashes and `www` redirect.
- **Acceptance:** Every route in the approved registry returns its declared status; no public navigation target returns 4xx/5xx; unknown path returns branded 404 with HTTP 404.
- **Owner/estimate:** Technical lead, 0.5–1 day after P0-01.

#### A1-03 Create a single route registry and generated sitemap

- **Findings:** HDW-008, HDW-009
- **Action:** Add indexable/access/title/description/priority metadata to one typed route registry. Generate sitemap from it; exclude auth/admin/onboarding if product owner selects noindex. Add a route/link checker.
- **Acceptance:** Sitemap includes every approved public revenue route exactly once; every entry returns 200 and canonical matches; CI fails on broken links.
- **Owner/estimate:** Technical lead, 1 day.

### Workstream A2 — Admin boundary and Supabase authorization

#### A2-01 Add server-capable admin route protection

- **Findings:** HDW-005
- **Action:** Resolve authenticated user and admin role before protected route render using TanStack Start-compatible server loading/middleware. Preserve RLS as the data boundary. Return login redirect for anonymous users and a stable 403 for authenticated non-admins.
- **Tests:** Anonymous, user, admin, expired token, deleted user and direct navigation tests for every `/admin/*` route.
- **Acceptance:** Protected HTML/data never appears to anonymous/non-admin requests; no client flash; redirect parameter is allow-listed to local routes to prevent open redirects.
- **Owner/estimate:** Technical lead, 1–2 days.

#### A2-02 Apply private-route metadata policy

- **Findings:** HDW-005, HDW-009
- **Action:** Add `noindex,nofollow,noarchive` via HTML and optionally `X-Robots-Tag`; suppress public canonical/OG schema on auth/admin/error routes.
- **Acceptance:** Header/source checks confirm no public canonical on private routes; private URLs absent from sitemap.
- **Owner/estimate:** Technical lead, 0.5 day.

#### A2-03 Verify production migrations and `has_role`

- **Findings:** HDW-018
- **Action:** Compare local/remote migration lists and schemas; run Supabase security/performance advisors; test anon/authenticated/admin access against each resource; confirm `public.has_role` execute is revoked and `app_private.has_role` works only as intended.
- **Acceptance:** Signed permissions matrix matches tests; no critical/high advisor finding; prior permission error cannot be reproduced.
- **Dependency:** Supabase project access.
- **Owner/estimate:** Technical lead, 0.5–1 day.

### Workstream A3 — Lead safety and privacy

#### A3-01 Add layered lead abuse protection

- **Findings:** HDW-002
- **Action:** Add edge/server rate limit, honeypot, timestamp minimum, Turnstile or equivalent accessible challenge, duplicate hash window and Slack notification throttle. Keep generic client errors and structured server logs. Do not use client IP as permanent lead data.
- **Tests:** Normal submit; missing/invalid token; honeypot; 5/20-request bursts; replay; Slack outage; Supabase outage.
- **Acceptance:** Bots are rejected before service-role write; legitimate keyboard submission succeeds; failure never exposes provider details.
- **Owner/estimate:** Technical lead, 1–2 days; hosting/bot-provider dependency.

#### A3-02 Deploy an accurate privacy notice and acknowledgement

- **Findings:** HDW-010, HDW-016
- **Action:** Ensure `/privacy` is live. Add a required acknowledgement adjacent to the submit button linking to privacy. Do not bundle optional marketing consent.
- **Acceptance:** Privacy route returns 200; form cannot submit without acknowledgement; stored version/timestamp is defined if legally required.
- **Owner/estimate:** Product owner + legal reviewer + engineer, 0.5 engineering day.

### Workstream A4 — Security headers and incident visibility

#### A4-01 Add staged security headers

- **Findings:** HDW-007
- **Action:** Add CSP report-only first, `frame-ancestors`, Referrer-Policy, Permissions-Policy and explicit frame protection where compatible. Inventory Supabase, fonts, Slack/Stripe server-only and future analytics origins. Enforce CSP after violation review.
- **Acceptance:** Header test passes; site/auth work under CSP; no broad `unsafe-eval`; frame embedding is blocked.
- **Owner/estimate:** Technical lead, 1 day plus 48-hour report review.

#### A4-02 Add error and uptime monitoring

- **Findings:** Production readiness/unverified monitoring
- **Action:** Select a lightweight error monitor; scrub PII; monitor homepage, contact, auth and a canary lead endpoint that does not create a real lead. Set alert owner and severity thresholds.
- **Acceptance:** Deliberate preview error appears without secrets/PII; uptime alert and recovery notification are received.
- **Owner/estimate:** Technical lead, 1 day.

### Launch Gate — required before declaring the site safe to launch

- [ ] Production deployment revision and rollback are recorded.
- [ ] All approved public routes, sitemap entries and internal links pass.
- [ ] Typecheck, lint, initial tests and build pass in CI.
- [ ] Anonymous/non-admin/admin authorization tests pass.
- [ ] Admin/auth routes are noindex and excluded from sitemap.
- [ ] Lead abuse and failure-path tests pass.
- [ ] Privacy notice and acknowledgement are live.
- [ ] Live domain checkout is disabled or payment controls are complete.
- [ ] Supabase migration/RLS verification passes.
- [ ] Security headers and error/uptime monitoring are active.
- [ ] Production smoke passes at 320, 390, 768, 1024 and 1440px.

## 7. Phase B — Conversion and operations (Weeks 3–5)

### Workstream B1 — CI and automated test foundation

#### B1-01 Add deterministic scripts and CI

- **Findings:** HDW-004 and audit test gaps
- **Action:** Add `format:check`, `typecheck`, unit, integration and E2E scripts; use `npm ci`; cache safely; upload failure artifacts; protect deployment on required checks.
- **Acceptance:** Pull request cannot promote with a failing check; lockfile/package-manager choice is documented.
- **Owner/estimate:** Technical lead, 1 day.

#### B1-02 Build the minimum regression suite

- **Coverage:** Route status/metadata, lead validation and abuse rules, auth role matrix, RLS checks, CRUD happy/error paths, Stripe-disabled behavior, PWA assets and 404.
- **Acceptance:** Critical flows run in under 10 minutes and are non-destructive/repeatable.
- **Owner/estimate:** Technical lead, 3–5 days spread across phases.

#### B1-03 Resolve lint/format/dependency baseline

- **Action:** Capture current issues, fix without disabling substantive rules, pin the chosen package manager, audit production dependencies and document accepted exceptions with expiry dates.
- **Acceptance:** Clean checks; no high/critical unmitigated production vulnerability.
- **Owner/estimate:** Technical lead, 1–2 days.

### Workstream B2 — Qualified lead capture

#### B2-01 Expand the lead model proportionately

- **Findings:** HDW-010
- **Fields:** Organisation, current website, service, main challenge, desired outcome, budget band, timescale, context, privacy acknowledgement, optional marketing consent, landing page and UTM/referrer.
- **Rules:** Keep only name/email/challenge/privacy required; validate URL/email/enums; never store raw bot tokens; update generated types and RLS.
- **Acceptance:** Migration rolls forward/back safely; old leads remain readable; admin shows new fields; payload contains no unapproved PII.
- **Owner/estimate:** Engineer + product owner, 1–2 days.

#### B2-02 Improve form UX and accessibility

- **Action:** Inline field errors linked with `aria-describedby`; error summary; focus first invalid field; `aria-live` status; autocomplete attributes; disabled/loading/retry states; duplicate-submit prevention; mobile keyboard types.
- **Acceptance:** Keyboard and screen-reader E2E passes; 320px has no horizontal scroll; submission outcome is announced.
- **Owner/estimate:** Engineer, 1 day.

#### B2-03 Introduce lead scoring and follow-up SLA

- **Action:** Define transparent scoring from service, budget, timescale and fit; never infer sensitive traits. Automatically create an owner, next action and follow-up date. Keep humans in control of acceptance/rejection.
- **Acceptance:** Every lead has owner/status/next action; urgent lead alert fires once; stale leads appear in a follow-up view.
- **Owner/estimate:** Product owner + engineer, 1–2 days.

### Workstream B3 — Email lifecycle

#### B3-01 Select and configure a transactional provider

- **Findings:** HDW-011
- **Action:** Verify `harleydigitalworks.com`; configure SPF, DKIM, DMARC monitoring, sender/reply-to and separate preview recipients.
- **Acceptance:** Authentication passes; no preview email can reach a real customer.
- **Owner/estimate:** DNS/email owner, 0.5–1 day.

#### B3-02 Add enquiry emails and delivery log

- **Action:** Customer confirmation and internal notification in HTML/plain text; stable template IDs; retry with bounded backoff; store delivery status/error category, not message bodies unless necessary. Slack becomes secondary.
- **Acceptance:** Success, provider timeout, retry and permanent failure tests pass; admin can see delivery status and resend safely.
- **Owner/estimate:** Engineer, 2–3 days.

### Workstream B4 — Offer and recurring revenue journey

#### B4-01 Resolve service duplication and hierarchy

- **Findings:** HDW-008, HDW-019
- **Decision:** Choose one canonical automation route; redirect the retired alias with 301. Position website builds, automation and transformation as primary outcomes; Care Plans, domains and content systems as continuations/add-ons; mark future products accurately.
- **Acceptance:** No duplicate intent; each service has audience, outcome, inclusions, starting price or qualification, and one primary CTA.
- **Owner/estimate:** Product owner + copy/design + engineer, 2–3 days.

#### B4-02 Make Care Plans the default continuation

- **Findings:** HDW-019
- **Action:** Show Care Plan options on website service/contact/onboarding; record plan interest; add proposal checklist, start date, renewal and reporting cadence. Do not call it a subscription until billing/support terms exist.
- **Acceptance:** Every accepted website lead has an explicit care-plan decision; KPI reports attachment rate.
- **Owner/estimate:** Product owner + engineer, 1–2 days.

#### B4-03 Restore trustworthy proof

- **Action:** Deploy `/work`; label capability studies accurately; create consent/evidence checklist for future case studies and testimonials; remove any unsupported claim.
- **Acceptance:** Every public proof item has owner, source, approval and review date.
- **Owner/estimate:** Product owner, 1–2 days.

### Workstream B5 — Minimal analytics

#### B5-01 Implement consent-aware measurement

- **Findings:** HDW-012
- **Events:** Page view, service view, CTA click, contact start, validation error category, contact success, Care Plan interest, domain enquiry and ContentFlow waitlist only when present.
- **Privacy:** No names, email, free text, user IDs or full query strings. Respect consent and DNT/GPC decision as defined by policy.
- **Acceptance:** Debug view shows one event per action; payload review contains no PII; consent state persists correctly.
- **Owner/estimate:** Engineer + privacy owner, 1–2 days.

#### B5-02 Build the operating KPI view

- **Metrics:** Qualified leads, lead-to-call, call-to-customer, project revenue, MRR, Care Plan/hosting adoption, source, ARPC, ContentFlow funnel, churn and revenue/founder hour.
- **Acceptance:** Metric definitions, owner, source, refresh cadence and exclusions are documented.
- **Owner/estimate:** Product owner + engineer, 1–2 days.

## 8. Phase C — Quality and compliance (Weeks 4–8)

### Workstream C1 — Responsive admin and accessibility

#### C1-01 Add accessible mobile admin navigation

- **Findings:** HDW-006
- **Action:** Mobile header + Radix Sheet, current-page label, focus trap/restore, Escape/overlay close, 44px targets and scroll-safe content.
- **Acceptance:** All admin pages reachable at 320/375/390/768px by touch and keyboard.
- **Owner/estimate:** Engineer, 1 day.

#### C1-02 Replace custom modal/drawer implementations

- **Findings:** HDW-015, HDW-024
- **Action:** Use shared Dialog/Sheet/AlertDialog for editors and destructive confirmations; add accessible titles/descriptions, close labels, focus management and mutation announcements.
- **Acceptance:** No generic modal overlay remains; screen-reader/keyboard test passes.
- **Owner/estimate:** Engineer, 2–3 days.

#### C1-03 Complete WCAG 2.2 AA sweep

- **Findings:** HDW-023 and audit accessibility gaps
- **Coverage:** Skip links, landmarks, headings, link purpose, contrast, visible focus, target size, zoom 200/400%, reduced motion, orientation, tables, status/error messaging, autocomplete, images/icons.
- **Viewports:** 320, 375, 390, 768, 1024, 1280, 1440 and large desktop.
- **Acceptance:** No critical/serious axe findings; all core flows keyboard-complete; manual checklist signed.
- **Owner/estimate:** Accessibility reviewer + engineer, 3–5 days.

### Workstream C2 — Admin scalability

#### C2-01 Add pagination/search/sorting

- **Findings:** HDW-014
- **Action:** Bounded selects and explicit columns; server pagination; stable sort; debounced search; filters; empty/loading/error states; URL-persisted query state where useful.
- **Acceptance:** Tested with 10k seeded records; no unbounded query; user listing continues beyond 200.
- **Owner/estimate:** Engineer, 3–4 days.

#### C2-02 Database constraints and indexes review

- **Action:** Explain plans for admin lists and lead queries; add only evidence-backed indexes; validate foreign keys, cascades, timestamps, pagination keys and uniqueness.
- **Acceptance:** Supabase performance advisor clean or exceptions documented; query latency budget met in seeded environment.
- **Owner/estimate:** Engineer, 1–2 days.

### Workstream C3 — SEO and metadata

#### C3-01 Create metadata/indexability helper

- **Findings:** HDW-009
- **Action:** Unique title/description/H1/canonical/OG/X for every indexable page; query/trailing-slash canonical policy; noindex private/thin/future pages.
- **Acceptance:** Automated metadata snapshot passes; no duplicate title/canonical in crawl.
- **Owner/estimate:** Engineer + content owner, 1–2 days.

#### C3-02 Add supported structured data

- **Action:** Organization/ProfessionalService at site level; Service on visible service pages; BreadcrumbList where breadcrumbs are visible; SoftwareApplication only when ContentFlow has matching public product details. Do not add unsupported FAQ schema merely because accordions exist.
- **Acceptance:** Validator passes and schema matches visible claims.
- **Owner/estimate:** Engineer, 1 day.

#### C3-03 Build search content plan

- **Targets:** Small-business web design, AI web design UK, charity/church websites, managed websites, UK maintenance, domain management, SMB automation, content systems and planning software.
- **Rule:** One intent per page; only publish evidence-rich content with clear commercial path.
- **Acceptance:** 90-day content map identifies intent, page, proof needed, CTA and internal links.
- **Owner/estimate:** SEO/content owner, 2 days planning then ongoing.

### Workstream C4 — Performance

#### C4-01 Profile and split the entry bundle

- **Findings:** HDW-013
- **Action:** Generate bundle graph; identify whether GSAP/Framer/admin libraries are in public entry; lazy-load route-only features; remove unused dependencies/components; preserve motion quality and reduced-motion path.
- **Budgets:** Initial JS ≤150 kB gzip on public home; no route chunk >100 kB gzip without approved exception.
- **Acceptance:** Build budget check passes and no regression in behavior.
- **Owner/estimate:** Engineer, 2–3 days.

#### C4-02 Optimize fonts, images and caching

- **Action:** Self-host/subset fonts, `font-display`, preload only critical font; explicit image dimensions/formats; audit SVG/social previews; define safe CDN/SSR caching and service-worker invalidation.
- **Acceptance:** Mobile Lighthouse ≥90 performance on representative preview or documented exception; LCP ≤2.5s, CLS ≤0.1, INP lab proxy healthy.
- **Owner/estimate:** Engineer, 2 days.

### Workstream C5 — PWA

#### C5-01 Correct maskable/offline assets

- **Findings:** HDW-020, HDW-021
- **Action:** Dedicated padded 192/512 maskable icons; remove remote font dependency from offline page; remove stale NOEMA comments/tokens; version cache on asset changes.
- **Acceptance:** Manifest/installability validation passes; offline fallback works with network disabled.
- **Owner/estimate:** Design + engineer, 0.5–1 day.

#### C5-02 Test install/update/standalone behavior

- **Acceptance:** Install, first offline visit, updated service worker, stale-cache deletion and standalone navigation pass on Chromium desktop/Android-equivalent; iOS icon/start behavior manually checked.
- **Owner/estimate:** QA/engineer, 1 day.

### Workstream C6 — Legal and policy completion

#### C6-01 Complete the legal page set

- **Findings:** HDW-016
- **Pages:** Privacy, cookies, website/service terms and accessibility statement; account deletion terms when accounts are customer-facing.
- **Inputs:** Actual legal entity/contact, processors, retention, lawful bases, international transfers, payment/email/analytics providers and rights process.
- **Acceptance:** Professional review complete; footer links valid; review owner/date recorded; no invented identifiers.
- **Owner/estimate:** Legal/product owner, 2–5 review days; engineer 1 day.

### Quality Gate

- [ ] Core journeys pass WCAG 2.2 AA manual and automated checks.
- [ ] All required viewport checks pass without horizontal overflow.
- [ ] Sitemap, metadata and structured data validation pass.
- [ ] Bundle and CWV budgets pass or approved exceptions expire within 30 days.
- [ ] Legal/consent pages reflect actual processors and behavior.
- [ ] PWA install/offline/update tests pass.
- [ ] Admin collections remain responsive with seeded scale data.

## 9. Phase D — Automation and growth (Weeks 7–12)

### Workstream D1 — Domain operations and payments

#### D1-01 Build the domain order model

- **Findings:** HDW-003
- **Model:** Order ID, domain, immutable quoted amount/currency, customer reference, Stripe customer/session/payment IDs, status, idempotency key, fulfilment/transfer status, audit timestamps and operator notes. Protect customer data with RLS; never trust client price.
- **Acceptance:** Migration and RLS tests pass; duplicate active sale for one domain is prevented.
- **Owner/estimate:** Engineer, 1–2 days.

#### D1-02 Implement signed idempotent Stripe webhooks

- **Events:** Checkout completed/expired, payment succeeded/failed/refunded/disputed as required by chosen flow.
- **Rules:** Verify raw-body signature, store processed event ID, tolerate duplicates/out-of-order delivery, return quickly and retry work safely.
- **Acceptance:** Stripe CLI/test-mode success, replay, invalid signature, duplicate, out-of-order, refund and failure tests pass.
- **Owner/estimate:** Engineer, 2–3 days.

#### D1-03 Add fulfilment and reconciliation

- **Action:** Admin order queue, customer/admin transactional emails, transfer checklist, cancellation/refund path, daily reconciliation and incident runbook. Define tax/invoice responsibility before live mode.
- **Acceptance:** A test payment can be reconciled from Stripe to order to fulfilment and refunded without manual database edits.
- **Owner/estimate:** Engineer + operations + finance/legal, 2–3 days.

#### Payment Release Gate

- [ ] Product owner signs price, fulfilment, refund, tax and support decisions.
- [ ] Webhook signature/idempotency/replay tests pass.
- [ ] Order RLS and admin access tests pass.
- [ ] Customer/admin email and reconciliation pass.
- [ ] Test-mode E2E, refund and rollback runbooks pass.
- [ ] Only then may production Stripe be enabled.

### Workstream D2 — CRM and delivery automation

#### D2-01 Automate qualified-lead follow-up

- **Action:** Status transitions, SLA reminders, discovery-call/proposal tasks, stale-lead alerts and source attribution. Avoid automatic rejection without review.
- **Acceptance:** Each workflow is idempotent and auditable; repeated events do not duplicate tasks/messages.
- **Owner/estimate:** Engineer + operations, 2–3 days.

#### D2-02 Automate client onboarding

- **Action:** On accepted lead, create client/project/checklist, request assets, create approved folders/tasks, set milestones and assign owner. Keep external creation behind explicit confirmation.
- **Acceptance:** Sandbox onboarding produces one coherent project; rollback/archive path documented.
- **Owner/estimate:** Engineer + operations, 3–4 days.

#### D2-03 Automate recurring-service operations

- **Finding:** HDW-019
- **Action:** Hosting/maintenance/domain renewal dates, renewal reminders, monthly maintenance report, failed-payment follow-up, testimonial/referral request after measurable success.
- **Acceptance:** Upcoming renewals and overdue actions are visible 30/60/90 days ahead; no customer receives duplicate reminders.
- **Owner/estimate:** Engineer + operations, 3–5 days.

### Workstream D3 — ContentFlow and digital products

#### D3-01 Validate before building subscriptions

- **Action:** Accurate waitlist/value proposition, problem interviews, activation definition, beta cohort and willingness-to-pay test. Track consented waitlist conversion.
- **Acceptance:** Written go/no-go criteria met before subscription architecture begins.
- **Owner/estimate:** Product owner, 2–4 weeks alongside core work.

#### D3-02 Add subscription billing only after entitlement design

- **Requirements:** Product/price source of truth, checkout, signed webhooks, subscription states, entitlements, failed-payment grace, cancellation, portal, invoices/tax, trial/beta rules and reconciliation.
- **Acceptance:** Full sandbox lifecycle and access-after-cancellation tests pass.
- **Owner/estimate:** Separate 5–10 day engineering project after validation; not part of launch critical path.

### Operational Growth Gate

- [ ] Automation runs are idempotent, logged and recoverable.
- [ ] Every external message/action has an owner and suppression rule.
- [ ] Renewal and MRR metrics reconcile with billing records.
- [ ] Founder administration time and revenue/founder hour are measured monthly.
- [ ] ContentFlow/product work has validated demand and explicit go/no-go approval.

## 10. Finding-to-ticket coverage matrix

| Finding | Resolution tickets | Completion evidence |
|---|---|---|
| HDW-001 Production drift | P0-01, A1-02 | Route crawl + deployment revision |
| HDW-002 Lead abuse | A3-01 | Burst/replay/bot tests |
| HDW-003 Payment lifecycle | P0-03, D1-01–03 | Payment Release Gate |
| HDW-004 Type/CI | A1-01, B1-01 | Green required CI |
| HDW-005 Admin gate/indexing | A2-01–02 | Role + robots tests |
| HDW-006 Mobile admin | C1-01 | Viewport/keyboard tests |
| HDW-007 Headers | A4-01 | Header/CSP scan |
| HDW-008 Sitemap | A1-03, B4-01 | Generated validated sitemap |
| HDW-009 Metadata | A2-02, C3-01–02 | Metadata/schema crawl |
| HDW-010 Qualification/consent | A3-02, B2-01–02 | Form/model tests |
| HDW-011 Email | B3-01–02 | Delivery/retry tests |
| HDW-012 Analytics | B5-01–02 | PII-safe event/KPI validation |
| HDW-013 Performance | C4-01–02 | Bundle/CWV budgets |
| HDW-014 Pagination | C2-01–02 | 10k-record tests/query plans |
| HDW-015 Dialog accessibility | C1-02–03 | WCAG evidence |
| HDW-016 Legal | A3-02, C6-01 | Reviewed live policies |
| HDW-017 Stale documentation | P0-01–02 | Updated runbooks/names |
| HDW-018 `has_role` production | A2-03 | Remote RLS/advisor results |
| HDW-019 Recurring lifecycle | B4-02, D2-03 | Attach/renewal KPIs |
| HDW-020 Maskable icon | C5-01 | Manifest validation |
| HDW-021 Offline page | C5-01–02 | Network-off test |
| HDW-022 Vite plugin warning | C4-01 | Build comparison/no warning or documented retention |
| HDW-023 Skip link | C1-03 | Keyboard test |
| HDW-024 Labels/confirm | C1-02–03 | Accessible-name/dialog tests |

## 11. Decision register required from the product owner

These decisions block parts of the programme and should be resolved in Week 1:

1. Authoritative host: Cloudflare or Vercel.
2. Canonical service architecture: `/services/ai-automation` versus `/services/automation`.
3. Whether `/onboarding` is public/indexable or client-only/noindex.
4. Domain commerce mode: enquiry/reservation now; exact fulfilment/refund/tax policy later.
5. Lead budget bands, desired response SLA and qualification threshold.
6. Email provider and approved sender/reply-to addresses.
7. Analytics provider and consent approach.
8. Confirmed legal entity/contact details for professional legal review.
9. Care Plan packages, service levels, exclusions, starting price and renewal terms.
10. ContentFlow status: concept, waitlist, beta or sellable product.

## 12. Weekly operating cadence

- **Monday, 30 minutes:** Review production health, blockers, capacity and current release objective.
- **Midweek, 20 minutes:** Product/legal decisions only; avoid broad status meeting.
- **Friday, 45 minutes:** Demonstrate acceptance criteria, review metrics, approve/reject release and reprioritize next week.
- Maintain one board with columns: Blocked, Ready, In progress, In review, Preview accepted, Released, Verified.
- Limit work in progress to two engineering tickets, only one of which may touch auth/database/payment.
- Re-score work weekly using: launch/security impact, revenue/MRR impact, customer impact, dependency unlock, effort and reversibility.

## 13. Risk register

| Risk | Probability/impact | Mitigation | Trigger/response |
|---|---|---|---|
| Wrong deployment target causes new drift | Medium/High | P0-01 and revision provenance | Freeze promotion; rollback exact deployment |
| Auth change locks out admin | Medium/High | Seeded admin, preview role tests, recovery procedure | Roll back route gate; retain RLS |
| RLS migration exposes data | Low/Critical | Policy tests and advisor before deploy | Revoke API grants/rollback with new migration |
| Bot controls reject real leads | Medium/High | Layered accessible controls and monitoring | Fail to safe enquiry email only if abuse risk acceptable |
| CSP breaks app/integrations | Medium/Medium | Report-only rollout | Revert enforcement, refine directive |
| Email harms reputation | Medium/Medium | SPF/DKIM/DMARC, preview suppression | Pause sends, investigate provider logs |
| Payment without fulfilment | High/Critical today | P0-03 and Payment Gate | Disable live checkout immediately |
| Legal review delays launch | Medium/High | Accurate interim privacy + early reviewer booking | Keep optional tracking/payment disabled |
| Scope expands into SaaS redesign | High/High | Phase gates and D3 go/no-go | Return work to current release objective |

## 14. Final completion criteria

The remediation programme is complete only when:

- all HDW-001–024 rows have linked evidence and an accepted status;
- all three gates are signed by technical and product owners;
- every audit limitation has been tested or explicitly accepted with owner and review date;
- no Critical/High security, data, payment, routing or legal launch issue remains;
- CI and production monitoring demonstrate stability for at least 14 days;
- lead conversion and Care Plan attachment are measured from real, consented data;
- rollback, restore and incident exercises have been performed, not merely documented;
- deferred ContentFlow/subscription work remains outside the core platform until demand and lifecycle controls are validated.

## 15. Immediate next actions

1. Product owner answers the ten decisions in §11.
2. Technical lead executes P0-01 through P0-03.
3. Create Phase A tickets A1-01 through A4-02 with the stated acceptance criteria.
4. Book Supabase access review and legal/email/DNS inputs now; they are external critical-path dependencies.
5. Do not begin Phase B–D implementation until the Launch Gate is passed.
