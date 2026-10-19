# H07 recovery handover — 19 October 2026

**Current state: B2A export completed; first B2B local restore FAILED_HOLD. H07 is open. Do not retry the restore under the consumed one-attempt approval.**

## Completed and evidenced

- Dedicated Windows lab has a pinned Supabase CLI/PostgreSQL toolchain, bounded Docker resources and isolated synthetic recovery tests.
- Owner supplied BitLocker Protection On / 100% encrypted status and confirmed independent recovery-key retrieval. Docker storage is on the protected volume. This is owner-supplied encryption evidence, not an independent administrator inspection by the agent.
- Metadata-only B1 production preflight completed without customer rows or source changes.
- Owner separately approved and performed a database-password reset, saving the replacement privately. Fresh TLS-verified Session pooler checks passed on both machines using the dashboard CA certificate. The Control Centre was shown loaded in a signed-in session; a fresh sign-in and all integrations were not independently proved. Do not request or reset the password again.
- Owner explicitly approved one B2A sensitive database export to the restricted lab. Export completed; audit, file length and SHA256 checks agree. No archive or restricted role/schema/log contents are stored in this repository.
- Compatibility review found one missing target NOLOGIN role; existing role attributes and exported memberships matched. All required extension versions were available. Source ownership/locale metadata was reviewed, and the target-only role delta and event-trigger/worker/network controls were tested with fictional data.

## Most recent attempt

Owner explicitly approved one B2B offline transactional restore into a fresh independent target. It failed at the first ownership error: permission denied to change owner of the event trigger `ensure_rls`.

The failed target is confirmed stopped, network mode none, no published ports. Its fresh volume and original archive are retained on the restricted lab. No retry, skipped objects, relaxed ownership checks or production changes occurred. A transactional restore was requested; full rollback has not been independently verified because the stopped failed target has not been restarted.

This is an actual managed-schema compatibility failure. It is not evidence of a recovered production database.

## Next work for Antigravity

1. Read the detailed local handover and restricted audit on the lab. Review metadata locally; never publish archive contents, role definitions, SQL bodies, logs, customer identifiers or credentials.
2. Reproduce the event-trigger ownership restriction with fictional data on an empty offline target.
3. Prepare a narrow target-only ownership solution. A possible approach is a temporary local privilege bridge within the same transaction, restoring the original role attributes before commit. This is an unimplemented proposal, not an approved fix. Do not grant temporary superuser outside a transaction and leave it behind on failure.
4. Preserve the archive, object ownership, ACLs and event-trigger definitions. Do not skip objects, use --no-owner/--no-acl, ignore errors, change production roles or obtain another export.
5. Test the revised payload with fictional data, freeze hashes and exact new target/volume names, then obtain distinct approval for a second local production-data restore attempt. First B2B approval authorised one attempt only.
6. After an approved attempt, stop the target and report the actual coverage. Do not claim Auth/API/Storage-file recovery, decrypted encrypted values, exact snapshot equivalence, off-device resilience or business RTO/RPO from structural checks.

## Retention and boundaries

All production recovery artifacts and derived restricted metadata retain the original expiry: **26 October 2026 at 16:24:10 UTC / UK time**. Owner: Robbie. No automatic reminder or deletion is configured. Review and supervised cleanup must be arranged; do not silently extend retention. Ordinary SSD deletion is not certified secure erasure.

No production migration, deployment, merge, cloud restore, paid resources, outgoing integration execution, additional source export, source credential retrieval or off-device transfer is authorised. Never paste a password or recovery key into chat. The primary development machine and dedicated lab are separate; successful commands on one do not establish execution on the other.

## Repository state

This handover is on the existing documentation branch and draft PR #43. No merge or deployment. Historical checkpoint text below/in older documents may predate the password reset and actual export/failed restore; this checkpoint supersedes those statuses without rewriting history. Local restricted files are authoritative for detailed evidence. Repository CI must be assessed on the new handover commit; earlier green checks do not certify this new head.
