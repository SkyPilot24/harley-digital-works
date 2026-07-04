import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "light" | "dark" | "on-image";

const tones: Record<Tone, string> = {
  light: "bg-ink/[0.06] text-ink/70",
  dark: "bg-white/10 text-white/80 backdrop-blur",
  "on-image": "bg-background/85 text-ink backdrop-blur-sm",
};

export function TagChip({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
