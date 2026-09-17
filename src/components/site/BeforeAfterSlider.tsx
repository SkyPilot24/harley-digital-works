import React, { useState, useRef, useCallback } from "react";
import { ArrowLeftRight, ArrowUpRight, Check, AlertTriangle, Sparkles, Phone, Shield } from "lucide-react";

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeConcept, setActiveConcept] = useState<"architecture" | "solar" | "interior">("architecture");
  const containerRef = useRef<HTMLDivElement>(null);

  const concepts = {
    architecture: {
      name: "FORM & FIELD",
      category: "Architectural Building & Renovation",
      headline: "Space to live.",
      subline: "Room to dream.",
      lead: "Bespoke residential building, structural timber and contemporary extensions.",
      image: "/images/home/architecture.jpg",
      tag: "01 — THE GARDEN HOUSE",
      diyTitle: "Dave's Building & Joinery Services",
      diyPitch: "ALL GENERAL BUILDING WORK UNDERTAKEN - BRICKWORK, ROOFS, EXTENSIONS, PLASTER",
    },
    solar: {
      name: "SOLIS",
      category: "Commercial & Domestic Solar PV",
      headline: "Power your home.",
      subline: "Lighten your footprint.",
      lead: "High-voltage renewable energy, battery storage and intelligent grid integration.",
      image: "/images/home/solar.jpg",
      tag: "02 — COMMERCIAL ARRAYS",
      diyTitle: "Eco-Solar Panels Direct UK",
      diyPitch: "CHEAP SOLAR FITTERS - CALL NOW FOR 20% DISCOUNT ON ALL RESIDENTIAL PANELS",
    },
    interior: {
      name: "STILLWATER",
      category: "Bespoke Bathrooms & Interiors",
      headline: "Craftsmanship you can",
      subline: "almost feel.",
      lead: "Hand-finished natural stone, bespoke brassware and considered architectural lighting.",
      image: "/images/home/interior.jpg",
      tag: "03 — STONE & TIMBER SUITE",
      diyTitle: "Fast-Fit Bathrooms & Tiling",
      diyPitch: "COMPLETE BATHROOMS FROM £999 - TILES INCLUDED - RING GARY TODAY",
    },
  };

  const current = concepts[activeConcept];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 3) percentage = 3;
    if (percentage > 97) percentage = 97;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    },
    [isDragging, handleMove]
  );

  return (
    <div className="w-full max-w-6xl mx-auto my-12 select-none">
      {/* Section Header & Concept Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
        <div>
          <p className="studio-kicker">
            <span className="studio-kicker-line" /> THE VISUAL DIFFERENCE
          </p>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink font-display mt-2">
            Drag to reveal the difference.
          </h3>
          <p className="text-sm text-ink-muted mt-1 max-w-lg">
            See how high-resolution photography, bespoke typography, and generous white space elevate
            a trade business above generic DIY templates.
          </p>
        </div>

        {/* Trade Concept Selector */}
        <div className="flex items-center gap-2 bg-white border border-ink/10 p-1.5 rounded-2xl shadow-2xs">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-muted px-2 hidden sm:inline">
            Direction:
          </span>
          {(["architecture", "solar", "interior"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveConcept(key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeConcept === key
                  ? "bg-ink text-white shadow-xs"
                  : "text-ink/70 hover:text-ink hover:bg-ink/5"
              }`}
            >
              {key === "architecture" ? "Architecture" : key === "solar" ? "Solar & Energy" : "Interiors"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Comparison Viewport */}
      <div
        ref={containerRef}
        className="relative h-[520px] sm:h-[580px] rounded-3xl overflow-hidden border border-ink/15 shadow-2xl bg-black cursor-ew-resize group"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* ============================================================ */}
        {/* BEFORE: DATED DIY TEMPLATE (Base Layer) */}
        {/* ============================================================ */}
        <div className="absolute inset-0 bg-[#0c1829] flex flex-col justify-between overflow-hidden text-slate-300">
          {/* Outdated DIY Browser Bar */}
          <div className="p-4 sm:p-5 bg-[#08101a] border-b border-slate-700/80 flex items-center justify-between text-xs font-sans">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="font-bold text-red-400 font-mono text-[11px]">
                ⚠ HTTP://MY-FREE-WIX-SITE.COM/{current.name.toLowerCase().replace(/\s+/g, "-")}
              </span>
            </div>
            <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700">
              TEMPLATE EXPIRED
            </span>
          </div>

          {/* Dated Cluttered Header */}
          <div className="bg-[#132238] px-4 sm:px-8 py-2 border-b border-slate-700 text-[11px] flex flex-wrap justify-between items-center text-slate-400 font-mono">
            <span>HOME | ABOUT | SERVICES | GALLERY | REVIEWS | CONTACT</span>
            <span className="text-yellow-400 font-bold">CALL NOW: 07890 123456</span>
          </div>

          {/* Body with Cluttered DIY Aesthetics */}
          <div className="p-6 sm:p-12 max-w-2xl space-y-4 my-auto">
            <div className="inline-block bg-red-600 text-white font-black text-xs px-3 py-1 uppercase tracking-wider rounded-none shadow-md">
              ★★★ 100% QUALITY GUARANTEED - NO JOB TOO SMALL ★★★
            </div>

            <h4 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
              {current.diyTitle}
            </h4>

            <div className="bg-yellow-400 text-black font-bold text-xs sm:text-sm p-3 border-2 border-dashed border-red-600">
              {current.diyPitch}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Welcome to our website! We have over 15 years experience in the local area. Please download
              our 8-page PDF brochure or fill out the 14-field enquiry questionnaire below and our office
              will call you back within 3-5 business days.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                type="button"
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-xs px-5 py-2.5 uppercase border-2 border-white shadow-lg cursor-pointer"
              >
                👉 CLICK HERE TO ENQUIRE NOW 👈
              </button>
              <div className="text-[11px] text-red-400 font-mono flex items-center gap-1">
                <AlertTriangle size={13} /> High mobile bounce rate (80%+)
              </div>
            </div>
          </div>

          {/* Outdated Footer Bar */}
          <div className="p-4 sm:p-6 bg-[#08101a] border-t border-slate-700 flex items-center justify-between text-xs font-mono text-red-400">
            <span className="font-bold tracking-wider">
              BEFORE: DATED DIY BUILD · LOSS OF COMMERCIAL CLIENTS
            </span>
            <span className="hidden sm:inline text-slate-500">
              CLUTTERED · NO ACCREDITATIONS · AMATEUR FINISH
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* AFTER: THE HARLEY STANDARD (Top Layer Clipped by Slider) */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          {/* Background Photography with Subtle Gradient Scrim */}
          <img
            src={current.image}
            alt={current.name}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60 pointer-events-none" />

          {/* Studio Top Navigation Chrome */}
          <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between text-white border-b border-white/15 backdrop-blur-xs">
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wider">
                {current.name}
                <span className="text-amber-400">.</span>
              </span>
              <span className="hidden sm:inline text-xs font-mono text-white/70 border-l border-white/20 pl-3">
                {current.category}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="hidden sm:inline text-white/80">Our approach</span>
              <span className="hidden sm:inline text-white/80">Selected work</span>
              <span className="inline-flex items-center gap-1.5 bg-white text-ink px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                Discuss a project <ArrowUpRight size={13} />
              </span>
            </div>
          </div>

          {/* Hero Editorial Copy Overlay */}
          <div className="relative z-10 p-6 sm:p-12 max-w-2xl text-white space-y-4 my-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-mono text-white">
              <Sparkles size={13} className="text-amber-300" />
              <span>{current.tag}</span>
            </div>

            <h4 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight leading-[1.05] text-white">
              {current.headline} <br />
              <em className="italic text-amber-200">{current.subline}</em>
            </h4>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-xl font-sans">
              {current.lead}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-white/80">
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-400" /> High-Resolution Photography
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-400" /> Bespoke Copywriting
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-400" /> Mobile Fast
              </span>
            </div>
          </div>

          {/* Studio Footer Bar */}
          <div className="relative z-10 p-4 sm:p-6 bg-black/60 backdrop-blur-md border-t border-white/15 flex items-center justify-between text-xs font-mono text-white/90">
            <span className="font-bold tracking-wider text-amber-300">
              AFTER: THE HARLEY DIGITAL WORKS STANDARD
            </span>
            <span className="hidden sm:inline text-white/70">
              BESPOKE DESIGN · COPYWRITING INCLUDED · 14-DAY DELIVERY
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* DRAGGABLE DIVIDER HANDLE */}
        {/* ============================================================ */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize z-30"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#18231C] text-white border-2 border-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
            <ArrowLeftRight size={17} className="text-[#C29F62]" />
          </div>
        </div>
      </div>

      {/* Helper caption */}
      <div className="flex items-center justify-between text-xs text-ink-muted mt-3 font-mono">
        <span>⟵ Drag slider left or right to inspect the contrast</span>
        <span className="font-bold text-ink">
          Comparison: {Math.round(sliderPosition)}% Harley Standard / {100 - Math.round(sliderPosition)}% Dated DIY Build
        </span>
      </div>
    </div>
  );
}
