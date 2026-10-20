import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { parseEmail, parsePhone, parseText } from "@/lib/admin-validation";
import { adminErrorMessage, requireRows } from "@/lib/admin-writes";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { PageHeader } from "./admin.index";

type Settings = {
  id: string;
  agency_name: string;
  tagline: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  address: string | null;
};

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const qc = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["agency_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("agency_settings").select("*").limit(2);
      if (error) throw error;
      if (data.length > 1) throw new Error("Multiple settings records require reconciliation");
      return (data[0] ?? null) as Settings | null;
    },
  });

  const [form, setForm] = useState<Partial<Settings>>({});
  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      if (isError || isLoading) throw new Error("Settings unavailable");
      const values = {
        agency_name: parseText(form.agency_name, "Agency name", { required: true })!,
        tagline: parseText(form.tagline, "Tagline"),
        contact_email: parseEmail(form.contact_email, "Contact email"),
        contact_phone: parsePhone(form.contact_phone, "Contact phone"),
        address: parseText(form.address, "Address", { max: 1000, multiline: true }),
      };
      if (!data?.id) {
        const result = await supabase.from("agency_settings").insert(values).select("id");
        requireRows(result, 1, "Settings could not be created.");
      } else {
        const result = await supabase
          .from("agency_settings")
          .update(values)
          .eq("id", data.id)
          .select("id");
        requireRows(result, 1, "Settings could not be saved.");
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["agency_settings"] });
      toast.success("Settings saved");
    },
    onError: (e: Error) => toast.error(adminErrorMessage(e, "Settings could not be saved.")),
  });

  if (isLoading) return <div className="text-ink-muted">Loading…</div>;

  if (isError)
    return (
      <div role="alert">
        Settings are unavailable. No changes can be saved.{" "}
        <button type="button" className="underline" onClick={() => refetch()}>
          Try again
        </button>
      </div>
    );

  return (
    <div>
      <PageHeader title="Agency settings" subtitle="Public info about your agency." />
      <form
        className="mt-8 max-w-2xl space-y-4 rounded-xl border border-ink/10 bg-white p-6"
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate();
        }}
      >
        <Field
          label="Agency name"
          value={form.agency_name ?? ""}
          onChange={(v) => setForm({ ...form, agency_name: v })}
        />
        <Field
          label="Tagline"
          value={form.tagline ?? ""}
          onChange={(v) => setForm({ ...form, tagline: v })}
        />
        <Field
          label="Contact email"
          type="email"
          value={form.contact_email ?? ""}
          onChange={(v) => setForm({ ...form, contact_email: v })}
        />
        <Field
          label="Contact phone"
          value={form.contact_phone ?? ""}
          onChange={(v) => setForm({ ...form, contact_phone: v })}
        />
        <Field
          label="Address"
          value={form.address ?? ""}
          onChange={(v) => setForm({ ...form, address: v })}
        />
        <button
          type="submit"
          disabled={save.isPending}
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90 disabled:opacity-50"
        >
          {save.isPending ? "Saving…" : "Save changes"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-ink">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-ink/40"
      />
    </label>
  );
}
