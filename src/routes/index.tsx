import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  Flame,
  HelpCircle,
  Monitor,
  Phone,
  PhoneCall,
  Send,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Sun,
  Wrench,
  Zap,
} from "lucide-react";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { WebsitePackagesSection } from "@/components/site/WebsitePackagesSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TRADE_DEMOS, type TradeDemoBusiness } from "@/components/demos/TradeDemoData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harley Digital Works | Bespoke Websites for UK Trades & Service Businesses" },
      {
        name: "description",
        content:
          "Bespoke websites for ambitious trade and service businesses. We shape the message, design the experience and look after the site—so customers can see why they should choose you.",
      },
      {
        property: "og:title",
        content: "Harley Digital Works | Bespoke Websites for UK Trades",
      },
      {
        property: "og:description",
        content:
          "Your workmanship, translated into a better website. Done-for-you copywriting, high-converting trade design, and managed UK monthly care.",
      },
    ],
  }),
  component: HomePage,
});

/* Selected Project Showcase Data */
const SELECTED_PROJECTS = [
  {
    id: "apex",
    tradeKey: "electrical",
    title: "Apex Electrical & Renewable Energy",
    category: "Electrical & Solar PV Contractor",
    location: "Greater Manchester & Cheshire",
    type: "Flagship Concept Showcase",
    summary:
      "A complete digital overhaul engineered for an 18th Edition contractor scaling into commercial solar PV, battery storage, and domestic EV charging points.",
    deliverables: [
      "Full sales copywriting & trade positioning",
      "Interactive Solar PV & EV quote estimator",
      "NICEIC, OZEV & TrustMark credential badges",
      "1-tap WhatsApp and phone direct triage",
    ],
    commercialOutcome:
      "Designed to capture high-margin £3,500+ commercial and domestic installations directly on mobile.",
    demoUrl: "/demos?trade=electrical",
  },
  {
    id: "vanguard",
    tradeKey: "roofing",
    title: "Vanguard Roofing & Property Care",
    category: "Roofing & Flat Roof Specialist",
    location: "Birmingham & West Midlands",
    type: "Trade Blueprint",
    summary:
      "Engineered to convert storm-damage emergency leak repairs into high-value full re-roofs and 20-year guaranteed GRP fibreglass installations.",
    deliverables: [
      "Emergency callout triage banner & click-to-call",
      "Interactive Before & After project comparison",
      "Free HD drone survey booking flow",
      "Confederation of Roofing Contractors verification",
    ],
    commercialOutcome:
      "Structured to rank for regional emergency search and showcase 20-year watertight warranties.",
    demoUrl: "/demos?trade=roofing",
  },
  {
    id: "heating",
    tradeKey: "heating",
    title: "Harley Heating & Gas Engineers",
    category: "Gas & Boiler Specialist",
    location: "Leeds & Yorkshire",
    type: "Trade Blueprint",
    summary:
      "Positioned to win profitable combi-to-combi boiler replacements with transparent guide pricing, Worcester Bosch accreditation, and 0% finance integration.",
    deliverables: [
      "Instant boiler swap & power flush cost guide",
      "Gas Safe Register #648192 trust architecture",
      "Next-day installation booking guarantee",
      "Up to 12-year warranty promotional banners",
    ],
    commercialOutcome:
      "Eliminates pricing hesitation with transparent guide ranges and Gas Safe assurance.",
    demoUrl: "/demos?trade=heating",
  },
];

/* 3-Step Process Steps */
const PROCESS_STEPS = [
  {
    number: "01",
    title: "Tell us about your business",
    subtitle: "A 15-minute briefing with zero homework",
    description:
      "We gather what you do, your best services, your accreditations, and the towns you want to target. You never have to stare at a blank screen or write marketing copy.",
    artefact: "The Project Brief & Regional Postcode Map",
  },
  {
    number: "02",
    title: "Review the website we create",
    subtitle: "Complete sales copy & bespoke design",
    description:
      "We write 100% of your sales copy, curate high-resolution trade imagery, and build your complete website. You inspect the live preview on your phone and give us your feedback.",
    artefact: "The Interactive Mobile & Desktop Preview",
  },
  {
    number: "03",
    title: "Launch with ongoing support",
    subtitle: "Zero downtime & managed care",
    description:
      "We connect your domain with zero downtime and activate our monthly care. When you need text updates, new project photos, or pricing changes, simply send a WhatsApp.",
    artefact: "The Launch Checklist & Ongoing Care Desk",
  },
];

/* Real Purchasing Objections FAQs */
const FAQS = [
  {
    q: "What do you need from me to get started?",
    a: "Very little. Our core promise is 100% done-for-you. After a relaxed 15-minute intro call to understand your trade specialisms and coverage areas, our team writes all the sales copy and designs the site. You simply review the finished build, check the factual details, and approve the direction.",
  },
  {
    q: "Who owns the website and domain name?",
    a: "You own 100% of your website, your domain name, and all written content and assets. We manage the technical infrastructure on your behalf, but there are no proprietary lock-ins.",
  },
  {
    q: "What revisions and feedback rounds are included?",
    a: "Every package includes dedicated revision rounds. We share a private preview link that you can open on your phone or computer. You tell us what you’d like adjusted—wording, colours, service details—and we refine it until you're completely satisfied before launch.",
  },
  {
    q: "How quickly can we launch?",
    a: "Launch packages are delivered within 14 days from onboarding sign-off. Growth packages take 14–21 days to accommodate expanded service areas and custom calculators. Pro scopes are scheduled to agreed milestones.",
  },
  {
    q: "What does the monthly Care Plan include?",
    a: "Everything required to keep your site fast, secure, and current: ultra-fast UK cloud hosting, daily automated cloud backups, SSL maintenance, security firewall monitoring, and unlimited minor copy, photo, and pricing updates. Simply message us on WhatsApp whenever you need a change.",
  },
  {
    q: "What happens if I ever want to leave or host elsewhere?",
    a: "You are not locked into long-term hosting contracts. You can cancel your Care Plan with 30 days notice at any time, and we will happily export your website assets and assist in transferring your DNS.",
  },
  {
    q: "Can I keep my existing domain name and email accounts?",
    a: "Yes. If you already own a domain (.co.uk or .com) and business email (e.g. Google Workspace or Microsoft 365), we handle all DNS records seamlessly with zero interruption to your incoming mail.",
  },
  {
    q: "Are there any hidden costs or surprise fees?",
    a: "No. Our pricing is completely transparent: fixed upfront packages (£1,495 for Launch, £2,995 for Growth, £4,995+ for Pro) plus VAT, with transparent monthly care (£95/mo, £195/mo, £395/mo). Every deliverable is detailed in writing before you pay a penny.",
  },
];

function HomePage() {
  const [activeHeroTrade, setActiveHeroTrade] = useState<"electrical" | "roofing" | "heating">("electrical");
  const [heroDeviceMode, setHeroDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [transformationTab, setTransformationTab] = useState<"hdw" | "outdated">("hdw");

  const heroBusiness: TradeDemoBusiness = TRADE_DEMOS[activeHeroTrade] || TRADE_DEMOS.electrical;

  return (
    <PageShell>
      {/* 1. HERO: SUBSTANTIAL EDITORIAL REDESIGN */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 bg-[#FDFCF9] border-b border-ink/10">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column (5 Cols): Editorial Pitch */}
            <div className="lg:col-span-5 space-y-6">
              {/* Studio Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3.5 py-1 text-xs font-mono font-semibold text-ink/80 shadow-2xs">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-600" />
                <span>Harley Digital Works</span>
                <span className="text-ink/30">•</span>
                <span className="text-ink-muted">Specialist UK Trade Studio</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-ink leading-[1.05] font-display">
                Your work deserves{" "}
                <span className="block italic text-primary">a better website.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg leading-relaxed text-ink-muted">
                Bespoke websites for ambitious trade and service businesses. We shape the message,
                design the experience and look after the site—so customers can see why they should
                choose you.
              </p>

              {/* Reassurance Line */}
              <div className="rounded-xl border border-ink/10 bg-white/80 p-3 text-xs font-medium text-ink/80 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0" />
                <span>Websites from £1,495 · Copywriting included · Managed care available</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <PillButton as="link" to="/contact" variant="dark" size="md">
                  Get a website quote
                </PillButton>
                <a
                  href="#selected-work"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ink/80 hover:text-ink transition-colors px-4 py-2"
                >
                  <span>Explore our work</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Column (7 Cols): Flagship Website Showcase */}
            <div className="lg:col-span-7">
              <div className="space-y-3">
                {/* Showcase Header Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-ink/10 rounded-2xl p-2.5 shadow-xs">
                  {/* Trade Concept Switcher */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-muted mr-1 hidden sm:inline">
                      Showcase:
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveHeroTrade("electrical")}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        activeHeroTrade === "electrical"
                          ? "bg-ink text-white shadow-xs"
                          : "text-ink/70 hover:text-ink hover:bg-ink/5"
                      }`}
                    >
                      ⚡ Electrical
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveHeroTrade("roofing")}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        activeHeroTrade === "roofing"
                          ? "bg-ink text-white shadow-xs"
                          : "text-ink/70 hover:text-ink hover:bg-ink/5"
                      }`}
                    >
                      🏠 Roofing
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveHeroTrade("heating")}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        activeHeroTrade === "heating"
                          ? "bg-ink text-white shadow-xs"
                          : "text-ink/70 hover:text-ink hover:bg-ink/5"
                      }`}
                    >
                      🔥 Heating
                    </button>
                  </div>

                  {/* Device Switcher */}
                  <div className="flex items-center gap-1 bg-ink/5 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setHeroDeviceMode("desktop")}
                      className={`p-1.5 rounded text-xs transition-all cursor-pointer ${
                        heroDeviceMode === "desktop" ? "bg-white text-ink shadow-2xs font-semibold" : "text-ink/60 hover:text-ink"
                      }`}
                      title="Desktop View"
                    >
                      <Monitor className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroDeviceMode("mobile")}
                      className={`p-1.5 rounded text-xs transition-all cursor-pointer ${
                        heroDeviceMode === "mobile" ? "bg-white text-ink shadow-2xs font-semibold" : "text-ink/60 hover:text-ink"
                      }`}
                      title="Mobile View"
                    >
                      <Smartphone className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Rendered Flagship Website Canvas */}
                <div className="relative rounded-3xl border border-ink/15 bg-white shadow-xl overflow-hidden transition-all duration-300">
                  {/* Minimal Browser Chrome */}
                  <div className="bg-[#181C26] px-4 py-2.5 flex items-center justify-between text-white border-b border-ink/10">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="bg-[#0B0F19] text-white/70 text-[11px] font-mono px-4 py-0.5 rounded-full border border-white/10 truncate max-w-xs">
                      🔒 https://www.${heroBusiness.id}-specialists.co.uk
                    </div>
                    <div className="text-[10px] font-mono text-amber-400 font-semibold hidden sm:block">
                      HDW Flagship
                    </div>
                  </div>

                  {/* Website Canvas Area */}
                  <div
                    className={`bg-[#FAF9F5] text-ink p-4 sm:p-6 transition-all duration-300 ${
                      heroDeviceMode === "mobile" ? "max-w-[340px] mx-auto my-4 rounded-2xl border-4 border-ink/20 shadow-md" : ""
                    }`}
                  >
                    {/* Simulated Client Website Header */}
                    <div className="flex items-center justify-between border-b border-ink/10 pb-3 mb-4">
                      <div>
                        <div className="font-extrabold text-sm sm:text-base tracking-tight text-ink flex items-center gap-1">
                          <span className="text-primary font-bold">⚡</span>
                          <span>{heroBusiness.name}</span>
                        </div>
                        <div className="text-[10px] text-ink-muted">{heroBusiness.badge}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-ink bg-white px-2.5 py-1 rounded-md border border-ink/10">
                          <Phone className="h-3 w-3 text-primary" />
                          <span>{heroBusiness.phone}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-700 px-2.5 py-1 rounded-md shadow-2xs">
                          <Send className="h-3 w-3" />
                          <span>WhatsApp</span>
                        </span>
                      </div>
                    </div>

                    {/* Simulated Hero Body */}
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-amber-900">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        <span>Rated {heroBusiness.rating.score}/5.0 · {heroBusiness.rating.platform}</span>
                      </div>

                      <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-ink leading-tight font-display">
                        {heroBusiness.heroHeadline}
                      </h2>

                      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {heroBusiness.heroSubheadline}
                      </p>

                      {/* Accreditation Badges Strip */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                        {heroBusiness.accreditations.map((acc, i) => (
                          <div
                            key={i}
                            className="rounded-lg bg-white border border-ink/10 p-2 text-left shadow-2xs"
                          >
                            <span className="text-xs">{acc.iconText}</span>
                            <div className="text-[10px] font-bold text-ink truncate mt-0.5">{acc.name}</div>
                            {acc.idNumber && <div className="text-[9px] font-mono text-ink-muted truncate">{acc.idNumber}</div>}
                          </div>
                        ))}
                      </div>

                      {/* Featured Service Guide Pricing */}
                      <div className="mt-3 pt-3 border-t border-ink/10 grid gap-2 sm:grid-cols-2">
                        {heroBusiness.popularServices.slice(0, 2).map((svc, i) => (
                          <div key={i} className="rounded-xl bg-white border border-ink/10 p-2.5 flex justify-between items-center text-xs">
                            <div>
                              <div className="font-bold text-ink text-[11px]">{svc.title}</div>
                              <div className="text-[10px] text-ink-muted">{svc.turnaround}</div>
                            </div>
                            <span className="font-mono font-bold text-primary text-[11px] bg-primary/10 px-2 py-0.5 rounded">
                              {svc.priceGuide}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Caption Bar */}
                  <div className="bg-[#F8F8F5] border-t border-ink/10 px-4 py-2.5 flex flex-wrap items-center justify-between text-xs text-ink-muted">
                    <span className="font-mono text-[11px]">
                      Concept Showcase · <strong>{heroBusiness.name}</strong> · 100% Done-For-You
                    </span>
                    <Link
                      to="/demos"
                      search={{ trade: activeHeroTrade }}
                      className="font-bold text-ink hover:text-primary transition-colors inline-flex items-center gap-1 text-[11px]"
                    >
                      <span>Inspect Full Interactive Demo</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. SELECTED WORK: WORK-LED PORTFOLIO */}
      <section className="py-20 md:py-28 bg-white border-b border-ink/10" id="selected-work">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow text-primary">Selected Work & Concepts</p>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink font-display leading-[1.08]">
              Proof before promises. <br />
              Websites crafted for commercial impact.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">
              Every website we create is built around how high-value customers actually make hiring
              decisions: clear service scope, upfront guide pricing, verified trade credentials, and
              frictionless mobile contact.
            </p>
          </div>

          <div className="mt-14 space-y-12">
            {SELECTED_PROJECTS.map((project) => (
              <article
                key={project.id}
                className="rounded-3xl border border-ink/10 bg-[#FAF9F6] p-6 sm:p-10 transition-all hover:border-ink/20 shadow-xs"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-white px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-ink border border-ink/10">
                        {project.type}
                      </span>
                      <span className="text-xs text-ink-muted font-medium">• {project.location}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink font-display">
                      {project.title}
                    </h3>

                    <p className="text-sm text-ink-muted leading-relaxed">{project.summary}</p>

                    <div className="rounded-2xl bg-white border border-ink/10 p-4 space-y-2">
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-ink">
                        Our Contribution:
                      </div>
                      <ul className="space-y-1.5 text-xs text-ink/80">
                        {project.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/60 p-3 rounded-xl">
                      <strong>Target Outcome:</strong> {project.commercialOutcome}
                    </p>

                    <div className="pt-2">
                      <Link
                        to="/demos"
                        search={{ trade: project.tradeKey as "electrical" | "roofing" | "heating" }}
                        className="inline-flex items-center gap-2 rounded-xl bg-ink text-white px-5 py-2.5 text-xs font-bold hover:bg-ink/90 transition-all shadow-xs"
                      >
                        <span>Explore Live Staging Demo</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="rounded-2xl border border-ink/15 bg-white p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between text-xs border-b border-ink/10 pb-3">
                        <span className="font-mono text-ink-muted">Preview: {project.category}</span>
                        <span className="font-bold text-emerald-700">14-Day Delivery Standard</span>
                      </div>

                      {/* Visual Detail Component */}
                      <div className="rounded-xl bg-[#FAF9F5] border border-ink/10 p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-ink">Client Presentation Detail</span>
                          <span className="text-[10px] font-mono text-primary font-bold">Done-For-You Copy</span>
                        </div>
                        <p className="text-xs text-ink/80 italic leading-relaxed">
                          &ldquo;We don’t just build templates; we write the words that explain why your craftsmanship is worth every penny of your quote.&rdquo;
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono pt-2">
                        <div className="p-2 rounded-lg bg-ink/5">
                          <div className="font-bold text-ink">100%</div>
                          <div className="text-ink-muted text-[10px]">Copywritten</div>
                        </div>
                        <div className="p-2 rounded-lg bg-ink/5">
                          <div className="font-bold text-ink">Mobile-First</div>
                          <div className="text-ink-muted text-[10px]">1-Tap Call</div>
                        </div>
                        <div className="p-2 rounded-lg bg-ink/5">
                          <div className="font-bold text-ink">Managed Care</div>
                          <div className="text-ink-muted text-[10px]">£95/mo</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. WEBSITE TRANSFORMATION: BEFORE VS AFTER TEARDOWN */}
      <section className="py-20 md:py-28 bg-[#111827] text-white border-b border-slate-800">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <p className="eyebrow text-amber-400">Commercial Teardown</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white font-display">
                Why typical trade websites leak enquiries vs. what we build.
              </h2>
            </div>

            {/* Switcher */}
            <div className="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => setTransformationTab("hdw")}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  transformationTab === "hdw"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                The Harley Standard
              </button>
              <button
                type="button"
                onClick={() => setTransformationTab("outdated")}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  transformationTab === "outdated"
                    ? "bg-rose-950 text-rose-200 border border-rose-800"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Typical DIY / Dated Site
              </button>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-950/80 p-6 sm:p-10 shadow-2xl">
            {transformationTab === "hdw" ? (
              <div className="grid gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-950 px-3 py-1 text-xs font-mono text-emerald-300 border border-emerald-800/60">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Commercial Conversion Architecture</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
                    Built to win high-ticket domestic & commercial contracts
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    We eliminate friction at every stage of the customer decision journey: crystal-clear
                    service areas, upfront guide prices, verified trust accreditations, and 1-tap WhatsApp contact.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2 pt-3">
                    <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
                      <div className="text-xs font-mono font-bold text-emerald-400 uppercase">Clear Service Scope</div>
                      <p className="text-xs text-slate-300 mt-1">
                        Customers immediately know whether you handle their specific job and cover their postcode.
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
                      <div className="text-xs font-mono font-bold text-emerald-400 uppercase">Verified Trust Badges</div>
                      <p className="text-xs text-slate-300 mt-1">
                        Gas Safe, NICEIC, and FMB logos positioned prominently to eliminate homeowner doubt.
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
                      <div className="text-xs font-mono font-bold text-emerald-400 uppercase">1-Tap WhatsApp & Call</div>
                      <p className="text-xs text-slate-300 mt-1">
                        Direct routing to your phone so urgent enquiries turn into site visits immediately.
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
                      <div className="text-xs font-mono font-bold text-emerald-400 uppercase">100% Written For You</div>
                      <p className="text-xs text-slate-300 mt-1">
                        Professional, persuasive trade copy with zero homework or writing required from you.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-2xl bg-slate-900 p-6 border border-slate-800 text-xs space-y-4">
                  <div className="text-emerald-400 font-bold font-mono border-b border-slate-800 pb-3">
                    THE COMMERCIAL RESULT:
                  </div>
                  <blockquote className="text-sm text-slate-200 italic leading-relaxed">
                    &ldquo;Homeowners don’t want to read a wall of jargon. They want to know you’re accredited, see photos of tidy work in their area, and message you on WhatsApp for a quote.&rdquo;
                  </blockquote>
                  <div className="pt-2 text-[11px] font-mono text-slate-400 border-t border-slate-800">
                    *Illustrative conversion analysis of UK trade consumer behavior.
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-rose-950 px-3 py-1 text-xs font-mono text-rose-300 border border-rose-800/60">
                    <span>Common Failure Modes in DIY Sites</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
                    Where standard trade websites lose profitable quotes
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Most trade websites fail because of avoidable structural mistakes that cause potential clients to bounce back to Google search.
                  </p>

                  <div className="space-y-3 pt-2 text-xs text-rose-200">
                    <div className="rounded-xl bg-rose-950/30 p-3.5 border border-rose-900/50">
                      <strong>Unclear Service Areas:</strong> Homeowners can’t tell if you work in their town and leave within 5 seconds.
                    </div>
                    <div className="rounded-xl bg-rose-950/30 p-3.5 border border-rose-900/50">
                      <strong>Missing Accreditations:</strong> Unclear or missing Gas Safe / NICEIC badges fail to build trust for high-value jobs.
                    </div>
                    <div className="rounded-xl bg-rose-950/30 p-3.5 border border-rose-900/50">
                      <strong>Clunky Contact Forms:</strong> 10-field contact forms that get ignored on mobile phones.
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-2xl bg-slate-900 p-6 border border-slate-800 text-xs text-slate-400 space-y-3 font-mono">
                  <p className="text-rose-400 font-bold">// Common DIY Trade Website Pitfalls:</p>
                  <p>• Weeks spent struggling with confusing website builders.</p>
                  <p>• Broken mobile layout on modern smartphones.</p>
                  <p>• Generic stock photos that look fake to local customers.</p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* 4. BUILT AROUND HOW CUSTOMERS CHOOSE */}
      <section className="py-20 md:py-28 bg-[#FAF9F6] border-b border-ink/10">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow text-primary">Strategic UX</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-ink font-display">
              Built around how customers choose.
            </h2>
            <p className="mt-3 text-base text-ink-muted leading-relaxed">
              We design every component to answer the three questions every homeowner or commercial client asks:
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-ink/10 bg-white p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="font-mono text-2xl font-bold text-primary">01</div>
                <h3 className="mt-4 text-xl font-bold text-ink">“Do you do my exact job?”</h3>
                <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                  We create dedicated, cleanly categorized service sections with transparent guide prices,
                  eliminating confusion and attracting qualified enquiries.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-ink/10 text-xs font-mono text-emerald-800 font-semibold">
                ✓ Dedicated Service Breakdowns
              </div>
            </div>

            <div className="rounded-3xl border border-ink/10 bg-white p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="font-mono text-2xl font-bold text-primary">02</div>
                <h3 className="mt-4 text-xl font-bold text-ink">“Can I trust your workmanship?”</h3>
                <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                  We showcase your genuine certifications (Gas Safe, NICEIC, FMB, CHAS) and integrate
                  real before-and-after project evidence right where decisions are made.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-ink/10 text-xs font-mono text-emerald-800 font-semibold">
                ✓ Prominent Client Credentials
              </div>
            </div>

            <div className="rounded-3xl border border-ink/10 bg-white p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="font-mono text-2xl font-bold text-primary">03</div>
                <h3 className="mt-4 text-xl font-bold text-ink">“How do I get a fast quote?”</h3>
                <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                  1-tap WhatsApp messaging and mobile click-to-call allow busy customers to send photos
                  of their job and get a quote without wading through lengthy forms.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-ink/10 text-xs font-mono text-emerald-800 font-semibold">
                ✓ Instant Mobile Action
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. SIMPLE 3-STEP PROCESS */}
      <section className="py-20 md:py-28 bg-white border-b border-ink/10">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow text-primary">Simple Collaboration</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-ink font-display">
              A straightforward process with zero homework for you.
            </h2>
            <p className="mt-3 text-base text-ink-muted leading-relaxed">
              We know you’re busy on site. Here is how we take you from idea to live website without taking up your evenings.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-ink/10 bg-[#FAF9F6] p-8 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="font-mono text-3xl font-extrabold text-primary">
                    {step.number}
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-ink">{step.title}</h3>
                  <p className="text-xs font-mono font-semibold text-emerald-800 mt-1">{step.subtitle}</p>
                  <p className="mt-3 text-sm text-ink-muted leading-relaxed">{step.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-ink/10 text-xs font-mono text-ink/70">
                  <span className="font-bold text-ink">Deliverable:</span> {step.artefact}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <PillButton as="link" to="/contact" variant="dark" size="md">
              Start your 15-minute briefing
            </PillButton>
          </div>
        </Container>
      </section>

      {/* 6. TRANSPARENT PACKAGES & PRICING */}
      <WebsitePackagesSection />

      {/* 7. FOUNDER COMMITMENT & ONGOING CARE */}
      <section className="py-20 md:py-28 bg-[#0B0F19] text-white border-b border-slate-800">
        <Container>
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-12 shadow-2xl">
            <div className="grid gap-10 lg:grid-cols-12 items-center">
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl max-w-sm">
                  <img
                    src="/images/robbie/02-hdw-modern-professional.jpg"
                    alt="Dr Robbie Harley - Founder & Managing Director, The Harley Group"
                    className="w-full h-auto object-cover object-center"
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
                  <span>Founder Commitment</span>
                </div>
                <blockquote className="text-xl sm:text-2xl font-medium tracking-tight text-white leading-relaxed font-display">
                  &ldquo;A great trade website should do its job quietly and reliably: look immaculate, explain what you do clearly, and deliver qualified enquiries to your phone. When you work with Harley Digital Works, you get a dedicated UK team looking after your digital presence every month, so you can stay focused on the work that pays.&rdquo;
                </blockquote>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-t border-slate-800">
                  <span className="text-white font-bold">Robbie Harley</span>
                  <span>•</span>
                  <span>Managing Director, The Harley Group</span>
                  <span>•</span>
                  <span className="text-emerald-400">Done-For-You Assurance</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 md:py-28 bg-[#FAF9F6] border-b border-ink/10" id="faqs">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="eyebrow text-primary">Purchasing Questions</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-ink font-display">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm text-ink-muted">
                Clear, straightforward answers with zero contractual jargon.
              </p>
            </div>

            <div className="mt-10">
              <Accordion type="single" collapsible className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`faq-${idx}`}
                    className="rounded-2xl border border-ink/10 bg-white px-6 py-2 shadow-2xs"
                  >
                    <AccordionTrigger className="text-left font-bold text-ink hover:no-underline text-base font-display">
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

      {/* 9. FINAL CALL TO ACTION */}
      <section className="py-20 md:py-28 bg-[#0B0F19] text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/60 px-3.5 py-1 text-xs font-semibold text-amber-300 font-mono">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Bespoke UK Website Studio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight font-display">
              Let’s make your website your next competitive advantage.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Tell us what you do, where you work and what you want your website to achieve.
              We’ll recommend the right scope and give you a clear quote.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <PillButton
                as="link"
                to="/contact"
                search={{ service: undefined, package: undefined, domain: undefined, websiteUrl: undefined }}
                variant="light"
                size="md"
              >
                Get a website quote
              </PillButton>
              <PillButton
                as="link"
                to="/demos"
                variant="ghost"
                size="md"
                className="border-slate-700 text-white hover:bg-slate-900 hover:text-white"
              >
                Explore live trade demos
              </PillButton>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
