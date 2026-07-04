import { ArrowLeft, ArrowRight } from "lucide-react";
import { PillButton } from "./PillButton";
import { TagChip } from "./TagChip";

export function PortraitFeature({
  tag = "Meet the team",
  title,
  quote,
  ctaLabel,
  ctaTo,
  image,
  imageAlt,
}: {
  tag?: string;
  title: string;
  quote: string;
  ctaLabel: string;
  ctaTo: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="rounded-[20px] bg-surface-stone">
      <div className="grid gap-8 p-8 md:grid-cols-12 md:gap-10 md:p-12">
        <div className="md:col-span-7">
          <TagChip tone="light">{tag}</TagChip>
          <h3 className="mt-6 text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.02] tracking-tight text-ink">
            {title}
          </h3>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PillButton as="link" to={ctaTo} variant="dark" size="md">
              {ctaLabel}
            </PillButton>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous"
                className="grid h-9 w-9 place-items-center rounded-full bg-ink text-background transition-colors hover:bg-ink/85"
              >
                <ArrowLeft size={14} />
              </button>
              <button
                type="button"
                aria-label="Next"
                className="grid h-9 w-9 place-items-center rounded-full bg-ink text-background transition-colors hover:bg-ink/85"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-5">
          <p className="mb-6 text-[15px] italic leading-relaxed text-ink-muted">
            &ldquo;{quote}&rdquo;
          </p>
          <div className="overflow-hidden rounded-[16px]">
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
