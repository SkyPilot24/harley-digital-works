import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight, ShieldCheck, Building2, FlaskConical } from "lucide-react";
import { PillButton } from "./PillButton";
import { BrandLogo } from "./BrandLogo";

const navLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#divisions", label: "Portfolio" },
  { href: "#operations", label: "Operations" },
  { href: "#investment", label: "Investment" },
  { href: "#governance", label: "Governance" },
  { href: "#news", label: "Updates" },
];

export function HarleyGroupHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const path = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f7f5ef]/95 backdrop-blur-md border-b border-slate-900/10 shadow-xs py-1"
          : "bg-[#f7f5ef] border-b border-slate-900/5 py-2"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-4 md:gap-8">
        {/* Brand & Entity Lockup */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/the-harley-group"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-emerald-600/40 rounded-lg p-1 transition-opacity hover:opacity-95"
            aria-label="The Harley Group corporate home"
          >
            <BrandLogo entity="group" variant="light" imageClassName="h-8 sm:h-9 w-auto transition-transform group-hover:scale-[1.01]" />
          </Link>
          <div className="h-5 w-px bg-slate-900/15 hidden sm:block" />
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-950/5 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-800 border border-emerald-800/20 shadow-2xs whitespace-nowrap">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
            HOLDING GROUP
          </span>
        </div>

        {/* Corporate Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Corporate navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-mono font-semibold uppercase tracking-widest text-slate-700 hover:text-emerald-700 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-emerald-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Group Switcher & Executive CTA */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {/* Quick Group Network Links */}
          <div className="flex items-center gap-2 pr-2 border-r border-slate-900/10">
            <Link
              to="/services"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-900/5 transition-colors"
              title="Harley Digital Works"
            >
              <Building2 className="h-3.5 w-3.5 text-amber-700" />
              <span>Digital Works</span>
              <ArrowUpRight className="h-3 w-3 opacity-60" />
            </Link>

            <Link
              to="/labs"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-900/5 transition-colors"
              title="Harley Labs"
            >
              <FlaskConical className="h-3.5 w-3.5 text-indigo-600" />
              <span>Harley Labs</span>
              <ArrowUpRight className="h-3 w-3 opacity-60" />
            </Link>
          </div>

          <PillButton as="link" to="/contact" variant="dark" className="studio-button text-xs font-mono tracking-wider shadow-xs">
            Executive Contact
          </PillButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="lg:hidden p-2 text-slate-800 hover:bg-slate-900/5 rounded-lg transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-group-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav id="mobile-group-nav" className="lg:hidden bg-[#f7f5ef] border-b border-slate-900/10 px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-900/10">
              <span className="font-mono text-xs font-bold uppercase text-slate-400 tracking-wider">Navigation</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/5 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-emerald-800 border border-emerald-800/20">
                HOLDING GROUP
              </span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-slate-800 hover:text-emerald-700 py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-slate-900/10">
            <span className="font-mono text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Group Entities</span>
            <Link
              to="/services"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/5 text-slate-800 font-mono text-xs hover:bg-slate-900/10 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-amber-700" />
                Harley Digital Works
              </span>
              <ArrowUpRight size={16} />
            </Link>

            <Link
              to="/labs"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/5 text-slate-800 font-mono text-xs hover:bg-slate-900/10 transition-colors"
            >
              <span className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-indigo-600" />
                Harley Labs
              </span>
              <ArrowUpRight size={16} />
            </Link>

            <div className="pt-3">
              <PillButton as="link" to="/contact" variant="dark" className="studio-button w-full justify-center">
                Executive Contact
              </PillButton>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

