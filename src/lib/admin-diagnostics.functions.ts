import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  runWebsiteDiagnostics,
  toDiagnosticTaskPayload,
  type WebsiteDiagnostic,
} from "./website-diagnostics-evaluator";

export type { WebsiteDiagnostic } from "./website-diagnostics-evaluator";

import { requireAdmin } from "./require-admin.server";

export type AuthTrigger = {
  trigger_name: string;
  function_name: string;
  enabled: boolean;
  timing: string;
  event: string;
};

export type DiagnosticTaskResult = {
  created: number;
  skipped: number;
  checked: number;
  message: string;
};

export const getAuthUserTriggers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AuthTrigger[]> => {
    await requireAdmin(context.userId);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin.rpc("get_auth_user_triggers");
    if (error) throw new Error(error.message);
    return (data ?? []) as AuthTrigger[];
  });

export const getWebsiteDiagnostics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<WebsiteDiagnostic[]> => {
    await requireAdmin(context.userId);
    return runWebsiteDiagnostics();
  });

export const createWebsiteDiagnosticTasks = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: unknown) => d as WebsiteDiagnostic[] | undefined)
  .handler(async ({ context, data }): Promise<DiagnosticTaskResult> => {
    await requireAdmin(context.userId);

    const diagnostics =
      Array.isArray(data) && data.length > 0 ? data : await runWebsiteDiagnostics();
    const actionable = diagnostics.filter((check) => check.status !== "ok");
    if (actionable.length === 0) {
      return {
        created: 0,
        skipped: 0,
        checked: diagnostics.length,
        message: "No website diagnostic tasks needed.",
      };
    }

    const candidateTasks = actionable.map(toDiagnosticTaskPayload);
    const sourceNames = candidateTasks.map((task) => task.source_asset_name);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: existing, error: existingError } = await supabaseAdmin
      .from("revenue_os_tasks")
      .select("title, source_asset_name")
      .eq("done", false)
      .eq("category", "Revenue OS")
      .in("source_asset_name", sourceNames);
    if (existingError) throw new Error(existingError.message);

    const existingKeys = new Set(
      (existing ?? []).map((task) => `${task.source_asset_name}::${task.title}`),
    );
    const newTasks = candidateTasks.filter(
      (task) => !existingKeys.has(`${task.source_asset_name}::${task.title}`),
    );
    if (newTasks.length > 0) {
      const { error } = await supabaseAdmin.from("revenue_os_tasks").insert(newTasks);
      if (error) throw new Error(error.message);
    }

    const skipped = candidateTasks.length - newTasks.length;
    return {
      created: newTasks.length,
      skipped,
      checked: diagnostics.length,
      message: `Created ${newTasks.length} website diagnostic task${newTasks.length === 1 ? "" : "s"}${skipped ? `, skipped ${skipped} existing` : ""}.`,
    };
  });
