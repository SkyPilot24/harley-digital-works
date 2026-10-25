import { createFileRoute, redirect, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { PageShell, Container } from "@/components/site/PageShell";
import { toast } from "sonner";
import { safeAuthRedirect } from "@/lib/auth-redirect";
import { useAuth } from "@/hooks/use-auth";

const searchSchema = z.object({ redirect: z.unknown().optional().transform(safeAuthRedirect) });
const googleSignInEnabled = import.meta.env.VITE_GOOGLE_AUTH_ENABLED === "true";
const supabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  beforeLoad: async ({ search }) => {
    if (typeof window === "undefined") return;
    if (!supabaseConfigured) return;
    const result = await supabase.auth.getSession().catch(() => null);
    if (result && !result.error && result.data.session)
      throw redirect({ to: search.redirect ?? "/admin" });
  },
  head: () => ({
    meta: [
      { title: "Sign in — Harley Digital Works" },
      { name: "robots", content: "noindex, nofollow" },
    ],
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
  const [formError, setFormError] = useState<string | null>(null);
  const [formNotice, setFormNotice] = useState<string | null>(null);
  const [localSignIn, setLocalSignIn] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const { error: sessionError, retry: retrySession } = useAuth();

  useEffect(() => {
    setInteractive(true);
    setLocalSignIn(["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname));
  }, []);

  useEffect(() => {
    if (!supabaseConfigured) return;

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        // Let Supabase release its Auth lock before route guards query the session.
        window.setTimeout(() => {
          router.invalidate();
          navigate({ to: (search.redirect as "/admin") ?? "/admin", replace: true });
        }, 0);
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
    const fields = new FormData(e.currentTarget as HTMLFormElement);
    const enteredEmail = String(fields.get("email") ?? "").trim();
    const enteredPassword = String(fields.get("password") ?? "");
    setFormError(null);
    setFormNotice(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: enteredEmail,
          password: enteredPassword,
          options: { emailRedirectTo: window.location.origin + search.redirect },
        });
        if (error) throw error;
        toast.success("Check your inbox to confirm your email.");
        setFormNotice(
          "Check your inbox to confirm your email. Creating an account does not grant administrator access.",
        );
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: enteredEmail,
          password: enteredPassword,
        });
        if (error) throw error;
        if (!data.session) throw new Error("Sign-in did not return a session. Please try again.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sign in failed. Please try again.";
      setFormError(message);
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    if (!googleSignInEnabled) return;
    if (["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname)) {
      toast.error(
        "Google sign-in is unavailable locally. Email sign-in requires an account password.",
      );
      return;
    }
    setBusy(true);
    try {
      const result = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            window.location.origin + "/auth?redirect=" + encodeURIComponent(search.redirect),
        },
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
              {mode === "signin" ? "Sign in" : "Create an account"}
            </h1>
            <p className="mt-2 text-sm text-ink-muted">
              {search.redirect.startsWith("/client-review/")
                ? "Use the account invited to review your project."
                : "Access the Harley Digital Works agency dashboard."}
            </p>

            <button
              type="button"
              onClick={handleGoogle}
              disabled={!interactive || busy || localSignIn || !googleSignInEnabled}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-ink/[0.03] disabled:opacity-50"
            >
              <GoogleIcon />
              Continue with Google
            </button>
            {(localSignIn || !googleSignInEnabled) && (
              <p className="mt-3 text-sm leading-6 text-ink-muted">
                Google sign-in is currently unavailable. Email sign-in requires a password
                configured on your account. Creating another account will not grant admin access.
              </p>
            )}

            <div className="my-6 flex items-center gap-3 text-xs text-ink-muted">
              <div className="h-px flex-1 bg-ink/10" />
              or
              <div className="h-px flex-1 bg-ink/10" />
            </div>

            <form method="post" onSubmit={handleEmail} className="space-y-4">
              {sessionError && (
                <p role="alert" className="text-sm text-ink-muted">
                  Your existing sign-in could not be checked.{" "}
                  <button type="button" className="underline" onClick={retrySession}>
                    Retry sign-in check
                  </button>
                </p>
              )}
              <noscript>
                <p className="text-sm text-ink-muted">Enable JavaScript to sign in securely.</p>
              </noscript>
              <label className="block">
                <span className="text-[13px] font-medium text-ink">Email</span>
                <input
                  name="email"
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
                  name="password"
                  type="password"
                  required
                  minLength={mode === "signup" ? 8 : undefined}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-ink/40"
                />
              </label>
              {formError && (
                <p role="alert" className="text-sm text-red-700">
                  {formError}
                </p>
              )}
              {formNotice && (
                <p role="status" className="text-sm text-ink-muted">
                  {formNotice}
                </p>
              )}
              <button
                type="submit"
                disabled={!interactive || busy}
                className="w-full rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ink/90 disabled:opacity-50"
              >
                {!interactive
                  ? "Loading sign-in…"
                  : busy
                    ? "Please wait…"
                    : mode === "signin"
                      ? "Sign in"
                      : "Create account"}
              </button>
            </form>

            <a
              href="/reset-password"
              className="mt-5 block text-center text-sm font-medium text-ink underline underline-offset-4"
            >
              Set or reset your password
            </a>

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
