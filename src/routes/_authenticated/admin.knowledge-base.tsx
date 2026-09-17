import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "./admin.index";
import {
  BookOpen,
  Search,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  Sparkles,
  Zap,
  FileText,
  Users,
  ShieldCheck,
  Globe,
  MessageSquare,
  Building2,
  Cpu,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/knowledge-base")({
  component: KnowledgeBasePage,
});

export type GuideCategory =
  | "all"
  | "sales"
  | "onboarding"
  | "care"
  | "tools"
  | "partners"
  | "tech"
  | "group";

export interface KnowledgeArticle {
  id: string;
  category: GuideCategory;
  title: string;
  summary: string;
  badge: string;
  readTime: string;
  quickAction?: { label: string; to: string };
  steps: {
    title: string;
    description: string;
    tips?: string[];
  }[];
  faq?: { q: string; a: string }[];
}

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: "proposals-closing",
    category: "sales",
    title: "How to Issue Interactive Client Proposals & Close Deals",
    summary:
      "Step-by-step procedure for generating bespoke trade proposals, configuring add-ons, and securing 50% upfront deposits via the Interactive Proposal Desk.",
    badge: "Commercial Workflow",
    readTime: "3 min read",
    quickAction: { label: "Open Proposal Desk", to: "/proposals" },
    steps: [
      {
        title: "1. Gather Client Trade & Scope Requirements",
        description:
          "Open the Inbound Leads desk (/admin/leads). Review the prospective contractor's trade sector, target geography, existing website URL, and primary pain points (e.g. no Google presence, low-ticket boiler quotes).",
        tips: [
          "Check whether the client is a sole trader (£1,495 Launch Plan) or multi-van fleet (£2,995 Growth Plan).",
          "Identify if they need local SEO dominance or automated review capture as add-on modules.",
        ],
      },
      {
        title: "2. Generate Bespoke Proposal URL",
        description:
          "Navigate to /proposals. Configure the client's business name, trade category, selected package, and recommended add-ons (Care Plan Plus, Map-Pack Booster, Review Engine).",
        tips: [
          "Copy the unique client link and send via WhatsApp or email alongside a personalized 60-second voice note.",
        ],
      },
      {
        title: "3. Digital Sign-Off & Deposit Intake",
        description:
          "When the client reviews the interactive proposal and taps 'Accept & Sign', an automatic confirmation is dispatched. Collect the 50% deposit via bank transfer / Stripe to lock their 14-day build slot.",
      },
    ],
    faq: [
      {
        q: "Can clients customize their add-on modules on the live proposal?",
        a: "Yes! The interactive proposal allows clients to toggle modules dynamically and see real-time price adjustments before signing.",
      },
    ],
  },
  {
    id: "fourteen-day-delivery",
    category: "onboarding",
    title: "14-Day Delivery SLA: From Intake to Live Launch",
    summary:
      "The standardized operating protocol to execute a 100% done-for-you website launch in exactly 14 days without client homework.",
    badge: "Core Operations",
    readTime: "4 min read",
    quickAction: { label: "View Build Tracker", to: "/track" },
    steps: [
      {
        title: "Day 1-2: Fast-Track Client Intake & Token Generation",
        description:
          "Client completes the 3-minute Onboarding Form (/onboarding). The system generates a dedicated tracking token (e.g., HDW-4921) and registers their project in /admin/projects.",
        tips: ["Verify domain DNS access or initiate domain registration via Domain OS."],
      },
      {
        title: "Day 3-5: Technical Copywriting & Wireframe Generation",
        description:
          "Generate high-converting trade sales copy using ContentFlow AI, calibrated to their specific accreditations (Gas Safe, NICEIC, FMB, CHAS).",
      },
      {
        title: "Day 6-9: High-Speed Web Build & Mobile Optimization",
        description:
          "Assemble responsive pages, interactive quote calculators, review booster widgets, and Google Map Pack schema.",
      },
      {
        title: "Day 10-12: Client 1-Click Review & Revisions",
        description:
          "Issue staging preview link. Execute any minor copy or photo adjustments within 24 hours.",
      },
      {
        title: "Day 13-14: DNS Switch, SSL & Google Search Console Verification",
        description:
          "Point A-records to Cloudflare edge isolates, verify SSL certs, submit sitemap to Google Search Console, and issue the final launch certificate.",
      },
    ],
  },
  {
    id: "care-desk-updates",
    category: "care",
    title: "Managing the £95/mo Care Desk & 1-Tap Client Requests",
    summary:
      "How to fulfill incoming client updates, maintenance tasks, automated weekly backups, and security patching.",
    badge: "Client Retention",
    readTime: "3 min read",
    quickAction: { label: "Open Care Desk", to: "/care-desk" },
    steps: [
      {
        title: "1. Monitor Care Desk Queue",
        description:
          "Incoming client requests submitted via /care-desk appear with priority badges (Urgent, Standard, Content Update).",
      },
      {
        title: "2. 24-Hour Execution SLA",
        description:
          "Apply requested text changes, photo gallery uploads, team additions, or service price adjustments. Push to production with zero downtime.",
      },
      {
        title: "3. Automated Telemetry & Performance Reports",
        description:
          "Every month, dispatch the automated Google Core Web Vitals and security audit scorecard to the client.",
      },
    ],
  },
  {
    id: "partner-referral-program",
    category: "partners",
    title: "Trade Merchant & Accountant Referral Network Guide",
    summary:
      "Administering the £250 referral commission program for UK trade suppliers, electrical/plumbing wholesalers, and accountants.",
    badge: "Partner Channel",
    readTime: "3 min read",
    quickAction: { label: "View Partner Hub", to: "/partners" },
    steps: [
      {
        title: "1. Partner Recruitment & Wholesaler Outreach",
        description:
          "Connect with branch managers at electrical/plumbing merchants, trade tool suppliers, and construction accountants. Share the /partners portal.",
      },
      {
        title: "2. Issue Unique Partner Referral Code",
        description:
          "Assign custom partner tracking tokens. When their contractor members sign up for a Launch or Growth website, the referral is automatically attributed.",
      },
      {
        title: "3. Commission Payout Protocol",
        description:
          "Upon client project deposit confirmation, credit £250 to the partner's account via direct BACS transfer on the 1st of the following month.",
      },
    ],
  },
  {
    id: "local-seo-radar",
    category: "tools",
    title: "Operating the Local SEO Inspector & Google Review Booster",
    summary:
      "How to run free diagnostic audits for prospective contractors to demonstrate rank gaps and close sales.",
    badge: "Sales Engineering",
    readTime: "3 min read",
    quickAction: { label: "Local SEO Inspector", to: "/tools/seo-inspector" },
    steps: [
      {
        title: "1. Run Competitor Proximity Scan",
        description:
          "Enter prospect trade and town (e.g., 'Emergency Plumber Stockport') into /tools/seo-inspector to calculate Google Map Pack visibility score.",
      },
      {
        title: "2. Present Review Velocity Deficit",
        description:
          "Show how the Review Booster tool (/tools/review-booster) automates SMS review dispatch to capture 15-20 new 5-star Google reviews per month.",
      },
    ],
  },
  {
    id: "edge-ssr-tech-stack",
    category: "tech",
    title: "Technical Architecture: TanStack Start, Nitro & Edge Cloud",
    summary:
      "Comprehensive technical overview of the sub-50ms SSR edge stack, Cloudflare isolate compilation, and CI/CD pipelines.",
    badge: "Engineering Runbook",
    readTime: "5 min read",
    quickAction: { label: "System Diagnostics", to: "/admin/diagnostics" },
    steps: [
      {
        title: "1. Architecture Overview",
        description:
          "Built on TanStack Router + TanStack Start, bundled by Vite and served via Nitro with the 'cloudflare-module' preset for sub-30ms global TTFB.",
      },
      {
        title: "2. Verification Commands",
        description:
          "Run 'npm run typecheck' to verify zero TypeScript errors, followed by 'npm run build' to generate the Cloudflare worker bundle in .output/server/index.mjs.",
      },
    ],
  },
  {
    id: "trade-vertical-campaigns",
    category: "sales",
    title: "Managing Trade Sector Landing Hubs & Ad Campaigns",
    summary:
      "How to deploy and manage industry-specific landing pages for Gas Safe heating engineers, electrical contractors, and master builders.",
    badge: "Campaign Ops",
    readTime: "3 min read",
    quickAction: { label: "View Trade Hubs", to: "/trades" },
    steps: [
      {
        title: "1. Sector Alignment & Accreditation Verification",
        description:
          "Ensure the client's accreditation badges (Gas Safe, NICEIC, CHAS, FMB) are prominently displayed in the hero section.",
      },
      {
        title: "2. Dedicated Quote Calculator Integration",
        description:
          "Attach the appropriate trade calculator (Boiler Replacement, EV Charge Point, or Extension Estimator) to drive high conversion rates.",
      },
    ],
  },
  {
    id: "vat-invoicing-protocol",
    category: "group",
    title: "Generating & Issuing VAT Invoices & Receipts (The Harley Group Ltd)",
    summary:
      "Operating the HMRC-compliant 20% VAT invoice desk for 50% project deposits, completion balances, and £95/mo Care Plan billing.",
    badge: "Finance & Accounting",
    readTime: "3 min read",
    quickAction: { label: "Open Invoicing Desk", to: "/admin/invoices" },
    steps: [
      {
        title: "1. 1-Click Template Loading",
        description:
          "Open /admin/invoices. Select preset template: Launch Deposit (£747.50 ex-VAT), Growth Deposit (£1,497.50 ex-VAT), or Monthly Care (£95 ex-VAT).",
      },
      {
        title: "2. Client Details & Tax Computation",
        description:
          "Fill in customer business name and address. System automatically calculates 20% UK VAT (VAT Reg: GB 948 2018 39) and generates remittance details.",
      },
      {
        title: "3. Issue & Payment Reconciliation",
        description:
          "Click 'Print Official Tax Invoice' or save as PDF. Upon receipt of bank transfer, toggle 'PAID IN FULL' to issue the official VAT receipt.",
      },
    ],
  },
  {
    id: "regional-seo-expansion",
    category: "tools",
    title: "Expanding UK Regional SEO Hubs & Geo-Targeting",
    summary:
      "Managing the 25+ UK metropolitan trade hubs (/locations) and optimizing local Google search visibility for regional contractors.",
    badge: "SEO Strategy",
    readTime: "4 min read",
    quickAction: { label: "View Regional Hubs", to: "/locations" },
    steps: [
      {
        title: "1. Location Data Structure",
        description:
          "Each city hub in src/lib/location-data.ts contains verified local telephone codes, borough coverage lists, and localized trade case studies.",
      },
      {
        title: "2. Structured Schema Microdata",
        description:
          "Every /locations/$slug page outputs automated ProfessionalService Schema.org JSON-LD to power Google Map Pack rankings.",
      },
    ],
  },
  {
    id: "brand-assets-standards",
    category: "group",
    title: "Managing Group Brand Assets, Typography & Media Press Kit",
    summary:
      "Guidelines for utilizing official vector SVG logos, color tokens, and typography pairing standards for The Harley Group, Harley Digital Works, and Harley Labs.",
    badge: "Brand Identity",
    readTime: "3 min read",
    quickAction: { label: "View Brand Kit", to: "/brand" },
    steps: [
      {
        title: "1. Entity Identity Rules",
        description:
          "Harley Digital Works uses Harley Gold (#C89D3C) & Deep Charcoal; The Harley Group uses Emerald (#10B981) & Deep Forest; Harley Labs uses Cyber Indigo (#6366F1).",
      },
      {
        title: "2. Vector Asset Location",
        description:
          "All official SVGs are maintained in public/brand/approved/logos/ with both light and dark versions. Use BrandLogo component with entity='hdw'|'group'|'labs'.",
      },
    ],
  },
  {
    id: "automated-prospector-audit-engine",
    category: "sales",
    title: "Operating the Automated Prospector, Site Audit & 1-Click Outreach Engine",
    summary:
      "How to scan UK trade sectors by county, run algorithmic Core Web Vitals & revenue leak audits, and dispatch tailored WhatsApp/Email pitches.",
    badge: "Automation Radar",
    readTime: "4 min read",
    quickAction: { label: "Open Prospector Desk", to: "/admin/leads" },
    steps: [
      {
        title: "1. Select Target Trade Vertical & City Hub",
        description:
          "Open /admin/leads and switch to 'Automated Prospector & Audit Desk'. Filter by trade sector (e.g. Heating Engineers, Electricians, Builders) and UK location hub (e.g. Greater Manchester, West Midlands).",
        tips: [
          "Target trade businesses with Opportunity Scores > 85 for highest response rates.",
          "Check the estimated monthly lost revenue to anchor your pricing justification.",
        ],
      },
      {
        title: "2. Review Audit Vulnerabilities & Revenue Leak Analysis",
        description:
          "Review the automated audit panel detailing mobile page speed deficits, missing Gas Safe / NICEIC credentials in headers, missing local schema markup, and lack of interactive quote calculators.",
      },
      {
        title: "3. 1-Click Human-in-the-Loop Outreach Dispatch",
        description:
          "Select the preferred outreach channel (WhatsApp or Email). Review the auto-generated audit teardown message and click 'Dispatch via WhatsApp' or 'Launch Email Client' to initiate instant contact.",
        tips: [
          "Always verify the company director or contact name if available before hitting send.",
        ],
      },
      {
        title: "4. Push Prospect to Active CRM Pipeline",
        description:
          "Click 'Push to CRM Pipeline' to instantly convert the audited prospect into an inbound lead in the Supabase database with all audit notes preserved.",
      },
    ],
    faq: [
      {
        q: "Why is human-in-the-loop dispatch preferred over unmonitored cold email spam?",
        a: "Trade contractors heavily rely on WhatsApp and direct mobile contact. High-context, personalized audit messages approved by a human achieve 8x higher conversion and zero spam reputation penalties.",
      },
    ],
  },
  {
    id: "contentflow-trade-copy-factory",
    category: "onboarding",
    title: "Using ContentFlow AI to Generate 5-Page Technical Trade Copy Packs",
    summary:
      "Factory-speed generation of conversion-engineered, Gas Safe / NICEIC / FMB accredited website copy for trade clients in under 10 seconds.",
    badge: "AI Copywriting Factory",
    readTime: "4 min read",
    quickAction: { label: "Open ContentFlow Desk", to: "/admin/leads" },
    steps: [
      {
        title: "1. Configure Contractor Profile & Accreditations",
        description:
          "Open /admin/leads and toggle 'ContentFlow AI Copy Engine'. Enter the contractor's trading name, trade sector, primary service location, years in business, and regulatory credentials.",
      },
      {
        title: "2. Instant 5-Page Copy Pack Generation",
        description:
          "Click 'Generate 5-Page Trade Copy Pack'. The AI engine writes full, publication-ready copy for: 1) Homepage & Hero Hook, 2) Primary Trade Services, 3) About & Accreditations, 4) Case Studies & Social Proof, and 5) Contact & Emergency Quote Engine.",
        tips: [
          "Copy automatically embeds UK trade terminology, localized search keywords, and high-trust conversion triggers.",
        ],
      },
      {
        title: "3. Page-by-Page Review & 1-Click Export",
        description:
          "Use the tabbed viewer to inspect each page draft, copy individual pages or the full bundle to clipboard, and paste directly into the client's Vite / TanStack Start template.",
      },
    ],
    faq: [
      {
        q: "Does ContentFlow AI replace client interview homework?",
        a: "Yes. By generating authoritative, trade-accurate copy grounded in real industry standards, clients only need to approve or tweak rather than writing blank pages themselves.",
      },
    ],
  },
  {
    id: "live-staging-generator-playbook",
    category: "sales",
    title: "Generating & Pitching Live Staging Previews (/demos)",
    summary:
      "How to spin up interactive prospect website mockups in real-time with responsive mobile/tablet viewports and personalized pitch links.",
    badge: "Sales Velocity",
    readTime: "3 min read",
    quickAction: { label: "Open Staging Generator", to: "/demos" },
    steps: [
      {
        title: "1. Configure Prospect Branding & Service Hub",
        description:
          "Open /demos. Enter the contractor's trading name, trade sector (e.g. Heating, Electrical, Roofing), town/city, and telephone number.",
        tips: [
          "The interactive blueprint automatically re-renders with the client's exact branding and accreditation ribbons.",
        ],
      },
      {
        title: "2. Generate Shareable Link & WhatsApp Pitch",
        description:
          "Click 'Send Demo via WhatsApp' or 'Copy Staging Link'. Dispatch a high-impact personalized link so the prospect can test their own site on their smartphone.",
      },
      {
        title: "3. Direct Conversion to Interactive Proposal",
        description:
          "Click 'Convert to Proposal' to transfer all trade parameters straight into the Proposal Desk (/proposals) for 50% deposit intake.",
      },
    ],
  },
  {
    id: "automated-care-desk-maintenance",
    category: "care",
    title: "Operating the 24/7 Automated Care Desk & Performance Radar",
    summary:
      "Protocol for managing £95/mo recurring Care subscribers, fulfilling 24-hour change requests, and automated monthly performance reports.",
    badge: "MRR Retention",
    readTime: "4 min read",
    quickAction: { label: "Open Care Desk", to: "/admin/clients" },
    steps: [
      {
        title: "1. Global Fleet Health Probe",
        description:
          "Open /admin/clients and toggle 'Automated Care Desk & Uptime Radar'. Click 'Run Global Health Check' to verify edge TTFB, SSL certificate validity, and automated backups.",
      },
      {
        title: "2. 24-Hour Change Request Fulfillment",
        description:
          "Process inbound photo uploads, pricing updates, and emergency banner toggles submitted via /care-desk. Click 'Deploy & Close' upon verification.",
      },
      {
        title: "3. Dispatch Monthly Care ROI Reports",
        description:
          "Use the 1-click report dispatcher to send subscribers their monthly uptime statistics, new 5-star Google review count, and speed scores to ensure 100% retention.",
      },
    ],
  },
  {
    id: "trade-affiliate-portal-playbook",
    category: "partners",
    title: "Operating the Trade Partner Affiliate & Payout Portal (/partners)",
    summary:
      "Managing wholesale branch partnerships, counter QR display collateral, £250 upfront commission, and 20% recurring care revenue sharing.",
    badge: "Affiliate Ops",
    readTime: "3 min read",
    quickAction: { label: "Open Partner Portal", to: "/partners" },
    steps: [
      {
        title: "1. Create Unique Branch Partner Code",
        description:
          "Generate unique tracking codes (e.g. CEF-MCR-SALFORD, WOLSELEY-LEEDS) for electrical and plumbing merchant trade counters.",
      },
      {
        title: "2. Issue A4 Counter Display QR Flyers",
        description:
          "Print the official branded A4 counter display with embedded QR code giving trade contractors an exclusive £150 discount voucher.",
      },
      {
        title: "3. Monthly BACS Commission Settlement",
        description:
          "On the 1st of every month, generate automated remittance statements to disburse £250 upfront bounties and £19/mo ongoing Care Plan cuts.",
      },
    ],
  },
  {
    id: "multi-city-local-seo-playbook",
    category: "tools",
    title: "Deploying Multi-City Local SEO Borough Schema (/admin/leads)",
    summary:
      "Automating JSON-LD microdata generation, borough keyword clustering, and Google Map Pack top-3 proximity domination across 25+ UK hubs.",
    badge: "SEO Strategy",
    readTime: "4 min read",
    quickAction: { label: "Open SEO Factory", to: "/admin/leads" },
    steps: [
      {
        title: "1. Select City Hub & Trade Vertical",
        description:
          "Open /admin/leads -> 'Multi-City Local SEO Factory'. Pick the contractor's target county and trade specialization.",
      },
      {
        title: "2. Generate Schema.org JSON-LD Microdata",
        description:
          "System automatically maps local dialling codes, opening hours, geo-coordinates, and borough coverage arrays into 100% valid HomeAndConstructionBusiness schema.",
      },
      {
        title: "3. Copy & Deploy to Client Blueprint",
        description:
          "Paste the generated JSON-LD script into the client's HTML document head for instant search indexing and local proximity authority.",
      },
    ],
  },
  {
    id: "group-financial-hmrc-tax-playbook",
    category: "group",
    title: "Operating The Harley Group Consolidated P&L & HMRC MTD VAT Desk",
    summary:
      "Consolidated financial oversight across Harley Digital Works and Harley Labs, Corporation Tax reserves, and automated 9-box VAT returns.",
    badge: "Financial Governance",
    readTime: "4 min read",
    quickAction: { label: "Open Tax Desk", to: "/admin/invoices" },
    steps: [
      {
        title: "1. Quarterly Financial Roll-Up",
        description:
          "Open /admin/invoices -> 'Group Financial Consolidation'. Review net revenue contributions from Harley Digital Works (75%) and Harley Labs (25%).",
      },
      {
        title: "2. HMRC 9-Box VAT Schedule Computation",
        description:
          "System automatically calculates Box 1 output VAT, Box 4 input VAT reclaimed, and Box 5 net remittance for VAT Registration GB 948 2018 39.",
      },
      {
        title: "3. 1-Click HMRC CSV Export",
        description:
          "Click 'Export HMRC Return CSV' to generate audit-ready Making Tax Digital files for submission to HMRC or statutory accountants.",
      },
    ],
  },
  {
    id: "whatsapp-intake-os-playbook",
    category: "sales",
    title: "Operating the AI WhatsApp & SMS Inbound Intake Desk (/admin/leads)",
    summary:
      "Automated contractor qualification, instant staging demo generation, and human-in-the-loop WhatsApp closing console.",
    badge: "WhatsApp Automation",
    readTime: "3 min read",
    quickAction: { label: "Open WhatsApp Desk", to: "/admin/leads" },
    steps: [
      {
        title: "1. Review Real-Time WhatsApp Threads",
        description:
          "Open /admin/leads -> 'AI WhatsApp Intake Desk'. Inbound messages from trade contractors are automatically ingested, parsed for trade sector and city, and assigned priority status.",
      },
      {
        title: "2. Dispatch Instant 60-Second Staging Demos",
        description:
          "Click the 'Generate & Send Live Staging Demo' quick template chip to dynamically formulate an interactive preview URL for their specific company name and trade specialty.",
      },
      {
        title: "3. 1-Click Convert to CRM Pipeline",
        description:
          "Tap 'Mark as Converted' to automatically sync the trade lead into Supabase CRM leads and generate a 14-day production onboarding token.",
      },
    ],
  },
  {
    id: "client-site-code-exporter-playbook",
    category: "tech",
    title: "1-Click Standalone Trade Website Code Blueprint & Vite Exporter (/labs)",
    summary:
      "Synthesizing production React + Tailwind standalone repositories ready for instant deployment on Cloudflare Pages, Netlify, or Vercel.",
    badge: "Code Synthesis",
    readTime: "3 min read",
    quickAction: { label: "Open Code Exporter", to: "/labs" },
    steps: [
      {
        title: "1. Configure Contractor Blueprint Parameters",
        description:
          "Navigate to /labs -> '1-Click Code Blueprint Exporter' (or /admin/diagnostics). Specify the company name, trade vertical, city hub, and phone number.",
      },
      {
        title: "2. Inspect Multi-File React Tree",
        description:
          "Review App.tsx, Hero.tsx, Calculator.tsx, and package.json with syntax highlighting and instant clipboard copying.",
      },
      {
        title: "3. Export JSON / ZIP Repository Blueprint",
        description:
          "Click 'Download Full Project (JSON Blueprint)' to export a turnkey repository artifact ready for automated CI/CD deployment or git import.",
      },
    ],
  },
  {
    id: "review-booster-referral-playbook",
    category: "tools",
    title: "Post-Job 5-Star Review Booster & Direct WhatsApp Dispatch (/tools/review-booster)",
    summary:
      "Reputation shield protocol: routing happy homeowners straight to Google Review 5-star modals while intercepting negative feedback privately.",
    badge: "Reputation OS",
    readTime: "2 min read",
    quickAction: { label: "Open Review Booster", to: "/tools/review-booster" },
    steps: [
      {
        title: "1. Pre-Populate Customer Job Details",
        description:
          "Generate personalized dispatch links using URL query parameters (?biz=...&customer=...&phone=...) directly from the mobile care desk.",
      },
      {
        title: "2. 1-Tap Direct WhatsApp / SMS Dispatch",
        description:
          "Tap 'Send via WhatsApp' to open a pre-filled conversational prompt to the homeowner immediately upon job completion.",
      },
      {
        title: "3. Smart Sentiment Routing",
        description:
          "Homeowners selecting 4-5 stars are routed immediately to the contractor's Google Review page; 1-3 stars trigger a private feedback modal with instant SMS alert to the contractor.",
      },
    ],
  },
  {
    id: "group-executive-valuation-governance-playbook",
    category: "group",
    title: "The Harley Group Executive Governance, Cap Table & Valuation Framework (/the-harley-group)",
    summary:
      "Parent company governance, 100% founder-controlled equity structure, 50/30/20 capital allocation protocol, and statutory board oversight.",
    badge: "Executive Governance",
    readTime: "4 min read",
    quickAction: { label: "Open Group Governance", to: "/the-harley-group" },
    steps: [
      {
        title: "1. Debt-Free Balance Sheet Oversight",
        description:
          "Enforce zero long-term debt across all operating subsidiaries with 6+ months operational cash reserves held in UK liquid treasury accounts.",
      },
      {
        title: "2. 50/30/20 Capital Allocation Protocol",
        description:
          "Mandate allocation of operating cashflow: 50% Harley Labs R&D reinvestment, 30% treasury reserve buffer, 20% quarterly shareholder distributions.",
      },
      {
        title: "3. Annual Statutory & HMRC Compliance",
        description:
          "Execute automated Making Tax Digital VAT returns quarterly and Companies House statutory confirmation statements under English law.",
      },
    ],
  },
  {
    id: "outreach-sequence-engine-sop",
    category: "sales",
    title: "SOP 23: Multi-Channel Cold Email, WhatsApp & SMS Outreach Execution (/admin/leads)",
    summary:
      "Operational standard for configuring, customizing, and dispatching high-converting 3-touch trade outreach campaigns across Cold Email, WhatsApp Direct, and SMS.",
    badge: "Outreach OS",
    readTime: "3 min read",
    quickAction: { label: "Open Outreach OS", to: "/admin/leads" },
    steps: [
      {
        title: "1. Select Contractor Lead & Channel Matrix",
        description:
          "Open /admin/leads and toggle the 'Outreach OS' mode. Select your target lead or populate dynamic tokens (Trade, First Name, Company, City Hub, Loss Metric).",
        tips: [
          "Select the exact sequence archetype: 'The 3-Second Speed Teardown', 'Google Map Pack Missed Calls', or 'Emergency Out-of-Hours Dominance'.",
          "Review the preview on mobile view before triggering the first touch.",
        ],
      },
      {
        title: "2. Dispatch Step 1 Initial Icebreaker",
        description:
          "Use 1-click 'Send via WhatsApp Web' or 'Send via Default Mail' to dispatch the highly personalized audit findings directly to the company director.",
      },
      {
        title: "3. Follow-Up Touchpoints & CSV Sequence Export",
        description:
          "Step 2 (Day +2 Value Hook) and Step 3 (Day +4 Breakup Note) keep reply rates above 28%. Export all contacts to CSV for automated bulk campaign loaders (Instantly / Lemlist / Smartlead).",
      },
    ],
    faq: [
      {
        q: "What is the recommended delay between cold email and WhatsApp outreach?",
        a: "Send the email audit on Day 1, followed by a polite 30-second WhatsApp confirmation ping on Day 2 if no reply is received.",
      },
    ],
  },
  {
    id: "case-study-roi-generator-sop",
    category: "tools",
    title: "SOP 24: Generating Dynamic Trade ROI & Speed Telemetry Case Studies (/work)",
    summary:
      "Standard operating workflow for generating empirical before/after Lighthouse speed metrics, quote pipeline growth stats, and trade case studies to close hesitant prospects.",
    badge: "Social Proof Engine",
    readTime: "3 min read",
    quickAction: { label: "View Case Studies", to: "/work" },
    steps: [
      {
        title: "1. Audit Existing Client Benchmark Metrics",
        description:
          "Record the client's pre-Harley page speed index (usually 3.8s–6.2s on legacy WordPress/Wix) and quote inquiry capture rate.",
      },
      {
        title: "2. Input Post-Launch Edge Telemetry",
        description:
          "Measure the deployed Cloudflare V8 isolate speed (typically 0.45s–0.8s) and calculate monthly quote volume uplift (average 3.2x–4.1x).",
      },
      {
        title: "3. Share Turnkey Visual Case Study with Prospects",
        description:
          "Send the prospect to /work with the matching trade filter (Heating, Electrical, Solar, Roofing, Air Conditioning) to demonstrate undeniable proof of return on investment.",
      },
    ],
  },
  {
    id: "domain-os-dns-provisioning-sop",
    category: "tech",
    title: "SOP 25: 1-Click Registrar DNS Provisioning & SSL Zero-Downtime Migration (/admin/domain-os)",
    summary:
      "Automated procedure for provisioning root A records, www CNAME aliases, and TXT ownership tokens across UK registrars (123 Reg, GoDaddy, Cloudflare, IONOS, Namecheap).",
    badge: "Domain OS",
    readTime: "3 min read",
    quickAction: { label: "Open Domain OS", to: "/admin/domain-os" },
    steps: [
      {
        title: "1. Select Client Registrar & Enter Domain Name",
        description:
          "Open /admin/domain-os. Enter the client's primary domain (e.g. cheshireheat.co.uk) and select their registrar from the dropdown.",
      },
      {
        title: "2. Copy Pre-Formatted A, CNAME & TXT Records",
        description:
          "Click 'Copy Value' on the root A record (76.76.21.21) and www CNAME (cname.harleydigitalworks.com). Use 'Copy Full DNS Config' for instant bulk pasting.",
      },
      {
        title: "3. Run Automated DNS Propagation Health Check",
        description:
          "Click 'Verify Live DNS Propagation'. The engine queries global edge resolvers to confirm active routing and greenlights instant SSL issuance.",
      },
    ],
  },
  {
    id: "care-billing-direct-debit-sop",
    category: "care",
    title: "SOP 26: Client Care Plan Management, BACS Direct Debit & HMRC VAT Invoicing (/care-desk)",
    summary:
      "Self-service protocol for managing client recurring subscriptions (£95/mo Essentials, £195/mo Growth), BACS direct debit mandates, add-on modules, and HMRC-compliant VAT receipts.",
    badge: "Care Desk Billing",
    readTime: "3 min read",
    quickAction: { label: "Open Care Desk", to: "/care-desk" },
    steps: [
      {
        title: "1. Access Care Desk Self-Service Portal",
        description:
          "Navigate to /care-desk and click the 'Subscription, Direct Debit & VAT' tab.",
      },
      {
        title: "2. Toggle Plan Tiers & High-ROI Monthly Add-Ons",
        description:
          "Clients can upgrade between £95/mo Essentials and £195/mo Growth Care, or toggle the Google Map Pack Booster (£95/mo) and Review Engine (£49/mo) with 1 click.",
      },
      {
        title: "3. Download HMRC MTD Compliant Invoices & Update BACS Mandates",
        description:
          "Instantly download itemized PDF VAT receipts with registered UK VAT number GB 439 2019 44, or dispatch a 1-click BACS mandate update link.",
      },
    ],
  },
  {
    id: "suburb-matrix-engine-sop",
    category: "tools",
    title: "SOP 27: Bulk Sub-Town Geo Landing Page & Schema Generation (/labs#map-pack-matrix)",
    summary:
      "Standard operating procedure for generating 10–25 geo-targeted trade landing pages with local landmark anchors, Postcode sector tags, and Schema.org LocalBusiness JSON-LD markup.",
    badge: "Map-Pack Matrix",
    readTime: "3 min read",
    quickAction: { label: "Open Suburb Matrix", to: "/labs" },
    steps: [
      {
        title: "1. Configure Contractor Trade & Hub City",
        description:
          "Open /labs -> 'Automated Sub-Town Landing Page Factory'. Input the contractor's business name, trade category, and primary hub.",
      },
      {
        title: "2. Review Suburb List & Landmark Anchors",
        description:
          "Inspect generated sub-town pages across Cheshire & Greater Manchester (e.g. Wilmslow, Alderley Edge, Knutsford, Altrincham, Hale, Prestbury, Macclesfield).",
      },
      {
        title: "3. Export JSON & React Component Blueprint",
        description:
          "Export all 10 pages in single-click JSON or copy ready-to-deploy TSX code into the client's repository build tree.",
      },
    ],
  },
  {
    id: "audit-pitch-deck-loom-sop",
    category: "sales",
    title: "SOP 28: 1-Click Client Audit Pitch Deck & 60-Second Video Script Workflow (/admin/leads)",
    summary:
      "Procedure for generating bespoke 4-slide PDF audit pitch decks and high-converting Loom video recording scripts to close hesitant trade prospects.",
    badge: "Pitch Deck OS",
    readTime: "3 min read",
    quickAction: { label: "Open Pitch Deck Desk", to: "/admin/leads" },
    steps: [
      {
        title: "1. Input Prospect Domain & Speed Telemetry",
        description:
          "Navigate to /admin/leads -> 'Audit Pitch Deck & Loom'. Enter the prospect's website URL, director name, and measured loading speed (e.g. 5.4s).",
      },
      {
        title: "2. Generate 4-Slide Empirical Presentation",
        description:
          "Review Slide 1 (Lost Revenue Breakdown), Slide 2 (Core Web Vitals Comparison), Slide 3 (Conversion Modules), and Slide 4 (Commercial Proposal).",
      },
      {
        title: "3. Record Personalized 60-Second Video Audit",
        description:
          "Use the auto-generated conversational script for Robbie Harley to record a 60-second Loom audit and dispatch via 1-click WhatsApp.",
      },
    ],
  },
  {
    id: "payment-webhook-auto-provisioning-sop",
    category: "tech",
    title: "SOP 29: Automated Stripe/GoCardless Webhook Handling & Staging Auto-Provisioning (/admin/revenue-os)",
    summary:
      "Protocol for zero-touch client onboarding: webhook event signature validation, project tracking token assignment (HDW-XXXX), and staging isolate deployment.",
    badge: "Auto-Provisioning",
    readTime: "3 min read",
    quickAction: { label: "Open Revenue OS", to: "/admin/revenue-os" },
    steps: [
      {
        title: "1. Inbound Webhook Event Verification",
        description:
          "Verify inbound `checkout.session.completed` from Stripe or `mandate.created` from GoCardless with HMAC-SHA256 signature.",
      },
      {
        title: "2. Token Assignment & Supabase Registry Creation",
        description:
          "System assigns tracking token HDW-XXXX, initializes the 14-day SLA delivery countdown, and registers client credentials.",
      },
      {
        title: "3. Automated Staging Subdomain Deployment & Welcome Message",
        description:
          "Provisions client preview environment and triggers automated WhatsApp onboarding prompt with 3-minute intake link.",
      },
    ],
  },
  {
    id: "trade-lead-radar-prospecting-sop",
    category: "sales",
    title: "SOP 30: UK Trade Lead Radar & Slow-Site Prospecting Execution (/admin/radar)",
    summary:
      "Standard operating workflow for scanning regional contractor geo-grids, detecting slow mobile load times (>3.5s), and prioritizing high-leak targets.",
    badge: "Lead Radar",
    readTime: "3 min read",
    quickAction: { label: "Open Lead Radar", to: "/admin/radar" },
    steps: [
      {
        title: "1. Select Trade Sector & Regional Hub",
        description:
          "Open /admin/radar. Filter by trade (Heating, Solar, Electrical, Roofing, AC) and target postcode area.",
      },
      {
        title: "2. Analyze Speed Scores & Conversion Gaps",
        description:
          "Filter targets showing critical speed status (&gt;4.5s) and absence of mobile WhatsApp lead capture.",
      },
      {
        title: "3. 1-Click Outbound Dispatch & CSV Export",
        description:
          "Dispatch 1-click personalized WhatsApp audits or export the full matrix to CSV for automated campaign loaders.",
      },
    ],
  },
];

const CATEGORIES: { id: GuideCategory; label: string; icon: typeof BookOpen }[] = [
  { id: "all", label: "All Runbooks", icon: BookOpen },
  { id: "sales", label: "Sales & Proposals", icon: FileText },
  { id: "onboarding", label: "14-Day Delivery", icon: Zap },
  { id: "care", label: "Care Desk", icon: ShieldCheck },
  { id: "partners", label: "Trade Partners", icon: Users },
  { id: "tools", label: "SEO & Free Tools", icon: Globe },
  { id: "tech", label: "Tech Stack & Edge", icon: Cpu },
  { id: "group", label: "The Harley Group", icon: Building2 },
];

function KnowledgeBasePage() {
  const [selectedCat, setSelectedCat] = useState<GuideCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<KnowledgeArticle | null>(
    KNOWLEDGE_ARTICLES[0]
  );

  const filteredArticles = KNOWLEDGE_ARTICLES.filter((art) => {
    const matchesCat = selectedCat === "all" || art.category === selectedCat;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.steps.some(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Knowledge Base & How-To Runbooks"
        subtitle="Comprehensive operational guides, standard operating procedures (SOPs), and administration workflows for every module of The Harley Group platform."
      />

      {/* Top Search & Filter Bar */}
      <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SOPs, workflows, tools, or procedures..."
              className="w-full rounded-xl border border-ink/15 bg-background/50 pl-10 pr-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>{filteredArticles.length} Operational Guides Available</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-ink/10">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-ink text-white"
                    : "bg-ink/5 text-ink-muted hover:bg-ink/10 hover:text-ink"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Knowledge Viewer */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Article List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredArticles.map((art) => {
            const isSelected = activeArticle?.id === art.id;
            return (
              <button
                key={art.id}
                onClick={() => setActiveArticle(art)}
                className={`w-full text-left rounded-xl p-4 transition-all duration-200 border ${
                  isSelected
                    ? "bg-white border-primary ring-1 ring-primary shadow-sm"
                    : "bg-white/80 border-ink/10 hover:bg-white hover:border-ink/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-ink/5 px-2 py-0.5 text-[11px] font-medium text-ink-muted">
                    {art.badge}
                  </span>
                  <span className="text-[11px] text-ink-muted">{art.readTime}</span>
                </div>
                <h4 className="mt-2 text-sm font-semibold text-ink leading-snug">
                  {art.title}
                </h4>
                <p className="mt-1 text-xs text-ink-muted line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs font-medium text-primary">
                  <span>View Full SOP</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </button>
            );
          })}

          {filteredArticles.length === 0 && (
            <div className="rounded-xl border border-dashed border-ink/20 bg-white p-8 text-center text-ink-muted">
              <HelpCircle className="mx-auto h-8 w-8 opacity-40" />
              <p className="mt-2 text-sm font-medium">No runbooks match your search</p>
              <p className="text-xs">Try searching for keywords like 'leads', 'proposals', or 'DNS'.</p>
            </div>
          )}
        </div>

        {/* Right Column: Active Article Detail */}
        <div className="lg:col-span-7">
          {activeArticle ? (
            <div className="rounded-2xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-4">
                <div>
                  <span className="rounded-md bg-emerald-50 text-emerald-700 px-2.5 py-1 text-xs font-semibold border border-emerald-200">
                    {activeArticle.badge}
                  </span>
                  <span className="ml-2 text-xs text-ink-muted">
                    {activeArticle.readTime}
                  </span>
                </div>
                {activeArticle.quickAction && (
                  <Link
                    to={activeArticle.quickAction.to}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-xs font-medium text-white hover:bg-ink/85 transition-colors"
                  >
                    <span>{activeArticle.quickAction.label}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>

              <h2 className="mt-4 text-2xl font-bold text-ink">
                {activeArticle.title}
              </h2>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {activeArticle.summary}
              </p>

              {/* Step By Step Instructions */}
              <div className="mt-8 space-y-6">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted">
                  Standard Operating Steps
                </h3>
                {activeArticle.steps.map((step, idx) => (
                  <div key={step.title} className="rounded-xl border border-ink/10 bg-slate-50/70 p-5">
                    <h4 className="text-sm font-bold text-ink flex items-center gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-white text-[11px] font-mono">
                        {idx + 1}
                      </span>
                      {step.title}
                    </h4>
                    <p className="mt-2 text-xs md:text-sm text-ink-muted leading-relaxed pl-7">
                      {step.description}
                    </p>
                    {step.tips && step.tips.length > 0 && (
                      <div className="mt-3 pl-7 space-y-1.5">
                        {step.tips.map((tip) => (
                          <div key={tip} className="flex items-start gap-1.5 text-xs text-ink-muted">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* FAQs / Pro-tips */}
              {activeArticle.faq && activeArticle.faq.length > 0 && (
                <div className="mt-8 border-t border-ink/10 pt-6">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted mb-4">
                    Frequently Asked Questions & Edge Cases
                  </h3>
                  <div className="space-y-3">
                    {activeArticle.faq.map((item) => (
                      <div key={item.q} className="rounded-lg bg-ink/5 p-4 text-xs">
                        <p className="font-semibold text-ink">{item.q}</p>
                        <p className="mt-1 text-ink-muted leading-relaxed">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-ink/10 bg-white p-12 text-center text-ink-muted">
              Select an operational guide from the list to view its complete SOP.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
