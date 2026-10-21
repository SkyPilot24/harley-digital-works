import { cn } from "@/lib/utils";

/** Outlined approved lockup; compact form keeps navigation lettering readable. */
export function StudioWordmark({ light = false }: { light?: boolean }) {
  return (
    <span className={cn("studio-wordmark", light && "studio-wordmark--light")}>
      <img
        src={`/brand/2026-10-21/HDW-Brand-Pack/01-Logos/hdw-compact-${light ? "white" : "navy"}.svg`}
        width="146"
        height="54"
        alt="Harley Digital Works"
        className="h-[52px] w-auto block transition-transform duration-200 hover:scale-[1.02]"
      />
    </span>
  );
}
