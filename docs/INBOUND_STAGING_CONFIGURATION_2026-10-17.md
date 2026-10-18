# Isolated staging configuration — 17 October 2026

Latest continuation: [real browser rehearsal](INBOUND_PILOT_REHEARSAL_RESULTS_2026-10-17.md) passed nine scoped checks with exact cleanup. Dependencies reused by junction, no install. Cloudflare read-only metadata found no staging-targeting Worker; local outbound fetch guard added at process launch only. Earlier dependency/runtime/containment blocks below are historical within that recorded deployment scope.

## Latest verification — private key supplied locally

Robbie entered the private staging key and requested a recheck. **All nine configuration checks PASS.** Git still confirms `.env.local` ignored and tracked worktree status clean. Actual server-key HEAD request to staging `/rest/v1/leads?select=id` returned **HTTP 200** with exact-count metadata; no record bodies read, key printed or data written. All six delivery/payment/webhook/notification/email gates explicitly false. The local configuration/server-access blocker is resolved; earlier missing-key notes below are history. Browser/committed intake rehearsal, dependency availability and remote notification-consumer containment remain separate unverified prerequisites. No app launched or fixture created by this check.

H08/H09/H50. Robbie explicitly approved preparing isolated configuration and securely populating staging keys if available. Original repository `C:\Local Data\The Harley Group\harley-digital-works`, main `af5ae9c2c3896ced4a078f7edde7896205a62a57` plus preserved peer changes. Created and attached managed worktree `C:\Users\drrob\.codex\worktrees\inbound-staging-config\harley-digital-works` at that explicit revision; no application changes or dependencies installed.

Created private `.env.local` only in the isolated worktree. Original configuration and all Manus/peer files unchanged. Browser/server URLs both pin THG Enquiry Staging `mfpnfxpgkfuqtedbcxvp`; matching enabled modern public key retrieved through verified THG Supabase connector. Delivery approval, Stripe webhook, Resend webhook, lead notification, Slack and transactional email flags explicitly false. Stripe webhook secret and private Supabase server-key slot remain blank; no provider credentials copied or created.

## Verified

- Git confirms isolated `.env.local` ignored; worktree tracked status clean.
- Existing `scripts/check-staging-config.mjs`: eight checks PASS, only **Server secret key present** remains MISSING. Overall preflight correctly fails.
- Actual read-only fetch using staged public key: `/auth/v1/settings` HTTP 200; `/rest/v1/leads?select=id&limit=0` HTTP 401. Response bodies discarded, no records or keys printed.
- No app launched, fixture created, private server connection proved, notifications sent, migrations applied, dependencies installed, commit/push or deployment.

## Remaining exact action

Available connector exposes public keys, not server secrets. Known prior staging configuration locations did not provide a reusable private key. Do not substitute production credentials, derive a key from database secrets or ask for one in chat. The isolated private configuration file was queued to open in Codex (tool returned queued, not confirmation that editor is visible).

Robbie can enter the existing **THG Enquiry Staging** backend secret directly into `SUPABASE_SERVICE_ROLE_KEY` in that ignored local file. The existing server client supports the modern `sb_secret_` format despite its variable name; do not add a browser/VITE-prefixed secret. No key creation/rotation required by this plan. Then rerun `node scripts/check-staging-config.mjs` from the isolated worktree and make a server-key read-only metadata/count probe before attempting the authorised app rehearsal. Credentials must remain out of chat, logs and source control.

The isolated worktree has no node_modules; no install was authorised/performed. Before starting the application, reuse verified installed runtime/dependencies through a controlled existing arrangement if available, or report the separate dependency prerequisite. Configuration preflight uses built-in Node only. Remote staging notification-consumer containment remains necessary before committing any enquiry fixture; local false flags alone do not establish that containment.

Current state: **local configuration partially fixed, private-key input still blocked; browser rehearsal not resumed.** Authoritative guidance checked: [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys) and changelog. The Markdown changelog endpoint failed content-type handling; HTML changelog loaded. No SDK or schema change undertaken.
