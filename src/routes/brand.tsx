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
      "Use the approved managed offer: £1,495 setup + £249/month care. Confirm delivery timing and terms in writing; do not promise a guaranteed launch date.",
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
        textClass: "text-hdw-midnight",
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
      <section className="relative overflow-hidden bg-hdw-midnight pt-32 pb-20 text-white md:pt-44 md:pb-28 border-b border-hdw-ivory/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(23,60,98,0.3),rgba(255,255,255,0))]" />

        <Container className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-hdw-ivory/30 bg-hdw-blue px-3.5 py-1.5 text-xs font-semibold tracking-wide text-hdw-ivory backdrop-blur-md">
            <Palette className="h-3.5 w-3.5" />
            <span>Official Brand Identity & Design Systems</span>
          </div>

          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,5.5vw,4.8rem)] font-bold tracking-tight text-white leading-[1.05]">
            Unified Brand Assets For{" "}
            <span className="text-hdw-ivory">The Harley Group Ecosystem.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-hdw-ivory/80">
            Vector logos, precise color tokens, typography scales, and commercial voice guidelines
            for The Harley Group holding company and its two operating arms.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/brand/2026-10-13/Harley-Digital-Works-Brand-Guide.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full bg-hdw-ivory px-5 py-2.5 text-sm font-bold text-hdw-midnight shadow-lg hover:bg-hdw-ivory transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download Brand Guide (PDF)</span>
            </a>
            <PillButton
              as="link"
              to="/the-harley-group"
              variant="ghost"
              size="md"
              className="border-hdw-ivory/25 text-white hover:bg-hdw-blue hover:text-white"
            >
              Group Corporate Governance
            </PillButton>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="approved-hdw-direction"
        className="bg-hdw-midnight py-10 text-white"
      >
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm text-hdw-ivory/80">
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
            <p className="mt-4 text-sm leading-relaxed text-hdw-ivory/80">
              The wordmark keeps Harley Digital Works prominent, with the group endorsement smaller.
              Use the supplied vector artwork rather than recreating the lettering. The guide and
              downloadable variants below explain how to use it consistently.
            </p>
          </div>
        </Container>
      </section>
      {/* Brand Entity Switcher & Overview */}
      <section className="py-20 bg-hdw-blue text-white border-b border-hdw-ivory/15">
        <Container>
          {/* Brand Switcher Tabs */}
          <div className="flex flex-wrap gap-3 border-b border-hdw-ivory/15 pb-6">
            {(Object.keys(BRANDS_DATA) as BrandEntity[]).map((key) => {
              const b = BRANDS_DATA[key];
              const isSelected = selectedBrand === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedBrand(key)}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-colors ${
                    isSelected
                      ? "bg-white text-hdw-midnight shadow-lg"
                      : "bg-hdw-midnight text-hdw-ivory/75 hover:text-white hover:bg-slate-800 border border-hdw-ivory/15"
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
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-mono font-semibold text-hdw-ivory">
                {brand.role}
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white">{brand.name}</h2>
              <p className="mt-1 text-sm text-hdw-ivory/75">{brand.tagline}</p>
            </div>
            <p className="max-w-md text-sm text-hdw-ivory/80 leading-relaxed">
              {brand.description}
            </p>
          </div>

          {/* Vector Logos Grid */}
          <div className="mt-12">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-hdw-ivory/75 mb-6">
              Official Vector Logos & Monograms (SVG)
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              {brand.logos.map((logo) => (
                <div
                  key={logo.title}
                  className="rounded-2xl border border-hdw-ivory/15 bg-hdw-midnight p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-hdw-ivory/75">
                      <span className="font-semibold text-white">{logo.title}</span>
                      <a
                        href={logo.path}
                        download
                        className="inline-flex items-center gap-1 text-hdw-ivory hover:text-hdw-ivory"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download SVG</span>
                      </a>
                    </div>

                    <div
                      className={`mt-4 rounded-xl p-6 border border-hdw-ivory/15 flex items-center justify-center min-h-[140px] ${logo.variant === "light" || logo.variant === "mark-light" ? "bg-hdw-ivory" : "bg-hdw-midnight"}`}
                    >
                      <BrandLogo
                        entity={brand.id}
                        variant={logo.variant}
                        imageClassName={
                          logo.variant.startsWith("mark") ? "h-16 w-16" : "h-auto w-72 max-w-full"
                        }
                      />
                    </div>

                    <p className="mt-4 text-xs text-hdw-ivory/75 leading-relaxed">
                      {logo.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] font-mono text-hdw-ivory/70">
                    Path: {logo.path}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Color Palette Tokens */}
          <div className="mt-16">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-hdw-ivory/75 mb-6">
              Primary Color Tokens & Hex Codes
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {brand.colors.map((c) => (
                <div
                  key={c.hex}
                  className="rounded-xl border border-hdw-ivory/15 bg-hdw-midnight p-4"
                >
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
                      <div className="text-[11px] text-hdw-ivory/75">{c.role}</div>
                    </div>

                    <button
                      onClick={() => handleCopyHex(c.hex)}
                      className="rounded-lg p-1.5 text-hdw-ivory/75 hover:text-white hover:bg-slate-800 transition-colors"
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
          <div className="mt-16 rounded-2xl border border-hdw-ivory/15 bg-hdw-midnight p-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-hdw-ivory">
              Tone of Voice & Editorial Principles
            </span>
            <h3 className="mt-2 text-xl font-bold text-white">
              How We Communicate As {brand.name}
            </h3>

            <div className="mt-6 space-y-3">
              {brand.voiceGuidelines.map((guide, idx) => (
                <div
                  key={guide}
                  className="flex items-start gap-3 rounded-xl bg-hdw-blue/60 p-4 border border-hdw-ivory/15"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-hdw-ivory text-hdw-midnight text-xs font-bold font-mono">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-hdw-ivory/80 leading-relaxed">{guide}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Typography System */}
      <section className="py-20 bg-hdw-ivory border-b border-ink/10">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
              Typography Hierarchy
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl font-display">
              Ratified Typography System
            </h2>
            <p className="mt-3 text-sm text-ink-muted">
              Harley Digital Works uses a sturdy British industrial typography system: Manrope for
              bold display headlines, Inter for mobile-first body copy, and DM Mono for transparent
              pricing and technical specifications.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
              <span className="text-[11px] font-mono text-[#173C62] font-bold uppercase">
                Primary Headings & Display
              </span>
              <h3 className="mt-2 text-2xl font-extrabold text-ink font-display">Manrope</h3>
              <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                Sturdy modern geometric sans with tight tracking, inspired by luxury engineering
                brands (Aston Martin, Festool). Used across all hero headings and section titles.
              </p>
            </div>

            <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
              <span className="text-[11px] font-mono text-[#173C62] font-bold uppercase">
                Body & Functional Text
              </span>
              <h3 className="mt-2 text-2xl font-medium text-ink font-sans">Inter</h3>
              <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                Clean, neutral sans-serif optimised for high legibility on mobile devices, ensuring
                tradespeople can read service packages effortlessly on site.
              </p>
            </div>

            <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
              <span className="text-[11px] font-mono text-[#173C62] font-bold uppercase">
                Technical Data & Pricing
              </span>
              <h3 className="mt-2 text-2xl font-mono font-bold text-ink">DM Mono</h3>
              <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                Precision monospaced figures for package pricing (£1,495 / £249/mo), SLAs, audit
                benchmarks, and transparent commercial breakdowns.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Social Media Brand Kit & Real-World Livery */}
      <section
        className="py-20 bg-[#081B30] text-white border-b border-white/10"
        id="social-brand-kit"
      >
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#173C62] px-3.5 py-1 text-xs font-semibold text-white font-mono">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>Ready-To-Use Marketing & Social Assets</span>
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl font-display">
                Social Media Brand Kit & Real-World Mockups
              </h2>
              <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
                High-resolution ready-to-use visual assets for WhatsApp Business, LinkedIn,
                Facebook, social share previews, print stationery, contractor workwear, and fleet
                decals.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Asset 1: WhatsApp / LinkedIn Avatar */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col justify-between shadow-xl hover:border-emerald-500/40 transition-all">
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black/40 border border-white/10">
                  <img
                    src="/brand/social/hdw-whatsapp-avatar.jpg"
                    alt="Harley Digital Works WhatsApp & LinkedIn Profile Avatar"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-md bg-black/85 backdrop-blur px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-bold">
                    1:1 · 1080×1080
                  </span>
                </div>
                <div className="mt-3.5 inline-block text-[10px] font-mono font-bold uppercase text-emerald-400">
                  Digital Identity
                </div>
                <h4 className="text-sm font-bold text-white font-display">
                  Official Monogram Avatar
                </h4>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Embossed Warm Ivory H-monogram on Midnight Navy with an active emerald indicator.
                  Optimised for WhatsApp Business, LinkedIn, and Google Business Profile.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">JPG · High-Res</span>
                <a
                  href="/brand/social/hdw-whatsapp-avatar.jpg"
                  download="HDW-WhatsApp-Avatar.jpg"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1 rounded-full transition-colors"
                >
                  <Download className="h-3 w-3" />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* Asset 2: OpenGraph Landscape Banner */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col justify-between shadow-xl hover:border-emerald-500/40 transition-all">
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/10">
                  <img
                    src="/brand/social/hdw-social-og-banner.jpg"
                    alt="Harley Digital Works OpenGraph Social Share Card"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-md bg-black/85 backdrop-blur px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-bold">
                    16:9 · 1200×630
                  </span>
                </div>
                <div className="mt-3.5 inline-block text-[10px] font-mono font-bold uppercase text-emerald-400">
                  Social Share Card
                </div>
                <h4 className="text-sm font-bold text-white font-display">
                  Social Share & OpenGraph Banner
                </h4>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  High-converting card featuring the core USP ("You do the trade. We take the
                  website headache away"), mobile mockups, trust badges, and WhatsApp CTA.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">JPG · High-Res</span>
                <a
                  href="/brand/social/hdw-social-og-banner.jpg"
                  download="HDW-Social-OG-Card.jpg"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1 rounded-full transition-colors"
                >
                  <Download className="h-3 w-3" />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* Asset 3: Desktop LinkedIn Company Profile */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col justify-between shadow-xl hover:border-emerald-500/40 transition-all">
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/10">
                  <img
                    src="/brand/social/hdw-linkedin-mockup.jpg"
                    alt="Harley Digital Works Desktop LinkedIn Company Profile Mockup"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-md bg-black/85 backdrop-blur px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-bold">
                    LinkedIn · Desktop Suite
                  </span>
                </div>
                <div className="mt-3.5 inline-block text-[10px] font-mono font-bold uppercase text-emerald-400">
                  B2B Social Authority
                </div>
                <h4 className="text-sm font-bold text-white font-display">
                  LinkedIn Profile & Banner Suite
                </h4>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Official desktop LinkedIn company profile mockup showing custom 1584×396 banner,
                  verified profile badge, and featured before/after trade transformation post.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">JPG · 1584×396</span>
                <a
                  href="/brand/social/hdw-linkedin-mockup.jpg"
                  download="HDW-LinkedIn-Profile-Mockup.jpg"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1 rounded-full transition-colors"
                >
                  <Download className="h-3 w-3" />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* Asset 4: WhatsApp Business Client Intake Flow */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col justify-between shadow-xl hover:border-emerald-500/40 transition-all">
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black/40 border border-white/10">
                  <img
                    src="/brand/social/hdw-whatsapp-chat-mockup.jpg"
                    alt="Harley Digital Works WhatsApp Business Client Intake Flow"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-md bg-black/85 backdrop-blur px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-bold">
                    WhatsApp · Direct Client Flow
                  </span>
                </div>
                <div className="mt-3.5 inline-block text-[10px] font-mono font-bold uppercase text-emerald-400">
                  Client Communications
                </div>
                <h4 className="text-sm font-bold text-white font-display">
                  WhatsApp Business Intake Flow
                </h4>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  iPhone 16 Pro real-world WhatsApp Business chat with verified badge, rapid enquiry
                  intake, transparent £1,495 breakdown, and 1-tap quick action buttons.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">JPG · Mobile Flow</span>
                <a
                  href="/brand/social/hdw-whatsapp-chat-mockup.jpg"
                  download="HDW-WhatsApp-Intake-Mockup.jpg"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1 rounded-full transition-colors"
                >
                  <Download className="h-3 w-3" />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* Asset 5: Trade Quality Guild Seal Badge */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col justify-between shadow-xl hover:border-emerald-500/40 transition-all">
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black/40 border border-white/10">
                  <img
                    src="/brand/social/hdw-guild-seal-badge.jpg"
                    alt="Harley Digital Works Trade Quality Guild Seal Badge"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-md bg-black/85 backdrop-blur px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-bold">
                    Guild Seal · Solid Brass
                  </span>
                </div>
                <div className="mt-3.5 inline-block text-[10px] font-mono font-bold uppercase text-emerald-400">
                  Trust Accreditation
                </div>
                <h4 className="text-sm font-bold text-white font-display">
                  Trade Quality Guild Seal Stamp
                </h4>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Heavy solid brass and navy enamel trade certification stamp: 'BUILT FOR BRITISH
                  TRADES · 100% DONE-FOR-YOU · ZERO HOMEWORK · BACKED BY THE HARLEY GROUP'.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">JPG · High-Res</span>
                <a
                  href="/brand/social/hdw-guild-seal-badge.jpg"
                  download="HDW-Trade-Guild-Seal.jpg"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1 rounded-full transition-colors"
                >
                  <Download className="h-3 w-3" />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* Asset 6: Contractor Softshell & Polo Uniform */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col justify-between shadow-xl hover:border-emerald-500/40 transition-all">
              <div>
                <div className="relative aspect-video sm:aspect-square rounded-xl overflow-hidden bg-black/40 border border-white/10">
                  <img
                    src="/brand/social/hdw-workwear-mockup.jpg"
                    alt="Harley Digital Works Trade Workwear Softshell Jacket & Polo Shirt"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-md bg-black/85 backdrop-blur px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-bold">
                    Workwear · Embroidered
                  </span>
                </div>
                <div className="mt-3.5 inline-block text-[10px] font-mono font-bold uppercase text-emerald-400">
                  Physical Merchandise
                </div>
                <h4 className="text-sm font-bold text-white font-display">
                  Contractor Workwear Uniform
                </h4>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Heavyweight Midnight Navy softshell jacket and polo shirt laid out on a workshop
                  bench. Precision-embroidered Warm Ivory & silver H-crest with Union Jack sleeve
                  tab.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">JPG · Print Spec</span>
                <a
                  href="/brand/social/hdw-workwear-mockup.jpg"
                  download="HDW-Trade-Workwear-Mockup.jpg"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1 rounded-full transition-colors"
                >
                  <Download className="h-3 w-3" />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* Asset 7: Luxury Stationery & Foil Business Cards */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col justify-between shadow-xl hover:border-emerald-500/40 transition-all">
              <div>
                <div className="relative aspect-video sm:aspect-square rounded-xl overflow-hidden bg-black/40 border border-white/10">
                  <img
                    src="/brand/social/hdw-stationery-mockup.jpg"
                    alt="Harley Digital Works Luxury Client Presentation & Foil Cards"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-md bg-black/85 backdrop-blur px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-bold">
                    Print · Hot Foil Stamp
                  </span>
                </div>
                <div className="mt-3.5 inline-block text-[10px] font-mono font-bold uppercase text-emerald-400">
                  Print Collateral
                </div>
                <h4 className="text-sm font-bold text-white font-display">
                  Luxury Stationery & Proposal Folder
                </h4>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Midnight Navy & silver foil business cards, presentation folder, and printed
                  client onboarding checklist laid out on a dark slate architect desk.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">JPG · Print Ready</span>
                <a
                  href="/brand/social/hdw-stationery-mockup.jpg"
                  download="HDW-Luxury-Stationery-Mockup.jpg"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1 rounded-full transition-colors"
                >
                  <Download className="h-3 w-3" />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* Asset 8: Commercial Van Decal & Livery */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col justify-between shadow-xl hover:border-emerald-500/40 transition-all">
              <div>
                <div className="relative aspect-video sm:aspect-square rounded-xl overflow-hidden bg-black/40 border border-white/10">
                  <img
                    src="/brand/social/hdw-van-livery-mockup.jpg"
                    alt="Harley Digital Works Commercial Vehicle Livery Spec"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-md bg-black/85 backdrop-blur px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-bold">
                    Fleet Livery · Transit Custom
                  </span>
                </div>
                <div className="mt-3.5 inline-block text-[10px] font-mono font-bold uppercase text-emerald-400">
                  Fleet Livery
                </div>
                <h4 className="text-sm font-bold text-white font-display">
                  Van Door Decal & Livery Mockup
                </h4>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Real-world application on a slate-grey Ford Transit Custom work van. High-contrast
                  Warm Ivory lettering: 'Website & Digital Infrastructure by Harley Digital Works ·
                  Bristol & Bath'.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">JPG · Decal Spec</span>
                <a
                  href="/brand/social/hdw-van-livery-mockup.jpg"
                  download="HDW-Van-Livery-Mockup.jpg"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1 rounded-full transition-colors"
                >
                  <Download className="h-3 w-3" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>

          {/* Ready-to-Copy Social Bios */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <h3 className="text-base font-bold text-white font-display mb-4 flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-emerald-400" />
              <span>Ready-To-Copy Social Bios & Outbound Positioning</span>
            </h3>

            <div className="grid gap-4 sm:grid-cols-3 text-xs">
              <div className="rounded-xl bg-black/30 border border-white/10 p-4 space-y-2">
                <span className="font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  LinkedIn Company Tagline
                </span>
                <p className="text-slate-200 leading-relaxed">
                  "Turnkey Websites & Digital Infrastructure for UK Trades · Done-For-You
                  Copywriting, Zero Homework · £1,495 Setup + £249/mo Care"
                </p>
              </div>

              <div className="rounded-xl bg-black/30 border border-white/10 p-4 space-y-2">
                <span className="font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  WhatsApp Business Bio
                </span>
                <p className="text-slate-200 leading-relaxed">
                  "Harley Digital Works — Websites Worth Choosing. We write 100% of the words and
                  look after your site so you can do the trade. Direct with founder Robbie Harley."
                </p>
              </div>

              <div className="rounded-xl bg-black/30 border border-white/10 p-4 space-y-2">
                <span className="font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  Instagram / Facebook Bio
                </span>
                <p className="text-slate-200 leading-relaxed">
                  "You do the trade. We take the website headache away. 🛠️ Websites & care for UK
                  contractors. 📍 Bristol, Bath & M4 Corridor."
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Founder Photography & Executive Media Kit */}
      <section className="py-20 md:py-28 bg-hdw-blue text-white border-b border-hdw-ivory/15">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-hdw-ivory/30 bg-hdw-blue px-3.5 py-1 text-xs font-semibold text-hdw-ivory font-mono">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Executive Imagery & Press Media</span>
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Dr Robbie Harley · Official Media Asset Collection
              </h2>
              <p className="mt-2 text-sm text-hdw-ivory/80 max-w-2xl leading-relaxed">
                Approved editorial and commercial portraits for press releases, partnership
                announcements, keynotes, and cross-division digital publications.
              </p>
            </div>
            <a
              href="/images/robbie/robbie-harley-master-board.jpg"
              download="Robbie-Harley-Master-Media-Board.jpg"
              className="inline-flex items-center gap-2 rounded-xl bg-hdw-ivory hover:bg-white px-4 py-2.5 text-xs font-bold text-hdw-midnight transition-colors shadow-md shrink-0"
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
                className="group rounded-2xl border border-hdw-ivory/15 bg-hdw-midnight p-4 shadow-xl flex flex-col justify-between hover:border-hdw-ivory/25 transition-colors"
              >
                <div>
                  <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-hdw-blue border border-hdw-ivory/15">
                    <img
                      src={p.src}
                      alt={`Dr Robbie Harley - ${p.name}`}
                      className="h-full w-full object-cover object-center motion-safe:group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 rounded-md bg-black/70 backdrop-blur-xs px-2 py-0.5 text-[10px] font-mono font-bold text-hdw-ivory">
                      {p.num}
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                      {p.division}
                    </span>
                    <h4 className="mt-1 text-sm font-bold text-white">{p.name}</h4>
                    <p className="mt-1 text-xs text-hdw-ivory/75 italic">&ldquo;{p.tag}&rdquo;</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-hdw-ivory/15 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-hdw-ivory/70">JPG · High-Res</span>
                  <a
                    href={p.src}
                    download={`Robbie-Harley-${p.num}-${p.name.replace(/\s+/g, "-")}.jpg`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-hdw-ivory hover:text-hdw-ivory"
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
      <section className="py-20 bg-hdw-midnight text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-hdw-ivory/30 bg-hdw-blue px-3.5 py-1 text-xs font-semibold text-hdw-ivory">
              <Sparkles className="h-3.5 w-3.5" />
              Press & Media Kit
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Need Vector Assets for Publication?
            </h2>
            <p className="mt-3 text-sm text-hdw-ivory/80 leading-relaxed">
              Download the prepared Harley Digital Works guide and SVG artwork above. Preserve the
              exact endorsement, proportions and spacing; contact us for publication guidance.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/brand/2026-10-13/Harley-Digital-Works-Brand-Guide.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-hdw-midnight hover:bg-slate-200 transition-colors shadow-lg"
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
                className="border-hdw-ivory/25 text-white hover:bg-hdw-blue hover:text-white"
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
