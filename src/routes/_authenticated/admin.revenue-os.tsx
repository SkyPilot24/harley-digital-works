import { createFileRoute } from "@tanstack/react-router";
import { CheckSquare, Rocket } from "lucide-react";
import { generateExecutionTasks, priorityScore, rankedRevenueAssets } from "@/lib/revenue-os";
import { PageHeader, StatusBadge } from "./admin.index";

export const Route = createFileRoute("/_authenticated/admin/revenue-os")({
  component: RevenueOsPage,
});

function RevenueOsPage() {
  const assets = rankedRevenueAssets();
  const tasks = generateExecutionTasks();
  const pipeline = assets.reduce((sum, asset) => sum + asset.targetRevenue, 0);
  const mrr = assets.reduce((sum, asset) => sum + asset.mrrPotential, 0);

  return (
    <div>
      <PageHeader
        title="Revenue OS"
        subtitle="Central operating system for revenue assets, recurring income, and daily execution."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Tracked assets" value={assets.length} />
        <Metric label="Pipeline target" value={`£${pipeline.toLocaleString()}`} />
        <Metric label="MRR potential" value={`£${mrr.toLocaleString()}`} />
        <Metric label="Top score" value={`${priorityScore(assets[0].scores)}/35`} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl border border-ink/10 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <Rocket size={18} className="text-ink" />
            <h2 className="text-lg font-semibold text-ink">Highest ROI assets</h2>
          </div>
          <div className="space-y-3">
            {assets.map((asset) => (
              <div key={asset.id} className="rounded-xl border border-ink/10 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-ink">{asset.name}</h3>
                      <StatusBadge status={asset.status.toLowerCase()} />
                    </div>
                    <p className="mt-1 text-sm text-ink-muted">{asset.stream} · Owner: {asset.owner}</p>
                  </div>
                  <div className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
                    Score {priorityScore(asset.scores)}/35
                  </div>
                </div>
                <p className="mt-3 text-sm text-ink/75">{asset.nextAction}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink-muted">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">£{asset.targetRevenue.toLocaleString()} target</span>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">£{asset.mrrPotential.toLocaleString()} MRR</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-ink/10 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <CheckSquare size={18} className="text-ink" />
            <h2 className="text-lg font-semibold text-ink">Generated daily tasks</h2>
          </div>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="rounded-xl bg-ink/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-ink/70">{task.priority}</span>
                  <span className="text-[11px] text-ink-muted">Due in {task.dueInDays}d</span>
                </div>
                <p className="mt-2 text-sm font-medium text-ink">{task.title}</p>
                <p className="mt-1 text-xs text-ink-muted">From: {task.sourceAsset}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-white p-5">
      <div className="text-[12px] uppercase tracking-wider text-ink-muted">{label}</div>
      <div className="mt-3 text-3xl font-semibold text-ink">{value}</div>
    </div>
  );
}
