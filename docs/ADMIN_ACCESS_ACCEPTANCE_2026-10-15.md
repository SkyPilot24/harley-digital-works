# Session and admin-access recovery — 15 October 2026

Status: locally implemented/tested; real isolated staging acceptance passed. Continues H03/H07/H42 on the existing draft PR #31 branch. No production configuration, credential, migration or release change.

## Changes

- Permission lookup failures are distinct from a confirmed missing admin role. Private views remain hidden on an error, with a retry action. Failed/denied role checks remove non-role query data while retaining the role result to avoid a retry loop. Existing cached admin permission cannot override an error.
- Session reads handle returned errors, rejected promises and synchronous exceptions. Late initial reads cannot overwrite newer auth events, and stopped observers ignore later results. Identity changes/sign-out clear the query cache before publishing the new identity; token refresh for the same identity preserves it.
- Session uncertainty has a retry state in admin, sign-in and customer-review views. Unauthenticated admin redirects retain the requested internal path. `getSession` drives browser state only; it is not a server authorisation boundary.
- Sign-out uses the actual SDK result. Query cancellation/clearing precedes sign-out; failure does not claim success or expose private views. The operator can retry. SDK callback handling stays synchronous and does not await another auth call within the callback.
- Role checks use actual `user_roles` records, recheck on foreground intervals and focus, and retain backend RLS as the enforcement boundary. Editable metadata is not an admin credential. No grants/policies were broadened.

## Access model and current evidence

Read-only staging metadata confirms `leads` SELECT/INSERT/UPDATE/DELETE require `app_private.has_role(auth.uid(),'admin')`, with appropriate update/insert checks. `user_roles` permits a user to read their own roles and administrators to manage roles. Table grants to `authenticated` are constrained by these policies; anonymous has no direct table grant. Migrations removing automatic first-signup administrator promotion and inherited public role-function grants are preserved.

| Actor/state                                 | Expected result                                        | Fresh evidence                                                                                                                          |
| ------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Anonymous visitor                           | No private lead read                                   | Real Auth/Data API denial against an existing fictional lead                                                                            |
| Ordinary signed-in user                     | Own roles only; no private lead read or self-promotion | Genuine second test account with `user_metadata.role=admin` still has zero roles, cannot read the lead and cannot insert an admin grant |
| Temporary administrator                     | Allowed private lead create/read                       | Genuine Auth token with one explicitly provisioned test role                                                                            |
| Admin role revoked                          | Data API denies and browser shows confirmed denial     | Only the temporary test account's role removed/restored; actual role-query refresh and recovery pass                                    |
| Role endpoint unavailable with warmed cache | Uncertainty/retry, private content hidden              | Real signed-in Edge session with local request fault; recovery through Retry permissions passes                                         |
| Sign-out endpoint unavailable               | Private cache/view cleared; no success claim           | Browser fault, visible retry state, successful retry and protected deep-link return pass                                                |
| Trusted fixture setup/cleanup               | Exact staging resources only                           | Private credentials remain in process memory; no private key supplied to browser/local app                                              |

## Verification

- Actual production helper tests cover error paths, event/read ordering, identity changes, unsubscription, cache removal with a real QueryClient, SDK sign-out failure and query-cancellation failure. Replaced the earlier logout test's stand-alone simulated implementation with the actual production helper.
- Full build/typecheck/format PASS. Lint zero errors / nine existing warnings. Full suite: 66 smoke checks, 150 regression/integration tests and three service-worker tests PASS.
- `verify-admin-access-staging.mjs` PASS against the existing isolated `mfpnfxpgkfuqtedbcxvp` project: two temporary Auth accounts, one fictional lead, ordinary/admin/anonymous boundaries, metadata/self-promotion rejection, cached permission failure/retry, temporary role revoke/restore, sign-out failure/retry and unauthenticated deep-link preservation.
- Existing client/project API/browser regression rerun PASS after the shared provider change: 56 fictional clients and 56 projects, paging/search/value/readback/mobile/retry/default-date controls. Exact records removed, original totals independently restored, temporary roles/accounts removed. No genuine owner session was signed out or changed.
- `auth-session.test.mjs` runs in `npm test`. Network/browser runner uses the existing explicit `ADMIN_ACCEPTANCE_CONFIG` and optional `ADMIN_ACCEPTANCE_PLAYWRIGHT`; no private configuration is committed.

## Provider findings and limits

Fresh read-only Supabase security advisors report **leaked-password protection disabled** on both Agency (`worzpzbutngugwzhlvtj`) and isolated staging. Review the exact provider setting and availability before changing live authentication; no setting or plan was changed. [Provider remediation](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).

RLS-without-policy INFO entries cover the abuse-attempt table in production and eleven guarded server-only delivery/payment/attempt tables in staging. Their deny-by-default model is intentional in the existing migrations, not a reason to add broad client policies. This change does not re-audit every privileged RPC or claim full release acceptance. [Linter explanation](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy).

Browser session/cache recovery is not proof that an already issued JWT is immediately revoked everywhere. Token lifetime, server guards and customer review active-session checks remain distinct controls. No production owner/browser acceptance, all-module permission audit, customer communications, live billing or full sale-to-care release is implied. Overall platform launch remains RED.

Next: verify the current draft head/CI; audit admin user/role server controls (including the current 200-user listing cap) and remaining form/control validation; then current-source enquiry recovery and existing care/restore/release gates. Provider password-protection review remains a separate configuration action.
