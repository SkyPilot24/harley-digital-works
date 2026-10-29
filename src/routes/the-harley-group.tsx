import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ArrowUpRight,
  Building2,
  Cpu,
  Globe,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { HarleyGroupHeader } from "@/components/site/HarleyGroupHeader";
import { HarleyGroupFooter } from "@/components/site/HarleyGroupFooter";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { buildPageSeoHead, harleyGroupConfig } from "@/lib/site-config";

export const Route = createFileRoute("/the-harley-group")({
  head: () =>
    buildPageSeoHead({
      title: "The Harley Group | Practical digital services",
      description:
        "The Harley Group is building practical digital services for independent businesses. Discover Harley Digital Works: websites and ongoing care for UK trades.",
      path: "/the-harley-group",
    }),
  component: TheHarleyGroupPage,
});

const CHARTER_PILLARS = [
  {
    number: "01",
    title: "Done-For-You Execution",
    description:
      "We do not hand busy trade business owners blank content templates or evening homework. We interview the operator, write the technical copy, and build the site end-to-end.",
  },
  {
    number: "02",
    title: "50/50 Milestone Economics",
    description:
      "Every managed website project operates on a 50% upfront deposit (£747.50) and 50% balance (£747.50) only after the client inspects and approves the working preview.",
  },
  {
    number: "03",
    title: "Unencumbered Ownership",
    description:
      "Clients retain full legal title to their domain name, brand photography, and customer enquiry records. We build long-term relationships through useful care, not lock-in.",
  },
  {
    number: "04",
    title: "Capacity Discipline",
    description:
      "Harley Digital Works caps active website builds at strictly two concurrent projects so every build receives direct founder oversight and rigorous quality control.",
  },
];

function TheHarleyGroupPage() {
  return (
    <PageShell quiet brand="group" header={<HarleyGroupHeader />} footer={<HarleyGroupFooter />}>
      <div className="studio-home group-site bg-[#F6F3ED] text-[#081B30]">
        {/* Section 1: Stitch Executive Hero & Corporate Thesis */}
        <section
          className="mx-auto max-w-[1280px] px-5 pt-10 pb-16 sm:px-6 lg:pt-16 lg:pb-24"
          id="overview"
        >
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#081B30]/15 bg-white px-3.5 py-1.5 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-[#059669]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#081B30]">
                  THE HARLEY GROUP · PARENT OPERATING ENTITY
                </span>
              </div>

              <h1 className="font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.03em] text-[#081B30] sm:text-5xl lg:text-[56px]">
                Practical ambition.
                <br />
                <span className="text-[#173C62]">Lasting value.</span>
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-[#526479] sm:text-lg">
                The Harley Group is the parent organisation behind{" "}
                <strong className="font-semibold text-[#081B30]">Harley Digital Works</strong>{" "}
                (done-for-you websites and ongoing digital care for UK trades),{" "}
                <strong className="font-semibold text-[#081B30]">Harley Labs</strong> (applied voice
                and workflow automation prototypes), and a curated{" "}
                <strong className="font-semibold text-[#081B30]">strategic domain portfolio</strong>
                .
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#digital-works"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#081B30] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#173C62]"
                >
                  <span>Explore Operating Divisions</span>
                  <ArrowUpRight className="h-4 w-4 text-[#059669]" />
                </a>
                <a
                  href={`tel:${harleyGroupConfig.contactPhoneTel}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#081B30]/15 bg-white px-5 py-3.5 text-sm font-bold text-[#081B30] transition-colors hover:bg-[#081B30]/5"
                  aria-label={`Call The Harley Group on ${harleyGroupConfig.contactPhone}`}
                >
                  <Phone size={15} className="text-[#059669]" />
                  <span>Call {harleyGroupConfig.contactPhone}</span>
                </a>
              </div>

              {/* 4-Pillar Institutional Governance Strip */}
              <div className="grid grid-cols-2 gap-4 border-t border-[#081B30]/10 pt-6 sm:grid-cols-4">
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#526479]">
                    PARENT ENTITY
                  </span>
                  <span className="mt-1 block font-display text-sm font-extrabold text-[#081B30]">
                    The Harley Group
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#526479]">
                    CLIENT ASSETS
                  </span>
                  <span className="mt-1 block font-display text-sm font-extrabold text-[#081B30]">
                    100% Client Title
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#526479]">
                    GOVERNANCE
                  </span>
                  <span className="mt-1 block font-display text-sm font-extrabold text-[#081B30]">
                    Founder Oversight
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#526479]">
                    PILOT FOCUS
                  </span>
                  <span className="mt-1 block font-display text-sm font-extrabold text-[#059669]">
                    Bristol, Bath &amp; M4
                  </span>
                </div>
              </div>

              {/* Trust Telemetry Ledger Strip (Stitch Screen 15) */}
              <div className="mt-6 rounded-xl border border-[#081B30]/10 bg-white/80 p-4 shadow-xs">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="flex flex-col space-y-1">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#059669]">
                      Structure
                    </span>
                    <span className="font-display text-xs font-bold text-[#081B30] sm:text-sm">
                      100% Privately Owned &amp; Self-Funded
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#059669]">
                      Holdings
                    </span>
                    <span className="font-display text-xs font-bold text-[#081B30] sm:text-sm">
                      4 Focused Operating Divisions
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#059669]">
                      Governance
                    </span>
                    <span className="font-display text-xs font-bold text-[#081B30] sm:text-sm">
                      Senior Founder Accountability
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#059669]">
                      Balance Sheet
                    </span>
                    <span className="font-display text-xs font-bold text-[#081B30] sm:text-sm">
                      Zero External Debt / Sovereign Assets
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Image Card */}
            <div className="lg:col-span-5">
              <figure className="relative overflow-hidden rounded-2xl border border-[#081B30]/15 bg-[#081B30] shadow-xl">
                <img
                  src="/images/home/thg-headquarters.jpg"
                  alt="The Harley Group headquarters, contemporary British architecture in natural Bath stone, structural steel and English oak"
                  width="1200"
                  height="800"
                  fetchPriority="high"
                  decoding="async"
                  className="h-[340px] w-full object-cover sm:h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081B30] via-[#081B30]/20 to-transparent" />
                <figcaption className="relative border-t border-white/10 bg-[#081B30]/95 px-6 py-4 text-white">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#059669]">
                        BRITISH INDUSTRIAL CRAFTSMANSHIP
                      </span>
                      <span className="mt-0.5 block font-display text-sm font-bold text-white">
                        Built with care. Designed to last.
                      </span>
                    </div>
                    <span className="rounded border border-white/15 bg-[#173C62] px-2.5 py-1 font-mono text-[10px] font-bold text-[#F6F3ED]">
                      BRISTOL · UK
                    </span>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Section 2: Interconnected Enterprise Architecture Bento Grid */}
        <section
          className="border-y border-[#081B30]/10 bg-white py-16 lg:py-24"
          id="digital-works"
        >
          <div className="mx-auto max-w-[1280px] px-5 sm:px-6">
            <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#059669]">
                  OPERATING ARCHITECTURE · THREE FOCUSED DIVISIONS
                </p>
                <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#081B30] sm:text-4xl">
                  You do the trade. <span className="text-[#526479]">We handle the digital.</span>
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#526479]">
                Each division within The Harley Group serves a clear commercial role—combining
                dependable trade websites, practical automation tools, and owned brand names.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Bento 1 (7 Cols): Harley Digital Works */}
              <div className="flex flex-col justify-between rounded-2xl border border-[#081B30]/12 bg-[#F6F3ED] p-7 shadow-xs lg:col-span-7 sm:p-8">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 rounded-md bg-[#081B30] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-white">
                      <Building2 className="h-3.5 w-3.5 text-[#059669]" />
                      01 · CUSTOMER OPERATING BRAND
                    </span>
                    <span className="font-mono text-xs font-bold text-[#059669]">
                      ACTIVE · MAX 2 CONCURRENT BUILDS
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-extrabold text-[#081B30] sm:text-3xl">
                    Harley Digital Works
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#526479] sm:text-base">
                    Professional websites and ongoing digital care for established UK trades,
                    starting with our electrical contractor pilot across Bristol, Bath, and the M4
                    Corridor. We write every word of technical trade copy and manage hosting, SSL,
                    and monthly updates.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-xl border border-[#081B30]/10 bg-white p-3.5">
                      <span className="block font-mono text-[10px] font-bold uppercase text-[#526479]">
                        MANAGED SETUP
                      </span>
                      <span className="mt-1 block font-mono text-lg font-bold text-[#081B30]">
                        £1,495
                      </span>
                    </div>
                    <div className="rounded-xl border border-[#081B30]/10 bg-white p-3.5">
                      <span className="block font-mono text-[10px] font-bold uppercase text-[#526479]">
                        ONGOING CARE
                      </span>
                      <span className="mt-1 block font-mono text-lg font-bold text-[#059669]">
                        £249/mo
                      </span>
                    </div>
                    <div className="rounded-xl border border-[#081B30]/10 bg-white p-3.5">
                      <span className="block font-mono text-[10px] font-bold uppercase text-[#526479]">
                        PAYMENT SPLIT
                      </span>
                      <span className="mt-1 block font-mono text-sm font-bold text-[#081B30]">
                        50% / 50%
                      </span>
                    </div>
                    <div className="rounded-xl border border-[#081B30]/10 bg-white p-3.5">
                      <span className="block font-mono text-[10px] font-bold uppercase text-[#526479]">
                        COPYWRITING
                      </span>
                      <span className="mt-1 block font-mono text-sm font-bold text-[#081B30]">
                        Done For You
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#081B30]/10 pt-5">
                  <span className="text-xs text-[#526479]">
                    £747.50 deposit · £747.50 balance only after preview approval.
                  </span>
                  <a
                    href="https://harleydigitalworks.com"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#081B30] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#173C62]"
                  >
                    <span>Visit Harley Digital Works</span>
                    <ArrowUpRight className="h-4 w-4 text-[#059669]" />
                  </a>
                </div>
              </div>

              {/* Bento 2 (5 Cols): Harley Labs */}
              <div className="flex flex-col justify-between rounded-2xl border border-[#173C62] bg-[#081B30] p-7 text-white shadow-lg lg:col-span-5 sm:p-8">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-[#173C62] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-white">
                      <Cpu className="h-3.5 w-3.5 text-[#059669]" />
                      02 · R&amp;D &amp; AUTOMATION
                    </span>
                    <span className="font-mono text-[11px] font-bold text-[#059669]">
                      APPLIED LABS
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-extrabold text-white sm:text-3xl">
                    Harley Labs
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    Internal R&amp;D unit building voice triage assistants, instant quote
                    calculators, and structured intake workflows that stop tradespeople losing
                    high-value enquiries while out on tools.
                  </p>

                  <ul className="mt-5 space-y-2.5 text-xs text-white/85">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#059669]" />
                      <span>24/7 Autonomous Voice Receptionist (&ldquo;Callum&rdquo;)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#059669]" />
                      <span>Interactive Trade Job &amp; ROI Calculators</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#059669]" />
                      <span>Instant WhatsApp &amp; SMS Lead Dispatch</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <Link
                    to="/virtual-receptionist"
                    className="font-mono text-xs font-bold text-[#059669] hover:underline"
                  >
                    Test Voice Console ↗
                  </Link>
                  <Link
                    to="/labs"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#059669] px-4 py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-95"
                  >
                    <span>Explore Harley Labs</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Bento 3 (8 Cols): Strategic Domain Portfolio */}
              <div className="flex flex-col justify-between rounded-2xl border border-[#081B30]/12 bg-white p-7 shadow-xs lg:col-span-8 sm:p-8">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 rounded-md bg-[#F6F3ED] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#081B30]">
                      <Globe className="h-3.5 w-3.5 text-[#059669]" />
                      03 · STRATEGIC DIGITAL ASSETS
                    </span>
                    <span className="font-mono text-xs font-bold text-[#526479]">
                      DIRECT OWNER TRANSFERS
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-extrabold text-[#081B30]">
                    The Harley Domain Portfolio
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#526479]">
                    A curated collection of category-defining UK and global domain assets across
                    automotive, fintech, AI wearables, and clean mobility—available for outright
                    acquisition, 12-month lease-to-own, or bundled with a turnkey website build.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "letscarshop.com",
                      "valuecurrencies.com",
                      "aiwearables.co.uk",
                      "greenautomotive.co.uk",
                    ].map((dom) => (
                      <span
                        key={dom}
                        className="rounded-lg border border-[#081B30]/12 bg-[#F6F3ED] px-3 py-1.5 font-mono text-xs font-bold text-[#081B30]"
                      >
                        {dom}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#081B30]/10 pt-5">
                  <span className="text-xs text-[#526479]">
                    Nominet &amp; ICANN verified · Zero broker buyer commission
                  </span>
                  <Link
                    to="/domains"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#081B30]/15 bg-[#F6F3ED] px-4 py-2.5 text-xs font-bold text-[#081B30] transition-colors hover:bg-[#081B30] hover:text-white"
                  >
                    <span>View Domain Portfolio</span>
                    <ArrowUpRight className="h-4 w-4 text-[#059669]" />
                  </Link>
                </div>
              </div>

              {/* Bento 4 (4 Cols): Escrow & Governance */}
              <div className="flex flex-col justify-between rounded-2xl border border-[#081B30]/12 bg-[#F6F3ED] p-7 shadow-xs lg:col-span-4 sm:p-8">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#059669]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    GOVERNANCE &amp; TERMS
                  </span>
                  <h3 className="mt-4 font-display text-xl font-extrabold text-[#081B30]">
                    Clear Written Commitments
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#526479]">
                    Every website build and domain transfer is backed by a plain-English written
                    scope, transparent milestone billing, and direct communication with the founder.
                  </p>
                </div>
                <div className="mt-6 border-t border-[#081B30]/10 pt-4 font-mono text-[11px] font-bold text-[#081B30]">
                  ✓ No long-term lock-in contracts
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Founder Story & How We Think */}
        <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 lg:py-24" id="approach">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-[#081B30]/15 bg-white p-3 shadow-md">
                <img
                  src="/images/home/robbie-restored.jpg"
                  alt="Robbie Harley, Founder of The Harley Group and Harley Digital Works"
                  className="h-[360px] w-full rounded-xl object-cover object-top"
                  loading="lazy"
                />
                <div className="p-4">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#059669]">
                    FOUNDER &amp; DIRECTOR
                  </p>
                  <p className="mt-0.5 font-display text-lg font-extrabold text-[#081B30]">
                    Robbie Harley
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#526479]">
                    Direct point of contact for every Harley Digital Works trade client and domain
                    acquisition.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-7">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#059669]">
                HOW WE THINK · OPERATOR PHILOSOPHY
              </p>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#081B30] sm:text-4xl">
                Useful before complicated.
                <br />
                <span className="text-[#526479]">Quality before quantity.</span>
              </h2>
              <blockquote className="rounded-xl border-l-4 border-[#059669] bg-white p-5 text-sm italic leading-relaxed text-[#081B30] shadow-2xs">
                &ldquo;Good trade businesses win on trust, tidy workmanship, and turning up when
                they say they will. We build digital infrastructure the exact same way—clear
                pricing, zero waffle, and systems that work reliably on a phone.&rdquo;
              </blockquote>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  [
                    "Start with the real need.",
                    "Understand the business and the people it serves before choosing the technology.",
                  ],
                  [
                    "Make the important things work.",
                    "Clear communication, considered design and reliable everyday journeys matter more than a long feature list.",
                  ],
                  [
                    "Improve with purpose.",
                    "Use repeatable systems and automation where they save time, with people responsible for quality and judgement.",
                  ],
                ].map(([t, p]) => (
                  <article
                    key={t}
                    className="rounded-xl border border-[#081B30]/10 bg-white p-5 shadow-2xs"
                  >
                    <h3 className="font-display text-base font-bold text-[#081B30]">{t}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#526479]">{p}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Architectural Heritage Mosaic (Stitch Screen 15) */}
        <section className="border-t border-[#081B30]/10 bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-6">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="relative lg:col-span-6">
                <div className="overflow-hidden rounded-2xl border border-[#081B30]/15 bg-[#F6F3ED] p-2.5 shadow-xl">
                  <img
                    className="h-[380px] w-full rounded-xl object-cover shadow-sm sm:h-[440px]"
                    alt="A modern architectural British commercial headquarters crafted with honey Cotswold limestone masonry, black structural steel beams, floor-to-ceiling clean glass facades, and minimalist industrial detailing under soft overcast British daylight."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfdpiiVWWyhGQecii6STZttbmF5r-ToLTIZJ_9wgusgkDyxazdTdrSjqJnj4qfJS2IeJ4Ju1hPM9Li38ai5P1y5CBYzYPtzzHBxKoJ2Jj39ZTMaQOXY48vzlS2aR9qHlP-nkwOPoGgy6hIaIcXsfenRhJB9zwKNcylmhA-gnJOPBJVBbm3vXjw4TTvKkafhwwclWYP4dg3i12yEhLA5k3D0dEAbAMl8OGC90kHCbc"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider text-[#526479]">
                  <span>Bristol Studios // Archival Ground</span>
                  <span>Built With Care · Designed to Last</span>
                </div>
                {/* Floating Ledger Overlay Card */}
                <div className="absolute -bottom-6 right-6 hidden max-w-xs rounded-xl bg-[#081B30] p-5 text-[#F6F3ED] shadow-2xl sm:block">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#34D399]">
                      Operating Ethos
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#dce9ff]">
                    Every system built must operate autonomously, preserve capital equity, and
                    command real trade respect.
                  </p>
                </div>
              </div>

              <div className="space-y-6 lg:col-span-6 lg:pl-6">
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#059669]">
                    THE HARLEY PHILOSOPHY // STRATEGIC DISCIPLINE
                  </span>
                  <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#081B30] sm:text-4xl">
                    Radical ownership.
                    <br />
                    Sovereign balance.
                  </h2>
                </div>
                <div className="space-y-4 text-sm leading-relaxed text-[#526479] sm:text-base">
                  <p>
                    We firmly reject bloated agency retainers, cosmetic vanity metrics, and fragile
                    digital debt. The modern service landscape is oversaturated with disposable
                    software and speculative complexity that dissolves under operational stress.
                  </p>
                  <p>
                    Every enterprise under{" "}
                    <strong className="font-semibold text-[#081B30]">The Harley Group</strong>{" "}
                    operates with ruthless commercial clarity, transparent fixed-milestone billing,
                    and sovereign asset ownership. Whether engineering digital infrastructure for UK
                    high-ticket contractors, prototyping computational pipelines, or deploying
                    autonomous voice telephony, we construct balance-sheet equity designed for the
                    next decade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: The Harley Charter (Dark Navy Architectural Band) */}
        <section className="bg-[#081B30] py-16 text-white lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-6">
            <div className="mb-10 max-w-2xl">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#059669]">
                THE HARLEY CHARTER · FOUR OPERATING STANDARDS
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Commercial clarity built into every engagement.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {CHARTER_PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="rounded-2xl border border-white/12 bg-[#173C62]/45 p-6"
                >
                  <span className="font-mono text-xs font-bold text-[#059669]">
                    PILLAR {pillar.number}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-white">{pillar.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/80">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {harleyGroupConfig.showRevivalFellowshipNotice && (
          <section className="mx-auto max-w-[1280px] px-5 pt-10 sm:px-6" id="community">
            <p className="text-sm text-[#526479]">
              We also contribute pro bono web work to The Revival Fellowship.
            </p>
          </section>
        )}

        {/* Section 5: Contact & Enquiry Form */}
        <section className="studio-section group-contact deferred-section" id="contact">
          <div className="studio-wrap group-division">
            <div>
              <p className="studio-kicker">LET’S START A CONVERSATION</p>
              <h2>
                A website project?
                <br />A useful connection?
              </h2>
              <p>
                Tell us what you have in mind. Website and digital-care enquiries are handled
                through Harley Digital Works.
              </p>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-[#081B30]">
                  <Phone size={15} className="text-[#059669]" />
                  <a
                    href={`tel:${harleyGroupConfig.contactPhoneTel}`}
                    className="font-bold hover:underline"
                  >
                    {harleyGroupConfig.contactPhone}
                  </a>
                  <span className="text-xs text-[#526479]">(Primary Business Landline)</span>
                </div>
                <div className="flex items-center gap-2 text-[#081B30]">
                  <MessageCircle size={15} className="text-[#059669]" />
                  <a
                    href={`${harleyGroupConfig.whatsappUrl}?text=${encodeURIComponent(harleyGroupConfig.whatsappDefaultMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#059669] hover:underline"
                  >
                    WhatsApp: {harleyGroupConfig.whatsappDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[#081B30]">
                  <Mail size={15} className="text-[#526479]" />
                  <a
                    href={`mailto:${harleyGroupConfig.contactEmail}`}
                    className="text-xs hover:underline"
                  >
                    {harleyGroupConfig.contactEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2 border-t border-[#081B30]/10 pt-2 text-xs text-[#526479]">
                  <MapPin size={14} className="text-[#059669]" />
                  <span>Bristol, United Kingdom · Mon–Fri 09:00–17:00 UK time</span>
                </div>
              </div>
            </div>
            <EnquiryForm source="group_contact_form" />
          </div>
        </section>
      </div>
    </PageShell>
  );
}
