import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard,
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
  Globe2,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, useIsAdmin } from "@/hooks/use-auth";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

const NAV: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Control Centre", icon: LayoutDashboard, exact: true },
  { to: "/admin/revenue-os", label: "Revenue OS", icon: Rocket },
  { to: "/admin/domain-os", label: "Domain OS", icon: Globe2 },
  { to: "/admin/leads", label: "Leads", icon: Inbox },
  { to: "/admin/clients", label: "Clients", icon: Users },
  { to: "/admin/projects", label: "Projects", icon: Briefcase },
  { to: "/admin/team", label: "Team", icon: UsersRound },
  { to: "/admin/services", label: "Services", icon: FileText },
  { to: "/admin/resources", label: "Resources", icon: BookOpen },
  { to: "/admin/knowledge-base", label: "Knowledge Base", icon: BookOpen },
  { to: "/admin/playbooks", label: "Playbooks", icon: ClipboardList },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/admin/users", label: "Users & roles", icon: Shield },
  { to: "/admin/diagnostics", label: "Diagnostics", icon: Stethoscope },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const { data: isAdmin, isLoading: roleLoading } = useIsAdmin();
  const navigate = useNavigate();
  const router = useRouter();
  const qc = useQueryClient();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const currentPath = router.state.location.pathname;

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", search: { redirect: "/admin" } });
  }, [loading, user, navigate]);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [currentPath]);

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (loading || roleLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-ink-muted">
        Loading...
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
          <span
            className="text-[20px] font-extrabold leading-none tracking-tight text-ink"
            style={{ fontFamily: "var(--font-wordmark)" }}
          >
            hdw
          </span>
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
            <span
              className="text-[20px] font-extrabold leading-none tracking-tight text-ink"
              style={{ fontFamily: "var(--font-wordmark)" }}
            >
              hdw
            </span>
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
          {NAV.map((item) => {
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
            <span
              className="text-[20px] font-extrabold leading-none tracking-tight text-ink"
              style={{ fontFamily: "var(--font-wordmark)" }}
            >
              hdw
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-muted">
              admin
            </span>
          </Link>
        </div>
        <nav className="flex-1 space-y-0.5 p-3">
          {NAV.map((item) => {
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
