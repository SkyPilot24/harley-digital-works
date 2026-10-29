import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { useAuth, useIsAdmin } from "@/hooks/use-auth";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "/#work", label: "Work & Transformations" },
  { href: "/#before-after", label: "Before & After" },
  { href: "/#trades-showcase", label: "Trades & Services" },
  { href: "/#why-hdw", label: "Why HDW" },
  { href: "/#packages", label: "Pricing & Care" },
  { href: "/virtual-receptionist", label: "24/7 Phone Answering" },
  { href: "/demos", label: "Live Demos" },
  { href: "/#founder", label: "Founder & FAQ" },
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
    <header
      className={`sticky top-0 z-50 w-full bg-[#f8f9ff]/95 backdrop-blur-xl transition-shadow ${
        scrolled
          ? "shadow-[0_4px_18px_rgba(8,27,48,0.08)] border-b border-[#dce9ff]"
          : "shadow-[0_1px_8px_rgba(8,27,48,0.04)] border-b border-[#e5eeff]"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="group flex flex-col text-left"
            aria-label="Harley Digital Works home"
          >
            <span className="font-display text-[20px] sm:text-[22px] font-bold uppercase leading-none tracking-[-0.02em] text-[#081B30]">
              HARLEY DIGITAL WORKS
            </span>
            <span className="mt-1 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] text-[#44474d]">
              UK TRADE CRAFT · PART OF THE HARLEY GROUP
            </span>
          </Link>
        </div>

        <nav className="hidden xl:flex items-center gap-1" aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-2.5 py-2 text-[13px] font-semibold tracking-[-0.01em] text-[#44474d] transition-colors hover:bg-[#e5eeff] hover:text-[#0b1c30]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#44474d]">
              BRISTOL HQ · DIRECT DISPATCH
            </span>
            <a
              href={`tel:${siteConfig.contactPhoneTel}`}
              className="mt-0.5 flex items-center gap-1.5 font-display text-[17px] font-bold text-[#081B30] transition-colors hover:text-[#006c49]"
              aria-label={`Call us on ${siteConfig.contactPhone}`}
            >
              <span className="rounded bg-[#dce9ff] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#0b1c30]">
                GB
              </span>
              <span>{siteConfig.contactPhone}</span>
            </a>
          </div>

          {user && isAdmin && (
            <Link
              to="/admin"
              className="rounded-lg bg-[#e5eeff] px-3 py-2 text-xs font-bold text-[#081B30] hover:bg-[#dce9ff] transition-colors"
            >
              Admin
            </Link>
          )}

          <Link
            to="/contact"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#081B30] px-5 text-[14px] font-semibold text-white shadow-[0_4px_14px_-2px_rgba(8,27,48,0.25)] transition-all hover:bg-[#0F2642]"
          >
            Get Your Website Plan{" "}
            <span className="ml-2 font-mono text-[12px] font-bold text-[#6ffbbe]">→</span>
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#dce9ff] bg-white text-[#081B30] xl:hidden cursor-pointer"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-site-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-site-nav"
          className="border-t border-[#dce9ff] bg-[#f8f9ff] px-5 py-4 shadow-xl xl:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mb-3 grid grid-cols-1 gap-2 border-b border-[#dce9ff] pb-3 sm:grid-cols-2">
            <a
              href={`tel:${siteConfig.contactPhoneTel}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#e5eeff] p-2.5 text-xs font-bold text-[#081B30] hover:bg-[#dce9ff]"
            >
              <Phone size={14} className="text-[#006c49]" />
              <span>Call {siteConfig.contactPhone}</span>
            </a>
            <a
              href={`${siteConfig.whatsappUrl}?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#6cf8bb] bg-[#6cf8bb]/25 p-2.5 text-xs font-bold text-[#005236]"
            >
              <MessageCircle size={14} className="text-[#006c49]" />
              <span>WhatsApp ({siteConfig.whatsappDisplay})</span>
            </a>
          </div>

          <div className="flex flex-col space-y-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-[#081B30] hover:bg-[#e5eeff]"
              >
                {link.label}
              </a>
            ))}
            {user && isAdmin && (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-[#081B30] hover:bg-[#e5eeff]"
              >
                Admin
              </Link>
            )}
          </div>

          <div className="mt-3 pt-2 border-t border-[#dce9ff]">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-[#081B30] text-sm font-semibold text-white"
            >
              Get Your Website Plan →
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
