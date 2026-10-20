import type { Session, SupabaseClient } from "@supabase/supabase-js";
import type { QueryClient } from "@tanstack/react-query";

export type AuthSessionState = { session: Session | null; loading: boolean; error: Error | null };
type AuthSource = Pick<SupabaseClient["auth"], "getSession" | "onAuthStateChange">;

/** Keep the failed/denied role result so removing private data cannot cause a retry loop. */
export function clearNonRoleQueries(cache: Pick<QueryClient, "removeQueries">) {
  cache.removeQueries({ predicate: (query) => query.queryKey[0] !== "is-admin" });
}

/** Observe SDK state without awaiting another SDK call inside its auth callback. */
export function observeAuthSession(
  auth: AuthSource,
  publish: (state: AuthSessionState) => void,
  clearPrivateData: () => void,
  currentUser: { current: string | null },
) {
  let alive = true;
  let revision = 0;
  const accept = (session: Session | null) => {
    if (!alive) return;
    const nextUser = session?.user.id ?? null;
    if (nextUser !== currentUser.current) clearPrivateData();
    currentUser.current = nextUser;
    publish({ session, loading: false, error: null });
  };
  publish({ session: null, loading: true, error: null });
  const { data } = auth.onAuthStateChange((_event, session) => {
    revision++;
    accept(session);
  });
  const readRevision = revision;
  Promise.resolve()
    .then(() => auth.getSession())
    .then((result) => {
      if (!alive || revision !== readRevision) return;
      if (result.error) throw result.error;
      accept(result.data.session);
    })
    .catch((error: unknown) => {
      if (!alive || revision !== readRevision) return;
      clearPrivateData();
      currentUser.current = null;
      publish({
        session: null,
        loading: false,
        error: error instanceof Error ? error : new Error("Sign-in state unavailable"),
      });
    });
  return () => {
    alive = false;
    data.subscription.unsubscribe();
  };
}

/** A failed sign-out must not claim success or retain private query data. */
export async function signOutWithPrivateCache(
  auth: Pick<SupabaseClient["auth"], "signOut">,
  cache: Pick<QueryClient, "cancelQueries" | "clear">,
) {
  try {
    await cache.cancelQueries();
  } finally {
    cache.clear();
  }
  const { error } = await auth.signOut();
  if (error) throw error;
}
