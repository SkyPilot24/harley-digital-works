# Agent session workflow

Applies to Codex, Antigravity, Copilot and any other agent. Start at [the current operating brief](CURRENT_OPERATING_BRIEF.md); root [AGENTS.md](../AGENTS.md) owns the shared contract.

## Start every task

1. Record repository path, branch, exact HEAD, local changes and active task owner. Inspect before fetching or changing anything. Do not infer remote or live state from cached tracking labels.
2. Read the current brief, status opening, latest relevant handover and assigned backlog item. Read the business definition/offer only as relevant; use dated decisions to resolve business changes.
3. Reuse existing implementation and identify overlapping peer edits. Preserve all potentially valuable files, branches and private configuration. Use a separate task branch/working folder for overlapping changes; never reset another agent's work.
4. State the smallest task and acceptance evidence. Stop dependent edits if the same file changes unexpectedly; compare and reconcile rather than overwrite.
5. Keep source, local tests, pushed commit, preview, deployed revision and live acceptance as separate facts. Provider/remote access failure means unverified.

## Finish every meaningful task

1. Review the final diff and run the relevant behavioural tests and required checks on the retained revision; record failures and environmental limits.
2. Update existing status, backlog evidence and dated handover with exact checkout/branch/revision, changed paths, evidence, remaining local changes and one next action. An uncommitted diff needs a saved patch or hash as well as its base commit.
3. Record decisions with effective date, source, approval scope and what they supersede. Keep historical evidence visibly historical; do not silently rewrite it into a current instruction.
4. Report committed, pushed, previewed, deployed and live-verified separately. No push/merge/release follows merely from a completed task.
5. Where Drive differs, list exact proposed link/wording corrections and source date. Update Drive only with separate applicable authority, in place, and verify readback. No automatic sync is assumed.

## Lightweight drift prevention

Run npm run check:governance for changes to guidance, offers or agent entry points; CI also runs it. It checks current-source pointers, stale current-index links and known contradictory policy strings. It cannot verify that an agent loaded instructions, founder approval, global Drive links or production state.

Keep one current guide, one active backlog and one dated handover. A clean working folder is not proof of remote preservation; an old folder is not automatically disposable. No scheduled automation or agent-to-agent messages are enabled by this workflow.
