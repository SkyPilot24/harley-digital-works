import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
export function HarleyGroupHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);
  const links = [
    ["#digital-works", "What we do"],
    ["#approach", "Our approach"],
    ["#contact", "Get in touch"],
  ];
  return (
    <header className="studio-header">
      <div className="studio-header-inner">
        <a href="/the-harley-group" className="group-wordmark" aria-label="The Harley Group home">
          THE HARLEY GROUP<span>INDEPENDENT THINKING. PRACTICAL PROGRESS.</span>
        </a>
        <nav className="studio-desktop-nav" aria-label="Group navigation">
          {links.map(([h, t]) => (
            <a href={h} key={h}>
              {t}
            </a>
          ))}
        </nav>
        <a className="group-header-link" href="https://harleydigitalworks.com">
          Digital Works ↗
        </a>
        <button
          className="studio-menu-toggle"
          ref={toggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-controls="group-mobile-nav"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="group-mobile-nav"
          className="studio-mobile-nav"
          aria-label="Group mobile navigation"
        >
          {links.map(([h, t]) => (
            <a href={h} key={h} onClick={() => setOpen(false)}>
              {t}
            </a>
          ))}
          <a href="https://harleydigitalworks.com">Harley Digital Works ↗</a>
        </nav>
      )}
    </header>
  );
}
