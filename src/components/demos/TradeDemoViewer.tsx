import { useState } from "react";
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
} from "lucide-react";
import { PillButton } from "@/components/site/PillButton";
import { TRADE_DEMOS, type TradeDemoBusiness } from "./TradeDemoData";
import { TradeQuoteCalculator } from "./TradeQuoteCalculator";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

interface TradeDemoViewerProps {
  initialTrade?: "electrical" | "roofing" | "heating";
}

export function TradeDemoViewer({ initialTrade = "electrical" }: TradeDemoViewerProps) {
  const [activeTradeKey, setActiveTradeKey] = useState<"electrical" | "roofing" | "heating">(initialTrade);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const business: TradeDemoBusiness = TRADE_DEMOS[activeTradeKey] || TRADE_DEMOS.electrical;

  return (
    <div className="w-full space-y-6">
      {/* Control Bar: Trade Selector + Device Selector */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-gold-500/30 bg-neutral-900/90 p-4 backdrop-blur-xl shadow-xl">
        {/* Trade Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mr-1 hidden sm:inline">
            Select Trade Demo:
          </span>
          <button
            type="button"
            onClick={() => setActiveTradeKey("electrical")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTradeKey === "electrical"
                ? "bg-gold-500 text-neutral-950 shadow-md ring-2 ring-gold-400/50"
                : "bg-neutral-800/80 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            <span>⚡ Electrical & Solar</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTradeKey("roofing")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTradeKey === "roofing"
                ? "bg-gold-500 text-neutral-950 shadow-md ring-2 ring-gold-400/50"
                : "bg-neutral-800/80 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            <span>🏠 Roofing & Flat Roofs</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTradeKey("heating")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTradeKey === "heating"
                ? "bg-gold-500 text-neutral-950 shadow-md ring-2 ring-gold-400/50"
                : "bg-neutral-800/80 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            <span>🔥 Heating & Gas</span>
          </button>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-1.5 bg-neutral-950/80 p-1.5 rounded-xl border border-neutral-800">
          <button
            type="button"
            onClick={() => setDeviceMode("mobile")}
            className={`p-2 rounded-lg text-xs transition-all flex items-center gap-1.5 ${
              deviceMode === "mobile" ? "bg-neutral-800 text-gold-400 shadow-sm" : "text-neutral-400 hover:text-white"
            }`}
            title="Preview Mobile Device (375px)"
          >
            <Smartphone className="h-4 w-4" />
            <span className="hidden sm:inline font-medium text-[11px]">Mobile</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode("tablet")}
            className={`p-2 rounded-lg text-xs transition-all flex items-center gap-1.5 ${
              deviceMode === "tablet" ? "bg-neutral-800 text-gold-400 shadow-sm" : "text-neutral-400 hover:text-white"
            }`}
            title="Preview Tablet Device (768px)"
          >
            <Tablet className="h-4 w-4" />
            <span className="hidden sm:inline font-medium text-[11px]">Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode("desktop")}
            className={`p-2 rounded-lg text-xs transition-all flex items-center gap-1.5 ${
              deviceMode === "desktop" ? "bg-neutral-800 text-gold-400 shadow-sm" : "text-neutral-400 hover:text-white"
            }`}
            title="Preview Full Desktop"
          >
            <Monitor className="h-4 w-4" />
            <span className="hidden sm:inline font-medium text-[11px]">Desktop</span>
          </button>
        </div>
      </div>

      {/* Device Viewport Wrapper */}
      <div className="flex justify-center transition-all duration-300">
        <div
          className={`w-full transition-all duration-300 ${
            deviceMode === "mobile"
              ? "max-w-[400px] border-[10px] border-neutral-800 rounded-[44px] shadow-2xl overflow-hidden ring-1 ring-neutral-700 bg-neutral-950"
              : deviceMode === "tablet"
                ? "max-w-[780px] border-[12px] border-neutral-800 rounded-[36px] shadow-2xl overflow-hidden ring-1 ring-neutral-700 bg-neutral-950"
                : "max-w-6xl rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden bg-neutral-950"
          }`}
        >
          {/* Simulated Browser Bar (for desktop & tablet) */}
          {deviceMode !== "mobile" && (
            <div className="bg-neutral-900 border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="bg-neutral-950 text-neutral-400 text-xs px-4 py-1 rounded-full border border-neutral-800 flex items-center gap-2 font-mono max-w-sm truncate">
                <span className="text-emerald-400 font-bold">🔒</span>
                <span>https://www.{business.id}-solutions-demo.co.uk</span>
              </div>
              <div className="text-[11px] text-gold-400 font-medium hidden sm:block">HDW Live Trade Demo</div>
            </div>
          )}

          {/* SIMULATED CLIENT WEBSITE CANVAS */}
          <div className="bg-neutral-950 text-neutral-100 font-sans">
            {/* Top Emergency Status Bar */}
            <div className="bg-emerald-950/80 border-b border-emerald-800/40 text-emerald-300 px-4 py-2 text-center text-xs font-medium flex items-center justify-center gap-2">
              <span>{business.emergencyBanner}</span>
            </div>

            {/* Simulated Header */}
            <header className="border-b border-neutral-800/80 bg-neutral-900/90 sticky top-0 z-20 backdrop-blur-md px-4 sm:px-6 py-3.5 flex items-center justify-between">
              <div>
                <div className="font-extrabold text-base sm:text-lg text-white tracking-tight flex items-center gap-1.5">
                  <span className="text-gold-400">⚡</span>
                  <span>{business.name}</span>
                </div>
                <div className="text-[10px] sm:text-xs text-neutral-400">{business.badge}</div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`tel:${business.phone}`}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-white bg-neutral-800 hover:bg-neutral-700 px-3 py-2 rounded-xl border border-neutral-700 transition-all"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-gold-400" />
                  <span>{business.phone}</span>
                </a>
                <a
                  href={`https://wa.me/44${business.whatsapp.replace(/^0+/, "").replace(/\s+/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-2 rounded-xl transition-all shadow-sm"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </header>

            {/* Simulated Hero */}
            <section className="px-4 sm:px-8 py-8 sm:py-12 bg-gradient-to-b from-neutral-900/80 via-neutral-950 to-neutral-950 border-b border-neutral-800/60">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold mb-4">
                  <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                  <span>
                    Rated {business.rating.score}/5.0 from {business.rating.reviewsCount}+ Verified Customers
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                  {business.heroHeadline}
                </h1>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">{business.heroSubheadline}</p>

                {/* Accreditations Trust Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {business.accreditations.map((acc, i) => (
                    <div
                      key={i}
                      className="bg-neutral-900/90 border border-neutral-800 p-2.5 rounded-xl flex items-center gap-2 text-left"
                    >
                      <span className="text-base">{acc.iconText}</span>
                      <div className="overflow-hidden">
                        <div className="text-[11px] font-semibold text-white truncate">{acc.name}</div>
                        {acc.idNumber && <div className="text-[10px] text-neutral-400">{acc.idNumber}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Popular Services Grid */}
            <section className="px-4 sm:px-8 py-8 sm:py-10 border-b border-neutral-800/60">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Our Core Services & Fixed Guide Pricing</h2>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Covering {business.coverageArea} with written fixed quotes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {business.popularServices.map((svc, i) => (
                  <div key={i} className="bg-neutral-900/60 border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="font-bold text-sm sm:text-base text-white">{svc.title}</h3>
                        <span className="text-xs font-semibold text-gold-400 bg-gold-500/10 px-2.5 py-0.5 rounded-full border border-gold-500/20 whitespace-nowrap">
                          {svc.priceGuide}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-300 mb-4">{svc.description}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-neutral-800/80">
                      <div className="flex items-center gap-1 text-emerald-400">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{svc.turnaround}</span>
                      </div>
                      <span className="text-neutral-500">Free Assessment</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Interactive Section 1: Instant Quote Estimator */}
            <section className="px-4 sm:px-8 py-8 sm:py-10 border-b border-neutral-800/60 bg-neutral-900/30">
              <TradeQuoteCalculator business={business} />
            </section>

            {/* Interactive Section 2: Before & After Proof */}
            <section className="px-4 sm:px-8 py-8 sm:py-10 border-b border-neutral-800/60">
              <BeforeAfterSlider business={business} />
            </section>

            {/* Client Reviews */}
            <section className="px-4 sm:px-8 py-8 sm:py-10 border-b border-neutral-800/60 bg-neutral-900/20">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">What Local Customers Say</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {business.reviews.map((rev, i) => (
                  <div key={i} className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-2xl">
                    <div className="flex items-center gap-1 text-gold-400 mb-2">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-300 italic mb-3">"{rev.text}"</p>
                    <div className="flex items-center justify-between text-xs text-neutral-400 border-t border-neutral-800 pt-2">
                      <span className="font-semibold text-white">{rev.author} ({rev.location})</span>
                      <span className="text-gold-400/90">{rev.service}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Simulated Footer */}
            <footer className="px-4 sm:px-8 py-6 bg-neutral-900 border-t border-neutral-800 text-neutral-400 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-bold text-white">{business.name}</div>
                <div className="text-[11px] text-neutral-500">Covering {business.coverageArea}</div>
              </div>
              <div className="flex items-center gap-4">
                <a href={`tel:${business.phone}`} className="hover:text-gold-400 transition-colors">
                  📞 {business.phone}
                </a>
                <span className="text-neutral-700">|</span>
                <span className="text-emerald-400">🟢 Fully Insured £5M</span>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* CONVERSION BOTTOM BAR: ORDER THIS WEBSITE */}
      <div className="rounded-2xl border-2 border-gold-500/60 bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 mb-1">
            <Sparkles className="h-4 w-4" />
            <span>Ready for your own business?</span>
          </div>
          <h4 className="text-lg md:text-xl font-bold text-white">
            Get this complete, high-converting website built for your trade in 14 days.
          </h4>
          <p className="text-xs text-neutral-400 mt-1">
            100% Done-For-You: We write all the copy, add your accreditations, and set up your WhatsApp instant quote lead flow.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            to="/contact"
            search={{
              package: "launch",
              service: `Web Design (${business.name})`,
              domain: undefined,
              websiteUrl: undefined,
            }}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold text-sm px-6 py-3.5 transition-all shadow-lg hover:shadow-gold-500/20"
          >
            <span>Launch My Website (£1,495)</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
