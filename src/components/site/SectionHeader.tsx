import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  intro,
  align = "split",
  className,
}: {
  title: ReactNode;
  intro?: ReactNode;
  align?: "split" | "stacked";
  className?: string;
}) {
  if (align === "stacked") {
    return (
      <div className={cn("max-w-2xl", className)}>
        <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-medium tracking-tight text-ink">
          {title}
        </h2>
        {intro && <p className="mt-4 text-[17px] leading-relaxed text-ink-muted">{intro}</p>}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6 md:grid-cols-12 md:gap-10", className)}>
      <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-medium tracking-tight text-ink md:col-span-5">
        {title}
      </h2>
      {intro && (
        <p className="text-[17px] leading-relaxed text-ink-muted md:col-span-7 md:pt-2">{intro}</p>
      )}
    </div>
  );
}
