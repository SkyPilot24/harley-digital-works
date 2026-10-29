import { useState, useId } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { BeforeAfterSlider } from "@/components/demos/BeforeAfterSlider";
import type { TradeDemoBusiness } from "@/components/demos/TradeDemoData";
import {
  Zap,
  ShieldCheck,
  PhoneCall,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Lock,
  Calendar,
  MessageCircle,
  FileCheck,
  Sliders,
  Check,
  ChevronRight,
  Flame,
  Building2,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/demos_/electrician-concept")({
  head: () => ({
    meta: [
      {
        title: "Flagship Electrical Contractor Architecture | Harley Digital Works",
      },
      {
        name: "description",
        content:
          "Cinematic, high-conversion website architecture built specifically for established UK electrical contractors in Bristol, Bath, and the M4 Corridor.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ElectricianConceptPage,
});

interface EstimateService {
  id: string;
  name: string;
  basePrice: number;
  unit: string;
  tag: string;
  description: string;
}

const ESTIMATE_SERVICES: EstimateService[] = [
  {
    id: "fuse_board",
    name: "18th Edition Metal Consumer Unit",
    basePrice: 650,
    unit: "fixed",
    tag: "High Demand",
    description:
      "Hager/Schneider metal RCBO split-load board with Type 2 SPD surge protection & NICEIC certificate.",
  },
  {
    id: "ev_charger",
    name: "Smart EV Charger Installation",
    basePrice: 795,
    unit: "unit",
    tag: "OZEV Approved",
    description:
      "7.4kW–22kW smart tethered/untethered charger, earthing rod, dynamic load management & mobile app.",
  },
  {
    id: "eicr_cert",
    name: "Landlord & Commercial EICR",
    basePrice: 165,
    unit: "property",
    tag: "24h Certificate",
    description:
      "Comprehensive live testing, thermal imaging check, and tamper-proof digital PDF safety certificate.",
  },
  {
    id: "distribution",
    name: "Commercial 3-Phase & Distribution",
    basePrice: 1450,
    unit: "project",
    tag: "Commercial",
    description:
      "Sub-main distribution panels, factory switchgear overhaul, and heavy machinery power drops.",
  },
];

const PROPERTY_TIERS = [
  { id: "compact", name: "1–2 Bed Flat / Small Retail", multiplier: 1.0 },
  { id: "standard", name: "3–4 Bed Semi / Commercial Office", multiplier: 1.35 },
  { id: "large", name: "5+ Bed Detached / Industrial Unit", multiplier: 1.85 },
];

const URGENCY_TIERS = [
  { id: "routine", name: "Standard Booking (7–14 days)", surcharge: 0 },
  { id: "priority", name: "Priority Window (48–72 hours)", surcharge: 85 },
  { id: "emergency", name: "Same-Day Emergency Dispatch", surcharge: 160 },
];

// Structured Demo Business Model for BeforeAfterSlider and Meta
const DEMO_BUSINESS_DATA: TradeDemoBusiness = {
  id: "electrical",
  name: "Vanguard Electrical & Solar Ltd (Flagship Demo)",
  badge: "NICEIC Approved Contractor [your number]",
  tagline: "Commercial & Domestic Electrical Contractors · Bristol, Bath & M4 Corridor",
  phone: "0117 214 1357",
  whatsapp: "07394 041487",
  coverageArea: "Bristol, Bath, Keynsham, Yate, Clevedon & M4/M5 Corridor",
  accreditations: [
    { name: "NICEIC Approved Contractor", idNumber: "Part P Registered", iconText: "NICEIC" },
    { name: "OZEV Authorized Workplace EV", idNumber: "Grant Eligible", iconText: "OZEV" },
    { name: "TrustMark Government Endorsed", iconText: "TrustMark" },
    { name: "£5,000,000 Verified Liability Policy", iconText: "£5M Cover" },
  ],
  rating: {
    score: "4.98",
    reviewsCount: 118,
    platform: "Google Verified [Demonstration Feed]",
  },
  heroHeadline: "Engineered for Precision. Certified for Bristol & Bath.",
  heroSubheadline:
    "Specialists in commercial 3-phase power distribution, workplace EV charging hubs, EICR compliance certifications, and premium domestic rewires. Fixed transparent quotes with 6-year workmanship warranty.",
  emergencyBanner: "2 On-Call Crews Active in Bristol & Bath · 45-Min Average Response",
  popularServices: [],
  calculator: {
    title: "Instant Electrical Price Estimator",
    subtitle:
      "Illustrative customer tool: generates accurate ballpark figures in 15 seconds without sales pressure.",
    jobTypes: [],
    propertySizes: [],
    urgencyOptions: [],
  },
  beforeAfter: {
    title: "Commercial & Domestic Consumer Unit Replacement",
    location: "Clifton & Avonmouth Industrial Estates, Bristol",
    jobSummary:
      "Full switchgear overhaul: removed dangerous re-wirable fuses, installed Hager metal dual-RCD RCBO board, Type 2 SPD surge suppression, and issued NICEIC certificate.",
    beforeDesc:
      "Outdated asbestos-backed rewirable fusebox with burnt terminals, lack of RCD protection, and zero surge suppression.",
    afterDesc:
      "Clean 18th Edition metal RCBO split-load board with surge protection, labelled circuits, and digital EICR certificate.",
    badge: "18th Edition BS7671 Sign-Off",
    beforeImage: "/images/home/before-electrical-fusebox.jpg",
    afterImage: "/images/home/after-electrical-consumer-unit.jpg",
  },
  reviews: [],
};

function ElectricianConceptPage() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("fuse_board");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("standard");
  const [selectedUrgencyId, setSelectedUrgencyId] = useState<string>("routine");

  const serviceIdInput = useId();
  const propertyIdInput = useId();
  const urgencyIdInput = useId();

  const activeService =
    ESTIMATE_SERVICES.find((s) => s.id === selectedServiceId) || ESTIMATE_SERVICES[0];
  const activeProperty =
    PROPERTY_TIERS.find((p) => p.id === selectedPropertyId) || PROPERTY_TIERS[1];
  const activeUrgency = URGENCY_TIERS.find((u) => u.id === selectedUrgencyId) || URGENCY_TIERS[0];

  const estimatedTotal = Math.round(
    activeService.basePrice * activeProperty.multiplier + activeUrgency.surcharge,
  );

  const whatsappMessage = encodeURIComponent(
    `Hi Vanguard Electrical, I used your online estimator for a "${activeService.name}" for a ${activeProperty.name} (${activeUrgency.name}). Estimated guide: ~£${estimatedTotal}. Can we discuss availability?`,
  );

  return (
    <PageShell quiet hideChat>
      {/* 1. Founder & Client Governance Staging Header */}
      <aside
        aria-label="Private Staging Notice"
        className="bg-[#050D18] border-b border-amber-500/20 text-xs px-4 py-2.5 text-amber-200"
      >
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <strong className="font-mono text-amber-300 uppercase tracking-wider text-[11px]">
                Design Study · Fictional Business
              </strong>
              <span className="text-amber-500/40 hidden md:inline">|</span>
              <span className="text-amber-200/80 hidden md:inline">
                &ldquo;Vanguard Electrical&rdquo; is not a real company. Accreditations, crews,
                response times and ratings are placeholders to show where yours would go.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-neutral-400">
                Managed Offer: £1,495 setup + £249/mo
              </span>
              <Link
                to="/contact"
                search={{
                  package: "managed",
                  service: undefined,
                  domain: undefined,
                  websiteUrl: undefined,
                }}
                className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4 text-[11px]"
              >
                Book 1 of 2 Pilot Build Slots →
              </Link>
            </div>
          </div>
        </Container>
      </aside>

      {/* 2. Top Emergency & Dispatch Bar */}
      <div className="bg-[#081B30] text-slate-100 text-xs py-2 px-4 border-b border-white/10">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                ON DUTY
              </span>
              <span className="text-slate-300">
                <strong>Emergency Response Available:</strong> 2 crews active across Bristol, Bath
                &amp; Keynsham.
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-300 font-medium">
              <span className="hidden sm:inline text-slate-400">Average Dispatch: 42 mins</span>
              <a
                href="tel:01172141357"
                className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold"
              >
                <PhoneCall className="h-3 w-3" />
                <span>0117 214 1357</span>
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* 3. Cinematic Hero Section (MotionSites Layout & Liquid Glass Surface) */}
      <header className="relative bg-[#081B30] text-white pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-white/5">
        {/* Subtle Background Radial & Grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 20%, rgba(245, 158, 11, 0.15) 0%, transparent 60%), linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 48px 48px, 48px 48px",
          }}
        />

        <Container>
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs text-amber-300 font-mono tracking-wide">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span>NICEIC APPROVED CONTRACTOR [YOUR NUMBER] · EXAMPLE BADGE</span>
            </div>

            {/* Cinematic Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-balance leading-[1.05]">
              Engineered for Precision.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
                Certified for Bristol &amp; Bath.
              </span>
            </h1>

            {/* Subline */}
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-balance">
              Specialist electrical contracting for commercial facilities, landlord compliance, and
              high-spec homes. From rapid 18th-Edition consumer unit overhauls to turnkey commercial
              EV infrastructure.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <a
                href="#estimate-engine"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm tracking-tight shadow-lg shadow-amber-400/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Calculate Your Project Estimate</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href={`https://wa.me/447394041487?text=${encodeURIComponent(
                  "Hi Vanguard Electrical, I'd like to book an electrician consultation in Bristol/Bath.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm backdrop-blur-md border border-white/10 transition-all"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>1-Tap WhatsApp Dispatch</span>
              </a>
            </div>

            {/* Trust Proof Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 max-w-3xl mx-auto text-left">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <p className="text-[11px] font-mono text-amber-400 font-semibold">
                  PART P REGISTERED
                </p>
                <p className="text-xs text-slate-200 font-medium mt-0.5">
                  Building Control Sign-Off
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <p className="text-[11px] font-mono text-amber-400 font-semibold">
                  £5,000,000 COVER
                </p>
                <p className="text-xs text-slate-200 font-medium mt-0.5">
                  Commercial Public Liability
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <p className="text-[11px] font-mono text-amber-400 font-semibold">OZEV CERTIFIED</p>
                <p className="text-xs text-slate-200 font-medium mt-0.5">Workplace &amp; Home EV</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <p className="text-[11px] font-mono text-amber-400 font-semibold">6-YR WARRANTY</p>
                <p className="text-xs text-slate-200 font-medium mt-0.5">NICEIC Insurance Backed</p>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* 4. Interactive Before & After Consumer Unit Overhaul */}
      <section className="py-16 md:py-24 bg-[#0B1522] text-white border-b border-white/5">
        <Container>
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-medium">
                <Sliders className="h-3.5 w-3.5" />
                <span>INTERACTIVE 18TH-EDITION BENCHMARK</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-balance">
                Drag to Compare: Outdated Fusebox vs. Modern RCBO Board
              </h2>
              <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                See how a hazardous 1980s asbestos-backed rewirable fusebox is upgraded into an
                18th-Edition metal Hager board with full Type 2 surge suppression.
              </p>
            </div>

            <div className="bg-[#101F33] p-4 sm:p-6 rounded-3xl border border-white/10 shadow-2xl">
              <BeforeAfterSlider business={DEMO_BUSINESS_DATA} />
            </div>
          </div>
        </Container>
      </section>

      {/* 5. High-Converting Interactive Job Estimator Engine */}
      <section id="estimate-engine" className="py-16 md:py-24 bg-[#081B30] text-white">
        <Container>
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
                <Sparkles className="h-3.5 w-3.5" />
                <span>TRANSPARENT PRICING · NO HIGH-PRESSURE SALES</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-balance">
                Interactive Project Estimator
              </h2>
              <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                Select your service, premises size, and urgency to generate an instant transparent
                ballpark quote in 15 seconds.
              </p>
            </div>

            {/* Estimator Card */}
            <div className="bg-[#0E223D] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
              {/* Step 1: Select Service */}
              <div className="space-y-3">
                <label
                  htmlFor={serviceIdInput}
                  className="text-xs font-mono text-amber-400 uppercase tracking-wider block font-semibold"
                >
                  1. Select Electrical Service Specialism
                </label>
                <div id={serviceIdInput} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ESTIMATE_SERVICES.map((service) => {
                    const isSelected = service.id === selectedServiceId;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`text-left p-4 rounded-2xl border transition-all ${
                          isSelected
                            ? "bg-amber-400/10 border-amber-400 text-white shadow-md shadow-amber-400/10"
                            : "bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05] hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-white">{service.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-amber-300">
                            {service.tag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-white/5 font-mono">
                          <span className="text-slate-400">Guide Rate:</span>
                          <span className="text-amber-300 font-bold">
                            From £{service.basePrice}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Select Property Size */}
              <div className="space-y-3">
                <label
                  htmlFor={propertyIdInput}
                  className="text-xs font-mono text-amber-400 uppercase tracking-wider block font-semibold"
                >
                  2. Select Property Scale
                </label>
                <div id={propertyIdInput} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PROPERTY_TIERS.map((tier) => {
                    const isSelected = tier.id === selectedPropertyId;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedPropertyId(tier.id)}
                        className={`text-left p-3.5 rounded-xl border text-xs transition-all ${
                          isSelected
                            ? "bg-amber-400/10 border-amber-400 text-white font-semibold"
                            : "bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{tier.name}</span>
                          {isSelected && <Check className="h-3.5 w-3.5 text-amber-400" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Select Urgency */}
              <div className="space-y-3">
                <label
                  htmlFor={urgencyIdInput}
                  className="text-xs font-mono text-amber-400 uppercase tracking-wider block font-semibold"
                >
                  3. Select Timing &amp; Dispatch Urgency
                </label>
                <div id={urgencyIdInput} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {URGENCY_TIERS.map((urgency) => {
                    const isSelected = urgency.id === selectedUrgencyId;
                    return (
                      <button
                        key={urgency.id}
                        type="button"
                        onClick={() => setSelectedUrgencyId(urgency.id)}
                        className={`text-left p-3.5 rounded-xl border text-xs transition-all ${
                          isSelected
                            ? "bg-amber-400/10 border-amber-400 text-white font-semibold"
                            : "bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{urgency.name}</span>
                          {urgency.surcharge > 0 && (
                            <span className="text-[10px] text-amber-300 font-mono">
                              +£{urgency.surcharge}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Real-time Calculation Result Bar */}
              <div className="p-6 rounded-2xl bg-[#091524] border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Estimated Written Guide Price
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">
                      ~£{estimatedTotal}
                    </span>
                    <span className="text-xs text-slate-400">
                      (Includes full testing &amp; NICEIC Part P certificate)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Fixed written quotation provided following site survey or photo audit. Zero
                    hidden fees.
                  </p>
                </div>

                <a
                  href={`https://wa.me/447394041487?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm tracking-tight shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Send Estimate to WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Why This Converts & Client Acquisition Explainer */}
      <section className="py-16 bg-[#0B1522] text-white border-t border-white/5">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-balance">
              Why Electrical Contractors Lose 60% of High-Margin Enquiries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-xs">
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                <p className="font-bold text-rose-300 font-mono uppercase tracking-wide">
                  Traditional Trade Sites (The Failure)
                </p>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>
                      Generic contact forms ask "How can we help?" with zero qualifying questions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>
                      No instant ballpark figures force customers to ring 5 competitors on
                      Checkatrade.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>
                      Missing or unverified Part P / NICEIC badges destroy trust on £2,000+
                      commercial jobs.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
                <p className="font-bold text-emerald-300 font-mono uppercase tracking-wide">
                  Harley Digital Works Architecture (The Fix)
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>
                      Interactive 15-second estimator qualifies job scale, property size, and budget
                      upfront.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>
                      Direct dispatch into WhatsApp and mobile SMS with full job details pre-filled.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>
                      Full 100% done-for-you copywriting, hosting, SSL, and monthly care for
                      £249/mo.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Final CTA for Robbie to Show Prospect */}
            <div className="pt-6">
              <Link
                to="/contact"
                search={{
                  package: "managed",
                  service: undefined,
                  domain: undefined,
                  websiteUrl: undefined,
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm tracking-tight shadow-xl shadow-amber-400/20 transition-all hover:scale-[1.02]"
              >
                <span>Launch This Architecture For Your Firm (£1,495 Setup)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-xs text-slate-400 mt-3 font-mono">
                Agreed delivery milestone schedule · Strictly maximum 2 active builds at once
              </p>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
