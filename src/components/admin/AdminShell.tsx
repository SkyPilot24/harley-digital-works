import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import {
  LayoutDashboard,
  Inbox,
  Users,
  Briefcase,
  UsersRound,
  FileText,
  BookOpen,
  MessageSquareQuote,
  Settings,
  LogOut,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, useIsAdmin } from "@/hooks/use-auth";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

const NAV: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/leads", label: "Leads", icon: Inbox },
  { to: "/admin/clients", label: "Clients", icon: Users },
  { to: "/admin/projects", label: "Projects", icon: Briefcase },
  { to: "/admin/team", label: "Team", icon: UsersRound },
  { to: "/admin/services", label: "Services", icon: FileText },
  { to: "/admin/resources", label: "Resources", icon: BookOpen },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const { data: isAdmin, isLoading: roleLoading } = useIsAdmin();
  const navigate = useNavigate();
  const router = useRouter();
  const qc = useQueryClient();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", search: { redirect: "/admin" } });
  }, [loading, user, navigate]);

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (loading || roleLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-ink-muted">
        Loading…
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
            Your account ({user.email}) is signed in but doesn&rsquo;t have admin access.
            Ask an existing admin to grant your account the admin role.
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

  const currentPath = router.state.location.pathname;

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-ink/10 bg-white md:flex">
        <div className="border-b border-ink/10 px-6 py-5">
          <Link to="/" className="flex items-baseline gap-1.5">
            <span
              className="text-[20px] font-extrabold leading-none tracking-tight text-ink"
              style={{ fontFamily: "var(--font-wordmark)" }}
            >
              thg
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-muted">
              admin
            </span>
          </Link>
        </div>
        <nav className="flex-1 space-y-0.5 p-3">
          {NAV.map((item) => {
            const active = item.exact
              ? currentPath === item.to
              : currentPath.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to as "/admin"}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                  active
                    ? "bg-ink text-white"
                    : "text-ink/70 hover:bg-ink/[0.05] hover:text-ink",
                )}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
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
        <div className="mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-10">{children}</div>
      </main>
    </div>
  );
}
