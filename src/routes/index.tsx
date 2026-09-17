import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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
  TrendingUp,
  Award,
  Flame,
  Building2,
  Hammer,
  Wrench,
  ChevronRight,
  FileCheck2,
  Star,
  Layers,
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

const TRADE_VERTICAL_PREVIEWS = [
  {
    slug: "heating-engineers",
    name: "Gas & Heating Engineers",
    badge: "Gas Safe Specialists",
    metric: "£3,400 Avg Boiler Install",
    icon: Flame,
    desc: "Bespoke boiler quote forms, brand selectors (Worcester, Vaillant), and emergency callout triggers.",
  },
  {
    slug: "commercial-contractors",
    name: "Commercial & Multi-Van",
    badge: "CHAS Elite Compliance",
    metric: "£24k/yr PPM Retainers",
    icon: Building2,
    desc: "£10M liability showcase, multi-van fleet logistics, and corporate facility tender downloads.",
  },
  {
    slug: "electricians",
    name: "Electricians & EV Installers",
    badge: "NICEIC Approved",
    metric: "£4,200 Commercial 3-Phase",
    icon: Zap,
    desc: "EV charging calculators, EICR landlord inspections, and local Google Map Pack dominance.",
  },
  {
    slug: "builders",
    name: "Master Builders & Extensions",
    badge: "FMB Certified",
    metric: "£65,000+ House Extensions",
    icon: Hammer,
    desc: "Luxury architectural galleries, before/after project sliders, and video case studies.",
  },
];

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
    copy: "You review the preview, we make any tweaks you want, connect your domain, and hand you the keys with full care coverage.",
  },
] as const;

const FAQS = [
  {
    q: "Do I have to write any text or provide website copy?",
    a: "No. That is our core promise: 100% done-for-you. We research your specific trade, craft professional sales copy, highlight your accreditations, and curate high-resolution imagery. You never have to stare at a blank screen.",
  },
  {
    q: "How does the 14-day launch guarantee work?",
    a: "From the moment you complete our 3-minute onboarding call, our team works to a strict calendar schedule. Copywriting (Days 1–5), Web Build & Quote Tools (Days 6–10), Review & Revisions (Days 11–12), DNS & Live Google Verification (Days 13–14).",
  },
  {
    q: "What is included in the £95/month Managed Care Plan?",
    a: "Everything needed to keep your site fast, secure, and up-to-date: ultra-fast UK cloud hosting, daily automated cloud backups, SSL certificate maintenance, security firewalls, and unlimited monthly text & image updates. Simply message us on WhatsApp whenever you need a change.",
  },
  {
    q: "Can I use my existing domain name?",
    a: "Yes! If you already own a domain (.co.uk or .com), we handle 100% of the DNS connection for you with zero downtime. If you need a new domain, we can acquire and configure it for you.",
  },
  {
    q: "How is Harley Digital Works connected to The Harley Group?",
    a: "Harley Digital Works is the flagship commercial web and digital operations division of The Harley Group, operating alongside Harley Labs (R&D and autonomous systems) under the executive leadership of Dr Robbie Harley, MBA.",
  },
];

function HomePage() {
  const [comparisonMode, setComparisonMode] = useState<"after" | "before">("after");

  return (
    <PageShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32 bg-gradient-to-b from-background via-white to-background border-b border-ink/10">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-1.5 text-xs font-semibold text-ink shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Next 14-Day Build Slot Available · Limited Intake</span>
              <span className="text-ink-muted">|</span>
              <span className="text-emerald-700 font-mono font-bold">100% Done-For-You</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-8 text-[clamp(2.8rem,6.5vw,5.5rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-ink">
              You run your business.{" "}
              <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 bg-clip-text text-transparent block">
                We’ll handle your website.
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 mx-auto max-w-2xl text-lg sm:text-xl leading-relaxed text-ink-muted">
              Done-for-you websites, professional copywriting, and managed monthly care for UK trades
              and small businesses. Launched in 14 days with zero homework.
            </p>

            {/* Hero CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <PillButton as="link" to="/contact" variant="dark" size="md">
                Get a Free Quote (No Obligation)
              </PillButton>
              <PillButton as="link" to="/demos" variant="ghost" size="md">
                Explore Live Trade Demos
              </PillButton>
            </div>

            {/* Trust Highlights Strip */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-medium text-ink-muted">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                14-Day Delivery SLA
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                100% Copywriting Included
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                £95/mo Managed Care Desk
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Fixed Transparent Pricing
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Interactive Transformation Comparison Sandbox */}
      <section className="py-20 md:py-28 bg-slate-950 text-white border-b border-slate-800">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                The Harley Difference
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Why Standard Trade Websites Fail vs. What We Build.
              </h2>
            </div>

            {/* Toggle Buttons */}
            <div className="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-800">
              <button
                onClick={() => setComparisonMode("after")}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  comparisonMode === "after"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Harley Digital Platform (2026)
              </button>
              <button
                onClick={() => setComparisonMode("before")}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  comparisonMode === "before"
                    ? "bg-rose-900 text-rose-200"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Typical Outdated Trade Site
              </button>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
            {comparisonMode === "after" ? (
              <div className="grid gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950 px-3 py-1 text-xs font-mono text-emerald-300 border border-emerald-800/40">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                    High-Velocity Commercial Engine
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    Built to Win High-Margin £3,500+ Domestic & Commercial Jobs
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Razor-sharp mobile speed, interactive instant quote calculators, verified Gas
                    Safe / NICEIC accreditations, and direct WhatsApp 1-tap dispatch.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2 pt-2">
                    <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
                      <div className="text-xl font-bold text-emerald-400 font-mono">24ms</div>
                      <div className="text-[11px] text-slate-400">Time-to-First-Byte (Sub-50ms SSR)</div>
                    </div>
                    <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
                      <div className="text-xl font-bold text-emerald-400 font-mono">100/100</div>
                      <div className="text-[11px] text-slate-400">Google Core Web Vitals Pass</div>
                    </div>
                    <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
                      <div className="text-xl font-bold text-emerald-400 font-mono">Top 3</div>
                      <div className="text-[11px] text-slate-400">Google Map Pack Schema</div>
                    </div>
                    <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
                      <div className="text-xl font-bold text-emerald-400 font-mono">14 Days</div>
                      <div className="text-[11px] text-slate-400">Live Turnaround Guarantee</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 rounded-xl bg-slate-950 p-6 border border-slate-800 text-xs font-mono space-y-3">
                  <div className="text-emerald-400 font-bold flex items-center justify-between">
                    <span>LIVE PIPELINE CAPTURED:</span>
                    <span className="text-white bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">ACTIVE</span>
                  </div>
                  <div className="rounded bg-slate-900 p-3 border border-slate-800 text-slate-300">
                    &quot;3x Combi Boiler Replacements booked in Week 1 (£10,800 gross revenue). Inquiries arrive directly to WhatsApp.&quot;
                  </div>
                  <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800">
                    <span>Monthly Managed Care:</span>
                    <span className="text-emerald-400">£95/month (Unlimited Updates)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-950 px-3 py-1 text-xs font-mono text-rose-300 border border-rose-800/40">
                    Warning: Lost Revenue
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    The Cost of a Dated or Template DIY Website
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Slow WordPress plugins, no mobile optimization, zero copywriting, missing SSL
                    certificates, and endless technical maintenance headaches for the business owner.
                  </p>

                  <div className="space-y-2 pt-2 text-xs text-rose-300">
                    <div className="flex items-center gap-2">
                      <span className="text-rose-400 font-bold">✕</span> 4.8s page load speed (70% mobile visitors bounce immediately)
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-rose-400 font-bold">✕</span> Generic 'Lorem Ipsum' text with zero commercial persuasion
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-rose-400 font-bold">✕</span> Invisible on Google Map Pack for local high-intent keywords
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 rounded-xl bg-slate-950 p-6 border border-slate-800 text-xs font-mono text-slate-500">
                  <p className="text-rose-400 font-bold mb-2">// Typical DIY Experience:</p>
                  <p>&gt; Stared at blank WordPress screen for 6 weeks.</p>
                  <p>&gt; Plugin update crashed site database.</p>
                  <p>&gt; Zero qualified inquiries received.</p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Specialist Trade Verticals Section */}
      <section className="py-20 md:py-28 bg-slate-50 border-b border-ink/10">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600">
                Tailored Trade Architectures
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
                Websites Engineered For Your Exact Trade.
              </h2>
            </div>
            <Link
              to="/trades"
              className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-800"
            >
              <span>View All Sector Blueprints</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRADE_VERTICAL_PREVIEWS.map((trade) => {
              const Icon = trade.icon;
              return (
                <div
                  key={trade.slug}
                  className="rounded-2xl border border-ink/10 bg-white p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="mt-4 inline-block rounded-md bg-slate-100 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-slate-700">
                      {trade.badge}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-ink">{trade.name}</h3>
                    <p className="mt-1 text-xs font-mono text-emerald-700 font-bold">
                      {trade.metric}
                    </p>
                    <p className="mt-3 text-xs text-ink-muted leading-relaxed">{trade.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-ink/10">
                    <Link
                      to="/trades/$slug"
                      params={{ slug: trade.slug }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                    >
                      <span>Explore Trade Hub</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3 Core Pillars */}
      <section className="py-20 md:py-28 bg-white border-b border-ink/10">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Our Operating Standards
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Everything You Need to Win Work Online.
            </h2>
            <p className="mt-3 text-base text-ink-muted">
              We handle every step so you can stay on the tools and run your business.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.number}
                  className="rounded-2xl border border-ink/10 bg-slate-50/50 p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-2xl font-bold text-ink/20">{p.number}</span>
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-ink">{p.title}</h3>
                    <p className="mt-3 text-sm text-ink-muted leading-relaxed">{p.copy}</p>
                  </div>

                  <ul className="mt-6 space-y-2 border-t border-ink/10 pt-4 text-xs text-ink font-medium">
                    {p.outcomes.map((o) => (
                      <li key={o} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0" />
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

      {/* Interactive ROI Calculator Embed */}
      <TradeRoiCalculator />

      {/* 14-Day Delivery SLA Roadmap */}
      <section className="py-20 md:py-28 bg-slate-900 text-white border-b border-slate-800">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-semibold text-emerald-300 font-mono">
              <Clock className="h-3.5 w-3.5" />
              14-Day Live Google Launch
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Simple 3-Step Process. Live in 14 Days.
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Strict delivery rhythms with daily milestone updates via your dedicated build tracker.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl border border-slate-800 bg-slate-950 p-8 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-3xl font-extrabold text-emerald-500">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">{step.copy}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <PillButton as="link" to="/onboarding" variant="light" size="md">
              Start 3-Minute Fast-Track Onboarding
            </PillButton>
          </div>
        </Container>
      </section>

      {/* Transparent Packages & Pricing */}
      <WebsitePackagesSection />

      {/* Google Reviews & Social Proof */}
      <TradeGoogleReviewsWidget />

      {/* FAQ Accordion */}
      <section className="py-20 md:py-28 bg-white border-b border-ink/10">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Common Questions
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="mt-10">
              <Accordion type="single" collapsible className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`faq-${idx}`}
                    className="rounded-xl border border-ink/10 bg-slate-50/50 px-6 py-2"
                  >
                    <AccordionTrigger className="text-left font-bold text-ink hover:no-underline text-base">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-ink-muted leading-relaxed pt-2">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom Conversion CTA */}
      <section className="py-20 md:py-28 bg-slate-950 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-semibold text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              Zero Tech Stress Guarantee
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white md:text-5xl leading-tight">
              Ready to sort your website once and for all?
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Book your 14-day build slot today. We write all the copy, build the site, connect your
              domain, and manage everything for £95/month.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PillButton
                as="link"
                to="/contact"
                search={{ service: undefined, package: undefined, domain: undefined, websiteUrl: undefined }}
                variant="light"
                size="md"
              >
                Get a Free Quote (No Obligation)
              </PillButton>
              <PillButton
                as="link"
                to="/proposals"
                variant="ghost"
                size="md"
                className="border-slate-700 text-white hover:bg-slate-900 hover:text-white"
              >
                View Interactive Proposal Desk
              </PillButton>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
