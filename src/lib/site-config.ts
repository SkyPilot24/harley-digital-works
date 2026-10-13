function normalizeSiteUrl(url: string) {
  return url.trim().replace(/\/+$/, "");
}

const configuredSiteUrl =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_SITE_URL) ||
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  "https://harleydigitalworks.com";

const siteUrl = normalizeSiteUrl(configuredSiteUrl);
const siteDomain = new URL(siteUrl).hostname;

export const leadCaptureConfigured = Boolean(
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) ||
  (process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_PUBLISHABLE_KEY),
);

export const siteConfig = {
  name: "Harley Digital Works",
  domain: siteDomain,
  url: siteUrl,
  canonicalUrl: `${siteUrl}/`,
  ogImage: `${siteUrl}/brand/2026-10-13/hdw-og-image.png`,
  contactEmail: "hello@harleydigitalworks.com",
  contactPhone: "0117 214 1357",
  contactPhoneRaw: "01172141357",
  brandMark: "/brand/2026-10-13/logos/hdw-symbol-ivory.svg",
  brandLogo: "/brand/2026-10-13/logos/hdw-endorsed-ivory.svg",
  brandLogoDark: "/brand/2026-10-13/logos/hdw-endorsed-ivory.svg",
  brandLogoLight: "/brand/2026-10-13/logos/hdw-endorsed-navy.svg",
  brandMarkDark: "/brand/2026-10-13/logos/hdw-symbol-ivory.svg",
  brandMarkLight: "/brand/2026-10-13/logos/hdw-symbol-navy.svg",
};

export function canonicalUrlForPath(pathname: string) {
  if (pathname === "/the-harley-group") return "https://theharleygroup.org/the-harley-group";
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
    nextAction:
      "Deploy the canonical metadata update and keep the hero offer aligned with the highest-priority Revenue OS item.",
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
    nextAction:
      "Publish resources that support care plans, automation audits, and launch-plan enquiries.",
    priority: "Medium",
  },
  {
    path: "/trades",
    label: "Trades",
    adminPath: "/admin/playbooks",
    adminLabel: "Playbooks",
    owner: "Trade acquisition",
    diagnosticGroup: "Services",
    leadCapturePath: "/contact",
    revenueRole: "Trade vertical directory and landing hub",
    nextAction:
      "Keep Gas Safe, NICEIC, FMB, and CHAS trade vertical templates aligned with target offers.",
    priority: "High",
  },
  {
    path: "/locations",
    label: "Locations",
    adminPath: "/admin/radar",
    adminLabel: "Radar",
    owner: "Local acquisition",
    diagnosticGroup: "Services",
    leadCapturePath: "/contact",
    revenueRole: "Local UK market landing hub",
    nextAction:
      "Ensure postcode coverage and regional telephone links are active across Manchester and West Midlands.",
    priority: "High",
  },
  {
    path: "/calculator",
    label: "ROI Calculator",
    adminPath: "/admin/leads",
    adminLabel: "Leads",
    owner: "Sales conversion",
    diagnosticGroup: "Lead capture",
    leadCapturePath: "/contact",
    revenueRole: "Turnover projection and break-even calculator",
    nextAction: "Ensure turnover projections hydrate directly into contact enquiry form.",
    priority: "High",
  },
  {
    path: "/tools/seo-inspector",
    label: "SEO Inspector",
    adminPath: "/admin/radar",
    adminLabel: "Radar",
    owner: "SEO operations",
    diagnosticGroup: "Lead capture",
    leadCapturePath: "/contact",
    revenueRole: "Local Google Map Pack & keyword volume scanner",
    nextAction: "Route scanned town & trade keywords directly into custom SEO proposal requests.",
    priority: "High",
  },
  {
    path: "/tools/review-booster",
    label: "Review Booster",
    adminPath: "/admin/services",
    adminLabel: "Services",
    owner: "Care plans",
    diagnosticGroup: "Lead capture",
    leadCapturePath: "/contact",
    revenueRole: "5-Star Google review engine & reputation shield",
    nextAction: "Promote automated review booster as part of £95/mo care plans.",
    priority: "High",
  },
  {
    path: "/partners",
    label: "Partners",
    adminPath: "/admin/clients",
    adminLabel: "Clients",
    owner: "Partner network",
    diagnosticGroup: "Services",
    leadCapturePath: "/contact",
    revenueRole: "Trade partner referral commission engine",
    nextAction: "Maintain transparent £250/trade recurring referral commission calculator.",
    priority: "High",
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
    action:
      "Production is live, but it still showed older metadata during the audit. Deploy the latest build and re-check canonical and Open Graph tags.",
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
    action:
      "Keep services, domains, and contact routes mapped to a revenue asset, next action, and owner.",
  },
  {
    title: "Use live diagnostics weekly",
    priority: "Medium",
    owner: "Control Centre",
    action:
      "Use the Diagnostics screen to monitor route status, metadata coverage, and legacy contact details; add lead-capture checks next.",
  },
];

export function buildPageSeoHead({
  title,
  description,
  path = "/",
  ogType = "website",
  includeSchemaJsonLd = true,
}: {
  title: string;
  description: string;
  path?: string;
  ogType?: string;
  includeSchemaJsonLd?: boolean;
}) {
  const canonicalUrl = canonicalUrlForPath(path);
  const fullOgImage = siteConfig.ogImage;

  const meta = [
    { title },
    { name: "description", content: description },
    { property: "og:site_name", content: siteConfig.name },
    { property: "og:type", content: ogType },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: fullOgImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: fullOgImage },
  ];

  const links = [{ rel: "canonical", href: canonicalUrl }];

  const scripts = includeSchemaJsonLd
    ? [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: siteConfig.name,
            url: siteConfig.url,
            logo: `${siteConfig.url}${siteConfig.brandMark}`,
            image: fullOgImage,
            email: siteConfig.contactEmail,
            telephone: "+441172141357",
            priceRange: "£1,495 - £4,995",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Bristol",
              addressRegion: "South West",
              addressCountry: "GB",
            },
            description: "Managed websites, copywriting, and digital care for UK trade businesses.",
          }),
        },
      ]
    : [];

  return { meta, links, scripts };
}
