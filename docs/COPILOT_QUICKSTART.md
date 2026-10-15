# GitHub Copilot quick start

Copilot uses `.github/copilot-instructions.md` as repository-wide guidance. It routes work through the same governing records and canonical standards as Codex and Antigravity. It does not synchronise chat histories, credentials, permissions or local tooling. See GitHub's [repository instructions documentation](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions).

## Start from the correct source

Open this repository in your Copilot-enabled editor. For the current 15 October continuation, use `codex/platform-completion-2026-10-15`, which contains the latest local development history; confirm it is available on the remote before using a GitHub-hosted agent. Main does not automatically include these changes. Do not merge just to expose instructions. Use a separate branch based on the development checkpoint if another agent is active. If a hosted workflow only reads instructions from its base/default branch, explicitly provide the branch and instruction path and verify it read them; do not assume discovery.

In Copilot Chat, check the response references for `.github/copilot-instructions.md` where supported, or ask it to identify the instruction files it actually read. Repository guidance is not proof that an agent followed it. Review changes and verification evidence as usual.

## Starter prompt

```text
Work on SkyPilot24/harley-digital-works as a development partner alongside Codex and Antigravity. Start from codex/platform-completion-2026-10-15, not main; if that branch is unavailable, stop and report it rather than rebuilding from older code.

First read .github/copilot-instructions.md, AGENTS.md, the latest opening entries in PROJECT_STATUS.md and docs/HANDOVER.md, BUSINESS_DEFINITION.md and MASTER_BACKLOG.md. Inspect branch, HEAD, remote and existing changes. Use the shared repository records as the source of truth and preserve other agents' work. Confirm the actual stack and latest verified checkpoint in a brief summary.

Then select the next unfinished high-priority task from the latest handover and implement one bounded improvement on a separate branch based on this checkpoint. The currently recorded investigation is admin user/role server controls, including capped user listing, role-query completeness, last-administrator safeguards and validation; inspect the source before assuming a defect. Read skills/thg-supabase-security/SKILL.md for this work. Avoid duplicating completed auth/session recovery or rebuilding the platform.

Run applicable checks and verify the affected behaviour. If provider access is missing, continue useful local work and state the precise verification limit. Never invent test results or use production as a substitute for staging. No main push/merge, production deployment/configuration/data change, destructive migration, spending, live billing or outbound messages without explicit approval.

Before finishing, update the shared handover, status and relevant backlog evidence with what changed, exact results, remaining blockers and next action. Clearly distinguish local work, commits, pushes and deployments. Do not mark the platform launch-ready based only on passing builds.
```

## Recorded onboarding status — 15 October 2026

Instructions and starter prompt added and their local links checked. No Copilot account configuration, actual Copilot execution, automatic instruction discovery or cloud-agent provider access was tested. Refer to `docs/HANDOVER.md` for current publication and application evidence. Documentation-only onboarding does not change launch readiness.
