import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export type BrandEntity = "hdw" | "group" | "labs";
export type BrandVariant = "dark" | "light" | "mark-dark" | "mark-light";

type BrandLogoProps = {
  entity?: BrandEntity;
  variant?: BrandVariant;
  className?: string;
  imageClassName?: string;
};

const LOGO_MAP: Record<BrandEntity, Record<BrandVariant, string>> = {
  hdw: {
    dark: "/brand/2026-10-21/HDW-Brand-Pack/08-Web-Ready/logo-reversed.svg",
    light: "/brand/2026-10-21/HDW-Brand-Pack/08-Web-Ready/logo.svg",
    "mark-dark": "/brand/2026-10-21/HDW-Brand-Pack/01-Logos/hdw-symbol-white.svg",
    "mark-light": "/brand/2026-10-21/HDW-Brand-Pack/01-Logos/hdw-symbol-navy.svg",
  },
  group: {
    dark: "/brand/2026-10-21/THG-Brand-Pack/08-Web-Ready/logo-reversed.svg",
    light: "/brand/2026-10-21/THG-Brand-Pack/08-Web-Ready/logo.svg",
    "mark-dark": "/brand/2026-10-21/THG-Brand-Pack/01-Logos/thg-symbol-white.svg",
    "mark-light": "/brand/2026-10-21/THG-Brand-Pack/01-Logos/thg-symbol-primary.svg",
  },
  labs: {
    dark: "/brand/2026-10-21/HL-Brand-Pack/08-Web-Ready/logo-reversed.svg",
    light: "/brand/2026-10-21/HL-Brand-Pack/08-Web-Ready/logo.svg",
    "mark-dark": "/brand/2026-10-21/HL-Brand-Pack/01-Logos/hl-symbol-white.svg",
    "mark-light": "/brand/2026-10-21/HL-Brand-Pack/01-Logos/hl-symbol-primary.svg",
  },
};

const ALT_MAP: Record<BrandEntity, string> = {
  hdw: "Harley Digital Works",
  group: "The Harley Group",
  labs: "Harley Labs",
};

export function BrandLogo({
  entity = "hdw",
  variant = "dark",
  className,
  imageClassName,
}: BrandLogoProps) {
  const src = LOGO_MAP[entity][variant] || siteConfig.brandLogoDark;
  const alt = ALT_MAP[entity] || siteConfig.name;

  return (
    <span className={cn("inline-flex items-center", className)}>
      <img src={src} alt={alt} className={cn("block h-auto max-w-full", imageClassName)} />
    </span>
  );
}
