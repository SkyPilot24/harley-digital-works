import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import {
  getAuthUserTriggers,
  type AuthTrigger,
} from "@/lib/admin-diagnostics.functions";
import { PageHeader } from "./admin.index";

const BOOTSTRAP_TRIGGER = "on_auth_user_created_bootstrap";
const BOOTSTRAP_FUNCTION = "public.handle_new_user_bootstrap";

export const Route = createFileRoute("/_authenticated/admin/diagnostics")({
  component: DiagnosticsPage,
});

function DiagnosticsPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(getAuthUserTriggers);
  const q = useQuery({
    queryKey: ["admin", "auth-triggers"],
    queryFn: () => listFn(),
  });

  const triggers = q.data ?? [];
  const bootstrap = triggers.find(
    (t) => t.trigger_name === BOOTSTRAP_TRIGGER && t.function_name === BOOTSTRAP_FUNCTION,
  );
  const bootstrapOk = !!bootstrap && bootstrap.enabled;

  return (
    <div>
      <PageHeader
        title="Diagnostics"
        subtitle="Verify database triggers powering auth and role bootstrapping."
        action={
          <button
            onClick={() => qc.invalidateQueries({ queryKey: ["admin", "auth-triggers"] })}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-1.5 text-[12px] font-medium text-ink hover:bg-ink/5"
          >
            <RefreshCw size={13} />
            Refresh
          </button>
        }
      />

      <section className="mt-8">
        <div
          className={`flex items-start gap-4 rounded-xl border p-5 ${
            bootstrapOk
              ? "border-emerald-200 bg-emerald-50/60"
              : "border-rose-200 bg-rose-50/60"
          }`}
        >
          <div className={bootstrapOk ? "text-emerald-600" : "text-rose-600"}>
            {bootstrapOk ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
          </div>
          <div className="flex-1">
            <h2 className="text-[15px] font-semibold text-ink">
              First-signup admin bootstrap trigger
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              {bootstrapOk
                ? "Enabled. The first user to sign up while no admin exists will be promoted to admin automatically."
                : bootstrap
                ? "Trigger exists but is disabled. New signups will not be promoted."
                : "Not attached. New signups will not be promoted — an admin must grant the role manually."}
            </p>
            <dl className="mt-3 grid grid-cols-1 gap-1 text-[12px] text-ink-muted sm:grid-cols-2">
              <div>
                <dt className="inline font-medium text-ink/70">Trigger:</dt>{" "}
                <dd className="inline font-mono">{BOOTSTRAP_TRIGGER}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-ink/70">Function:</dt>{" "}
                <dd className="inline font-mono">{BOOTSTRAP_FUNCTION}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-ink/70">Table:</dt>{" "}
                <dd className="inline font-mono">auth.users</dd>
              </div>
              <div>
                <dt className="inline font-medium text-ink/70">Fires:</dt>{" "}
                <dd className="inline font-mono">AFTER INSERT</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-muted">
          All triggers on auth.users
        </h2>
        <div className="overflow-hidden rounded-xl border border-ink/10 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-ink/[0.03] text-left text-[12px] uppercase tracking-wider text-ink-muted">
              <tr>
                <th className="px-4 py-3">Trigger</th>
                <th className="px-4 py-3">Function</th>
                <th className="px-4 py-3">Timing</th>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {q.isLoading && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-ink-muted">
                    Loading…
                  </td>
                </tr>
              )}
              {q.error && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-rose-600">
                    {(q.error as Error).message}
                  </td>
                </tr>
              )}
              {!q.isLoading && triggers.length === 0 && !q.error && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-ink-muted">
                    No user-defined triggers on auth.users.
                  </td>
                </tr>
              )}
              {triggers.map((t: AuthTrigger) => (
                <tr key={t.trigger_name} className="border-t border-ink/5">
                  <td className="px-4 py-3 font-mono text-[12px] text-ink">
                    {t.trigger_name}
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px] text-ink/70">
                    {t.function_name}
                  </td>
                  <td className="px-4 py-3 text-ink/70">{t.timing}</td>
                  <td className="px-4 py-3 text-ink/70">{t.event}</td>
                  <td className="px-4 py-3">
                    {t.enabled ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                        <CheckCircle2 size={11} /> Enabled
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700">
                        <XCircle size={11} /> Disabled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
