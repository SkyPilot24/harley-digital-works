# Domain Portfolio release preparation — 12 October 2026

User authorised making the local module live. Release is prepared locally but blocked on real Supabase Auth/Data API staging acceptance. No production migration, import, push or deployment has occurred.

## Confirmed destination

- GitHub: SkyPilot24/harley-digital-works. Incorporated main be0f8d20afcaa8868b3f431b6cc7df883d635f0b without rewriting history; preserved unrelated canonical checkout changes.
- Production hosting: existing Cloudflare Worker. Legacy Vercel project is not this application's release destination.
- Supabase: THG Agency, worzpzbutngugwzhlvtj, organisation qauaygvndtvodrfyoypp. Preserve existing public listings/enquiries and trusted admin roles.

## Local implementation

The existing admin shell exposes Domain Portfolio. Shared storage uses the existing user-authenticated Supabase client, three private RLS-protected tables and an invoker import RPC. Private registrar contracts and notes never enter the public sales catalogue. Imports are atomic, observation conflicts fail closed, absent domains are retained, and costs/auto-renew remain unknown without evidence. Details use an optimistic server timestamp check; stale edits cannot silently overwrite another admin's changes. Renewal acknowledgements are scoped to expiry and escalation window. Notifications are in-app only.

The development-only preview still uses browser storage. It is excluded from production access. Browser-local inventory is not automatically uploaded.

CLI-generated, **UNAPPLIED** migration: `supabase/migrations/20261012155701_domain_portfolio_inventory.sql`. It replaces the earlier unpublished `20261012140000` draft; no applied history was rewritten.

IONOS export reconciles 53 unique active domains; 26 expiries fall within 90 days on 12 October. Older reference register contains 45 rows: 34 overlaps, 19 export-only and 11 reference-only. Preserve the reference-only rows for review; absence is not a disposal instruction. Raw export and contract values remain outside Git.

## Validation and blocker

Fresh application build, TypeScript, formatting and regression checks pass. Seven domain tests additionally cover XLS dates, invalid imports, atomic rollback, private fields, grants/RLS and stale timestamps using embedded PostgreSQL. These are not real Supabase Auth/PostgREST acceptance.

Local Docker cannot start: WSL is not installed; Docker API returns HTTP 500. No WSL installation or restart was performed. Provider pricing tool is unavailable; authenticated Supabase dashboard confirms Free plan and branching requires Pro, from US$25/month, plus branch compute US$0.01344/hour, taxes and other applicable usage. Organisation has six projects: total upgrade cost is not assumed to be US$25. No paid upgrade or branch was created.

## Exact next actions

1. Prefer an approved free local Supabase test environment: install/enable WSL and finish Docker setup, possibly requiring a Windows restart. Alternatively explicitly approve account-specific paid staging after full cost review.
2. Create synthetic admin and ordinary users in staging. Prove anon/non-admin reads and writes denied; admin import/details/acknowledgement allowed; direct RPC authorisation, repeat import, invalid-row rollback, conflict and stale-tab protection. Keep outbound effects disabled.
3. Verify application against staging with real Auth, desktop/mobile navigation, import preview, persistence, editing and renewal acknowledgements. Include missing configuration and network failure.
4. Review and apply only the additive production migration, verify grants/policies and unchanged public listing/enquiry data. Push a reviewable release branch/PR, run CI, then merge without rewriting history and verify the actual Cloudflare deployment.
5. Import the supplied IONOS export through the real founder-authenticated module, verify 53 private records and 26 current renewal alerts, and check existing admin/public journeys. Do not fabricate user identity in owner SQL to seed production.

Rollback: revert the app release while retaining the private tables and data. Do not drop imported records as a routine rollback. Financial reporting, valuations and sales-pipeline extensions remain subsequent approved stages.
