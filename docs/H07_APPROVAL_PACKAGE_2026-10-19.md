# H07 production recovery approval package — 19 October 2026

**Status: B1 metadata-only approval executed and recorded; B2 production export/restore remains HOLD.**
**Recommendation: verify encrypted storage, settle sensitive-data scope and rehearse a compatible restore method before requesting B2.**

[B1 findings and completeness evidence](H07_B1_METADATA_RESULTS_2026-10-19.md): bounded catalogues complete; detailed source metadata retained locally, no customer rows/secrets/export/changes. The connector required two read-only calls because its initial response exposed only the last result set; the output adaptation preserved the approved SELECT bodies.

This package follows the verified [local recovery lab](THG_LAB_RECOVERY_2026-10-19.md) and the existing [migration/recovery hold](PILOT_SECURITY_RELEASE_PACKAGE_2026-10-17.md). It does not authorise the original or review-draft projects migration. H07 Approval B here concerns production data recovery, not section B of the older release checklist.

## 1. Decision brief

The Dell's synthetic backup/restore is a tool check, not production recovery proof. Preparing an exact production dump/restore command before knowing the actual database version, dependencies and sensitive data scope would create an unsafe blanket approval.

B1 was separately approved and completed on 19 October. It covered only the attached bounded, read-only catalogue queries against the canonical production target, excluding customer rows, object contents, secrets and changes. Its findings inform B2's exact export manifest and restore procedure; they do not authorise B2.

| Stage | Deliverable | Current gate |
| --- | --- | --- |
| Local preparation | Installed CLI; synthetic dump/restore; isolation/resource checks | Tested, with restart correction recorded below |
| B1 production metadata preflight | Versions, schema/column/type catalogue, FK edges, extension and role attributes, RLS flags, publication metadata, database size | Completed under separate explicit metadata-only approval |
| B2 production export and local restore | One approved encrypted recovery set, independent isolated restore, integrity and recovery results | HOLD until B1 and the storage/compatibility gates pass |
| Full H07 acceptance | Recovery ownership, agreed objectives, tested coverage and remaining exclusions | Open; neither stage silently closes it |

Repository preparation base: PR #43 head dcb45bb46c0478b105d60e0a2458404b873cb2bc; main remains 0845172c455b756a0a6eb24af1e7b56d78c348e9 at the start of this work. Only documentation and review SQL are proposed here. No canonical checkout on the development machine was changed.

## 2. B1: exact approval scope

**Source:** only the production project identified by the canonical target entry in AGENTS.md. Its identity and catalogue access were matched through the THG connector during B1; the source engine version was returned by the read-only query and retained locally. The operator must match the connector target to that reference before querying. Do not use shared staging or another accessible account as a substitute.

**Operator:** Codex prepares/runs the approved catalogue query; Robbie is the proposed accountable owner and authorises the scope. No new user, role, grant, credential, login or connection configuration may be created or changed.

**Reviewed local SQL SHA-256:** `f595cfddbdc23b9dcb537b8f44a20a562162116a98d9f7e721392ab60ff37580` (local artifact bytes). No production execution.

**Query:** [H07_METADATA_PREFLIGHT_REVIEW_ONLY.sql](release-package/2026-10-19/H07_METADATA_PREFLIGHT_REVIEW_ONLY.sql). One read-only transaction, rolled back at the end; each statement has a five-second timeout and two-second lock timeout. Lists are capped, include totals, and must not be treated as complete when truncated.

Included:
- Server version and database size.
- Non-system schema/relation names, column names/types, relation owners, RLS flags and estimated row counts.
- Installed extension names/versions; source/target FK table names and validation flags.
- Policy names/command categories, role privilege attributes, publication flags and user-trigger counts.

Excluded:
- Reads from application, Auth, Storage, queue or Vault data tables.
- Customer records, password hashes, session/refresh tokens, MFA factors, provider keys, connection strings and encryption keys.
- Function bodies, trigger definitions, policy expressions, view definitions and cron command text that might embed secrets.
- Exports/dumps, sample data, scans of environment files, production writes, password resets, migrations, releases, messages, cloud creation or spending.

Only non-secret catalogue results may pass through the existing authorised connector. Keep detailed results restricted locally; publish a minimal redacted findings summary, never customer data or secret-bearing definitions. Estimated rows are not exact acceptance counts. A permission error, wrong target, timeout, truncated result or unexpected secret-looking result stops the preflight; do not widen queries or access automatically.

**Proposed approval wording:** “Approve H07 B1: run the reviewed metadata-only SQL once against the canonical production project, through its existing authorised connection, with no customer-row reads, secrets, export or changes.”

Robbie approved this B1 scope in the current chat and it has been executed. The output-transport adaptation is recorded in the B1 findings. B1 approval does not include B2.

## 3. Proposed B2 recovery scope — not yet an executable approval

Recommend a database recovery drill that preserves schema, data, ownership, grants, policies, constraints, sequences, triggers, functions, extension requirements and migration provenance. An allowlisted application-only extract may be useful separately but must not be labelled a full database recovery backup.

| Content | Proposed handling / acceptance boundary |
| --- | --- |
| Application database records | Include only under the final approved object manifest; treat all records as confidential |
| Auth records | Explicit sensitive-data decision: an account-preserving dump can contain password hashes, session tokens or MFA material; do not infer permission from an ordinary database backup request |
| Database roles | Capture required attributes/membership without database login passwords; use fresh local credentials for any restored login role |
| Managed Auth/Storage schemas | Use an exact reviewed managed-schema baseline and object mapping; stop on version or ownership conflicts |
| Migration history | Preserve as provenance, not permission to replay pending migrations |
| Vault / encrypted columns | Record dependency presence first; no root-key extraction, decrypted values or secret recovery is authorised. If recoverability needs keys, return a separate owner-managed key-handling proposal |
| Storage objects / uploaded files | Excluded from the database drill unless a separately specified object-copy scope is approved; metadata is not file recovery |
| Application/deployment settings, OAuth, SMTP, Edge Functions, DNS, webhooks and provider keys | No production configuration transfer or activation; source code and separate recovery procedures govern these |
| Off-device copy | No transfer to development machine, Drive, Git, cloud service or removable media until destination/access scope is named and approved |

Supabase distinguishes database backups from Storage objects. Its logical restore guidance also requires attention to managed-schema customisations, migration history, roles and version compatibility. [Database backup coverage](https://supabase.com/docs/guides/platform/backups), [logical restore guidance](https://supabase.com/docs/guides/platform/migrating-within-supabase/backup-restore).

B2 must name every included schema and every exclusion after B1. It must explicitly cover sensitive authentication data if included. Unknown sensitive tables or new dependencies cause HOLD; never silently omit them to obtain a passing restore or expand the approved data scope.

## 4. Consistency and tooling decision

The installed Supabase CLI is pinned at 2.121.0 and local database image at 17.11.0.004. B1 inventoried the source engine and dependencies; detailed values remain local. Service-schema and extension compatibility still require verification. Match source/restore database capabilities and extension/service-schema versions before choosing the export tool/image; do not assume the installed PostgreSQL 17 image is compatible.

The official CLI produces filtered schema/roles/data SQL. The default schema dump is not a full data backup, and separate exports must not be assumed to share a snapshot. The CLI help inspected here does not expose a snapshot argument. [CLI dump reference](https://supabase.com/docs/reference/cli/supabase-db-dump).

Preferred candidate for the database drill: one native custom-format database dump using a consistent snapshot, with required non-password role metadata captured separately. A scoped archive does not automatically include dependencies; cluster roles are not part of pg_dump. Supabase internals can make an unmodified native restore fail, so this route is a candidate requiring a matching disposable target and synthetic compatibility rehearsal, not a verified production command. [pg_dump](https://www.postgresql.org/docs/17/app-pgdump.html), [pg_dumpall](https://www.postgresql.org/docs/17/app-pg-dumpall.html).

Alternative: the official filtered CLI route, only after its generated commands and a demonstrably consistent multi-file strategy have been reviewed and rehearsed. Do not pause production writes, change jobs or impose a maintenance window to solve consistency without explicit approval.

B2's command manifest must pin:
- Actual client/server versions, image digest and TLS-verified connection method; direct or session-mode connection only after reachability/access review.
- Exact schemas/tables, dependency/role baseline and snapshot method.
- A single export worker, finite lock/runtime limits and an agreed source-load/data-size cap.
- Non-secret command arguments, credentials supplied privately without command-line URLs/passwords, no debug/transcript output, checked exit statuses and warnings.
- Exact restore-only target, encrypted source/output handling and permitted cleanup.

Do not copy documentation password-reset instructions into this plan. Missing credentials are a stop condition, not authority to reset credentials. Do not run an unrestricted default CLI dump, link production, or use production as a restore destination.

## 5. Storage and access gates

Current observation: the local encryption status command was denied even outside the sandbox because Windows administrative access was required. The storage-protection gate is not met. Detailed local security status is retained in the restricted runbook; no production data may be staged or restored until the gate passes. No age, 7z or gpg executable was found on the current PATH; this does not prove no encryption software is installed elsewhere. Free local disk space is substantial, but capacity alone is not a security control.

Before B2:
1. Robbie verifies encryption and private recovery-key custody without exposing the key to chat/tools. The dedicated backup location must be local, non-synchronised, access-restricted and on verified encrypted storage.
2. Pin and test an approved authenticated-encryption method with a synthetic file, including independent decryption using the owner's recovery method. No encryption software installation or volume reconfiguration occurs under this preparation task.
3. Cover all plaintext surfaces: export staging, temporary files, Docker data disk and the restored database volume. An encrypted final archive does not protect a plaintext restored Docker volume.
4. Avoid text-shell pipelines for binary archives. Use native file output or a verified byte-preserving stream. Never persist plaintext to an ordinary workspace or dump it into tool output.
5. Proposed retention for this one-off drill: retain the encrypted successful recovery set for seven days, with owner review before expiry; delete failed plaintext staging as soon as safe cleanup is approved; remove the disposable restored volume after acceptance. These are proposed policies, not executed deletions.
6. Do not call a copy on the same laptop independent disaster protection. An off-device backup and its recovery test require a separately named approved destination.

**Proposed owner:** Robbie controls data scope, encryption recovery and retention; Codex operates only within the approved manifest. Do not claim an independent second custodian exists.

## 6. Restore isolation and checks

Create a new disposable restore container and fresh volume, distinct from the synthetic lab volume. No published ports, internal-only network, no shared application volumes, no mounted production credentials, no application services, schedulers, SMTP, webhook receiver or cloud linkage. Match Docker's stored network mode to the actual internal network before starting. Keep the original lab volume intact.

The current lab default is 2 CPUs / 2 GiB RAM. B1 size/compatibility evidence must justify those bounds; stop and propose revised limits if inadequate. Restore tooling can execute database-defined code; keep egress blocked and review source-defined jobs and extensions before any service activation. Use a fresh database and stop on the first restore error rather than dropping conflicting objects, omitting errors or disabling security. [pg_restore](https://www.postgresql.org/docs/17/app-pgrestore.html).

Acceptance manifest:
- Encrypted artifact checksum/size, decryption check and archive readability. Plaintext hashes and detailed object manifests stay restricted.
- Snapshot-aligned table counts and deterministic content checks, sequences, FKs, constraints and dependency edges. Later source counts after live writes are not a valid snapshot comparison.
- No orphaned relationships; project/task FK target checked explicitly against the recovered state, without applying the held correction.
- Ownership/grants/default privileges, RLS enablement and policies match the reviewed source baseline.
- Positive and negative SQL role checks use synthetic/local identities and roll back their writes. SQL role tests do not establish genuine Supabase Auth/API behaviour.
- Zero network exposure and no outbound effects before, during and after restore.
- Restore result checked independently of the source connection; no rerun against production.
- Timings from approved snapshot/export through archive verification, restore and validation; record each phase and interruptions.
- Explicit Auth/API, Storage-file, encryption-key, provider/configuration, off-device and Windows-reboot gaps.

Proposed rehearsal budget: export attempt capped at 30 minutes and restore/validation attempt at 60 minutes, subject to B1 sizing. Stop rather than repeat expensive operations silently. These are operating limits for review, not agreed business RTO/RPO commitments. Ask Robbie to ratify recovery/data-loss objectives before making customer promises or closing H07.

## 7. Go/no-go manifest for B2

All rows must be complete before requesting export approval:

| Required field | State now |
| --- | --- |
| B1 approved, executed, target matched and bounded metadata complete | Complete; see dated B1 findings; two-call output adaptation recorded |
| Actual source version/extensions/managed-schema compatibility | Source engine and dependency catalogue observed privately; compatible restore baseline not yet validated |
| Exact include/exclude and sensitive Auth/Vault decision | Proposed; not approved |
| Export method, snapshot and non-secret command/image hashes | Candidate only; final commands not generated |
| Synthetic compatibility rehearsal for selected method | Basic two-row restore passed earlier; production-shape method not rehearsed |
| Encrypted artifact location, encrypted Docker data storage and independent decryption | Unverified |
| Approved credential delivery without key/password exposure | Not established; do not access secrets |
| Exact fresh restore target/volume and role baseline | Not created; preserve current synthetic lab |
| Resource/load/timeout/retention limits and recovery owner | Proposed above; ratification required |
| Independent copy and measured recovery objectives | Not established; gaps remain explicit |

Unknown entries are genuine execution blockers. This document is a complete preparation/decision package, not a claim that B2 is ready to run.

## 8. Approval and stop boundaries

B1 does not authorise dump/export or data access. B2 will be a second, exact decision against the completed manifest, revised command hashes and named locations. Do not interpret “proceed with preparation” or a documentation approval as production authority.

B2's eventual approval must name the production source by canonical reference, the exact sensitive data scope, encrypted destination, independent local restore target, operator, window, retention and cleanup scope. It excludes production restore/write/migration, bulk pending migrations, password resets, new grants, releases, paid services, customer contact and activation of restored external integrations.

Stop on wrong target; unverified encryption/recovery; key-bearing data outside scope; unexpected source/dependency changes; unsupported versions; incomplete export; failed checksum/decryption; excess load/timeout; unexpected ownership/grants; any restore error; network exposure; uncertain cleanup ownership. Record the failure and return a revised plan. Never weaken a check to make the drill pass.

No plaintext records, dumps, auth hashes/tokens, keys, full SQL definitions or detailed source manifests go into Git, Drive, chat or logs. Shared evidence contains only redacted outcome, tool/revision identity, phase timings and limitations.

## 9. Fresh local checks and correction

During this package preparation, the metadata query was first tested against the existing local lab. Startup failed: Docker retained an old network name in its stored network mode after the earlier replacement network was attached and the old network removed. This supersedes the broader implication of the earlier restart result, which occurred before that removal.

Recreated the referenced network as internal-only, aligned launcher/network membership, preserved the data volume, and removed the unused replacement network. Two subsequent starts/readiness/isolation/limit checks and intervening stops passed; final state stopped. Added a launcher guard for stored-network-mode mismatch.

The read-only metadata SQL then parsed/executed successfully on the local PostgreSQL lab and rolled back. Those local checks used no production connection, data export, application migration, encryption-key read, new cloud resource or release. B1 subsequently accessed production catalogues only, as recorded above. Local automated encryption verification was blocked by Windows administrative access; the storage-protection gate remains unmet. Neither the local checks nor B1 establish export/restore readiness.
