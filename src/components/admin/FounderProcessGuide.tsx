import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Compass,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  Inbox,
  Receipt,
  Users,
  Zap,
  Sparkles,
} from "lucide-react";

interface FounderProcessGuideProps {
  uncontactedCount: number;
  activeBuildsCount: number;
  maxCapacity: number;
  exceptionsCount: number;
  activeClientsCount: number;
}

export function FounderProcessGuide({
  uncontactedCount,
  activeBuildsCount,
  maxCapacity,
  exceptionsCount,
  activeClientsCount,
}: FounderProcessGuideProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber) ? prev.filter((s) => s !== stepNumber) : [...prev, stepNumber],
    );
  };

  const steps = [
    {
      num: 1,
      title: "Check Exceptions & Build Capacity",
      estTime: "1 min",
      rule: `Three customers are approved for the pilot. Keep at most ${maxCapacity} builds active concurrently; agree dates within confirmed capacity.`,
      statusBadge:
        activeBuildsCount >= maxCapacity
          ? {
              text: `🔴 Full (${activeBuildsCount}/${maxCapacity})`,
              style: "bg-rose-100 text-rose-800",
            }
          : {
              text: `🟢 Available (${activeBuildsCount}/${maxCapacity})`,
              style: "bg-emerald-100 text-emerald-800",
            },
      actionLabel: "View Delivery Pipeline",
      actionUrl: "/admin/projects",
      checkDesc:
        "Verify no stuck background jobs and capacity exists before accepting new deposits.",
    },
    {
      num: 2,
      title: "Triage & Qualify Inbound Leads",
      estTime: "2 mins",
      rule: "Focus on established UK trade contractors (2–10 staff, demonstrable work, digital gaps).",
      statusBadge:
        uncontactedCount > 0
          ? { text: `📬 ${uncontactedCount} Awaiting Response`, style: "bg-blue-100 text-blue-800" }
          : { text: "✅ All Contacted", style: "bg-slate-100 text-slate-700" },
      actionLabel: "Review Leads",
      actionUrl: "/admin/leads",
      checkDesc: "Review enquiry brief, mark Contacted or Qualify, and generate one-page proposal.",
    },
    {
      num: 3,
      title: "Review Staged Previews (Quality Gate)",
      estTime: "2 mins",
      rule: "Verify 5 core pages, mobile layout, trade accreditations (NICEIC/Gas Safe), and enquiry form.",
      statusBadge: { text: "Agreed delivery schedule", style: "bg-violet-100 text-violet-800" },
      actionLabel: "Check Active Builds",
      actionUrl: "/admin/projects",
      checkDesc: "Approve preview for DNS cutover, or request structured revisions from template.",
    },
    {
      num: 4,
      title: "Issue Milestone Invoices (50/50 Rule)",
      estTime: "1 min",
      rule: "50% deposit (£747.50) reserves build slot; 50% balance (£747.50) due prior to live DNS cutover.",
      statusBadge: { text: "Strict Cash-In-Advance", style: "bg-amber-100 text-amber-800" },
      actionLabel: "Invoicing Generator",
      actionUrl: "/admin/invoices",
      checkDesc: "Generate payment request text and confirm bank transfer or Stripe receipt.",
    },
    {
      num: 5,
      title: "Handoff to £249/mo Ongoing Digital Care",
      estTime: "1 min",
      rule: "Includes edge hosting, HTTPS, enquiry checks, 30-min monthly edit batch, and quarterly review.",
      statusBadge: {
        text: `${activeClientsCount} Active Care Clients`,
        style: "bg-emerald-100 text-emerald-800",
      },
      actionLabel: "Inspect Care Fleet",
      actionUrl: "/admin/clients",
      checkDesc: "Ensure recurring monthly billing active on rolling 30-day agreement.",
    },
  ];

  return (
    <div className="rounded-2xl border border-ink/15 bg-white p-5 sm:p-6 shadow-xs">
      {/* Header with Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white shadow-xs">
            <Compass size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-ink">
                Founder 5-Minute Daily Operating Flow
              </h2>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800 border border-emerald-200">
                Management by Exception
              </span>
            </div>
            <p className="text-xs text-ink-muted">
              Step-by-step checklist to run daily operations smoothly alongside your NHS schedule.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-ink-muted hidden sm:inline">
            Completed:{" "}
            <strong className="text-ink">
              {completedSteps.length} / {steps.length}
            </strong>
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-ink/5 transition-colors"
          >
            {isOpen ? (
              <>
                <span>Collapse Flow</span>
                <ChevronUp size={14} />
              </>
            ) : (
              <>
                <span>Expand Flow</span>
                <ChevronDown size={14} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Step-by-Step Flow */}
      {isOpen && (
        <div className="mt-5 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => {
              const isChecked = completedSteps.includes(step.num);
              return (
                <div
                  key={step.num}
                  className={`flex flex-col justify-between rounded-xl border p-3.5 transition-all ${
                    isChecked
                      ? "border-emerald-300 bg-emerald-50/50"
                      : "border-ink/10 bg-slate-50/60 hover:border-ink/20 hover:bg-white"
                  }`}
                >
                  <div className="space-y-2">
                    {/* Top Row: Step Number & Time */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => toggleStep(step.num)}
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                            isChecked
                              ? "bg-emerald-600 text-white"
                              : "bg-ink/10 text-ink hover:bg-ink hover:text-white"
                          }`}
                          title={isChecked ? "Mark incomplete" : "Mark step complete for today"}
                        >
                          {isChecked ? <CheckCircle2 size={14} /> : step.num}
                        </button>
                        <span className="text-[11px] font-bold text-ink-muted flex items-center gap-0.5">
                          <Clock size={11} /> {step.estTime}
                        </span>
                      </div>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${step.statusBadge.style}`}
                      >
                        {step.statusBadge.text}
                      </span>
                    </div>

                    {/* Step Title & Details */}
                    <div>
                      <h3
                        className={`text-xs font-bold leading-snug ${
                          isChecked ? "line-through text-ink-muted" : "text-ink"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[11px] text-ink-muted leading-relaxed">
                        {step.checkDesc}
                      </p>
                    </div>

                    {/* Operational Rule */}
                    <div className="rounded-md bg-white/80 p-2 text-[10px] text-ink-muted border border-ink/5">
                      <strong className="text-ink font-semibold">Rule:</strong> {step.rule}
                    </div>
                  </div>

                  {/* Step Action Link */}
                  <div className="mt-3 pt-2 border-t border-ink/5">
                    <Link
                      to={step.actionUrl}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-ink hover:underline"
                    >
                      <span>{step.actionLabel}</span>
                      <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Footer Advice for Robbie */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-ink/5 px-4 py-2.5 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5 text-[11px]">
              <Zap size={13} className="text-amber-600" />
              <strong>Founder Rule:</strong> Do not build custom software or promise rankings.
              Template standardisation protects your delivery time.
            </span>
            <span className="text-[11px]">
              Use the operational views above. Slack command execution needs separate verification.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
