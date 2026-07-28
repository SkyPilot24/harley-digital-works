import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { PillButton } from "./PillButton";
import { cn } from "@/lib/utils";
import { useAuth, useIsAdmin } from "@/hooks/use-auth";

import { BrandLogo } from "./BrandLogo";

const LINKS = [
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { data: isAdmin } = useIsAdmin();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-ink/[0.08] bg-background/85 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-6 md:px-10">
        <Link to="/" className="flex items-center">
          <BrandLogo variant="dark" imageClassName="h-6 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[13px] font-medium text-ink/70 transition-colors hover:text-ink"
              activeProps={{ className: "text-ink" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user && isAdmin && (
            <Link
              to="/admin"
              className="text-[13px] font-medium text-ink/70 transition-colors hover:text-ink"
            >
              Admin
            </Link>
          )}
          <PillButton as="link" to="/contact" variant="dark" size="sm">
            Start a project
          </PillButton>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-site-nav"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-ink md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div id="mobile-site-nav" className="border-t border-ink/10 bg-background md:hidden">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-1 px-6 py-4">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-[15px] font-medium text-ink/80 hover:bg-ink/[0.04] hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 px-2">
              <PillButton as="link" to="/contact" variant="dark" size="sm">
                Start a project
              </PillButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
