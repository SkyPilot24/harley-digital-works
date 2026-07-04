import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Globe,
  Sparkles,
  Zap,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { Navigation } from "@/components/site/Navigation";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THG Digital Agency — Domains. Websites. Content. Built to convert." },
      {
        name: "description",
        content:
          "Fixed-price websites, content engines and automation for community groups, solo founders and local brands. Delivered in days, not months.",
      },
      { property: "og:title", content: "THG Digital Agency — Built to convert." },
      {
        property: "og:description",
        content:
          "The lean, AI-powered digital partner for small operators who want big-brand results without the agency overhead.",
      },
    ],
  }),
  component: HomePage,
});

// ─── Data ────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    num: "01",
    icon: Globe,
    title: "The Digital Foundation",
    price: "£800 – £1,200",
    tag: "One-time",
    desc: "A fast, responsive 3-page website with basic SEO and a contact form. Built and delivered in one week. Clean, purposeful code — never drag-and-drop.",
  },
  {
    num: "02",
    icon: Sparkles,
    title: "The Content Engine",
    price: "£500",
    tag: "Per month",
    desc: "10 custom AI image prompts, 5 ready-to-use video templates, and a full 30-day social calendar. Stay consistent without burning out.",
  },
  {
    num: "03",
    icon: Zap,
    title: "The Complete Presence",
    price: "£2,000+",
    tag: "Full package",
    desc: "A 5-page website, YouTube channel setup and a custom AI prompt library built around your brand voice. Everything to show up professionally.",
  },
] as const;

const STATS = [
  { value: 40, suffix: "+", label: "Projects delivered" },
  { value: 7, suffix: "d", label: "Average delivery" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 60, suffix: "+", label: "Domains in portfolio" },
] as const;

const PROOF_POINTS = [
  "Fixed-price packages — no hourly billing surprises",
  "AI-assisted workflow means faster delivery, lower cost",
  "Plain-English communication throughout",
  "Built for small operators, not enterprise clients",
] as const;

// ─── Counter ─────────────────────────────────────────────────────────────

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const rounded = useTransform(spring, (v) => Math.floor(v).toString());

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  return (
    <span ref={ref} className="font-mono">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-thg-charcoal text-white">
      {/* Ambient gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[60vw] w-[60vw] -translate-y-1/2 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--thg-teal) 22%, transparent) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-24 h-[40vw] w-[40vw] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--thg-teal-light) 18%, transparent) 0%, transparent 70%)",
        }}
      />
      {/* Grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 40%, transparent 80%)",
        }}
      />
      {/* Top hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, var(--thg-teal) 70%, transparent) 30%, color-mix(in oklab, var(--thg-teal) 70%, transparent) 70%, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-24 pt-36 lg:grid-cols-12 lg:px-10 lg:pt-40">
        {/* Left: copy */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-thg-teal" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-thg-teal-light">
              The Harley Group · Digital &amp; Web Services
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,6vw,5.25rem)] font-extrabold leading-[1.02] tracking-tight">
            {[
              { text: "Domains.", accent: false },
              { text: "Websites.", accent: true },
              { text: "Content.", accent: false, br: true },
              { text: "Built to convert.", accent: true },
            ].map((word, i) => (
              <motion.span
                key={word.text}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.15 + i * 0.11,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="inline-block"
              >
                {word.br && <br />}
                <span className={word.accent ? "text-thg-teal-light" : "text-white"}>
                  {word.text}
                </span>
                {i < 3 && !word.br ? "\u00A0" : ""}
                {word.br ? "\u00A0" : ""}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-white/70"
          >
            The lean, AI-powered digital partner for community groups, solo
            founders and local brands. Big-brand results without the agency
            overhead — delivered in days, not months.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.05 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-md bg-thg-teal px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-thg-teal-light active:scale-[0.97]"
            >
              <Calendar size={16} />
              Book your free 15-minute call
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition-all hover:border-white/50 hover:bg-white/10 active:scale-[0.97]"
            >
              See packages &amp; pricing
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-bold text-white sm:text-4xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: floating proof card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="relative hidden lg:col-span-5 lg:block"
        >
          {/* Orb */}
          <div
            aria-hidden
            className="absolute -right-10 -top-10 h-72 w-72 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--thg-teal) 55%, transparent) 0%, transparent 70%)",
            }}
          />
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-thg-teal" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-thg-teal-light">
                Latest launch
              </span>
            </div>
            <blockquote className="mt-5 font-display text-2xl font-bold leading-snug text-white">
              &ldquo;They rebuilt our site in six days. Enquiries doubled in the
              first month.&rdquo;
            </blockquote>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-thg-teal/20 font-display text-sm font-bold text-thg-teal-light">
                SM
              </div>
              <div>
                <div className="text-sm font-medium text-white">
                  Sarah Mitchell
                </div>
                <div className="text-xs text-white/50">
                  Founder, Local Community CIC
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {[
                { k: "6d", v: "delivery" },
                { k: "2×", v: "enquiries" },
                { k: "£0", v: "surprises" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-xl font-bold text-white">
                    {s.k}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute inset-x-0 bottom-6 flex justify-center"
      >
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

// ─── Services teaser ─────────────────────────────────────────────────────

function ServicesTeaser() {
  return (
    <section className="relative bg-thg-off-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-thg-teal" />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-thg-teal">
                Services
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold leading-tight text-thg-charcoal sm:text-5xl">
              Three ways to work together.
            </h2>
            <p className="mt-4 text-lg text-thg-warm-grey">
              Fixed-price packages. Delivered in days. Priced for small
              operators, not enterprise budgets.
            </p>
          </div>
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.2em] text-thg-teal hover:text-thg-teal-dark md:self-end"
          >
            All packages
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col rounded-xl border border-thg-charcoal/10 bg-white p-8 transition-shadow hover:shadow-[0_20px_50px_-20px_rgba(13,17,23,0.15)]"
            >
              <div
                aria-hidden
                className="absolute left-0 top-8 h-12 w-0.5 origin-top scale-y-0 bg-thg-teal transition-transform duration-300 group-hover:scale-y-100"
              />
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs font-medium tracking-[0.18em] text-thg-warm-grey">
                  {s.num}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-thg-teal/10 text-thg-teal">
                  <s.icon size={20} />
                </div>
              </div>

              <h3 className="mt-8 font-display text-2xl font-bold text-thg-charcoal">
                {s.title}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-thg-warm-grey">
                {s.desc}
              </p>

              <div className="mt-8 flex items-baseline justify-between border-t border-thg-charcoal/10 pt-5">
                <div className="font-display text-2xl font-bold text-thg-charcoal">
                  {s.price}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-thg-warm-grey">
                  {s.tag}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Proof section ───────────────────────────────────────────────────────

function Proof() {
  return (
    <section className="relative border-y border-thg-charcoal/10 bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-thg-teal" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-thg-teal">
              Why THG
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight text-thg-charcoal sm:text-5xl">
            Big-brand results.
            <br />
            <span className="text-thg-teal">Without the overhead.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-thg-warm-grey">
            We work the way small operators actually need: fixed prices, short
            timelines, and plain English throughout. No account managers, no
            change-request theatre — just capable people shipping the work.
          </p>

          <div className="mt-10 border-l-2 border-thg-teal pl-6">
            <p className="font-display text-xl font-bold leading-snug text-thg-charcoal">
              &ldquo;They cut through the noise and shipped something that
              actually converts. Best money we&rsquo;ve spent this year.&rdquo;
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-thg-warm-grey">
              James O&rsquo;Connor · Independent Consultant
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="grid gap-4 sm:grid-cols-2">
            {PROOF_POINTS.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-3 rounded-lg border border-thg-charcoal/10 bg-thg-off-white/60 p-5"
              >
                <CheckCircle2
                  size={20}
                  className="mt-0.5 flex-shrink-0 text-thg-teal"
                />
                <span className="text-[15px] leading-relaxed text-thg-charcoal">
                  {p}
                </span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-8 grid gap-6 rounded-xl bg-thg-charcoal p-8 text-white sm:grid-cols-3">
            {[
              { k: "1 wk", v: "Typical build time" },
              { k: "24 h", v: "Quote turnaround" },
              { k: "30 d", v: "Post-launch support" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl font-bold">{s.k}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Primary CTA ─────────────────────────────────────────────────────────

function PrimaryCTA() {
  return (
    <section className="relative overflow-hidden bg-thg-charcoal py-28 text-white lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--thg-teal) 22%, transparent) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-start gap-10 px-6 text-left lg:items-center lg:px-10 lg:text-center">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-thg-teal" />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-thg-teal-light">
            Ready when you are
          </span>
          <span className="hidden h-px w-8 bg-thg-teal lg:block" />
        </div>

        <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          Your digital presence,
          <br />
          <span className="text-thg-teal-light">rebuilt in a week.</span>
        </h2>

        <p className="max-w-2xl text-lg leading-relaxed text-white/70">
          Book a free 15-minute call. We&rsquo;ll talk through where you are,
          what&rsquo;s not working, and what you actually need. No sales pitch,
          no pressure — you&rsquo;ll leave with a clear next step either way.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-md bg-thg-teal px-7 py-4 text-sm font-medium text-white transition-all hover:bg-thg-teal-light active:scale-[0.97]"
          >
            <Calendar size={16} />
            Book your free 15-minute call
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <a
            href="mailto:hello@thg.digital"
            className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-7 py-4 text-sm font-medium text-white transition-all hover:border-white/50 hover:bg-white/10"
          >
            hello@thg.digital
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <main className="min-h-screen bg-thg-off-white">
      <Navigation />
      <Hero />
      <ServicesTeaser />
      <Proof />
      <PrimaryCTA />
      <Footer />
    </main>
  );
}
