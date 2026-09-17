import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { FooterDark } from "./FooterDark";
import { FloatingWhatsAppDesk } from "./FloatingWhatsAppDesk";
import { ExitIntentModal } from "./ExitIntentModal";

export function PageShell({
  children,
  quiet = false,
  header,
  footer,
}: {
  children: ReactNode;
  quiet?: boolean;
  header?: ReactNode | null;
  footer?: ReactNode | null;
}) {
  return (
    <div className="min-h-screen bg-background text-ink relative">
      {header !== undefined ? header : <SiteHeader />}
      <main>{children}</main>
      {footer !== undefined ? footer : <FooterDark />}
      {!quiet && <FloatingWhatsAppDesk />}
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
