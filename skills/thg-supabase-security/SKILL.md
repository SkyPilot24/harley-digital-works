---
name: thg-supabase-security
description: Audit or harden Supabase authentication, roles, RLS, database functions and migrations for Harley Group or client projects using explicit access tests and release evidence.
metadata:
  owner: The Harley Group
  version: "1.0"
---

# THG Supabase Security

## Scope and target

Identify the requested audit or implementation scope. Read project instructions/status and confirm repository, intended project reference, deployed configuration, environment and account ownership. Conflicting CLI, application or Lovable references are a blocker to database writes; metadata access alone does not identify the application's backend. Never use a different connected project as a substitute.

Use the provider Supabase skill when available and current official documentation before implementation. Read https://supabase.com/changelog.md for relevant changes; if unavailable use the HTML changelog. Discover installed CLI versions and commands rather than guessing flags. Keep findings independent of current tools and preserve existing authorisation; skill invocation is not permission for production mutation.

## Access model before fixes

Make a compact resource/action matrix for anonymous visitors, signed-in users, other users/tenants, administrators and trusted server jobs. Map tables, views, RPC/functions, storage, auth triggers and server endpoints to allowed and denied operations. Capture actual grants, policies, owners and exposed schemas. Do not infer safety from an RLS toggle or hidden admin navigation.

Validate identity server-side using the appropriate current SDK verification path. Authorisation must use trusted roles/ownership, not editable user metadata or a client-supplied role/customer ID. Inspect signup/bootstrap triggers for privilege escalation; preserve legitimate administrators and define intentional provisioning. Consider stale claims and session/token lifetime when testing revocation.

For exposed tables inspect both grants and RLS policies for SELECT/INSERT/UPDATE/DELETE. Verify old-row access and resulting-row constraints, cross-tenant changes and broad permissive policies. Specify and test WITH CHECK for intended insert/update constraints; do not assume an omitted clause always permits reassignment because PostgreSQL may reuse USING. Signed-in status alone does not establish row ownership. Review views' effective privileges, exposed storage and anonymous auth separately from the anon database role.

## Privileged code and secrets

Inspect function signatures, owner, invoker/definer mode, search_path, body, grants and inherited PUBLIC EXECUTE, including overloads and default privileges for future functions. Prefer invoker. Where definer is necessary, justify the owner's privileges, constrain search_path, schema-qualify references, validate callers/inputs and narrowly grant execution. Its effective rights depend on the owner; do not assume RLS protects it. Internal jobs require a narrowly authorised server path, not a fabricated end-user identity.

Keep service-role/secret credentials server-only, outside public variables, browser bundles, logs and docs. A public publishable/legacy anon key is not itself a service secret; its safety depends on access controls. Privileged server endpoints must enforce their own authentication/authorisation or bounded public-intake rules because server credentials can bypass RLS. Inspect direct API paths that bypass UI rate limits, spam controls or workflow constraints.

## Safe remediation and verification

Start read-only. Prepare minimal changes in an isolated local/staging environment with synthetic data and outbound effects disabled. Never test destructive or privilege-escalating operations against production simply to validate the skill. Generate migration files using the supported CLI workflow; do not rewrite applied history. Review grants/policies/functions together, backup/recovery and application compatibility. Coordinate secure server intake before removing a public insert path so neither an insecure bypass nor a broken conversion path is left live.

Prove allowed and denied operations for each relevant actor through database tests and the real Auth/Data API path. Include cross-tenant reads/writes, self-promotion, direct RPC execution, unauthenticated server calls, retry/concurrency and missing configuration as relevant. Owner/service-role-only SQL tests cannot prove end-user RLS. An ephemeral PostgreSQL test is not a complete Supabase Auth/PostgREST test.

Run available security advisors and applicable app checks; inspect failures rather than broadening privileges to silence them. Reconsider after repeated identical failures. Apply production migrations only within explicit task authorisation and confirmed target/release sequence. Verify actual applied migration, grants, policies and live journeys afterwards; record blockers honestly if access is unavailable.

## Report

For each issue give affected resource, permitted attack path, evidence, severity, smallest correction, dependency and acceptance test. Report project/environment and commit, migration filename and applied/unapplied state, tests actually run and residual limits. Preserve secrets and personal data. Update the existing backlog/status/handover. Never equate a migration file, green build or admin account with proven secure production access.

## Authoritative references

- [RLS and grants](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Function security and execution privileges](https://supabase.com/docs/guides/database/functions)
- [Securing the Data API](https://supabase.com/docs/guides/api/securing-your-api)
- [PostgreSQL policy semantics](https://www.postgresql.org/docs/current/sql-createpolicy.html)

Recheck these when implementing; this skill defines the review method rather than freezing provider behaviour.
