import { createFileRoute, redirect, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { PageShell, Container } from "@/components/site/PageShell";
import { toast } from "sonner";

const searchSchema = z.object({ redirect: z.string().optional() });
const supabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  beforeLoad: async ({ search }) => {
    if (typeof window === "undefined") return;
    if (!supabaseConfigured) return;
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: search.redirect ?? "/admin" });
  },
  head: () => ({
    meta: [{ title: "Sign in — HDW Admin" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const search = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabaseConfigured) return;

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        router.invalidate();
        navigate({ to: (search.redirect as "/admin") ?? "/admin", replace: true });
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, router, search.redirect]);

  if (!supabaseConfigured) {
    return (
      <PageShell>
        <section className="flex min-h-screen items-center justify-center px-6 py-24">
          <Container>
            <div className="mx-auto max-w-md rounded-[20px] border border-ink/10 bg-white p-8 text-center md:p-10">
              <h1 className="text-2xl font-semibold text-ink">Admin sign-in is unavailable</h1>
              <p className="mt-3 text-sm leading-6 text-ink-muted">
                The website is online, but its secure admin connection has not been configured for
                this deployment.
              </p>
              <a
                href="/"
                className="mt-6 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white"
              >
                Return to the website
              </a>
            </div>
          </Container>
        </section>
      </PageShell>
    );
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Check your inbox to confirm your email.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin + "/auth",
      });
      if (result.error) throw result.error;
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed");
      setBusy(false);
    }
  }

  return (
    <PageShell>
      <section className="flex min-h-screen items-center justify-center px-6 py-24">
        <Container>
          <div className="mx-auto max-w-md rounded-[20px] border border-ink/10 bg-white p-8 md:p-10">
            <h1
              className="text-ink"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                fontSize: "1.75rem",
              }}
            >
              {mode === "signin" ? "Sign in to admin" : "Create an admin account"}
            </h1>
            <p className="mt-2 text-sm text-ink-muted">
              Access the Harley Digital Works agency dashboard.
            </p>

            <button
              type="button"
              onClick={handleGoogle}
              disabled={busy}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-ink/[0.03] disabled:opacity-50"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="my-6 flex items-center gap-3 text-xs text-ink-muted">
              <div className="h-px flex-1 bg-ink/10" />
              or
              <div className="h-px flex-1 bg-ink/10" />
            </div>

            <form onSubmit={handleEmail} className="space-y-4">
              <label className="block">
                <span className="text-[13px] font-medium text-ink">Email</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-ink/40"
                />
              </label>
              <label className="block">
                <span className="text-[13px] font-medium text-ink">Password</span>
                <input
                  type="password"
                  required
                  minLength={8}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-ink/40"
                />
              </label>
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ink/90 disabled:opacity-50"
              >
                {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-ink-muted">
              {mode === "signin" ? (
                <>
                  New here?{" "}
                  <button
                    className="font-medium text-ink underline underline-offset-4"
                    onClick={() => setMode("signup")}
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    className="font-medium text-ink underline underline-offset-4"
                    onClick={() => setMode("signin")}
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.12A6.99 6.99 0 015.48 12c0-.74.13-1.45.36-2.12V7.04H2.18A11 11 0 001 12c0 1.78.43 3.46 1.18 4.96l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}
