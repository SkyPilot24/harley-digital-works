import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Smartphone,
  Tablet,
  Monitor,
  PhoneCall,
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Copy,
  MessageCircle,
  Share2,
  Sliders,
  Palette,
  Flame,
  Zap,
  Hammer,
  Building,
  RefreshCw,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { PillButton } from "@/components/site/PillButton";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { TradeQuoteCalculator } from "./TradeQuoteCalculator";
import { TRADE_DEMOS } from "./TradeDemoData";

export interface StagingConfig {
  company: string;
  trade: "electrical" | "roofing" | "heating" | "commercial" | "builder" | "plumbing";
  city: string;
  phone: string;
  palette: "dark-gold" | "navy-white" | "emerald-slate" | "crimson-black";
}

interface DynamicStagingGeneratorProps {
  initialConfig?: Partial<StagingConfig>;
}

const TRADE_METADATA = {
  electrical: {
    label: "Electrical & Solar",
    icon: Zap,
    tagline: "NICEIC Approved Electrical & Commercial Solar Contractors",
    badges: [
      "NICEIC Approved Contractor",
      "OZEV EV Installer",
      "MCS Solar Certified",
      "£5M Insured",
    ],
    emergency: "24/7 Emergency Electrician On-Call",
    sampleServices: [
      "Workplace & Home EV Chargers",
      "Commercial 3-Phase Upgrades",
      "EICR Landlord Certificates",
      "Full House Rewires",
    ],
  },
  heating: {
    label: "Heating & Gas",
    icon: Flame,
    tagline: "Gas Safe Registered Boiler & Heat Pump Specialists",
    badges: [
      "Gas Safe #629104",
      "Worcester Bosch Accredited",
      "Which? Trusted Trader",
      "12-Yr Warranty",
    ],
    emergency: "Emergency Boiler Breakdown Fast-Response",
    sampleServices: [
      "A-Rated Boiler Replacement",
      "Air Source Heat Pumps",
      "Emergency Leak Repair",
      "Power Flushing & MagnaClean",
    ],
  },
  roofing: {
    label: "Roofing & Flat Roofs",
    icon: ShieldCheck,
    tagline: "Master Federation Roofing & Specialist GRP Fibreglass",
    badges: [
      "CORC Certified",
      "25-Year GRP Guarantee",
      "Confederation of Roofing",
      "£5M Public Liability",
    ],
    emergency: "Storm Damage & Emergency Tarping Service",
    sampleServices: [
      "GRP Fibreglass Flat Roofs",
      "Complete Slate & Tile Reroofs",
      "Dry Ridge & Verge Systems",
      "Chimney Stack Repairs",
    ],
  },
  commercial: {
    label: "Commercial & Facilities",
    icon: Building,
    tagline: "Commercial Building Maintenance & 24/7 Planned Facilities",
    badges: [
      "CHAS Premier Accredited",
      "SafeContractor Approved",
      "ISO 9001 Certified",
      "£10M Commercial Cover",
    ],
    emergency: "4-Hour Critical SLA Facility Dispatch",
    sampleServices: [
      "HVAC & Commercial Plant Rooms",
      "Planned Preventative Maintenance",
      "Fit-Out & Dilapidations",
      "Commercial Compliance",
    ],
  },
  builder: {
    label: "Building & Extensions",
    icon: Hammer,
    tagline: "Master Builder Extensions, Structural Steel & Renovations",
    badges: [
      "Federation of Master Builders",
      "TrustMark Government Endorsed",
      "Structural Warranty",
      "NHBC Registered",
    ],
    emergency: "Structural Emergency Shoring & Securing",
    sampleServices: [
      "Wrap-Around Home Extensions",
      "RSJ Steel Beam Installations",
      "Full Property Renovations",
      "Architectural Joinery",
    ],
  },
  plumbing: {
    label: "Plumbing & Drainage",
    icon: ShieldCheck,
    tagline: "Emergency Plumbing, Blocked Drains & Bathroom Fitting",
    badges: [
      "CIPHE Registered",
      "WaterSafe Approved",
      "Zero Call-Out Fee",
      "Fixed Price Guarantee",
    ],
    emergency: "60-Minute Rapid Drain & Burst Pipe Response",
    sampleServices: [
      "Emergency Burst Pipe Repair",
      "CCTV Drain Surveys & Unblocking",
      "Luxury Bathroom Installs",
      "Commercial Washrooms",
    ],
  },
};

export function DynamicStagingGenerator({ initialConfig }: DynamicStagingGeneratorProps) {
  const [config, setConfig] = useState<StagingConfig>({
    company: initialConfig?.company || "Vanguard Heat & Power Ltd",
    trade: (initialConfig?.trade as StagingConfig["trade"]) || "heating",
    city: initialConfig?.city || "Stockport & Greater Manchester",
    phone: initialConfig?.phone || "0161 480 9201",
    palette: initialConfig?.palette || "dark-gold",
  });

  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showCustomizer, setShowCustomizer] = useState(!initialConfig?.company);

  useEffect(() => {
    if (initialConfig?.company) {
      setConfig((prev) => ({
        ...prev,
        company: initialConfig.company || prev.company,
        trade: (initialConfig.trade as StagingConfig["trade"]) || prev.trade,
        city: initialConfig.city || prev.city,
        phone: initialConfig.phone || prev.phone,
        palette: initialConfig.palette || prev.palette,
      }));
    }
  }, [
    initialConfig?.company,
    initialConfig?.trade,
    initialConfig?.city,
    initialConfig?.phone,
    initialConfig?.palette,
  ]);

  const activeMeta = TRADE_METADATA[config.trade] || TRADE_METADATA.heating;

  // Build Shareable URL
  const stagingUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/demos?company=${encodeURIComponent(config.company)}&trade=${config.trade}&city=${encodeURIComponent(config.city)}&phone=${encodeURIComponent(config.phone)}&palette=${config.palette}`
      : `https://harleydigitalworks.com/demos?company=${encodeURIComponent(config.company)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(stagingUrl);
    toast.success("Live Staging URL copied to clipboard!", {
      description: "Send this URL to the prospective trade client for an instant live preview.",
    });
  };

  const handleDispatchWhatsApp = () => {
    const text = `Hi, I put together a live interactive staging concept for ${config.company} so you can see how we turn local searchers in ${config.city} into high-ticket quotes: ${stagingUrl}`;
    const cleanPhone = config.phone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhone.startsWith("0") ? "44" + cleanPhone.slice(1) : cleanPhone;
    window.open(
      `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Controls: Generator Toolbar & Actions */}
      <div className="rounded-2xl border border-gold-500/30 bg-neutral-900/95 p-5 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Live Staging Preview Engine</h2>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                  REAL-TIME REACT BLUEPRINT
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Customise prospect branding and share an interactive live demo before deposit
                sign-off.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowCustomizer(!showCustomizer)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800 px-3.5 py-2 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition-colors"
            >
              <Sliders className="h-3.5 w-3.5 text-gold-400" />
              <span>{showCustomizer ? "Hide Settings" : "Edit Prospect Params"}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800 px-3.5 py-2 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition-colors"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Staging Link</span>
            </button>

            <button
              onClick={handleDispatchWhatsApp}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-md transition-all"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Send Demo via WhatsApp</span>
            </button>

            <Link
              to="/proposals"
              search={{
                name: config.company,
                trade: config.trade,
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-md transition-all"
            >
              <span>Convert to Proposal</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Customizer Drawer */}
        {showCustomizer && (
          <div className="mt-5 pt-5 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                Company Name
              </label>
              <input
                type="text"
                value={config.company}
                onChange={(e) => setConfig({ ...config, company: e.target.value })}
                className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                Trade Sector
              </label>
              <select
                value={config.trade}
                onChange={(e) =>
                  setConfig({ ...config, trade: e.target.value as StagingConfig["trade"] })
                }
                className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="heating">Heating & Gas Safe</option>
                <option value="electrical">Electrical & Solar</option>
                <option value="roofing">Roofing & Flat Roofs</option>
                <option value="commercial">Commercial & FM</option>
                <option value="builder">Master Builder & Extensions</option>
                <option value="plumbing">Emergency Plumbing & Drains</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                Primary City / Borough
              </label>
              <input
                type="text"
                value={config.city}
                onChange={(e) => setConfig({ ...config, city: e.target.value })}
                className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                Direct Phone / WhatsApp
              </label>
              <input
                type="text"
                value={config.phone}
                onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Device Mode Switcher */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400">Viewport Simulation:</span>
          <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setDeviceMode("desktop")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                deviceMode === "desktop"
                  ? "bg-neutral-800 text-gold-400 shadow"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setDeviceMode("tablet")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                deviceMode === "tablet"
                  ? "bg-neutral-800 text-gold-400 shadow"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Tablet className="h-3.5 w-3.5" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => setDeviceMode("mobile")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                deviceMode === "mobile"
                  ? "bg-neutral-800 text-gold-400 shadow"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Mobile (Sticky CTA)</span>
            </button>
          </div>
        </div>

        <div className="text-xs font-mono text-neutral-500 hidden sm:block">
          Staging DNS:{" "}
          <span className="text-neutral-300">
            staging.{config.company.toLowerCase().replace(/[^a-z0-9]/g, "")}.harleydigitalworks.com
          </span>
        </div>
      </div>

      {/* Mock Browser / Viewport Container */}
      <div className="flex justify-center transition-all duration-300">
        <div
          className={`w-full transition-all duration-300 ${
            deviceMode === "desktop"
              ? "max-w-full"
              : deviceMode === "tablet"
                ? "max-w-[768px]"
                : "max-w-[390px]"
          }`}
        >
          {/* Mock Browser Chrome */}
          <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl">
            {/* Top Browser Bar */}
            <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/90 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-neutral-950 px-4 py-1 text-xs text-neutral-400 border border-neutral-800 font-mono">
                <span className="text-emerald-400 font-bold inline-flex items-center gap-1.5">
                  <Lock className="h-3 w-3" />
                  https://
                </span>
                <span>{config.company.toLowerCase().replace(/[^a-z0-9]/g, "")}-example.co.uk</span>
              </div>
              <div className="text-[11px] font-bold text-gold-400">AGREED BUILD SCHEDULE</div>
            </div>

            {/* LIVE CLIENT MOCKUP WEBSITE */}
            <div className="bg-neutral-950 text-neutral-100 font-sans selection:bg-gold-500/30">
              {/* Emergency Banner */}
              <div className="bg-red-950/80 border-b border-red-800/60 px-4 py-2 text-center text-xs font-semibold text-red-200 flex items-center justify-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span>
                  {activeMeta.emergency} across {config.city}
                </span>
                <span className="font-mono text-red-300 underline font-bold ml-1">
                  {config.phone}
                </span>
              </div>

              {/* Header Navigation */}
              <header className="border-b border-neutral-800/80 bg-neutral-900/90 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-gold-500 text-neutral-950 flex items-center justify-center font-black text-base shadow-md">
                    {config.company.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white tracking-tight leading-none">
                      {config.company}
                    </div>
                    <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                      {config.city}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${config.phone}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3.5 py-1.5 text-xs font-bold text-neutral-950 shadow-md hover:bg-gold-400 transition-colors"
                  >
                    <PhoneCall className="h-3.5 w-3.5" />
                    <span>{config.phone}</span>
                  </a>
                </div>
              </header>

              {/* Hero Section */}
              <div className="relative px-6 py-12 md:py-16 bg-gradient-to-b from-neutral-900/80 to-neutral-950 border-b border-neutral-800/60">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-400 mb-4">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold-400" />
                    <span>#1 Rated in {config.city}</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    {activeMeta.tagline}
                  </h1>

                  <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Local, certified specialists providing turnkey installations, emergency repairs,
                    and free upfront fixed quotes throughout {config.city}.
                  </p>

                  {/* Accreditations Ribbon */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {activeMeta.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 rounded-md bg-neutral-900 border border-neutral-800 px-2.5 py-1 text-[11px] font-medium text-neutral-300"
                      >
                        <ShieldCheck className="h-3 w-3 text-emerald-400" />
                        <span>{badge}</span>
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={`tel:${config.phone}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-5 py-3 text-xs font-bold text-neutral-950 shadow-lg hover:bg-gold-400 transition-colors"
                    >
                      <PhoneCall className="h-4 w-4" />
                      <span>Call {config.phone}</span>
                    </a>
                    <button
                      onClick={() => toast.success("Quote estimator initiated.")}
                      className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-5 py-3 text-xs font-bold text-white hover:bg-neutral-800 transition-colors"
                    >
                      <span>Instant Online Estimate</span>
                      <ArrowRight className="h-4 w-4 text-gold-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Services Grid */}
              <div className="p-6 md:p-8 border-b border-neutral-800/60 bg-neutral-950">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-gold-400 mb-2">
                  Specialist Trade Services
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-5">
                  Full Compliance & Guaranteed Workmanship
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeMeta.sampleServices.map((srv, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 hover:border-gold-500/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{srv}</span>
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      </div>
                      <p className="mt-1 text-[11px] text-neutral-400">
                        Fixed upfront pricing, full safety compliance, and zero mess guarantee in{" "}
                        {config.city}.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Before / After Slider Sandbox */}
              <div className="p-6 md:p-8 border-b border-neutral-800/60 bg-neutral-900/40">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-gold-400">
                      Proof of Quality
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Before & After Verified Transformation
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                    REAL LOCAL JOBS
                  </span>
                </div>

                <BeforeAfterSlider
                  business={
                    TRADE_DEMOS[config.trade as keyof typeof TRADE_DEMOS] || TRADE_DEMOS.heating
                  }
                />
              </div>

              {/* Local SEO Boroughs */}
              <div className="p-6 bg-neutral-950 text-center">
                <div className="text-[11px] font-mono text-neutral-400 mb-2">
                  Serving Homeowners & Commercial Clients Throughout:
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-300">
                  <span className="rounded-full bg-neutral-900 border border-neutral-800 px-3 py-1">
                    {config.city}
                  </span>
                  <span className="rounded-full bg-neutral-900 border border-neutral-800 px-3 py-1">
                    Town Centre
                  </span>
                  <span className="rounded-full bg-neutral-900 border border-neutral-800 px-3 py-1">
                    North & South Suburbs
                  </span>
                  <span className="rounded-full bg-neutral-900 border border-neutral-800 px-3 py-1">
                    Surrounding 25-Mile Radius
                  </span>
                </div>
              </div>

              {/* Mobile Sticky Footer */}
              {deviceMode === "mobile" && (
                <div className="sticky bottom-0 z-20 flex border-t border-neutral-800 bg-neutral-950/95 p-3 backdrop-blur-md">
                  <a
                    href={`tel:${config.phone}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gold-500 py-3 text-xs font-black text-neutral-950 shadow-lg"
                  >
                    <PhoneCall className="h-4 w-4" />
                    <span>Call Now ({config.phone})</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
