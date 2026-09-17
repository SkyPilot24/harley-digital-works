import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { ArrowRight, CheckCircle2, Star, TrendingUp, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Selected Work | Harley Digital Works" },
      {
        name: "description",
        content:
          "Proven website builds and lead generation case studies for UK electrical contractors, roofing specialists, and commercial service businesses.",
      },
    ],
  }),
  component: Page,
});

const caseStudies = [
  {
    category: "Electrical & Solar Contractors",
    title: "Apex Electrical: From zero web presence to 12 commercial contract enquiries per month.",
    client: "Apex Electrical & Renewable Energy Ltd",
    challenge:
      "Apex had relied solely on word-of-mouth and a broken 6-year-old DIY template. They were missing out on profitable commercial solar, EV charger, and industrial fit-out tenders in Greater Manchester.",
    approach:
      "We wrote complete sales copy, highlighted commercial accreditations (NICEIC, MCS, OZEV), built targeted local service pages, and engineered an instant quote estimator with direct WhatsApp routing.",
    delivered: [
      "Brand & Logo Modernisation",
      "Full Sales Copywriting & Photography",
      "Local Google SEO & Schema",
      "Interactive Quote Estimator",
      "WhatsApp & Direct Phone Routing",
      "Managed Hosting & Monthly Care",
    ],
    outcome:
      "Within 60 days of launch, inbound quote requests rose by +140%, with 3 commercial solar contracts won directly through the website.",
    metric: "+140% Qualified Inbound Leads",
  },
  {
    category: "Roofing & Construction",
    title:
      "Vanguard Roofing: Dominating local emergency repair search and securing high-value reroofs.",
    client: "Vanguard Roofing Specialists",
    challenge:
      "Homeowners in storm season needed urgent emergency roof repairs, but Vanguard's old site was slow, not mobile-friendly, and lacked clear trust signals or verified reviews.",
    approach:
      "We built a mobile-optimised, lightning-fast website featuring 1-tap emergency calling, dynamic Google Reviews sync, before-and-after project sliders, and transparent pricing guides.",
    delivered: [
      "Emergency Click-to-Call Funnel",
      "Google Reviews Live Integration",
      "Before & After Project Showcase",
      "Local Postcode SEO Pages",
      "30-Day Managed Care Plan",
    ],
    outcome:
      "Achieved #1 local Google Maps ranking for emergency roof repairs and generated 28 domestic reroof enquiries in their first quarter.",
    metric: "#1 Google Maps Ranking & 28 Reroof Enquiries",
  },
  {
    category: "Commercial Facilities",
    title:
      "ProClean Group: Positioning an independent operator to win multi-site facilities tenders.",
    client: "ProClean Commercial Facilities",
    challenge:
      "ProClean wanted to transition from domestic cleaning to lucrative corporate office and healthcare cleaning contracts, but their digital image did not look tender-ready.",
    approach:
      "We repositioned the brand with an authoritative corporate design, bespoke B2B sector pages (Healthcare, Education, Corporate), and downloadable tender-ready capability brochures.",
    delivered: [
      "Corporate Digital Positioning",
      "B2B Compliance & Accreditation Badges",
      "Multi-Location Service Pages",
      "Automated Booking & Intake Workflows",
      "Managed Security & Priority Support",
    ],
    outcome:
      "Successfully secured 3 multi-site commercial cleaning contracts in their first 6 months, expanding their team by 8 cleaners.",
    metric: "3 Multi-Site Corporate Contracts Won",
  },
];

function Page() {
  return (
    <PageShell>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-background to-white/40 border-b border-ink/10">
        <Container>
          <div className="max-w-4xl">
            <p className="eyebrow">Our Portfolio</p>
            <h1 className="mt-6 text-[clamp(2.8rem,6.5vw,5.5rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-ink">
              Websites built to win work.{" "}
              <span className="block text-primary">Proven results for real businesses.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
              We help UK tradespeople and service businesses turn their online presence into their
              hardest-working sales asset. Here is how we do it.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="space-y-16">
            {caseStudies.map((study, i) => (
              <article
                key={study.title}
                className="grid gap-10 rounded-3xl border border-ink/10 bg-white p-8 shadow-sm lg:grid-cols-12 md:p-12"
              >
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                      0{i + 1} · {study.category}
                    </span>
                    <h2 className="mt-4 text-2xl font-semibold leading-tight text-ink md:text-3xl">
                      {study.title}
                    </h2>
                    <p className="mt-3 text-sm text-ink-muted font-medium">
                      Client: {study.client}
                    </p>
                  </div>

                  <div className="mt-8 rounded-2xl bg-surface-sage p-5 border border-ink/5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/70">
                      <TrendingUp size={16} className="text-primary" /> Key Commercial Result
                    </div>
                    <div className="mt-2 text-lg font-semibold text-ink">{study.metric}</div>
                  </div>
                </div>

                <div className="space-y-6 lg:col-span-7">
                  <div className="border-t border-ink/10 pt-5">
                    <div className="text-xs font-mono uppercase tracking-wider text-ink-muted font-semibold">
                      The Challenge
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink">{study.challenge}</p>
                  </div>

                  <div className="border-t border-ink/10 pt-5">
                    <div className="text-xs font-mono uppercase tracking-wider text-ink-muted font-semibold">
                      Our Approach
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink">{study.approach}</p>
                  </div>

                  <div className="border-t border-ink/10 pt-5">
                    <div className="text-xs font-mono uppercase tracking-wider text-ink-muted font-semibold">
                      What We Delivered
                    </div>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {study.delivered.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-xs text-ink/85 font-medium"
                        >
                          <CheckCircle2 size={15} className="text-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-ink/10 pt-5">
                    <div className="text-xs font-mono uppercase tracking-wider text-ink-muted font-semibold">
                      The Outcome
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink font-medium">
                      {study.outcome}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Box */}
      <section className="pb-24">
        <Container>
          <div className="rounded-3xl bg-ink p-8 md:p-14 text-white shadow-2xl border border-white/10">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              Ready to get your business looking this professional?
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/70">
              Get in touch today for a free 15-minute consultation. We’ll show you exactly what your
              new website could look like.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <PillButton as="link" to="/contact" variant="light" size="md">
                Get a Free Website Quote
              </PillButton>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
