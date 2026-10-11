# The Harley Group — recent activity review

Reviewed 9 October 2026. Scope: recent Harley operating, code, brand, lab and continuity work visible through canonical GitHub, the main checkout, shared records and relevant chats. This is a dated review, not continuous monitoring.

## Current position

- Canonical main and the clean main-computer checkout are at `5e0520dca8c8b9d633474cc9f64d2453b19e99cb`. No local modifications or unpushed commits were found there.
- Headquarters and the reviewed scanner repair are consolidated on `codex/group-headquarters-control-centre`, in [PR #23](https://github.com/SkyPilot24/harley-digital-works/pull/23). [PR #22](https://github.com/SkyPilot24/harley-digital-works/pull/22) remains a separate review; its commits were included without rewriting history and it was not independently merged into main or closed.
- The scanner previously matched its own inline expression. The repair uses equivalent character-class patterns, quiet matching, scans all tracked files and fails closed on Git errors. The combined tracked-tree scan passes without printing credential values.
- Founder confirms social accounts have not yet been set up. Profile creation, a publishing scheduler and social analytics remain setup tasks.

## Recent activities and disposition

| Activity | Reviewed evidence | Disposition / next action |
| --- | --- | --- |
| Group Headquarters | PR #23, shared hub, 17 portfolio records, ten priorities and 118 original link records | Source implemented; review and proposed brand links added. Complete combined CI and release, then genuine owner acceptance. |
| Scanner repair | PR #22 at `3e13544bbb42c5fa56848a50ba84151a22e6f1ca`; full workflow/script diff reviewed, combined clean scan run | Included on Headquarters branch; scanning remains enabled. |
| Dell learning lab | PR #20 included in main; KB checkpoint reports Docker exercises and n8n setup page reached | Source merged. Workflows, persistence, restore and current live KB acceptance remain unverified. Continue using fictional data. |
| Brand family | Completed proposed pack and guide in the brand chat; fresh ZIP CRC pass for all 147 entries | Uploaded to Companies & Brands as proposed. Final hierarchy, accents/copy, real contact details and print proof remain decisions; no production replacement. |
| Commercial / revenue workflow | 7–8 October commercial and operational commits already in main | Preserve governing terms. End-to-end payment/launch/care proof and a first paid pilot remain tasks; no fresh revenue total verified. |
| Slack / secure enquiries | Existing code and historical 7–8 October acceptance | No fresh production test in this review; retain queue diagnostics and exceptions. |
| Skills / earlier CI | `8211a8a` skill pruning and `9f754b1` workflow changes in main | Integrated source work; avoid repeating archival or treating historical checks as fresh. |
| Two-computer continuity | Latest remote chat reports a non-Git laptop folder and failed main-host access | Main checkout now freshly verified clean. Laptop Git/host continuity unresolved; no credentials or session databases copied. |
| Older PR #8 | Main already builds before smoke tests and avoids the public secret-variable literal | Conflicted older PR kept separate; reconcile any unique diff before adopting or closing. |
| Dependency upgrades | Five 9 October dependency/action branches plus older dependency work | Untested upgrades remain separate for compatibility checks; no batch merge. |
| Revival / other associated repos | Portfolio relationship and ownership unconfirmed | Preserve separate ownership/review boundaries; no unrelated repository writes. |

## Shared links

- [Group Headquarters](https://drive.google.com/drive/folders/1nl9bq8B8tWBv6a-8WIwghkDhe4U6EVU5)
- [Proposed brand pack](https://drive.google.com/file/d/1e6PsIfGok-SeJyGKlu4HPCPHuyMovbNa/view?usp=drivesdk)
- [Proposed brand guide](https://drive.google.com/file/d/1DYkghFuZAPJccvuqvlu9j5FyhqR_3mlY/view?usp=drivesdk)
- [Shared handover](https://github.com/SkyPilot24/harley-digital-works/blob/codex/group-headquarters-control-centre/docs/HANDOVER.md)

## Validation and publication

Fresh combined checks PASS: production build, typecheck, 136 existing checks (66 smoke + 67 regression/integration + 3 service worker), lint with 0 errors / 9 existing warnings, formatting and diff checks. Reviewed scanner passes against the combined tracked tree. 21st review of the adjusted Headquarters component reports 0 findings. Brand ZIP integrity passes for 147 entries; Drive readback confirms the uploaded pack and guide in Companies & Brands. Final GitHub workflow status is tracked in PR #23; local checks do not establish deployment.

Push is to the review branch. Main merge, production deployment and live owner acceptance are separate states and have not been performed by this review. After passing review/CI, release through the existing main pipeline, identify the deployed revision and verify Headquarters in the existing owner's authenticated session.
