import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Inbox, Users, Briefcase, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { StrategySummary } from "@/components/admin/CurrentStrategy";
import { currentPriorities } from "@/lib/current-strategy";
export const Route = createFileRoute("/_authenticated/admin/")({ component: DashboardPage });
function DashboardPage() {
  const stats = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const [leads, newLeads, clients, activeClients, projects, inProgress, wonLeads] =
        await Promise.all([
          supabase.from("leads").select("id", { count: "exact", head: true }),
          supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
          supabase.from("clients").select("id", { count: "exact", head: true }),
          supabase
            .from("clients")
            .select("id", { count: "exact", head: true })
            .eq("status", "active"),
          supabase.from("projects").select("id", { count: "exact", head: true }),
          supabase
            .from("projects")
            .select("id", { count: "exact", head: true })
            .eq("status", "in_progress"),
          supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "won"),
        ]);
      for (const result of [
        leads,
        newLeads,
        clients,
        activeClients,
        projects,
        inProgress,
        wonLeads,
      ]) {
        if (result.error) throw result.error;
      }
      return {
        leads: leads.count ?? 0,
        newLeads: newLeads.count ?? 0,
        clients: clients.count ?? 0,
        activeClients: activeClients.count ?? 0,
        projects: projects.count ?? 0,
        inProgress: inProgress.count ?? 0,
        wonLeads: wonLeads.count ?? 0,
      };
    },
  });

  const recent = useQuery({
    queryKey: ["admin", "recent-leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("id, name, email, package, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  const s = stats.data;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Control Centre"
        subtitle="Managed websites, working enquiries and ongoing care for UK trades."
      />
      <StrategySummary />
      <div className="flex flex-wrap gap-3">
        {(
          [
            ["/admin/revenue-os", "Business strategy"],
            ["/admin/leads", "Review enquiries"],
            ["/admin/projects", "Delivery projects"],
            ["/admin/playbooks", "Delivery playbook"],
          ] as const
        ).map(([to, label]) => (
          <Link
            key={to}
            to={to}
            className="rounded-full border border-ink/20 bg-white px-5 py-3 text-sm font-medium text-ink"
          >
            {label}
          </Link>
        ))}
      </div>
      <section className="rounded-xl border border-ink/10 bg-white p-6">
        <h2 className="text-lg font-semibold text-ink">Next priorities</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-ink-muted">
          {currentPriorities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-ink-muted">
          Planning priorities, not completion claims. The master backlog holds progress and
          acceptance evidence.
        </p>
        <Link to="/admin/knowledge-base" className="mt-4 inline-block text-sm underline">
          Open governing business records
        </Link>
      </section>
      <section>
        <h2 className="mb-4 text-lg font-semibold text-ink">Recorded operations</h2>
        <p className="mb-4 text-sm text-ink-muted">
          Live CRM counts. Statuses are manually maintained and do not confirm payment or a live
          subscription.
        </p>
        {stats.isError ? (
          <div role="alert" className="rounded-xl border border-red-200 bg-white p-5">
            Could not load operational counts.{" "}
            <button className="underline" onClick={() => void stats.refetch()}>
              Retry
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={Inbox}
              label="New enquiries"
              value={s?.newLeads ?? "—"}
              sub={s ? s.leads + " total enquiries" : "Loading records…"}
            />
            <StatCard
              icon={Users}
              label="Active client records"
              value={s?.activeClients ?? "—"}
              sub={s ? s.clients + " total client records" : "Loading records…"}
            />
            <StatCard
              icon={Briefcase}
              label="Projects in progress"
              value={s?.inProgress ?? "—"}
              sub={s ? s.projects + " total projects" : "Loading records…"}
            />
            <StatCard
              icon={TrendingUp}
              label="Leads marked won"
              value={s?.wonLeads ?? "—"}
              sub="Recorded status; not payment confirmation"
            />
          </div>
        )}
      </section>
      <section className="rounded-xl border border-ink/10 bg-white p-6">
        <h2 className="text-lg font-semibold text-ink">Collected revenue and subscriptions</h2>
        <p className="mt-3 text-sm leading-6 text-ink-muted">
          Not verified in this dashboard. Use the reconciled billing provider for payment receipts,
          active subscriptions and failed payments.
        </p>
        <Link to="/admin/invoices" className="mt-4 inline-block text-sm underline">
          Billing status
        </Link>
      </section>
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Recent enquiries</h2>
          <Link to="/admin/leads" className="text-sm underline">
            View all
          </Link>
        </div>
        {recent.isPending ? (
          <p role="status">Loading enquiries…</p>
        ) : recent.isError ? (
          <p role="alert">
            Could not load enquiries.{" "}
            <button className="underline" onClick={() => void recent.refetch()}>
              Retry
            </button>
          </p>
        ) : recent.data.length === 0 ? (
          <p className="rounded-xl border border-ink/10 bg-white p-6 text-sm text-ink-muted">
            No enquiries recorded yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-ink/10 bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  {["Name", "Interest", "Status", "Received"].map((label) => (
                    <th key={label} className="px-4 py-3">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.data.map((lead) => (
                  <tr key={lead.id} className="border-t border-ink/10">
                    <td className="px-4 py-3">{lead.name}</td>
                    <td className="px-4 py-3">{lead.package ?? "—"}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-4 py-3">
                      {new Date(lead.created_at).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Inbox;
  label: string;
  value: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-ink/10 bg-white p-5">
      <div className="flex items-center gap-2 text-ink-muted">
        <Icon size={14} />
        <span className="text-[12px] uppercase tracking-wider">{label}</span>
      </div>
      <div className="mt-3 text-3xl font-semibold text-ink">{value}</div>
      {sub && <div className="mt-1 text-xs text-ink-muted">{sub}</div>}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    high: "bg-rose-50 text-rose-700",
    medium: "bg-amber-50 text-amber-700",
    low: "bg-emerald-50 text-emerald-700",
    new: "bg-blue-50 text-blue-700",
    contacted: "bg-amber-50 text-amber-700",
    qualified: "bg-violet-50 text-violet-700",
    won: "bg-emerald-50 text-emerald-700",
    lost: "bg-rose-50 text-rose-700",
    active: "bg-emerald-50 text-emerald-700",
    paused: "bg-amber-50 text-amber-700",
    archived: "bg-neutral-100 text-neutral-600",
    lead: "bg-blue-50 text-blue-700",
    discovery: "bg-blue-50 text-blue-700",
    in_progress: "bg-amber-50 text-amber-700",
    review: "bg-violet-50 text-violet-700",
    launched: "bg-emerald-50 text-emerald-700",
    on_hold: "bg-neutral-100 text-neutral-600",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${map[status] ?? "bg-neutral-100 text-neutral-600"}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
