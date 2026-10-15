# Sandbox refund acceptance — 14 October 2026

**Authentic test refund and staging payment-hold predicate verified.** This is financial-exception evidence for the existing receiver, not a real refund, live launch acceptance, customer revenue or completion of H50.

## Verified execution

- Fresh read confirmed sandbox account `acct_1UKnAQGev7YjDfff` and the prior fictional payment `pi_3UQSEwGev7YjDfff0Yc77wzO`: livemode=false, GBP74750 minor units, succeeded, rehearsal metadata matching the 14 October disposable checkout. The original retained staging fixture uses another payment intent and was not refunded.
- Recreated only the approved isolated Worker `hdw-h50-01a139f2` after confirming it absent. Used the validated runtime `280b0e615c1c777c526e67b51b857fa37ac513af` and staging-only configuration, with no production routes/crons, disabled approvals and outbound services. Disabled deployment `f532285d-596f-4876-9ca8-32d5a0860c74`; sandbox receiver enablement `84c9e88b-a2e6-4308-aee3-08b79f48bfa6`.
- Created refund-only temporary sandbox endpoint `we_1UQT9YGev7YjDfffcDrnHlgF`, because the earlier endpoint's one-time signing secret was no longer held in memory. The earlier endpoint stayed disabled. Installed staging and signing credentials privately, keeping all real/live targets outside scope.
- Test refund `re_3UQSEwGev7YjDfff0vhM3gSV` succeeded for the fictional £747.50 payment. No real money, real card, customer invoice, email or SMS was involved.
- Authentic Stripe `charge.refunded` event `evt_3UQSEwGev7YjDfff0qc9vYsr` reached the signed receiver. Independent Stripe retrieval showed livemode=false, amount_refunded74750 and pending_webhooks0; independent staging retrieval found matching immutable refund record, charge `ch_3UQSEwGev7YjDfff0O4QbaQS`, amount74750 and status refunded.
- Staging `payment_intent_blocked(testIntent,false)` changed from false before delivery to true afterwards. This proves the sandbox financial-hold predicate. It does not prove the complete live project launch path, which requires live receipts and release evidence.
- Four concurrent exact-event locally signed replays returned duplicate. Invalid signature/environment/currency returned400. A conflicting amount for the same signed event returned503/storage_unavailable, leaving the recorded74750 amount intact. Independent SQL retained exactly one adverse event and the original retained receipt.

Replay and negative controls used locally signed copies of the provider event, not authentic provider redelivery. The conflicting-event result is fail-closed, but a503 does not distinguish this permanent conflict from an outage; operational triage is still required. No genuine dispute lifecycle, partial-refund sequence or live financial reconciliation is claimed.

## Cleanup

- Refund-only endpoint disabled; independent endpoint listing confirms both temporary rehearsal endpoints disabled. Physical deletion remains outstanding because the connector exposes no DELETE operation.
- Temporary Worker and its installed secrets removed; independent Cloudflare lookup returned404. Saved preview configuration reset to disabled.
- Only the exact new sandbox adverse event removed. Independent query found zero new adverse records, one original retained receipt, and a cleared fixture hold. Clearing an explicitly disposable test fixture is not a production hold-release mechanism.
- Stripe retains its fictional refund/payment history. The earlier 14 October disposable test checkout is now fully refunded in sandbox; the original 12 October retained fixture is unchanged.

## Next gates

Keep production and H50 RED. Still required: dispute/reconciliation acceptance, authentic balance/complete client delivery, actual invitation/assets/template, sold SMS/email routing, recurring-care collection/failure/cancellation, support and restore evidence, seller-number reconciliation and a genuine paying pilot. Existing automated tests and green PR checks do not substitute for those operational facts.
