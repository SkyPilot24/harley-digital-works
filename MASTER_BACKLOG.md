# Master delivery backlog

## Launch-critical execution overlay — 14 October 2026

See [dated completion roadmap](docs/LAUNCH_COMPLETION_ROADMAP_2026-10-14.md) for evidence, existing H01–H50/D01–D08 coverage, suggested owners, dependencies, conditional dates and revenue gates. Individual dated task bodies below are preserved; newer source/provider evidence takes precedence over obsolete open/pending wording. Do not infer an overall completion percentage.

- H23–H25/H50: three payment partial-write/replay/error failures reproduced and fixed in an isolated review copy; fresh build/typecheck/format/full tests PASS; 66 smoke + 87 tests + 3 service-worker checks, plus 5 outreach checks. Default HTTP receipt storage remains in-memory, so durable atomic persistence/authentic provider/restart/concurrent acceptance is still blocking. No migration or production change made.
- H03/H41/H47: main `45012e4` verified local/remote; #22/#23/#26/#27/#28 merged. #24 closed without merge; #25 draft/open/non-mergeable. Latest successful Actions deployment run skips its deploy step; reconcile provider revision before claiming publication.
- H01/H02/H10/H32/H48: approved prices retained; customer-use tax/contract/refund/routing/backups/support/capacity evidence remains open. Keep the two-build pilot guard pending decision; today's digest displays three.
- H19–H25/H43–H46/H50: complete one protected agreement/onboarding/approval/balance/care/recovery rehearsal, then one real paid pilot and recurring collection. Source/unit checks alone do not pass runtime gates.
- H37: P01 authorised send recorded; three digest leads need CRM/inbox reconciliation. P02/P03 and expanded outreach require their applicable explicit sending authority. No new messages sent by this review.
- H49/D01–D08/L01: independent domain evidence/renewal exceptions and optional Labs/product work do not block website-pilot readiness. Preserve unfinished prototypes behind existing deferral gates.

No blanket task closure, source rollout or permission expansion. Original checkout's unrelated changes remain untouched.

## Current execution overlay - 7 October 2026

This evidence/status overlay supersedes stale gap statements in the preserved historical task definitions. It does not create duplicate tasks or mark unverified work complete. Read PROJECT_STATUS.md for exact source and release evidence.

| Existing task   | Current evidence and next acceptance                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| H01             | **RATIFIED BY FOUNDER**: Managed Revenue Engine (£1,495 setup + £249/mo care, with £995/£149 Launchpad and £2,495/£399 Market Leader tiers), unit economics model, and proposal automation rules approved by Robbie on 7 October 2026. Documented in [`docs/COMMERCIAL_OFFER_MANAGED.md`](docs/COMMERCIAL_OFFER_MANAGED.md).                                                                                                                                                                                                                                                                        |
| H02             | **RATIFIED BY FOUNDER**: Business identity (The Harley Group / Harley Digital Works), zero VAT charging rule (below £90k threshold), UK-wide remote studio with Bristol/Bath electrical contractor pilot, and 2-build concurrency cap approved by Robbie on 7 October 2026. Documented in [`docs/COMMERCIAL_OFFER_MANAGED.md`](docs/COMMERCIAL_OFFER_MANAGED.md).                                                                                                                                                                                                                                   |
| H07/H08/H09/H42 | **ACCEPTED LIVE & EXPANDED**: Live secure intake and genuine owner retrieval accepted on THG Agency (`worzpzbutngugwzhlvtj`). Both-brand fields verified; minute Slack outbox delivery accepted (#all-the-harley-group); hourly attempt retention scheduled in Nitro (`prune-lead-attempts`). Full operational admin suite & General Knowledge Base deployed. **Slack Command Centre completed**: two-way interactive Block Kit actions, `/thg` slash commands, 9-channel topology, 08:00 daily founder briefing, and 30-min health scanner. Continue remaining email/session/backup/security work. |
| H03/H12/H46     | Refreshed source is merged; Cloudflare Worker edge SSR, SEO metadata, canonicals and Schema JSON-LD passing. Verify live multi-brand journeys before closing visual/release acceptance.                                                                                                                                                                                                                                                                                                                                                                                                             |
| H39/H40/H41     | Technical/security verification passing: 125/125 test suite passed (60 smoke + 62 regression + 3 service worker); zero service role secret leakage in public bundles.                                                                                                                                                                                                                                                                                                                                                                                                                               |
| H47             | Wrangler deployment configuration aligned with Nitro SSR output (.output/server/wrangler.json) and dual crons (`* * * * *`, `0 * * * *`).                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| H50             | 8-Step Turnaround SOP and trade vertical playbooks documented in Dashboard Knowledge Base; first paid pilot will validate automated lifecycle, quality review, and exception handling.                                                                                                                                                                                                                                                                                                                                                                                                              |
| D01-D08 / H49   | Preserve integrated domain workstream; enrich existing roster instead of requesting a replacement. Advanced automation and separate branding remain demand-gated.                                                                                                                                                                                                                                                                                                                                                                                                                                   |

Execution order: Sourcing Bristol/Bath electrical contractor targets & pilot template assembly; H42 live owner session expiry/logout acceptance; H09/H10 transactional email setup once credentials ready; H07 live database backup/recovery proof; H50 repeatable pilot through launch/care. D01 inventory can progress independently.

### L01 - Align the existing Harley Labs page with the agreed basic brief

- **Related lab evidence — 9 October 2026:** One dashboard KB article, `harley-labs-dell-build` / **Harley Labs — Dell Build**, prepared for draft PR review on `codex/harley-labs-dell-kb`, reconciled with remote main `e972b74`. Founder-reported Dell checkpoint and reusable prompts are recorded; n8n owner/workflow/reboot recovery remain unverified. This supports the Labs workstream without completing or changing the public-page scope below. Committed/pushed in `dbf567c`; draft [PR #20](https://github.com/SkyPilot24/harley-digital-works/pull/20) open. No main merge, deployment or live KB acceptance. See the dated `docs/HANDOVER.md` section for exact validation/publication state.

- **Priority:** Medium
- **Who needs to act:** You; Me only for unsupported claims/brand decisions
- **Status:** Requested, implementation against new brief unverified
- **Current gap:** Existing labs route presents systems architecture and tools; recent chat was a refined brief, not proof of the requested simple page.
- **Why it matters:** The umbrella's three public brands need coherent purpose and credible conversion journeys.
- **Dependencies:** Existing brand conventions, H03/H12/H46; approved claims.
- **Resolution:** Assess and simplify existing route for AI, automation, prototypes and internal tools; preserve useful work, align navigation, contact CTA and metadata.
- **Definition of done:** Accurate brief-aligned page, functional CTA, responsive/keyboard checks and correct metadata; verified deployment recorded separately. No invented products, clients or performance claims.

## Shared record and precedence

Imported from the existing The Harley Group / Business OS records on 2 October 2026; existing task IDs and commercial decisions are preserved. These repository files govern development across Codex/ChatGPT Work and Google Antigravity. Google Drive originals remain business reference records; there is no automatic synchronisation. When either copy changes, explicitly reconcile the other and record the date/source in the handover. Latest explicit founder decisions take precedence. Historical implementation notes require current source and runtime evidence before being marked complete.

Updated 2 October 2026. Domain integration added following the founder's request; original audit IDs and existing implementation evidence retained. 50 original audit IDs retained. Original audit is a historical baseline; this register supersedes its commercial assumptions and delivery status. You = assistant; Me = founder; Third party = provider/customer as applicable. Implemented locally does not mean deployed or complete.

## H01 — Confirm the launch offer and commercial terms

- **Phase:** 1
- **Priority:** High
- **Who needs to act:** Me
- **Status:** **COMPLETE / RATIFIED**
- **Current gap:** None. Commercial blueprint, package structure, and pricing ratified by Robbie on 7 October 2026.
- **Why it matters:** Public offer, proposals and billing must agree with the approved scope and terms.
- **Dependencies:** None
- **Resolution:** Ratify single offer sheet and pricing tiers. Core package is £1,495 setup + £249/mo care.
- **Definition of done:** One approved offer sheet governs every public price, proposal, onboarding step and billing rule.
- **Latest evidence:** Founder explicitly reviewed and approved commercial blueprint on 7 October 2026. Governing document: [docs/COMMERCIAL_OFFER_MANAGED.md](docs/COMMERCIAL_OFFER_MANAGED.md).

## H02 — Verify business identity, capacity and support commitments

- **Phase:** 1
- **Priority:** High
- **Who needs to act:** Me
- **Status:** **COMPLETE / RATIFIED**
- **Current gap:** None. Business fact sheet, VAT rules (zero-rated below £90k), geographic positioning, and 2-build concurrency cap ratified by Robbie on 7 October 2026.
- **Why it matters:** Incorrect identity or operational promises damage trust and contaminate contracts and invoices.
- **Dependencies:** None
- **Resolution:** Supply or confirm the trading/legal entity, public address/contact details, actual team and qualifications, tax status, supported hours, realistic delivery capacity and turnaround.
- **Definition of done:** A small approved business fact sheet exists; every identity and operational claim can be traced to it.
- **Latest evidence:** Business fact sheet and decision register ratified in [docs/COMMERCIAL_OFFER_MANAGED.md](docs/COMMERCIAL_OFFER_MANAGED.md). Rules enforce zero-rated VAT below £90k, UK-wide remote studio with Bristol/Bath electrical contractor pilot, and strict cap of 2 concurrent onboarding builds.

## H03 — Establish one source of truth and a release inventory

- **9 October activity consolidation:** current main checkout verified clean with no unpushed commits; scanner PR #22 included in Headquarters PR #23 on the review branch. Recent activity review/KB and Drive proposed-brand references added; socials confirmed not yet set up. Fresh combined checks pass; production identity, reviewed release and live acceptance remain open. See `docs/RECENT_ACTIVITY_REVIEW_2026-10-09.md`.

- **9 October Control Centre evidence:** `/admin/headquarters` and its dashboard/sidebar entry implemented on `codex/group-headquarters-control-centre` from main `5e0520d`; 118 linked references including every shared-HQ folder/document/reference destination, 17 portfolio records and ten priorities. Local build/checks and UI search/mobile acceptance pass; CI/release/live authenticated acceptance and wider release inventory remain outstanding. See `docs/HANDOVER.md`.

- **Phase:** 1
- **Priority:** High
- **Who needs to act:** You
- **Status:** In progress / partially resolved
- **Current gap:** GitHub/local main is at 7f52f8a; the Lovable project lists an older August 1 revision. Older archived agency code and Drive operating plans describe other states. Cloudflare has current and legacy workers.
- **Why it matters:** Editing or deploying from the wrong baseline could undo the redesign or restore outdated behaviour.
- **Dependencies:** None
- **Resolution:** Record current Git commit, repo, Lovable relationship, both production domains, worker and environment ownership. Classify every route/tool as launch, private demo, deferred or retired; preserve historic work separately.
- **Definition of done:** A versioned route/feature inventory and release map identify what is public, authoritative and safe to edit; no wholesale import of the archived app.
- **Latest evidence:** Business OS central hub and current documents established. Production release inventory and remaining technical runbook validation still outstanding.

## H04 — Enforce server-side permission on transactional email

- **Phase:** 1
- **Priority:** Critical
- **Who needs to act:** You
- **Status:** In progress / partially resolved
- **Current gap:** src/lib/email-dispatch.functions.ts accepts recipient, subject and arbitrary body content without an authentication/admin middleware check. Client token attachment is not server authorization. Live provider configuration is not verified.
- **Why it matters:** Enabling an email provider could expose an unauthenticated sending capability and sender-reputation abuse.
- **Dependencies:** None; must precede H09
- **Resolution:** Require authenticated authorized staff server-side, validate allowed actions and recipient context, constrain payload size, rate-limit and audit sends. Keep delivery disabled until these checks pass.
- **Definition of done:** Unauthenticated and non-admin requests are denied before provider access; authorized bounded sends succeed in staging; secrets never enter browser bundles.
- **Latest evidence:** Local commit 843f0d8: authentication/intake/status safeguards and public prototype gating. Remaining acceptance and deployment must still be verified.

## H05 — Remove false success states from public launch journeys

- **Phase:** 1
- **Priority:** Critical
- **Who needs to act:** You
- **Status:** In progress / partially resolved
- **Current gap:** Group enquiry only changes local state; care desk, onboarding, tracking, billing and proposals contain simulated or unchecked success paths. Evidence: the-harley-group.tsx, care-desk.tsx and portal components.
- **Why it matters:** Visitors may believe an enquiry, upload, approval or payment action was completed when nothing happened.
- **Dependencies:** H03
- **Resolution:** Immediately gate incomplete routes and actions, replace them with a working contact route or explicitly labelled non-submitting demo. Re-enable each only after its dedicated backlog item passes.
- **Definition of done:** No public button reports received, uploaded, approved, paid, sent or deployed without a verified persisted/provider result. Disabled tools are absent from navigation and discovery.
- **Latest evidence:** Local commit 843f0d8: authentication/intake/status safeguards and public prototype gating. Remaining acceptance and deployment must still be verified.

## H06 — Restore the production lead-capture and admin connection

- **Phase:** 1
- **Priority:** Critical
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** Live /contact offers Prepare Email Draft because capture is unconfigured; /auth says Admin sign-in is unavailable. The Cloudflare worker settings inspected expose only the assets binding. The configured Supabase project was not accessible through the connected account.
- **Why it matters:** The website is live but its primary enquiry-to-CRM operating loop is unavailable.
- **Dependencies:** H04, H07
- **Resolution:** Once the correct backend is accessible, validate build-time public URL/key and server-only credentials, auth redirect URLs and environment separation; redeploy through the selected Cloudflare process. Retain an honest email fallback on outages.
- **Definition of done:** A controlled production enquiry creates one retrievable lead; authorized staff can sign in; failure states retain entered data and do not claim submission. No service-role key is client-visible.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H07 — Establish access to the intended Supabase project and verify its state

- **Phase:** 1
- **Priority:** Critical
- **Who needs to act:** Third party
- **Status:** In progress — live target/access accepted; backup/recovery proof remains
- **Current gap:** Existing application config identifies sprljifjcpbnagsxefrp; stale CLI and accessible THG Agency metadata identify worzpzbutngugwzhlvtj. Production Cloudflare configuration now matches the founder-selected THG Agency target. Staging mfpnfxpgkfuqtedbcxvp is separate; staging credentials are privately configured and real Auth/API acceptance passes.
- **Why it matters:** Production configuration and data isolation cannot be signed off from migration files alone.
- **Dependencies:** Me: confirm backup/recovery ownership and evidence
- **Resolution:** Have the backend account owner provide scoped access; inventory deployed migrations, auth settings, roles, tables, storage, backup and recovery capability. Apply only reviewed missing changes in staging first.
- **Definition of done:** Correct project identity is confirmed; migration reconciliation and anonymous/staff/client isolation tests pass; recovery settings and ownership are recorded.
- **Latest evidence (7 October):** See [dated enquiry acceptance](docs/enquiry-acceptance-2026-10-07.md). Local secure intake/permission fixes implemented; isolated staging schema applied; SQL concurrency passes. Real Auth/API passes all 11 checks; browser enquiry receipt and one stored row verified. Existing owner browser sign-in, dashboard/Leads/full message retrieval pass; live session expiry remains untested. Founder agreed canonical GitHub/Cloudflare/THG Agency plan and approved exact database cutover, now applied. Matching code deployed; latest manually verified Worker 9d3bfd74; labelled live browser contact saves exactly one enquiry. Notifications disabled. Existing owner browser retrieval now passes; expiry/logout remains untested. See docs/evidence/live-owner-retrieval-2026-10-07.json.

## H08 — Connect both brand enquiry forms to one validated intake

- **Phase:** 2
- **Priority:** High
- **Who needs to act:** You
- **Status:** In progress / partially resolved
- **Current gap:** Both brands pass live browser receipt, all six field persistence and genuine owner CRM retrieval. Long interest survives message editing; source brands remain distinct. Wider fallback/package-link/session-expiry coverage remains open.
- **Why it matters:** Valid interest can be lost or arrive without the information needed to follow up.
- **Dependencies:** H01, H05, H06
- **Resolution:** Use a shared server intake with stable offer IDs, phone, source brand/page and explicit service selection. Preserve accessible validation and the existing honeypot/timing protections.
- **Definition of done:** Both brands save all entered fields once; package links preselect correctly; validation, retry, duplicate and fallback cases are covered.
- **Latest evidence (7 October):** See [dated enquiry acceptance](docs/enquiry-acceptance-2026-10-07.md). Local secure intake/permission fixes implemented; isolated staging schema applied; SQL concurrency passes. Real Auth/API passes all 11 checks; browser enquiry receipt and one stored row verified. Existing owner browser sign-in, dashboard/Leads/full message retrieval pass; live session expiry remains untested. Founder agreed canonical GitHub/Cloudflare/THG Agency plan and approved exact database cutover, now applied. Matching code deployed; latest manually verified Worker 9d3bfd74; labelled live browser contact saves exactly one enquiry. Notifications disabled. Existing owner browser retrieval now passes; expiry/logout remains untested. See docs/evidence/live-owner-retrieval-2026-10-07.json.

## H09 — Make lead notifications and email status reliable

- **Phase:** 4
- **Priority:** High
- **Who needs to act:** You
- **Status:** In progress / partially resolved
- **Current gap:** Durable Slack retries and staff-visible status are live-verified. Both labelled alerts failed twice, then native scheduled third attempts succeeded at 12:31:39 BST; matching references are present in Slack and accepted status appears in owner CRM. No lead duplication or manual reset. Transactional customer-email sender/delivery/bounce acceptance remains disabled/unverified.
- **Why it matters:** Staff can miss leads and customers may retry submissions or rely on undelivered documents.
- **Dependencies:** H04, H06, H08, H10
- **Resolution:** Treat persisted intake as the authoritative receipt; enqueue/retry notification separately. Distinguish prepared, queued, provider-accepted, delivered and failed states. Add bounded timeouts and staff-visible failures.
- **Definition of done:** Slack/provider outages do not lose or duplicate leads; a failed notification can retry safely; UI and audit records never describe simulated or merely accepted mail as delivered.
- **Latest evidence (7 October):** See [dated enquiry acceptance](docs/enquiry-acceptance-2026-10-07.md). Local secure intake/permission fixes implemented; isolated staging schema applied; SQL concurrency passes. Real Auth/API passes all 11 checks; browser enquiry receipt and one stored row verified. Existing owner browser sign-in, dashboard/Leads/full message retrieval pass; live session expiry remains untested. Founder agreed canonical GitHub/Cloudflare/THG Agency plan and approved exact database cutover, now applied. Matching code deployed; latest manually verified Worker 9d3bfd74; labelled live browser contact saves exactly one enquiry. Notifications disabled. Existing owner browser retrieval now passes; expiry/logout remains untested. See docs/evidence/live-owner-retrieval-2026-10-07.json.

## H10 — Verify transactional sender and notification destinations

- **Phase:** 4
- **Priority:** High
- **Who needs to act:** Third party
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** THG Enquiry Alerts webhook to #all-the-harley-group (C0BFQS2P2H1) is privately installed and live delivery verified for both brands at 12:31:39 BST. Transactional sender/provider delivery remains unverified.
- **Why it matters:** Email delivery and operational alerts require real account/domain setup.
- **Dependencies:** H04; Me: confirm authorized sender/inbox and account owner
- **Resolution:** Configure the chosen transactional provider, verify its required DNS records, check SPF/DKIM/DMARC without disturbing business mail, and connect a restricted Slack notification destination.
- **Definition of done:** Provider verification passes; a consented test message arrives in the intended inbox; bounce/failure is observable; Slack receives a test lead without unnecessary personal data.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H11 — Align the complete public site with the approved offer

- **Phase:** 2
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** Services, launch plan, care plans, calculator, proposals, trade pages, Labs and corporate copy describe overlapping agency, platform and holding-company propositions. Resources include internal agency-operating material.
- **Why it matters:** Visitors face inconsistent scope and unclear next steps; maintaining excessive pages increases launch risk.
- **Dependencies:** H01, H02, H03
- **Resolution:** Keep a focused homepage → offer → work/demo → process/about → enquiry journey. Rewrite retained pages from one offer model; consolidate duplicate automation/service pages with redirects; defer Labs/tools that do not serve the launch.
- **Definition of done:** Every retained route has a defined audience, owner, accurate offer and next action; duplicate or deferred URLs resolve intentionally.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H12 — Finish the corporate site as a credible separate brand

- **Phase:** 2
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** The group page shares the digital-studio application and metadata, includes unsupported enterprise/compliance/performance claims and an ineffective enquiry form.
- **Why it matters:** The Harley Group needs a believable umbrella presence without implying an established operating scale that has not been evidenced.
- **Dependencies:** H02, H08, H28
- **Resolution:** Build on the existing corporate page: concise purpose, verified founder/entity details, accurate ventures/status, direct link to Harley Digital Works and working contact. Remove unsubstantiated financial, certification and scale claims.
- **Definition of done:** Corporate site accurately explains the group and relationship to HDW, has its own brand metadata, and a successful enquiry journey.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H13 — Replace unsupported testimonials and outcome claims with evidenced proof

- **Phase:** 2
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** TradeGoogleReviewsWidget contains hard-coded verified reviews and revenue outcomes; location-data contains local site counts, lead averages and uplift claims without source evidence. Homepage design studies are already clearly labelled illustrative.
- **Why it matters:** Unsubstantiated proof undermines the credibility the new design is intended to create.
- **Dependencies:** Me: optional authentic evidence; otherwise proceed by removing claims
- **Resolution:** Retain the honest concept showcases. Remove unsupported reviews, results, client counts and before/after metrics; add real case studies only with source, date, permission and appropriate qualification.
- **Definition of done:** Each testimonial/result has a retained evidence record and permission, or is removed. Concepts are consistently labelled on all pages and generated outputs.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H14 — Curate trade and location pages before indexing them

- **Phase:** 2
- **Priority:** Medium
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** Four trade and fifteen location variants are routable; local content includes repeated numeric claims. An approved Bristol/Bath pilot is not established merely by the planning document.
- **Why it matters:** Large numbers of thin or inaccurate landing pages weaken usefulness and make brand maintenance harder.
- **Dependencies:** H01, H02, H13
- **Resolution:** Retain only relevant, substantive variants; state actual service coverage without implying local offices. Start with the electrician demonstration recommended by the business plan, then expand based on demand.
- **Definition of done:** Published variants have distinct useful copy and verified local facts; unsupported variants are noindexed, consolidated or removed with a deliberate URL policy.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H15 — Extend the approved homepage design language across core pages

- **13 October 2026 wordmark evidence:** approved navy/ivory HDW identity implemented locally on `codex/hdw-wordmark-2026-10-13` (`172b576`); current HDW logos/icons/social preview and public brand guide updated, stale guidance reconciled. Build/typecheck/format and 136 tests PASS; lint 9 existing warnings; nine responsive route-width checks PASS. See docs/HANDOVER.md and docs/evidence/brand-2026-10-13. No publication/live acceptance; wider task remains open.

- **Phase:** 3
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** The September 17 homepage has strong image-led cream/black/gold composition, readable branding and labelled design studies. Legacy service/care/tool screens retain different generic card-heavy treatments.
- **Why it matters:** The premium impression currently weakens as visitors leave the homepage.
- **Dependencies:** H11, H12
- **Resolution:** Reuse the current wordmark, typography, spacing, imagery and button primitives across retained offer, work, about, contact and corporate pages; remove competing shells and redundant cards.
- **Definition of done:** Desktop/tablet/mobile visual review confirms one coherent studio experience, with intentional corporate-brand differences and consistent interaction states.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H16 — Complete the asset and portfolio publishing pack

- **Phase:** 3
- **Priority:** Medium
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** The hero and design studies now contain photography; evidence of a complete rights/provenance and social-thumbnail pack was not found. Legacy pages rely on repetitive panels.
- **Why it matters:** Reusable approved assets improve credibility, performance and future maintenance without another redesign.
- **Dependencies:** H13, H15
- **Resolution:** Record photo sources/licensing and approved logo variants, produce responsive hero/showcase crops and social PNGs, and make each concept detail useful with scope and design rationale. Use real work only when authorized.
- **Definition of done:** Every retained image has source/usage status, meaningful alt/decorative treatment and correct variants; work pages clearly distinguish concepts from commissioned projects.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H17 — Repair keyboard and assistive-technology gaps

- **Phase:** 3
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** PageShell lacks a skip-to-content target; before/after sliders rely on pointer interactions; custom dialogs lack consistent focus handling; several onboarding labels are not associated. Admin off-screen navigation needs focus isolation.
- **Why it matters:** Key journeys must work without a mouse and expose clear controls and errors.
- **Dependencies:** H05, H15; H19/H20 for portals
- **Resolution:** Reuse accessible dialog/slider primitives, provide keyboard slider values, skip link, associated fields, error summaries and live submission state; verify focus return and hidden navigation.
- **Definition of done:** Retained flows pass keyboard-only and screen-reader checks plus automated accessibility scanning; no serious/critical automated issues remain, and contrast/focus are manually checked.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H18 — Complete responsive and interaction QA across all retained layouts

- **Phase:** 3
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** Homepage at desktop and 390px and mobile menu opening/Escape were checked successfully. Wider route/device coverage is incomplete; WhatsApp panel has fixed 340px width, and portal/admin tables and dialogs need narrow-screen checks.
- **Why it matters:** A good homepage sample is not evidence that all mobile tasks can be completed.
- **Dependencies:** H15, H17
- **Resolution:** Check 320/375/390/768/1024/1440px, zoom, long content, landscape, touch, sticky elements and reduced motion. Fit the WhatsApp panel to viewport and replace unverified online/rapid-response promises.
- **Definition of done:** No horizontal page overflow, obscured controls or keyboard traps on retained journeys; primary CTAs, forms and dialogs remain usable at 200% zoom and mobile sizes.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H19 — Replace care-request simulation with a real support channel

- **Phase:** 4
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** care-desk inserts directly into leads, ignores returned database errors, uses a placeholder customer email and records filenames without uploading files. Anonymous lead insertion has been restricted by migrations.
- **Why it matters:** Customers cannot rely on a care request receipt or assume their attachments were delivered.
- **Dependencies:** H06, H09; H01 support scope
- **Resolution:** For launch, use a clear monitored support channel or a small authenticated ticket flow. Keep care requests separate from sales leads; store real identity, status and attachments only if attachment security is ready.
- **Definition of done:** A real request reaches its owner with ticket/reference and an accurate receipt; failed writes cannot show success; response commitments match the approved care scope.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H20 — Implement verified invitation-based client onboarding

- **Phase:** 4
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** ContractorOnboardingWizard attempts anonymous client inserts despite admin policies, continues after errors, marks leads won, creates an unpersisted weak token and preselects credentials/insurance/emergency claims. Query data can expose personal details.
- **Why it matters:** The flow can claim onboarding completion without a project and publish false client facts.
- **Dependencies:** H01, H06, H22
- **Resolution:** Use expiring server-issued invitations bound to an actual client/project, protected writes and verified required facts. Remove credential defaults and personal data from URLs. Persist progress and prevent partial conversion.
- **Definition of done:** Expired/wrong-client links fail safely; verified submissions persist once; no lead becomes won on a failed insert; credentials start unconfirmed and require client evidence.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H21 — Make project tracking, files and approval records real or keep them private demos

- **Phase:** 4
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** track/$token resolves sample records and falls back to Apex for unknown tokens. Uploads and approvals change local state; dates and status are static. The UI implies private access and invoice/DNS consequences.
- **Why it matters:** Customers could mistake a sample for their project or think a launch approval was recorded.
- **Dependencies:** H20; H07 storage/auth
- **Resolution:** Use authenticated access or high-entropy scoped expiring tokens; return genuine not-found states. Add private storage, size/type validation and access rules. Persist approval against exact content/version, signer and time before any launch trigger.
- **Definition of done:** Cross-client access tests fail closed; reload preserves real progress; uploaded files exist securely; an approval is auditable and cannot approve a different version.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H22 — Correct CRM conversion and separate collected revenue from estimates

- **Phase:** 4
- **Priority:** High
- **Who needs to act:** You
- **Status:** In progress / partially resolved
- **Current gap:** admin.leads derives recurring value by matching package text containing 95, so £1,495/£2,995 can be treated as £95 recurring. Client creation and lead update are separate writes; conversion can create duplicates.
- **Why it matters:** Pipeline and revenue figures become unreliable before any money is collected.
- **Dependencies:** H01, H06
- **Resolution:** Use stable offer IDs and approved pricing records; convert transactionally/idempotently with unique lead linkage. Track opportunity, signed, paid, active and cancelled states separately; paginate lists and show retrieval errors.
- **Definition of done:** Repeated conversion creates one client/project; all offers produce correct values; revenue reports distinguish contracted, invoiced and collected amounts.
- **Latest evidence:** Local commit 410eece removes automatic won/revenue creation and adds retry/error handling. Real DB policies and payment reconciliation remain unverified.

## H23 — Replace simulated proposal acceptance and billing with a minimal real process

- **Phase:** 4
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** Proposal signatures are local/timed; shared URL does not persist proposal state. CareBillingPortalDesk uses mock paid invoices and toast-only download/mandate actions; no verified payment lifecycle was shown.
- **Why it matters:** Clients cannot safely sign or pay through these screens.
- **Dependencies:** H01, H02, H22, H24
- **Resolution:** Prefer an approved proposal plus established hosted payment/customer portal over building a payment platform. Persist signed version/reference, verify provider webhooks and model retries, cancellations and reconciliation. Keep current public billing UI gated.
- **Definition of done:** Test-mode purchase, duplicate webhook, failed payment and cancellation work end to end; no client is activated merely by visiting a success URL.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H24 — Activate the chosen billing and accounting service

- **Phase:** 4
- **Priority:** High
- **Who needs to act:** Third party
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** No completed subscription/payment integration or verified merchant/accounting connection was demonstrated. Public interfaces name billing methods without evidence of live provider setup.
- **Why it matters:** Recurring collection and compliant business records depend on real provider accounts and entity information.
- **Dependencies:** H01, H02; Me: approve provider and account owner
- **Resolution:** Use an existing suitable provider if available; complete merchant checks and accountant-confirmed VAT/invoicing treatment; supply scoped credentials through secure configuration.
- **Definition of done:** Provider account is operational; test-to-live checklist, ownership and reconciliation responsibility are recorded; first controlled transaction can be reconciled.
- **Latest evidence:** Stripe account discovery remains unverified because authentication repeats. No products or charges created.

## H25 — Stop sample invoices, financial exports and reports being treated as real

- **Phase:** 4
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** Admin invoices are toast-only; ClientInvoiceModal regenerates random numbers and hard-codes bank/VAT values. GroupFinancialDesk exports sample revenue with an MTD-compliance claim. Monthly report content uses fixed figures and can be emailed.
- **Why it matters:** False financial or performance records are more harmful than an unfinished dashboard.
- **Dependencies:** H02, H22, H24; H04 before email
- **Resolution:** Remove or sandbox sample exports/send actions. Use the accounting system for legal invoices; persist stable IDs and real statuses. Build client reports only from verified data sources and label estimates.
- **Definition of done:** No production document contains sample bank details, invented performance or unjustified compliance claims; invoice identifiers and totals reconcile to the source ledger.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H26 — Defer the referral programme until terms and attribution exist

- **Phase:** 4
- **Priority:** Medium
- **Who needs to act:** You
- **Status:** In progress / partially resolved
- **Current gap:** Partner application and referral portal use timed success/sample data; £250 rewards and £150 discounts lack approved economics or terms.
- **Why it matters:** This creates payment expectations without an operating programme.
- **Dependencies:** H01; Me only if programme retained
- **Resolution:** Remove the public reward/application promise for initial launch. Later implement persisted referrals, attribution, eligibility, consent, payout approval and terms using the CRM rather than a separate portal.
- **Definition of done:** Launch has no unsupported referral commitment; any subsequently enabled referral can be traced from application to approved payout.
- **Latest evidence:** Local commit 843f0d8: authentication/intake/status safeguards and public prototype gating. Remaining acceptance and deployment must still be verified.

## H27 — Protect dynamic responses with a tested security-header policy

- **Phase:** 5
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** Tested rendered HTML lacks CSP, HSTS, X-Content-Type-Options, framing protection and Referrer-Policy. Static responses carry some headers, so public/_headers is not covering SSR consistently.
- **Why it matters:** The current protection is inconsistent across the actual application responses.
- **Dependencies:** H03, H06
- **Resolution:** Apply headers in the Cloudflare/SSR response path; start CSP report-only and resolve required sources, then enforce. Set explicit auth/private caching and framing rules; enable HSTS only after HTTPS coverage review.
- **Definition of done:** Headers are verified on both domains, HTML, errors and RPC/auth routes; CSP does not break forms/assets; private responses are not publicly cached.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H28 — Correct multi-domain routing, redirects and brand canonicals

- **Phase:** 5
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** theharleygroup.org/ redirects 302 to /the-harley-group, whose canonical points to harleydigitalworks.com. Shared root metadata/schema are HDW. www HDW also serves 200. Host matching uses includes plus client-side brand switching.
- **Why it matters:** Search engines and users receive conflicting brand/domain signals; broad hostname logic is fragile.
- **Dependencies:** H02, H03, H12
- **Resolution:** Resolve exact allowed hosts server-side, choose each brand’s canonical URL, issue permanent www/legacy redirects and generate brand-specific metadata/schema. Document how non-brand routes on the group host resolve.
- **Definition of done:** Both apex/www domains and deep links have one deliberate canonical destination; group pages never canonicalize to HDW accidentally; server-rendered content matches the host.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H29 — Rebuild the indexable route and metadata map

- **Phase:** 5
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** The sitemap contains nine legacy entries and omits newer routes, while many unfinished tools remain public. Shared social defaults and SVG social artwork need validation.
- **Why it matters:** Search discovery does not reflect the intended launch, and private/demo tools should not compete with useful pages.
- **Dependencies:** H03, H11, H14, H28
- **Resolution:** Generate per-brand sitemap/robots and canonical metadata from the approved route inventory. Noindex demos/private tools as appropriate; authenticate private content rather than relying on robots. Use supported social images and validate structured data.
- **Definition of done:** Every indexable route has one correct title, description, canonical and social preview; no private/demo route enters sitemaps; structured-data facts match approved business details.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H30 — Optimize measured page weight and establish performance budgets

- **Phase:** 5
- **Priority:** Medium
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** The homepage references about 260KiB of recompressed JavaScript across 19 bundles; the main architectural JPEG is about 545KB. A Supabase client bundle is loaded. These are asset observations, not measured Core Web Vitals.
- **Why it matters:** The image-led design needs to stay quick on mobile connections.
- **Dependencies:** H15, H16, H06
- **Resolution:** Measure representative pages under mobile throttling; use responsive modern image variants and sensible hero priority, lazy-load lower content and keep admin/backend code off public routes where possible.
- **Definition of done:** Recorded pre/post lab results meet agreed budgets without visual regression; aim for LCP ≤2.5s, CLS ≤0.1 and INP ≤200ms, with field verification when enough traffic exists.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H31 — Implement a small, privacy-aware conversion measurement plan

- **Phase:** 5
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** No conversion analytics implementation was found in the reviewed source; privacy copy merely says analytics may be used. No live measurement proof was supplied.
- **Why it matters:** The business cannot distinguish attractive pages from enquiries and paying customers.
- **Dependencies:** H08, H22, H32
- **Resolution:** Select minimal analytics; record offer/CTA, accepted enquiry and verified paid activation without form text or personal data. Preserve campaign source in CRM and deduplicate events. Add consent only where the selected technology requires it.
- **Definition of done:** Test events appear once with no personal data; enquiry conversion fires after persistence; a simple report connects source, qualified lead and collected recurring revenue.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H32 — Publish accurate privacy, service and cookie information

- **Phase:** 5
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** The privacy page still calls itself a draft and contains generic processor/retention language. Final terms, cancellation/ownership rules and actual storage/tracking inventory are not established.
- **Why it matters:** Visitors need truthful information, and operations need executable retention and service rules.
- **Dependencies:** H01, H02, H07, H10, H24, H31
- **Resolution:** Draft notices from actual data flows, processors, retention periods, rights contact and approved terms; implement deletion/export and retention procedures. Obtain specialist review only where the selected model creates unresolved legal questions.
- **Definition of done:** Published notices describe actual operation, no draft caveats remain, optional tracking respects required consent, and staff can execute a retention/deletion request.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H33 — Remove manufactured website-audit and keyword results

- **Phase:** 1
- **Priority:** High
- **Who needs to act:** You
- **Status:** In progress / partially resolved
- **Current gap:** audit.tsx derives a score from URL characters and presents canned findings without inspecting the site. SEO inspector shows delayed hard-coded volumes/CPC, with inconsistent trade mapping.
- **Why it matters:** A lead-generation tool is currently capable of presenting invented diagnostics as measured facts.
- **Dependencies:** H05
- **Resolution:** Replace with an honest request for a manual review, or label and isolate a demonstration. Build automated diagnostics later only with genuine fetch/measurement, source/date and explicit uncertainty.
- **Definition of done:** No public tool asserts measured security, performance or search demand without a real measurement/source; unavailable data is visibly unavailable.
- **Latest evidence:** Local commit 843f0d8: authentication/intake/status safeguards and public prototype gating. Remaining acceptance and deployment must still be verified.

## H34 — Remove review gating and fake private-feedback submission

- **Phase:** 1
- **Priority:** High
- **Who needs to act:** You
- **Status:** In progress / partially resolved
- **Current gap:** Review booster sends high ratings to Google and low ratings to private feedback, then uses a sent toast without persistence.
- **Why it matters:** Selective positive-review solicitation conflicts with Google’s policy and creates an unreliable customer-feedback path.
- **Dependencies:** H05
- **Resolution:** Offer the same review destination to everyone and a separate optional feedback channel independent of rating; persist feedback if retained. Otherwise remove the tool from launch.
- **Definition of done:** All rating paths have equal access to public review submission; private feedback is acknowledged only after receipt.
- **Latest evidence:** Local commit 843f0d8: authentication/intake/status safeguards and public prototype gating. Remaining acceptance and deployment must still be verified.

## H35 — Restrict internal automation tools to honest demonstrated capabilities

- **Phase:** 4
- **Priority:** Medium
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** Prospecting, content/case-study factories and care-monitor panels use sample pools, timers or templated output; the interface implies discovered leads, deployed changes or sent reports.
- **Why it matters:** Staff may make business decisions based on simulations, even behind an admin login.
- **Dependencies:** H03, H05, H13
- **Resolution:** Keep tools in a visibly separate sandbox, remove simulated production actions and reuse only useful draft-generation/export functions. Prioritize intake → follow-up → accepted proposal → delivery over a broad operating-system build.
- **Definition of done:** Each enabled tool documents its inputs, real side effects and limits; simulated actions cannot touch production records or claim live outcomes.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H36 — Replace unsafe deployment/provisioning claims with a controlled delivery runbook

- **Phase:** 4
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** DNS provisioner uses a hard-coded Vercel IP while describing Cloudflare and verifies by timer; tracker shows another destination. Staging provisioning does not prove deployment. Code exporter references missing components and its download is a timed toast.
- **Why it matters:** Following these screens can misconfigure a client domain or promise a deployable product that does not exist.
- **Dependencies:** H03, H21, H41
- **Resolution:** Disable generic DNS instructions. Use the actual chosen hosting target, preserve email records, deploy a private labelled preview and bind approval to its exact version. Keep manual reviewed launch until a real automated build/export/deploy pipeline is proven.
- **Definition of done:** One pilot goes from source to private preview to approved production with real DNS/TLS checks, rollback and a buildable source bundle; no timer substitutes for verification.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H37 — Design outreach only after the service can fulfil a pilot

- **11 October research evidence:** 50 candidates sourced (40 primary website / ten directory-only), ten desk assessments and ten unsent drafts prepared in `docs/BRISTOL_BATH_PILOT_RESEARCH_2026-10-11.md` and linked CSV/draft pack. Ten read-only homepage checks pass; current membership, team/capacity and recipient eligibility remain unverified. RG Electrical Bristol, Bath-Electrical and Nextgen lead qualification. Sending and stop-condition implementation remain untested; H37 stays open.

- **Phase:** 4
- **Priority:** Medium
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** Outreach sequence functionality is largely generation/export, not a durable scheduler. Sourcing, eligibility, suppression, opt-out and reply/payment stop rules are not demonstrated.
- **Why it matters:** Automating acquisition before fulfilment and contact controls exist amplifies operating and reputational risk.
- **Dependencies:** H01, H09, H20–H24, H32; separate authorization before any sending
- **Resolution:** Defer bulk outreach. Later implement a small sourced prospect queue, jurisdiction/contact eligibility checks, suppression, volume caps and human-reviewed messages; stop on reply, opt-out or conversion.
- **Definition of done:** An unsent test sequence proves eligibility and all stop conditions; sending remains disabled until authorized and monitored. No public prospects are contacted as part of this audit.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H38 — Make CMS and settings reflect the content they actually control

- **Phase:** 2
- **Priority:** Medium
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** CMS hooks/editors exist, but service/resource pages remain hard-coded and site-config duplicates stored settings. Public resources expose internal agency instructions.
- **Why it matters:** Staff can save changes that never appear on the website and maintain conflicting content sources.
- **Dependencies:** H11, H13
- **Resolution:** Choose code-managed content for the small launch unless active editing is needed; hide disconnected editors or wire only clearly defined fields with preview/publish states. Curate customer-facing resources.
- **Definition of done:** Every visible edit control has a documented publication effect and verified preview; no duplicate business setting can silently override another.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H39 — Make lint and formatting checks genuinely usable

- **Phase:** 5
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** Typecheck passes, but lint reports 4,490 errors and 10 warnings, including vendored .agents files; format check flags 71 files. These are mixed scope/configuration and application issues, not 4,490 distinct product defects.
- **Why it matters:** The quality gate is too noisy to protect changes and currently fails.
- **Dependencies:** H03
- **Resolution:** Scope tooling to owned application/configuration files, exclude vendored/generated material appropriately, then fix remaining substantive lint and formatting failures in controlled changes.
- **Definition of done:** A clean checkout passes lint, formatting and typecheck without blanket suppressions that hide application defects.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H40 — Add tests for real failures and run them in CI

- **Phase:** 5
- **Priority:** High
- **Who needs to act:** You
- **Status:** In progress / partially resolved
- **Current gap:** All 54 smoke checks pass, but largely check file presence and isolated arithmetic. quality.yml runs formatting/type/lint/build and omits npm test. Critical intake, role, conversion and approval behaviour is not protected.
- **Why it matters:** Passing current checks does not prove that the customer journeys work.
- **Dependencies:** H04, H08, H22, H39
- **Resolution:** Add focused integration tests for permissions, lead persistence/notification failure, duplicate conversion, unknown tracker access and real acceptance/payment states; add a small end-to-end suite for retained public routes. Include tests in CI.
- **Definition of done:** CI fails on representative broken authorization/intake/duplicate/approval cases and passes on the reviewed implementation; no assertion merely mirrors a hard-coded value.
- **Latest evidence:** 75 local tests pass; typecheck/build pass. CI execution and full production customer-journey checks remain.

## H41 — Standardize and prove the Cloudflare release pipeline

- **Phase:** 5
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** Production uses Cloudflare Workers; README and vercel.json describe a separate Vercel path. Fresh audit build attempts were blocked by sandbox permissions in a copied checkout; no fresh build pass is claimed. Deployment-to-Git provenance remains unverified.
- **Why it matters:** A healthy live page does not establish a repeatable, reversible release.
- **Dependencies:** H03, H06, H39, H40
- **Resolution:** Use Cloudflare as the recommended production baseline, document exact Node/build/preset/environment inputs, produce an isolated staging build, associate deploys with commit IDs and retain a tested rollback. Remove or clearly label alternate configs.
- **Definition of done:** Fresh install/build/test succeeds in clean CI, staging matches the intended commit, production release records its version and rollback is demonstrated without losing data.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H42 — Harden intake limits and perform a targeted security/dependency review

- **Phase:** 5
- **Priority:** High
- **Who needs to act:** You
- **Status:** In progress — staging concurrency, access controls and hourly retention schedule accepted
- **Current gap:** Local atomic intake, restricted cleanup and hourly Nitro task `prune-lead-attempts` (`0 * * * *`) calling `prune_lead_submission_attempts()` implemented and verified; staging SQL concurrency passes. Live session expiry/logout acceptance and remaining tooling advisory assessment are pending.
- **Why it matters:** Concurrent abuse, excess retained data or overlooked secrets can survive ordinary happy-path tests.
- **Dependencies:** H06, H07, H27
- **Resolution:** Make idempotency/rate limits robust under concurrency and trust only verified edge client-IP input. Schedule retention cleanup. Scan dependencies/secrets and inspect authentication bootstrap, role escalation, API payload limits and storage isolation.
- **Definition of done:** Parallel requests cannot bypass defined limits or create duplicate records; retention runs without traffic; exploitable dependency/secret findings are resolved or explicitly blocked from release.
- **Latest evidence (7 October):** See [dated enquiry acceptance](docs/enquiry-acceptance-2026-10-07.md). Local secure intake/permission fixes implemented; isolated staging schema applied; SQL concurrency passes. Real Auth/API passes all 11 checks; browser enquiry receipt and one stored row verified. Existing owner browser sign-in, dashboard/Leads/full message retrieval pass; live session expiry remains untested. Founder agreed canonical GitHub/Cloudflare/THG Agency plan and approved exact database cutover, now applied. Matching code deployed; latest manually verified Worker 9d3bfd74; labelled live browser contact saves exactly one enquiry. Notifications disabled. Existing owner browser retrieval now passes; expiry/logout remains untested. Hourly attempt retention task scheduled in Nitro (`0 * * * *`) invoking `prune_lead_submission_attempts()`. See docs/evidence/live-owner-retrieval-2026-10-07.json.

## H43 — Add operational monitoring and prove recovery

- **Phase:** 5
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** Worker settings inspected have no tail consumers and no demonstrated application alerting. Live backend backup/restore, lead-receipt monitoring and incident ownership could not be verified.
- **Why it matters:** A silent outage could lose business for days, and source control alone does not recover customer data.
- **Dependencies:** H07, H09, H41
- **Resolution:** Monitor public uptime and actual lead-pipeline health, capture sanitized application errors and delivery failures, set named incident ownership, verify database/storage backups and rehearse restoration.
- **Definition of done:** A controlled failure produces an actionable alert; logs omit sensitive payloads; recovery rehearsal meets agreed tolerances and a short runbook identifies the owner.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H44 — Verify domain, email and account continuity

- **Phase:** 5
- **Priority:** Medium
- **Who needs to act:** Third party
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** Cloudflare confirms four active custom domains on the current worker and active zones. Registrar renewal, recovery contacts, MFA, DNSSEC, mail continuity and legacy-worker retirement are not fully verified.
- **Why it matters:** Working HTTPS today does not prove continued domain/email ownership or safe future changes.
- **Dependencies:** Me: account/renewal owner; H03, H28
- **Resolution:** Have account owners verify renewals, recovery access and MFA; audit actual DNS/mail records before any change; enable DNSSEC where supported after validation; retire legacy hosting only after traffic/dependency review.
- **Definition of done:** Both brands have documented account ownership and renewals; website and business email tests pass; no required records or recovery path depend on abandoned accounts.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H45 — Make cache updates predictable without expanding PWA scope

- **Phase:** 5
- **Priority:** Low
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** The service worker already uses network-first HTML and bypasses sensitive routes, which is worth keeping. Long immutable caching of unversioned image paths can nevertheless retain replaced artwork.
- **Why it matters:** A deployment can appear inconsistent on returning devices.
- **Dependencies:** H16, H41
- **Resolution:** Use versioned asset URLs or appropriate cache lifetimes for mutable files; exercise update/offline behaviour and keep private responses out of caches. Do not add offline features for launch.
- **Definition of done:** A returning installed/browser client receives the new release and images; offline errors are honest; no authenticated/customer response is cached publicly.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H46 — Complete real cross-browser and customer-journey acceptance testing

- **Phase:** 6
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** The audit fetched 57 route/domain variants successfully and found no failures in 199 further internal link/asset HEAD checks. That verifies reachability, not form persistence, browser diversity or payment/approval correctness.
- **Why it matters:** The remaining launch risk lies in interactions and state transitions rather than missing HTML files.
- **Dependencies:** All retained launch items H04–H45 as applicable
- **Resolution:** Run desktop Chrome/Edge/Safari and mobile iOS/Android checks; complete both brand enquiries, staff retrieval, proposal/onboarding and retained client flows in staging. Cover errors, slow network, refresh, back navigation, links/fragments and real 404s.
- **Definition of done:** A dated evidence matrix records pass/fail and known deferrals; no Critical/High defect remains in a public launch journey; one controlled production smoke test passes after release.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H47 — Replace stale completion claims with operating documentation

- **13 October 2026 review publication:** HDW wordmark review branch pushed; initial remote/local head verified at `4000ea1`; [draft PR #27](https://github.com/SkyPilot24/harley-digital-works/pull/27). Internal shared Brand Assets link recorded in brand guidance/handover. Main integration, CI, merge and production/live acceptance remain pending.

- **13 October 2026 wordmark evidence:** approved navy/ivory HDW identity implemented locally on `codex/hdw-wordmark-2026-10-13` (`172b576`); current HDW logos/icons/social preview and public brand guide updated, stale guidance reconciled. Build/typecheck/format and 136 tests PASS; lint 9 existing warnings; nine responsive route-width checks PASS. See docs/HANDOVER.md and docs/evidence/brand-2026-10-13. No publication/live acceptance; wider task remains open.

- **11 October 2026 PR #8 evidence:** resolved workflow/strategy conflicts by merging main `e90da3b` into `copilot/fix-failing-github-actions-job`; fresh build, 136 checks, typecheck and formatting PASS. See `docs/HANDOVER.md`; remote checks and release remain separate.

- **Phase:** 6
- **Priority:** Medium
- **Who needs to act:** You
- **Status:** In progress / partially resolved
- **Current gap:** tasks.md marks broad work complete despite simulated features. README, diagnostics route inventory and older plans do not match current hosting and public scope; the referenced project-context skill was not found.
- **Why it matters:** Future contributors can inadvertently restore broken flows or mistake prototypes for delivered functionality.
- **Dependencies:** H03, H41, H46
- **Resolution:** Update setup/env instructions, architecture, data flow, route inventory, deferred-feature list, release/rollback, lead handling, support and content approval guidance. Mark evidence and dates rather than checking off file creation.
- **Definition of done:** A new maintainer can reproduce a build and handle a lead/incident using the docs; every completed task links to acceptance evidence; prototype status is explicit.
- **Latest evidence:** Business OS central hub and current documents established. Production release inventory and remaining technical runbook validation still outstanding.

## H48 — Approve factual content and the first production release scope

- **Phase:** 6
- **Priority:** High
- **Who needs to act:** Me
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** Business decisions, private credentials and permission to make project changes cannot be inferred from an audit request. The user has expressly requested no implementation yet.
- **Why it matters:** Launch ownership and commercial commitments must stay with the business.
- **Dependencies:** H01, H02; review this audit; later H46
- **Resolution:** Approve the offer/fact sheet and focused launch scope, identify the required backend/provider account owners, then authorize implementation. Final approval should review the staged result and concise unresolved-risk list, not raw technical detail.
- **Definition of done:** Written scope/offer approval exists and the staged site meets its acceptance checklist; launch timing and operational ownership are agreed.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## H49 — Establish verified domain commerce; defer speculative platform expansion

- **Phase:** 1–3
- **Priority:** High — minimum commercial capability; later automation demand-gated
- **Who needs to act:** You + Me
- **Status:** Open — roadmap revised 2 October; no implementation or transaction completion implied
- **Current gap:** The 28 September audit found static Domain OS portfolio/guide data and an enquiry-only public domain journey. Verified ownership, costs, offers, transfer and settlement are not demonstrated.
- **Why it matters:** Domains are an established founder capability and a significant requested revenue stream; blanket deferral understates their commercial role.
- **Dependencies:** D01/D02 before named listings; H07/H08/H09 before integrated live capture. H44 for domain continuity.
- **Resolution:** Run domain trading and brokerage as a separately measured commercial workstream marketed through Harley Digital Works. Launch verified inventory, assisted enquiries/offers and a costed transfer/settlement process. Reuse the central CRM, finance and hosting. Defer custom checkout, speculative acquisitions, autonomous valuations, separate brand/site and external Domain OS SaaS until evidence justifies them.
- **Definition of done:** Every advertised name has verified ownership or mandate and an approved price/offer route; a test enquiry persists and reaches an authorised operator; renewals have accountable owners; any actual sale has settlement/transfer/delisting evidence and a realised contribution record.
- **Latest evidence:** 10 October review in `docs/DOMAIN_COMMERCIAL_REVIEW_2026-10-10.md` and 45-row reference CSV `docs/DOMAIN_PORTFOLIO_AUDIT_2026-10-10.csv` confirms preferred HDW workstream under THG. 29 current roster entries reconciled to saved page; 15 additional historical names plus operational HDW .com identified. Full 60-name claim, title/mandates, renewals/costs, traffic and sale state remain unverified. Low-confidence prices/scenarios are proposals; first five prioritised after authority/rights checks. No listings, account changes, sales or live domain database implemented. D01/H49 remain open; core pilot gates remain in force.

## H50 — Run one controlled pilot before scaling acquisition

- **12 October sandbox execution:** authentication resolved; The Harley Group sandbox livemode=false. Fictional hosted deposit £747.50 confirmed Checkout paid and PaymentIntent succeeded through provider readback (`docs/evidence/stripe-sandbox-deposit-2026-10-12.json`). Zero real revenue; zero registered sandbox webhook endpoints. App receipt persistence/signature/replay/failure tests, balance/subscription and delivery remain open. Next: isolated application receiver and secure sandbox configuration. H50 not completed; no live billing/deployment.

- **12 October rehearsal preparation:** ten-step first-client evidence matrix, fictional fixture and internal proposal skeleton in `docs/FIRST_CLIENT_REHEARSAL_2026-10-12.md` and companions. Existing revenue checks freshly pass 32/32; no provider/client lifecycle run. Stripe account discovery repeats authentication prompt and returns no verified sandbox. RED gate: payment/onboarding/approval/care/recovery not accepted. Next: verify existing isolated Stripe sandbox, then hosted-payment/receipt path. No client contacted, payment collected, launch or H50 completion.

- **11 October preparation:** first 50 business candidates and ten desk assessments prepared; P01–P03 are the initial qualification queue. No prospects contacted, client won, payment verified or pilot delivered. Session/email/backup fulfilment gates remain open. See `docs/BRISTOL_BATH_PILOT_RESEARCH_2026-10-11.md`; H50 stays open.

- **Phase:** 6
- **Priority:** High
- **Who needs to act:** You
- **Status:** Open — acceptance not yet demonstrated
- **Current gap:** The accessible plans and current source do not demonstrate a full verified enquiry → agreement/payment → approved site → recurring care lifecycle.
- **Why it matters:** The business model needs operational proof, not more dashboards.
- **Dependencies:** H19–H25, H36, H43, H46, H48
- **Resolution:** Use an authorized pilot client or realistic internal test: capture brief, agree scope, collect/verify payment, obtain factual assets, build and QA, record exact-version approval, launch, reconcile and process one care request.
- **Definition of done:** One evidence-backed lifecycle is complete, unit effort/costs are recorded, support is owned, and scaling is based on collected revenue and capacity.
- **Latest evidence:** See original audit evidence; no subsequent completion verified.

## Domain workstream integration — 2 October 2026

This section modifies the existing commercial roadmap. It does not mark source code, deployment, purchases, customer messaging or billing complete. Current setup/build plus monthly direction is retained. All new price anchors, acquisition budgets, targets and brand triggers are proposals, not approved terms.

### Amendments to existing tasks

| Task    | Required domain scope                                                                                                                                   |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| H01     | Separate inventory price, brokerage/acquisition fees, renewal charges, authority and ownership from Managed setup/monthly terms.                        |
| H08/H09 | Shared validated intake must preserve domain, offer/currency, service intent and optional website interest; persist before notification.                |
| H11/H12 | Visible Domains service/catalogue under HDW; parent explains domain capability without another launch website.                                          |
| H22/H25 | Domain opportunities link to website opportunities and actual subscriptions; realised contribution, brokerage fees and pass-through costs are separate. |
| H23/H24 | Assisted settlement with verified provider states; hosted service-fee billing where suitable. No custom domain checkout in MVP.                         |
| H28/H29 | Canonical catalogue/landing pages; substantive unique content; no stale sold listings or mass indexable filter pages.                                   |
| H44     | Reconcile trading and client domains, registrars, expiry, renewal billing, recovery and safe DNS continuity.                                            |
| H49     | Verified domain commerce now; advanced platform and speculative buying remain gated.                                                                    |
| H50     | Website paid pilot remains critical. Domain journey tested separately; do not require a successful domain sale before website launch.                   |

### New domain task definitions

| ID  | Priority / owner                              | Task                                                                                                                                 | Dependencies                               | Acceptance evidence                                                                                                                                                    |
| --- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D01 | High / Me supplies records; You reconciles    | Inventory, ownership/mandates, costs, renewal exposure, asking/floor and buyer thesis; select best 10–20 saleable names if available | Registrar exports and transaction evidence | Every proposed listing has authority; held, client and brokered domains distinguished; costs/expiry verified and sample records excluded                               |
| D02 | High / Me commercial; You drafts              | Costed domain-only, acquisition, brokerage, valuation and management scope; mandates, fees, ownership and renewal terms              | H01/H02, D01 for inventory pricing         | Reviewable offer sheet and mandate templates; approved fields separated from proposals; no automatic premium-domain inclusion                                          |
| D03 | High / You                                    | Extend existing Domains routes and reusable catalogue/detail template; simple search/filter only as useful                           | H03/H11/H28/H29, D01/D02                   | Approved named listings, factual use cases, public prices/offer CTAs; private floors/costs remain private; mobile and keyboard flow works                              |
| D04 | High / You                                    | Shared intake and offer records linked to CRM; optional website need; private negotiation history and next action                    | H07/H08/H09, D01/D02                       | Duplicate request handled once; enquiry persists despite notification failure; authorised operator can retrieve; offer never silently accepts a deal                   |
| D05 | High / Me negotiation/authority; You workflow | Assisted agreement, settlement, transfer readiness, confirmation and delisting                                                       | D02/D04, H23/H24/H44                       | Process tested; real sale only complete with provider/transfer evidence; one binding deal per name; listing channels paused/delisted; no screenshot-only payment proof |
| D06 | Medium / You + Me renew/drop                  | Renewal alerts and registrar/listing reconciliation; 60/30/14/7-day reminders and exception escalation                               | D01/H43/H44                                | Reminder delivery demonstrated; stale data flagged; owner records renewal/drop decision; no autonomous renewal cancellation or purchasing                              |
| D07 | Medium / You; Me validates economics          | Domain contribution, time, portfolio ageing, offer conversion and website/service attachment                                         | D04/D05/H22/H25                            | Cost-basis/fees/labour captured; brokerage revenue is service fee; one-offs excluded from MRR; linked subscriptions not counted twice                                  |
| D08 | Later / Me decision; You evidence             | Review Harley Domains brand and developed-asset/product opportunities                                                                | D07 and observed demand                    | Brand contribution covers added costs; distinct buyer need evidenced; one developed-asset case costed; no external SaaS build without paying-user evidence             |

### Integrated 30/60/90-day delivery order

- **Days 1–30:** H01–H10 critical readiness and credible core release continue. D01/D02 progress independently while account access is resolved; D03/D04 launch when intake and listing evidence pass. Progress one controlled website pilot. Renewal checks must not wait for a full dashboard.
- **Days 31–60:** Deliver and cost up to three paid website pilots as capacity permits; verify recurring collection. D05 assisted settlement runs when a real buyer exists; D06 adds reconciliation and reminders; pilot selective acquisition/valuation services.
- **Days 61–90:** Improve reliable recurring service and proven acquisition. D07 reports realised domain contribution and cross-sell. D08 reviews brand/development gates; automate only measured bottlenecks.
- **Deprioritised:** instant AI valuation, bulk speculative buying, registrar replication, lease-to-own, custom checkout, mass SEO pages, separate Harley Domains site, external Domain OS SaaS and parallel broad product/channel expansion.
- **Effort:** additional domain MVP 20–32 focused hours assuming existing app reuse and accessible inventory; core backend/payment readiness excluded. Later automation 12–20 hours if needed. Initial domain administration 1–2 hours/week plus negotiations; actual founder capacity remains unconfirmed.
- **Operating allocation:** proposed starting envelope is two domain hours per ten available weekly hours; protect core delivery. Reallocate using realised contribution/hour and qualified demand; do not impose historical ten-domain pilot caps on an established portfolio without reviewing it.
- **Brand review trigger (proposal):** three consecutive months with ten qualified domain enquiries/month or three substantial active mandates; contribution covers extra brand costs with a buffer; buyer evidence supports a specialist identity. Keep one backend regardless.

### Immediate priorities

1. D01 — verify portfolio and identify existing sale opportunities/carrying costs (3–5 hours plus evidence gathering).
2. D03/D04 with H08/H09 — publish curated domain journeys and capture offers reliably (10–16 hours after core readiness).
3. D02/D05 — define costed mandates and prove assisted settlement with optional Managed attachment (7–11 hours excluding negotiation).

Source: The Harley Group integrated commercial review, 2 October 2026; current business definition/status and master backlog, updated 28 September; September production audit; historical 9 September operating plan; retrieved earlier brand/domain discussions. No inventory-specific valuations or sales forecasts can be established without registrar and transaction records.

## Portfolio baseline clarification — 2 October 2026

The founder confirms the existing domain list is unchanged. D01 must reuse the existing roster rather than request a replacement list. The saved September 28 /domains page contains 29 rendered entries; September 9 module notes describe 60. Reconcile current source/historical records for any other entries; do not assume 29 is the total. Existing catalogue and admin work must be extended rather than recreated. Costs, expiry, ownership/mandates and current sale status are enrichment/verification fields, not grounds to treat the domain list as absent. Sources: saved page https://drive.google.com/file/d/1bVjpk9r5cTned9kB349fV1rghctRF8ud/view?usp=drivesdk and module notes https://drive.google.com/file/d/1gjIaB6A4k0iEqIQatBAbPRmf8DhbPmJs/view?usp=drivesdk .

## Shared context setup — 2 October 2026

Repository business definition, status, this backlog, AGENTS.md and docs/HANDOVER.md provide a common record for both development tools. Antigravity has an always-on pointer in .agents/rules/shared-context.md; existing rules and runbooks are retained. This is documentation work, not completion of backend, billing or domain implementation.

Next execution: H07 — reconcile the intended backend and inspect access/policies; D01 — reuse and verify the existing portfolio in parallel. H01 commercial approval remains outstanding. Check PROJECT_STATUS.md before acting on older account-access or unpushed-commit statements.

H42 evidence — 9 October 2026: Secret & Credential Scan self-match repaired on codex/security-scan-fix; no secret exception. Quiet fail-closed scan covers all tracked files. Local clean scan and six synthetic checks pass; GitHub Security Audit 37923833877 and Quality 37923834004 passed for 1ed96ff; PR #22 open. Separate dependency-upgrade CI failures remain; see handover.
