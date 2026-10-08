/**
 * Central Operational Knowledge Base for Harley Digital Works & The Harley Group
 *
 * This serves as the dashboard's structured source of truth, providing operators,
 * admins, and AI agents with complete operational knowledge, commercial rules,
 * architecture specifications, governance guidelines, and support runbooks.
 */

export interface KnowledgeArticle {
  id: string;
  category: "architecture" | "commercial" | "playbooks" | "governance" | "support" | "records";
  title: string;
  summary: string;
  keyPoints: string[];
  operationalDetails: string;
  statusBadge?: string;
  lastUpdated: string;
}

export const KNOWLEDGE_CATEGORIES = [
  { id: "all", label: "All Knowledge" },
  { id: "architecture", label: "Systems & Architecture" },
  { id: "commercial", label: "Commercial Model & Economics" },
  { id: "playbooks", label: "Workflows & Playbooks" },
  { id: "governance", label: "Governance & Escalations" },
  { id: "support", label: "Support & Runbooks" },
  { id: "records", label: "Governing Business Records" },
] as const;

export const KNOWLEDGE_BASE_ARTICLES: KnowledgeArticle[] = [
  {
    id: "platform-architecture-state",
    category: "architecture",
    title: "Production Infrastructure & Backend Environments",
    summary:
      "Overview of the dual-environment setup (Cloudflare Workers + Supabase) running the live customer portal and marketing surfaces.",
    keyPoints: [
      "Live backend: THG Agency (worzpzbutngugwzhlvtj) in Supabase eu-west-1.",
      "Staging backend: Isolated project (mfpnfxpgkfuqtedbcxvp) in SkyPilot24 org.",
      "Production host: Cloudflare Worker (skypilot24-harley-digital-works) with Nitro SSR runtime.",
      "Canonical source repository: SkyPilot24/harley-digital-works on GitHub main branch.",
      "Lovable THG Digital repository (thgdigital) remains a decoupled UI prototype environment.",
    ],
    operationalDetails:
      "All live database operations connect strictly to the THG Agency instance. The frontend is pre-rendered and served via Cloudflare edge nodes with SSR fallback. Secrets are managed in Cloudflare Worker environment bindings; the Supabase service role key is strictly quarantined to server tasks and never exposed to the public client bundle.",
    statusBadge: "Verified Live",
    lastUpdated: "7 October 2026",
  },
  {
    id: "automated-background-crons",
    category: "architecture",
    title: "Scheduled Background Crons & Task Workers",
    summary:
      "Configuration and mechanics of Cloudflare Worker and Nitro scheduled crons for outbox delivery and data retention.",
    keyPoints: [
      "Minute Cron (* * * * *): Dispatches lead alerts to Slack #all-the-harley-group.",
      "Disjoint leases: Uses FOR UPDATE SKIP LOCKED with a 2-minute lease window to prevent double-sends.",
      "Native fetch receiver: Global fetch wrapper preserves Cloudflare Worker context to avoid connection drops.",
      "Exponential backoff: 5-attempt retry schedule (1m, 5m, 15m, 60m) before marking failed.",
      "Hourly Cron (0 * * * *): Invokes prune_lead_submission_attempts() via service client for abuse retention pruning.",
    ],
    operationalDetails:
      "Crons are defined in nitro.config.ts and compiled into .output/server/wrangler.json. The lead notification task runs every minute, claiming unleased jobs atomically. Slack alerts contain only the brand, lead reference, and a secure CRM link (no customer PII). The hourly retention task deletes stale IP submission attempts older than retention limits to maintain GDPR compliance and database efficiency.",
    statusBadge: "Active Schedules",
    lastUpdated: "7 October 2026",
  },
  {
    id: "security-rls-intake-safeguards",
    category: "architecture",
    title: "Security Hardening, RLS & Abuse Protection",
    summary:
      "Multi-layered defense model protecting lead capture, authenticated administration, and user data privacy.",
    keyPoints: [
      "Atomic server intake: Leads submitted via public contact forms pass through an atomic database RPC.",
      "Strict Row-Level Security: Anonymous direct SELECT, UPDATE, and DELETE operations on leads are strictly denied.",
      "Rate limiting: IP-based bucket limits enforced using Cloudflare edge headers (CF-Connecting-IP).",
      "Zero auto-admin signup: Legacy bootstrap trigger disabled; new signups receive no administrative privileges.",
      "Isolated credentials: Real administrative sign-in requires confirmed email/password or magic link in THG Agency.",
    ],
    operationalDetails:
      "Prospect and client records are isolated by Postgres Row-Level Security. Ordinary authenticated users cannot view or mutate other users' records. The admin portal is restricted to users with explicit administrative metadata. All client-side builds undergo automated secret-leak scanning during CI/CD to prevent token exposure.",
    statusBadge: "Enforced RLS",
    lastUpdated: "7 October 2026",
  },
  {
    id: "commercial-offer-managed",
    category: "commercial",
    title: "Commercial Model: The Three Productised Packages",
    summary:
      "The three productised packages designed for UK trade contractors, anchored by the flagship Revenue Engine.",
    keyPoints: [
      "The Revenue Engine (Core Flagship): £1,495 setup (50/50 split £747.50) + £249/mo care. 5 pages, DFY trade copy, dual SMS/email lead desk, GBP local SEO + Schema JSON-LD, automated review kit, 30-min monthly edits.",
      "The Launchpad (Entry): £995 setup (50/50 split £497.50) + £149/mo care. 3 pages, DFY copy, email lead desk, GBP verification, Cloudflare edge hosting, 15-min monthly edits.",
      "The Market Leader (Expansion): £2,495 setup (50/50 split £1,247.50) + £399/mo care. 8 pages, 3 geo-targeted area landing pages, missed-call SMS auto-reply, priority review booster, Google LSA setup, 60-min monthly edits.",
      "Initial Target Niche: Established Electrical Contractors (2–8 staff) across Bristol, Bath, and the M4 Corridor.",
      "Acquisition Engine: Zero cold calling. Automated corporate B2B digital leak audits (PECR compliant) + private interactive prototypes.",
    ],
    operationalDetails:
      "Harley Digital Works positions as the digital operating infrastructure for UK trades: 'We build and run your complete digital enquiry desk — so high-value local customers find you, trust you, and book with you, while you stay focused on the tools.' All billing is milestone-gated (50% upfront deposit, 50% on preview sign-off before DNS cutover). Out-of-scope items (e-commerce, custom apps, site visits) are quoted separately.",
    statusBadge: "Ratified Tiers",
    lastUpdated: "7 October 2026",
  },
  {
    id: "unit-economics-and-vat",
    category: "commercial",
    title: "Unit Economics, Payback & VAT Compliance",
    summary:
      "Defensible cost breakdown, upfront contribution margins, recurring profitability, and statutory tax rules.",
    keyPoints: [
      "Upfront delivery cost (Base): £772.63 (14h build labour @ £40/hr + CAC overhead + Stripe fee).",
      "Net Upfront Contribution: +£722.37 (48.3% margin) — instant Day 0 payback before subscription starts.",
      "Monthly servicing cost (Base): £66.94 (prorated infrastructure + 1h support labour @ £40/hr + Stripe fee + incident buffer).",
      "Monthly recurring net contribution: +£182.06 / month (73.1% margin) per active client.",
      "VAT Treatment: Harley Digital Works operates below HMRC's £90k statutory threshold. All prices are zero-rated / VAT not applicable. No VAT is charged and no fake VAT numbers are displayed.",
    ],
    operationalDetails:
      "Customer acquisition cost (CAC) overhead accounts for 3 unclosed previews for every 1 won customer. Even in a challenged scenario with 22h build labour, setup remains cash positive (+£292.37). Invoices and quotes must always display 'VAT not applicable / zero-rated' until official HMRC registration is completed.",
    statusBadge: "Zero-Rated VAT",
    lastUpdated: "7 October 2026",
  },
  {
    id: "capacity-and-operating-boundaries",
    category: "commercial",
    title: "Operator Capacity & Delivery Concurrency Caps",
    summary:
      "Operating rules protecting founder NHS schedule commitments while maintaining strict delivery SLAs.",
    keyPoints: [
      "Founder weekly capacity: 10–12 hours per week dedicated to Harley Digital Works.",
      "Automation ratio: Scaffolding, intake parsing, and diagnostic checks automate ~70% of setup work.",
      "Active labour per build: 4–5 hours of active founder touch per completed website.",
      "Hard concurrency limit: Maximum 2 to 3 concurrent client onboarding builds (hard cap of 2 during initial pilot).",
      "Fleet servicing: Support for active care clients requires ~0.5–1.0h/client/month, fitting within part-time capacity up to 15 active accounts.",
    ],
    operationalDetails:
      "To prevent delivery delays and maintain personal balance alongside NHS clinical responsibilities, any pipeline volume exceeding 2 to 3 concurrent onboarding builds must trigger an immediate pause on outbound acquisition or require onboarding a vetted production junior.",
    statusBadge: "2–3 Concurrency",
    lastUpdated: "7 October 2026",
  },
  {
    id: "eight-step-turnaround-sequence",
    category: "playbooks",
    title: "8-Step Turnaround Delivery Sequence",
    summary:
      "The standardised client progression from initial inbound enquiry to launched care subscriber.",
    keyPoints: [
      "Step 1 - Qualify Enquiry: Verify trade accreditation, company status, and coverage area.",
      "Step 2 - Conversion Tools: Run Trade ROI Calculator, Local SEO Inspector, and Review Booster to demonstrate value.",
      "Step 3 - Approve Commercial Quote: Issue formal proposal (£1,495 setup + £249/mo) via LeadProposalModal.",
      "Step 4 - Verify Deposit Payment: Confirm 50% deposit (£747.50) in bank ledger before initializing workspace.",
      "Step 5 - Onboard & Assemble: Collect brand assets, project photos, write done-for-you technical copy.",
      "Step 6 - QA & Diagnostic Inspection: Run full suite diagnostics, check metadata, sitemap, and edge SSR.",
      "Step 7 - Launch & DNS Connection: Switch DNS to Cloudflare while safeguarding existing business email (MX records).",
      "Step 8 - Monthly Care Activation: Start £249/mo subscription, monthly health checks, and 30-min edit batches.",
    ],
    operationalDetails:
      "Every project follows this sequence strictly. Step 4 is a hard gate: no production build begins until the upfront deposit clears in the bank ledger. Creating a client workspace does not mark the lead won or record payment.",
    statusBadge: "Standard SOP",
    lastUpdated: "7 October 2026",
  },
  {
    id: "trade-vertical-playbooks",
    category: "playbooks",
    title: "Trade Vertical Playbooks & Target Audiences",
    summary:
      "Messaging, average contract sizes, and high-converting features across priority trade sectors.",
    keyPoints: [
      "Gas Safe Heating Engineers: Average job value £3.2k–£5.8k. Key feature: boiler brand selector & CP12 landlord reminder.",
      "NICEIC Electricians & EV: Average job value £1.8k–£9.5k. Key feature: instant EV charger quote & EICR intake.",
      "Master Builders & Construction: Average job value £45k–£150k. Key feature: before/after sliders & stage payment guides.",
      "Commercial Contractors: Average job value £12k–£85k/yr. Key feature: commercial fleet portal & PPM retainer calculator.",
    ],
    operationalDetails:
      "All landing hubs and proposed copy highlight verified accreditations (Gas Safe, NICEIC, FMB, CHAS). Initial pilot outreach focuses on Bristol & Bath regional trades before expanding UK-wide.",
    statusBadge: "Trade Verticals",
    lastUpdated: "7 October 2026",
  },
  {
    id: "governance-escalation-matrix",
    category: "governance",
    title: "Proposal Automation & Founder Escalation Triggers",
    summary:
      "Clear boundaries defining which customer proposals can advance automatically vs. those requiring founder approval.",
    keyPoints: [
      "Auto-Generate Allowed: Standard 5-page scope, £1,495 setup + £249/mo, 50/50 payment split, standard 30-day care terms.",
      "Halt - Scope Creep: Custom software, customer portals, e-commerce checkouts, or requests exceeding 7 total pages.",
      "Halt - Pricing Alterations: Any proposal requesting discounted setup (<£1,495) or waived monthly care.",
      "Halt - Delayed Deposit: Requests to commence work without upfront deposit payment.",
      "Halt - Contractual Liability: Custom NDAs, bespoke indemnities, or penalty-backed delivery deadlines.",
      "Halt - Capacity Breach: Pipeline exceeding 3 concurrent active onboarding builds.",
    ],
    operationalDetails:
      "If any escalation trigger occurs, the lead remains in 'Contacted' or 'Qualified' state until the founder reviews and provides written approval. No automated system is permitted to waive commercial terms.",
    statusBadge: "Escalation Matrix",
    lastUpdated: "7 October 2026",
  },
  {
    id: "revenue-recognition-rules",
    category: "governance",
    title: "Revenue Integrity & Accounting Safeguards",
    summary:
      "Rules enforcing truthful accounting and preventing speculative pipeline from being presented as collected revenue.",
    keyPoints: [
      "Zero assumed revenue: Lead enquiry interest or package selection NEVER records assumed revenue.",
      "Client workspace isolation: Initializing a client workspace creates zero monthly value and sets status to 'lead'.",
      "Bank ledger verification: Setup fees and monthly care values are only recorded as collected after bank or Stripe reconciliation.",
      "No dummy documents: No fake VAT invoices or mock tax records are permitted.",
      "Separate financial ledgers: Primary statutory accounting is reconciled outside this dashboard.",
    ],
    operationalDetails:
      "The CRM and Control Centre display pipeline counts and operational estimates. These are never presented as verified audited turnover. Invoices generated in the dashboard are payment notices and request templates, not statutory VAT invoices.",
    statusBadge: "Integrity Rule",
    lastUpdated: "7 October 2026",
  },
  {
    id: "notification-triage-runbook",
    category: "support",
    title: "Notification Failure Triage & Slack Runbook",
    summary:
      "Diagnostic procedure for monitoring outbox delivery, investigating failed alerts, and resetting delivery leases.",
    keyPoints: [
      "Monitor outbox: Check Control Centre or Automations & Health (/admin/diagnostics) for outbox job statuses.",
      "Status lifecycle: pending -> leased -> accepted (or failed after 5 attempts).",
      "Acceptance confirmation: 'Slack acknowledged this alert' indicates successful delivery to #all-the-harley-group.",
      "Lease recovery: Jobs stuck in 'leased' state automatically recover after the 2-minute lease window expires.",
      "Emergency webhook verification: Verify SLACK_WEBHOOK_URL is set in Cloudflare Worker environment bindings.",
    ],
    operationalDetails:
      "In the event of a Slack webhook error, the Cloudflare Worker task captures safe diagnostic error categories and schedules automatic retries with exponential backoff. Customer contact details are never logged in error traces. Customer enquiry submission is never blocked or rolled back if Slack delivery fails.",
    statusBadge: "Operational SOP",
    lastUpdated: "7 October 2026",
  },
  {
    id: "dns-email-continuity-runbook",
    category: "support",
    title: "DNS Cutover & Client Email Continuity Runbook",
    summary:
      "Step-by-step technical instructions for pointing client domains to Cloudflare without interrupting existing email services.",
    keyPoints: [
      "Pre-cutover DNS audit: Export and record all existing DNS records (MX, SPF, DKIM, DMARC, TXT, CNAME).",
      "Zero email disruption: NEVER touch or delete MX records during website launch.",
      "Web traffic routing: Point root domain (@) and www to Cloudflare edge CNAME or A records.",
      "SSL verification: Ensure Universal SSL or custom SSL certificate is active before switching nameservers.",
      "Post-launch verification: Send test emails to client's business address to confirm uninterrupted delivery.",
    ],
    operationalDetails:
      "The client always retains 100% legal ownership of their domain name and registrar account. Delegation via Cloudflare CNAME or DNS zone transfer must strictly preserve all email exchange configurations.",
    statusBadge: "DNS Checklist",
    lastUpdated: "7 October 2026",
  },
  {
    id: "business-os-central-records",
    category: "records",
    title: "Business OS Central Governing Documents",
    summary:
      "Direct references to the authoritative Google Drive mirrors and repository governance files.",
    keyPoints: [
      "Business OS Folder: 1A6e8LO2cElTH4WsIwdQAggJnH94xTJuP (Single entrypoint).",
      "Business Definition: 1sGcm_svP0v9WRrxRLSg33hq5G9BlkSx_ (Scope, pricing, operating boundaries).",
      "Master Backlog: 1CCRiiSJSUxBfbQKfFjQpa45_wrMoYSCn (Tasks H01-H50, D01-D08, L01).",
      "Project Status: 16dY7fXb2YAy9-BBYPrCrwoftoOV_GAvj (Verified deployment & milestones).",
      "Decisions & Activity: 1aLkoy5TKNCQi7fmvc8YqxLXzMWdDVkZj (Decision history & ratifications).",
      "Commercial Offer & Economics: docs/COMMERCIAL_OFFER_MANAGED.md in repository.",
    ],
    operationalDetails:
      "The shared repository governs technical execution, while Google Drive mirrors reflect business state at milestones. Updates are synchronized deliberately; changes in Drive do not automatically push to Git and vice versa.",
    statusBadge: "Drive Mirrors",
    lastUpdated: "7 October 2026",
  },
];
