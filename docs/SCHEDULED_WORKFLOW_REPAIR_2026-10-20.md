# Scheduled-workflow repair and baseline — 20 October 2026

Status: published as draft PR #45; local and GitHub validation passed on source 1f691f3; not merged. Tasks H42/H47.

## Source and scope

Repository SkyPilot24/harley-digital-works. Isolated branch `codex/scheduled-workflow-repair-20261020`; source/base main `0845172c455b756a0a6eb24af1e7b56d78c348e9`, independently checked against GitHub during this session. The repair commit will be the first descendant on this branch; use `git log --oneline origin/main..codex/scheduled-workflow-repair-20261020` for its exact identity. Machine-readable evidence pins the workflow bytes separately.

The original recovery checkout, private domain CSV, existing stash and peer working folders were not edited. No first development batch was selected. No new production/recovery operation is implied by older records.

## Problem and repair

[Failed GitHub drift run 39276307762](https://github.com/SkyPilot24/harley-digital-works/actions/runs/39276307762), created 19 October 2026 15:15:05 UTC, ran on the exact base above. It reported 60 PASS / 2 FAIL: `.output/server/wrangler.json` and `.output/public/_headers` were absent. The scheduled workflow installed dependencies and immediately checked generated artifacts without building.

The workflow now runs `npm run build` immediately after `npm ci`, before platform verification and `npm test`. Exactly three lines added. Schedule, manual trigger, permissions, timeout, runtime setup and assertions are unchanged. A parsed YAML comparison proved that removing this one inserted step leaves the original workflow semantics identical.

## Fresh local evidence

Environment: Windows x64, isolated clean checkout, Node 22.23.3 and npm 10.9.2 through temporary package tooling; no global runtime change, environment file copied, preview server or deployment. Base uses the same application, lockfile and test sources as main; the workflow addition does not alter those sources.

| Check                                   | Result                                                                                          |
| --------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Locked `npm ci`                         | PASS: 428 packages added, 429 audited, zero vulnerabilities                                     |
| Verification before any build           | Expected FAIL: 60 pass, exactly the same 2 missing-artifact failures as GitHub                  |
| Format check                            | Initial edited-workflow formatting failure corrected with the repository formatter; final PASS  |
| Lint                                    | PASS: zero errors, nine warnings in unchanged application files                                 |
| Typecheck                               | PASS                                                                                            |
| Build                                   | PASS: generated Cloudflare Worker config and public headers                                     |
| Verification after build                | PASS: 66/66; four additional assertions become available when artifacts exist                   |
| Full `npm test`                         | PASS: 66 platform assertions, 196 regression tests, 3 service-worker tests; zero failures/skips |
| Dependency audit                        | PASS: zero vulnerabilities at check time                                                        |
| Build artifact credential-pattern scan  | PASS: zero findings                                                                             |
| Quiet tracked credential-pattern checks | PASS: both repository-defined patterns returned no matches; no matched values printed           |
| Workflow YAML and semantics             | PASS: one build step added in the required position; other semantics identical                  |

Build reported a large-client-chunk advisory and an ignored `inlineDynamicImports` option when code splitting is specified. Installation reported deprecated tsconfck/Recharts versions. These are baseline warnings; no dependency or application changes were made. The build regenerated `src/routeTree.gen.ts`; its attributable generated churn was restored to the original tracked file and excluded from this change.

Raw command logs are retained in the isolated checkout's ignored `logs/scheduled-workflow-2026-10-20/` directory. The [machine-readable evidence](evidence/scheduled-workflow-baseline-2026-10-20.json) records log hashes, command outcomes, source identity and workflow hash; raw logs are not published. Follow-up validation after restoring the generated route file is recorded separately in that directory and in the final evidence.

## Limits and next action

This verifies local build-before-check behaviour on Windows. It does not prove GitHub's Ubuntu runner, scheduled execution, branch protection, Cloudflare publication or live customer behaviour. No credentials were copied and no live Auth/database/provider acceptance was attempted. Static scans are bounded pattern checks, not comprehensive security certification.

Next: review the isolated diff and exact local commit. Before publishing a candidate, reconcile branch-specific Cloudflare preview behaviour and obtain the applicable publication authority. Then run GitHub checks on that exact head without bypasses. Main merge and any production publication require separate release approval. If GitHub fails, stop before selecting a development batch.

Rollback before publication: remove the inserted build step on this isolated branch. After any authorised merge, use a reviewed revert PR; never reset or force-push main. Application/data rollback is outside this workflow-only repair.

## GitHub publication and Antigravity continuation

Founder explicitly approved this branch's preview and PR publication. [PR #45](https://github.com/SkyPilot24/harley-digital-works/pull/45) is draft/open. Published source `1f691f3f75d9bc55001f844d7f1747ba3af5a8cf` passed all Quality/Security checks, the Cloudflare preview build `df590e25-4743-43dd-9d3d-371de505deaa`, and the actual repaired workflow on GitHub Ubuntu: [manual drift run 39468628826](https://github.com/SkyPilot24/harley-digital-works/actions/runs/39468628826). [Remote evidence](evidence/scheduled-workflow-github-2026-10-20.json) records exact head, steps and check links.

Cloudflare production before/after comparison remains version `ee516b32` at 100% from main `0845172c455b756a0a6eb24af1e7b56d78c348e9`. The authorised preview is separate; no production release or live-data acceptance was performed.

The local-only limits and publication instructions above describe the earlier baseline checkpoint and are superseded by this publication receipt where applicable. A documentation-only receipt commit follows the tested source; its own checks must be reviewed. Continue in the isolated checkout, read the top of docs/HANDOVER.md and tasks.md, and inspect PR45 latest head/checks. No first development batch selected. Main merge/release still needs explicit founder approval; the weekly scheduled event on main cannot yet exercise the unmerged fix.
