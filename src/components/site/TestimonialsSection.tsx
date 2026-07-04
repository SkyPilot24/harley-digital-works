import { motion } from "framer-motion";
import { Container } from "@/components/site/PageShell";
import { SectionHeader } from "@/components/site/SectionHeader";
import { usePublishedTestimonials } from "@/hooks/use-cms";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const },
};

export function TestimonialsSection() {
  const { data } = usePublishedTestimonials();
  if (!data || data.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <motion.div {...fadeUp}>
          <SectionHeader title="In their words" align="stacked" />
        </motion.div>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {data.map((t) => (
            <figure
              key={t.id}
              className="flex h-full flex-col rounded-[20px] bg-surface-cream p-8 md:p-10"
            >
              <blockquote className="text-[18px] leading-relaxed tracking-tight text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-6">
                {t.avatar_url ? (
                  <img
                    src={t.avatar_url}
                    alt={t.author_name}
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-ink/10" aria-hidden />
                )}
                <div className="text-[14px]">
                  <div className="font-medium text-ink">{t.author_name}</div>
                  {(t.author_title || t.company) && (
                    <div className="text-ink-muted">
                      {[t.author_title, t.company].filter(Boolean).join(" · ")}
                    </div>
                  )}
                </div>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
