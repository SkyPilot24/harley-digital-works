# Customer approval acceptance — 14 October 2026

**Result: fictional customer browser path and active application guards passed; full client delivery remains incomplete.** This closes an evidence gap for the existing review workflow, not a real customer agreement, completed website or revenue-ready launch.

## Scope and source

Existing application source `c7f0e05951753ea371d42501b97646845416eb1a`, served only at localhost against THG Enquiry Staging `mfpnfxpgkfuqtedbcxvp`. Customer approval was enabled only in the temporary local process. Persisted private configuration retained disabled approval, payment and outbound services; no Worker or production release was made.

Created one disposable fictional Auth account with no administrator role, one disposable review project attached to the existing fictional client, and manually seeded readable proposal/preview artifacts. This setup is explicitly not evidence of the administrator publishing UI or real invitation/email delivery. Each artifact said it was fictional and not a customer agreement.

## Verified behaviour

| Check                                 | Evidence                                                                                                                                                                          | Outcome |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Invitation entry and sign-in          | Browser review route offered sign-in with a preserved project redirect; temporary fictional credentials reached the correct proposal                                              | PASS    |
| Review must be read and confirmed     | Browser showed Proposal Version 1 and disabled approval until its explicit checkbox was selected                                                                                  | PASS    |
| Version 1 approval                    | Browser displayed recorded approval; independent SQL found its matching user, revision and identity evidence                                                                      | PASS    |
| New version requires new confirmation | Version 2 displayed unapproved with approval disabled; earlier approval did not transfer. After Version 3 was seeded, browser displayed it unapproved, requiring a fresh checkbox | PASS    |
| Superseded/altered request rejection  | Authenticated local application requests for superseded Version 2 or an incorrect content digest returned 409                                                                     | PASS    |
| Latest version approval/retry         | Browser confirmed Version 3; active application retries returned 200. Independent SQL retained one approval for Version 3 and none for Version 2                                  | PASS    |
| Membership revocation and recovery    | Revoking only the fictional project membership caused the approval retry to return 409; restoration returned 200                                                                  | PASS    |
| Independent website review            | Browser displayed and approved Website Review Version 1 separately; independent SQL found its distinct approval                                                                   | PASS    |
| Approval is not launch authority      | Attempt to mark only the fictional project launched returned 400, “Launch requires matching verified release evidence”; independent query still showed review status              | PASS    |

Final pre-cleanup evidence: proposal approvals on Versions 1 and 3, no approval on Version 2, one separate preview approval. The stale-version browser interaction refreshed to Version 3 before a durable error view was captured. Therefore server rejection is supported by the explicit active application check, not the screenshot alone. The screenshot `Harley-updated-proposal-awaiting-approval-2026-10-14.jpg` depicts the newer unapproved version, not a captured rejection message.

Six runtime API checks are retained in `Harley-delivery-rehearsal-api-checks-2026-10-14.json`. Proposal and website approval screenshots show fictional-only confirmations. Browser reloads were attempted but no settled post-reload confirmation was retained before cleanup; durable persistence is proved by independent database retrieval, not a claimed reload screenshot.

## Cleanup verified

- Exact disposable project, approvals, identity evidence, artifacts, revisions and project access removed.
- Temporary Auth account and private credential fixture file removed. Independent SQL found zero matching Auth users, projects, revisions or approvals after interruption/recheck.
- No local listener remains on port 4183; the temporary enablement process is stopped. Approval was not enabled in the saved configuration.
- Browser tab closed. Existing staging client, payment fixture and migrations preserved. No real customer, administrator permission, email, SMS, payment or launch was created.

## Remaining launch-critical work

1. **Engineering/delivery:** prove actual administrator publishing/invitation, protected asset intake and a real client-template preview. Current evidence concerns the existing readable review artifact path only.
2. **Robbie:** reconcile seller registration number; finalise routing, support/backup coverage and cancellation/ownership terms before genuine agreement issue.
3. **Engineering/operations:** reconcile authentic deposit/balance and financial exceptions, require real release/onboarding/QA/DNS-email/rollback evidence, then prepare production review/approval.
4. **Operations:** prove sold customer lead routing, recovery/restore and provider-hosted care collection/failure/cancellation. Keep contractual monthly value separate from collected cash.
5. **Sales:** obtain a genuine accepted paying pilot through the existing qualification process. Fictional approvals and test receipts do not count as a customer or revenue.

Keep H20/H21/H50 open for their broader acceptance criteria. Proposed internal sequence remains 15–19 October, conditional on owner decisions/access and actual delivery effort; it is not a customer promise.

Verification runner note: after the six-check run, additional Auth/project fixture identity preflights were added to the optional runner. That final runner version was formatted and syntax-checked after cleanup; it was not rerun with a new fixture. The recorded application checks used unchanged runtime source named above.
