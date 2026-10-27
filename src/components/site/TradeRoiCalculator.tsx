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
    name: "Boiler & Heating Engineer",
    avgJobValue: 2200,
    typicalMonthlyWins: 3,
    recommendedPackage: "Managed Website (£1,495)",
  },
  {
    id: "roofing",
    name: "Roofer & GRP Specialist",
    avgJobValue: 3500,
    typicalMonthlyWins: 2,
    recommendedPackage: "Managed Website (£1,495)",
  },
  {
    id: "electrical",
    name: "Electrician & Solar Installer",
    avgJobValue: 1200,
    typicalMonthlyWins: 4,
    recommendedPackage: "Managed Website (£1,495)",
  },
  {
    id: "builder",
    name: "Builder & Home Renovations",
    avgJobValue: 18000,
    typicalMonthlyWins: 1,
    recommendedPackage: "Managed Website (£1,495)",
  },
  {
    id: "cleaning",
    name: "Commercial Cleaning & FM",
    avgJobValue: 650,
    typicalMonthlyWins: 6,
    recommendedPackage: "Managed Website (£1,495)",
  },
];

export function TradeRoiCalculator() {
  const [selectedPreset, setSelectedPreset] = useState<string>("heating");
  const [avgJobValue, setAvgJobValue] = useState<number>(2200);
  const [extraJobsPerMonth, setExtraJobsPerMonth] = useState<number>(3);
  const [websiteCost] = useState<number>(1495);

  const handlePresetSelect = (preset: TradePreset) => {
    setSelectedPreset(preset.id);
    setAvgJobValue(preset.avgJobValue);
    setExtraJobsPerMonth(preset.typicalMonthlyWins);
  };

  const calculations = useMemo(() => {
    const monthlyExtraRevenue = avgJobValue * extraJobsPerMonth;
    const annualExtraRevenue = monthlyExtraRevenue * 12;
    const annualCarePlanCost = 249 * 12; // £2,988
    const totalYear1Investment = websiteCost + annualCarePlanCost;
    const netYear1Profit = annualExtraRevenue - totalYear1Investment;
    const daysToBreakEven = Math.max(
      1,
      Math.round(totalYear1Investment / (monthlyExtraRevenue / 30)),
    );

    return {
      monthlyExtraRevenue,
      annualExtraRevenue,
      totalYear1Investment,
      netYear1Profit,
      daysToBreakEven,
    };
  }, [avgJobValue, extraJobsPerMonth, websiteCost]);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#081B30] p-6 md:p-10 backdrop-blur-xl shadow-2xl text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
            <Calculator className="h-4 w-4" />
            <span>Interactive Commercial Estimator</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Illustrative Enquiry Valuation
          </h3>
          <p className="text-xs md:text-sm text-slate-300 mt-1">
            Illustrative economic scenario modeling based on your trade's project turnover.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl self-start md:self-auto">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
          <div className="text-xs text-slate-200">
            Package: <strong className="text-white">£1,495 + £249/mo</strong>
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
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
                  ? "bg-emerald-600 text-white font-bold shadow-md ring-2 ring-emerald-500/40"
                  : "bg-white/5 border border-white/10 text-slate-300 hover:border-white/20 hover:text-white"
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
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <label
              htmlFor="calc-avg-job-value"
              className="text-xs font-bold text-slate-200 uppercase tracking-wider cursor-pointer"
            >
              Average Value / Profit Per Job:
            </label>
            <span className="text-lg font-extrabold text-white font-mono">
              £{avgJobValue.toLocaleString()}
            </span>
          </div>
          <input
            id="calc-avg-job-value"
            type="range"
            min={300}
            max={25000}
            step={100}
            value={avgJobValue}
            aria-label="Average Value or Profit Per Job"
            aria-valuetext={`£${avgJobValue.toLocaleString()}`}
            onChange={(e) => {
              setAvgJobValue(Number(e.target.value));
              setSelectedPreset("custom");
            }}
            className="w-full accent-emerald-500 cursor-pointer h-2 bg-white/10 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono">
            <span>£300</span>
            <span>£10,000</span>
            <span>£25,000+</span>
          </div>
        </div>

        {/* Slider 2: Additional Monthly Jobs Won */}
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <label
              htmlFor="calc-extra-jobs-per-month"
              className="text-xs font-bold text-slate-200 uppercase tracking-wider cursor-pointer"
            >
              Extra Jobs Won Per Month:
            </label>
            <span className="text-lg font-extrabold text-emerald-400 font-mono">
              +{extraJobsPerMonth} Jobs / mo
            </span>
          </div>
          <input
            id="calc-extra-jobs-per-month"
            type="range"
            min={1}
            max={15}
            step={1}
            value={extraJobsPerMonth}
            aria-label="Extra Jobs Won Per Month"
            aria-valuetext={`+${extraJobsPerMonth} jobs per month`}
            onChange={(e) => {
              setExtraJobsPerMonth(Number(e.target.value));
              setSelectedPreset("custom");
            }}
            className="w-full accent-emerald-500 cursor-pointer h-2 bg-white/10 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono">
            <span>+1 Job</span>
            <span>+7 Jobs</span>
            <span>+15 Jobs</span>
          </div>
        </div>
      </div>

      {/* Output Results Board */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-2xl mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          {/* Metric 1 */}
          <div className="border-b sm:border-b-0 sm:border-r border-white/10 pb-4 sm:pb-0 sm:pr-4">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Illustrative Extra Revenue
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1 font-mono">
              +£{calculations.annualExtraRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              (£{calculations.monthlyExtraRevenue.toLocaleString()}/month extra turnover)
            </div>
          </div>

          {/* Metric 2 */}
          <div className="border-b sm:border-b-0 sm:border-r border-white/10 pb-4 sm:pb-0 sm:pr-4">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Illustrative Net Margin
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-emerald-400 tracking-tight mt-1 font-mono">
              +£{calculations.netYear1Profit.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              After £{calculations.totalYear1Investment.toLocaleString()} all-inclusive investment
            </div>
          </div>

          {/* Metric 3 */}
          <div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Break-Even Speed
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1 font-mono">
              {calculations.daysToBreakEven} Days
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Illustrative scenario estimate based on job value
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Disclaimer */}
      <p className="text-[11px] text-slate-400 leading-relaxed mb-6 border-t border-white/10 pt-4">
        * <strong>Commercial Disclaimer:</strong> Calculations are strictly illustrative scenario
        models based on your user-supplied project values and contract averages. Harley Digital
        Works does not forecast or promise enquiries, leads, or turnover. Capacity is strictly
        limited to up to 2 concurrent client builds.
      </p>

      {/* Bottom CTA Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>Copywriting included, agreed delivery schedule, 50/50 milestone payment.</span>
        </div>

        <Link
          to="/contact"
          search={{
            package: "managed",
            service: `Website Plan Inquiry (+£${calculations.annualExtraRevenue.toLocaleString()}/yr projection)`,
            domain: undefined,
            websiteUrl: undefined,
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3.5 transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
        >
          <span>Get Your Website Plan</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
