import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Plus,
  AlertTriangle,
  Layers,
  ArrowRight,
  User,
  Building,
  ShieldCheck,
  RefreshCw,
  X,
  Pencil,
  Trash2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { PageHeader, StatusBadge } from "./admin.index";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/projects")({
  component: ProjectsAdminPage,
});

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type ClientRow = Database["public"]["Tables"]["clients"]["Row"];

function ProjectsAdminPage() {
  const qc = useQueryClient();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectRow | null>(null);

  const projectsQuery = useQuery({
    queryKey: ["admin", "projects-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*, clients(id, name, contact_name, contact_email, website)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as (ProjectRow & {
        clients: Pick<
          ClientRow,
          "id" | "name" | "contact_name" | "contact_email" | "website"
        > | null;
      })[];
    },
  });

  const clientsQuery = useQuery({
    queryKey: ["admin", "clients-picker"],
    queryFn: async () => {
      const { data, error } = await supabase.from("clients").select("id, name");
      if (error) throw error;
      return (data ?? []) as Pick<ClientRow, "id" | "name">[];
    },
  });

  const projects = useMemo(() => projectsQuery.data ?? [], [projectsQuery.data]);
  const clients = useMemo(() => clientsQuery.data ?? [], [clientsQuery.data]);

  const activeProjects = useMemo(
    () => projects.filter((p) => ["discovery", "in_progress", "review"].includes(p.status)),
    [projects],
  );

  const filteredProjects = useMemo(() => {
    if (filterStatus === "all") return projects;
    if (filterStatus === "active") return activeProjects;
    return projects.filter((p) => p.status === filterStatus);
  }, [projects, filterStatus, activeProjects]);

  const updateStageMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ProjectRow["status"] }) => {
      const { error } = await supabase.from("projects").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "projects-list"] });
      qc.invalidateQueries({ queryKey: ["admin", "operational-stats"] });
      toast.success("Project stage updated");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "projects-list"] });
      qc.invalidateQueries({ queryKey: ["admin", "operational-stats"] });
      toast.success("Project deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title="Projects & Delivery"
          subtitle="14-day turnaround SLA, staged previews, client approvals, and Cloudflare DNS cutover."
        />
        <button
          onClick={() => setIsCreatingProject(true)}
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-ink/90 transition-colors"
        >
          <Plus size={14} />
          <span>Start New Build</span>
        </button>
      </div>

      {/* Concurrency & SLA Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Capacity */}
        <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Active Concurrency
            </span>
            <Layers size={16} className="text-blue-700" />
          </div>
          <div className="mt-2 text-3xl font-extrabold text-ink">
            {activeProjects.length} / 3{" "}
            <span className="text-sm font-normal text-ink-muted">slots</span>
          </div>
          <p className="mt-2 text-xs text-ink-muted">
            {activeProjects.length >= 3
              ? "At capacity limit — complete an existing build before onboarding new trades."
              : `${3 - activeProjects.length} build slot(s) open. Protects founder part-time capacity.`}
          </p>
        </div>

        {/* 14-Day Delivery SLA */}
        <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Standard Delivery SLA
            </span>
            <Clock size={16} className="text-emerald-700" />
          </div>
          <div className="mt-2 text-3xl font-extrabold text-ink">14 Days</div>
          <p className="mt-2 text-xs text-ink-muted">
            From asset intake to staging preview and client launch sign-off.
          </p>
        </div>

        {/* Milestone Pricing */}
        <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Managed Package Structure
            </span>
            <ShieldCheck size={16} className="text-violet-700" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-ink">£1,495 + £249/mo</div>
          <p className="mt-2 text-xs text-ink-muted">
            50% deposit (£747.50) + 50% balance (£747.50) on sign-off.
          </p>
        </div>
      </div>

      {/* Delivery Stage Filters */}
      <div className="flex overflow-x-auto border-b border-ink/10 pb-px gap-1">
        {[
          { key: "all", label: `All Projects (${projects.length})` },
          { key: "active", label: `Active In Flight (${activeProjects.length})` },
          { key: "discovery", label: "1. Discovery" },
          { key: "in_progress", label: "2. Build" },
          { key: "review", label: "3. Preview & Approval" },
          { key: "launched", label: "4. Launched" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key)}
            className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
              filterStatus === tab.key
                ? "border-ink text-ink font-bold"
                : "border-transparent text-ink-muted hover:border-ink/20 hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Project Cards List */}
      {projectsQuery.isPending ? (
        <p className="text-xs text-ink-muted py-6">Loading projects…</p>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink/15 bg-white p-8 text-center">
          <Briefcase size={28} className="mx-auto text-ink-muted/50 mb-2" />
          <h3 className="text-sm font-bold text-ink">No projects match this filter</h3>
          <p className="text-xs text-ink-muted mt-1">
            Start a new project or select another stage filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project) => {
            const client = project.clients;
            const targetDateStr = project.target_date
              ? new Date(project.target_date).toLocaleDateString("en-GB")
              : "No target date";

            // Determine outstanding customer action
            let outstandingAction = "Reviewing project specs";
            if (project.status === "discovery") {
              outstandingAction =
                "Awaiting trade accreditations (Gas Safe/NICEIC), logo & coverage postcodes";
            } else if (project.status === "in_progress") {
              outstandingAction = "Drafting 100% technical copy & building 5-page architecture";
            } else if (project.status === "review") {
              outstandingAction =
                "Staged preview ready — awaiting client revision feedback or sign-off";
            } else if (project.status === "launched") {
              outstandingAction =
                "Live on Cloudflare edge — £249/mo care and 30-min monthly edit allowance active";
            }

            return (
              <div
                key={project.id}
                className="rounded-xl border border-ink/10 bg-white p-5 shadow-xs hover:border-ink/20 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
                        {client?.name ?? "Direct Account"}
                      </span>
                      <StatusBadge status={project.status} />
                    </div>
                    <h3 className="text-base font-bold text-ink mt-0.5">{project.name}</h3>
                    {project.summary && (
                      <p className="text-xs text-ink-muted mt-1 max-w-2xl leading-relaxed">
                        {project.summary}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                      £1,495 Setup
                    </span>
                    <button
                      onClick={() => setEditingProject(project)}
                      className="rounded-lg p-1.5 text-ink-muted hover:bg-ink/5 hover:text-ink"
                      title="Edit project"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete project "${project.name}"?`)) {
                          deleteProjectMutation.mutate(project.id);
                        }
                      }}
                      className="rounded-lg p-1.5 text-ink-muted hover:bg-rose-50 hover:text-rose-600"
                      title="Delete project"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Outstanding Action Indicator */}
                <div className="rounded-lg bg-ink/[0.02] border border-ink/5 p-3 flex items-start gap-2.5 text-xs">
                  <div className="font-bold text-ink shrink-0">Current Action:</div>
                  <div className="text-ink-muted">{outstandingAction}</div>
                </div>

                {/* Stage Progression & Timeline */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-ink/5 text-xs">
                  <div>
                    <span className="text-[10px] text-ink-muted uppercase font-bold block">
                      Start Date
                    </span>
                    <span className="font-medium text-ink">
                      {project.start_date
                        ? new Date(project.start_date).toLocaleDateString("en-GB")
                        : "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink-muted uppercase font-bold block">
                      Target Launch
                    </span>
                    <span className="font-medium text-ink">{targetDateStr}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink-muted uppercase font-bold block">
                      Client Contact
                    </span>
                    <span className="font-medium text-ink truncate block">
                      {client?.contact_name || client?.contact_email || "—"}
                    </span>
                  </div>
                  <div className="text-right flex items-center justify-end gap-1.5">
                    {project.status === "discovery" && (
                      <button
                        onClick={() =>
                          updateStageMutation.mutate({ id: project.id, status: "in_progress" })
                        }
                        className="rounded-full bg-ink px-3 py-1 text-[11px] font-bold text-white hover:bg-ink/90"
                      >
                        Advance to Build →
                      </button>
                    )}
                    {project.status === "in_progress" && (
                      <button
                        onClick={() =>
                          updateStageMutation.mutate({ id: project.id, status: "review" })
                        }
                        className="rounded-full bg-violet-700 px-3 py-1 text-[11px] font-bold text-white hover:bg-violet-800"
                      >
                        Preview Ready for Approval →
                      </button>
                    )}
                    {project.status === "review" && (
                      <button
                        onClick={() =>
                          updateStageMutation.mutate({ id: project.id, status: "launched" })
                        }
                        className="rounded-full bg-emerald-700 px-3 py-1 text-[11px] font-bold text-white hover:bg-emerald-800"
                      >
                        Approve & Launch DNS →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Project Modal */}
      {isCreatingProject && (
        <CreateProjectModal
          clients={clients}
          onClose={() => setIsCreatingProject(false)}
          onSuccess={() => {
            qc.invalidateQueries({ queryKey: ["admin", "projects-list"] });
            qc.invalidateQueries({ queryKey: ["admin", "operational-stats"] });
            setIsCreatingProject(false);
          }}
        />
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <EditProjectModal
          project={editingProject}
          clients={clients}
          onClose={() => setEditingProject(null)}
          onSuccess={() => {
            qc.invalidateQueries({ queryKey: ["admin", "projects-list"] });
            qc.invalidateQueries({ queryKey: ["admin", "operational-stats"] });
            setEditingProject(null);
          }}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Modals
// -------------------------------------------------------------

function CreateProjectModal({
  clients,
  onClose,
  onSuccess,
}: {
  clients: Pick<ClientRow, "id" | "name">[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState(clients[0]?.id ?? "");
  const [targetDays, setTargetDays] = useState("14");
  const [summary, setSummary] = useState("Standard 5-page Managed trade website build.");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name) {
      toast.error("Project name is required");
      return;
    }
    setLoading(true);
    try {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + parseInt(targetDays || "14", 10));

      const { error } = await supabase.from("projects").insert({
        name,
        client_id: clientId || null,
        status: "discovery",
        budget_cents: 149500, // £1,495 standard setup
        start_date: new Date().toISOString(),
        target_date: targetDate.toISOString(),
        summary: summary || null,
      });
      if (error) throw error;
      toast.success("Project created in Discovery stage");
      onSuccess();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to create project");
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
              placeholder="e.g. Westside Heating 5-Page Turnkey Presence"
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink">Client Account</label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
            >
              <option value="">Unassigned</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink">Delivery SLA (Days)</label>
            <input
              type="number"
              value={targetDays}
              onChange={(e) => setTargetDays(e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink">Summary & Scope</label>
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

function EditProjectModal({
  project,
  clients,
  onClose,
  onSuccess,
}: {
  project: ProjectRow;
  clients: Pick<ClientRow, "id" | "name">[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState(project.name);
  const [clientId, setClientId] = useState(project.client_id ?? "");
  const [status, setStatus] = useState<ProjectRow["status"]>(project.status);
  const [summary, setSummary] = useState(project.summary ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from("projects")
        .update({
          name,
          client_id: clientId || null,
          status,
          summary: summary || null,
        })
        .eq("id", project.id);
      if (error) throw error;
      toast.success("Project updated");
      onSuccess();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to update project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink/10 pb-3">
          <h3 className="text-base font-bold text-ink">Edit Project</h3>
          <button onClick={onClose} className="rounded p-1 text-ink-muted hover:bg-ink/5">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-ink">Project Title</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink">Stage Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectRow["status"])}
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
            >
              <option value="discovery">1. Discovery & Assets</option>
              <option value="in_progress">2. Build & Copywriting</option>
              <option value="review">3. Staged Preview & Approval</option>
              <option value="launched">4. Live Launched</option>
              <option value="on_hold">On Hold</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink">Client Account</label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
            >
              <option value="">Unassigned</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
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
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
