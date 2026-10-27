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
  ArrowRight,
  MapPin,
  TrendingUp,
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
}

const TRADE_SCENARIOS: ScenarioData[] = [
  {
    id: "electrical",
    trade: "Electrical & EV Contractors",
    region: "Bristol, Bath & M4 Corridor",
    icon: Zap,
    badge: "NICEIC & Commercial Compliance",
    beforeHeadline: "Unclear Mobile Navigation & Missing Accreditations",
    beforePoints: [
      "An outdated mobile layout that makes it difficult for site visitors to find services.",
      "Commercial clients and facilities managers unable to verify compliance badges.",
      "Enquiry routing limited to an unmonitored generic mailbox.",
      "Time spent troubleshooting website technical errors during evenings.",
    ],
    afterHeadline: "Clear Commercial Scope & Focused Services",
    afterPoints: [
      "Structured showcase highlighting commercial certificates, EV charging, and installations.",
      "Dual enquiry routing with direct phone and structured specification forms.",
      "Considered, clean presentation that gives clients confidence in your trade capabilities.",
      "Monthly managed care handling hosting, maintenance, and routine content updates.",
    ],
    potentialOutcomes: [
      {
        label: "Commercial Tender Readiness",
        description: "Clear presentation of compliance certifications and insurance credentials.",
      },
      {
        label: "EV & Green Tech Services",
        description: "Dedicated service pages explaining domestic EV and commercial installations.",
      },
      {
        label: "Managed Technical Care",
        description: "Ongoing maintenance, SSL renewal, and hosting handled in your care plan.",
      },
    ],
  },
  {
    id: "heating",
    trade: "Heating & Gas Engineers",
    region: "Bristol, Bath & South West",
    icon: Flame,
    badge: "Gas Safe & Heating Systems",
    beforeHeadline: "Cluttered Layout & Missing Credentials",
    beforePoints: [
      "Dense walls of text that make it hard for customers to find emergency contact details.",
      "No visible Gas Safe registration number or proof of public liability insurance.",
      "No time after a day on site to write technical service descriptions.",
      "Customers asking basic questions because service details are not explained clearly.",
    ],
    afterHeadline: "Clear Heating Packages & Verified Accreditations",
    afterPoints: [
      "Technical copy written from your confirmed business facts, detailing Gas Safe registrations.",
      "Mobile-optimised enquiry form allowing homeowners to explain their heating requirements.",
      "Clear positioning as an established regional heating and boiler business.",
      "Rolling £249/mo care covering seasonal updates and ongoing maintenance.",
    ],
    potentialOutcomes: [
      {
        label: "Clear Service Scope",
        description: "Services and pricing structure explained clearly to homeowners.",
      },
      {
        label: "Copywriting Handled",
        description:
          "Service descriptions and technical details written for you from confirmed facts.",
      },
      {
        label: "Visible Credentials",
        description:
          "Verified accreditations and warranty options presented clearly to build trust.",
      },
    ],
  },
  {
    id: "building",
    trade: "Builders & Renovation Specialists",
    region: "Bristol & Surrounding Areas",
    icon: Hammer,
    badge: "Extensions & Renovations",
    beforeHeadline: "Unorganised Photography & Vague Scope",
    beforePoints: [
      "Project photos stored on mobile phones with no structured portfolio.",
      "Unclear scope or payment expectations leading to extended conversations.",
      "No website to showcase past architectural builds or structural work.",
      "Relying entirely on sporadic word-of-mouth recommendations.",
    ],
    afterHeadline: "Organised Portfolio & Clear Milestones",
    afterPoints: [
      "Curated case studies with high-resolution design comparisons showcasing craftsmanship.",
      "Transparent 50/50 payment expectations and structured project timelines explained clearly.",
      "Homeowners review past builds and specifications before booking a site visit.",
      "Peace of mind with a clear agreement and managed monthly care.",
    ],
    potentialOutcomes: [
      {
        label: "Organised Case Studies",
        description: "High-resolution photography showing completed project standards.",
      },
      {
        label: "Structured Enquiries",
        description: "Detailed enquiry forms capturing drawings, timelines, and project scope.",
      },
      {
        label: "Professional Presentation",
        description: "A digital presence reflecting your standards of finish and craftsmanship.",
      },
    ],
  },
  {
    id: "roofing",
    trade: "Roofing & Cladding Contractors",
    region: "Bristol & M4 Corridor",
    icon: Home,
    badge: "Pitched, Flat & GRP Systems",
    beforeHeadline: "Unverified Guarantees & Basic Forms",
    beforePoints: [
      "Homeowners unable to verify insurance policies, public liability, or guarantees.",
      "Travelling to quote jobs without knowing roof type or approximate age.",
      "Generic web templates with broken contact forms and no photo attachments.",
      "No ongoing technical support after the initial site was launched.",
    ],
    afterHeadline: "Clear Specifications & Structured Intake",
    afterPoints: [
      "Insurance-backed guarantee details and inspection capabilities presented clearly.",
      "Clear distinction between emergency repairs and scheduled roof replacements.",
      "Structured quote form prompting homeowners for roof type, approximate age, and photos.",
      "Monthly care plan providing ongoing updates, security, and hosting.",
    ],
    potentialOutcomes: [
      {
        label: "Clear Workmanship Terms",
        description: "Insurance details and workmanship guarantees clearly set out.",
      },
      {
        label: "Structured Intake",
        description: "Enquiry form captures photos and project details upfront.",
      },
      {
        label: "Ongoing Support",
        description: "Portfolio and service updates handled through your monthly care plan.",
      },
    ],
  },
];

export function CustomerTransformationSection() {
  const [activeTab, setActiveTab] = useState<string>("electrical");
  const currentScenario = TRADE_SCENARIOS.find((s) => s.id === activeTab) || TRADE_SCENARIOS[0];
  const IconComponent = currentScenario.icon;

  return (
    <section
      className="studio-section py-20 bg-stone-50/90 border-y border-stone-200/80"
      id="customer-transformation"
      aria-labelledby="transformation-heading"
    >
      <div className="studio-wrap space-y-16">
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <p className="studio-kicker">03 / REALISTIC TRADE SCENARIOS</p>
              <h2
                id="transformation-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink font-display"
              >
                Before & After Harley Digital Works.
                <br />
                <span className="text-ink-muted">The difference for your daily business.</span>
              </h2>
              <p className="text-base sm:text-lg text-ink-muted max-w-2xl leading-relaxed">
                Most trade businesses rely on word of mouth or an old template because building a
                website takes valuable evening time. Here is how our managed service simplifies your
                digital presence: from discovery to ongoing monthly care.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right space-y-2">
              <div className="inline-block p-4 rounded-2xl bg-white border border-stone-200 shadow-xs text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Pilot Availability
                </p>
                <p className="text-sm font-semibold text-ink mt-0.5">Bristol, Bath & M4 Corridor</p>
                <p className="text-xs text-emerald-800 font-medium mt-1">
                  ✓ Copywriting Included · Managed Monthly Care
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Overview: Feature Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Before Card */}
          <div className="rounded-3xl border border-rose-200 bg-rose-50/40 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 border border-rose-300 px-3 py-1 text-xs font-bold text-rose-900">
                <XCircle size={14} className="text-rose-600" />
                <span>BEFORE · Typical Starting Point</span>
              </span>
              <span className="text-xs font-mono text-rose-700 font-semibold">
                Common Challenges
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-rose-950">
                The Website Admin Burden
              </h3>
              <p className="text-sm text-rose-900/80 leading-relaxed">
                You work on site all day. Finding the time to write website copy, manage hosting,
                and troubleshoot errors is difficult after hours.
              </p>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-rose-900/90">
              <li className="flex items-start gap-2.5">
                <XCircle size={17} className="text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Writing Required:</strong> Generic agencies often ask you to provide all
                  written content, specifications, and layout directions yourself.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle size={17} className="text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Unclear Accreditations:</strong> An outdated site can fail to present your
                  certifications, qualifications, and trade standards clearly.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle size={17} className="text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Unfiltered Enquiries:</strong> Basic contact forms without structured
                  intake make it difficult to evaluate project details.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle size={17} className="text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>No Ongoing Maintenance:</strong> Sites left unmaintained can develop
                  broken links, slow loading speeds, and security certificate issues.
                </span>
              </li>
            </ul>
          </div>

          {/* After Card */}
          <div className="rounded-3xl border-2 border-emerald-500/30 bg-[#081B30] text-white p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between gap-4 relative z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 text-xs font-bold text-emerald-300">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>AFTER · The Harley Digital Works Approach</span>
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">Managed Service</span>
            </div>

            <div className="space-y-2 relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Clear Scope & Ongoing Peace of Mind
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                A straightforward discovery conversation. We write the copy, build the website, and
                provide ongoing monthly care.
              </p>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 relative z-10">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={17} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Copywriting Included:</strong> We extract your trade facts and write every
                  headline, service page, and case study based on your confirmed details.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={17} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Accreditation Display:</strong> Verified badges (Gas Safe, NICEIC, FMB)
                  and clear imagery present your credentials clearly.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={17} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Structured Enquiry Intake:</strong> Mobile-friendly forms capture key
                  project specifications so you can review job details quickly.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={17} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Monthly Care Plan (£249/mo):</strong> Hosting, SSL, security, and a
                  30-minute monthly content edit allowance included.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trade Scenario Selector */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                TRADE DESIGN STUDIES
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-ink">Explore Trade Scenarios</h3>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              Select a trade to review typical improvements:
            </span>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2.5 p-1.5 bg-stone-200/60 rounded-2xl border border-stone-300/70">
            {TRADE_SCENARIOS.map((scenario) => {
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
                    <span>Pilot Region: {currentScenario.region}</span>
                  </p>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <span className="text-xs font-mono text-stone-400 uppercase tracking-wider block">
                  Commercial Offer
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
                  <span>The Harley Digital Works Design Study</span>
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

            {/* Potential Benefits */}
            <div className="space-y-3">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted">
                PRACTICAL OUTCOMES
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
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-100/70 p-5 sm:p-6 text-center text-xs text-stone-600 max-w-3xl mx-auto space-y-1.5">
          <p className="font-bold text-stone-800 flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span>Commercial Governance Notice</span>
          </p>
          <p className="leading-relaxed">
            The trade scenarios above are <strong>design studies</strong> created to illustrate
            typical website structure and copywriting improvements. They do not constitute
            guaranteed commercial results or historical client endorsements.
          </p>
        </div>

        {/* Call to Action */}
        <div className="rounded-3xl bg-[#081B30] text-white p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              READY TO DISCUSS YOUR WEBSITE?
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-display">
              Talk with us about your business.
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Book a straightforward 20-minute introductory phone call with founder Robbie Harley.
              We'll discuss your trade, your services, and the scope for your website.
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
            <span>✓ 50% Deposit / 50% on Final Approval</span>
            <span>·</span>
            <span>✓ Agreed Delivery Schedule</span>
            <span>·</span>
            <span>✓ Up to 2 Builds at a Time</span>
          </div>
        </div>
      </div>
    </section>
  );
}
