# Revenue workflow: automation with oversight and quality review

Updated 3 October 2026. Target design, not live implementation. Governing commercial record: ../BUSINESS_DEFINITION.md. Existing backlog IDs remain authoritative.

## One coherent system

Use the existing website, shared intake, intended Supabase backend and admin CRM as the customer record. Use existing deployment/templates and provider-hosted billing. Implement one durable workflow runner using existing infrastructure where adequate; choose an external orchestrator only if a verified gap requires it. Do not add overlapping CRMs, onboarding databases or dashboards. AI drafts and classifies; validated business rules control state changes. Payment provider events, not AI or browser return pages, establish payment.

Every transition records customer ID, prior/new stage, evidence, rule version, timestamp and next action. Use idempotency, bounded retry, duplicate-event protection, timeouts and an exception queue. Reconcile provider state after outages. No secrets or client personal data in shared business documents.

| Stage             | Standard automated action                                                                | Gate / exception                                                                  | Pilot versus steady state                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Enquiry           | Validate, deduplicate, save, acknowledge and assign next action                          | Spam, failed persistence, failed notification, consent uncertainty                | Prove receipt and admin retrieval in pilot; thereafter alert on failures                       |
| Qualification     | Apply approved fit/scope rules; ask for missing information                              | Bespoke requirements, uncertain fit or unsupported claims                         | Validate scoring in pilot; standard fits advance automatically                                 |
| Proposal          | Generate approved package, price and terms; track acceptance                             | Discount, nonstandard terms or unapproved service needs founder decision          | Founder validates template/rules once; no routine proposal approval thereafter                 |
| Payment           | Hosted checkout/invoice; verify signed provider event and reconcile amount/customer      | Failed, disputed, partial or mismatched payment                                   | Test retries/replays in pilot; never advance from a success-page screenshot                    |
| Onboarding        | Request assets/access, validate completeness, remind within limits                       | Missing rights, credentials/access failure, overdue customer inputs               | Founder handles exceptions rather than collecting every asset manually                         |
| Build             | Populate approved template, draft grounded copy and create private preview               | Missing factual evidence, unusual integration, generation failure                 | First pilot reviewed closely; standard build runs automatically                                |
| Quality           | Automated content, links, responsive, accessibility, security and form checks            | Failed checks; selected founder quality review; all novel/high-risk work reviewed | Founder reviews all pilot launch outputs; steady-state sample policy set from measured quality |
| Customer approval | Request explicit approval, capture revision scope and approved version                   | Revisions beyond scope, no response, contradictory instructions                   | Required customer approval remains; silence is not approval                                    |
| Launch            | Check approved revision, payment, domain/email preservation, rollback and release policy | DNS conflict, failed checks, security issue or unsupported deployment             | Deliberate pilot release approval; later standard launch can run under pre-approved policy     |
| Recurring care    | Confirm subscription, monitor, test enquiries, schedule bounded updates and reports      | Billing failure, incident, quality drift, exceeded support allowance              | Automate routine care; founder reviews quality and material exceptions                         |

## Oversight view

One admin view: customer, stage, next action, action owner, time in stage, due date, confirmed payment state, quality result, customer approval version and exception severity. Alerts must identify the failed step and a safe recovery action. Deduplicate repeated alerts. Customer-facing promises must match approved capacity and service terms.

Founder retains initial commercial/risk decisions, selected quality reviews, novel/high-risk approvals, material complaints, security incidents and exceptions outside approved rules. He should not manually approve every normal proposal, build or task. Define quality sampling after the pilot using actual defect rates; do not invent a permanent cadence or capacity commitment.

## Acceptance before expansion (H50)

One paid pilot traverses the entire workflow with evidence at each stage, provider-confirmed receipts, successful client approval and launch, recurring collection and measured delivery/support time. Demonstrate duplicate-event safety, failed payment, missing onboarding asset, failed build, failed notification and retry recovery without duplicate charges or lost leads. Record intervention reasons and remove avoidable administration before scaling. A manually delivered website alone does not pass this gate.

This plan authorises no outreach, live billing, migration, production release or new automation activation. Those are separate execution steps governed by existing approvals and readiness evidence.
