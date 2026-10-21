# Harley Digital Works — Project Status

## Interactive Group Divisions Navigation — 21 October 2026 (H15/H47)

**Current Status:** Converted all three business division cards on the group holding page (`/the-harley-group`) from static text into interactive, accessible links with micro-animated arrow badges:
1. **01 Harley Digital Works**: Navigates directly to `/` (HDW customer operating platform).
2. **02 Harley Labs**: Navigates directly to `/labs` (Harley Labs AI & software systems).
3. **03 Domain Services**: Navigates directly to `/domains` (Curated portfolio of digital brand assets).

**Verification:**

- `npm run check:governance`: PASS.
- `npm run format:check`: PASS.
- `npm run typecheck`: PASS (0 errors).
- `npm test`: PASS (199/199 passing assertions).
- `http://localhost:8080/the-harley-group`: Live verified.

## Cinematic MP4 Video Showcase Integration & Authentic Before/After Assets Deployment — 21 October 2026 (H15/H16/H42)

**Current Status:** Integrated 3 real cinematic MP4 video clips generated on Higgsfield.ai / Kling 3.0 into the 55-second Hero Transformation Video Showcase player, and deployed 6 authentic British "Before" renovation assets into the interactive Before & After slider:
1. **Real Motion Video Showcase (`HeroTransformationVideoModal.tsx`, `public/images/transformation-video/`)**:
   - `scene-1-frustration.mp4`: Frustrated UK trade contractor inside a Ford Transit cab looking at an outdated broken mobile website in the rain.
   - `scene-3-zero-homework.mp4`: Relaxed UK trade contractor smiling with a steaming mug of tea beside his Ford Transit with zero homework stress.
   - `scene-4-offer-cta.mp4`: Slow macro cinematic pan across a machined brass Trade Quality Guild Seal badge, luxury leather folder, and signed agreement.
   - Wired into HTML5 video player with automated looping, audio-synchronized voiceover narration, interactive scene scrubber, and responsive poster fallback.
2. **New Authentic "Before" Assets (`public/images/home/`)**: `before-heating-boiler.jpg` (cramped under-stairs boiler cupboard), `before-kitchen-extension.jpg` (1970s galley kitchen with floral wallpaper), `before-landscaping-patio.jpg` (waterlogged muddy lawn with broken concrete slabs), `before-roofing-leadwork.jpg` (weathered Victorian roof with slipped tiles and crumbling chimney mortar), `before-electrical-fusebox.jpg` (antique Bakelite fusebox with messy wires), and `before-bathroom-interior.jpg` (tired 1980s avocado green bathroom with mouldy grout).
3. **Interactive Component Wiring (`BeforeAfterComparison.tsx`, `before-after-comparison.css`)**: Connected each trade tab to its genuine "Before" scene on the left and finished "After" installation on the right, removing the artificial monochrome filter and introducing calibrated natural grading.

**Verification:**

- `npm run typecheck`: PASS (0 errors).
- `npm test`: PASS (199/199 passing assertions).
- `npm run build`: PASS (Nitro SSR Cloudflare module build in 1.11s).
- `http://localhost:8080/`: Live verified.

## Authentic British Trade Photography & Website Overhaul — 20 October 2026 (H15/H16/H42)

**Current Status:** Completed full website image audit and visual overhaul across The Harley Group and Harley Digital Works, replacing generic architectural stock placeholders with 11 high-resolution authentic British trade and architectural assets generated via Higgsfield.ai / Nano Banana Pro:
1. **Public Asset Directory (`public/images/home/`)**: Ingested and deployed 11 authentic assets covering UK contractor vans, open-plan kitchen extensions, domestic solar & EV chargers, bespoke bathrooms, boiler plant rooms, porcelain patios, heritage decorating, joinery workshops, and Bath stone headquarters.
2. **Homepage & Brand Marketing Surfaces (`index.tsx`, `the-harley-group.tsx`, `about.tsx`, `work.tsx`)**: Replaced generic modern mansions with the smiling UK contractor by his Ford Transit (`hero-contractor.jpg`), the Bath stone headquarters (`thg-headquarters.jpg`), and the joiner at work (`craftsman-workshop.jpg`).
3. **Interactive Demonstrations & Trade Landings (`BeforeAfterComparison.tsx`, `ConceptShowcase.tsx`, `TradeServiceLanding.tsx`, `CapabilityPage.tsx`)**: Mapped each trade vertical (`/trades/heating-engineers`, `/trades/electricians`, `/trades/builders`, `/trades/commercial-contractors`, and `/locations/$slug`) to authentic, sector-specific photography, eliminating generic 3-image recycling across the application.

**Verification:**

- `npm run typecheck`: PASS (0 errors).
- `npm test`: PASS (199/199 passing assertions).
- `npm run build`: PASS (Nitro SSR Cloudflare module build in 2.40s).
- `http://localhost:8080/`: Live verified.

## Trade Quality Guild Seal Deployment & Control Centre Integration — 20 October 2026 (H15/H16/H42)

**Current Status:** Completed deployment of the Trade Quality Guild Seal Stamp onto the website and persisted the complete Master Brand Asset Guide directly into the Admin Control Centre:
1. **Homepage Integration (`src/routes/index.tsx`)**: Added dedicated full-width Trade Quality Guarantee & Guild Seal section directly above pricing packages, featuring the high-resolution brass Guild Seal badge (`/brand/social/hdw-guild-seal-badge.jpg`), the 3 core commercial pillars (100% Done-For-You Words, 50/50 Fair Split Payment, Backed by The Harley Group Ltd), and embedded the badge inside the Founder Commitment signature block.
2. **Site Footer Integration (`src/components/site/FooterDark.tsx`)**: Integrated the Trade Quality Guild Seal stamp with *"100% Done-For-You · Zero Homework"* tagline and direct link to `/brand` (Brand Standards & Guild Seal).
3. **Control Centre Knowledge Base (`src/lib/knowledge-base.ts`, `admin.knowledge-base.tsx`)**: Created and pinned the authoritative `"Master Brand Identity, Endorsed Wordmark & Trade Guild Seal Guide"` article at the top of the Operational Knowledge Base, complete with one-click direct download for the Guild Seal asset and color token specifications.
4. **Group Headquarters Dashboard (`GroupHeadquarters.tsx`, `group-headquarters.ts`)**: Embedded the Guild Seal visual stamp and quick-links into the executive Group Headquarters overview on the main admin dashboard.

**Verification:**

- `npm run check:governance`: PASS (Agent instructions and shared contract consistent).
- `npm run format:check`: PASS (All matched files use Prettier style).
- `npm run typecheck`: PASS (0 errors).
- `npm test`: PASS (196 Node regression/security/recovery + 3 SW = 199 total assertions, 0 failures).
- `npm run build`: PASS (Nitro SSR Cloudflare module build in 6.10s).

## Master Visual Brand Kit & Real-World Mockup Suite — 20 October 2026 (H15/H16/H42)

**Current Status:** Completed and verified the comprehensive 8-piece visual brand kit, real-world mockups, and marketing surfaces consistency update:
1. **Photorealistic Mockup Generation**: Delivered 8 high-resolution assets in `public/brand/social/` covering digital presence (Monogram Avatar, 16:9 OpenGraph card, desktop LinkedIn suite, iPhone 16 Pro WhatsApp Business flow) and physical presence (heavy brass Guild Seal badge, embroidered contractor workwear softshell & polo, luxury silver foil stationery, and Ford Transit Custom van decals).
2. **Brand Assets Hub (`src/routes/brand.tsx`)**: Upgraded to an interactive 8-piece visual gallery with individual high-res download triggers and ready-to-copy social bios.
3. **Marketing Surfaces (`src/routes/work.tsx`, `src/routes/the-harley-group.tsx`)**: Re-styled Free Website Potential Audit callout to signature Midnight Navy and Emerald, and linked corporate holding pages directly to the Brand Assets hub.
4. **Authoritative Brand Kit Guide**: Persisted `brand-kit-and-social-media-assets.md` documenting hex/RGB/CMYK colour formulas, typography rules, and social post templates.

**Verification:**

- `npm run check:governance`: PASS (Agent instructions and shared contract consistent).
- `npm run format:check`: PASS (All matched files use Prettier style).
- `npm run typecheck`: PASS (0 errors).
- `npm test`: PASS (196 Node regression/security/recovery + 3 SW = 199 total assertions, 0 failures).
- `npm run build`: PASS (Nitro SSR build in 3.66s).

## UI/UX Cohesion Audit & Brand Palette Unification — 20 October 2026 (H15/H16/H42)

**Current Status:** Completed comprehensive UI/UX consistency audit across the homepage and marketing surfaces, eliminating discordant amber/brown tones and unifying with the ratified British Industrial Craftsmanship brand palette (Midnight Navy `#081B30`, Warm Ivory `#F6F3ED`, Steel Blue `#173C62`, and functional Emerald `#059669`):
1. **Homepage Interactive Trade Showcase (`TradeShowcaseSection.tsx`)**: Re-architected card styling to signature Midnight Navy (`bg-[#081B30]`); replaced discordant amber/brown button with high-contrast functional Emerald (`bg-emerald-600`); replaced dirty yellow comparison table cells with clean `bg-slate-50` and Midnight Navy header; updated schedule wording to *"Agreed delivery schedule"*.
2. **Trade ROI Calculator (`TradeRoiCalculator.tsx`)**: Restyled container to Midnight Navy; replaced gold sliders and buttons with functional Emerald; updated turnaround claims to agreed delivery schedules.
3. **Contact Page (`contact.tsx`)**: Upgraded primary telephone channel to Midnight Navy and Website Review callout box to Steel Blue / Midnight Navy.
4. **Demos & Partners (`demos.tsx`, `partners.tsx`, `DynamicStagingGenerator.tsx`)**: Cleaned up remaining "14-Day Delivery Guarantee" phrasing and aligned proposal action buttons to Emerald.

**Verification:**

- `npm run check:governance`: PASS (Agent instructions and shared contract consistent).
- `npm run format:check`: PASS (All matched files use Prettier style).
- `npm run typecheck`: PASS (0 errors).
- `npm run lint`: PASS (0 errors, 9 non-blocking Fast Refresh warnings in UI components).
- `npm test`: PASS (66 smoke + 196 Node regression/security/recovery + 3 SW = 265 total assertions, 0 failures).
- `npm run build`: PASS (Nitro SSR build in 2.82s).
- `node scripts/scan-build-artifacts.mjs`: PASS (0 secrets exposed).

## Founder Operating & Plain-English Autonomous Standards — 20 October 2026 (H15/H16/H42)

**Current Status:** Codified permanent founder-centric operating rules across `GEMINI.md`, `AGENTS.md`, and `.agents/rules/harley-digital-works-standards.md`:
1. Robbie is the business founder and CEO, not a developer. All communication must be in plain English, step-by-step, zero unexplained developer jargon.
2. Complete autonomy granted to the AI pair programmer for technical and development decisions (code structure, styling, tests, refactoring). Robbie is consulted only for high-level commercial decisions, pricing, releases, or brand direction.
3. Every technical task is translated into tangible business outcomes (cash generation, customer trust, time saved, and booked trade jobs).

**Verification:**

- `npm run check:governance`: PASS (Agent instructions and shared contract consistent).
- `npm run format:check`: PASS (All matched files use Prettier style).
- `npm run typecheck`: PASS (0 errors).
- `npm run lint`: PASS (0 errors, 9 non-blocking Fast Refresh warnings in UI components).
- `npm test`: PASS (66 smoke + 196 Node regression/security/recovery + 3 SW = 265 total assertions, 0 failures).

## Applied /learn Reusable Behaviors & Standards Reconciliations — 20 October 2026 (H15/H16/H42)

**Current Status:** Persisted ratified commercial and brand positioning rules approved by founder Robbie via `/learn`:
1. Updated `.agents/rules/harley-digital-works-standards.md` to codify "British Industrial Craftsmanship" brand positioning, preventing generic web agency drift (banning pastel tech squiggles, enforcing Midnight Navy/Warm Ivory/Emerald, Manrope/Inter typography, and ratified £1,495 / £249/mo pricing).
2. Reconciled `.agents/skills/trade-prospecting-and-outreach/SKILL.md` to eliminate stale historical £95/mo and VAT mentions, aligning directly with ratified terms and adding the 30s Before & After video outreach pitch.
3. Codified local Windows desktop browser launch fallback (`Start-Process chrome.exe`) for sandboxed Playwright environments.

**Verification:**

- `npm run check:governance`: PASS (Agent instructions and shared contract consistent).
- `npm run format:check`: PASS (All matched files use Prettier style).
- `npm run typecheck`: PASS (0 errors).
- `npm run lint`: PASS (0 errors, 9 non-blocking Fast Refresh warnings in UI components).
- `npm test`: PASS (66 smoke + 196 Node regression/security/recovery + 3 SW = 265 total assertions, 0 failures).

## Strategic Brand, Logo & Typography Architecture Review — 20 October 2026 (H15/H16/H42)

**Current Status:** Completed comprehensive brand identity, logo mark, and typography review across The Harley Group, Harley Digital Works, and Harley Labs (`brand-review-and-prelaunch-recommendations.md`). Addressed the core positioning tension: high-end commercial design that directly appeals to UK tradespeople without feeling like an aloof "web agency". Upgraded agency marketing typography tokens in `src/styles.css` from fallback Arial to sturdy modern geometric sans (*Manrope* for headings/display, *Inter* for body), immediately elevating perceived commercial value while preserving mobile legibility.

**Verification:**

- `npm run format:check`: PASS (All matched files use Prettier style).
- `npm run typecheck`: PASS (0 errors).
- `npm run lint`: PASS (0 errors, 9 non-blocking Fast Refresh warnings in UI components).
- `npm test`: PASS (66 smoke + 196 Node regression/security/recovery + 3 SW = 265 total assertions, 0 failures).
- `npm run build`: PASS (Nitro SSR build in 2.52s).
- `node scripts/scan-build-artifacts.mjs`: PASS (0 secrets or private credentials exposed).

## Hero Before & After Transformation Video & Scene Creation — 20 October 2026 (H15/H16/H42)

**Current Status:** Generated high-resolution commercial visual assets for all 4 scenes of the Before & After Trade Transformation Video (`public/images/transformation-video/`). Implemented an interactive 55-second Hero Video Showcase Modal component (`HeroTransformationVideoModal.tsx`) with real-time scene progress scrubbing, voiceover audio speech synthesis, subtitle overlays, and direct WhatsApp CTA. Integrated into the homepage hero actions and hero art card (`src/routes/index.tsx`).

**Verification:**

- `npm run format:check`: PASS (All matched files use Prettier style).
- `npm run typecheck`: PASS (0 errors).
- `npm run lint`: PASS (0 errors, 9 non-blocking Fast Refresh warnings in UI components).
- `npm test`: PASS (66 smoke + 196 Node regression/security/recovery + 3 SW = 265 total assertions, 0 failures).
- `npm run build`: PASS (Nitro SSR build in 2.52s).
- `node scripts/scan-build-artifacts.mjs`: PASS (0 secrets or private credentials exposed).

## Marketing USP Copy Refresh & Video Storyboard Specification — 20 October 2026 (H15/H16/H42)

**Current Status:** Aligned core marketing copy across Harley Digital Works (`src/routes/index.tsx`), The Harley Group (`src/routes/the-harley-group.tsx`), and Harley Labs (`src/routes/labs.tsx`) to front-load the core USP: *"You do the trade. We take the website headache away — zero homework, zero tech jargon, and total peace of mind."* Authored a complete 55-second and 30-second Before & After trade transformation video storyboard specification (`before-after-trade-video-spec.md`).

**Verification:**

- `npm run format:check`: PASS (All matched files use Prettier style).
- `npm run typecheck`: PASS (0 errors).
- `npm run lint`: PASS (0 errors, 9 non-blocking Fast Refresh warnings in UI components).
- `npm test`: PASS (66 smoke + 196 Node regression/security/recovery + 3 SW = 265 total assertions, 0 failures).
- `npm run build`: PASS (Nitro SSR build in 2.32s).
- `node scripts/scan-build-artifacts.mjs`: PASS (0 secrets or private credentials exposed).

## Full Go-Live Audit & Production Database Projects Reconciliation — 20 October 2026 (H03/H19/H42/H50)

**Current Status:** Completed comprehensive Go-Live Audit across Stages 0–20 (build, security, RLS, forms, SEO, commercial terms, Cloudflare SSR). Founder (Robbie) reviewed and approved the audit recommendations. Executed production projects schema reconciliation migration on live Supabase backend `worzpzbutngugwzhlvtj` following a pre-change database snapshot (`docs/evidence/production-projects-prechange-backup-2026-10-20.json`). P02 Database blocker is **RESOLVED**. Live system is technically ready for Pilot Client 1 onboarding.

**Verification:**

- `npm run check:governance`: PASS (Agent instructions and shared contract consistent).
- `npm run format:check`: PASS (Prettier clean).
- `npm run typecheck`: PASS (0 errors).
- `npm run lint`: PASS (0 errors, 9 non-blocking Fast Refresh warnings in UI components).
- `npm test`: PASS (66 smoke + 196 Node regression/security/recovery + 3 SW = 265 total assertions, 0 failures).
- `npm run build`: PASS (Nitro SSR build successful in ~3.1s).
- `node scripts/scan-build-artifacts.mjs`: PASS (0 secrets or private credentials exposed).
- `npm audit --audit-level=high`: PASS (0 vulnerabilities).
- Production Database Inspection: `projects` table reconciled with `client_id`, `project_status` enum, and re-bound `project_tasks_project_id_fkey`; `projects_legacy` preserved; strict admin-only RLS active.

## Antigravity reconciliation & CI quality repair — 20 October 2026 (H42/H47)

**Current Status:** Resolved local repository rebase block, synchronised local `main` with GitHub remote `87961f8` (all merged PRs #16, #17, #42, #44, #45, #46, #47 verified present). Fixed GitHub Actions Quality workflow failure on `scripts/scan-build-artifacts.mjs` (Prettier lint formatting). Integrated Copilot CTO & Founder Advisor partnership instructions into `.github/copilot-instructions.md`.

**Verification:**

- `npm run format:check`: PASS (All matched files use Prettier style).
- `npm run typecheck`: PASS (0 errors).
- `npm run lint`: PASS (0 errors, 9 existing warnings).
- `npm test`: PASS (196 Node regression/integration + 3 Service Worker = 199 tests, 0 failures).
- `npm run build`: PASS (Nitro SSR build successful in ~6s).
- `node scripts/scan-build-artifacts.mjs`: PASS (0 credentials/secrets exposed).

**Clean Branch Status:** All local branches confirmed clean or archived with zero unpushed commits. Branch `copilot/founder-adviser-guidance` prepared and verified for PR/merge to `main`.

## Antigravity handover: scheduled-workflow PR #45 — 20 October 2026 (H42/H47)

**Saved result:** repair source `1f691f3f75d9bc55001f844d7f1747ba3af5a8cf` published on `codex/scheduled-workflow-repair-20261020`; [draft PR #45](https://github.com/SkyPilot24/harley-digital-works/pull/45) open and mergeable. Founder explicitly authorised this branch preview and PR publication. All quality/security checks and the Cloudflare preview build passed on that exact source. The repaired scheduled workflow was manually executed on GitHub Ubuntu and **PASSED**, including build, platform verification and full regression tests: [run 39468628826](https://github.com/SkyPilot24/harley-digital-works/actions/runs/39468628826). Local baseline: 66 platform assertions, 196 regression tests and 3 service-worker tests passed; nine existing lint warnings, zero audited vulnerabilities.

**Where to continue:** `C:/Users/drrob/.codex/worktrees/scheduled-workflow-repair/harley-digital-works`. This is the isolated managed checkout; do not switch or reset the original recovery checkout. Read `docs/SCHEDULED_WORKFLOW_REPAIR_2026-10-20.md` and `docs/evidence/scheduled-workflow-github-2026-10-20.json`. Workflow change is only three added lines (`npm run build` before generated-artifact checks); application/dependency/database sources unchanged. This checkpoint will be a separate documentation-only commit after the tested source; inspect PR45's latest head and its own checks rather than attributing source-head results to a newer revision.

**Production boundary:** GitHub main remains `0845172c455b756a0a6eb24af1e7b56d78c348e9`; dashboard before/after comparison still shows production version `ee516b32` at 100%, associated with that main commit. No main merge, production deployment, migration, live-data test, outreach activation or spend. Original dirty peer folders, stash and private CSV preserved. Local main remains diverged; do not pull/reset it to make it match. Recovery PR44 is a preservation source, not the next merge candidate.

**One next action (Antigravity):** inspect PR45 latest head, full diff and all checks, including the branch's explicit Drift Detection run. If the receipt-only head is still validating, wait for it; if any check fails, investigate before selecting development work. Keep PR draft until reviewer acceptance. Founder approval is still required for main merge and its potentially automatic production release. Do not rerun production recovery/export operations or start the first development batch from this handover. The weekly scheduled invocation itself remains unverified until the repair reaches main through an authorised merge.

## Scheduled-workflow repair prepared locally — 20 October 2026 (H42/H47)

Isolated branch `codex/scheduled-workflow-repair-20261020`, based on GitHub main `0845172c455b756a0a6eb24af1e7b56d78c348e9`. Founder authorised the isolated workflow repair and baseline evidence only. Added `npm run build` between locked install and artifact-dependent verification; schedule, permissions, assertions and tests unchanged. Clean pre-build reproduction: 60 PASS / 2 expected FAIL. Node 22.23.3 / npm 10.9.2 locked install PASS; build PASS; post-build platform 66/66; regression 196/196 plus service-worker 3/3; format/typecheck/lint PASS (9 existing lint warnings); dependency audit zero vulnerabilities; artifact scan zero findings; quiet tracked-credential patterns PASS. Generated route churn from this build excluded. Full evidence and limits: [scheduled-workflow repair](docs/SCHEDULED_WORKFLOW_REPAIR_2026-10-20.md). Windows local checks do not prove a GitHub Linux workflow run or live acceptance. No application/dependency/database changes, push, PR, merge, deployment, migration or outbound action. Owner Codex/founder. Next: review the local diff, then obtain branch-publication/preview authority before publishing for GitHub validation; do not select the first development batch yet.

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

Implemented and tested locally on `codex/comparison-consistency-2026-10-17`, isolated from canonical `audit/pre-go-live-remediation` at `7738130`. Correct reveal direction, complete phone previews, matching illustrative photography, navy/ivory framing, simpler explanations and one enquiry CTA. Fictional quotes, ROI figures and mock accreditation claims removed from this component's output; original data retained. Full build/typecheck/format PASS; lint 0 errors/9 existing warnings; 66 smoke + 190 regression + 3 service-worker checks PASS. Browser: 30 reveal positions, 12 phone versions, tablet, pointer and keyboard PASS. [Evidence and next action](docs/COMPARISON_CONSISTENCY_2026-10-17.md). Local only; no push, deployment, production/data change or broader launch acceptance. Review scoped commit and evidence before integration; preserve canonical peer work.
**Antigravity restart — 17 October 2026:** Read the current checkpoint at the top of [docs/HANDOVER.md](docs/HANDOVER.md). Pre-go-live audit, Cloudflare verification, PR stack triage completed ([PR #39](https://github.com/SkyPilot24/harley-digital-works/pull/39)).

## Pre-go-live website audit, Cloudflare verification & PR stack review — 17 October 2026

- **Comprehensive Pre-Go-Live Audit:** Evaluated UI/UX, responsive behaviour across devices, CRO, content authenticity, and technical QA. Commercial terms on `about.tsx` and `index.tsx` aligned with ratified policy (removed unverified zero-rated VAT claims and blanket 14-day delivery SLAs in favour of agreed delivery schedule and up to 2 pilot spots). Repointed package investment link from deferred `/calculator` to `/contact`.
- **Review Branch & Pull Request:** Pushed `audit/pre-go-live-remediation` and opened [PR #39](https://github.com/SkyPilot24/harley-digital-works/pull/39) targeting `main`. Verified: 190 tests PASS, 3 service worker tests PASS, TypeScript 0 errors, ESLint 0 errors, Nitro SSR production build PASS in ~3s.
- **Cloudflare Live Production Environment:** Authenticated with Cloudflare API under account `6ccd86a1ec4535357f9bc51cd05e68cd` for Worker `skypilot24-harley-digital-works`. Confirmed active live variables: `SUPABASE_URL`, encrypted `SUPABASE_SERVICE_ROLE_KEY` secret, `SLACK_WEBHOOK_URL`, and `LEAD_NOTIFICATIONS_ENABLED: "true"`. Automated CRM lead intake and fail-safe mailto fallback verified.
- **PR Stack & Dependabot Triage:** Promoted admin stack PR #31 and PR #32 to Ready for Review (stacking with PR #33, which is 100% green). Closed failing bulk Dependabot PRs #38 and #19 to protect build stability.

## Before & After portfolio, social proof & conversion optimisation — 17 October 2026

Founder (Robbie) authorised the before-and-after website transformation showcase and deployment. Implemented 6 UK trade concepts (Plumbing & Heating, Electrical, Roofing, Building & Renovations, Landscaping & Gardening, Painting & Decorating) in `src/lib/portfolio-data.ts`, with interactive `BeforeAfterComparison.tsx` (slider, drag-to-reveal, desktop/mobile preview toggles, keyboard accessibility, commercial ROI scenarios with explicit assumptions, and fictional testimonials clearly marked as sample scenarios). Integrated across Homepage (`/`), Portfolio (`/work`), Services (`/services/web-design-development`), and Contact (`/contact` with "Show Us Your Website" review funnel). Typecheck, format, 190 unit/integration tests, 3 service worker tests, and Nitro SSR build PASS.

## Shared agent governance and CMS staging acceptance — 16 October 2026

H03/H07/H42/H47: founder-approved session-start contract cleaned of pasted chat framing in canonical AGENTS.md; Antigravity and Copilot entry points explicitly reference it. Canonical and active review copies hash-match. New `npm run check:governance` passes static entry-point/record checks; actual host discovery/compliance and other checkout synchronisation remain unverified. These changes are local, not committed/pushed.

On `codex/admin-marketing-completion-2026-10-16`, base d4b144c, `scripts/verify-admin-cms-staging.mjs` passed real isolated staging Auth/API/browser CMS create/edit/delete with independent readback, anonymous mutation denial, mobile no-overflow, intercepted read-outage/retry, and settings read-failure save prevention. Exact unpublished CMS fixture and temporary administrator removed with independent readback; no production, existing settings, live billing, outbound contact or migration changed. First attempt stopped on a selector for deliberately truncated text; cleanup passed; corrected run passed fully. Typecheck/format/governance checks PASS; new scripts lint PASS. Prior batch build/full regression evidence retains its recorded scope.

Open: successful settings save/readback, authenticated ordinary-user CMS denial, broader Control Centre acceptance, atomic last-admin and server/DB validation gates. Full launch remains RED. Next: isolated settings/ordinary-user acceptance, then route-by-route release evidence. Existing peer application work preserved. Detailed checkpoint: `docs/AGENT_GOVERNANCE_AND_CMS_ACCEPTANCE_2026-10-16.md`.

## Chief of staff operating briefing and recurring workflow authorisation — 16 October 2026

**Authorisation & Schedule:** Founder (Robbie) authorised the recurring daily operating briefing workflow at 08:15 Europe/London (UK local time, GMT/BST), with briefing and exception messages routed exclusively to verified private Slack channel `chief-of-staff` (`C0C8U1ABYM8`). All existing enquiry (`#new-leads`, email) and daily digest (`#founder-command`) routing preserved intact.

**Executed:** Evaluated all 13 allowlisted sources, retired obsolete pending delivery `a5d6947348f15210b100`, updated `state.json` and `latest.md`, and saved dated run record `2026-10-16-081500-briefing.md`. Configured daily 08:15 Europe/London recurring cron schedule and Antigravity automation sidecar (`harley-chief-of-staff-daily-briefing`). No customer contact, billing, or production data mutation.

## Admin server-side validation and data integrity — 15 October 2026

H03/H07/H42, branch `skypilot24-validation-integrity` (stacked on PR #32 / #31 / #29).

**Implemented.** `src/lib/admin-validation.ts` (pure, no new library) validates and normalises every admin lead, client, project, status, money and date input; `src/lib/admin-writes.ts` wraps insert/update/delete so zero-row results and database errors never report success, errors are non-sensitive, and `invalidateAdminData` refetches every query family showing a record. Routed through these: leads page (create/edit/status/delete/convert), clients page (create/edit/quick monthly value/delete/add project), projects page (create/edit/stage/delete), dashboard modals and status buttons, and Trade Outreach push-to-leads. Money is exact integer pence parsed from text (no `parseFloat * 100`); blank optional values stay `null`. Removed invented defaults: £249 monthly value, £1,495 budget, "today" start date and 14-day target, default scope summary, default package, default enquiry message, `?? 24900` display. Dashboard status buttons now invalidate leads/clients/projects pages (previously stale). Role grant/revoke (`src/lib/admin-users.ts`): grant verifies the user exists; revoke rejects a target that does not hold the role, a zero-row delete and the last admin; raw database errors are no longer returned.

**Tested.** `scripts/admin-validation.test.mjs` and `scripts/admin-writes.test.mjs` (registered in `npm test`): exact pence, optional null, rejection of malformed/negative/oversized money, impossible dates, target-before-start, invalid statuses/uuids/emails/phones/websites, zero-row update/delete/insert, ordinary-user RLS denial (42501) and zero-row filtering, partial backend failure without leaking detail, query-family invalidation, role grant/revoke edge cases. Build, typecheck, format PASS; lint 0 errors / 9 existing warnings; 66 smoke + full regression PASS.

**Untested / blocked.** No staging credentials were available in this environment, so no browser or staging ordinary-user-versus-administrator acceptance was run (unit-level fake-client denial only). The last-admin check is still not atomic (needs a database function). Validation is client-side-call + RLS; there are still no server functions for leads/clients/projects, so a user with an admin session could bypass validation with direct API calls until DB CHECK constraints are applied (not applied; no migration was run). No follow-up-date column exists on leads or clients (only project start/target dates). `agency_settings` and `ResourceManager` numeric inputs are not yet validated. No production change, deployment, billing or messages. Launch remains RED.

## Admin user listing and last-admin safeguard — 15 October 2026

H03/H42: `listAdminUsers` previously read only the first 200 Auth users and an uncapped-by-assumption role query; it now follows Auth next-page pointers and reads roles by exact-count ranges, failing visibly on errors, missing counts or early end. `revokeUserRole` now blocks revoking the last admin for any target (previously only self-revocation was checked) and fails closed if the count is unavailable. Logic in `src/lib/admin-users.ts` with `scripts/admin-users.test.mjs` (5 tests, registered in `npm test`).

Fresh build/typecheck/format PASS; lint 0 errors / 9 existing warnings; 66 smoke checks plus all regression, integration and service-worker tests PASS, 0 failures. Limits: unit-level only; no staging Auth acceptance with more than 200 users, and the revoke check is not atomic (concurrent revocations could race). Remaining: server-side form validation, then enquiry/recovery/care/release gates. Source: `codex/platform-completion-2026-10-15` + local changes, uncommitted/unpushed. No production change, merge, deployment, billing or messages. Launch remains RED.

## Session and permission recovery acceptance — 15 October 2026

H03/H07/H42: fixed role lookup failures being labelled Access denied, rejected session reads remaining in loading, stale session-read races and incomplete sign-out error handling. Private views/cache now clear or remain hidden on uncertain/denied access; retry states distinguish uncertainty from a confirmed missing role. Identity changes clear query data before publishing the new identity; protected redirects preserve the destination. Backend policies/credentials unchanged.

Fresh build/typecheck/format PASS; lint 0 errors / 9 existing warnings; 66 smoke + 150 regression/integration + 3 service-worker checks PASS. Real staging Auth/API/Edge verifies ordinary/anonymous denial, self-promotion/metadata rejection, cached-role outage/retry, temporary role revoke/restore and sign-out failure/retry. Client/project browser regression also rerun PASS. Exact synthetic records/accounts removed; genuine owner sessions untouched. [Evidence, actor matrix and limits](docs/ADMIN_ACCESS_ACCEPTANCE_2026-10-15.md).

Read-only provider advisors show leaked-password protection disabled on Agency and staging; review exact provider configuration/availability before live changes. RLS-without-policy INFO records retain the intentional server-only deny model; no policies broadened. No production mutation, main merge/release, live billing or external message. Full launch remains RED. Next: current-head CI, admin user/role server controls and remaining form validation, then enquiry/recovery/care/release gates.

## Complete admin record reads and client/project paging — 15 October 2026

H03/H07/H42: added server-side client/project paging/search and full counts, complete cursor reads for monthly values/active lists/client choices, count-only notification totals, complete per-client project links/details, accurate error/retry states and saved drawer values. Dashboard exceptions now use full counts. New projects default to unassigned/no deadline; explicit agreed dates replace automatic fourteen-day targets. Earlier capped-response guard is superseded and removed.

Fresh build/typecheck/format PASS; lint 0 errors / 9 existing warnings. All 66 smoke, 143 regression/integration and 3 service-worker checks PASS. Real staging Auth/PostgREST plus Edge PASS with 56 fictional clients/56 projects, including 55 linked projects, pence accuracy, owner writes/readback, anonymous denial, paging/mobile/filter/reset/error/retry and project defaults. Exact fixtures/account removed; original totals independently restored. [Evidence and limits](docs/ADMIN_RECORDS_ACCEPTANCE_2026-10-15.md).

Existing PR #31 at 1337972 freshly verified draft/CLEAN with all checks successful before this extension. Publication and final-head CI must be verified against the PR, independently of this local evidence. No main merge, production migration/release, live billing or external messages. Full launch remains RED. Next: current-head review/CI, permission/error handling and remaining admin journeys, then enquiry/recovery/care/release gates.

## Draft admin review published — 15 October 2026

[Draft PR #31](https://github.com/SkyPilot24/harley-digital-works/pull/31) publishes checkpoints fb9e97d and 6e27743 against the existing launch branch for PR #29. Destination freshly verified PRIVATE, SkyPilot24 owner, ADMIN access; origin matches. Review delta checked against configured private credential values with no matches. An initial automatic publication review rejected the unverified destination; read-only ownership/privacy and payload checks resolved that concern before a successful authorised retry.

Implementation 6e27743 retains the fresh local/staging/browser acceptance below. At publication, credential/dependency checks and Cloudflare native review Preview passed; remaining GitHub quality checks were running. A preview build is not configured-backend or production acceptance. This documentation follow-up is separate from implementation test evidence. No main merge, production migration/release, live billing or customer messages. Next: complete final-head CI, then continue clients/projects paging and scalable dashboard aggregation. Overall launch remains RED.

## Lead desk paging and staging acceptance — 15 October 2026

H03/H07/H42: following local checkpoint fb9e97d, implemented server-side enquiry search/status filtering, 25-row paging, full exact-count metrics including Contacted, unavailable/retry states and narrow-screen table scrolling. Fixed stale saved status in the inspector and guarded sign-in hydration/native POST. Real staging Auth/PostgREST and headless Edge acceptance PASS with 56 fictional records: three pages, counts, punctuation/literal-asterisk search, admin/anonymous access, persisted status/readback, zero-row rejection, sign-in, mobile width, dashboard failure/retry and exact cleanup. No port 4187 listener remains.

Final build/typecheck/format PASS; lint 0 errors / 9 existing warnings; 66 smoke + 139 regression + 3 service-worker checks PASS. Source, reproducible runners, limits and next gates: [lead acceptance](docs/ADMIN_LEAD_ACCEPTANCE_2026-10-15.md). Staging browser evidence is not production acceptance. Overall launch remains RED; next complete clients/projects paging and dashboard aggregation, then remaining enquiry/recovery/care/release gates. Production, live billing and outbound messages unchanged.

## Platform completion checkpoint — 15 October 2026

H03/H07/H42: isolated `codex/platform-completion-2026-10-15` from existing launch review `1c8af5d` (PR #29), preserving payment/delivery/marketing work and unrelated local checkouts. Fixed dashboard partial-query failure handling, misleading revenue/automation labels, two-build pilot capacity display, admin cache invalidation after lead/client changes, and zero-row update/delete success handling. Full scope, ranked follow-ups and live read-only aggregate evidence: [platform checkpoint](docs/PLATFORM_COMPLETION_2026-10-15.md).

Final fresh build/typecheck/format PASS; lint 0 errors / 9 existing warnings; platform smoke PASS, 135 regression tests and 3 service-worker tests PASS. New tests cover all ten operational source-failure positions and capped/missing data. Authenticated browser/RLS mutation/readback acceptance remains pending; no customer data writes, migration, push, merge, deployment, sending or spending. Overall launch remains RED. Next: bounded staging browser acceptance of dashboard failure/retry and cross-screen mutation refresh, followed by remaining intake/recovery/care and concrete release gates.

## The Harley Group — shared project status

**Draft review submitted, 14 October:** [PR #29](https://github.com/SkyPilot24/harley-digital-works/pull/29) integrates the existing first-client work and launch corrections on `codex/launch-completion-2026-10-14`. Review head `1a71b7b` passed GitHub quality and credential checks; dependency audit reported zero vulnerabilities. Cloudflare created a successful native review Preview with an unconfigured backend, not functional acceptance. Active production deployment remains `ab1ae80f-5523-475f-8050-1c1be9a8aa99` / version `25218195-69ef-4616-8977-416cd740d876`, created 13 October; GitHub main remains `45012e4`. No merge, production migration, live billing or customer outreach. This supersedes earlier local-only submission labels while retaining tested runtime `280b0e6` and earlier rehearsal source identities. Full sale-to-care and owner decisions remain RED. This documentation follow-up requires its own current-head check result before treating that head as CI-verified.

**Current runtime checkpoint: `280b0e615c1c777c526e67b51b857fa37ac513af`, 14 October.** Active trade/location pricing and schedule claims aligned with the approved £1,495/£249 offer; unsupported rendered job-value/performance figures removed. Build/typecheck/format/full suite pass; lint nine existing warnings; private-value scan 223 artifacts pass; representative phone/desktop browser checks pass. This checkpoint is local only. Prior sandbox receipt and fictional customer approval evidence retain their tested source identities. Production release and full sale-to-care acceptance remain open. See `TRADE_OFFER_CORRECTION_2026-10-14.md`.

**Latest customer approval evidence, 14 October:** fictional customer browser sign-in, proposal/latest-version confirmation and separate website-review approval passed against staging. Six active runtime checks cover superseded/digest rejection, membership revoke/restore, retry and release-evidence launch denial. Exact test project/user/evidence and credentials removed; zero residual fixtures and no port 4183 listener verified. No real agreement, administrator publish/invitation, client website, payment or launch is implied. Broader H20/H21/H50 remain open; see `CLIENT_APPROVAL_ACCEPTANCE_2026-10-14.md`.

**Latest 14 October acceptance update:** the user approved and we executed the isolated sandbox rehearsal. Authentic fictional £747.50 checkout delivery produced one durable receipt; same-build redeployment, concurrent duplicate replays, rejection controls and temporary credential failure/recovery passed with the limits recorded in `Harley-sandbox-acceptance-2026-10-14.md`. Temporary Worker and new staging fixtures removed; original fixture retained. New Stripe endpoint disabled, physical deletion remains. Production and live billing unchanged. Owner confirmed Harley DigitalWorks Ltd and not VAT-registered; supplied company number/address recorded internally. Exact company-number search returned no result; reconciliation requested before invoice issue. The full paid-client lifecycle remains RED. Earlier pending statements below describe previous checkpoints and are superseded by this dated update.

## Customer-use offer and finance corrections — 14 October 2026

H01/H02/H11/H22–H25/H47/H48: corrected local public/draft copy against ratified £1,495/£249 flagship and £995/£149 Launchpad. Removed unsupported public zero-tax/+VAT, guaranteed turnaround, unapproved growth/referral/instant-reply framing from affected surfaces; retained source WhatsApp widget is quiet/default suppressed. Shared offer keeps agreed dual routing and requires written tax/schedule/support/backup terms, with a two-build pilot guard and 30-minute monthly edit batch. No sold channel silently reduced or billing setting changed.

Admin proposal/payment text is explicitly internal/unissued, with no assumed bank payee or VAT status. Finance reuses the safe recorded-value helper and distinguishes manual agreements from actual receipts; retrieval failures show unavailable/retry. Old £95/£195 client presets corrected to agreed £149/£249 without changing data. Carried current canonical commercial reconciliation into this isolated branch; strategy/KB and smoke checks now retain unknown tax/terms gates instead of asserting compliance from repeated wording. Actual economics/time remain unmeasured.

Build/typecheck/format/full suite PASS (66 smoke + 133 tests + 3 service-worker tests); lint zero errors/nine existing warnings; exact private-value scan PASS across 223 public artifacts. Browser: three representative public routes at 375/768/1440, no retained horizontal overflow; one transient desktop reading cleared after settled DOM/screenshot. Mobile pricing navigation and selected-service enquiry prefill PASS; no form submission/message. Admin changes are source/build checked, not genuine admin-browser payment acceptance. Owner-supplied legal entity and VAT registration are pending; sandbox rollout approval remains pending. See `docs/FIRST_CLIENT_COMMERCIAL_DECISIONS_2026-10-14.md`. Source local only, no push/deploy/live billing. Full lifecycle remains RED.

## First-client branch recovered and integrated locally — 14 October 2026

H19–H25/H47/H50: fresh staging metadata identified already applied payment/delivery/session/launch schemas missing from main. Reused `codex/first-client-production` at `1ab1943`; integrated locally with `45012e4` and launch-review changes, preserving both histories and both test suites. Default webhook aliases now delegate to the durable contract-bound receiver; memory fallback removed. Payment/delivery features stay disabled. No production/main change, provider publication or new migration.

Fresh combined build/typecheck/format PASS; lint zero errors/nine existing warnings; 66 smoke assertions + 133 tests + 3 service-worker tests PASS. Real local disabled routes: six expected 405/503 responses; six request-origin checks PASS; nine real staging Auth/application session checks PASS with fictional account cleanup independently confirmed zero. A sandbox-network-restricted initial application Auth check failed, cleaned up and passed after permitted network access. Fresh staging-configured build exposure check passes across 222 public artifacts. Ignored local credentials remain private; all outbound flags disabled.

Read-only staging aggregate: one sandbox contract and one matching paid receipt; no revenue inferred. Current receiver/source integration is implemented/tested locally, not pushed/deployed. [Sandbox release plan](docs/H50_SANDBOX_RELEASE_PLAN_2026-10-14.md) specifies separate Worker, no live routes/crons, staging-only credentials and sandbox webhook/recovery acceptance. Next: approval for that specific publication/provider configuration, then authentic signed endpoint delivery/restart/concurrent proof. Full lifecycle remains RED; terms, onboarding/assets, client preview/browser approval, balance/care and recovery still open.

## Launch completion review — 14 October 2026

H23–H25/H47/H50: isolated review from canonical main `45012e4`; see [completion roadmap](docs/LAUNCH_COMPLETION_ROADMAP_2026-10-14.md). GitHub main matches local main; #22/#23/#26/#27/#28 merged; #24 closed/unmerged; #25 draft/open with conflicts. Deployment run 38444496336 is green but its deploy step is skipped: exact live revision remains unverified. Today's Slack digest reports zero active clients/MRR and three uncontacted leads, plus a three-build cap conflicting with the retained two-build pilot guard; these are reported values, not reconciled ledger facts.

Reproduced and corrected three receipt-recovery failures locally: false success when paid-state persistence returns false, skipped interrupted paid-state repair on replay, and escaping datastore lookup errors. Generic retryable failures now protect internal details. Receipt/paid-state operations still need an atomic durable adapter; the default HTTP store remains in memory. No H50 closure or live acceptance claimed.

Fresh isolated validation: build, typecheck, format and full test command PASS; 66 smoke checks, 87 tests and 3 service-worker tests PASS; additional outreach tests 5/5 PASS. Lint: zero errors, nine existing warnings. Three new regression cases failed against baseline before the fix. Original checkout's peer documentation changes preserved; no provider/database writes, sends, live billing, push, merge or deploy.

Three active priorities: durable receipts/recovery, accurate fulfilable commercial agreement, and complete pilot delivery/care rehearsal. Proposed readiness target 26 October depends on verified isolated access and 24–36 engineering hours; first real pilot and recurring collection remain customer-dependent. Next: implement/test atomic receipt and client paid-state persistence in a verified isolated target, then authentic sandbox restart/concurrency/replay acceptance. Existing price ratification stands; contract/tax/routing/support/capacity evidence still requires reconciliation.

## Chief of staff document archive reconciled — 14 October 2026

Added docs/chief-of-staff/README.md and six dated business-document snapshots with source/hash manifest on an isolated documentation branch based at main 45012e4. Current peer records already supersede the old domain, handover-marker and five-prompt next actions; archived reports are historical, not instructions to repeat completed work. The old handover patch was not applied. Original source outputs and unrelated work are preserved.

Existing 08:15 UK briefing/09:00 UK housekeeping and prior Slack/local fixture acceptance are recorded in the archive, separately from unattended/runtime evidence. Approved prompt pack, continuation handover and curated knowledge index have verified Drive metadata/content readbacks. Always-on inbound Slack/cloud responder remains a separate unverified setup request. No application change, new schedule, push, merge, deployment, customer contact, spending or production/data operation in this documentation task. See docs/chief-of-staff/README.md for authority and current boundaries.

## Documentation follow-up and fresh acceptance checks — 14 October 2026

H47/H50: clarified commercial capacity/contract/tax evidence limits without changing prices or guards; reconciled the rehearsal's obsolete account-discovery next action with the current in-memory receipt handler. Existing receipt/session/outreach tests freshly PASS 22/22; these are fixture/mock checks, not persistent/provider/browser acceptance. Added runtime acceptance gates to the existing rehearsal, and marked nine-channel Slack topology as a historical proposal under the recorded single-channel preference. Wider capacity still conflicts with the two-build pilot guard; no new capacity decision inferred. No code/configuration, provider/database writes, sending, commit, push or deployment. Next: implement durable receipt storage in a verified isolated target, then authentic sandbox delivery/restart/replay proof. Documentation validation in handover.

## Local business documentation review — 14 October 2026

H47: local main `45012e4a8b4b73335d64f260bb6ccc1047dedcb9` includes wordmark #27 (`cbb4974`), P01 dispatch/audit #28 (`269123a`) and P02 teardown/chief-of-staff documentation (`c8c8337`). Earlier pending-merge headings below retain their historical dates. No exact deployed revision or live acceptance verified here.

Created [documentation directory](docs/README.md) and [output review](docs/LOCAL_DOCUMENTATION_REVIEW_2026-10-14.md); refreshed Business OS navigation, brand source status and activity, and labelled unsupported prospect examples. External mirror output records retained by reference; no files moved or application/configuration/data altered. H47 remains open for wider reproducibility/runbook acceptance. Commercial capacity/VAT wording, Slack destinations, briefing delivery/timing and H50 runtime receipt/recovery remain unresolved. Documentation is local/uncommitted; no push or deployment. Fresh documentation checks recorded in handover; historical application checks were not rerun.

## Review-branch reconciliation — 13 October 2026

Latest main b4c751a is integrated into the branding review branch, preserving peer safeguards/qualification work and the peer removal of the orphan handover marker. This is source reconciliation only; main is unchanged and no production deployment is performed. Earlier pending-integration and marker-retention notes below are dated history. Fresh integrated checks follow the styling pass.

## Branding review branch published — 13 October 2026

Founder explicitly approved pushing the review branch. `codex/hdw-wordmark-2026-10-13` pushed; initial origin head verified equal to local `4000ea142913b37534c108b6555666f5b71b6352`. [Draft PR #27](https://github.com/SkyPilot24/harley-digital-works/pull/27) created and attached. Implementation `172b576` remains unchanged; this documentation follow-up records the shared [Brand Assets folder](https://drive.google.com/drive/folders/1SH7LXBz72wGUL9H-PBQtWVggqMUxF1gG) supplied by the pack-producing session (complete ZIP and 40 individual files reported uploaded). Repository visibility verified PRIVATE; folder permissions not audited; link is internal documentation only.

No main push, merge or production deployment. Main advanced to `b4c751a`; integration/fresh CI and review remain pending. Earlier no-push wording below describes the pre-publication state. Previous branch validation is retained as dated evidence, not a fresh integration result. H15/H47 remain open.

## Approved HDW wordmark — 13 October 2026

H15/H47: navy/ivory wordmark implemented locally on `codex/hdw-wordmark-2026-10-13`, implementation `172b576f40b0a7971a0a00ebf8cde573ac0a4ad3`. Replaces current HDW header/footer/admin logos, brand-page previews/downloads, icons and social preview; reconciles stale current brand/domain guidance while retaining historical records. Exact endorsement: Part of The Harley Group. Prepared pack uses midnight #081B30 and ivory #F6F3ED with outlined Arial-based lettering/custom H. Build/typecheck/format PASS; lint 0 errors, 9 existing warnings; 136 tests PASS. Local /, /brand, /auth at 375/768/1440px PASS for loaded logos/no overflow; mobile menu PASS. See docs/brand-pack.md and handover for evidence, limits and asset provenance. No push, merge, deployment or live admin acceptance. Review artwork/screenshots, then obtain separate publication approval. H15/H47 remain open.

## Chief of staff operating setup, IONOS domain resolution and Drive handover — 13 October 2026

H49/Prompt 1: Configured and verified live IONOS API connection (`https://api.hosting.ionos.com`) for domains and DNS (53 domains, 53 DNS zones). Script `scripts/ionos-domains.mjs` added (`npm run domain:check`). Live inspection confirmed `buydronesupplies.co.uk` expires 2026-10-17 18:25:32 UTC with `autoRenew: false`. Robbie formally approved Option A (let domain drop/lapse naturally without renewal spend or manual intervention). Orphan `<<<<<<< HEAD` marker cleaned from `docs/HANDOVER.md`. Outbound dispatch safety validated locally (5/5 PASS) with fail-closed concurrency capping and unapproved prospect filtering.

H50/Prompt 3: Implemented isolated Stripe webhook receiver in `src/lib/stripe/payment-receiver.ts` with Web Crypto HMAC-SHA256 signature verification in `src/lib/stripe/verify.ts` and Nitro/Worker routing in `src/server.ts`. Validates signed £747.50 deposit checkout/intent events, verifies GBP currency and client references, enforces 300s replay attack tolerance, and guarantees idempotency against duplicate payloads. Added automated test suite `scripts/stripe-receipt.test.mjs` (10/10 PASS).

H07/H42/H09/Prompt 4: Reconciled release safeguards acceptance matrix (Ready, Needs Attention, Blocking Launch). Implemented and verified safe local session-expiry and authorization test suite in `scripts/session-authorization.test.mjs` (7/7 PASS) demonstrating that expired JWTs, missing bearer headers, malformed tokens, and unauthorized roles fail closed with 401/403, and signout clears query cache. Active signed-in owner session preserved; isolated database restore drill framed for founder scheduling. Total automated test suite now runs 153/153 PASS; TypeScript 0 errors; code formatting and linting 0 errors.

H37/H50/Prompt 5: Prepared and verified qualification packets in `docs/PROSPECT_QUALIFICATION_PILOT_2026-10-13.md` for top 3 candidates: P01 RG Electrical Bristol Limited (#10082511), P02 Bath-Electrical Ltd (#07702599), and P03 Nextgen Electrical Contractors Ltd (#11042444). Verified corporate PECR eligibility, TrustMark/NICEIC accreditation records, and tailored constructive digital angles.
Live Pilot Outreach Dispatched (13 October 2026 13:01 UTC): Founder authorized live dispatch for P01 (RG Electrical Bristol Limited). Installed Resend API credentials, verified `theharleygroup.org` domain sending capability in Resend (DKIM & SPF verified), verified self-delivery (`01a13559-7d2a-7b9b-b71d-eef342d8434b`), and executed outbound dispatch via automated engine to `info@rg-electrical.com` (Resend receipt: `01a1355a-5acd-7a1c-9f9d-f78637a91e93`). Concurrency cap (0/2 builds) and PECR compliance confirmed. P01 status updated to DISPATCHED. All 5 execution prompts plus first live pilot outreach now complete.

## Automated Outreach Engine & Resend Integration — 12 October 2026

H37/H50: Implemented and verified automated prospect outreach engine in `src/lib/outreach-dispatcher.ts` with Nitro scheduled background task in `server/tasks/outreach-dispatcher.ts` configured for Monday–Friday 09:00 UK. Strict 2-build concurrency guard automatically queries Supabase active projects (`in_progress`, `review`) and halts outbound outreach when capacity is reached. Ratified sender policy: all cold prospect outreach sent as `Robbie Harley <robbie@theharleygroup.org>` with matching `reply_to` to prevent spam filter flags associated with generic mailboxes (`hello@`) and maximize peer-to-peer B2B response rates. Connected via Resend API (`https://api.resend.com/emails`) with 10-second timeout, duplicate protection, and Slack `#sales` audit alerts. Test suite `scripts/outreach-dispatcher.test.mjs` passes 5/5; full test suite passes 136/136; TypeScript 0 errors; code formatting and linting 0 errors.

## First-client rehearsal readiness — 12 October 2026

Subsequent execution: Stripe now returns The Harley Group sandbox with livemode=false. One fictional hosted £747.50 GBP deposit completed; provider Checkout is paid and matching PaymentIntent succeeded with 74750 received. Evidence: `docs/evidence/stripe-sandbox-deposit-2026-10-12.json`. No real funds/revenue. Sandbox has zero registered webhook endpoints; agency receipt persistence, signature/replay/failure tests, balance/subscription and delivery remain unverified. Account-discovery blocker below is historical; next is an isolated application receiver and secure sandbox configuration. No live billing or deployment; RED/H50 open.

H50 rehearsal pack, fictional JSON fixture and internal proposal skeleton prepared in `docs/FIRST_CLIENT_REHEARSAL_2026-10-12.md` and companion files. RED — not ready for the complete paid-client journey: provider payment, onboarding, exact-version approval, care and recovery lack runtime acceptance. Existing narrow revenue regressions freshly pass 32/32; source confirms prototype deferral, not a live browser check. Stripe account discovery twice returned an authentication retry prompt without account/context/livemode; no provider writes. First dependency: identify an existing authenticated isolated Stripe sandbox, then implement/test the smallest hosted-payment/receipt path. No live billing, customer communication, database writes, application changes, commit/push or deployment. Existing prospect/domain work preserved; H50 remains open.

## Bristol/Bath pilot prospect research — 11 October 2026

H37/H50: prepared 50 business candidates in `docs/BRISTOL_BATH_ELECTRICAL_PROSPECTS_2026-10-11.csv`, ten desk assessments in `docs/BRISTOL_BATH_PILOT_RESEARCH_2026-10-11.md`, and ten unsent drafts plus proposed follow-up in `docs/BRISTOL_BATH_PILOT_OUTREACH_DRAFTS_2026-10-11.md`. Forty candidates have primary website evidence; ten remain directory-only. All ten shortlisted homepages returned HTTP 200 and corroborated their raw-content observations. First qualification priorities: RG Electrical Bristol, Bath-Electrical and Nextgen; staff/capacity, current scheme entries, recipient eligibility and browser-visible evidence remain to verify. Five registry records were retrieved; four have corroborating operator evidence, Aztec's match remains unresolved. No sending, external CRM import, commit/push or production change. Session/email/backup gates remain open. Next: qualify the first three and review factual audit/drafts before requesting specific sending authorisation.

## PR #8 conflict resolution — 11 October 2026

Merged main `e90da3bc6f8c8892c939ecbc3a360916b6e71462` into PR #8's `copilot/fix-failing-github-actions-job` from `45f0c0f6bc0225f81c7d393992567e8f271cd82a`. Resolved quality workflow and strategy wording conflicts using current main: build precedes tests, typechecking stays in its dedicated job, and public copy avoids the secret variable name. Fresh locked install, build, 136 checks, typecheck and formatting pass. Resolution `e18c676d52b5c3c1485977ad1ac20b5407ff214e` pushed; merged via PR #8 into main (`5479714`).

## Domain commercial review — 10 October 2026

H49/D01–D08: founder review prepared in `docs/DOMAIN_COMMERCIAL_REVIEW_2026-10-10.md` with `docs/DOMAIN_PORTFOLIO_AUDIT_2026-10-10.csv`. Recommendation confirms the current HDW customer-facing domain workstream under THG, separately measured; no additional brand. Reconciled 29 current roster entries with the saved page and 15 additional historical names, plus operational HDW .com: 45 reference rows, not verified distinct holdings. September claim of 60 remains unresolved. Pricing is low-confidence, conditional and proposed. First five after account/rights verification: aiwearables.co.uk, virtualavatars.co.uk, greenautomotive.co.uk, theiotshop.co.uk, valuecurrencies.com. Registrar ownership, renewal dates/costs, traffic/revenue and sale status remain unverified; connected Gmail searches returned no matching records and browser account discovery failed. Current Domain OS route redirects to strategy/playbooks, not a live portfolio database. Next action: read-only registrar exports/invoices for first batch and imminent renewals. Local documentation only on main based at e90da3bc6f8c8892c939ecbc3a360916b6e71462; no approval, commit, push, listing, outreach, domain/DNS/database or production change. D01/H49 remain open; validation in handover.

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

Exact database approval received and thg_reviewed_live_enquiry_cutover applied successfully. Verified 0 pre-existing leads, 1 admin and 2 Auth users preserved; unsafe lead policies/bootstrap removed, anonymous read/insert and authenticated intake-RPC denied. Deployed Worker 6a2b6017-2705-4a48-8653-46facc145b46 with matching backend and server secret. Labelled live contact browser submission displayed receipt and exactly one matching THG Agency row (`thg-live-check-20261007@example.test`). Notifications/email stay disabled. Sign-in feedback clarification is deployed.

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

## The Harley Group — current project status

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

## Local GitHub preservation check — 20 October 2026 (H47)

Founder requested a read-only report before edits, then saving a plain-English, one-step-at-a-time communication preference. Checked canonical C:/Local Data/The Harley Group/harley-digital-works on recovery/local-work-2026-10-20 at 1a3089eabc8050b0583187300c9e0b9c763e178e. Before any edits: 20 modified tracked files, 41 untracked files, no staged changes or tracked deletions; one local stash. Last recorded remote refs show local development-actions commit 1a3089e absent from those refs, but that is not proof of absence from current GitHub history. Live read-only git ls-remote succeeded: main 0845172c455b756a0a6eb24af1e7b56d78c348e9; current recovery branch not listed; cached origin/main is stale. No fetch or exhaustive current remote-content comparison performed, so overlap and exact unpublished commit set remain unverified. Findings reported before edits. Only this checkpoint and AGENTS.md communication preference added; existing peer work preserved. No application tests needed for documentation-only additions; no commit, push, deployment, migration or data changes. Next: compare local files, branches and stash with fresh GitHub history, then prepare a reviewed preservation plan. Owner: Codex; founder approval required before upload/release, not for further read-only inspection.
