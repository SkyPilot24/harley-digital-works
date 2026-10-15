import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { observeAuthSession, type AuthSessionState } from "@/lib/auth-session";

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: Error | null;
  retry: () => void;
};
const AuthContext = createContext<AuthContextValue>({
  session: null,
  user: null,
  loading: true,
  error: null,
  retry: () => undefined,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthSessionState>({
    session: null,
    loading: true,
    error: null,
  });
  const [attempt, setAttempt] = useState(0);
  const currentUser = useRef<string | null>(null);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) {
      setState({ session: null, loading: false, error: null });
      return;
    }
    return observeAuthSession(supabase.auth, setState, () => queryClient.clear(), currentUser);
  }, [attempt, queryClient]);
  return (
    <AuthContext.Provider
      value={{
        ...state,
        user: state.session?.user ?? null,
        retry: () => {
          setState((value) => ({ ...value, loading: true, error: null }));
          setAttempt((value) => value + 1);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
export function useIsAdmin() {
  const { user, error: authError } = useAuth();
  return useQuery({
    queryKey: ["is-admin", user?.id],
    enabled: !!user && !authError,
    retry: 1,
    retryDelay: 1000,
    refetchInterval: 60_000,
    queryFn: async () => {
      if (!user) return false;
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) throw error;
      return !!data;
    },
  });
}
