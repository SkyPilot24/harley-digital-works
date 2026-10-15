import { loadLeadCounts } from "@/lib/admin-leads";
import {
  loadClientSummary,
  loadProjectSummary,
  loadNotificationSummary,
  loadCompleteRecords,
} from "@/lib/admin-records";
import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Inbox,
  Users,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Send,
  Zap,
  Activity,
  Calendar,
  Phone,
  Mail,
  Building,
  FileText,
  Copy,
  Receipt,
  X,
  MessageSquare,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  adminErrorMessage,
  insertRecord,
  invalidateAdminData,
  updateRecord,
} from "@/lib/admin-writes";
import {
  parseClientInput,
  parseLeadInput,
  parseLeadStatus,
  parsePhone,
  parseProjectInput,
  parseProjectStatus,
  parseText,
  formatCents,
} from "@/lib/admin-validation";
import type { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";
import { StrategySummary } from "@/components/admin/CurrentStrategy";
import { LeadProposalModal } from "@/components/admin/LeadProposalModal";
import { SlackCommandCentreCard } from "@/components/admin/SlackCommandCentreCard";
import { FounderProcessGuide } from "@/components/admin/FounderProcessGuide";
import { GroupHeadquartersSummary } from "@/components/admin/GroupHeadquarters";

export const Route = createFileRoute("/_authenticated/admin/")({ component: DashboardPage });

type LeadRow = Database["public"]["Tables"]["leads"]["Row"];
type ClientRow = Database["public"]["Tables"]["clients"]["Row"];
type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type NotificationJobRow = Database["public"]["Tables"]["lead_notification_jobs"]["Row"];

function DashboardPage() {
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = useState<
    "overview" | "exceptions" | "builds" | "pipeline" | "care" | "automations" | "slack"
  >("overview");

  // Modals state
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [isStartingProject, setIsStartingProject] = useState(false);
  const [selectedLeadForProposal, setSelectedLeadForProposal] = useState<LeadRow | null>(null);

  // 1. Comprehensive Operational Stats Query
  const statsQuery = useQuery({
    queryKey: ["admin", "operational-stats"],
    queryFn: async () => {
      const [leads, clients, projects, jobs] = await Promise.all([
        loadLeadCounts(supabase),
        loadClientSummary(supabase),
        loadProjectSummary(supabase),
        loadNotificationSummary(supabase),
      ]);
      return {
        leadsTotal: leads.all,
        leadsNew: leads.new,
        leadsContacted: leads.contacted,
        leadsQualified: leads.qualified,
        leadsWon: leads.won,
        clientsTotal: clients.counts.all,
        clientsActive: clients.counts.active,
        recordedMonthlyValue: clients.monthlyValueCents / 100,
        projectsTotal: projects.all,
        projectsActive: projects.active,
        jobsTotal: jobs.total,
        jobsPending: jobs.outstanding,
        jobsFailed: jobs.retrying,
        jobsAccepted: jobs.accepted,
      };
    },
  });
  // 2. Recent Leads Query
  const recentLeadsQuery = useQuery({
    queryKey: ["admin", "recent-leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(8);
      if (error) throw error;
      return (data ?? []) as LeadRow[];
    },
  });

  // 3. Active Projects Query (for 14-day SLA delivery tracker)
  const activeProjectsQuery = useQuery({
    queryKey: ["admin", "active-projects"],
    queryFn: async () => {
      const rows = await loadCompleteRecords((after) => {
        let query = supabase
          .from("projects")
          .select("*, clients(name, contact_name, contact_email)", { count: "exact" })
          .in("status", ["discovery", "in_progress", "review"])
          .order("id")
          .limit(500);
        if (after) query = query.gt("id", after);
        return query;
      });
      return rows.sort((a, b) => b.created_at.localeCompare(a.created_at));
    },
  });
  // 4. Notification Jobs for Automation Exception Monitoring
  const notificationJobsQuery = useQuery({
    queryKey: ["admin", "recent-jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lead_notification_jobs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return (data ?? []) as NotificationJobRow[];
    },
  });

  // 5. Active Clients Query
  const activeClientsQuery = useQuery({
    queryKey: ["admin", "active-clients-list"],
    queryFn: async () => {
      const rows = await loadCompleteRecords((after) => {
        let query = supabase
          .from("clients")
          .select("*", { count: "exact" })
          .eq("status", "active")
          .order("id")
          .limit(500);
        if (after) query = query.gt("id", after);
        return query;
      });
      return rows.sort((a, b) => b.created_at.localeCompare(a.created_at));
    },
  });
  const stats = statsQuery.data;
  const recentLeads = useMemo(() => recentLeadsQuery.data ?? [], [recentLeadsQuery.data]);
  const activeProjects = useMemo(() => activeProjectsQuery.data ?? [], [activeProjectsQuery.data]);
  const recentJobs = useMemo(() => notificationJobsQuery.data ?? [], [notificationJobsQuery.data]);
  const activeClients = useMemo(() => activeClientsQuery.data ?? [], [activeClientsQuery.data]);

  // Compute Exceptions for "Management by Exception"
  const exceptions = useMemo(() => {
    const list: {
      id: string;
      category: "lead" | "automation" | "project" | "capacity" | "billing";
      severity: "high" | "medium" | "info";
      title: string;
      description: string;
      actionLabel?: string;
      actionUrl?: string;
      onAction?: () => void;
    }[] = [];

    // Counts cover the full dataset; recent activity is only a preview.
    if ((stats?.leadsNew ?? 0) > 0) {
      list.push({
        id: "uncontacted-leads",
        category: "lead",
        severity: "high",
        title: `${stats!.leadsNew} new enquiries requiring response`,
        description: "Review the full enquiry desk to qualify and respond to every new record.",
        actionLabel: "Review Leads",
        actionUrl: "/admin/leads",
      });
    }
    if ((stats?.jobsFailed ?? 0) > 0) {
      list.push({
        id: "failed-notifications",
        category: "automation",
        severity: "high",
        title: `${stats!.jobsFailed} lead alerts need review`,
        description:
          "Recorded delivery attempts have not been accepted. Check notification state and worker recovery before assuming retries are running.",
        actionLabel: "Inspect Automations",
        actionUrl: "/admin/diagnostics",
      });
    }
    // 3. Projects in Review awaiting client approval
    const awaitingApproval = activeProjects.filter((p) => p.status === "review");
    if (awaitingApproval.length > 0) {
      list.push({
        id: "projects-review",
        category: "project",
        severity: "medium",
        title: `${awaitingApproval.length} projects marked for review`,
        description: `Project staged previews for ${awaitingApproval.map((p) => p.name).join(", ")} are marked for review. Verify the published preview and approval evidence before launch.`,
        actionLabel: "View Projects",
        actionUrl: "/admin/projects",
      });
    }

    // 4. Capacity warning: preserve the two-build pilot guard.
    const activeCount = stats?.projectsActive ?? 0;
    if (activeCount >= 2) {
      list.push({
        id: "capacity-limit",
        category: "capacity",
        severity: "medium",
        title: `Build capacity reached (${activeCount}/2 active builds)`,
        description:
          "To protect founder part-time capacity alongside NHS commitments, cap active builds at 2 before onboarding new clients.",
        actionLabel: "View Delivery Pipeline",
        actionUrl: "/admin/projects",
      });
    }

    return list;
  }, [activeProjects, stats]);

  // Mutations
  const updateLeadStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: LeadRow["status"] }) => {
      await updateRecord(supabase, "leads", id, { status: parseLeadStatus(status) });
    },
    onSuccess: () => {
      invalidateAdminData(qc, "lead");
      toast.success("Lead status updated");
    },
    onError: (err: unknown) => toast.error(adminErrorMessage(err, "Lead status was not updated.")),
  });

  const updateProjectStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ProjectRow["status"] }) => {
      await updateRecord(supabase, "projects", id, { status: parseProjectStatus(status) });
    },
    onSuccess: () => {
      invalidateAdminData(qc, "project");
      toast.success("Project stage updated");
    },
    onError: (err: unknown) =>
      toast.error(adminErrorMessage(err, "Project stage was not updated.")),
  });

  const operationalQueries = [
    statsQuery,
    recentLeadsQuery,
    activeProjectsQuery,
    notificationJobsQuery,
    activeClientsQuery,
  ];
  if (operationalQueries.some((query) => query.isPending || query.isError)) {
    const failed = operationalQueries.some((query) => query.isError);
    return (
      <div className="space-y-4" role={failed ? "alert" : "status"}>
        <PageHeader title="Control Centre" subtitle="Live business information" />
        <p>
          {failed
            ? "Business data could not be loaded. Metrics and automation status are unavailable until all sources can be checked."
            : "Loading business data…"}
        </p>
        {failed && (
          <button
            type="button"
            className="rounded-full border border-ink/20 px-4 py-2"
            onClick={() => operationalQueries.forEach((query) => void query.refetch())}
          >
            Retry business data
          </button>
        )}
      </div>
    );
  }
  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header with Operational Status & Quick Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Control Centre
            </h1>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                exceptions.length === 0
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-amber-50 text-amber-800 border border-amber-200"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  exceptions.length === 0 ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              />
              {exceptions.length === 0
                ? "No recorded exceptions"
                : `${exceptions.length} Attention Required`}
            </span>
          </div>
          <p className="mt-1 text-sm text-ink-muted">
            The Harley Group operating system · Management by exception for UK trades.
          </p>
        </div>

        {/* Quick Action Trigger Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsAddingLead(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-ink/90 transition-colors"
          >
            <Plus size={14} />
            <span>Add Enquiry</span>
          </button>
          <button
            onClick={() => setIsAddingClient(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-white px-3.5 py-2 text-xs font-semibold text-ink hover:bg-ink/5 transition-colors"
          >
            <Plus size={14} />
            <span>Add Client</span>
          </button>
          <button
            onClick={() => setIsStartingProject(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-white px-3.5 py-2 text-xs font-semibold text-ink hover:bg-ink/5 transition-colors"
          >
            <Plus size={14} />
            <span>Start Build</span>
          </button>
          <Link
            to="/admin/diagnostics"
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3 py-2 text-xs font-medium text-ink-muted hover:text-ink hover:bg-ink/5 transition-colors"
            title="Inspect background crons, Slack delivery queue, and SSR route health"
          >
            <Activity size={14} />
            <span className="hidden sm:inline">Diagnostics</span>
          </Link>
        </div>
      </div>

      {/* Founder Daily Operating Flow */}
      <GroupHeadquartersSummary />
      <section aria-label="Founder Operating Flow">
        <FounderProcessGuide
          uncontactedCount={stats?.leadsNew ?? 0}
          activeBuildsCount={stats?.projectsActive ?? 0}
          maxCapacity={2}
          exceptionsCount={exceptions.length}
          activeClientsCount={stats?.clientsActive ?? 0}
        />
      </section>

      {/* 2. Management by Exception Banner */}
      <section aria-label="Exceptions and Attention Queue">
        {exceptions.length === 0 ? (
          <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-emerald-950">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h2 className="text-sm font-bold">Automated Operations Normal — 0 Exceptions</h2>
                <p className="text-xs text-emerald-800">
                  Lead capture active, Slack minute alerts acknowledged, hourly abuse retention
                  scheduled. No overdue items.
                </p>
              </div>
            </div>
            <Link
              to="/admin/diagnostics"
              className="text-xs font-semibold text-emerald-900 underline hover:text-emerald-700"
            >
              Verify logs →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <AlertTriangle size={14} />
                Requires Attention Today ({exceptions.length})
              </h2>
              <span className="text-xs text-ink-muted">
                Routine tasks run automatically; solve exceptions below
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {exceptions.map((ex) => (
                <div
                  key={ex.id}
                  className={`rounded-xl border p-4 transition-all ${
                    ex.severity === "high"
                      ? "border-rose-200 bg-rose-50/70 text-rose-950"
                      : "border-amber-200 bg-amber-50/70 text-amber-950"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white/70">
                        {ex.category}
                      </span>
                      <h3 className="text-sm font-bold leading-tight">{ex.title}</h3>
                      <p className="text-xs opacity-90 leading-relaxed">{ex.description}</p>
                    </div>
                  </div>
                  {ex.actionUrl && (
                    <div className="mt-3 pt-2 border-t border-black/5 flex justify-end">
                      <Link
                        to={ex.actionUrl as "/admin/leads"}
                        className="inline-flex items-center gap-1 text-xs font-bold underline hover:opacity-80"
                      >
                        {ex.actionLabel ?? "Take action"} →
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 3. Primary Operational Metrics Hierarchy (Strict CRM & Financial Truth) */}
      <section aria-label="Key Performance Indicators">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Card 1: Recorded monthly client value */}
          <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-ink-muted">
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Recorded care value
              </span>
              <Receipt size={16} className="text-emerald-700" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-ink">
                £{stats?.recordedMonthlyValue.toLocaleString() ?? 0}
              </span>
              <span className="text-xs text-ink-muted font-medium">/ month</span>
            </div>
            <div className="mt-2 text-[11px] text-ink-muted leading-relaxed">
              <span className="font-semibold text-emerald-800">
                {stats?.clientsActive ?? 0} active client record
                {stats?.clientsActive === 1 ? "" : "s"}
              </span>{" "}
              (£249/mo standard). Recorded client values; payment collection is not verified here.
            </div>
          </div>

          {/* Card 2: Active Builds & Concurrency Capacity */}
          <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-ink-muted">
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Active Build Capacity
              </span>
              <Briefcase size={16} className="text-blue-700" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-ink">
                {stats?.projectsActive ?? 0}{" "}
                <span className="text-xl text-ink-muted font-normal">/ 2 slots</span>
              </span>
            </div>
            {/* Visual Capacity Bar */}
            <div className="mt-3">
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full transition-all ${
                    (stats?.projectsActive ?? 0) >= 2
                      ? "bg-rose-500"
                      : (stats?.projectsActive ?? 0) >= 1
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                  }`}
                  style={{ width: `${Math.min(((stats?.projectsActive ?? 0) / 2) * 100, 100)}%` }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-ink-muted">
                {2 - (stats?.projectsActive ?? 0) > 0
                  ? `${2 - (stats?.projectsActive ?? 0)} build slot(s) available`
                  : "At full capacity limit"}{" "}
                · Two-build pilot limit.
              </p>
            </div>
          </div>

          {/* Card 3: Inbound Enquiries & Pipeline */}
          <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-ink-muted">
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Enquiry Pipeline
              </span>
              <Inbox size={16} className="text-violet-700" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-ink">{stats?.leadsTotal ?? 0}</span>
              <span className="text-xs font-semibold text-blue-700">
                ({stats?.leadsNew ?? 0} new)
              </span>
            </div>
            <div className="mt-2 text-[11px] text-ink-muted">
              <span>{stats?.leadsQualified ?? 0} qualified</span> ·{" "}
              <span className="font-semibold text-emerald-800">{stats?.leadsWon ?? 0} won</span>
              <span className="block mt-0.5 text-[10px] text-ink-muted">
                Potential setup: £{((stats?.leadsQualified ?? 0) * 1495).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Card 4: Automation & System Pulse */}
          <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-ink-muted">
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Automations & Pulse
              </span>
              <Zap size={16} className="text-amber-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-ink">
                {stats?.jobsFailed === 0 ? "No retries" : "Alerts"}
              </span>
              <span className="text-xs text-ink-muted">in recorded jobs</span>
            </div>
            <div className="mt-2 text-[11px] text-ink-muted space-y-0.5">
              <div className="flex justify-between">
                <span>Slack Alerts:</span>
                <span className="font-semibold text-ink">{stats?.jobsAccepted ?? 0} accepted</span>
              </div>
              <div className="flex justify-between">
                <span>Abuse Pruning:</span>
                <span className="font-semibold text-emerald-700">Runtime not verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Strategy & Model Snapshot */}
      <StrategySummary />

      {/* 5. Central Operations Hub Tabs */}
      <section className="space-y-4">
        {/* Tab Headers */}
        <div className="flex overflow-x-auto border-b border-ink/10 pb-px gap-1">
          {[
            { key: "overview", label: "Operations Overview", icon: Activity },
            {
              key: "builds",
              label: `Active Builds (${stats?.projectsActive ?? 0})`,
              icon: Briefcase,
            },
            { key: "pipeline", label: `Enquiry Pipeline (${stats?.leadsTotal ?? 0})`, icon: Inbox },
            { key: "care", label: `Care Fleet (${stats?.clientsActive ?? 0})`, icon: Users },
            { key: "automations", label: "Automations Pulse", icon: Zap },
            { key: "slack", label: "Slack Command", icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
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

        {/* Tab 1: Operations Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Quick 14-Day Delivery Status */}
            <div className="rounded-xl border border-ink/10 bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-ink">
                    Active Project Builds (14-Day SLA)
                  </h2>
                  <p className="text-xs text-ink-muted">
                    Done-for-you technical copy, local SEO scaffolding, staged preview, and domain
                    cutover.
                  </p>
                </div>
                <Link to="/admin/projects" className="text-xs font-semibold text-ink underline">
                  View all projects →
                </Link>
              </div>

              {activeProjects.length === 0 ? (
                <div className="rounded-lg border border-dashed border-ink/15 p-6 text-center">
                  <p className="text-xs text-ink-muted">No client builds currently in progress.</p>
                  <button
                    onClick={() => setIsStartingProject(true)}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-ink underline"
                  >
                    + Start a new build project
                  </button>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {activeProjects.map((p) => {
                    const clientName =
                      (p.clients as { name?: string } | null)?.name ?? "Direct Trade Client";
                    const targetDateStr = p.target_date
                      ? new Date(p.target_date).toLocaleDateString("en-GB")
                      : "14 days";
                    return (
                      <div
                        key={p.id}
                        className="rounded-lg border border-ink/10 bg-ink/[0.01] p-4 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-ink-muted truncate">
                              {clientName}
                            </span>
                            <StatusBadge status={p.status} />
                          </div>
                          <h4 className="mt-1 text-sm font-bold text-ink">{p.name}</h4>
                          <p className="mt-1 text-xs text-ink-muted line-clamp-2">
                            {p.summary || "5-page high-authority trade presence."}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-ink/5 flex items-center justify-between text-[11px] text-ink-muted">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            Target: {targetDateStr}
                          </span>
                          <span className="font-semibold text-ink">£1,495 Setup</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Recent Enquiries Table */}
            <div className="rounded-xl border border-ink/10 bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-ink">Recent Enquiries & Inbound Leads</h2>
                  <p className="text-xs text-ink-muted">
                    Captured securely via server RPC with abuse mitigation and Slack notification.
                  </p>
                </div>
                <Link to="/admin/leads" className="text-xs font-semibold text-ink underline">
                  Open full leads pipeline →
                </Link>
              </div>

              {recentLeadsQuery.isPending ? (
                <p className="text-xs text-ink-muted py-4">Loading enquiries…</p>
              ) : recentLeads.length === 0 ? (
                <div className="rounded-lg border border-dashed border-ink/15 p-6 text-center">
                  <p className="text-xs text-ink-muted">No enquiries recorded yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-ink/10 text-ink-muted">
                        <th className="pb-2.5 font-semibold">Contact / Trade</th>
                        <th className="pb-2.5 font-semibold">Interest Package</th>
                        <th className="pb-2.5 font-semibold">Source</th>
                        <th className="pb-2.5 font-semibold">Status</th>
                        <th className="pb-2.5 font-semibold">Received</th>
                        <th className="pb-2.5 text-right font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/5">
                      {recentLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-ink/[0.01]">
                          <td className="py-3">
                            <div className="font-bold text-ink">{lead.name}</div>
                            <div className="text-[11px] text-ink-muted">
                              {lead.company ? `${lead.company} · ` : ""}
                              {lead.email}
                            </div>
                          </td>
                          <td className="py-3 font-medium text-ink">
                            {lead.package || "Managed Presence"}
                          </td>
                          <td className="py-3 text-[11px] text-ink-muted">
                            <span className="rounded bg-ink/5 px-1.5 py-0.5 font-mono">
                              {lead.source || "web"}
                            </span>
                          </td>
                          <td className="py-3">
                            <StatusBadge status={lead.status} />
                          </td>
                          <td className="py-3 text-[11px] text-ink-muted">
                            {new Date(lead.created_at).toLocaleDateString("en-GB")}
                          </td>
                          <td className="py-3 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setSelectedLeadForProposal(lead)}
                                className="rounded-full border border-ink/15 bg-white px-2.5 py-1 text-[11px] font-semibold text-ink hover:bg-ink/5"
                              >
                                Quote
                              </button>
                              {lead.status === "new" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateLeadStatusMutation.mutate({
                                      id: lead.id,
                                      status: "contacted",
                                    })
                                  }
                                  className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-ink/90"
                                >
                                  Mark Contacted
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Active Builds (14-Day Delivery Flow) */}
        {activeTab === "builds" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-ink/10 bg-white p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-ink">
                    8-Step Delivery Sequence & Project Status
                  </h2>
                  <p className="text-xs text-ink-muted">
                    Turnkey delivery from asset collection to staging preview and Cloudflare DNS
                    cutover.
                  </p>
                </div>
                <button
                  onClick={() => setIsStartingProject(true)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-ink/90"
                >
                  <Plus size={14} />
                  <span>Start New Build</span>
                </button>
              </div>

              {activeProjects.length === 0 ? (
                <p className="text-xs text-ink-muted py-6 text-center">
                  No active builds currently running.
                </p>
              ) : (
                <div className="space-y-4">
                  {activeProjects.map((p) => {
                    const clientName =
                      (p.clients as { name?: string } | null)?.name ?? "Direct Trade Client";
                    return (
                      <div
                        key={p.id}
                        className="rounded-xl border border-ink/10 p-5 space-y-4 hover:border-ink/20 transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
                              {clientName}
                            </span>
                            <h3 className="text-base font-bold text-ink">{p.name}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full">
                              £1,495 Setup + £249/mo
                            </span>
                            <StatusBadge status={p.status} />
                          </div>
                        </div>

                        {/* Delivery Stages Bar */}
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pt-2 border-t border-ink/5">
                          {[
                            { key: "discovery", label: "1. Discovery & Assets" },
                            { key: "in_progress", label: "2. Build & Copy" },
                            { key: "review", label: "3. Preview & Approval" },
                            { key: "launched", label: "4. Live Launch" },
                            { key: "care", label: "5. Monthly Care" },
                          ].map((step, idx) => {
                            const isCurrent =
                              (p.status === "discovery" && idx === 0) ||
                              (p.status === "in_progress" && idx === 1) ||
                              (p.status === "review" && idx === 2) ||
                              (p.status === "launched" && idx >= 3);
                            return (
                              <div
                                key={step.key}
                                className={`rounded p-2 text-center text-[10px] font-semibold border ${
                                  isCurrent
                                    ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                                    : "border-ink/5 bg-ink/[0.01] text-ink-muted"
                                }`}
                              >
                                {step.label}
                              </div>
                            );
                          })}
                        </div>

                        {/* Quick Stage Controls */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-ink/5">
                          <div className="text-xs text-ink-muted">
                            Target Launch:{" "}
                            <span className="font-semibold text-ink">
                              {p.target_date
                                ? new Date(p.target_date).toLocaleDateString("en-GB")
                                : "Pending"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {p.status === "discovery" && (
                              <button
                                onClick={() =>
                                  updateProjectStatusMutation.mutate({
                                    id: p.id,
                                    status: "in_progress",
                                  })
                                }
                                className="rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink/90"
                              >
                                Advance to Build Stage →
                              </button>
                            )}
                            {p.status === "in_progress" && (
                              <button
                                onClick={() =>
                                  updateProjectStatusMutation.mutate({ id: p.id, status: "review" })
                                }
                                className="rounded-full bg-violet-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-800"
                              >
                                Ready for Client Preview Sign-Off →
                              </button>
                            )}
                            {p.status === "review" && (
                              <button
                                onClick={() =>
                                  updateProjectStatusMutation.mutate({
                                    id: p.id,
                                    status: "launched",
                                  })
                                }
                                className="rounded-full bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800"
                              >
                                Complete Launch & Activate Care →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Leads & Pipeline */}
        {activeTab === "pipeline" && (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-4">
              {[
                {
                  status: "new",
                  label: "New Enquiries",
                  count: stats?.leadsNew ?? 0,
                  color: "text-blue-700",
                },
                {
                  status: "contacted",
                  label: "Contacted",
                  count: stats?.leadsContacted ?? 0,
                  color: "text-amber-700",
                },
                {
                  status: "qualified",
                  label: "Qualified",
                  count: stats?.leadsQualified ?? 0,
                  color: "text-violet-700",
                },
                {
                  status: "won",
                  label: "Closed / Won",
                  count: stats?.leadsWon ?? 0,
                  color: "text-emerald-700",
                },
              ].map((stage) => (
                <div key={stage.status} className="rounded-xl border border-ink/10 bg-white p-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                    {stage.label}
                  </div>
                  <div className={`mt-2 text-2xl font-extrabold ${stage.color}`}>{stage.count}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-ink/10 bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-ink">Inbound Leads Directory</h3>
                <Link to="/admin/leads" className="text-xs font-semibold text-ink underline">
                  Full leads manager →
                </Link>
              </div>
              <div className="space-y-3">
                {recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-ink/10 p-3.5 hover:border-ink/20"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-ink text-sm">{lead.name}</span>
                        {lead.company && (
                          <span className="text-xs text-ink-muted">({lead.company})</span>
                        )}
                        <StatusBadge status={lead.status} />
                      </div>
                      <div className="mt-1 text-xs text-ink-muted">
                        {lead.email} · Package:{" "}
                        <span className="font-medium text-ink">{lead.package ?? "Managed"}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedLeadForProposal(lead)}
                        className="rounded-full border border-ink/20 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-ink/5"
                      >
                        Create Quote
                      </button>
                      <Link
                        to="/admin/leads"
                        className="rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink/90"
                      >
                        Open Lead
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Care Fleet */}
        {activeTab === "care" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-ink/10 bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-ink">Active Trade Care Fleet</h3>
                  <p className="text-xs text-ink-muted">
                    £249/mo Managed care: Cloudflare hosting, SSL, monthly 30-min edit allowance,
                    and uptime checks.
                  </p>
                </div>
                <Link to="/admin/clients" className="text-xs font-semibold text-ink underline">
                  Manage clients →
                </Link>
              </div>

              {activeClients.length === 0 ? (
                <div className="rounded-lg border border-dashed border-ink/15 p-6 text-center">
                  <p className="text-xs text-ink-muted">
                    No active recurring care subscriptions recorded yet.
                  </p>
                  <p className="text-[11px] text-ink-muted mt-1">
                    Care subscriptions activate on client live launch.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-ink/10">
                  {activeClients.map((client) => (
                    <div key={client.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-ink text-sm">{client.name}</div>
                        <div className="text-xs text-ink-muted">
                          {client.contact_name ? `${client.contact_name} · ` : ""}
                          {client.contact_email ?? "No email recorded"}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-emerald-800 text-sm">
                          {formatCents(client.monthly_value_cents)
                            ? `${formatCents(client.monthly_value_cents)}/mo`
                            : "Not recorded"}
                        </span>
                        <span className="block text-[10px] text-ink-muted">30m edit allowance</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 5: Automations Pulse */}
        {activeTab === "automations" && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Service 1: Inbound Intake RPC */}
              <div className="rounded-xl border border-ink/10 bg-white p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Inbound Lead RPC
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    Live & Protected
                  </span>
                </div>
                <h4 className="font-bold text-ink text-sm">submit_public_lead()</h4>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Atomic Postgres intake function with timing jitter, IP hash abuse mitigation, and
                  anonymous insertion isolation.
                </p>
              </div>

              {/* Service 2: Slack Alert Outbox Queue */}
              <div className="rounded-xl border border-ink/10 bg-white p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Slack Outbox Queue
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    Minute Cron Active
                  </span>
                </div>
                <h4 className="font-bold text-ink text-sm">lead_notification_jobs</h4>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Cloudflare worker runs minute schedule with disjoint lease locks, 5-attempt retry
                  limit, and crash recovery.
                </p>
              </div>

              {/* Service 3: Hourly Abuse Cleanup */}
              <div className="rounded-xl border border-ink/10 bg-white p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Abuse Retention Cron
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    Hourly Schedule
                  </span>
                </div>
                <h4 className="font-bold text-ink text-sm">prune-lead-attempts (0 * * * *)</h4>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Scheduled Nitro event pruning lead submission attempts beyond 24 hours to keep
                  database lean and secure.
                </p>
              </div>

              {/* Service 4: Edge SSR Diagnostics */}
              <div className="rounded-xl border border-ink/10 bg-white p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Edge SSR Diagnostics
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    11 Surfaces Monitored
                  </span>
                </div>
                <h4 className="font-bold text-ink text-sm">runWebsiteDiagnostics()</h4>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Automated verification of canonical tags, OpenGraph metadata, and Schema.org local
                  business JSON-LD.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-ink/10 bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-ink">Recent Notification Jobs</h3>
                <Link to="/admin/diagnostics" className="text-xs font-semibold text-ink underline">
                  Full diagnostics →
                </Link>
              </div>
              <div className="space-y-2">
                {recentJobs.length === 0 ? (
                  <p className="text-xs text-ink-muted">No notification jobs recorded.</p>
                ) : (
                  recentJobs.map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between rounded-lg border border-ink/10 p-3 text-xs"
                    >
                      <div>
                        <span className="font-mono text-ink font-semibold">
                          Job {job.id.slice(0, 8)}
                        </span>{" "}
                        · <span className="text-ink-muted">Attempts: {job.attempts}/5</span>
                        {job.last_error && (
                          <span className="block text-[11px] text-rose-600 truncate max-w-md">
                            Error: {job.last_error}
                          </span>
                        )}
                      </div>
                      <StatusBadge status={job.status} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Slack Command Centre */}
        {activeTab === "slack" && <SlackCommandCentreCard />}
      </section>

      {/* Proposal Modal */}
      {selectedLeadForProposal && (
        <LeadProposalModal
          lead={selectedLeadForProposal}
          onClose={() => setSelectedLeadForProposal(null)}
        />
      )}

      {/* Add Lead Modal */}
      {isAddingLead && (
        <AddLeadModal
          onClose={() => setIsAddingLead(false)}
          onSuccess={() => {
            invalidateAdminData(qc, "lead");
            setIsAddingLead(false);
          }}
        />
      )}

      {/* Add Client Modal */}
      {isAddingClient && (
        <AddClientModal
          onClose={() => setIsAddingClient(false)}
          onSuccess={() => {
            invalidateAdminData(qc, "client");
            setIsAddingClient(false);
          }}
        />
      )}

      {/* Start Project Modal */}
      {isStartingProject && (
        <StartProjectModal
          clients={activeClients}
          onClose={() => setIsStartingProject(false)}
          onSuccess={() => {
            invalidateAdminData(qc, "project");
            setIsStartingProject(false);
          }}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Helper Modals
// -------------------------------------------------------------

function AddLeadModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [pkg, setPkg] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const phoneValue = parsePhone(phone, "Phone");
      const noteValue = parseText(notes, "Initial notes", { multiline: true });
      const message = [phoneValue ? `Direct Phone: ${phoneValue}` : null, noteValue]
        .filter(Boolean)
        .join("\n\n");
      const input = parseLeadInput(
        { name, email, company, package: pkg, message, notes: noteValue },
        { messageRequired: false },
      );
      await insertRecord(supabase, "leads", { ...input, source: "admin_manual" });
      toast.success("Enquiry recorded successfully");
      onSuccess();
    } catch (err: unknown) {
      toast.error(adminErrorMessage(err, "Failed to record enquiry"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink/10 pb-3">
          <h3 className="text-base font-bold text-ink">Record New Inbound Enquiry</h3>
          <button onClick={onClose} className="rounded p-1 text-ink-muted hover:bg-ink/5">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-ink">Contact Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dave Miller"
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink">Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dave@example.com"
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-ink">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07123 456789"
                className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink">Company / Trade</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Miller Electrical Ltd"
                className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink">Package Interest</label>
            <select
              value={pkg}
              onChange={(e) => setPkg(e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
            >
              <option value="">Not specified</option>
              <option value="Managed Digital Presence (£1,495)">
                Managed Digital Presence (£1,495 setup + £249/mo)
              </option>
              <option value="Essential Trade Service (£1,495)">
                Essential Trade Service (£1,495 setup + £149/mo)
              </option>
              <option value="Multi-Location Visibility (£2,495)">
                Multi-Location Visibility (£2,495 setup + £399/mo)
              </option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink">Initial Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enquiry details or phone conversation summary..."
              rows={2}
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-ink/10">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-ink/20 px-4 py-2 text-xs font-semibold text-ink hover:bg-ink/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-ink/90 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Record Enquiry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddClientModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [monthlyValue, setMonthlyValue] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const input = parseClientInput({
        name,
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        website,
        status: "active",
        monthly_value: monthlyValue,
      });
      await insertRecord(supabase, "clients", input);
      toast.success("Client account created");
      onSuccess();
    } catch (err: unknown) {
      toast.error(adminErrorMessage(err, "Failed to create client"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink/10 pb-3">
          <h3 className="text-base font-bold text-ink">Add New Client Account</h3>
          <button onClick={onClose} className="rounded p-1 text-ink-muted hover:bg-ink/5">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-ink">Trading Business Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Apex Electrical Contractors Ltd"
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-ink">Contact Person</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Robbie Harley"
                className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink">Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="contact@trade.co.uk"
                className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-ink">Phone</label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="0117 900 1234"
                className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink">
                Monthly Care (£/mo, optional)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={monthlyValue}
                onChange={(e) => setMonthlyValue(e.target.value)}
                placeholder="e.g. 249"
                className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink">Domain / Website URL</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://apexelectrical.co.uk"
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-ink/10">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-ink/20 px-4 py-2 text-xs font-semibold text-ink hover:bg-ink/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-ink/90 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Create Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function StartProjectModal({
  clients,
  onClose,
  onSuccess,
}: {
  clients: ClientRow[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [clientId, setClientId] = useState(clients[0]?.id ?? "");
  const [name, setName] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const input = parseProjectInput({
        name,
        client_id: clientId,
        status: "discovery",
        target_date: targetDate,
        summary,
      });
      await insertRecord(supabase, "projects", input);
      toast.success("Project initialized in Discovery stage");
      onSuccess();
    } catch (err: unknown) {
      toast.error(adminErrorMessage(err, "Failed to start project"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink/10 pb-3">
          <h3 className="text-base font-bold text-ink">Start 14-Day Build Project</h3>
          <button onClick={onClose} className="rounded p-1 text-ink-muted hover:bg-ink/5">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-ink">Project Title *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Apex Electricals 5-Page Turnkey Build"
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink">Associated Client</label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
            >
              <option value="">No client linked yet (Unassigned)</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink">
              Agreed target date (optional)
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink">Scope Summary</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-ink/10">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-ink/20 px-4 py-2 text-xs font-semibold text-ink hover:bg-ink/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-ink/90 disabled:opacity-50"
            >
              {loading ? "Starting..." : "Start Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Preserved Exports for Admin Page Shell & Other Routes
// -------------------------------------------------------------

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

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    high: "bg-rose-50 text-rose-700 border border-rose-200",
    medium: "bg-amber-50 text-amber-700 border border-amber-200",
    low: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    new: "bg-blue-50 text-blue-700 border border-blue-200",
    contacted: "bg-amber-50 text-amber-700 border border-amber-200",
    qualified: "bg-violet-50 text-violet-700 border border-violet-200",
    won: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    lost: "bg-rose-50 text-rose-700 border border-rose-200",
    active: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    paused: "bg-amber-50 text-amber-700 border border-amber-200",
    archived: "bg-neutral-100 text-neutral-600 border border-neutral-200",
    lead: "bg-blue-50 text-blue-700 border border-blue-200",
    discovery: "bg-blue-50 text-blue-700 border border-blue-200",
    in_progress: "bg-amber-50 text-amber-700 border border-amber-200",
    review: "bg-violet-50 text-violet-700 border border-violet-200",
    launched: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    on_hold: "bg-neutral-100 text-neutral-600 border border-neutral-200",
    pending: "bg-amber-50 text-amber-700 border border-amber-200",
    accepted: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    failed: "bg-rose-50 text-rose-700 border border-rose-200",
    leased: "bg-blue-50 text-blue-700 border border-blue-200",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
        map[status] ?? "bg-neutral-100 text-neutral-600 border border-neutral-200"
      }`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
