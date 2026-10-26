import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Check, PenLine, Play, ShieldCheck, Sparkles } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { ConceptScreen, ConceptShowcase } from "@/components/site/ConceptShowcase";
import { BeforeAfterComparison } from "@/components/site/BeforeAfterComparison";
import { WebsitePackagesSection } from "@/components/site/WebsitePackagesSection";
import { TradeShowcaseSection } from "@/components/site/TradeShowcaseSection";
import { HeroTransformationVideoModal } from "@/components/site/HeroTransformationVideoModal";
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
      title: "Harley Digital Works | Websites for Electrical Contractors | Bristol & Bath",
      description:
        "Your website and enquiries, looked after. We write, build and run your website and enquiry form, so customers can reach you and you can get on with the job.",
      path: "/",
    }),
  component: HomePage,
});

const faqs = [
  [
    "Do you work with tradespeople across the whole UK?",
    "We are currently prioritising electrical contractors across Bristol, Bath and the M4 corridor for our active pilot, but we also support trade businesses across the wider UK. Everything is handled smoothly over a straightforward 20-minute phone call: zero travel, zero homework, and zero tech jargon required from you.",
  ],
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
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <PageShell quiet>
      <div className="studio-home">
        <section className="studio-hero" aria-labelledby="hero-heading">
          <div className="studio-wrap hero-layout">
            <div className="hero-copy">
              <p className="studio-kicker">
                <span className="studio-kicker-line" /> WEBSITES · ENQUIRY SYSTEMS · DIGITAL CARE
              </p>
              <h1 id="hero-heading" className="tracking-tight text-balance">
                Your website and enquiries,
                <br />
                <span>looked after.</span>
              </h1>
              <p className="hero-description text-balance">
                We write, build and look after your trade website and customer enquiries. 100%
                done-for-you copywriting, zero homework, and ongoing monthly care.
              </p>
              <div className="studio-actions flex flex-wrap items-center gap-3 pt-1">
                <PillButton
                  as="link"
                  to="/contact"
                  variant="dark"
                  className="studio-button min-h-[48px] px-7 text-sm font-semibold shadow-sm cursor-pointer"
                >
                  Get your website plan
                </PillButton>
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center gap-2.5 rounded-full border border-stone-300/80 bg-white/80 backdrop-blur-md px-5 min-h-[48px] text-xs font-semibold text-stone-800 hover:bg-white hover:border-stone-400 transition-all shadow-sm cursor-pointer"
                  aria-label="Watch the 55-second Before and After Trade Transformation video showcase"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700 text-white shadow-sm">
                    <Play className="h-2.5 w-2.5 fill-white translate-x-0.5" />
                  </span>
                  <span>Watch 55s transformation</span>
                </button>
                <a
                  href="#transformations"
                  className="studio-text-link inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 transition-colors"
                >
                  <span>See transformations</span> <ArrowDown size={13} />
                </a>
              </div>
              <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600 font-medium">
                <span className="inline-flex items-center gap-1.5 text-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Bristol, Bath & M4 Corridor · Electrical Contractors</span>
                </span>
                <span className="text-stone-300">|</span>
                <span>£1,495 setup (50% deposit / 50% approval) · £249/mo care</span>
              </div>
            </div>
            <div className="hero-art">
              <div className="hero-art-note">
                <span>BEFORE & AFTER TRANSFORMATION.</span>
                <span>↘</span>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="hero-browser group relative text-left cursor-pointer w-full focus:outline-none"
                aria-label="Click to play 55-second Before and After Trade Transformation Video"
              >
                <span className="browser-toolbar">
                  <i />
                  <i />
                  <i />
                  <span>Trade Transformation Showcase (55s) · Click to play</span>
                </span>
                <div className="relative overflow-hidden aspect-[16/10] bg-black">
                  <img
                    src="/images/home/hero-contractor.jpg"
                    alt="British trade contractor with Ford Transit van checking customer enquiries on smartphone"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="flex items-center gap-3 rounded-full bg-black/80 border border-white/20 px-4 py-2 text-white backdrop-blur-md shadow-2xl group-hover:scale-105 transition-transform">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
                        <Play className="h-3.5 w-3.5 fill-white translate-x-0.5" />
                      </span>
                      <div className="text-left">
                        <p className="text-xs font-bold tracking-tight text-white leading-tight">
                          Watch 55s Transformation
                        </p>
                        <p className="text-[10px] text-emerald-300 font-mono">
                          Old Trade Site vs HDW Platform
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <div className="hero-phone" aria-hidden="true">
                <div className="phone-speaker" />
                <img
                  src="/images/transformation-video/scene-1-frustration.jpg"
                  alt="Mobile trade website comparison"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hero-art-caption">
                <span>
                  Zero homework.
                  <br />
                  <strong>100% done-for-you copywriting.</strong>
                </span>
                <span className="hero-art-seal">
                  BRITISH
                  <br />
                  <span>trade</span>
                  <br />
                  CRAFT
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
                Explore three independent design studies:
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
                src="/images/home/heating-plant-room.jpg"
                alt="Precision plant room boiler and heating installation with bespoke copper pipework by accredited British engineers"
                width="1200"
                height="801"
                loading="lazy"
              />
              <span className="purpose-image-label">PRECISION TRADE INSTALLATION</span>
              <div className="purpose-annotation">
                <ArrowUpRight size={24} />
                <p>
                  Show the standard.
                  <br />
                  Win the quote.
                </p>
              </div>
            </div>
            <div className="purpose-copy">
              <p className="studio-kicker">04 / PURPOSE-BUILT CRAFTSMANSHIP</p>
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
                <p className="studio-kicker">05 / HOW WE WORK</p>
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
                  "Direct phone discovery.",
                  "Tell us what you do, who you work with and where you want to go. We turn that into a clear brief and a fixed project plan.",
                  "DISCOVER & PLAN",
                ],
                [
                  "02",
                  "100% Done-for-you writing & build.",
                  "We write your copy, shape the design and assemble your website. You get a private preview to explore, check the facts and approve.",
                  "WRITE, DESIGN & BUILD",
                ],
                [
                  "03",
                  "Launch & ongoing managed care.",
                  "We connect your domain, preserve your business email, and launch. Your care plan keeps the site secure, fast, and maintained.",
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

        {/* What We Commit To Section */}
        <section
          className="py-16 md:py-24 bg-[#081B30] text-white border-y border-white/10 deferred-section"
          aria-labelledby="commitments-heading"
        >
          <div className="studio-wrap">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xs text-left space-y-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="h-6 w-6 text-emerald-400" />
                      <div>
                        <div className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                          The Harley Standard
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Governance & Quality Assurance
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                      Zero Risk
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-slate-400">Payment Security</span>
                      <span className="font-semibold text-white">50% upon final approval</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-slate-400">Copywriting</span>
                      <span className="font-semibold text-emerald-400">100% Done-for-you</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-slate-400">Asset Ownership</span>
                      <span className="font-semibold text-white">100% Client-owned</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-slate-400">Care Plan Notice</span>
                      <span className="font-semibold text-white">30 days fair exit</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#173C62]/30 border border-[#173C62]/40 p-3.5 text-[11px] text-slate-300">
                    <p className="leading-relaxed">
                      Backed by The Harley Group. Every build is individually inspected and approved
                      before public launch.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div>
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    06 / WHAT WE COMMIT TO
                  </p>
                  <h2
                    id="commitments-heading"
                    className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-display"
                  >
                    What we commit to.
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                    Clear terms, written in advance, and designed to protect your trade business:
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 pt-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-1.5">
                    <div className="text-emerald-400 font-mono text-xs font-bold uppercase flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Full Final Approval</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      You approve the facts and the finished site before it goes live.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-1.5">
                    <div className="text-emerald-400 font-mono text-xs font-bold uppercase flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>50/50 Split Payment</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      The 50% balance is only due after you approve.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-1.5">
                    <div className="text-emerald-400 font-mono text-xs font-bold uppercase flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Your Assets, Always</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      You keep your domain and brand assets.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-1.5">
                    <div className="text-emerald-400 font-mono text-xs font-bold uppercase flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Fair Flexibility</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      Cancel on 30 days’ notice and get a static export.
                    </p>
                  </div>

                  <div className="sm:col-span-2 rounded-xl border border-white/10 bg-white/5 p-4 space-y-1.5">
                    <div className="text-emerald-400 font-mono text-xs font-bold uppercase flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Everything in Writing</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      Scope, support hours and timings are in writing before you pay.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <PillButton as="link" to="/contact" variant="light" className="studio-button">
                    Get your website plan
                  </PillButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="studio-pricing deferred-section">
          <WebsitePackagesSection
            kicker="07 / A CLEAR INVESTMENT"
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
              <p className="studio-kicker">08 / FOUNDER ACCOUNTABILITY</p>
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
              <div className="founder-signature flex items-center justify-between gap-6 flex-wrap">
                <div>
                  <span>Robbie Harley</span>
                  <small>
                    Founder, Harley Digital Works
                    <br />
                    Part of The Harley Group
                  </small>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 shrink-0 text-left">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Backed by The Harley Group</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Direct founder oversight on every project
                  </div>
                </div>
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
              <p className="studio-kicker">09 / FREQUENT QUESTIONS</p>
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
            <p className="studio-kicker">10 / LET’S MAKE SOMETHING GREAT</p>
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
      <HeroTransformationVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </PageShell>
  );
}
