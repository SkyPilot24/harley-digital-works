# Harley Digital Works

Harley Digital Works (part of The Harley Group) is a TanStack Start + Supabase platform for running both the public Harley Digital Works website and the internal agency operating system (Control Centre).

It combines:

- a public marketing site for Harley Digital Works services and packages
- protected lead capture and qualification workflows
- an authenticated admin Control Centre for CRM, content, and operations
- Supabase-backed data models for leads, clients, projects, services, team, and operational planning
- internal operating tools including Revenue OS, Domain OS, diagnostics, and playbooks

## What this app does

This repository supports two main surfaces:

### 1. Public website

The public site presents Harley Digital Works’ offers, including `/about`, `/services`, `/domains`, `/resources`, `/onboarding`, `/work`, and `/contact`.

### 2. Admin control centre

The authenticated admin area is used to manage agency operations and content, including:

- leads
- clients
- projects
- services
- resources
- testimonials
- team
- agency settings
- diagnostics
- Revenue OS
- playbooks
- admin users and roles

## Tech stack

- **Framework:** TanStack Start
- **Routing:** TanStack Router file-based routing
- **UI:** React 19 + Radix UI + Tailwind CSS v4
- **Data fetching/state:** TanStack React Query
- **Backend/data:** Supabase
- **Validation:** Zod
- **Animation:** GSAP
- **Build tooling:** Vite

## Project structure

```text
src/
  components/
    admin/              Reusable admin management UI
    site/               Public website layout and marketing components
    ui/                 Shared UI primitives
  integrations/
    lovable/            Lovable auth integration
    supabase/           Supabase clients, middleware, generated types
  lib/
    *.functions.ts      Server functions
    revenue-os.ts       Revenue planning models and seed content
    domain-portfolio.ts Domain portfolio metadata
    agency-content.ts   Shared content/config for public pages
    error-*.ts          Error handling helpers
  routes/
    __root.tsx          Root application shell
    index.tsx           Home page
    auth.tsx            Authentication route
    about.tsx           Public about page
    services*.tsx       Public services pages
    _authenticated/     Admin routes and dashboards
  router.tsx            Router setup
  server.ts             Server entry
  start.ts              TanStack Start bootstrap
  styles.css            Global styles and design tokens

supabase/
  config.toml           Supabase project config
  migrations/           Database schema and RLS policies

docs/
  overall-plan.md       Product and operating direction
  design.md             Design system and animation rules
  brand-pack.md         Brand guidance
  slack-integration.md  Slack alert behavior
  simple-runbooks.md    Cross-agent runbooks for daily execution
```

## How it works

### Routing

The app uses TanStack Start with file-based routing. Route files live in `src/routes`, and authenticated admin routes live under `src/routes/_authenticated`.

### Authentication

Authentication is handled with Supabase. The app includes:

- client-side Supabase session handling
- middleware to attach auth tokens to server function requests
- server-side auth validation for protected operations
- role-based access using a `user_roles` table and Supabase RLS policies

### Data model

Supabase stores operational and CMS-style data including:

- `leads`
- `clients`
- `projects`
- `cms_services`
- `cms_resources`
- `cms_testimonials`
- `team_members`
- `agency_settings`
- `user_roles`

The `supabase/migrations` directory defines schema changes, policies, triggers, bootstrap logic, and security updates.

### Server functions

Important server-side workflows are implemented in `src/lib/*.functions.ts`, including:

- lead intake
- admin user management
- domain enquiry and portfolio operations

These functions use validated input and server-side Supabase access where privileged operations are required.

## Deploying to Cloudflare Workers

The canonical deployment is the GitHub Actions workflow in
`.github/workflows/deploy.yml`. A push to `main` runs `npm ci`, `npm run build`,
and `npm test`, then deploys the generated Nitro Worker from `.output/server`
with Wrangler. The workflow requires the GitHub Actions secrets
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`; without the API token, the
workflow warns and skips deployment. Check the workflow run to confirm whether
a deployment actually occurred. A push to `main` can deploy to production, so
follow the repository's release-approval process.

Configure Worker runtime variables and secrets in Cloudflare. See `.env.example`
for variable names and `wrangler.json` for the checked-in Worker configuration.
`vercel.json` is not used by the canonical deployment workflow and is not
deployment guidance for this repository.

## Local development

Copy `.env.example` to the ignored `.env.local` file. For admin sign-in, set
`VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`, then set `SUPABASE_URL`
and `SUPABASE_PUBLISHABLE_KEY` to the same backend values for server functions.
Use only the isolated backend intended for the task; consult `AGENTS.md` and
the latest handover for target guidance. The reference in
`supabase/config.toml` may be stale, so verify the target before using the CLI.
Restart the dev server after changing environment values.

`SUPABASE_SERVICE_ROLE_KEY` is only needed for privileged server workflows, not
browser sign-in. Never put it in a `VITE_*` variable. Local server environment
values are loaded by the development server; deployed server values must still
be configured in the hosting platform.

Install the exact dependencies recorded by the lockfile:

```bash
npm ci
```

Start the dev server:

```bash
npm run dev
```

Build the app:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run the checks used by CI. Build before tests because the platform smoke checks
inspect generated output:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
npm test
```

## Environment variables

Use `.env.example` as the complete variable-name reference. Browser sign-in
uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`; server functions
use `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. `SUPABASE_SERVICE_ROLE_KEY`
is only needed for privileged server workflows and must never use a `VITE_`
prefix. Configure deployed values in Cloudflare, not in the client bundle.

## Notable current capabilities

Based on the current codebase, the platform includes:

- public lead capture with server-side persistence
- optional Slack notifications for new leads
- authenticated admin CRUD flows backed by Supabase
- admin user and role management
- enquiry-led domain portfolio support with guide pricing and transfer operations
- internal Revenue OS planning and prioritisation models
- diagnostics and operational playbook concepts integrated into the admin experience
- custom SSR/runtime error handling for better failure recovery

## Documentation notes

The `docs/` folder contains the product, brand, and operating context behind the app. Start with:

- `docs/overall-plan.md`
- `docs/design.md`
- `docs/brand-pack.md`
- `docs/simple-runbooks.md`

## Good next questions

- How do authenticated admin routes work in this repo?
- How does lead capture flow from the public site into Supabase and Slack?
- What tables and RLS rules are defined in the Supabase migrations?
- Which routes are public vs admin-only?
