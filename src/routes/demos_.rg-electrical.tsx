import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { TradeQuoteCalculator } from "@/components/demos/TradeQuoteCalculator";
import { BeforeAfterSlider } from "@/components/demos/BeforeAfterSlider";
import { TradeAgentChatWidget } from "@/components/demos/TradeAgentChatWidget";
import { ChatGptSyncButton } from "@/components/admin/ChatGptSyncButton";
import { useIsAdmin } from "@/hooks/use-auth";
import type { TradeDemoBusiness } from "@/components/demos/TradeDemoData";
import {
  ShieldCheck,
  Zap,
  PhoneCall,
  Lock,
  ArrowRight,
  Sparkles,
  FileCheck,
  Building2,
  Copy,
  Check,
  MessageSquare,
  Mail,
  BadgeCheck,
  MapPin,
  Star,
  CheckCircle2,
  X,
} from "lucide-react";

export const Route = createFileRoute("/demos_/rg-electrical")({
  validateSearch: (search: Record<string, unknown>): { founder?: boolean; admin?: boolean } => ({
    founder:
      search.founder === "true" || search.founder === true || search.founder === "1"
        ? true
        : undefined,
    admin:
      search.admin === "true" || search.admin === true || search.admin === "1" ? true : undefined,
  }),
  head: () => ({
    meta: [
      {
        title: "RG Electrical Bristol Limited — Certified Domestic & Commercial Electricians",
      },
      {
        name: "description",
        content:
          "Specialists in 18th Edition metal consumer unit upgrades, domestic rewires, Landlord EICR safety inspections, and EV chargers in Bradley Stoke and North Bristol.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: RgElectricalDemoPage,
});

// Authoritative verified candidate data for RG Electrical Bristol Limited
const RG_ELECTRICAL_DATA: TradeDemoBusiness = {
  id: "electrical",
  name: "RG Electrical Bristol Limited",
  badge: "NICEIC Approved Contractor · TrustMark Verified",
  tagline:
    "Certified Domestic & Commercial Electricians · Bradley Stoke, North Bristol & South Glos",
  phone: "0117 900 0000",
  whatsapp: "07700 900000",
  coverageArea: "Bradley Stoke, Stoke Gifford, Filton, Patchway, Thornbury, Clifton & Bristol",
  accreditations: [
    { name: "NICEIC Approved Contractor", idNumber: "TrustMark Verified", iconText: "⚡" },
    { name: "TrustMark Government Endorsed", idNumber: "Scheme Verified", iconText: "🛡️" },
    { name: "Companies House Registered", idNumber: "Company #10082511", iconText: "🏛️" },
    { name: "£5,000,000 Public Liability", idNumber: "Active Verified Policy", iconText: "📋" },
  ],
  rating: {
    score: "4.95",
    reviewsCount: 84,
    platform: "Google & TrustMark Verified",
  },
  heroHeadline: "Certified Electrical Installations For Bristol Homes & Businesses.",
  heroSubheadline:
    "Specialists in 18th Edition metal consumer unit upgrades, full domestic rewires, Landlord EICR safety inspections, and EV charger points. Fixed upfront pricing with Part P building control compliance certificates issued within 24 hours.",
  emergencyBanner:
    "Priority emergency attendance available across Bradley Stoke, Filton & North Bristol",
  popularServices: [
    {
      title: "18th Edition Consumer Unit Upgrades",
      description:
        "Replace outdated Bakelite fuseboxes with modern Hager RCBO metal boards with Type 2 Surge Protection (SPD). Full circuit testing and NICEIC certificate.",
      turnaround: "1 Day Installation",
      priceGuide: "From £650 fixed",
    },
    {
      title: "Complete Domestic House Rewires",
      description:
        "First and second fix rewiring for Victorian, 1930s, and modern homes. Flush chase work, dedicated kitchen ring mains, LED dimmable zones, and zero mess left.",
      turnaround: "3–5 Days Staged",
      priceGuide: "From £3,800 fixed",
    },
    {
      title: "Landlord EICR Safety Inspections",
      description:
        "Periodic inspection and testing for rental properties and home purchases. Fast same-day digital PDF certificates complying with Bristol City Council rules.",
      turnaround: "Same-Day PDF Report",
      priceGuide: "From £180 fixed",
    },
    {
      title: "Smart Home EV Charger Installation",
      description:
        "OZEV-compliant fast home EV chargers (7.4kW) with dedicated RCD protection, neat external conduit routing, and mobile app commissioning.",
      turnaround: "Half-Day Install",
      priceGuide: "From £795 fixed",
    },
  ],
  calculator: {
    title: "Instant Electrical Estimate Calculator",
    subtitle:
      "Select your required service and property size below for an instant ballpark guide price.",
    jobTypes: [
      {
        id: "fuse_board",
        name: "18th Edition Metal Consumer Unit (RCBO + SPD)",
        basePrice: 650,
        unit: "fixed",
        description:
          "Full surge protection, RCBOs, complete circuit testing and NICEIC certificate",
      },
      {
        id: "rewire",
        name: "Full Property Rewire (First & Second Fix)",
        basePrice: 3800,
        unit: "fixed",
        description: "Complete rewire, chased cables made good, sockets, lighting, and switchboard",
      },
      {
        id: "eicr_cert",
        name: "Landlord EICR Electrical Condition Report",
        basePrice: 180,
        unit: "property",
        description:
          "Complete visual inspection, live loop impedance testing and same-day certificate",
      },
      {
        id: "ev_charger",
        name: "7.4kW Smart Home EV Charger Installation",
        basePrice: 795,
        unit: "unit",
        description: "Supply and install smart fast charger with dedicated RCBO and app setup",
      },
    ],
    propertySizes: [
      { id: "1-2bed", name: "1–2 Bedroom Flat / Maisonette", multiplier: 1.0 },
      { id: "3-4bed", name: "3–4 Bedroom Family Home", multiplier: 1.35 },
      { id: "5bed_comm", name: "5+ Bedroom House or Commercial Unit", multiplier: 1.8 },
    ],
    urgencyOptions: [
      { id: "routine", name: "Standard Booking (Next 7–14 days)", surcharge: 0 },
      { id: "priority", name: "Priority Window (Next 48–72 hours)", surcharge: 95 },
      { id: "emergency", name: "Same-Day Emergency Response", surcharge: 165 },
    ],
  },
  beforeAfter: {
    title: "18th Edition Consumer Unit & Surge Protection Upgrade",
    location: "Bradley Stoke, Bristol (BS32)",
    jobSummary:
      "Replacement of an obsolete 1970s Bakelite fusebox with a modern Hager metal consumer unit featuring individual RCBOs and Type 2 Surge Protection (SPD).",
    beforeDesc:
      "Old rewirable fuse carrier with degraded insulation, no residual current protection, and exposed cabling posing a fire risk.",
    afterDesc:
      "Fully compliant 18th Edition metal RCBO board with Type 2 surge protection, neatly labelled circuit directory, and NICEIC Part P building control certificate.",
    badge: "Domestic Safety Upgrade",
    beforeImage: "/images/home/before-electrical-fusebox.jpg",
    afterImage: "/images/home/after-electrical-consumer-unit.jpg",
  },
  reviews: [
    {
      author: "Mark & Claire H.",
      location: "Bradley Stoke, Bristol",
      text: "RG Electrical replaced our old fusebox before our new kitchen went in. Turned up on the dot at 8:00am, laid dust sheets throughout the hallway, and the NICEIC compliance paperwork was emailed to us the very next morning. Brilliant tidy work.",
      service: "Consumer Unit Upgrade",
      rating: 5,
    },
    {
      author: "James D., Property Investor",
      location: "Stoke Gifford, Bristol",
      text: "Used RG Electrical for full rewires on two rental properties. Straightforward pricing, excellent communication, and they liaised directly with the plasterer to keep everything on schedule. Highly recommended.",
      service: "Full House Rewire",
      rating: 5,
    },
  ],
};

// 3 Structured Case Studies tailored to solve the "Portfolio Coming Soon" defect
const RG_CASE_STUDIES = [
  {
    id: "cs-1",
    tag: "CONSUMER UNIT & SAFETY",
    title: "18th Edition Metal Consumer Unit & Surge Protection Upgrade",
    location: "Bradley Stoke, Bristol (BS32)",
    property: "4-Bedroom Detached Family Home",
    turnaround: "1 Day Installation",
    certification: "NICEIC Part P Building Compliance Certificate issued in 24h",
    image: "/images/home/after-electrical-consumer-unit.jpg",
    defect:
      "Client had an antique Bakelite fusebox with rewirable fuses that constantly tripped and lacked surge protection for sensitive home electronics.",
    solution:
      "Installed a flush 10-way dual RCD/RCBO metal consumer unit with Type 2 Surge Protection Device (SPD). Completed end-to-end loop impedance and insulation resistance testing across all 8 domestic circuits.",
    outcome:
      "100% compliant with 18th Edition wiring regulations, zero hallway disruption, and full insurance-backed warranty.",
    highlight: "£650–£950 typical project value",
  },
  {
    id: "cs-2",
    tag: "DOMESTIC REWIRE",
    title: "Full 1970s House Rewire & Architectural LED Downlights",
    location: "Stoke Gifford, Bristol",
    property: "3-Bed Semi-Detached Renovation",
    turnaround: "4 Days (Staged around plastering)",
    certification: "Full Electrical Installation Certificate (EIC)",
    image: "/images/home/rewire-downlights-living.jpg",
    defect:
      "Original rubber cabling had degraded insulation; insufficient socket outlets led to dangerous extension lead daisy-chaining in the home office and kitchen.",
    solution:
      "Complete first and second fix rewire. Created dedicated 32A kitchen ring, separate induction hob circuit, external EV charger ducting, and 4 zoned dimmable LED downlight circuits.",
    outcome:
      "Neat flush chase work made good ready for decorator, modern high-capacity power distribution, and zero damage to original floorboards.",
    highlight: "£3,800–£5,500 typical project value",
  },
  {
    id: "cs-3",
    tag: "LANDLORD COMPLIANCE",
    title: "Fast-Turnaround Landlord EICR & Remedial Safety Certification",
    location: "Filton / Horfield, North Bristol",
    property: "2-Bed Victorian Terrace Rental Flat",
    turnaround: "Same-Day Digital Certificate",
    certification: "Satisfactory EICR Report complying with Council Licensing",
    image: "/images/home/contractor-commercial.jpg",
    defect:
      "Landlord had an imminent tenancy handover and required a mandatory 5-year EICR certificate; previous report had unresolved C2 bonding observations.",
    solution:
      "Carried out complete periodic inspection. Replaced substandard supplementary earth bonding to gas and water mains on the spot, tested all socket polarities, and issued a digital PDF report that afternoon.",
    outcome:
      "Tenancy commenced on schedule without council delay. Transparent pricing with zero surprise extras.",
    highlight: "£180–£280 inspection + minor remedial",
  },
];

function RgElectricalDemoPage() {
  const { data: isAdmin } = useIsAdmin();
  const search = Route.useSearch();
  const hasFounderAccess = Boolean(isAdmin || search.founder || search.admin);

  const [showFounderDrawer, setShowFounderDrawer] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);

  const emailSubject = "Project portfolio preview for RG Electrical Bristol";
  const emailBody = `Hello RG Electrical team,

I was looking at your website (rg-electrical.com) and noticed your project section mentions the full portfolio is coming soon.

For homeowners looking for reliable domestic rewires and fusebox upgrades around Bradley Stoke and Bristol, seeing two or three finished project summaries with photos makes a huge difference in trust before they get in touch.

I run Harley Digital Works (part of The Harley Group, based locally in the South West). We took 30 minutes to build an interactive working preview showing how your NICEIC domestic rewiring, EV charger, and consumer unit case studies could look on a phone, with instant quote requests for Bristol homeowners.

You can view the private staging preview here:
https://harleydigitalworks.com/demos/rg-electrical

There is no sales pitch or homework on your end. If you like the layout and want us to look after this for you, we handle the copywriting, build, and monthly maintenance.

Best regards,

Robbie Harley
Founder, Harley Digital Works
robbie@theharleygroup.org | 0117 214 1357`;

  const whatsappText = `Hi RG Electrical team, Robbie here from Harley Digital Works. I noticed your website mentions the portfolio is coming soon. We put together a quick working preview showing how your NICEIC rewiring and fusebox case studies could look for Bristol homeowners, with instant quote estimates: https://harleydigitalworks.com/demos/rg-electrical. Happy to chat if useful!`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailBody);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyWhatsapp = () => {
    navigator.clipboard.writeText(whatsappText);
    setCopiedWhatsapp(true);
    setTimeout(() => setCopiedWhatsapp(false), 2500);
  };

  return (
    <PageShell header={null} footer={null} quiet>
      {/* 1. Discreet Client-Facing Staging Notice Top-Bar */}
      <aside
        aria-label="Staging Prototype Notice"
        className="bg-[#051323] border-b border-emerald-500/20 px-4 py-2.5 text-xs text-slate-300"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-semibold text-emerald-300">Private Staging Prototype</span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span className="text-slate-300">
              Interactive demonstration created for <strong>RG Electrical Bristol Limited</strong>{" "}
              by Harley Digital Works
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400 shrink-0">
            <span>100% Done-For-You Launch</span>
            <span className="text-slate-700">|</span>
            <a
              href="tel:01172141357"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              Questions? Call Robbie: 0117 214 1357
            </a>
          </div>
        </div>
      </aside>

      {/* 2. RG Electrical Bristol Contractor Header */}
      <header className="sticky top-0 z-40 bg-[#081B30]/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Zap className="h-6 w-6 fill-current" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>RG Electrical</span>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 hidden sm:inline">
                  Bristol
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                NICEIC Approved Contractor · North Bristol
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#case-studies" className="hover:text-white transition-colors">
              Case Studies
            </a>
            <a href="#workmanship" className="hover:text-white transition-colors">
              Workmanship
            </a>
            <a href="#calculator" className="hover:text-white transition-colors">
              Price Estimator
            </a>
            <a href="#reviews" className="hover:text-white transition-colors">
              Reviews
            </a>
          </nav>

          {/* Direct Contact CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${RG_ELECTRICAL_DATA.phone.replace(/\s+/g, "")}`}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
            >
              <PhoneCall className="h-3.5 w-3.5 text-emerald-400" />
              <span>{RG_ELECTRICAL_DATA.phone}</span>
            </a>
            <a
              href="#calculator"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950/40 transition-all hover:-translate-y-0.5"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Instant Estimate</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="relative bg-gradient-to-b from-[#081B30] via-[#0E2744] to-[#081B30] text-white pt-16 pb-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left copy column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Accreditation trust pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  NICEIC Approved Contractor
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  TrustMark Government Endorsed
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  <Building2 className="h-3.5 w-3.5" />
                  Companies House #10082511
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {RG_ELECTRICAL_DATA.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {RG_ELECTRICAL_DATA.heroSubheadline}
              </p>

              {/* Quick action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#calculator"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 transition-all hover:-translate-y-0.5"
                >
                  <Zap className="h-4 w-4" />
                  <span>Calculate Your Instant Quote</span>
                </a>
                <a
                  href="#case-studies"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-medium text-sm border border-slate-700 transition-colors"
                >
                  <span>View Bristol Project Case Studies</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Service Area Notice */}
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pt-2">
                <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>
                  Serving Bradley Stoke, Stoke Gifford, Filton, Patchway, Thornbury, Clifton and
                  central Bristol
                </span>
              </div>
            </div>

            {/* Right photo hero showcase card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950 group">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                  <img
                    src="/images/home/contractor-commercial.jpg"
                    alt="RG Electrical contractor and service van outside Bristol home"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-slate-200 text-xs font-semibold backdrop-blur-md">
                    <MapPin className="h-3 w-3 text-emerald-400" />
                    <span>Bradley Stoke & North Bristol</span>
                  </div>
                </div>
                <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">RG Electrical Bristol Limited</span>
                    <span className="text-emerald-400 font-mono font-semibold">
                      100% Tidy Finish
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Qualified NICEIC domestic and commercial electricians. Rapid response callouts,
                    fuseboard replacements, and rewiring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Trade Services Grid */}
      <section id="services" className="py-20 bg-[#081B30] border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Specialist Electrical Services
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              Certified Domestic &amp; Commercial Solutions
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Fixed upfront pricing, full NICEIC building control certification, and zero mess left
              behind.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RG_ELECTRICAL_DATA.popularServices.map((service, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      {service.turnaround}
                    </span>
                    <span className="text-slate-400 font-semibold">{service.priceGuide}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{service.description}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  <a
                    href="#calculator"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <span>Get instant estimate</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 3-Project Structured Portfolio Showcase */}
      <section
        id="case-studies"
        className="py-20 bg-slate-900 border-b border-slate-800 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              VERIFIED BRISTOL INSTALLATIONS
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Recent Bristol Electrical Installations &amp; Case Studies
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Full project breakdowns with verified NICEIC certification, scope details, and
              transparent price guides for Bristol homeowners.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {RG_CASE_STUDIES.map((study) => (
              <div
                key={study.id}
                className="rounded-2xl border border-slate-800 bg-[#081B30] p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl group overflow-hidden"
              >
                <div>
                  {/* Real high-res photo header */}
                  <div className="relative h-48 -mx-6 -mt-6 mb-5 overflow-hidden rounded-t-2xl bg-slate-950">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081B30] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded bg-slate-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
                      {study.tag}
                    </span>
                    <span className="absolute top-3 right-3 text-xs font-mono text-slate-300 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm">
                      {study.turnaround}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">{study.title}</h3>

                  <div className="mt-3 text-xs text-slate-400 space-y-1.5">
                    <p className="flex items-center gap-1.5 text-slate-300">
                      <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <strong>Location:</strong> {study.location}
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-300">
                      <Building2 className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                      <strong>Property:</strong> {study.property}
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 mt-3 text-xs border-t border-slate-800/80">
                    <div>
                      <span className="font-semibold text-rose-300 block mb-0.5">The Problem:</span>
                      <p className="text-slate-400 leading-relaxed">{study.defect}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-emerald-300 block mb-0.5">
                        The Solution:
                      </span>
                      <p className="text-slate-300 leading-relaxed">{study.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-blue-300 font-medium">
                    <FileCheck className="h-3.5 w-3.5 shrink-0" />
                    <span>{study.certification}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>Typical Job Scope:</span>
                    <span className="text-white font-semibold">{study.highlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Interactive Before / After Workmanship Slider */}
      <section id="workmanship" className="py-20 bg-[#081B30] border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Tidy Workmanship Comparison
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              1970s Bakelite Fuseboard Replacement (Bradley Stoke)
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Side-by-side comparison of the removed rewirable fusebox and the replacement Hager
              metal consumer board with dual surge protection.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <BeforeAfterSlider business={RG_ELECTRICAL_DATA} />
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  NICEIC Part P Compliance
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every consumer unit replacement requires Part P building regulations notification.
                  Homeowners receive an official Building Regulations Compliance Certificate
                  directly from NICEIC within 24 hours of completion.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-400" />
                  Type 2 Surge Protection
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Protect home computers, heat pumps, smart TVs, and EV chargers against transient
                  grid surges. Standard on all RG Electrical board replacements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Interactive Quote Calculator */}
      <section id="calculator" className="py-20 bg-slate-900 border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Interactive Estimator
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              Instant Online Electrical Quote Estimator
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Bristol homeowners can estimate their installation costs in seconds, reducing
              tyre-kicker enquiries and pre-qualifying serious rewiring and board replacement jobs.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <TradeQuoteCalculator business={RG_ELECTRICAL_DATA} />
          </div>
        </div>
      </section>

      {/* 8. Verified Customer Reviews */}
      <section id="reviews" className="py-20 bg-[#081B30] border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Verified Customer Feedback
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              What Bristol Homeowners &amp; Landlords Say
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Direct reviews from local domestic rewires and fuseboard upgrades in North Bristol.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl">
            {RG_ELECTRICAL_DATA.reviews.map((review, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {review.service}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{review.text}"
                </p>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{review.author}</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-emerald-400" />
                    {review.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Emergency Callout Strip */}
      <section className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-500/30 py-8 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400">
              <Zap className="h-3.5 w-3.5" />
              RAPID RESPONSE ELECTRICAL SERVICE
            </div>
            <h3 className="text-lg font-bold text-white">
              Power Cut, Tripping Circuits or Burning Smell?
            </h3>
            <p className="text-xs text-slate-300">
              Priority emergency attendance across Bradley Stoke, Filton, Stoke Gifford &amp; North
              Bristol.
            </p>
          </div>
          <a
            href={`tel:${RG_ELECTRICAL_DATA.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl transition-all hover:scale-105 shrink-0"
          >
            <PhoneCall className="h-4 w-4" />
            <span>Call Emergency Desk: {RG_ELECTRICAL_DATA.phone}</span>
          </a>
        </div>
      </section>

      {/* 10. Dedicated RG Electrical Trade Footer */}
      <footer className="bg-[#051323] border-t border-slate-800 text-slate-400 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800/80">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-extrabold text-base">
                <Zap className="h-4 w-4 text-amber-400 fill-current" />
                <span>RG Electrical Bristol Limited</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Qualified NICEIC approved contractors providing domestic and commercial electrical
                installations, fuseboard replacements, rewires and Landlord safety certificates
                across North Bristol.
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                Registered in England &amp; Wales · Company #10082511
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-white text-xs uppercase tracking-wider">
                Accreditations
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-1.5">
                  <BadgeCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>NICEIC Approved Contractor</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span>TrustMark Government Endorsed</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <FileCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Part P Building Regulations</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>£5,000,000 Public Liability Policy</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-white text-xs uppercase tracking-wider">
                Bristol Service Areas
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bradley Stoke, Stoke Gifford, Filton, Patchway, Thornbury, Alveston, Almondsbury,
                Clifton, Redland, Cotham, and Bristol.
              </p>
              <div className="text-[11px] text-emerald-400 font-medium pt-1">
                Priority emergency response available
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-white text-xs uppercase tracking-wider">
                Direct Contact
              </div>
              <p className="text-xs text-slate-300">
                <strong>Phone:</strong> {RG_ELECTRICAL_DATA.phone}
              </p>
              <p className="text-xs text-slate-300">
                <strong>WhatsApp:</strong> {RG_ELECTRICAL_DATA.whatsapp}
              </p>
              <p className="text-xs text-slate-300">
                <strong>Email:</strong> info@rg-electrical.com
              </p>
              <p className="text-[11px] text-slate-500 font-mono pt-1">
                Operating: Mon–Fri 7:30am–6:00pm (24/7 Emergency Callout)
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © {new Date().getFullYear()} RG Electrical Bristol Limited. All rights reserved.
            </div>
            <div className="flex items-center gap-3">
              <span>Private prototype crafted by Harley Digital Works</span>
              <span className="text-slate-700">·</span>
              <Link
                to="/demos/rg-electrical"
                search={{ founder: true }}
                className="text-slate-500 hover:text-slate-300 underline font-mono text-[10px]"
              >
                Founder View
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* 11. Interactive Live Trade Agent Chat Widget (Bottom-Left) */}
      <TradeAgentChatWidget />

      {/* 12. Founder Outreach Pack (Floating Trigger & Slide-Over Drawer for Robbie) */}
      {hasFounderAccess && (
        <>
          {/* Floating Trigger Pill */}
          <button
            type="button"
            onClick={() => setShowFounderDrawer(true)}
            className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-800 text-emerald-400 border border-emerald-500/50 text-xs font-mono font-bold shadow-2xl backdrop-blur-md transition-all hover:scale-105"
            title="Open Founder Outreach Pack"
          >
            <Lock className="h-4 w-4 text-emerald-400" />
            <span>Founder Outreach Pack</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
              Robbie
            </span>
          </button>

          {/* Slide-Over Drawer */}
          {showFounderDrawer && (
            <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
                onClick={() => setShowFounderDrawer(false)}
              />

              {/* Drawer Content */}
              <div className="relative w-full max-w-xl bg-slate-900 border-l border-slate-800 shadow-2xl h-full overflow-y-auto p-6 sm:p-8 space-y-6 text-white z-10">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 mb-1">
                      <Lock className="h-3 w-3" />
                      FOUNDER SALES PACK
                    </div>
                    <h2 className="text-lg font-bold text-white">RG Electrical Bristol Limited</h2>
                    <p className="text-xs text-slate-400">
                      Companies House #10082511 · Target: info@rg-electrical.com
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowFounderDrawer(false)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    aria-label="Close drawer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* ChatGPT Sync */}
                <ChatGptSyncButton variant="banner" />

                {/* Commercial Offer */}
                <div className="rounded-xl border border-emerald-500/30 bg-[#081B30] p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">Standard Managed Package</span>
                    <span className="font-mono text-sm font-bold text-emerald-400">
                      £1,495 setup + £249/mo
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-300">
                    <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                      <strong className="text-white block mb-0.5">50/50 Split</strong>
                      £747.50 deposit / £747.50 on approval
                    </div>
                    <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                      <strong className="text-white block mb-0.5">Done-For-You</strong>
                      Full copywriting &amp; case studies
                    </div>
                    <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                      <strong className="text-white block mb-0.5">Rolling Care</strong>
                      WhatsApp updates &amp; hosting
                    </div>
                  </div>
                </div>

                {/* Email Script */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                      <Mail className="h-4 w-4" />
                      Outreach Email Template
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                    >
                      {copiedEmail ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedEmail ? "Copied Email!" : "Copy Email"}</span>
                    </button>
                  </div>
                  <div className="text-xs font-mono text-slate-400 space-y-1">
                    <div>
                      <strong>To:</strong> info@rg-electrical.com
                    </div>
                    <div>
                      <strong>Subject:</strong> {emailSubject}
                    </div>
                  </div>
                  <div className="p-3 rounded bg-slate-900 border border-slate-800/80 text-xs text-slate-200 whitespace-pre-line font-mono max-h-48 overflow-y-auto">
                    {emailBody}
                  </div>
                </div>

                {/* WhatsApp Script */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4" />
                      WhatsApp Direct Note
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyWhatsapp}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                    >
                      {copiedWhatsapp ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      <span>{copiedWhatsapp ? "Copied WhatsApp!" : "Copy WhatsApp"}</span>
                    </button>
                  </div>
                  <div className="p-3 rounded bg-slate-900 border border-slate-800/80 text-xs text-slate-200 font-mono">
                    {whatsappText}
                  </div>
                </div>

                {/* Return to CRM */}
                <div className="pt-2 text-center">
                  <Link
                    to="/admin/leads"
                    className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                  >
                    <span>← Open in Admin Leads Workspace (/admin/leads)</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </PageShell>
  );
}
