# Domain Portfolio release preparation — 12 October 2026

User authorised making the local module live. Release changes are committed and pushed to draft [PR #25](https://github.com/SkyPilot24/harley-digital-works/pull/25), blocked on real Supabase Auth/Data API staging acceptance. No main merge, production migration/import or deployment has occurred.

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

Fresh application build, TypeScript, formatting and regression checks pass. Eight domain tests additionally cover XLS dates, external domain types, invalid imports, atomic rollback, private fields, grants/RLS and stale timestamps using embedded PostgreSQL. These are not real Supabase Auth/PostgREST acceptance. The actual 53-row export declares ON_DOMAIN for all rows and freshly parses with zero errors; declared external/unverified domain types require registrar review rather than being labelled as IONOS registrations.

Initial local blocker was missing WSL; the approved free setup and subsequent repair results are recorded below. Provider pricing tool is unavailable; authenticated Supabase dashboard confirms Free plan and branching requires Pro, from US$25/month, plus branch compute US$0.01344/hour, taxes and other applicable usage. Organisation has six projects: total upgrade cost is not assumed to be US$25. No paid upgrade or branch was created.

## Exact next actions

1. Windows now explicitly requires a restart to complete its pending repair. After the user restarts, rerun the system-file check if required and verify vmcompute/WSL/Docker, then start the existing isolated local Supabase configuration. Do not initiate a restart automatically.
2. Create synthetic admin and ordinary users in staging. Prove anon/non-admin reads and writes denied; admin import/details/acknowledgement allowed; direct RPC authorisation, repeat import, invalid-row rollback, conflict and stale-tab protection. Keep outbound effects disabled.
3. Verify application against staging with real Auth, desktop/mobile navigation, import preview, persistence, editing and renewal acknowledgements. Include missing configuration and network failure.
4. Review and apply only the additive production migration, verify grants/policies and unchanged public listing/enquiry data. Push a reviewable release branch/PR, run CI, then merge without rewriting history and verify the actual Cloudflare deployment.
5. Import the supplied IONOS export through the real founder-authenticated module, verify 53 private records and 26 current renewal alerts, and check existing admin/public journeys. Do not fabricate user identity in owner SQL to seed production.

Rollback: revert the app release while retaining the private tables and data. Do not drop imported records as a routine rollback. Financial reporting, valuations and sales-pipeline extensions remain subsequent approved stages.

## Approved free setup follow-up — 12 October 2026

User approved free local testing. Installed official WSL via elevated Windows installer, exit 0; verified WSL 3.0.1.0 and kernel 6.18.40.1-1. Ran Windows feature setup, exit 0; elevated readback confirms VirtualMachinePlatform Enabled, RestartRequired Possible. WSL still reports virtualisation unavailable before restart. CPU firmware-virtualisation query returns false; recheck after reboot before prescribing BIOS changes. No restart was initiated, and no paid Supabase upgrade/branch was created.

Initialised ignored local-evidence/staging/supabase configuration, project id thg-domain-portfolio-test, API port 54421/database 54422, PostgreSQL 17; copied 21 application migrations. The local database is not yet started or tested. After Windows restart: check WSL status and Docker engine; if virtualisation remains unavailable, inspect firmware/hypervisor requirements. Then start isolated Supabase and continue the actual Auth/Data API acceptance/release sequence above. Production remains unchanged.

## Post-restart follow-up — 12 October 2026

A Windows restart was verified from the boot timestamp. WSL still cannot create a VM. Elevated diagnostics confirm WSL, VirtualMachinePlatform and HypervisorPlatform Enabled and HypervisorPresent true, but vmcompute service and its system binary are absent. Do not prescribe BIOS changes solely from the earlier CPU flags. Re-enabling VirtualMachinePlatform with DISM succeeded with exit 3010 (restart required). Windows CheckHealth reports the component store repairable; official RestoreHealth repair is in progress. No reboot was initiated by the agent.

Prepared `scripts/verify-domain-auth-local.mjs`, guarded to only use localhost:54421, for real anonymous/ordinary/admin Auth/Data API acceptance with synthetic fixtures. Syntax and lint pass; it has not run against a database yet. Shared storage now paginates below the Data API row cap and fails closed on loading errors, avoiding silent truncation of larger inventories; TypeScript and lint pass. Release remains blocked; no production migration, import, push or deployment.

## Completed Windows repair / restart checkpoint — 12 October 2026

Official DISM RestoreHealth completed successfully, exit 0. A subsequent elevated CheckHealth reports no component-store corruption. The vmcompute binary is still absent before feature activation. SFC exits 1 with the explicit message: "There is a system repair pending which requires reboot to complete. Restart Windows and run sfc again." The earlier feature enable returned 3010. No reboot was initiated by the agent. Next required user action is save work and restart Windows; then inspect WSL/Docker and finish SFC if needed before starting the isolated database.

Draft PR #25 was created and attached to this chat. GitHub Quality and Security Audit succeeded on 526a03b. Subsequent local checks pass for the external-domain safeguard and editable-metadata acceptance fixture. The real Auth script is prepared but unexecuted; synthetic browser credentials will be written only into ignored local-evidence when it runs. No real credentials, raw export, private contracts or test credentials are committed.
