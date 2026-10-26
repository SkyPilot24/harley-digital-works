import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { PillButton } from "./PillButton";
import { StudioWordmark } from "./StudioWordmark";
import { useAuth, useIsAdmin } from "@/hooks/use-auth";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "/work", label: "Work & Transformations" },
  { href: "/services/web-design-development", label: "Websites" },
  { href: "/virtual-receptionist", label: "24/7 Phone Answering" },
  { href: "/demos", label: "Live Demos" },
  { href: "/#packages", label: "Build & care" },
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
          <a
            href={`tel:${siteConfig.contactPhoneTel}`}
            className="hidden xl:inline-flex items-center gap-2 text-sm font-semibold text-ink/85 hover:text-ink transition-colors px-3 py-1.5 rounded-lg hover:bg-ink/5"
            aria-label={`Call us on ${siteConfig.contactPhone}`}
          >
            <Phone size={14} className="text-gold-500" />
            <span>{siteConfig.contactPhone}</span>
          </a>
          {user && isAdmin && (
            <Link to="/admin" className="text-sm font-medium hover:text-ink transition-colors">
              Admin
            </Link>
          )}
          <PillButton as="link" to="/contact" variant="dark" className="studio-button">
            Get your website plan
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
          <div className="flex flex-col gap-2 pt-2 pb-3 border-b border-ink/10">
            <a
              href={`tel:${siteConfig.contactPhoneTel}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-ink/5 hover:bg-ink/10 p-2.5 text-xs font-bold text-ink"
              aria-label={`Call ${siteConfig.contactPhone}`}
            >
              <Phone size={14} className="text-gold-600" />
              <span>Call {siteConfig.contactPhone}</span>
            </a>
            <a
              href={`${siteConfig.whatsappUrl}?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 p-2.5 text-xs font-bold text-emerald-900 border border-emerald-200"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={14} className="text-emerald-600" />
              <span>Chat on WhatsApp ({siteConfig.whatsappDisplay})</span>
            </a>
          </div>
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
          <PillButton as="link" to="/contact" variant="dark" className="studio-button mt-1">
            Get your website plan
          </PillButton>
        </nav>
      )}
    </header>
  );
}
