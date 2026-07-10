import { createFileRoute } from "@tanstack/react-router";
import { domainBundles, formatGbp, getDomainBuyNowPrice, rankedDomains } from "@/lib/domain-portfolio";
import { PageHeader } from "./admin.index";

export const Route = createFileRoute("/_authenticated/admin/domain-os")({
  component: DomainOsPage,
});

const priorityStyles = {
  High: "bg-emerald-50 text-emerald-700",
  Medium: "bg-blue-50 text-blue-700",
  Low: "bg-ink/10 text-ink/70",
};

function DomainOsPage() {
  const domains = rankedDomains();
  const highPriority = domains.filter((domain) => domain.priority === "High");
  const mediumPriority = domains.filter((domain) => domain.priority === "Medium");
  const lowPriority = domains.filter((domain) => domain.priority === "Low");

  return (
    <div>
      <PageHeader
        title="Domain OS"
        subtitle="A simple sales dashboard for owned domains: valuation, buy-now price, buyer, use case, next outreach step, and caution notes."
      />

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <Metric label="High priority" value={highPriority.length} note="Actively sell first" />
        <Metric label="Medium priority" value={mediumPriority.length} note="Bundle or targeted outreach" />
        <Metric label="Low priority" value={lowPriority.length} note="Passive listing or renewal review" />
      </section>

      <section className="mt-8 rounded-2xl border border-ink/10 bg-white p-6">
        <h2 className="text-lg font-semibold text-ink">Daily domain sale runbook</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {[
            ["Pick", "Choose one High or Medium priority domain."],
            ["Research", "Use Manus to find 10 likely buyers."],
            ["Write", "Use ChatGPT to draft a short buyer-specific email."],
            ["List", "Check Afternic, Sedo, Dan, or registrar marketplace pricing."],
            ["Track", "Record buyer, date, reply, and next follow-up in Revenue OS."],
          ].map(([title, body], index) => (
            <div key={title} className="rounded-xl bg-ink/[0.03] p-4">
              <div className="font-mono text-[11px] text-ink-muted">STEP {index + 1}</div>
              <h3 className="mt-1 font-semibold text-ink">{title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="mt-8 rounded-2xl border border-ink/10 bg-surface-sage p-6">
        <h2 className="text-lg font-semibold text-ink">After-payment handover checklist</h2>
        <p className="mt-1 text-sm text-ink-muted">Use this every time Stripe confirms a domain payment.</p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            "Payment received in Stripe",
            "Buyer email confirmed",
            "Registrar account or transfer destination confirmed",
            "Domain unlocked at registrar",
            "Auth code sent or transfer started",
            "Transfer complete and buyer notified",
          ].map((item, index) => (
            <div key={item} className="flex gap-3 rounded-xl bg-white/70 p-4 text-sm text-ink/80">
              <span className="font-mono text-[11px] text-ink-muted">{String(index + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {domains.map((domain) => {
          const buyNowPrice = getDomainBuyNowPrice(domain.name);
          return (
            <article key={domain.name} className="rounded-2xl border border-ink/10 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-mono text-lg font-semibold text-ink">{domain.name}</h2>
                  <p className="mt-1 text-sm text-ink-muted">{domain.category}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${priorityStyles[domain.priority]}`}>
                  {domain.priority}
                </span>
              </div>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <Info label="Valuation range" value={domain.suggestedAsk} />
                <Info label="Buy now price" value={formatGbp(buyNowPrice)} />
              </div>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <Info label="Quick sale floor" value={domain.quickSale} />
                <Info label="Checkout status" value={buyNowPrice ? "Stripe buy-now enabled" : "Manual enquiry only"} />
              </div>
              <Info className="mt-4" label="Target buyer" value={domain.targetBuyer} />
              <Info className="mt-4" label="Use case" value={domain.useCase} />
              <div className="mt-4 rounded-xl bg-surface-sage p-4 text-sm text-ink/80">
                <span className="font-semibold text-ink">Next action:</span> {domain.nextAction}
              </div>
              {domain.caution && <div className="mt-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">Caution: {domain.caution}</div>}
            </article>
          );
        })}
      </section>

      <section className="mt-8 rounded-2xl border border-ink/10 bg-white p-6">
        <h2 className="text-lg font-semibold text-ink">Bundle plays</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {domainBundles.map((bundle) => (
            <article key={bundle.name} className="rounded-xl bg-ink/[0.03] p-4">
              <h3 className="font-semibold text-ink">{bundle.name}</h3>
              <p className="mt-2 text-sm text-ink-muted">{bundle.domains.join(", ")}</p>
              <p className="mt-3 text-sm text-ink/80">{bundle.action}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value, note }: { label: string; value: number; note: string }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5">
      <div className="text-[12px] uppercase tracking-wider text-ink-muted">{label}</div>
      <div className="mt-3 text-3xl font-semibold text-ink">{value}</div>
      <p className="mt-2 text-sm text-ink-muted">{note}</p>
    </div>
  );
}

function Info({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <div className="text-[12px] uppercase tracking-wider text-ink-muted">{label}</div>
      <p className="mt-1 text-sm leading-relaxed text-ink">{value}</p>
    </div>
  );
}

