import { Link } from "@tanstack/react-router";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "dark" | "light";
type Size = "sm" | "md";

const base =
  "group inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-thg-teal-dark",
  ghost:
    "bg-transparent text-ink border border-ink/15 hover:border-ink/40 hover:bg-ink/[0.03]",
  dark:
    "bg-ink text-background hover:bg-ink/85",
  light:
    "bg-background text-ink hover:bg-background/85",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-5 py-2.5 text-sm",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className"> & {
    as?: "button";
  };

type AnchorProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, "children" | "className"> & {
    as: "a";
    href: string;
  };

type LinkProps = CommonProps & {
  as: "link";
  to: string;
};

export type PillButtonProps = ButtonProps | AnchorProps | LinkProps;

export function PillButton(props: PillButtonProps) {
  const { variant = "primary", size = "md", arrow = true, children, className } = props;
  const cls = cn(base, variants[variant], sizes[size], className);

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          size={size === "sm" ? 14 : 16}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if ("as" in props && props.as === "link") {
    return (
      <Link to={props.to} className={cls}>
        {content}
      </Link>
    );
  }
  if ("as" in props && props.as === "a") {
    const { as: _as, href, ...rest } = props;
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  }
  const { as: _as, variant: _v, size: _s, arrow: _a, children: _c, className: _cn, ...rest } =
    props as ButtonProps;
  return (
    <button className={cls} {...rest}>
      {content}
    </button>
  );
}
