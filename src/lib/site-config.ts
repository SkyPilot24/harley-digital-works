export const siteConfig = {
  name: "The Harley Group",
  domain: "theharleygroup.org",
  url: "https://theharleygroup.org",
  canonicalUrl: "https://theharleygroup.org/",
};

export type PublicWebsiteRoute = {
  path: string;
  label: string;
  adminPath: string;
  adminLabel: string;
  revenueRole: string;
  nextAction: string;
  priority: "High" | "Medium" | "Low";
};

export const publicWebsiteRoutes: PublicWebsiteRoute[] = [
  {
    path: "/",
    label: "Home",
    adminPath: "/admin/settings",
    adminLabel: "Settings",
    revenueRole: "Primary brand and conversion entry point",
    nextAction: "Deploy the canonical metadata update and keep the hero offer aligned with the highest-priority Revenue OS item.",
    priority: "High",
  },
  {
    path: "/about",
    label: "About",
    adminPath: "/admin/team",
    adminLabel: "Team",
    revenueRole: "Trust builder for founder-led sales",
    nextAction: "Keep team proof, positioning, and credibility signals current for sales calls.",
    priority: "Medium",
  },
  {
    path: "/services",
    label: "Services",
    adminPath: "/admin/services",
    adminLabel: "Services",
    revenueRole: "Offer catalogue for paid work",
    nextAction: "Make sure each service has a clear fixed-price package and one next step.",
    priority: "High",
  },
  {
    path: "/services/automation",
    label: "Automation",
    adminPath: "/admin/services",
    adminLabel: "Services",
    revenueRole: "AI automation retainers and audits",
    nextAction: "Tie this page to the AI automation audit asset and add a booking-led CTA.",
    priority: "High",
  },
  {
    path: "/services/care-plans",
    label: "Care plans",
    adminPath: "/admin/services",
    adminLabel: "Services",
    revenueRole: "Recurring revenue conversion path",
    nextAction: "Keep care-plan pricing and post-launch upsell messaging visible.",
    priority: "High",
  },
  {
    path: "/services/content-engine",
    label: "Content engine",
    adminPath: "/admin/services",
    adminLabel: "Services",
    revenueRole: "Authority and inbound lead generation",
    nextAction: "Connect content output to resource publishing and lead capture.",
    priority: "Medium",
  },
  {
    path: "/services/digital-products",
    label: "Digital products",
    adminPath: "/admin/services",
    adminLabel: "Services",
    revenueRole: "Scalable product revenue",
    nextAction: "Use Revenue OS to prioritise the first productised template or kit.",
    priority: "Medium",
  },
  {
    path: "/services/launch-plan",
    label: "Launch plan",
    adminPath: "/admin/services",
    adminLabel: "Services",
    revenueRole: "Fast cash offer for one-week builds",
    nextAction: "Keep package scope tight and route enquiries into leads.",
    priority: "High",
  },
  {
    path: "/domains",
    label: "Domains",
    adminPath: "/admin/revenue-os",
    adminLabel: "Revenue OS",
    revenueRole: "Domain monetisation pipeline",
    nextAction: "Rank premium domains and turn the top opportunities into execution tasks.",
    priority: "High",
  },
  {
    path: "/resources",
    label: "Resources",
    adminPath: "/admin/resources",
    adminLabel: "Resources",
    revenueRole: "SEO, proof, and nurture content",
    nextAction: "Publish resources that support care plans, automation audits, and launch-plan enquiries.",
    priority: "Medium",
  },
  {
    path: "/contact",
    label: "Contact",
    adminPath: "/admin/leads",
    adminLabel: "Leads",
    revenueRole: "Lead capture and sales intake",
    nextAction: "Replace legacy contact email once the theharleygroup.org mailbox or alias is ready.",
    priority: "High",
  },
];

export type WebsiteAuditSuggestion = {
  title: string;
  priority: "High" | "Medium" | "Low";
  owner: string;
  action: string;
};

export const websiteAuditSuggestions: WebsiteAuditSuggestion[] = [
  {
    title: "Deploy canonical metadata update",
    priority: "High",
    owner: "Website operations",
    action: "Production is live, but it still showed older metadata during the audit. Deploy the latest build and re-check canonical and Open Graph tags.",
  },
  {
    title: "Replace legacy contact email",
    priority: "High",
    owner: "Sales intake",
    action: "Move public contact links from hello@thg.digital to a theharleygroup.org mailbox or alias when ready.",
  },
  {
    title: "Connect money pages to Revenue OS",
    priority: "High",
    owner: "Revenue OS",
    action: "Keep services, domains, and contact routes mapped to a revenue asset, next action, and owner.",
  },
  {
    title: "Use live diagnostics weekly",
    priority: "Medium",
    owner: "Control Centre",
    action: "Use the Diagnostics screen to monitor route status, metadata coverage, and legacy contact details; add lead-capture checks next.",
  },
];

