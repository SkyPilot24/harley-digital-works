---
title: Harley Digital Works Technical & Brand Guidelines
trigger: always_on
---

# Harley Digital Works Development & Brand Standards

1. **Brand Identity**:
   - Company: Harley Digital Works (A division of The Harley Group Ltd).
   - Core Audience: UK Trade Contractors (Electricians, Gas Safe Engineers, Roofers, Builders, Commercial Facilities).
   - Core Offer Structure: Setup fee plus ongoing monthly digital care (Pricing, SLAs, and commercial scope subject to explicit founder approval; see BUSINESS_DEFINITION.md).

2. **Tech Stack & Architecture**:
   - Framework: TanStack Router + TanStack Start + Nitro SSR (`cloudflare-module` preset).
   - Styling: Tailwind CSS + Lucide Icons + Framer Motion.
   - Data Layer: Supabase JS Client (`@/integrations/supabase/client`).
   - Type Safety: Full TypeScript compilation with 0 TS errors required on every commit.

3. **Key Routes & URLs**:
   - Home: `/`
   - Live Trade Demos: `/demos`
   - Regional Hubs: `/locations` & `/locations/$slug`
   - Website Audit: `/audit`
   - Client Milestone Tracker: `/track` & `/track/$token`
   - Trade ROI Calculator: `/calculator`
   - Admin CRM & Workspace: `/admin/leads`, `/admin/clients`, `/admin/playbooks`
