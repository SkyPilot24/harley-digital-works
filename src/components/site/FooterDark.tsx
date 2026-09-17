import { Link } from "@tanstack/react-router";
import { PillButton } from "./PillButton";
import { siteConfig } from "@/lib/site-config";
import { BrandLogo } from "./BrandLogo";

const YEAR = 2026;

const COLUMNS = [
  {
    heading: "Websites & Care",
    links: [
      { label: "Launch Website (£1,495)", to: "/services/launch-plan" },
      { label: "Growth Website (£2,995)", to: "/services/web-design-development" },
      { label: "Pro Custom Platforms", to: "/services/digital-products" },
      { label: "Managed Care Plans", to: "/services/care-plans" },
      { label: "All Packages", to: "/services" },
    ],
  },
  {
    heading: "Popular Trades",
    links: [
      { label: "Live Trade Demos", to: "/demos" },
      { label: "Electricians & Solar", to: "/work" },
      { label: "Plumbers & Heating", to: "/work" },
      { label: "Roofers & Builders", to: "/work" },
      { label: "Free Website Check", to: "/audit" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Our Work", to: "/work" },
      { label: "Get a Free Quote", to: "/contact" },
      { label: "Privacy Policy", to: "/privacy" },
    ],
  },
] as const;

export function FooterDark() {
  return (
    <footer className="bg-footer text-background">
      <div className="mx-auto max-w-[1240px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <p className="max-w-sm text-[16px] leading-relaxed text-background/80">
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

            <div className="mt-12 flex items-center">
              <BrandLogo variant="light" imageClassName="h-6 w-auto" />
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading} className="md:col-span-2">
              <h4 className="text-[15px] font-medium text-background">{col.heading}</h4>
              <ul className="mt-5 space-y-3 text-[14px] text-background/60">
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

          <div className="md:col-span-1">
            <h4 className="text-[15px] font-medium text-background">Direct</h4>
            <ul className="mt-5 space-y-3 text-[14px] text-background/60">
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="break-all hover:text-background"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li className="text-xs text-background/40">UK Support (Mon–Fri)</li>
            </ul>
          </div>
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
