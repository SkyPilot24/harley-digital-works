# Git session and recovery workflow

Use one task branch per coherent change. At session start inspect `git status --short --branch`, fetch origin, and read AGENTS.md and current handover. Preserve unrelated edits. Never force-push.

Before marking work complete:

1. Review the diff and stage explicit paths, especially during mixed-work recovery. Review files for credentials and customer data before staging.
2. Run checks appropriate to the changed behaviour; update status, backlog evidence and handover where relevant.
3. Inspect `git diff --cached` and run `git diff --cached --check`.
4. Commit a coherent unit and push its task branch. Confirm the remote branch SHA matches the local commit.
5. Open or update a pull request when GitHub API access permits. Record any access blocker explicitly.
6. Report checks, commit, push and remaining work separately. A dirty tree is acceptable only when remaining files are explicitly accounted for; never discard work to obtain a clean status.

A main push or merge can deploy production and requires the applicable release authority.

## Existing laptop work

On the laptop, first inspect the current branch and working tree. If still on the original dirty main checkout, create `recovery/local-work-2026-10-20` without resetting or cleaning. Review changes in logical groups, including untracked archives, exports and evidence files. Stage selected reviewed paths, commit each coherent group and push the recovery branch. Do not blindly add the whole working tree. If a recovery branch already exists, inspect and use it instead of recreating it.

Once the recovery branch is pushed, compare it with origin/work and origin/main before selecting changes. Cloud Git access does not expose uncommitted laptop files. No recurring automation or automatic commit hook is configured by this document.
