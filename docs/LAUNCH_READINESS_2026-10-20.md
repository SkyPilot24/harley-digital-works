# Historical HDW launch-readiness assessment — 20 October 2026

> **Superseded work selection:** Robbie subsequently confirmed the deployed-revision check and production backup/restore rehearsal were completed on 19 October. Credit both as founder-confirmed completion; do not repeat them because this local checkout lacks provider access or artifacts. The UNKNOWN results below describe what this session independently observed before that confirmation. The earlier NO-GO recommendation and priority list are historical, not a fresh conclusion from the complete updated state. Use [the active delivery plan](CURRENT_DELIVERY_PLAN_2026-10-20.md) and [completion reconciliation](TASK_COMPLETION_RECONCILIATION_2026-10-20.md) for current work selection.

Status: **NO-GO for a paying pilot on available evidence. Preparation can continue.**

Source checkout: `/workspace/harley-digital-works`, branch `work`, revision `0845172c455b756a0a6eb24af1e7b56d78c348e9`; initially clean. Founder requested continuation of the 20 October briefing: production revision check, migration/recovery preparation and first-customer operating decisions. This is a local preparation record, not release or billing authority. No application, production, database, customer or provider configuration changes were performed.

## Fresh evidence and limits

| Criterion | Result | Evidence / limit |
| --- | --- | --- |
| Public homepage and contact availability | PASS | curl GETs at 11:39 UTC / 12:39 BST returned 200 for `/` and `/contact`. Availability only; no form submission. |
| Public sign-in availability | PASS | `/auth` returned 307 to `/auth?redirect=%2Fadmin`; following the redirect returned 200 after one redirect. No login or protected access acceptance. |
| Exact deployed security revision | UNKNOWN | Public responses expose no observed commit identifier. No Cloudflare credentials or callable provider connector available. |
| Current remote GitHub main / CI | UNKNOWN | `git ls-remote origin refs/heads/main` failed because HTTPS authentication was unavailable. Local HEAD includes merge PR #42; it does not establish today's remote or deployed state. |
| Local migration review tests | PASS | Fresh `node --test scripts/project-schema-review.test.mjs`: 6 passed, 0 failed. Covers FK rebind/rerun, project admin/ordinary/anonymous boundaries, occupied-legacy rollback, unexpected/missing dependency rollback and independent synthetic restore. |
| Dependency installation matches release lockfile | FAIL | Installed react-start 1.168.27 and start-server-core 1.169.16; committed lockfile specifies 1.169.3 and 1.169.44 respectively. No full build/audit claim from this stale installation. Focused PGlite tests do not exercise TanStack. |
| Production migration / real Auth and task API matrix | UNKNOWN | No Supabase management/database credentials or connector available. Historical 17 October staging is not production-shaped: task dependency absent. No remote SQL executed. |
| Recoverable production backup and isolated restore | UNKNOWN | Supabase CLI, pg_dump and pg_restore unavailable in command path. Six local tests use synthetic in-memory PGlite recovery; this does not close the provider backup gate. |
| Paying-customer operating gates | UNKNOWN | Seller reconciliation, selected billing route, sold channels, support/recovery and restricted intake evidence still required below. |

Initial Python HTTP requests returned 403; curl GETs succeeded. Do not report the initial client-specific failure as a site outage. Redacted public response evidence is in `evidence/launch-readiness-2026-10-20.json`.

Fresh original SQL SHA-256 is `9c5e63bd2275f6429580fa4f6d65bd6050706186a1d8511dabe36c909a84c22b`; CRLF reconstruction matches its historical Windows hash. Fresh review-draft SHA-256 is `5f57f3223d961ccf5eec51e050934cc47b6d3b3a5e4008f327085dd0e31405dc`; neither its current bytes nor CRLF reconstruction matches the historical draft hash. Treat that draft manifest as stale/unreconciled, not an approval for today's bytes. The six fresh tests apply to the current draft only; final packaging must review and pin the actual generated file.

The existing GitHub deploy workflow can skip deployment when its token is absent. A merge or successful workflow alone does not prove deployment. Use the existing authoritative publisher; do not introduce a second deploy path.

## Superseded technical plan

The list below is retained to explain the earlier assessment. Items 1 and 6 were completed on 19 October according to founder confirmation and must not be rerun. Use the active delivery plan to reconcile their existing records and determine whether the separate migration/API items remain open.

1. **Production identity:** an authorised operator reads the existing Cloudflare Worker's active immutable version, associated source/build identity, release time and rollback target. Reconcile against PR #42 and remote main/CI. Capture metadata without secret values. If source mapping is absent, mark it unknown and reconcile build records before release claims.
2. **Clean source verification:** use an isolated checkout and lockfile installation for the intended source, then its existing audit, governance, typecheck, lint, format, tests, build and artifact scan. Do not reuse this checkout's stale node_modules or deploy its local artifacts. Preserve the historical 18 October checks as historical evidence.
3. **Migration packaging:** keep the original `20261015140000_reconcile_projects_schema.sql` on HOLD. Keep the corrected SQL review-only; do not rename it into an executable migration by hand. With a supported CLI, generate the reviewed version and reconcile migration-history/order against both targets. Never bulk replay pending migrations. Pin the exact final bytes and access boundary for review.
4. **Representative rehearsal:** use a separately isolated Supabase target with the expected clients, legacy projects, project_tasks FK, role helper, grants and policies. Preserve the existing shared staging client. Capture the preflight schema/counts; abort on occupied legacy data or unexpected constraints. Apply the exact generated package only within the rehearsal target's authority.
5. **Real API acceptance:** use explicitly authorised synthetic actors and rows. Test admin project/task create, read, edit and delete, relationship integrity, expected cascade, ordinary/anonymous denials and rerun behaviour. Exercise actual Auth/PostgREST, not only service-role SQL. Capture the project_tasks access matrix as well as projects; no new grants merely to pass. Prevent outbound sends and clean only manifested fixtures.
6. **Recovery proof:** capture a recoverable pre-change backup containing the required schema/data/ownership/grants/policies/triggers/dependencies into a verified restricted destination. Record source revision/schema, UTC time, owner, artifact size and SHA-256 outside any secret-bearing output. Restore into a separately authorised isolated destination; compare counts, joined data, FK targets, policy/grant matrix and application reads. Measure elapsed recovery and state what data-loss interval is actually covered. Metadata snapshots and synthetic dumps are insufficient.
7. **Reviewable execution package:** attach exact source SHA, generated migration/version/hash, target IDs, clean checks, real API results, restricted backup locator/hash, restore result, safe patched fallback, stop conditions and operator/window. Reconcile earlier approval scope before requesting anything new. Production execution and paid admission remain separate gates.

No measured recovery objective is approved by this document. If new rows appear before a window, stop and prepare a preserving map; never drop/overwrite customer rows to reproduce the empty historical state. After schema commit, application rollback alone does not reverse the schema.

## First-customer decision and evidence sheet

Existing core prices stay £1,495 setup, £747.50 deposit and balance, £249/month from agreed go-live; three pilot customers total and two concurrent builds. No reapproval of those settled decisions is requested.

| Item | Existing evidence / recommendation | Needed to close |
| --- | --- | --- |
| Seller and invoice identity | Owner supplied Harley DigitalWorks Ltd and not-VAT-registered status on 14 October. Official company-number reconciliation remains unresolved. | Official company entry/full number and consistent seller/payee/invoice details. Do not restate non-registration as zero-rated VAT. Keep personal/address evidence in the existing restricted record. |
| Billing route | Recommend existing provider-hosted invoicing/checkout with documented manual reconciliation for the pilot, if approved. This is a bounded pilot bridge; target remains managed-by-exception automation. | Select existing provider/account and verify seller identity, agreement linkage, authentic deposit/balance receipts, care start, failure/refund/cancellation handling. No new live charge or subscription created. |
| Sold enquiry channels | Offer records disagree between customer SMS/email and internal Slack/email. Slack transport acceptance proves neither customer SMS nor full live outbox delivery. | Confirm the existing sold scope or explicitly approve a scoped amendment; prove each promised channel and failure handling before customer issue. |
| Response and support cover | No fallback enquiry-check cadence established in available records. | Named responder/cover, business hours, enquiry cadence, escalation and deliverable support targets. Record these as operational rules, not invented appointments. |
| Recovery commitments | No provider restore evidence or agreed recovery/data-loss objectives established. | Measured isolated restore, approved targets and accountable incident owner. Do not promise daily backups from a written offer alone. |
| Restricted assets and terms | Earlier sharing finding remains unverified; cancellation/export/support wording still requires customer-use reconciliation. | Restricted destination and actual access readback, credential intake method, final customer-use terms and scope, and missing-input hold. No secrets or customer assets in Git. |

The founder replied that this project is run for and by him and asked what “seller” means. Clarified that this means the invoice/agreement issuer, personally or through a company, and that the company entry came from existing records. That reply does not select or verify a legal entity, billing account or support arrangement. Keep the entry unresolved without inferring a company requirement or repeating settled approvals.

## Superseded priority order

Do not execute this list. It predates the founder's completion confirmation. The current priorities are in [the active delivery plan](CURRENT_DELIVERY_PLAN_2026-10-20.md).

1. Verify the active production source identity through the existing Cloudflare/GitHub access path. Owner: engineering/operator. Dependency: read-only provider/GitHub access.
2. Complete the representative migration/API and recoverable backup/restore package. Owner: engineering/operations. Dependency: supported tooling, restricted backup destination and isolated target access.
3. Close the operating sheet above and run only the remaining same-release customer-journey acceptance once its prerequisites and exact authority are established. Owner: Robbie plus engineering/operations.

Harley Labs: no fresh runtime evidence collected; defer new experiment work while these HDW gates remain open. No new dashboard, acquisition automation or billing platform is needed to prepare this gate.

Progress: public checks and focused local tests completed; plan and decision sheet prepared locally. No commit, push, merge, deploy, remote schema apply, external message, spend or payment performed. Provider access and founder facts are the remaining dependencies; this report is not a claim of a completed production audit.
