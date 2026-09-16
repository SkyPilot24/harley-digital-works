import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { FooterDark } from "./FooterDark";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-ink">
      <SiteHeader />
      <main>{children}</main>
      <FooterDark />
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
