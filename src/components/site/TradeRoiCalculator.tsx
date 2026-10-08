import { useState, useMemo } from "react";
import {
  Calculator,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  PoundSterling,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PillButton } from "./PillButton";

interface TradePreset {
  id: string;
  name: string;
  avgJobValue: number;
  typicalMonthlyWins: number;
  recommendedPackage: string;
}

const TRADE_PRESETS: TradePreset[] = [
  {
    id: "heating",
    name: "🔥 Boiler & Heating Engineer",
    avgJobValue: 2200,
    typicalMonthlyWins: 3,
    recommendedPackage: "Managed Website (£1,495)",
  },
  {
    id: "roofing",
    name: "🏠 Roofer & GRP Specialist",
    avgJobValue: 3500,
    typicalMonthlyWins: 2,
    recommendedPackage: "Expansion Website (£2,495)",
  },
  {
    id: "electrical",
    name: "⚡ Electrician & Solar Installer",
    avgJobValue: 1200,
    typicalMonthlyWins: 4,
    recommendedPackage: "Managed Website (£1,495)",
  },
  {
    id: "builder",
    name: "🔨 Builder & Home Renovations",
    avgJobValue: 18000,
    typicalMonthlyWins: 1,
    recommendedPackage: "Expansion Website (£2,495)",
  },
  {
    id: "cleaning",
    name: "✨ Commercial Cleaning & FM",
    avgJobValue: 650,
    typicalMonthlyWins: 6,
    recommendedPackage: "Managed Website (£1,495)",
  },
];

export function TradeRoiCalculator() {
  const [selectedPreset, setSelectedPreset] = useState<string>("heating");
  const [avgJobValue, setAvgJobValue] = useState<number>(2200);
  const [extraJobsPerMonth, setExtraJobsPerMonth] = useState<number>(3);
  const [websiteCost, setWebsiteCost] = useState<number>(1495);

  const handlePresetSelect = (preset: TradePreset) => {
    setSelectedPreset(preset.id);
    setAvgJobValue(preset.avgJobValue);
    setExtraJobsPerMonth(preset.typicalMonthlyWins);
    setWebsiteCost(preset.recommendedPackage.includes("2,495") ? 2495 : 1495);
  };

  const calculations = useMemo(() => {
    const monthlyExtraRevenue = avgJobValue * extraJobsPerMonth;
    const annualExtraRevenue = monthlyExtraRevenue * 12;
    const annualCarePlanCost = 249 * 12; // £2,988
    const totalYear1Investment = websiteCost + annualCarePlanCost;
    const netYear1Profit = annualExtraRevenue - totalYear1Investment;
    const roiMultiple =
      totalYear1Investment > 0 ? (annualExtraRevenue / totalYear1Investment).toFixed(1) : "0";
    const daysToBreakEven = Math.max(
      1,
      Math.round(totalYear1Investment / (monthlyExtraRevenue / 30)),
    );

    return {
      monthlyExtraRevenue,
      annualExtraRevenue,
      totalYear1Investment,
      netYear1Profit,
      roiMultiple,
      daysToBreakEven,
    };
  }, [avgJobValue, extraJobsPerMonth, websiteCost]);

  return (
    <div className="rounded-3xl border border-gold-500/30 bg-neutral-900/90 p-6 md:p-10 backdrop-blur-xl shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400 mb-1">
            <Calculator className="h-4 w-4" />
            <span>Interactive Commercial Estimator</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Calculate Your Trade Revenue & ROI
          </h3>
          <p className="text-xs md:text-sm text-neutral-400 mt-1">
            Illustrative economic scenario modeling based on your trade's project turnover.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-800 px-4 py-2.5 rounded-2xl self-start md:self-auto">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
          <div className="text-xs text-neutral-300">
            VAT Treatment: <strong className="text-white">Zero-Rated (£0)</strong>
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2.5">
          Select Your Trade Sector (Quick Preset):
        </label>
        <div className="flex flex-wrap gap-2">
          {TRADE_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handlePresetSelect(p)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedPreset === p.id
                  ? "bg-gold-500 text-neutral-950 font-bold shadow-md ring-2 ring-gold-400/40"
                  : "bg-neutral-950 border border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Slider 1: Average Profit per Job */}
        <div className="bg-neutral-950/70 border border-neutral-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
              Average Value / Profit Per Job:
            </label>
            <span className="text-lg font-extrabold text-gold-400 font-mono">
              £{avgJobValue.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={300}
            max={25000}
            step={100}
            value={avgJobValue}
            onChange={(e) => {
              setAvgJobValue(Number(e.target.value));
              setSelectedPreset("custom");
            }}
            className="w-full accent-gold-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-neutral-500 mt-2 font-mono">
            <span>£300</span>
            <span>£10,000</span>
            <span>£25,000+</span>
          </div>
        </div>

        {/* Slider 2: Additional Monthly Jobs Won */}
        <div className="bg-neutral-950/70 border border-neutral-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
              Extra Jobs Won Per Month:
            </label>
            <span className="text-lg font-extrabold text-emerald-400 font-mono">
              +{extraJobsPerMonth} Jobs / mo
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={15}
            step={1}
            value={extraJobsPerMonth}
            onChange={(e) => {
              setExtraJobsPerMonth(Number(e.target.value));
              setSelectedPreset("custom");
            }}
            className="w-full accent-emerald-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-neutral-500 mt-2 font-mono">
            <span>+1 Job</span>
            <span>+7 Jobs</span>
            <span>+15 Jobs</span>
          </div>
        </div>
      </div>

      {/* Output Results Board */}
      <div className="rounded-3xl border-2 border-gold-500/50 bg-gradient-to-br from-gold-500/10 via-neutral-950 to-neutral-950 p-6 md:p-8 shadow-2xl mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          {/* Metric 1 */}
          <div className="border-b sm:border-b-0 sm:border-r border-neutral-800 pb-4 sm:pb-0 sm:pr-4">
            <div className="text-xs font-semibold text-gold-400 uppercase tracking-wider">
              New Annual Revenue
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1 font-mono">
              +£{calculations.annualExtraRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              (£{calculations.monthlyExtraRevenue.toLocaleString()}/month extra turnover)
            </div>
          </div>

          {/* Metric 2 */}
          <div className="border-b sm:border-b-0 sm:border-r border-neutral-800 pb-4 sm:pb-0 sm:pr-4">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Year 1 Net ROI
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-emerald-400 tracking-tight mt-1 font-mono">
              {calculations.roiMultiple}x Return
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              On £{calculations.totalYear1Investment.toLocaleString()} all-inclusive investment
            </div>
          </div>

          {/* Metric 3 */}
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Break-Even Speed
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-amber-300 tracking-tight mt-1 font-mono">
              {calculations.daysToBreakEven} Days
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              Illustrative scenario estimate based on job value
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Disclaimer */}
      <p className="text-[11px] text-neutral-400 leading-relaxed mb-6 border-t border-neutral-800/80 pt-4">
        * <strong>Commercial Disclaimer:</strong> Calculations are strictly illustrative scenario
        models based on your user-supplied project values and contract averages. Harley Digital
        Works does not guarantee rankings, inbound leads, or turnover. All packages are zero-rated
        for VAT (below HMRC registration threshold). Onboarding capacity is capped at 2–3 concurrent
        client builds.
      </p>

      {/* Bottom CTA Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-xs text-neutral-300">
          <ShieldCheck className="h-4 w-4 text-gold-400 shrink-0" />
          <span>
            100% Done-For-You: Copywriting, 14-day turnaround SLA, 50/50 milestone payment, zero
            VAT.
          </span>
        </div>

        <Link
          to="/contact"
          search={{
            package: websiteCost === 2495 ? "expansion" : "launch",
            service: `Website Plan Inquiry (+£${calculations.annualExtraRevenue.toLocaleString()}/yr projection)`,
            domain: undefined,
            websiteUrl: undefined,
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold text-sm px-6 py-3.5 transition-all shadow-lg hover:shadow-gold-500/20"
        >
          <span>Get Your Website Plan</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
