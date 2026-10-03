// Summary of the governing Business OS records & verified platform engine, updated October 2026.
export const currentStrategy = {
  title: "Managed Websites & Digital Infrastructure for UK Trades",
  model:
    "An initial website build fee (£1,495 / £2,995) plus ongoing monthly digital care (£95/mo – £249/mo).",
  milestone:
    "Win, deliver and retain verified paying trade customers with 100% done-for-you technical copy & local SEO.",
  audience:
    "Established UK trade contractors (Gas Safe heating engineers, NICEIC electricians, FMB master builders, CHAS commercial contractors).",
  pilot:
    "Gas Safe Heating Engineers & NICEIC Electricians across Manchester, West Midlands, and Cheshire. Fixed 14-day SLA live launch.",
  offer:
    "Launch Plan (£1,495 setup + £95/mo care) & Growth Plan (£2,995 setup + £195/mo care). Net + 20% UK VAT with 50% deposit & 50% completion balance.",
  approval:
    "Written proposal acceptance, 50% deposit confirmation in bank/provider ledger, and verified business identity required before work begins.",
  build:
    "Turnkey trade website, 100% done-for-you technical copywriting, Gas Safe/NICEIC/FMB/CHAS compliance badges, mobile-responsive layout, 1-tap WhatsApp lead desk, Local Map Pack Schema.org JSON-LD microdata, and edge SSR performance.",
  care: "Managed hosting, SSL certificates, automated 5-star Google review booster, monthly SEO inspection, domain DNS upkeep preserving business email, and emergency recovery.",
  boundaries:
    "No unverified revenue claims, dummy invoice receipts, or unauthenticated lead access. All leads are protected by Supabase Row-Level Security (RLS).",
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
    title: "Approve Commercial Quote & VAT Breakdown",
    detail:
      "Generate a formal proposal using LeadProposalModal with transparent Net, 20% UK VAT (HMRC GB 948 2018 39), Gross Total, 50% Deposit, and 50% Completion Balance.",
  },
  {
    title: "Verify Deposit Payment",
    detail:
      "Confirm 50% deposit in bank ledger before initializing workspace. Package interest never creates assumed recurring revenue or automatically marks leads won.",
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
      "Deploy prebuilt Nitro worker (.output/server/wrangler.json) to Cloudflare. Verify SUPABASE_SERVICE_ROLE_KEY isolation from public bundle and preserve client domain DNS email records.",
  },
  {
    title: "Deliver Ongoing Monthly Care & Review Booster",
    detail:
      "Activate £95/mo – £195/mo Care Plan. Deploy 1-tap WhatsApp lead desk and automated SMS review booster to capture 5-star Google ratings.",
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
    conversionPath: "Promotes review booster integration as part of the £95/mo Care Plan.",
  },
];

export const currentPriorities = [
  "Execute first commercial pilot with verified Gas Safe heating & NICEIC electrical contractors.",
  "Maintain 100% pass rate across 59 smoke checks + 32 unit tests and zero build errors.",
  "Reconcile 50% deposit payments directly via banking ledger before marking client workspaces active.",
  "Run weekly Control Centre diagnostics checks to ensure metadata, canonicals, and Cloudflare edge SSR health.",
  "Maintain strict RLS authorization policies protecting prospect data in Supabase.",
];
