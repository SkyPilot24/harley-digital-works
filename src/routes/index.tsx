import { IllustrativeTradeProof } from "@/components/site/IllustrativeTradeProof";
import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Check, PenLine, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { ConceptScreen, ConceptShowcase } from "@/components/site/ConceptShowcase";
import { BeforeAfterComparison } from "@/components/site/BeforeAfterComparison";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";
import { WebsitePackagesSection } from "@/components/site/WebsitePackagesSection";
import { TradeShowcaseSection } from "@/components/site/TradeShowcaseSection";
import { TheHarleyGroupPage } from "./the-harley-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { buildPageSeoHead } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () =>
    buildPageSeoHead({
      title: "Harley Digital Works | Websites Worth Choosing",
      description:
        "Your work deserves a better website. Website design, copywriting and ongoing digital care for UK trades. An initial build fee, a monthly service, and one team to look after your website.",
      path: "/",
    }),
  component: HomePage,
});

const faqs = [
  [
    "What do you need from me?",
    "A conversation about your business, the services you offer and the customers you want to reach. Share your logo and any project photographs you have. We write the copy and create the design; you check the facts and approve the direction.",
  ],
  [
    "How quickly can my website launch?",
    "We agree a delivery schedule after reviewing your brief, content and current capacity. You review a private preview before launch, with time for factual checks, revisions and final approval.",
  ],
  [
    "Are the websites above real client projects?",
    "They are independent design studies created to demonstrate our approach to different businesses. The names and photography are illustrative. They show design direction, not client endorsements or achieved commercial results.",
  ],
  [
    "Can I keep my domain and business email?",
    "Yes. We review your domain and email setup before planning the connection, so existing services are accounted for. You do not need to change your business name, domain or email provider to work with us.",
  ],
  [
    "What happens after launch?",
    "Your monthly service covers hosting, routine maintenance and content changes within an agreed allowance. We also check enquiry routes and identify useful improvements. Your proposal confirms the support and reporting included.",
  ],
  [
    "What is included in the price?",
    "Our managed website package is £1,495 setup, paid 50% on agreement and 50% after final preview approval, plus £249/month ongoing care. Your written quote confirms pages, copywriting, mobile optimisation, revisions, timing, ownership, cancellation terms and any applicable taxes before you commit.",
  ],
];

function HomePage() {
  return (
    <PageShell quiet>
      <div className="studio-home">
        <section className="studio-hero" aria-labelledby="hero-heading">
          <div className="studio-wrap hero-layout">
            <div className="hero-copy">
              <p className="studio-kicker">
                <span className="studio-kicker-line" /> WEBSITES & DIGITAL CARE FOR UK TRADES
              </p>
              <h1 id="hero-heading">
                Your work.
                <br />
                Deserves a<br />
                <span>better website.</span>
              </h1>
              <p className="hero-description">
                You’ve built a business to be proud of.
                <br className="hero-line-break" /> Let’s give it a website to match.
              </p>
              <p className="hero-support">
                Distinctive design, words that connect, and ongoing care. Made for ambitious trades
                and service businesses.
              </p>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 text-[11px] font-bold text-emerald-900">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Design, copy and ongoing care</span>
                </span>
              </div>
              <div className="studio-actions flex flex-wrap items-center gap-3">
                <PillButton
                  as="link"
                  to="/contact"
                  variant="dark"
                  className="studio-button min-h-[48px] px-6 text-sm font-bold shadow-md cursor-pointer"
                >
                  Get your website plan
                </PillButton>
                <PillButton
                  as="link"
                  to="/contact"
                  search={{ service: "Existing website review" }}
                  variant="ghost"
                  className="min-h-[48px] px-4 text-xs font-semibold border border-ink/20 hover:bg-ink/5 cursor-pointer"
                >
                  Discuss your existing website
                </PillButton>
                <a href="#transformations" className="studio-text-link">
                  See transformations <ArrowDown size={14} />
                </a>
              </div>
              <div className="hero-price">
                <span>Websites for Bristol, Bath and UK trade businesses</span>
                <span>£1,495 setup (50% deposit / 50% approval) · £249/mo care</span>
              </div>
            </div>
            <div className="hero-art">
              <div className="hero-art-note">
                <span>GOOD WORK DESERVES TO BE SEEN.</span>
                <span>↘</span>
              </div>
              <a
                href="#selected-work"
                className="hero-browser"
                aria-label="Explore our image-led website design studies"
              >
                <span className="browser-toolbar">
                  <i />
                  <i />
                  <i />
                  <span>form & field — independent design study</span>
                </span>
                <ConceptScreen concept="architecture" priority />
              </a>
              <div className="hero-phone" aria-hidden="true">
                <div className="phone-speaker" />
                <ConceptScreen concept="interior" />
              </div>
              <div className="hero-art-caption">
                <span>
                  Thoughtfully designed.
                  <br />
                  <strong>Down to the last detail.</strong>
                </span>
                <span className="hero-art-seal">
                  DESIGN
                  <br />
                  <span>with</span>
                  <br />
                  PURPOSE
                </span>
              </div>
            </div>
          </div>
          <div className="studio-wrap hero-footnote">
            <span>STRATEGY. DESIGN. WORDS. CARE.</span>
            <span>One studio. Your whole website.</span>
            <a href="#selected-work" aria-label="Scroll to selected design studies">
              <ArrowDown size={18} />
            </a>
          </div>
        </section>

        <section
          className="studio-work studio-section"
          id="selected-work"
          aria-labelledby="work-heading"
        >
          <div className="studio-wrap">
            <div className="studio-section-heading">
              <div>
                <p className="studio-kicker">01 / THE POSSIBILITIES</p>
                <h2 id="work-heading">
                  Different businesses.
                  <br />
                  <span className="studio-muted">Distinctive websites.</span>
                </h2>
              </div>
              <p>
                Your website should feel like your business.
                <br />
                Explore three independent design studies—
                <br className="desktop-break" />
                each with a character of its own.
              </p>
            </div>
            <ConceptShowcase concept="architecture" featured />
            <div className="studio-project-grid">
              <ConceptShowcase concept="solar" />
              <ConceptShowcase concept="interior" />
            </div>
            <p className="studio-work-note">
              Original design concepts by Harley Digital Works. Illustrative photography; not
              commissioned client projects.
            </p>
          </div>
        </section>

        {/* Prominent Transformation Preview */}
        <section
          className="studio-section py-20 bg-stone-50/80 border-y border-stone-200"
          id="transformations"
          aria-label="Before and after website design concepts"
        >
          <div className="studio-wrap">
            <BeforeAfterComparison
              initialTradeId="heating-plumbing"
              showAllTrades={true}
              featuredOnly={true}
              title="See what your website could become"
              subtitle="Compare two illustrative designs for the same trade. See how clearer words, layout and enquiry routes change the experience."
              sectionKicker="02 / BEFORE & AFTER TRANSFORMATIONS"
            />
            <div className="mt-10 pt-6 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs sm:text-sm font-medium text-ink">
                Explore further concepts for Building & Renovations, Landscaping, and Painting &
                Decorating.
              </span>
              <PillButton
                as="link"
                to="/work"
                hash="transformations"
                variant="dark"
                className="studio-button text-xs font-bold"
              >
                Explore all six trade transformations
              </PillButton>
            </div>
          </div>
        </section>

        <TradeShowcaseSection />

        <section className="studio-purpose studio-section" aria-labelledby="purpose-heading">
          <div className="studio-wrap purpose-layout">
            <div className="purpose-visual">
              <img
                src="/images/home/interior.jpg"
                alt="Considered details in a light-filled bathroom, illustrating the workmanship a website can showcase"
                width="1200"
                height="801"
                loading="lazy"
              />
              <span className="purpose-image-label">MAKE THE DETAILS COUNT.</span>
              <div className="purpose-annotation">
                <ArrowUpRight size={24} />
                <p>
                  Show the quality.
                  <br />
                  Make the choice easier.
                </p>
              </div>
            </div>
            <div className="purpose-copy">
              <p className="studio-kicker">03 / GOOD LOOKS. CLEAR PURPOSE.</p>
              <h2 id="purpose-heading">
                A beautiful website.
                <br />
                <span className="studio-muted">With a job to do.</span>
              </h2>
              <p className="studio-intro">
                Good design earns attention. The right words and a thoughtful experience turn that
                attention into a conversation.
              </p>
              <div className="purpose-point">
                <span>01</span>
                <div>
                  <h3>Look as good as your work.</h3>
                  <p>
                    Photography, typography and a clear identity that give customers a reason to
                    choose you.
                  </p>
                </div>
              </div>
              <div className="purpose-point">
                <span>02</span>
                <div>
                  <h3>Make the next step obvious.</h3>
                  <p>
                    Clear services, useful project stories and an enquiry journey that works
                    beautifully on a phone.
                  </p>
                </div>
              </div>
              <div className="purpose-point">
                <span>03</span>
                <div>
                  <h3>Keep it off your to-do list.</h3>
                  <p>
                    We write, design and build. Then we look after the website as your business
                    grows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="studio-process studio-section deferred-section"
          id="process"
          aria-labelledby="process-heading"
        >
          <div className="studio-wrap">
            <div className="studio-section-heading">
              <div>
                <p className="studio-kicker">04 / SIMPLE FROM THE START</p>
                <h2 id="process-heading">
                  You know your business.
                  <br />
                  <span className="studio-muted">We’ll take it from here.</span>
                </h2>
              </div>
              <PillButton as="link" to="/contact" variant="dark" className="studio-button">
                Start a conversation
              </PillButton>
            </div>
            <div className="process-rows">
              {[
                [
                  "01",
                  "A conversation, not a homework assignment.",
                  "Tell us what you do, who you work with and where you want to go. We turn that into a clear brief and the right scope.",
                  "DISCOVER & PLAN",
                ],
                [
                  "02",
                  "We find the words. Then bring them to life.",
                  "We write your copy, shape the design and build your website. You get a preview to explore, check and give feedback on.",
                  "WRITE, DESIGN & BUILD",
                ],
                [
                  "03",
                  "Ready for business. Looked after for the long run.",
                  "We check the details, connect your domain and launch. Your care plan keeps the site maintained and up to date.",
                  "LAUNCH & CARE",
                ],
              ].map(([number, title, copy, label]) => (
                <div className="process-row" key={number}>
                  <span className="process-number">{number}</span>
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

        <div className="studio-pricing deferred-section">
          <WebsitePackagesSection
            title="A clear investment. A better website."
            subtitle="An initial build fee. Ongoing monthly care. One clear proposal covering both."
          />
        </div>

        <section
          className="studio-founder studio-section deferred-section"
          aria-labelledby="founder-heading"
        >
          <div className="studio-wrap founder-layout">
            <div className="founder-photo">
              <img
                src="/images/home/robbie-restored.jpg"
                alt="Robbie Harley, founder of Harley Digital Works"
                width="1200"
                height="1600"
                loading="lazy"
                decoding="async"
              />
              <span>ROBBIE HARLEY / FOUNDER</span>
            </div>
            <div className="founder-copy">
              <p className="studio-kicker">A REAL PERSON. A PERSONAL COMMITMENT.</p>
              <h2 id="founder-heading">
                Proud of your business.
                <br />
                <span>
                  Personally invested
                  <br />
                  in your website.
                </span>
              </h2>
              <p>
                “Your website should do your work justice. That means taking the time to understand
                your business, caring about the details, and making the whole experience
                straightforward.”
              </p>
              <div className="founder-signature">
                <span>Robbie Harley</span>
                <small>
                  Founder, Harley Digital Works
                  <br />
                  Part of The Harley Group
                </small>
              </div>
              <Link to="/about" className="studio-text-link">
                Meet the studio <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="studio-faq studio-section deferred-section"
          aria-labelledby="faq-heading"
        >
          <div className="studio-wrap faq-layout">
            <div>
              <p className="studio-kicker">THE PRACTICAL DETAILS</p>
              <h2 id="faq-heading">
                Good questions.
                <br />
                <span className="studio-muted">Straight answers.</span>
              </h2>
              <p>Something else on your mind?</p>
              <Link
                to="/contact"
                search={{
                  service: undefined,
                  package: undefined,
                  domain: undefined,
                  websiteUrl: undefined,
                }}
                className="studio-text-link"
              >
                Just ask us <ArrowUpRight size={17} />
              </Link>
            </div>
            <Accordion type="single" collapsible>
              {faqs.map(([q, a], i) => (
                <AccordionItem key={q} value={String(i)} className="studio-faq-item">
                  <AccordionTrigger>{q}</AccordionTrigger>
                  <AccordionContent>{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="studio-final deferred-section" aria-labelledby="final-heading">
          <div className="studio-wrap">
            <p className="studio-kicker">YOUR NEXT CHAPTER STARTS HERE</p>
            <div className="final-layout">
              <h2 id="final-heading">
                Let’s make
                <br />
                <span>something great.</span>
              </h2>
              <div>
                <p>
                  A website that feels like you.
                  <br />
                  And works for your business.
                </p>
                <PillButton as="link" to="/contact" variant="light" className="studio-button">
                  Get your website plan
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
                <ShieldCheck size={16} /> Clear scope & ongoing managed care
              </span>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
