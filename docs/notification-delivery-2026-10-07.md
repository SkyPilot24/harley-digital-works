# Both-brand enquiry fields and Slack acceptance — 7 October 2026

## Result

Both brands' live browser forms save name, email, business, phone, website and message exactly once in THG Agency (worzpzbutngugwzhlvtj), and the genuine signed-in owner retrieves all values. Source is contact_form for HDW and group_contact_form for the Group. Phone/website/full interest are qualification context in the message; long domain interest is now intact even when the visitor edits the message. Budget/timeline are accepted by the schema but are not currently visible fields.

Native Cloudflare scheduled third attempts delivered both alerts to #all-the-harley-group (C0BFQS2P2H1) at 12:31:39 BST. Each message's lead reference matches its saved enquiry. Both jobs are accepted, attempts=3, accepted_at populated, last_error cleared. Authenticated CRM visibly shows Slack acknowledgement and 3/5 attempts. Two earlier real request failures preserved enquiries and jobs and scheduled retries. No manual send/reset or duplicate lead was needed.

## Release states

- Local: implemented, built, typechecked, focused lint and regressions pass; full suite 59 platform +62 regression +3 service-worker checks. 310 output files scanned without server credentials.
- Staging: mfpnfxpgkfuqtedbcxvp, migration applied, both browser forms and database fields pass; real Auth/API 13 and notification API seven checks pass. Notifications disabled, no outbound credentials; simulated provider acknowledgement clearly labelled. Built Worker local scheduled handler with staging override returned HTTP200/outcome ok.
- Live database: additive migration 20261007110303_durable_lead_notifications.sql applied; service-only queue claims/acknowledgements, administrator SELECT policy, atomic service-intake trigger. Existing lead/admin assignment preserved. No historical backfill; manual administrator intake retains access without automatically alerting.
- Committed/pushed code: c2254b119861fcb989b01dae68ceb7ae68d97735 on canonical GitHub main. Latest manually verified deployment: existing Worker skypilot24-harley-digital-works, version 6e9d3147-2efa-464f-ab6b-4d7d92b13978. Later documentation commits may trigger an identical-code Git build separately.
- Live verified: both receipts/fields/owner retrieval; anonymous lead/job reads and claims denied; native schedule execution; two failed deliveries followed by actual third-attempt Slack messages and CRM acknowledgement. Ordinary-user notification access denied in real staging Auth/API acceptance.

## Implementation and findings

Jobs commit in the same transaction as service-intake leads. Duplicates enqueue no second job. Minute scheduled batches use FOR UPDATE SKIP LOCKED and two-minute leases, reject stale acknowledgement and recover crashes. Five-attempt cap with 1/5/15/60-minute backoff; final expiry becomes failed. Delivery never delays or reverses an enquiry receipt. Status is visible in authenticated lead details. Alerts contain brand/reference/secure CRM link, without contact details or customer message.

Initial live requests failed without detailed exception classification. The task now wraps global fetch to preserve its native Worker receiver and logs only safe reason categories; automatic retry then succeeded. The native receiver diagnosis is inferred from code and outcome rather than a captured first exception. Slack acknowledgement means the provider posted the message, not that a person read it. Incoming webhooks do not guarantee exactly-once delivery after ambiguous acknowledgement loss; a repeated alert can occur, carrying the same reference.

## Configuration, recovery and next action

Founder created THG Enquiry Alerts app, authorised #all-the-harley-group, and supplied its webhook. SLACK_WEBHOOK_URL is privately installed on the existing Worker; LEAD_NOTIFICATIONS_ENABLED=true. Credential resides only in ignored local files, never docs/source. Staging remains disabled. TRANSACTIONAL_EMAIL_ENABLED=false.

If an alert fails after five attempts, inspect channel history by stable lead reference and repair the connection before arranging an authorised manual resend. Do not reset accepted or actively leased jobs blindly. An authorised operator may reset one identified terminal failed job through service administration after checking ambiguity. Rollback: set notification flag false and redeploy; leads/pending jobs remain durable. Keep additive schema. Reverting to old synchronous notification code risks repeating alerts.

Requested field/Slack delivery/retry acceptance is complete. Existing H09/H10 still need customer-email sender/provider/bounce acceptance. Existing H42 needs hourly attempt cleanup, coordinated owner logout/session-expiry and password/advisory work. H07 backup/restore remains unproved. No wider production-ready claim. Evidence: evidence/live-fields-notifications-2026-10-07.json and evidence/staging-notification-acceptance.json. Synced sources remain untouched.
