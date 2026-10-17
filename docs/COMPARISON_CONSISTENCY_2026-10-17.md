# Before-and-after comparison consistency — 17 October 2026

Status: implemented and verified locally; not pushed, deployed or live-accepted.

## Source and scope

Repository: SkyPilot24/harley-digital-works. Branch: codex/comparison-consistency-2026-10-17. Base: 7738130ec6cc629dc9c9c90f8a1df7d3b8e39f88 (audit/pre-go-live-remediation). Run `git log -1` for the scoped implementation checkpoint containing this record.

Workspace: implementation/hdw-comparison-consistency within the Harley Group ChatGPT project workspace. Canonical checkout at C:/Local Data/The Harley Group/harley-digital-works was read, not edited. Initial local clone attempts failed under sandboxed Git; a clean archive was extracted, then existing history fetched from the local canonical repository. The exported source was checked against the fetched base and matched. A temporary snapshot baseline was replaced with the actual canonical ancestry before committing. No synthetic history should be pushed.

Founder authorised the six findings from the live review to be implemented. H15/H16: focused public homepage and /work comparison correction; no broader platform/launch gate is closed.

## Implemented

- Corrected reveal mapping: before remains left and after right; 0% reveals the complete before design and 100% the complete after design. Pointer capture handles release outside the canvas; native range retains keyboard controls.
- Replaced the empty comparison backgrounds with the existing illustrative site photography. Both versions use the same source, image box and crop; text layouts deliberately differ to demonstrate the design change. At halfway, both introductions are visible.
- At phone widths and in the narrow internal Mobile preview, use full Before/After buttons rather than slicing through headlines and CTAs. Desktop retains the interactive slider and adds complete-version buttons.
- Reused PillButton, studio kicker, palette variables and local photography. Added scoped styles, restrained borders and pill controls; removed gold/amber HDW framing, heavy shadows and technical microcopy.
- Removed fictional testimonials, conversion percentages, hypothetical ROI panels and mock accreditation/registration claims from this component's output. The original data remains for compatibility with other consumers; this change does not certify all content across the site.
- Kept clear fictional-business and illustrative-photography disclosure, one primary enquiry CTA with selected-trade prefill, and all six trades on /work (three featured on home).
- Aligned heading/CTA case, removed a duplicate arrow and corrected the homepage's further-concepts copy. Replaced the two broken section heading references with descriptive section labels; component heading IDs use React useId.

No price, offer, scope, capacity, authentication, database, external enquiry submission, production configuration or release changed.

## Fresh validation

- TypeScript: PASS.
- Production build with NITRO_PRESET=cloudflare-module: PASS.
- Full ESLint: 0 errors; 9 existing React refresh warnings outside the changed files. Changed-file lint: PASS.
- Repository formatting check and scoped CSS formatting: PASS.
- 21st deterministic review across all three changed TSX files: 0 errors/warnings/suggestions. Catalogue search failed with `fetch failed`; no external components or generation credits used.
- Platform smoke: 66 PASS; regression: 190 PASS; service worker: 3 PASS.
- Live local browser: / and /work; all six trades at 0/25/50/75/100% (30 checks), matching paired image dimensions and loaded images. Pointer drag changed the reveal from 50% to 22%; keyboard ArrowRight changed 50 to 51.
- Effective 390 x 844 CSS viewport: all six trades, both complete versions (12 checks), no copy clipping or page-wide horizontal overflow. 768px viewport: all six trades checked for copy clipping; no page-wide overflow. Desktop default effective width 1467px (earlier screenshots used a different panel width). Browser zoom means requested override dimensions differed from CSS dimensions; all reported widths were read from the page. Overrides reset.
- Internal Mobile mode on desktop: complete-version buttons visible; split canvas/range hidden.
- Screenshots and bounded DOM measurements: [evidence folder](evidence/comparison-2026-10-17/). Browser screenshots demonstrate local development, not production.

## Limits and next action

No real-device touch or screen-reader acceptance, production preview, provider revision reconciliation or full customer lifecycle test is implied. Existing wider platform launch blockers remain open. Dependencies were copied from the canonical installed tree; no fresh package installation was performed. Catalogue unavailability did not block reuse of existing project components.

Local development preview: http://127.0.0.1:4197/work#transformations (available while the development process remains running).

Next action: review the local desktop/phone evidence and scoped Git commit, then integrate onto the reviewed release branch. Merge/push-to-main/deployment remain separately authorised actions. Preserve canonical peer work; do not replace the canonical checkout with this directory. No Drive or Slack publication performed.
