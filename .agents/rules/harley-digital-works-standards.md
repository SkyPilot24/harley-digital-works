---
title: Harley Digital Works Technical & Brand Guidelines
trigger: always_on
---

# Harley Digital Works Development & Brand Standards

1. **Brand Identity & Aesthetic Sweet Spot ("British Industrial Craftsmanship")**:
   - Company: Harley Digital Works (A division of The Harley Group Ltd).
   - Core Audience: UK Trade Contractors (Electricians, Gas Safe Engineers, Roofers, Commercial Facilities).
   - Creative Positioning: High-end, solid, precision-engineered design (inspired by DeWalt, Festool, JCB, Aston Martin)—NOT an aloof, jargon-heavy "Shoreditch web agency". Avoid pastel pinks/purples, abstract squiggles, and tech clichés.
   - Core Palette: Midnight Navy (`#081B30`), Warm Ivory (`#F6F3ED`), Steel Blue (`#173C62`), Slate (`#526479`), and functional Emerald (`#059669`) for WhatsApp and active statuses.
   - Typography System:
     - Headings/Display: Sturdy geometric sans (`Manrope` / `Plus Jakarta Sans`) with tight tracking. Avoid default unstyled Arial.
     - Body Text: Clean, legible sans (`Inter` / system UI) optimised for mobile.
     - Technical/Pricing Data: Monospace (`DM Mono`) for price breakdowns, packages, and technical specifications.
   - Core USP: *"We take the website headache away. 100% done-for-you copywriting, zero homework, zero tech jargon, and total peace of mind."*

2. **Ratified Commercial Offer & Pricing Boundaries**:
   - Standard Managed Package: £1,495 setup + £249/month ongoing care.
   - Payment Terms: 50% deposit (£747.50) on agreement / 50% (£747.50) only upon final preview approval.
   - VAT: Zero VAT (The Harley Group is not currently VAT registered; never quote "+ VAT").
   - Delivery Commitment: Agreed delivery schedule (do not promise guaranteed 14-day turnarounds).
   - Capacity Limit: Strictly maximum 2 concurrent active builds.

3. **Tech Stack & Architecture**:
   - Framework: TanStack Router + TanStack Start + Nitro SSR (`cloudflare-module` preset).
   - Styling: Tailwind CSS + Lucide Icons + Framer Motion.
   - Data Layer: Supabase JS Client (`@/integrations/supabase/client`).
   - Type Safety: Full TypeScript compilation with 0 TS errors required on every commit.

4. **Key Routes & URLs**:
   - Home: `/`
   - Live Trade Demos: `/demos`
   - Regional Hubs: `/locations` & `/locations/$slug`
   - Website Audit: `/audit`
   - Client Milestone Tracker: `/track` & `/track/$token`
   - Trade ROI Calculator: `/calculator`
   - Admin CRM & Workspace: `/admin/leads`, `/admin/clients`, `/admin/playbooks`

5. **Execution & Environment Guardrails**:
   - Production Database DDL: Execute via `npx supabase db query --linked --project-ref worzpzbutngugwzhlvtj` (Management API). Always capture pre-change snapshot first.
   - Local Browser Verification: When headless Playwright driver downloads are restricted in sandboxed environments, run the dev server (`npm run dev`) and launch Windows native Chrome (`Start-Process chrome.exe "http://localhost:8080/"`) to present the live application.

6. **Founder Operating Standard (Robbie Harley)**:
   - Robbie is the business founder and CEO, NOT a software developer.
   - Speak plain English, explain simply and clearly ("talk to me like I'm 5, that's fine, I'm learning"). Avoid tech jargon.
   - Make development and technical decisions autonomously. Only consult Robbie for high-level commercial decisions, pricing, go-live release gates, or major brand direction.
   - Always translate technical work into real-world business value (cash, customer trust, time saved, and booked trade jobs).


