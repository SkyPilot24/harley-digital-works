import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { BrandLogo, type BrandEntity } from "@/components/site/BrandLogo";
import {
  Palette,
  Download,
  Copy,
  Check,
  Sparkles,
  Layers,
  Type,
  FileCheck2,
  ExternalLink,
  ShieldCheck,
  Building2,
  Globe2,
  Cpu,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/brand")({
  head: () => ({
    meta: [
      { title: "Brand Assets & Design Standards | The Harley Group & Divisions" },
      {
        name: "description",
        content:
          "Official vector logos, color systems, typography standards, and brand identity guidelines for The Harley Group, Harley Digital Works, and Harley Labs.",
      },
    ],
  }),
  component: BrandAssetsPage,
});

interface BrandSpec {
  id: BrandEntity;
  name: string;
  tagline: string;
  role: string;
  description: string;
  colors: { name: string; hex: string; role: string; textClass: string }[];
  logos: {
    title: string;
    variant: "dark" | "light" | "mark-dark" | "mark-light";
    path: string;
    description: string;
  }[];
  voiceGuidelines: string[];
}

const BRANDS_DATA: Record<BrandEntity, BrandSpec> = {
  hdw: {
    id: "hdw",
    name: "Harley Digital Works",
    tagline: "Turnkey Digital Infrastructure for UK Trades",
    role: "Flagship Commercial Division",
    description:
      "Harley Digital Works delivers 100% done-for-you website design, commercial copywriting, and ongoing monthly care for UK trades and small businesses.",
    colors: [
      {
        name: "Supporting Blue",
        hex: "#173C62",
        role: "Supporting Accent",
        textClass: "text-white",
      },
      {
        name: "Midnight Navy",
        hex: "#081B30",
        role: "Primary Canvas & Typography",
        textClass: "text-white",
      },
      { name: "Slate", hex: "#526479", role: "Supporting Neutral", textClass: "text-white" },
      { name: "Warm Ivory", hex: "#F6F3ED", role: "Background & Contrast", textClass: "text-ink" },
    ],
    logos: [
      {
        title: "Full Wordmark (Dark Theme)",
        variant: "dark",
        path: "/brand/2026-10-13/logos/hdw-endorsed-ivory.svg",
        description: "Endorsed stacked wordmark in ivory for dark backgrounds.",
      },
      {
        title: "Full Wordmark (Light Theme)",
        variant: "light",
        path: "/brand/2026-10-13/logos/hdw-endorsed-navy.svg",
        description: "Endorsed stacked wordmark in navy for light documents and backgrounds.",
      },
      {
        title: "Monogram Mark (Dark)",
        variant: "mark-dark",
        path: "/brand/2026-10-13/logos/hdw-symbol-ivory.svg",
        description: "Square app icon & social avatar for dark backgrounds.",
      },
      {
        title: "Monogram Mark (Light)",
        variant: "mark-light",
        path: "/brand/2026-10-13/logos/hdw-symbol-navy.svg",
        description: "Clean square monogram for light surfaces and favicons.",
      },
    ],
    voiceGuidelines: [
      "Plain English first: Explain technical concepts in terms of revenue, booked jobs, and time saved.",
      "No homework rule: Emphasize that we write 100% of the copy and configure all DNS records.",
      "Concrete numbers over vague promises: Quote £1,495 / £2,995 pricing and 14-day SLA timelines.",
    ],
  },
  group: {
    id: "group",
    name: "The Harley Group",
    tagline: "Holding & Operating Company Governance",
    role: "Parent Holding Entity",
    description:
      "The Harley Group oversees specialised technology and commercial operating ventures under the executive leadership of Dr Robbie Harley, MBA.",
    colors: [
      {
        name: "Emerald Accent",
        hex: "#10B981",
        role: "Primary Holding Mark",
        textClass: "text-emerald-950",
      },
      {
        name: "Deep Forest",
        hex: "#0D5F48",
        role: "Institutional Dark Brand",
        textClass: "text-white",
      },
      {
        name: "Midnight Obsidian",
        hex: "#0D0D0D",
        role: "Corporate Slate",
        textClass: "text-white",
      },
      { name: "Pure Platinum", hex: "#F4F4F5", role: "Light Canvas", textClass: "text-slate-900" },
    ],
    logos: [
      {
        title: "Group Wordmark (Dark)",
        variant: "dark",
        path: "/brand/approved/logos/thg-wordmark-dark.svg",
        description: "Authoritative holding company identity for dark investor & governance decks.",
      },
      {
        title: "Group Wordmark (Light)",
        variant: "light",
        path: "/brand/approved/logos/thg-wordmark-light.svg",
        description: "Official holding logo for corporate letterheads and legal MSA disclosures.",
      },
      {
        title: "Group Monogram (Dark)",
        variant: "mark-dark",
        path: "/brand/approved/logos/thg-monogram-dark.svg",
        description: "Square corporate holding icon on obsidian background.",
      },
      {
        title: "Group Monogram (Light)",
        variant: "mark-light",
        path: "/brand/approved/logos/thg-monogram-light.svg",
        description: "Light square monogram for official stationery and legal sheets.",
      },
    ],
    voiceGuidelines: [
      "Institutional discipline: Frame capabilities with operational rigour and compliance.",
      "Executive commercial clarity: Emphasize measurable business value and transparent governance.",
      "Direct senior accountability: Authentic leadership tone from Dr Robbie Harley, MBA.",
    ],
  },
  labs: {
    id: "labs",
    name: "Harley Labs",
    tagline: "Autonomous Systems, Multi-Agent AI & Edge R&D",
    role: "Deep-Tech Product Division",
    description:
      "Harley Labs is the research incubator pioneering multi-agent orchestration, sub-50ms edge SSR architectures, and intelligent business tooling.",
    colors: [
      {
        name: "Indigo Core",
        hex: "#6366F1",
        role: "Primary Deep-Tech Accent",
        textClass: "text-indigo-950",
      },
      {
        name: "Electric Lavender",
        hex: "#818CF8",
        role: "Terminal Glow",
        textClass: "text-slate-950",
      },
      {
        name: "Cyber Obsidian",
        hex: "#0A0D14",
        role: "Deep Space Canvas",
        textClass: "text-white",
      },
      {
        name: "Ice Violet",
        hex: "#EEF2FF",
        role: "Light Lab Background",
        textClass: "text-indigo-950",
      },
    ],
    logos: [
      {
        title: "Labs Wordmark (Dark)",
        variant: "dark",
        path: "/brand/approved/logos/labs-wordmark-dark.svg",
        description: "High-tech vector wordmark for developer portals and live telemetry desks.",
      },
      {
        title: "Labs Wordmark (Light)",
        variant: "light",
        path: "/brand/approved/logos/labs-wordmark-light.svg",
        description: "Clean R&D identity for academic papers and research partnership decks.",
      },
      {
        title: "Labs Monogram (Dark)",
        variant: "mark-dark",
        path: "/brand/approved/logos/labs-monogram-dark.svg",
        description: "Cyber indigo icon for software packages and terminal consoles.",
      },
      {
        title: "Labs Monogram (Light)",
        variant: "mark-light",
        path: "/brand/approved/logos/labs-monogram-light.svg",
        description: "Light version for developer documentation and API reference.",
      },
    ],
    voiceGuidelines: [
      "Technical precision: Ground all claims in real architectural benchmarks (TTFB, isolates, agent graphs).",
      "Futuristic yet pragmatic: Emphasize practical agentic tools that solve real operational bottlenecks.",
      "High-velocity delivery: Highlight edge compilation, self-healing code, and streaming telemetry.",
    ],
  },
};

function BrandAssetsPage() {
  const [selectedBrand, setSelectedBrand] = useState<BrandEntity>("hdw");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const brand = BRANDS_DATA[selectedBrand];

  const handleCopyHex = (hex: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      toast.success(`Copied ${hex} to clipboard!`);
      setTimeout(() => setCopiedHex(null), 2000);
    }
  };

  return (
    <PageShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-20 text-white md:pt-44 md:pb-28 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(200,157,60,0.18),rgba(255,255,255,0))]" />

        <Container className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/60 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-amber-300 backdrop-blur-md">
            <Palette className="h-3.5 w-3.5" />
            <span>Official Brand Identity & Design Systems</span>
          </div>

          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,5.5vw,4.8rem)] font-bold tracking-tight text-white leading-[1.05]">
            Unified Brand Assets For{" "}
            <span className="text-amber-400">The Harley Group Ecosystem.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            Vector logos, precise color tokens, typography scales, and commercial voice guidelines
            for The Harley Group holding company and its two operating arms.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/brand/2026-10-13/Harley-Digital-Works-Brand-Guide.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg hover:bg-amber-400 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download Brand Guide (PDF)</span>
            </a>
            <PillButton
              as="link"
              to="/the-harley-group"
              variant="ghost"
              size="md"
              className="border-slate-700 text-white hover:bg-slate-900 hover:text-white"
            >
              Group Corporate Governance
            </PillButton>
          </div>
        </Container>
      </section>

      <section aria-labelledby="approved-hdw-direction" className="bg-slate-950 py-10 text-white">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm text-slate-300">
              Harley Digital Works · Approved 13 October 2026
            </p>
            <h2 id="approved-hdw-direction" className="mt-3 text-2xl font-semibold">
              Our new wordmark direction
            </h2>
            <p className="mt-4 leading-relaxed text-slate-200">
              A premium, understated wordmark in very deep midnight navy and warm ivory. Widely
              spaced HARLEY sits above DIGITAL WORKS, with a distinctive capital H and a subtle
              curved bridge. The secondary endorsement reads exactly: Part of The Harley Group.
            </p>
            <p className="mt-4 leading-relaxed text-slate-200">
              Preserve the proportions, spacing and endorsement. Keep the contrast clear; avoid
              stretching, redrawing the H or adding effects. Midnight navy is #081B30 and warm ivory
              is #F6F3ED, supported by blue #173C62 and slate #526479. The prepared vector artwork
              uses Arial-based outlined lettering and a custom H. Keep at least one H stem width of
              clear space; use a compact wordmark or symbol when the endorsement is too small to
              read.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              The wordmark keeps Harley Digital Works prominent, with the group endorsement smaller.
              Use the supplied vector artwork rather than recreating the lettering. The guide and
              downloadable variants below explain how to use it consistently.
            </p>
          </div>
        </Container>
      </section>
      {/* Brand Entity Switcher & Overview */}
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <Container>
          {/* Brand Switcher Tabs */}
          <div className="flex flex-wrap gap-3 border-b border-slate-800 pb-6">
            {(Object.keys(BRANDS_DATA) as BrandEntity[]).map((key) => {
              const b = BRANDS_DATA[key];
              const isSelected = selectedBrand === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedBrand(key)}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all ${
                    isSelected
                      ? "bg-white text-slate-950 shadow-lg scale-[1.02]"
                      : "bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  <BrandLogo entity={key} variant="mark-dark" imageClassName="h-4 w-4 rounded" />
                  <span>{b.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Brand Header */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-mono font-semibold text-amber-300">
                {brand.role}
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white">{brand.name}</h2>
              <p className="mt-1 text-sm text-slate-400">{brand.tagline}</p>
            </div>
            <p className="max-w-md text-sm text-slate-300 leading-relaxed">{brand.description}</p>
          </div>

          {/* Vector Logos Grid */}
          <div className="mt-12">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-6">
              Official Vector Logos & Monograms (SVG)
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              {brand.logos.map((logo) => (
                <div
                  key={logo.title}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-white">{logo.title}</span>
                      <a
                        href={logo.path}
                        download
                        className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download SVG</span>
                      </a>
                    </div>

                    <div
                      className={`mt-4 rounded-xl p-6 border border-slate-800/80 flex items-center justify-center min-h-[140px] ${logo.variant === "light" || logo.variant === "mark-light" ? "bg-[#F6F3ED]" : "bg-[#081B30]"}`}
                    >
                      <BrandLogo
                        entity={brand.id}
                        variant={logo.variant}
                        imageClassName={
                          logo.variant.startsWith("mark") ? "h-16 w-16" : "h-auto w-72 max-w-full"
                        }
                      />
                    </div>

                    <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                      {logo.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] font-mono text-slate-500">
                    Path: {logo.path}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Color Palette Tokens */}
          <div className="mt-16">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-6">
              Primary Color Tokens & Hex Codes
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {brand.colors.map((c) => (
                <div key={c.hex} className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <div
                    className="h-20 w-full rounded-lg shadow-inner flex items-end p-2 justify-between"
                    style={{ backgroundColor: c.hex }}
                  >
                    <span className={`text-[10px] font-mono font-bold ${c.textClass}`}>
                      {c.name}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white font-mono">{c.hex}</div>
                      <div className="text-[11px] text-slate-400">{c.role}</div>
                    </div>

                    <button
                      onClick={() => handleCopyHex(c.hex)}
                      className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Copy Hex"
                    >
                      {copiedHex === c.hex ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Voice Guidelines */}
          <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-950 p-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Tone of Voice & Editorial Principles
            </span>
            <h3 className="mt-2 text-xl font-bold text-white">
              How We Communicate As {brand.name}
            </h3>

            <div className="mt-6 space-y-3">
              {brand.voiceGuidelines.map((guide, idx) => (
                <div
                  key={guide}
                  className="flex items-start gap-3 rounded-xl bg-slate-900/60 p-4 border border-slate-800"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-slate-950 text-xs font-bold font-mono">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{guide}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Typography System */}
      <section className="py-20 bg-white border-b border-ink/10">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
              Typography Hierarchy
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Website Typography
            </h2>
            <p className="mt-3 text-sm text-ink-muted">
              These fonts describe the existing website. The new logo uses supplied Arial-based
              outlined lettering with a custom H; use the artwork rather than recreating it with
              website fonts.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-ink/10 bg-slate-50 p-6">
              <span className="text-[11px] font-mono text-emerald-700 font-bold uppercase">
                Primary Headings
              </span>
              <h3
                className="mt-2 text-2xl font-bold text-ink"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Manrope Display
              </h3>
              <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                Weights: 600 SemiBold, 700 Bold, 800 ExtraBold. Used for hero titles, section
                headlines, and price numbers.
              </p>
            </div>

            <div className="rounded-xl border border-ink/10 bg-slate-50 p-6">
              <span className="text-[11px] font-mono text-emerald-700 font-bold uppercase">
                Body & Copy
              </span>
              <h3 className="mt-2 text-2xl font-semibold text-ink">Inter / Segoe UI</h3>
              <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                Weights: 400 Regular, 500 Medium. Line height: 1.6. Clean, open apertures for
                effortless reading on mobile.
              </p>
            </div>

            <div className="rounded-xl border border-ink/10 bg-slate-50 p-6">
              <span className="text-[11px] font-mono text-emerald-700 font-bold uppercase">
                Technical Data & Code
              </span>
              <h3 className="mt-2 text-2xl font-mono font-bold text-ink">JetBrains Mono</h3>
              <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                Weights: 500 Medium, 700 Bold. Used for SLA days, pricing tokens, invoice
                references, and telemetry streams.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Founder Photography & Executive Media Kit */}
      <section className="py-20 md:py-28 bg-slate-900 text-white border-b border-slate-800">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-950/60 px-3.5 py-1 text-xs font-semibold text-amber-300 font-mono">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Executive Imagery & Press Media</span>
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Dr Robbie Harley · Official Media Asset Collection
              </h2>
              <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
                Approved editorial and commercial portraits for press releases, partnership
                announcements, keynotes, and cross-division digital publications.
              </p>
            </div>
            <a
              href="/images/robbie/robbie-harley-master-board.jpg"
              download="Robbie-Harley-Master-Media-Board.jpg"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 px-4 py-2.5 text-xs font-bold text-slate-950 transition-colors shadow-md shrink-0"
            >
              <Download className="h-4 w-4" />
              <span>Download Master Contact Sheet</span>
            </a>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: "01",
                name: "Headshot",
                tag: "Strategy. Solutions. Growth.",
                division: "The Harley Group",
                src: "/images/robbie/01-thg-headshot.jpg",
              },
              {
                num: "02",
                name: "Modern Professional",
                tag: "Websites For Busy Trades.",
                division: "Harley Digital Works",
                src: "/images/robbie/02-hdw-modern-professional.jpg",
              },
              {
                num: "03",
                name: "Cinematic Portrait",
                tag: "Bigger Thinking. Real Results.",
                division: "The Harley Group",
                src: "/images/robbie/03-thg-cinematic-portrait.jpg",
              },
              {
                num: "04",
                name: "Black & White Editorial",
                tag: "Ideas today. Solutions tomorrow.",
                division: "Harley Labs",
                src: "/images/robbie/04-labs-bw-editorial.jpg",
              },
              {
                num: "05",
                name: "Creative Leader",
                tag: "Design. Automation. Freedom.",
                division: "Harley Digital Works",
                src: "/images/robbie/05-hdw-creative-leader.jpg",
              },
              {
                num: "06",
                name: "At Work (Laptop)",
                tag: "Plan. Build. Support. Scale.",
                division: "The Harley Group",
                src: "/images/robbie/06-thg-at-work.jpg",
              },
              {
                num: "07",
                name: "Relaxed Portrait",
                tag: "Take Websites Off Your Plate.",
                division: "Harley Digital Works",
                src: "/images/robbie/07-hdw-relaxed-portrait.jpg",
              },
              {
                num: "08",
                name: "Natural Smile",
                tag: "Good Partnerships. Greater Possibilities.",
                division: "The Harley Group",
                src: "/images/robbie/08-thg-natural-smile.jpg",
              },
              {
                num: "09",
                name: "Thought Leadership",
                tag: "Curious. Practical. Forward-Thinking.",
                division: "Harley Labs",
                src: "/images/robbie/09-labs-thought-leadership.jpg",
              },
              {
                num: "10",
                name: "Website Hero",
                tag: "Digital Solutions For Real Businesses.",
                division: "The Harley Group",
                src: "/images/robbie/10-thg-website-hero.jpg",
              },
              {
                num: "11",
                name: "Environment Shot",
                tag: "More Time For What You Do Best.",
                division: "Harley Digital Works",
                src: "/images/robbie/11-hdw-environment-shot.jpg",
              },
              {
                num: "12",
                name: "Quotation Portrait",
                tag: "Great websites don't just look good, they give you more time.",
                division: "The Harley Group & HDW",
                src: "/images/robbie/12-quotation-portrait.jpg",
              },
            ].map((p) => (
              <div
                key={p.num}
                className="group rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                    <img
                      src={p.src}
                      alt={`Dr Robbie Harley - ${p.name}`}
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 rounded-md bg-black/70 backdrop-blur-xs px-2 py-0.5 text-[10px] font-mono font-bold text-amber-300">
                      {p.num}
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                      {p.division}
                    </span>
                    <h4 className="mt-1 text-sm font-bold text-white">{p.name}</h4>
                    <p className="mt-1 text-xs text-slate-400 italic">&ldquo;{p.tag}&rdquo;</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">JPG · High-Res</span>
                  <a
                    href={p.src}
                    download={`Robbie-Harley-${p.num}-${p.name.replace(/\s+/g, "-")}.jpg`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Brand Asset Download CTA */}
      <section className="py-20 bg-slate-950 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/60 px-3.5 py-1 text-xs font-semibold text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
              Press & Media Kit
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Need Vector Assets for Publication?
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Download the prepared Harley Digital Works guide and SVG artwork above. Preserve the
              exact endorsement, proportions and spacing; contact us for publication guidance.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/brand/2026-10-13/Harley-Digital-Works-Brand-Guide.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-slate-200 transition-colors shadow-lg"
              >
                <Download className="h-4 w-4" />
                <span>Download Brand Guide</span>
              </a>
              <PillButton
                as="link"
                to="/contact"
                search={{
                  service: undefined,
                  package: undefined,
                  domain: undefined,
                  websiteUrl: undefined,
                }}
                variant="ghost"
                size="md"
                className="border-slate-700 text-white hover:bg-slate-900 hover:text-white"
              >
                Contact Press & Brand Desk
              </PillButton>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
