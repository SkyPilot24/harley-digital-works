import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Building2,
  Globe,
  Rocket,
  Inbox,
  Users,
  Briefcase,
  UsersRound,
  FileText,
  BookOpen,
  ClipboardList,
  MessageSquareQuote,
  Settings,
  Shield,
  Stethoscope,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, useIsAdmin } from "@/hooks/use-auth";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { signOutWithPrivateCache, clearNonRoleQueries } from "@/lib/auth-session";

const PRIMARY_NAV: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] =
  [
    { to: "/admin", label: "Control Centre", icon: LayoutDashboard, exact: true },
    { to: "/admin/headquarters", label: "Group Headquarters", icon: Building2 },
    { to: "/admin/domain-portfolio", label: "Domain Portfolio", icon: Globe },
    { to: "/admin/leads", label: "Pipeline & Leads", icon: Inbox },
    { to: "/admin/clients", label: "Clients & Care", icon: Users },
    { to: "/admin/projects", label: "Projects & Delivery", icon: Briefcase },
    { to: "/admin/invoices", label: "Finance & Invoices", icon: FileText },
    { to: "/admin/diagnostics", label: "Automations & Health", icon: Stethoscope },
    { to: "/admin/revenue-os", label: "Strategy & Playbooks", icon: Rocket },
    { to: "/admin/settings", label: "Agency Settings", icon: Settings },
  ];

const SECONDARY_NAV: { to: string; label: string; icon: typeof LayoutDashboard }[] = [
  { to: "/admin/playbooks", label: "Delivery Playbook", icon: ClipboardList },
  { to: "/admin/knowledge-base", label: "Knowledge Base", icon: BookOpen },
  { to: "/admin/users", label: "Users & Roles", icon: Shield },
  { to: "/admin/team", label: "Team Members", icon: UsersRound },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const { user, loading, error: authError, retry: retryAuth } = useAuth();
  const {
    data: isAdmin,
    isLoading: roleLoading,
    isError: roleError,
    refetch: retryRole,
  } = useIsAdmin();
  const navigate = useNavigate();
  const router = useRouter();
  const qc = useQueryClient();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState(false);
  const currentPath = router.state.location.pathname;

  useEffect(() => {
    if (!loading && !user && !authError)
      navigate({ to: "/auth", search: { redirect: currentPath }, replace: true });
  }, [loading, user, authError, currentPath, navigate]);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (roleError || isAdmin === false) clearNonRoleQueries(qc);
  }, [roleError, isAdmin, qc]);

  async function signOut() {
    setSigningOut(true);
    setSignOutError(false);
    try {
      await signOutWithPrivateCache(supabase.auth, qc);
      navigate({ to: "/auth", replace: true });
    } catch {
      setSignOutError(true);
    } finally {
      setSigningOut(false);
    }
  }

  if (authError || roleError || signOutError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div
          className="max-w-md rounded-2xl border border-ink/10 bg-white p-8 text-center"
          role="alert"
        >
          <h1 className="text-xl font-semibold text-ink">
            {signOutError
              ? "Sign-out could not be confirmed"
              : authError
                ? "Sign-in check unavailable"
                : "Permissions could not be checked"}
          </h1>
          <p className="mt-3 text-sm text-ink-muted">
            {signOutError
              ? "Private data has been cleared from this view. Retry sign-out before leaving this device."
              : "Private business information remains hidden. Retry the check to continue."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {!signOutError && (
              <button
                type="button"
                className="rounded-full border border-ink/15 px-4 py-2 text-sm"
                onClick={() => (authError ? retryAuth() : void retryRole())}
              >
                {authError ? "Retry sign-in check" : "Retry permissions"}
              </button>
            )}
            <button
              type="button"
              disabled={signingOut}
              className="rounded-full bg-ink px-4 py-2 text-sm text-white disabled:opacity-50"
              onClick={signOut}
            >
              {signingOut ? "Signing out…" : signOutError ? "Retry sign-out" : "Sign out"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading || roleLoading || signingOut) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-ink-muted">
        {signingOut ? "Signing out…" : "Checking access…"}
      </div>
    );
  }

  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-md rounded-2xl border border-ink/10 bg-white p-8 text-center">
          <h1 className="text-xl font-semibold text-ink">Access denied</h1>
          <p className="mt-2 text-sm text-ink-muted">
            Your account ({user.email}) is signed in but doesn&rsquo;t have admin access. Ask an
            existing admin to grant your account the admin role.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={signOut}
              className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink hover:bg-ink/5"
            >
              Sign out
            </button>
            <Link
              to="/"
              className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90"
            >
              Back to site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ink/10 bg-white px-4 md:hidden">
        <Link to="/" className="flex items-baseline gap-1.5">
          <img
            src="/brand/2026-10-13/logos/hdw-compact-navy.svg"
            alt="Harley Digital Works"
            className="h-auto w-32"
          />
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-muted">
            admin
          </span>
        </Link>
        <button
          onClick={() => setMobileNavOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-ink/10 text-ink hover:bg-ink/5"
          aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileNavOpen}
        >
          {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-xs md:hidden"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-xl transition-transform duration-200 ease-in-out md:hidden",
          mobileNavOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-ink/10 px-6">
          <Link to="/" className="flex items-baseline gap-1.5">
            <img
              src="/brand/2026-10-13/logos/hdw-compact-navy.svg"
              alt="Harley Digital Works"
              className="h-auto w-32"
            />
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-muted">
              admin
            </span>
          </Link>
          <button
            onClick={() => setMobileNavOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-muted hover:bg-ink/5 hover:text-ink"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {PRIMARY_NAV.map((item) => {
              const active = item.exact ? currentPath === item.to : currentPath.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to as "/admin"}
                  onClick={() => setMobileNavOpen(false)}
                  className={cn(
                    "flex min-h-[44px] items-center gap-3 rounded-lg px-3.5 py-2.5 text-[14px] font-medium transition-colors",
                    active ? "bg-ink text-white" : "text-ink/70 hover:bg-ink/[0.05] hover:text-ink",
                  )}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 mt-4 border-t border-ink/10">
            <span className="px-3.5 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
              Reference & Records
            </span>
            <div className="mt-2 space-y-1">
              {SECONDARY_NAV.map((item) => {
                const active = currentPath.startsWith(item.to);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to as "/admin"}
                    onClick={() => setMobileNavOpen(false)}
                    className={cn(
                      "flex min-h-[40px] items-center gap-3 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors",
                      active
                        ? "bg-ink/10 text-ink font-semibold"
                        : "text-ink/60 hover:bg-ink/[0.05] hover:text-ink",
                    )}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
        <div className="border-t border-ink/10 p-4">
          <div className="mb-3 px-3 text-[12px] text-ink-muted truncate">{user.email}</div>
          <button
            onClick={signOut}
            className="flex min-h-[44px] w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-[14px] font-medium text-ink/70 hover:bg-ink/[0.05] hover:text-ink"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-ink/10 bg-white md:flex">
        <div className="border-b border-ink/10 px-6 py-5">
          <Link to="/" className="flex items-baseline gap-1.5">
            <img
              src="/brand/2026-10-13/logos/hdw-compact-navy.svg"
              alt="Harley Digital Works"
              className="h-auto w-32"
            />
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-muted">
              admin
            </span>
          </Link>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          <div className="space-y-0.5">
            {PRIMARY_NAV.map((item) => {
              const active = item.exact ? currentPath === item.to : currentPath.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to as "/admin"}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                    active ? "bg-ink text-white" : "text-ink/70 hover:bg-ink/[0.05] hover:text-ink",
                  )}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 mt-3 border-t border-ink/10">
            <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
              Reference & Records
            </span>
            <div className="mt-1 space-y-0.5">
              {SECONDARY_NAV.map((item) => {
                const active = currentPath.startsWith(item.to);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to as "/admin"}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors",
                      active
                        ? "bg-ink/10 text-ink font-semibold"
                        : "text-ink/60 hover:bg-ink/[0.05] hover:text-ink",
                    )}
                  >
                    <Icon size={14} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
        <div className="border-t border-ink/10 p-3">
          <div className="mb-2 px-3 text-[11px] text-ink-muted truncate">{user.email}</div>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-ink/70 hover:bg-ink/[0.05] hover:text-ink"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>
      <main className="md:pl-60">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 md:px-10 md:py-10">{children}</div>
      </main>
    </div>
  );
}
