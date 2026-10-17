import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { FooterDark } from "./FooterDark";
import { FloatingWhatsAppDesk } from "./FloatingWhatsAppDesk";
import { ExitIntentModal } from "./ExitIntentModal";

export function PageShell({
  children,
  quiet = true,
  header,
  footer,
  brand = "hdw",
  whatsapp = brand === "hdw",
}: {
  children: ReactNode;
  quiet?: boolean;
  header?: ReactNode | null;
  footer?: ReactNode | null;
  brand?: "hdw" | "group" | "labs";
  whatsapp?: boolean;
}) {
  return (
    <div
      data-brand={brand}
      className={`min-h-screen bg-background text-ink relative ${brand === "labs" ? "" : "family-marketing"} ${brand === "hdw" ? "hdw-marketing" : ""}`}
    >
      <a className="site-skip-link" href="#main-content">
        Skip to content
      </a>
      {header !== undefined ? header : <SiteHeader />}
      <main id="main-content">{children}</main>
      {footer !== undefined ? footer : <FooterDark />}
      {whatsapp && <div className="whatsapp-clearance" aria-hidden="true" />}
      {whatsapp && <FloatingWhatsAppDesk />}
      {!quiet && <ExitIntentModal />}
    </div>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto max-w-[1240px] px-6 md:px-10 ${className}`}>{children}</div>;
}
