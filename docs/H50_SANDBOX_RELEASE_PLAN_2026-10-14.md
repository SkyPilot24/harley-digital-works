# H50 sandbox receiver: review and approval scope

**Latest 14 October acceptance update:** the user approved and we executed the isolated sandbox rehearsal. Authentic fictional £747.50 checkout delivery produced one durable receipt; same-build redeployment, concurrent duplicate replays, rejection controls and temporary credential failure/recovery passed with the limits recorded in `Harley-sandbox-acceptance-2026-10-14.md`. Temporary Worker and new staging fixtures removed; original fixture retained. New Stripe endpoint disabled, physical deletion remains. Production and live billing unchanged. Owner confirmed Harley DigitalWorks Ltd and not VAT-registered; supplied company number/address recorded internally. Exact company-number search returned no result; reconciliation requested before invoice issue. The full paid-client lifecycle remains RED. Earlier pending statements below describe previous checkpoints and are superseded by this dated update.


14 October 2026. This plan authorises nothing by itself. The project remains RED for the complete paid-client lifecycle.

Current reviewed runtime source checkpoint: `90e282fc75b13d8ed9fcbd6f608a8fb1f8f1d299`, branch `codex/launch-completion-2026-10-14`. This supersedes `a918919` with customer-use offer/payment-draft corrections. Fresh build/typecheck/format/full suite pass; lint nine existing warnings and configured-private-value scan passes across 223 public artifacts. The requested sandbox-only publication/provider-settings scope and exclusions are unchanged; approval is still pending. Any later runtime change requires fresh affected checks and artifact identity before publication. Documentation follow-ups may reference this runtime checkpoint separately from their own commit.

## Concrete change ready for review

The isolated review branch now integrates existing `codex/first-client-production` checkpoint `1ab1943` with canonical main `45012e4` and the payment-recovery corrections. This reuses the durable receipt/approval work already present in THG Enquiry Staging. All three request paths use the durable contract-bound receiver by default: `/api/payments/stripe`, `/api/stripe/webhook` and `/api/webhooks/stripe`. The prior default in-memory production fallback is removed; explicit injected storage is retained only for the legacy isolated test harness.

Included existing work: atomic payment contracts/receipts, authenticated exact-version approval, session revocation checks, immutable review artifacts, payment-to-project binding, launch prerequisites, and financial-event reconciliation/holds. These are source/local/staging evidence, not proof of a production-ready full lifecycle. Agreement terms, asset onboarding, authentic payment delivery, care, recovery and the client build still have open gates.

## Verified so far

- Combined build/typecheck/format pass; lint zero errors and nine existing warnings.
- Full combined test command: 66 smoke assertions, 133 tests and 3 service-worker tests pass. Local fixtures/emulated PostgreSQL do not prove Supabase network concurrency.
- Real local disabled receiver: all three POST paths return 503; GET paths return 405. Disabled POST responses have `Cache-Control: no-store`.
- Actual isolated staging Auth and local application checks: session/membership denial, private RPC denial, same-origin authenticated disabled gate, cross-user denial, global logout and retained-token rejection pass. Six request-origin checks pass. Temporary fictional account cleanup passes; independent SQL count is zero.
- Staging schema metadata confirms `payment_contracts`, `payment_receipts`, delivery approval/session/launch functions and applied migration history. One retained sandbox contract matches one paid receipt; no customer revenue is inferred. Public roles cannot execute the receipt RPC or access the payment tables. Service role has broader default non-DML grants; review privilege tightening separately rather than silently altering staging.
- Fresh staging-configured build inspected: 222 public artifacts contain none of the configured private key in raw, URI-encoded or base64 form, including compressed files. This is an exact-value exposure check, not a general credential audit.

## Proposed external execution requiring approval

1. **Preflight:** verify the Cloudflare account `6ccd86a1ec4535357f9bc51cd05e68cd`, minimum available permissions and that proposed Worker name `hdw-h50-01a139f2` is unused. Verify sandbox account `acct_1UKnAQGev7YjDfff` remains livemode=false and inspect existing webhook endpoints before registering another. No broad token grant or new paid plan is included.
2. **Isolated public receiver:** deploy this exact reviewed build to a separate workers.dev hostname using `.output/server/wrangler.h50-preview.json`. No production custom domain/routes, DNS changes or production Worker replacement. Generated configuration pins THG Enquiry Staging (`mfpnfxpgkfuqtedbcxvp`), disables every outbound service and all cron triggers, and starts with payments and customer approval disabled. It contains no private key.
3. **Private sandbox configuration:** install only the staging server credential and a separate sandbox webhook signing secret as provider secrets. Keep secrets out of logs, chat, commits, screenshots and deliverables. Retain test mode and disabled delivery/outreach/Slack/email. Enable only the sandbox payment receiver when ready for the authorised test; verify effective provider configuration before delivery.
4. **Authentic provider delivery:** register/reuse one sandbox-only webhook for the implemented event types. Use an existing fictional sandbox event or a new fictional test payment if needed; never a real card, live payment, real customer or outbound email. Bind the test session to the matching existing client/contract model. Record only minimised provider event/session/payment-intent and receipt IDs, without capability URLs.
5. **Acceptance:** verify authentic Stripe-signed delivery, exact contract/currency/amount/environment matching and independent receipt retrieval. Repeat across receiver restart and concurrent fresh deliveries; simulate persistence outage and reconcile recovery. One payment produces one immutable receipt and paid contract; another customer, partial payment, invalid signature, replay conflict or subscription event cannot activate it.
6. **Cleanup:** disable the receiver and remove only newly created test webhook/Worker resources when the rehearsal is complete unless retention is separately agreed. Remove newly created fictional fixture data by exact recorded IDs, retaining only explicitly agreed receipt evidence. Record provider cleanup/restart verification and leave production untouched.

The registered webhook and public preview are external configuration/publication actions, so approval is requested under the user's launch-review operating boundaries. This scope permits no production release, live billing, purchases, customer messages, broad permissions, production migrations or recurring job activation.

## Build and rollback instructions

Local preparation already executed: locked dependency install, fresh staging-configured `npm run build`, `node scripts/prepare-h50-preview.mjs` and private-value exposure check. The preparation script generates a separate target, refuses mixed staging configuration/enabled outbound settings, removes routes/crons, sets `keep_vars=false` and leaves the production generated config untouched.

Before deployment, inspect the generated target and obtain approval of its exact commit. A Wrangler dry-run still needs the available CLI; the local command could not resolve Wrangler in the restricted shell. Do not label this as a completed provider dry-run. Use the existing provider/toolchain after access is verified; do not create a broad token or change production CI to overcome this limitation.

Rollback is deletion/disabling of this isolated receiver and newly created sandbox webhook only. Do not roll back staging's pre-existing migrations or delete its existing retained receipt. No provider deployment or webhook registration has been performed by this continuation.

## Decision requested

Approve the sandbox-only external execution above, including the separate Worker and sandbox webhook, subject to the named preflight checks and retained exclusions. Client/customer communications and any eventual production release remain separate decisions after their gates pass.
