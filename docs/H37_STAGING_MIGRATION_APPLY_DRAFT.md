# H37 staging migration application draft

**Status:** Draft only. It does not authorise execution, configuration, provider registration, outbound email or production change.

**Prepared by:** Manus AI  
**Target:** isolated staging Supabase project `mfpnfxpgkfuqtedbcxvp`  
**Do not target:** production `worzpzbutngugwzhlvtj`

The requested identifier was written as `mf-pnfxpgkfuqtedbcxvp`. The repository’s current staging record is `mfpnfxpgkfuqtedbcxvp`, without the hyphen. Confirm that exact reference in the Supabase Dashboard or the CLI link prompt before any command that can write.

## Required migration order

1. `20261017201000_prospect_contact_suppression_controls.sql`
2. `20261017201700_resend_outreach_event_listener.sql`

Both files are currently unapplied. The second migration deliberately fails unless the first migration’s tables exist.

## Do not paste the migration SQL into the Dashboard

Do not paste either migration file into the SQL Editor or run it directly with `psql`. That would bypass `supabase_migrations.schema_migrations`, leaving the remote schema and migration history out of sync. Supabase documents `supabase db push` as the supported route for applying versioned migration files and records applied versions in `supabase_migrations.schema_migrations`.[1]

The Supabase CLI is not installed on this device, so the commands below are an execution draft only. Install and authenticate the approved CLI at the authorised execution time, then recheck its help output before use.

## Install and authenticate the CLI — approved staging window only

This Windows device has Node.js 24 and npm/npx 11, satisfying the CLI's Node.js 20-or-later requirement. It has no Supabase CLI, Scoop or winget. Use the documented project-local npm installation so the version is reviewable in `package.json` and the lockfile; do not use an unpinned global or ad-hoc download.[2]

Installing the dependency changes `package.json` and the lockfile. Treat this as a reviewable repository change. Do not install it before the same approval that covers the bounded staging change window.

```powershell
# From the repository root. Record the returned stable version in the change record.
npm.cmd view supabase version

# Replace <reviewed-stable-version> with that reviewed value; --save-exact pins it.
npm.cmd install --save-dev --save-exact supabase@<reviewed-stable-version>

# Confirm the project-local binary and exact supported command surface.
npx.cmd supabase --version
npx.cmd supabase --help

# Review the dependency change before using it for a remote operation.
npm.cmd audit
```

Create a dedicated, least-privilege personal access token for the staging operation in the Supabase Dashboard. It must be restricted to the applicable organisation/project and permissions, and should be revoked or rotated once the approved work is complete. Do not send the token in chat, include it in a command, set `SUPABASE_ACCESS_TOKEN`, use `--token`, put it in an `.env` file or paste it into shell history.

```powershell
# Interactive login only. Paste the token solely into the CLI's masked prompt.
npx.cmd supabase login

# Read-only confirmation that the signed-in identity can see the intended project.
npx.cmd supabase projects list
```

The CLI stores an interactive-login token in native credential storage where available; if it reports that it would fall back to a plaintext token file, stop and use an approved credential-storage route instead.[2] Do not proceed to `link` unless the read-only project list shows `mfpnfxpgkfuqtedbcxvp` and the operator has confirmed the isolated staging change window.

## SQL preflight — read only

Run the following queries only after confirming the selected Dashboard/CLI project reference is exactly `mfpnfxpgkfuqtedbcxvp`. They make no change.

```sql
-- Expected before application: zero rows.
SELECT version, name
FROM supabase_migrations.schema_migrations
WHERE version IN ('20261017201000', '20261017201700')
ORDER BY version;

-- Expected before application:
-- role_helper_present = true; every table value = NULL.
SELECT
  to_regprocedure('app_private.has_role(uuid,public.app_role)') IS NOT NULL
    AS role_helper_present,
  to_regclass('public.prospects') AS prospects,
  to_regclass('public.prospect_contacts') AS prospect_contacts,
  to_regclass('public.marketing_suppressions') AS marketing_suppressions,
  to_regclass('public.outreach_events') AS outreach_events;
```

**Stop** if either version is already recorded, the role helper is missing, any of the four tables exists, or the selected project is not staging. Reconcile state before attempting an apply; do not use `migration repair` merely to make the output look clean. Supabase describes `migration repair` as a history-only correction for a known, independently verified mismatch.[1]

## Supported migration application — execute only in an approved staging window

From the repository root, after the reviewed change is committed and the operator has specific authorisation for this staging change window:

```powershell
# Link only to the recorded isolated staging project. Enter the database password
# only into the interactive prompt; do not use -p or an environment variable.
npx.cmd supabase link --project-ref mfpnfxpgkfuqtedbcxvp

# Read-only inspection. STOP unless the remote-pending list contains exactly the
# two H37 versions below and no additional pending migration.
npx.cmd supabase migration list

# Read-only CLI preview. STOP unless it lists exactly the same two H37 migrations.
npx.cmd supabase db push --linked --dry-run

# Applies pending repository migrations in timestamp order and records history.
# Execute only after both preceding STOP conditions have been manually confirmed.
npx.cmd supabase db push --linked

# Read-only confirmation of the recorded remote migration versions.
npx.cmd supabase migration list
```

`npx.cmd supabase db push --linked` applies every pending repository migration, not a selected subset. Therefore, if either `npx.cmd supabase migration list` or `npx.cmd supabase db push --linked --dry-run` shows any pending version other than `20261017201000` and `20261017201700`, stop. Do not use this draft as a workaround to apply only these files while silently skipping another pending migration. Migration files are ordered by timestamp and should be applied by one operator at a time.[1]

Do **not** add `--include-seed`. Do **not** run `supabase db reset`, `supabase db pull`, `supabase migration repair`, direct `psql`, the SQL Editor, provider registration, secret configuration or any production command as part of this draft.

## SQL readback — after a successful push

Run these read-only queries against the same confirmed staging project and retain the results with the H37 acceptance evidence.

```sql
-- Expected after application: exactly the two rows below.
SELECT version, name
FROM supabase_migrations.schema_migrations
WHERE version IN ('20261017201000', '20261017201700')
ORDER BY version;

-- Expected after application: all four values are true.
SELECT
  to_regclass('public.prospects') IS NOT NULL AS prospects_exists,
  to_regclass('public.prospect_contacts') IS NOT NULL AS prospect_contacts_exists,
  to_regclass('public.marketing_suppressions') IS NOT NULL AS marketing_suppressions_exists,
  to_regclass('public.outreach_events') IS NOT NULL AS outreach_events_exists;

-- Expected after application: four functions, SECURITY INVOKER
-- (prosecdef = false), empty search_path configuration, and no anon or
-- authenticated EXECUTE privilege.
SELECT
  p.proname,
  p.prosecdef AS security_definer,
  p.proconfig,
  has_function_privilege('anon', p.oid, 'EXECUTE') AS anon_can_execute,
  has_function_privilege('authenticated', p.oid, 'EXECUTE')
    AS authenticated_can_execute,
  has_function_privilege('service_role', p.oid, 'EXECUTE')
    AS service_role_can_execute
FROM pg_proc AS p
JOIN pg_namespace AS n ON n.oid = p.pronamespace
WHERE n.nspname = 'public'
  AND p.proname IN (
    'evaluate_outreach_eligibility',
    'record_outreach_email_attempt',
    'record_resend_outreach_acceptance',
    'record_resend_outreach_webhook_event'
  )
ORDER BY p.proname;

-- Expected after application: all four tables have RLS enabled.
SELECT
  c.relname AS table_name,
  c.relrowsecurity AS rls_enabled
FROM pg_class AS c
JOIN pg_namespace AS n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relname IN (
    'prospects',
    'prospect_contacts',
    'marketing_suppressions',
    'outreach_events'
  )
ORDER BY c.relname;
```

A schema readback is not a staging acceptance pass. Before enabling `RESEND_WEBHOOK_ENABLED`, regenerate `src/integrations/supabase/types.ts`, keep all outbound controls disabled, and run every `PRE-*` and `STG-*` item in `docs/RESEND_OUTREACH_WEBHOOK_STAGING_ACCEPTANCE.md`. No Resend endpoint, signing secret, provider subscription or outbound send is included in this migration draft.

## Execution record required

Before closing the staging change window, record the operator, date/time, exact project reference, migration-list output, migration versions, SQL readbacks, regenerated type revision, rollback owner and the result of each acceptance item. Production remains out of scope until the production-promotion criteria and explicit founder release approval are complete.

## References

[1]: https://supabase.com/docs/guides/deployment/database-migrations "Supabase database migrations"
[2]: https://supabase.com/docs/guides/local-development/cli/getting-started "Supabase CLI installation and authentication"
