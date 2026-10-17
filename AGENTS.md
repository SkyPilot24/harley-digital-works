<!-- DUAL_ARCHITECTURE:BEGIN -->

> [!IMPORTANT]
> **Dual Architecture Operating Rule (Settled 8 October 2026):**
> - **Agency Platform (`SkyPilot24/harley-digital-works`):** Maintained strictly via code by **Codex**, **Antigravity**, **GitHub Copilot**, and canonical Git. Houses live Supabase RLS policies (`worzpzbutngugwzhlvtj`), Cloudflare Nitro Worker SSR, Slack Command Centre, minute notification outbox crons, hourly abuse pruning (`prune-lead-attempts`), and authenticated Admin suite. Do not import into Lovable.
> - **External Client Trade Websites:** Built and maintained visually via **Lovable** connected to dedicated GitHub repos (e.g. `SkyPilot24/kindred-spark` - Wessex Volt Electrical template, commit `f1481fe`). Deploys to Cloudflare Pages.
>
> Commits pushed to `main` auto-deploy to Cloudflare. Avoid rewriting published git history (no force pushes or squashing). Keep `main` in a verified working state.

<!-- DUAL_ARCHITECTURE:END -->

## Project Context Skill

When working on strategy, copy, Control Centre, Revenue OS, diagnostics, services, resources, domains, social/content workflows, or prioritisation, use `$thg-project-context` when available to keep changes aligned with the THG north star and reduce drift.

## Shared project context — Codex, ChatGPT Work, Google Antigravity and GitHub Copilot

At the start of a session, read **`PROJECT_STATUS.md`**'s short operating brief AND **`docs/HANDOVER.md`** first to inherit the current verified state, recent peer agent activities, test results, and active bottleneck. Select one ready task, then retrieve relevant detail from:

1. [PROJECT_STATUS.md](PROJECT_STATUS.md) — verified state, active bottleneck, and backend target.
2. [docs/HANDOVER.md](docs/HANDOVER.md) — exact commit hashes, dual-architecture state, test evidence, and next actions.
3. [BUSINESS_DEFINITION.md](BUSINESS_DEFINITION.md) — commercial direction and approval boundaries.
4. [MASTER_BACKLOG.md](MASTER_BACKLOG.md) — integrated H01–H50 and D01–D08 roadmap.
5. [docs/COMMERCIAL_OFFER_MANAGED.md](docs/COMMERCIAL_OFFER_MANAGED.md) — ratified packages, pricing, VAT rules, and economics.

These files are the shared repository record. Chat histories, personal memory, installed skills and connector sessions are not automatically shared between tools. Optional skills inform execution; they do not replace this record.

Load full historical records only when relevant. Canonical standards: skills/thg-client-build-standard/SKILL.md for website delivery; skills/thg-supabase-security/SKILL.md for auth/database security; skills/thg-production-qa/SKILL.md for release readiness. Antigravity reads the same files through .agents/rules/thg-shared-skills.md. See docs/SHARED_SKILLS.md for installation/sync. Use existing checks with concise pass/fail summaries and actionable failure detail; context efficiency must not skip verification.

The latest explicit founder instruction governs. Preserve The Harley Group as parent and Harley Digital Works as customer-facing agency unless a rename is explicitly confirmed; do not infer a rename from “Heaney Group”. Proposed prices are not approved commercial terms. Older plans, public copy and rules must be checked against BUSINESS_DEFINITION.md. The older £95/month and guaranteed 14-day language is not evidence of current approval.

Before editing, inspect branch, HEAD, working-tree changes and repository instructions. Preserve others' changes. Use the existing application and domain roster; extend rather than recreate them. Reconcile the backend target before database operations; PROJECT_STATUS.md records conflicting project references.

Work against an existing task ID where possible. Avoid simultaneous edits to the same files; use separate branches/worktrees for overlapping work and an explicit handover. Never rewrite published history. Keep secrets and buyer/client personal data out of documentation.

Before ending a session, update relevant backlog evidence, PROJECT_STATUS.md and docs/HANDOVER.md in the same change where practical. Record what changed, exact checks and results, branch/commit, remaining blockers and next action. Distinguish proposed, implemented, tested, pushed and deployed. Do not mark tasks complete without their acceptance evidence. Record migrations and their application state; a migration file alone is not an applied migration.

Run the applicable repository checks for code changes. Report checks not run and why; never reuse historical results as current verification. Do not send buyer outreach, buy domains, enable live billing/email or change production merely because a future task appears in the backlog.

GitHub Copilot enters through .github/copilot-instructions.md and docs/COPILOT_QUICKSTART.md, using the same shared records and canonical standards. Copilot onboarding does not transfer credentials or authorise production actions.
