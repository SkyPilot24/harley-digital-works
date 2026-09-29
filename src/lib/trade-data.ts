export interface TradeVertical {
  slug: string;
  name: string;
  badge: string;
  heroHeadline: string;
  heroHighlight: string;
  heroSubheadline: string;
  accreditationBadge: string;
  averageJobValue: string;
  targetEnquiries: string[];
  keyChallenges: string[];
  includedFeatures: string[];
  metaTitle: string;
  metaDescription: string;
  demoTradeKey: string;
  stats: { label: string; value: string }[];
}

export const TRADE_VERTICALS: Record<string, TradeVertical> = {
  "heating-engineers": {
    slug: "heating-engineers",
    name: "Heating & Gas Engineers",
    badge: "Gas Safe & Boiler Specialists",
    heroHeadline: "Done-For-You Websites That Land",
    heroHighlight: "High-Margin £3,500+ Boiler Installs.",
    heroSubheadline:
      "Stop competing on cheap radiator repairs. We build high-converting websites for UK Gas Safe heating engineers that capture profitable boiler replacements, heat pump installations, and commercial service contracts.",
    accreditationBadge: "Gas Safe Registered & OFTEC Ready",
    averageJobValue: "£3,200 – £5,800",
    targetEnquiries: [
      "Combi boiler replacements & full central heating upgrades",
      "Air-source heat pump installations & government grants",
      "Emergency boiler breakdown & same-day diagnosis",
      "Commercial landlord gas safety certificates (CP12)",
    ],
    keyChallenges: [
      "Tired of paying £45+ per lead on Checkatrade that 5 other plumbers get",
      "No time to write website text or figure out hosting and DNS records",
      "Prospects questioning prices because your existing website looks dated",
    ],
    includedFeatures: [
      "100% Done-for-you technical copywriting highlighting your Gas Safe status",
      "Instant Boiler Quote Request engine with boiler brand selector (Worcester, Vaillant, Baxi)",
      "Automated 5-Star SMS review booster for post-installation Google ratings",
      "Google Map Pack top-3 local SEO schema for emergency callouts",
      "14-Day delivery to live launch with £95/mo managed care",
    ],
    metaTitle: "Websites for Gas & Heating Engineers | Harley Digital Works",
    metaDescription:
      "High-converting websites for UK Gas Safe heating engineers and plumbers. Win profitable boiler replacements with 100% done-for-you copywriting and 14-day launch.",
    demoTradeKey: "boiler",
    stats: [
      { label: "Avg New Boiler Value", value: "£3,400" },
      { label: "Launch Speed", value: "14 Days" },
      { label: "Google PageSpeed", value: "98/100" },
      { label: "Managed Care", value: "£95/mo" },
    ],
  },
  "commercial-contractors": {
    slug: "commercial-contractors",
    name: "Commercial & Multi-Van Contractors",
    badge: "CHAS Elite & PPM Specialists",
    heroHeadline: "Enterprise Digital Platforms For",
    heroHighlight: "Commercial Fleet & Facility Contractors.",
    heroSubheadline:
      "Win lucrative commercial maintenance retainers, council framework tenders, and facility management contracts with institutional-grade web infrastructure and verified compliance portals.",
    accreditationBadge: "CHAS Elite, SafeContractor & £10M Liability",
    averageJobValue: "£12,000 – £85,000/yr",
    targetEnquiries: [
      "Planned Preventative Maintenance (PPM) contracts",
      "Commercial HVAC, electrical and plumbing infrastructure",
      "Facility management & corporate building services",
      "Public sector framework & local authority tenders",
    ],
    keyChallenges: [
      "Commercial procurement managers rejecting bids due to lack of verified online compliance",
      "Struggling to showcase multi-van capacity and rapid emergency SLA response",
      "Websites looking like domestic one-man-bands rather than serious commercial operations",
    ],
    includedFeatures: [
      "Dedicated Commercial Fleet Portal showcasing £10M liability & CHAS Elite credentials",
      "Interactive PPM Service Retainer Calculator for facilities managers",
      "Procurement Tender Download Pack with single-click PDF spec sheets",
      "Multi-depot regional coverage hubs across Manchester, Leeds, and London",
      "Sub-50ms edge SSR performance for corporate procurement review",
    ],
    metaTitle: "Websites for Commercial & Multi-Van Contractors | Harley Digital Works",
    metaDescription:
      "Enterprise digital infrastructure for UK commercial contractors, HVAC, and facilities management. Win commercial PPM contracts with CHAS Elite compliance.",
    demoTradeKey: "commercial",
    stats: [
      { label: "Avg PPM Contract", value: "£24,000/yr" },
      { label: "Compliance Tier", value: "CHAS Elite" },
      { label: "Turnaround", value: "14 Days" },
      { label: "Managed Care", value: "£95/mo" },
    ],
  },
  electricians: {
    slug: "electricians",
    name: "Electricians & EV Installers",
    badge: "NICEIC & EV Infrastructure",
    heroHeadline: "High-Speed Websites Engineered For",
    heroHighlight: "NICEIC Approved EV & Electrical Contractors.",
    heroSubheadline:
      "Capture lucrative commercial 3-phase upgrades, workplace EV charging hubs, EICR landlord inspections, and smart home electrical installations with a 100% done-for-you digital platform.",
    accreditationBadge: "NICEIC Approved Contractor & OZEV Registered",
    averageJobValue: "£1,800 – £9,500",
    targetEnquiries: [
      "Commercial & workplace EV charge point installations (OZEV)",
      "3-Phase distribution board upgrades & commercial rewires",
      "EICR periodic electrical inspection reports for landlords",
      "Architectural lighting & smart automation systems",
    ],
    keyChallenges: [
      "Missing out on high-margin EV charging schemes to national brokers",
      "Lack of professional online quote calculators for EV charger installs",
      "Difficulty establishing authority over cheap unregistered competitors",
    ],
    includedFeatures: [
      "NICEIC accreditation banner with verified compliance badge showcase",
      "Interactive EV Charger Instant Quote Calculator",
      "Local Map Pack dominance for 'Commercial Electrician near me'",
      "Automated WhatsApp dispatcher for instant emergency callouts",
      "14-Day turnkey live launch with £95/mo managed care",
    ],
    metaTitle: "Websites for Electricians & EV Installers | Harley Digital Works",
    metaDescription:
      "Done-for-you website systems for UK electricians and EV charge point installers. High-converting NICEIC certified websites launched in 14 days.",
    demoTradeKey: "ev",
    stats: [
      { label: "Avg Commercial Job", value: "£4,200" },
      { label: "EV Quote Tool", value: "Included" },
      { label: "Launch Window", value: "14 Days" },
      { label: "Managed Care", value: "£95/mo" },
    ],
  },
  builders: {
    slug: "builders",
    name: "Master Builders & Construction",
    badge: "FMB & Structural Specialists",
    heroHeadline: "Prestigious Websites Tailored For",
    heroHighlight: "High-Ticket House Extensions & Master Builders.",
    heroSubheadline:
      "Position your construction business to win £50,000+ double-storey extensions, loft conversions, and new-build structural projects with high-craft photography galleries and client video case studies.",
    accreditationBadge: "Federation of Master Builders (FMB) & TrustMark",
    averageJobValue: "£45,000 – £150,000",
    targetEnquiries: [
      "Full double-storey house extensions & structural alterations",
      "High-end loft conversions & architectural remodelling",
      "Bespoke new-build residential construction",
      "Commercial fit-outs & structural refurbishments",
    ],
    keyChallenges: [
      "Affluent homeowners demanding high-end digital proof before awarding £50k+ contracts",
      "Poorly organised photo galleries that fail to reflect the luxury craft of your builds",
      "Wasting hours qualifying tyre-kickers who don't have the budget for quality construction",
    ],
    includedFeatures: [
      "High-resolution interactive project portfolio with before/after sliders",
      "Interactive Project Cost & Lead-Time Estimator for homeowners",
      "Client testimonial showcase with video review support",
      "Full copywriting covering planning permission, building regs, and stage payments",
      "14-Day turnkey delivery with ongoing £95/mo care",
    ],
    metaTitle: "Websites for Master Builders & Construction | Harley Digital Works",
    metaDescription:
      "Luxury websites for UK builders and extension specialists. Land £50k+ construction contracts with high-craft digital portfolios launched in 14 days.",
    demoTradeKey: "roofing",
    stats: [
      { label: "Avg Extension Value", value: "£65,000" },
      { label: "Portfolio Engine", value: "Included" },
      { label: "Launch SLA", value: "14 Days" },
      { label: "Managed Care", value: "£95/mo" },
    ],
  },
};
