import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
  const { data, isLoading } = useQuery({
    queryKey: ["agency_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("agency_settings").select("*").limit(1).maybeSingle();
      if (error) throw error;
      return data as Settings | null;
    },
  });

  const [form, setForm] = useState<Partial<Settings>>({});
  useEffect(() => { if (data) setForm(data); }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      if (!data?.id) {
        const { error } = await supabase.from("agency_settings").insert(form);
        if (error) throw error;
      } else {
        const { id, ...rest } = form;
        const { error } = await supabase.from("agency_settings").update(rest).eq("id", data.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["agency_settings"] });
      toast.success("Settings saved");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <div className="text-ink-muted">Loading…</div>;

  return (
    <div>
      <PageHeader title="Agency settings" subtitle="Public info about your agency." />
      <form
        className="mt-8 max-w-2xl space-y-4 rounded-xl border border-ink/10 bg-white p-6"
        onSubmit={(e) => { e.preventDefault(); save.mutate(); }}
      >
        <Field label="Agency name" value={form.agency_name ?? ""} onChange={(v) => setForm({ ...form, agency_name: v })} />
        <Field label="Tagline" value={form.tagline ?? ""} onChange={(v) => setForm({ ...form, tagline: v })} />
        <Field label="Contact email" type="email" value={form.contact_email ?? ""} onChange={(v) => setForm({ ...form, contact_email: v })} />
        <Field label="Contact phone" value={form.contact_phone ?? ""} onChange={(v) => setForm({ ...form, contact_phone: v })} />
        <Field label="Address" value={form.address ?? ""} onChange={(v) => setForm({ ...form, address: v })} />
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

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
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
