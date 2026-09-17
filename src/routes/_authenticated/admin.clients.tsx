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
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [client360, setClient360] = useState<ClientRow | null>(null);
  const [editingClient, setEditingClient] = useState<Partial<ClientRow> | null>(null);
  const [invoicingClient, setInvoicingClient] = useState<ClientRow | null>(null);
  const [reportingClient, setReportingClient] = useState<ClientRow | null>(null);
  const [isCreatingClient, setIsCreatingClient] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // Queries
  const clientsQuery = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ClientRow[];
    },
  });

  const allProjectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ProjectRow[];
    },
  });

  // Client Mutations
  const saveClientMutation = useMutation({
    mutationFn: async (payload: Partial<ClientRow>) => {
      if (payload.id) {
        const { id, ...rest } = payload;
        const { error } = await supabase.from("clients").update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("clients").insert({
          name: payload.name ?? "",
          contact_name: payload.contact_name ?? null,
          contact_email: payload.contact_email ?? null,
          contact_phone: payload.contact_phone ?? null,
          website: payload.website ?? null,
          status: payload.status ?? "active",
          monthly_value_cents: payload.monthly_value_cents ?? 0,
          notes: payload.notes ?? null,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clients"] });
      qc.invalidateQueries({ queryKey: ["admin", "stats"] });
      setEditingClient(null);
      setIsCreatingClient(false);
      toast.success("Client saved");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteClientMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("clients").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clients"] });
      qc.invalidateQueries({ queryKey: ["admin", "stats"] });
      if (client360?.id) setClient360(null);
      toast.success("Client deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  // Project Mutation (for Client 360 Workspace)
  const createProjectMutation = useMutation({
    mutationFn: async (payload: {
      name: string;
      client_id: string;
      status: ProjectStatus;
      budget_cents: number;
      start_date?: string;
      target_date?: string;
      summary?: string;
    }) => {
      const { error } = await supabase.from("projects").insert({
        name: payload.name,
        client_id: payload.client_id,
        status: payload.status,
        budget_cents: payload.budget_cents,
        start_date: payload.start_date || null,
        target_date: payload.target_date || null,
        summary: payload.summary || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["admin", "stats"] });
      setIsAddingProject(false);
      toast.success("Project attached to client successfully");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["admin", "stats"] });
      toast.success("Project deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const clients = clientsQuery.data ?? [];
  const allProjects = allProjectsQuery.data ?? [];

  // Metrics
  const activeClients = clients.filter((c) => c.status === "active");
  const totalMRRPence = clients.reduce((acc, c) => acc + (c.monthly_value_cents ?? 0), 0);
  const totalMRRPounds = Math.round(totalMRRPence / 100);
  const inFlightProjects = allProjects.filter(
    (p) => p.status === "in_progress" || p.status === "discovery" || p.status === "review",
  );

  // Filter clients
  const filteredClients = clients.filter((c) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && c.status === "active") ||
      (activeTab === "lead" && c.status === "lead") ||
      (activeTab === "paused" && c.status === "paused") ||
      (activeTab === "archived" && c.status === "archived");

    const matchesSearch =
      !searchTerm ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.contact_name && c.contact_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.contact_email && c.contact_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.website && c.website.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  // Projects for active Client 360 view
  const clientProjects = client360 ? allProjects.filter((p) => p.client_id === client360.id) : [];

  return (
    <div>
      <PageHeader
        title={clientViewMode === "clients" ? "Client 360 & Accounts" : "Automated Care Desk & Uptime Radar"}
        subtitle={
          clientViewMode === "clients"
            ? "Manage client relationships, active web development deliverables, care plan subscriptions, and recurring MRR."
            : "Zero-touch edge performance monitoring, SSL/DNS health radar, and 24-hour change request fulfillment."
        }
        action={
          clientViewMode === "clients" ? (
            <button
              onClick={() => {
                setEditingClient({ status: "active", monthly_value_cents: 9500 });
                setIsCreatingClient(true);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90"
            >
              <Plus size={16} /> New Client
            </button>
          ) : undefined
        }
      />

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
          <span className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-mono font-medium ${
            clientViewMode === "clients" ? "bg-white/20 text-white" : "bg-ink/10 text-ink"
          }`}>
            {clients.length}
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
          <ShieldCheck size={15} className={clientViewMode === "caredesk" ? "text-emerald-300" : "text-emerald-600"} />
          <span>Automated Care Desk & Uptime Radar</span>
          <span className="ml-1 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            24/7 ACTIVE
          </span>
        </button>
      </div>

      {clientViewMode === "caredesk" && (
        <div className="mt-6">
          <CareDeskMonitor clients={clients} />
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
          <div className="mt-3 text-3xl font-semibold text-ink">{activeClients.length}</div>
          <div className="mt-1 text-xs text-ink-muted">
            {clients.length} total across all statuses
          </div>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
          <div className="flex items-center gap-2 text-emerald-700">
            <TrendingUp size={14} />
            <span className="text-[12px] uppercase tracking-wider font-semibold">
              Contracted MRR
            </span>
          </div>
          <div className="mt-3 text-3xl font-semibold text-emerald-900">
            £{totalMRRPounds.toLocaleString()}
            <span className="text-sm font-normal text-emerald-700">/mo</span>
          </div>
          <div className="mt-1 text-xs text-emerald-700">Recurring Care Plans & retainers</div>
        </div>

        <div className="rounded-xl border border-ink/10 bg-white p-5">
          <div className="flex items-center gap-2 text-blue-700">
            <Briefcase size={14} />
            <span className="text-[12px] uppercase tracking-wider font-semibold">
              In-Flight Projects
            </span>
          </div>
          <div className="mt-3 text-3xl font-semibold text-ink">{inFlightProjects.length}</div>
          <div className="mt-1 text-xs text-ink-muted">{allProjects.length} total projects</div>
        </div>

        <div className="rounded-xl border border-ink/10 bg-white p-5">
          <div className="flex items-center gap-2 text-violet-700">
            <Sparkles size={14} />
            <span className="text-[12px] uppercase tracking-wider font-semibold">
              Avg Client MRR
            </span>
          </div>
          <div className="mt-3 text-3xl font-semibold text-ink">
            £{activeClients.length > 0 ? Math.round(totalMRRPounds / activeClients.length) : 0}
            <span className="text-sm font-normal text-ink-muted">/mo</span>
          </div>
          <div className="mt-1 text-xs text-ink-muted">Per active client account</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All Clients", count: clients.length },
            { id: "active", label: "Active", count: activeClients.length },
            {
              id: "lead",
              label: "Prospective / Lead",
              count: clients.filter((c) => c.status === "lead").length,
            },
            {
              id: "paused",
              label: "Paused",
              count: clients.filter((c) => c.status === "paused").length,
            },
            {
              id: "archived",
              label: "Archived",
              count: clients.filter((c) => c.status === "archived").length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            placeholder="Search clients by name, contact, website..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full border border-ink/15 bg-white py-1.5 pl-9 pr-4 text-xs text-ink placeholder:text-ink-muted focus:border-ink focus:outline-none"
          />
        </div>
      </div>

      {/* Clients Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-ink/10 bg-white">
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
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-ink-muted">
                  Loading clients…
                </td>
              </tr>
            )}
            {filteredClients.length === 0 && !clientsQuery.isLoading && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-ink-muted">
                  No clients found in this view.
                </td>
              </tr>
            )}
            {filteredClients.map((client) => {
              const monthlyValue = (client.monthly_value_cents ?? 0) / 100;
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
                        £{monthlyValue}/mo
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
                        {linkedProjectsCount > 0 && (
                          <span className="ml-0.5 rounded-full bg-ink px-1.5 py-0.2 text-[10px] text-white">
                            {linkedProjectsCount}
                          </span>
                        )}
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
                          if (confirm(`Delete client "${client.name}"? This cannot be undone.`)) {
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
                      Contracted Care Plan & Hosting
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-emerald-950">
                        £{(client360.monthly_value_cents ?? 0) / 100}
                      </span>
                      <span className="text-xs text-emerald-800">/ month recurring</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        saveClientMutation.mutate({
                          id: client360.id,
                          monthly_value_cents: 9500,
                        })
                      }
                      className="rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-900 shadow-xs hover:bg-emerald-50"
                    >
                      Set £95/mo (Launch)
                    </button>
                    <button
                      onClick={() =>
                        saveClientMutation.mutate({
                          id: client360.id,
                          monthly_value_cents: 19500,
                        })
                      }
                      className="rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-900 shadow-xs hover:bg-emerald-50"
                    >
                      Set £195/mo (Growth)
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
                      Deliverables & Projects ({clientProjects.length})
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
                      const budgetGbp = parseFloat(String(fd.get("budget") ?? "0"));
                      createProjectMutation.mutate({
                        name: String(fd.get("name") ?? ""),
                        client_id: client360.id,
                        status:
                          (String(fd.get("status") ?? "discovery") as ProjectStatus) || "discovery",
                        budget_cents: Math.round(budgetGbp * 100),
                        start_date: String(fd.get("start_date") ?? "") || undefined,
                        target_date: String(fd.get("target_date") ?? "") || undefined,
                        summary: String(fd.get("summary") ?? "") || undefined,
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
                          <option value="launched">Launched</option>
                          <option value="on_hold">On Hold</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-medium text-ink/70">Contract Budget (£)</label>
                        <input
                          name="budget"
                          type="number"
                          defaultValue="1495"
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
                          defaultValue={new Date().toISOString().split("T")[0]}
                          className="mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-1.5 text-xs text-ink focus:border-ink focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-ink/70">Target Launch Date</label>
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
                  {clientProjects.length === 0 && !isAddingProject && (
                    <div className="py-6 text-center text-xs text-ink-muted">
                      No projects linked yet. Click "Add Project" above to create one.
                    </div>
                  )}
                  {clientProjects.map((project) => {
                    const budgetGbp = (project.budget_cents ?? 0) / 100;
                    return (
                      <div
                        key={project.id}
                        className="flex flex-col justify-between gap-3 rounded-xl border border-ink/10 bg-ink/[0.01] p-4 sm:flex-row sm:items-center"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-ink text-sm">{project.name}</span>
                            <StatusBadge status={project.status} />
                          </div>
                          {project.summary && (
                            <p className="mt-1 text-xs text-ink-muted line-clamp-2">
                              {project.summary}
                            </p>
                          )}
                          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                            {budgetGbp > 0 && (
                              <span className="font-medium text-ink">
                                Budget: £{budgetGbp.toLocaleString()}
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
                const monthlyGbp = parseFloat(String(fd.get("monthly_value") ?? "0"));

                saveClientMutation.mutate({
                  id: editingClient?.id,
                  name: String(fd.get("name") ?? ""),
                  contact_name: String(fd.get("contact_name") ?? "") || null,
                  contact_email: String(fd.get("contact_email") ?? "") || null,
                  contact_phone: String(fd.get("contact_phone") ?? "") || null,
                  website: String(fd.get("website") ?? "") || null,
                  status: (String(fd.get("status") ?? "active") as ClientStatus) || "active",
                  monthly_value_cents: Math.round(monthlyGbp * 100),
                  notes: String(fd.get("notes") ?? "") || null,
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
                    type="number"
                    defaultValue={
                      editingClient?.monthly_value_cents
                        ? editingClient.monthly_value_cents / 100
                        : 0
                    }
                    placeholder="95"
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
        <ClientInvoiceModal
          client={invoicingClient}
          onClose={() => setInvoicingClient(null)}
        />
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
