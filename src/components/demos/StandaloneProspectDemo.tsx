import { useMemo } from "react";
import {
  ShieldCheck,
  Zap,
  PhoneCall,
  ArrowRight,
  Flame,
  Hammer,
  Building,
  CheckCircle2,
  Clock,
  MessageSquare,
  Star,
  MapPin,
  Lock,
} from "lucide-react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { TradeQuoteCalculator } from "./TradeQuoteCalculator";
import { TRADE_DEMOS, type TradeDemoBusiness } from "./TradeDemoData";

interface StandaloneProspectDemoProps {
  company: string;
  trade?: string;
  city?: string;
  phone?: string;
}

export function StandaloneProspectDemo({
  company,
  trade = "electrical",
  city = "UK",
  phone = "0117 000 0000",
}: StandaloneProspectDemoProps) {
  // Normalize trade to key
  const tradeKey = useMemo<"electrical" | "heating" | "roofing" | "commercial">(() => {
    const t = trade.toLowerCase();
    if (t.includes("heat") || t.includes("gas") || t.includes("boiler")) return "heating";
    if (t.includes("roof")) return "roofing";
    if (t.includes("commercial") || t.includes("fm") || t.includes("facilities"))
      return "commercial";
    return "electrical";
  }, [trade]);

  const baseBusiness = TRADE_DEMOS[tradeKey] || TRADE_DEMOS.electrical;

  // Customise business data for this specific prospect
  const business = useMemo<TradeDemoBusiness>(() => {
    return {
      ...baseBusiness,
      name: company,
      phone,
      whatsapp: phone,
      coverageArea: city,
      heroHeadline: `${baseBusiness.badge} across ${city}`,
      heroSubheadline: `Professional, certified specialists delivering prompt installations, routine compliance, and 24/7 emergency response throughout ${city}.`,
      emergencyBanner: `24/7 Emergency Dispatch across ${city} · Call ${phone}`,
    };
  }, [baseBusiness, company, city, phone]);

  const TradeIcon =
    tradeKey === "heating"
      ? Flame
      : tradeKey === "roofing"
        ? Hammer
        : tradeKey === "commercial"
          ? Building
          : Zap;

  const cleanPhone = phone.replace(/\s+/g, "");
  const whatsappPhone = cleanPhone.startsWith("0") ? "44" + cleanPhone.slice(1) : cleanPhone;

  return (
    <div className="min-h-screen bg-[#081B30] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Discrete Private Staging Prototype Notice */}
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
              Interactive demonstration created for <strong>{company}</strong> by Harley Digital
              Works
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

      {/* 2. Trade Contractor Header */}
      <header className="sticky top-0 z-40 bg-[#081B30]/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20">
              <TradeIcon className="h-5 w-5 fill-current" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>{company}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                {business.badge} · {city}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#workmanship" className="hover:text-white transition-colors">
              Workmanship
            </a>
            <a href="#calculator" className="hover:text-white transition-colors">
              Price Estimator
            </a>
            <a href="#coverage" className="hover:text-white transition-colors">
              Coverage
            </a>
          </nav>

          {/* Header Action CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(`Hi ${company}, I am on your website and would like to enquire about a job in ${city}.`)}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold shadow-md shadow-amber-500/10 transition-all"
            >
              <PhoneCall className="h-4 w-4" />
              <span className="hidden sm:inline">{phone}</span>
              <span className="sm:hidden">Call Now</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Emergency Dispatch Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 border-b border-rose-800/60 px-4 py-2 text-center text-xs font-semibold text-rose-100 flex items-center justify-center gap-2 shadow-inner">
        <span className="flex h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
        <span>24/7 Priority Trade Callouts across {city}</span>
        <span className="text-rose-400 font-mono font-bold ml-1">· Direct: {phone}</span>
      </div>

      {/* 4. Hero Section */}
      <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 border-b border-slate-800 bg-gradient-to-b from-[#081B30] to-[#0D253F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6">
              <ShieldCheck className="h-4 w-4" />
              <span>{business.badge}</span>
              <span className="text-emerald-600">·</span>
              <span>Serving {city}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6">
              {business.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
              {business.heroSubheadline}
            </p>

            {/* Quick Benefits Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {business.accreditations.map((acc, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-[#081B30]/80 p-3 text-center"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">{acc.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{acc.iconText}</span>
                </div>
              ))}
            </div>

            {/* Callout CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call {phone}</span>
              </a>

              <a
                href="#calculator"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 shadow-md transition-all"
              >
                <span>Instant Online Estimate</span>
                <ArrowRight className="h-4 w-4 text-amber-400" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Trade Services */}
      <section id="services" className="py-16 sm:py-20 border-b border-slate-800 bg-[#061627]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block mb-2">
              Our Core Services
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Certified Trade Solutions in {city}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3">
              Fixed upfront pricing, full building compliance, and certified guarantees on every
              job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {business.popularServices.map((srv, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-[#081B30] p-6 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-sm"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 mb-4">
                    <TradeIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{srv.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{srv.description}</p>
                </div>
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">{srv.turnaround}</span>
                  <span className="font-mono font-bold text-emerald-400">{srv.priceGuide}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Workmanship Before / After Transformation */}
      <section id="workmanship" className="py-16 sm:py-20 border-b border-slate-800 bg-[#081B30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block mb-2">
              Verified Workmanship
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Before &amp; After Project Evidence
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              Precision installation adhering strictly to current UK standards. Slide to inspect the
              completed upgrade.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider business={business} />
          </div>
        </div>
      </section>

      {/* 7. Instant Price Calculator */}
      <section id="calculator" className="py-16 sm:py-20 border-b border-slate-800 bg-[#061627]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 text-center sm:text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block mb-2">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Instant Online Job Estimator
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              Select your job requirements below to calculate a transparent ballpark estimate in 30
              seconds.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <TradeQuoteCalculator business={business} />
          </div>
        </div>
      </section>

      {/* 8. Local Area Coverage */}
      <section id="coverage" className="py-16 border-b border-slate-800 bg-[#081B30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 mb-2">
              <MapPin className="h-4 w-4" />
              <span>LOCAL COVERAGE RADIUS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Serving Homeowners, Landlords &amp; Commercial Clients in {city}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Rapid dispatch available across {city} and surrounding areas within a 25-mile radius.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#051323] relative">
            <div className="relative aspect-[2/1] sm:aspect-[21/9] w-full overflow-hidden bg-slate-950">
              <img
                src={`/api/maps/static?center=${encodeURIComponent(city)}&zoom=11&width=900&height=400`}
                alt={`Google Maps coverage radius for ${company} in ${city}`}
                className="w-full h-full object-cover brightness-95 contrast-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051323] via-transparent to-transparent opacity-80" />
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/85 border border-slate-700/80 text-white text-xs backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold">{city} &amp; Surrounds</span>
                <span className="text-slate-500">|</span>
                <span className="text-amber-400 font-mono text-[11px]">
                  25-Mile Priority Dispatch
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-6 bg-[#051323] border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap gap-2 text-slate-300">
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                  {city} Town Centre
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                  North &amp; South Boroughs
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                  Surrounding Villages
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                  Commercial Business Parks
                </span>
              </div>
              <div className="text-slate-400 text-[11px] font-mono flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Zero travel surcharge within radius</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Dedicated Trade Contractor Footer */}
      <footer className="bg-[#051323] border-t border-slate-800 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-black">
                <TradeIcon className="h-4 w-4" />
              </div>
              <div>
                <span className="font-extrabold text-white text-sm block">{company}</span>
                <span className="text-[11px] text-slate-500">{business.badge}</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                Emergency: {phone}
              </a>
              <a
                href={`https://wa.me/${whatsappPhone}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <span>
              © {new Date().getFullYear()} {company}. All rights reserved.
            </span>
            <span>
              Private Staging Prototype engineered by{" "}
              <a
                href="https://harleydigitalworks.com"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Harley Digital Works
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
