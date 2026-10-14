import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Rocket,
  ShieldCheck,
  TrendingUp,
  FileText,
  ClipboardList,
  Layers,
  BookOpen,
  DollarSign,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "./admin.index";
import {
  CurrentStrategy,
  DeliveryPlaybook,
  StrategySources,
} from "@/components/admin/CurrentStrategy";

export const Route = createFileRoute("/_authenticated/admin/revenue-os")({
  component: RevenueOSPage,
});

function RevenueOSPage() {
  const [activeTab, setActiveTab] = useState<"commercial" | "playbook" | "records">("commercial");

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Strategy & Playbooks"
        subtitle="The governing commercial model, unit economics, delivery playbooks, and Business OS records."
      />

      {/* Operational Knowledge Base Bridge Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-ink/10 bg-amber-50/60 p-4 text-xs shadow-2xs">
        <div className="flex items-center gap-2.5 text-ink">
          <BookOpen size={16} className="text-amber-800 shrink-0" />
          <span>
            <strong className="text-ink">Central Operational Knowledge Base:</strong> Live systems
            architecture, scheduled crons, security policies, and DNS runbooks are maintained in the
            Knowledge Base.
          </span>
        </div>
        <Link
          to="/admin/knowledge-base"
          className="inline-flex items-center gap-1 font-bold text-ink underline hover:text-ink/80 shrink-0"
        >
          <span>Open Knowledge Base</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto border-b border-ink/10 pb-px gap-1">
        {[
          { key: "commercial", label: "Commercial Offer & Economics", icon: DollarSign },
          { key: "playbook", label: "Delivery Playbook (8 Steps)", icon: ClipboardList },
          { key: "records", label: "Governing Business Records", icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                isSelected
                  ? "border-ink text-ink font-bold"
                  : "border-transparent text-ink-muted hover:border-ink/20 hover:text-ink"
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Commercial Offer & Unit Economics */}
      {activeTab === "commercial" && (
        <div className="space-y-6">
          {/* Offer Summary Card */}
          <div className="rounded-2xl bg-ink p-6 sm:p-8 text-white space-y-4 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/80">
                Ratified Commercial Offer · Managed MVP
              </span>
              <span className="text-xs text-white/70">Version 1.0 · October 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Managed Websites & Digital Infrastructure for UK Trades
            </h2>
            <p className="text-sm text-white/85 max-w-3xl leading-relaxed">
              A 100% done-for-you, professional digital presence that establishes local authority,
              captures enquiries reliably, and eliminates digital admin — maintained under
              continuous technical and operational care.
            </p>
            <div className="grid gap-4 sm:grid-cols-3 pt-4 border-t border-white/15">
              <div>
                <span className="text-xs text-white/60 block uppercase font-semibold">
                  Initial Setup Fee
                </span>
                <span className="text-2xl font-black text-white">£1,495</span>
                <span className="text-[11px] text-white/70 block mt-0.5">
                  50% deposit + 50% on preview
                </span>
              </div>
              <div>
                <span className="text-xs text-white/60 block uppercase font-semibold">
                  Ongoing Monthly Care
                </span>
                <span className="text-2xl font-black text-white">£249 / mo</span>
                <span className="text-[11px] text-white/70 block mt-0.5">
                  Rolling 30-day agreement
                </span>
              </div>
              <div>
                <span className="text-xs text-white/60 block uppercase font-semibold">
                  Delivery SLA
                </span>
                <span className="text-2xl font-black text-white">14 Days</span>
                <span className="text-[11px] text-white/70 block mt-0.5">
                  Two revision rounds included
                </span>
              </div>
            </div>
          </div>

          {/* Unit Economics Model */}
          <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-ink">
                  Defensible Economics & Unit Contribution
                </h3>
                <p className="text-xs text-ink-muted">
                  Fully loaded upfront delivery cost and recurring servicing margins based on
                  founder operating model.
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                Instant Day 0 Payback
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-ink/[0.03] text-ink-muted uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Metric / Cost Element</th>
                    <th className="py-2.5 px-3">Base (Expected)</th>
                    <th className="py-2.5 px-3">Margin %</th>
                    <th className="py-2.5 px-3">Operating Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">
                  <tr>
                    <td className="py-3 px-3 font-bold text-ink">Setup Revenue</td>
                    <td className="py-3 px-3 font-semibold text-ink">£1,495.00</td>
                    <td className="py-3 px-3 font-bold text-emerald-700">48.3% Net Margin</td>
                    <td className="py-3 px-3 text-ink-muted">
                      Covers copywriting, scaffolding & revisions
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-ink">Upfront Delivery Cost</td>
                    <td className="py-3 px-3 text-ink">£772.63</td>
                    <td className="py-3 px-3 text-ink-muted">—</td>
                    <td className="py-3 px-3 text-ink-muted">
                      14h labour (£560) + preview overhead + Stripe fees
                    </td>
                  </tr>
                  <tr className="bg-emerald-50/30">
                    <td className="py-3 px-3 font-bold text-emerald-950">
                      Net Upfront Contribution
                    </td>
                    <td className="py-3 px-3 font-black text-emerald-900">+£722.37</td>
                    <td className="py-3 px-3 font-bold text-emerald-800">Day 0 Positive</td>
                    <td className="py-3 px-3 text-emerald-900">
                      Cashflow positive before 1st monthly subscription
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-ink">Monthly Care Revenue</td>
                    <td className="py-3 px-3 font-semibold text-ink">£249.00 / mo</td>
                    <td className="py-3 px-3 font-bold text-emerald-700">73.1% Net Margin</td>
                    <td className="py-3 px-3 text-ink-muted">Auto-debit from go-live date</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-ink">Monthly Servicing Cost</td>
                    <td className="py-3 px-3 text-ink">£66.94 / mo</td>
                    <td className="py-3 px-3 text-ink-muted">—</td>
                    <td className="py-3 px-3 text-ink-muted">
                      Cloudflare/DB (£8) + 1h support (£40) + Stripe (£3.94)
                    </td>
                  </tr>
                  <tr className="bg-emerald-50/30">
                    <td className="py-3 px-3 font-bold text-emerald-950">
                      Monthly Net Contribution
                    </td>
                    <td className="py-3 px-3 font-black text-emerald-900">+£182.06 / mo</td>
                    <td className="py-3 px-3 font-bold text-emerald-800">Recurring</td>
                    <td className="py-3 px-3 text-emerald-900">
                      Highly defensive recurring profit per client
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Operating Boundaries & NHS Constraints */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-ink/10 bg-white p-5 space-y-2">
              <h4 className="text-sm font-bold text-ink flex items-center gap-2">
                <Clock size={16} className="text-blue-700" />
                Capacity & NHS Career Constraint
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                The agency operates alongside founder NHS commitments with 10–12 hours/week
                capacity. By automating 70% of intake, scaffolding, and checks, active touch is 4–5
                hours per build.
              </p>
              <div className="pt-2 text-xs font-bold text-ink">
                Hard Concurrency Cap: Maximum 2 to 3 new client builds concurrently.
              </div>
            </div>

            <div className="rounded-xl border border-ink/10 bg-white p-5 space-y-2">
              <h4 className="text-sm font-bold text-ink flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-700" />
                VAT & Statutory Compliance
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Confirm seller VAT registration and invoice treatment before issuing a quote or
                invoice. Being below the registration threshold does not establish a zero rate.
                Approved package prices remain unchanged; use the verified provider and ledger.
              </p>
              <div className="pt-2 text-xs font-bold text-ink">
                Statutory invoices and accounting reconciliations managed in primary ledger.
              </div>
            </div>
          </div>

          {/* Full Current Strategy Details */}
          <CurrentStrategy />
        </div>
      )}

      {/* Tab 2: Delivery Playbook */}
      {activeTab === "playbook" && (
        <div className="space-y-6">
          <DeliveryPlaybook />
        </div>
      )}

      {/* Tab 3: Business Records */}
      {activeTab === "records" && (
        <div className="space-y-6">
          <StrategySources />
        </div>
      )}
    </div>
  );
}
