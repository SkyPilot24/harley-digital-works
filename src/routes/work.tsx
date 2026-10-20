import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  PenLine,
  ShieldCheck,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { ConceptScreen, ConceptShowcase } from "@/components/site/ConceptShowcase";
import { BeforeAfterComparison } from "@/components/site/BeforeAfterComparison";
import { WebsitePackagesSection } from "@/components/site/WebsitePackagesSection";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Before & After Showcase & Selected Work | Harley Digital Works" },
      {
        name: "description",
        content:
          "Compare outdated trades websites with modern, high-converting digital platforms across six UK trades. See the visual, mobile, and commercial difference.",
      },
      {
        property: "og:title",
        content: "Before & After Showcase & Selected Work | Harley Digital Works",
      },
      {
        property: "og:description",
        content:
          "Interactive before-and-after website redesign showcase for UK plumbing, electrical, roofing, building, landscaping, and decorating businesses.",
      },
    ],
  }),
  component: WorkPage,
});

const details = [
  {
    number: "01",
    title: "Photography and visual identity that earn trust.",
    copy: "High-resolution project photography, distinctive typography, and considered layouts that demonstrate your standard of workmanship before the client even calls.",
  },
  {
    number: "02",
    title: "Clear, commercial words written for you.",
    copy: "We articulate what you do, who you serve, and why your expertise is worth your quote. No generic placeholder text or marketing jargon.",
  },
  {
    number: "03",
    title: "A mobile journey that makes booking effortless.",
    copy: "Fast-loading pages, clear service menus, verified accreditations, and 1-tap WhatsApp and phone triage engineered for customers on their phones.",
  },
  {
    number: "04",
    title: "Managed care so your site stays sharp.",
    copy: "Managed hosting, routine maintenance and content changes within an agreed monthly allowance.",
  },
];

function WorkPage() {
  return (
    <PageShell quiet>
      <div className="studio-home">
        {/* Work Hero */}
        <section className="studio-hero" aria-labelledby="work-page-heading">
          <div className="studio-wrap hero-layout">
            <div className="hero-copy">
              <p className="studio-kicker">
                <span className="studio-kicker-line" /> BEFORE & AFTER SHOWCASE · DESIGN STUDIES
              </p>
              <h1 id="work-page-heading">
                Websites crafted
                <br />
                with purpose.
                <br />
                <span>Built to be chosen.</span>
              </h1>
              <p className="hero-description">
                See the difference between dated DIY templates and high-converting trade platforms.
              </p>
              <p className="hero-support">
                Every trade has its own character. We design websites that feel authentic to your
                workmanship, earn immediate credibility, and make quoting straightforward.
              </p>
              <div className="studio-actions">
                <PillButton as="link" to="/contact" variant="dark" className="studio-button">
                  Discuss your website
                </PillButton>
                <a href="#transformations" className="studio-text-link">
                  Explore transformations <ArrowDown size={16} />
                </a>
              </div>
            </div>

            <div className="hero-art">
              <div className="hero-art-note">
                <span>INTERACTIVE TRADE REDESIGNS</span>
                <span>↘</span>
              </div>
              <a
                href="#transformations"
                className="hero-browser"
                aria-label="Explore our before-and-after website transformations"
              >
                <span className="browser-toolbar">
                  <i />
                  <i />
                  <i />
                  <span>vanguard electrical & renewable — transformation</span>
                </span>
                <ConceptScreen concept="solar" priority />
              </a>
              <div className="hero-phone" aria-hidden="true">
                <div className="phone-speaker" />
                <ConceptScreen concept="architecture" />
              </div>
              <div className="hero-art-caption">
                <span>
                  High-craft trade design.
                  <br />
                  <strong>Zero generic templates.</strong>
                </span>
                <span className="hero-art-seal">
                  CRAFTED
                  <br />
                  <span>for</span>
                  <br />
                  IMPACT
                </span>
              </div>
            </div>
          </div>

          <div className="studio-wrap hero-footnote">
            <span>DISCIPLINED DESIGN. CLEAR WORDS. CARE.</span>
            <span>Concepts created to demonstrate commercial quality across 6 UK trades.</span>
          </div>
        </section>

        {/* 1. Primary Feature: Interactive Before & After Showcase */}
        <section
          className="studio-section py-20 bg-stone-50/80 border-y border-stone-200"
          id="transformations"
          aria-label="Before and after website design concepts"
        >
          <div className="studio-wrap">
            <BeforeAfterComparison
              initialTradeId="heating-plumbing"
              showAllTrades={true}
              title="See what your website could become"
              subtitle="Explore six illustrative trade concepts. Compare how clearer words, layout and enquiry routes change the experience."
              sectionKicker="01 / INTERACTIVE TRADE TRANSFORMATIONS"
            />
          </div>
        </section>

        {/* Conversion Opportunity: Show Us Your Website */}
        <section className="studio-section py-16 bg-white" aria-labelledby="show-us-heading">
          <div className="studio-wrap">
            <div className="rounded-3xl border border-ink/10 bg-gradient-to-br from-stone-900 to-ink p-8 sm:p-12 text-white shadow-xl">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-amber-300">
                  <Sparkles size={13} />
                  <span>FREE WEBSITE POTENTIAL AUDIT</span>
                </div>
                <h2
                  id="show-us-heading"
                  className="text-3xl sm:text-4xl font-bold font-serif text-white"
                >
                  Show Us Your Website — We’ll Show You What’s Possible.
                </h2>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  Have an existing website that isn’t pulling its weight? Share your current website
                  address with us. We’ll review your mobile layout, enquiry friction, and
                  credibility factors, then show you a clear plan of what a professional redesign
                  would deliver.
                </p>
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <PillButton
                    as="link"
                    to="/contact"
                    search={{ service: "Existing website review" }}
                    variant="light"
                    className="studio-button text-xs font-bold"
                  >
                    Request Your Free Website Review
                  </PillButton>
                  <span className="text-xs text-white/60 font-mono">
                    Zero obligation · Honest feedback from our Bristol team
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Design Studies Section */}
        <section
          className="studio-work studio-section"
          id="showcase"
          aria-labelledby="showcase-heading"
        >
          <div className="studio-wrap">
            <div className="studio-section-heading">
              <div>
                <p className="studio-kicker">02 / EDITORIAL DESIGN STUDIES</p>
                <h2 id="showcase-heading">
                  Different trades.
                  <br />
                  <span className="studio-muted">Tailored digital craft.</span>
                </h2>
              </div>
              <p>
                Explore original HTML design studies—
                <br />
                each demonstrating how architecture, typography,
                <br className="desktop-break" />
                and photography elevate different trade sectors.
              </p>
            </div>

            {/* Featured Showcase */}
            <ConceptShowcase concept="solar" featured />

            {/* Grid Showcases */}
            <div className="studio-project-grid">
              <ConceptShowcase concept="architecture" />
              <ConceptShowcase concept="interior" />
            </div>

            <p className="studio-work-note">
              Original design concepts by Harley Digital Works. Illustrative photography; not
              commissioned client endorsements. Real client case studies published under permission.
            </p>
          </div>
        </section>

        {/* Craftsmanship & Detailing Section */}
        <section className="studio-purpose studio-section" aria-labelledby="craft-heading">
          <div className="studio-wrap purpose-layout">
            <div className="purpose-visual">
              <img
                src="/images/home/architecture.jpg"
                alt="Architectural structure illustrating clean lines and proportion"
                width="1200"
                height="800"
                loading="lazy"
              />
              <span className="purpose-image-label">BUILT ON STRONG FOUNDATIONS.</span>
              <div className="purpose-annotation">
                <ArrowUpRight size={24} />
                <p>
                  Built to last.
                  <br />
                  Fast, clean, responsive.
                </p>
              </div>
            </div>

            <div className="purpose-copy">
              <p className="studio-kicker">03 / THE HARLEY STANDARD</p>
              <h2 id="craft-heading">
                What goes into
                <br />
                <span className="studio-muted">every website we build.</span>
              </h2>
              <p className="studio-intro">
                We combine visual distinction with commercial rigor. Every detail is considered
                around how customers make decisions.
              </p>

              <div className="space-y-6 pt-2">
                {details.map((item) => (
                  <div className="purpose-point" key={item.number}>
                    <span>{item.number}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Packages Integration */}
        <div className="studio-pricing">
          <WebsitePackagesSection
            title="A clear scope. Transparent investment."
            subtitle="Design, copywriting, and launch included. Choose a starting point; we’ll confirm the exact scope together."
          />
        </div>

        {/* Final CTA */}
        <section className="studio-final" aria-labelledby="work-final-heading">
          <div className="studio-wrap">
            <p className="studio-kicker">START YOUR PROJECT</p>
            <div className="final-layout">
              <h2 id="work-final-heading">
                Your business deserves
                <br />
                <span>a website like this.</span>
              </h2>
              <div>
                <p>
                  Let’s build something you are proud to show your customers. Fixed investment,
                  clear scope, and zero homework.
                </p>
                <PillButton as="link" to="/contact" variant="light" className="studio-button">
                  Let’s talk about your website
                </PillButton>
                <span className="final-price">
                  Initial build + monthly care · Scope agreed before you commit
                </span>
              </div>
            </div>
            <div className="final-reassurance">
              <span>
                <PenLine size={16} /> Copywriting included
              </span>
              <span>
                <Check size={16} /> Launch schedule agreed with you
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
