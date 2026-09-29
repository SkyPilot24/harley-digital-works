import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { recoveryTokenFromLink } from "@/lib/password-recovery";
import { PageShell, Container } from "@/components/site/PageShell";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set your password — HDW Admin" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "referrer", content: "no-referrer" },
    ],
  }),
  component: PasswordRecoveryPage,
});

const inputClass = "mt-2 w-full rounded-lg border border-ink/20 bg-white px-3 py-3 text-ink";
const buttonClass = "w-full rounded-full bg-ink px-5 py-3 text-white disabled:opacity-50";

function PasswordRecoveryPage() {
  const configured = Boolean(
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  );
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!configured) return;
    // Support a direct email callback when this origin is allowed by the backend.
    const isRecoveryCallback =
      new URLSearchParams(window.location.hash.slice(1)).get("type") === "recovery";
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session?.user.email) {
        setVerifiedEmail(session.user.email);
      }
    });
    if (isRecoveryCallback) {
      void supabase.auth.getSession().then(({ data, error }) => {
        if (error) setError("This recovery link has expired. Request a new email.");
        else if (data.session?.user.email) setVerifiedEmail(data.session.user.email);
      });
    }
    return () => data.subscription.unsubscribe();
  }, [configured]);

  async function requestEmail(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: window.location.origin + "/reset-password",
      });
      if (error) throw error;
      setMessage(
        "Recovery requested. If this account is eligible, an email will arrive shortly. Check spam too.",
      );
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not request recovery. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function verifyLink(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const token = recoveryTokenFromLink(link, import.meta.env.VITE_SUPABASE_URL);
      setLink("");
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: "recovery",
      });
      if (error) throw error;
      if (!data.session || !data.user?.email)
        throw new Error("Request a new recovery email and try again.");
      setVerifiedEmail(data.user.email);
      setMessage("");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not verify recovery. Request a new email.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function savePassword(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (password !== confirmation) {
      setError("The passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const { data: current, error: sessionError } = await supabase.auth.getUser();
      if (sessionError || current.user?.email !== verifiedEmail) {
        throw new Error(
          "Your session changed. Request a new recovery email before setting a password.",
        );
      }
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setPassword("");
      setConfirmation("");
      setComplete(true);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not save the password. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageShell>
      <section className="min-h-screen px-6 py-28">
        <Container>
          <div className="mx-auto max-w-lg space-y-6 rounded-[20px] border border-ink/10 bg-white p-8">
            <h1 className="text-2xl font-semibold text-ink">Set your admin password</h1>
            {!configured ? (
              <p>Sign-in is not configured for this deployment.</p>
            ) : complete ? (
              <>
                <p role="status">Your password has been saved for {verifiedEmail}.</p>
                <Link to="/admin" className={buttonClass + " inline-block text-center"}>
                  Continue to admin
                </Link>
              </>
            ) : verifiedEmail ? (
              <form onSubmit={savePassword} className="space-y-5">
                <p>
                  Recovery verified for <strong>{verifiedEmail}</strong>. Choose your new password.
                </p>
                <label className="block">
                  New password
                  <input
                    className={inputClass}
                    type="password"
                    autoComplete="new-password"
                    minLength={12}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </label>
                <label className="block">
                  Confirm password
                  <input
                    className={inputClass}
                    type="password"
                    autoComplete="new-password"
                    minLength={12}
                    required
                    value={confirmation}
                    onChange={(event) => setConfirmation(event.target.value)}
                  />
                </label>
                <p className="text-sm text-ink-muted">Use at least 12 characters.</p>
                <button className={buttonClass} disabled={busy}>
                  {busy ? "Saving…" : "Save password"}
                </button>
              </form>
            ) : (
              <>
                <p className="text-sm leading-6 text-ink-muted">
                  Use your existing admin email. This sets a password on the same account; it does
                  not create a new account or grant admin access.
                </p>
                <form onSubmit={requestEmail} className="space-y-4">
                  <label className="block">
                    Account email
                    <input
                      className={inputClass}
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </label>
                  <button className={buttonClass} disabled={busy}>
                    {busy ? "Please wait…" : "Send recovery email"}
                  </button>
                </form>
                <form onSubmit={verifyLink} className="space-y-4 border-t border-ink/10 pt-6">
                  <p className="text-sm leading-6 text-ink-muted">
                    For local sign-in, right-click the recovery button in the email and choose “Copy
                    link address”. Paste that link below before opening it. This avoids being
                    redirected to the hosted website.
                  </p>
                  <label className="block">
                    Recovery link from your email
                    <input
                      className={inputClass}
                      type="password"
                      autoComplete="off"
                      required
                      value={link}
                      onChange={(event) => setLink(event.target.value)}
                    />
                  </label>
                  <button className={buttonClass} disabled={busy}>
                    {busy ? "Please wait…" : "Verify recovery link"}
                  </button>
                </form>
              </>
            )}
            {message && (
              <p role="status" className="text-sm leading-6">
                {message}
              </p>
            )}
            {error && (
              <p role="alert" className="text-sm leading-6 text-red-700">
                {error}
              </p>
            )}
            <Link to="/auth" className="inline-block text-sm underline">
              Back to sign-in
            </Link>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
