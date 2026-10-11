# Shared Harley skills

The canonical editable standards are repository folders under skills/: thg-production-qa, thg-client-build-standard and thg-supabase-security. Production QA was imported intact from the existing central installation, including its supporting reference and UI metadata. Only these three priorities are installed; the wider suggested pack is deferred.

Codex's reusable user-level installations are under C:/Users/drrob/.codex/skills. These are loader copies, not separate authoring sources. After editing the repository standards, run scripts/sync-thg-skills.ps1; use -Check to verify content hashes. The script preserves unrelated files, refuses to overwrite changed installed content that differs from its last synchronisation, and records the source path and hashes in each .thg-source.json. It does not delete old resources; reconcile intentional removals manually after checking references.

Antigravity's always-on .agents/rules/thg-shared-skills.md points directly to the repository standards. AGENTS.md gives Codex the same project-level routing. Other machines must clone/pull the repository and run the sync script with their user skills directory. Central installation is local to this Windows user, not automatic account-wide installation. A running host may need a fresh session to refresh discovery.

Validate each canonical folder with the skill-creator quick_validate.py, inspect UI metadata and local reference targets, then run sync -Check. This verifies packaging/configuration and byte parity. It does not prove automatic discovery in a running host, actual Antigravity execution or application production readiness. Keep those claims separate.

New skills preserve approved scope, existing work, truthful claims, premium conversion design, automated delivery with founder quality review, and evidence-led auth/RLS/function/migration checks. Current Supabase and PostgreSQL documentation was consulted on 3 October 2026; recheck relevant provider changes during actual implementation.
