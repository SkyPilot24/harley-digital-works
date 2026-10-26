# Homepage & Trade Demo Redesign — October 2026

## Direction: The "Architectural Craft" Hybrid

Governing Standard: **Option 1 — The Architectural Craft Hybrid** (Ratified 26 October 2026).

An editorial, high-authority web studio for UK trades and local businesses.

- **Warm Architectural Canvas (`#F6F3ED`)**: Daylight warmth for project photography, services, case studies, and customer feedback.
- **Warm Workshop Stone (`#ECE8E1`)**: Tactile comparison background for before/after workmanship proof.
- **High-Impact Technical Anchors (`#081B30` / `#051323`)**: Frosted glass sticky header, hero anchors, interactive quote calculators, and Google Maps coverage radars.
- **Accent Hierarchy**: Electrical Amber / Copper (`#D97706` / `#F59E0B`) for accreditations and instant estimate CTAs; Operational Emerald (`#059669`) strictly reserved for WhatsApp dispatch and live status beacon pulses.

The trade portfolio pieces are high-fidelity interactive design studies (e.g. RG Electrical Bristol Limited, Wessex Volt Concept), explicitly demonstrating instant quote estimators, before/after sliders, and verified NICEIC/TrustMark trust signals. Replace these with permissioned client work as it becomes available; never attach invented testimonials or conversion results.

## Asset provenance

All images are served locally from `public/images/home`:

- `architecture.jpg`: https://images.unsplash.com/photo-1600585154340-be6161a56a0c — illustrative architectural stock photograph.
- `solar.jpg`: https://images.unsplash.com/photo-1509391366360-2e959784a276 — illustrative solar stock photograph.
- `interior.jpg`: https://images.unsplash.com/photo-1620626011761-996317b8d101 — illustrative bathroom stock photograph.
- Stock images downloaded under https://unsplash.com/license (commercial use allowed). They do not depict Harley client projects.
- `after-electrical-consumer-unit.jpg`: Modern 18th Edition metal consumer unit with Hager RCBOs and SPD.
- `before-electrical-fusebox.jpg`: Obsolete rewirable fusebox showing comparison upgrade.
- `contractor-commercial.jpg`: Professional UK trade contractor service van outside residential property.
- `robbie-restored.jpg`: AI-assisted restoration of the existing supplied portrait, with contact-sheet text removed. Original source retained.

## Implementation & Quality Notes

- **Frosted Glass Shrinking Header**: Implemented with `backdrop-filter: blur(16px)` and dynamic scroll listener (68px -> 58px on scroll) to maximise mobile screen space.
- **4-Element Hero Discipline**: Hero sections maintain clean vertical hierarchy: Kicker pill -> Main `<h1>` -> 2-sentence commercial subheadline -> Button pair.
- **Package Integrity**: Managed package ratified at £1,495 setup + £249/mo ongoing care. Zero VAT claimed (THG is not VAT registered; never quote "+ VAT").
- **Machine & Port Guardrail**: Development server strictly bound to **port 3000** (`http://localhost:3000/`). Never bind to port 8080 (occupied by NVIDIA Broadcast on the founder's machine).
- **Verification Standards**: Verify on every commit with `npm run typecheck`, `npm test`, `npm run lint`, `npm run format:check`, and `npm run build`.
