import { Link } from "@tanstack/react-router";
import { PillButton } from "./PillButton";

const YEAR = 2026;

const COLUMNS = [
  {
    heading: "Services",
    links: [
      { label: "Websites", to: "/services" },
      { label: "Content engine", to: "/services/content-engine" },
      { label: "Automation", to: "/services/automation" },
      { label: "Care plans", to: "/services/care-plans" },
      { label: "Launch plan", to: "/services/launch-plan" },
    ],
  },
  {
    heading: "Portfolio",
    links: [
      { label: "Domains", to: "/domains" },
      { label: "Digital products", to: "/services/digital-products" },
      { label: "Case studies", to: "/resources" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Resources", to: "/resources" },
      { label: "Contact", to: "/contact" },
    ],
  },
] as const;

export function FooterDark() {
  return (
    <footer className="bg-footer text-background">
      <div className="mx-auto max-w-[1240px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <p className="max-w-sm text-[15px] leading-relaxed text-background/70">
              Want to work together? Send us a message and we&rsquo;ll come back
              within one working day.
            </p>
            <div className="mt-6">
              <PillButton as="link" to="/contact" variant="light" size="md">
                Get in touch
              </PillButton>
            </div>

            <div className="mt-14 flex items-baseline gap-1.5">
              <span
                className="text-[28px] font-extrabold leading-none tracking-tight text-background"
                style={{ fontFamily: "var(--font-wordmark)" }}
              >
                thg
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/50">
                digital agency
              </span>
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
                <a href="mailto:hello@thg.digital" className="hover:text-background">
                  hello@thg.digital
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-6 py-6 text-[12px] text-background/45 md:flex-row md:items-center md:justify-between md:px-10">
          <p>&copy; {YEAR} The Harley Group. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.22em]">
            Direct · Capable · Human
          </p>
        </div>
      </div>
    </footer>
  );
}
