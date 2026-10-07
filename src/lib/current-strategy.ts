// Summary of the governing Business OS records & verified platform engine, updated October 2026.
export const currentStrategy = {
  title: "Managed Websites & Digital Infrastructure for UK Trades",
  model: "An initial website build fee (£1,495 setup) plus ongoing monthly digital care (£249/mo).",
  milestone:
    "Win, deliver and retain verified paying trade customers with 100% done-for-you technical copy & local SEO.",
  audience:
    "Established UK trade contractors (NICEIC electricians, Gas Safe heating engineers, builders, multi-van contractors with 2–10 staff).",
  pilot:
    "Bristol & Bath regional trade contractors (expanding UK-wide remote digital studio). 14-day SLA delivery target.",
  offer:
    "Managed Digital Presence: £1,495 setup fee (50% deposit £747.50, 50% completion balance £747.50) + £249/mo ongoing monthly care. VAT not applicable / zero-rated.",
  approval:
    "Written proposal acceptance, 50% deposit (£747.50) confirmed in bank/provider ledger, and verified trade accreditations before work begins.",
  build:
    "Turnkey 5-page trade website, 100% done-for-you technical copywriting, trade accreditation badges, mobile-responsive layout, dual-channel lead desk, Local Map Pack Schema.org JSON-LD microdata, and Cloudflare edge SSR performance.",
  care: "Managed Cloudflare edge hosting, SSL certificates, 1 batch of content edits per month (up to 30 mins), automated enquiry health checks, review workflow, monthly performance summary, and 24h support response window.",
  boundaries:
    "Capacity limit: Max 2–3 concurrent client onboarding builds to protect NHS schedule balance. Zero unverified revenue claims. VAT not applicable. All leads protected by Supabase RLS.",
};

export const strategyRecords = [
  {
    title: "Business OS — start here",
    id: "1_bPSSKnLH2FekfD8xSAPcloMbIZSySgl",
    description: "Current governing documents and commercial authority.",
  },
  {
    title: "Business definition and proposed offer",
    id: "1sGcm_svP0v9WRrxRLSg33hq5G9BlkSx_",
    description: "Customer, scope, proposed commercial terms and boundaries.",
  },
  {
    title: "Master delivery backlog",
    id: "1CCRiiSJSUxBfbQKfFjQpa45_wrMoYSCn",
    description: "The authoritative task register, owners and acceptance evidence.",
  },
  {
    title: "Project status & Cloudflare deployment",
    id: "16dY7fXb2YAy9-BBYPrCrwoftoOV_GAvj",
    description: "Verified progress, Cloudflare Nitro SSR worker state, and deployment gates.",
  },
  {
    title: "Decisions and activity",
    id: "1aLkoy5TKNCQi7fmvc8YqxLXzMWdDVkZj",
    description: "Settled direction, open approvals and milestone history.",
  },
  {
    title: "Acquisition and delivery blueprint",
    id: "1rUwCCzfXtm0ZQtMUEtysbzKYEAel4OMO",
    description: "Permitted acquisition, trade vertical landing hubs, and conversion tools.",
  },
  {
    title: "Unit economics & VAT accounting",
    id: "1msf1I4jjVvp037akGkUiexDjy58xhW2z",
    description:
      "20% UK VAT accounting rules, 50% deposit structures, and partner referral payouts.",
  },
];

export const deliverySteps = [
  {
    title: "Qualify the enquiry & Trade Vertical",
    detail:
      "Record customer fit, business identity, source, current website, trade vertical (Heating, Electrical, Construction, Commercial), and capacity. RLS ensures anonymous leads are securely inserted while non-admins are blocked.",
  },
  {
    title: "Run Conversion Tools & Financial Projection",
    detail:
      "Use the Trade ROI Calculator (/calculator) to model turnover growth, the Local SEO Inspector (/tools/seo-inspector) to scan Map Pack keywords for the town, and the 5-Star Review Booster (/tools/review-booster) to demonstrate reputation defense.",
  },
  {
    title: "Approve Commercial Quote & Milestone Breakdown",
    detail:
      "Generate a formal proposal using LeadProposalModal with standard Managed pricing (£1,495 Setup, VAT zero-rated), 50% Deposit (£747.50), and 50% Completion Balance (£747.50).",
  },
  {
    title: "Verify Deposit Payment",
    detail:
      "Confirm 50% deposit (£747.50) in bank ledger before initializing workspace. Package interest never creates assumed recurring revenue or automatically marks leads won.",
  },
  {
    title: "Onboard & Assemble Trade Infrastructure",
    detail:
      "Collect Gas Safe/NICEIC/FMB accreditation details, project photography, and coverage postcodes. Build five-page trade architecture with done-for-you copywriting.",
  },
  {
    title: "QA & Diagnostic Inspection",
    detail:
      "Execute runWebsiteDiagnostics() in Control Centre. Verify 11 public route surfaces, sitemap XML, canonical tags, OpenGraph meta, and Schema.org JSON-LD microdata.",
  },
  {
    title: "Launch & Cloudflare Deployment",
    detail:
      "Deploy prebuilt Nitro worker (.output/server/wrangler.json) to Cloudflare. Verify Supabase service role key isolation from public bundle and preserve client domain DNS email records.",
  },
  {
    title: "Deliver Ongoing Monthly Care & Review Booster",
    detail:
      "Activate £249/mo Managed Care Plan. Maintain edge hosting, 30-min monthly edit batch, enquiry-routing health checks, and review workflows.",
  },
];

export const tradeVerticalPlaybooks = [
  {
    name: "Gas Safe Heating & Boiler Engineers",
    badge: "Gas Safe Registered & OFTEC Ready",
    avgJobValue: "£3,200 – £5,800",
    keyFeatures:
      "Boiler brand selector (Worcester, Vaillant, Baxi), emergency breakdown CTA, automated CP12 landlord reminder Engine.",
  },
  {
    name: "NICEIC Electricians & EV Installers",
    badge: "NICEIC Approved Contractor & OZEV Registered",
    avgJobValue: "£1,800 – £9,500",
    keyFeatures:
      "Instant EV Charger Quote Calculator, 3-Phase distribution board upgrade portal, EICR periodic inspection lead intake.",
  },
  {
    name: "Master Builders & Construction",
    badge: "Federation of Master Builders (FMB) & TrustMark",
    avgJobValue: "£45,000 – £150,000",
    keyFeatures:
      "High-resolution before/after project sliders, stage payment breakdown guide, client video review showcase.",
  },
  {
    name: "Commercial & Multi-Van Contractors",
    badge: "CHAS Elite, SafeContractor & £10M Liability",
    avgJobValue: "£12,000 – £85,000/yr",
    keyFeatures:
      "Commercial Fleet Portal, PPM Service Retainer Calculator, single-click PDF procurement tender download pack.",
  },
];

export const conversionToolPlaybooks = [
  {
    name: "Trade ROI & Revenue Calculator",
    route: "/calculator",
    purpose:
      "Demonstrates how 1–3 additional monthly bookings generate £20k–£100k+ in extra annual turnover.",
    conversionPath: "Hydrates ROI projection directly into contact enquiry form.",
  },
  {
    name: "Local SEO & Map Pack Inspector",
    route: "/tools/seo-inspector",
    purpose:
      "Scans local UK trade keywords, search volume, CPC value, and competitor Map Pack gaps.",
    conversionPath: "Converts scanned town & trade into a customized SEO proposal request.",
  },
  {
    name: "5-Star Google Review Booster",
    route: "/tools/review-booster",
    purpose:
      "Routes 4–5 star ratings to Google in 1 tap while shielding negative feedback privately.",
    conversionPath: "Promotes review booster integration as part of the £249/mo Managed Care Plan.",
  },
];

export const currentPriorities = [
  "Execute first commercial pilot with verified Gas Safe heating & NICEIC electrical contractors.",
  "Maintain 100% pass rate across 125 automated tests (60 smoke + 62 regression + 3 service worker) and zero build errors.",
  "Reconcile 50% deposit payments directly via banking ledger before marking client workspaces active.",
  "Run weekly Control Centre diagnostics checks to ensure metadata, canonicals, and Cloudflare edge SSR health.",
  "Maintain strict RLS authorization policies protecting prospect data in Supabase.",
];
