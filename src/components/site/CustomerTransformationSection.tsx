import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  XCircle,
  Flame,
  Zap,
  Hammer,
  Home,
  ShieldCheck,
  Sparkles,
  Clock,
  ArrowRight,
  MapPin,
  TrendingUp,
  MessageSquare,
  HelpCircle,
  PenLine,
} from "lucide-react";
import { PillButton } from "./PillButton";

interface ScenarioData {
  id: string;
  trade: string;
  region: string;
  icon: React.ElementType;
  badge: string;
  beforeHeadline: string;
  beforePoints: string[];
  afterHeadline: string;
  afterPoints: string[];
  potentialOutcomes: {
    label: string;
    description: string;
  }[];
  illustrativeQuote: string;
  profileName: string;
  profileRole: string;
}

const NATIONWIDE_SCENARIOS: ScenarioData[] = [
  {
    id: "heating",
    trade: "Heating & Gas Engineers",
    region: "Yorkshire & Northern England",
    icon: Flame,
    badge: "Gas Safe & Boiler Installations",
    beforeHeadline: "The Emergency Callout Trap",
    beforePoints: [
      "Relying on low-margin £60 emergency callouts and word-of-mouth tyre kickers.",
      "No time after a 10-hour shift to write technical boiler copy or update web pages.",
      "Outdated presence made it hard to win £3,500+ full heating system upgrades.",
      "Customers constantly haggled over prices compared to unaccredited competitors.",
    ],
    afterHeadline: "High-Value Boiler Installations & Peace of Mind",
    afterPoints: [
      "100% done-for-you copywriting detailing manufacturer warranties and Gas Safe credentials.",
      "Mobile-optimised enquiry form allowing homeowners to upload boiler photos on the spot.",
      "Clear positioning as an established regional heating authority, not just a repairman.",
      "Rolling £249/mo care ensures seasonal servicing promotions update automatically.",
    ],
    potentialOutcomes: [
      {
        label: "Higher Margin Enquiries",
        description: "Potential shift from emergency patch-ups to planned £3k–£5k boiler installs.",
      },
      {
        label: "Zero Tech Homework",
        description:
          "Completed via one 20-minute phone call; zero writing required from the engineer.",
      },
      {
        label: "Immediate Credibility",
        description:
          "Verified accreditations and transparent warranties build instant homeowner trust.",
      },
    ],
    illustrativeQuote:
      "I was dreading the thought of building a website because I simply don’t have the time to sit at a laptop writing copy after a long day on site. Robbie’s team did the whole interview in one 20-minute phone call between jobs, wrote every word, and had it live with zero headache. Homeowners see our Gas Safe credentials and warranties straight away, and we quote complete heating installations with total confidence.",
    profileName: "Illustrative Profile: Dave M.",
    profileRole: "Independent Gas Safe Heating Specialist (Yorkshire)",
  },
  {
    id: "electrical",
    trade: "Electrical & EV Contractors",
    region: "Midlands & Central UK",
    icon: Zap,
    badge: "NICEIC & Commercial Compliance",
    beforeHeadline: "Invisible on Mobile & Price Haggling",
    beforePoints: [
      "Clunky DIY website built in 2017 that broke on modern smartphones.",
      "Main contractors and facilities managers doubted company scale and compliance.",
      "Stuck doing small domestic socket jobs rather than lucrative commercial fit-outs.",
      "Wasting precious weekends wrestling with hosting companies and broken contact forms.",
    ],
    afterHeadline: "Commercial Authority & High-Tech Focus",
    afterPoints: [
      "Engineered showcase highlighting commercial certificates, EV chargers, and solar setups.",
      "Instant dual enquiry routing: emergency rapid response plus structured commercial tender desk.",
      "Clean, precision-engineered design giving clients confidence in premium day rates.",
      "Rapid WhatsApp maintenance desk: new certificates or accreditations added in 24 hours.",
    ],
    potentialOutcomes: [
      {
        label: "Commercial Tender Readiness",
        description:
          "Professional digital footprint that passes facility manager vetting with ease.",
      },
      {
        label: "EV & Green Tech Positioning",
        description:
          "Clear dedicated service pages capturing growing domestic EV & battery demand.",
      },
      {
        label: "Reclaimed Evenings",
        description: "No more troubleshooting web errors; full ongoing managed support included.",
      },
    ],
    illustrativeQuote:
      "Before working with Harley Digital Works, our website looked like an amateur one-man band and barely loaded on an iPhone. The new platform makes our compliance certifications and commercial capability crystal clear. When main contractors and commercial landlords check us out now, we look like the serious, professional outfit we are. It’s transformed how clients perceive our rates.",
    profileName: "Illustrative Profile: Chris P.",
    profileRole: "Commercial & Domestic Electrical Contractor (West Midlands)",
  },
  {
    id: "building",
    trade: "Builders & Renovation Specialists",
    region: "South & Home Counties",
    icon: Hammer,
    badge: "Extensions & Architectural Joinery",
    beforeHeadline: "Trapped Photos & Commodity Perception",
    beforePoints: [
      "Hundreds of stunning project photos trapped on an old camera roll with nowhere to shine.",
      "Clients treated quotes like commodities, comparing them with cheap unregulated builders.",
      "Unclear scope or payment terms led to difficult client conversations on site.",
      "Zero web presence meant relying 100% on sporadic personal recommendations.",
    ],
    afterHeadline: "Bespoke Portfolio & Pre-Qualified Clients",
    afterPoints: [
      "Curated case studies with high-resolution Before & After sliders showcasing true craftsmanship.",
      "Transparent 50/50 payment expectations and structured project timelines explained clearly.",
      "Affluent homeowners review past builds and specifications before ever booking a site visit.",
      "100% peace of mind: fully backed by The Harley Group with zero homework required.",
    ],
    potentialOutcomes: [
      {
        label: "Pre-Sold Quality",
        description: "Homeowners already respect your standard of finish before you quote.",
      },
      {
        label: "Filtered Enquiries",
        description: "Attracts £40k–£100k+ extensions while politely filtering out tyre-kickers.",
      },
      {
        label: "Professional Pride",
        description: "A digital portfolio that accurately reflects twenty years of building pride.",
      },
    ],
    illustrativeQuote:
      "We do high-end extensions and structural carpentry, but our online presence was completely non-existent. Harley Digital Works took our raw project photos and turned them into a stunning portfolio with proper case studies. Clients now review our craftsmanship before we even meet them on site. They trust our standard from the first click, making quoting a pleasure.",
    profileName: "Illustrative Profile: James & Liam T.",
    profileRole: "Bespoke Carpentry & Building (Surrey & Hampshire)",
  },
  {
    id: "roofing",
    trade: "Roofing & Cladding Contractors",
    region: "Scotland & Northern Borders",
    icon: Home,
    badge: "Pitched, Flat & GRP Systems",
    beforeHeadline: "The Rogue Trader Price War",
    beforePoints: [
      "Fighting cheap cowboy operators in local social media groups for low-margin patch repairs.",
      "Homeowners couldn't verify insurance policies, public liability, or manufacturer guarantees.",
      "Driving miles across the county to quote jobs only to find the homeowner wanted a £50 fix.",
      "Frustration with previous web designers who charged thousands and then vanished.",
    ],
    afterHeadline: "Full Replacement Contracts & Transparent Guarantees",
    afterPoints: [
      "Prominent insurance-backed guarantee badges and drone survey capabilities front and centre.",
      "Clear distinction between quick minor repairs and profitable full-roof replacements.",
      "Structured quote form prompting homeowners for roof type, approximate age, and photos.",
      "WhatsApp care desk: send a photo of a completed roof from the van and it’s live tomorrow.",
    ],
    potentialOutcomes: [
      {
        label: "Bigger Contract Value",
        description:
          "Positions your firm for profitable complete re-roofs rather than patch repairs.",
      },
      {
        label: "Qualified Leads Only",
        description: "Structured intake captures photos and details before you get in the van.",
      },
      {
        label: "24-Hour WhatsApp Updates",
        description: "New roof photos uploaded to your portfolio with a simple text message.",
      },
    ],
    illustrativeQuote:
      "The WhatsApp care desk is the best part of the whole package. When we finish a big roof replacement, I just send across a couple of photos on WhatsApp, and the team updates our portfolio within 24 hours. No logging into messy dashboards, no tech headaches. It just works, and customers take our quotes seriously.",
    profileName: "Illustrative Profile: Callum R.",
    profileRole: "Specialist Roofing Contractor (Central Scotland)",
  },
];

export function CustomerTransformationSection() {
  const [activeTab, setActiveTab] = useState<string>("heating");
  const currentScenario =
    NATIONWIDE_SCENARIOS.find((s) => s.id === activeTab) || NATIONWIDE_SCENARIOS[0];
  const IconComponent = currentScenario.icon;

  return (
    <section
      className="studio-section py-20 bg-stone-50/90 border-y border-stone-200/80"
      id="customer-transformation"
      aria-labelledby="transformation-heading"
    >
      <div className="studio-wrap space-y-16">
        {/* Nationwide Banner & Section Heading */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-300 px-3 py-1 text-xs font-bold text-emerald-950">
              <MapPin size={13} className="text-emerald-700" />
              <span>NATIONWIDE UK SERVICE · ALL TRADES & REGIONS COVERED</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-600/30 px-3 py-1 text-[11px] font-mono font-bold text-amber-900">
              <HelpCircle size={12} className="text-amber-700" />
              <span>ILLUSTRATIVE SCENARIOS · DESIGN STUDY EVIDENCE</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <p className="studio-kicker">03 / REALISTIC CUSTOMER OUTCOMES</p>
              <h2
                id="transformation-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink font-display"
              >
                Before & After Harley Digital Works.
                <br />
                <span className="text-ink-muted">The difference for your daily business.</span>
              </h2>
              <p className="text-base sm:text-lg text-ink-muted max-w-2xl leading-relaxed">
                Most UK tradespeople rely on word of mouth or an old Facebook page because building
                a website takes too much time and energy. Here is how our 100% done-for-you service
                transforms your business—from your first phone call to ongoing peace of mind.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right space-y-2">
              <div className="inline-block p-4 rounded-2xl bg-white border border-stone-200 shadow-xs text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Nationwide Availability
                </p>
                <p className="text-sm font-semibold text-ink mt-0.5">
                  England · Scotland · Wales · NI
                </p>
                <p className="text-xs text-emerald-800 font-medium mt-1">
                  ✓ 100% Done-For-You · Zero Homework
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Overview: The High-Contrast Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Before Card (Friction & Frustration) */}
          <div className="rounded-3xl border border-rose-200 bg-rose-50/40 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 border border-rose-300 px-3 py-1 text-xs font-bold text-rose-900">
                <XCircle size={14} className="text-rose-600" />
                <span>BEFORE · Typical Trade Reality</span>
              </span>
              <span className="text-xs font-mono text-rose-700 font-semibold">The Struggle</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-rose-950">
                The Website Headache & Evening Admin
              </h3>
              <p className="text-sm text-rose-900/80 leading-relaxed">
                You work hard on the tools all day. When you get home, the last thing you want is to
                write website copy or battle technical errors.
              </p>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-rose-900/90">
              <li className="flex items-start gap-2.5">
                <XCircle size={17} className="text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>The "Homework" Trap:</strong> Other web designers expect you to supply all
                  text, write service descriptions, and provide high-res logos.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle size={17} className="text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Treated Like a Commodity:</strong> An outdated site or basic social page
                  forces you to compete on price against cowboys.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle size={17} className="text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Tyre-Kicker Enquiries:</strong> Endless vague calls asking "how much
                  mate?" with zero project specs, measurements, or realistic budget.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle size={17} className="text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Abandoned After Launch:</strong> Once traditional agencies get paid, they
                  disappear—leaving you stranded with broken plugins and security warnings.
                </span>
              </li>
            </ul>
          </div>

          {/* After Card (The HDW Solution) */}
          <div className="rounded-3xl border-2 border-emerald-500/30 bg-[#081B30] text-white p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between gap-4 relative z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 text-xs font-bold text-emerald-300">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>AFTER · The Harley Digital Works Standard</span>
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">100% Managed</span>
            </div>

            <div className="space-y-2 relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Zero Homework & Total Peace of Mind
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                One 20-minute phone call between jobs. We write every word, build your platform, and
                look after your website every single month.
              </p>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 relative z-10">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={17} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>100% Done-For-You Words:</strong> We interview you, extract your
                  expertise, and write every headline, service page, and case study.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={17} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Instant Professional Authority:</strong> Verified badges (Gas Safe,
                  NICEIC, FMB) and pristine photography position you as the premium contractor.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={17} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>High-Quality Quote Enquiries:</strong> Structured mobile forms capture
                  room dimensions, postcodes, and photos so you quote serious work faster.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={17} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>WhatsApp Care Desk (£249/mo):</strong> Need a new project added or
                  emergency hours updated? Send a WhatsApp and it's sorted within 24 hours.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trade Vertical & Nationwide Scenario Selector */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                UK-WIDE TRADE SCENARIOS
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-ink">
                See How Your Trade Could Transform
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              Select your trade vertical to explore realistic outcomes:
            </span>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2.5 p-1.5 bg-stone-200/60 rounded-2xl border border-stone-300/70">
            {NATIONWIDE_SCENARIOS.map((scenario) => {
              const TabIcon = scenario.icon;
              const isSelected = activeTab === scenario.id;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setActiveTab(scenario.id)}
                  className={`flex-1 min-w-[200px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#081B30] text-white shadow-md scale-[1.01]"
                      : "text-stone-700 hover:text-ink hover:bg-white/80"
                  }`}
                  aria-pressed={isSelected}
                >
                  <TabIcon
                    size={16}
                    className={isSelected ? "text-emerald-400" : "text-stone-500"}
                  />
                  <span>{scenario.trade}</span>
                </button>
              );
            })}
          </div>

          {/* Active Scenario Card */}
          <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-lg space-y-8">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#081B30] text-emerald-400 shadow-md">
                  <IconComponent size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-bold text-ink">
                      {currentScenario.trade}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
                      {currentScenario.badge}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                    <MapPin size={11} className="text-stone-400" />
                    <span>Nationwide Example: {currentScenario.region}</span>
                  </p>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <span className="text-xs font-mono text-stone-400 uppercase tracking-wider block">
                  Commercial Package
                </span>
                <span className="text-xs font-bold text-ink">
                  £1,495 Setup (50/50 Split) · £249/mo Care
                </span>
              </div>
            </div>

            {/* Before vs After Scenario Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                  <XCircle size={14} />
                  <span>The Starting Situation</span>
                </span>
                <h4 className="text-base font-bold text-ink">{currentScenario.beforeHeadline}</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                  {currentScenario.beforePoints.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span>The Harley Digital Works Transformation</span>
                </span>
                <h4 className="text-base font-bold text-ink">{currentScenario.afterHeadline}</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                  {currentScenario.afterPoints.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Potential Benefits Cards */}
            <div className="space-y-3">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted">
                DEMONSTRATED POTENTIAL BENEFITS
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentScenario.potentialOutcomes.map((benefit) => (
                  <div
                    key={benefit.label}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-1.5"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                      <TrendingUp size={14} className="text-emerald-600" />
                      <span>{benefit.label}</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Illustrative Customer Testimonial */}
            <div className="rounded-2xl border border-stone-200 bg-[#081B30]/[0.02] p-6 sm:p-8 space-y-4 relative">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-emerald-700" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    Illustrative Customer Scenario
                  </span>
                </div>
                <span className="text-[10px] font-mono text-stone-400 bg-stone-100 px-2 py-0.5 rounded-sm">
                  Design Study Example
                </span>
              </div>

              <blockquote className="text-sm sm:text-base text-ink italic leading-relaxed">
                “{currentScenario.illustrativeQuote}”
              </blockquote>

              <div className="pt-2 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-bold text-ink">{currentScenario.profileName}</p>
                  <p className="text-[11px] text-stone-500">{currentScenario.profileRole}</p>
                </div>
                <span className="text-[11px] text-stone-400">
                  100% Done-For-You · Written by HDW
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Governance Disclaimer (Mandatory) */}
        <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-100/70 p-5 sm:p-6 text-center text-xs text-stone-600 max-w-3xl mx-auto space-y-1.5">
          <p className="font-bold text-stone-800 flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span>Transparent Commercial Governance Notice</span>
          </p>
          <p className="leading-relaxed">
            The customer quotes, profiles, and potential business improvements shown in this section
            are <strong>illustrative examples</strong> created by Harley Digital Works to
            demonstrate typical commercial outcomes for UK trade contractors. In accordance with The
            Harley Group transparency standards, they are design studies and realistic scenarios,
            not verified historical client reviews or guaranteed performance results.
          </p>
        </div>

        {/* Nationwide Call to Action */}
        <div className="rounded-3xl bg-[#081B30] text-white p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              READY TO TAKE THE WEBSITE HEADACHE AWAY?
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-display">
              Wherever you are in the UK, we're ready to help.
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Book a straightforward 20-minute introductory phone call. No homework, no technical
              jargon, and no pushy sales tactics. Just an honest discussion about your trade
              business.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <PillButton
              as="link"
              to="/contact"
              variant="light"
              className="studio-button min-h-[48px] px-6 text-sm font-bold shadow-md cursor-pointer"
            >
              Get your website plan
            </PillButton>
            <a
              href="#packages"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 min-h-[48px] text-xs font-bold text-white hover:bg-white/20 transition-all shadow-xs"
            >
              <span>View £1,495 package details</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 font-mono">
            <span>✓ 50% Deposit / 50% on Approval</span>
            <span>·</span>
            <span>✓ Zero VAT</span>
            <span>·</span>
            <span>✓ 2-Build Monthly Capacity</span>
          </div>
        </div>
      </div>
    </section>
  );
}
