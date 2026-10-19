# H07 local readiness update — 19 October 2026

**Current position: B1 complete; local storage/recovery-custody checks owner-confirmed; independent synthetic method rehearsal passed; B2 production export/restore remains unapproved.**

This checkpoint supersedes earlier statements that the local storage-protection gate was unmet. Detailed disk status and locations remain in the restricted local runbook; this shared record contains no production inventory or credentials.

## Owner and local checks

- Owner supplied administrator status showing the local operating-system volume encrypted with protection enabled, and confirmed the recovery key is backed up and retrievable without the laptop. The agent did not read or receive a recovery key.
- Local inspection located the current Docker data disks on that same protected volume. This is current placement evidence, not permission to attach future unprotected storage.
- The session itself still lacks direct Windows administrator access to BitLocker, so distinguish owner-supplied status/custody evidence from independent machine inspection.
- The explicitly approved five-file B1 alignment was committed as 716001494c168852b39abd0502522e82ab8b2334. Its formatting, lint, type, security, dependency and build/test checks passed. No main merge or production release.

## Synthetic method rehearsal

First rehearsed a custom-format dump and transactional restore between two local databases. Then repeated into an independent fresh container and volume, with networking disabled and no published ports. Used only fictional identity/member/role/project/task rows and empty local extensions; no production connection, data, keys or application migration.

Checks passed:
- Joined values, identity FK dependencies, validated constraints and sequence state.
- RLS flags and local SQL-role positive/negative checks for a fictional owner, another fictional identity and anonymous access.
- Restored database checks after the source fixture database was removed.
- Availability/restoration of the five catalogue-matched extension versions.
- Independent target isolation, fixture cleanup, target container/volume removal, and final stopped state of the original lab.

An extension-inclusive attempt correctly stopped because the ordinary local role could not restore managed ownership. Retried using the isolated target's existing administrator role and preserved ownership/grants. No production role, grant or permission was changed. Extension-version selection warnings were avoided by checking actual restored versions instead of claiming a non-superuser had forced them.

**Limits:** a synthetic schema/role baseline is not the actual managed Auth/Storage schema, genuine sign-in/API acceptance, encrypted-value decryption, production snapshot, complete role/membership compatibility, independent off-device disaster protection or a business RTO/RPO measurement.

## Next concrete step

Freeze B2's exact source connection route, data scope and command/role manifest for one production export and independent local restore attempt. The proposed full-database recovery scope must explicitly address sensitive account records and encrypted-value dependencies; do not treat B1 or local rehearsal as approval to copy them.

A database connection must be prepared privately using an existing authorised credential, without password reset or disclosure to chat/logs. Source access/ownership errors and real managed-schema mismatches are stop conditions during the eventual approved drill, not reasons to strip ownership, disable security or widen production permissions.

B2 remains a separate founder decision. Existing migration and release holds remain; no production writes, export, restore, new secret access, paid resource, customer contact, merge or deployment in this update. [Approval package](H07_APPROVAL_PACKAGE_2026-10-19.md), [B1 completion](H07_B1_METADATA_RESULTS_2026-10-19.md).
