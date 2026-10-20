# Platform completion checkpoint — 15 October 2026

Status: local implementation; overall launch remains RED. This record extends the existing launch roadmap rather than replacing its acceptance evidence.

## Source and preservation

Isolated branch `codex/platform-completion-2026-10-15`, based on freshly fetched existing launch branch `1c8af5d` (PR #29), which includes the payment/delivery/marketing work absent from main `45012e4`. Existing local brand-rollout and documentation work remains untouched. No merge, push, deployment, migration, production write, spending or external messaging in this checkpoint.

## Implemented

- H03/P1: dashboard now rejects errors from all ten operational queries, rather than checking only three. All five dashboard data sources must load successfully before showing metrics or exception status; failed queries expose a retry action. Incomplete capped client/notification responses cannot silently become totals.
- H03/P1: lead/client mutations invalidate the actual admin query family, refreshing dashboard counts, recent leads, active-client and active-project panels on return. Previously they invalidated an unused `admin/stats` key.
- H03/P1: lead/client/project updates and deletions request a single returned ID. A missing or permission-hidden row can no longer produce a successful zero-row response and success toast. This confirms the mutation response, not independent persistence readback or lost-update protection.
- H03/P2: dashboard labels distinguish recorded care value from collected recurring revenue, recorded exceptions from automation health, and notification history from cron acceptance. Displayed build capacity now matches the existing two-build pilot guard; unsupported 14-day SLA wording removed from this widget.
- Regression checks exercise each of ten source failures and distinguish confirmed empty data from capped/missing responses. Included in the normal test command.

## Fresh evidence

- Locked dependency install: PASS, 421 packages.
- Final build, typecheck, formatting: PASS, including the write-response correction.
- Final lint: zero errors, nine existing Fast Refresh warnings.
- Final full suite: platform smoke PASS, 135 regression tests PASS, three service-worker tests PASS. No historical test result is counted as fresh browser acceptance.
- THG connector discovery confirms `worzpzbutngugwzhlvtj` (THG Agency) and `mfpnfxpgkfuqtedbcxvp` (THG Enquiry Staging) active/healthy. Read-only aggregate query against Agency: leads 3, clients 0, projects 0, notification jobs 2. These are records, not verified genuine customers or revenue. No personal records retrieved or changed. Privileged SQL does not prove owner-role API access.

## Ranked next tasks and limits

| Priority     | Existing task | Next acceptance                                                                                                                                                                                                                             |
| ------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1           | H03/H07/H42   | Authenticated browser test of dashboard loading/error/retry, lead status save and dashboard refresh, and zero-row mutation failure with isolated staging fixtures. No current test credentials/configuration copied into this checkout.     |
| P1           | H03           | Audit remaining modules for inaccurate empty/error states and row caps; implement server pagination/filtering for leads/clients/projects. Dashboard currently fails visibly on capped aggregate input rather than silently understating it. |
| P1           | H07/H42       | Reuse prior intake evidence and test current public-form → persisted enquiry → owner management → notification retry/recovery. Do not send new production synthetic enquiries without a bounded payload/destination.                        |
| P1           | H50           | Complete sold customer email/SMS routing, care billing, recovery/restore and exact release evidence using the existing launch roadmap. Prior sandbox receipt/refund and fictional approval evidence remains dated, not repeated here.       |
| P2           | H11–H18       | Inspect live marketing/mobile journeys against preserved approved brand and current offer; avoid rebuilding the already corrected trade pages.                                                                                              |
| Release gate | H47/H50       | Review current combined changes and obtain approval for the concrete rollout/migrations, then verify deployed revision and live journeys. Seller identity and service commitments retain the existing documented issue holds.               |

Next executable step: finish current checks, save a local commit, then configure a bounded staging browser acceptance run for H03 before production publication. Do not infer unattended work between executions from an active goal.
