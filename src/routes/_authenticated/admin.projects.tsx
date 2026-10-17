import {
  loadProjectPage,
  loadProjectSummary,
  loadCompleteRecords,
  type ProjectFilter,
} from "@/lib/admin-records";
import { AdminPagination } from "@/components/admin/AdminPagination";
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
import {
  adminErrorMessage,
  deleteRecord,
  insertRecord,
  invalidateAdminData,
  updateRecord,
} from "@/lib/admin-writes";
import {
  parseProjectInput,
  parseProjectStatus,
  centsToPoundsInput,
  formatCents,
} from "@/lib/admin-validation";
import type { Database } from "@/integrations/supabase/types";
import { PageHeader, StatusBadge } from "./admin.index";
import { toast } from "sonner";
import { ProjectReviewDetails } from "@/components/admin/DeliveryReviewPanel";

export const Route = createFileRoute("/_authenticated/admin/projects")({
  component: ProjectsAdminPage,
});

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type ClientRow = Database["public"]["Tables"]["clients"]["Row"];

function ProjectsAdminPage() {
  const qc = useQueryClient();
  const [filterStatus, setFilterStatus] = useState<ProjectFilter>("all");
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProject, setEditingProject] = useState<ProjectRow | null>(null);

  const projectsQuery = useQuery({
    queryKey: ["admin", "projects-list", filterStatus, searchTerm, page],
    queryFn: ({ signal }) =>
      loadProjectPage(supabase, { page, status: filterStatus, search: searchTerm, signal }),
  });
  const summaryQuery = useQuery({
    queryKey: ["projects", "summary"],
    queryFn: () => loadProjectSummary(supabase),
  });
  const clientsQuery = useQuery({
    queryKey: ["admin", "clients-picker"],
    queryFn: async () =>
      (
        await loadCompleteRecords((after) => {
          let query = supabase
            .from("clients")
            .select("id,name", { count: "exact" })
            .order("id")
            .limit(500);
          if (after) query = query.gt("id", after);
          return query;
        })
      ).sort((a, b) => a.name.localeCompare(b.name)),
  });
  const projects = projectsQuery.isSuccess ? projectsQuery.data.rows : [];
  const clients = useMemo(
    () => (clientsQuery.isSuccess ? clientsQuery.data : []),
    [clientsQuery.data, clientsQuery.isSuccess],
  );
  const summary = summaryQuery.isSuccess ? summaryQuery.data : undefined;
  const activeCount = summary?.active;
  const filteredProjects = projects;
  const updateStageMutation = useMutation({
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

  const deleteProjectMutation = useMutation({
    mutationFn: (id: string) => deleteRecord(supabase, "projects", id),
    onSuccess: () => {
      invalidateAdminData(qc, "project");
      setPage(0);
      toast.success("Project deleted");
    },
    onError: (err: unknown) => toast.error(adminErrorMessage(err, "Project was not deleted.")),
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title="Projects & Delivery"
          subtitle="Build progress, versioned customer reviews and verified launch readiness."
        />
        <button
          disabled={!clientsQuery.isSuccess}
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
            {summaryQuery.isPending ? (
              <div className="h-9 w-20 rounded bg-ink/10 animate-pulse my-1" />
            ) : (
              <>
                {activeCount ?? "—"} / 2{" "}
                <span className="text-sm font-normal text-ink-muted">slots</span>
              </>
            )}
          </div>
          <div className="mt-2 text-xs text-ink-muted">
            {summaryQuery.isPending ? (
              <div className="h-3 w-44 rounded bg-ink/5 animate-pulse" />
            ) : activeCount === undefined ? (
              "Capacity unavailable until project totals load."
            ) : (activeCount ?? 0) >= 2 ? (
              <span className="font-bold text-amber-700">
                At capacity limit — complete an existing build before onboarding new trades.
              </span>
            ) : (
              `${2 - (activeCount ?? 0)} build slot(s) within the pilot capacity target.`
            )}
          </div>
        </div>

        {/* Project delivery dates */}
        <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Standard Delivery Target
            </span>
            <Clock size={16} className="text-emerald-700" />
          </div>
          <div className="mt-2 text-3xl font-extrabold text-ink">14-Day Delivery</div>
          <p className="mt-2 text-xs text-ink-muted">
            Target from complete asset receipt, excluding client delays. Confirm project dates
            individually.
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

      {(summaryQuery.isError || clientsQuery.isError) && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-950 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs"
        >
          <div>
            <span className="font-bold">Project metadata sync degraded: </span>
            {summaryQuery.isError && "Project totals failed to load. "}
            {clientsQuery.isError && "Client directory for project association is unavailable."}
          </div>
          <div className="flex items-center gap-2">
            {summaryQuery.isError && (
              <button
                type="button"
                className="rounded-full border border-rose-300 bg-white px-3 py-1 font-bold text-rose-900 hover:bg-rose-100 transition-colors"
                onClick={() => void summaryQuery.refetch()}
              >
                Retry Totals
              </button>
            )}
            {clientsQuery.isError && (
              <button
                type="button"
                className="rounded-full border border-rose-300 bg-white px-3 py-1 font-bold text-rose-900 hover:bg-rose-100 transition-colors"
                onClick={() => void clientsQuery.refetch()}
              >
                Retry Clients
              </button>
            )}
          </div>
        </div>
      )}

      {/* Delivery Stage Filters */}
      <div className="flex overflow-x-auto border-b border-ink/10 pb-px gap-1">
        {[
          { key: "all", label: `All Projects (${summary?.all ?? "—"})` },
          { key: "active", label: `Active In Flight (${activeCount ?? "—"})` },
          { key: "discovery", label: "1. Discovery" },
          { key: "in_progress", label: "2. Build" },
          { key: "review", label: "3. Preview & Approval" },
          { key: "launched", label: "4. Launched" },
          { key: "on_hold", label: "On hold" },
          { key: "archived", label: "Archived" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setFilterStatus(tab.key as ProjectFilter);
              setPage(0);
            }}
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

      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>
      <input
        id="project-search"
        type="search"
        placeholder="Search project titles or summaries"
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
          setPage(0);
        }}
        className="w-full rounded-full border border-ink/15 bg-white px-4 py-2 text-sm"
      />
      {/* Project Cards List */}
      {projectsQuery.isPending ? (
        <div className="space-y-4 py-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-ink/10 bg-white p-5 shadow-xs space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-3 w-28 rounded bg-ink/10 animate-pulse" />
                  <div className="h-5 w-48 rounded bg-ink/10 animate-pulse" />
                </div>
                <div className="h-6 w-20 rounded-full bg-ink/10 animate-pulse" />
              </div>
              <div className="h-3 w-3/4 rounded bg-ink/5 animate-pulse" />
              <div className="pt-3 border-t border-ink/5 flex justify-between">
                <div className="h-3 w-32 rounded bg-ink/5 animate-pulse" />
                <div className="h-3 w-24 rounded bg-ink/5 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : projectsQuery.isError ? (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-950 space-y-3"
        >
          <AlertTriangle size={24} className="mx-auto text-rose-700" />
          <h3 className="text-sm font-bold">Projects Could Not Be Loaded</h3>
          <p className="text-xs text-rose-800">
            A network or database connection interruption prevented loading project delivery
            records.
          </p>
          <button
            type="button"
            className="rounded-full border border-rose-300 bg-white px-4 py-1.5 text-xs font-bold text-rose-900 hover:bg-rose-100 transition-colors"
            onClick={() => void projectsQuery.refetch()}
          >
            Retry Projects
          </button>
        </div>
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
                "Verify the live deployment, billing and care records; project status alone does not confirm them.";
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
                      {formatCents(project.budget_cents)
                        ? `${formatCents(project.budget_cents)} Setup`
                        : "£1,495 Setup"}
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
                <ProjectReviewDetails projectId={project.id} />
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
                        disabled
                        title="Payment, approved website version and launch checks must be verified before release."
                        className="rounded-full bg-ink/10 px-3 py-1 text-[11px] font-bold text-ink-muted"
                      >
                        Launch verification pending
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <AdminPagination
        page={page}
        total={projectsQuery.isSuccess ? projectsQuery.data.total : undefined}
        pending={projectsQuery.isFetching}
        label="projects"
        onChange={setPage}
      />
      {/* Create Project Modal */}
      {isCreatingProject && (
        <CreateProjectModal
          clients={clients}
          onClose={() => setIsCreatingProject(false)}
          onSuccess={() => {
            invalidateAdminData(qc, "project");
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
            invalidateAdminData(qc, "project");
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
  const [clientId, setClientId] = useState("");
  const [budget, setBudget] = useState("1495");
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
        budget,
        target_date: targetDate,
        summary,
      });
      await insertRecord(supabase, "projects", input);
      toast.success("Project created in Discovery stage");
      onSuccess();
    } catch (err: unknown) {
      toast.error(adminErrorMessage(err, "Failed to create project"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink/10 pb-3">
          <h3 className="text-base font-bold text-ink">Start project</h3>
          <button
            aria-label="Close new project"
            onClick={onClose}
            className="rounded p-1 text-ink-muted hover:bg-ink/5"
          >
            <X size={18} />
          </button>
        </div>
        <form method="post" onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label htmlFor="new-project-name" className="block text-xs font-semibold text-ink">
              Project Title *
            </label>
            <input
              type="text"
              required
              id="new-project-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Westside Heating 5-Page Turnkey Presence"
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
            />
          </div>
          <div>
            <label htmlFor="new-project-client" className="block text-xs font-semibold text-ink">
              Client Account
            </label>
            <select
              id="new-project-client"
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
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="new-project-budget" className="block text-xs font-semibold text-ink">
                Agreed Fee (£)
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="new-project-budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="1495"
                className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label htmlFor="new-project-target" className="block text-xs font-semibold text-ink">
                Target Launch Date
              </label>
              <input
                type="date"
                id="new-project-target"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
              />
            </div>
          </div>
          <div>
            <label htmlFor="new-project-summary" className="block text-xs font-semibold text-ink">
              Summary & Scope
            </label>
            <textarea
              id="new-project-summary"
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
  const [budget, setBudget] = useState(centsToPoundsInput(project.budget_cents));
  const [targetDate, setTargetDate] = useState(project.target_date ?? "");
  const [summary, setSummary] = useState(project.summary ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const input = parseProjectInput({
        name,
        client_id: clientId,
        status,
        budget,
        target_date: targetDate,
        summary,
      });
      await updateRecord(supabase, "projects", project.id, {
        name: input.name,
        client_id: input.client_id,
        status: input.status,
        budget_cents: input.budget_cents,
        target_date: input.target_date,
        summary: input.summary,
      });
      toast.success("Project updated");
      onSuccess();
    } catch (err: unknown) {
      toast.error(adminErrorMessage(err, "Failed to update project"));
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
              <option value="launched" disabled>
                4. Live Launched — requires verified release
              </option>
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
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-ink">Agreed Fee (£)</label>
              <input
                type="text"
                inputMode="decimal"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="1495"
                className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink">Target Launch Date</label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
              />
            </div>
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
