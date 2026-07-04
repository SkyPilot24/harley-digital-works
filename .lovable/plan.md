## Scope

Both routes already exist and are wired into the header — no 404 fix needed. This plan focuses on polishing and expanding them so they feel complete and match the editorial aesthetic of the rest of the site.

## About page (`src/routes/about.tsx`)

Keep the current hero, founder portrait, "How we work", milestones, and closing CTA. Add three new sections between them:

1. **"By the numbers" stat band** (after hero) — 4 stat tiles on a tinted surface: years in digital (20+), fixed‑price projects delivered (40+), average delivery time (1 week), typical reply time (< 1 working day). Big display numerals, small caption underneath.
2. **"What you actually get" capability list** (after "How we work") — 6 short deliverables in a 2‑column grid on plain background: fixed quote in 24h, weekly progress notes, plain‑English handover, 30 days post‑launch support, source code and full ownership, care‑plan option after launch.
3. **"Who we work with" client-type grid** (before milestones) — 3 `FeatureCard`s: community groups & CICs, solo founders & consultants, local & lifestyle brands. Each links to the matching service.

Section order becomes: Hero → Stat band → Founder → How we work → What you actually get → Who we work with → Milestones → CTA.

## Contact page (`src/routes/contact.tsx`)

Keep the current form + sidebar (already CMS-connected to `leads`). Add:

1. **"What happens next" 3‑step strip** below the form section — numbered steps: (01) You send a note, (02) We reply within a working day with a fixed quote or a call slot, (03) We scope the work together — no obligation. Mono numerals, thin dividers, matches the milestone rhythm on About.
2. **FAQ accordion section** — 5 common questions using shadcn's `Accordion` component: how fast can you start, do you take on ongoing work, what does a fixed price actually include, what if I'm not technical, do you work outside the UK.
3. **Sidebar enhancement** — add a "Based in" line and business hours (Mon–Fri, 9–5 UK) to the existing green info card. Keep it a single visual block.

## Styling and consistency

- Reuse existing primitives only: `Container`, `SectionHeader`, `TagChip`, `FeatureCard`, `PillButton`, surface tokens (`bg-surface-sage`, `bg-surface-stone`, `bg-surface-mist`, `bg-surface-cream`), `--font-display`, mono captions for eyebrow labels.
- No new dependencies. Accordion is already available via shadcn (`@/components/ui/accordion`); if missing on inspection during build, I'll add it via the shadcn convention already used in the repo.
- Section rhythm matches other pages: `py-20 md:py-28`, headings via `SectionHeader`, dividers `divide-ink/10`.
- Head metadata unchanged.

## Out of scope

- No changes to routing, header, footer, or `routeTree.gen.ts`.
- No changes to Supabase schema, `leads` submission logic, or admin.
- No new assets beyond existing Unsplash URLs already used elsewhere.

## Verification

- Typecheck (`tsgo`).
- Visit `/about` and `/contact` in the preview at desktop and mobile widths; confirm section rhythm, spacing, and that the contact form still submits.
