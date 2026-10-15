import { currentStrategy } from "@/lib/current-strategy";
export function CareDeskMonitor({ activeCount }: { activeCount?: number }) {
  return (
    <section className="space-y-4 rounded-xl border border-ink/10 bg-white p-6">
      <h2 className="text-lg font-semibold">Monthly care delivery</h2>
      <p className="text-sm leading-6 text-ink-muted">{currentStrategy.care}</p>
      <p className="text-sm leading-6 text-ink-muted">{currentStrategy.boundaries}</p>
      <p className="text-sm">
        Live monitoring, backup verification and a care request queue are not connected here. Record
        checks and requests in the agreed service record; do not infer uptime or completed work from
        client status.
      </p>
      <p className="text-sm">
        {activeCount === undefined
          ? "Active client count unavailable."
          : `${activeCount} client records marked active.`}{" "}
        Subscription payment status is not verified.
      </p>
    </section>
  );
}
