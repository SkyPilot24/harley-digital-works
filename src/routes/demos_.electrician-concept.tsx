import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { TradeQuoteCalculator } from "@/components/demos/TradeQuoteCalculator";
import { BeforeAfterSlider } from "@/components/demos/BeforeAfterSlider";
import type { TradeDemoBusiness } from "@/components/demos/TradeDemoData";
import {
  ShieldAlert,
  ShieldCheck,
  Zap,
  PhoneCall,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Info,
  Calendar,
  AlertTriangle,
  FileCheck,
  Check,
  X,
  Star,
} from "lucide-react";

export const Route = createFileRoute("/demos_/electrician-concept")({
  head: () => ({
    meta: [
      { title: "Electrician Staging Concept (Illustrative Prototype) | Harley Digital Works" },
      {
        name: "description",
        content:
          "Private interactive staging blueprint for established electrical contractors. Reusable architecture demonstrating instant quote estimators, accreditation verification, and enquiry triage.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ElectricianConceptPage,
});

// Explicitly illustrative concept data for research demonstration
const ILLUSTRATIVE_ELECTRICIAN: TradeDemoBusiness = {
  id: "electrical",
  name: "Wessex Volt Electrical Ltd (Concept)",
  badge: "NICEIC Approved Contractor [Illustrative #D604921]",
  tagline: "Commercial & Domestic Electrical Contractors · Bristol, Bath & M4 Corridor",
  phone: "01632 960001",
  whatsapp: "07700 900000",
  coverageArea: "Bristol, Bath, Keynsham, Yate, Clevedon & M4/M5 Corridor",
  accreditations: [
    {
      name: "NICEIC Approved Contractor",
      idNumber: "Illustrative Placeholder",
      iconText: "Part P",
    },
    {
      name: "OZEV Authorized Workplace EV",
      idNumber: "Illustrative Placeholder",
      iconText: "OZEV",
    },
    { name: "TrustMark Government Endorsed", iconText: "TrustMark" },
    { name: "£5,000,000 Verified Liability Policy", iconText: "£5M Cover" },
  ],
  rating: {
    score: "4.96",
    reviewsCount: 118,
    platform: "Google Verified [Sample API Integration]",
  },
  heroHeadline: "Reliable Electrical Contracting For Bristol & Bath Projects.",
  heroSubheadline:
    "Specialists in commercial 3-phase power distribution, workplace EV charging hubs, EICR compliance certifications, and premium domestic rewires. Fixed transparent quotes with 6-year workmanship warranty.",
  emergencyBanner:
    "Illustrative Capacity: 2 Engineers On Call · Average Bristol/Bath Dispatch: 45 Mins",
  popularServices: [
    {
      title: "Commercial 3-Phase & Distribution",
      description:
        "Sub-station distribution boards, switchgear replacements, and industrial machinery power drops.",
      turnaround: "Scheduled or Emergency",
      priceGuide: "From £1,250 project rate",
    },
    {
      title: "Workplace & Commercial EV Charging",
      description:
        "Dual-socket 22kW smart chargers with backend billing, load management and OZEV grant compliance.",
      turnaround: "1–3 day installation",
      priceGuide: "From £1,495 inc. infrastructure",
    },
    {
      title: "Landlord & Commercial EICR Inspections",
      description:
        "Full testing, thermal imaging check, and tamper-proof digital certificates issued within 24 hours.",
      turnaround: "Booked within 48h",
      priceGuide: "From £165 flat rate",
    },
    {
      title: "18th Edition Consumer Unit Upgrades",
      description:
        "Metal SPD dual-RCD / RCBO consumer units meeting latest BS7671 safety standards with full sign-off.",
      turnaround: "Same-day completion",
      priceGuide: "From £580 fixed",
    },
  ],
  calculator: {
    title: "Instant Electrical Price Estimator",
    subtitle:
      "Illustrative customer tool: generates accurate ballpark figures in 15 seconds without sales pressure.",
    jobTypes: [
      {
        id: "ev_charger",
        name: "Commercial / Domestic EV Charger (7.4kW - 22kW)",
        basePrice: 850,
        unit: "unit",
        description: "Supply and install smart fast charger with earthing rod and app setup",
      },
      {
        id: "fuse_board",
        name: "18th Edition Metal Consumer Unit",
        basePrice: 580,
        unit: "fixed",
        description: "Full surge protection, RCBOs, testing and NICEIC certificate",
      },
      {
        id: "eicr_cert",
        name: "EICR Electrical Inspection Condition Report",
        basePrice: 175,
        unit: "property",
        description: "Complete visual inspection, live loop impedance testing and PDF certificate",
      },
      {
        id: "rewire",
        name: "Full Property Rewire (First & Second Fix)",
        basePrice: 3800,
        unit: "fixed",
        description: "Complete rewire, chases made good, sockets, lighting, and switchboard",
      },
    ],
    propertySizes: [
      { id: "1-2bed", name: "Small Property / Retail Unit (1-2 Bed)", multiplier: 1.0 },
      { id: "3-4bed", name: "Standard Property / Office (3-4 Bed)", multiplier: 1.35 },
      { id: "5bed_comm", name: "Large Property / Industrial Unit (5+ Bed)", multiplier: 1.8 },
    ],
    urgencyOptions: [
      { id: "routine", name: "Standard Booking (Next 7–14 days)", surcharge: 0 },
      { id: "priority", name: "Priority Window (Next 48–72 hours)", surcharge: 95 },
      { id: "emergency", name: "Same-Day Emergency Response", surcharge: 165 },
    ],
  },
  beforeAfter: {
    title: "Commercial Unit Fuseboard & Sub-Panel Overhaul",
    location: "Avonmouth Industrial Estate, Bristol",
    jobSummary:
      "Replacement of an obsolete 1980s asbestos-backed fuse board with modern Hager commercial panelboard, full surge suppression, and sub-circuit re-labelling.",
    beforeDesc:
      "Outdated re-wirable fuses, failing insulation resistance, dangerous scorch marks, and zero surge protection risking machinery downtime.",
    afterDesc:
      "Fully compliant 18th Edition metal RCBO panel with Type 2 SPD, digital circuit directory, and NICEIC sign-off certificate.",
    badge: "Commercial Refit",
    beforeImage: "/images/home/before-electrical-fusebox.jpg",
    afterImage: "/images/home/after-electrical-consumer-unit.jpg",
  },
  reviews: [
    {
      author: "David M., Facilities Director",
      location: "Clifton, Bristol",
      text: "Turned up on time, carried out the 3-phase upgrade over the weekend to minimize plant downtime, and issued the certification promptly. Superb technical communication throughout.",
      service: "Commercial Distribution Upgrade",
      rating: 5,
    },
    {
      author: "Sarah T., Portfolio Landlord",
      location: "Larkhall, Bath",
      text: "Managed EICRs across 6 rental flats in Bath. Punctual, polite to tenants, and the digital reports landed in my inbox the same evening. First-class service.",
      service: "EICR Compliance",
      rating: 5,
    },
  ],
};

function ElectricianConceptPage() {
  return (
    <PageShell quiet hideChat>
      {/* 1. Mandatory Research & Staging Notice Banner */}
      <section className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-3 text-amber-200">
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-amber-400 shrink-0" />
              <span className="font-mono font-bold tracking-wide uppercase text-amber-400">
                Private Staging Concept
              </span>
              <span className="text-amber-200/60 hidden md:inline">|</span>
              <span className="text-amber-200/90 font-medium">
                Research demonstration prototype for 2–10 person electrical contractors (Bristol
                &amp; Bath pilot hypothesis).
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 rounded text-[11px] font-mono text-amber-300">
              <AlertTriangle className="h-3 w-3" />
              <span>Explicitly illustrative content · Not a live client site</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Positioning & Concept Header */}
      <div className="bg-[#0e121a] border-b border-white/5 py-8">
        <Container>
          <div className="max-w-4xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-gold-400">
              <Zap className="h-4 w-4" />
              <span>VERTICAL BENCHMARK · ELECTRICAL CONTRACTOR ARCHITECTURE</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
              The High-Authority Website Architecture for Established Electrical Contractors
            </h1>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
              This concept models how Harley Digital Works structures an electrical contractor
              platform under the
              <span className="text-white font-semibold">
                {" "}
                Managed (£1,495 setup + £249/mo)
              </span>{" "}
              offer. Designed specifically for established 2–10 person firms to win planned,
              higher-margin commercial, EV, and compliance work while eliminating tyre-kickers.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-xs font-mono">
              <span className="bg-neutral-800/80 border border-neutral-700 text-neutral-300 px-3 py-1.5 rounded-lg">
                Target Team: 2–10 Vans / Electricians
              </span>
              <span className="bg-neutral-800/80 border border-neutral-700 text-neutral-300 px-3 py-1.5 rounded-lg">
                Pilot Region: Bristol, Bath &amp; M4/M5 Corridor
              </span>
              <span className="bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 px-3 py-1.5 rounded-lg">
                Delivery: Agreed Milestone Schedule
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* 3. The Interactive Trade Blueprint Container */}
      <main className="bg-[#12161f] py-12 text-white">
        <Container>
          <div className="space-y-12 max-w-5xl mx-auto">
            {/* Concept Website Mockup Header */}
            <div className="rounded-2xl border border-gold-500/30 bg-neutral-900/95 overflow-hidden shadow-2xl">
              {/* Browser Bar Chrome */}
              <div className="bg-neutral-950 px-4 py-2.5 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 text-neutral-500">
                    staging.harleydigitalworks.com/electrician-concept
                  </span>
                </div>
                <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
                  HDW TRADE TEMPLATE V2
                </span>
              </div>

              {/* Staging Mockup Body */}
              <div className="p-6 md:p-10 space-y-10">
                {/* Mockup Top Navigation Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold">
                        <Zap className="h-4 w-4" />
                      </div>
                      <span className="text-lg font-bold text-white tracking-tight">
                        {ILLUSTRATIVE_ELECTRICIAN.name}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {ILLUSTRATIVE_ELECTRICIAN.tagline}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={`tel:${ILLUSTRATIVE_ELECTRICIAN.phone}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-white px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700"
                    >
                      <PhoneCall className="h-3.5 w-3.5 text-gold-400" />
                      <span>{ILLUSTRATIVE_ELECTRICIAN.phone}</span>
                    </a>
                    <a
                      href="#estimate"
                      className="inline-flex items-center gap-2 text-xs font-bold text-neutral-950 bg-gold-400 hover:bg-gold-300 px-4 py-2 rounded-lg transition-colors"
                    >
                      <span>Get Instant Estimate</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* Mockup Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-mono font-medium">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>{ILLUSTRATIVE_ELECTRICIAN.badge}</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                      {ILLUSTRATIVE_ELECTRICIAN.heroHeadline}
                    </h2>
                    <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                      {ILLUSTRATIVE_ELECTRICIAN.heroSubheadline}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {ILLUSTRATIVE_ELECTRICIAN.accreditations.map((acc, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 bg-neutral-800/80 border border-neutral-700/80 px-2.5 py-1 rounded text-xs text-neutral-200"
                        >
                          <span>{acc.iconText}</span>
                          <span className="font-medium">{acc.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-neutral-950/80 border border-neutral-800 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800">
                      <span className="font-mono text-emerald-400 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        DIRECT DESK TRIAGE
                      </span>
                      <span>Bristol &amp; Bath Hub</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <p className="text-neutral-300 font-medium">
                        Why contractor websites lose high-margin work:
                      </p>
                      <ul className="space-y-1.5 text-neutral-400 text-[11px]">
                        <li className="flex items-start gap-1.5">
                          <X className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
                          <span>
                            Generic forms don’t collect property size or phase requirements.
                          </span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <X className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
                          <span>No instant estimate forces clients into telephone quote tag.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>Our system triages leads instantly into email and WhatsApp.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-2">
                      <a
                        href="#estimate"
                        className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-gold-400 text-neutral-950 font-bold text-xs py-2.5"
                      >
                        Try The Live Estimator Below
                      </a>
                    </div>
                  </div>
                </div>

                {/* Popular Services Grid */}
                <div className="space-y-4 pt-4 border-t border-neutral-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">Core Contract Specialisms</h3>
                      <p className="text-xs text-neutral-400">
                        Positioned to capture commercial, landlord and high-value residential work.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-gold-400 hidden sm:inline">
                      BS7671 COMPLIANT COPY
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ILLUSTRATIVE_ELECTRICIAN.popularServices.map((svc, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-sm text-white">{svc.title}</h4>
                          <span className="text-[11px] font-mono text-gold-400/90 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20 shrink-0">
                            {svc.priceGuide}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          {svc.description}
                        </p>
                        <div className="text-[11px] text-neutral-500 font-mono">
                          Turnaround: {svc.turnaround}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reused Component: Interactive Quote Estimator */}
                <div id="estimate" className="pt-4 border-t border-neutral-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-gold-400">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>CONVERSION ENGINE (INCLUDED IN MANAGED SETUP)</span>
                  </div>
                  <TradeQuoteCalculator business={ILLUSTRATIVE_ELECTRICIAN} />
                </div>

                {/* Reused Component: Before & After Proof */}
                <div className="pt-4 border-t border-neutral-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-gold-400">
                    <FileCheck className="h-3.5 w-3.5" />
                    <span>VISUAL VERIFICATION WORKFLOW (ILLUSTRATIVE PLACEHOLDER)</span>
                  </div>
                  <BeforeAfterSlider business={ILLUSTRATIVE_ELECTRICIAN} />
                </div>

                {/* Illustrative Reviews Strip */}
                <div className="pt-4 border-t border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        Google &amp; Checkatrade Review Integration
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Illustrative mockup: live sites pull verified reviews directly via verified
                        Google API.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 inline-flex items-center gap-1">
                      4.96 <Star className="h-3 w-3 fill-current text-amber-400" /> (118 Reviews)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ILLUSTRATIVE_ELECTRICIAN.reviews.map((rev, rIdx) => (
                      <div
                        key={rIdx}
                        className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between text-neutral-400">
                          <span className="font-semibold text-white">{rev.author}</span>
                          <span>{rev.location}</span>
                        </div>
                        <p className="text-neutral-300 italic">"{rev.text}"</p>
                        <div className="text-[11px] text-gold-400 font-mono">
                          Service: {rev.service}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Commercial Offer & Boundary Alignment Box */}
            <div className="rounded-2xl border border-neutral-700 bg-neutral-900/90 p-6 md:p-8 space-y-6">
              <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
                <div>
                  <span className="text-xs font-mono text-gold-400 uppercase tracking-wider font-semibold">
                    Prompt 2 Commercial Offer Alignment
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
                    Managed Digital Operating Presence
                  </h3>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-2xl font-black text-white font-mono">£1,495 setup</div>
                  <div className="text-sm text-gold-400 font-mono">+ £249/mo rolling care</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs border-t border-neutral-800 pt-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-white uppercase font-mono text-[11px]">
                    1. Setup &amp; Architecture
                  </h4>
                  <ul className="space-y-1.5 text-neutral-300">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>5-Page custom template architecture</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>BS7671 trade copywriting included</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Instant price estimator engine</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Email &amp; MX record preservation</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white uppercase font-mono text-[11px]">
                    2. Monthly Care Scope
                  </h4>
                  <ul className="space-y-1.5 text-neutral-300">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Cloudflare edge hosting &amp; SSL</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>One 30-min content edit batch/mo</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Lead routing health checks</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Google Profile upkeep &amp; reviews</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white uppercase font-mono text-[11px]">
                    3. Operational Boundaries
                  </h4>
                  <ul className="space-y-1.5 text-neutral-300">
                    <li className="flex items-center gap-1.5">
                      <Info className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span>Agreed milestone schedule from intake</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Info className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span>Rolling monthly care (30 days notice)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Info className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span>Client owns domain &amp; Google assets</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Info className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span>No long lock-ins or ad spend tie-ins</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-800">
                <p className="text-xs text-neutral-400">
                  Ready to test this concept with prospective electrical contractors in Bristol
                  &amp; Bath?
                </p>
                <div className="flex items-center gap-3">
                  <PillButton as="link" to="/contact" variant="dark">
                    Contact Founder Desk
                  </PillButton>
                  <PillButton as="link" to="/demos" variant="ghost">
                    All Trade Blueprints
                  </PillButton>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </PageShell>
  );
}
