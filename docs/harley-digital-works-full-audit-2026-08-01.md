# Harley Digital Works — Full Project and Website Audit

**Audit date:** 1 August 2026  
**Repository branch:** `codex/audit`  
**Production reviewed:** `https://harleydigitalworks.com`  
**Audit mode:** Read-only. No application, database, deployment, or production changes were made.

## 1. Executive summary

**Release decision: Launch blocked.**

The audited branch is a credible foundation: it has a coherent TanStack Start architecture, reusable site/admin components, server-side validation, Supabase RLS, protected privileged server functions, a working production build, branded PWA assets, a real contact workflow, and a commercially useful Control Centre. The live public site also resolves over HTTPS, redirects `www` to the apex, serves robots/sitemap files, and returns a real 404 for unknown URLs.

It is not safe to call the current system production-ready. Production is materially behind the repository: `/work`, `/privacy`, and three primary service routes return 404 despite existing locally and appearing in the local sitemap. The standalone type check fails. Public lead and Stripe session endpoints have no rate limiting or bot controls. The Stripe flow can accept payment but has no webhook, idempotent fulfilment record, refund/cancellation synchronisation, or entitlement path. Admin HTML routes return `200`, canonicalize themselves, and lack `noindex`; access enforcement occurs after client hydration, although database RLS and server-function authorization provide the important data boundary. No CSP is present. Automated tests, CI, monitoring, analytics, cookie controls, complete legal pages, and operational recovery evidence are absent.

The offer is polished but commercially incomplete. Website, automation and transformation services are clear, but hosting, maintenance, domains, ContentFlow AI and recurring support are not yet joined into a single obvious buyer journey. The contact form is usable but does not capture budget, timescale, current website, outcome, consent or attribution. The fastest credible revenue path is to deploy the audited branch safely, protect and instrument lead capture, make Care Plans the standard continuation of every build, and convert the domain checkout into an enquiry/reservation flow until fulfilment is production-grade.

### Strengths

- Clear current brand identity and concise value proposition in the audited branch.
- File-based routing, route-level bundles, shared layout primitives and centralized site configuration.
- Supabase RLS on exposed operational tables; admin server functions authenticate and re-check admin role.
- `has_role` remediation exists in migrations: policies use `app_private.has_role`, execute is revoked from the legacy public function, and the helper has a fixed `search_path`.
- Service-role key is server-only and dynamically imported from server handlers.
- Lead input is Zod-validated and stored server-side before optional Slack notification.
- Production build passes and unknown production routes return an actual HTTP 404.
- PWA name, short name, icons, cache name, offline fallback and service-worker exclusions use current branding.

### Most serious risks

1. Production/repository drift creates broken customer journeys and contradicts the sitemap and local navigation.
2. Unprotected public write/session-creation endpoints are vulnerable to spam, alert abuse and resource exhaustion.
3. Payment initiation is ahead of fulfilment and reconciliation controls.
4. Type safety is not enforced; no automated test or CI gate protects deployment.
5. Admin URLs are publicly indexable shells and access protection depends on client hydration for navigation, even though data access remains protected by RLS/server checks.

## 2. Architecture summary

TanStack Start 1.168/React 19 uses generated file-based routing and SSR through Vite/Nitro. TanStack Query manages server state; Tailwind CSS 4 plus Radix-based primitives provide UI; GSAP and Framer Motion are both installed. Supabase supplies Auth, Postgres and RLS. Browser reads/writes in the admin generally call Supabase directly and rely on RLS. Privileged user-management and diagnostics functions authenticate bearer tokens in middleware, assert the admin role again, then use a server-only service-role client. Lead capture and domain checkout are unauthenticated server functions. Leads persist to Supabase and optionally notify Slack. Domain checkout creates a one-time Stripe Checkout Session from code-defined inventory/prices. No payment webhook, email provider, background-job system, file-storage workflow, monitoring SDK, analytics SDK, CI workflow or configured automated tests were found.

Deployment configuration is inconsistent: `vercel.json` sets `NITRO_PRESET=vercel`, while a plain `npm run build` emitted a Cloudflare-module worker and the legacy generated worker name `skypilot24-thgdigital`. Production responses identify Cloudflare. Environment values are split between public `VITE_*` and server-only variables, but `.env.example` omits `VITE_SITE_URL`/`SITE_URL` even though the application supports them.

## 3. Audit scorecard

| Area                        | Score | Status                | Key reason                                                                                          |
| --------------------------- | ----: | --------------------- | --------------------------------------------------------------------------------------------------- |
| Architecture                |     7 | Good foundation       | Clear boundaries, generated routes and shared config; deployment target ambiguity                   |
| Code quality                |     5 | Needs work            | Type check fails; broad `any`; duplicate/legacy patterns and unused UI surface                      |
| UI and UX                   |     7 | Good                  | Coherent design and journeys; several app states and admin controls remain weak                     |
| Mobile                      |     5 | Partially verified    | Responsive classes exist; admin sidebar disappears below `md` with no mobile replacement            |
| Accessibility               |     5 | Partial               | Labels, landmarks and reduced motion exist; dialogs/drawers and status announcements are incomplete |
| SEO                         |     4 | High risk             | Production 404s, incomplete sitemap, admin indexability and generic inherited social metadata       |
| Performance                 |     5 | Needs work            | 633.16 kB entry chunk; external fonts; SSR pages marked no-cache                                    |
| Security                    |     5 | Significant gaps      | RLS is thoughtful; no CSP/rate limiting/bot protection, public admin shells                         |
| Database                    |     6 | Reasonable migrations | RLS and constraints exist; production drift/advisors/indexes not confirmed                          |
| Authentication              |     6 | Partial               | Supabase session handling and server checks; full lifecycle untested                                |
| Admin dashboard             |     5 | Useful but incomplete | Broad CRUD and diagnostics; weak mobile UX, no pagination, client gate                              |
| Forms and email             |     4 | Incomplete            | Validated lead storage/Slack; no spam controls, consent, confirmation email or retry queue          |
| PWA                         |     7 | Good static setup     | Correct branding/cache exclusions; installation/update/offline interaction unverified               |
| Analytics                   |     1 | Absent                | No analytics or conversion events found                                                             |
| Legal readiness             |     3 | Blocked               | Privacy page local but 404 live; no terms, cookie or accessibility statement                        |
| Conversion                  |     6 | Promising             | Clear CTAs and proposition; qualification, proof and attribution are thin                           |
| Recurring-revenue readiness |     4 | Underdeveloped        | Care Plans exist; recurring adoption and lifecycle are not operationalized                          |
| Production readiness        |     4 | Launch blocked        | Build passes, but production drift, failed typecheck and missing controls remain                    |

## 4. Prioritised findings

### Critical

#### HDW-001 — Production is out of sync with the audited repository

- **Area/severity:** Deployment, routing, SEO — Critical
- **Evidence:** On 1 August production returned `404` for `/work`, `/privacy`, `/services/web-design-development`, `/services/ai-automation` and `/services/digital-transformation`. All five routes exist in `src/routes` and the first four commercial routes are referenced by current local navigation/content. The local production build passes.
- **Affected:** Production; `src/routes/work.tsx`, `privacy.tsx`, `services_.*.tsx`; `public/sitemap.xml`
- **Impact:** Broken customer journeys, lost trust/leads, sitemap errors and an unreliable release baseline.
- **Fix:** Create a reproducible preview from this exact commit, run smoke/accessibility tests, deploy via one declared target, then re-crawl all routes. Do not patch production independently.
- **Effort/dependencies:** 0.5–1 day; hosting access, env parity, Supabase redirect allow-list.
- **Validation:** All route checks return expected status; sitemap URLs resolve; branch SHA/build provenance recorded.

### High

#### HDW-002 — Public lead endpoint has no abuse controls

- **Evidence:** `submitLead` accepts anonymous POSTs, writes with service role and sends Slack (`src/lib/lead-intake.functions.ts:5-20,31-67`). Validation limits content length but there is no rate limit, honeypot, CAPTCHA/Turnstile, replay key or duplicate suppression.
- **Impact:** Database/Slack spam, notification flooding and avoidable operational cost.
- **Fix:** Add layered rate limiting keyed by IP/session, a hidden honeypot and Turnstile or equivalent, generic client errors, duplicate window and alert throttling.
- **Effort/dependencies:** 1–2 days; edge/hosting rate-limit support and privacy review.
- **Validation:** Automated burst/replay tests; bot challenge test; legitimate form remains keyboard accessible.

#### HDW-003 — Payment flow can charge without a production-grade fulfilment lifecycle

- **Evidence:** `createDomainCheckout` is anonymous and only creates a Stripe Checkout Session (`src/lib/domain-checkout.functions.ts:10-57`). No webhook handler, signature verification, idempotency key, order table, paid/cancelled/refunded synchronisation, receipt workflow or transfer state exists.
- **Impact:** A customer can pay while operations lack a reliable order record or automated fulfilment/reconciliation.
- **Fix:** Until the lifecycle exists, change buy-now to enquiry/reservation. Before enabling payment, add order model, signed idempotent webhook, reconciliation, customer/admin emails, fulfilment state, refund/cancellation runbook and test-mode E2E tests.
- **Effort/dependencies:** 3–6 days; Stripe configuration, legal/tax/fulfilment decisions.
- **Validation:** Stripe test-mode success, duplicate webhook, failed payment, refund and replay scenarios.

#### HDW-004 — Type safety is not a release gate

- **Evidence:** `npx tsc --noEmit` fails at `src/lib/admin-diagnostics.functions.ts:107` because `(string | undefined)[]` is passed to `.in()`. `npm run build` still exits 0.
- **Impact:** Deployments can succeed with known static defects.
- **Fix:** Resolve the nullable type at source, add `typecheck` script, and require typecheck + lint + tests + build in CI.
- **Effort/dependencies:** 0.5 day; CI provider.
- **Validation:** Clean standalone typecheck and CI failure on an intentional type error.

#### HDW-005 — Admin routes are indexable public shells and route protection is client-side

- **Evidence:** Every tested `/admin/*` URL returned HTTP 200 with a self-canonical and no robots directive. `_authenticated/route.tsx` only renders `AdminShell`; `AdminShell` redirects unauthenticated users in `useEffect`. Data remains protected by RLS and server assertions.
- **Impact:** Search index pollution, route disclosure, flash/empty SSR, weak defence-in-depth and confusing monitoring.
- **Fix:** Enforce authentication/admin role in a server-capable route `beforeLoad`/middleware; return redirect/403 before protected rendering; apply `noindex, nofollow` and omit admin routes from canonicals/sitemaps.
- **Effort/dependencies:** 1–2 days; SSR auth-cookie strategy.
- **Validation:** Anonymous direct requests redirect or return 401/403; authenticated non-admin is denied; admin succeeds; no protected data appears in source.

#### HDW-006 — Admin mobile navigation is absent

- **Evidence:** `AdminShell` renders the only navigation as `hidden ... md:flex`; main content merely removes left padding below `md`. No mobile drawer/menu is rendered.
- **Impact:** Control Centre becomes effectively unnavigable on phones; operational work and urgent lead handling suffer.
- **Fix:** Add an accessible mobile header/drawer with current-location state, focus trapping and 44px targets.
- **Effort/dependencies:** 1 day.
- **Validation:** Keyboard/touch tests at 320, 375, 390 and 768px across all admin routes.

### Medium

#### HDW-007 — Security headers are incomplete

- **Evidence:** Production has HSTS and `X-Content-Type-Options: nosniff`, but no Content-Security-Policy header. No explicit permissions/referrer/frame policy was confirmed.
- **Impact:** Reduced XSS/clickjacking defence-in-depth, especially around third-party fonts and future analytics.
- **Fix:** Introduce report-only CSP, inventory required origins, then enforce; add `frame-ancestors`, Referrer-Policy and Permissions-Policy.
- **Effort:** 1–2 days. **Validation:** header tests and CSP violation review.

#### HDW-008 — Sitemap is incomplete and contradicts production

- **Evidence:** Local sitemap includes nine pages but omits `/services/automation`, `/services/care-plans`, `/services/content-engine`, `/services/digital-products`, `/services/launch-plan`, `/domains`, `/resources`, and `/onboarding`; it includes three service URLs that return 404 in production.
- **Impact:** Crawl inefficiency and incomplete discovery of revenue pages.
- **Fix:** Generate sitemap from a single indexable-route registry at build time and validate every entry.
- **Effort:** 0.5 day. **Validation:** XML schema and HTTP crawl.

#### HDW-009 — Root metadata is over-inherited

- **Evidence:** Root adds Open Graph/X fields and canonical globally, while route heads mostly override only title/description. Admin pages inherit public brand metadata; no route-specific OG content or breadcrumbs were found.
- **Impact:** Poor social previews and irrelevant admin metadata.
- **Fix:** Define an indexability/metadata helper and route-specific title, description, OG and canonical policy; add supported Organization/ProfessionalService and breadcrumb schema only where visible content supports it.
- **Effort:** 1–2 days.

#### HDW-010 — Contact qualification and consent are incomplete

- **Evidence:** Schema captures name, email, company, package and message only (`lead-schema.ts:3-9`). No current website, challenge/outcome split, budget, timescale, consent, source/UTM or privacy acknowledgement is stored.
- **Impact:** More founder triage, weaker attribution and ambiguous lawful/marketing basis.
- **Fix:** Add proportionate optional qualification plus required privacy acknowledgement; keep marketing consent separate and optional.
- **Effort:** 1–2 days; migration and privacy wording.

#### HDW-011 — Email lifecycle is effectively absent

- **Evidence:** Lead workflow stores data and optionally posts to Slack; no email provider or confirmation/admin email workflow was found. Slack failure only logs and is not retried.
- **Impact:** Enquirers receive no confirmation; delivery failures are silent; onboarding and retention stay manual.
- **Fix:** Add transactional provider, verified domain, plain-text/HTML templates, retry queue and event log for enquiry confirmation/admin notification first.
- **Effort:** 2–4 days; DNS/provider/privacy.

#### HDW-012 — Analytics and KPI instrumentation are absent

- **Evidence:** No analytics SDK, `gtag`, event layer or consent manager was found.
- **Impact:** No evidence for channel quality, CTA effectiveness or funnel improvement.
- **Fix:** Implement a minimal privacy-conscious plan: page view, CTA click, contact start/success, service interest, domain enquiry/checkout start and ContentFlow signup when launched.
- **Effort:** 1–2 days; consent/legal decision.

#### HDW-013 — Performance budget is exceeded

- **Evidence:** Build output reports `index-CAMc7lKX.js` at 633.16 kB minified/179.09 kB gzip and emits the >500 kB warning. Both GSAP and Framer Motion are dependencies; Google Fonts are render-path external resources. Production SSR HTML uses `no-cache`.
- **Impact:** Higher parse/hydration cost and weaker mobile CWV resilience.
- **Fix:** Profile the entry graph; lazy-load animation/admin-only libraries, remove unused UI/dependencies, self-host/subset fonts, cache safe marketing HTML and set bundle budgets.
- **Effort:** 2–4 days. **Validation:** route bundles, Lighthouse mobile and real-user CWV.

#### HDW-014 — Admin collections are unbounded

- **Evidence:** `ResourceManager` uses `.select("*")` without pagination; admin user listing hard-caps at 200; multiple dashboards query entire tables.
- **Impact:** Progressive latency/memory problems and missing records as the agency grows.
- **Fix:** Add server pagination, counts, search, stable sorting and bounded selects.
- **Effort:** 2–4 days.

#### HDW-015 — Modal/drawer accessibility is incomplete

- **Evidence:** Custom full-screen admin editors are generic `div`s without dialog role, labelled relationship, focus trap, Escape handling or focus restoration; icon close buttons lack accessible names in several places.
- **Impact:** Keyboard and screen-reader users can lose context or become trapped.
- **Fix:** Use the existing Radix Dialog/Sheet primitives consistently and announce mutations/status.
- **Effort:** 1–2 days. **Validation:** keyboard and screen-reader smoke.

#### HDW-016 — Legal coverage is insufficient

- **Evidence:** A local privacy page explicitly says it needs legal review and returns 404 in production. No terms, cookie policy or accessibility statement routes were found. Footer/legal identity details are incomplete.
- **Impact:** Compliance and procurement friction; paid services lack clear contractual framing.
- **Fix:** Deploy privacy notice, document processors/retention/lawful basis, add terms/cookie/accessibility material after professional review; do not invent entity data.
- **Effort:** 2–5 days plus legal review.

#### HDW-017 — Documentation and operational identifiers retain stale brand/deployment state

- **Evidence:** `README.md` begins “THG Digital”; `docs/project-domain.md` still makes `theharleygroup.org` primary; build emits worker `skypilot24-thgdigital`; diagnostics use `THG-Control-Centre-Diagnostics/1.0`.
- **Impact:** Operator confusion, deployment mistakes and brand drift.
- **Fix:** Separate intentionally retained technical identifiers from operator-facing names, update README/domain/runbooks and explicitly declare the production platform.
- **Effort:** 0.5–1 day.

#### HDW-018 — The `has_role` code fix is confirmed only in migrations, not production

- **Evidence:** Migration `20260704145204...sql` creates `app_private.has_role`, grants authenticated/service-role execution, rewrites policies and revokes legacy public execution. Later policies use the private helper. No live database connection/advisor output was available.
- **Impact:** The prior `permission denied for function has_role` is likely fixed in source but may persist if production migration history drifted.
- **Fix:** Compare remote migration list/schema, execute role-policy tests as anon/authenticated/admin and run Supabase security/performance advisors.
- **Effort:** 0.5 day; Supabase project access.

#### HDW-019 — Recurring revenue is not embedded in the lifecycle

- **Evidence:** Care Plans have a public page, but no automatic proposal inclusion, package selection in the generic contact flow, subscription billing, renewal/reporting workflow or lifecycle automation was found.
- **Impact:** One-off builds are not systematically converted to MRR.
- **Fix:** Make hosting/care the default post-launch option, record plan interest on leads, add renewal/reporting tasks and introduce subscriptions only after support scope and SLAs are defined.
- **Effort:** 3–8 days across product/ops/engineering.

### Low / informational

- **HDW-020:** Local PWA manifest uses `purpose: "any maskable"` for a 32px favicon; use a dedicated sufficiently padded maskable 192/512 asset.
- **HDW-021:** Offline page loads Google Fonts while offline and retains comments/visual language from the older “NOEMA Poster OS” design; self-host or use system fonts and align the page to current design tokens.
- **HDW-022:** Build warns that `vite-tsconfig-paths` is redundant with Vite 8 native path resolution; remove only after verifying the Lovable wrapper requirement.
- **HDW-023:** No skip link was found; add one to the shared public and admin shells.
- **HDW-024:** Several buttons rely on icon-only labels or browser `confirm`; standardize accessible names and confirmation dialogs.

## 5. Route audit

Production results were captured by direct HTTP requests on 1 August 2026. “Client gate” means HTTP 200 shell followed by client-side auth/admin evaluation; database access is separately controlled.

| Route                              | Purpose                    | Access          |      Production | Linked/declared from         | Canonical/indexation | Issue / recommendation                                 |
| ---------------------------------- | -------------------------- | --------------- | --------------: | ---------------------------- | -------------------- | ------------------------------------------------------ |
| `/`                                | Home/conversion            | Public          |             200 | Header, footer, sitemap      | Canonical `/`        | Healthy response; monitor CWV                          |
| `/about`                           | Trust/founder              | Public          |             200 | Nav, sitemap                 | Canonical; indexable | Add verifiable proof                                   |
| `/work`                            | Capability studies         | Public          |         **404** | Local homepage/nav           | Missing live         | Deploy before linking/indexing                         |
| `/services`                        | Offer catalogue            | Public          |             200 | Nav, sitemap                 | Canonical; indexable | Clarify recurring path                                 |
| `/services/web-design-development` | Website service            | Public          |         **404** | Local services/home; sitemap | Missing live         | Launch blocker                                         |
| `/services/ai-automation`          | Automation service         | Public          |         **404** | Local services/home; sitemap | Missing live         | Launch blocker                                         |
| `/services/digital-transformation` | Transformation             | Public          |         **404** | Local services; sitemap      | Missing live         | Launch blocker                                         |
| `/services/automation`             | Legacy/packaged automation | Public          |             200 | Legacy site config/nav       | Canonical; indexable | Decide relationship/redirect with AI page              |
| `/services/care-plans`             | Hosting/maintenance MRR    | Public          |             200 | Nav/site config              | Missing sitemap      | Add to sitemap and core journey                        |
| `/services/content-engine`         | Content system             | Public          |             200 | Nav/site config              | Missing sitemap      | Add to sitemap; connect ContentFlow                    |
| `/services/digital-products`       | Product direction          | Public          |             200 | Nav/site config              | Missing sitemap      | Be explicit about availability                         |
| `/services/launch-plan`            | Productized build          | Public          |             200 | Nav/site config              | Missing sitemap      | Add to sitemap                                         |
| `/domains`                         | Domain portfolio/checkout  | Public          |             200 | Nav/site config              | Missing sitemap      | Gate payment until fulfilment exists                   |
| `/resources`                       | Content/lead nurture       | Public          |             200 | Nav/site config              | Missing sitemap      | Add real resources and sitemap                         |
| `/contact`                         | Lead capture               | Public          |             200 | Site-wide CTAs               | Canonical; sitemap   | Add abuse control/qualification                        |
| `/onboarding`                      | Pre-client process         | Public          |             200 | Nav/footer                   | Missing sitemap      | Consider noindex until client-ready                    |
| `/privacy`                         | Privacy notice             | Public          |         **404** | Local footer/sitemap         | Missing live         | Launch blocker for lead capture                        |
| `/auth`                            | Sign in/up/reset           | Public, noindex |             200 | Direct/admin redirect        | `noindex,nofollow`   | Canonical still emitted; remove canonical              |
| `/admin/`                          | Control Centre             | Admin           | 200 client gate | Direct/admin nav             | Indexable canonical  | Server-gate + noindex                                  |
| `/admin/leads`                     | Lead management            | Admin           | 200 client gate | Admin nav                    | Indexable canonical  | Server-gate + noindex                                  |
| `/admin/clients`                   | Client management          | Admin           | 200 client gate | Admin nav                    | Indexable canonical  | Server-gate + noindex                                  |
| `/admin/projects`                  | Project management         | Admin           | 200 client gate | Admin nav                    | Indexable canonical  | Server-gate + noindex                                  |
| `/admin/team`                      | Team management            | Admin           | 200 client gate | Admin nav                    | Indexable canonical  | Server-gate + noindex                                  |
| `/admin/services`                  | Service CMS                | Admin           | 200 client gate | Admin nav                    | Indexable canonical  | Server-gate + noindex                                  |
| `/admin/resources`                 | Resource CMS               | Admin           | 200 client gate | Admin nav                    | Indexable canonical  | Server-gate + noindex                                  |
| `/admin/testimonials`              | Testimonial CMS            | Admin           | 200 client gate | Admin nav                    | Indexable canonical  | Server-gate + noindex                                  |
| `/admin/users`                     | User/role admin            | Admin           | 200 client gate | Admin nav                    | Indexable canonical  | Server-gate + noindex                                  |
| `/admin/settings`                  | Agency settings            | Admin           | 200 client gate | Admin nav                    | Indexable canonical  | Server-gate + noindex                                  |
| `/admin/revenue-os`                | Revenue portfolio/tasks    | Admin           | 200 client gate | Admin nav                    | Indexable canonical  | Add pagination/validation                              |
| `/admin/domain-os`                 | Domain operations          | Admin           | 200 client gate | Admin nav                    | Indexable canonical  | Connect order lifecycle                                |
| `/admin/diagnostics`               | Website/auth diagnostics   | Admin           | 200 client gate | Admin nav                    | Indexable canonical  | Fix type error/route registry                          |
| `/admin/playbooks`                 | Operating playbooks        | Admin           | 200 client gate | Admin nav                    | Indexable canonical  | Confirm persistence model                              |
| Unknown path                       | 404 handling               | Public          |             404 | N/A                          | No canonical         | Correct HTTP behavior confirmed                        |
| `/robots.txt`                      | Crawl rules                | Public          |             200 | Standard                     | Allows all           | Disallow is not security; noindex admin in HTML/header |
| `/sitemap.xml`                     | Discovery                  | Public          |             200 | Robots                       | Incomplete           | Generate from registry                                 |
| `/site.webmanifest`                | PWA                        | Public          |             200 | Root head                    | N/A                  | Correct current app naming                             |
| `/sw.js`                           | PWA cache                  | Public          |             200 | Root effect                  | N/A                  | Install/update interaction unverified                  |
| `/offline.html`                    | Offline fallback           | Public          |             200 | Service worker               | N/A                  | Remove remote font dependency                          |

No dynamic content routes, API route files, explicit redirects, deprecated aliases or legal routes beyond `/privacy` were found. TanStack server functions are exposed through framework RPC endpoints rather than hand-authored API route files.

## 6. Security and permissions matrix

This matrix records only code-confirmed access. “RLS” means authorization is enforced by policies; “server assert” means authenticated middleware plus an explicit admin-role check.

| Resource                                  | Anonymous                                                         | Authenticated user                                         | Client                          | Team member                 | Admin                                                  | Service role                 |
| ----------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------- | --------------------------- | ------------------------------------------------------ | ---------------------------- |
| Published services/resources/testimonials | Read published via RLS                                            | Read published                                             | Same as authenticated           | Same unless admin role      | Read/manage via RLS                                    | Full                         |
| Leads                                     | Insert via legacy Data API policy; server lead intake also writes | Insert                                                     | No ownership read confirmed     | No special access confirmed | Read/update/delete via RLS                             | Full                         |
| Clients                                   | None                                                              | None unless admin                                          | No self-record policy confirmed | None unless admin           | CRUD via RLS                                           | Full                         |
| Projects                                  | None                                                              | Own projects where `client_id = auth.uid()` policy applies | Read own confirmed in migration | No special access confirmed | CRUD via RLS                                           | Full                         |
| Team base table                           | None                                                              | None unless admin                                          | None                            | None unless admin           | CRUD/select via RLS                                    | Full                         |
| Public team view                          | Read active safe columns                                          | Read                                                       | Read                            | Read                        | Read                                                   | Read/full underlying         |
| Agency settings                           | Read                                                              | Read                                                       | Read                            | Read                        | Read/manage via RLS                                    | Full                         |
| User roles                                | None                                                              | Read own role                                              | Read own role                   | Read own role               | Read/manage all via RLS and protected server functions | Full                         |
| Revenue OS assets/tasks                   | None                                                              | None unless admin                                          | None                            | None unless admin           | CRUD via `app_private.has_role` RLS                    | Full                         |
| Auth users                                | None                                                              | None                                                       | None                            | None                        | List via authenticated + server admin assertion        | Auth Admin API               |
| Domain checkout creation                  | Create session for allow-listed fixed-price domain                | Same                                                       | Same                            | Same                        | Same                                                   | Not applicable               |
| Diagnostics                               | None                                                              | Denied unless admin                                        | None                            | None unless admin           | Auth middleware + server admin assertion               | Uses service role internally |

The migration-level `has_role` permission error is **resolved in source**: `app_private.has_role` is executable by authenticated/service roles, policies call it, and execute on `public.has_role` is revoked. Remote schema/migration parity was not available, so production resolution is not confirmed.

## 7. Build and test results

| Check                       | Command                           | Result         | Existing/new       | Notes                                                                                       |
| --------------------------- | --------------------------------- | -------------- | ------------------ | ------------------------------------------------------------------------------------------- |
| Git state                   | `git status --short --branch`     | Pass           | Existing           | Clean branch `codex/audit`                                                                  |
| Type check                  | `npx tsc --noEmit`                | **Fail**       | Existing           | TS2345 at diagnostics line 107                                                              |
| Production build            | `npm run build`                   | Pass           | Current            | Client + SSR/Nitro built in ~29s                                                            |
| Bundle budget               | Build output                      | **Warn**       | Existing           | 633.16 kB minified entry chunk                                                              |
| Lint                        | `npm run lint`                    | Inconclusive   | Existing           | Exceeded 60s runner window with no output; earlier repo docs report broad formatting issues |
| Formatting                  | Prettier check in combined run    | Inconclusive   | Existing           | Combined command timed out before buffered output                                           |
| Unit tests                  | `npm test --if-present` / scripts | Not configured | Existing           | No `test` script or test files found                                                        |
| Integration/E2E             | Repository inspection             | Not configured | Existing           | No Playwright/Cypress/Vitest config found                                                   |
| Dependency audit            | `npm audit` in combined run       | Inconclusive   | Existing           | Combined command timed out; rerun in CI                                                     |
| Local production smoke      | `npx vite preview`                | Not possible   | Environment/config | Preview did not become reachable; project docs prescribe Wrangler preview                   |
| Production route crawl      | Direct HTTPS requests             | Mixed          | Production         | 27 routes/assets verified; five intended public pages return 404                            |
| Accessibility automation    | Browser tooling                   | Not possible   | Environment        | Browser runtime was blocked by Windows sandbox initialization                               |
| Lighthouse/CWV              | Browser tooling                   | Not possible   | Environment        | Bundle evidence only; no lab score claimed                                                  |
| Supabase migration/advisors | Static migration review           | Partial        | Access limit       | No remote CLI/MCP connection; no destructive database action taken                          |

## 8. Conversion and commercial audit

The homepage communicates a senior digital consultancy and provides a strong primary CTA. Five-second clarity is good for websites/automation/transformation, but weaker for the full stated portfolio. Hosting/maintenance, domains, content systems, SEO/growth and ContentFlow AI appear as separate ideas rather than one decision architecture. “Start a project” and “Discuss your idea” are consistent, but there is no distinct low-friction audit/book-a-call option and no event tracking.

Trust is founder-led and avoids fabricated claims, which is preferable to fake logos or metrics. However, the live `/work` 404 removes the main proof path. Capability studies are explicitly non-client claims; add real evidence only when consented and verifiable. Pricing exists on packaged routes, but a visitor cannot easily compare website build + ongoing Care Plan + automation support as one lifecycle.

### Opportunity scorecard

Scale: 1 low to 5 high; effort is inverse (5 = large effort).

| Opportunity                               | Revenue | Recurring | Effort | Automation | Scalability | Priority                   |
| ----------------------------------------- | ------: | --------: | -----: | ---------: | ----------: | -------------------------- |
| Make Care Plan standard with every build  |       5 |         5 |      2 |          4 |           4 | 1                          |
| Productized website/automation diagnostic |       4 |         3 |      2 |          4 |           4 | 2                          |
| Lead qualification + automated follow-up  |       4 |         3 |      2 |          5 |           4 | 3                          |
| Domain management/renewal service         |       3 |         5 |      3 |          5 |           4 | 4                          |
| ContentFlow AI waitlist then subscription |       4 |         5 |      5 |          5 |           5 | 5                          |
| SEO/content retainer tied to resources    |       3 |         5 |      3 |          4 |           4 | 6                          |
| Self-service domain sale                  |       3 |         1 |      5 |          4 |           3 | Defer until controls exist |

### Minimal KPI framework

- Qualified leads by source/service
- Contact-start to contact-submit conversion
- Lead-to-call and call-to-customer conversion
- Project revenue and average project value
- MRR, Care Plan adoption and hosting adoption
- Average revenue per customer and revenue per founder hour
- ContentFlow waitlist → activated → paid conversion (when real)
- Churn, renewal rate and failed-payment recovery

## 9. Quick wins

1. Deploy the exact audited branch through a preview and re-crawl the five missing routes.
2. Fix the one TypeScript failure and make typecheck a build gate.
3. Add `noindex` and server-side route gating to all admin paths.
4. Generate sitemap from the current route registry.
5. Add honeypot + rate limit + duplicate suppression to lead intake.
6. Add privacy acknowledgement, service, budget band, timescale and attribution to leads.
7. Change domain buy-now to enquiry/reservation until webhooks/orders exist.
8. Add mobile admin navigation using the existing Sheet primitive.
9. Update README, domain documentation and generated worker name.
10. Instrument contact start/success and CTA clicks with a minimal consent-aware setup.

## 10. Genuine launch blockers

- Production 404s on linked/declared public routes, including the privacy notice.
- No abuse protection on the public service-role lead write endpoint.
- Live payment should not be enabled without webhook/order/reconciliation controls; use enquiry-only meanwhile.
- Failing standalone TypeScript check with no CI gate.
- Admin route server gating/noindex must be corrected before presenting the Control Centre as production-ready.
- Final production environment, Supabase migration/redirect parity and email domain are not verified.

## 11. Post-launch backlog

### First week

- Monitor route/lead health and errors; verify inbox/Slack delivery.
- Add analytics events, Search Console and sitemap submission.
- Complete mobile admin nav, dialog accessibility and pagination design.
- Confirm Supabase advisors, remote migrations, backups and auth lifecycle.

### First month

- Transactional email, retry log and lead scoring/follow-up automation.
- Care Plan attach workflow, onboarding tasks and monthly report template.
- Real case-study/proof pipeline and content calendar.
- Bundle reduction, self-hosted fonts and CWV monitoring.
- Legal/procurement review and full policy set.

### Next quarter

- Domain renewal OS and automated reminders.
- Subscription billing/customer portal after entitlement design.
- ContentFlow AI validated beta funnel and product analytics.
- Incident response, restore drill, SLOs and mature test suite.
- Controlled self-service products only where fulfilment is automated.

## 12. 30-day improvement plan

| Window     | Focus       | Deliverable                                                                | Validation                           |
| ---------- | ----------- | -------------------------------------------------------------------------- | ------------------------------------ |
| Days 1–3   | Stability   | Fix TS, align target, preview/deploy missing routes                        | CI green; full route crawl           |
| Days 4–7   | Security    | Server-gate admin, noindex, lead rate limit/bot controls, CSP report-only  | Role tests, burst tests, header scan |
| Days 8–12  | Conversion  | Qualification/consent/attribution; Care Plan default; fix proof journey    | Form E2E and funnel events           |
| Days 13–17 | Operations  | Confirmation/admin emails, retry log, lead follow-up tasks                 | Provider delivery/retry tests        |
| Days 18–22 | Quality     | Mobile admin, dialog/table accessibility, sitemap/schema, legal routes     | WCAG keyboard/axe/manual checks      |
| Days 23–26 | Performance | Entry-graph split, fonts/images/cache review                               | Lighthouse + bundle budget           |
| Days 27–30 | Readiness   | Supabase advisors, restore/runbook, incident/rollback drill, KPI dashboard | Signed launch checklist              |

## 13. Controlled implementation sequence

### Phase A — Launch blockers

- **Scope:** Deployment parity, route 404s, typecheck/CI, admin server gate/noindex, lead abuse control, payment safety, Supabase remote parity.
- **Files:** `vercel.json`, `vite.config.ts`, `package.json`, route/auth middleware, `lead-intake.functions.ts`, `domain-checkout.functions.ts`, migrations/runbooks.
- **Dependencies/risk:** Hosting/Supabase/Stripe access; medium risk because auth and deployment behavior change.
- **Validation:** Preview route crawl, role matrix tests, Stripe test mode, security headers, CI.
- **Impact:** Safe reliable launch and protected enquiries.

### Phase B — Conversion and customer journey

- **Scope:** Homepage/service architecture, real proof, qualification, Care Plan attach, CTA attribution.
- **Files:** Public routes, `agency-content.ts`, `lead-schema.ts`, contact form, lead migration/admin lead view.
- **Dependencies/risk:** Final offer/pricing and privacy wording; low-to-medium risk.
- **Validation:** Mobile funnel E2E, event payload review, content sign-off.
- **Impact:** More qualified enquiries and higher recurring attachment.

### Phase C — Quality and compliance

- **Scope:** WCAG fixes, sitemap/metadata/schema, performance, legal set, analytics consent, PWA QA.
- **Files:** `__root.tsx`, shared shells/components, `styles.css`, public PWA/SEO files, legal routes.
- **Dependencies/risk:** Legal review and analytics decision; low risk with staged CSP.
- **Validation:** axe/manual keyboard, Lighthouse, structured-data validator, install/offline/update tests.
- **Impact:** Trust, discoverability, mobile quality and procurement readiness.

### Phase D — Automation and growth

- **Scope:** CRM lifecycle, email queue, onboarding, maintenance reports, renewals, ContentFlow beta and controlled billing.
- **Files:** New migrations/server functions/admin modules, email/webhook integrations and operating runbooks.
- **Dependencies/risk:** Highest scope and operational risk; require idempotency, audit logs and rollback.
- **Validation:** Sandbox E2E, replay/failure tests, reconciliation and operator acceptance.
- **Impact:** Lower founder administration, scalable delivery and MRR.

## 14. Files/directories requiring remediation

| Purpose          | Files/directories                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Release/build    | `package.json`, `vite.config.ts`, `vercel.json`, CI workflow (new), deployment runbook                                          |
| Routes/SEO       | `src/routeTree.gen.ts` (generated only), `src/routes/__root.tsx`, public route heads, `public/sitemap.xml`, `public/robots.txt` |
| Auth/admin       | `src/routes/_authenticated/route.tsx`, `src/components/admin/AdminShell.tsx`, auth middleware/hooks                             |
| Lead capture     | `src/lib/lead-schema.ts`, `src/lib/lead-intake.functions.ts`, `src/routes/contact.tsx`, leads migration/admin screen            |
| Payments         | `src/lib/domain-checkout.functions.ts`, domain route, new order/webhook migrations/functions                                    |
| Diagnostics      | `src/lib/admin-diagnostics.functions.ts`, `src/lib/site-config.ts`                                                              |
| Accessibility/UI | Custom admin editors, `ResourceManager.tsx`, shared header/footer/shell, `styles.css`                                           |
| PWA/performance  | `public/sw.js`, `public/offline.html`, manifest/icons, homepage animation/bundle imports                                        |
| Legal/analytics  | `src/routes/privacy.tsx`, new policy routes, root scripts/consent layer                                                         |
| Documentation    | `README.md`, `docs/project-domain.md`, launch checklist, incident/rollback/backup runbooks                                      |

## 15. Unverified areas and limitations

- Interactive browser control failed because the local Windows sandbox could not initialize; visual checks at 320/375/390/768/1024/1280/1440, Lighthouse, axe and keyboard/screen-reader interaction were not run in this audit.
- No credentials or seeded accounts were used. Registration, email verification, password reset, OAuth, session expiry, role change, deleted/disabled users and authenticated admin CRUD were not exercised end-to-end.
- No live lead was submitted, no Slack/email was sent and no Stripe Checkout was initiated, to avoid production side effects.
- Supabase remote schema, migration list, Data API grants, advisors, backups, storage buckets, auth settings and production `has_role` behavior were not accessible.
- Stripe mode, products/prices, webhook dashboard, tax/invoice/refund settings and customer portal were not accessible.
- Email provider/DNS (SPF, DKIM, DMARC), analytics, Search Console, OAuth callbacks, Cloudflare rules, Vercel settings, uptime monitoring and log retention were not accessible.
- Lint, Prettier and dependency-audit commands did not return definitive results within the available runner windows; repeat as isolated CI jobs.
- No data was available to validate actual lead/client/project records, database constraints under load, query plans, N+1 behavior, retention or deletion workflows.
- Legal conclusions require qualified professional review.

## Final assessment

The project has enough real engineering and product structure to reach a reliable launch quickly, but the current public deployment and operational controls do not yet meet that standard. Complete Phase A first. Do not broaden the redesign or build SaaS/subscription functionality until the release baseline, lead safety, admin boundary and payment lifecycle are demonstrably reliable.
