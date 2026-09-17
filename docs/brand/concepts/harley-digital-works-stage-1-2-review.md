# Harley Digital Works Brand Identity Review

Status: Draft, under review  
Stage: 1 audit and 2 initial brand directions  
Approval state: Not approved for production  
Prepared for: Harley Digital Works, part of The Harley Group  
Domain: https://harleydigitalworks.com

Do not treat any logo, palette, type system, or asset in this document as final. These are review materials only.

## Stage 1: Existing Brand Audit

### What currently exists

- A working Harley Digital Works rebrand is already present across public site copy, route metadata, admin labels, PWA metadata, and supporting docs.
- Central brand config exists in `src/lib/site-config.ts`, including:
  - Name: Harley Digital Works
  - Parent company: The Harley Group
  - Domain and canonical URL
  - Tagline
  - Description
  - Brand asset paths for mark, logo, and Open Graph image
- Public brand assets currently exist at:
  - `public/brand/hdw-logo-horizontal.svg`
  - `public/brand/hdw-mark.svg`
  - `public/brand/hdw-og-image.svg`
  - `public/brand/thg-logo-horizontal.svg`
  - `public/brand/thg-mark.svg`
  - `public/brand/thg-og-image.svg`
  - `public/favicon.svg`
  - `public/favicon.ico`
  - `public/favicon-16x16.png`
  - `public/favicon-32x32.png`
  - `public/apple-touch-icon.png`
  - `public/brand/icon-16.png`
  - `public/brand/icon-32.png`
  - `public/brand/icon-180.png`
  - `public/brand/icon-192.png`
  - `public/brand/icon-512.png`
  - `public/og-image.svg`
  - `public/site.webmanifest`
- The existing logo assets are simple typographic SVGs using "Harley Digital Works" and "HDW" in Syne, supported by DM Mono and a teal rule.
- The site header, footer, and admin shell currently use live text lockups rather than the SVG logo file.
- The PWA manifest references `/favicon.svg`, `/brand/icon-192.png`, and `/brand/icon-512.png`.
- Root metadata references `/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png`, `/site.webmanifest`, and the canonical Open Graph image.
- The docs already include:
  - `docs/brand-pack.md`
  - `docs/design.md`
  - `docs/overall-plan.md`
  - `docs/project-domain.md`
  - `docs/harley-digital-works-rebrand.md`
  - `docs/harley-digital-works-launch-checklist.md`

### What is reusable

- The core positioning is strong and should be retained:
  - "Better websites. Smarter systems. Simpler growth."
  - "Harley Digital Works helps businesses and organisations build better websites, automate repetitive work and create scalable digital systems."
- The parent-company distinction is clear and useful:
  - The Harley Group remains the owner and parent.
  - Harley Digital Works is the public digital agency.
  - Harley Domains, Harley Labs, and ContentFlow AI should remain sub-brand or product directions rather than main identity anchors.
- The warm neutral canvas, ink, and restrained accent approach are broadly aligned with the desired brand character.
- The site already has semantic token infrastructure in `src/styles.css`, including light and dark mode values, Tailwind token mapping, and reusable colour names.
- The system already uses practical free web fonts from Google Fonts, which avoids paid font dependency and hosting complexity.
- Lucide icons are already used in the admin area and fit the practical interface direction.

### What is inconsistent

- `docs/brand-pack.md` says DM Sans is the UI/display font, but `src/styles.css` currently maps `--font-sans` to Inter and `--font-display` to Anton.
- `docs/design.md` defines a high-contrast black, cream, indigo, emerald, and rose system that does not fully match the newer ink, teal, cream, sage, and mist brand pack.
- Public homepage styling still includes strong dark editorial treatment, Anton display headings, emerald accents, rose/indigo moments, and animation-heavy sections. This can be distinctive, but it is not yet fully aligned with the calmer brand pack.
- The visible header/footer/admin brand lockups are text-based and do not yet use a complete logo system.
- Legacy token names such as `--thg-teal` remain. They are technically acceptable for compatibility, but the approved brand kit should introduce HDW-facing token names while keeping aliases where needed.
- Legacy asset filenames under `/brand/thg-*` are compatibility aliases, but they now render Harley Digital Works artwork. This is useful technically, but needs clear governance so old names do not confuse future work.
- The current `HDW` favicon mark is serviceable but generic. It lacks a distinctive symbol that can carry future SaaS products or sub-brands.
- No formal logo clear-space, misuse, minimum-size, sub-brand, icon, or social template guidance exists yet.

### What needs replacement

- Temporary HDW logo and mark assets should remain under review and should not be treated as final.
- Favicons, app icons, social preview images, and PWA icons need regeneration only after final identity approval.
- The typography decision needs resolving before implementation:
  - Option A: keep Inter/Anton/Caveat as part of the expressive site.
  - Option B: align the whole system around DM Sans, DM Mono, and a refined display/wordmark font.
  - Option C: move to a simpler professional stack such as Manrope plus IBM Plex Mono or Sora plus Inter.
- Open Graph and social assets need a production-ready identity system rather than a single text-based preview.
- Any old THG Digital / THG Digital Agency surfaces should continue to be checked, but The Harley Group must remain as parent identity where legally or strategically appropriate.

### What should remain separate

- The Harley Group should remain the parent-company identity, not the public service brand.
- ContentFlow AI should retain room for its own product identity later. It should not inherit a logo that is too agency-specific or too generic.
- Harley Domains and Harley Labs should remain planned divisions until operationally ready.
- Diagnostics that check for stale THG or legacy domain references should remain, because they help protect the rebrand rollout.
- Domain portfolio content that references automotive domain opportunities should remain separate from Harley Digital Works brand imagery so the main brand does not imply motorcycle or automotive meaning.

### Technical constraints

- The project uses TanStack Start, React, Tailwind 4 token mapping, CSS custom properties, and Google Fonts.
- `src/styles.css` currently states that all design colours should use OKLCH in CSS tokens. Final HEX/RGB/HSL values should therefore be translated into OKLCH tokens during implementation.
- Production assets are in `public`, so replacing favicons/PWA icons is immediately production-facing and must wait for final approval.
- SVG logo assets should be simple path-based vectors for final export. Current temporary SVGs use live SVG text, which depends on font availability and is not ideal for final production logos.
- Header, footer, and admin currently use text lockups, so final logo implementation can either:
  - use SVG assets directly, or
  - build an accessible React logo component from approved SVG paths.
- PWA icons require square, high-contrast marks that remain clear at 16x16, 32x32, 180x180, 192x192, and 512x512.
- Social preview and proposal assets need both light and dark variants because the existing site uses both warm light surfaces and high-contrast dark sections.

## Stage 2: Three Brand Directions

Preview board: `docs/brand/concepts/harley-digital-works-brand-directions.html`

All directions avoid motorcycle, wings, shields, flames, gears, generic circuits, robots, AI brains, browser icons, and complex monograms.

## Direction 1: Foundry Line

### Strategic concept

Foundry Line treats Harley Digital Works as a calm digital workshop: precise, practical, and quietly premium. The central visual idea is a confident wordmark supported by a simple "workline" symbol, a horizontal stroke that represents connection, delivery, and steady operational progress.

Why it fits:

- It extends the current warm ink/teal/cream direction instead of discarding the rebrand work.
- It feels human and service-led, with enough polish for premium website and automation work.
- It can support agency services, care plans, ContentFlow AI, and future SaaS without feeling tied to one product.

Advantages:

- Lowest implementation risk.
- Strong continuity with current assets and docs.
- Calm, trustworthy, easy to reproduce.
- Works well in documents and admin UI.

Possible weaknesses:

- Less instantly ownable than a more distinctive symbol-led identity.
- The line motif must be handled carefully so it does not feel too plain.

### Logo concept

- Primary logo: Harley Digital Works wordmark with a short workline aligned to the baseline.
- Wordmark: confident mixed-case wordmark, slightly condensed, generous spacing, no decorative effects.
- Symbol: a sturdy "H" made from simple vertical forms and a single teal workline.
- Horizontal arrangement: symbol left, wordmark right, parent-company line below when needed.
- Stacked arrangement: symbol above wordmark, tagline optional below.
- Small-size treatment: symbol only; remove parent-company line and tagline.
- Favicon concept: cream square with ink H and teal workline.
- Single-colour treatment: all ink or all white.
- Reversed treatment: cream/white wordmark and teal line on dark ink.

### Colour direction

- Primary: Ink Green `#173033`, RGB 23 48 51, HSL 186 38% 15%.
- Secondary: Quiet Teal `#5F9E9A`, RGB 95 158 154, HSL 176 25% 50%.
- Accent: Warm Copper `#B66A3C`, RGB 182 106 60, HSL 23 51% 47%.
- Background: Warm Cream `#F6F4EE`, RGB 246 244 238, HSL 45 31% 95%.
- Surface: Mist `#E8EBEB`, RGB 232 235 235, HSL 180 7% 92%.
- Text: Deep Ink `#102326`, RGB 16 35 38, HSL 188 41% 11%.
- Muted text: Slate Teal `#55706D`, RGB 85 112 109, HSL 173 14% 39%.
- Success: `#1F7A4D`, RGB 31 122 77, HSL 150 59% 30%.
- Warning: `#B56B18`, RGB 181 107 24, HSL 32 77% 40%.
- Error: `#B42318`, RGB 180 35 24, HSL 4 76% 40%.
- Information: `#2C6684`, RGB 44 102 132, HSL 200 50% 35%.

Recommended usage ratios:

- 68% warm cream and white surfaces.
- 18% ink text and structural elements.
- 8% mist/sage supporting surfaces.
- 4% teal accents.
- 2% copper highlights for premium emphasis, never primary CTA overuse.

Accessibility:

- Ink on cream and white is strong for body text.
- White on ink is strong for dark surfaces.
- Teal should be used mainly for rules, focus states, badges, and icons, not small body text on light backgrounds unless contrast is verified.

### Typography direction

- Primary display: Syne, weights 600, 700, 800.
- Body: DM Sans, weights 400, 500, 600.
- Interface: DM Sans.
- Operational labels: DM Mono, weights 400, 500.
- Fallback stack:
  - Display: `"Syne", "DM Sans", ui-sans-serif, system-ui, sans-serif`
  - Body/UI: `"DM Sans", Inter, ui-sans-serif, system-ui, sans-serif`
  - Mono: `"DM Mono", ui-monospace, "SFMono-Regular", Consolas, monospace`
- Hosting/licensing: all available through Google Fonts and practical for the current stack.
- Heading hierarchy:
  - H1: Syne 700/800, tight but not compressed.
  - H2/H3: Syne 700 or DM Sans 600 depending on density.
  - Body: DM Sans 400, 1.55 to 1.65 line height.
  - Labels/nav/buttons: DM Sans 500/600.
  - Operational tags: DM Mono uppercase with restrained letter spacing.

### Visual system

- Website headers: text-first, clean navigation, restrained line accents.
- Buttons: ink primary, cream or white secondary, teal focus/active detail.
- Cards: simple borders, low-shadow or no-shadow, radius 8 to 12px in app UI.
- Backgrounds: warm cream, mist bands, occasional dark ink sections.
- Icons: lucide-style linear icons with slightly stronger stroke in UI.
- Illustration: practical diagrams, process lines, system maps, no generic AI illustration.
- Patterns: sparse horizontal or baseline rules, delivery lines, subtle grid only where useful.
- Motion: calm line reveals, short fades, no exaggerated futuristic motion.
- Social: premium editorial layouts with wordmark and tagline, not stock tech imagery.
- Proposals: warm cover, clear title hierarchy, parent-company line.
- Presentations: clean title slides, large typography, one accent line.
- Email: compact header lockup, no heavy imagery.
- SaaS interfaces: works well with admin dashboards, operational tables, and product cards.

## Direction 2: Modular Works

### Strategic concept

Modular Works positions Harley Digital Works as a builder of digital systems. The central idea is a modular tile symbol: parts that connect cleanly, rearrange, and scale. It speaks to websites, automation, SaaS, hosting, workflows, and repeatable digital products.

Why it fits:

- It directly supports the business model of productised services, recurring systems, and SaaS products.
- It feels more product-company than freelance agency.
- It gives future sub-brands a flexible visual grammar.

Advantages:

- Strongest fit for SaaS and automation credibility.
- Clear extension system for icons, diagrams, templates, and dashboards.
- Distinct without using generic circuit or robot motifs.

Possible weaknesses:

- Slightly more technical and less warm than Foundry Line.
- Needs careful voice and photography to stay human and approachable.

### Logo concept

- Primary logo: modular symbol plus clean wordmark.
- Wordmark: neutral, modern, highly legible.
- Symbol: four rounded modules that imply an H/W structure and connected work blocks.
- Horizontal arrangement: symbol left, wordmark right, optional parent-company descriptor below.
- Stacked arrangement: symbol above wordmark.
- Small-size treatment: symbol only, no internal letters.
- Favicon concept: dark or cream tile with the modular mark.
- Single-colour treatment: all graphite or all white.
- Reversed treatment: white modular mark and sand accent on graphite.

### Colour direction

- Primary: Graphite `#111827`, RGB 17 24 39, HSL 221 39% 11%.
- Secondary: System Teal `#2F6F6A`, RGB 47 111 106, HSL 175 40% 31%.
- Accent: Sand Gold `#D8C7A3`, RGB 216 199 163, HSL 41 41% 74%.
- Action accent: Burnt Orange `#B45309`, RGB 180 83 9, HSL 26 90% 37%.
- Background: Porcelain `#FAFAF7`, RGB 250 250 247, HSL 60 23% 97%.
- Surface: Soft Grid `#EEF2F1`, RGB 238 242 241, HSL 165 13% 94%.
- Text: System Ink `#17201F`, RGB 23 32 31, HSL 173 16% 11%.
- Muted text: `#667775`, RGB 102 119 117, HSL 173 8% 43%.
- Success: `#198754`, RGB 25 135 84, HSL 152 69% 31%.
- Warning: `#A16207`, RGB 161 98 7, HSL 35 92% 33%.
- Error: `#B91C1C`, RGB 185 28 28, HSL 0 74% 42%.
- Information: `#2563EB`, RGB 37 99 235, HSL 221 83% 53%.

Recommended usage ratios:

- 60% porcelain/white surfaces.
- 18% graphite structure.
- 10% soft grid surfaces.
- 7% system teal.
- 3% sand gold.
- 2% burnt orange for conversion moments and alerts.

Accessibility:

- Graphite on porcelain is strong.
- White on graphite is strong.
- Sand gold should not carry small text on light backgrounds.
- Burnt orange is suitable for emphasis and warning states with careful pairing.

### Typography direction

- Primary display: Sora, weights 600, 700.
- Body: Inter, weights 400, 500, 600.
- Interface: Inter.
- Operational labels/code: IBM Plex Mono, weights 400, 500.
- Fallback stack:
  - Display: `"Sora", Inter, ui-sans-serif, system-ui, sans-serif`
  - Body/UI: `Inter, ui-sans-serif, system-ui, sans-serif`
  - Mono: `"IBM Plex Mono", "DM Mono", ui-monospace, Consolas, monospace`
- Hosting/licensing: Google Fonts available. Sora creates a product-company feel without a paid dependency.
- Heading hierarchy:
  - H1: Sora 700.
  - H2: Sora 600/700.
  - H3: Inter 600.
  - Body: Inter 400.
  - Labels/buttons: Inter 600.

### Visual system

- Website headers: clean nav with modular mark, strong hierarchy.
- Buttons: graphite primary, teal secondary, orange limited to commercial CTAs.
- Cards: denser, product-like surfaces with 8px radius.
- Backgrounds: porcelain, subtle modular grid, dark graphite hero sections as needed.
- Icons: modular line icons, terminal/process metaphors only when directly useful.
- Illustration: workflow diagrams, system blocks, operational maps.
- Patterns: tile matrix, connector paths, stacked modules.
- Motion: modules assemble, state transitions, short dashboard-style reveals.
- Social: structured templates with modular sidebars and proof points.
- Proposals: confident B2B layout, product/service cards.
- Presentations: section divider tiles and system diagrams.
- Email: compact modular header and clear CTA.
- SaaS interfaces: strongest direction for dashboards, product cards, automation workflows, and future apps.

## Direction 3: Open Aperture

### Strategic concept

Open Aperture presents Harley Digital Works as a clear lens on digital complexity. The central idea is an open frame with a precise path through it: simplifying the route from messy operations to better websites, smarter systems, and simpler growth.

Why it fits:

- It is distinctive and premium without becoming cold or corporate.
- It suggests clarity, focus, and making systems easier to understand.
- It can work across strategy, web builds, automation, SaaS, proposals, and social content.

Advantages:

- Most memorable symbol.
- Strongest premium presentation and proposal presence.
- Avoids literal tech imagery while still feeling technically credible.

Possible weaknesses:

- Requires more design discipline to avoid becoming too editorial.
- Less continuity with the existing temporary assets.
- The symbol needs careful small-size testing so the open frame stays clear.

### Logo concept

- Primary logo: open frame symbol plus wordmark.
- Wordmark: refined, calm, slightly editorial.
- Symbol: four open corners with a single precise internal path.
- Horizontal arrangement: aperture symbol left, wordmark right.
- Stacked arrangement: symbol above wordmark and tagline.
- Small-size treatment: simplified aperture without tagline or parent line.
- Favicon concept: ink square with cream aperture and coral path.
- Single-colour treatment: all ink or all white.
- Reversed treatment: cream/white on deep black with coral accent only where contrast allows.

### Colour direction

- Primary: Aperture Black `#0B0F10`, RGB 11 15 16, HSL 192 19% 5%.
- Secondary: Deep Green `#0E5F52`, RGB 14 95 82, HSL 170 74% 21%.
- Accent: Signal Coral `#D95D39`, RGB 217 93 57, HSL 14 68% 54%.
- Background: Soft Paper `#FBF8F1`, RGB 251 248 241, HSL 42 56% 96%.
- Surface: Pale Field `#E7ECE6`, RGB 231 236 230, HSL 110 14% 91%.
- Text: Near Black `#15191A`, RGB 21 25 26, HSL 192 11% 9%.
- Muted text: `#596564`, RGB 89 101 100, HSL 175 6% 37%.
- Success: `#157347`, RGB 21 115 71, HSL 152 69% 27%.
- Warning: `#996515`, RGB 153 101 21, HSL 36 76% 34%.
- Error: `#A6382F`, RGB 166 56 47, HSL 5 56% 42%.
- Information: `#245A75`, RGB 36 90 117, HSL 200 53% 30%.

Recommended usage ratios:

- 58% soft paper and white.
- 20% black/near-black structure.
- 10% pale field surfaces.
- 7% deep green.
- 5% coral accent for highlights, motion paths, and campaign moments.

Accessibility:

- Near black on soft paper is strong.
- Soft paper on aperture black is strong.
- Coral should not be the sole indicator of state.
- Deep green is better for larger text, blocks, and UI accents than small labels on dark backgrounds.

### Typography direction

- Primary display: Fraunces or Newsreader, weights 600, 700, used sparingly.
- Body: Manrope, weights 400, 500, 600.
- Interface: Manrope.
- Operational labels: IBM Plex Mono or DM Mono.
- Fallback stack:
  - Display: `"Fraunces", "Newsreader", Georgia, serif`
  - Body/UI: `"Manrope", Inter, ui-sans-serif, system-ui, sans-serif`
  - Mono: `"IBM Plex Mono", "DM Mono", ui-monospace, Consolas, monospace`
- Hosting/licensing: Google Fonts available. Serif display usage should be restrained so the brand remains digital, not magazine-like.
- Heading hierarchy:
  - H1: Fraunces/Newsreader 650 to 700.
  - H2/H3: Manrope 600/700 for practical pages.
  - Body: Manrope 400.
  - Labels/buttons/nav: Manrope 600.

### Visual system

- Website headers: confident wordmark with open-frame symbol.
- Buttons: black primary, deep green secondary, coral as sparing emphasis.
- Cards: paper-like surfaces, precise edges, 8px radius.
- Backgrounds: soft paper, pale field bands, high-contrast black presentation moments.
- Icons: open-corner geometry, simple stroke icons, avoid over-decoration.
- Illustration: system simplification diagrams, framed screenshots, before/after process maps.
- Patterns: open corners, aperture frames, measured path lines.
- Motion: frame opens, path draws, panels reveal in calm sequence.
- Social: distinctive framed layouts, strong avatar recognition.
- Proposals: strongest cover system, premium and memorable.
- Presentations: editorial title slides with clear operational diagrams.
- Email: minimal frame header and clear CTA.
- SaaS interfaces: usable with careful restraint; best for polished product presentation rather than dense internal tooling.

## Comparison Against Business Goals

| Goal                            | Foundry Line | Modular Works | Open Aperture |
| ------------------------------- | ------------ | ------------- | ------------- |
| Premium services credibility    | Strong       | Strong        | Very strong   |
| SaaS/product support            | Good         | Very strong   | Good          |
| Small-business approachability  | Very strong  | Good          | Medium        |
| Practical/operational feel      | Very strong  | Very strong   | Strong        |
| Distinctiveness                 | Medium       | Strong        | Very strong   |
| Implementation continuity       | Very strong  | Medium        | Medium        |
| Long-term sub-brand scalability | Good         | Very strong   | Strong        |
| Light/dark flexibility          | Strong       | Strong        | Strong        |
| Favicon clarity                 | Strong       | Very strong   | Needs testing |

## Recommendation

Recommended direction for long-term use: Modular Works.

Reason: it best supports the strategic shift from a web agency into a broader digital systems business with recurring hosting, maintenance, automation, SaaS products, digital products, domains, and ContentFlow AI. It gives Harley Digital Works a product-grade identity without using generic AI imagery. It is also the most extensible for future sub-brands and admin/SaaS interfaces.

Secondary recommendation: Foundry Line if continuity, warmth, and low implementation risk matter more than distinctiveness.

Highest-risk, highest-memorability option: Open Aperture. It could become the most premium identity, but it needs the most refinement discipline.

## First Approval Gate

Please review the three directions and choose one of the following:

- Approve Foundry Line for refinement.
- Approve Modular Works for refinement.
- Approve Open Aperture for refinement.
- Request revisions to one or more directions.
- Request a new fourth direction.

No final assets should be created, implemented, deployed, merged, or published until a direction is explicitly approved and then separately given final approval after refinement.
