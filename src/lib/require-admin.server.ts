/**
 * Shared admin authorization helper for server functions.
 * Verifies that the given authenticated user has the 'admin' role in public.user_roles.
 * Throws a Response with status 403 if the user is not an admin.
 */

type MinimalRoleClient = {
  from: (table: string) => {
    select: (cols: string) => {
      eq: (
        col1: string,
        val1: string,
      ) => {
        eq: (
          col2: string,
          val2: string,
        ) => {
          maybeSingle: () => Promise<{
            data: { role: string } | null;
            error: { message: string } | null;
          }>;
        };
      };
    };
  };
};

export async function requireAdmin(userId: string, client?: MinimalRoleClient): Promise<void> {
  let db = client;
  if (!db) {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    db = supabaseAdmin as unknown as MinimalRoleClient;
  }

  const { data, error } = await db
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Response("Forbidden", { status: 403 });
  }
}

export const assertAdmin = requireAdmin;
