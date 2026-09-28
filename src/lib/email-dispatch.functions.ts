import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { dispatchAuthorizedEmail, emailDispatchSchema } from "@/lib/email-delivery";
export { emailDispatchSchema } from "@/lib/email-delivery";
export type { EmailDispatchInput } from "@/lib/email-delivery";

export const dispatchTransactionalEmail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => emailDispatchSchema.parse(input))
  .handler(async ({ data, context }) =>
    dispatchAuthorizedEmail(data, {
      authorize: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: role, error } = await supabaseAdmin
          .from("user_roles")
          .select("role")
          .eq("user_id", context.userId)
          .eq("role", "admin")
          .maybeSingle();
        if (error || !role) throw new Response("Forbidden", { status: 403 });
      },
      enabled: process.env.TRANSACTIONAL_EMAIL_ENABLED === "true",
      apiKey: process.env.RESEND_API_KEY,
      senderEmail: process.env.TRANSACTIONAL_SENDER_EMAIL,
      fetch,
    }),
  );
