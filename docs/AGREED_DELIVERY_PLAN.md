# Agreed delivery plan — 7 October 2026

The founder approved this plan and the reviewed production database cutover in this delivery engagement.

- **Canonical source:** `SkyPilot24/harley-digital-works`. Maintain its existing architecture and shared status/backlog/handover.
- **Production hosting:** existing Cloudflare Worker `skypilot24-harley-digital-works` and its established custom domains.
- **Live data and authentication:** Supabase **THG Agency**, `worzpzbutngugwzhlvtj`. Public/browser and trusted server configuration must match. Keep secret keys server-only.
- **Acceptance environment:** separate Supabase `mfpnfxpgkfuqtedbcxvp`, synthetic fixtures, notifications disabled. Never use it as the live customer database.
- **Lovable:** retain THG Digital, currently connected to `SkyPilot24/thgdigital`, for design/prototyping. It is a separate workspace and its historical cloud backend is retained. Reconnecting Lovable to canonical Git is a later reviewed action; no connection change or data migration occurred here. Lovable build dependencies remain in the application; production sign-in uses the selected Supabase backend. Google sign-in stays disabled until that backend's provider/redirect setup is verified.

Continue existing H07/H08/H09/H42; do not create another backlog. Reviewed live cutover preserves records and administrator assignments, adds missing intake schema, removes public/direct submission bypass and signup-admin bootstrap, and restricts legacy staff policies. Empty staging schema bootstrap must never be replayed into production.

The database cutover and tested Cloudflare build are deployed. A labelled live browser enquiry showed a receipt and persisted exactly once. Next is genuine existing-owner browser sign-in and retrieval; an administrator service key is not owner-access proof. Record the final Git revision, Worker version and remaining checks in PROJECT_STATUS.md and docs/HANDOVER.md.

Notifications and transactional email remain disabled. Retention scheduling, durable notification retries, leaked-password protection, remaining tooling advisories and backup/restore proof remain recorded work. Release success is not full end-to-end acceptance until the existing owner's retrieval is verified.

Synced `sources/` remain read-only. Do not force-push published history. Future changes to production, billing, communications or Lovable connections require their applicable authorisation.
