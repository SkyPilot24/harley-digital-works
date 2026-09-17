import { cn } from "@/lib/utils";

/** Readable navigation lockup using the approved mark and live lettering. */
export function StudioWordmark({ light = false }: { light?: boolean }) {
  return (
    <span className={cn("studio-wordmark", light && "studio-wordmark--light")}>
      <img src="/brand/approved/logos/hdw-monogram-dark.svg" width="44" height="44" alt="" />
      <span>
        <strong>HARLEY</strong>
        <span>DIGITAL WORKS</span>
      </span>
    </span>
  );
}
