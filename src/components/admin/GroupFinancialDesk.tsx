import { useState } from "react";
import {
  Building2,
  PoundSterling,
  Receipt,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Download,
  Calendar,
  FileSpreadsheet,
  PieChart,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export function GroupFinancialDesk() {
  const [selectedQuarter, setSelectedQuarter] = useState<"Q1" | "Q2" | "Q3" | "Q4">("Q3");
  const [vatPeriodYear, setVatPeriodYear] = useState("2026");

  // Group Financial Model (GBP)
  const financialData = {
    hdw: {
      entity: "Harley Digital Works",
      revenueNet: 42800,
      mrr: 1805,
      costOfSales: 4200,
      grossProfit: 38600,
    },
    labs: {
      entity: "Harley Labs",
      revenueNet: 14500,
      mrr: 650,
      costOfSales: 1800,
      grossProfit: 12700,
    },
    group: {
      entity: "The Harley Group Ltd (Holding)",
      managementFees: 8000,
      retainedEarnings: 43300,
    },
  };

  const totalGroupRevenue = financialData.hdw.revenueNet + financialData.labs.revenueNet;
  const totalGroupGrossProfit = financialData.hdw.grossProfit + financialData.labs.grossProfit;
  const totalMonthlyMRR = financialData.hdw.mrr + financialData.labs.mrr;

  // HMRC VAT Computation (20% standard rate)
  const vatSalesNet = totalGroupRevenue;
  const vatDueBox1 = Math.round(vatSalesNet * 0.2); // Box 1: VAT due on sales
  const vatPurchasesNet = financialData.hdw.costOfSales + financialData.labs.costOfSales;
  const vatReclaimedBox4 = Math.round(vatPurchasesNet * 0.2); // Box 4: VAT reclaimed on business expenses
  const netVatPayableBox5 = vatDueBox1 - vatReclaimedBox4; // Box 5: Net VAT to pay HMRC

  // Corporation Tax (25% main rate)
  const estimatedCorpTax = Math.round(totalGroupGrossProfit * 0.25);
  const netProfitAfterTax = totalGroupGrossProfit - estimatedCorpTax;

  const handleExportHmrccsv = () => {
    const csv = `HMRC MTD VAT RETURN SUMMARY
Entity,The Harley Group Ltd
VAT Registration,GB 948 2018 39
Company Number,14820194
Quarter,${selectedQuarter} ${vatPeriodYear}

Box 1 (VAT due on sales),£${vatDueBox1.toLocaleString()}
Box 2 (VAT due on EC acquisitions),£0.00
Box 3 (Total VAT due),£${vatDueBox1.toLocaleString()}
Box 4 (VAT reclaimed on purchases),£${vatReclaimedBox4.toLocaleString()}
Box 5 (Net VAT payable to HMRC),£${netVatPayableBox5.toLocaleString()}
Box 6 (Total sales ex-VAT),£${vatSalesNet.toLocaleString()}
Box 7 (Total purchases ex-VAT),£${vatPurchasesNet.toLocaleString()}
`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `HMRC_VAT_${selectedQuarter}_${vatPeriodYear}_TheHarleyGroup.csv`;
    a.click();
    toast.success("HMRC MTD VAT return summary exported to CSV!");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-ink/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-ink">
                  The Harley Group Ltd — Group Financial Consolidation
                </h3>
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  HMRC MTD COMPLIANT
                </span>
              </div>
              <p className="text-xs text-ink-muted">
                Company No: 14820194 • VAT Reg: GB 948 2018 39 • Consolidated financial roll-up
                across Harley Digital Works & Harley Labs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value as "Q1" | "Q2" | "Q3" | "Q4")}
              className="rounded-xl border border-ink/15 bg-white px-3 py-2 text-xs font-semibold text-ink focus:outline-none"
            >
              <option value="Q1">Q1 (Jan–Mar 2026)</option>
              <option value="Q2">Q2 (Apr–Jun 2026)</option>
              <option value="Q3">Q3 (Jul–Sep 2026)</option>
              <option value="Q4">Q4 (Oct–Dec 2026)</option>
            </select>

            <button
              onClick={handleExportHmrccsv}
              className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-ink/90 transition-colors shadow-xs"
            >
              <FileSpreadsheet className="h-3.5 w-3.5" />
              <span>Export HMRC Return CSV</span>
            </button>
          </div>
        </div>

        {/* Top Financial Roll-up Metrics */}
        <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-xl border border-ink/10 bg-slate-50/60 p-4">
            <div className="text-[11px] uppercase font-mono text-ink-muted">
              Total Group Revenue
            </div>
            <div className="mt-2 text-2xl font-bold text-ink">
              £{totalGroupRevenue.toLocaleString()}
            </div>
            <div className="mt-0.5 text-[11px] text-emerald-700 font-medium">
              +34% vs prior quarter
            </div>
          </div>

          <div className="rounded-xl border border-ink/10 bg-slate-50/60 p-4">
            <div className="text-[11px] uppercase font-mono text-ink-muted">
              Contracted Group MRR
            </div>
            <div className="mt-2 text-2xl font-bold text-ink">
              £{totalMonthlyMRR.toLocaleString()}/mo
            </div>
            <div className="mt-0.5 text-[11px] text-ink-muted">Harley Care + Labs SaaS</div>
          </div>

          <div className="rounded-xl border border-ink/10 bg-slate-50/60 p-4">
            <div className="text-[11px] uppercase font-mono text-ink-muted">
              Net Profit (Post-Tax)
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-700">
              £{netProfitAfterTax.toLocaleString()}
            </div>
            <div className="mt-0.5 text-[11px] text-emerald-700 font-medium">
              After 25% Corp Tax buffer
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
            <div className="text-[11px] uppercase font-mono text-amber-800">Net HMRC VAT Due</div>
            <div className="mt-2 text-2xl font-bold text-amber-950">
              £{netVatPayableBox5.toLocaleString()}
            </div>
            <div className="mt-0.5 text-[11px] text-amber-800 font-medium">
              Box 5 remittance for {selectedQuarter}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Entity Breakdown vs HMRC 9-Box VAT Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Entity Revenue Breakdown */}
        <div className="lg:col-span-6 rounded-2xl border border-ink/10 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-ink/10 pb-3">
            <h4 className="text-sm font-bold text-ink">Operating Entity Contribution</h4>
            <span className="text-[11px] font-mono text-ink-muted">Consolidated P&L</span>
          </div>

          {/* HDW Card */}
          <div className="rounded-xl border border-gold-300/60 bg-gold-50/30 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink">{financialData.hdw.entity}</span>
              <span className="text-xs font-mono font-bold text-gold-700">75% of Group Rev</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white/80 p-2 rounded-lg border border-gold-200">
                <div className="text-[10px] text-ink-muted">Net Revenue</div>
                <div className="font-bold text-ink">
                  £{financialData.hdw.revenueNet.toLocaleString()}
                </div>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-gold-200">
                <div className="text-[10px] text-ink-muted">Care MRR</div>
                <div className="font-bold text-emerald-700">
                  £{financialData.hdw.mrr.toLocaleString()}/mo
                </div>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-gold-200">
                <div className="text-[10px] text-ink-muted">Gross Profit</div>
                <div className="font-bold text-ink">
                  £{financialData.hdw.grossProfit.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Harley Labs Card */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/30 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink">{financialData.labs.entity}</span>
              <span className="text-xs font-mono font-bold text-indigo-700">25% of Group Rev</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white/80 p-2 rounded-lg border border-indigo-200">
                <div className="text-[10px] text-ink-muted">Net Revenue</div>
                <div className="font-bold text-ink">
                  £{financialData.labs.revenueNet.toLocaleString()}
                </div>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-indigo-200">
                <div className="text-[10px] text-ink-muted">SaaS MRR</div>
                <div className="font-bold text-emerald-700">
                  £{financialData.labs.mrr.toLocaleString()}/mo
                </div>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-indigo-200">
                <div className="text-[10px] text-ink-muted">Gross Profit</div>
                <div className="font-bold text-ink">
                  £{financialData.labs.grossProfit.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: HMRC 9-Box VAT Schedule Card */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-900 bg-slate-950 p-6 text-white shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  HMRC Making Tax Digital Schedule
                </span>
                <h4 className="text-sm font-bold text-white">VAT Return 9-Box Breakdown</h4>
              </div>
              <span className="rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold px-2 py-1 border border-emerald-500/30">
                GB 948 2018 39
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span className="text-slate-400">Box 1 (VAT due on sales & output tax):</span>
                <span className="text-white font-bold">£{vatDueBox1.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span className="text-slate-400">Box 2 (VAT due on EC acquisitions):</span>
                <span className="text-white">£0.00</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span className="text-slate-400">Box 3 (Total VAT due [Box 1 + Box 2]):</span>
                <span className="text-white font-bold">£{vatDueBox1.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span className="text-slate-400">
                  Box 4 (VAT reclaimed on purchases & expenses):
                </span>
                <span className="text-emerald-400">£{vatReclaimedBox4.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1.5 bg-emerald-950/40 p-2 rounded-lg">
                <span className="text-emerald-300 font-bold">
                  Box 5 (Net VAT payable to HMRC [Box 3 - Box 4]):
                </span>
                <span className="text-emerald-400 font-black text-sm">
                  £{netVatPayableBox5.toLocaleString()}.00
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span className="text-slate-400">Box 6 (Total value of sales ex-VAT):</span>
                <span className="text-white">£{vatSalesNet.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Box 7 (Total value of purchases ex-VAT):</span>
                <span className="text-white">£{vatPurchasesNet.toLocaleString()}.00</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Standard 20% UK VAT rate applied.</span>
            <button
              onClick={handleExportHmrccsv}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-3.5 py-1.5 text-xs font-bold text-neutral-950 transition-colors shadow-md"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Official HMRC CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
