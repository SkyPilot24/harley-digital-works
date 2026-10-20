# Laptop work preservation — 20 October 2026

H47. This is a recovery snapshot, not an integrated or release-ready version.

## What was preserved

- Repository: C:/Local Data/The Harley Group/harley-digital-works.
- Branch: recovery/local-work-2026-10-20. Starting revision: 1a3089eabc8050b0583187300c9e0b9c763e178e.
- Separate local backup: C:/Local Data/The Harley Group/HDW-local-backup-2026-10-20.
- Main folder and five linked working folders copied, including ignored private configuration where present. Directory junctions were not followed; generated/dependency folders are not part of the source-byte verification.
- Git bundle of all local refs and stash verified as a complete history. The bundle and raw folder copies are private, local-only backups; never upload them wholesale.
- 9467 source/local files across six folders matched their backup copies. Original main-folder check separately verified 1,224 files.
- 57 original changed/new files selected for the local recovery save. Existing source, evidence, instructions and drafts retained without claiming implementation acceptance.

## What stays local

- ionos-domains-export-2026-10-17.csv — private domain inventory; excluded from upload.
- skills/thg-client-build-standard.zip — archive not reviewed internally; source standards already exist.
- skills/thg-production-qa.zip — archive not reviewed internally; source standards already exist.
- skills/thg-supabase-security.zip — archive not reviewed internally; source standards already exist.
- Ignored private settings, including .env.local, and generated/dependency/cache files. Safe environment templates contain placeholders only; existing public Supabase configuration is not a server credential.
- All other branches, the existing stash and differences in linked working folders are backed up locally, not merged into this snapshot. Their exact unpublished differences still need individual reconciliation.
- Local scan/backup manifests and authentication diagnostic logs remain inside the separate backup folder.

## Checks and limits

All 1,222 eligible tracked/untracked files were scanned for common provider secrets, private keys, credential URLs, non-anonymous JWTs, secret assignments and exact matching local server-secret values. Findings reviewed as instructional placeholders and synthetic webhook tests; no real credentials found in the proposed upload. Contact review found public business contacts and synthetic example.test fixtures; no new customer record export selected. This is a bounded scan, not proof that every historical commit or opaque archive is secret-free. Excluded archives and domain CSV were not cleared for upload.

Typecheck, lint and test commands attempted but blocked by missing local development executables/modules. No dependency installation or application repair performed. No build, browser acceptance, database migration or live verification claimed.

## Upload hold — no deployment

Fresh GitHub fetch confirms private repository SkyPilot24/harley-digital-works, main 0845172c455b756a0a6eb24af1e7b56d78c348e9. The recovery branch was not present on GitHub. GitHub deployment workflow runs only on main. Cloudflare dashboard independently confirms main production branch and enabled non-production preview builds (preview command: npx wrangler preview). A recovery push could therefore create a preview deployment.

Founder authorised excluding only this recovery branch. Dashboard exposes only the global preview switch; unchanged. Existing API login expired. Automatic approval review rejected OAuth refresh with Worker write scopes as broader than the approved single-branch change. No workaround, new permissions, preview setting save or upload attempted.

Next action: founder resolves narrow Cloudflare branch-exclusion access/approval; Codex verifies the exact exclusion, uploads only this recovery branch and independently reads back its commit. Do not merge main, deploy, apply migrations or activate outreach. Owner: Codex; blocker: deployment-safe upload path.

## Selected original files

- .github/workflows/security.yml
- AGENTS.md
- BUSINESS_DEFINITION.md
- MASTER_BACKLOG.md
- PROJECT_STATUS.md
- docs/CODEX_GATE_1_VERIFICATION_2026-10-17.md
- docs/DAILY_PLAYBOOK.md
- docs/DECISIONS_AND_ACTIVITY.md
- docs/GATE_1_GO_LIVE_ASSESSMENT_2026-10-17.md
- docs/GATE_2_COMMERCIAL_GO_LIVE_ASSESSMENT_2026-10-17.md
- docs/H37_STAGING_MIGRATION_APPLY_DRAFT.md
- docs/HANDOVER.md
- docs/INBOUND_OWNER_ACCEPTANCE_2026-10-17.md
- docs/INBOUND_PILOT_REHEARSAL_PLAN_2026-10-17.md
- docs/INBOUND_PILOT_REHEARSAL_RESULTS_2026-10-17.md
- docs/INBOUND_STAGING_CONFIGURATION_2026-10-17.md
- docs/LEAD_JOURNEY_ASSESSMENT_2026-10-17.md
- docs/PILOT_SECURITY_RELEASE_PACKAGE_2026-10-17.md
- docs/PRODUCTION_PILOT_GO_NO_GO_2026-10-17.md
- docs/README.md
- docs/RESEND_OUTREACH_WEBHOOK_DEPLOYMENT.md
- docs/RESEND_OUTREACH_WEBHOOK_STAGING_ACCEPTANCE.md
- docs/REVIVAL_PRO_BONO_REFERENCE_2026-10-18.md
- docs/evidence/inbound-browser-rehearsal-2026-10-17.json
- docs/evidence/inbound-owner-browser-2026-10-17.json
- docs/evidence/pilot-security-candidate-browser-2026-10-17.json
- docs/evidence/pilot-security-release-manifest-2026-10-17.json
- docs/evidence/production-pilot-gate-snapshot-2026-10-17.json
- docs/evidence/production-projects-prechange-metadata-2026-10-17.json
- docs/evidence/projects-migration-review-2026-10-17.json
- docs/evidence/projects-recovery-validation-2026-10-17.json
- docs/evidence/slack-webhook-test-2026-10-17.json
- docs/release-package/2026-10-17/projects-reconciliation-review-draft.sql
- docs/templates/resend-outreach-webhook.production.env.example
- docs/templates/resend-outreach-webhook.staging.env.example
- package-lock.json
- package.json
- scripts/fixtures/resend-outreach-webhook-fixtures.mjs
- scripts/project-schema-review.test.mjs
- scripts/resend-outreach-webhook-migrations.test.mjs
- scripts/resend-outreach-webhook-route.test.mjs
- scripts/resend-outreach-webhook.test.mjs
- scripts/scan-build-artifacts.mjs
- src/components/admin/FounderProcessGuide.tsx
- src/lib/outreach-dispatcher.ts
- src/lib/resend-outreach-webhook.server.ts
- src/routeTree.gen.ts
- src/routes/__root.tsx
- src/routes/_authenticated/admin.diagnostics.tsx
- src/routes/_authenticated/admin.index.tsx
- src/routes/_authenticated/admin.invoices.tsx
- src/routes/_authenticated/admin.users.tsx
- src/routes/about.tsx
- src/routes/api.webhooks.resend.ts
- src/routes/index.tsx
- supabase/migrations/20261017201000_prospect_contact_suppression_controls.sql
- supabase/migrations/20261017201700_resend_outreach_event_listener.sql

## Final local save checks

Exactly 58 files staged (57 original candidates plus this recovery report); four excluded new files remain unstaged. Staged-path exclusion check and the repository credential rules run against the Git index PASS. Extra provider-pattern review found a historical Stripe synthetic refund identifier, not a Resend key. Git whitespace check flags existing Markdown trailing spaces/hard-break formatting in preserved drafts; retained verbatim rather than rewriting source work. This preservation save does not claim passing application checks.
