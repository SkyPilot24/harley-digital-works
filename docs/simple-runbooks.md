# Simple Agency Runbooks

## Current shared context

Read [AGENTS.md](../AGENTS.md), [Business Definition](../BUSINESS_DEFINITION.md), [Project Status](../PROJECT_STATUS.md), [Master Backlog](../MASTER_BACKLOG.md) and [Shared Handover](HANDOVER.md) before continuing work. These records integrate the current commercial/domain roadmap and verified state. The dated observations below are retained for reference; they do not establish current pricing approval, deployment or production readiness. Use the shared handover procedure for Codex and Antigravity as well as the workflows below.

Use these runbooks to coordinate Google Gemini, OpenAI ChatGPT Work agents, and GitHub Copilot with clear handoffs.

## 1) New Client Campaign Runbook

1. Define goal, KPI, budget, and deadline.
2. Gemini: run market and competitor scan.
3. ChatGPT Work agent: produce campaign strategy and channel plan.
4. Copilot: implement tracking, landing updates, and automation tasks in the repo.
5. QA gate: verify events, links, forms, and dashboards.
6. Deliverable: one-page launch brief with owner list.

## 2) Weekly Performance Runbook

1. Pull GA4, ads, and CRM data.
2. Gemini: summarize anomalies and trends.
3. ChatGPT Work agent: draft client narrative (wins, risks, next actions).
4. Copilot: update reporting scripts or dashboard code as needed.
5. QA gate: validate reported metrics against source platforms.
6. Deliverable: weekly report with top priorities for the next 7 days.

## 3) Landing Page CRO Runbook

1. Capture baseline conversion and drop-off points.
2. Gemini: gather UX/friction benchmark ideas.
3. ChatGPT Work agent: define hypotheses and test plan.
4. Copilot: implement test variants and tracking updates.
5. QA gate: verify experiment setup and event firing.
6. Deliverable: prioritized CRO backlog by impact and effort.

## 4) SEO Content Runbook

1. Define topic cluster and commercial intent.
2. Gemini: run SERP and content-gap scan.
3. ChatGPT Work agent: draft briefs and internal linking plan.
4. Copilot: publish/update templates, schema, and technical SEO fixes.
5. QA gate: validate indexability, metadata, and schema.
6. Deliverable: publishing calendar and SEO action tracker.

## 5) Incident/Fix Runbook (Tracking or Site Issue)

1. Detect issue and estimate business impact.
2. Gemini: gather rapid diagnosis context.
3. ChatGPT Work agent: draft stakeholder update and response summary.
4. Copilot: implement fix in repo and validate lint/build/tests.
5. QA gate: confirm fix with production signals.
6. Deliverable: incident note and prevention actions.

## 6) Domain Monetisation & Outbound Deal Flow Runbook

Detailed operational runbook: [DOMAIN_OUTBOUND_AND_INBOUND_RUNBOOK_2026-10-21.md](DOMAIN_OUTBOUND_AND_INBOUND_RUNBOOK_2026-10-21.md).

1. Select candidate domain & pre-screened target company in the Control Centre (`src/components/admin/DomainOutboundEngine.tsx`).
2. Gemini / Antigravity: verify corporate status on Companies House and validate target contact email.
3. Resend automated dispatch: send personalized pitch from `robbie@theharleygroup.org` (quoting outright buyout and 12-month lease options).
4. Inbound listener / Slack alert: monitor webhook (`/api/webhooks/domain-inbound`) and instant `#sales` Slack channel notifications.
5. Deal settlement: direct buyer to Escrow.com (for buyouts >£500) or Dan.com 0% lease checkout link (for £75–£165/mo recurring).
6. QA gate: verify funds "Secured in Trust" before pushing Nominet IPS-TAG or releasing ICANN EPP auth code.
7. Deliverable: confirmed bank BACS payout receipt and domain status updated in portfolio register.

## Standard Handoff Template

- Objective
- Inputs/data source
- Output required
- Owner
- Deadline
- Success metric
