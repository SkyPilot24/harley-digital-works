# First-client production readiness

Current assessment: **RED — not ready for production**. Updated 12 October 2026. This is the current gate summary; chronological notes in H50_PAYMENT_IMPLEMENTATION.md remain historical evidence, not current status.

Scope comes from REVENUE_WORKFLOW.md and H50: payment → onboarding → build → explicit customer approval → launch → recurring care, including controlled failures/retries. Local build success is one requirement, not the release decision.

Work branch: `codex/first-client-production`, baseline `e90da3bc6f8c8892c939ecbc3a360916b6e71462`. Implementation checkpoint committed locally as `baf9c99cb3a982c91d3144ab6d13a39e3dc2380a`; not pushed or deployed. Agency production backend: `worzpzbutngugwzhlvtj`; all schema/testing writes in this work used isolated `mfpnfxpgkfuqtedbcxvp`. No production migration/deployment or live billing activation.

| Gate | Current evidence | Evidence still required |
| --- | --- | --- |
| Build and private-key separation | Fresh build succeeds; 194 public artifacts contain no configured private key in raw, URI-encoded or base64 form, including compressed files | General credential scan and final reviewed commit/artifact provenance; this check only covers configured values |
| Auth and request protection | Actual staging sign-in/logout, cross-user denial, private RPC denial and same-origin/cross-site runtime checks pass | Full authenticated browser approval; concurrent real logout/approval acceptance |
| Exact-version approval | Application HTTP publication/read/approval/revoked membership/logout rehearsal passed with synthetic cleanup; current atomic-session approval rejects expired/deleted sessions in database and real Auth tests | Successful post-change customer browser confirmation/readback; changed-version/conflict/retry and cross-project browser cases |
| Deposit and balance | Durable contracts/receipts, exact amount/environment binding, atomic replay protection; prior fictional sandbox deposit reconciled into staging | Actual provider-signed endpoint delivery, hosted approved-terms checkout, balance payment, multi-connection receipt retry and outage reconciliation |
| Financial recovery | Signed refund/dispute handling and launch holds tested; append-only provider observation store applied staging | Real sandbox adverse-event delivery and lookup, safe unmatched hold resolution, admin exceptions and adverse events after launch |
| Approved agreement | Immutable readable proposal revision and verified customer approval mechanism implemented | Approved package/price/VAT/terms bound to checkout and customer agreement; nonstandard terms handled as exceptions |
| Complete onboarding | Existing project/client records retained; launch evidence requires onboarding reference | Secure asset/access/rights capture, completeness validation and customer-delay handling; real acceptance evidence rather than a typed reference |
| Client build and QA | Preview version requires commit/digest; existing client template remains separate from agency application | Exact client repository/deployment preview binding, complete form/mobile/accessibility/content checks and founder pilot QA |
| Launch | Backend status guard requires latest approved preview, matching source evidence and live paid deposit/balance without adverse holds | Real domain/email preservation, deployment identity, backup/rollback/restore rehearsal and deliberate pilot release approval |
| Recurring care | One-off payments explicitly do not imply subscription income | Hosted care subscription/invoice lifecycle, failed payment/cancellation handling, bounded updates, monitoring/reporting and recovery acceptance |
| Delivery and production | Isolated source/migrations and chronological evidence available; feature switches remain disabled in private config | Reviewed committed/pushed change, approved release/migration plan, deployed commit verification and complete live acceptance |

## Next execution order

1. Complete post-change authenticated browser approval and concurrent logout checks using the authorised fictional staging workflow with automatic cleanup. Reinstall the narrowly scoped temporary cleanup helper only for that rehearsal, then remove it.
2. Finish payment/recovery integration and actual provider sandbox acceptance. Keep sandbox receipts separate from paid-pilot revenue.
3. Finish agreement/onboarding/build/launch/care transitions against existing clients/projects and verify the end-to-end staging workflow, including failures and retries.
4. Prepare the exact reviewable release and request any remaining production authorisation only after its checks and rollout/rollback plan are concrete. Verify deployed and live behavior before changing this assessment.

## Verification limits

Latest full lint completes with zero errors and nine React Fast Refresh warnings after formatting the new verification scripts. These warnings are not recorded as a clean warning-free result.

Tests against disposable PGlite databases establish transaction invariants, not Supabase network concurrency. Service-role SQL checks do not prove ordinary-user access control; those require real Auth/API requests. The HTTP rehearsal establishes application server-function behavior, not browser usability. Secret presence and a staging database HTTP 200 do not establish production configuration. All these distinctions remain part of acceptance.

Synthetic accounts, administrator grants, publication/approval and project fixtures from the authorised application rehearsal were removed; independent staging counts verified zero residual delivery fixtures. The earlier fictional sandbox payment receipt is intentionally retained as payment rehearsal evidence, not revenue.
