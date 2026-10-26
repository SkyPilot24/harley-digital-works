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
    tagline: "Your website and enquiries, looked after.",
    role: "Flagship Commercial Division",
    description:
      "We write, build and run your website and enquiry form, so customers can reach you and you can get on with the job. Websites. Enquiry systems. Digital care.",
    colors: [
      {
        name: "Midnight Navy",
        hex: "#152B42",
        role: "Primary Canvas & Typography",
        textClass: "text-white",
      },
      {
        name: "Warm Ivory",
        hex: "#F5F1E8",
        role: "Background & Canvas",
        textClass: "text-ink",
      },
      {
        name: "Action Blue",
        hex: "#356DCC",
        role: "Brand Accent",
        textClass: "text-white",
      },
      { name: "Slate", hex: "#526479", role: "Supporting Neutral", textClass: "text-white" },
    ],
    logos: [
      {
        title: "Full Wordmark (Light Canvas)",
        variant: "light",
        path: "/brand/2026-10-21/HDW-Brand-Pack/08-Web-Ready/logo.svg",
        description:
          "Heritage double-ring primary lockup in navy on light canvas, endorsed with 'Part of The Harley Group'.",
      },
      {
        title: "Full Wordmark (Dark Canvas)",
        variant: "dark",
        path: "/brand/2026-10-21/HDW-Brand-Pack/08-Web-Ready/logo-reversed.svg",
        description: "Reversed double-ring lockup in ivory on dark documents and backgrounds.",
      },
      {
        title: "Monogram Symbol (Light)",
        variant: "mark-light",
        path: "/brand/2026-10-21/HDW-Brand-Pack/01-Logos/hdw-symbol-navy.svg",
        description: "Heritage ring icon for light surfaces, avatars, and favicons.",
      },
      {
        title: "Monogram Symbol (Dark)",
        variant: "mark-dark",
        path: "/brand/2026-10-21/HDW-Brand-Pack/01-Logos/hdw-symbol-white.svg",
        description: "Heritage ring icon in white for dark surfaces and mobile app badges.",
      },
    ],
    voiceGuidelines: [
      "Plain English first: Explain technical concepts by their commercial return: revenue, booked jobs, and time saved.",
      "No homework rule: Emphasize that we write 100% of the copy and look after website and enquiry systems.",
      "Approved commercial offer: £1,495 setup + £249/month care. 'Your website and enquiries, looked after.' is our core customer promise.",
    ],
  },
  group: {
    id: "group",
    name: "The Harley Group",
    tagline: "Practical ambition. Lasting value.",
    role: "Parent Identity across Group Portfolio",
    description:
      "The Harley Group brings Harley Digital Works, Harley Labs and the domain portfolio under one parent identity. Distinct activities, with a shared direction.",
    colors: [
      {
        name: "Charcoal Obsidian",
        hex: "#202326",
        role: "Primary Holding Canvas",
        textClass: "text-white",
      },
      {
        name: "Warm Ivory",
        hex: "#F3EFE7",
        role: "Light Background Canvas",
        textClass: "text-ink",
      },
      {
        name: "Champagne Accent",
        hex: "#B7A17A",
        role: "Group Architectural Accent",
        textClass: "text-slate-900",
      },
    ],
    logos: [
      {
        title: "Group Primary Wordmark",
        variant: "light",
        path: "/brand/2026-10-21/THG-Brand-Pack/08-Web-Ready/logo.svg",
        description: "Architectural H wordmark in charcoal on light canvas (Georgia Bold).",
      },
      {
        title: "Group Reversed Wordmark",
        variant: "dark",
        path: "/brand/2026-10-21/THG-Brand-Pack/08-Web-Ready/logo-reversed.svg",
        description: "Architectural H wordmark in warm ivory for dark corporate decks.",
      },
      {
        title: "Group Monogram (Light)",
        variant: "mark-light",
        path: "/brand/2026-10-21/THG-Brand-Pack/01-Logos/thg-symbol-primary.svg",
        description: "Architectural H monogram in charcoal on light backgrounds.",
      },
      {
        title: "Group Monogram (Dark)",
        variant: "mark-dark",
        path: "/brand/2026-10-21/THG-Brand-Pack/01-Logos/thg-symbol-white.svg",
        description: "Architectural H monogram in white for dark surfaces.",
      },
    ],
    voiceGuidelines: [
      "Practical ambition. Lasting value: Frame capabilities with operational rigour and compliance.",
      "Clear parent identity: THG oversees HDW, Harley Labs and the domain portfolio under one parent identity. Revival Fellowship is outside this commercial brand family.",
      "Direct founder accountability: Authentic leadership tone from founder Robbie Harley.",
    ],
  },
  labs: {
    id: "labs",
    name: "Harley Labs",
    tagline: "Ideas into working systems.",
    role: "Automation, Prototypes & Digital Products",
    description:
      "Harley Labs explores practical automation, prototypes and new digital products. Part of The Harley Group, with an emphasis on building, testing and learning.",
    colors: [
      {
        name: "Graphite Canvas",
        hex: "#171C23",
        role: "Primary Deep-Tech Canvas",
        textClass: "text-white",
      },
      {
        name: "Cool White",
        hex: "#EEF3F7",
        role: "Light Lab Background",
        textClass: "text-slate-950",
      },
      {
        name: "Cyan Terminal",
        hex: "#42C9E8",
        role: "Labs Telemetry Accent",
        textClass: "text-slate-950",
      },
    ],
    logos: [
      {
        title: "Labs Primary Wordmark",
        variant: "light",
        path: "/brand/2026-10-21/HL-Brand-Pack/08-Web-Ready/logo.svg",
        description:
          "Four-module wordmark in graphite (Bahnschrift), endorsed with 'Part of The Harley Group'.",
      },
      {
        title: "Labs Reversed Wordmark",
        variant: "dark",
        path: "/brand/2026-10-21/HL-Brand-Pack/08-Web-Ready/logo-reversed.svg",
        description: "Outlined four-module wordmark in cool white on dark telemetry surfaces.",
      },
      {
        title: "Labs Monogram (Light)",
        variant: "mark-light",
        path: "/brand/2026-10-21/HL-Brand-Pack/01-Logos/hl-symbol-primary.svg",
        description: "Four-module symbol with central connector in graphite.",
      },
      {
        title: "Labs Monogram (Dark)",
        variant: "mark-dark",
        path: "/brand/2026-10-21/HL-Brand-Pack/01-Logos/hl-symbol-white.svg",
        description: "Four-module symbol in white for terminal consoles and packages.",
      },
    ],
    voiceGuidelines: [
      "Ideas into working systems: Describe actual automation, prototypes and software accurately.",
      "No unlaunched product claims: Prototypes are not automatically launched commercial products.",
      "High-velocity execution: Focus on building, testing, learning and real operational bottlenecks.",
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
      <section className="relative overflow-hidden bg-hdw-midnight pt-20 pb-16 text-white md:pt-24 md:pb-20 border-b border-hdw-ivory/15">
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
              href="/brand/Harley-Final-Media-Pack.zip"
              download="Harley-Final-Media-Pack.zip"
              className="inline-flex items-center gap-2 rounded-full bg-hdw-ivory px-5 py-2.5 text-sm font-bold text-hdw-midnight shadow-lg hover:bg-white transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download Final Media Pack (.zip)</span>
            </a>
            <a
              href="/brand/2026-10-21/START-HERE.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-hdw-ivory/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Interactive Family Overview</span>
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
              The Harley Group Brand Family · Approved 21 October 2026 (Option 3)
            </p>
            <h2 id="approved-hdw-direction" className="mt-3 text-2xl font-semibold">
              One Family. Distinct Personalities.
            </h2>
            <p className="mt-4 leading-relaxed text-slate-200">
              The user selected HDW logo number 3 (Heritage Ring: H inside a double circle),
              retained the original palettes, and approved typography option 3 across the group.
              Outlined SVGs preserve exact lettering across all devices without requiring font
              downloads.
            </p>
            <p className="mt-4 leading-relaxed text-slate-200">
              Typography Option 3 establishes distinct personalities: Georgia for The Harley Group
              (#202326 Charcoal, #B7A17A Champagne), Segoe UI for Harley Digital Works (#152B42
              Navy, #F5F1E8 Warm Ivory, #356DCC Action Blue), and Bahnschrift for Harley Labs
              (#171C23 Graphite, #42C9E8 Cyan).
            </p>
            <p className="mt-4 text-sm leading-relaxed text-hdw-ivory/80">
              HDW icons use a simplified single ring at small favicon sizes, retaining the double
              ring for the primary logo. Primary logos include "Part of The Harley Group" corporate
              endorsement.
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

          {/* Master Endorsed Wordmark Showcase */}
          {selectedBrand === "hdw" && (
            <div className="mt-12 rounded-3xl border border-white/15 bg-black/30 p-6 md:p-8 backdrop-blur shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3 py-1 text-xs font-semibold text-emerald-400 font-mono">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Ratified Corporate Endorsement</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-white font-display">
                    "Part of The Harley Group" Master Endorsed Wordmark
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-300 max-w-2xl leading-relaxed">
                    Official architectural lockup uniting the flagship trade agency with parent
                    holding group governance. Designed for maximum trust when quoting £1,495
                    commercial projects to UK contractors.
                  </p>
                </div>
                <a
                  href="/brand/social/hdw-endorsed-logo-board.jpg"
                  download="HDW-Endorsed-Logo-Board.jpg"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white transition-colors shadow-lg shrink-0"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Master Identity Board</span>
                </a>
              </div>

              {/* Identity Board Image */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-inner">
                <img
                  src="/brand/social/hdw-endorsed-logo-board.jpg"
                  alt="Harley Digital Works - Part of The Harley Group Master Brand Identity Board"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>

              {/* 3 Strategic Recommendations */}
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">
                    Suggestion 1 · Primary Wordmark
                  </span>
                  <h4 className="mt-2 text-base font-bold text-white font-display">
                    Website Headers & Proposals
                  </h4>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    Use the stacked vertical lockup (shown on left of board): Monogram on top, clean
                    Manrope lettering in the middle, hairline rule, and{" "}
                    <em>"PART OF THE HARLEY GROUP"</em> anchored underneath with an emerald pip.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">
                    Suggestion 2 · Security Watermark
                  </span>
                  <h4 className="mt-2 text-base font-bold text-white font-display">
                    Contracts, Audits & /track
                  </h4>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    Render the geometric 'H' crest and endorsement line as a subtle 10-15% opacity
                    watermark behind client project deliverables, website audits, and milestone
                    tracker screens.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">
                    Suggestion 3 · Linear Strip
                  </span>
                  <h4 className="mt-2 text-base font-bold text-white font-display">
                    Vehicle Livery & Signatures
                  </h4>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    For tight horizontal formats (email footers, van door sills, mobile sticky nav),
                    use the single-line horizontal strip:{" "}
                    <code>HARLEY DIGITAL WORKS · Part of The Harley Group</code>.
                  </p>
                </div>
              </div>
            </div>
          )}

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
                      className={`mt-4 rounded-xl p-6 border border-hdw-ivory/15 flex items-center justify-center min-h-[160px] ${logo.variant === "light" || logo.variant === "mark-light" ? "bg-hdw-ivory" : "bg-hdw-midnight"}`}
                    >
                      <BrandLogo
                        entity={brand.id}
                        variant={logo.variant}
                        imageClassName={
                          logo.variant.startsWith("mark") ? "h-20 w-20" : "h-16 w-auto max-w-full"
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
              Typography Option 3
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl font-display">
              Ratified Typography Direction
            </h2>
            <p className="mt-3 text-sm text-ink-muted">
              The Harley Group brand family uses typography option 3: Georgia for The Harley Group,
              Segoe UI for Harley Digital Works, Bahnschrift for Harley Labs, with DM Mono for
              transparent commercial pricing.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
              <span className="text-[11px] font-mono text-[#356DCC] font-bold uppercase">
                Harley Digital Works
              </span>
              <h3
                className="mt-2 text-2xl font-bold text-[#152B42]"
                style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
              >
                Segoe UI
              </h3>
              <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                Sturdy, modern and highly readable sans-serif for UK trade contractors. Used for all
                HDW headings, service packages, and customer-facing interfaces.
              </p>
            </div>

            <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
              <span className="text-[11px] font-mono text-[#B7A17A] font-bold uppercase">
                The Harley Group
              </span>
              <h3
                className="mt-2 text-2xl font-bold text-[#202326]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Georgia
              </h3>
              <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                Authoritative architectural serif conveying institutional heritage, practical
                ambition, and long-term corporate governance.
              </p>
            </div>

            <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
              <span className="text-[11px] font-mono text-[#42C9E8] font-bold uppercase">
                Harley Labs
              </span>
              <h3
                className="mt-2 text-2xl font-bold text-[#171C23]"
                style={{ fontFamily: "Bahnschrift, 'Arial Narrow', Arial, sans-serif" }}
              >
                Bahnschrift
              </h3>
              <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                Precision DIN-style variable sans engineered for deep-tech software, terminal
                telemetry, and edge infrastructure blueprints.
              </p>
            </div>

            <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
              <span className="text-[11px] font-mono text-slate-700 font-bold uppercase">
                Data & Pricing
              </span>
              <h3 className="mt-2 text-2xl font-mono font-bold text-ink">DM Mono</h3>
              <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                Precision monospaced figures for package pricing (£1,495 setup / £249/mo care),
                SLAs, and transparent commercial terms.
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
                  "Harley Digital Works: Websites Worth Choosing. We write 100% of the words and
                  look after your site so you can do the trade. Direct with founder Robbie Harley."
                </p>
              </div>

              <div className="rounded-xl bg-black/30 border border-white/10 p-4 space-y-2">
                <span className="font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  Instagram / Facebook Bio
                </span>
                <p className="text-slate-200 leading-relaxed">
                  "You do the trade. We take the website headache away. Done-for-you websites &
                  monthly care for UK contractors across Bristol, Bath & M4 Corridor."
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
