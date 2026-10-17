# Comparison release acceptance — 17 October 2026

## Result

The founder explicitly authorised production publication in this chat. The revised comparison is live and browser-verified on https://harleydigitalworks.com/ and https://harleydigitalworks.com/work#transformations.

- Source implementation: 13ebd59 (original isolated review commit), applied as 9fc4952d088df85c87f3c4d2d5a0001cec37c1ad on current main.
- PR: https://github.com/SkyPilot24/harley-digital-works/pull/41. Pushed by this task; subsequently merged by SkyPilot24 at 2026-10-17 05:31:02 BST.
- Main merge: af5ae9c2c3896ced4a078f7edde7896205a62a57.
- Cloudflare Worker: skypilot24-harley-digital-works, account 6ccd86a1ec4535357f9bc51cd05e68cd.
- Observed active version: d9e17d0e-9070-406a-a8a6-20608249cd42 at 100%; deployment 09f84a90-197e-4312-9895-a0b3bf67c157 created 17 October 2026 05:31:59 BST. Prior version aaa69ebd-d118-435f-bea6-776b84973519 is the recorded rollback reference; no rollback performed.
- Cloudflare commit check: Workers Builds succeeded for the main merge. Provider build: https://dash.cloudflare.com/6ccd86a1ec4535357f9bc51cd05e68cd/workers/services/view/skypilot24-harley-digital-works/production/builds/b07d1496-b5af-46f0-ad6d-6a6cfe7d92ed.

The active version metadata has no Git SHA annotation; do not claim cryptographic provider-to-commit provenance. GitHub reports a successful connected Cloudflare build on the exact merge, the provider reports the active version above, and independent public-browser acceptance confirms the revised content and behaviour.

GitHub Actions Continuous Deployment run 39002863531 succeeded but its actual provider-upload step was SKIPPED because its deployment secret is missing. This task verified an existing authenticated Cloudflare CLI login, then found the connected Cloudflare build had already published the release. No second manual upload was performed. Keep the connected Workers Builds path distinct from the skipped GitHub upload path.

## Fresh acceptance

- PR and merged-main CI: Build & Test Suite, Lint & Format, TypeScript, Secret & Credential Scan and Dependency Audit PASS; connected Workers Builds PASS. Main quality run 39002863576, security run 39002863470.
- Tested base application source and current pre-merge main 1694273 had no differences across src, package manifests/lock and Vite configuration. Original full local validation remains applicable to identical application source: typecheck, formatting, build, zero lint errors/nine existing warnings, 66 smoke, 190 regression and three service-worker checks PASS.
- Live /work: all six trades at 0/50/100%, 18 readback checks PASS. Correct clipping/reveal and loaded images verified.
- Live /work at effective 390 x 844 CSS pixels: complete Before and After views PASS, text fits the preview and page width 375px remains within the viewport. No real-device touch claim.
- Live homepage: updated component, three featured trades, sentence-case title and clear illustrative disclosure present.
- Homepage enquiry CTA: opens /contact?service=Website+Redesign%3A+Plumbing+%26+Heating and prefills the message with the selected trade. No enquiry submitted and no customer/integration data written.
- Screenshots and bounded measurements: docs/evidence/comparison-production-2026-10-17/. Temporary viewport overrides reset.

## Readiness and limits

Scoped visual release: deployed and live-verified. Overall platform production gate remains RED under inherited records because complete paid-client lifecycle and other previously recorded release gates are not established by a UI release. This is not evidence of a new defect in this component. No schema, billing, access control, provider permissions, DNS or integration configuration changed. No synthetic production enquiry, email, Slack message or payment was sent.

Release record is saved in the repository and published on the comparison release branch; it is a follow-up to merged PR #41, not an additional application release. Governing checkpoint documents include the same dated pointer. Do not redeploy merely to publish documentation. Next action is normal visual acceptance by the founder; broader platform gates retain their existing owners and priorities.
