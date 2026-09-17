import { Link } from "@tanstack/react-router";
import { PillButton } from "./PillButton";
import { siteConfig } from "@/lib/site-config";
import { BrandLogo } from "./BrandLogo";

const YEAR = 2026;

const COLUMNS = [
  {
    heading: "Websites & Care",
    links: [
      { label: "14-Day Launch (£1,495)", to: "/services/launch-plan" },
      { label: "Growth Website (£2,995)", to: "/services/web-design-development" },
      { label: "Pro Platforms (£4,995)", to: "/services/digital-products" },
      { label: "Managed Care (£95/mo)", to: "/services/care-plans" },
      { label: "All Pricing Packages", to: "/services" },
    ],
  },
  {
    heading: "Demos & Free Tools",
    links: [
      { label: "Live Trade Demos", to: "/demos" },
      { label: "Trade ROI Calculator", to: "/calculator" },
      { label: "Local SEO Inspector", to: "/tools/seo-inspector" },
      { label: "Google Review Booster", to: "/tools/review-booster" },
      { label: "Free Website Audit", to: "/audit" },
    ],
  },
  {
    heading: "Client Portals",
    links: [
      { label: "Fast-Track Onboarding", to: "/onboarding" },
      { label: "14-Day Build Tracker", to: "/track" },
      { label: "Care Plan Update Desk", to: "/care-desk" },
      { label: "Selected Work & Results", to: "/work" },
      { label: "Free Trade Resources", to: "/resources" },
    ],
  },
  {
    heading: "Company & Regions",
    links: [
      { label: "About Us", to: "/about" },
      { label: "UK Regional Hubs", to: "/locations" },
      { label: "Trade Domains Store", to: "/domains" },
      { label: "Get a Free Quote", to: "/contact" },
      { label: "Privacy Policy", to: "/privacy" },
    ],
  },
] as const;

export function FooterDark() {
  return (
    <footer className="bg-footer text-background">
      <div className="mx-auto max-w-[1240px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-8 lg:grid-cols-12 md:gap-8">
          <div className="lg:col-span-4">
            <p className="max-w-sm text-[15px] leading-relaxed text-background/80">
              <strong className="text-white">
                You run your business. We’ll handle your website.
              </strong>
              <br />
              100% done-for-you website builds, professional copywriting, and managed monthly care
              for UK trades and small businesses.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <PillButton as="link" to="/contact" variant="light" size="md">
                Get a Free Quote
              </PillButton>
            </div>

            <div className="mt-8 flex items-center">
              <BrandLogo variant="light" imageClassName="h-6 w-auto" />
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading} className="lg:col-span-2 sm:col-span-6">
              <h4 className="text-[14px] font-semibold text-background">{col.heading}</h4>
              <ul className="mt-4 space-y-2.5 text-[13px] text-background/60">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="transition-colors hover:text-background">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-6 py-6 text-[12px] text-background/65 md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            &copy; {YEAR} {siteConfig.name} (Part of The Harley Group). All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.22em]">
            Websites · Copywriting · Managed Care
          </p>
        </div>
      </div>
    </footer>
  );
}
