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
  Sun,
  Wind,
  Gauge,
  ArrowUpRight,
  Shield,
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
    title: "High-Converting Trade Architecture",
    copy: "Bespoke, razor-sharp digital engineering calibrated to your trade. Built to capture high-margin domestic and commercial inquiries on mobile 4G/5G.",
    deliverables: [
      "Sub-50ms Cloudflare V8 Edge Isolate load times",
      "Interactive 1-tap quote and boiler calculators",
      "Instant WhatsApp & click-to-call direct routing",
    ],
  },
  {
    number: "02",
    icon: PenTool,
    title: "100% Done-For-You Copywriting",
    copy: "Zero homework for you. We research your specific trade, write all commercial sales copy, and highlight your Gas Safe, NICEIC, or FMB accreditations.",
    deliverables: [
      "Persuasive, high-ticket UK commercial copy",
      "Local Map Pack & Postcode keyword targeting",
      "Curated high-resolution trade gallery assets",
    ],
  },
  {
    number: "03",
    icon: Headphones,
    title: "Dedicated UK Care Desk & Updates",
    copy: "We host, monitor, and update your site every single month. When you want prices, photos, or emergency banners updated, just message us on WhatsApp.",
    deliverables: [
      "24-business-hour guaranteed SLA turnaround",
      "Daily automated offsite cloud backups & SSL",
      "Unlimited text, photo, and pricing updates",
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
    desc: "Bespoke boiler brand selectors (Worcester, Vaillant, Viessmann), interactive quote calculators, and 24/7 emergency repair routing.",
    color: "from-amber-500/10 to-orange-500/5",
  },
  {
    slug: "solar-pv",
    name: "Solar PV & Battery Storage",
    badge: "MCS Certified",
    metric: "£14,500 Avg System Quote",
    icon: Sun,
    desc: "Interactive battery payback calculators, SEG tariff explainers, and commercial solar tender intake workflows.",
    color: "from-emerald-500/10 to-teal-500/5",
  },
  {
    slug: "commercial-contractors",
    name: "Commercial & Multi-Van",
    badge: "CHAS Elite Compliance",
    metric: "£24k/yr PPM Retainers",
    icon: Building2,
    desc: "£10M public liability showcase, multi-van fleet management, and corporate facility management tender downloads.",
    color: "from-blue-500/10 to-indigo-500/5",
  },
  {
    slug: "electricians",
    name: "Electricians & EV Installers",
    badge: "NICEIC Approved",
    metric: "£4,200 Commercial 3-Phase",
    icon: Zap,
    desc: "Workplace EV charging hubs, EICR landlord certifications, and local Google Map Pack dominance.",
    color: "from-purple-500/10 to-violet-500/5",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    phase: "Day 1–2",
    title: "15-Minute Intro & Intake",
    copy: "Tell us about your trade, coverage towns, and best services. No technical jargon, no homework.",
  },
  {
    number: "02",
    phase: "Day 3–10",
    title: "We Write, Design & Build",
    copy: "Our UK team writes your sales copy, builds your bespoke React 19 pages, and embeds your interactive quote tools.",
  },
  {
    number: "03",
    phase: "Day 11–14",
    title: "Review & Live Google Launch",
    copy: "You review the preview on your phone, we connect your domain with zero downtime, and activate full monthly care.",
  },
] as const;

const ACCREDITATIONS = [
  { name: "Gas Safe Register", desc: "Heating & Boiler Compliance" },
  { name: "NICEIC Approved", desc: "Electrical & EV Certification" },
  { name: "FMB Certified", desc: "Federation of Master Builders" },
  { name: "CHAS Elite", desc: "Commercial Safety Accreditation" },
  { name: "Which? Trusted Trader", desc: "Consumer Trust Standard" },
  { name: "MCS Certified", desc: "Solar PV & Heat Pump Standard" },
];

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
      {/* 1. Elevated Editorial Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28 bg-[#FAFAFA] border-b border-ink/10">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-1.5 text-xs font-semibold text-ink shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Next 14-Day Build Slot Available</span>
              <span className="text-ink/30">•</span>
              <span className="text-emerald-800 font-mono font-bold">100% Done-For-You</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-ink leading-[1.04]">
              You run your business. <br className="hidden sm:inline" />
              <span className="text-primary font-black">
                We’ll handle your website.
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 mx-auto max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-ink-muted">
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

            {/* Core Trust Deliverables Strip */}
            <div className="mt-12 pt-8 border-t border-ink/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-ink/80">
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>14-Day Delivery SLA</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <PenTool className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>100% Copywriting Included</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>£95/mo Managed Care</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Award className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>UK Trade Specialists</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Trade Accreditations Trust Ribbon */}
      <section className="py-6 bg-white border-b border-ink/10">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-mono text-ink-muted">
            <span className="uppercase tracking-wider font-bold text-ink text-[11px]">
              Built For Accredited UK Trades:
            </span>
            {ACCREDITATIONS.map((acc) => (
              <span key={acc.name} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span className="text-ink font-semibold">{acc.name}</span>
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Interactive Transformation Teardown (Crafted Comparison) */}
      <section className="py-20 md:py-28 bg-[#0F172A] text-white border-b border-slate-800">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-800">
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                The Harley Performance Standard
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Why Outdated Trade Sites Leak Inquiries vs. What We Build.
              </h2>
            </div>

            {/* Toggle Switch */}
            <div className="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-800 shrink-0">
              <button
                onClick={() => setComparisonMode("after")}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  comparisonMode === "after"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Harley Edge Platform (2026)
              </button>
              <button
                onClick={() => setComparisonMode("before")}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  comparisonMode === "before"
                    ? "bg-rose-950 text-rose-200 border border-rose-800"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Typical WordPress / DIY Site
              </button>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-10 shadow-2xl">
            {comparisonMode === "after" ? (
              <div className="grid gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-950 px-3 py-1 text-xs font-mono text-emerald-300 border border-emerald-800/60">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                    <span>High-Converting Commercial Engine</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Engineered to Win £3,500+ Domestic & Commercial Contracts
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Razor-sharp mobile speed, interactive instant quote calculators, verified Gas
                    Safe & NICEIC trust badges, and 1-tap WhatsApp direct lead capture.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2 pt-3">
                    <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                      <div className="text-2xl font-black text-emerald-400 font-mono">22ms</div>
                      <div className="text-xs text-slate-300 font-medium mt-0.5">Time-to-First-Byte (Sub-50ms SSR)</div>
                    </div>
                    <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                      <div className="text-2xl font-black text-emerald-400 font-mono">100 / 100</div>
                      <div className="text-xs text-slate-300 font-medium mt-0.5">Google Core Web Vitals Pass</div>
                    </div>
                    <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                      <div className="text-2xl font-black text-emerald-400 font-mono">Top 3</div>
                      <div className="text-xs text-slate-300 font-medium mt-0.5">Local Google Map Pack Schema</div>
                    </div>
                    <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                      <div className="text-2xl font-black text-emerald-400 font-mono">14 Days</div>
                      <div className="text-xs text-slate-300 font-medium mt-0.5">Live Delivery Guarantee</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 rounded-2xl bg-slate-950 p-6 border border-slate-800 text-xs space-y-4">
                  <div className="text-emerald-400 font-bold font-mono flex items-center justify-between border-b border-slate-800 pb-3">
                    <span>MEASURED CLIENT PIPELINE RESULT:</span>
                    <span className="text-emerald-300 bg-emerald-950/90 px-2.5 py-0.5 rounded-full border border-emerald-800 text-[10px]">
                      LIVE IN PRODUCTION
                    </span>
                  </div>
                  <div className="rounded-xl bg-slate-900/90 p-4 border border-slate-800 text-slate-200 leading-relaxed font-sans text-sm">
                    &ldquo;Within 7 days of launch, we received 4 commercial boiler replacement quote requests directly on WhatsApp. The site paid for itself in week one.&rdquo;
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <span className="font-semibold text-white">Cheshire Heat & Power Ltd</span>
                    <span className="text-emerald-400 font-mono">£95/mo Care Plan Active</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-rose-950 px-3 py-1 text-xs font-mono text-rose-300 border border-rose-800/60">
                    <span>Common Failure Mode: Lost Leads</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    The Hidden Cost of a Dated or DIY Website
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Slow WordPress plugins, poor mobile layout, missing accreditations, and zero persuasive copywriting drive over 70% of potential high-ticket clients straight back to Google.
                  </p>

                  <div className="space-y-3 pt-2 text-xs text-rose-200">
                    <div className="flex items-start gap-2.5 rounded-xl bg-rose-950/30 p-3 border border-rose-900/50">
                      <span className="text-rose-400 font-bold mt-0.5">✕</span>
                      <span><strong>5.4s Mobile Load Speed:</strong> Over half of mobile 4G/5G searchers bounce within 3 seconds.</span>
                    </div>
                    <div className="flex items-start gap-2.5 rounded-xl bg-rose-950/30 p-3 border border-rose-900/50">
                      <span className="text-rose-400 font-bold mt-0.5">✕</span>
                      <span><strong>Missing Accreditations:</strong> Unverified Gas Safe / NICEIC badges fail to build trust with affluent homeowners.</span>
                    </div>
                    <div className="flex items-start gap-2.5 rounded-xl bg-rose-950/30 p-3 border border-rose-900/50">
                      <span className="text-rose-400 font-bold mt-0.5">✕</span>
                      <span><strong>No Interactive Quote Tool:</strong> Long static contact forms convert under 2% of visitors.</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 rounded-2xl bg-slate-950 p-6 border border-slate-800 text-xs text-slate-400 space-y-3 font-mono">
                  <p className="text-rose-400 font-bold">// Typical DIY Website Bottlenecks:</p>
                  <div className="space-y-1.5 text-slate-300">
                    <p>• Stared at blank WordPress screen for 6 weeks.</p>
                    <p>• WordPress plugin update broke mobile layout.</p>
                    <p>• Zero qualified inbound inquiries received.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* 4. Specialist Trade Verticals Section */}
      <section className="py-20 md:py-28 bg-[#FAFAFA] border-b border-ink/10">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-ink/10">
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700">
                Specialist Trade Verticals
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
                Websites Engineered For Your Exact Trade.
              </h2>
            </div>
            <Link
              to="/trades"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <span>View All Trade Blueprints</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRADE_VERTICAL_PREVIEWS.map((trade) => {
              const Icon = trade.icon;
              return (
                <div
                  key={trade.slug}
                  className="rounded-3xl border border-ink/10 bg-white p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-mono font-bold text-slate-700">
                        {trade.badge}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-ink">{trade.name}</h3>
                    <p className="mt-1 text-xs font-mono text-emerald-700 font-bold">
                      {trade.metric}
                    </p>
                    <p className="mt-3 text-xs text-ink-muted leading-relaxed">{trade.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-ink/10">
                    <Link
                      to="/trades/$slug"
                      params={{ slug: trade.slug }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 group"
                    >
                      <span>Explore Trade Hub</span>
                      <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 5. 3 Core Operating Standards */}
      <section className="py-20 md:py-28 bg-white border-b border-ink/10">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700">
              Our Operating Standards
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Everything You Need to Win Work Online.
            </h2>
            <p className="mt-3 text-base text-ink-muted leading-relaxed">
              We handle every step so you can stay on the tools and run your business.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.number}
                  className="rounded-3xl border border-ink/10 bg-[#F8FAFC] p-8 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-900 border border-emerald-300/60 shadow-xs">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-2xl font-bold text-ink/20">{p.number}</span>
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-ink">{p.title}</h3>
                    <p className="mt-3 text-sm text-ink-muted leading-relaxed">{p.copy}</p>
                  </div>

                  <ul className="mt-6 space-y-2.5 border-t border-ink/10 pt-5 text-xs text-ink/90 font-medium">
                    {p.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 6. Founder Assurance & Executive Craftsmanship */}
      <section className="py-20 md:py-24 bg-[#0B0F19] text-white border-b border-slate-800">
        <Container>
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-12 shadow-2xl">
            <div className="grid gap-10 lg:grid-cols-12 items-center">
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl max-w-sm group">
                  <img
                    src="/images/robbie/02-hdw-modern-professional.jpg"
                    alt="Dr Robbie Harley - Founder & Managing Director, The Harley Group"
                    className="w-full h-auto object-cover object-center group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-slate-950/90 backdrop-blur-md p-3.5 border border-amber-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white">Dr Robbie Harley, MBA</h4>
                        <p className="text-[10px] font-mono text-amber-400">Founder & Managing Director</p>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full">
                        THE HARLEY GROUP
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-950/50 px-3.5 py-1 text-xs font-semibold text-amber-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                  <span>The Harley Digital Works Founder Promise</span>
                </div>
                <blockquote className="text-xl sm:text-2xl font-medium tracking-tight text-white leading-relaxed">
                  &ldquo;A great trade website shouldn’t create extra work for you. We write 100% of your sales copy, structure your local service areas, and configure your Gas Safe or NICEIC trust badges so you never have to do homework in the evening.&rdquo;
                </blockquote>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-t border-slate-800">
                  <span className="text-white font-bold">Robbie Harley</span>
                  <span>•</span>
                  <span>Managing Director, The Harley Group</span>
                  <span>•</span>
                  <span className="text-emerald-400">14-Day Delivery SLA Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Interactive ROI Calculator */}
      <TradeRoiCalculator />

      {/* 8. 14-Day Delivery SLA Roadmap */}
      <section className="py-20 md:py-28 bg-[#0F172A] text-white border-b border-slate-800">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-semibold text-emerald-300 font-mono">
              <Clock className="h-3.5 w-3.5" />
              14-Day Turnaround Rhythm
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Simple 3-Step Process. Live in 14 Days.
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Strict delivery calendar with real-time milestone tracking via your dedicated client portal.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="relative rounded-3xl border border-slate-800 bg-slate-950 p-8 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-extrabold text-emerald-500">
                      {step.number}
                    </span>
                    <span className="rounded-full bg-emerald-950 px-2.5 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-800">
                      {step.phase}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-white">{step.title}</h3>
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

      {/* 9. Transparent Packages & Pricing */}
      <WebsitePackagesSection />

      {/* 10. Google Reviews & Social Proof */}
      <TradeGoogleReviewsWidget />

      {/* 11. FAQ Accordion */}
      <section className="py-20 md:py-28 bg-[#FAFAFA] border-b border-ink/10">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700">
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
                    className="rounded-2xl border border-ink/10 bg-white px-6 py-2 shadow-xs"
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

      {/* 12. Bottom Conversion CTA */}
      <section className="py-20 md:py-28 bg-[#0B0F19] text-white">
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
