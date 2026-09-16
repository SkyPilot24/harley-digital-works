import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckSquare, Pencil, Plus, Rocket, Sparkles, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  emptyScores,
  generateExecutionTasks,
  priorityScore,
  rankedRevenueAssets,
  revenueAssets,
  revenueStreamPlaybooks,
  type ExecutionTask,
  type PriorityScores,
  type RevenueAsset,
  type RevenueAssetForm,
  type RevenueStream,
} from "@/lib/revenue-os";
import { PageHeader, StatusBadge } from "./admin.index";

export const Route = createFileRoute("/_authenticated/admin/revenue-os")({
  component: RevenueOsPage,
});

type RevenueAssetRow = {
  id: string;
  name: string;
  stream: RevenueStream;
  status: RevenueAsset["status"];
  owner: string;
  next_action: string | null;
  target_revenue: number | string | null;
  mrr_potential: number | string | null;
  scores: Partial<PriorityScores> | null;
};

type RevenueTaskRow = {
  id: string;
  title: string;
  priority: ExecutionTask["priority"];
  due_date: string | null;
  source_asset_name: string | null;
  done: boolean;
  created_at: string;
};

const streams: RevenueStream[] = [
  "YouTube",
  "Domains",
  "Web Services",
  "AI Automation",
  "SaaS",
  "Digital Products",
  "Care Plans",
  "Content Engine",
];
const statuses: RevenueAsset["status"][] = [
  "Idea",
  "Validating",
  "Building",
  "Live",
  "Monetising",
  "Paused",
];

const scoreFields: { key: keyof PriorityScores; label: string }[] = [
  { key: "revenuePotential", label: "Revenue" },
  { key: "speedToRevenue", label: "Speed" },
  { key: "easeOfImplementation", label: "Ease" },
  { key: "automationPotential", label: "Automation" },
  { key: "scalability", label: "Scale" },
  { key: "strategicFit", label: "Fit" },
  { key: "recurringRevenuePotential", label: "Recurring" },
];

function RevenueOsPage() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<RevenueAsset | null>(null);
  const [creating, setCreating] = useState(false);

  const assetsQuery = useQuery({
    queryKey: ["revenue-os-assets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("revenue_os_assets")
        .select("id,name,stream,status,owner,next_action,target_revenue,mrr_potential,scores")
        .order("updated_at", { ascending: false });

      if (error) {
        return { assets: revenueAssets, usingFallback: true, message: error.message };
      }

      const assets = ((data ?? []) as unknown as RevenueAssetRow[]).map(mapAssetRow);
      return {
        assets: assets.length > 0 ? assets : revenueAssets,
        usingFallback: assets.length === 0,
        message:
          assets.length === 0
            ? "Seed examples are shown until you save your first live asset."
            : null,
      };
    },
  });

  const tasksQuery = useQuery({
    queryKey: ["revenue-os-tasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("revenue_os_tasks")
        .select("id,title,priority,due_date,source_asset_name,done,created_at")
        .eq("done", false)
        .order("due_date", { ascending: true })
        .limit(12);

      if (error) return [] as RevenueTaskRow[];
      return (data ?? []) as unknown as RevenueTaskRow[];
    },
  });

  const assets = useMemo(
    () => rankedRevenueAssets(assetsQuery.data?.assets ?? revenueAssets),
    [assetsQuery.data?.assets],
  );
  const generatedTasks = useMemo(() => generateExecutionTasks(assets, 8), [assets]);
  const persistedTasks = tasksQuery.data ?? [];
  const pipeline = assets.reduce((sum, asset) => sum + asset.targetRevenue, 0);
  const mrr = assets.reduce((sum, asset) => sum + asset.mrrPotential, 0);
  const open = creating || !!editing;

  const saveAsset = useMutation({
    mutationFn: async (asset: RevenueAssetForm) => {
      const payload = toAssetPayload(asset);
      const assetId = asset.id;
      if (isUuid(assetId)) {
        const { error } = await supabase
          .from("revenue_os_assets")
          .update(payload)
          .eq("id", assetId);
        if (error) throw error;
        return;
      }
      const { error } = await supabase.from("revenue_os_assets").insert(payload);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["revenue-os-assets"] });
      setCreating(false);
      setEditing(null);
      toast.success("Revenue asset saved");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deleteAsset = useMutation({
    mutationFn: async (asset: RevenueAsset) => {
      if (!isUuid(asset.id)) throw new Error("Save this seed asset before deleting it.");
      const { error } = await supabase.from("revenue_os_assets").delete().eq("id", asset.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["revenue-os-assets"] });
      toast.success("Revenue asset deleted");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const createTasks = useMutation({
    mutationFn: async () => {
      const today = new Date();
      const payload = generatedTasks.map((task) => {
        const dueDate = new Date(today);
        dueDate.setDate(today.getDate() + task.dueInDays);
        return {
          title: task.title,
          category: task.category,
          priority: task.priority,
          due_date: dueDate.toISOString().slice(0, 10),
          source_asset_id: isUuid(task.sourceAssetId) ? task.sourceAssetId : null,
          source_asset_name: task.sourceAsset,
          done: false,
        };
      });

      const { error } = await supabase.from("revenue_os_tasks").insert(payload);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["revenue-os-tasks"] });
      toast.success("Daily execution tasks generated");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const completeTask = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("revenue_os_tasks").update({ done: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["revenue-os-tasks"] }),
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Revenue OS"
          subtitle="Central operating system for operating assets, recurring income, and daily execution."
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => createTasks.mutate()}
            disabled={createTasks.isPending}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-ink/5 disabled:opacity-50"
          >
            <Sparkles size={16} /> Generate tasks
          </button>
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90"
          >
            <Plus size={16} /> New asset
          </button>
        </div>
      </div>

      {assetsQuery.data?.message && (
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {assetsQuery.data.message}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Tracked assets" value={assets.length} />
        <Metric label="Pipeline target" value={`GBP ${pipeline.toLocaleString()}`} />
        <Metric label="MRR potential" value={`GBP ${mrr.toLocaleString()}`} />
        <Metric label="Top score" value={`${assets[0] ? priorityScore(assets[0].scores) : 0}/35`} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl border border-ink/10 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <Rocket size={18} className="text-ink" />
            <h2 className="text-lg font-semibold text-ink">Editable operating assets</h2>
          </div>
          <div className="space-y-3">
            {assets.map((asset) => (
              <div key={asset.id} className="rounded-xl border border-ink/10 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-ink">{asset.name}</h3>
                      <StatusBadge status={asset.status.toLowerCase()} />
                    </div>
                    <p className="mt-1 text-sm text-ink-muted">
                      {asset.stream} - Owner: {asset.owner}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
                      Score {priorityScore(asset.scores)}/35
                    </div>
                    <button
                      onClick={() => setEditing(asset)}
                      className="rounded-md p-1.5 text-ink/60 hover:bg-ink/[0.05] hover:text-ink"
                      aria-label="Edit asset"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Delete this Revenue OS asset?")) deleteAsset.mutate(asset);
                      }}
                      className="rounded-md p-1.5 text-ink/60 hover:bg-rose-50 hover:text-rose-600"
                      aria-label="Delete asset"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm text-ink/75">{asset.nextAction}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink-muted">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                    GBP {asset.targetRevenue.toLocaleString()} target
                  </span>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                    GBP {asset.mrrPotential.toLocaleString()} MRR
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-ink/10 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <CheckSquare size={18} className="text-ink" />
            <h2 className="text-lg font-semibold text-ink">Generated daily tasks</h2>
          </div>
          <div className="space-y-3">
            {(persistedTasks.length > 0 ? persistedTasks : generatedTasks).map((task) =>
              "due_date" in task ? (
                <div key={task.id} className="rounded-xl bg-ink/[0.03] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-ink/70">
                      {task.priority}
                    </span>
                    <button
                      onClick={() => completeTask.mutate(task.id)}
                      className="text-[11px] font-medium text-emerald-700 hover:text-emerald-900"
                    >
                      Done
                    </button>
                  </div>
                  <p className="mt-2 text-sm font-medium text-ink">{task.title}</p>
                  <p className="mt-1 text-xs text-ink-muted">
                    From: {task.source_asset_name || "Revenue OS"} - Due {task.due_date || "soon"}
                  </p>
                </div>
              ) : (
                <div key={task.id} className="rounded-xl bg-ink/[0.03] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-ink/70">
                      {task.priority}
                    </span>
                    <span className="text-[11px] text-ink-muted">
                      Preview - due in {task.dueInDays}d
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-ink">{task.title}</p>
                  <p className="mt-1 text-xs text-ink-muted">From: {task.sourceAsset}</p>
                </div>
              ),
            )}
          </div>
        </section>
      </div>

      <section className="mt-10 rounded-2xl border border-ink/10 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <Rocket size={18} className="text-ink" />
          <h2 className="text-lg font-semibold text-ink">Revenue stream playbooks</h2>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {revenueStreamPlaybooks.map((playbook) => (
            <article key={playbook.stream} className="rounded-xl border border-ink/10 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold text-ink">{playbook.stream}</h3>
                <StatusBadge status="medium" />
              </div>
              <p className="mt-2 text-sm text-ink/75">{playbook.goal}</p>
              <div className="mt-3 rounded-lg bg-ink/[0.03] p-3 text-sm text-ink-muted">
                <span className="font-medium text-ink">Daily step:</span> {playbook.dailyStep}
              </div>
              <p className="mt-3 text-xs text-ink-muted">
                <span className="font-medium text-ink/70">Tools:</span> {playbook.tools}
              </p>
              <ul className="mt-3 space-y-1 text-xs text-ink-muted">
                {playbook.nextMilestones.map((milestone) => (
                  <li key={milestone}>- {milestone}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      {open && (
        <AssetDrawer
          asset={editing}
          saving={saveAsset.isPending}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSave={(asset) => saveAsset.mutate(asset)}
        />
      )}
    </div>
  );
}

function AssetDrawer({
  asset,
  saving,
  onClose,
  onSave,
}: {
  asset: RevenueAsset | null;
  saving: boolean;
  onClose: () => void;
  onSave: (asset: RevenueAssetForm) => void;
}) {
  const record = asset ?? {
    name: "",
    stream: "AI Automation" as RevenueStream,
    status: "Idea" as RevenueAsset["status"],
    owner: "Robbie",
    nextAction: "",
    targetRevenue: 0,
    mrrPotential: 0,
    scores: emptyScores,
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={onClose}>
      <div
        className="h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">
            {asset ? "Edit" : "New"} Revenue OS asset
          </h2>
          <button onClick={onClose} className="rounded-md p-2 text-ink/60 hover:bg-ink/[0.05]">
            <X size={16} />
          </button>
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const scores = scoreFields.reduce(
              (nextScores, field) => ({
                ...nextScores,
                [field.key]: clampScore(Number(formData.get(field.key) ?? emptyScores[field.key])),
              }),
              {} as PriorityScores,
            );

            onSave({
              id: asset?.id,
              name: String(formData.get("name") ?? "").trim(),
              stream: String(formData.get("stream") ?? "AI Automation") as RevenueStream,
              status: String(formData.get("status") ?? "Idea") as RevenueAsset["status"],
              owner: String(formData.get("owner") ?? "Robbie").trim(),
              nextAction: String(formData.get("nextAction") ?? "").trim(),
              targetRevenue: Number(formData.get("targetRevenue") ?? 0),
              mrrPotential: Number(formData.get("mrrPotential") ?? 0),
              scores,
            });
          }}
        >
          <Field label="Asset name" name="name" defaultValue={record.name} required />
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Stream"
              name="stream"
              defaultValue={record.stream}
              options={streams}
            />
            <SelectField
              label="Status"
              name="status"
              defaultValue={record.status}
              options={statuses}
            />
          </div>
          <Field label="Owner" name="owner" defaultValue={record.owner} required />
          <label className="block">
            <span className="text-[13px] font-medium text-ink">Next action</span>
            <textarea
              name="nextAction"
              required
              defaultValue={record.nextAction}
              rows={4}
              className={inputClass}
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Target revenue"
              name="targetRevenue"
              type="number"
              defaultValue={record.targetRevenue}
            />
            <Field
              label="MRR potential"
              name="mrrPotential"
              type="number"
              defaultValue={record.mrrPotential}
            />
          </div>
          <div>
            <div className="text-[13px] font-medium text-ink">Priority scorecard</div>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {scoreFields.map((field) => (
                <Field
                  key={field.key}
                  label={`${field.label} (1-5)`}
                  name={field.key}
                  type="number"
                  min={1}
                  max={5}
                  defaultValue={record.scores[field.key]}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink hover:bg-ink/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save asset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputClass =
  "mt-1.5 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-ink/40";

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  min,
  max,
}: {
  label: string;
  name: string;
  defaultValue: string | number;
  type?: string;
  required?: boolean;
  min?: number;
  max?: number;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-ink">
        {label}
        {required && <span className="text-rose-500"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        min={min}
        max={max}
        defaultValue={defaultValue}
        className={inputClass}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-ink">{label}</span>
      <select name={name} defaultValue={defaultValue} className={inputClass}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-white p-5">
      <div className="text-[12px] uppercase tracking-wider text-ink-muted">{label}</div>
      <div className="mt-3 text-3xl font-semibold text-ink">{value}</div>
    </div>
  );
}

function mapAssetRow(row: RevenueAssetRow): RevenueAsset {
  return {
    id: row.id,
    name: row.name,
    stream: row.stream,
    status: row.status,
    owner: row.owner,
    nextAction: row.next_action ?? "",
    targetRevenue: Number(row.target_revenue ?? 0),
    mrrPotential: Number(row.mrr_potential ?? 0),
    scores: { ...emptyScores, ...(row.scores ?? {}) },
  };
}

function toAssetPayload(asset: RevenueAssetForm) {
  return {
    name: asset.name,
    stream: asset.stream,
    status: asset.status,
    owner: asset.owner,
    next_action: asset.nextAction,
    target_revenue: asset.targetRevenue,
    mrr_potential: asset.mrrPotential,
    scores: asset.scores,
  };
}

function clampScore(value: number) {
  if (Number.isNaN(value)) return 3;
  return Math.min(5, Math.max(1, value));
}

function isUuid(value?: string): value is string {
  return (
    !!value &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  );
}
