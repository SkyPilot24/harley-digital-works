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
    dark: "/brand/approved/logos/hdw-wordmark-dark.svg",
    light: "/brand/approved/logos/hdw-wordmark-light.svg",
    "mark-dark": "/brand/approved/logos/hdw-monogram-dark.svg",
    "mark-light": "/brand/approved/logos/hdw-monogram-light.svg",
  },
  group: {
    dark: "/brand/approved/logos/thg-wordmark-dark.svg",
    light: "/brand/approved/logos/thg-wordmark-light.svg",
    "mark-dark": "/brand/approved/logos/thg-monogram-dark.svg",
    "mark-light": "/brand/approved/logos/thg-monogram-light.svg",
  },
  labs: {
    dark: "/brand/approved/logos/labs-wordmark-dark.svg",
    light: "/brand/approved/logos/labs-wordmark-light.svg",
    "mark-dark": "/brand/approved/logos/labs-monogram-dark.svg",
    "mark-light": "/brand/approved/logos/labs-monogram-light.svg",
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
