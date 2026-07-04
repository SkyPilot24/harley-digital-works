import { Link } from "@tanstack/react-router";
import { TagChip } from "./TagChip";

export function NewsCard({
  tag,
  title,
  excerpt,
  image,
  imageAlt,
  to,
}: {
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group flex h-full flex-col"
    >
      <div className="relative overflow-hidden rounded-[16px]">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute left-4 top-4">
          <TagChip tone="on-image">{tag}</TagChip>
        </div>
      </div>
      <h3 className="mt-5 text-[17px] font-medium leading-snug tracking-tight text-ink">
        {title}
      </h3>
      <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-ink-muted">
        {excerpt}
      </p>
    </Link>
  );
}
