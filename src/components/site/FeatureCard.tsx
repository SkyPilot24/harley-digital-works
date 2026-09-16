import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PillButton } from "./PillButton";
import { TagChip } from "./TagChip";

type Surface = "sage" | "stone" | "mist" | "cream";

const surfaces: Record<Surface, string> = {
  sage: "bg-surface-sage",
  stone: "bg-surface-stone",
  mist: "bg-surface-mist",
  cream: "bg-surface-cream",
};

export function FeatureCard({
  tag,
  title,
  body,
  ctaLabel = "See how",
  ctaTo,
  surface = "sage",
  className,
  compact = false,
}: {
  tag?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  ctaLabel?: string;
  ctaTo?: string;
  surface?: Surface;
  className?: string;
  compact?: boolean;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-[20px] transition-all duration-300",
        "hover:-translate-y-0.5",
        surfaces[surface],
        compact ? "p-6" : "p-7 md:p-8",
        className,
      )}
    >
      {tag && (
        <div className="mb-4">
          <TagChip tone="light">{tag}</TagChip>
        </div>
      )}
      <h3 className="text-[20px] font-medium leading-snug tracking-tight text-ink">{title}</h3>
      {body && <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-muted">{body}</p>}
      {ctaTo && (
        <div className="mt-6">
          <PillButton as="link" to={ctaTo} variant="ghost" size="sm">
            {ctaLabel}
          </PillButton>
        </div>
      )}
    </article>
  );
}
