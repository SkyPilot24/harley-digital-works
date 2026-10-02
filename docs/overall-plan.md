# Overall Plan

## Current shared context

Read [AGENTS.md](../AGENTS.md), [Business Definition](../BUSINESS_DEFINITION.md), [Project Status](../PROJECT_STATUS.md), [Master Backlog](../MASTER_BACKLOG.md) and [Shared Handover](HANDOVER.md) before continuing work. These records integrate the current commercial/domain roadmap and verified state. The dated observations below are retained for reference; they do not establish current pricing approval, deployment or production readiness. Use the shared handover procedure for Codex and Antigravity as well as the workflows below.

## North Star

Build The Harley Group platform as a workflow-led operating system that connects the public website, admin Control Centre, Revenue OS, and daily execution.

## Live Website Audit - 2026-07-08

- `https://theharleygroup.org/` is live and returned `200`.
- Public routes found: `/`, `/about`, `/services`, `/services/automation`, `/services/care-plans`, `/services/content-engine`, `/services/digital-products`, `/services/launch-plan`, `/domains`, `/resources`, and `/contact`.
- The deployed home page still showed older metadata and did not yet expose the new canonical URL tags from the latest local build.
- The deployed home page still linked to `mailto:hello@theharleygroup.org`; update this to a `theharleygroup.org` address when the mailbox or alias is ready.

## Revenue-First Recommendations

1. Deploy the latest canonical-domain build and verify `og:url`, `og:site_name`, and canonical tags on production.
2. Keep the `/admin` Control Centre as the command layer for every public website route.
3. Map every money page to an admin owner, Revenue OS asset, next action, and lead-capture path.
4. Prioritise care plans, automation audits, launch-plan enquiries, and domain monetisation because they connect fastest to revenue.
5. Use live diagnostics for route status, metadata coverage, and legacy email checks; add contact form capture and broken-link depth checks next.

## Control Centre Operating Model

- Home and settings manage canonical identity, messaging, and contact details.
- Services manage fixed-price offers and recurring-revenue packaging.
- Revenue OS manages domains, SaaS ideas, automation opportunities, and execution tasks.
- Resources manage SEO and authority content that supports the sales pipeline.
- Leads, clients, and projects manage the path from enquiry to delivery.

## Live Diagnostics - Implemented

- The Control Centre Diagnostics screen checks every mapped public route for HTTP status, page title, meta description, canonical tag, and legacy hello@theharleygroup.org references.
- Next diagnostics layer: contact form capture health, broken-link depth checks, sitemap coverage, and Revenue OS task generation from failed checks.

## Diagnostic Tasks - Implemented

- Warning and failed website diagnostics can now be converted into open Revenue OS tasks from the Diagnostics screen.
- Duplicate open tasks are skipped so repeated checks do not flood daily execution.
- Owner and group context now appears in Diagnostics and generated Revenue OS tasks, covering services, domains, resources, brand, and lead capture.
- Contact form capture health and sitemap coverage now appear in Diagnostics, with sitemap.xml and robots.txt added to the public build.
- Next layer: add broken-link depth checks and turn repeated diagnostic warnings into Slack alerts.

## External Website Review - Added

- Added a high-priority Revenue OS item to fully review https://theharleygroup.org/, prioritise conversion fixes, and ship improvements that support lead capture and recurring revenue.
- This review should cover messaging clarity, route health, calls to action, service packaging, contact flow, metadata, and opportunities surfaced by Diagnostics.

## Slack Lead Alerts - Implemented

- Public contact submissions now route through a server-side lead intake function that can notify Slack when SLACK_WEBHOOK_URL is configured.
- Leads still save normally if Slack is not configured, keeping the integration safe for staged rollout.
- Next Slack layer: Revenue OS daily task digest and diagnostic warning alerts.

## Brand Pack - Implemented

- Added a complete THG Digital Agency brand asset pack with logo, monogram, favicon set, app icons, social preview image, web manifest, and usage guide.
- Root metadata now uses the canonical THG social image and browser icon set instead of external placeholder assets.
- Local environment secrets are protected with .env ignored and a safe .env.example committed for setup guidance.
