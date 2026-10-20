# Resend outreach webhook — staging acceptance and production-promotion criteria

**Backlog:** H37  
**Status:** Acceptance design only. **Current verdict: RED — not ready for staging activation or production promotion.**  
**Scope:** The local `src/lib/resend-outreach-webhook.server.ts`, implemented `POST /api/webhooks/resend` route and two ordered, unapplied prospect/contact/suppression migrations.

This checklist does not authorise a migration, deployment, secret change, provider webhook subscription, sender configuration, outbound email or customer contact. It defines the evidence that must exist before those actions can be requested.

## 1. Current review outcome

| Area                 | Verified present                                                                                                                                                                           | Missing / blocked                                                      | Gate impact |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | ----------- |
| Module boundary      | Handler tests cover signature, stale timestamp, oversized body, duplicate hand-off, failure responses and ignored events; route tests cover local method denial and raw-request forwarding | No deployed route or staging raw-request framework test                | Blocking    |
| CRM contract         | Two ordered repository migrations define the tables, service-only functions, deduplication and suppression                                                                                 | Migrations are unapplied; no staging readback or generated types exist | Blocking    |
| Environment overlays | Staging/production templates default the webhook to disabled and omit outbound credentials                                                                                                 | No authorised secret/configuration has been installed                  | Blocking    |
| Provider integration | Handler follows the documented Svix signed-content contract                                                                                                                                | No staging Resend subscription or authentic provider delivery          | Blocking    |
| Access control       | Migrations revoke the four new RPCs from `PUBLIC`, `anon` and `authenticated`, granting `service_role` only                                                                                | No staging grant/RLS/API denial evidence                               | Blocking    |
| Production control   | Deployment guide specifies staged rollout and rollback                                                                                                                                     | No scoped production-release approval                                  | Blocking    |

A local unit test or an unapplied migration is **not** a staging pass. Missing evidence is a RED gate, even where no defect has been demonstrated.

## 2. Preconditions to start any staging test

All preconditions must be PASS before enabling the staging webhook gate for a bounded acceptance window.

| ID     | Requirement                                                                                                                                       | PASS evidence                                                                                                                                                                                                                                                                         | Failure / stop condition                                                                                 |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| PRE-01 | Exact target is the isolated staging backend `mfpnfxpgkfuqtedbcxvp`, confirmed immediately before change                                          | Configuration/readback records only the staging project reference                                                                                                                                                                                                                     | Any production project, ambiguous endpoint or mismatched browser/server URL                              |
| PRE-02 | Reviewed migrations are committed as new files, in dependency order: prospect/contact/suppression controls first, then the Resend event extension | Reviewed migration names and exact revision; no rewrite of applied history                                                                                                                                                                                                            | External Desktop draft, missing prerequisite tables, or unreviewed SQL                                   |
| PRE-03 | A server-only `POST /api/webhooks/resend` route calls `configuredResendOutreachWebhook` without parsing/changing the raw body first               | Route test shows raw body reaches the verifier unchanged; route is absent from browser bundles                                                                                                                                                                                        | No route, client import, JSON parsing before verification or a different handler                         |
| PRE-04 | Staging configuration is present and outbound effects are disabled                                                                                | `SUPABASE_URL`/`VITE_SUPABASE_URL` both equal staging; server secrets are in a secret store; `LEAD_NOTIFICATIONS_ENABLED=false`, `SLACK_NOTIFICATIONS_ENABLED=false`, `TRANSACTIONAL_EMAIL_ENABLED=false`, `RESEND_WEBHOOK_ENABLED=false` before the test window; no `RESEND_API_KEY` | Secret in source, a `VITE_*` secret, enabled outbound channel, or any production credential/subscription |
| PRE-05 | Quality baseline applies to the exact proposed revision                                                                                           | Formatting, lint, typecheck, focused route/module tests, full test suite and production build are recorded with result/exit status                                                                                                                                                    | Any new error, unreviewed generated file or test/build failure                                           |
| PRE-06 | Synthetic test plan is approved for the staging window                                                                                            | Named operator, time window, rollback owner, synthetic `.test` fixture marker and evidence location                                                                                                                                                                                   | Real prospect/customer data, unspecified operator, or no rollback owner                                  |

## 3. Staging validation checklist

Record **PASS**, **FAIL**, **BLOCKED** or **NOT RUN** for every row. A PASS needs the listed observation; logs must contain no signing secret, recipient address, raw body or provider capability URL.

### A. Route, configuration and signature boundary

| ID     | Test action using synthetic data only                                                                                                          | Expected result                                                                                     | Required evidence                                                               | Release severity |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------- |
| STG-01 | Request `GET` or another non-POST method at the deployed webhook route                                                                         | `405`, `Allow: POST`, `Cache-Control: no-store`; no CRM write                                       | HTTP response and before/after event count                                      | P1               |
| STG-02 | Keep `RESEND_WEBHOOK_ENABLED=false` or omit the signing secret, then send a correctly shaped request                                           | `503 unconfigured`; no Supabase recorder call/write                                                 | Effective staging configuration check and before/after event count              | P0               |
| STG-03 | Submit missing headers, forged signature, stale timestamp, malformed signed JSON and an over-limit body                                        | `400`/`413` as appropriate; no CRM write                                                            | Request class, response, and unchanged event/suppression counts                 | P0               |
| STG-04 | Use a valid current signature where the signature header has an invalid prior `v1` signature plus a valid current `v1` signature               | Accepted according to payload state; rotated signature support works without weakening verification | Sanitised request metadata and outcome                                          | P1               |
| STG-05 | Send a real **staging Resend test event** to the configured staging endpoint with no matching local provider acceptance                        | Signature verifies end-to-end; CRM returns `ignored`; no outreach record or suppression is created  | Provider delivery ID, HTTP outcome and query counts, without raw payload/secret | P1               |
| STG-06 | Verify `RESEND_WEBHOOK_ENABLED=true` only inside the authorised window; after testing set it back to `false` and prove a request returns `503` | The feature gate is observable and reversible                                                       | Config change record, disabled-path response, rollback owner sign-off           | P1               |

### B. Database migration, access and state transitions

Prepare one fully synthetic corporate prospect/contact that can legitimately reach an `allowed` eligibility decision, using a dedicated test marker. Do not use an actual lead, public prospect or email recipient.

| ID     | Test action                                                                                                                                                                                                                                                | Expected result                                                                                                                                                                                           | Required evidence                                                                  | Release severity |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------- |
| STG-07 | Apply the two reviewed migrations to staging and read back tables, indexes, trigger, functions, grants and RLS policies                                                                                                                                    | Required tables exist; provider-ID unique indexes exist; functions are `SECURITY INVOKER` with empty `search_path`; grants match the reviewed design                                                      | Applied migration IDs and metadata/grant/RLS readback                              | P0               |
| STG-08 | From anonymous and ordinary authenticated API clients, attempt direct select/insert/update/delete on restricted histories/suppressions and execute each new RPC                                                                                            | All forbidden reads/writes/RPC calls are denied; no state change occurs                                                                                                                                   | Actor matrix with denied results and before/after counts                           | P0               |
| STG-09 | Through the trusted staging server path, create one allowed eligibility event, call `record_outreach_email_attempt` twice with the same stable attempt UUID, then call `record_resend_outreach_acceptance` twice with the same synthetic provider email ID | One `send_attempted` event and one `provider_accepted` event exist; retries return the original IDs and create no duplicates                                                                              | Synthetic IDs, row counts and returned IDs; no contact value/body                  | P0               |
| STG-10 | Use a protected test harness to deliver a validly HMAC-signed webhook payload whose `email_id` matches the synthetic accepted provider email ID                                                                                                            | Route returns `200 recorded`; exactly one lifecycle event is recorded with the same provider event ID, provider email ID and expected event type                                                          | Sanitised HTTP result plus event counts/metadata readback                          | P0               |
| STG-11 | Replay the exact STG-10 delivery sequentially and concurrently with the same `svix-id`; then try the same ID bound to a different provider email ID                                                                                                        | Replays return `duplicate` with no new row; conflicting reuse is rejected and cannot overwrite/bind another event                                                                                         | Responses, unique-row count and immutable original mapping                         | P0               |
| STG-12 | Deliver a correctly signed event for an unknown provider email ID                                                                                                                                                                                          | `200 ignored`; no CRM event/suppression is created                                                                                                                                                        | Sanitised response and unchanged counts                                            | P1               |
| STG-13 | For separate synthetic accepted sends, deliver `email.bounced`, `email.complained` and `email.suppressed`; retry each event                                                                                                                                | Each first event creates one lifecycle record, one active contact-email suppression with the correct reason, and one append-only suppression audit event; retries create no additional active suppression | Per-event event/suppression/audit counts and reason code, using synthetic IDs only | P0               |
| STG-14 | Re-run the trusted `evaluate_outreach_eligibility` gate for each STG-13 contact immediately before any hypothetical send                                                                                                                                   | `eligible=false` with the active-suppression outcome; no send attempt is permitted                                                                                                                        | Gate result and proof no new `send_attempted` event exists                         | P0               |

### C. Failure recovery, containment and observability

| ID     | Test action                                                                                                                         | Expected result                                                                                                                                    | Required evidence                                                          | Release severity |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------- |
| STG-15 | Induce a controlled recorder/database failure after a valid signed request, restore it, then replay the same delivery               | Initial response is retryable `503 persistence_unavailable`; recovery records exactly one event/suppression where applicable                       | Outage method, response, recovery response and final counts                | P0               |
| STG-16 | Inspect route/application logs and deployed public assets after tests                                                               | No signing secret, service-role key, raw email address, message body or raw webhook payload is logged/exposed; errors remain generic to the caller | Redacted log review and private-value exposure check result                | P0               |
| STG-17 | Confirm during every test that no Resend API send, Slack notification, scheduled outreach dispatch or customer contact occurs       | No outbound request/credential is present and notification/send job counts remain unchanged                                                        | Effective flags, outbound-credential absence and relevant job/log evidence | P0               |
| STG-18 | Execute the staged rollback procedure: disable the feature gate and provider webhook subscription; preserve audit rows/suppressions | New requests are rejected as unconfigured; no history or suppression row is deleted; rollback owner can reproduce the safe state                   | Gate/subscription status and post-rollback readback                        | P1               |

## 4. Evidence standard and test harness rules

- Use a dedicated, clearly labelled staging marker such as `thg-webhook-qa-<UUID>` and addresses only under `example.test`.
- Keep fixture records for review until the acceptance record specifies controlled cleanup. Never delete an audit or suppression row merely to obtain a clean result.
- A real provider-signed staging test event whose provider email ID is unknown is a valid **signature/route** test and must return `ignored`. It does **not** prove the CRM-recorded path.
- The `recorded` path requires a matching synthetic `provider_accepted` row and a controlled valid HMAC signature generated within the trusted staging harness. Do not disclose the signing secret in command lines, logs, evidence or screenshots.
- Run database actor checks through the real PostgREST/Auth path; service-role SQL alone does not prove anonymous/ordinary-user denial.
- Record commands, route revision, migration identifiers, environment/project reference, time window, actor, expected result, observed result, provider delivery ID where present and evidence path. Redact values that identify people or secrets.

## 5. Production-promotion acceptance criteria

The webhook is **eligible to request** a scoped production-release decision only when every criterion below is PASS. This is not a production authorisation.

| Criterion                    | Required PASS condition                                                                                                                                                                                                                 | Blocks promotion when                                                                       |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| PC-01 — exact artefact       | The route, two migrations, tests and configuration contract are reviewed together at one immutable revision; no unexplained generated diff remains                                                                                      | Version/migration/route identity is ambiguous                                               |
| PC-02 — staging completion   | PRE-01–PRE-06 and STG-01–STG-18 all PASS, with evidence retained and no unwaived P0/P1 finding                                                                                                                                          | Any item is FAIL, BLOCKED, NOT RUN or lacks reproducible evidence                           |
| PC-03 — data protection      | Service-only access, real API denial, no secret/public-asset exposure and no PII/raw-payload logging are demonstrated                                                                                                                   | Any public/browser access, broad grant or data/secret exposure is found                     |
| PC-04 — policy safety        | Duplicate delivery, conflicting delivery ID, unknown email ID, suppression creation and subsequent eligibility block are all demonstrated                                                                                               | A replay can duplicate/alter history or a suppressed contact can reach `send_attempted`     |
| PC-05 — recovery             | Recorder failure, retry and rollback are demonstrated without lost history, duplicate transitions or disabled suppressions                                                                                                              | Recovery outcome is unknown or requires destructive correction                              |
| PC-06 — outbound containment | No outbound email/Slack/customer contact occurred during staging; production promotion leaves `TRANSACTIONAL_EMAIL_ENABLED` unchanged                                                                                                   | A staging test used a real recipient or alters outbound-send controls                       |
| PC-07 — release control      | Current production project reference is independently checked, production overlay remains disabled, rollback owner/steps are verified and explicit founder approval covers the exact deployment, secret and provider-subscription scope | Approval is absent, broader than the proposed change, or production target is not rechecked |

## 6. Promotion decision rules

- **RED — current status:** use when the route/migrations are absent or any acceptance item is missing. This is the current position.
- **AMBER — ready to request a scoped production decision:** use only when all staging criteria pass, remaining operational observation is documented and the production overlay remains disabled. AMBER does not permit enabling the provider webhook.
- **GREEN — production release readiness for this webhook:** use only after the exact production artefact/configuration has been reviewed, every PC criterion passes and an explicit founder release decision is recorded. It permits a separate, bounded production implementation; it does not permit outbound outreach.

## 7. Required acceptance record

Save one dated record, for example `docs/evidence/resend-outreach-webhook-staging-acceptance-YYYY-MM-DD.json`, containing:

```json
{
  "date": "ISO-8601 timestamp",
  "environment": "staging",
  "project_ref": "mfpnfxpgkfuqtedbcxvp",
  "revision": "verified source revision",
  "migrations": ["applied migration filenames"],
  "route": "/api/webhooks/resend",
  "outbound_controls": {
    "resend_webhook_enabled_before": false,
    "transactional_email_enabled": false,
    "slack_notifications_enabled": false,
    "lead_notifications_enabled": false
  },
  "checks": [{ "id": "STG-01", "status": "PASS", "evidence": "sanitised reference" }],
  "limits": ["anything not verified"],
  "rollback_state": "disabled and verified"
}
```

Do not include keys, raw email addresses, raw webhook bodies, message text, full provider capability URLs or session tokens.

## 8. Current executable next action

Move the two external SQL drafts into reviewed repository migrations and implement the server-only route with route-level tests. Then, and only then, prepare a scoped isolated-staging application plan against `mfpnfxpgkfuqtedbcxvp`.

## References

- [Staged deployment guide](RESEND_OUTREACH_WEBHOOK_DEPLOYMENT.md)
- `src/lib/resend-outreach-webhook.server.ts`
- `scripts/resend-outreach-webhook.test.mjs`
- External, unapplied drafts: `HDW_Prospect_Contact_Suppression_Controls_2026-10-17.sql` and `HDW_Resend_Outreach_Event_Listener_Schema_Draft_2026-10-17.sql`
- [Resend webhook verification](https://resend.com/docs/webhooks/verify-webhooks-requests)
- [Svix manual signature verification](https://docs.svix.com/receiving/verifying-payloads/how-manual)
