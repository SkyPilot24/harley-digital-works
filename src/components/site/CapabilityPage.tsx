import { Link } from "@tanstack/react-router";
import { Check, ArrowRight, ArrowUpRight, PenLine, ShieldCheck } from "lucide-react";
import { PageShell } from "./PageShell";
import { PillButton } from "./PillButton";
import { ConceptScreen } from "./ConceptShowcase";

export type Capability = {
  eyebrow: string;
  title: string;
  intro: string;
  problems: string[];
  deliverables: string[];
  outcomes: string[];
  related: { label: string; to: string }[];
};

export function CapabilityPage({
  data,
  children,
}: {
  data: Capability;
  children?: React.ReactNode;
}) {
  const conceptKey = data.eyebrow.toLowerCase().includes("care")
    ? "interior"
    : data.eyebrow.toLowerCase().includes("launch")
    ? "solar"
    : "architecture";

  return (
    <PageShell quiet>
      <div className="studio-home">
        {/* Studio Capability Hero */}
        <section className="studio-hero" aria-labelledby="capability-heading">
          <div className="studio-wrap hero-layout">
            <div className="hero-copy">
              <p className="studio-kicker">
                <span className="studio-kicker-line" /> {data.eyebrow.toUpperCase()} · UK
              </p>
              <h1 id="capability-heading" className="text-balance">
                {data.title}
              </h1>
              <p className="hero-description">{data.intro}</p>
              <div className="studio-actions pt-2">
                <PillButton as="link" to="/contact" variant="dark" className="studio-button">
                  Discuss this service
                </PillButton>
                <a href="#deliverables" className="studio-text-link">
                  See deliverables <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <div className="hero-art">
              <div className="hero-art-note">
                <span>CONSIDERED SPECIFICATION</span>
                <span>↘</span>
              </div>
              <div className="hero-browser">
                <span className="browser-toolbar">
                  <i />
                  <i />
                  <i />
                  <span>harley digital works — {data.eyebrow.toLowerCase()}</span>
                </span>
                <ConceptScreen concept={conceptKey} priority />
              </div>
              <div className="hero-art-caption">
                <span>
                  Fixed scope.
                  <br />
                  <strong>Zero tech jargon.</strong>
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
            <span>STRATEGY. DESIGN. EXECUTION. CARE.</span>
            <span>Tailored to ambitious trade and service businesses.</span>
          </div>
        </section>

        {/* When This Helps / The Challenges */}
        <section className="studio-purpose studio-section" aria-labelledby="challenges-heading">
          <div className="studio-wrap purpose-layout">
            <div className="purpose-visual">
              <img
                src={
                  conceptKey === "interior"
                    ? "/images/home/interior.jpg"
                    : conceptKey === "solar"
                    ? "/images/home/solar.jpg"
                    : "/images/home/architecture.jpg"
                }
                alt="Craftsmanship detail illustrating structural quality"
                width="1200"
                height="800"
                loading="lazy"
              />
              <span className="purpose-image-label">START WITH THE FRICTION.</span>
              <div className="purpose-annotation">
                <ArrowUpRight size={24} />
                <p>
                  Clear solutions.
                  <br />
                  Built around real problems.
                </p>
              </div>
            </div>

            <div className="purpose-copy">
              <p className="studio-kicker">01 / WHY AMBITIOUS BUSINESSES NEED THIS</p>
              <h2 id="challenges-heading">
                Common obstacles.
                <br />
                <span className="studio-muted">Eliminated entirely.</span>
              </h2>
              <p className="studio-intro">
                Most business owners lose profitable work not because of their trade skill, but
                because of avoidable digital friction.
              </p>

              <div className="space-y-6 pt-2">
                {data.problems.map((problem, i) => (
                  <div className="purpose-point" key={i}>
                    <span>0{i + 1}</span>
                    <div>
                      <h3>Problem solved:</h3>
                      <p>{problem}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What We Deliver */}
        <section
          className="studio-process studio-section"
          id="deliverables"
          aria-labelledby="deliverables-heading"
        >
          <div className="studio-wrap">
            <div className="studio-section-heading">
              <div>
                <p className="studio-kicker">02 / WHAT WE DELIVER</p>
                <h2 id="deliverables-heading">
                  Everything agreed upfront.
                  <br />
                  <span className="studio-muted">No hidden exclusions.</span>
                </h2>
              </div>
              <PillButton as="link" to="/contact" variant="dark" className="studio-button">
                Start a conversation
              </PillButton>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.deliverables.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-ink/10 bg-[#FAF9F6] p-7 transition hover:border-ink/20 shadow-xs flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-mono text-xs font-bold text-ink-muted">0{i + 1}</span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                      Deliverable
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-ink leading-snug">{item}</h3>
                  <div className="mt-6 pt-3 border-t border-ink/10 flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                    <Check size={15} /> Included in scope
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Children (e.g. WebsitePackagesSection) */}
        {children && <div className="studio-pricing">{children}</div>}

        {/* Outcomes & Related Navigation */}
        <section className="studio-purpose studio-section" aria-labelledby="outcomes-heading">
          <div className="studio-wrap">
            <div className="studio-section-heading">
              <div>
                <p className="studio-kicker">03 / THE COMMERCIAL RESULT</p>
                <h2 id="outcomes-heading">
                  Tangible results you can feel.
                  <br />
                  <span className="studio-muted">Confidence you can rely on.</span>
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {data.outcomes.map((outcome, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-ink/10 bg-white p-7 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-2xl font-bold text-primary">0{i + 1}</div>
                    <h3 className="mt-4 text-base font-bold text-ink">{outcome}</h3>
                  </div>
                  <div className="mt-6 pt-4 border-t border-ink/10 text-xs font-mono text-emerald-800 font-semibold flex items-center gap-1.5">
                    <Check size={14} /> Commercial outcome
                  </div>
                </div>
              ))}
            </div>

            {data.related && data.related.length > 0 && (
              <div className="mt-14 pt-8 border-t border-ink/10 flex flex-wrap items-center gap-6">
                <span className="text-xs font-mono font-bold uppercase text-ink-muted tracking-wider">
                  Related services:
                </span>
                {data.related.map((item) => (
                  <Link key={item.to} to={item.to} className="studio-text-link text-sm">
                    {item.label} <ArrowUpRight size={16} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Final CTA */}
        <section className="studio-final" aria-labelledby="capability-final-heading">
          <div className="studio-wrap">
            <p className="studio-kicker">GET IN TOUCH</p>
            <div className="final-layout">
              <h2 id="capability-final-heading">
                Let’s talk about
                <br />
                <span>your website.</span>
              </h2>
              <div>
                <p>
                  Book a quick 15-minute consultation to discuss your requirements. We’ll show you
                  exactly what we can create for your business.
                </p>
                <PillButton as="link" to="/contact" variant="light" className="studio-button">
                  Book a consultation
                </PillButton>
                <span className="final-price">
                  Websites from £1,495 + VAT · Managed care from £95/month + VAT
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
