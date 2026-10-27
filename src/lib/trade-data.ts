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

// Offer facts, not unmeasured customer results or a fixed launch timeline.
const approvedOfferStats = [
  { label: "Website Setup", value: "£1,495" },
  { label: "Monthly Care", value: "£249/mo" },
  { label: "Delivery Schedule", value: "Agreed after brief" },
  { label: "Preview Revisions", value: "2 rounds" },
];

export const TRADE_VERTICALS: Record<string, TradeVertical> = {
  electricians: {
    slug: "electricians",
    name: "Electricians & EV Installers",
    badge: "Websites for Electrical Contractors",
    heroHeadline: "High-Speed Websites Engineered For",
    heroHighlight: "NICEIC Approved EV & Electrical Contractors.",
    heroSubheadline:
      "Showcase commercial 3-phase upgrades, workplace EV charging hubs, EICR landlord inspections, and electrical installations with a professionally built and managed website.",
    accreditationBadge: "Use client-confirmed registration details",
    averageJobValue: "Confirm from client records",
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
      "Five-page website with done-for-you copy for your confirmed electrical services",
      "Client-confirmed accreditation details and approved project work",
      "Two preview revision rounds before the approved release",
      "Customer SMS/email enquiry routing agreed in scope and verified before launch",
      "£249/month managed care starting at agreed go-live; calculators require separately agreed scope",
    ],
    metaTitle: "Websites for Electricians & EV Installers | Harley Digital Works",
    metaDescription:
      "Done-for-you websites and ongoing care for UK electricians and EV installers. Confirmed service details, approved credentials and an agreed delivery schedule.",
    demoTradeKey: "ev",
    stats: approvedOfferStats,
  },
  "heating-engineers": {
    slug: "heating-engineers",
    name: "Heating & Gas Engineers",
    badge: "Websites for Heating Engineers",
    heroHeadline: "Websites Built For",
    heroHighlight: "Heating & Boiler Specialists.",
    heroSubheadline:
      "Show your heating services clearly, explain the work you take on, and give customers a straightforward way to enquire. We write and build around your confirmed business facts and approved assets.",
    accreditationBadge: "Use client-confirmed registration details",
    averageJobValue: "Confirm from client records",
    targetEnquiries: [
      "Combi boiler replacements & full central heating upgrades",
      "Air-source heat pump & heating installations",
      "Emergency boiler breakdown & same-day diagnosis",
      "Commercial landlord gas safety certificates (CP12)",
    ],
    keyChallenges: [
      "Dependence on third-party lead platforms rather than your own enquiry route",
      "No time to write website text or figure out hosting and DNS records",
      "Prospects questioning prices because your existing website looks dated",
    ],
    includedFeatures: [
      "Five-page website with done-for-you copy for your confirmed heating services",
      "Client-confirmed registrations and approved project photography",
      "Two preview revision rounds before the approved release",
      "Customer SMS/email enquiry routing agreed in scope and verified before launch",
      "£249/month managed care starting at agreed go-live; schedule agreed after brief and access",
    ],
    metaTitle: "Websites for Gas & Heating Engineers | Harley Digital Works",
    metaDescription:
      "Websites and ongoing care for UK heating engineers and plumbers. Done-for-you copy, confirmed business facts and an agreed delivery schedule.",
    demoTradeKey: "boiler",
    stats: approvedOfferStats,
  },
  "commercial-contractors": {
    slug: "commercial-contractors",
    name: "Commercial & Multi-Van Contractors",
    badge: "Websites for Commercial Contractors",
    heroHeadline: "Clear, Professional Websites For",
    heroHighlight: "Commercial Fleet & Facility Contractors.",
    heroSubheadline:
      "Present your commercial services, approved project work and confirmed credentials clearly. Give facilities managers a practical route to enquire about your business.",
    accreditationBadge: "Use client-confirmed credentials and insurance details",
    averageJobValue: "Confirm from client records",
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
      "Five-page website with done-for-you copy for your confirmed commercial services",
      "Approved project work and client-confirmed credential details",
      "Two preview revision rounds before the approved release",
      "Customer SMS/email enquiry routing agreed in scope and verified before launch",
      "£249/month managed care starting at agreed go-live; additional portals or tools require separate scope",
    ],
    metaTitle: "Websites for Commercial & Multi-Van Contractors | Harley Digital Works",
    metaDescription:
      "Websites and ongoing care for UK commercial contractors and facilities businesses. Clear services, approved project work and an agreed delivery schedule.",
    demoTradeKey: "commercial",
    stats: approvedOfferStats,
  },
  builders: {
    slug: "builders",
    name: "Master Builders & Construction",
    badge: "Websites for Construction Businesses",
    heroHeadline: "Prestigious Websites Tailored For",
    heroHighlight: "High-Ticket House Extensions & Master Builders.",
    heroSubheadline:
      "Show the quality of your extensions, loft conversions and construction work with approved project photography, clear services and a straightforward enquiry route.",
    accreditationBadge: "Use client-confirmed memberships and credentials",
    averageJobValue: "Confirm from client records",
    targetEnquiries: [
      "Full double-storey house extensions & structural alterations",
      "High-end loft conversions & architectural remodelling",
      "Bespoke new-build residential construction",
      "Commercial fit-outs & structural refurbishments",
    ],
    keyChallenges: [
      "Customers wanting clear evidence of the work your business has completed",
      "Poorly organised photo galleries that fail to reflect the luxury craft of your builds",
      "Wasting hours qualifying tyre-kickers who don't have the budget for quality construction",
    ],
    includedFeatures: [
      "Five-page website with done-for-you copy for your confirmed construction services",
      "Approved project photography and genuine client feedback where permission exists",
      "Two preview revision rounds before the approved release",
      "Customer SMS/email enquiry routing agreed in scope and verified before launch",
      "£249/month managed care starting at agreed go-live; estimates and additional tools require separate scope",
    ],
    metaTitle: "Websites for Master Builders & Construction | Harley Digital Works",
    metaDescription:
      "Websites and ongoing care for UK builders and extension specialists. Approved project photography, done-for-you copy and an agreed delivery schedule.",
    demoTradeKey: "roofing",
    stats: approvedOfferStats,
  },
};
