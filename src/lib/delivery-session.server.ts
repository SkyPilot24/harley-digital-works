import type { SupabaseClient } from "@supabase/supabase-js";

// Only pass claims from the signature-verifying Auth middleware.
export async function requireDeliverySession(
  db: Pick<SupabaseClient, "rpc">,
  userId: string,
  claims: { session_id?: unknown },
) {
  const sessionId = claims.session_id;
  if (
    typeof sessionId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(sessionId)
  )
    throw new Response("Unauthorized", { status: 401 });
  const { data, error } = await db.rpc("delivery_session_active", {
    p_user_id: userId,
    p_session_id: sessionId,
  });
  if (error) throw new Response("Session verification unavailable", { status: 503 });
  if (data !== true) throw new Response("Unauthorized", { status: 401 });
  return sessionId;
}
