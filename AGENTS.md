# The Harley Group — ChatGPT/Codex operating instructions

## Mandatory session-start contract

Before making changes:

1. Identify the correct repository and checkout. Read root AGENTS.md and applicable nested instructions.
2. Inspect the current branch, HEAD, working-tree changes and configured remote. Do not assume this checkout or main contains the latest peer work.
3. Read the opening operating brief in PROJECT_STATUS.md and latest relevant checkpoint in docs/HANDOVER.md.
4. Read BUSINESS_DEFINITION.md, MASTER_BACKLOG.md and relevant sections of docs/COMMERCIAL_OFFER_MANAGED.md.
5. Reconcile the assigned task with recent peer activity, existing implementation, approval boundaries and unresolved blockers.
6. State a short starting assessment: repository/path, branch/HEAD, existing changes, selected task, verified state, blockers and next action.

Keep this assessment concise. Read relevant sections rather than loading every historical record or skill.

If repository access is unavailable, disclose that limitation. Request the minimum missing records or prepare a clearly labelled draft; do not claim repository alignment or runtime verification.

## Authority and source of truth

The repository is the shared source of truth for application architecture, implementation, backlog, verification evidence and release handovers.

The verified “The Harley Group / Business OS” Google Drive folder is the central shared home for business documents, playbooks, proposals, approved brand assets and finished operating reports. Follow its existing structure and Chief of Staff index.

Use the designated authoritative source for each record. Repository records and Drive copies are not automatically synchronised. Record the source, date, approval status and reconciliation when publishing a copy.

Latest explicit founder decisions govern within applicable safety and access constraints. Record material decisions in the appropriate durable record so other agents can inherit them.

Chat history, personal memory, installed skills, connector sessions and screenshots are supporting context—not substitutes for current repository evidence. A newer file, a confident statement or a completed checklist is not automatically authoritative.

When sources conflict, inspect the relevant evidence and decision scope. Preserve unresolved differences and identify the decision required; do not silently choose whichever version supports the task.

## Business and commercial direction

Preserve:

- The Harley Group as the parent and oversight organisation.
- Harley Digital Works as the customer-facing digital services brand.
- Harley Labs as the AI, automation, prototype and product-experiment brand.

Prioritise customer value, launch readiness, initial project revenue, recurring subscriptions, sensible margins and reduced repetitive work.

Use the latest approved business definition and commercial decisions. Preserve ratified prices and terms; do not repeatedly seek approval for decisions already made.

Changes to pricing, discounts, scope, capacity, SLAs, tax presentation, refunds, contracts or commercial commitments require explicit founder approval or a verified standing policy covering that exact action. Flag unresolved wording before customer use.

Historical £95/month pricing and guaranteed 14-day language are not evidence of current approval. Never invent clients, reviews, credentials, results, accreditations or guarantees. Label fictional examples and design studies prominently.

## Architecture and deployment

<!-- DUAL_ARCHITECTURE:BEGIN -->

Agency platform: SkyPilot24/harley-digital-works is maintained through code and canonical Git by Codex, Antigravity and GitHub Copilot. Preserve its established architecture; do not import it into Lovable or rebuild it merely to adopt another framework.

The recorded stack includes TanStack Start, React, TypeScript, Supabase/PostgreSQL and Cloudflare Nitro Worker SSR. Local development server is configured strictly on port 3000 (`http://localhost:3000/`). Never use or launch port 8080 (which is occupied on the founder's machine by NVIDIA Broadcast). Verify current configuration before implementation.

External client trade websites use dedicated repositories and their recorded Lovable/Cloudflare Pages workflow. Confirm the exact client repository and deployment target before editing.

Treat pushes or merges to main as potentially production-deploying actions. Verify the current pipeline and obtain explicit release approval. Never force-push or rewrite published history.

<!-- DUAL_ARCHITECTURE:END -->

Recorded production Agency backend: worzpzbutngugwzhlvtj.
Recorded isolated staging backend: mfpnfxpgkfuqtedbcxvp.

These identifiers locate expected targets; they do not prove current access, configuration, health or deployment. Verify the exact target before integration or database operations. Never substitute production for unavailable staging.

## Skills and tool entry points

Use only task-relevant canonical repository standards:

- skills/thg-client-build-standard/SKILL.md — website delivery.
- skills/thg-supabase-security/SKILL.md — Supabase/auth/database security.
- skills/thg-production-qa/SKILL.md — release readiness.

Use $thg-project-context when available and relevant. Its absence does not replace or block reading the governing records.

Installed skills are loader copies. Canonical standards are authored in skills/; follow docs/SHARED_SKILLS.md for synchronisation and drift checks.

Tool entry points should reference these shared rules rather than duplicate changing business facts:

- Codex: root AGENTS.md and applicable nested instructions.
- Antigravity: .agents/rules/thg-shared-skills.md.
- Copilot: .github/copilot-instructions.md and docs/COPILOT_QUICKSTART.md.

Do not claim automatic instruction discovery without checking the relevant tool. These instructions do not themselves update other tools or scheduled workflows.

## Execution and permissions

Work against an existing backlog ID where practical. Reuse existing components, integrations and workflows.

Preserve unrelated changes. Use an isolated branch/worktree for overlapping work. Recheck shared files before editing so peer updates are not overwritten.

Proceed independently with authorised, reversible work. Retain founder commercial decisions and final quality judgement.

Obtain explicit approval before spending, contacting others, publishing, deploying, deleting data, changing production or making binding commitments, unless an existing explicit authorisation covers the exact action.

A backlog entry, available connector, working credential or historical approval is not blanket execution permission.

Protect secrets and customer information. Never put credentials or raw customer data in shared documents, committed fixtures, browser bundles or logs.

## Verification and completion

Verify affected behaviour empirically where access permits. Keep loading, empty, error, retry and permission-denied states distinct.

A build, unit test, preview or document claim does not prove live acceptance. Payment requires provider/application evidence; enquiries require persistence and authorised retrieval; permissions require denial as well as allowed-path checks.

Report each result accurately:
proposed → implemented locally → tested → committed → pushed →
previewed → deployed → live-verified.

Record exact revision, environment, checks, results and limitations. Historical tests apply only to their recorded revision and environment. A migration file is not proof of application.

Do not weaken security, fabricate evidence or substitute production merely to obtain a passing result.

## Mandatory session handover

Before ending meaningful work, update the relevant backlog evidence, PROJECT_STATUS.md and docs/HANDOVER.md in the same change where practical.

Record:

- Objective and task IDs.
- Repository, branch and exact revision.
- Changes and founder decisions.
- Fresh checks, environment and results.
- What remains untested or uncertain.
- Commit/push/deployment and migration application status.
- Blockers, owner, approval required and one executable next action.

Preserve history, but keep the current checkpoint easy to identify. Do not describe unresolved work as complete.

If writes are unavailable, provide exact ready-to-save Markdown and explicitly state that it has not been applied.

Finish concisely with the result, verification limits and next action. For release reviews, mark gates Ready, Needs attention or Blocking launch using evidence.

## Daily continuity and historical prompt routing

For daily/weekly prioritisation, planning, implementation, copy and QA, use docs/DAILY_PLAYBOOK.md for the compact routine and reconciled PROMPT_LIBRARY.md / MASTER_BUILD_PROMPTS.md routing. Do not load both entire historical libraries each session. Current business, offer, approved brand, source evidence and permissions override September assumptions. Inspect existing implementation/peer work before coding; save the compact end checkpoint. The one morning prompt lives in docs/DAILY_PLAYBOOK.md.

## Founder operating & communication standard — 20 October 2026

Robbie is the founder and CEO, not a developer. Speak in plain English, explain simply and step-by-step ("talk to me like I'm 5, that's fine, I'm learning"). Avoid jargon. Make development and technical decisions autonomously; only come to Robbie for high-level commercial decisions, pricing, releases, or major brand direction. Always translate technical work into real-world business value (cash, customer trust, time saved, and booked trade jobs). Lead with the bottom line first. For checks requested as read-only, report findings before changing files; apply only separately authorised edits.