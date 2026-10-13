import { cn } from "@/lib/utils";

/** Outlined approved lockup; compact form keeps navigation lettering readable. */
export function StudioWordmark({ light = false }: { light?: boolean }) {
  return (
    <span className={cn("studio-wordmark", light && "studio-wordmark--light")}>
      <img
        src={`/brand/2026-10-13/logos/hdw-compact-${light ? "ivory" : "navy"}.svg`}
        width="176"
        height="58"
        alt="Harley Digital Works"
      />
    </span>
  );
}
