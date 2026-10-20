# Inbound rehearsal results — 17 October 2026

## Latest: real browser and committed staging rehearsal — PASS within stated scope

Preservation update: authored assessment/plan/results/configuration documents, redacted evidence and isolated additive checkpoints committed locally as `82c96c0d4ae0ea59044b8ce24d3f6b58aa817380` on `codex/inbound-rehearsal-2026-10-17`; not pushed. Original peer/Manus work and private configuration excluded. Isolated generated route-tree line-ending residue has no textual diff and remains uncommitted. Local app stopped; port 4187 confirmed closed. Earlier uncommitted/blocking statements below describe prior checkpoints.

After Robbie supplied the private staging key locally and authorised continuation, the isolated worktree at `C:\Users\drrob\.codex\worktrees\inbound-staging-config\harley-digital-works` reused the original installed dependencies via junction; no package install/update. Source remains `af5ae9c`. All nine config checks and server-key HEAD probe passed. This checkpoint supersedes the earlier local-configuration/browser block below.

Containment: existing Cloudflare login read-only metadata showed two Workers: `skypilot24-harley-digital-works` targets production (lead notifications true, email false), while `skypilot24-thgdigital` has no SUPABASE_URL binding; no Worker targets staging. Old staging Worker `hdw-h50-01a139f2` returns not found. Earlier staging metadata found no cron schema and only database outbox insertion/update triggers on leads. Local six flags remain false; process fetch guard permits only staging/localhost and browser blocks other destinations. No settings or providers changed. This verifies the recorded deployment account boundary, not every hypothetical consumer outside that account.

**Nine checks PASS**, actual retained fixture followed by exact cleanup:

1. Empty rendered public enquiry form blocks submission.
2. Rendered `/contact` made a real server-function POST (HTTP 200), displayed the received screen, and independently read back one staging `new` lead with exact message/source.
3. Same-input browser retry displayed receipt and retained one lead plus one pending zero-attempt notification job.
4. Signed-out `/admin/leads` browser redirected to sign-in.
5. Actual anonymous Data API read denied (401/403 accepted).
6. Manual qualification, named owner and next action due 18 October 10:00 UK saved and independently read back.
7. Simulated follow-up completion and replacement action due 19 October 10:00 UK saved/read back. No contact occurred.
8. Actual `ensureClientWorkspace` helper through staging storage adapter: retry returns one same-ID client with status lead and monthly value zero.
9. One fictional discovery project independently read back linked to that client; no agreement/deposit/build authority asserted.

**Verification limits:** steps 6–9 used service API for data writes/readback, not an authenticated owner browser. No fresh ordinary signed-in user acceptance; no new Auth accounts/role grants. No email/Slack delivery, actual customer follow-up, payment or paid-client acceptance. Manual notes have no automatic reminder/overdue queue. Existing public onboarding remains excluded and production project-schema/release/commercial gates remain separate. No application correction was needed or made.

Initial managed-process lifetime issue prevented the first browser connection; next attempt timed out waiting for success. Both had zero fixture cleanup. Diagnostic retry showed received screen, server HTTP 200 and no browser errors; the final scoped continuation read back that fixture, passed duplicate/handoff checks and cleaned it. These initial harness failures do not establish an unresolved product defect and are retained in the evidence limitations.

[Machine-readable evidence](evidence/inbound-browser-rehearsal-2026-10-17.json) records nine checks, timestamps and zero cleanup counts for fixture leads/jobs/clients/projects/owned rate attempts. Separate Supabase connector readback at **21:50:55 UTC / 22:50:55 UK** independently confirmed zero fixture leads/clients/projects/jobs. Exact cleanup did not touch prior staging rows. No production write, migration, provider send, dependency install or deployment. Local runtime shutdown verified separately in the completion checkpoint.

**Next decision:** use the existing inbound desk with explicitly manual owner/dated-next-action handling for the bounded pilot; complete owner-browser acceptance and either specifically authorised real alert delivery or an accepted manual checking cadence before live activation. Automated outbound/H37 completion is not an inbound prerequisite. Reuse saved work and retain commercial/payment/release gates; this is not a paid-pilot completion claim.

**PARTIAL PASS: existing staging database supports the core journey; browser/durable end-to-end acceptance remains blocked.** H08/H09/H19–H24/H50. Source main `af5ae9c2c3896ced4a078f7edde7896205a62a57` plus observed peer edits. Target only `mfpnfxpgkfuqtedbcxvp`, verified through THG Supabase connector. See [plan](INBOUND_PILOT_REHEARSAL_PLAN_2026-10-17.md) and [assessment](LEAD_JOURNEY_ASSESSMENT_2026-10-17.md).

Robbie authorised starting the bounded fictional staging rehearsal, exact fixture cleanup and necessary local reversible fixes, with no production writes, real contact/notifications, new permissions, secret changes, installations, migrations, deployment or outbound activation. That narrower execution instruction overrides the earlier plan's proposed temporary actor/role creation: none was created or granted.

## Executed evidence

| Check | Result | Exact boundary |
|---|---|---|
| Target and clean fixture baseline | PASS | Existing staging schema/RPC/trigger verified; named fixture absent before testing. No migration required. |
| Local app configuration | BLOCKED | `node scripts/check-staging-config.mjs` found mismatched staging targets, no server secret and no explicit disabled outbound flags. No values printed or files changed. Existing config was not used to run the app. |
| Actual staging intake/outbox | PASS within rollback-only transaction | Existing `submit_public_lead` called twice under existing service_role for identical fictional payload; final readback showed one lead, one pending zero-attempt job and two rate-attempt rows. Transaction rolled back. No committed fixture or externally visible notification job. SQL RPC path only, not HTTP/server form. |
| Manual qualification/follow-up fields | PASS within rollback-only transaction | Existing notes stored named manual owner, qualification unknowns, action due 18 October 10:00 UK (UTC+01), simulated completion and next action due 19 October 10:00 UK. Readback boolean true. No actual follow-up message or reminder. |
| Client/project data linkage | PASS within rollback-only transaction | One same-ID client remained after repeated insert with conflict protection, status `lead`, monthly value zero; one linked `discovery` project with rehearsal/no-agreement/deposit wording. Readback counts 1/1. SQL data-shape walkthrough under service role, not invocation of UI/helper or admin Auth/RLS proof. Rolled back. |
| Direct intake RPC grants | PASS, metadata | `has_function_privilege` false for anon and authenticated. Not fresh real-session/Data API denial. |
| Focused local checks | PASS 62/62 | Intake result handling, actual local PGlite migration/security/outbox checks, mocked notification failure/recovery and workspace helper retry/concurrency/value checks. No provider network. Legacy fake-store anonymous-insert test is not current RLS evidence. |
| Final cleanup | PASS independent connection/readback | At 21:23:35 UTC (22:23:35 UK), exact fixture leads/jobs/clients/projects/rate-attempts all zero. No Auth actors/roles created. Port 4187 has no listener. |

Commands actually run: `node scripts/check-staging-config.mjs` (preflight failed, deliberately did not proceed with app); `node --experimental-strip-types --test scripts/intake-results.test.mjs scripts/lead-notifications.test.mjs scripts/revenue-readiness.test.mjs scripts/database-security.test.mjs` (62 PASS). `git diff --check` PASS. No code change/build or dependency installation necessary for database walkthrough.

Fixture: `FICTIONAL — HDW-INBOUND-20261017-A`, `hdw-inbound-20261017-a@example.invalid`. The intake test used normal DB-generated ID; the second rollback-only data-shape phase used explicit synthetic lead/client/project IDs. Final queries checked both exact marker/email and explicit IDs. No existing record was updated, deleted or claimed; no bulk notification claim function ran. No real user data read for this run.

## Review/connector limits

Automatic approval review rejected the initial transaction because it would commit the new lead before later exact cleanup. It stated that this left an unauthorised persistent staging record. No SQL ran for that rejected request. Execution changed to the safer rollback-only alternative; no attempt was made to commit or indirectly retain the fixture.

A longer combined rollback/Auth-role test request returned `Invalid or expired requestState`, so it has **no credited assertions**. Independent readback showed zero fixtures afterwards. Two smaller rollback-only SQL checks then returned the results above. No new permissions, admin identity impersonation or Auth-user provisioning occurred in the successful checks.

## What is still unproven and the smallest next step

Not proved: rendered public form → server handler → committed staging persistence → independent authenticated admin retrieval; real-session ordinary/anonymous denial; durable manual notes/workspace/project readback after commit; real notification delivery/retry; real agreement/deposit/onboarding. Rollback-only evidence is useful but cannot close these gates. No paid or won state was created. Current data structures need no demonstrated inbound schema fix. Do not add H37 as a prerequisite.

The blocking prerequisite for the browser rehearsal is a verified local runtime using the existing staging server access with outbound disabled and real notification containment. Existing `.env.local` is unsuitable and has no server secret. No credentials were requested, retrieved from a provider or changed. No frontend fix was attempted without a failing runtime reproduction. Under current authority, continue only if approved existing access becomes available without changing secrets/permissions; otherwise report that access prerequisite to Robbie rather than asking him to paste credentials. Real notification proof stays a separate gate or uses an explicitly accepted interim manual CRM check.

Next pilot decision: retain manual owner/dated-next-action handling for the first pilot, and finish the bounded browser/committed-readback rehearsal once the runtime access/containment prerequisite is satisfied. This does not require another approval for the already-authorised scope; changes to secrets, permissions, actual notification delivery or production release would be separate scope. Preserve/exclude the disconnected legacy public onboarding and satisfy existing project-schema/commercial/release gates before real customer use.

## Preserved state

All local Manus H37 files and peer changes remain in place. No application code fix, staging schema change, migration, production change, provider call, send, deployment, push or commit occurred. Commit deferred: the shared status/backlog/handover diffs contain overlapping pre-existing peer work; this run did not establish an isolated, reviewed commit combining those records safely. Assessment/plan/results and additive checkpoints are saved locally; no blanket staging or history rewrite. The preservation approach in the plan remains available for a later scoped change.
