# Harley Digital Works — GitHub Copilot instructions

## Shared authority and session start

Read `AGENTS.md`, the opening operating brief in `PROJECT_STATUS.md`, and the newest checkpoint in `docs/HANDOVER.md` before editing. Then consult `BUSINESS_DEFINITION.md`, `MASTER_BACKLOG.md` and relevant `docs/COMMERCIAL_OFFER_MANAGED.md` sections. These are shared with Codex and Antigravity; do not create a competing business definition or backlog. Latest explicit founder decisions govern; distinguish approved decisions from proposals and historical notes. Read applicable nested instructions too.

Inspect branch, HEAD, working-tree changes and remote before work. Preserve unrelated changes. Use a separate branch/worktree for overlapping tasks; never force-push or rewrite published history. Pushing to main auto-deploys: do not use main for development. Read the handover for the active review branch rather than assuming main contains the latest work. Chat history, local skills, credentials and connectors are not automatically shared with Copilot.

## Product and architecture

This private repository is the Harley Digital Works public agency website and authenticated Admin Control Centre. Harley Digital Works provides digital services for UK trades and small businesses; The Harley Group is the parent, and Harley Labs is the separate experiments/automation brand. Preserve the exact endorsement `Part of The Harley Group`, approved navy/ivory identity, and British English. Never invent clients, testimonials, credentials, results or commercial guarantees. Read current commercial records before changing prices, scope, tax, capacity or contractual copy.

Retain TanStack Start, React, TypeScript, Vite, TanStack Query, Tailwind/shadcn components, Supabase/PostgreSQL and Cloudflare Nitro Worker SSR. This agency platform is code/Git maintained; do not rebuild it in Next.js, move it to Vercel, or import it into Lovable. External client trade websites have separate repositories and a Lovable/Cloudflare Pages workflow.

Start with `src/routes/` for pages/server routes, `src/components/admin/` for administration, `src/hooks/use-auth.tsx` and `src/lib/auth-session.ts` for session handling, `src/lib/*.functions.ts` for server functions, `supabase/` for database work, and `scripts/` for verification. Follow existing patterns; reuse components and integrations rather than duplicate systems. Do not hand-edit generated route trees or build output.

## Integrity and safety

Prioritise security/data loss and failed enquiry capture, then admin workflows/data accuracy, then usability, marketing and SEO. Implement the smallest maintainable change and verify the affected journey. Use real authoritative data; represent missing/unconfigured sources honestly. Keep loading, empty, error, retry and permission-denied states distinct. Enquiry acceptance requires persisted delivery/readback, not merely a successful-looking page.

Enforce permissions server-side and through database RLS. Editable user metadata and hidden UI are not authorisation. Never put service-role keys, credentials or customer data in browser bundles, logs, prompts, fixtures committed to Git, or documentation. Reconcile the target before any database operation: production Agency is `worzpzbutngugwzhlvtj`; isolated enquiry staging is `mfpnfxpgkfuqtedbcxvp`. An existing migration is not proof it was applied. Do not broaden intentional server-only deny-by-default policies merely to silence an advisor notice.

Routine reversible code fixes are authorised within the assigned task. Obtain explicit approval for production merges/deployments, production data/configuration changes, destructive migrations, live billing, spending or outbound customer/Slack/email messages. A backlog entry is not approval. Do not assume local staging secrets, browser runtimes or provider access exist in a cloud agent. Report missing access; never substitute production credentials or weaken tests/security to get a pass.

## Setup and verification

Use the committed npm lockfile and package manager declared in `package.json`; a clean checkout normally uses `npm ci`. Use a Node version supporting the repository's `--experimental-strip-types` tests; check current CI/runtime configuration before choosing one. Local development is `npm run dev`. Inspect environment examples and configuration before running integrations; never print secret values.

For relevant application changes run:

1. `npm run typecheck`
2. `npm run lint`
3. `npm run format:check`
4. `npm run build`
5. `npm test`

Build precedes tests because platform smoke checks inspect generated output. Cloudflare-specific builds require `NITRO_PRESET=cloudflare-module`; use the environment-variable syntax for your shell and follow current deployment configuration. Do not deploy to validate a local change. Run targeted tests/browser checks for affected flows as appropriate. Staging acceptance scripts require explicit isolated configuration and exact fixture cleanup; read the relevant evidence document and script before execution. Report unavailable checks honestly. Prior test results apply only to their recorded source; builds and preview URLs alone do not establish production readiness.

Read repository standards for the matching task: `skills/thg-supabase-security/SKILL.md` for auth/database work, `skills/thg-client-build-standard/SKILL.md` for website delivery, and `skills/thg-production-qa/SKILL.md` for launch review. Read these directly if Copilot does not discover skills automatically; they do not grant production authority.

## Completion and handover

Work against an existing backlog ID where possible. Update relevant `MASTER_BACKLOG.md`, `PROJECT_STATUS.md` and `docs/HANDOVER.md` in the same change where practical. Record source/branch, changes, exact checks, verification limits, migration application state, blockers and next executable task. Keep evidence in the repository without secrets or customer data. Clearly distinguish implemented, tested, committed, pushed, previewed, deployed and live-verified. Keep final reports concise and mark launch gates Ready / Needs attention / Blocking launch only with evidence.

## Session-start assessment

Before editing, report the assessment required by root AGENTS.md: repository/path, branch/HEAD, existing changes, selected task, verified state, blockers and next action. Root AGENTS.md owns this shared contract; tool-specific instructions supplement it.
