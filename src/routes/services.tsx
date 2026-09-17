import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Layout, ShieldCheck, Zap, Phone, CheckCircle2 } from "lucide-react";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { WebsitePackagesSection } from "@/components/site/WebsitePackagesSection";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Website Packages & Care Plans | Harley Digital Works" },
      {
        name: "description",
        content:
          "Turnkey website design, professional copywriting, and managed monthly care plans for UK trades and small businesses.",
      },
    ],
  }),
  component: Page,
});

const capabilities = [
  {
    n: "01",
    icon: Layout,
    title: "Done-For-You Websites",
    copy: "Custom, high-converting websites designed specifically for your trade. We write all the copy, source high-res photos, and launch in 14 days.",
    to: "/services/web-design-development",
    items: [
      "100% written and built for you (No homework)",
      "Mobile-first design with fast click-to-call & WhatsApp",
      "Local Google SEO & Google Business Profile mapping",
    ],
  },
  {
    n: "02",
    icon: ShieldCheck,
    title: "Website Care & Managed Hosting",
    copy: "We host, protect, and update your site every month. Just message us on WhatsApp when you need photos, prices, or details changed.",
    to: "/services/care-plans",
    items: [
      "Ultra-fast UK cloud hosting & daily off-site backups",
      "Monthly text, photo, and review edits included",
      "24/7 uptime monitoring & SSL security shields",
    ],
  },
  {
    n: "03",
    icon: Zap,
    title: "14-Day Launch Plan",
    copy: "Our rapid-delivery rhythm takes you from our first 15-minute conversation to a live, ranking website in exactly two weeks.",
    to: "/services/launch-plan",
    items: [
      "Fixed investment of £1,495 + VAT",
      "5 custom conversion pages with full copywriting",
      "30 days of free managed hosting & priority care",
    ],
  },
];

function Page() {
  return (
    <PageShell>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-background to-white/40 border-b border-ink/10">
        <Container>
          <p className="eyebrow">Our Services</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.8rem,6.5vw,5.5rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-ink">
            Websites and ongoing care.{" "}
            <span className="block text-primary">Handled so you don’t have to.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            We give tradespeople and owner-operated businesses a world-class digital presence with
            zero technical jargon, fixed upfront pricing, and complete ongoing management.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PillButton as="link" to="/contact" variant="dark" size="md">
              Get a Free Quote
            </PillButton>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="space-y-10">
            {capabilities.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.n}
                  to={c.to}
                  className="service-row group grid gap-8 rounded-3xl border border-ink/10 bg-white p-8 shadow-sm transition hover:shadow-md lg:grid-cols-[60px_1.2fr_1fr_auto] md:p-10"
                >
                  <span className="font-mono text-base font-semibold text-primary">{c.n}</span>
                  <div>
                    <div className="flex items-center gap-3">
                      <Icon size={24} className="text-primary" />
                      <h2 className="text-2xl font-semibold tracking-tight text-ink">{c.title}</h2>
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{c.copy}</p>
                  </div>
                  <ul className="space-y-2 text-xs font-medium text-ink/85">
                    {c.items.map((x) => (
                      <li key={x} className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-primary shrink-0" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="hidden lg:flex items-center">
                    <ArrowRight className="text-ink-muted group-hover:text-primary group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <WebsitePackagesSection />

      <section className="bg-ink py-20 text-background">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow text-primary">Ready to get your website sorted?</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
                Book a 15-minute call or request a quote today.
              </h2>
              <p className="mt-3 text-base text-white/70">
                No technical jargon, no pushy sales tactics. Just honest advice and a clear fixed
                price.
              </p>
            </div>
            <PillButton as="link" to="/contact" variant="light" size="md">
              Get Your Free Quote
            </PillButton>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
