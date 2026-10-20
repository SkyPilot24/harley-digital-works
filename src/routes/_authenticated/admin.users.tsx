import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Shield, ShieldOff } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import {
  listAdminUsers,
  grantUserRole,
  revokeUserRole,
  type AdminUserRow,
} from "@/lib/admin-users.functions";
import { PageHeader } from "./admin.index";

export const Route = createFileRoute("/_authenticated/admin/users")({
  component: UsersPage,
});

function UsersPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const listFn = useServerFn(listAdminUsers);
  const grantFn = useServerFn(grantUserRole);
  const revokeFn = useServerFn(revokeUserRole);

  const users = useQuery({
    queryKey: ["admin", "users"],
    queryFn: () => listFn(),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin", "users"] });

  const grant = useMutation({
    mutationFn: (u: AdminUserRow) => grantFn({ data: { user_id: u.id, role: "admin" } }),
    onSuccess: () => {
      toast.success("Admin role granted");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const revoke = useMutation({
    mutationFn: (u: AdminUserRow) => revokeFn({ data: { user_id: u.id, role: "admin" } }),
    onSuccess: () => {
      toast.success("Admin role revoked");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <PageHeader title="Users" subtitle="Manage who can sign in and who has admin access." />

      <div className="mt-8 overflow-hidden rounded-xl border border-ink/10 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-ink/[0.03] text-left text-[12px] uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Roles</th>
              <th className="px-4 py-3">Last sign-in</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.isLoading && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-muted">
                  Loading users…
                </td>
              </tr>
            )}
            {users.error && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-rose-600">
                  {(users.error as Error).message}
                </td>
              </tr>
            )}
            {users.data?.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-muted">
                  No users yet.
                </td>
              </tr>
            )}
            {users.data?.map((u) => {
              const isAdmin = u.roles.includes("admin");
              const isSelf = u.id === user?.id;
              const busy =
                (grant.isPending && grant.variables?.id === u.id) ||
                (revoke.isPending && revoke.variables?.id === u.id);
              return (
                <tr key={u.id} className="border-t border-ink/5">
                  <td className="px-4 py-3">
                    <div className="font-medium text-ink">
                      {u.email ?? "—"}
                      {isSelf && (
                        <span className="ml-2 rounded-full bg-ink/5 px-2 py-0.5 text-[10px] font-medium text-ink-muted">
                          you
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-ink-muted">{u.id}</div>
                  </td>
                  <td className="px-4 py-3 text-ink/70 capitalize">{u.provider ?? "email"}</td>
                  <td className="px-4 py-3">
                    {u.roles.length === 0 ? (
                      <span className="text-ink-muted">—</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {u.roles.map((r) => (
                          <span
                            key={r}
                            className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${
                              r === "admin"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-neutral-100 text-neutral-600"
                            }`}
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-ink/60">
                    {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleString() : "Never"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {isAdmin ? (
                      <button
                        onClick={() => revoke.mutate(u)}
                        disabled={busy}
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 text-[12px] font-medium text-ink hover:bg-ink/5 disabled:opacity-50"
                      >
                        <ShieldOff size={13} />
                        Revoke admin
                      </button>
                    ) : (
                      <button
                        onClick={() => grant.mutate(u)}
                        disabled={busy}
                        className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[12px] font-medium text-white hover:bg-ink/90 disabled:opacity-50"
                      >
                        <Shield size={13} />
                        Grant admin
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-ink-muted">
        New sign-ups appear here automatically. Administrator access must be granted explicitly by a
        trusted operator; signing up does not grant administrator access.
      </p>
    </div>
  );
}
