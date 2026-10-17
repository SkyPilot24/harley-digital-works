import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  ArrowUpRight,
  Check,
  AlertTriangle,
  Sparkles,
  Phone,
  Shield,
  Smartphone,
  Monitor,
  Flame,
  Zap,
  Hammer,
  TreePine,
  Paintbrush,
  Home,
  CheckCircle2,
  TrendingUp,
  Info,
  Calendar,
  Clock,
  ShieldCheck,
  HelpCircle,
  FileText,
  BadgeAlert,
} from "lucide-react";
import {
  PORTFOLIO_TRANSFORMATIONS,
  type PortfolioTransformation,
  type PortfolioItemType,
} from "@/lib/portfolio-data";
import { PillButton } from "./PillButton";

const TRADE_ICONS: Record<string, React.ElementType> = {
  "heating-plumbing": Flame,
  "electrical-ev": Zap,
  "roofing-leadwork": Home,
  "building-renovations": Hammer,
  "landscaping-gardens": TreePine,
  "painting-decorating": Paintbrush,
};

interface BeforeAfterComparisonProps {
  initialTradeId?: string;
  showAllTrades?: boolean;
  featuredOnly?: boolean;
  compactMode?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
  sectionKicker?: string;
}

export function BeforeAfterComparison({
  initialTradeId = "heating-plumbing",
  showAllTrades = true,
  featuredOnly = false,
  compactMode = false,
  className = "",
  title = "See What Your Website Could Become",
  subtitle = "Explore how professional digital design transforms outdated trades websites into high-trust, mobile-first customer enquiry engines.",
  sectionKicker = "THE VISUAL & COMMERCIAL DIFFERENCE",
}: BeforeAfterComparisonProps) {
  const [activeTradeId, setActiveTradeId] = useState<string>(initialTradeId);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [showCommercialDetails, setShowCommercialDetails] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rangeInputRef = useRef<HTMLInputElement>(null);

  const displayedTrades = featuredOnly
    ? PORTFOLIO_TRANSFORMATIONS.slice(0, 3)
    : PORTFOLIO_TRANSFORMATIONS;

  const currentTransformation: PortfolioTransformation =
    PORTFOLIO_TRANSFORMATIONS.find((t) => t.id === activeTradeId) || PORTFOLIO_TRANSFORMATIONS[0];

  const ActiveIcon = TRADE_ICONS[currentTransformation.id] || Flame;

  // Handle pointer / touch dragging on the slider container
  const handlePointerMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 3) percentage = 3;
    if (percentage > 97) percentage = 97;
    setSliderPosition(Math.round(percentage));
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches[0]) {
        handlePointerMove(e.touches[0].clientX);
      }
    },
    [handlePointerMove],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        handlePointerMove(e.clientX);
      }
    },
    [isDragging, handlePointerMove],
  );

  // Sync keyboard slider input with range
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className={`w-full max-w-6xl mx-auto select-none ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
            <span>CONCEPT DEMONSTRATIONS · NOT PAST CLIENT COMMISSIONS</span>
          </div>
          <p className="studio-kicker">
            <span className="studio-kicker-line" /> {sectionKicker}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink font-display mt-2">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-ink-muted mt-2 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Viewport Mode Toggle: Desktop vs Mobile */}
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="inline-flex items-center p-1 bg-stone-100 border border-ink/10 rounded-xl"
            role="group"
            aria-label="Device preview mode"
          >
            <button
              type="button"
              onClick={() => setViewMode("desktop")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "desktop"
                  ? "bg-white text-ink shadow-xs"
                  : "text-ink-muted hover:text-ink"
              }`}
              aria-pressed={viewMode === "desktop"}
            >
              <Monitor size={14} />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("mobile")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "mobile"
                  ? "bg-white text-ink shadow-xs"
                  : "text-ink-muted hover:text-ink"
              }`}
              aria-pressed={viewMode === "mobile"}
            >
              <Smartphone size={14} />
              <span>Mobile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trade Selector Tabs */}
      {showAllTrades && (
        <div
          className="flex flex-wrap gap-2 p-1.5 bg-stone-100/90 border border-ink/10 rounded-2xl mb-8 overflow-x-auto"
          role="tablist"
          aria-label="Select UK trade transformation concept"
        >
          {displayedTrades.map((item) => {
            const Icon = TRADE_ICONS[item.id] || Flame;
            const isSelected = activeTradeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`trade-panel-${item.id}`}
                id={`trade-tab-${item.id}`}
                onClick={() => {
                  setActiveTradeId(item.id);
                  setSliderPosition(50);
                }}
                className={`flex-1 min-w-[150px] sm:min-w-[170px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-ink text-white shadow-sm"
                    : "text-ink-muted hover:text-ink hover:bg-white/60"
                }`}
              >
                <Icon size={15} className={isSelected ? "text-amber-400" : "text-ink-muted"} />
                <span>{item.tradeName}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Interactive Comparison Viewport */}
      <div
        id={`trade-panel-${currentTransformation.id}`}
        role="tabpanel"
        aria-labelledby={`trade-tab-${currentTransformation.id}`}
        className="space-y-6"
      >
        {/* Device Wrapper: Switch between Desktop Container and Mobile Phone Frame */}
        <div
          className={`mx-auto transition-all duration-300 ${
            viewMode === "mobile" ? "max-w-sm sm:max-w-md" : "w-full"
          }`}
        >
          {/* Interactive Comparison Window */}
          <div
            ref={containerRef}
            className={`relative rounded-3xl overflow-hidden border border-ink/15 shadow-2xl bg-black cursor-ew-resize group select-none ${
              viewMode === "mobile" ? "h-[580px] sm:h-[620px]" : "h-[480px] sm:h-[560px]"
            }`}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
          >
            {/* ============================================================ */}
            {/* BEFORE LAYER: Outdated, Cluttered Trades Website (Base) */}
            {/* ============================================================ */}
            <div
              className="absolute inset-0 flex flex-col justify-between overflow-hidden text-slate-300"
              style={{ backgroundColor: currentTransformation.before.colorScheme.bg }}
            >
              {/* Outdated Browser Address Bar */}
              <div
                className="px-4 py-2.5 border-b border-slate-700/80 flex items-center justify-between text-xs font-mono"
                style={{ backgroundColor: currentTransformation.before.colorScheme.headerBg }}
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                  <span className="text-red-400 text-[10px] sm:text-xs truncate">
                    ⚠ NOT SECURE · {currentTransformation.before.urlPlaceholder}
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700 shrink-0">
                  DATED 2008 TEMPLATE
                </span>
              </div>

              {/* Cluttered Navigation Header */}
              <div className="bg-slate-900/90 px-4 sm:px-6 py-2 border-b border-slate-800 text-[10px] sm:text-xs flex flex-wrap justify-between items-center text-slate-400 font-sans">
                <span className="truncate">HOME | SERVICES | PRICES | GALLERY | CONTACT</span>
                <span className="text-yellow-400 font-bold tracking-tight">
                  CALL: 07700 900000 (Dave)
                </span>
              </div>

              {/* Cluttered Body Content */}
              <div className="p-5 sm:p-8 max-w-xl space-y-3 sm:space-y-4 my-auto">
                <div className="inline-block bg-red-600 text-white font-extrabold text-[10px] sm:text-xs px-2.5 py-1 uppercase tracking-wider shadow-sm">
                  ★★★ 100% QUALITY GUARANTEED · NO JOB TOO SMALL ★★★
                </div>

                <h3 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans leading-tight">
                  {currentTransformation.before.title}
                </h3>

                <div className="bg-yellow-300 text-slate-950 font-bold text-[11px] sm:text-xs p-2.5 sm:p-3 border-2 border-dashed border-red-600">
                  {currentTransformation.before.headline}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3 sm:line-clamp-none">
                  {currentTransformation.before.subheadline}
                </p>

                <div className="pt-1 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    tabIndex={-1}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-[10px] sm:text-xs px-4 py-2 uppercase border border-white shadow-md pointer-events-none"
                  >
                    👉 CLICK HERE TO ENQUIRE 👈
                  </button>
                  <span className="text-[10px] sm:text-[11px] text-red-400 font-mono flex items-center gap-1">
                    <AlertTriangle size={12} /> High mobile bounce rate
                  </span>
                </div>
              </div>

              {/* Before Footer Bar */}
              <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[10px] sm:text-xs font-mono text-red-400">
                <span className="font-bold tracking-wider">
                  BEFORE: OUTDATED DIY DESIGN · LOST REVENUE
                </span>
                <span className="hidden sm:inline text-slate-500">
                  WEAK CTA · POOR MOBILE USABILITY
                </span>
              </div>
            </div>

            {/* ============================================================ */}
            {/* AFTER LAYER: Modern Harley Digital Works Standard (Clipped) */}
            {/* ============================================================ */}
            <div
              className="absolute inset-0 flex flex-col justify-between overflow-hidden"
              style={{
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                backgroundColor: currentTransformation.after.colorScheme.heroBg,
              }}
            >
              {/* Modern Studio Browser Chrome */}
              <div className="px-4 py-2.5 bg-ink-950/80 border-b border-white/10 backdrop-blur-md flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-mono text-[10px] sm:text-xs text-emerald-400 truncate">
                    🔒 {currentTransformation.after.urlPlaceholder}
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono text-white/90 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/50 shrink-0">
                  HARLEY DIGITAL WORKS
                </span>
              </div>

              {/* Modern Professional Header */}
              <div className="relative z-10 px-4 sm:px-8 py-3 flex items-center justify-between text-white border-b border-white/10 backdrop-blur-xs">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="font-serif text-base sm:text-xl font-bold tracking-tight">
                    {currentTransformation.after.title}
                    <span className="text-amber-400">.</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="hidden sm:inline text-white/80">Services</span>
                  <span className="hidden sm:inline text-white/80">Reviews</span>
                  <span className="inline-flex items-center gap-1.5 bg-white text-ink px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
                    Get Quote <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>

              {/* Hero Editorial Content */}
              <div className="relative z-10 p-5 sm:p-10 max-w-xl text-white space-y-3 sm:space-y-4 my-auto">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-mono text-white">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  <span>{currentTransformation.after.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight leading-[1.1] text-white">
                  {currentTransformation.after.headline}{" "}
                  {currentTransformation.after.accentWord && (
                    <span className="italic text-amber-200">
                      {currentTransformation.after.accentWord}
                    </span>
                  )}
                </h3>

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans max-w-lg line-clamp-3 sm:line-clamp-none">
                  {currentTransformation.after.subheadline}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-ink font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-lg">
                    {currentTransformation.after.callToAction}
                    <ArrowUpRight size={14} />
                  </span>
                  <span className="text-[11px] sm:text-xs text-white/70 font-mono hidden sm:inline">
                    {currentTransformation.after.secondaryCta}
                  </span>
                </div>
              </div>

              {/* After Footer Bar */}
              <div className="p-3 sm:p-4 bg-black/60 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs font-mono text-emerald-400 backdrop-blur-md">
                <span className="font-bold tracking-wider">
                  AFTER: HIGH-CONVERTING TRADE PLATFORM
                </span>
                <span className="hidden sm:inline text-white/60">
                  1-TAP QUOTES · ACCREDITATIONS VERIFIED
                </span>
              </div>
            </div>

            {/* ============================================================ */}
            {/* INTERACTIVE DRAG HANDLE & DIVIDER LINE */}
            {/* ============================================================ */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none flex items-center justify-center"
              style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            >
              {/* Glowing vertical rule */}
              <div className="w-[3px] h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" />

              {/* Circular Handle Pill */}
              <div className="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ink text-white border-2 border-white shadow-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                <ArrowLeftRight size={16} className="text-amber-400" />
              </div>
            </div>

            {/* Bottom floating helper pills */}
            <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
              <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-white/80 border border-white/10">
                BEFORE (Drag slider)
              </span>
            </div>
            <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
              <span className="px-2.5 py-1 rounded-md bg-amber-500/90 text-ink text-[10px] font-mono font-bold shadow-sm">
                AFTER (Harley Standard)
              </span>
            </div>
          </div>

          {/* Accessible Native Range Slider for Keyboard & Screen Readers */}
          <div className="mt-4 px-2">
            <label htmlFor={`slider-range-${currentTransformation.id}`} className="sr-only">
              Compare before and after design for {currentTransformation.tradeName}
            </label>
            <input
              id={`slider-range-${currentTransformation.id}`}
              ref={rangeInputRef}
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleRangeChange}
              aria-label={`Interactive before and after comparison slider for ${currentTransformation.tradeName}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={sliderPosition}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600 focus-visible:outline-2 focus-visible:outline-amber-600 focus-visible:outline-offset-4"
            />
            <div className="flex justify-between items-center text-[11px] font-mono text-ink-muted mt-1.5">
              <span>← Outdated DIY Design (0%)</span>
              <span className="font-semibold text-ink">
                Drag or use Arrow keys: {sliderPosition}%
              </span>
              <span>Modern Trade Platform (100%) →</span>
            </div>
          </div>
        </div>

        {/* Commercial Benefits Breakdown: Before / After / Potential Impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-5 rounded-2xl bg-white border border-red-200/80 shadow-2xs space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600">
              <AlertTriangle size={14} />
              <span>BEFORE: THE BUSINESS PROBLEM</span>
            </div>
            <p className="text-xs sm:text-sm text-ink leading-relaxed">
              {currentTransformation.commercialBenefits.beforeSummary}
            </p>
            <ul className="space-y-1 pt-2 border-t border-ink/5">
              {currentTransformation.before.flaws.slice(0, 2).map((flaw, idx) => (
                <li key={idx} className="text-[11px] text-ink-muted flex items-start gap-1.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>{flaw}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-emerald-200/80 shadow-2xs space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <CheckCircle2 size={14} />
              <span>AFTER: THE HARLEY SOLUTION</span>
            </div>
            <p className="text-xs sm:text-sm text-ink leading-relaxed">
              {currentTransformation.commercialBenefits.afterSummary}
            </p>
            <ul className="space-y-1 pt-2 border-t border-ink/5">
              {currentTransformation.after.keyFeatures.slice(0, 2).map((feature, idx) => (
                <li key={idx} className="text-[11px] text-ink-muted flex items-start gap-1.5">
                  <Check size={12} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <TrendingUp size={14} />
              <span>POTENTIAL COMMERCIAL IMPACT</span>
            </div>
            <p className="text-xs sm:text-sm text-ink leading-relaxed">
              {currentTransformation.commercialBenefits.potentialImpact}
            </p>
            <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs">
              <span className="font-mono text-ink-muted">Conversion Uplift:</span>
              <span className="font-bold text-amber-900">
                {currentTransformation.commercialBenefits.commercialScenario.conversionBefore}% →{" "}
                {currentTransformation.commercialBenefits.commercialScenario.conversionAfter}%
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowCommercialDetails(!showCommercialDetails)}
              className="text-[11px] font-semibold text-amber-800 hover:text-amber-900 underline flex items-center gap-1 cursor-pointer pt-1"
            >
              <Info size={12} />
              <span>
                {showCommercialDetails
                  ? "Hide scenario assumptions"
                  : "View commercial assumptions"}
              </span>
            </button>
          </div>
        </div>

        {/* Expandable Illustrative Commercial ROI Scenario */}
        {showCommercialDetails && (
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-3 transition-all">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <span className="font-mono font-bold uppercase tracking-wider text-ink">
                Illustrative Commercial Scenario · Fictional Trade Example
              </span>
              <span className="text-[10px] bg-stone-200 text-stone-700 px-2 py-0.5 rounded font-mono">
                HYPOTHETICAL ASSUMPTIONS
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-white rounded-xl border border-stone-200/80">
                <span className="text-[10px] text-ink-muted block">Monthly Traffic</span>
                <span className="text-base font-bold text-ink">
                  {currentTransformation.commercialBenefits.commercialScenario.monthlyVisitors}
                </span>
                <span className="text-[9px] text-ink-muted block">local visitors</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200/80">
                <span className="text-[10px] text-ink-muted block">Estimated Extra Enquiries</span>
                <span className="text-base font-bold text-emerald-700">
                  +
                  {
                    currentTransformation.commercialBenefits.commercialScenario
                      .monthlyExtraEnquiries
                  }
                </span>
                <span className="text-[9px] text-ink-muted block">per month</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200/80">
                <span className="text-[10px] text-ink-muted block">Assumed Average Job</span>
                <span className="text-base font-bold text-ink truncate">
                  {
                    currentTransformation.commercialBenefits.commercialScenario.assumedAvgJobValue.split(
                      " ",
                    )[0]
                  }
                </span>
                <span className="text-[9px] text-ink-muted block truncate">typical ticket</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200/80">
                <span className="text-[10px] text-ink-muted block">Potential Monthly Pipeline</span>
                <span className="text-base font-bold text-amber-800 truncate">
                  {
                    currentTransformation.commercialBenefits.commercialScenario.illustrativeAnnualGain.split(
                      " ",
                    )[0]
                  }
                </span>
                <span className="text-[9px] text-ink-muted block">pipeline impact</span>
              </div>
            </div>
            <div className="bg-white/80 p-3 rounded-xl border border-stone-200 text-[11px] text-ink-muted space-y-1">
              <span className="font-semibold text-ink block">Explicit Scenario Assumptions:</span>
              {currentTransformation.commercialBenefits.commercialScenario.assumptions.map(
                (assumption, i) => (
                  <p key={i}>• {assumption}</p>
                ),
              )}
              <p className="text-[10px] text-stone-500 italic pt-1">
                Notice: These scenarios represent hypothetical projections based on typical industry
                conversion rates and job values. They are not guaranteed outcomes or measured past
                performance.
              </p>
            </div>
          </div>
        )}

        {/* Fictional Customer Scenario & Illustrative Testimonial Box */}
        <aside
          className="p-5 sm:p-6 rounded-2xl bg-white border border-dashed border-ink/20 shadow-2xs space-y-3"
          aria-label="Fictional customer scenario and sample testimonial"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded">
              FICTIONAL CUSTOMER SCENARIO · ILLUSTRATIVE TESTIMONIAL COPY
            </span>
            <span className="text-[11px] text-ink-muted">
              {currentTransformation.supportingSocialProof.location}
            </span>
          </div>

          <blockquote className="text-sm sm:text-base text-ink italic leading-relaxed">
            {currentTransformation.supportingSocialProof.quote}
          </blockquote>

          <div className="pt-2 border-t border-ink/5 flex flex-wrap items-center justify-between text-xs text-ink-muted gap-2">
            <div>
              <strong className="text-ink font-semibold">
                {currentTransformation.supportingSocialProof.tradingName}
              </strong>
              <span className="text-ink-muted block text-[11px]">
                {currentTransformation.supportingSocialProof.businessOwner}
              </span>
            </div>
            <div className="text-[11px] text-stone-500 italic max-w-sm text-right">
              Sample scenario demonstrating customer journey. Real client reviews will only be
              published with written consent and verified provenance.
            </div>
          </div>
        </aside>

        {/* Section Action / CTA */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10">
          <div className="space-y-0.5">
            <p className="text-sm font-bold text-ink">
              Ready to see what your website could look like?
            </p>
            <p className="text-xs text-ink-muted">
              We review your existing site and prepare a bespoke transformation concept.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <PillButton
              as="link"
              to="/contact"
              search={{
                service: `Website Redesign: ${currentTransformation.tradeName}`,
              }}
              variant="dark"
              className="studio-button text-xs font-bold"
            >
              Request Your Free Website Plan
            </PillButton>
            <PillButton
              as="link"
              to="/contact"
              search={{
                service: "Existing website review",
              }}
              variant="ghost"
              className="text-xs font-semibold border border-ink/20 hover:bg-ink/5"
            >
              Show Us Your Website →
            </PillButton>
          </div>
        </div>
      </div>
    </div>
  );
}
