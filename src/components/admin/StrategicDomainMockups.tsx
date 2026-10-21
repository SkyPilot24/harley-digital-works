import React, { useState } from "react";
import {
  Car,
  Watch,
  Video,
  Cpu,
  Home,
  Zap,
  Camera,
  Coins,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
  ExternalLink,
  Laptop,
  Smartphone,
  Sparkles,
  TrendingUp,
  FileText,
  BadgeAlert,
  Calendar,
  Layers,
  Building,
  Briefcase,
  ChevronRight,
} from "lucide-react";

export type MockupId =
  | "green-automotive"
  | "ai-wearables"
  | "virtual-avatars"
  | "the-iot-shop"
  | "my-digital-house"
  | "my-automation-services"
  | "value-drones"
  | "value-currencies";

interface MockupData {
  id: MockupId;
  domain: string;
  brandName: string;
  category: string;
  badge: string;
  accentColor: string;
  tagline: string;
  headline: string;
  subhead: string;
  heroImage: string;
  primaryCta: string;
  secondaryCta: string;
  trustPill: string;
  targetMarket: string;
  commercialModel: string;
  harleyAlignment: string;
  strategicAction: string;
  pillars: { title: string; desc: string; icon: string }[];
  offerTitle: string;
  offerPrice: string;
  offerSub: string;
  offerFeatures: string[];
  proofPoints: string[];
}

const MOCKUPS: Record<MockupId, MockupData> = {
  "green-automotive": {
    id: "green-automotive",
    domain: "greenautomotive.co.uk",
    brandName: "Green Automotive UK",
    category: "Commercial EV & Fleet Transition",
    badge: "UK Trade Fleet Specialists",
    accentColor: "#059669",
    tagline: "Commercial EV Transition for British Trades",
    headline: "Transition Your Trade Fleet to Electric. Cut Fuel Bills by 65%.",
    subhead:
      "From OZEV commercial van grant qualification to depot fast-charger installations. We handle the entire fleet transition for UK trade contractors and delivery fleets with zero headache.",
    heroImage: "/images/home/renewables-solar-ev.jpg",
    primaryCta: "Calculate Fleet Grant Savings",
    secondaryCta: "Book 15-Min Van Audit",
    trustPill: "OZEV Authorized · NICEIC Certified Infrastructure · Zero ULEZ Fines",
    targetMarket: "UK Trade Contractors, Commercial Fleets, and Facilities Managers (1–20 Vans)",
    commercialModel:
      "£495 fixed Fleet Transition Audit + £99/mo depot charger maintenance + £350–£750 referral bounty per EV van lease.",
    harleyAlignment:
      "Direct synergy with Harley Digital Works' trade audience (electricians, heating engineers) and commercial van fleet operations.",
    strategicAction:
      "Develop as an authoritative B2B lead generation & fleet consultancy portal under The Harley Group umbrella.",
    pillars: [
      {
        title: "Max Commercial Grants",
        desc: "Unlock up to £2,500–£5,000 in UK government plug-in van grants and workplace charging subsidies.",
        icon: "zap",
      },
      {
        title: "Depot Fast-Charging",
        desc: "Turnkey 22kW fast-charger installation with full DNO grid notification and NICEIC certification.",
        icon: "shield",
      },
      {
        title: "Overnight Smart Tariffs",
        desc: "Optimised charging schedules bringing your fuel costs down to under 7p per mile on trade vans.",
        icon: "trending",
      },
    ],
    offerTitle: "Turnkey Trade Fleet EV Audit & Charging Specification",
    offerPrice: "£495",
    offerSub: "Fixed one-off audit · Reimbursable on charging installation",
    offerFeatures: [
      "Full trade route mileage & battery range feasibility analysis",
      "OZEV workplace charging scheme (£350/socket) grant application",
      "Depot electrical load capacity assessment & DNO liaison",
      "Total Cost of Ownership (TCO) comparison: Diesel vs Electric",
      "Direct introduction to fleet leasing discounts on Ford Transit EV",
    ],
    proofPoints: [
      "Over 40,000 miles of UK trade van telemetry analysed",
      "Accredited by NICEIC & OZEV Workplace Charging Scheme",
      "Backed by The Harley Group Ltd (Bristol & Bath, UK)",
    ],
  },
  "ai-wearables": {
    id: "ai-wearables",
    domain: "aiwearables.co.uk",
    brandName: "AI Wearables UK",
    category: "AI Hardware & Smart Gear",
    badge: "Independent UK Review Guide",
    accentColor: "#3b82f6",
    tagline: "The Independent Guide to Ambient Intelligence",
    headline: "The Best AI Wearables & Smart Health Rings in the UK — Tested & Ranked.",
    subhead:
      "Unbiased UK field tests, battery benchmarks, and practical reviews of AI voice pins, smart recovery rings, and rugged wearable hardware for busy professionals and trade specialists.",
    heroImage: "/images/home/hero-contractor.jpg",
    primaryCta: "Compare 2026 AI Rings",
    secondaryCta: "Download Field Tech Guide",
    trustPill: "100% Independent Testing · No Paid Placement · UK Real-World Battery Tests",
    targetMarket: "UK Executives, Health Optimisers, and Field Trade Specialists",
    commercialModel:
      "Affiliate commissions (4%–10% on £250–£500 hardware) + sponsored manufacturer test benchmarks (£750–£1,500).",
    harleyAlignment:
      "Showcases The Harley Group's technological foresight; provides an inexpensive, high-margin affiliate revenue stream.",
    strategicAction:
      "Launch as a lean, content-driven review & affiliate comparison hub for UK consumers and enterprise buyers.",
    pillars: [
      {
        title: "Hands-Free Voice AI",
        desc: "Record site notes, customer quotes, and meeting summaries effortlessly on-the-go with discreet AI lapel pins.",
        icon: "mic",
      },
      {
        title: "Recovery & Sleep Rings",
        desc: "In-depth comparisons of Oura, Ultrahuman, and RingConn for stress management and sleep tracking.",
        icon: "activity",
      },
      {
        title: "Rugged Jobsite Tech",
        desc: "Waterproof, dustproof, impact-tested smart gear engineered for British weather and construction sites.",
        icon: "shield",
      },
    ],
    offerTitle: "Enterprise AI Wearable Evaluation & Fleet Procurement",
    offerPrice: "Free Guide",
    offerSub: "Curated comparison table updated weekly for UK buyers",
    offerFeatures: [
      "Full side-by-side specs: battery life, UK pricing, subscriptions",
      "Hands-free on-site audio transcription accuracy benchmarks",
      "Data privacy & GDPR compliance ratings for workplace use",
      "Direct UK stockist availability & verified discount codes",
    ],
    proofPoints: [
      "Independent UK testing lab in Bristol & Bath",
      "Zero advertising kickbacks from hardware manufacturers",
      "Curated by tech specialists at Harley Labs",
    ],
  },
  "virtual-avatars": {
    id: "virtual-avatars",
    domain: "virtualavatars.co.uk",
    brandName: "Virtual Avatars Studio",
    category: "AI Video Presenters & Corporate Training",
    badge: "Done-For-You AI Video",
    accentColor: "#d97706",
    tagline: "Photorealistic AI Video Presenters",
    headline: "Turn Text Documents into Studio-Grade Presenter Videos in Minutes.",
    subhead:
      "Create photorealistic British-accented avatars for staff onboarding, compliance training, customer video emails, and website explainers at 90% lower cost than traditional video production crews.",
    heroImage: "/brand/social/hdw-linkedin-mockup.jpg",
    primaryCta: "Generate Free Avatar Preview",
    secondaryCta: "Watch Client Video Samples",
    trustPill: "Natural British Accents · 4K Photorealism · Zero Studio Hire Costs",
    targetMarket: "UK Mid-Market Companies, Healthcare Training Providers, and Trade Guilds",
    commercialModel:
      "£995 setup for custom avatar + 5 training modules; £299/month ongoing rendering & video update subscription.",
    harleyAlignment:
      "Direct commercial sister-product to Harley Labs' video generation and ContentFlow AI prototype initiatives.",
    strategicAction:
      "Position as a specialized B2B video agency product under Harley Labs, offering done-for-you corporate avatars.",
    pillars: [
      {
        title: "Founder Avatar Cloning",
        desc: "Turn your CEO or training director into an ultra-realistic digital twin ready to record any script in seconds.",
        icon: "video",
      },
      {
        title: "Instant Training Updates",
        desc: "Update safety guidelines, course materials, or trade manuals by simply typing new text — zero re-filming.",
        icon: "layers",
      },
      {
        title: "Personalised Video Outreach",
        desc: "Send personalized video messages to hundreds of prospects with custom names and company details embedded.",
        icon: "sparkles",
      },
    ],
    offerTitle: "Complete Corporate Avatar Starter Package",
    offerPrice: "£995",
    offerSub: "Turnkey video production · 1 custom avatar + 5 full video modules",
    offerFeatures: [
      "High-fidelity digital twin creation with natural British voice synthesis",
      "5 custom-branded video modules (up to 3 minutes each)",
      "Full commercial usage rights for website, LMS, and social media",
      "Subtitles, motion graphics, and background music included",
      "30-day revision guarantee and Cloudflare video hosting",
    ],
    proofPoints: [
      "Engineered by AI video research team at Harley Labs",
      "100% GDPR-compliant biometric data storage and consent safeguards",
      "Delivered in under 5 working days from script approval",
    ],
  },
  "the-iot-shop": {
    id: "the-iot-shop",
    domain: "theiotshop.co.uk",
    brandName: "The IoT Shop UK",
    category: "Industrial IoT & Smart Sensors",
    badge: "Commercial Hardware Specialists",
    accentColor: "#173c62",
    tagline: "Industrial IoT Sensors & Telemetry",
    headline: "Prevent Costly Plant Failures and Leaks with Plug-and-Play UK IoT Sensors.",
    subhead:
      "Pre-configured LoRaWAN and 4G NB-IoT sensors for plant rooms, commercial refrigeration, legionella water compliance, and trade asset tracking. Guaranteed UK next-day delivery.",
    heroImage: "/images/home/heating-plant-room.jpg",
    primaryCta: "Explore Plant Room Kits",
    secondaryCta: "Download Trade Catalogue",
    trustPill: "Pre-Configured Out-of-the-Box · SIM Cards Included · 5-Year Battery Life",
    targetMarket: "Commercial Facilities Managers, Heating Engineers, Landlords & Warehouses",
    commercialModel:
      "25%–35% gross margin on hardware kits + £15–£45/month cloud telemetry portal subscription per monitored site.",
    harleyAlignment:
      "Synergises with commercial heating contractors and facilities maintenance clients managed by Harley Digital Works.",
    strategicAction:
      "Establish as a curated B2B hardware and monitoring platform for UK building maintenance contractors.",
    pillars: [
      {
        title: "Boiler & Plant Telemetry",
        desc: "Monitor flow temperatures, pressure drops, and pump vibrations with automated SMS alerts before failure.",
        icon: "cpu",
      },
      {
        title: "Cold-Chain HACCP Loggers",
        desc: "Automated temperature logging for commercial kitchens, pharmacies, and temperature-controlled storage.",
        icon: "shield",
      },
      {
        title: "Tool & Plant GPS Trackers",
        desc: "Rugged anti-theft trackers for contractor vans, excavators, and high-value site equipment.",
        icon: "trending",
      },
    ],
    offerTitle: "Turnkey Plant Room Monitoring Starter Kit",
    offerPrice: "£695",
    offerSub: "Plug-and-play hardware kit · Includes 12 months telemetry access",
    offerFeatures: [
      "3x Industrial surface temperature pipe sensors (LoRaWAN / 4G)",
      "1x Gateway hub with pre-activated multi-network UK SIM",
      "Real-time SMS and email alerts for freeze and overheat thresholds",
      "Automated compliance PDF logs for facilities management reports",
      "Full technical support from UK engineers",
    ],
    proofPoints: [
      "Tested in UK commercial plant rooms and industrial facilities",
      "Meets UK water safety and refrigeration compliance standards",
      "Backed by The Harley Group hardware engineering practice",
    ],
  },
  "my-digital-house": {
    id: "my-digital-house",
    domain: "mydigitalhouse.co.uk",
    brandName: "My Digital House",
    category: "Luxury Smart Home & Architectural AV",
    badge: "Prime Residential Integration",
    accentColor: "#081b30",
    tagline: "Bespoke Smart Living for Exceptional Homes",
    headline: "Intelligent Living, Engineered with Discretion. Luxury Smart Home Automation.",
    subhead:
      "From Lutron architectural lighting and automated solar shading to multi-room high-fidelity audio and unified security. Designed, programmed, and installed by accredited UK engineers.",
    heroImage: "/images/home/architecture.jpg",
    primaryCta: "Book Architectural Consultation",
    secondaryCta: "View Cotswold Case Studies",
    trustPill: "CEDIA Certified · Lutron Gold Partner · Discreet British Engineering",
    targetMarket:
      "High-Net-Worth Homeowners, Architects & Prime Property Renovators (Bristol, Bath, Cotswolds)",
    commercialModel:
      "£750 initial CAD specification fee + 15%–20% project margin on £20,000–£100,000 installations (fulfilled by HDW electrical contractors).",
    harleyAlignment:
      "Supplies lucrative £20k–£50k smart home projects directly to HDW's approved electrical and trade contractors.",
    strategicAction:
      "Deploy as a high-end lead generation and design specification boutique for luxury architectural residential projects.",
    pillars: [
      {
        title: "Architectural Lighting",
        desc: "Lutron automated lighting control that enhances natural stone, timber, and architecture at every hour.",
        icon: "home",
      },
      {
        title: "Invisible Audio & Cinema",
        desc: "Studio-grade sound from speakers plastered flush into walls, completely invisible until activated.",
        icon: "sparkles",
      },
      {
        title: "Unified Touch Control",
        desc: "Replace unsightly wall clutter with a single machined brass keypad or discreet custom iPad interface.",
        icon: "layers",
      },
    ],
    offerTitle: "Smart Home Architectural Specification & CAD Package",
    offerPrice: "£750",
    offerSub: "Fixed design package · Reimbursable upon project installation",
    offerFeatures: [
      "Detailed wiring schematics & cable schedules for building contractors",
      "Lutron lighting circuit schedule and keypad engraving plan",
      "Acoustic design and multi-room audio speaker placement layout",
      "Cabinet rack layout & thermal ventilation specifications",
      "Full contractor sign-off and on-site engineering oversight",
    ],
    proofPoints: [
      "Installed in heritage Georgian townhouses and modern Cotswold estates",
      "Partnered with NICEIC-accredited master electrical contractors",
      "Part of The Harley Group luxury trade engineering portfolio",
    ],
  },
  "my-automation-services": {
    id: "my-automation-services",
    domain: "myautomationservices.co.uk",
    brandName: "My Automation Services",
    category: "SME AI & Workflow Automation",
    badge: "Done-For-You Business Systems",
    accentColor: "#059669",
    tagline: "Eliminate Administration with Intelligent Workflows",
    headline: "Stop Doing £15/Hour Administrative Work. Automate Your Invoicing and Bookings.",
    subhead:
      "We connect your email, WhatsApp, accounting software, and CRM into one automated engine. Zero manual data entry. Zero forgotten customer quotes. 10 hours saved every single week.",
    heroImage: "/images/home/thg-headquarters.jpg",
    primaryCta: "Audit Your Admin Bottlenecks",
    secondaryCta: "See 5 Popular Trade Workflows",
    trustPill: "Xero & QuickBooks Integration · Make & n8n Certified · Zero Homework for You",
    targetMarket:
      "UK Trade Contractors, Professional Service Firms & Small Businesses (2–15 Staff)",
    commercialModel:
      "£1,250 one-off Turnkey Automation Sprint + £199/month ongoing workflow maintenance and cloud connector care.",
    harleyAlignment:
      "Natural agency sister-offering to Harley Digital Works' trade clients, powered by Harley Labs' workflow engines.",
    strategicAction:
      "Scale as an upsell offering to existing HDW trade clients who need more than just a website to run their business.",
    pillars: [
      {
        title: "Instant Quote Generation",
        desc: "Turn phone calls and WhatsApp messages into structured customer quotes in Xero without typing a word.",
        icon: "zap",
      },
      {
        title: "24/7 Enquiry Triage",
        desc: "Qualify emergency callouts automatically and book jobs into your team's Google Calendar instantly.",
        icon: "calendar",
      },
      {
        title: "Automated 5★ Review Collection",
        desc: "Send timed WhatsApp requests upon job completion, dramatically boosting Google Map Pack rankings.",
        icon: "trending",
      },
    ],
    offerTitle: "Turnkey SME Automation Sprint",
    offerPrice: "£1,250",
    offerSub: "Fixed price · Delivered in 7 business days · 100% done-for-you",
    offerFeatures: [
      "Custom WhatsApp & Email to Xero/QuickBooks automated invoice bridge",
      "24/7 lead intake workflow with Slack and SMS immediate notifications",
      "Automated job reminder and Google review follow-up sequence",
      "Full testing, staff walkthrough video, and error-monitoring dashboard",
      "Includes 30 days of complimentary workflow modifications",
    ],
    proofPoints: [
      "Built by automation architects at Harley Labs",
      "Saves average UK contractor 8–12 hours of repetitive admin weekly",
      "100% money-back guarantee if we can't automate your repetitive task",
    ],
  },
  "value-drones": {
    id: "value-drones",
    domain: "valuedrones.co.uk",
    brandName: "Value Drones UK",
    category: "Commercial Drone Surveys & Thermal Scans",
    badge: "CAA Certified Aerial Inspections",
    accentColor: "#0284c7",
    tagline: "Commercial Drone Surveys for UK Trades",
    headline: "Inspect Any Roof in 15 Minutes. No Scaffolding. No Working-at-Height Risk.",
    subhead:
      "High-resolution 4K and thermal drone roof inspection packages for UK roofing contractors, solar installers, and chartered surveyors. Insurance-grade PDF reports delivered in 24 hours.",
    heroImage: "/images/home/before-roofing-leadwork.jpg",
    primaryCta: "Book a 24h Drone Survey",
    secondaryCta: "Download Sample Roof Report",
    trustPill: "CAA Licensed Commercial Pilots · £5M Public Liability · 24-Hour Report Delivery",
    targetMarket: "UK Roofing Contractors, Solar Installers, Estate Managers & Surveyors",
    commercialModel:
      "£450 per single commercial building survey + £795/month contractor retainer (includes 3 monthly surveys).",
    harleyAlignment:
      "Direct synergy with HDW's roofing and solar contractor clients; provides dramatic 'before/after' visual proof for their quotes.",
    strategicAction:
      "Operate as a trade inspection partner service marketed directly to regional roofing and building contractors.",
    pillars: [
      {
        title: "Thermal Water Ingress",
        desc: "Pinpoint hidden moisture trapped beneath flat roofs and cladding before ceiling collapse occurs.",
        icon: "camera",
      },
      {
        title: "Zero Scaffolding Costs",
        desc: "Save £1,500+ on unnecessary scaffolding just to quote a repair or inspect a chimney stack.",
        icon: "shield",
      },
      {
        title: "Insurance-Ready Reports",
        desc: "Deliver 48MP high-resolution imagery and annotated defect maps that loss adjusters approve immediately.",
        icon: "file",
      },
    ],
    offerTitle: "Single Building Commercial Drone Survey Package",
    offerPrice: "£450",
    offerSub: "Fixed fee per property · Delivered within 24 hours of flight",
    offerFeatures: [
      "Complete 4K high-resolution visual scan of roof, gullies, chimneys & ridge",
      "Thermal infrared heat-loss & moisture ingress detection map",
      "Annotated defect report ready to attach to your trade client's quotation",
      "Full flight compliance, CAA airspace approvals, and risk assessment",
      "Raw high-resolution imagery and video footage included",
    ],
    proofPoints: [
      "Operated by CAA General Visual Line of Sight (GVC) certified pilots",
      "£5,000,000 commercial aviation liability insurance",
      "Trusted by UK roofing and renewable energy contractors",
    ],
  },
  "value-currencies": {
    id: "value-currencies",
    domain: "valuecurrencies.com",
    brandName: "Value Currencies Global",
    category: "Institutional FX & Treasury Intelligence",
    badge: "Global Macro & FX Publication",
    accentColor: "#b45309",
    tagline: "Wholesale FX Intelligence for Global Trade",
    headline: "Stop Overpaying on Cross-Border Transfers. Institutional FX Rates for Exporters.",
    subhead:
      "Compare wholesale currency brokers, bank hedging spreads, and alternative store-of-value strategies. Save up to 85% compared to high-street bank foreign exchange margins.",
    heroImage: "/images/home/thg-pavilion.jpg",
    primaryCta: "Benchmark Your FX Spread",
    secondaryCta: "Read Monthly Treasury Briefing",
    trustPill: "FCA Regulated Partner Brokers · Wholesale Spread Comparison · Zero Hidden Fees",
    targetMarket:
      "UK & International Exporters, Mid-Market CFOs, Treasury Managers & Family Offices",
    commercialModel:
      "Outbound sale of the .com asset (£2,500–£7,500 asking price) OR B2B institutional broker referral bounties (£500–£2,500 per corporate client).",
    harleyAlignment:
      "High-value global .com asset; can operate either as an authority content portal or be divested for immediate cash injection into HDW.",
    strategicAction:
      "Market aggressively on Sedo and Afternic while testing targeted direct outreach to fintech publishers and currency brokers.",
    pillars: [
      {
        title: "Spread Transparency",
        desc: "Uncover hidden bank spreads that quietly take 2%–3% off every overseas commercial transaction.",
        icon: "trending",
      },
      {
        title: "Hedging Forward Contracts",
        desc: "Lock in favourable exchange rates up to 24 months in advance to safeguard contract profit margins.",
        icon: "shield",
      },
      {
        title: "Treasury Diversification",
        desc: "Strategic balance sheet allocation between sovereign currencies, inflation hedges, and stable assets.",
        icon: "coins",
      },
    ],
    offerTitle: "Institutional FX Margin Audit & Broker Benchmark",
    offerPrice: "Complimentary",
    offerSub: "Confidential treasury spread audit for UK companies trading internationally",
    offerFeatures: [
      "Independent audit of your last 5 international currency transactions",
      "Exact calculation of hidden exchange rate markups paid to your bank",
      "Introduction to FCA-regulated wholesale brokers offering interbank rates",
      "Complimentary monthly Global Currency Volatility report",
    ],
    proofPoints: [
      "Global .com domain asset with high organic authority potential",
      "Analysis benchmarked against Bloomberg and Reuters wholesale interbank rates",
      "FCA-authorised partner broker network",
    ],
  },
};

export function StrategicDomainMockups() {
  const [selectedId, setSelectedId] = useState<MockupId>("green-automotive");
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const mockup = MOCKUPS[selectedId];

  return (
    <div className="space-y-8">
      {/* Top Controls & Portfolio Navigation */}
      <div className="flex flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
            <Sparkles size={13} className="text-emerald-600" />
            <span>Phase 3 Interactive Design Studio</span>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#081B30]">
            Strategic Domain Landing Page Mockups
          </h2>
          <p className="mt-1 text-sm text-[#526479]">
            Interactive, high-fidelity prototypes demonstrating proposed commercial positioning,
            pricing packages, and conversion architecture.
          </p>
        </div>

        {/* Viewport Mode Switcher */}
        <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-1.5 self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setViewport("desktop")}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              viewport === "desktop"
                ? "bg-white text-[#081B30] shadow-xs"
                : "text-slate-600 hover:text-[#081B30]"
            }`}
          >
            <Laptop size={14} />
            <span>Desktop View</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport("mobile")}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              viewport === "mobile"
                ? "bg-white text-[#081B30] shadow-xs"
                : "text-slate-600 hover:text-[#081B30]"
            }`}
          >
            <Smartphone size={14} />
            <span>Mobile Device (375px)</span>
          </button>
        </div>
      </div>

      {/* Brand Selection Pills */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(MOCKUPS) as MockupId[]).map((id) => {
          const item = MOCKUPS[id];
          const isSelected = selectedId === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedId(id)}
              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? "border-[#081B30] bg-[#081B30] text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="font-mono text-[11px] opacity-80">{item.domain}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {item.category.split("&")[0].trim()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mockup Canvas Container */}
      <div className="flex justify-center rounded-2xl border border-slate-200 bg-slate-100/70 p-4 sm:p-8">
        <div
          className={`transition-all duration-300 bg-white overflow-hidden shadow-2xl rounded-2xl border border-slate-300 ${
            viewport === "mobile" ? "w-[380px] max-w-full" : "w-full max-w-5xl"
          }`}
        >
          {/* Browser Address Bar Simulator */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex items-center gap-2 rounded-md bg-white px-3 py-1 text-xs font-mono text-slate-600 border border-slate-200 shadow-2xs">
              <span className="text-emerald-600">🔒</span>
              <span>https://{mockup.domain}/</span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {viewport === "mobile" ? "iPhone" : "Widescreen"}
            </span>
          </div>

          {/* Website Landing Page Canvas */}
          <div className="text-slate-900 font-sans">
            {/* Header & Navigation */}
            <header className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg font-bold text-white shadow-xs text-sm"
                  style={{ backgroundColor: mockup.accentColor }}
                >
                  {mockup.brandName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold tracking-tight text-[#081B30]">
                    {mockup.brandName}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                    Part of The Harley Group
                  </div>
                </div>
              </div>

              {viewport === "desktop" && (
                <nav className="flex items-center gap-6 text-xs font-medium text-slate-600">
                  <span className="cursor-pointer hover:text-[#081B30]">Solutions</span>
                  <span className="cursor-pointer hover:text-[#081B30]">Pricing</span>
                  <span className="cursor-pointer hover:text-[#081B30]">Case Studies</span>
                  <span className="cursor-pointer hover:text-[#081B30]">About</span>
                </nav>
              )}

              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold text-white transition-all shadow-xs cursor-pointer"
                style={{ backgroundColor: mockup.accentColor }}
              >
                <span>{viewport === "mobile" ? "Enquire" : "Contact Desk"}</span>
                <ChevronRight size={13} />
              </button>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white px-6 py-12 md:py-16">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-2xs">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: mockup.accentColor }}
                  />
                  <span>{mockup.badge}</span>
                </div>

                <h1 className="mt-4 text-2xl md:text-4xl font-extrabold tracking-tight text-[#081B30] leading-[1.15]">
                  {mockup.headline}
                </h1>

                <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
                  {mockup.subhead}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs md:text-sm font-bold text-white transition-all shadow-sm cursor-pointer"
                    style={{ backgroundColor: mockup.accentColor }}
                  >
                    <span>{mockup.primaryCta}</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs md:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <span>{mockup.secondaryCta}</span>
                  </button>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>{mockup.trustPill}</span>
                </div>
              </div>

              {/* Realistic Visual Feature Graphic */}
              <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-lg">
                <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
                  <img
                    src={mockup.heroImage}
                    alt={mockup.brandName}
                    className="h-full w-full object-cover object-center opacity-90 transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                        Live Operational Asset
                      </span>
                      <p className="text-xs font-bold">{mockup.tagline}</p>
                    </div>
                    <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold backdrop-blur-xs">
                      The Harley Group
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Value Proposition (3 Pillars) */}
            <section className="border-t border-slate-100 bg-white px-6 py-10">
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Precision Engineering
                </span>
                <h2 className="mt-1 text-xl md:text-2xl font-bold text-[#081B30]">
                  Built for Practical Commercial Results
                </h2>
              </div>

              <div
                className={`grid gap-4 ${viewport === "desktop" ? "md:grid-cols-3" : "grid-cols-1"}`}
              >
                {mockup.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-100 bg-slate-50/60 p-5 transition-all hover:border-slate-200 hover:bg-slate-50"
                  >
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-white mb-3 text-xs font-bold"
                      style={{ backgroundColor: mockup.accentColor }}
                    >
                      0{idx + 1}
                    </div>
                    <h3 className="text-sm font-bold text-[#081B30]">{pillar.title}</h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Commercial Pricing & Offer Architecture */}
            <section className="border-t border-slate-100 bg-slate-50 px-6 py-10">
              <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                      Ratified Commercial Package
                    </span>
                    <h3 className="mt-2 text-base md:text-lg font-bold text-[#081B30]">
                      {mockup.offerTitle}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{mockup.offerSub}</p>
                  </div>
                  <div className="text-right sm:text-right">
                    <div className="text-2xl font-extrabold text-[#081B30] font-mono">
                      {mockup.offerPrice}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">
                      Zero VAT · Done-For-You
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-2.5">
                  {mockup.offerFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500">
                    Direct enquiry routed to founder Robbie Harley
                  </div>
                  <button
                    type="button"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-xs cursor-pointer"
                    style={{ backgroundColor: mockup.accentColor }}
                  >
                    <span>Request Proposal</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </section>

            {/* Trust Points Footer */}
            <footer className="border-t border-slate-200 bg-white px-6 py-6 text-center text-xs text-slate-500">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-3 font-medium">
                {mockup.proofPoints.map((pt, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-emerald-600" />
                    <span>{pt}</span>
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-400">
                © 2026 {mockup.brandName}. A division of The Harley Group Ltd. Registered in England
                & Wales.
              </p>
            </footer>
          </div>
        </div>
      </div>

      {/* Strategic Analysis & Executive Dossier Drawer */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Briefcase size={14} className="text-[#081B30]" />
          <span>Strategic Executive Blueprint</span>
        </div>
        <h3 className="mt-1 text-xl font-bold text-[#081B30]">
          Commercial Assessment for {mockup.domain}
        </h3>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4 text-xs">
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
              Target Market
            </span>
            <p className="mt-1.5 font-medium text-slate-900 leading-relaxed">
              {mockup.targetMarket}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
              Commercial Revenue Engine
            </span>
            <p className="mt-1.5 font-medium text-slate-900 leading-relaxed">
              {mockup.commercialModel}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
              The Harley Group Alignment
            </span>
            <p className="mt-1.5 font-medium text-slate-900 leading-relaxed">
              {mockup.harleyAlignment}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
              Recommended Immediate Action
            </span>
            <p className="mt-1.5 font-medium text-slate-900 leading-relaxed">
              {mockup.strategicAction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
