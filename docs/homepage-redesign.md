# Homepage redesign — September 2026

Direction: an independent editorial web studio. Warm paper, dark olive ink, restrained gold, generous photography, readable live-text branding, and large interactive website design studies. Existing pricing and package scope retained. Radix Dialog and Accordion reused.

The three portfolio pieces are original HTML design studies, explicitly labelled as concepts rather than commissioned projects. Replace these with permissioned client work as it becomes available; never attach invented testimonials or conversion results.

## Asset provenance

All images are served locally from public/images/home.

- architecture.jpg: https://images.unsplash.com/photo-1600585154340-be6161a56a0c — illustrative architectural stock photograph.
- solar.jpg: https://images.unsplash.com/photo-1509391366360-2e959784a276 — illustrative solar stock photograph.
- interior.jpg: https://images.unsplash.com/photo-1620626011761-996317b8d101 — illustrative bathroom stock photograph.
- Stock images downloaded under https://unsplash.com/license (commercial use allowed). They do not depict Harley client projects.
- robbie-restored.jpg: AI-assisted restoration of the existing supplied 07-hdw-relaxed-portrait.jpg, with contact-sheet text removed. Original source retained. Review likeness before live publication.

## Implementation notes

- Homepage suppresses exit-intent and floating WhatsApp overlays to preserve the work presentation. Contact routes remain available.
- Package enquiry links now preserve the selected package.
- Service worker navigation is network-first to prevent obsolete cached SSR HTML being paired with a new release. Development does not register the service worker.
- Verify with npm run typecheck, npm test, node --test scripts/verify-service-worker.mjs, npm run build and browser checks.
- Cloudflare preview versions do not promote a release to the live custom domain.
