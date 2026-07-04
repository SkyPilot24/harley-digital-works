import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { PillButton } from "./PillButton";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/services", label: "Services" },
  { to: "/domains", label: "Domains" },
  { to: "/about", label: "About" },
  { to: "/resources", label: "Resources" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        <Link to="/" className="flex items-baseline gap-1.5">
          <span
            className="text-[22px] font-extrabold leading-none tracking-tight text-ink"
            style={{ fontFamily: "var(--font-wordmark)" }}
          >
            thg
          </span>
          <span className="hidden text-[10px] font-mono uppercase tracking-[0.22em] text-ink-muted sm:inline">
            digital
          </span>
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

        <div className="hidden md:block">
          <PillButton as="link" to="/contact" variant="dark" size="sm">
            Contact us
          </PillButton>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-ink md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-background md:hidden">
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
                Contact us
              </PillButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
