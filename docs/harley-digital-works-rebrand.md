# Harley Digital Works Rebrand

## Current-record precedence — 13 October 2026

The founder approved the midnight-navy/warm-ivory wordmark with HARLEY above DIGITAL WORKS, a capital H with a subtle curved bridge, and exact endorsement “Part of The Harley Group”. See [brand-pack.md](brand-pack.md) for current assets and rollout status. The implementation account below is historical; current AGENTS.md governs platform maintenance.

## Scope

This rebrand moves the public agency identity from THG Digital / THG Digital Agency to Harley Digital Works across the website, application shell, admin-visible labels, PWA metadata, social preview assets, contact surfaces, diagnostics, and supporting documentation.

The work preserves the existing TanStack Start application, Supabase integrations, lead capture flow, enquiry-led domain portfolio, admin Control Centre, Revenue OS, database schema, RLS policies, and Lovable-connected project structure.

## Brand Architecture

- The Harley Group: parent company, legal/ownership and portfolio identity.
- Harley Digital Works: digital agency identity for websites, automation, digital growth, care, domains, digital products and ContentFlow AI.
- Harley Domains: planned domain division. Do not present as a fully operational standalone business yet.
- Harley Labs: planned SaaS and product division. Do not present as a fully operational standalone business yet.
- ContentFlow AI: flagship SaaS product direction for reusable content systems.

Primary tagline: Better websites. Smarter systems. Simpler growth.

Default description: Harley Digital Works helps businesses and organisations build better websites, automate repetitive work and create scalable digital systems.

## Files And Systems Updated

- Central brand/domain config: `src/lib/site-config.ts`.
- Root metadata and structured data: `src/routes/__root.tsx`.
- Homepage hero, loader, CTAs, contact panel and footer line: `src/routes/index.tsx`.
- Shared navigation and footer: `src/components/site/SiteHeader.tsx`, `src/components/site/FooterDark.tsx`.
- Public route metadata and page copy: about, services, service details, domains, resources, onboarding and contact routes.
- Contact forms and lead confirmation text: `src/routes/contact.tsx`, `src/routes/index.tsx`.
- Admin-visible branding: `src/components/admin/AdminShell.tsx`, `src/routes/auth.tsx`, `src/routes/_authenticated/admin.index.tsx`.
- Diagnostics user agent and legacy reference checks: `src/lib/admin-diagnostics.functions.ts`.
- PWA metadata, cache name and offline fallback: `public/site.webmanifest`, `public/sw.js`, `public/offline.html`.
- Search and social assets: `public/sitemap.xml`, `public/robots.txt`, `public/og-image.svg`, favicon and app icon files.
- Brand documentation: `docs/brand-pack.md`, `docs/project-domain.md`, `docs/overall-plan.md`, `docs/design.md`.

## Retained Legacy Technical Identifiers

These remain intentionally to avoid risky infrastructure or migration churn:

- `supabase/migrations/*` entries that seed `THG Digital Agency`; migration history should remain immutable. Update live `agency_settings` data through the admin UI or a reviewed data migration only if needed.
- CSS custom property names such as `--thg-teal` and `bg-thg-teal-dark`; these are technical design-token identifiers, not visible branding.
- Legacy asset filenames under `/brand/thg-*`; retained as compatibility aliases but now render Harley Digital Works artwork.
- `AGENTS.md` and `$thg-project-context` references; these are local project/skill identifiers.
- Diagnostics checks for legacy THG/theharleygroup values; these must remain so the Control Centre can flag stale production pages.

## DNS Changes Required

- Point `harleydigitalworks.com` apex and `www` to the current hosting provider.
- Add redirects from `theharleygroup.org` agency routes to the matching `harleydigitalworks.com` routes.
- Keep parent-company domain decisions separate from agency-domain redirects where legal/company pages require review.

## Hosting-Domain Changes

- Add `harleydigitalworks.com` and `www.harleydigitalworks.com` to the hosting project.
- Set `harleydigitalworks.com` as the primary production domain.
- Confirm environment variables are present in production, preview and development environments.
- Rebuild and verify canonical, Open Graph, sitemap and robots output on the live domain.

## Supabase Redirect Changes

No schema or RLS changes were made.

Manual Supabase actions:

- Add `https://harleydigitalworks.com/auth` to allowed redirect URLs.
- Add any preview/staging callback URLs still used by Lovable or the hosting provider.
- Confirm email confirmation and password recovery templates point users back to the new domain where templates are customised.
- If the `agency_settings` row still contains old agency values, update it through the admin settings screen after deployment.

Supabase changelog reviewed on 2026-07-11. No redirect-specific breaking change was identified for this repo change; recent Data API exposure and TypeScript deprecation notices do not require schema changes here.

## Domain Payment Status

Public domain sales are enquiry-only. The previous anonymous Stripe Checkout endpoint was removed because it did not provide an order record, signed webhook processing, idempotency, reconciliation, refund handling, or fulfilment state.

Do not enable domain payments until the Payment Release Gate in `docs/harley-digital-works-remediation-plan-2026-08-01.md` passes in test mode and the product owner approves fulfilment, refund, tax, and support decisions.

## Email-Domain Setup

Intended configurable addresses:

- `hello@harleydigitalworks.com`
- `projects@harleydigitalworks.com`
- `support@harleydigitalworks.com`

Manual email actions:

- Verify the sending domain with the email provider.
- Add SPF records for the chosen sender.
- Add DKIM records supplied by the provider.
- Add a DMARC record, starting with a monitored policy if needed.
- Add return-path or tracking-domain records if the provider supports them.
- Confirm reply-to labels and sender names use Harley Digital Works.

No live email was sent during implementation.

## PWA Migration Notes

- Manifest name is now `Harley Digital Works`.
- Manifest short name is now `Harley Works`.
- Service-worker cache changed to `harley-digital-works-cache-v1` so stale THG-branded assets can be cleared.
- Favicon, Apple touch icon and PWA icon files were regenerated with the HDW typographic mark.
- Offline fallback copy now references Harley Digital Works.

## SEO Migration Notes

- Default title: `Harley Digital Works | Websites, Automation and Digital Growth`.
- Default description: `Harley Digital Works creates premium websites, practical automation and scalable digital systems for businesses and organisations.`
- Sitemap and robots now point to `https://harleydigitalworks.com`.
- Open Graph image and root metadata point to the new domain.
- ProfessionalService structured data uses Harley Digital Works with The Harley Group as parent organisation.

## Redirect Requirements

Configure 301 redirects for at least:

- `/` to `/`
- `/about` to `/about`
- `/services` to `/services`
- `/services/automation` to `/services/automation`
- `/services/care-plans` to `/services/care-plans`
- `/services/content-engine` to `/services/content-engine`
- `/services/digital-products` to `/services/digital-products`
- `/services/launch-plan` to `/services/launch-plan`
- `/domains` to `/domains`
- `/resources` to `/resources`
- `/contact` to `/contact`
- `/onboarding` to `/onboarding`

## Testing Completed

- Dependency validation: `bun install --frozen-lockfile` was attempted but did not finish within the 2-minute command window. Existing dependencies were already present and subsequent compile/build checks ran successfully.
- Formatting: changed text/code files pass `npx prettier --check`; `.env.example` is excluded because Prettier cannot infer a parser for env example files.
- Lint: focused lint on changed TypeScript/TSX files passes. Full `npm run lint` is still blocked by pre-existing repository-wide Prettier/line-ending issues in many untouched files.
- Type checking: `npx tsc --noEmit` passes.
- Tests: no test script is currently defined in `package.json`.
- Production build: `npm run build` passes.
- PWA checks: `public/site.webmanifest` parses as valid JSON, service-worker cache name was changed, PWA icons were regenerated, and browser smoke verified the manifest.
- Browser smoke: Playwright checked `/`, `/services`, `/domains`, `/resources`, `/contact`, `/onboarding`, and `/auth` at 375px, 768px, 1024px, and 1440px. No missing brand text or horizontal overflow remained after the footer/domain fixes. TanStack dev-only hydration source attributes were ignored during smoke testing.

## Outstanding Manual Actions

- Connect DNS and hosting domain.
- Configure redirects from the old domain.
- Update Supabase Auth redirect allow-list and any email templates.
- Keep domain payments disabled until the Payment Release Gate passes.
- Verify email sender domain and DNS records.
- Update analytics property/domain settings.
- Add and verify the new domain in Search Console.
- Update OAuth provider callback URLs for Google and any future providers.
- Review legal/privacy/terms pages when final legal details are available; do not invent company number, VAT number, address or registered entity details.

## Rollback Considerations

- Revert this branch if the new brand launch is paused before deployment.
- Keep database migrations intact; do not rewrite migration history.
- If PWA assets are deployed and then rolled back, increment the service-worker cache name again so installed clients refresh correctly.
- If DNS is moved, rollback also requires DNS/hosting changes outside the repo.
