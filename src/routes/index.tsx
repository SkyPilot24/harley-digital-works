import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Phone,
  MessageSquare,
  ShieldCheck,
  Zap,
  Sparkles,
  Clock,
  PenTool,
  Headphones,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { WebsitePackagesSection } from "@/components/site/WebsitePackagesSection";
import { TradeRoiCalculator } from "@/components/site/TradeRoiCalculator";
import { TradeGoogleReviewsWidget } from "@/components/site/TradeGoogleReviewsWidget";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harley Digital Works | Websites for Trades & Small Businesses" },
      {
        name: "description",
        content:
          "You run your business. We’ll handle your website. Done-for-you websites, professional copywriting, and managed monthly care for UK trades and small businesses.",
      },
      {
        property: "og:title",
        content: "Harley Digital Works | Done-For-You Websites for Trades & Small Businesses",
      },
      {
        property: "og:description",
        content:
          "High-performing websites, professional copywriting, and managed monthly care. Launched in 14 days with zero technical hassle.",
      },
    ],
  }),
  component: HomePage,
});

const PILLARS = [
  {
    number: "01",
    icon: Zap,
    title: "High-Converting Trade Design",
    copy: "Bespoke, razor-sharp design tailored to your trade that builds instant trust and makes you look like the #1 choice in your area.",
    outcomes: [
      "Mobile-first for on-the-go customers",
      "Fast click-to-call & WhatsApp links",
      "Google Maps & review integration",
    ],
  },
  {
    number: "02",
    icon: PenTool,
    title: "100% Done-For-You Copy & Images",
    copy: "No homework for you. We write your sales copy, research your trade, and curate high-resolution imagery so you never stare at a blank screen.",
    outcomes: [
      "Clear service descriptions",
      "Local keyword targeting",
      "Professional trade photography",
    ],
  },
  {
    number: "03",
    icon: Headphones,
    title: "Managed Care & Unlimited Edits",
    copy: "We host, secure, and update your site every month. When you want a photo, price, or review updated, simply message us on WhatsApp.",
    outcomes: [
      "Ultra-fast UK cloud hosting",
      "Daily cloud backups & SSL",
      "Unlimited monthly text & photo updates",
    ],
  },
] as const;

const PROCESS_STEPS = [
  {
    number: "01",
    title: "15-Minute Intro Chat",
    copy: "Tell us about your trade, your best services, and where you work. No technical jargon, no long forms.",
  },
  {
    number: "02",
    title: "We Build & Write Everything",
    copy: "Our team writes all the sales copy, curates professional photography, and builds your custom website within 10 days.",
  },
  {
    number: "03",
    title: "Review & Launch in 14 Days",
    copy: "We review the live preview together, make any tweaks you want, connect your domain, and launch to Google.",
  },
] as const;

const TRAP_PROBLEMS = [
  {
    title: "The DIY Wix / Squarespace Trap",
    copy: "You spend 40+ hours fighting templates after a long day on tools, only for the site to look amateur and generate zero phone calls.",
  },
  {
    title: "The Ghosting Freelancer",
    copy: "They take months to build half a site, charge you for unexpected extras, and disappear when you need an urgent change or fix.",
  },
  {
    title: "The 'Homework' Agency",
    copy: "Traditional agencies charge £5,000+ and demand that you write all the copy, supply photos, and manage the technical setup yourself.",
  },
  {
    title: "The Abandoned Broken Site",
    copy: "The site goes live, plugin updates break the layout, security expires, and you have nobody reliable to call for help.",
  },
] as const;

const FAQS = [
  {
    q: "Do I have to write the website text or supply all the photos?",
    a: "No. That is our job. We write all the industry-specific sales copy and curate professional high-definition imagery for your trade. You just review and give us the thumbs-up.",
  },
  {
    q: "How much of my time is required?",
    a: "Less than 45 minutes total. A 15-minute intro chat so we understand your services, and a 20-minute review call before we launch your site to the public.",
  },
  {
    q: "What happens when I want to change a phone number, price, or photo later?",
    a: "Every website includes our Managed Care Plan. Whenever you need an update, just message us on WhatsApp or send an email, and our UK team will update it for you within 24 hours.",
  },
  {
    q: "Do I own my website and domain name?",
    a: "Yes, 100%. You own your domain, your content, and your website assets. There are no lock-in traps or hidden transfer fees.",
  },
  {
    q: "How fast will my website be live?",
    a: "Our standard delivery rhythm is 14 days from our initial 15-minute call to full public launch on Google.",
  },
] as const;

function HomePage() {
  return (
    <PageShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-ink/10 pt-28 md:pt-36 bg-gradient-to-b from-background to-white/40">
        <Container>
          <div className="grid gap-12 py-12 lg:grid-cols-12 lg:items-center lg:py-20">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-ink">
                <Sparkles size={14} className="text-primary" />
                <span>Done-For-You Websites For UK Trades & Businesses</span>
              </div>

              <h1 className="mt-6 text-[clamp(2.9rem,6.8vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-ink">
                You run your business.{" "}
                <span className="block text-primary">We’ll handle your website.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
                Get a high-performing, professionally built website that wins you more
                customers—without writing a single line of copy or touching a server. 100% built,
                written, and managed for you.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PillButton
                  as="link"
                  to="/contact"
                  variant="dark"
                  size="md"
                  className="gap-2 shadow-lg shadow-ink/10"
                >
                  Get a Free 60-Sec Quote <ArrowRight size={16} />
                </PillButton>
                <PillButton
                  as="link"
                  to="/work"
                  variant="ghost"
                  size="md"
                  className="border border-ink/15"
                >
                  See Live Trade Examples
                </PillButton>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3 pt-6 border-t border-ink/10 sm:grid-cols-4 text-xs font-medium text-ink">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span>Launched in 14 Days</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span>We Write The Copy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span>Zero Tech Hassle</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span>UK Managed Care</span>
                </div>
              </div>
            </div>

            {/* Realistic Hero Visual Mockup */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md rounded-3xl bg-ink p-5 shadow-2xl border border-white/10 text-white">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs text-white/60">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 font-mono text-[10px] text-white/40">
                      harleydigitalworks.com/preview
                    </span>
                  </div>
                  <span className="rounded bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    LIVE DEMO
                  </span>
                </div>

                {/* Simulated Trade Website Preview */}
                <div className="mt-4 rounded-xl bg-works-charcoal p-5 border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-primary">
                        Kavanagh Heating & Solar
                      </div>
                      <div className="text-sm font-medium text-white">
                        Emergency Boiler & Heat Pump Specialists
                      </div>
                    </div>
                    <div className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      4.9 ★★★★★
                    </div>
                  </div>

                  <div className="rounded-lg bg-black/40 p-4 border border-white/5">
                    <p className="text-xs text-white/80 leading-relaxed">
                      "Fast quote response, polite engineer, and boiler replaced in 24 hours. Highly
                      recommended!"
                    </p>
                    <div className="mt-2 text-[10px] text-white/40">
                      — Verified Google Review · Manchester
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-primary p-2.5 text-center text-xs font-semibold text-ink flex items-center justify-center gap-1.5">
                      <Phone size={13} />
                      <span>0161 706 1420</span>
                    </div>
                    <div className="rounded-lg bg-white/10 p-2.5 text-center text-xs font-medium text-white flex items-center justify-center gap-1.5">
                      <MessageSquare size={13} />
                      <span>WhatsApp Quote</span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-emerald-950/40 border border-emerald-500/30 p-3 flex items-center justify-between text-xs text-emerald-300">
                    <div className="flex items-center gap-2">
                      <Zap size={14} className="text-emerald-400" />
                      <span>New Enquiry Received (2 mins ago)</span>
                    </div>
                    <span className="font-mono font-semibold">£3,850 Quote</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] text-white/50 pt-2 border-t border-white/5">
                  <span>✓ 100% Mobile Optimised</span>
                  <span>✓ Managed Care Included</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust & Guarantee Strip */}
      <section className="border-b border-ink/10 bg-white py-8">
        <Container>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <Clock className="text-primary shrink-0" size={24} />
              <div>
                <div className="text-sm font-semibold text-ink">14-Day Delivery</div>
                <div className="text-xs text-ink-muted">From kickoff call to Google launch</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PenTool className="text-primary shrink-0" size={24} />
              <div>
                <div className="text-sm font-semibold text-ink">We Write All Copy</div>
                <div className="text-xs text-ink-muted">Zero homework or writing for you</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-primary shrink-0" size={24} />
              <div>
                <div className="text-sm font-semibold text-ink">Managed Monthly Care</div>
                <div className="text-xs text-ink-muted">Fast hosting, backups & edits</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-primary shrink-0" size={24} />
              <div>
                <div className="text-sm font-semibold text-ink">Direct UK Support</div>
                <div className="text-xs text-ink-muted">Phone, email & WhatsApp access</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The Problem / Reality Check */}
      <section className="bg-ink py-20 text-background md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="eyebrow text-primary">Tired of website headaches?</p>
              <h2 className="mt-4 text-[clamp(2.3rem,4.5vw,3.8rem)] leading-[0.98] tracking-[-0.04em]">
                Getting a great website shouldn't feel like a full-time job.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-background/70">
                Most trades and business owners have been burnt by DIY templates or unreliable
                freelancers. We designed Harley Digital Works to take the entire headache off your
                plate.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {TRAP_PROBLEMS.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl bg-works-charcoal p-6 border border-white/5"
                >
                  <div className="text-sm font-semibold text-white">{p.title}</div>
                  <p className="mt-2 text-xs leading-relaxed text-background/65">{p.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* The Done-For-You Pillars */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow">The Harley Digital Works Solution</p>
            <h2 className="mt-4 text-[clamp(2.3rem,4.5vw,4rem)] leading-[0.98] tracking-[-0.045em] text-ink">
              Everything your business needs to win online. Done for you.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              We don't hand you an empty template. We deliver a complete, finished digital presence
              engineered to win commercial and domestic enquiries.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="relative flex flex-col justify-between rounded-2xl border border-ink/10 bg-white p-8 shadow-sm transition hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-ink-muted">{pillar.number}</span>
                      <Icon size={22} className="text-primary" />
                    </div>
                    <h3 className="mt-6 text-xl font-medium text-ink">{pillar.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{pillar.copy}</p>
                  </div>
                  <ul className="mt-6 space-y-2 border-t border-ink/10 pt-5 text-xs text-ink/80">
                    {pillar.outcomes.map((o) => (
                      <li key={o} className="flex items-center gap-2">
                        <Check size={14} className="text-primary shrink-0" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Selected Work & Live Proof */}
      <section className="border-y border-ink/10 bg-surface-sage/30 py-20 md:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Selected Work</p>
              <h2 className="mt-4 text-[clamp(2.3rem,4.5vw,4rem)] leading-none tracking-[-0.045em] text-ink">
                Websites built to win work.
              </h2>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-primary transition"
            >
              Explore all case studies <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
              <div className="font-mono text-[11px] uppercase tracking-wider text-primary">
                Electrical & Solar
              </div>
              <h3 className="mt-2 text-lg font-semibold text-ink">Apex Electrical Contractors</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                Full rebrand, local service pages, and automated commercial quotation intake.
              </p>
              <div className="mt-4 rounded-lg bg-surface-sage p-3 text-xs font-medium text-ink">
                📈 +140% commercial enquiry volume in 60 days
              </div>
            </article>

            <article className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
              <div className="font-mono text-[11px] uppercase tracking-wider text-primary">
                Roofing & Building
              </div>
              <h3 className="mt-2 text-lg font-semibold text-ink">Vanguard Roofing Specialists</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                Emergency roof repair funnels, project gallery showcase, and Google Reviews sync.
              </p>
              <div className="mt-4 rounded-lg bg-surface-sage p-3 text-xs font-medium text-ink">
                ⭐ #1 local Google Maps ranking for emergency repairs
              </div>
            </article>

            <article className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
              <div className="font-mono text-[11px] uppercase tracking-wider text-primary">
                Commercial Services
              </div>
              <h3 className="mt-2 text-lg font-semibold text-ink">ProClean Facilities Group</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                Tender-ready contractor presentation, client portal, and multi-service B2B booking.
              </p>
              <div className="mt-4 rounded-lg bg-surface-sage p-3 text-xs font-medium text-ink">
                💼 Secured 3 major facility management contracts
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* 3-Step Simple Process */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">How it works</p>
              <h2 className="mt-4 text-[clamp(2.2rem,4vw,3.6rem)] leading-tight tracking-[-0.04em] text-ink">
                From first call to live website in 3 simple steps.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                We know you are busy on site. Our process is designed to require less than 45
                minutes of your time in total.
              </p>
              <div className="mt-8">
                <PillButton as="link" to="/contact" variant="dark">
                  Book a 15-Minute Intro Call
                </PillButton>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-7">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="grid grid-cols-[50px_1fr] gap-4 rounded-2xl border border-ink/10 bg-surface-cream p-6"
                >
                  <span className="font-mono text-lg font-semibold text-primary">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Packages Section */}
      <WebsitePackagesSection />

      {/* Trade ROI Calculator Section */}
      <section className="py-16 md:py-24 bg-neutral-950 border-t border-neutral-800">
        <Container>
          <TradeRoiCalculator />
        </Container>
      </section>

      {/* Verified Google Trade Reviews & Social Proof */}
      <TradeGoogleReviewsWidget />

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-white border-t border-ink/10">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center">
              <p className="eyebrow">Frequently Asked</p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight text-ink md:text-4xl">
                Common questions from busy business owners.
              </h2>
              <p className="mt-2 text-base text-ink-muted">
                Plain answers without technical jargon.
              </p>
            </div>

            <div className="mt-10">
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((faq, i) => (
                  <AccordionItem key={faq.q} value={`faq-${i}`} className="border-ink/10">
                    <AccordionTrigger className="py-5 text-left text-[17px] font-medium text-ink hover:no-underline">
                      <div className="flex items-center gap-3">
                        <HelpCircle size={18} className="text-primary shrink-0" />
                        <span>{faq.q}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pl-7 text-[15px] leading-relaxed text-ink-muted">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom High-Converting CTA Box */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="overflow-hidden rounded-3xl bg-ink p-8 text-white md:p-14 shadow-2xl border border-white/10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="eyebrow text-primary">Ready to get your digital presence sorted?</p>
                <h2 className="mt-4 text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.045em]">
                  Let’s make your business look world-class.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
                  Get in touch today for a free 15-minute consultation and a fixed-price quote. No
                  sales pressure, no technical jargon.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <PillButton
                  as="link"
                  to="/contact"
                  variant="light"
                  size="md"
                  className="w-full justify-center"
                >
                  Get a Free 60-Sec Quote
                </PillButton>
                <a
                  href="mailto:hello@harleydigitalworks.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
                >
                  <MessageSquare size={16} /> Email Us Directly
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
