# Owner-facing enquiry workflow and monitoring decision — 17 October 2026

## Latest: authorised existing Slack webhook test PASS

Robbie supplied the existing enquiry webhook directly in ignored local configuration and requested the retry. URL shape validated without printing it; all local notification flags remained false. Pre-send marker search found no prior test. **Exactly one** plain-text webhook POST returned HTTP 200 and Slack body `ok`; no automatic retry. Independent channel history verified the exact `HDW-INBOUND-SLACK-20261017` marker in `#all-the-harley-group` (`C0BFQS2P2H1`), message timestamp `1792274627.436269`, displayed **23:03:47 BST on 17 October**. Immediate search indexing had not caught up; direct history supplied readback. The labelled test message remains as audit evidence. [Redacted test evidence](evidence/slack-webhook-test-2026-10-17.json).

No CRM/outbox record, production data/configuration change, live activation, provider email or campaign. This proves the supplied existing webhook-to-channel route; it does not freshly prove the complete deployed scheduler/outbox/retry chain or phone notification preferences. Existing browser/persistence and local retry tests remain separate evidence. **Next decision:** choose how Robbie will act on Slack enquiry alerts and the fallback desk-check cadence; nothing has been activated or scheduled. Earlier pending-webhook notes below are historical.

H08/H09/H19–H24/H50. **Owner-facing screen acceptance PASS: eight fresh staging/browser checks. Slack route verification remains pending private webhook access; no monitoring cadence or live activation agreed.** Continues [browser rehearsal](INBOUND_PILOT_REHEARSAL_RESULTS_2026-10-17.md). Tested application source af5ae9c in isolated `inbound-staging-config` worktree, local branch `codex/inbound-rehearsal-2026-10-17` (documentation base 82c96c0), backend only `mfpnfxpgkfuqtedbcxvp`.

## Actual Auth/browser acceptance

Read-only preflight found four existing staging administrators, all fictional `example.test`/`example.invalid` accounts, and an existing ordinary fictional actor. Used one of each. No account, permission, role or password created/changed; no real owner identity or session used. Supabase admin-generated magiclink was verified programmatically without sending email; real resulting Auth sessions were installed into isolated browser contexts using the public client. Server secret never entered browser. This proves authenticated role behaviour and UI, not Robbie personally typing his credentials or accepting the commercial process. [Supabase generateLink reference](https://supabase.com/docs/reference/javascript/auth-admin-generatelink).

Eight checks PASS:

1. Existing fictional administrator's real Auth session reaches enquiry desk.
2. Admin browser creates exact OWNER-B fictional enquiry and dated manual next action; separate service readback confirms source `admin_manual` and notes.
3. Admin browser opens enquiry and retrieves full original message plus saved owner/action.
4. Browser status change to qualified persists; no won/payment state.
5. Browser edit records simulated follow-up and replacement due action; both survive reload and independent readback.
6. Browser Create workspace creates same-ID prospect client, status lead and zero monthly value.
7. Enquiry desk stays within 375px viewport.
8. Existing ordinary user's real Auth session sees Access denied; direct Data API read and update are denied/return no rows; original notes independently unchanged.

Named fixture `HDW-INBOUND-20261017-OWNER-B` only. Notes explicitly label fictional/manual handling, initial review due 18 October at 10:00 UK and subsequent simulated action due 19 October at 10:00 UK. No actual follow-up sent or automatic reminder claimed. Original public intake/duplicate/outbox and discovery-project checks remain in the preceding rehearsal; not repeated unnecessarily.

Cleanup: exact lead/client removed; no notification job for admin_manual source. Test-created Auth sessions signed out with local scope only, browser contexts closed; prior sessions/actors untouched. Full role assignment snapshot unchanged. Independent connector readback **21:57:55 UTC / 22:57:55 UK**: zero fixture leads/clients/jobs, four administrators unchanged. Local runtime stopped; independent follow-up confirms no port 4187 listener. [Redacted machine evidence](evidence/inbound-owner-browser-2026-10-17.json). No provider send, production write, schema/configuration deployment, installation or application fix.

## Robbie's monitoring decision

In this chat Robbie selected **“Test the existing Slack alert route before choosing a cadence.”** This is specific authority to test the route; it is not live activation, a campaign or acceptance of twice-daily manual checks. Do not silently choose a manual cadence. Earlier no-messaging scope remains except this requested bounded Slack verification.

Repository `notification-delivery-2026-10-07.md` records actual enquiry handler using `SLACK_WEBHOOK_URL`, historically delivered to `#all-the-harley-group`, channel `C0BFQS2P2H1`. Fresh Slack channel search confirms that channel exists and is not archived. Generic Slack dispatcher also names #new-leads, but durable lead-notification task calls the default webhook directly; do not silently substitute the generic dispatcher route.

Existing local `.env.local`, `.env.production` and known `.dev.vars` locations did not provide the enquiry webhook. It resides as a deployed Worker secret; read-only binding metadata cannot retrieve the value. Slack connector posting would use a different delivery path and cannot establish application webhook health, so no substitute message was sent.

Prepared private **blank** `REHEARSAL_SLACK_WEBHOOK_URL` in the already ignored isolated `.env.local` and queued it to open. All six real notification/payment/delivery flags remain false. No new Slack webhook/app or credential rotation needed: enter the existing enquiry webhook directly into that private field, never chat. Do not change `SLACK_WEBHOOK_URL` or activate a scheduler just to perform this test.

## Exact one-message test ready for that credential

1. Validate the privately entered URL uses HTTPS, `hooks.slack.com`, `/services/`, and no userinfo/query/fragment; never print it. Verify supplied credential is the existing enquiry webhook for the recorded destination before sending. If destination differs or cannot be identified, stop and disclose instead of guessing.
2. Send **one** plain-text webhook POST, no retry: `TEST ONLY — HDW-INBOUND-SLACK-20261017. Robbie authorised this enquiry-alert route check. No customer enquiry, CRM record, payment or campaign has been created. This verifies webhook-to-channel delivery only; pilot activation is still off.` Disable link unfurls. No production CRM link, action buttons, personal details or customer claim.
3. Require HTTP success and Slack body `ok`; independently read back the unique marker in verified channel and save timestamp/permalink. Timeout/ambiguous receipt: search before considering any separately justified retry; do not repeat blindly.
4. Leave the test message as labelled audit evidence (no deletion requested). Store only response status, acknowledgement, channel ID and message permalink in repo; no webhook value. Keep scheduling flags false and local app stopped. Never call bulk claim RPC or reset jobs.

This verifies the actual webhook/destination, **not** the full deployed scheduled outbox/retry chain. Current intake/outbox durability and helper failure recovery have separate evidence. A fresh complete production notification exercise would need its exact live fixture/release scope; do not infer permission for production writes from this Slack-only test. Once the one-message result is available, Robbie can choose alert-led checking plus an explicit fallback owner/cadence; no automation will be activated by this document.

Next executable action: privately populate that field, then perform the already-authorised one-message test/readback. No additional approval is needed for that exact request; missing private credential is the blocker. All Manus/peer work remains preserved; application generated-route line-ending residue stays excluded from documentation commits.
