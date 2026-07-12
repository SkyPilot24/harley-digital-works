function normalizeSiteUrl(url: string) {
  return url.trim().replace(/\/+$/, "");
}

const configuredSiteUrl =
  import.meta.env.VITE_SITE_URL ||
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  "https://harleydigitalworks.com";

const siteUrl = normalizeSiteUrl(configuredSiteUrl);
const siteDomain = new URL(siteUrl).hostname;

export const siteConfig = {
  name: "THG Digital Agency",
  domain: siteDomain,
  url: siteUrl,
  canonicalUrl: `${siteUrl}/`,
  ogImage: `${siteUrl}/og-image.svg`,
  contactEmail: "hello@harleydigitalworks.com",
  brandMark: "/brand/thg-mark.svg",
  brandLogo: "/brand/thg-logo-horizontal.svg",
};

export function canonicalUrlForPath(pathname: string) {
  const safePath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return safePath === "/" ? siteConfig.canonicalUrl : `${siteConfig.url}${safePath}`;
}

export type PublicWebsiteRoute = {
  path: string;
  label: string;
  adminPath: string;
  adminLabel: string;
  owner: string;
  diagnosticGroup: "Brand" | "Services" | "Domains" | "Resources" | "Lead capture";
  leadCapturePath: string;
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
    owner: "Website operations",
    diagnosticGroup: "Brand",
    leadCapturePath: "/contact",
    revenueRole: "Primary brand and conversion entry point",
    nextAction: "Deploy the canonical metadata update and keep the hero offer aligned with the highest-priority Revenue OS item.",
    priority: "High",
  },
  {
    path: "/about",
    label: "About",
    adminPath: "/admin/team",
    adminLabel: "Team",
    owner: "Website operations",
    diagnosticGroup: "Brand",
    leadCapturePath: "/contact",
    revenueRole: "Trust builder for founder-led sales",
    nextAction: "Keep team proof, positioning, and credibility signals current for sales calls.",
    priority: "Medium",
  },
  {
    path: "/services",
    label: "Services",
    adminPath: "/admin/services",
    adminLabel: "Services",
    owner: "Sales intake",
    diagnosticGroup: "Services",
    leadCapturePath: "/contact",
    revenueRole: "Offer catalogue for paid work",
    nextAction: "Make sure each service has a clear fixed-price package and one next step.",
    priority: "High",
  },
  {
    path: "/services/automation",
    label: "Automation",
    adminPath: "/admin/services",
    adminLabel: "Services",
    owner: "Automation offers",
    diagnosticGroup: "Services",
    leadCapturePath: "/contact",
    revenueRole: "AI automation retainers and audits",
    nextAction: "Tie this page to the AI automation audit asset and add a booking-led CTA.",
    priority: "High",
  },
  {
    path: "/services/care-plans",
    label: "Care plans",
    adminPath: "/admin/services",
    adminLabel: "Services",
    owner: "Care plans",
    diagnosticGroup: "Services",
    leadCapturePath: "/contact",
    revenueRole: "Recurring revenue conversion path",
    nextAction: "Keep care-plan pricing and post-launch upsell messaging visible.",
    priority: "High",
  },
  {
    path: "/services/content-engine",
    label: "Content engine",
    adminPath: "/admin/services",
    adminLabel: "Services",
    owner: "Content engine",
    diagnosticGroup: "Services",
    leadCapturePath: "/contact",
    revenueRole: "Authority and inbound lead generation",
    nextAction: "Connect content output to resource publishing and lead capture.",
    priority: "Medium",
  },
  {
    path: "/services/digital-products",
    label: "Digital products",
    adminPath: "/admin/services",
    adminLabel: "Services",
    owner: "Digital products",
    diagnosticGroup: "Services",
    leadCapturePath: "/contact",
    revenueRole: "Scalable product revenue",
    nextAction: "Use Revenue OS to prioritise the first productised template or kit.",
    priority: "Medium",
  },
  {
    path: "/services/launch-plan",
    label: "Launch plan",
    adminPath: "/admin/services",
    adminLabel: "Services",
    owner: "Launch offers",
    diagnosticGroup: "Services",
    leadCapturePath: "/contact",
    revenueRole: "Fast cash offer for one-week builds",
    nextAction: "Keep package scope tight and route enquiries into leads.",
    priority: "High",
  },
  {
    path: "/domains",
    label: "Domains",
    adminPath: "/admin/revenue-os",
    adminLabel: "Revenue OS",
    owner: "Revenue OS",
    diagnosticGroup: "Domains",
    leadCapturePath: "/contact",
    revenueRole: "Domain monetisation pipeline",
    nextAction: "Rank premium domains and turn the top opportunities into execution tasks.",
    priority: "High",
  },
  {
    path: "/resources",
    label: "Resources",
    adminPath: "/admin/resources",
    adminLabel: "Resources",
    owner: "Content operations",
    diagnosticGroup: "Resources",
    leadCapturePath: "/contact",
    revenueRole: "SEO, proof, and nurture content",
    nextAction: "Publish resources that support care plans, automation audits, and launch-plan enquiries.",
    priority: "Medium",
  },
  {
    path: "/contact",
    label: "Contact",
    adminPath: "/admin/leads",
    adminLabel: "Leads",
    owner: "Sales intake",
    diagnosticGroup: "Lead capture",
    leadCapturePath: "/contact",
    revenueRole: "Lead capture and sales intake",
    nextAction: "Keep contact details aligned with the current production domain and mailbox.",
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
    action: "Keep all public contact links and placeholders aligned with the production mailbox.",
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
