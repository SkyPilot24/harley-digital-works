# Trade and location offer correction — 14 October 2026

**Prepared and tested locally; not published to production.** A current-source audit found that active trade landing pages still displayed £95/month care and 14-day launch claims after the shared flagship offer had been corrected elsewhere.

## Changes

- All four trade data sets now display £1,495 website setup, £249/month care, schedule agreed after brief and two preview revision rounds. Removed unsupported average job/contract values and 98/100 PageSpeed claims from their rendered statistics.
- Replaced fixed 14-day launch and legacy prices in trade metadata and downstream template inputs. Default accreditation/insurance/job-value fields now require client-confirmed records rather than asserting memberships, liability cover or financial outcomes.
- Retained the recorded five-page/copy/revision/care offer. Tools, calculators and portals are additional scope, not automatically included. Customer SMS/email routing remains a proposed/agreed scope item requiring verification before launch; this change does not establish functioning SMS delivery.
- Location pages now show an agreed delivery schedule rather than treating illustrative turnaround data as an SLA.
- The old enquiry-price helper is unused by the current enquiry form. It was left unchanged; existing submitted lead records and historical enquiries were not rewritten.

## Validation

- Build, typecheck and format pass; existing full suite passes (66 smoke assertions, 133 tests and three service-worker tests). Lint has zero errors and nine existing warnings.
- Configured-private-value scan passes across 223 public artifacts. This is not a general credential audit or evidence of publication.
- Browser checks of `/trades/electricians` and `/locations/manchester` at 375 and 1440 widths show current care pricing, agreed scheduling and no horizontal overflow. Representative checks do not certify all routes or all factual marketing claims. Screenshot and raw browser observations retained separately.
- No new tests were added solely to mirror this copy change. Existing application checks were reused.

## Remaining release and revenue gates

Original pricing is unchanged. The isolated review branch remains the reviewable implementation; no main merge, production release, customer message, invoice or payment was performed by this continuation. Seller company-number reconciliation, actual invitation/assets/client website, sold notification routing, balance/care, support coverage and restore acceptance remain required.
