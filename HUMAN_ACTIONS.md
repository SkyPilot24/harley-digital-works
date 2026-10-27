# The Harley Group — Human Action Items & Approvals Required

These items require founder, legal, or accounting action outside the codebase. Do not guess or invent these facts.

---

## 1. Cloudflare Turnstile Configuration
- [ ] Create a Cloudflare Turnstile widget in the Cloudflare Dashboard for `harleydigitalworks.com` and `theharleygroup.org`.
- [ ] Set `TURNSTILE_SECRET_KEY` and `LEAD_RATE_LIMIT_SECRET` as Cloudflare Worker secrets via `wrangler secret put`.
- [ ] Set `VITE_TURNSTILE_SITE_KEY` as a public environment variable.
- [ ] **Rollout Strategy:** Deploy initially with `TURNSTILE_ENABLED=false`, test a real manual lead submission, then set `TURNSTILE_ENABLED=true` and verify again.

---

## 2. Legal Entity & Trading Information
- [ ] Confirm exact legal entity name, Companies House number, and registered office address (and whether "The Harley Group Ltd" is registered).
- [ ] Supply verified registered office details for:
  - Website footers (`FooterDark.tsx`)
  - Privacy policy (`privacy.tsx`)
  - Outbound email compliance footers (`site-config.ts` -> `outreachComplianceConfig.registeredOfficePlaceholder`)

---

## 3. Legal & Privacy Review
- [ ] Have a qualified UK solicitor review the privacy policy (`/privacy`), specifically:
  - Lawful basis per processing purpose (GDPR / Data Protection Act 2018).
  - Stripe payments and customer data handling.
  - WhatsApp Business integration and data transfer implications.
  - Third-party international data transfers.
  - B2B prospecting data compliance (GDPR Article 14 privacy notice requirements for cold outreach).
  - Removal or review of unverified commitments (e.g. historical "5 business days" promises).
- [ ] Review commercial terms and the "What we commit to" guarantee wording.

---

## 4. VAT & Tax Status
- [ ] Confirm VAT registration status with an accountant before any VAT wording returns to invoices, proposals, or marketing.
- [ ] Note: Until written confirmation is received, prices are displayed cleanly with zero claims regarding VAT status.

---

## 5. Domain Ownership & Permissions
- [ ] Confirm ownership of and permission to list `douladeliveryhobart.com` and `holisticbeautykeynsham.co.uk`.
- [ ] Confirm that The Revival Fellowship explicitly consents in writing to being named publicly on `theharleygroup.org`.

---

## 6. Email Delivery & Infrastructure
- [ ] Confirm SPF, DKIM, and DMARC DNS records for `harleydigitalworks.com` and `theharleygroup.org` in Resend / DNS provider.
- [ ] Confirm physical hosting regions and backup retention schedules with the infrastructure provider before making specific hosting location claims.

---

## 7. Cloudflare & Vercel Dashboard Cleanup
- [ ] In the Cloudflare Dashboard, disable direct access via the `*.workers.dev` subdomain so that only canonical domains (`harleydigitalworks.com` and `theharleygroup.org`) serve traffic.
- [ ] Delete or disable any obsolete Vercel deployments and projects.

---

## 8. Pinned Nitro Beta Dependency Risk
- [ ] Monitor Nitro framework releases for a non-beta stable v3 release.
  - Context: TanStack Start SSR on Cloudflare Workers currently relies on `nitro@3.0.260603-beta`. As of October 2026, npm latest tag is still `3.0.260903-beta` (beta only).
  - Risk: Beta releases carry potential internal changes or undocumented upstream behavior. Retain the pinned beta until TanStack Start publishes guidance with a certified stable Nitro release.
