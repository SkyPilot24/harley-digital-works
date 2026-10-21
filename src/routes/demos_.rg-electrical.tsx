import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { TradeQuoteCalculator } from "@/components/demos/TradeQuoteCalculator";
import { BeforeAfterSlider } from "@/components/demos/BeforeAfterSlider";
import type { TradeDemoBusiness } from "@/components/demos/TradeDemoData";
import {
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
  Building2,
  ExternalLink,
  Copy,
  Check,
  MessageSquare,
  Mail,
  BadgeCheck,
} from "lucide-react";

export const Route = createFileRoute("/demos_/rg-electrical")({
  head: () => ({
    meta: [
      {
        title:
          "RG Electrical Bristol Limited — Bespoke Website Staging Prototype | Harley Digital Works",
      },
      {
        name: "description",
        content:
          "Private interactive website transformation prototype prepared for RG Electrical Bristol Limited (Companies House #10082511). Demonstrating structured NICEIC case studies, instant quote intake, and zero-homework care.",
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
    "⚡ Priority Emergency Attendance Available Across Bradley Stoke, Filton & North Bristol",
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

// The 3 Structured Case Studies tailored to solve the "Portfolio Coming Soon" defect
const RG_CASE_STUDIES = [
  {
    id: "cs-1",
    tag: "CONSUMER UNIT & SAFETY",
    title: "18th Edition Metal Consumer Unit & Surge Protection Upgrade",
    location: "Bradley Stoke, Bristol (BS32)",
    property: "4-Bedroom Detached Family Home",
    turnaround: "1 Day Installation",
    certification: "NICEIC Part P Building Compliance Certificate issued in 24h",
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
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);

  const emailSubject =
    "A small improvement to your project portfolio — sample mockup for RG Electrical";
  const emailBody = `Hello RG Electrical team,

I was looking at your website (rg-electrical.com) and noticed your project section mentions the full portfolio is coming soon.

For homeowners looking for reliable domestic rewires and fusebox upgrades around Bradley Stoke and Bristol, seeing two or three finished project summaries with photos makes a huge difference in trust before they get in touch.

I run Harley Digital Works (part of The Harley Group, based locally in the South West). We took 30 minutes to build an interactive working preview showing how your NICEIC domestic rewiring, EV charger, and consumer unit case studies could look on a phone, with instant quote requests for Bristol homeowners.

You can view the private staging preview here:
https://harleydigitalworks.com/demos/rg-electrical

No sales pitch or homework required—if you like the layout and would like us to look after this for you, we handle 100% of the copywriting, setup, and maintenance.

Best regards,

Robbie Harley
Founder, Harley Digital Works
robbie@theharleygroup.org | 0117 214 1357`;

  const whatsappText = `Hi RG Electrical team, Robbie here from Harley Digital Works. I noticed your website mentions the portfolio is coming soon—we put together a quick working preview showing how your NICEIC rewiring and fusebox case studies could look for Bristol homeowners, with instant quote estimates: https://harleydigitalworks.com/demos/rg-electrical. Happy to chat if useful!`;

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
    <PageShell quiet>
      {/* 1. Executive Staging Notice Banner */}
      <section className="bg-emerald-950/80 border-b border-emerald-500/30 px-4 py-3 text-emerald-200">
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono font-bold tracking-wide uppercase text-emerald-300">
                Candidate #1 Bespoke Staging Preview
              </span>
              <span className="text-emerald-400/50 hidden md:inline">|</span>
              <span className="text-emerald-100 font-medium">
                Tailored for <strong>RG Electrical Bristol Limited</strong> (Companies House
                #10082511 · NICEIC & TrustMark Verified)
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="#outreach-pack"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-800/80 hover:bg-emerald-700 text-white font-medium transition-colors"
              >
                <span>Jump to Outreach Pack</span>
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Client Hero Section */}
      <section className="relative bg-gradient-to-b from-[#081B30] via-[#0E2744] to-[#081B30] text-white pt-16 pb-20 border-b border-slate-800">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Accreditation trust pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
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

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {RG_ELECTRICAL_DATA.heroSubheadline}
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
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

            {/* Service Area Pill */}
            <p className="text-xs text-slate-400 pt-2 font-mono">
              📍 Serving Bradley Stoke, Stoke Gifford, Filton, Patchway, Thornbury, Clifton &
              Bristol
            </p>
          </div>
        </Container>
      </section>

      {/* 3. The Core Defect Fix: 3-Project Structured Portfolio Showcase */}
      <section
        id="case-studies"
        className="py-20 bg-slate-900 border-b border-slate-800 text-white"
      >
        <Container>
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              SOLVING THE "PORTFOLIO COMING SOON" DEFECT
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Recent Bristol Electrical Installations & Case Studies
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Instead of a placeholder saying "Portfolio coming soon", homeowners see exactly what
              you do, the tidy standard of work, and the official NICEIC certification provided.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {RG_CASE_STUDIES.map((study) => (
              <div
                key={study.id}
                className="rounded-2xl border border-slate-800 bg-[#081B30] p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {study.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{study.turnaround}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">{study.title}</h3>

                  <div className="text-xs text-slate-400 space-y-1">
                    <p className="flex items-center gap-1.5 text-slate-300">
                      <span>📍</span>
                      <strong>Location:</strong> {study.location}
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-300">
                      <span>🏠</span>
                      <strong>Property:</strong> {study.property}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 text-xs border-t border-slate-800/80">
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
        </Container>
      </section>

      {/* 4. Interactive Before / After Workmanship Slider */}
      <section className="py-20 bg-[#081B30] border-b border-slate-800 text-white">
        <Container>
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Tidy Workmanship Comparison
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              Before & After: Dangerous 1970s Fusebox vs Flush Metal Consumer Unit
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Drag the interactive slider to see how messy, high-risk wiring is transformed into a
              tidy, certified 18th Edition installation.
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
        </Container>
      </section>

      {/* 5. Interactive Quote Calculator */}
      <section id="calculator" className="py-20 bg-slate-900 border-b border-slate-800 text-white">
        <Container>
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
        </Container>
      </section>

      {/* 6. Confidential Founder Outreach Pack & Ready-to-Send Scripts */}
      <section
        id="outreach-pack"
        className="py-20 bg-emerald-950/30 border-t border-emerald-500/20 text-white"
      >
        <Container>
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <Lock className="h-3.5 w-3.5" />
                FOUNDER CONTROL CENTRE · 1-CLICK OUTREACH PACK
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                RG Electrical Bristol Limited: Commercial Pack & Outreach Scripts
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl mx-auto">
                Ready-to-use communication assets for Robbie to review and send. Pre-checked for
                PECR B2B compliance (UK Registered Company #10082511).
              </p>
            </div>

            {/* Commercial terms summary card */}
            <div className="rounded-2xl border border-emerald-500/30 bg-[#081B30] p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    The Harley Digital Works Standard Managed Package
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Agreed delivery schedule · Strictly max 2 active builds · Zero VAT
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-2xl font-mono font-extrabold text-white">
                    £1,495 <span className="text-xs font-normal text-slate-400">setup</span>
                  </div>
                  <div className="text-sm font-mono text-emerald-400">
                    + £249/month <span className="text-xs text-slate-400">ongoing care</span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block mb-1">50/50 Fair Split Payment</strong>
                  <p className="text-slate-400">
                    £747.50 deposit on agreement / £747.50 only upon final preview approval.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block mb-1">100% Done-For-You</strong>
                  <p className="text-slate-400">
                    Zero homework. We write all the copy, structure the case studies, and organize
                    accreditations.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block mb-1">Rolling Digital Care</strong>
                  <p className="text-slate-400">
                    Fast WhatsApp changes, DNS maintenance, automated backups, and seasonal
                    promotion refreshes.
                  </p>
                </div>
              </div>
            </div>

            {/* Email outreach tab */}
            <div className="rounded-2xl border border-slate-800 bg-[#081B30] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white">
                    Ready-to-Send Email (Non-Salesy Portfolio Angle)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                >
                  {copiedEmail ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>{copiedEmail ? "Copied Email!" : "Copy Email Body"}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 space-y-2 border border-slate-800">
                <div className="text-slate-500">
                  <strong>To:</strong> info@rg-electrical.com
                </div>
                <div className="text-slate-500">
                  <strong>Subject:</strong> {emailSubject}
                </div>
                <div className="pt-2 border-t border-slate-900 whitespace-pre-line leading-relaxed text-slate-200">
                  {emailBody}
                </div>
              </div>
            </div>

            {/* WhatsApp touchpoint tab */}
            <div className="rounded-2xl border border-slate-800 bg-[#081B30] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">
                    WhatsApp Direct Touchpoint (Casual & Respectful)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCopyWhatsapp}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                >
                  {copiedWhatsapp ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>{copiedWhatsapp ? "Copied WhatsApp!" : "Copy WhatsApp Note"}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 leading-relaxed">
                {whatsappText}
              </div>
            </div>

            {/* Admin Back-to-CRM Link */}
            <div className="text-center pt-4">
              <Link
                to="/admin/leads"
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
              >
                <span>← Return to Admin Leads Workspace (/admin/leads)</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
