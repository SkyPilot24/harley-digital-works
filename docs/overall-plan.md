# Overall Plan

## North Star

Build The Harley Group platform as a workflow-led operating system that connects the public website, admin Control Centre, Revenue OS, and daily execution.

## Live Website Audit - 2026-07-08

- `https://theharleygroup.org/` is live and returned `200`.
- Public routes found: `/`, `/about`, `/services`, `/services/automation`, `/services/care-plans`, `/services/content-engine`, `/services/digital-products`, `/services/launch-plan`, `/domains`, `/resources`, and `/contact`.
- The deployed home page still showed older metadata and did not yet expose the new canonical URL tags from the latest local build.
- The deployed home page still linked to `mailto:hello@thg.digital`; update this to a `theharleygroup.org` address when the mailbox or alias is ready.

## Revenue-First Recommendations

1. Deploy the latest canonical-domain build and verify `og:url`, `og:site_name`, and canonical tags on production.
2. Keep the `/admin` Control Centre as the command layer for every public website route.
3. Map every money page to an admin owner, Revenue OS asset, next action, and lead-capture path.
4. Prioritise care plans, automation audits, launch-plan enquiries, and domain monetisation because they connect fastest to revenue.
5. Add live diagnostics next: route status, metadata coverage, contact form capture, and broken-link checks.

## Control Centre Operating Model

- Home and settings manage canonical identity, messaging, and contact details.
- Services manage fixed-price offers and recurring-revenue packaging.
- Revenue OS manages domains, SaaS ideas, automation opportunities, and execution tasks.
- Resources manage SEO and authority content that supports the sales pipeline.
- Leads, clients, and projects manage the path from enquiry to delivery.
