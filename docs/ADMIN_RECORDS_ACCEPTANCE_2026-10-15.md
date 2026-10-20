# Client, project and dashboard data acceptance — 15 October 2026

Status: locally implemented and tested, with real isolated staging/API/browser acceptance. Continues H03/H07/H42 on the existing draft PR #31 branch; no production release or migration.

## Implemented

- Client and project management use stable 25-row server pages, full-dataset counts and server-side literal search. Filter/search changes reset paging; project filters now include on-hold and archived records. Failed project reads expose retry rather than a false empty state. Missing totals remain unavailable.
- Dashboard counts use exact server count queries. Notification totals no longer depend on a downloaded, capped history. Recorded active-client monthly value, active client/project lists and client choices use ordered cursor reads with exact remaining-count checks; the reader continues even if the backend returns fewer rows than requested. Unexpected empty pages, missing counts, changed totals and non-advancing IDs fail visibly.
- Client list linked-project counts cover the visible clients' complete project metadata. The inspection drawer loads the selected account's full project records separately, so later projects cannot disappear beyond a global cap. Loading/error states distinguish unknown linked records from none.
- Care delivery receives the complete active-client count. Monthly values retain pence and exclude prospect values. Saved client records refresh the open drawer and related queries. Project changes invalidate both project and admin query families.
- Dashboard exception counts cover all new enquiries and unaccepted attempted notifications, independently of recent-activity previews. Project status does not imply verified preview/approval or successful notification retries.
- New projects default to unassigned and no target date. The operator can enter an explicit agreed date; the old automatic fourteen-day deadline is removed. Create fields have associated labels and native POST submission. Existing project dates are preserved.
- Shared pagination replaces repeated client/project controls. The earlier capped-response guard and its now-unused tests were removed after complete reads/count queries superseded it.

## Fresh verification

- Build/typecheck/format PASS. Lint: zero errors, nine existing Fast Refresh warnings.
- Full suite PASS: 66 smoke checks, 143 regression/integration tests and three service-worker checks. Test count reflects removal of the two superseded guard tests and six meaningful new record-query tests.
- Request/reader tests cover 1,205 records with a response cap of 37, exact all-status counts, penny-accurate values, notification count-only requests, server filtering/paging, missing/error results and cursor/count integrity failures.
- Final real staging run uses only `mfpnfxpgkfuqtedbcxvp`, with notification/email flags disabled. A temporary genuine signed-in administrator inserts 56 fictional clients and 56 fictional projects through ordinary Auth/PostgREST, then reads their three pages, full counts, literal punctuation search, pence values and all 55 projects linked to one account. Anonymous requests cannot retrieve them.
- Headless Edge against the isolated local runtime PASS: client/project paging, final-page contents, filter reset, 55-project workspace, client saved-value display and independent database readback, mobile document width at 375px, project request failure/retry, unassigned/undated creation defaults and dashboard render.
- Exact project/client IDs were removed in dependency order; independent queries confirm zero remaining fixture IDs and original client/project counts and monthly totals restored. Temporary Auth account and role removed. No private key is supplied to the browser/local app and no credentials are printed or written into this repository.

## Reproducibility and limits

`scripts/admin-records.test.mjs` runs in `npm test`. Network/browser acceptance is `node --experimental-strip-types scripts/verify-admin-records-staging.mjs`, requiring explicit `ADMIN_ACCEPTANCE_CONFIG` and, for browser coverage, `ADMIN_ACCEPTANCE_PLAYWRIGHT`. Shared setup/cleanup is `scripts/lib/admin-staging.mjs`; no private configuration is committed. It uses and closes local port 4187.

Counts and cursor reads are authenticated queries, not one transactionally consistent database snapshot. Detected count changes require retry. Monthly recorded-value calculation remains proportional to active client records; it is not provider revenue/subscription reconciliation. Staging proves the tested source and fictional workflows, not real owner access, every control, deployed Cloudflare configuration, customer communication or production readiness.

Next: finish permission/error handling and remaining admin controls, then current-source enquiry capture/recovery and the customer routing, billing/care, restore and release gates in the launch roadmap. Full platform launch remains RED. Existing founder/commercial issue holds remain in force; no merge, migration, live billing, external message or production release was performed.
