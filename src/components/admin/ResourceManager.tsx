import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { parseResourceInput } from "@/lib/admin-resource-validation";
import { adminErrorMessage, requireRows } from "@/lib/admin-writes";
import { loadCompleteRecords } from "@/lib/admin-records";
import { toast } from "sonner";
import { Pencil, Plus, Trash2, X } from "lucide-react";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "textarea" | "number" | "select" | "url" | "date" | "checkbox";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  hideInTable?: boolean;
  render?: (value: unknown, row: Row) => React.ReactNode;
};

export type ResourceManagerProps = {
  title: string;
  table: string;
  fields: FieldDef[];
  orderBy?: { column: string; ascending?: boolean };
  emptyHint?: string;
};

type PublicTableName = keyof Database["public"]["Tables"];

type Row = Record<string, unknown> & { id: string };

export function ResourceManager({
  title,
  table,
  fields,
  orderBy,
  emptyHint,
}: ResourceManagerProps) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);

  const query = useQuery({
    queryKey: [table],
    queryFn: async () => {
      const rows = await loadCompleteRecords<Row>((after) => {
        let q = supabase
          .from(table as PublicTableName)
          .select("*", { count: "exact" })
          .order("id")
          .limit(500);
        if (after) q = q.gt("id", after);
        return q as unknown as PromiseLike<{
          data: Row[] | null;
          count: number | null;
          error: unknown;
        }>;
      });
      if (orderBy)
        rows.sort((a, b) => {
          const left = a[orderBy.column];
          const right = b[orderBy.column];
          const comparison =
            left == null
              ? right == null
                ? 0
                : 1
              : right == null
                ? -1
                : left < right
                  ? -1
                  : left > right
                    ? 1
                    : 0;
          return orderBy.ascending === true ? comparison : -comparison;
        });
      return rows;
    },
  });

  const upsertMutation = useMutation({
    mutationFn: async (payload: Partial<Row>) => {
      if (payload.id) {
        const { id, ...rest } = payload;
        const result = await supabase
          .from(table as PublicTableName)
          .update(rest as never)
          .eq("id", id)
          .select("id");
        requireRows(result, 1, "The record could not be saved.");
      } else {
        const result = await supabase
          .from(table as PublicTableName)
          .insert(payload as never)
          .select("id");
        requireRows(result, 1, "The record could not be created.");
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
      setEditing(null);
      setCreating(false);
      toast.success("Saved");
    },
    onError: (e: Error) => toast.error(adminErrorMessage(e, "The change failed.")),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const result = await supabase
        .from(table as PublicTableName)
        .delete()
        .eq("id", id)
        .select("id");
      requireRows(result, 1, "The record could not be deleted.");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
      toast.success("Deleted");
    },
    onError: (e: Error) => toast.error(adminErrorMessage(e, "The change failed.")),
  });

  const shownFields = fields.filter((f) => !f.hideInTable).slice(0, 5);
  const open = creating || !!editing;
  const record: Record<string, unknown> = editing ?? {};

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {query.isError
              ? "Records unavailable"
              : query.isPending
                ? "Loading records…"
                : `${query.data?.length ?? 0} records`}
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90"
        >
          <Plus size={16} /> New
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-ink/10 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-ink/[0.03] text-left text-[12px] uppercase tracking-wider text-ink-muted">
            <tr>
              {shownFields.map((f) => (
                <th key={f.name} className="px-4 py-3">
                  {f.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {query.isLoading && (
              <tr>
                <td
                  colSpan={shownFields.length + 1}
                  className="px-4 py-10 text-center text-ink-muted"
                >
                  Loading…
                </td>
              </tr>
            )}
            {query.isError && (
              <tr>
                <td
                  colSpan={shownFields.length + 1}
                  className="px-4 py-10 text-center"
                  role="alert"
                >
                  Records could not be loaded.{" "}
                  <button type="button" className="underline" onClick={() => query.refetch()}>
                    Try again
                  </button>
                </td>
              </tr>
            )}
            {!query.isError && query.data?.length === 0 && (
              <tr>
                <td
                  colSpan={shownFields.length + 1}
                  className="px-4 py-10 text-center text-ink-muted"
                >
                  {emptyHint ?? "No records yet. Click New to add one."}
                </td>
              </tr>
            )}
            {query.data?.map((row) => (
              <tr key={row.id} className="border-t border-ink/5 hover:bg-ink/[0.02]">
                {shownFields.map((f) => (
                  <td key={f.name} className="max-w-xs truncate px-4 py-3 text-ink/80">
                    {f.render ? f.render(row[f.name], row) : formatCell(row[f.name], f.type)}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setEditing(row)}
                    className="mr-1 rounded-md p-1.5 text-ink/60 hover:bg-ink/[0.05] hover:text-ink"
                    aria-label="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Delete this record?")) deleteMutation.mutate(row.id);
                    }}
                    className="rounded-md p-1.5 text-ink/60 hover:bg-rose-50 hover:text-rose-600"
                    aria-label="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/30"
          onClick={() => {
            setEditing(null);
            setCreating(false);
          }}
        >
          <div
            className="h-full w-full max-w-lg overflow-y-auto bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">{editing ? "Edit" : "New"} record</h2>
              <button
                onClick={() => {
                  setEditing(null);
                  setCreating(false);
                }}
                className="rounded-md p-2 text-ink/60 hover:bg-ink/[0.05]"
              >
                <X size={16} />
                <span className="sr-only">Close editor</span>
              </button>
            </div>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                try {
                  const payload = parseResourceInput(fields, Object.fromEntries(fd));
                  upsertMutation.mutate(editing ? { ...payload, id: editing.id } : payload);
                } catch (error) {
                  toast.error(adminErrorMessage(error, "Check the form."));
                }
              }}
            >
              {fields.map((f) => (
                <FieldInput key={f.name} field={f} defaultValue={record[f.name]} />
              ))}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setCreating(false);
                  }}
                  className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink hover:bg-ink/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={upsertMutation.isPending}
                  className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90 disabled:opacity-50"
                >
                  {upsertMutation.isPending ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldInput({ field, defaultValue }: { field: FieldDef; defaultValue: unknown }) {
  const base =
    "mt-1.5 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-ink/40";
  const inputDefaultValue = toInputDefaultValue(defaultValue);
  const label = (
    <span className="text-[13px] font-medium text-ink">
      {field.label}
      {field.required && <span className="text-rose-500"> *</span>}
    </span>
  );
  if (field.type === "textarea") {
    return (
      <label className="block">
        {label}
        <textarea
          name={field.name}
          required={field.required}
          defaultValue={inputDefaultValue}
          rows={4}
          className={base}
        />
      </label>
    );
  }
  if (field.type === "select") {
    return (
      <label className="block">
        {label}
        <select
          name={field.name}
          required={field.required}
          defaultValue={inputDefaultValue}
          className={base}
        >
          <option value="">— Select —</option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </label>
    );
  }
  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name={field.name}
          defaultChecked={defaultValue === true}
          className="h-4 w-4 rounded border-ink/30"
        />
        <span className="text-[13px] font-medium text-ink">{field.label}</span>
      </label>
    );
  }
  if (field.type === "number") {
    return (
      <label className="block">
        {label}
        <input
          type="number"
          name={field.name}
          required={field.required}
          defaultValue={inputDefaultValue}
          placeholder={field.placeholder}
          className={base}
        />
      </label>
    );
  }
  return (
    <label className="block">
      {label}
      <input
        type={field.type ?? "text"}
        name={field.name}
        required={field.required}
        defaultValue={inputDefaultValue}
        placeholder={field.placeholder}
        className={base}
      />
    </label>
  );
}

function toInputDefaultValue(value: unknown): string | number {
  return typeof value === "string" || typeof value === "number" ? value : "";
}

function formatCell(value: unknown, type?: string) {
  if (value == null || value === "") return <span className="text-ink-muted">—</span>;
  if (type === "checkbox" || typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "string" && value.length > 60) return value.slice(0, 60) + "…";
  return String(value);
}
