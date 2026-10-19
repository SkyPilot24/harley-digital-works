# THG local recovery lab — 19 October 2026

## Result and scope

H07 local preparation is implemented and tested. H07 production backup/recovery proof remains open. This record captures work performed on the Dell, not on LenovoRig and not against hosted Supabase. The documentation branch starts from main `0845172c455b756a0a6eb24af1e7b56d78c348e9`; no canonical checkout was modified on either machine. Repository access for this update uses the GitHub connector. No application regression suite or live production acceptance was run for this documentation update.

The dedicated Dell lab is separate from the primary development machine. The canonical application repository is not assumed to exist on the lab laptop. Machine identifiers and absolute filesystem paths remain in the restricted local runbook.

## Installed and verified

- Docker Desktop 4.94.0 (241994), Linux Engine/client 29.8.2, desktop-linux context, WSL2 with docker-desktop distribution.
- Official standalone Supabase CLI 2.121.0, released 14 October 2026. Versioned Windows amd64 ZIP SHA-256 matched the official checksum: `2606459be86e12e03fb6f6b9aa12a02aa00cfe21374857ec837a09c70b837eca`.
- Local CLI path relative to the restricted lab folder: `bin/supabase.exe`. No global PATH change or separate Node/npm installation. Codex's bundled Node v24.19.0 was visible in the session; npm was not on PATH.
- Database image `public.ecr.aws/supabase/postgres:17.11.0.004`, digest `sha256:b15d862126dd2dac02da524696ccfde2dcce2ceaee0a58973b2727befe492706`.
- Supabase project initialised locally; application migrations, seed scripts and ancillary services disabled. No login or hosted project link.
- The database container and persistent volume use a dedicated internal Docker network; effective published ports are empty. Local resource names remain in the restricted runbook.
- Limits verified: 2 CPUs, 2 GiB RAM, 2 GiB combined memory/swap, restart policy `no`. Global Docker/WSL settings unchanged. No disk quota configured.
- Workspace ACL: Robbie, SYSTEM and local Administrators only. Docker administrators retain access to Docker-managed volumes. ACLs are not evidence of encryption at rest.

This is a database-only lab. It has no host/LAN database endpoint, Studio, Auth/API, Storage, SMTP, analytics or Edge Runtime service. Docker administrative access remains available; the internal network blocks normal external routing.

## Evidence and limitations

| Check performed on Dell | Result | Limit |
| --- | --- | --- |
| Official CLI archive checksum and version/help | PASS | Pinned local binary only |
| Local project initialisation | PASS | No hosted linkage |
| Synthetic custom-format pg_dump/pg_restore into a separate database | PASS | Two fictional rows; exact count and values verified |
| Synthetic test cleanup | PASS | Temporary databases and dump removed |
| Container stop/start and readiness | PASS | Windows reboot/startup not tested |
| Single internal network and zero effective published ports | PASS | Final configuration, not a claim of continuous isolation during setup |
| CPU/RAM limits and restart policy | PASS | No disk quota or production-scale load test |
| Final state | STOPPED | Local volume retained; no automatic startup promised |

The restore proves basic local tool functionality. It does not prove production snapshot consistency, roles/extensions compatibility, RLS/Auth/API correctness, storage recovery, measured production RTO/RPO, off-device recoverability or a full disaster recovery procedure. No application/repository migrations were run. Supabase's local bootstrap created its own internal schemas/roles.

### Networking issue and correction

The first CLI start on an internal network failed because Docker suppressed the host port required by the CLI. The CLI cleaned up that failed container/volume. A bridge retry initialised the database, but Docker ignored its localhost network default and reported wildcard bindings. The container was stopped immediately when detected. No production data was present; LAN reachability during that interval was not tested. Setup was therefore not continuously free of wildcard bindings.

The initialised container was moved to the final internal-only network and the unused bridge removed. Empty effective bindings, readiness and limits were verified before the synthetic recovery test. Original unrelated stopped nginx/n8n containers were left unchanged.

## Local operation

The absolute lab folder location is retained in the restricted local runbook.

Run from that folder on **the Dell only**, while Docker Desktop is running:

```powershell
.\Lab.ps1 -Action Start
.\Lab.ps1 -Action Check
.\Lab.ps1 -Action TestRecovery
.\Lab.ps1 -Action Stop
.\bin\supabase.exe --version
```

The local helper targets only the fixed lab container; checks network membership, effective ports and limits; and leaves the persistent volume intact on Stop. TestRecovery creates and removes only uniquely named synthetic test databases/dump. The helper's final syntax check passed.

Use the local helper for lifecycle operations. Do not use raw `supabase start` or `supabase db start` for this zero-published-port lab: the CLI expects a host connection and its startup defaults did not meet this isolation requirement. If the container is removed, review a reconstruction plan instead of starting a default stack. Do not delete the volume, run `stop --no-backup`, or upgrade the pinned CLI/image as routine shutdown.

## Follow-up: package prepared and restart correction

The [H07 approval package](H07_APPROVAL_PACKAGE_2026-10-19.md) and review-only metadata SQL are now prepared. Recommended next approval is metadata-only B1, not export/restore B2. Encryption and source compatibility remain execution gates. A later local start exposed Docker's retained reference to the removed network. Corrected the internal network reference/launcher and verified two subsequent starts/readiness/isolation checks; final state stopped, data retained. The read-only SQL ran locally and rolled back. This corrects the earlier implication that restart readiness had been established after network removal.

## Original next-step plan — now advanced to the package above

**Next executable action:** prepare the H07 production export and isolated restore runbook from the existing repository evidence, without connecting to production or reading secrets. Owner: engineering prepares the package; Robbie approves the exact production/data-handling scope.

1. Reconcile the current H07 records and known migration/dependency hold. Use the canonical target reference already recorded in AGENTS.md; it was not live-verified in this work. Specify its exact approved export scope and a separate local restore target; do not substitute shared staging or assume PostgreSQL major/version compatibility from this local image.
2. Define an inventory/checklist for database version, extensions, roles, schemas, Auth and storage scope using existing non-secret evidence. Mark unknowns for separately authorised verification. The two-row test does not satisfy the projects/task-FK or real Auth/API rehearsal gates.
3. Document export consistency, required permissions, tool versions, commands, storage location, encryption/recovery ownership, access limits, retention/deletion policy and any transfer route. Do not copy dumps, credentials, signing/encryption keys or customer data into Git, Drive, chat or ordinary logs. This local workspace ACL alone is insufficient for production data.
4. Define checksums and artifact validation, an independent isolated restore target/volume, exact comparison checks, expected actor denials, cleanup/retention ownership and stop conditions. Include a synthetic production-shape rehearsal plan; execution of application migrations or a full Auth/API stack remains a separately reviewed scope.
5. Ask Robbie to set recovery objectives and accept the precise data scope and handling plan. Then request **distinct H07 Approval B: production export / isolated restore**. No production command follows until that specific approval is recorded.

H07 Approval B here names the production-data export/restore gate from the Dell setup request. It must not be confused with the older go/no-go checklist's section B for a security release and schema correction. That earlier migration scope remains on hold; neither gate grants the other.

After exact approval, perform only the named export/restore and acceptance checks, record measured recovery results and unresolved coverage, and stop before any production migration or release. A successful restore alone does not authorise production schema changes.

## Authority and publication

The founder authorised local CLI/lab setup and subsequently this repository knowledge-base update and next-step plan. No production Supabase access, export, restore, secret access, migration application, deployment, paid resource, customer contact or data sharing was performed in the lab setup. This documentation update is for review on a separate branch; main merge, dashboard publication and live verification remain separate. Drive mirrors were not updated.

## References

- The restricted Dell lab folder retains the original README.md and Lab.ps1; the repository record contains no dump or credentials.
- [H07 backlog](../MASTER_BACKLOG.md#h07--establish-access-to-the-intended-supabase-project-and-verify-its-state)
- [Pilot migration/recovery package](PILOT_SECURITY_RELEASE_PACKAGE_2026-10-17.md)
- [Current handover](HANDOVER.md)
- [Official local CLI guide](https://supabase.com/docs/guides/local-development/cli/getting-started)
- [Pinned CLI release](https://github.com/supabase/cli/releases/tag/v2.121.0)
