import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight, ShieldCheck } from "lucide-react";
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
    <header className={scrolled ? "studio-header is-scrolled" : "studio-header"}>
      <div className="studio-header-inner">
        <Link to="/the-harley-group" className="flex items-center gap-2.5" aria-label="The Harley Group corporate home">
          <BrandLogo entity="group" variant="dark" imageClassName="h-7 w-auto" />
          <span className="hidden sm:inline-block rounded-full bg-ink/5 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink/70 border border-ink/10">
            HOLDING GROUP
          </span>
        </Link>

        <nav className="studio-desktop-nav" aria-label="Corporate navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-xs tracking-wide uppercase font-mono">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="studio-header-cta flex items-center gap-3">
          <Link
            to="/services"
            className="hidden md:inline-flex items-center gap-1 text-xs font-mono font-semibold uppercase tracking-wider text-ink/80 hover:text-ink transition-colors"
          >
            Digital Works <ArrowUpRight size={14} />
          </Link>

          <PillButton as="link" to="/contact" variant="dark" className="studio-button">
            Executive Contact
          </PillButton>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="studio-menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-group-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-group-nav" className="studio-mobile-nav" aria-label="Mobile corporate navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <hr className="border-ink/10 my-2" />
          <Link to="/services" onClick={() => setOpen(false)} className="flex items-center justify-between text-ink/80 font-mono text-sm">
            <span>Harley Digital Works</span>
            <ArrowUpRight size={16} />
          </Link>
          <Link to="/labs" onClick={() => setOpen(false)} className="flex items-center justify-between text-ink/80 font-mono text-sm">
            <span>Harley Labs</span>
            <ArrowUpRight size={16} />
          </Link>
          <div className="pt-2">
            <PillButton as="link" to="/contact" variant="dark" className="studio-button w-full justify-center">
              Executive Contact
            </PillButton>
          </div>
        </nav>
      )}
    </header>
  );
}
