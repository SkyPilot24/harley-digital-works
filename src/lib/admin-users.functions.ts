import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { loadAllPages, loadAllRanges, wouldRemoveLastAdmin } from "./admin-users";

async function assertAdmin(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Response("Forbidden", { status: 403 });
}

export type AdminUserRow = {
  id: string;
  email: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  provider: string | null;
  roles: ("admin" | "user")[];
};

export const listAdminUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminUserRow[]> => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const authUsers = await loadAllPages(async (page) => {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
      return {
        items: data?.users ?? [],
        nextPage: (data as { nextPage?: number | null } | null)?.nextPage ?? null,
        error,
      };
    });

    const rolesData = await loadAllRanges<{ user_id: string; role: string }>(async (from, to) => {
      const { data, count, error } = await supabaseAdmin
        .from("user_roles")
        .select("user_id, role", { count: "exact" })
        .order("user_id")
        .order("role")
        .range(from, to);
      return { data, count, error };
    });

    const rolesByUser = new Map<string, AdminUserRow["roles"]>();
    for (const r of rolesData) {
      const arr = rolesByUser.get(r.user_id) ?? [];
      arr.push(r.role as AdminUserRow["roles"][number]);
      rolesByUser.set(r.user_id, arr);
    }

    return authUsers.map((u) => ({
      id: u.id,
      email: u.email ?? null,
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at ?? null,
      provider: (u.app_metadata?.provider as string | undefined) ?? null,
      roles: rolesByUser.get(u.id) ?? [],
    }));
  });

const roleSchema = z.object({
  user_id: z.string().uuid(),
  role: z.enum(["admin", "user"]),
});

export const grantUserRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => roleSchema.parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: data.user_id, role: data.role });
    if (error && !/duplicate key/i.test(error.message)) throw new Error(error.message);
    return { ok: true };
  });

export const revokeUserRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => roleSchema.parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (data.role === "admin") {
      const { count, error: countErr } = await supabaseAdmin
        .from("user_roles")
        .select("user_id", { count: "exact", head: true })
        .eq("role", "admin");
      if (countErr) throw new Error(countErr.message);
      if (count === null) throw new Error("Could not confirm the administrator count.");
      if (wouldRemoveLastAdmin(data.role, count)) {
        throw new Error("This is the last admin — grant admin to another user first.");
      }
    }
    const { error } = await supabaseAdmin
      .from("user_roles")
      .delete()
      .eq("user_id", data.user_id)
      .eq("role", data.role);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
