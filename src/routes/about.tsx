import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, PenLine, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { buildPageSeoHead } from "@/lib/site-config";

export const Route = createFileRoute("/about")({
  head: () =>
    buildPageSeoHead({
      title: "About the Studio | Harley Digital Works",
      description:
        "An independent British web studio dedicated to ambitious trades and service businesses. Thoughtful design, clear words, and personal commitment from Dr Robbie Harley.",
      path: "/about",
    }),
  component: AboutPage,
});

const principles = [
  {
    number: "01",
    title: "Done-for-you, from words to code.",
    copy: "We write your copy, help organise approved photography, and build a website around your business. We use proven foundations, tailored to your business, to keep delivery focused and straightforward.",
  },
  {
    number: "02",
    title: "Clear words. Zero tech jargon.",
    copy: "We explain everything in plain English. You never have to worry about DNS records, edge servers, or complicated software. We handle the mechanics.",
  },
  {
    number: "03",
    title: "Transparent scope and fixed pricing.",
    copy: "Fixed £1,495 setup investment (50% deposit / 50% on approval) and £249/mo ongoing care. Deliverables, revisions, milestones, and delivery schedule agreed in writing before work begins.",
  },
  {
    number: "04",
    title: "Ongoing managed care and peace of mind.",
    copy: "Your website is continually hosted, protected, and updated. When you need new photos, project updates, or wording changes, message us directly.",
  },
];

function AboutPage() {
  return (
    <PageShell quiet>
      <div className="studio-home">
        {/* Hero Section */}
        <section className="studio-hero" aria-labelledby="about-heading">
          <div className="studio-wrap hero-layout">
            <div className="hero-copy">
              <p className="studio-kicker">
                <span className="studio-kicker-line" /> ABOUT THE STUDIO · UK
              </p>
              <h1 id="about-heading" className="tracking-tight text-balance">
                Thoughtful design.
                <br />
                Clear words.
                <br />
                <span>A studio that cares.</span>
              </h1>
              <p className="hero-description text-balance">
                We build, write, and look after websites for people who care about their business.
                Thoughtful design, zero jargon, and ongoing peace of mind.
              </p>
              <div className="studio-actions flex flex-wrap items-center gap-3 pt-1">
                <PillButton
                  as="link"
                  to="/contact"
                  variant="dark"
                  className="studio-button min-h-[48px] px-7 text-sm font-semibold shadow-sm cursor-pointer"
                >
                  Start a conversation
                </PillButton>
                <a
                  href="#philosophy"
                  className="studio-text-link inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 transition-colors"
                >
                  <span>Our philosophy</span> <ArrowUpRight size={13} />
                </a>
              </div>
              <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600 font-medium">
                <span>Dr Robbie Harley · Founder & Managing Director</span>
                <span className="text-stone-300">|</span>
                <span>Direct senior attention on every build</span>
              </div>
            </div>

            <div className="hero-art">
              <div className="hero-art-note">
                <span>CONSIDERED CRAFTSMANSHIP</span>
                <span>↘</span>
              </div>
              <div className="founder-photo shadow-xl">
                <img
                  src="/images/home/robbie-restored.jpg"
                  alt="Dr Robbie Harley, founder of Harley Digital Works"
                  width="1200"
                  height="1600"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                <span>DR ROBBIE HARLEY / FOUNDER & MANAGING DIRECTOR</span>
              </div>
              <div className="hero-art-caption">
                <span>
                  Senior attention.
                  <br />
                  <strong>On every project.</strong>
                </span>
                <span className="hero-art-seal">
                  FOUNDED
                  <br />
                  <span>on</span>
                  <br />
                  CRAFT
                </span>
              </div>
            </div>
          </div>

          <div className="studio-wrap hero-footnote">
            <span>DISCIPLINE. DESIGN. PERSUASION. CARE.</span>
            <span>Direct senior leadership on every build.</span>
          </div>
        </section>

        {/* Philosophy & Craftsmanship Section */}
        <section
          className="studio-purpose studio-section"
          id="philosophy"
          aria-labelledby="philosophy-heading"
        >
          <div className="studio-wrap purpose-layout">
            <div className="purpose-visual">
              <img
                src="/images/home/craftsman-workshop.jpg"
                alt="Master craftsman in British workshop with trade website on laptop in background"
                width="1200"
                height="801"
                loading="lazy"
                decoding="async"
              />
              <span className="purpose-image-label">MAKE THE DETAILS COUNT.</span>
              <div className="purpose-annotation">
                <ArrowUpRight size={24} />
                <p>
                  Considered work.
                  <br />
                  Enduring results.
                </p>
              </div>
            </div>

            <div className="purpose-copy">
              <p className="studio-kicker">01 / OUR PHILOSOPHY</p>
              <h2 id="philosophy-heading">
                You run your business.
                <br />
                <span className="studio-muted">We’ll take care of the website.</span>
              </h2>
              <p className="studio-intro">
                Getting a great website shouldn’t feel like a second job. You shouldn’t have to
                spend your evenings wrestling with DIY builders, drafting sales copy, or chasing
                unreliable freelancers.
              </p>
              <div className="space-y-6 pt-4 text-base leading-relaxed text-ink/80">
                <p>
                  Led by <strong>Dr Robbie Harley</strong>, our studio combines operational
                  discipline, commercial sales copywriting, and high-performance design to give
                  ambitious businesses a digital presence that commands respect.
                </p>
                <p>
                  Every website we create is treated as a bespoke asset: tailored to your services,
                  tuned for search visibility, and backed by ongoing care so it continues to work
                  for you year after year.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Studio Principles */}
        <section
          className="studio-process studio-section deferred-section"
          aria-labelledby="principles-heading"
        >
          <div className="studio-wrap">
            <div className="studio-section-heading">
              <div>
                <p className="studio-kicker">02 / HOW WE WORK</p>
                <h2 id="principles-heading">
                  Clear principles.
                  <br />
                  <span className="studio-muted">No surprises.</span>
                </h2>
              </div>
              <PillButton as="link" to="/contact" variant="dark" className="studio-button">
                Discuss a project
              </PillButton>
            </div>

            <div className="process-rows">
              {principles.map((item) => (
                <div className="process-row" key={item.number}>
                  <span className="process-number">{item.number}</span>
                  <h3>{item.title}</h3>
                  <div>
                    <p>{item.copy}</p>
                    <span className="studio-kicker">STANDARD STUDIO COMMITMENT</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Story Section */}
        <section
          className="studio-founder studio-section deferred-section"
          aria-labelledby="founder-story-heading"
        >
          <div className="studio-wrap founder-layout">
            <div className="founder-photo">
              <img
                src="/images/home/robbie-restored.jpg"
                alt="Dr Robbie Harley"
                width="1200"
                height="1600"
                loading="lazy"
                decoding="async"
              />
              <span>ROBBIE HARLEY / MANAGING DIRECTOR</span>
            </div>
            <div className="founder-copy">
              <p className="studio-kicker">PERSONAL ACCOUNTABILITY</p>
              <h2 id="founder-story-heading">
                Built by operators.
                <br />
                <span>For real business owners.</span>
              </h2>
              <p>
                “I’m Robbie Harley. I run Harley Digital Works myself and use automation for the
                routine work, so your updates don’t wait in a queue.”
              </p>
              <p className="text-sm leading-relaxed text-ink/75">
                Harley Digital Works operates as the digital flagship of{" "}
                <strong>The Harley Group</strong>, bringing structured governance, rigorous quality
                assurance, and long-term stability to every client engagement.
              </p>
              <div className="founder-signature">
                <span>Dr Robbie Harley</span>
                <small>
                  Managing Director, Harley Digital Works
                  <br />
                  The Harley Group
                </small>
              </div>
              <div className="pt-2">
                <Link to="/the-harley-group" className="studio-text-link">
                  Learn about The Harley Group <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="studio-final deferred-section" aria-labelledby="about-final-heading">
          <div className="studio-wrap">
            <p className="studio-kicker">TAKE THE NEXT STEP</p>
            <div className="final-layout">
              <h2 id="about-final-heading">
                Ready for a website
                <br />
                <span>worth choosing?</span>
              </h2>
              <div>
                <p>
                  Tell us about your business, the work you do, and where you want to go. We’ll take
                  it from there.
                </p>
                <PillButton as="link" to="/contact" variant="light" className="studio-button">
                  Let’s talk about your website
                </PillButton>
                <span className="final-price">
                  £1,495 setup · £249/mo care · Agreed delivery schedule · 3-customer pilot (max 2
                  concurrent builds)
                </span>
              </div>
            </div>
            <div className="final-reassurance">
              <span>
                <PenLine size={16} /> 100% Copywriting included
              </span>
              <span>
                <Check size={16} /> 50% deposit / 50% on approval
              </span>
              <span>
                <ShieldCheck size={16} /> Clear scope & direct WhatsApp contact
              </span>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
