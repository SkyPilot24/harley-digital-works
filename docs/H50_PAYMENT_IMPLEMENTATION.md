# H50 payment implementation — 12 October 2026

**Current status:** use [H50_READINESS_GATES.md](H50_READINESS_GATES.md) for the consolidated acceptance assessment. Notes below are chronological and some describe superseded limitations. In particular the private staging key is configured, actual Auth and application HTTP approval have been tested, and later migrations are applied to staging only. Production remains RED.

Branch `codex/first-client-production`, isolated managed checkout at `C:/Users/drrob/.codex/worktrees/first-client-production/harley-digital-works`, baseline e90da3bc6f8c8892c939ecbc3a360916b6e71462. Existing canonical main research/docs preserved.

## Production gate: RED — incomplete workflow

### Staging configuration preflight

`npm run check:staging` now reports only pass/missing labels, never credentials. It checks exact isolated project URLs, browser/server public-key agreement and disabled outbound settings, but does not authenticate key ownership or prove runtime readiness. Enabled modern publishable key obtained through the verified THG connector and filled only the previously blank public slots in ignored .env.local. Private server key remains blank. Current check fails solely on that missing field. No secret obtained or printed and no feature enabled.

Corrected Git ignore exception so the credential-free .env.staging.example template is reviewable; .env.local remains ignored. Syntax check and expected incomplete preflight verified. Earlier instructions requiring the owner to fill public fields are superseded: only SUPABASE_SERVICE_ROLE_KEY still needs private configuration. Actual sessions/provider/recovery and production acceptance remain open.

### Refund and dispute receipt health

Signed receiver now persists charge.refunded and charge.dispute.created/updated/closed after the same raw signature/environment validation. Stores minimal financial identifiers/status/amount/time only, not customer details. Events may precede checkout receipts; event-ID replay is idempotent and conflicting reuse rejected. Storage failures return retryable 503. Refund history blocks launch; latest provider-time dispute state controls holds. Older dispute delivery cannot undo a later resolution; same-second contradictory statuses conservatively retain a hold.

Source 20261012105638 applied only to staging as 20261012110113. Minimal service-only append-only financial event table and launch-health trigger. Missing payment-intent references are retained; unresolved live events conservatively hold release until reconciliation. Seven processor plus six launch/financial database tests pass together (13); full npm test, typecheck, targeted lint and build pass. Rollback-only actual staging event showed sandbox hold=true and live hold=false; no financial event persisted or provider refund/dispute performed. Ordinary users cannot read financial event history.

Remaining: provider-backed unmatched-event reconciliation, adverse-event notifications/care handling, explicit real signed delivery and sandbox refund/dispute rehearsal. Resolution derived from stored provider events is not current-provider reconciliation or evidence of actual recovered funds. No feature switch enabled, production write or real money operation. Official schema/events consulted: https://docs.stripe.com/api/disputes/object and https://docs.stripe.com/api/events/types.

### Immutable payment ownership

Provider migration version `20261012105257`; ordinary-role binding RPC execution denied in catalog. Final production compilation passes, exit 0. No deployment.

Source `20261012104851_freeze_verified_payment_contracts.sql` applied only to staging. Contract identity/client/milestone/amount/currency/environment/creation time cannot change. Paid receipt state/time remain historical immutable evidence. An unlinked contract can be linked once to a same-client project through an admin-only RPC; same-link retry succeeds, removal/reassignment fails. New paid state requires a receipt. Authenticated server binding operation checks current Auth user/session and remains disabled with the delivery feature.

Four launch/payment ownership DB tests pass, including actual service-role permissions, forged paid state, term mutation, link removal and idempotent binding; complete npm test/typecheck/targeted lint pass. Rollback-only actual staging service attempt to change the fictional paid deposit amount was rejected; its data unchanged. No project linkage created in staging. Refund/dispute status must be separate durable provider evidence and block release/care appropriately; immutable paid receipt history is not current billing health. That lifecycle, linking UI/checkout-to-project creation, approved terms and real runtime acceptance remain incomplete.

### Backend launch prerequisite guard

Source `20261012104200_project_launch_guard.sql` applied only to staging as provider `20261012104650`. Project/client foreign keys bind milestone contracts to the existing project; unique project/milestone prevents duplicate deposit or balance contracts. New transitions to launched require latest preview approval, matching deployed source version, latest append-only release evidence with an admin reviewer and onboarding/QA/DNS-email/rollback references, and both linked live paid contracts backed by matching receipts. Sandbox receipts cannot mark a project launched. Historical launched rows are not retroactively proven by this trigger.

Three actual PostgreSQL regressions cover missing gates, authenticated direct-status denial, sandbox receipts, superseded preview, wrong deployed commit, protected evidence access and corrected-evidence recovery. Full npm test passes. The staging trigger is enabled; a rollback-only fictional project test confirms missing approval blocks status transition, leaving no fixture project. No live receipts, release evidence or client launch fabricated.

Limits: stored evidence references are not independent proof of QA/deployment/onboarding. Collect and verify them through the release workflow. Secure contract-to-project assignment and prevention of later reassignment, approved proposal/payment-term binding, preview URL/deployment binding, recovery/recurring care and real Auth/browser/provider acceptance remain incomplete. No release operation enabled or production schema changed.

### Existing project-page controls

Added an expandable review/access panel to the existing project cards, with administrator current-version retrieval, readable saved content, retained draft on failure, atomic publication, existing Auth account selection and explicit project grant/revoke operations. Queries start only when expanded; no messages sent. Customer link opens the exact project/kind review. All server controls remain disabled. Typecheck/targeted lint/full npm test pass; authenticated rendered acceptance remains unverified.

Touched page aligned with ratified two-build pilot capacity and 14-business-day target excluding client delay. Removed the misleading automatic claim that launched status establishes deployment/care/billing. Disabled the old review-to-launched button and manual launched selection: those only changed database status despite claiming DNS launch. Backend status writes still require a complete launch guard; UI disablement is not security enforcement or release evidence. Next: preview/version binding and backend launch prerequisites, plus pending configured staging browser sessions.

### Session enforcement follow-up

Source migration `20261012103020_delivery_session_verification.sql` applied only to staging as `20261012103258`. Restricted SECURITY DEFINER boolean lookup checks the verified token's session/user pair against auth.sessions and not_after, with empty search path and execution only for service_role. All delivery server operations invoke the guard after Auth validation. No Auth table exposed or modified. Staging catalog confirms anonymous/ordinary-role denial; a missing session returns false through service_role. Eleven focused tests and production build pass. Standard npm test now includes the session test; initial full-suite migration fixture lacked auth.sessions and was corrected to the staging-verified columns. Actual GoTrue sign-out/browser acceptance remains required.

Official session reference: https://supabase.com/docs/guides/auth/sessions . Lookup does not by itself enforce unconfigured inactivity or single-session policies, and it is a check before the operation rather than an atomic lock across GoTrue sign-out. No broader session-policy claim.

### Atomic review publication

Final verification: provider migration version 20261012102832; catalog denies ordinary-user publication RPC execution. Complete npm test and final production build pass, exit 0. These do not establish authenticated runtime acceptance.

Added disabled administrator publication server operation and service-only transaction. Existing admin role is checked in PostgreSQL; project locking plus expected revision prevents overwriting a newer review. The transaction computes the digest, records publishing user and saves the revision/artifact together. Identical retries return the saved version. Artifact failures roll back the revision. Nine delivery DB tests, typecheck and targeted lint pass. Source migration 20261012102546 applied only to staging; no content or membership published there.

Runtime dependency: worktree has example configuration and public production build values, but no staging server credentials. Owner asked to configure ignored .env.local privately. `.env.staging.example` specifies matching browser/server staging URL and blank key slots with all delivery, payment and outbound switches disabled. Connector access does not configure application credentials. No secrets copied or printed; no production enablement. Real sessions, preview binding and full lifecycle acceptance remain required.

### Customer-readable immutable review

Added `/client-review/$projectId` using existing Auth and server-function token attachment. The screen shows escaped plain-text current content, explicit version confirmation, recorded-only approval status and retry/reload failures. Content access is service-mediated, membership-filtered and private/no-store; browser query cache has zero retention after unmount. Features remain server-disabled unless DELIVERY_APPROVAL_ENABLED=true.

Source migration `20261012101923_delivery_review_artifacts.sql` applied only to staging as `20261012102231`. Immutable readable text must hash to its revision's digest in PostgreSQL. Approval insertion requires an artifact; missing content rolls back identity evidence. Review reads reject superseded content even when the newest version is incomplete. Seven actual database tests and full npm test pass; typecheck and targeted lint pass. Browser reached the local route and sign-in loading state. Follow-up observation was not executed because automatic approval review exceeded retries with HTTP 429; signed-out/authorized customer rendering remains unverified. No bypass attempted. Local server stopped.

Remaining before enablement: administrator artifact publication flow, preview URL/version binding, actual sessions/revocation and signed payment delivery, onboarding, launch/care/recovery. Text approval alone is not evidence of website preview acceptance or launch authority.

### Authenticated approval operation

Access follow-up: added disabled-by-default administrator-only `setDeliveryProjectAccess`. It validates the caller with Auth, checks the existing admin role and grants/revokes explicit project membership for an existing Auth user. No email matching or client insertion grants access. Typecheck and targeted lint pass. No staging membership changed. Correction: `getUser()` validates the user but does not establish revocation of an already-issued access token; session revocation requires separate enforcement and runtime verification before release. The customer screen also needs an immutable readable artifact, not only the currently stored digest/commit; implement that before allowing approval.

`delivery-approval.functions.ts` adds a disabled-by-default POST server operation. It validates explicit confirmation, project/revision IDs and digest, verifies a fresh Supabase Auth user after the existing middleware, and passes the verified user ID to service-only `approve_delivery_revision`. The transaction requires active explicit project membership, rejects mismatched or superseded revisions, and atomically records identity evidence plus approval. Retries return the existing approval; revoked membership blocks further approval. No browser-supplied user ID, public RPC grant, client activation or launch side effect.

CLI-generated source migration `20261012101334_authenticated_delivery_approval.sql` applied only to isolated staging as `20261012101535`. Catalog confirms authenticated users cannot execute the RPC; service can. Six delivery database tests, full npm test, typecheck, targeted lint and production build pass. Fresh session rejection is implemented but not yet verified with actual GoTrue sessions. No memberships or approvals fabricated in staging; customer interface and founder membership administration remain to implement. Runtime remains disabled unless DELIVERY_APPROVAL_ENABLED=true.

### Reconnected staging verification

Delivery follow-up: source migration `20261012100245_client_delivery_gates.sql` applied only to staging as provider version `20261012101143`. Immutable proposal/preview revisions, authenticated-user identity evidence and exact-version approvals attach to existing projects. Four actual ephemeral PostgreSQL tests pass; complete `npm test` passes, exit 0. Staging catalog confirms RLS, no anonymous read or ordinary-user insert, and service insert without update. Identity verification/customer interface and launch prerequisite enforcement remain unimplemented. No approval was fabricated in staging.

The THG connection now confirms THG Agency (`worzpzbutngugwzhlvtj`) and THG Enquiry Staging (`mfpnfxpgkfuqtedbcxvp`), both ACTIVE_HEALTHY. The payment migration was applied only to staging (provider migration version `20261012100429`, local source `20261012095358`). Both payment tables have RLS enabled; anonymous and authenticated roles lack table access and receipt-RPC execution.

Controlled reconciliation of the previously verified fictional Stripe sandbox deposit persisted one receipt and marked its staging contract paid. Repeating the same receipt returns duplicate. This was a service-role database reconciliation using authenticated provider readback, not actual signed Stripe webhook delivery. No production write, real funds, client activation or recurring revenue. The earlier connector blocker below is resolved; signed runtime delivery and the remaining client lifecycle gates stay open.

### Durable storage and endpoint follow-up

Generated unapplied migration `20261012095358_durable_payment_receipts.sql` with the Supabase CLI. Service-only contracts link to existing clients and a deposit/balance milestone. The receipt RPC locks the contract, checks trusted reference/amount/currency/environment, enforces unique session/event/payment-intent identifiers and updates paid state in the same transaction. It does not activate a client or assume recurring revenue. No public or authenticated role access to payment tables/RPC.

Implemented the Supabase adapter and bounded POST `/api/payments/stripe`, using dynamic server-only imports, streamed 256 KiB byte limit, signature validation before any database access, no-store responses and explicit disabled/configuration state. GET/HEAD reject with 405. Requires STRIPE_WEBHOOK_ENABLED, STRIPE_WEBHOOK_MODE and server-only STRIPE_WEBHOOK_SECRET plus the intended backend configuration; no settings enabled in this run.

Fresh checks: 14 payment tests pass (six processor, four actual ephemeral PostgreSQL, four request handler); typecheck, targeted lint and format pass. Combined standard npm test passes (81 regression/integration tests, three service-worker tests and platform smoke checks), exit 0; final production build passes, exit 0. Actual local HTTP POST returns 503/unconfigured; GET initially fell through to an HTML 200, corrected and verified 405. Local test server stopped after checks. PGlite serialises calls: queued duplicate tests and row locking do not establish multi-connection production concurrency or Supabase Auth/PostgREST behaviour.

Integration dependency: connected Supabase lists only inactive unrelated TRF Connect Prod (stqoqiwixhcnfxrpfbde), not intended THG Agency or mfpnfxpgkfuqtedbcxvp staging. No substitution or database write. Asked owner to reconnect correct account; local work continues. Earlier paragraphs describing interface-only state are superseded by this section. Remaining: verified staging application/receipt delivery, multi-connection concurrency, balance/subscription, onboarding/approval/care/recovery and full browser QA.

Implemented a server-only payment-event processor using the official Stripe SDK. It verifies the raw-body signature with a five-minute timestamp tolerance, rejects other environments/connected accounts, only handles paid one-off Checkout sessions, and matches the session to a trusted stored contract before accepting an amount, currency, client reference or payment intent. Storage errors return a retryable failure rather than a false acknowledgement. Subscription invoices deliberately require their own lifecycle implementation.

The store interface requires atomic durable writes with uniqueness across payment/session IDs. This interface is **not** a database adapter or deployed endpoint. The tests use an in-memory store; concurrency tests here prove the processor calls the contract, not actual database concurrency. No migration applied, receiver registered, runtime credentials obtained, checkout creation service or frontend payment flow added.

## Fresh validation

- Six payment regressions pass: signed success, concurrent duplicate handling and distinct event replay, absent/bad/stale/tampered signatures, unpaid/unrelated/subscription events, wrong environment/amount/currency/reference/unknown contract, storage failure/retry and async success.
- Typecheck passes after dependency installation completed. The first attempted typecheck ran before installation finished and could not find tsc; rerun passed.
- Existing npm test passes, exit 0: platform smoke checks, 67 regression/integration tests and three service-worker tests. Not a live browser/provider/database acceptance claim.
- Production build passes, exit 0. Formatting check passes. No release or deployment.
- Official Stripe SDK added to package and lockfile; test script `npm run test:payments` added.

## Next implementation sequence

1. Service-only durable payment contracts and receipt transaction, preserving existing customer tables. Test unique-payment conflicts, concurrent retries, atomic rollback and denied anonymous/ordinary-user access in ephemeral PostgreSQL before any staging application.
2. Bounded server POST endpoint with runtime enablement/config checks and raw-body processing. Verify environment and actual signed event delivery in isolated staging; no live Stripe enablement implied.
3. Provider-confirmed balance and subscription lifecycle, protected onboarding/approval/care flows, then client preview/browser QA and data recovery. Full first-client production gate remains RED until all acceptance evidence exists.

Stripe documentation consulted: https://docs.stripe.com/events/manage-webhook-endpoints (signature verification, retries and duplicate handling). Prior sandbox receipt evidence remains in canonical docs/evidence; no new provider writes in this implementation turn.
# Durable reconciliation observation follow-up — 12 October 2026

Actual application delivery follow-up: real staging Auth identities used against local TanStack server functions. Publication, invited exact-version retrieval, explicit approval/readback pass; revoked project access produces HTTP 409 and retained token after logout produces HTTP 401. Fixture cleanup in finally removes review/access/project/admin role and Auth accounts; independent counts zero. A narrowly scoped staging-only cleanup helper was installed temporarily and dropped afterward. It is not a production migration. Delivery flag enabled only in stopped local process; private file remains disabled. This is application HTTP acceptance, not authenticated browser acceptance. Runtime CSRF warning remains to address.

Actual Auth follow-up: repeatable `node scripts/verify-staging-auth.mjs` passes real staging sign-in, active-session recognition, cross-user session rejection, ordinary-user private session/direct approval RPC HTTP 403 denial, logout/session invalidation, and temporary account cleanup. No email sent; secrets remain in memory. This verifies provider Auth and private RPC isolation, not the application/browser approval happy path or production readiness.

Source migration `20261012111915_payment_reconciliation_observations.sql` applied only to isolated staging as `20261012112156`. Server orchestration reads a stored signed event and its object event count before verified provider lookup. Commit serializes with signed ingestion and rejects changed generation, identity mismatch, inconsistent holds and conflicting retry IDs. Observations remain append-only private audit evidence; storing one alone does not clear launch holds.

Six focused tests, fresh typecheck and targeted lint pass. Actual staging rollback-only fictional observation save succeeded and unresolved hold remained. RLS and denied public/service-update privileges confirmed; retained observations zero. Production unchanged. Admin recovery action, safe hold resolution, real provider lookup/delivery and authenticated browser acceptance remain required. Overall gate RED.

