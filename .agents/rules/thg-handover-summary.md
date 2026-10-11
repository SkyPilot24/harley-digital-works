---
title: Multi-Agent Handover & Governance Summary (ChatGPT, Codex, Antigravity)
trigger: always_on
description: Unified multi-agent operating protocol, evidence verification, and session handover summary for ChatGPT, Codex, and Antigravity.
---

# Multi-Agent Handover & Governance Summary

This repository is collaboratively maintained by **ChatGPT**, **Codex**, and **Google Antigravity**. Chat logs, installed tools, and local memory are NOT automatically shared between agents. All context, status, decisions, and handovers MUST be persisted to the repository's single source of truth files.

---

## 1. Single Source of Truth Files

| File                                                                                                                                       | Purpose & Governance                                                                           |
| :----------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| **[AGENTS.md](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/AGENTS.md)**                                               | Core multi-agent operating rules, brand governance, and project context loader.                |
| **[BUSINESS_DEFINITION.md](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/BUSINESS_DEFINITION.md)**                     | Commercial boundaries, approved scope/pricing limits, VAT rules, and founder authority.        |
| **[docs/COMMERCIAL_OFFER_MANAGED.md](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/docs/COMMERCIAL_OFFER_MANAGED.md)** | Ratified Managed launch offer (£1,495 + £249/mo), unit economics model, and founder register.  |
| **[PROJECT_STATUS.md](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/PROJECT_STATUS.md)**                               | Real-time operating brief, verified state, release health, and single active bottleneck.       |
| **[MASTER_BACKLOG.md](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/MASTER_BACKLOG.md)**                               | Authoritative backlog (H01–H50 & D01–D08) with owners, acceptance evidence, and status.        |
| **[docs/HANDOVER.md](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/docs/HANDOVER.md)**                                 | Cross-agent log of recent work, exact commit hashes, test results, blockers, and next actions. |
| **[src/lib/knowledge-base.ts](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/src/lib/knowledge-base.ts)**               | Dashboard Operational Knowledge Base data powering the authenticated /admin/knowledge-base UI. |

---

## 2. Session Start Protocol (All Agents: Antigravity, Codex, ChatGPT)

1. **Mandatory Handover & Status Inspection**: At the beginning of EVERY session, read:
   - **`PROJECT_STATUS.md`**: Inspect the short operating brief to identify the current single bottleneck and verified database/release target.
   - **`docs/HANDOVER.md`**: Read the latest dated handover section to inherit the exact recent state, decisions, peer agent activities, test results, and next actions.
2. **Inspect Git Environment**: Check `git status`, current branch (`main`), and HEAD. Preserve uncommitted changes and ongoing work by peer agents.
3. **Reconcile Backend Targets**: Do NOT execute database writes or migrations without verifying the active Supabase target recorded in `PROJECT_STATUS.md` (`worzpzbutngugwzhlvtj`).
4. **Load Context On-Demand**: Load only task-specific files and skills needed for the selected task; do not flood context with historical logs.

---

## 3. Verification & Execution Rules

1. **No Assumption of Success**: Never declare a feature or bug fix complete without empirical runtime verification (`npm run format:check`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`).
2. **Commercial Governance**: The Harley Group is the parent entity; Harley Digital Works is the customer-facing agency. Older £95/mo or 14-day claims are historical context only; current pricing/SLAs require explicit founder approval (`BUSINESS_DEFINITION.md`).
3. **Git History Safety**: NEVER force push, amend, or rebase published commits on connected branches (e.g. `main` / Lovable sync).

---

## 4. Session Closing & Handover Protocol

Before concluding ANY agent session (ChatGPT, Codex, or Antigravity):

1. **Run Verification Suite**: Execute `npm test` and `npm run build`. Record exact pass/fail counts.
2. **Update Central Records**: In a single commit, update:
   - `docs/HANDOVER.md`: Log Date, Tool Name (ChatGPT / Codex / Antigravity), Scope, Inspected/Resulting Commit SHA, Test Results (e.g. 136/136 pass), Remaining Blockers, and Next Actions.
   - `PROJECT_STATUS.md`: Update the short operating brief and verified release table.
   - `MASTER_BACKLOG.md`: Move completed tasks to verified state only when acceptance evidence is attached.
3. **Push to Remote**: Ensure all commits are pushed to the remote repository so the next agent session inherits the exact state.
