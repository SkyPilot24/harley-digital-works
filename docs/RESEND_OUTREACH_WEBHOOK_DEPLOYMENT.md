# Resend outreach webhook — staged deployment guide

**Status:** Implementation guidance only. This guide does **not** authorise a migration, provider webhook, configuration change, deployment or outbound contact.

**Scope:** The local server module `src/lib/resend-outreach-webhook.server.ts` and its proposed CRM recorder path. This is not a general platform release runbook and it does not enable the existing scheduled outreach task.

## 1. Current verified state

| Area                            | Current state                                                     | Deployment implication                                                                               |
| ------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Webhook handler                 | Handler and server-only POST route implemented and tested locally | No deployed staging endpoint or runtime route evidence exists.                                       |
| CRM persistence                 | Two ordered repository migrations define the recorder path        | They are unapplied; staging readback and generated database types do not yet exist.                  |
| Staging backend                 | Recorded target: `mfpnfxpgkfuqtedbcxvp`                           | Use only this isolated target for first application and acceptance.                                  |
| Production backend              | Recorded target: `worzpzbutngugwzhlvtj`                           | Do not apply or test here until staging evidence and explicit release approval exist.                |
| Worker runtime                  | Cloudflare Nitro Worker with `nodejs_compat`                      | Required for the Node `crypto` HMAC verifier.                                                        |
| Outbound email                  | `TRANSACTIONAL_EMAIL_ENABLED` controls the existing dispatcher    | Remains independent of inbound webhook handling and must stay disabled unless separately authorised. |
| Route and provider subscription | Route is implemented locally; provider configuration is absent    | No Resend webhook URL or signing secret is currently active.                                         |

The repository records that `main` may deploy through Cloudflare Git integration. Treat merge or push to `main` as a production-affecting action and obtain scoped release approval before either action.

## 2. Environment ownership and configuration contract

Use the supplied additive templates:

- [Staging environment overlay](templates/resend-outreach-webhook.staging.env.example)
- [Production environment overlay](templates/resend-outreach-webhook.production.env.example)

They contain placeholders only. Never store real secret values in a committed template, Markdown file, shell history, test fixture or client-visible `VITE_*` variable.

| Variable                        | Owner / exposure                        | Required for                           | Rule                                                                                                                |
| ------------------------------- | --------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `SUPABASE_URL`                  | Server-only runtime configuration       | Service-role CRM calls                 | Must match the intended backend exactly.                                                                            |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server secret only                      | Service-role CRM calls                 | Never expose to the browser or commit.                                                                              |
| `SUPABASE_PUBLISHABLE_KEY`      | Server/runtime public key               | Existing platform configuration        | Must match the browser publishable key where both are supplied.                                                     |
| `VITE_SUPABASE_URL`             | Browser build-time public configuration | Existing browser client                | Must match `SUPABASE_URL`; never use the service-role key here.                                                     |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Browser build-time public configuration | Existing browser client                | Same public key as the server/runtime publishable key where applicable.                                             |
| `RESEND_WEBHOOK_ENABLED`        | Server-only feature gate                | Inbound Resend handler                 | Set to `false` by default in both environments. Set to `true` only during an approved, monitored acceptance window. |
| `RESEND_WEBHOOK_SIGNING_SECRET` | Server secret only                      | Svix signature verification            | Use the environment-specific Resend signing secret; never share between staging and production.                     |
| `TRANSACTIONAL_EMAIL_ENABLED`   | Existing server-side send gate          | Existing scheduled outreach dispatcher | Must remain `false` for the webhook rollout. It is not an inbound-webhook setting.                                  |
| `RESEND_API_KEY`                | Server secret only                      | Existing outbound dispatcher only      | Deliberately excluded from the webhook overlays. Add only under a separate approved outbound-email change.          |

The existing staging checker expects `SUPABASE_URL`, `VITE_SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and disabled lead/Slack/transactional notification flags. It proves presence and alignment only; it does not prove ownership, persistence or delivery.

## 3. Prerequisites before configuring an endpoint

Do not create a provider webhook subscription yet. Complete and review all of the following first:

1. **Review and commit the two repository migrations.** Preserve the intended tables, server-only recorder functions, unique provider-delivery identifiers and atomic suppression/audit transition. The source files are present but unapplied; do not rewrite applied migration history.
2. **Apply only to isolated staging.** Confirm the exact project reference immediately before applying. Capture migration identifier, function grants, RLS policies and schema readback.
3. **Review and commit the dedicated POST route.** It calls `configuredResendOutreachWebhook(request)` without a browser/client import path and is present only in the local source tree until an approved staging deployment.
4. **Retain route-level tests and prove the deployed boundary.** Local tests cover non-POST denial, raw-request forwarding and no-store responses. A real staging route/raw-body test remains required.
5. **Create a staging-only Resend webhook configuration.** Use the staging endpoint and its staging signing secret. Do not reuse production provider credentials or subscriptions.
6. **Keep outbound mail disabled.** `TRANSACTIONAL_EMAIL_ENABLED=false`; do not set `RESEND_API_KEY` for this rollout.

## 4. Staging procedure

### 4.1 Prepare the staging configuration

1. Copy the staging overlay into the authorised staging secret/configuration system; do not copy it to a tracked `.env` file.
2. Confirm `SUPABASE_URL` is exactly `https://mfpnfxpgkfuqtedbcxvp.supabase.co` and browser/server public-key values align.
3. Store `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_WEBHOOK_SIGNING_SECRET` as platform secrets, not plain Worker variables or `VITE_*` values.
4. Leave `RESEND_WEBHOOK_ENABLED=false`, `TRANSACTIONAL_EMAIL_ENABLED=false`, `LEAD_NOTIFICATIONS_ENABLED=false` and `SLACK_NOTIFICATIONS_ENABLED=false` until all route and database prerequisites are present.
5. Run the existing presence check from an ignored local configuration only:

   ```powershell
   node scripts/check-staging-config.mjs
   ```

   A pass here is configuration presence only; it is not deployment or integration acceptance.

### 4.2 Validate before staging deployment

Run locally with the intended migration and route included:

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run build
```

Review all changes, including generated route output. Do not merge, push or deploy as part of this guide.

### 4.3 Staging acceptance window

Use the [formal staging acceptance matrix and promotion criteria](RESEND_OUTREACH_WEBHOOK_STAGING_ACCEPTANCE.md) as the source of truth for required checks, expected results and evidence. Every `PRE-*` and `STG-*` item must be recorded as PASS before a production-release decision can be requested.

After the route and migration are staged and a reviewer explicitly authorises integration testing:

1. Enable `RESEND_WEBHOOK_ENABLED=true` in staging only.
2. Register the staging HTTPS route in Resend, using the staging signing secret.
3. Send only provider test events or synthetic, non-personal test data.
4. Prove and record:
   - valid signed `email.sent` and `email.delivered` events produce one durable CRM record;
   - a repeated `svix-id` returns/records the deduplicated result without a second state transition;
   - forged, stale, malformed and oversized requests cannot reach the recorder;
   - `email.bounced`, `email.complained` and `email.suppressed` create exactly one active suppression and append-only audit evidence;
   - a recorder outage returns a retryable response and a later provider retry recovers without duplicate history;
   - anonymous and ordinary authenticated callers cannot invoke the CRM recorder RPC or read its restricted tables;
   - no outbound email, Slack message or customer contact occurs.
5. Disable the staging webhook immediately after the bounded test window unless a continuing test plan is expressly approved.

## 5. Production promotion gate

The formal `PC-*` promotion criteria and RED/AMBER/GREEN decision rules are defined in [the acceptance record](RESEND_OUTREACH_WEBHOOK_STAGING_ACCEPTANCE.md). Passing a subset of staging checks does not permit production configuration.

Production is **not ready** merely because staging receives a signed event. Promotion requires all of the following evidence:

- reviewed staging migration application/readback and allowed/denied actor checks;
- route tests plus a deployed staging endpoint verified with Resend;
- duplicate, outage and suppression recovery evidence;
- explicit review of the production project reference (`worzpzbutngugwzhlvtj`) immediately before any change;
- current-head quality checks and release evidence;
- explicit founder approval for the exact production deployment/configuration scope;
- a verified rollback owner and communication/incident plan.

When approved, deploy the **same reviewed revision** with the production overlay. Initially retain `RESEND_WEBHOOK_ENABLED=false`. Only after the route is live, the production secret is in the platform secret store and the correct production endpoint is confirmed should the provider subscription be configured and the feature gate be enabled in the authorised window.

Do not change `TRANSACTIONAL_EMAIL_ENABLED` as part of inbound webhook promotion. Provider event receipt is not permission to send a campaign.

## 6. Rollback and incident procedure

For signature failures, unexpected storage errors, incorrect environment targeting, duplicate policy transitions or any indication of unauthorised processing:

1. Set `RESEND_WEBHOOK_ENABLED=false` in the affected environment.
2. Disable the affected Resend webhook subscription.
3. Preserve provider delivery IDs, CRM audit history and suppression records; do not delete evidence to make a retry pass.
4. Record the environment, route revision, timestamp range, affected event IDs and safe recovery owner.
5. Reconcile provider delivery history with CRM state before re-enabling the gate.
6. Re-enable only after the fault, rollback decision and acceptance evidence are documented.

## 7. Evidence record to retain

For each staged or production attempt, add the following to the handover/release record:

- repository revision and exact route/migration filenames;
- environment/project reference and Worker deployment identifier;
- date/time, operator and scoped approval reference;
- configuration presence check result without secret values;
- provider test delivery IDs and expected/observed CRM outcomes;
- duplicate, denied-path, outage/retry and suppression evidence;
- deployment, provider-subscription and feature-gate status;
- unresolved risks, rollback status and next action.

## Sources and related repository records

- `src/lib/resend-outreach-webhook.server.ts`
- `scripts/resend-outreach-webhook.test.mjs`
- `scripts/check-staging-config.mjs`
- `wrangler.json`
- `docs/HANDOVER.md` and `PROJECT_STATUS.md`
- [Resend webhook verification](https://resend.com/docs/webhooks/verify-webhooks-requests)
- [Resend event types](https://resend.com/docs/webhooks/event-types)
- [Svix manual signature verification](https://docs.svix.com/receiving/verifying-payloads/how-manual)
