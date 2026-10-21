import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  grantRole,
  loadAllPages,
  loadAllRanges,
  revokeRole,
  roleErrorMessage,
  type RoleDb,
} from "./admin-users";
import { assertAdmin } from "./require-admin.server";

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
    try {
      await grantRole(supabaseAdmin as unknown as RoleDb, data.user_id, data.role);
    } catch (err) {
      throw new Error(roleErrorMessage(err, "The role could not be granted."));
    }
    return { ok: true };
  });

export const revokeUserRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => roleSchema.parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    try {
      await revokeRole(supabaseAdmin as unknown as RoleDb, data.user_id, data.role);
    } catch (err) {
      throw new Error(roleErrorMessage(err, "The role could not be revoked."));
    }
    return { ok: true };
  });
