import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Check, PenLine, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { ConceptScreen, ConceptShowcase } from "@/components/site/ConceptShowcase";
import { WebsitePackagesSection } from "@/components/site/WebsitePackagesSection";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Selected Work & Design Studies | Harley Digital Works" },
      {
        name: "description",
        content:
          "Explore our image-led website design studies and concept blueprints for ambitious UK trade and service businesses. Websites from £1,495.",
      },
      {
        property: "og:title",
        content: "Selected Work & Design Studies | Harley Digital Works",
      },
      {
        property: "og:description",
        content:
          "Explore independent design studies crafted with commercial discipline, clear copywriting, and considered visual craft.",
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
    copy: "Daily offsite backups, UK cloud hosting, and unlimited minor copy, photo, and pricing updates whenever your business expands.",
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
                <span className="studio-kicker-line" /> SELECTED WORK · DESIGN STUDIES
              </p>
              <h1 id="work-page-heading">
                Websites crafted
                <br />
                with purpose.
                <br />
                <span>Built to be chosen.</span>
              </h1>
              <p className="hero-description">
                Proof of craft before promises. Explore our independent design studies.
              </p>
              <p className="hero-support">
                Every business has its own character. We design websites that feel authentic to your
                work, communicate quality, and make the next step straightforward.
              </p>
              <div className="studio-actions">
                <PillButton as="link" to="/contact" variant="dark" className="studio-button">
                  Discuss your website
                </PillButton>
                <a href="#showcase" className="studio-text-link">
                  Explore the studies <ArrowDown size={16} />
                </a>
              </div>
            </div>

            <div className="hero-art">
              <div className="hero-art-note">
                <span>INDEPENDENT DESIGN STUDIES</span>
                <span>↘</span>
              </div>
              <a
                href="#showcase"
                className="hero-browser"
                aria-label="Explore our image-led design studies"
              >
                <span className="browser-toolbar">
                  <i />
                  <i />
                  <i />
                  <span>apex electrical & renewable — design study</span>
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
            <span>Concepts created to demonstrate commercial quality.</span>
          </div>
        </section>

        {/* Selected Design Studies Section */}
        <section className="studio-work studio-section" id="showcase" aria-labelledby="showcase-heading">
          <div className="studio-wrap">
            <div className="studio-section-heading">
              <div>
                <p className="studio-kicker">01 / THREE DISTINCT DIRECTIONS</p>
                <h2 id="showcase-heading">
                  Different trades.
                  <br />
                  <span className="studio-muted">Tailored digital craft.</span>
                </h2>
              </div>
              <p>
                Explore three original HTML design studies—
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
              <p className="studio-kicker">02 / THE HARLEY STANDARD</p>
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
                  Let’s build something you are proud to show your customers. Fixed investment, clear
                  scope, and zero homework.
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
                <Check size={16} /> 14-day delivery on Launch
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
