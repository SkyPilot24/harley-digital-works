import { Link } from "@tanstack/react-router";
import { PillButton } from "./PillButton";
import { siteConfig } from "@/lib/site-config";
import { BrandLogo } from "./BrandLogo";

const YEAR = 2026;

const COLUMNS = [
  { heading: "Services", links: [
    { label: "Web design & development", to: "/services/web-design-development" },
    { label: "AI & automation", to: "/services/ai-automation" },
    { label: "Digital transformation", to: "/services/digital-transformation" },
    { label: "All services", to: "/services" },
  ]},
  { heading: "Explore", links: [
    { label: "Selected work", to: "/work" },
    { label: "Resources", to: "/resources" },
    { label: "Domains", to: "/domains" },
  ]},
  { heading: "Company", links: [
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Privacy", to: "/privacy" },
  ]},
] as const;

export function FooterDark() {
  return (
    <footer className="bg-footer text-background">
      <div className="mx-auto max-w-[1240px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <p className="max-w-sm text-[15px] leading-relaxed text-background/70">
              Have a website, workflow or digital service that needs to work harder? Tell us what is getting in the way.
            </p>
            <div className="mt-6">
              <PillButton as="link" to="/contact" variant="light" size="md">
                Start a project
              </PillButton>
            </div>

            <div className="mt-14 flex items-center">
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
                <a href={`mailto:${siteConfig.contactEmail}`} className="break-all hover:text-background">
                  {siteConfig.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-6 py-6 text-[12px] text-background/65 md:flex-row md:items-center md:justify-between md:px-10">
          <p>&copy; {YEAR} {siteConfig.name}. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.22em]">
            Strategy · Design · Engineering
          </p>
        </div>
      </div>
    </footer>
  );
}
