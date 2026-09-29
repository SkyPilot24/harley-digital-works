# Local admin sign-in investigation

Checked 29 September 2026.

- The checkout initially had no `.env` or `.env.local`; `.env.example` contains empty values.
  Browser sign-in requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
  Authenticated server functions additionally use `SUPABASE_URL` and
  `SUPABASE_PUBLISHABLE_KEY`.
- The stale database reference `worzpzbutngugwzhlvtj` is recorded in
  `supabase/config.toml`. Lovable project `f2aa963f-2beb-4507-b37e-a1865915cda7`
  reports an enabled Supabase database. Read-only database queries now succeed;
  the previously recorded connector permission failure is no longer present.
- The database contains one user and one admin role. The owner's existing
  account has the admin role. No users, roles, passwords or database records
  were changed during this investigation.
- Lovable's Git settings show `SkyPilot24/thgdigital`, branch `main`, last synced
  1 August 2026. This checkout instead uses `SkyPilot24/harley-digital-works`,
  branch `codex/revenue-readiness`. Do not assume changes here sync to that
  Lovable project. Neither connection was changed.
- After the owner authorised asking the Lovable project agent, its read-only
  `project_info` lookup identified the actual backend as `sprljifjcpbnagsxefrp`
  and returned its public publishable key. Its Auth settings endpoint returned
  HTTP 200 with email and Google enabled. The ignored `.env.local` now contains
  the verified public URL and key for both browser and server variable names.
  The CLI configuration was left unchanged to avoid silently retargeting migrations.

Local fixes load environment files into the development server's `process.env`
without adding private values to browser defines, and guard browser access to
`process` when public configuration is absent. TypeScript, targeted lint and
format checks passed. A Vite configuration check verified local server loading,
preservation of existing shell values and absence of private client defines.
All 54 smoke checks and 21 behavioural tests passed. After creating `.env.local`,
the running server at `http://127.0.0.1:5188/auth` returned HTTP 200 with the
sign-in form instead of the unavailable-configuration message. Final browser
interaction was blocked by an open Chrome extension UI.

End-to-end sign-in remains unverified until the owner completes sign-in. A service-role
key is not required for browser sign-in; privileged server workflows need their
own separate configuration.

Google follow-up: the local `/~oauth/initiate` endpoint returns 404. The hosted
Lovable broker rejects the localhost redirect (`redirect_uri is not allowed`),
and direct Supabase Google authorization returns `missing OAuth secret`. The
local page now disables Google sign-in and explains the limitation. A read-only
boolean check confirmed the owner's account has no password configured, so
email/password is not yet a usable fallback. Password setup or a supported
OAuth configuration is still required; no credentials were changed.

The local `/reset-password` page now supports requesting a recovery email,
verifying the original Supabase email link directly (avoiding hosted redirect
limitations), and letting the owner set a password after verification. The
sign-in page links to it. It rejects links for another project, wrong link types,
wrong paths and malformed tokens. TypeScript, targeted ESLint, link-validation
checks and an HTTP check of the recovery page passed. No recovery email was
sent by the agent and no password was entered or changed; the owner must
complete those steps in the page.
