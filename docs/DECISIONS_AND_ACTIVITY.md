# Decisions and activity — current reconciliation

## Local documentation reconciliation — 14 October 2026

Follow-up: commercial definition/offer now explicitly distinguish current pilot guard from disputed wider capacity, and flag tax/contract/fulfilment verification. Rehearsal now points to durable receipt acceptance; Slack guide labels the nine-channel design as proposed. Existing isolated receipt/session/outreach tests freshly pass 22/22. No new founder decision or external operation.

H47: reviewed current main `45012e4` and mirror outputs; added the [business documentation directory](README.md) and [dated review](LOCAL_DOCUMENTATION_REVIEW_2026-10-14.md). Local source includes wordmark #27, P01 outreach/audit #28 and P02 teardown. Older state/next-action paragraphs below are dated history. H50 runtime acceptance, commercial wording conflicts, automation delivery/timing and Drive reconciliation remain open. No new commercial decision, sending, production change or external file relocation. Organisation uses existing folders and links.

Updated 7 October 2026. Current direction: near end-to-end automation, managed by exception, with Robbie retaining oversight and quality review. Standard cases progress under approved rules after pilot validation. The Harley Group is the umbrella holding entity; Harley Digital Works delivers trade digital services; Harley Labs covers automation experiments and prototypes; domains remain an integrated measured workstream.

Current operational authority is the shared repository with existing Drive mirrors; sync is explicit at documented milestones. Core enquiry-to-owner bottleneck is resolved: live enquiries persist to THG Agency (`worzpzbutngugwzhlvtj`), genuine owner retrieval is verified, minute Slack outbox delivery is accepted (#all-the-harley-group), and hourly abuse retention pruning (`prune_lead_submission_attempts`) is scheduled. Sellable Managed commercial offer, unit economics, proposal automation rules, and the Dashboard General Knowledge Base are fully established.

Next actions: Outreach list curation and pilot template assembly for Bristol/Bath electrical contractors, coordinated live owner session expiry/logout acceptance (H42), transactional email sender/provider setup and bounce handling once credentials are ready (H09/H10; customer transactional email stays disabled), and backup/recovery proof for live THG Agency database (H07).

---

# Decisions and activity register

Owner: founder for commercial approval; assistant for implementation and documentation within authorised scope.

## Settled direction

- Setup/build fee plus ongoing monthly subscription (replaces earlier subscription-only or optional-setup proposals).
- Productised digital service for UK trades: Managed Digital Presence (£1,495 setup + £249/mo care).
- VAT Treatment: Operating below HMRC's £90k statutory threshold. All prices presented as zero-rated / VAT not applicable. No VAT is charged and no fake VAT numbers are generated.
- Concurrency Cap: Hard limit of 2–3 concurrent client onboarding builds to safeguard founder NHS commitments (10–12 hours/week).
- Operational architecture: Canonical GitHub main -> Cloudflare Workers edge SSR -> Supabase THG Agency (`worzpzbutngugwzhlvtj`).
- Outbox notifications: Native Cloudflare Worker minute cron with disjoint leases (`FOR UPDATE SKIP LOCKED`), 5-attempt backoff, and Slack delivery to `#all-the-harley-group`.
- Automated retention: Nitro hourly task (`0 * * * *`) invoking `prune_lead_submission_attempts()`.
- Acquisition must not depend on founder cold calling; requested sales meetings and inbound interest remain appropriate.
- Business OS is the central document and activity location. Code stays in Git and is linked here.

## Proposals awaiting decision (Founder Decision Register)

| ID  | Decision                                  | Ratified status & evidence                                                                                                                                | Owner / completed                   |
| --- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| D01 | Package price, scope and VAT presentation | **RESOLVED**: Core Revenue Engine: £1,495 setup (50/50 split £747.50) + £249/mo care. VAT zero-rated / not applicable below £90k.                         | Ratified by Robbie — 7 October 2026 |
| D02 | Payment/cancellation/licence terms        | **RESOLVED**: 50% deposit upfront, 50% on preview approval, monthly care from go-live, 30 days rolling notice, static export on exit.                     | Ratified by Robbie — 7 October 2026 |
| D03 | Business identity and support capacity    | **RESOLVED**: Harley Digital Works / The Harley Group; hard limit of 2 concurrent client onboarding builds to safeguard NHS commitments.                  | Ratified by Robbie — 7 October 2026 |
| D04 | Geographic & Niche positioning            | **RESOLVED**: UK-wide remote digital studio; initial pilot focused on established Electrical Contractors (2–8 staff) across Bristol/Bath / M4 corridor.   | Ratified by Robbie — 7 October 2026 |
| D05 | Accounts and backend ownership            | **RESOLVED**: SkyPilot24/harley-digital-works canonical; Cloudflare production; THG Agency (`worzpzbutngugwzhlvtj`) live; `mfpnfxpgkfuqtedbcxvp` staging. | Completed 7 October 2026            |
| D06 | Claims and customer assets                | **RESOLVED**: Use only verified trade accreditations (Gas Safe, NICEIC, FMB, CHAS); zero fabricated reviews, mock revenue, or fake VAT numbers.           | Completed 7 October 2026            |

---

## Activity log

| Date       | Activity                                  | Evidence/status                                                                                                                                                  | Next action                                                      |
| ---------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 2026-10-07 | Founder Commercial Ratification (H01/H02) | Robbie ratified commercial blueprint, pricing tiers (£1,495 + £249/mo), zero VAT presentation, 2-build cap, and Bristol/Bath electrical contractor pilot niche.  | Proceed with outreach list curation and pilot template assembly. |
| 2026-10-07 | Comprehensive Knowledge Base & Handover   | Unified operational knowledge base in `src/lib/knowledge-base.ts` & `/admin/knowledge-base`; all handover docs synchronized. 125/125 tests pass, 0 type errors.  | Proceed with outreach list curation and pilot template assembly. |
| 2026-10-07 | Sellable Managed Offer & Unit Economics   | Created `docs/COMMERCIAL_OFFER_MANAGED.md`: Low/Base/High economics (£722 upfront profit, £182/mo recurring profit), 4-item Decision Register, governance rules. | Founder ratification of pricing and entity status.               |
| 2026-10-07 | Hourly Attempt Retention Cleanup (H42)    | Implemented `server/tasks/prune-lead-attempts.ts` with `0 * * * *` scheduled Nitro task; Cloudflare Worker triggers verified.                                    | Coordinated session expiry/logout acceptance.                    |
| 2026-10-07 | Both-Brand Live Enquiry & Slack Delivery  | Verified live: both brands persist 6 fields; Slack delivered alerts to #all-the-harley-group (3/5 attempts acknowledged); native fetch wrapper deployed.         | Transactional email setup once credentials ready.                |
| 2026-10-07 | Live Target Cutover & Owner Sign-In       | Applied `thg_reviewed_live_enquiry_cutover` to THG Agency (`worzpzbutngugwzhlvtj`). Genuine owner sign-in and retrieval verified. Anonymous REST/RPC blocked.    | Backup/recovery test on live backend.                            |
| 2026-10-07 | Isolated Staging Security Acceptance      | Deployed migrations to `mfpnfxpgkfuqtedbcxvp`. Staging SQL concurrency: 1/12 duplicate leads saved, 5/12 attempts accepted. 11/11 Auth/API checks passed.        | Complete live release preflight.                                 |
| 2026-10-03 | Multi-Agent Governance & CI Optimization  | Created `.agents/rules/thg-handover-summary.md`; parallelized GitHub workflows; added service worker tests (94 tests passing).                                   | Resolve H07/H42 backend target bottleneck.                       |
| 2026-09-28 | Whole-Project Production Audit            | 50 audit tasks; 57 routes inspected and 199 internal HEAD checks reported without failures.                                                                      | Execute prioritised backlog.                                     |
| 2026-09-28 | Revenue Launch Safeguards & CRM Integrity | Local commits 843f0d8 and 410eece; enquiry/email gates, prototype routing, and 75 tests passing.                                                                 | Live integration and release verification.                       |

---

## Maintenance rule

After each material milestone update PROJECT_STATUS, this activity log, docs/HANDOVER.md, and the Dashboard General Knowledge Base (`src/lib/knowledge-base.ts`). Record local implementation, deployed verification, and business results separately. Record the actual release commit and date only after deployment verification. Keep one current copy of each governing document; label older plans as reference. Store secrets in an approved secret manager, never in this hub. Do not duplicate prospect/customer personal data into general planning documents.
