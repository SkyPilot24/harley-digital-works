import {
  loadClientPage,
  loadClientSummary,
  loadProjectSummary,
  loadCompleteRecords,
  type ClientFilter,
} from "@/lib/admin-records";
import { AdminPagination } from "@/components/admin/AdminPagination";
import {
  adminErrorMessage,
  deleteRecord,
  insertRecord,
  invalidateAdminData,
  updateRecord,
} from "@/lib/admin-writes";
import {
  AdminValidationError,
  MAX_CENTS,
  centsToPoundsInput,
  formatCents,
  parseClientInput,
  parseProjectInput,
} from "@/lib/admin-validation";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";
import {
  Users,
  Briefcase,
  TrendingUp,
  Plus,
  Pencil,
  Trash2,
  X,
  ExternalLink,
  Mail,
  Phone,
  Globe,
  Layers,
  Calendar,
  Sparkles,
  Search,
  CheckCircle2,
  Receipt,
  FileText,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { PageHeader, StatusBadge } from "./admin.index";
import { ClientInvoiceModal } from "@/components/admin/ClientInvoiceModal";
import { ClientMonthlyReportModal } from "@/components/admin/ClientMonthlyReportModal";
import { CareDeskMonitor } from "@/components/admin/CareDeskMonitor";

type ClientRow = Database["public"]["Tables"]["clients"]["Row"];
type ClientStatus = Database["public"]["Enums"]["client_status"];
type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type ProjectStatus = Database["public"]["Enums"]["project_status"];

export const Route = createFileRoute("/_authenticated/admin/clients")({
  component: ClientsPage,
});

function ClientsPage() {
  const qc = useQueryClient();
  const [clientViewMode, setClientViewMode] = useState<"clients" | "caredesk">("clients");
  const [activeTab, setActiveTab] = useState<ClientFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [client360, setClient360] = useState<ClientRow | null>(null);
  const [editingClient, setEditingClient] = useState<Partial<ClientRow> | null>(null);
  const [invoicingClient, setInvoicingClient] = useState<ClientRow | null>(null);
  const [reportingClient, setReportingClient] = useState<ClientRow | null>(null);
  const [isCreatingClient, setIsCreatingClient] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // Queries
  const clientsQuery = useQuery({
    queryKey: ["clients", "page", activeTab, searchTerm, page],
    queryFn: ({ signal }) =>
      loadClientPage(supabase, { page, status: activeTab, search: searchTerm, signal }),
  });
  const clientSummaryQuery = useQuery({
    queryKey: ["clients", "summary"],
    queryFn: () => loadClientSummary(supabase),
  });
  const projectSummaryQuery = useQuery({
    queryKey: ["projects", "summary"],
    queryFn: () => loadProjectSummary(supabase),
  });
  const visibleClientIds = clientsQuery.data?.rows.map((row) => row.id) ?? [];
  const allProjectsQuery = useQuery({
    queryKey: ["projects", "client-links", visibleClientIds.join(",")],
    enabled: visibleClientIds.length > 0,
    queryFn: () =>
      loadCompleteRecords((after) => {
        let query = supabase
          .from("projects")
          .select("id,client_id,status", { count: "exact" })
          .in("client_id", visibleClientIds)
          .order("id")
          .limit(500);
        if (after) query = query.gt("id", after);
        return query;
      }),
  });
  const clientProjectsQuery = useQuery({
    queryKey: ["projects", "client", client360?.id],
    enabled: !!client360,
    queryFn: () =>
      loadCompleteRecords((after) => {
        let query = supabase
          .from("projects")
          .select("*", { count: "exact" })
          .eq("client_id", client360!.id)
          .order("id")
          .limit(500);
        if (after) query = query.gt("id", after);
        return query;
      }),
  });
  // Client Mutations
  const saveClientMutation = useMutation({
    mutationFn: async (
      payload: Record<string, unknown> & { id?: string; quickMonthlyCents?: number },
    ) => {
      if (payload.id && payload.quickMonthlyCents !== undefined) {
        const cents = payload.quickMonthlyCents;
        if (!Number.isSafeInteger(cents) || cents < 0 || cents > MAX_CENTS)
          throw new AdminValidationError("Monthly care value is invalid");
        return updateRecord(supabase, "clients", payload.id, { monthly_value_cents: cents });
      }
      const input = parseClientInput(payload);
      if (payload.id) return updateRecord(supabase, "clients", payload.id, input);
      return insertRecord(supabase, "clients", input);
    },
    onSuccess: (saved) => {
      setClient360((current) => (current?.id === saved.id ? saved : current));
      invalidateAdminData(qc, "client");
      setEditingClient(null);
      setIsCreatingClient(false);
      toast.success("Client saved");
    },
    onError: (err: unknown) =>
      toast.error(adminErrorMessage(err, "The client could not be saved.")),
  });

  const deleteClientMutation = useMutation({
    mutationFn: (id: string) => deleteRecord(supabase, "clients", id),
    onSuccess: (_result, id) => {
      invalidateAdminData(qc, "client");
      setClient360((current) => (current?.id === id ? null : current));
      setPage(0);
      toast.success("Client deleted");
    },
    onError: (err: unknown) =>
      toast.error(adminErrorMessage(err, "The client could not be deleted.")),
  });

  // Project Mutation (for Client 360 Workspace)
  const createProjectMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      insertRecord(supabase, "projects", parseProjectInput(payload)),
    onSuccess: () => {
      invalidateAdminData(qc, "project");
      setIsAddingProject(false);
      toast.success("Project attached to client successfully");
    },
    onError: (err: unknown) =>
      toast.error(adminErrorMessage(err, "The project could not be created.")),
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id: string) => deleteRecord(supabase, "projects", id),
    onSuccess: () => {
      invalidateAdminData(qc, "project");
      toast.success("Project deleted");
    },
    onError: (err: unknown) =>
      toast.error(adminErrorMessage(err, "The project could not be deleted.")),
  });

  const clients = clientsQuery.isSuccess ? clientsQuery.data.rows : [];
  const allProjects = allProjectsQuery.isSuccess ? allProjectsQuery.data : [];
  const summary = clientSummaryQuery.isSuccess ? clientSummaryQuery.data : undefined;
  const counts = summary?.counts;
  const projectCounts = projectSummaryQuery.isSuccess ? projectSummaryQuery.data : undefined;
  const activeClientCount = counts?.active ?? 0;
  const totalMRR = formatCents(summary?.monthlyValueCents ?? 0)!;
  const averageMRR = formatCents(
    activeClientCount > 0 ? Math.round((summary?.monthlyValueCents ?? 0) / activeClientCount) : 0,
  )!;
  const filteredClients = clients;
  const clientProjects = clientProjectsQuery.isSuccess ? clientProjectsQuery.data : [];
  return (
    <div>
      <PageHeader
        title={clientViewMode === "clients" ? "Client 360 & Accounts" : "Care delivery"}
        subtitle={
          clientViewMode === "clients"
            ? "Manage client records, website delivery and manually recorded monthly agreement values."
            : "Track agreed monthly care. Monitoring and support metrics require verified provider evidence."
        }
        action={
          clientViewMode === "clients" ? (
            <button
              onClick={() => {
                setEditingClient({ status: "lead", monthly_value_cents: 0 });
                setIsCreatingClient(true);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90"
            >
              <Plus size={16} /> New Client
            </button>
          ) : undefined
        }
      />

      {[
        { query: clientSummaryQuery, label: "Client totals" },
        { query: projectSummaryQuery, label: "Project totals" },
        { query: allProjectsQuery, label: "Linked project counts" },
      ].map(
        ({ query, label }) =>
          query.isError && (
            <p key={label} role="alert" className="mt-4">
              {label} are unavailable.{" "}
              <button type="button" className="underline" onClick={() => void query.refetch()}>
                Retry {label.toLowerCase()}
              </button>
            </p>
          ),
      )}
      {/* Module Switcher Tabs */}
      <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-ink/10 pb-4">
        <button
          onClick={() => setClientViewMode("clients")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
            clientViewMode === "clients"
              ? "bg-ink text-white shadow-sm"
              : "border border-ink/10 bg-white text-ink/70 hover:bg-ink/[0.04]"
          }`}
        >
          <Users size={15} />
          <span>Client Roster & Projects</span>
          <span
            className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-mono font-medium ${
              clientViewMode === "clients" ? "bg-white/20 text-white" : "bg-ink/10 text-ink"
            }`}
          >
            {counts?.all ?? "—"}
          </span>
        </button>

        <button
          onClick={() => setClientViewMode("caredesk")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
            clientViewMode === "caredesk"
              ? "bg-ink text-white shadow-sm"
              : "border border-ink/10 bg-white text-ink/70 hover:bg-ink/[0.04]"
          }`}
        >
          <ShieldCheck
            size={15}
            className={clientViewMode === "caredesk" ? "text-emerald-300" : "text-emerald-600"}
          />
          <span>Care delivery</span>
          <span className="ml-1 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            MANUAL REVIEW
          </span>
        </button>
      </div>

      {clientViewMode === "caredesk" && (
        <div className="mt-6">
          <CareDeskMonitor activeCount={counts?.active} />
        </div>
      )}

      {clientViewMode === "clients" && (
        <>
          {/* Metrics Bar */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-ink/10 bg-white p-5">
              <div className="flex items-center gap-2 text-ink-muted">
                <Users size={14} />
                <span className="text-[12px] uppercase tracking-wider">Active Clients</span>
              </div>
              <div className="mt-3 text-3xl font-semibold text-ink">
                {clientSummaryQuery.isPending ? (
                  <div className="h-9 w-16 rounded bg-ink/10 animate-pulse my-1" />
                ) : clientSummaryQuery.isSuccess ? (
                  activeClientCount
                ) : (
                  "—"
                )}
              </div>
              <div className="mt-1 text-xs text-ink-muted">
                {counts?.all ?? "—"} total across all statuses
              </div>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
              <div className="flex items-center gap-2 text-emerald-700">
                <TrendingUp size={14} />
                <span className="text-[12px] uppercase tracking-wider font-semibold">
                  Recorded active monthly value
                </span>
              </div>
              <div className="mt-3 text-3xl font-semibold text-emerald-900">
                {clientSummaryQuery.isPending ? (
                  <div className="h-9 w-28 rounded bg-emerald-200/50 animate-pulse my-1" />
                ) : clientSummaryQuery.isSuccess ? (
                  <>
                    {totalMRR}
                    <span className="text-sm font-normal text-emerald-700">/mo</span>
                  </>
                ) : (
                  "—"
                )}
              </div>
              <div className="mt-1 text-xs text-emerald-700">
                Manually recorded; not verified collected revenue
              </div>
            </div>

            <div className="rounded-xl border border-ink/10 bg-white p-5">
              <div className="flex items-center gap-2 text-blue-700">
                <Briefcase size={14} />
                <span className="text-[12px] uppercase tracking-wider font-semibold">
                  In-Flight Projects
                </span>
              </div>
              <div className="mt-3 text-3xl font-semibold text-ink">
                {projectSummaryQuery.isPending ? (
                  <div className="h-9 w-16 rounded bg-ink/10 animate-pulse my-1" />
                ) : (
                  projectCounts?.active ?? "—"
                )}
              </div>
              <div className="mt-1 text-xs text-ink-muted">
                {projectCounts?.all ?? "—"} total projects
              </div>
            </div>

            <div className="rounded-xl border border-ink/10 bg-white p-5">
              <div className="flex items-center gap-2 text-violet-700">
                <Sparkles size={14} />
                <span className="text-[12px] uppercase tracking-wider font-semibold">
                  Average recorded monthly value
                </span>
              </div>
              <div className="mt-3 text-3xl font-semibold text-ink">
                {clientSummaryQuery.isPending ? (
                  <div className="h-9 w-24 rounded bg-ink/10 animate-pulse my-1" />
                ) : clientSummaryQuery.isSuccess ? (
                  <>
                    {averageMRR}
                    <span className="text-sm font-normal text-ink-muted">/mo</span>
                  </>
                ) : (
                  "—"
                )}
              </div>
              <div className="mt-1 text-xs text-ink-muted">Per active client account</div>
            </div>
          </div>

          {(clientSummaryQuery.isError || projectSummaryQuery.isError) && (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-950 flex items-center justify-between gap-3"
            >
              <span>Client and project summary totals could not be loaded from Supabase.</span>
              <button
                type="button"
                className="rounded-full border border-rose-300 bg-white px-3 py-1 font-bold text-rose-900 hover:bg-rose-100 transition-colors"
                onClick={() => {
                  void clientSummaryQuery.refetch();
                  void projectSummaryQuery.refetch();
                }}
              >
                Retry Totals
              </button>
            </div>
          )}

          {/* Filters & Search */}
          <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All Clients", count: counts?.all ?? "—" },
                { id: "active", label: "Active", count: counts?.active ?? "—" },
                {
                  id: "lead",
                  label: "Prospective / Lead",
                  count: counts?.lead ?? "—",
                },
                {
                  id: "paused",
                  label: "Paused",
                  count: counts?.paused ?? "—",
                },
                {
                  id: "archived",
                  label: "Archived",
                  count: counts?.archived ?? "—",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as ClientFilter);
                    setPage(0);
                  }}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-ink text-white"
                      : "border border-ink/10 bg-white text-ink/70 hover:bg-ink/[0.04]"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            <div className="relative min-w-[240px]">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
              />
              <input
                type="text"
                placeholder="Search clients by name, contact, website..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(0);
                }}
                aria-label="Search clients"
                className="w-full rounded-full border border-ink/15 bg-white py-1.5 pl-9 pr-4 text-xs text-ink placeholder:text-ink-muted focus:border-ink focus:outline-none"
              />
            </div>
          </div>

          {/* Clients Table */}
          <div className="mt-6 overflow-x-auto rounded-xl border border-ink/10 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-ink/[0.03] text-left text-[12px] uppercase tracking-wider text-ink-muted">
                <tr>
                  <th className="px-4 py-3">Client / Business</th>
                  <th className="px-4 py-3">Primary Contact</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Care Plan / MRR</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clientsQuery.isLoading && (
                  <>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="border-t border-ink/5">
                        <td className="px-4 py-4">
                          <div className="h-4 w-40 rounded bg-ink/10 animate-pulse mb-1.5" />
                          <div className="h-3 w-32 rounded bg-ink/5 animate-pulse" />
                        </td>
                        <td className="px-4 py-4">
                          <div className="h-4 w-32 rounded bg-ink/10 animate-pulse mb-1" />
                          <div className="h-3 w-44 rounded bg-ink/5 animate-pulse" />
                        </td>
                        <td className="px-4 py-4">
                          <div className="h-5 w-16 rounded-full bg-ink/10 animate-pulse" />
                        </td>
                        <td className="px-4 py-4">
                          <div className="h-4 w-20 rounded bg-ink/10 animate-pulse" />
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="h-6 w-20 rounded-full bg-ink/10 animate-pulse ml-auto" />
                        </td>
                      </tr>
                    ))}
                  </>
                )}
                {clientsQuery.isError && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center" role="alert">
                      <div className="mx-auto max-w-md rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-950 flex items-center justify-between gap-3">
                        <span>Client records could not be loaded from Supabase.</span>
                        <button
                          type="button"
                          className="rounded-full border border-rose-300 bg-white px-3 py-1 font-bold text-rose-900 hover:bg-rose-100 transition-colors"
                          onClick={() => void clientsQuery.refetch()}
                        >
                          Retry
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
                {filteredClients.length === 0 && clientsQuery.isSuccess && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-ink-muted">
                      <div className="mx-auto max-w-sm rounded-xl border border-dashed border-ink/15 p-6 text-center">
                        <Users size={28} className="mx-auto text-ink-muted/50 mb-2" />
                        <p className="text-sm font-bold text-ink">No clients match this view</p>
                        <p className="text-xs text-ink-muted mt-1">
                          Create a client workspace from an enquiry or click &apos;Add client&apos; above.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
                {filteredClients.map((client) => {
                  const monthlyValue = client.monthly_value_cents ?? 0;
                  const linkedProjectsCount = allProjects.filter(
                    (p) => p.client_id === client.id,
                  ).length;

                  return (
                    <tr
                      key={client.id}
                      onClick={() => setClient360(client)}
                      className="cursor-pointer border-t border-ink/5 transition-colors hover:bg-ink/[0.02]"
                    >
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-ink">{client.name}</div>
                        {client.website && (
                          <a
                            href={
                              client.website.startsWith("http")
                                ? client.website
                                : `https://${client.website}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="mt-0.5 inline-flex items-center gap-1 text-xs text-ink-muted hover:text-primary hover:underline"
                          >
                            <Globe size={12} />
                            {client.website.replace(/^https?:\/\//i, "")}
                          </a>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="text-ink/90">{client.contact_name || "—"}</div>
                        <div className="text-xs text-ink-muted">
                          {client.contact_email || "No email"}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={client.status} />
                      </td>
                      <td className="px-4 py-3.5">
                        {monthlyValue > 0 ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                            {formatCents(monthlyValue)}/mo
                          </span>
                        ) : (
                          <span className="text-xs text-ink-muted">One-off / None</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setClient360(client)}
                            className="inline-flex items-center gap-1 rounded-md bg-ink/[0.05] px-2.5 py-1 text-xs font-semibold text-ink hover:bg-ink/10"
                            title="Open Client 360 Workspace"
                          >
                            <Layers size={13} />
                            <span>360 View</span>
                            <span className="ml-0.5 rounded-full bg-ink px-1.5 text-[10px] text-white">
                              {allProjectsQuery.isSuccess ? linkedProjectsCount : "—"}
                            </span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setInvoicingClient(client);
                            }}
                            className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                            title="Create VAT Invoice or Deposit Receipt"
                          >
                            <Receipt size={13} />
                            <span>Invoice</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setReportingClient(client);
                            }}
                            className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                            title="Monthly Care Plan ROI & Performance Report"
                          >
                            <BarChart3 size={13} />
                            <span>Report</span>
                          </button>
                          <button
                            onClick={() => setEditingClient(client)}
                            className="rounded-md p-1.5 text-ink/60 hover:bg-ink/[0.05] hover:text-ink"
                            title="Edit Client"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => {
                              if (
                                confirm(`Delete client "${client.name}"? This cannot be undone.`)
                              ) {
                                deleteClientMutation.mutate(client.id);
                              }
                            }}
                            className="rounded-md p-1.5 text-ink/60 hover:bg-rose-50 hover:text-rose-600"
                            title="Delete Client"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Client 360 Workspace Drawer */}
          <AdminPagination
            page={page}
            total={clientsQuery.isSuccess ? clientsQuery.data.total : undefined}
            pending={clientsQuery.isFetching}
            label="clients"
            onChange={setPage}
          />
          {client360 && (
            <div
              className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs"
              onClick={() => {
                setClient360(null);
                setIsAddingProject(false);
              }}
            >
              <div
                className="h-full w-full max-w-2xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Drawer Header */}
                <div className="flex items-start justify-between border-b border-ink/10 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold text-ink">{client360.name}</h2>
                      <StatusBadge status={client360.status} />
                    </div>
                    {client360.website && (
                      <a
                        href={
                          client360.website.startsWith("http")
                            ? client360.website
                            : `https://${client360.website}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-primary hover:underline"
                      >
                        <Globe size={13} />
                        {client360.website} <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setReportingClient(client360)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-blue-300 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800 hover:bg-blue-100"
                    >
                      <BarChart3 size={14} />
                      <span>Monthly Report</span>
                    </button>
                    <button
                      onClick={() => setInvoicingClient(client360)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
                    >
                      <Receipt size={14} />
                      <span>VAT Invoice</span>
                    </button>
                    <button
                      onClick={() => {
                        setClient360(null);
                        setIsAddingProject(false);
                      }}
                      aria-label="Close client workspace"
                      className="rounded-md p-2 text-ink/60 hover:bg-ink/[0.05]"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  {/* Care Plan & Recurring Value Tile */}
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
                          Recorded Care Plan & Hosting
                        </div>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-emerald-950">
                            {formatCents(client360.monthly_value_cents) ?? "Not recorded"}
                          </span>
                          <span className="text-xs text-emerald-800">/ month recurring</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() =>
                            saveClientMutation.mutate({
                              id: client360.id,
                              quickMonthlyCents: 14900,
                            })
                          }
                          className="rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-900 shadow-xs hover:bg-emerald-50"
                        >
                          Record agreed £149/mo
                        </button>
                        <button
                          onClick={() =>
                            saveClientMutation.mutate({
                              id: client360.id,
                              quickMonthlyCents: 24900,
                            })
                          }
                          className="rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-900 shadow-xs hover:bg-emerald-50"
                        >
                          Record agreed £249/mo
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Primary Contact Card */}
                  <div className="rounded-xl border border-ink/10 p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                      Primary Contact
                    </h3>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2 text-sm">
                      <div>
                        <span className="text-xs text-ink-muted">Contact Name:</span>
                        <div className="font-medium text-ink">
                          {client360.contact_name || "Not set"}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-ink-muted">Email:</span>
                        <div>
                          {client360.contact_email ? (
                            <a
                              href={`mailto:${client360.contact_email}`}
                              className="inline-flex items-center gap-1 font-medium text-ink hover:underline"
                            >
                              <Mail size={13} className="text-ink-muted" />
                              {client360.contact_email}
                            </a>
                          ) : (
                            "Not set"
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-ink-muted">Phone:</span>
                        <div>
                          {client360.contact_phone ? (
                            <a
                              href={`tel:${client360.contact_phone}`}
                              className="inline-flex items-center gap-1 font-medium text-ink hover:underline"
                            >
                              <Phone size={13} className="text-ink-muted" />
                              {client360.contact_phone}
                            </a>
                          ) : (
                            "Not set"
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-ink-muted">Client Since:</span>
                        <div className="font-medium text-ink">
                          {new Date(client360.created_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Linked Projects Section */}
                  <div className="rounded-xl border border-ink/10 p-5">
                    <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
                          Deliverables & Projects (
                          {clientProjectsQuery.isSuccess ? clientProjects.length : "—"})
                        </h3>
                        <p className="mt-0.5 text-xs text-ink-muted">
                          Active and delivered digital projects for this account.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsAddingProject(!isAddingProject)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink/90"
                      >
                        <Plus size={14} /> Add Project
                      </button>
                    </div>

                    {/* Add Project Form Drawer */}
                    {isAddingProject && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const fd = new FormData(e.currentTarget);
                          createProjectMutation.mutate({
                            name: fd.get("name"),
                            client_id: client360.id,
                            status: fd.get("status"),
                            budget: fd.get("budget"),
                            start_date: fd.get("start_date"),
                            target_date: fd.get("target_date"),
                            summary: fd.get("summary"),
                          });
                        }}
                        className="mt-4 space-y-3 rounded-xl border border-blue-200 bg-blue-50/40 p-4 text-xs"
                      >
                        <div className="font-semibold text-blue-950">
                          New Project for {client360.name}
                        </div>
                        <div>
                          <label className="block font-medium text-ink/70">Project Name *</label>
                          <input
                            name="name"
                            required
                            placeholder="e.g. Launch Website & Brand Architecture"
                            className="mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-1.5 text-xs text-ink focus:border-ink focus:outline-none"
                          />
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="block font-medium text-ink/70">Status</label>
                            <select
                              name="status"
                              defaultValue="discovery"
                              className="mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-1.5 text-xs text-ink focus:border-ink focus:outline-none"
                            >
                              <option value="discovery">Discovery</option>
                              <option value="in_progress">In Progress</option>
                              <option value="review">Review</option>
                              <option value="launched">Launched (requires verified release)</option>
                              <option value="on_hold">On Hold</option>
                            </select>
                          </div>
                          <div>
                            <label className="block font-medium text-ink/70">
                              Contract Budget (£)
                            </label>
                            <input
                              name="budget"
                              type="text"
                              inputMode="decimal"
                              placeholder="Optional, e.g. 1495"
                              className="mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-1.5 text-xs text-ink focus:border-ink focus:outline-none"
                            />
                          </div>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="block font-medium text-ink/70">Start Date</label>
                            <input
                              name="start_date"
                              type="date"
                              className="mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-1.5 text-xs text-ink focus:border-ink focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block font-medium text-ink/70">
                              Target Launch Date
                            </label>
                            <input
                              name="target_date"
                              type="date"
                              className="mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-1.5 text-xs text-ink focus:border-ink focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block font-medium text-ink/70">
                            Scope / Deliverable Summary
                          </label>
                          <textarea
                            name="summary"
                            rows={2}
                            placeholder="Key milestones, design deliverables, technical requirements..."
                            className="mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-1.5 text-xs text-ink focus:border-ink focus:outline-none"
                          />
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setIsAddingProject(false)}
                            className="rounded-md border border-ink/15 bg-white px-3 py-1 font-medium text-ink hover:bg-ink/5"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={createProjectMutation.isPending}
                            className="rounded-md bg-ink px-4 py-1 font-semibold text-white hover:bg-ink/90 disabled:opacity-50"
                          >
                            {createProjectMutation.isPending ? "Creating…" : "Save Project"}
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Projects List */}
                    <div className="mt-4 space-y-3">
                      {clientProjectsQuery.isSuccess &&
                        clientProjects.length === 0 &&
                        !isAddingProject && (
                          <div className="py-6 text-center text-xs text-ink-muted">
                            No projects linked yet. Click "Add Project" above to create one.
                          </div>
                        )}
                      {clientProjectsQuery.isPending && (
                        <p role="status">Loading linked projects…</p>
                      )}
                      {clientProjectsQuery.isError && (
                        <p role="alert">
                          Linked projects could not be loaded.{" "}
                          <button
                            type="button"
                            className="underline"
                            onClick={() => void clientProjectsQuery.refetch()}
                          >
                            Retry linked projects
                          </button>
                        </p>
                      )}
                      {clientProjects.map((project) => {
                        const budgetCents = project.budget_cents ?? 0;
                        return (
                          <div
                            key={project.id}
                            className="flex flex-col justify-between gap-3 rounded-xl border border-ink/10 bg-ink/[0.01] p-4 sm:flex-row sm:items-center"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-ink text-sm">
                                  {project.name}
                                </span>
                                <StatusBadge status={project.status} />
                              </div>
                              {project.summary && (
                                <p className="mt-1 text-xs text-ink-muted line-clamp-2">
                                  {project.summary}
                                </p>
                              )}
                              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                                {budgetCents > 0 && (
                                  <span className="font-medium text-ink">
                                    Budget: {formatCents(budgetCents)}
                                  </span>
                                )}
                                {project.start_date && (
                                  <span className="flex items-center gap-1">
                                    <Calendar size={12} />
                                    Start: {project.start_date}
                                  </span>
                                )}
                                {project.target_date && (
                                  <span className="flex items-center gap-1">
                                    Target: {project.target_date}
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                if (confirm(`Delete project "${project.name}"?`)) {
                                  deleteProjectMutation.mutate(project.id);
                                }
                              }}
                              className="self-end rounded-md p-1.5 text-ink/40 hover:bg-rose-50 hover:text-rose-600 sm:self-center"
                              title="Delete Project"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes Section */}
                  {client360.notes && (
                    <div className="rounded-xl border border-ink/10 p-4">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                        Account History & Notes
                      </h3>
                      <div className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-ink/80">
                        {client360.notes}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Edit / Create Client Modal */}
      {(editingClient || isCreatingClient) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs"
          onClick={() => {
            setEditingClient(null);
            setIsCreatingClient(false);
          }}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-ink/10 pb-3">
              <h2 className="text-lg font-semibold text-ink">
                {editingClient?.id ? "Edit Client" : "New Client Account"}
              </h2>
              <button
                onClick={() => {
                  setEditingClient(null);
                  setIsCreatingClient(false);
                }}
                className="rounded-md p-1.5 text-ink/60 hover:bg-ink/5"
              >
                <X size={16} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);

                saveClientMutation.mutate({
                  id: editingClient?.id,
                  name: fd.get("name"),
                  contact_name: fd.get("contact_name"),
                  contact_email: fd.get("contact_email"),
                  contact_phone: fd.get("contact_phone"),
                  website: fd.get("website"),
                  status: fd.get("status"),
                  monthly_value: fd.get("monthly_value"),
                  notes: fd.get("notes"),
                });
              }}
              className="mt-5 space-y-4 text-sm"
            >
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Client / Business Name *
                </label>
                <input
                  name="name"
                  required
                  defaultValue={editingClient?.name ?? ""}
                  className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-ink focus:border-ink focus:outline-none"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Contact Name
                  </label>
                  <input
                    name="contact_name"
                    defaultValue={editingClient?.contact_name ?? ""}
                    className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-ink focus:border-ink focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Contact Email
                  </label>
                  <input
                    name="contact_email"
                    type="email"
                    defaultValue={editingClient?.contact_email ?? ""}
                    className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-ink focus:border-ink focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Phone
                  </label>
                  <input
                    name="contact_phone"
                    defaultValue={editingClient?.contact_phone ?? ""}
                    className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-ink focus:border-ink focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Website URL
                  </label>
                  <input
                    name="website"
                    defaultValue={editingClient?.website ?? ""}
                    placeholder="e.g. clientdomain.co.uk"
                    className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-ink focus:border-ink focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={editingClient?.status ?? "active"}
                    className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-ink focus:border-ink focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="lead">Lead</option>
                    <option value="paused">Paused</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Care Plan MRR (£/mo)
                  </label>
                  <input
                    name="monthly_value"
                    type="text"
                    inputMode="decimal"
                    defaultValue={centsToPoundsInput(editingClient?.monthly_value_cents)}
                    placeholder="e.g. 95 or 95.50 (optional)"
                    className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-ink focus:border-ink focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Notes
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  defaultValue={editingClient?.notes ?? ""}
                  className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-ink focus:border-ink focus:outline-none"
                />
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-ink/10 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setEditingClient(null);
                    setIsCreatingClient(false);
                  }}
                  className="rounded-full border border-ink/15 px-4 py-2 text-xs font-medium text-ink hover:bg-ink/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveClientMutation.isPending}
                  className="rounded-full bg-ink px-5 py-2 text-xs font-semibold text-white hover:bg-ink/90 disabled:opacity-50"
                >
                  {saveClientMutation.isPending ? "Saving…" : "Save Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Client VAT Invoice Modal */}
      {invoicingClient && (
        <ClientInvoiceModal client={invoicingClient} onClose={() => setInvoicingClient(null)} />
      )}

      {/* Client Monthly Performance & ROI Report Modal */}
      {reportingClient && (
        <ClientMonthlyReportModal
          client={reportingClient}
          onClose={() => setReportingClient(null)}
        />
      )}
    </div>
  );
}
