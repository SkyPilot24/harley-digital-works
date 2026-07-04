# THG Redesign — twoday.com system, THG brand

## Design principles borrowed from the reference

- **Full-bleed photographic hero** with a small tag chip top-left, a three-line editorial headline, and one small pill CTA — no floating cards, no stat rows, no orbs.
- **Generous whitespace** on a warm off-white canvas; sections separated by air, not by dark bands.
- **Muted tinted cards** (soft sage, warm beige, pale stone) instead of white + shadow. Corners `rounded-2xl`, borders hairline or none, shadows almost invisible.
- **Two-column asymmetric feature blocks**: large image on the left, a small caption card overlaid at the bottom-left inside the image, headline + intro on the right.
- **Single warm accent** used sparingly on small pill buttons and hover states. THG keeps **teal `#1A7F7A`** (brand equity) as the sole accent — replacing twoday's mustard.
- **Small pill CTAs** (`rounded-full`, compact padding, tiny arrow) — not big rectangular buttons.
- **Left-aligned section headings** paired with a right-side intro paragraph on a 5/7 grid.
- **Editorial type**: large humanist sans headlines (weight 500–600, not 800), tight tracking, generous line-height on body.
- **Uniform 4-up news/card grids** with a tiny uppercase tag at the top of each card.
- **Dark charcoal footer** with 4–5 link columns, small "Get in touch" pill on the left.

## Design system (new tokens)

Palette shifts from mostly-dark to mostly-light, warm neutrals:

| Token | Value | Use |
|---|---|---|
| `--background` | `#F6F4EE` warm off-white | Page canvas |
| `--surface-sage` | `#E4E9DE` | Tinted feature cards |
| `--surface-stone` | `#EDE7DB` | Warm feature cards (portraits) |
| `--surface-mist` | `#E8EBEB` | Cool feature cards |
| `--foreground` | `#1A1A1A` near-black | Body + headlines |
| `--muted-foreground` | `#5B5B58` | Meta, captions |
| `--primary` (accent) | `#1A7F7A` THG teal | Pill CTAs, links, hover |
| `--footer-bg` | `#111111` | Footer only |
| `--border` | `rgba(0,0,0,0.08)` | Hairlines |

Typography — keep **Syne + DM Sans + DM Mono** already loaded, but retune usage:
- Headlines: DM Sans 500–600 (not Syne 800) for the editorial twoday feel; Syne reserved for the THG wordmark only.
- Body: DM Sans 400, 17px, line-height 1.6.
- Tiny uppercase tags: DM Mono 500, 11px, tracking `0.18em`.

Radii: `--radius-card: 20px`, `--radius-pill: 999px`. Shadows: replaced by tinted surfaces; only a `0 1px 0 rgba(0,0,0,0.04)` on hover for cards.

## Reusable components

1. **`SiteHeader`** — light background, dark text, small logo + inline nav + right-side "Contact us" pill. Sticky, becomes subtle glass on scroll.
2. **`PillButton`** — `variant: primary | ghost | dark`, always `rounded-full`, tiny `↗` arrow.
3. **`TagChip`** — uppercase mono label with a background tint; used on hero and cards.
4. **`SectionHeader`** — 5/7 grid: left heading, right intro paragraph.
5. **`FeatureCard`** — tinted `rounded-2xl` container with tag, body, and small "See how" pill.
6. **`ImageFeatureBlock`** — full-bleed image with overlaid `FeatureCard` at bottom-left.
7. **`PortraitFeature`** — warm beige panel, oversized headline left, portrait right, quote top-right, dual arrow controls under CTA.
8. **`NewsCard`** — image + tag + headline + 2-line intro; 4-up on desktop, 2-up tablet, 1-up mobile.
9. **`FooterDark`** — 5 columns (Get in touch form, then 4 link groups), utility bar underneath.

## Page-by-page redesign

Existing routes to redesign (from the source repo): Home, About, Services, CarePlans, ContentEngine, AutomationServices, DigitalProducts, LaunchPlan, Domains, Resources, Contact. All share `SiteHeader` + `FooterDark`.

### Home
1. **Hero** — full-bleed photograph (studio/laptop or hands-on scene). Tag chip "Digital · Web · Content". Three-line headline: "Applied craft. / Fixed-price delivery. / Lasting impact." Single teal pill "Book a free call ↗".
2. **Intro band** — one-sentence positioning statement + 4 tinted feature cards (Websites, Content, Automation, Domains) in a 4-up grid.
3. **Lasting impact** — section header (left "Lasting impact", right intro). Two-column `ImageFeatureBlock` row (two case studies, image + overlaid caption card).
4. **Portrait feature** — "Meet Dr Robbie Harley, Founder" in a stone/beige panel with pull-quote.
5. **Latest thinking** — 4-up `NewsCard` grid.
6. **Let's talk** — large left-aligned heading, short paragraph, teal pill.
7. Footer.

### Services (and sub-pages CarePlans / ContentEngine / AutomationServices / DigitalProducts / LaunchPlan)
- Short hero: tag + single-line headline + 1-paragraph lead (no photo, ample white space).
- 3-up tinted package cards with 01/02/03 mono numeral, price, tag, 5–6 bullet list, pill CTA.
- Alternating `ImageFeatureBlock` rows explaining process/deliverables.
- FAQ accordion (hairline dividers, no boxes).
- CTA band → Contact.

### Domains
- Hero + filter chip bar (Category, Status, Price range).
- Grid of domain cards: mono domain name (large), category tag, status pill, price, "Enquire ↗".
- Right rail on desktop: "How buying works" tinted card.

### About
- Hero paragraph.
- Portrait feature for founder.
- Values as 3-up tinted cards.
- Timeline / milestones as a simple two-column list.

### Contact
- Split layout: left `Get in touch` form (name, email, package select, message) on off-white; right sidebar with direct email, response-time promise, calendar embed placeholder, all inside a sage tinted card.

### Resources
- Magazine-style hero card (large tinted feature) + 2-column grid of resource cards below, uppercase tag per card.

### Not Found
- Editorial: giant "404", one-line explanation, teal pill back home.

## Responsive behavior

- Container: `max-w-[1240px]` with `px-6 md:px-10` gutters.
- Grids: 4-col → 2-col at `md`, 1-col at `sm`. `ImageFeatureBlock` stacks image-then-card at `md`.
- Headline scale uses `clamp()` so hero drops cleanly from 5.5rem → 2.75rem.
- Nav collapses to a slide-down panel at `md`; the "Contact us" pill stays visible in the top bar.

## Implementation notes (technical)

- Update `src/styles.css`: replace THG palette section with the new tokens above (light canvas, tinted surfaces, teal accent), register `--radius-card`, keep the fonts already linked in `__root.tsx`.
- Move `Navigation.tsx` / `Footer.tsx` into `src/components/site/` and rewrite in the new system. Extract new primitives into `src/components/site/`: `PillButton`, `TagChip`, `SectionHeader`, `FeatureCard`, `ImageFeatureBlock`, `PortraitFeature`, `NewsCard`.
- Rebuild `src/routes/index.tsx` first against the new system; then create the remaining route files under `src/routes/` (`services.tsx`, `services.care-plans.tsx`, `services.content-engine.tsx`, `services.automation.tsx`, `services.digital-products.tsx`, `services.launch-plan.tsx`, `domains.tsx`, `about.tsx`, `contact.tsx`, `resources.tsx`), each with route-specific `head()` metadata.
- Motion: subtle only — 400 ms fade-up on section entrance, 200 ms card lift on hover, no kinetic word-by-word headline (drop it — off-brand vs the reference).
- Hero and feature images: source from Unsplash via Lovable Assets pointers to keep the repo light; replace with real THG photography later.

## Out of scope for this pass

- Wiring forms to Lovable Cloud (Contact, domain enquiries) — separate task.
- Admin dashboard rebuild — separate task once public site lands.
- Real photography — placeholder Unsplash pointers used, marked for later replacement.
