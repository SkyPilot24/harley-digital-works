# Shared development handover

Updated 3 October 2026. Start with PROJECT_STATUS.md's current brief, then load only records relevant to the selected task. Read repository instructions and preserve uncommitted changes. Chat history, credentials and personal skill installations do not automatically transfer between tools.

## Reconciliation (3 October 2026 — Google Antigravity Session)

- **Inspected & Pushed Commit:** `eb4f959` on `main` (pushed to `origin/main`).
- **Scope & Changes:**
  1. **CI/CD Health Unblocked:** Resolved false-positive secret leakage test failure in `scripts/verify-platform.mjs` by rephrasing documentation text in `src/lib/current-strategy.ts`.
  2. **Expanded Test Suite:** Added `verify-service-worker.mjs` to `package.json` `"test"` script. Total test coverage now executes 94 tests (59 platform smoke checks + 32 revenue readiness tests + 3 service worker tests).
  3. **Workflow Optimization:** Refactored `.github/workflows/quality.yml` into parallel jobs (`lint-and-format`, `typecheck`, `test-and-build`). Added `.github/workflows/deploy.yml` for automated Cloudflare Workers CD deployment on push to `main`.
  4. **Multi-Agent Governance Rule:** Added `.agents/rules/thg-handover-summary.md` and updated `.agents/rules/harley-digital-works-standards.md` to summarize handover rules across ChatGPT, Codex, and Antigravity.
- **Verified Results:** `npm run format:check` (PASS), `npm run typecheck` (0 errors), `npm run lint` (0 errors), `npm test` (94/94 PASS), `npm run build` (PASS).
- **Next Bottleneck:** H07/H42 reconcile intended backend target, validate isolated secure lead intake fixes, and prove H08/H09 enquiry-to-admin dashboard retrieval.

## Reconciliation (Previous Sessions)
Documentation and skills only. Inspected main/cached origin main eb4f9596d0b394c92f45c7120419a2509035e59b. No application, production database, billing, outreach or deployment changes. Check Git history/final report for publication of this change.

Reconciled six chats: Integrate Domain Sales Strategy; Build Harley Labs Page; GitHub Project Health Review; Review pull request 8; Create THG production QA skill; Install Company Building Skills. The Labs and project-health conversations were briefs, not proof of completed implementation. Existing Labs route needs assessment under L01. H01-H50 and D01-D08 are preserved.

The website source is merged. PR #8 remains draft/open; its Quality check passed while Cloudflare preview failed. Exact production Git revision is not mapped. The later QA security changes remain in the isolated hdw-release-safety checkout and are not verified applied; see PROJECT_STATUS.md. Existing admin must be preserved.

Staff access means real authenticated sign-in to the admin dashboard and retrieval of a saved enquiry, with unauthorised access denied. An admin role record alone does not prove this journey.

Operating model: near end-to-end automation, managed by exception, with founder oversight and selected quality review. Validate critical transitions and all launch outputs during the first pilot. Thereafter ordinary cases advance under approved rules; customer approval remains explicit. See REVENUE_WORKFLOW.md.

Next task: H07/H42 reconcile the intended backend and validate isolated secure intake, then H08/H09 enquiry-to-admin acceptance. H01 final commercial rules and D01 portfolio verification can progress independently. Then provider-confirmed billing and H50 automated paid pilot. Do not ask for a replacement domain list or expect the founder to diagnose the backend before inspecting evidence.

Skills: three canonical folders under skills/; central Codex loader copies synchronised by scripts/sync-thg-skills.ps1; Antigravity rule reads the same source. See SHARED_SKILLS.md. No wider 12-skill pack installed. Static configuration/packaging checks are not an actual Antigravity run.

## Central records
[Business OS](https://drive.google.com/drive/folders/1A6e8LO2cElTH4WsIwdQAggJnH94xTJuP) remains the single entrypoint. Repository records govern shared execution; Drive mirrors are explicitly reconciled.

- [Definition](https://drive.google.com/file/d/1sGcm_svP0v9WRrxRLSg33hq5G9BlkSx_/view)
- [Backlog](https://drive.google.com/file/d/1CCRiiSJSUxBfbQKfFjQpa45_wrMoYSCn/view)
- [Status](https://drive.google.com/file/d/16dY7fXb2YAy9-BBYPrCrwoftoOV_GAvj/view)

Earlier handover links pointed to exported copies; these are the original central records. Preserve exports as references rather than creating another hub.

## Efficient continuation and closing
Read the short current status first; select one ready task. Load its backlog definition, relevant evidence and skill rather than every historical record. Use existing project checks; summarise passes concisely and retain actionable failure detail. Context efficiency never removes critical verification.

After a meaningful session update current status, relevant backlog evidence and this handover: date/tool, scope, inspected/resulting commit, changes, checks actually run, implemented/tested/pushed/deployed separately, migration application state, blockers, next action and Drive reconciliation. Preserve history in Git and linked detail. Never record secrets or customer personal data.

Founder decisions remain final price/scope/VAT/contract/support limits, verified legal identity and initial quality/automation rules. Application tests were not rerun for this documentation/skills-only work.
