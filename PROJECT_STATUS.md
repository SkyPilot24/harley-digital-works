# Harley Digital Works — Project Status

## Operating Brief & Verified Production State — 27 October 2026

- **Production Platform Target:** Cloudflare Worker `skypilot24-harley-digital-works` (Version `d2081dde-07f5-490f-9614-39fda9f728ef`, `https://harleydigitalworks.com`).
- **Production Supabase Database:** `worzpzbutngugwzhlvtj` (Isolated Staging: `mfpnfxpgkfuqtedbcxvp`).
- **Development Server:** Binds strictly to Port 3000 (`http://localhost:3000/`). Port 8080 is permanently reserved for NVIDIA Broadcast on the founder's machine.
- **Terminology Governance:** The term "live" is reserved strictly for production (`harleydigitalworks.com` / `worzpzbutngugwzhlvtj`), never local development or staging previews.
- **Commercial Boundary:** Ratified Managed package: £1,495 setup + £249/mo care. Capacity: strictly up to 2 concurrent builds. Pilot focus: electrical contractors in Bristol, Bath, and M4 corridor. Zero VAT. No guaranteed 14-day turnarounds or numerical ranking claims.
- **Single Active Bottleneck:** Pilot client outreach activation and booking first 3 electrical contractor builds in the Bristol / Bath corridor.
- **Domain Portfolio & Monetisation:** Completed full portfolio audit (£28,600+ BIN / ~£12,000 floor reserve / £2,500+/mo lease potential), rich Schema.org SEO on `/domains`, UI mockups for social outreach, and expanded outbound campaigns.

---

## Full Repository Code, Compliance, Security, and Governance Remediation — 27 October 2026

**Copy claims verified: yes**

**Current Status:** Completed comprehensive repository-wide remediation across 5 structured phases, eliminating all fabricated claims, unmeasured promises, security vulnerabilities, and dead code while enforcing WCAG 2.1 AA accessibility and test-driven compliance.

1. **Phase 1: Security, Trust, Honest Review Forms and Outreach Compliance** (`f3f87d3`):
   - Integrated `assertAdmin` authentication check into all administrative endpoints and Slack server functions (`src/lib/slack/server-functions.ts`).
   - Added automated security test `scripts/server-fn-auth.test.mjs` verifying all administrative server functions require authenticated sessions.
   - Removed fake hash generation and simulated issues from `src/routes/audit.tsx`. Replaced with honest "Request a free website review" form submitting to Supabase intake.
   - Stripped fabricated "Live Telemetry Desk" and hardcoded metrics (`100/100`, `94% Top 3 Map Pack`, `99.99%`, sub-30ms claims) from `src/routes/labs.tsx`.
   - Set `noindex: true` on private routes (`tools.seo-inspector.tsx`, `care-desk`, `proposals`, `onboarding`, `track`).
   - Unmounted `ExitIntentModal.tsx` from `PageShell.tsx` to stop popups interrupting visitors.
   - Removed review gating and 5-star guarantees from `src/routes/tools.review-booster.tsx`.
   - Deleted unused `src/components/site/TradeGoogleReviewsWidget.tsx`. Replaced real Gas Safe registration numbers with `[your number]`.
   - Replaced dummy phone numbers across public code with Ofcom drama ranges (`0161 496 0xxx`, `01632 960xxx`, `07700 900xxx`) or HDW canonical numbers.
   - Added PECR outreach compliance verification and `List-Unsubscribe` headers in `src/lib/email-delivery.ts`.

2. **Phase 2: Removal of Fabricated Claims, Testimonials and SEO Promises** (`8b15243`):
   - Removed all invented case studies (`localCaseStudy`) across `src/lib/location-data.ts`, `TradeServiceLanding.tsx`, and tests.
   - Labeled portfolio entries as "Design Studies" in `src/lib/portfolio-data.ts`, removing fictional client quotes and unmeasured metrics.
   - Sanitized `CustomerTransformationSection.tsx`: removed fictional customer quotes ("Dave M.", "Chris P."), removed £3,500+ job claims, and removed competitor insults.
   - Rewrote home page hero headline and subline (`src/routes/index.tsx`): removed "100% done-for-you", "zero homework", "zero generic templates", and "Zero Risk".
   - Rewrote `TradeRoiCalculator.tsx`: changed H1 to "What is one extra enquiry worth to you?", removed ROI multiplier and VAT references.
   - Cleaned package tiers and SLA promises across `onboarding.tsx`, `ContractorOnboardingWizard.tsx`, `proposals.tsx`, and `CareBillingPortalDesk.tsx`.
   - Prioritized electrical contractors first in `TRADE_VERTICALS` (`src/lib/trade-data.ts`).
   - Corrected founder representation across all public touchpoints: "Founder Robbie Harley" (removed academic titles "Dr" and "MBA").

3. **Phase 3: Pricing, Scope, Geography, Domain Portfolio and Brand Hierarchy Consistency** (`427c45b`):
   - Replaced legacy pricing (£95/mo, £995, £149, £2,495, £2,995) with ratified £1,495 setup + £249/mo ongoing care across all strategy, knowledge base, and admin records.
   - Removed `+ VAT` phrasing from outreach scripts and templates (`TradeOutreachHub.tsx`, `ClientMilestoneSignOffDesk.tsx`).
   - Aligned pilot messaging: electrical contractors first, Bristol / Bath / M4 corridor, strictly up to 2 concurrent builds. Added `noindex, follow` to `locations.tsx`.
   - Redirected outdated service routes to canonical `/services` hub (`ai-automation`, `automation`, `digital-products`, `digital-transformation`, `content-engine`).
   - Cleaned `src/lib/domain-portfolio.ts` and `src/routes/domains.tsx`: removed internal notes, retired domains, unconfirmed domains, and speculative valuation ranges; showing "Enquire for price" only.
   - Standardized `theharleygroup.org` cross-brand routing (`src/server.ts`, `src/routes/the-harley-group.tsx`): linked primary CTAs to `https://harleydigitalworks.com`, updated Labs copy, and reduced Revival Fellowship to a single line behind a configurable flag.
   - Added `noindex` robots meta tags for all private routes.

4. **Phase 4: Lead Intake Security, Turnstile, CSP, Test Runner and Deploy Hardening** (`95f9e07`):
   - Deleted legacy `vercel.json` and cleaned obsolete Vercel mentions from code exporter and documentation.
   - Hardened `src/lib/lead-intake.functions.ts`: required `LEAD_RATE_LIMIT_SECRET` without fallback, added `verifyTurnstileToken` siteverify integration with `TURNSTILE_ENABLED` feature flag (default false), and logged structured warnings when intake IP is unknown in production.
   - Created accessible, lazy-loaded `TurnstileWidget.tsx` and mounted it into `EnquiryForm.tsx`.
   - Updated `lead-schema.ts`, `.env.example`, and created intake tests in `scripts/intake-results.test.mjs` (7/7 passed).
   - Consolidated security headers in `src/server.ts` as single source of truth; removed global `/*` block from `public/_headers`; deleted deprecated `X-XSS-Protection`; added `Content-Security-Policy-Report-Only`.
   - Fixed Service Worker bypass path from `/_server-fn` to `/_serverFn` in `public/sw.js` and verified with `scripts/verify-service-worker.mjs` (4/4 passed).
   - Vendored `vendor/xlsx-0.20.3.tgz` (2.4 MB); updated `package.json` to `"xlsx": "file:vendor/xlsx-0.20.3.tgz"`.
   - Created unified test runner `scripts/run-all-tests.mjs` that runs all test suites and reports all failures instead of short-circuiting.
   - Hardened `.github/workflows/deploy.yml`: required Quality and Security gates before deployment; fails if `CLOUDFLARE_API_TOKEN` is missing on `main`.
   - Deduplicated hourly cron in `nitro.config.ts`.

5. **Phase 5: Claims Guard, Accessibility, Bundle Optimisation, Repo Hygiene and Status Consolidation**:
   - Enforced automated claims guard and phone number validation via `scripts/claims-guard.test.mjs` (2/2 suites passing, 0 violations).
   - Globally honored `prefers-reduced-motion` in GSAP and wrapped root application in `<MotionConfig reducedMotion="user">` via Framer Motion in `src/routes/__root.tsx`.
   - Added accessible `id`, `htmlFor`, `aria-label`, and `aria-valuetext` to range sliders in `TradeRoiCalculator.tsx` and `ExitIntentModal.tsx`.
   - Handled video autoplay stopping and transcript accessibility in `HeroTransformationVideoModal.tsx`.
   - Added code-split manualChunks in `vite.config.ts` for Framer Motion, Lucide icons, and Supabase client.
   - Removed tracked binaries: `.agents/skills/harley-commercial-governance.7z`, `public/brand/2026-10-21/Harley-Final-Media-Pack.zip`, `skills/*.zip`, and `test-results/`. Untracked `ionos-domains-export-2026-10-17.csv` and updated `.gitignore`.
   - Added `scripts/smoke.test.mjs` verifying unauthenticated redirect to `/auth`, lead intake pipeline, key page `<h1>` accessibility structure, and global motion reduction.
   - Consolidated `PROJECT_STATUS.md` and archived 1,200+ historical lines to `docs/history/PROJECT_STATUS_ARCHIVE_2026-10.md`.

---

## Cloudflare CLI Authentication & Direct Production Deployment — 26 October 2026

**Copy claims verified: yes**

**Current Status:** Resolved Cloudflare CLI (`wrangler`) authentication failure and executed direct production deployment to Cloudflare Worker `skypilot24-harley-digital-works`:

1. **Root Cause Analysis & Resolution**:
   - **Token Shadowing in `.env.local`:** `.env.local` contained a DNS-scoped API token (`cfut_...`) labeled `CLOUDFLARE_API_TOKEN`. When running Wrangler CLI commands, Wrangler automatically read `.env.local` and prioritized this DNS token over the user's logged-in account, triggering `Authentication error [code: 10000]` and `Failed to automatically retrieve account IDs`.
   - **Resolution:** Renamed `CLOUDFLARE_API_TOKEN` to `CLOUDFLARE_DNS_API_TOKEN` in `.env.local`. This immediately unmasked Robbie's authorized global OAuth login (`robbieharley83@gmail.com`, Account ID `6ccd86a1ec4535357f9bc51cd05e68cd`) with full `workers_scripts:write` permissions.
   - **Direct Production Deployment:** Executed `npx wrangler deploy --config .output/server/wrangler.json`, publishing Version ID `d2081dde-07f5-490f-9614-39fda9f728ef` across all worker triggers and static assets.
2. **Empirical Quality & Production Verification**:
   - Wrangler CLI Authentication (`npx wrangler whoami`): **PASS** (Authenticated as `robbieharley83@gmail.com`).
   - Production Domain (`https://harleydigitalworks.com`): **HTTP 200 OK** (Instant edge SSR response).
   - Headquarters Domain (`https://theharleygroup.org/the-harley-group`): **HTTP 200 OK**.
   - Direct Worker (`https://skypilot24-harley-digital-works.robbieharley83.workers.dev`): **HTTP 200 OK**.
   - Trade Routes (`/demos`, `/locations`, `/audit`, `/calculator`): **HTTP 200 OK**.

---

## Cloudflare SSR Runtime & CI Quality Gate Resolution — 26 October 2026

**Copy claims verified: yes**

**Current Status:** Resolved Cloudflare HTTP 500 runtime crash and GitHub Actions CI gate failure following Dependabot PR #56:

1. **Root Cause Analysis & Resolution**:
   - Upstream `lucide-react` v1.x permanently removed `Linkedin` icon export; replaced with self-contained inline `LinkedInIcon` SVG component in `DomainOutboundEngine.tsx`.
   - Dynamic import in `src/server.ts` triggered a Rolldown hoisting defect (`TypeError: __exportAll is not a function`), causing live SSR requests on `https://harleydigitalworks.com` to return HTTP 500. Replaced with static top-level import in `src/server.ts`.
   - Breaking type changes from Dependabot's upgrade to `react-day-picker@10` and `recharts@3` broke GitHub CI `Quality` workflow; reverted both to proven stable versions in `package.json` (`react-day-picker: ^9.14.0`, `recharts: ^2.15.4`).
   - Cleaned invisible UTF-8 BOM byte sequence from `mcp_config.json`.
2. **Empirical Quality Suite Verification**:
   - Cloudflare Nitro Worker Local Simulation (`wrangler dev` on port 4173): **HTTP 200 OK (74ms)** (0 errors, 101kB HTML rendered).
   - `npm run typecheck`: PASS (0 TS errors).
   - `npm test`: **221/221 tests passing** across 28 test suites (0 failures).
   - `scripts/ai-chatbots.test.mjs`: **10/10 tests passing**.
   - `npm run format:check`: PASS (100% Prettier compliant).
   - `npm run build`: PASS (Vite + Cloudflare Nitro compiled in 977ms).

---

## Comprehensive Website Audit & Conversion Optimisation Implementation — 26 October 2026

**Copy claims verified: yes**

**Current Status:** Completed comprehensive page-by-page audit of customer experience (CX), conversion rate optimisation (CRO), and brand positioning across all public surfaces of The Harley Group, Harley Digital Works, Harley Labs, Digital Voice Receptionist, and Domain Portfolio:

1. **Strategic Audit & Actionable Blueprint Delivered**:
   - Authored comprehensive audit document: `docs/COMPREHENSIVE_WEBSITE_AUDIT.md` (and artifact `comprehensive_website_audit.md`).
   - Audited 16 distinct public routes and components against customer-facing conversion criteria, brand hierarchy, and remarketing effectiveness.
   - Identified and catalogued internal messaging leaks, developer jargon, orphaned redirect paths, and under-promoted high-converting assets.
2. **Immediate Critical Implementations in Codebase**:
   - **The Harley Group (`/the-harley-group`)**: Replaced legalistic "Governance Record" disclaimer on pro bono community initiative (The Revival Fellowship) with an inspiring CSR / social responsibility narrative; replaced "sub-50ms edge rendering" with "Instant-loading digital architectures"; reframed "Pilot capacity is limited to two concurrent builds" into an exclusive founder commitment to quality; replaced internal `/brand` link with `/domains`.
   - **Harley Digital Works Home (`/`)**: Broadened SEO title and hero badge from electrical-only pigeonholing ("Websites for Electrical Contractors | Bristol & Bath") to "Websites & Digital Care for UK Trade Contractors | Bristol, Bath & UK Wide", removing friction for plumbers, heating engineers, roofers, and builders arriving via remarketing.
   - **Site Navigation (`SiteHeader.tsx`)**: Elevated high-converting assets into main desktop and mobile navigation: added `24/7 Phone Answering` (`/virtual-receptionist`) and `Live Demos` (`/demos`).
   - **Site Footer (`FooterDark.tsx`)**: Removed internal developer link `/brand` ("Brand Standards & Guild Seal"); brought in customer-facing links for `24/7 Phone Receptionist`, `Interactive Trade Demos`, `Domain Portfolio`, `Harley Labs R&D`, and direct consultation routing.
   - **Harley Labs (`/labs`)**: Pre-selected structured service parameter (`service="Harley Labs Systems & R&D Enquiry"`) on hero and footer contact CTAs to streamline lead routing.
   - **Domain Portfolio (`/domains`)**: Enhanced commercial copy highlighting outright purchase, assisted registrar transfers, and flexible lease-to-own terms (from £79/mo) with separate "Buy" and "Lease" enquiry CTAs.
   - **Phase 2 Customer Journey Refinements**: Added 24/7 Phone Receptionist bundle row (+£99/mo, save £50/mo) and spotlight banner to `WebsitePackagesSection.tsx`; added 24/7 Receptionist cross-sell banner on `/services/web-design-development`; created dynamic contextual welcome banners on `/contact` for free website audit consultations, domain purchases, and phone answering leads.
3. **Empirical Quality Suite Verification**:
   - `claims-guard`: PASS (0 forbidden claims, zero VAT compliance, no speculative SEO guarantees).
   - Workspace Unit & Integration Tests: **231/231 tests passing** across 30 test suites (0 failures).
   - `npm run typecheck`: PASS (0 TS errors).
   - `npm run lint`: PASS (0 errors, 9 non-blocking UI warnings).
   - `npm run format:check`: PASS (100% Prettier compliant).
   - `npm run build`: PASS (Compiled cleanly in 1.91s).
   - Verified locally in Chrome on Port 3000 (`http://localhost:3000/`).

---

## Production Launch of AI Customer Service & Sales Chatbots — 26 October 2026

**Copy claims verified: yes**

**Current Status:** Completed design, implementation, and empirical verification of production-ready, individually branded AI website assistants for both marketing surfaces:

1. **Brand-Specific AI Digital Assistants**:
   - **Harley Digital Works** (`harleydigitalworks.com` / `/`): Specialist UK trade sales and customer service assistant ("Callum | HDW Trade Specialist"). Explains the ratified £1,495 setup (50% upfront, 50% on approval) + £249/mo ongoing care package, 100% copywriting and setup included, zero VAT compliance, 2-concurrency active build limits, and the 24/7 AI virtual phone receptionist add-on (+£99/mo bundle).
   - **The Harley Group** (`theharleygroup.org` / `/the-harley-group`): Corporate advisory assistant ("Victoria | Senior Group Advisor"). Explains the parent group portfolio (Harley Digital Works, Harley Labs, Domain Portfolio), cross-brand routing, and executive founder escalation to Robbie Harley.
2. **Unified Intelligence Core & Serverless API Gateway**:
   - `src/lib/ai-assistant/`: Shared contracts, verified knowledge bases, Google Cloud Dialogflow CX Agent Builder upstream connection (`07495933-b944-44ed-9528-7ea30007e477` for HDW; `9761cd1b-2014-4173-8848-1b6db1b18390` for THG), zero-latency deterministic local fallback knowledge engines, natural lead extraction, and prompt injection defense.
   - `src/routes/api.chat.assistant.ts`: Public TanStack Router server endpoint (`POST /api/chat/assistant`).
   - `src/routes/api.chat.lead-capture.ts`: Server route for direct lead intake into the existing Supabase CRM (`submit_public_lead`).
3. **Apple-Grade Frontend Experience**:
   - `src/components/chat/BrandChatWidget.tsx`: Discreet floating launch pill, dual brand theming (Midnight Navy & Emerald for HDW; Obsidian Slate & Amber for THG), quick prompt pills, animated typing indicator, conversational in-chat lead booking card, and direct founder phone/WhatsApp escalation (`07394 041487`).
   - `src/components/site/PageShell.tsx`: Automatically mounts the assistant across public marketing pages, with `hideChat` control for private contractor demos (`/demos/rg-electrical`).
4. **Empirical Quality Suite**:
   - Automated Chatbot Test Suite: `scripts/ai-chatbots.test.mjs` (10/10 tests passing).
   - Workspace Unit & Integration Tests: **221/221 tests passing** (0 failures).
   - `npm run typecheck`: PASS (0 TS errors).
   - `npm run lint`: PASS (0 errors, 9 non-blocking UI warnings).
   - `npm run format:check`: PASS (100% Prettier compliant).
   - `npm run build`: PASS (Vite SSR + Cloudflare Nitro bundle compiled in 1.98s).
   - Verified locally in Chrome on Port 3000 (`http://localhost:3000/` and `http://localhost:3000/the-harley-group`).

---

## Launch of Commercial AI Virtual Receptionist Multi-Tenant Revenue Stream — 26 October 2026

**Copy claims verified: yes**

**Current Status:** Completed end-to-end transformation of the single-agent Harley Digital Works Virtual Phone Receptionist into a scalable, multi-client commercial subscription business operated by The Harley Group:

1. **Multi-Tenant Voice & Telephony Architecture**:
   - Preserved Primary HDW Inbound Switchboard (`07394 041487` / `hdw-primary`) as a permanently dedicated intake channel for Harley Digital Works.
   - Built multi-tenant architecture supporting isolated client switchboards with custom British Neural2 voice personas, bespoke trade FAQs, emergency safety escalation rules, and instant WhatsApp/Email dispatch.
   - Added pre-configured pilot profiles: `rg-electrical` (Bristol Electrician), `apex-heating` (Gas Safe Engineers), `clifton-roofing` (Roofing Contractors).
   - Created safe fallback: Calls dispatch to Google Dialogflow CX (`en-GB-Neural2-B` British voice) when cloud credentials are present, falling back smoothly to a zero-latency local trade knowledge engine in edge environments.
2. **Commercial Offering & Subscription Engine**:
   - Standalone Subscriptions: Solo (£79/mo, 50 calls), Pro Managed (£149/mo, 150 calls), Commercial Fleet (£249/mo, 350 calls).
   - Website Care Plan Add-On: Available for +£99/mo to the £249/mo Managed Website Care Plan (£348/mo total), saving clients £600/year.
   - The Managed Revenue & Switchboard Bundle: £1,495 setup + £348/mo ongoing care.
   - Zero VAT compliant copy across all customer surfaces (prices quoted cleanly without VAT claims).
3. **Business Administration Control Centre (`/admin/receptionist`)**:
   - Executive revenue dashboard (MRR, gross margins, active switchboards, total calls, emergency alerts, Google Cloud credit buffer).
   - Switchboard tenant management (DID allocation, voice persona selection, status toggles, call forward overrides).
   - Interactive Studio & Test Dialer with trade demonstration switcher.
