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

export function ImageFeatureBlock({
  image,
  imageAlt,
  tag,
  title,
  ctaLabel = "See how",
  ctaTo,
  overlaySurface = "stone",
  className,
}: {
  image: string;
  imageAlt: string;
  tag?: ReactNode;
  title: ReactNode;
  ctaLabel?: string;
  ctaTo?: string;
  overlaySurface?: Surface;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[20px]",
        className,
      )}
    >
      <div className="aspect-[4/3] w-full overflow-hidden md:aspect-[5/4]">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
        />
      </div>
      {tag && (
        <div className="absolute left-5 top-5">
          <TagChip tone="on-image">{tag}</TagChip>
        </div>
      )}
      <div
        className={cn(
          "absolute bottom-5 left-5 right-16 max-w-[80%] rounded-[16px] p-6 md:right-auto md:max-w-[72%]",
          surfaces[overlaySurface],
        )}
      >
        <p className="text-[15px] font-medium leading-snug tracking-tight text-ink">
          {title}
        </p>
        {ctaTo && (
          <div className="mt-4">
            <PillButton as="link" to={ctaTo} variant="ghost" size="sm">
              {ctaLabel}
            </PillButton>
          </div>
        )}
      </div>
    </div>
  );
}
