import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AuthTrigger = {
  trigger_name: string;
  function_name: string;
  enabled: boolean;
  timing: string;
  event: string;
};

export const getAuthUserTriggers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AuthTrigger[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: role, error: roleErr } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (roleErr) throw new Error(roleErr.message);
    if (!role) throw new Response("Forbidden", { status: 403 });

    const { data, error } = await supabaseAdmin.rpc("get_auth_user_triggers");
    if (error) throw new Error(error.message);
    return (data ?? []) as AuthTrigger[];
  });
