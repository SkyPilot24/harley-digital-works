import { createFileRoute } from "@tanstack/react-router";
import { handleChatLead } from "@/lib/chat-lead-handler";

export const Route = createFileRoute("/api/chat/lead-capture")({
  server: {
    handlers: {
      POST: ({ request }) =>
        handleChatLead(request, {
          serverUrl: process.env.SUPABASE_URL,
          browserUrl: import.meta.env.VITE_SUPABASE_URL,
          save: async (args) => {
            const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
            return supabaseAdmin.rpc("submit_public_lead", args);
          },
        }),
    },
  },
});
