## Description

<!-- Provide a brief, clear summary of the changes and rationale. -->

## Pre-Merge Governance Checklist

### 1. Operating & Handover Alignment

- [ ] Read `PROJECT_STATUS.md` and `docs/HANDOVER.md` prior to beginning work.
- [ ] If this PR alters architecture, pricing, or status, `PROJECT_STATUS.md` and `docs/HANDOVER.md` are updated.

### 2. Commercial Boundaries Verification

- [ ] Pricing matches ratified packages (Launchpad: £995+£149/mo, Revenue Engine: £1,495+£249/mo, Market Leader: £2,495+£399/mo).
- [ ] Zero-rated VAT policy enforced (no VAT line item charged while below the £90k statutory threshold).
- [ ] Concurrency constraint respected (maximum 2 to 3 concurrent client onboarding builds).

### 3. Security & Database RLS

- [ ] `SUPABASE_SERVICE_ROLE_KEY` is strictly quarantined from public bundles (`src/integrations/supabase/client.server.ts` or server-only Nitro tasks).
- [ ] No direct bypass of Row Level Security on `worzpzbutngugwzhlvtj`.

### 4. Automated Verification

- [ ] `npm test` passes 100% (all smoke, drift, security, and notification tests).
- [ ] `npm run typecheck` (`tsc --noEmit`) passes with 0 errors.
- [ ] `npm run lint` passes with 0 errors.
- [ ] `npm run format:check` matches Prettier formatting.
