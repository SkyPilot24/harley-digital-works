import { Link } from "@tanstack/react-router";
import { Check, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { Container } from "./PageShell";
import { PillButton } from "./PillButton";

type WebsitePackage = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  badge?: string;
  popular?: boolean;
  features: string[];
  carePlanNote: string;
  ctaText: string;
  packageCode: string;
};

const WEBSITE_PACKAGES: WebsitePackage[] = [
  {
    id: "launch",
    name: "Launch Website",
    tagline: "For trades & small businesses needing a clean, fast, credible digital presence.",
    price: "£1,495",
    features: [
      "5 custom conversion-focused pages",
      "We write all the copy & curate high-res trade images",
      "Mobile-first responsive build & fast click-to-call",
      "Direct enquiry routing to your email & WhatsApp",
      "Basic local Google SEO & Google Business mapping",
      "Ready to launch live in 14 days",
    ],
    carePlanNote: "Includes 30 days of care · Then £95/mo hosting & maintenance",
    ctaText: "Choose Launch",
    packageCode: "Launch Website (£1,495)",
  },
  {
    id: "growth",
    name: "Growth Website",
    tagline:
      "For established trades looking to dominate local search & increase high-value quotes.",
    price: "£2,995",
    badge: "Most Popular",
    popular: true,
    features: [
      "Up to 10 bespoke pages & dedicated service areas",
      "Full sales copywriting & positioning for your trade",
      "Interactive quick-quote / enquiry calculator",
      "Local SEO schema markup & Google Maps ranking setup",
      "Google Reviews integration & verified trust badges",
      "Instant lead alerts straight to your phone & email",
      "Ready to launch in 14–21 days",
    ],
    carePlanNote: "Includes 30 days of care · Then £195/mo priority care & updates",
    ctaText: "Choose Growth",
    packageCode: "Growth Website (£2,995)",
  },
  {
    id: "pro",
    name: "Pro / Multi-Location",
    tagline:
      "For commercial contractors & growing service businesses requiring custom workflows.",
    price: "£4,995+",
    features: [
      "Multi-location, multi-division, or franchise architecture",
      "CRM, scheduling & booking integrations (HubSpot/Make)",
      "Automated quotation intake & tender-ready PDF case studies",
      "Advanced conversion rate tracking & Google Analytics 4",
      "Dedicated senior strategy & priority VIP turnaround",
      "Custom client portal or digital intake systems",
    ],
    carePlanNote: "Includes 60 days of care · Then £395/mo growth & automation care",
    ctaText: "Discuss Pro Scope",
    packageCode: "Pro / Custom (£4,995+)",
  },
];

export function WebsitePackagesSection({
  title = "Simple, transparent website packages.",
  subtitle = "Fixed upfront pricing. 100% done-for-you copywriting and design. Zero technical hassle.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="py-20 md:py-28" id="packages">
      <Container>
        <div className="max-w-3xl">
          <p className="eyebrow">Productised Packages</p>
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98] tracking-[-0.045em] text-ink">
            {title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{subtitle}</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {WEBSITE_PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className={`relative flex flex-col justify-between rounded-2xl border p-8 transition-all ${
                pkg.popular
                  ? "border-primary/50 bg-ink text-white shadow-xl lg:-translate-y-2"
                  : "border-ink/10 bg-white text-ink"
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 right-6 rounded-full bg-primary px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">
                  {pkg.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-2xl font-medium tracking-tight ${
                      pkg.popular ? "text-white" : "text-ink"
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  {pkg.popular ? (
                    <Sparkles className="text-primary" size={22} />
                  ) : (
                    <Zap className="text-primary" size={22} />
                  )}
                </div>

                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    pkg.popular ? "text-white/70" : "text-ink-muted"
                  }`}
                >
                  {pkg.tagline}
                </p>

                <div className="mt-6 border-y border-current/10 py-5">
                  <div className="text-xs uppercase tracking-wider opacity-60">
                    Fixed Investment
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight">{pkg.price}</span>
                    <span className="text-xs opacity-70">+ VAT</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-[14px] leading-relaxed">
                      <Check className="mt-0.5 shrink-0 text-primary" size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-current/10 pt-6">
                <div className="flex items-center gap-2 text-xs font-medium text-primary">
                  <ShieldCheck size={16} />
                  <span>{pkg.carePlanNote}</span>
                </div>

                <div className="mt-6">
                  <PillButton
                    as="link"
                    to="/contact"
                    variant={pkg.popular ? "light" : "dark"}
                    className="w-full justify-center"
                  >
                    {pkg.ctaText}
                  </PillButton>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Care Plans Continuation Highlight */}
        <div className="mt-14 rounded-2xl border border-ink/10 bg-surface-sage p-8 md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-ink/60">
                The Harley Digital Works Difference
              </div>
              <h3 className="mt-2 text-2xl font-medium tracking-tight text-ink md:text-3xl">
                We manage your digital presence so you can run your business.
              </h3>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
                Every website we deliver is backed by our managed Care Plans. From fast green
                hosting, SSL certificates, and daily cloud backups to ongoing content updates and
                security monitoring — you get a dedicated digital department without hiring staff.
              </p>
            </div>
            <div className="shrink-0">
              <PillButton as="link" to="/services/care-plans" variant="dark">
                Explore Care Plans <ArrowRight size={16} />
              </PillButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
