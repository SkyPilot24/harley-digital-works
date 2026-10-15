# Admin lead desk — implementation and acceptance, 15 October 2026

Status: local code and isolated staging acceptance; production unchanged. Continues H03/H07/H42 on `codex/platform-completion-2026-10-15`, after checkpoint `fb9e97d` and existing launch review PR #29.

## Changes

- Enquiry records now use server-side search, status filtering and 25-record pages. Exact full-list counts drive metrics and tabs, independently of the current page/search. Stable creation-time/ID ordering resolves equal timestamps. The previously missing Contacted tab is available.
- Search escapes and quotes literal text for PostgREST regex matching. Commas, brackets, quotes, percent, underscore, backslash and asterisk cannot turn input into a different filter or wildcard. Existing name/email/company/package search scope is retained.
- Filter/search changes reset paging. Deletion resets to the first page; navigation disables while a page loads and at boundaries. Failed/missing totals show unavailable values and retry, rather than zero. Table overflow stays within a scrollable container on narrow screens.
- Saved lead responses refresh the open inspection drawer, list, counts and admin queries. Pipeline buttons disable while saving; updates and creation require a single returned record before success.
- Sign-in remains disabled until client hydration. Its native form uses POST, protecting credentials from native GET submission if client-side handling is unavailable. A JavaScript-disabled user sees an explanation. This is a local sign-in safeguard, not a claim that deployed authentication has changed.

## Verification scope

`scripts/admin-leads.test.mjs` exercises actual Supabase request construction with a bounded fake transport: exact-count HEAD requests, all statuses, offset/limit, deterministic ordering, quoted search and failure handling. It does not establish remote access control.

`scripts/verify-admin-leads-staging.mjs` requires an explicitly supplied private configuration path and refuses any backend except the existing isolated `mfpnfxpgkfuqtedbcxvp` staging project. It verifies disabled notification/email flags, provisions a temporary fictional administrator without sending email, creates 56 explicitly identified fictional leads, then removes those exact records/account and checks record/role cleanup. No existing fixture or customer record is deleted. No credentials are written to the repository or printed.

Real Auth/PostgREST acceptance PASS: signed-in admin reads all three pages (25/25/6), exact all/status totals, unique IDs despite identical timestamps, Contacted filtering, punctuation searches including literal asterisk, saved status plus independent query/readback, zero-row update rejection and anonymous access denial. First run expected anonymous RLS to return empty rows, but the backend correctly denies table access with 42501; the acceptance now recognises both secure outcomes. All runs completed exact fixture cleanup.

Headless Edge against the isolated local Vite runtime PASS: sign-in through the rendered form, all three enquiry pages, final-page disabling, filter reset and no document overflow at 375px. Dashboard lead-query outage and retry recovery passed with the real staging session. Final acceptance also PASS for JavaScript-disabled sign-in (POST/disabled submit), saved drawer status, independent persisted readback and client-side navigation to dashboard failure/recovery. Temporary port 4187 independently has no listener after cleanup. Browser tests do not prove the Cloudflare production build or a real owner session. No service key is passed to the browser/local runtime.

## Remaining gates

Clients/projects pagination and wider control/validation review remain open. Existing dashboard aggregates fail visibly when row-capped; they still need scalable aggregation. Full public-enquiry-to-owner handling, notification recovery, customer SMS/email, care/subscription and restore/release acceptance remain governed by the existing launch roadmap. Production release requires review and explicit authorisation; no merge, migration, deployment or live billing is implied by these checks.

Re-run default regressions with `npm test`. For network acceptance, explicitly set `ADMIN_ACCEPTANCE_CONFIG` to a verified staging configuration; optional `ADMIN_ACCEPTANCE_PLAYWRIGHT` points to the installed Playwright entry module. Then run `node --experimental-strip-types scripts/verify-admin-leads-staging.mjs`. The runner owns its temporary local port 4187 and closes its browser/server in cleanup. Its fixture configuration and credentials are deliberately absent from this document.

Final checks: build/typecheck/format PASS; lint zero errors and nine existing warnings; 66 smoke checks, 139 regression tests and three service-worker tests PASS. The first final build hit a Windows permission error in generated assets after elevated local browser execution; a normal-host rebuild passed without source changes or deletion. Review publication is separate from these checks.
