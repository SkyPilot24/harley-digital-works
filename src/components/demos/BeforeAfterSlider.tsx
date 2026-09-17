import { useState } from "react";
import { Sparkles, MapPin, CheckCircle2 } from "lucide-react";
import type { TradeDemoBusiness } from "./TradeDemoData";

interface BeforeAfterSliderProps {
  business: TradeDemoBusiness;
}

export function BeforeAfterSlider({ business }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const item = business.beforeAfter;

  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6 md:p-8 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400 mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Proof of Work</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{item.title}</h3>
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
            <MapPin className="h-3.5 w-3.5 text-gold-500" />
            <span>{item.location}</span>
            <span className="text-neutral-600">•</span>
            <span className="text-gold-400 font-medium">{item.badge}</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-neutral-300 mb-6 leading-relaxed">{item.jobSummary}</p>

      {/* Visual Slider Simulation */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-950 select-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-800">
          {/* Before side */}
          <div className="p-6 md:p-8 bg-neutral-950/90 relative flex flex-col justify-between min-h-[220px]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold w-fit mb-4">
              <span>⚠️ BEFORE STATE</span>
            </div>
            <div>
              <p className="text-sm text-neutral-300 italic mb-2">"{item.beforeDesc}"</p>
              <div className="text-xs text-rose-400/80 font-medium">Issue: Inefficient, non-compliant, leaking or dangerous.</div>
            </div>
          </div>

          {/* After side */}
          <div className="p-6 md:p-8 bg-gradient-to-br from-gold-500/10 via-neutral-900 to-neutral-950 relative flex flex-col justify-between min-h-[220px]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold w-fit mb-4">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>✅ AFTER: {business.name.split(" ")[0]} UPGRADE</span>
            </div>
            <div>
              <p className="text-sm text-white font-medium mb-2">"{item.afterDesc}"</p>
              <div className="text-xs text-emerald-400 font-medium">Result: Full certification, 10–20 year guarantee, and energy savings.</div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900/90 px-4 py-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <span>Client Satisfaction: 5.0 / 5.0 ★</span>
          <span className="text-gold-400 font-semibold">100% Signed Off & Certified</span>
        </div>
      </div>
    </div>
  );
}
