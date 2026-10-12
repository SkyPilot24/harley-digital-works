# First electrical contractor client rehearsal — H50

12 October 2026. Local preparation and source/test assessment; not a completed paid pilot.

## Gate: RED — Not Ready

### Subsequent sandbox execution — 12 October

Stripe connection now succeeds: The Harley Group sandbox, `acct_1UKnAQGev7YjDfff`, livemode=false. Created one fictional £747.50 GBP hosted deposit Checkout Session, completed it in the browser using Stripe's public sandbox card, and verified provider state independently through the connector. Checkout is complete/paid; matching PaymentIntent succeeded with amount_received=74750 and rehearsal/milestone metadata. No real funds moved and real collected revenue remains zero. Saved minimised evidence: `evidence/stripe-sandbox-deposit-2026-10-12.json`; no keys, card details, real personal data or checkout capability URL saved.

Read-only webhook endpoint inventory returned zero entries, has_more=false. Provider test payment passes; agency persistence/reconciliation, webhook authenticity/replays, failed payment, balance, subscription and client delivery do not pass by implication. The earlier authentication blocker is resolved; all earlier NOT RUN/source-inspection limits remain. Next dependency is an isolated application receiver and securely configured sandbox credentials, not another account-discovery retry. No application changes, production writes or deployment. Production gate remains RED.

The complete agreement/payment/onboarding/approval/care journey lacks runtime evidence. This is an unverified release gate, not a claim that the live enquiry desk is broken. No live transaction, customer communication, database write, client build or deployment was performed. Current baseline: main, e90da3bc6f8c8892c939ecbc3a360916b6e71462. Existing local prospect/domain work preserved.

## What was checked

| Check | Result | Evidence / limit |
| --- | --- | --- |
| Current shared records and offer | PASS: read | PROJECT_STATUS, HANDOVER, BUSINESS_DEFINITION, MASTER_BACKLOG, COMMERCIAL_OFFER_MANAGED and REVENUE_WORKFLOW; historical implementation claims are not current tests |
| Narrow existing revenue regressions | PASS: 32/32, exit 0 | `node --experimental-strip-types --test scripts/revenue-readiness.test.mjs`; local tests, not provider or browser proof |
| Prototype route deferral | PASS in existing unit test; source corroborated | src/lib/launch-scope.ts and src/routes/__root.tsx:85; production defers proposals, onboarding, care-desk and track to contact; no fresh live browser check |
| Proposal acceptance | FAIL as a candidate implementation, source inspection | src/routes/proposals.tsx:246: timeout updates local state and claims signature/build reservation; no durable acceptance here; route remains deferred |
| Payment sandbox identification | BLOCKED | Connected Stripe account discovery requested authentication twice, including one prescribed retry; no account/context/livemode returned. No third attempt or provider writes |
| Provider payment implementation | NOT DEMONSTRATED | No payment/Stripe webhook handler identified in inspected server/src source; CareBillingPortalDesk has MOCK_INVOICES at line 97 and toast-only receipt/portal actions at line 143. Not a provider payment test |
| Onboarding | FAIL as a candidate implementation, source inspection | ContractorOnboardingWizard:52 defaults NICEIC; :138 creates a weak local token; :157 records obsolete £95 monthly value; :161 warns on failed client insert then continues. Route deferred; no submission |
| Care receipt | FAIL as a candidate implementation, source inspection | care-desk.tsx:103 awaits insert without checking returned error, then claims success; only filenames recorded. Route deferred; no submission |
| Client template build, mobile/keyboard/SEO/form QA | NOT RUN | kindred-spark is a separate client repository; recorded f1481fe template is historical evidence only. No verified isolated client preview was available in this run |
| Version approval, launch, DNS/email preservation | NOT RUN | Require isolated template execution and exact preview revision; production DNS and deployment untouched |
| Backup restore, session expiry, customer email delivery | NOT RUN | Existing H07/H42/H09 gates remain open; no production or staging backend operations |
| Build/typecheck/full suite | NOT RUN | No application implementation changes; narrow existing tests chosen for this assessment |

## Prepared rehearsal inputs

Use `FIRST_CLIENT_REHEARSAL_FIXTURE_2026-10-12.json` only in a verified isolated sandbox. It represents a fictional Bristol electrical business, never a prospect, legal entity, paying customer or accreditation claim. Do not import into live CRM. Use `FIRST_CLIENT_PROPOSAL_DRAFT_2026-10-12.md` as the reviewable agreement skeleton, not an executable contract or invoice.

The offer records disagree on SMS/email versus Slack/email routing and two versus two-to-three concurrent builds. Use the stricter two-build cap. Preserve the approved £1,495 / £249 prices; do not silently reduce promised routing. Settle the delivery channel before issuing a proposal. Recorded VAT terminology also needs seller/accountant reconciliation before an invoice; this rehearsal changes no tax setting. Daily backups and response promises need operational proof. No guaranteed launch date or results.

## Run sequence and acceptance

| Step | Exercise | Evidence needed to pass | Current state / owner |
| --- | --- | --- | --- |
| 1 Agreement | Generate one versioned scope, obtain explicit sandbox acceptance; reload | Persisted proposal ID/version, acceptance actor/time and unchanged approved totals; acceptance alone does not mark paid | Prepared draft; implementation unverified — Codex |
| 2 Deposit | £747.50 GBP hosted sandbox payment | Provider-confirmed paid event matched to client/proposal/currency/amount; stable receipt and ledger | BLOCKED on verified Stripe sandbox — account owner, then Codex |
| 3 Payment resilience | Replay same event; failed, partial, wrong currency/customer, invalid signature and success-page-only attempts | One recorded payment, no duplicate charge or activation; failures stay unpaid with safe recovery; reconcile after interruption | NOT RUN — Codex in sandbox |
| 4 Onboarding | Save brief/assets, then omit required logo permission and accreditation evidence | Durable one-project record; missing assets hold build; no invented certifications; other-client access denied | Fixture ready; NOT RUN — Codex |
| 5 Build | Populate five-page template in dedicated client sandbox; simulate build failure | Rights-cleared labelled demo, private preview, build log, failed build cannot advance | NOT RUN — Codex/client-template workflow |
| 6 Quality | Desktop/mobile, keyboard, links, metadata/schema, contact receipt/retrieval, failed notification retry | Dated results at exact revision; saved enquiry survives notification failure; no critical launch defect | NOT RUN — Codex |
| 7 Approval/balance | Approve exact preview; pay £747.50 balance; alter preview after approval | Auditable approval; changed version invalidates release eligibility; balance reconciles once | NOT RUN — Codex |
| 8 Launch rehearsal | Review domain/email record inventory and rollback without touching live DNS | Record owner-authorised plan, preserved MX/TXT dependencies and tested rollback on isolated hostname | NOT RUN — Codex; owner for actual release |
| 9 Care | Sandbox £249 monthly cycle, failed renewal/cancellation and one care ticket | Provider and ledger agree; owner receives ticket; accurate receipt; monitored next action; no false revenue | NOT RUN — Codex |
| 10 Recovery/economics | Restore fictional client data in isolation; time each transition | Restored data retrievable; labour/cost/intervention log; routine versus exception ownership | NOT RUN — Codex |

Routine steps should use the existing customer record and approved rules. Any temporary manual handling must be logged as an intervention; a manual website delivery does not satisfy automated H50 acceptance. Rehearsal completion does not establish a real paid pilot or recurring revenue.

## Effort record

No client build or support time has been measured. Log actual start/end, active minutes, tool/provider cost, retry reason and founder minutes at each step. The 14-hour build estimate in the commercial model remains an estimate. Use observed totals to decide whether two simultaneous builds fit available capacity.

## Exact next action

Identify an existing Stripe account and isolated sandbox through authenticated read-only account discovery, returning account context and livemode=false without exposing keys. Then verify provider test access and implement the smallest hosted-payment/receipt path with replay and failure tests in an isolated code branch. Do not activate live billing. Account discovery is the first external dependency; prototype rebuilding, outreach expansion and new dashboards are not prerequisites to identifying it.

H19–H25/H50 remain open. No code change, commit, push, external message or deployment in this run.
