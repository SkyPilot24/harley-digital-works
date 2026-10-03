import {
  currentStrategy,
  currentPriorities,
  strategyRecords,
  deliverySteps,
  tradeVerticalPlaybooks,
  conversionToolPlaybooks,
} from "@/lib/current-strategy";

export function StrategySummary() {
  return (
    <section className="rounded-2xl bg-ink p-6 text-white">
      <p className="text-xs uppercase tracking-widest text-white/70">Current business direction</p>
      <h2 className="mt-3 text-2xl font-semibold">{currentStrategy.title}</h2>
      <p className="mt-3 text-white/85">{currentStrategy.model}</p>
      <p className="mt-5 border-t border-white/20 pt-5 font-medium">{currentStrategy.milestone}</p>
    </section>
  );
}

export function CurrentStrategy() {
  return (
    <div className="space-y-6">
      <StrategySummary />
      <div className="grid gap-6 lg:grid-cols-2">
        <StrategyCard title="Who we serve">
          <p>{currentStrategy.audience}</p>
          <p>{currentStrategy.pilot}</p>
        </StrategyCard>
        <StrategyCard title="One offer, subject to approval">
          <p>{currentStrategy.offer}</p>
          <p>{currentStrategy.approval}</p>
        </StrategyCard>
        <StrategyCard title="Initial build">
          <p>{currentStrategy.build}</p>
        </StrategyCard>
        <StrategyCard title="Ongoing care">
          <p>{currentStrategy.care}</p>
          <p>{currentStrategy.boundaries}</p>
        </StrategyCard>
      </div>
      <StrategyCard title="Execution priorities">
        <ol className="list-decimal space-y-3 pl-5">
          {currentPriorities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <p>
          These are planning priorities, not completed tasks. Record progress and acceptance
          evidence in the master backlog.
        </p>
      </StrategyCard>
      <StrategyCard title="Acquisition and capacity">
        <p>
          Start with inbound, referrals and evidence-backed research. Contact eligibility,
          suppression checks, reviewed drafts and explicit sending authorisation precede any
          campaign. No campaign or automation is enabled by this dashboard.
        </p>
        <p>
          One proposed workflow orchestrator and hosted billing are enough for the pilot. Track
          build and support labour before expanding. Keep business systems, data and time separate
          from NHS work.
        </p>
      </StrategyCard>
      <StrategyCard title="Measures that matter">
        <p>
          Verified paying customers, collected revenue, actual subscriptions, cancellations, failed
          payments, acquisition cost including labour, delivery time, support time and contribution.
        </p>
        <p>
          CRM status and manually recorded monthly values are operational records. They are not
          verified payments. No revenue target is presented as an actual result.
        </p>
      </StrategyCard>
    </div>
  );
}

export function DeliveryPlaybook() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-ink">8-Step Turnaround Delivery Sequence</h3>
        {deliverySteps.map((step, index) => (
          <StrategyCard key={step.title} title={`${index + 1}. ${step.title}`}>
            <p>{step.detail}</p>
          </StrategyCard>
        ))}
      </div>

      <div className="space-y-4 pt-6 border-t border-ink/10">
        <h3 className="text-xl font-bold text-ink">Trade Vertical Execution Playbooks</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {tradeVerticalPlaybooks.map((tv) => (
            <div key={tv.name} className="rounded-xl border border-ink/10 bg-white p-5 space-y-2">
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-800 uppercase tracking-wider">
                {tv.badge}
              </span>
              <h4 className="font-semibold text-ink text-base pt-1">{tv.name}</h4>
              <p className="text-xs font-mono font-medium text-ink-muted">
                Avg Value: {tv.avgJobValue}
              </p>
              <p className="text-xs text-ink-muted leading-relaxed">{tv.keyFeatures}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t border-ink/10">
        <h3 className="text-xl font-bold text-ink">Interactive Lead Conversion Tools Playbook</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {conversionToolPlaybooks.map((ct) => (
            <div key={ct.name} className="rounded-xl border border-ink/10 bg-white p-5 space-y-2">
              <h4 className="font-semibold text-ink text-sm">{ct.name}</h4>
              <p className="text-xs font-mono text-emerald-700">{ct.route}</p>
              <p className="text-xs text-ink-muted leading-relaxed">{ct.purpose}</p>
              <p className="text-xs font-medium text-ink/80 pt-2 border-t border-ink/5">
                Path: {ct.conversionPath}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StrategySources() {
  return (
    <section className="space-y-4">
      <p className="text-sm text-ink-muted">
        Governing Business OS records. Dashboard summary updated October 2026; changes in Drive do
        not automatically update this page.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {strategyRecords.map((record) => (
          <a
            key={record.id}
            href={`https://drive.google.com/file/d/${record.id}/view`}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-ink/10 bg-white p-5 hover:border-ink/30"
          >
            <h2 className="font-semibold text-ink">{record.title} ↗</h2>
            <p className="mt-2 text-sm text-ink-muted">{record.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function StrategyCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-ink/10 bg-white p-6">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-6 text-ink-muted">{children}</div>
    </section>
  );
}
