import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "dark" | "light" | "mark-dark" | "mark-light";
  className?: string;
  imageClassName?: string;
};

const logoSrc = {
  dark: siteConfig.brandLogoDark,
  light: siteConfig.brandLogoLight,
  "mark-dark": siteConfig.brandMarkDark,
  "mark-light": siteConfig.brandMarkLight,
} as const;

export function BrandLogo({ variant = "dark", className, imageClassName }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <img
        src={logoSrc[variant]}
        alt={siteConfig.name}
        className={cn("block h-auto max-w-full", imageClassName)}
      />
    </span>
  );
}
