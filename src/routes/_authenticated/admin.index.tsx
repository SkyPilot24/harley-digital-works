import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Inbox, Users, Briefcase, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: DashboardPage,
});

function DashboardPage() {
  const stats = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const [leads, newLeads, clients, activeClients, projects, inProgress] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("clients").select("id", { count: "exact", head: true }),
        supabase.from("clients").select("id", { count: "exact", head: true }).eq("status", "active"),
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }).eq("status", "in_progress"),
      ]);
      return {
        leads: leads.count ?? 0,
        newLeads: newLeads.count ?? 0,
        clients: clients.count ?? 0,
        activeClients: activeClients.count ?? 0,
        projects: projects.count ?? 0,
        inProgress: inProgress.count ?? 0,
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
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of your agency activity." />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Inbox} label="New leads" value={s?.newLeads ?? "—"} sub={`${s?.leads ?? 0} total`} />
        <StatCard icon={Users} label="Active clients" value={s?.activeClients ?? "—"} sub={`${s?.clients ?? 0} total`} />
        <StatCard icon={Briefcase} label="Projects in progress" value={s?.inProgress ?? "—"} sub={`${s?.projects ?? 0} total`} />
        <StatCard icon={TrendingUp} label="Conversion" value={s ? `${s.leads ? Math.round((s.activeClients / s.leads) * 100) : 0}%` : "—"} sub="leads → clients" />
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-ink">Recent leads</h2>
          <Link to="/admin/leads" className="text-sm font-medium text-ink underline underline-offset-4">
            View all
          </Link>
        </div>
        <div className="overflow-hidden rounded-xl border border-ink/10 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-ink/[0.03] text-left text-[12px] uppercase tracking-wider text-ink-muted">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Package</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Received</th>
              </tr>
            </thead>
            <tbody>
              {recent.data?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-ink-muted">
                    No leads yet. Your Contact form is wired up — submissions will appear here.
                  </td>
                </tr>
              )}
              {recent.data?.map((l) => (
                <tr key={l.id} className="border-t border-ink/5">
                  <td className="px-4 py-3 font-medium text-ink">{l.name}</td>
                  <td className="px-4 py-3 text-ink/70">{l.email}</td>
                  <td className="px-4 py-3 text-ink/70">{l.package ?? "—"}</td>
                  <td className="px-4 py-3"><StatusBadge status={l.status} /></td>
                  <td className="px-4 py-3 text-ink/60">{new Date(l.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
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

function StatCard({ icon: Icon, label, value, sub }: { icon: typeof Inbox; label: string; value: React.ReactNode; sub?: string }) {
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
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${map[status] ?? "bg-neutral-100 text-neutral-600"}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}
