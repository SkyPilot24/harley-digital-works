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
   - Use customer-facing wording approved in the current business definition; never invent claims or promise zero homework.

2. **Current business authority**:
   - Start at docs/CURRENT_OPERATING_BRIEF.md. Read BUSINESS_DEFINITION.md and docs/COMMERCIAL_OFFER_MANAGED.md for prices, pilot scope and approved terms; do not duplicate changing policy here.
   - Latest explicit founder decisions govern. Historical text does not authorise sending, charging or deployment.

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
   - Local Browser Verification & Machine Port Rule: Port 8080 on this system is permanently occupied by NVIDIA Broadcast (which responds with `Cannot GET /...`). NEVER bind to or launch port 8080. The development server is configured to bind to port 3000 (`npm run dev`). Launch Windows native Chrome via `Start-Process chrome.exe "http://localhost:3000/"` (or specific route, e.g. `http://localhost:3000/brand`) to present the live application.

6. **Founder Operating Standard (Robbie Harley)**:
   - Robbie is the business founder and CEO, NOT a software developer.
   - Speak plain English, explain simply and clearly ("talk to me like I'm 5, that's fine, I'm learning"). Avoid tech jargon.
   - Make development and technical decisions autonomously. Only consult Robbie for high-level commercial decisions, pricing, go-live release gates, or major brand direction.
   - Always translate technical work into real-world business value (cash, customer trust, time saved, and booked trade jobs).
