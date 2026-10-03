import { useState, useMemo } from "react";
import type { Database } from "@/integrations/supabase/types";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  FileText,
  CheckCircle2,
  Copy,
  ExternalLink,
  X,
  ShieldCheck,
  Calculator,
  Receipt,
  Sparkles,
} from "lucide-react";

type LeadRow = Database["public"]["Tables"]["leads"]["Row"];

const PACKAGES = {
  launch: { key: "launch", name: "14-Day Launch Website", price: 1495, careMonthly: 95 },
  growth: { key: "growth", name: "Commercial Growth Platform", price: 2995, careMonthly: 195 },
  pro: { key: "pro", name: "Enterprise Digital Product", price: 4995, careMonthly: 295 },
};

const ADDONS = [
  { id: "seo-pack", name: "Local Map-Pack Domination", price: 495 },
  { id: "review-booster", name: "5-Star Review Booster Engine", price: 295 },
  { id: "fleet-pack", name: "Commercial Fleet & Accreditation Pack", price: 395 },
];

export function LeadProposalModal({ lead, onClose }: { lead: LeadRow; onClose: () => void }) {
  const defaultPkgKey = lead.package?.toLowerCase().includes("growth")
    ? "growth"
    : lead.package?.toLowerCase().includes("pro")
      ? "pro"
      : "launch";

  const [selectedPkgKey, setSelectedPkgKey] = useState<keyof typeof PACKAGES>(defaultPkgKey);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["seo-pack"]);

  const currentPkg = PACKAGES[selectedPkgKey];

  const financialCalculations = useMemo(() => {
    let netUpfront = currentPkg.price;
    selectedAddons.forEach((id) => {
      const addon = ADDONS.find((a) => a.id === id);
      if (addon) netUpfront += addon.price;
    });

    const ukVatAmount = Math.round(netUpfront * 0.2 * 100) / 100;
    const grossUpfrontIncVat = Math.round((netUpfront + ukVatAmount) * 100) / 100;
    const depositRequired = Math.round(grossUpfrontIncVat * 0.5 * 100) / 100;
    const balanceOnCompletion = Math.round((grossUpfrontIncVat - depositRequired) * 100) / 100;

    return {
      netUpfront,
      ukVatAmount,
      grossUpfrontIncVat,
      depositRequired,
      balanceOnCompletion,
      monthlyCare: currentPkg.careMonthly,
    };
  }, [currentPkg, selectedAddons]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const clientNameStr = lead.company || lead.name;

  const proposalSummaryText = `
Commercial Proposal Quote — Harley Digital Works
Client: ${clientNameStr} (${lead.email})
Date: ${new Date().toLocaleDateString("en-GB")}

Package Selected: ${currentPkg.name} (£${currentPkg.price.toLocaleString()} Net)
Add-ons Included: ${
    selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(", ") || "None"
  }

Financial Schedule (UK VAT GB 948 2018 39 @ 20%):
- Net Upfront Subtotal: £${financialCalculations.netUpfront.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- UK VAT (20%): £${financialCalculations.ukVatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- Gross Total Inc-VAT: £${financialCalculations.grossUpfrontIncVat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

Payment Milestones:
- 50% Deposit to Reserve Build Slot: £${financialCalculations.depositRequired.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Inc-VAT
- 50% Completion Balance on Live Launch: £${financialCalculations.balanceOnCompletion.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Inc-VAT
- Ongoing Monthly Care & Hosting: £${financialCalculations.monthlyCare}/month

Turnaround Guarantee: 14-Day Delivery SLA
`.trim();

  const handleCopySummary = () => {
    navigator.clipboard.writeText(proposalSummaryText);
    toast.success("Proposal quote summary copied to clipboard!");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="proposal-modal-title"
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-ink/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-gold-500/10 border border-gold-500/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-700">
                Commercial Quote & Proposal Engine
              </span>
            </div>
            <h2 id="proposal-modal-title" className="mt-1 text-xl font-bold text-ink">
              Proposal for {clientNameStr}
            </h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Contact: {lead.email} {lead.company ? `· ${lead.company}` : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-ink/60 hover:bg-ink/5"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {/* Package Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
              Select Build Package
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              {(Object.keys(PACKAGES) as (keyof typeof PACKAGES)[]).map((pkgKey) => {
                const pkg = PACKAGES[pkgKey];
                const isSelected = selectedPkgKey === pkgKey;
                return (
                  <button
                    key={pkgKey}
                    type="button"
                    onClick={() => setSelectedPkgKey(pkgKey)}
                    className={`rounded-xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600"
                        : "border-ink/15 bg-white hover:border-ink/30"
                    }`}
                  >
                    <div className="text-xs font-bold text-ink">{pkg.name}</div>
                    <div className="mt-1 text-sm font-extrabold text-ink">
                      £{pkg.price.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-ink-muted">+ £{pkg.careMonthly}/mo care</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add-ons Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
              Modular Growth Add-ons
            </label>
            <div className="space-y-2">
              {ADDONS.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <label
                    key={addon.id}
                    className={`flex items-center justify-between rounded-lg border p-3 text-xs cursor-pointer transition-colors ${
                      isChecked
                        ? "border-emerald-500 bg-emerald-50/30"
                        : "border-ink/10 bg-white hover:bg-ink/[0.02]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAddon(addon.id)}
                        className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="font-semibold text-ink">{addon.name}</span>
                    </div>
                    <span className="font-bold text-ink">+£{addon.price} Net</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Financial Breakdown Table */}
          <div className="rounded-xl border border-ink/10 bg-ink/[0.02] p-4 text-xs space-y-2.5">
            <div className="flex justify-between font-medium text-ink/80">
              <span>Net Upfront Subtotal:</span>
              <span className="font-semibold text-ink">
                £{financialCalculations.netUpfront.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-ink-muted">
              <span>UK VAT (20% HMRC GB 948 2018 39):</span>
              <span>
                £
                {financialCalculations.ukVatAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="border-t border-ink/10 pt-2 flex justify-between font-bold text-sm text-ink">
              <span>Gross Total (Inc-VAT):</span>
              <span className="text-emerald-700">
                £
                {financialCalculations.grossUpfrontIncVat.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 pt-2 text-[11px]">
              <div className="rounded-lg bg-emerald-100/70 border border-emerald-300/60 p-2.5 text-emerald-950 font-semibold">
                <span>50% Start Deposit: </span>
                <span className="block text-xs font-bold text-emerald-900 mt-0.5">
                  £
                  {financialCalculations.depositRequired.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  Inc-VAT
                </span>
              </div>
              <div className="rounded-lg bg-slate-100 border border-slate-300 p-2.5 text-slate-900 font-semibold">
                <span>50% Launch Balance: </span>
                <span className="block text-xs font-bold text-slate-900 mt-0.5">
                  £
                  {financialCalculations.balanceOnCompletion.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  Inc-VAT
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-4">
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-white px-4 py-2 text-xs font-semibold text-ink hover:bg-ink/5"
            >
              <Copy size={14} />
              <span>Copy Quote Summary</span>
            </button>

            <div className="flex items-center gap-2">
              <Link
                to="/proposals"
                search={{
                  client: clientNameStr,
                  package: selectedPkgKey,
                }}
                target="_blank"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800"
              >
                <ExternalLink size={14} />
                <span>Open Interactive Proposal Desk</span>
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-ink/15 px-4 py-2 text-xs font-medium text-ink hover:bg-ink/5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
