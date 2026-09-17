import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { PillButton } from "./PillButton";
import { StudioWordmark } from "./StudioWordmark";
import { useAuth, useIsAdmin } from "@/hooks/use-auth";

const links = [
  { href: "/#selected-work", label: "The work" },
  { href: "/services/web-design-development", label: "Websites" },
  { href: "/#process", label: "Our approach" },
  { href: "/#packages", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { user } = useAuth();
  const { data: isAdmin } = useIsAdmin();
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
        <Link to="/" aria-label="Harley Digital Works home">
          <StudioWordmark />
        </Link>
        <nav className="studio-desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="studio-header-cta">
          {user && isAdmin && (
            <Link to="/admin" className="text-sm">
              Admin
            </Link>
          )}
          <PillButton as="link" to="/contact" variant="dark" className="studio-button">
            Let’s talk
          </PillButton>
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="studio-menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-site-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      {open && (
        <nav id="mobile-site-nav" className="studio-mobile-nav" aria-label="Mobile navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          {user && isAdmin && (
            <Link to="/admin" onClick={() => setOpen(false)}>
              Admin
            </Link>
          )}
          <PillButton as="link" to="/contact" variant="dark" className="studio-button">
            Let’s talk about your website
          </PillButton>
        </nav>
      )}
    </header>
  );
}
