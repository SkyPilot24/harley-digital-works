import { CheckCircle2, Clock, CircleDot, AlertCircle } from "lucide-react";
import type { MilestoneStage } from "@/lib/project-tracker-data";

interface MilestoneTimelineProps {
  milestones: MilestoneStage[];
  currentDay: number;
  totalDays: number;
}

export function MilestoneTimeline({ milestones, currentDay, totalDays }: MilestoneTimelineProps) {
  const percentage = Math.min(100, Math.round((currentDay / totalDays) * 100));

  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900/80 p-6 md:p-8 backdrop-blur-xl shadow-xl">
      {/* Progress Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">14-Day Delivery Rhythm</span>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-0.5">
            Build Progress: Day {currentDay} of {totalDays}
          </h3>
        </div>
        <div className="sm:text-right">
          <div className="text-2xl font-extrabold text-gold-400">{percentage}% Complete</div>
          <div className="text-xs text-neutral-400">On Track for 14-Day Delivery</div>
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="w-full bg-neutral-950 h-3 rounded-full overflow-hidden border border-neutral-800 mb-8 p-0.5">
        <div
          className="h-full bg-gradient-to-r from-gold-500 to-amber-400 rounded-full transition-all duration-500 shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* 5-Stage Step Flow */}
      <div className="space-y-6">
        {milestones.map((m, idx) => {
          const isCompleted = m.status === "completed";
          const isInProgress = m.status === "in_progress";
          const isPending = m.status === "pending";

          return (
            <div
              key={m.id}
              className={`relative flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                isInProgress
                  ? "border-gold-500/50 bg-gold-500/10 ring-1 ring-gold-500/30 shadow-md"
                  : isCompleted
                    ? "border-neutral-800/80 bg-neutral-950/60"
                    : "border-neutral-900 bg-neutral-950/30 opacity-60"
              }`}
            >
              {/* Status Icon */}
              <div className="mt-0.5 shrink-0">
                {isCompleted && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                )}
                {isInProgress && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/40 animate-pulse">
                    <Clock className="h-5 w-5" />
                  </div>
                )}
                {isPending && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 border border-neutral-700">
                    <CircleDot className="h-4 w-4" />
                  </div>
                )}
              </div>

              {/* Step Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gold-400">{m.dayRange}</span>
                    <span className="text-xs text-neutral-600">•</span>
                    <h4 className="text-sm md:text-base font-bold text-white tracking-tight">{m.title}</h4>
                  </div>
                  {isCompleted && m.completedDate && (
                    <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      Completed {m.completedDate}
                    </span>
                  )}
                  {isInProgress && (
                    <span className="text-[11px] font-bold text-gold-400 bg-gold-500/15 px-2.5 py-0.5 rounded-full border border-gold-500/30">
                      ⚡ Active In Production
                    </span>
                  )}
                </div>

                <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">{m.description}</p>

                {m.actionRequired && (
                  <div className="mt-3 flex items-start gap-2 text-xs text-amber-300 bg-amber-950/40 border border-amber-800/40 p-2.5 rounded-xl">
                    <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                    <span>{m.actionRequired}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
