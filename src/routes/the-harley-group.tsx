import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, PenLine, ShieldCheck, Building2, Globe2, Cpu } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";

export const Route = createFileRoute("/the-harley-group")({
  head: () => ({
    meta: [
      { title: "The Harley Group | Parent Company Governance & Portfolio" },
      {
        name: "description",
        content:
          "The Harley Group oversees specialised digital, technology, and operating ventures including Harley Digital Works and Harley Labs, delivering institutional discipline and commercial clarity.",
      },
      {
        property: "og:title",
        content: "The Harley Group | Parent Company Governance & Portfolio",
      },
    ],
  }),
  component: TheHarleyGroupPage,
});

const VENTURES = [
  {
    number: "01",
    name: "Harley Digital Works",
    kicker: "FLAGSHIP COMMERCIAL DIVISION",
    tagline: "Turnkey web design, sales copywriting & managed monthly care for UK trades.",
    description:
      "Delivering done-for-you website builds, high-converting commercial sales copy, local Google SEO alignment, and full ongoing care plans for UK trades, contractors, and growing business operators.",
    metrics: ["14-Day Delivery", "100% Done-For-You", "Managed Care Plans"],
    to: "/services",
    ctaLabel: "Explore Digital Works",
    image: "/images/home/architecture.jpg",
  },
  {
    number: "02",
    name: "Harley Labs",
    kicker: "ENGINEERING & R&D DIVISION",
    tagline: "High-performance edge architectures & proprietary operational tooling.",
    description:
      "Engineering zero-cold-start edge rendering systems, algorithmic local search diagnostics, and internal operating tools (Revenue OS, Domain OS) that power high-efficiency digital workflows.",
    metrics: ["Sub-50ms Edge SSR", "Revenue OS Tooling", "Domain Infrastructure"],
    to: "/labs",
    ctaLabel: "Explore Harley Labs",
    image: "/images/home/solar.jpg",
  },
];

const OPERATING_PRINCIPLES = [
  {
    number: "01",
    title: "Commercial Clarity",
    copy: "Every project, software framework, and digital asset must directly connect to tangible customer revenue, qualified lead flow, and operational efficiency. We eliminate vanity metrics.",
  },
  {
    number: "02",
    title: "Institutional Rigour",
    copy: "Enterprise-grade reliability, continuous automated backups, strict data security (GDPR & Cyber Essentials), and zero-downtime edge deployments applied uniformly across all group ventures.",
  },
  {
    number: "03",
    title: "Senior Accountability",
    copy: "Direct executive leadership from Dr Robbie Harley, plain-English communication, transparent upfront pricing, and absolute ownership without corporate transformation theatre.",
  },
];

const GOVERNANCE_RECORDS = [
  { label: "Parent Entity", value: "The Harley Group Ltd" },
  { label: "Jurisdiction", value: "England & Wales (United Kingdom)" },
  { label: "Corporate HQ", value: "Manchester, United Kingdom" },
  { label: "Core Operating Divisions", value: "Harley Digital Works & Harley Labs" },
  { label: "Regulatory Compliance", value: "GDPR, Cyber Essentials, ICO Registered" },
  { label: "Leadership", value: "Dr Robbie Harley, MBA (Managing Director)" },
];

function TheHarleyGroupPage() {
  return (
    <PageShell quiet>
      <div className="studio-home">
        {/* Hero Section */}
        <section className="studio-hero" aria-labelledby="thg-heading">
          <div className="studio-wrap hero-layout">
            <div className="hero-copy">
              <p className="studio-kicker">
                <span className="studio-kicker-line" /> THE HARLEY GROUP · HOLDING & OPERATING COMPANY
              </p>
              <h1 id="thg-heading">
                Institutional
                <br />
                discipline.
                <br />
                <span>Long-term value.</span>
              </h1>
              <p className="hero-description">
                The Harley Group oversees specialised digital, technology, and operating ventures in the United Kingdom.
              </p>
              <p className="hero-support">
                Combining executive operational leadership, commercial understanding, and software
                engineering to build enduring digital capabilities.
              </p>
              <div className="studio-actions">
                <PillButton as="link" to="/services" variant="dark" className="studio-button">
                  Explore Commercial Portfolio
                </PillButton>
                <a href="#divisions" className="studio-text-link">
                  Operating Divisions <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            <div className="hero-art">
              <div className="hero-art-note">
                <span>EXECUTIVE GOVERNANCE</span>
                <span>↘</span>
              </div>
              <div className="founder-photo shadow-xl">
                <img
                  src="/images/home/robbie-restored.jpg"
                  alt="Dr Robbie Harley, founder of The Harley Group"
                  width="1200"
                  height="1600"
                  loading="eager"
                />
                <span>DR ROBBIE HARLEY / MANAGING DIRECTOR</span>
              </div>
              <div className="hero-art-caption">
                <span>
                  Disciplined delivery.
                  <br />
                  <strong>Senior oversight.</strong>
                </span>
                <span className="hero-art-seal">
                  HARLEY
                  <br />
                  <span>group</span>
                  <br />
                  UK
                </span>
              </div>
            </div>
          </div>

          <div className="studio-wrap hero-footnote">
            <span>DISCIPLINE. GOVERNANCE. VALUE. CARE.</span>
            <span>Parent entity to Harley Digital Works and Harley Labs.</span>
          </div>
        </section>

        {/* Operating Divisions */}
        <section className="studio-work studio-section" id="divisions" aria-labelledby="divisions-heading">
          <div className="studio-wrap">
            <div className="studio-section-heading">
              <div>
                <p className="studio-kicker">01 / PORTFOLIO ARCHITECTURE</p>
                <h2 id="divisions-heading">
                  Two specialized
                  <br />
                  <span className="studio-muted">operating divisions.</span>
                </h2>
              </div>
              <p>
                Uniting commercial client delivery
                <br />
                with high-performance software engineering
                <br className="desktop-break" />
                and R&D capabilities.
              </p>
            </div>

            <div className="space-y-12">
              {VENTURES.map((venture) => (
                <article
                  key={venture.number}
                  className="rounded-3xl border border-ink/10 bg-[#FAF9F6] p-6 sm:p-10 shadow-xs"
                >
                  <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-6 space-y-4">
                      <span className="rounded-full bg-white px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-ink border border-ink/10">
                        {venture.number} / {venture.kicker}
                      </span>

                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink font-display">
                        {venture.name}
                      </h3>

                      <p className="text-base text-ink-muted leading-relaxed">{venture.tagline}</p>

                      <p className="text-sm text-ink/80 leading-relaxed">{venture.description}</p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {venture.metrics.map((metric, i) => (
                          <span
                            key={i}
                            className="bg-white border border-ink/10 px-3 py-1 rounded-lg text-xs font-mono font-semibold text-ink/80"
                          >
                            ✓ {metric}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3">
                        <Link to={venture.to} className="studio-text-link">
                          {venture.ctaLabel} <ArrowUpRight size={17} />
                        </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-6">
                      <div className="relative rounded-2xl overflow-hidden border border-ink/10 shadow-md">
                        <img
                          src={venture.image}
                          alt={venture.name}
                          width="1200"
                          height="800"
                          loading="lazy"
                          className="w-full h-auto object-cover max-h-[360px]"
                        />
                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-ink/10 text-xs font-mono font-bold text-ink">
                          {venture.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Operating Principles */}
        <section className="studio-process studio-section" aria-labelledby="group-principles-heading">
          <div className="studio-wrap">
            <div className="studio-section-heading">
              <div>
                <p className="studio-kicker">02 / OPERATING STANDARD</p>
                <h2 id="group-principles-heading">
                  Governed by clear
                  <br />
                  <span className="studio-muted">operating principles.</span>
                </h2>
              </div>
            </div>

            <div className="process-rows">
              {OPERATING_PRINCIPLES.map((item) => (
                <div className="process-row" key={item.number}>
                  <span className="process-number">{item.number}</span>
                  <h3>{item.title}</h3>
                  <div>
                    <p>{item.copy}</p>
                    <span className="studio-kicker">HARLEY GROUP PILLAR</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Corporate Governance Table */}
        <section className="studio-purpose studio-section" aria-labelledby="gov-heading">
          <div className="studio-wrap purpose-layout">
            <div className="purpose-visual">
              <img
                src="/images/home/interior.jpg"
                alt="Architectural details demonstrating structured quality"
                width="1200"
                height="801"
                loading="lazy"
              />
              <span className="purpose-image-label">STRUCTURED GOVERNANCE.</span>
            </div>

            <div className="purpose-copy">
              <p className="studio-kicker">03 / CORPORATE REGISTRATION</p>
              <h2 id="gov-heading">
                Institutional structure.
                <br />
                <span className="studio-muted">Clear corporate backing.</span>
              </h2>

              <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
                {GOVERNANCE_RECORDS.map((rec) => (
                  <div key={rec.label} className="py-3.5 flex justify-between items-center text-sm">
                    <span className="font-mono text-xs font-bold text-ink-muted uppercase">
                      {rec.label}
                    </span>
                    <span className="font-medium text-ink text-right">{rec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="studio-final" aria-labelledby="thg-final-heading">
          <div className="studio-wrap">
            <p className="studio-kicker">EXECUTIVE CONTACT</p>
            <div className="final-layout">
              <h2 id="thg-final-heading">
                Discuss a venture
                <br />
                <span>or commercial brief.</span>
              </h2>
              <div>
                <p>
                  Get in touch with executive leadership to discuss commercial services, technology
                  partnerships, or corporate enquiries.
                </p>
                <PillButton as="link" to="/contact" variant="light" className="studio-button">
                  Start a conversation
                </PillButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
