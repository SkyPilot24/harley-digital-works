# Shared development handover

Updated 2 October 2026. For Codex, ChatGPT Work and Google Antigravity working on SkyPilot24/harley-digital-works.

## Start every session

1. Pull/fetch the latest repository state using your available connection. Inspect branch, HEAD and working-tree changes; preserve unfinished work.
2. Read ../AGENTS.md, ../BUSINESS_DEFINITION.md, ../PROJECT_STATUS.md and ../MASTER_BACKLOG.md.
3. Read this handover and applicable existing rules. Agree the task ID and scope before overlapping work.
4. Treat repository records as shared context. Chat histories, credentials, installed skills and external task dashboards are not automatically shared.
5. If another tool is editing the same area, use a separate branch/worktree and record the integration plan. Never force-push published history.

## Last handover — shared context setup

- Objective: preserve prior commercial decisions and give both tools a durable continuation record.
- Changes: shared root business definition, backlog and current status; AGENTS.md pointers and operating rules; Antigravity always-on shared-context rule; links from existing overall plan and runbooks.
- Preserved: existing Lovable instructions, original audit H01–H50, domain D01–D08, prior plans and runbooks. No agency rebuild or extra domain brand.
- Evidence baseline: main 36b550d8ffddd2a1df37f05d84ab08a153d163cf; documentation setup commit follows that baseline unless concurrent work changes it.
- Checks: documentation content, relative-link targets and required task/provenance sections checked. Application tests/typecheck/build and production QA were not run in this connector-based documentation session; no application code changed.
- Release: repository documentation publication only. Deployment is unverified. No database migration, live email, buyer message, purchase or payment action.
- Blocker: conflicting Supabase target references worzpzbutngugwzhlvtj versus sprljifjcpbnagsxefrp. See PROJECT_STATUS.md.
- Next task: H07 backend reconciliation, with D01 portfolio verification progressing independently. Use existing roster rather than asking for a replacement.
- Founder decision outstanding: H01 final price, scope, VAT and contract/support terms.
- Source records: [Business Definition](https://drive.google.com/file/d/1sGcm_svP0v9WRrxRLSg33hq5G9BlkSx_/view), [Master Backlog](https://drive.google.com/file/d/1L23q_Wl66Vo2tyY6Fe_Eo6JY06GOdoPd/view), [Project Status](https://drive.google.com/file/d/14fz-9x74GMMyv82SW0mo1Ag85jU4HTxU/view).
- Synchronisation: repository import completed; no automated Drive mirror exists. Reconcile future external edits explicitly.

## End-of-session template

Replace/update the last handover with a concise entry; use Git history for older entries.

- Date / tool:
- Task ID and objective:
- Branch / inspected HEAD / resulting commit:
- Files and behaviour changed:
- State: proposed / implemented / tested / pushed / deployed (state each separately):
- Checks actually run and results:
- Migrations: filename, intended project, applied/unapplied, verification:
- External actions or deployment: environment, deployed commit and evidence:
- Remaining blockers / owner decisions:
- Exact next action:
- Drive or other record reconciliation required:

Never put keys, tokens, payment credentials or customer/buyer personal details here. Link to an authorised system record where appropriate.

## Prompt to use in either tool

“Read AGENTS.md, BUSINESS_DEFINITION.md, PROJECT_STATUS.md, MASTER_BACKLOG.md and docs/HANDOVER.md. Check the current branch and uncommitted changes. Continue the next ready task without restarting strategy. Update the shared status and handover with evidence before finishing.”
