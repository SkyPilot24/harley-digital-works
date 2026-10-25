import { useState } from "react";
import { Sparkles, MapPin, CheckCircle2 } from "lucide-react";
import type { TradeDemoBusiness } from "./TradeDemoData";

interface BeforeAfterSliderProps {
  business: TradeDemoBusiness;
}

export function BeforeAfterSlider({ business }: BeforeAfterSliderProps) {
  const item = business.beforeAfter;
  const beforeImg = item.beforeImage || "/images/home/before-electrical-fusebox.jpg";
  const afterImg = item.afterImage || "/images/home/after-electrical-consumer-unit.jpg";

  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6 md:p-8 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1 font-mono">
            <span>Verified Workmanship Comparison</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{item.title}</h3>
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
            <MapPin className="h-3.5 w-3.5 text-emerald-400" />
            <span>{item.location}</span>
            <span className="text-neutral-600">•</span>
            <span className="text-emerald-400 font-medium">{item.badge}</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-neutral-300 mb-6 leading-relaxed">{item.jobSummary}</p>

      {/* Visual Image Comparison Grid */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-950 select-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-800">
          {/* Before side */}
          <div className="relative flex flex-col justify-between overflow-hidden group">
            <div className="relative h-64 sm:h-72 overflow-hidden bg-neutral-950">
              <img
                src={beforeImg}
                alt="Before electrical replacement"
                className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-semibold backdrop-blur-sm">
                <span>Before Replacement</span>
              </div>
            </div>
            <div className="p-5 bg-neutral-950">
              <p className="text-xs text-neutral-300 leading-relaxed mb-2">"{item.beforeDesc}"</p>
              <div className="text-[11px] text-rose-400 font-medium">
                Issue: Degraded Bakelite insulation, no RCD shock protection, fire risk.
              </div>
            </div>
          </div>

          {/* After side */}
          <div className="relative flex flex-col justify-between overflow-hidden group border-t md:border-t-0 md:border-l border-neutral-800">
            <div className="relative h-64 sm:h-72 overflow-hidden bg-neutral-950">
              <img
                src={afterImg}
                alt="After certified consumer unit upgrade"
                className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Certified 18th Edition Finish</span>
              </div>
            </div>
            <div className="p-5 bg-neutral-950">
              <p className="text-xs text-white leading-relaxed mb-2 font-medium">
                "{item.afterDesc}"
              </p>
              <div className="text-[11px] text-emerald-400 font-medium">
                Result: Hager metal RCBO board with Type 2 surge protection, full NICEIC Part P
                certification.
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900/90 px-4 py-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <span>Customer Review: 5.0 / 5.0 rating</span>
          <span className="text-emerald-400 font-semibold font-mono">
            100% NICEIC Certified & Part P Notified
          </span>
        </div>
      </div>
    </div>
  );
}
