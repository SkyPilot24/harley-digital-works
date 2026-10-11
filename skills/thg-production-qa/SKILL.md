---
name: thg-production-qa
description: >-
  Evidence-based production-readiness QA for The Harley Group, Harley Digital Works
  and associated websites and SaaS products. Use for final QA, pre-launch reviews,
  deployment-readiness audits and client handover checks after meaningful implementation.
  Covers build integrity, user and conversion journeys, responsive design, accessibility,
  SEO, performance, authorization, integrations and deployment requirements.
metadata:
  priority: "1"
  owner: "The Harley Group"
  business_unit: "Harley Digital Works"
  version: "1.0"
  purpose: "production-gate"
---

# THG Production QA

## Mission

Act as the final production-quality gate for software delivered by:

- The Harley Group
- Harley Digital Works
- Harley Labs
- ContentFlow AI
- associated client projects

Your job is not simply to confirm that the application builds.

Your job is to establish, using evidence, whether the project is genuinely suitable for:

1. production deployment;
2. customer use;
3. client handover; or
4. further controlled testing.

Treat quality assurance as an engineering task.

Never declare a project production-ready solely because:

- the build succeeds;
- the homepage renders;
- there are no TypeScript errors;
- one happy-path flow works;
- the development server starts.

Production readiness requires evidence across the complete relevant user journey.

---

# Operating Principles

## 1. Verify, do not assume

Never infer that something works merely because the implementation looks correct.

Where tooling and environment access permit:

- run it;
- inspect it;
- exercise it;
- verify the result.

Prefer observed behaviour over code inspection alone.

---

## 2. Do not damage a working project

Before making QA-related fixes:

1. inspect repository instructions;
2. inspect `README`, `AGENTS.md` and project documentation;
3. check the current Git branch;
4. check `git status`;
5. identify unrelated uncommitted work;
6. preserve existing working behaviour.

Never:

- reset unrelated changes;
- delete user work;
- rewrite architecture unnecessarily;
- remove tests to obtain a passing result;
- disable linting rules merely to pass QA;
- weaken security to make an application work;
- expose secrets;
- commit `.env` credentials.

---

## 3. Fix what is safe to fix

If a clear defect is found and the requested task permits implementation:

- identify the root cause;
- make the smallest safe correction;
- re-run the failed check;
- verify no regression was introduced.

For substantial architectural, database, security or destructive changes:

- stop;
- document the issue;
- explain the recommended fix;
- identify the risk;
- request confirmation where appropriate.

---

# QA Severity Model

Classify every issue using the following levels.

## P0 — Release blocker

Examples:

- authentication bypass;
- exposed sensitive information;
- broken production build;
- destructive database behaviour;
- payment corruption;
- privilege escalation;
- critical customer journey completely unusable.

Production status:

**DO NOT RELEASE**

---

## P1 — Critical

Examples:

- primary enquiry form fails;
- checkout cannot complete;
- login is broken;
- admin users cannot administer the application;
- mobile navigation is unusable;
- significant RLS or authorization defect;
- major accessibility barrier preventing use.

Production status:

**Release blocked until resolved**

---

## P2 — Major

Examples:

- important secondary workflow broken;
- significant responsive-layout defect;
- incorrect metadata across important pages;
- material performance regression;
- significant keyboard accessibility problem;
- prominent broken internal link.

Production status:

**Normally fix before release**

---

## P3 — Minor

Examples:

- visual inconsistency;
- minor spacing defect;
- non-critical console warning;
- small metadata improvement;
- minor copy problem.

Production status:

**May release with documented backlog item**

---

## P4 — Improvement

Examples:

- optimisation opportunity;
- future automation;
- refactor;
- enhanced monitoring;
- non-essential UX polish.

Production status:

**Does not block release**

---

# QA Workflow

Run the following stages in order.

Do not jump directly to visual testing.

---

# Stage 0 — Understand the project

Before testing:

1. determine application type;
2. determine framework;
3. determine package manager;
4. determine hosting/deployment platform;
5. identify database and authentication provider;
6. identify external integrations;
7. identify primary user journeys;
8. identify administrative journeys;
9. identify commercial conversion journeys;
10. identify project-specific acceptance criteria.

Look for:

- `package.json`
- project README
- `AGENTS.md`
- environment example files
- schema files
- Supabase migrations
- CI configuration
- deployment configuration
- test directories

Record the project architecture briefly.

---

# Stage 1 — Repository integrity

Inspect:

- current branch;
- Git status;
- merge conflict markers;
- accidentally committed secrets;
- `.env` files;
- TODO/FIXME markers in critical paths;
- dead or duplicate files where obvious;
- inappropriate debug code;
- temporary mocks;
- placeholder content.

Search for likely production artefacts including:

- `console.log`
- `debugger`
- `TODO`
- `FIXME`
- `localhost`
- test credentials
- placeholder domains
- fake email addresses
- sample API keys
- temporary feature flags

Do not blindly remove findings.

Classify each finding first.

---

# Stage 2 — Dependency and package integrity

Identify the existing package manager.

Do not switch package managers.

Check:

- lockfile present;
- lockfile consistent;
- dependency installation succeeds;
- required dependencies resolve;
- scripts referenced by CI exist;
- major dependency warnings are understood;
- unused or duplicate dependencies where materially relevant.

Do not perform unsolicited major-version upgrades during QA.

---

# Stage 3 — Static validation

Run available project checks.

Preferred sequence:

1. formatting validation;
2. linting;
3. TypeScript/type checking;
4. unit tests;
5. integration tests;
6. production build.

Typical commands may include:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run test:integration
npm run build
```

Use the project's actual scripts rather than inventing commands.

For each command record:

- command;
- pass/fail;
- exit status;
- relevant error;
- whether error existed before this work if known.

Never hide or suppress failures merely to obtain green output.

---

# Stage 4 — Development/runtime verification

Start the application using the project's existing development or preview workflow.

Verify:

- server starts;
- expected route responds;
- page contains meaningful content;
- no framework error overlay;
- no fatal runtime exception;
- assets load;
- fonts load;
- API requests are not unexpectedly failing.

Where browser automation is available, use it.

Capture evidence for failures.

---

# Stage 5 — Browser and visual QA

Test representative routes.

At minimum inspect:

- homepage;
- main service/product page;
- contact/conversion page;
- authentication pages where applicable;
- dashboard/admin area where applicable;
- at least one error or empty state where practical.

Check:

- no blank screens;
- no clipping;
- no overlapping text;
- no unexpected horizontal scrolling;
- navigation works;
- buttons work;
- modals/drawers work;
- interactive controls remain usable;
- loading states complete;
- error states are understandable.

Do not rely solely on screenshots.

Exercise the interactions.

---

# Stage 6 — Responsive QA

Test at representative widths.

Default target widths:

- 375px — mobile;
- 768px — tablet;
- 1024px — laptop/tablet landscape;
- 1440px — desktop.

Also inspect an appropriate wider desktop breakpoint where useful.

Check each relevant breakpoint for:

- navigation;
- hero content;
- headings;
- buttons;
- cards;
- tables;
- forms;
- modals;
- images;
- video;
- footers;
- dashboards;
- data tables;
- empty states.

Fail the test if important content becomes:

- clipped;
- unreadable;
- inaccessible;
- overlapped;
- horizontally off-screen.

---

# Stage 7 — Accessibility QA

Target:

**WCAG 2.2 AA**

Verify where relevant:

## Keyboard

- all interactive elements reachable;
- visible focus state;
- logical focus order;
- no keyboard traps;
- modal focus handled correctly.

## Semantics

- one logical page H1;
- sensible heading hierarchy;
- landmarks used appropriately;
- buttons are buttons;
- links are links;
- interactive elements have accessible names.

## Forms

- visible or programmatically associated labels;
- required fields identified;
- errors communicated clearly;
- validation does not depend only on colour;
- focus moves appropriately after errors where required.

## Visual

- adequate colour contrast;
- readable typography;
- focus indicators visible;
- touch targets appropriately sized.

## Motion

Respect reduced-motion preferences where animation exists.

## Media

Verify meaningful images have appropriate alternatives.

Decorative imagery should not create unnecessary screen-reader noise.

Record accessibility blockers separately from aesthetic observations.

---

# Stage 8 — Forms and conversion flows

For every commercially important form:

Test:

1. valid submission;
2. required-field validation;
3. invalid email/data;
4. server error where practical;
5. duplicate submission behaviour;
6. success state;
7. confirmation message;
8. resulting data destination;
9. notification behaviour;
10. analytics event if implemented.

Relevant forms may include:

- enquiry form;
- consultation request;
- newsletter;
- lead magnet;
- waiting list;
- sign-up;
- login;
- password reset;
- checkout;
- support form.

Never submit real customer data during testing.

Use clearly labelled test data.

---

# Stage 9 — Authentication and authorization

Where authentication exists, test all relevant roles.

Examples:

- anonymous visitor;
- authenticated user;
- client;
- staff member;
- administrator.

Verify:

- login;
- logout;
- registration if enabled;
- password reset;
- session handling;
- protected routes;
- unauthorized redirects;
- administrative routes;
- privilege boundaries.

Do not merely hide unauthorized UI.

Confirm server/database authorization actually prevents access.

---

# Stage 10 — Supabase and database QA

If Supabase/PostgreSQL is present:

Inspect:

- migrations;
- schema consistency;
- foreign keys;
- constraints;
- indexes where relevant;
- RLS;
- role permissions;
- SQL functions;
- security-definer functions;
- database writes;
- service-role usage.

For each sensitive table:

Verify the expected behaviour of:

- anonymous users;
- authenticated users;
- owners;
- administrators.

Pay particular attention to:

- recursive RLS policies;
- unrestricted `anon` access;
- client exposure of service-role credentials;
- overly broad grants;
- insecure `SECURITY DEFINER`;
- unsafe `search_path`;
- bypassing RLS unintentionally.

Never fix an authorization problem by disabling RLS.

Never expose service-role credentials in browser code.

---

# Stage 11 — API and integration QA

Identify critical integrations.

Examples:

- Stripe;
- Resend;
- HubSpot;
- Google services;
- external APIs;
- webhooks;
- analytics;
- Supabase Edge Functions.

Verify where practical:

- expected request succeeds;
- failure is handled;
- timeout does not leave UI permanently loading;
- secrets remain server-side;
- webhook signatures are validated;
- retries do not create duplicate records;
- external service errors do not expose sensitive data.

Use test/sandbox environments.

Never initiate unintended live transactions.

---

# Stage 12 — Stripe and commercial-flow QA

When Stripe is present:

Use test mode.

Verify:

- correct product;
- correct price;
- correct currency;
- checkout opens;
- successful payment flow;
- cancellation flow;
- webhook processing;
- subscription state update;
- duplicate-event handling;
- customer portal where implemented;
- failed-payment handling where implemented.

Verify that client-visible entitlements match authoritative server-side subscription state.

Never use production cards during QA.

---

# Stage 13 — SEO QA

For every important public page verify:

- unique title;
- sensible meta description;
- canonical URL;
- indexability intention;
- heading hierarchy;
- internal links;
- image alt text;
- Open Graph metadata where appropriate.

Site-wide verify:

- `robots.txt`;
- XML sitemap;
- canonical host;
- HTTPS assumptions;
- broken internal links;
- no accidental `noindex`;
- no staging URL referenced publicly.

Where applicable inspect structured data:

- Organization;
- LocalBusiness/ProfessionalService;
- Service;
- Breadcrumb;
- FAQ;
- SoftwareApplication.

Do not add schema for facts that are not genuinely present.

Never fabricate:

- reviews;
- aggregate ratings;
- prices;
- customer counts;
- awards.

---

# Stage 14 — Content integrity

Review prominent content for:

- placeholder text;
- lorem ipsum;
- fake testimonials;
- unsupported claims;
- fictional customer numbers;
- broken phone numbers;
- incorrect email addresses;
- wrong domains;
- old branding;
- dead CTAs;
- unfinished "coming soon" content represented as live.

For Harley Digital Works projects, customer-facing content must feel:

- human;
- premium;
- credible;
- concise;
- outcome-focused;
- professionally designed.

Do not allow the site to appear obviously AI-generated.

---

# Stage 15 — Performance QA

Inspect:

- initial load;
- layout stability;
- large images;
- uncompressed media;
- JavaScript weight;
- unnecessary client components;
- render-blocking resources;
- fonts;
- third-party scripts;
- lazy loading;
- route-level loading behaviour.

For Next.js/React projects specifically look for:

- unnecessary client rendering;
- request waterfalls;
- overly large client bundles;
- duplicated data fetching;
- excessive hydration;
- avoidable re-renders.

Use measurable evidence where available rather than subjective statements.

---

# Stage 16 — Security QA

Check obvious high-risk areas.

## Secrets

Confirm no:

- API secrets;
- private keys;
- service-role credentials;
- passwords;
- access tokens

are committed or exposed client-side.

## Input

Review:

- input validation;
- SQL/database interaction;
- file uploads;
- user-generated HTML;
- redirect parameters;
- URL handling.

## Authentication

Review:

- authorization boundaries;
- administrative actions;
- server actions/API routes;
- sensitive database operations.

## Browser security

Where relevant verify:

- HTTPS assumptions;
- cookie configuration;
- CSP/security headers;
- CORS scope;
- iframe policy.

Do not describe a superficial review as a penetration test.

State the limitations of the inspection.

---

# Stage 17 — Error handling and resilience

Exercise important failure scenarios where practical.

Verify:

- network failure;
- API failure;
- authentication expiry;
- empty data;
- missing record;
- unauthorized access;
- invalid route;
- form error.

The application should not:

- hang indefinitely;
- show a blank screen;
- leak stack traces;
- expose secret values;
- leave users without a recovery action.

---

# Stage 18 — Analytics and observability

Where implemented verify:

- analytics initialises;
- page views are sensible;
- critical conversion events exist;
- duplicate events are not obvious;
- consent rules are respected;
- sensitive information is not sent to analytics.

Recommended commercial events may include:

- enquiry submitted;
- consultation requested;
- lead magnet downloaded;
- pricing CTA selected;
- checkout started;
- checkout completed;
- ContentFlow signup;
- client login.

Also inspect whether production errors can be observed through the existing logging/monitoring platform.

Do not add a new observability vendor during routine QA unless requested.

---

# Stage 19 — Deployment readiness

Inspect:

- production build;
- environment variables;
- production/staging separation;
- domains;
- DNS requirements;
- callback URLs;
- authentication redirects;
- webhook URLs;
- canonical URL;
- SMTP/email configuration;
- database migrations;
- deployment configuration.

Identify every manual action needed outside the repository.

Do not claim these actions have been completed unless verified.

---

# Stage 20 — Regression check

After fixing defects:

Re-run:

- affected tests;
- lint/type checks;
- production build;
- affected browser journey;
- relevant responsive breakpoint;
- related authorization checks.

Do not assume a local fix did not affect another flow.

---

# THG Commercial QA Layer

For Harley Digital Works projects, also assess whether the implementation supports the business outcome.

Verify:

- visitor can understand the offer quickly;
- primary CTA is obvious;
- no major page is a dead end;
- contact journey works;
- enquiry is captured successfully;
- recurring-support opportunity is visible where appropriate;
- analytics can measure conversion;
- design quality supports premium positioning.

Do not reduce QA to purely technical correctness.

The site is a commercial product.

---

# Production Gate

At completion assign exactly one status:

## GREEN — Production Ready

Use only when:

- no unresolved P0/P1 issues;
- no unresolved material P2 issue that compromises launch;
- production build passes;
- primary user journey works;
- primary conversion journey works;
- security review has no known release blocker;
- relevant accessibility checks pass;
- relevant responsive checks pass;
- deployment requirements are known.

---

## AMBER — Conditionally Ready

Use only when no P0/P1 issues remain, safe operation of critical journeys has been verified, and remaining P2/P3 risks are documented with an owner and remediation plan. Do not use AMBER to conceal missing evidence for critical journeys.

## RED — Not Ready

Use when a P0/P1 issue or a material launch-compromising P2 remains, or when build, primary journeys, authorization or other critical checks lack sufficient evidence. Distinguish a demonstrated defect from an unverified release gate. Missing access is not evidence of a defect.

A QA verdict does not authorize deployment.

# Evidence and reporting contract

For every applicable stage record PASS, FAIL, BLOCKED, NOT RUN or NOT APPLICABLE, with evidence and a reason for anything not completed. Code inspection is not a runtime pass. Automated accessibility checks alone do not establish WCAG conformance. Local performance measurements do not establish production field Core Web Vitals.

Deliver:

1. Exactly one production-gate status, with a short rationale.
2. Project, branch/commit if available, environment, audit scope and date.
3. Checks performed: command or journey, result, exit code where applicable, evidence location, and baseline status if known.
4. Findings sorted P0–P4: affected route/file and line where known, reproduction, expected versus observed behaviour, customer/business impact, recommended correction, and release impact.
5. Changes made and regression evidence, or confirmation that the audit made no application changes.
6. Blocked/unverified checks, external/manual requirements and the precise access or environment needed.
7. Recommended next actions (priorities 1–3), estimated effort, expected business impact, risks, quick win and longer-term opportunity where useful.

If no application repository is available, stop application execution, explain the discovery scope, and report the audit as NOT RUN. Do not assign an application readiness colour to an unidentified project.

# Execution boundaries

Choose audit-only or audit-and-fix from the user's request. An audit request alone does not authorize application changes. Existing user authorization remains valid; do not create unnecessary approval steps.

Inspect package scripts and hooks before executing them. Avoid scripts that deploy, reset data, run production migrations or contact real customers. Use the existing package manager and frozen-lockfile installation when installation is necessary and safe; record unavailable dependencies as blocked. Do not install tools or change lockfiles solely to manufacture a passing result.

Use isolated local or explicitly authorized sandbox accounts and test data for writes. Verify that the environment is actually a sandbox before sending emails, CRM writes, webhook events or payment requests. Test labels alone do not make live actions safe. Never deploy, change DNS, run production migrations, send messages, or conduct destructive tests as an implicit part of QA.

Redact credentials, personal data and session tokens from reports, screenshots and logs. Record only the location and type of a suspected secret. Do not print secret values.

Stop only processes started for this audit. Preserve user changes and read-only reference material. Run the full applicable verification once, then repeat failed/affected checks after fixes; expand only for new evidence or unresolved risk.

For host adaptation only, see [original trigger hints](references/original-trigger-hints.md). The Markdown workflow is portable; validate discovery and tool availability in the target host.
