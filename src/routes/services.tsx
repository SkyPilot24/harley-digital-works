import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Check, PenLine, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { WebsitePackagesSection } from "@/components/site/WebsitePackagesSection";
import { ConceptScreen } from "@/components/site/ConceptShowcase";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Website Packages & Managed Care | Harley Digital Works" },
      {
        name: "description",
        content:
          "Turnkey website design, professional copywriting, and managed monthly care plans for UK trades and service businesses. Websites from £1,495.",
      },
      {
        property: "og:title",
        content: "Website Packages & Managed Care | Harley Digital Works",
      },
      {
        property: "og:description",
        content:
          "Bespoke websites designed and written for you, with reliable ongoing care. Fixed upfront pricing, 14-day delivery.",
      },
    ],
  }),
  component: ServicesPage,
});

const servicePillars = [
  {
    number: "01",
    title: "Done-For-You Websites",
    kicker: "TURNKEY WEB DESIGN & COPYWRITING",
    image: "/images/home/architecture.jpg",
    alt: "Considered architectural lines demonstrating clean design and structure",
    description:
      "Bespoke, high-converting websites designed specifically for your trade. We write all the sales copy, curate high-resolution photography, and build a site that earns respect.",
    to: "/services/web-design-development",
    cta: "Explore website service",
    features: [
      "100% written and built for you (zero homework)",
      "Mobile-first design with 1-tap WhatsApp & phone triage",
      "Local Google SEO schema and Google Business alignment",
      "Accreditation badges, reviews, and trust architecture",
    ],
  },
  {
    number: "02",
    title: "Website Care & Managed Hosting",
    kicker: "PEACE OF MIND & ONGOING UPDATES",
    image: "/images/home/interior.jpg",
    alt: "Interior detailing and warm lighting demonstrating attention to craft",
    description:
      "We host, protect, and update your site every month. When you need photos added, prices adjusted, or details changed, simply send us a message on WhatsApp.",
    to: "/services/care-plans",
    cta: "Explore care plans",
    features: [
      "Ultra-fast UK cloud edge hosting with daily offsite backups",
      "Monthly text, photo, and review updates included",
      "SSL maintenance, security shields, and uptime monitoring",
      "Direct WhatsApp contact without ticket queues",
    ],
  },
  {
    number: "03",
    title: "14-Day Rapid Launch Plan",
    kicker: "DISCIPLINED TWO-WEEK DELIVERY",
    image: "/images/home/solar.jpg",
    alt: "Solar panel installation demonstrating modern commercial technology",
    description:
      "Our structured delivery rhythm takes you from our first 15-minute conversation to a live, ranking website in exactly two weeks. No endless delays or forgotten projects.",
    to: "/services/launch-plan",
    cta: "Explore launch plan",
    features: [
      "Fixed investment of £1,495 + VAT",
      "Bespoke conversion pages with full commercial copywriting",
      "Initial 30 days of included managed care & priority hosting",
      "Structured review and revision preview on your mobile",
    ],
  },
];

function ServicesPage() {
  return (
    <PageShell quiet>
      <div className="studio-home">
        {/* Services Hero */}
        <section className="studio-hero" aria-labelledby="services-hero-heading">
          <div className="studio-wrap hero-layout">
            <div className="hero-copy">
              <p className="studio-kicker">
                <span className="studio-kicker-line" /> OUR SERVICES & SCOPE · UK
              </p>
              <h1 id="services-hero-heading">
                Websites & care.
                <br />
                Handled so you
                <br />
                <span>don’t have to.</span>
              </h1>
              <p className="hero-description">
                Bespoke design, persuasive words, and reliable care.
              </p>
              <p className="hero-support">
                We give trade and service businesses a world-class digital presence with zero
                technical jargon, fixed upfront pricing, and complete ongoing management.
              </p>
              <div className="studio-actions">
                <PillButton as="link" to="/contact" variant="dark" className="studio-button">
                  Request a website quote
                </PillButton>
                <a href="#services-list" className="studio-text-link">
                  Explore services <ArrowDown size={16} />
                </a>
              </div>
            </div>

            <div className="hero-art">
              <div className="hero-art-note">
                <span>TAILORED DIGITAL INFRASTRUCTURE</span>
                <span>↘</span>
              </div>
              <a
                href="#services-list"
                className="hero-browser"
                aria-label="Explore our website and care services"
              >
                <span className="browser-toolbar">
                  <i />
                  <i />
                  <i />
                  <span>harley digital works — services & packages</span>
                </span>
                <ConceptScreen concept="architecture" priority />
              </a>
              <div className="hero-art-caption">
                <span>
                  Everything included.
                  <br />
                  <strong>From words to ongoing care.</strong>
                </span>
                <span className="hero-art-seal">
                  DONE
                  <br />
                  <span>for</span>
                  <br />
                  YOU
                </span>
              </div>
            </div>
          </div>

          <div className="studio-wrap hero-footnote">
            <span>STRATEGY. DESIGN. WORDS. HOSTING. CARE.</span>
            <span>One studio. Total digital responsibility.</span>
          </div>
        </section>

        {/* 3 Main Pillars Section */}
        <section
          className="studio-work studio-section"
          id="services-list"
          aria-labelledby="pillars-heading"
        >
          <div className="studio-wrap">
            <div className="studio-section-heading">
              <div>
                <p className="studio-kicker">01 / THREE CORE CAPABILITIES</p>
                <h2 id="pillars-heading">
                  Clear solutions.
                  <br />
                  <span className="studio-muted">No hidden complexity.</span>
                </h2>
              </div>
              <p>
                Whether you need a complete new website,
                <br />
                a reliable team to look after your existing one,
                <br className="desktop-break" />
                or a fast 14-day turnaround.
              </p>
            </div>

            <div className="space-y-12">
              {servicePillars.map((pillar) => (
                <article
                  key={pillar.number}
                  className="rounded-3xl border border-ink/10 bg-[#FAF9F6] p-6 sm:p-10 transition-all hover:border-ink/20 shadow-xs"
                >
                  <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-white px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-ink border border-ink/10">
                          {pillar.number} / {pillar.kicker}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink font-display">
                        {pillar.title}
                      </h3>

                      <p className="text-base text-ink-muted leading-relaxed">{pillar.description}</p>

                      <div className="rounded-2xl bg-white border border-ink/10 p-5 space-y-2">
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-ink">
                          What is included:
                        </div>
                        <ul className="space-y-2 text-sm text-ink/80">
                          {pillar.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2">
                        <Link to={pillar.to} className="studio-text-link">
                          {pillar.cta} <ArrowUpRight size={17} />
                        </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-6">
                      <div className="relative rounded-2xl overflow-hidden border border-ink/10 shadow-md">
                        <img
                          src={pillar.image}
                          alt={pillar.alt}
                          width="1200"
                          height="800"
                          loading="lazy"
                          className="w-full h-auto object-cover max-h-[380px]"
                        />
                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-ink/10 text-xs font-mono font-bold text-ink">
                          {pillar.kicker}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing & Packages Section */}
        <div className="studio-pricing">
          <WebsitePackagesSection
            title="A clear investment. A better website."
            subtitle="Design and copywriting included. Choose a starting point; we’ll confirm the right scope together."
          />
        </div>

        {/* Simple 3-step Process */}
        <section className="studio-process studio-section" aria-labelledby="process-heading">
          <div className="studio-wrap">
            <div className="studio-section-heading">
              <div>
                <p className="studio-kicker">02 / HOW IT WORKS</p>
                <h2 id="process-heading">
                  Straightforward from day one.
                  <br />
                  <span className="studio-muted">We handle the heavy lifting.</span>
                </h2>
              </div>
              <PillButton as="link" to="/contact" variant="dark" className="studio-button">
                Book a 15-min call
              </PillButton>
            </div>

            <div className="process-rows">
              {[
                [
                  "01",
                  "A conversation, not a homework assignment.",
                  "Tell us what you do, who you serve, and what jobs you want more of. We shape the brief and agree the scope upfront.",
                  "BRIEFING & SCOPE",
                ],
                [
                  "02",
                  "We write the copy and build the site.",
                  "We produce complete sales copy, curate photography, and engineer a mobile-optimised website for your review.",
                  "DESIGN & DEVELOPMENT",
                ],
                [
                  "03",
                  "Launch and continuous care.",
                  "We connect your domain with zero downtime and activate managed monthly care to keep your site fast, secure, and updated.",
                  "LAUNCH & CARE",
                ],
              ].map(([num, title, copy, label]) => (
                <div className="process-row" key={num}>
                  <span className="process-number">{num}</span>
                  <h3>{title}</h3>
                  <div>
                    <p>{copy}</p>
                    <span className="studio-kicker">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="studio-final" aria-labelledby="services-final-heading">
          <div className="studio-wrap">
            <p className="studio-kicker">GET STARTED</p>
            <div className="final-layout">
              <h2 id="services-final-heading">
                Ready to get your
                <br />
                <span>website sorted?</span>
              </h2>
              <div>
                <p>
                  Book a quick 15-minute conversation or request a quote today. No jargon, no pushy
                  sales, just honest advice and fixed pricing.
                </p>
                <PillButton as="link" to="/contact" variant="light" className="studio-button">
                  Let’s talk about your website
                </PillButton>
                <span className="final-price">
                  Websites from £1,495 + VAT · Care from £95/month + VAT
                </span>
              </div>
            </div>
            <div className="final-reassurance">
              <span>
                <PenLine size={16} /> Copywriting included
              </span>
              <span>
                <Check size={16} /> Fixed scope agreed upfront
              </span>
              <span>
                <ShieldCheck size={16} /> Ongoing managed care
              </span>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
