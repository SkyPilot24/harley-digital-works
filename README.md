# THG Digital

THG Digital is a TanStack Start + Supabase platform for running both the public THG Digital website and the internal admin control centre.

It combines:

- a public marketing site for THG Digital services
- lead capture and contact workflows
- an authenticated admin area for content, operations, and delivery
- Supabase-backed data models for leads, clients, projects, services, team, and operational planning
- internal operating tools such as Revenue OS, diagnostics, and playbooks

## What this app does

This repo supports two main surfaces:

### 1. Public website

The public site presents THG Digital’s offer, pages such as `/about`, `/services`, `/domains`, `/resources`, and `/contact`, and a high-design landing experience with scroll-driven animation.

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

## Deploying to Vercel

This project is configured to deploy to Vercel via the included `vercel.json`.

### Steps

1. Push this repository to GitHub (or connect it in the Vercel dashboard).
2. Import the project in [vercel.com/new](https://vercel.com/new).
3. Vercel will pick up `vercel.json` automatically — no framework override is needed.
4. Add the required environment variables in the Vercel project settings (see [Required environment variables](#required-environment-variables) below).
5. Deploy.

| `LEAD_RATE_LIMIT_SECRET` | _(Recommended)_ Server-only HMAC secret for lead rate-limit fingerprints; falls back to the service-role key if omitted |
The build uses the nitro **vercel** preset (`NITRO_PRESET=vercel`), which generates a `.vercel/output` directory following Vercel's Build Output API v3. Static assets are served from the CDN and SSR is handled by a serverless function.

### Required environment variables (Vercel project settings)

| Variable                        | Description                                          |
| ------------------------------- | ---------------------------------------------------- |
| `VITE_SUPABASE_URL`             | Supabase project URL (public)                        |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/public key (public)                    |
| `SUPABASE_URL`                  | Supabase project URL (server-side)                   |
| `SUPABASE_PUBLISHABLE_KEY`      | Supabase anon key (server-side)                      |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase service role key (server-side, keep secret) |
| `SLACK_WEBHOOK_URL`             | _(Optional)_ Slack incoming webhook for lead alerts  |

## Local development

Install dependencies:

```bash
npm install
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

Lint and format:

```bash
npm run lint
npm run format
```

LEAD_RATE_LIMIT_SECRET=

## Required environment variables

These are required for the app to function correctly:

```bash
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Optional integrations:

```bash
SLACK_WEBHOOK_URL=
```

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
