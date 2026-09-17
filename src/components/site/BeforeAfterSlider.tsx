import React, { useState, useRef, useCallback } from "react";
import { ArrowLeftRight, Check, AlertTriangle, ShieldCheck, Sparkles, Phone, Send } from "lucide-react";

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
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
    <div className="w-full max-w-5xl mx-auto my-12 select-none">
      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <p className="studio-kicker">
            <span className="studio-kicker-line" /> INTERACTIVE TRANSFORMATION COMPARISON
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink font-display mt-1">
            Drag to compare the standard.
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/10 text-rose-800 border border-rose-200">
            <AlertTriangle size={12} /> Dated DIY Site
          </span>
          <span className="text-ink-muted">vs</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/10 text-emerald-800 border border-emerald-200">
            <Sparkles size={12} /> The Harley Standard
          </span>
        </div>
      </div>

      {/* Main interactive comparison frame */}
      <div
        ref={containerRef}
        className="relative h-[480px] sm:h-[440px] rounded-3xl overflow-hidden border border-ink/15 shadow-xl bg-white cursor-ew-resize"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* ============================================================ */}
        {/* AFTER LAYER (The Harley Standard - Full Background) */}
        {/* ============================================================ */}
        <div className="absolute inset-0 bg-[#F7F5EF] p-6 sm:p-8 flex flex-col justify-between text-[#252720]">
          {/* Simulated Premium Browser Chrome */}
          <div className="flex items-center justify-between pb-3 border-b border-[#DCDCD2] text-xs font-mono text-[#696B60]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-bold text-[#252720]">https://apex-electrical.co.uk</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                100% DONE-FOR-YOU
              </span>
              <span className="hidden sm:inline text-xs font-mono text-ink-muted">· FAST EDGE SSR</span>
            </div>
          </div>

          {/* Body Content of The Harley Standard */}
          <div className="grid sm:grid-cols-12 gap-6 items-center my-auto">
            <div className="sm:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#E9ECE4] text-[#252720] text-[11px] font-mono font-bold">
                <ShieldCheck size={14} className="text-emerald-700" />
                <span>NICEIC APPROVED · COMMERCIAL SOLAR & BATTERY</span>
              </div>
              <h4 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#252720] font-serif leading-tight">
                High-voltage commercial & domestic solar installations.
              </h4>
              <p className="text-sm text-[#696B60] leading-relaxed max-w-xl">
                Bespoke electrical contracting across Greater Manchester. We write all the copy,
                showcase real commercial projects, and enable customers to request an estimate in under 60 seconds.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 bg-[#252720] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm">
                  <Phone size={13} /> Call 0161 820 4492
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm">
                  <Send size={13} /> WhatsApp Instant Quote
                </span>
              </div>
            </div>

            <div className="sm:col-span-4 hidden sm:block">
              <div className="rounded-2xl border border-[#DCDCD2] bg-white p-4 shadow-sm space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase text-[#9A7432]">
                  COMMERCIAL CREDENTIALS
                </span>
                <div className="space-y-1.5 text-xs text-[#252720]">
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-emerald-700" />
                    <span>18th Edition Certified</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-emerald-700" />
                    <span>MCS Renewable Installer</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-emerald-700" />
                    <span>£5M Public Liability Insurance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bar of After */}
          <div className="pt-3 border-t border-[#DCDCD2] flex justify-between items-center text-xs font-mono text-[#696B60]">
            <span className="font-bold text-emerald-900">AFTER: THE HARLEY DIGITAL WORKS STANDARD</span>
            <span className="font-bold text-[#9A7432]">LAUNCH IN 14 DAYS · MANAGED CARE</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BEFORE LAYER (Dated DIY Website - Clipped by Slider) */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 bg-[#1A1F2C] p-6 sm:p-8 flex flex-col justify-between text-slate-200"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          {/* Simulated Outdated Browser Chrome */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-700 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="truncate max-w-[200px] sm:max-w-xs">http://free-diy-site.wixsite.com/daves-electrical</span>
            </div>
            <span className="text-rose-400 font-bold bg-rose-950/60 border border-rose-800 px-2 py-0.5 rounded text-[11px]">
              UNSECURED / DIY TEMPLATE
            </span>
          </div>

          {/* Body Content of Dated Site */}
          <div className="grid sm:grid-cols-12 gap-6 items-center my-auto">
            <div className="sm:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-rose-950/50 border border-rose-800/60 text-rose-300 text-[11px] font-mono">
                <AlertTriangle size={14} className="text-rose-400" />
                <span>NO HTTPS · MISSING ACCREDITATIONS</span>
              </div>
              <h4 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans leading-tight">
                Welcome to Dave&apos;s Electrical Services (Est. 2008)
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                We do all kinds of electrical work, plugs, sockets, lights, rewires. Call our landline between 9am–5pm or fill out our 14-field enquiry questionnaire.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 bg-slate-800 text-slate-400 text-xs px-4 py-2 rounded border border-slate-700">
                  Fill Out Enquiry Form
                </span>
                <span className="text-xs text-rose-400 font-mono">
                  ✗ 80%+ Visitor Drop-Off Rate
                </span>
              </div>
            </div>

            <div className="sm:col-span-4 hidden sm:block">
              <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4 space-y-2 text-xs text-slate-400 font-mono">
                <div className="text-rose-400 font-bold">COMMON DIY ISSUES:</div>
                <p>• Takes weeks of personal time</p>
                <p>• Broken layout on smartphones</p>
                <p>• No local Google Map ranking</p>
              </div>
            </div>
          </div>

          {/* Footer Bar of Before */}
          <div className="pt-3 border-t border-slate-700 flex justify-between items-center text-xs font-mono text-slate-400">
            <span className="font-bold text-rose-400">BEFORE: DATED DIY WEBSITE</span>
            <span className="text-rose-300">LEAKING COMMERCIAL CLIENTS</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* DRAGGABLE DIVIDER LINE & HANDLE */}
        {/* ============================================================ */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize z-30"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#252720] text-white border-2 border-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
            <ArrowLeftRight size={16} className="text-[#9A7432]" />
          </div>
        </div>
      </div>

      {/* Helper text underneath */}
      <div className="flex items-center justify-between text-xs text-ink-muted mt-3">
        <span>⟵ Drag slider left or right to explore both states</span>
        <span className="font-mono text-[11px] font-semibold text-ink">
          Comparison: {Math.round(sliderPosition)}% / {100 - Math.round(sliderPosition)}%
        </span>
      </div>
    </div>
  );
}
