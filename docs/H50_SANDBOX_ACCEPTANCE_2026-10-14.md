# Harley sandbox acceptance and next launch gates

14 October 2026, Europe/London. User explicitly approved the separate sandbox rehearsal and instructed continuation. **Overall launch gate remains RED.** No real payment, production release, customer outreach or recurring subscription was authorised or performed.

## Completed and independently verified

- Published the previously tested runtime `90e282fc75b13d8ed9fcbd6f608a8fb1f8f1d299` to temporary Worker `hdw-h50-01a139f2`, in the approved Cloudflare account. Preflight confirmed the name unused and the existing account login. No new token grant or paid plan was introduced. Worker configuration used staging only, no production routes or cron jobs, and disabled customer approvals and outbound notifications.
- Stripe connector confirmed sandbox account `acct_1UKnAQGev7YjDfff`, livemode=false, and no pre-existing webhook endpoints. Created temporary endpoint `we_1UQS9IGev7YjDfffelfaBjIE` for only the implemented checkout/refund/dispute event types. Privately installed staging and sandbox signing credentials; no credential values are in this report.
- A fictional hosted Checkout for £747.50 completed using Stripe's public test card, fictional name and an invalid-domain test email, with payment-data saving unchecked. The session was bound to the existing fictional staging client before payment. This is test money, not revenue.
- Authentic event `evt_1UQSExGev7YjDfff4MhzD2AE` delivered to the receiver. Stripe independently reported session complete/paid, amount 74750 GBP minor units, livemode=false and zero pending webhooks; staging independently showed one matching immutable receipt and paid contract. Payment intent: `pi_3UQSEwGev7YjDfff0Yc77wzO`.
- A fresh deployment of the same build was followed by network replays. Six concurrent locally signed deliveries, new event IDs for the same payment, and both legacy endpoint aliases returned duplicate. Independent SQL still showed exactly one receipt.
- Invalid signature/environment returned 400; partial amount, different client reference and unknown session returned 409. A subscription-mode checkout was ignored without activating the deposit contract. All inspected responses used no-store.
- Temporarily substituting an unavailable credential on the isolated Worker produced 503/storage_unavailable after deployment propagation. Restoring the staging credential recovered the same receipt as duplicate. The first immediate outage observation still reached the earlier deployment; it was not counted as an outage pass. Bounded propagation observations retained in the accompanying JSON show both failure and recovery.

Initial disabled deployment: `1179d178-60ac-4eec-a46d-e88133c731ca`; enabled deployment: `4764b9d4-7fb5-4280-9a5d-dd7c641828a7`; same-build redeployment: `8de7966e-80ab-4bf5-810a-19ed2788e85a`. Secret changes also created isolated deployment versions. These are sandbox identities, not the production Worker SHA.

## Cleanup and remaining housekeeping

- Temporary Worker deleted; independent Cloudflare lookup returned 404, removing its installed secrets with it.
- Newly created staging receipt and contract deleted by exact recorded IDs. Independent query confirmed neither remained. Original staging fixture retained: one contract and one matching receipt, unchanged.
- Temporary hosted-checkout capability file removed and browser tabs closed. No capability URL is a deliverable.
- The new Stripe endpoint is **disabled**, independently confirmed by the update response. Physical deletion remains outstanding: the connector's available operations expose update/disable but not DELETE. Delete only `we_1UQS9IGev7YjDfffelfaBjIE` in the sandbox dashboard when access permits. Do not claim complete resource deletion.
- Stripe retains its test payment/event history and inline test product/price; these are fictional sandbox records, not live customer data. No real subscription or issued invoice exists from this rehearsal.

## What this proves, and what it does not

The deployed durable one-off receiver accepted an authentic provider delivery and persisted one contract-bound receipt. Replay, signature/binding controls and credential-failure recovery have public Worker-to-staging evidence.

Concurrent/restart replays were **locally signed payload controls**, not authentic Stripe redeliveries. They prove convergence of duplicates, not two simultaneous fresh provider payments. Credential substitution is not a database outage or proof of every transaction interruption. Refund/dispute, delayed methods, complete customer approval, balance, care, support and restore still need their own acceptance. The redirect screenshot only proves checkout returned to the website; payment proof comes from provider and database records.

The untested recurring-care schema/helper research was moved to `work/care-billing-draft`, excluded from the deployment and source changes, and has not been applied remotely. Prefer the existing provider-hosted recurring billing and an explicit operator reconciliation process for the pilot; build custom care automation only if that process cannot meet the requirements. This avoids making optional infrastructure a launch dependency.

## Current commercial facts and next actions

Owner confirmed **Harley DigitalWorks Ltd**, **not VAT-registered**, on 14 October. Owner supplied company number `546743` and business address; keep the supplied address in the internal seller record. A focused Companies House browser search returned no result for the supplied number. This is a verification gap, not proof the business is unregistered. The full number/register link is requested. Do not silently add leading zeros or invent a registration.

1. **Engineering, 15–16 October proposed:** finish independent refund/dispute/reconciliation and fresh-payment concurrency acceptance; prepare reviewable source integration. Obtain separate production approval only after readiness gates pass.
2. **Robbie, 15 October proposed:** reconcile the company number and seller/provider identity; settle sold SMS/email channels, support coverage and refund/ownership terms. Invoice drafts remain unissued.
3. **Delivery, 16–19 October proposed:** rehearse one fictional end-to-end client using the existing protected proposal/preview approvals, assets, actual template, balance and launch guard. Verify both sold enquiry channels and a backup restore. These dates depend on owner decisions and access, and are not customer promises.
4. **Operations/Robbie, before first go-live:** configure approved provider-hosted care to start at agreed go-live; prove collection, failure/cancellation visibility, responsible follow-up and accounting reconciliation. Record cash separately from contractual monthly value.
5. **Sales/Robbie, after the first-client gate:** reconcile replies to the already authorised P01 dispatch, qualify one paying pilot, then seek any required authority for new sends. No new contact or scaled acquisition is implied by this sandbox approval.

Launch completion requires one evidenced sale-to-care journey, confirmed seller/terms, actual customer approval, reconciled deposit/balance, operational routing/support/restore, and successful recurring collection. Optional domain inventory, branding extensions and custom dashboards stay outside that path.
