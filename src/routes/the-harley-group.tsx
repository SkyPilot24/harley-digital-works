import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Mail, MapPin, ArrowUpRight } from "lucide-react";
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
export function TheHarleyGroupPage() {
  return (
    <PageShell quiet brand="group" header={<HarleyGroupHeader />} footer={<HarleyGroupFooter />}>
      <div className="studio-home group-site">
        <section className="group-hero studio-wrap" id="overview">
          <div>
            <p className="studio-kicker">
              THE HARLEY GROUP / DIGITAL SERVICES · EXPERIMENTATION · DOMAIN PORTFOLIO
            </p>
            <h1>
              Practical ambition.
              <br />
              <span>Lasting value.</span>
            </h1>
            <p>
              The Harley Group brings Harley Digital Works, Harley Labs and the domain portfolio
              under one parent identity. Distinct activities, with a shared direction.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#digital-works" className="enquiry-submit">
                Discover what we do ↗
              </a>
              <a
                href={`tel:${harleyGroupConfig.contactPhoneTel}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-2.5 text-xs font-semibold text-ink hover:bg-ink/5"
                aria-label={`Call The Harley Group on ${harleyGroupConfig.contactPhone}`}
              >
                <Phone size={13} className="text-emerald-700" />
                <span>Call {harleyGroupConfig.contactPhone}</span>
              </a>
            </div>
          </div>
          <figure>
            <img
              src="/images/home/thg-headquarters.jpg"
              alt="The Harley Group headquarters, contemporary British architecture in natural Bath stone, structural steel and English oak"
              width="1200"
              height="800"
              fetchPriority="high"
              decoding="async"
            />
            <figcaption>Built with care. Designed to last.</figcaption>
          </figure>
        </section>
        <section className="group-purpose studio-section" id="digital-works">
          <div className="studio-wrap group-division">
            <div>
              <p className="studio-kicker">OUR CUSTOMER OPERATING BRAND / HARLEY DIGITAL WORKS</p>
              <h2>
                You do the trade.
                <br />
                <span className="studio-muted">We handle the digital.</span>
              </h2>
              <p>
                Professional websites and ongoing digital care for established UK trades — starting
                with our electrical contractor pilot across Bristol, Bath, and the M4 Corridor.
              </p>
              <p>
                Managed websites: £1,495 setup (£747.50 deposit and £747.50 balance after preview
                approval) plus £249 / month ongoing care. Your written quote confirms delivery,
                support and any applicable taxes. Pilot capacity is limited to two concurrent
                builds.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link to="/" className="enquiry-submit">
                  Visit Harley Digital Works ↗
                </Link>
                <Link to="/labs" className="studio-text-link">
                  Explore Harley Labs ↗
                </Link>
                <Link to="/brand" className="studio-text-link">
                  Brand Assets ↗
                </Link>
              </div>
            </div>
            <div className="group-focus-list">
              {[
                {
                  number: "01",
                  title: "Harley Digital Works",
                  description:
                    "Turnkey trade websites, 100% DFY copywriting, and managed Cloudflare edge care.",
                  href: "/",
                  badge: "Visit Platform",
                },
                {
                  number: "02",
                  title: "Harley Labs",
                  description:
                    "Automation workflows, sub-50ms edge rendering, and operational software systems.",
                  href: "/labs",
                  badge: "Explore Labs",
                },
                {
                  number: "03",
                  title: "Domain Services",
                  description:
                    "A curated portfolio of high-conviction digital brand assets and assisted transfers.",
                  href: "/domains",
                  badge: "View Portfolio",
                },
              ].map((item) => (
                <Link
                  key={item.number}
                  to={item.href}
                  className="group block cursor-pointer transition-all duration-200"
                  aria-label={`${item.number} ${item.title} — ${item.badge}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.number}</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground group-hover:text-emerald-700 transition-colors">
                      <span>{item.badge}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                  <h3>
                    <span>{item.title}</span>
                  </h3>
                  <p>{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section
          className="studio-section studio-wrap group-principles deferred-section"
          id="approach"
        >
          <p className="studio-kicker">HOW WE THINK</p>
          <h2>
            Useful before complicated.
            <br />
            <span className="studio-muted">Quality before quantity.</span>
          </h2>
          <div className="group-principle-grid">
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
              <article key={t}>
                <h3>{t}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          className="studio-section studio-wrap group-community deferred-section"
          id="community"
        >
          <div className="rounded-2xl border border-ink/10 bg-white/70 p-8 md:p-12 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              <div className="max-w-2xl">
                <p className="studio-kicker">COMMUNITY & PRO BONO CONTRIBUTION</p>
                <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-ink">
                  Supported Community Project: The Revival Fellowship
                </h2>
                <p className="mt-4 text-base md:text-lg leading-relaxed text-ink-muted">
                  Website design, development, digital systems and technical consultancy contributed
                  pro bono by Robbie Harley through The Harley Group.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Delivered as a voluntary community initiative, separate from our commercial trade
                  agency operations. No ongoing commercial service commitment, subsidiary status, or
                  formal charitable relationship is created by this record.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <a
                    href="https://therevivalfellowship.co.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-xs font-bold text-white hover:bg-ink/90 transition-all shadow-xs"
                  >
                    <span>Visit The Revival Fellowship</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
              <div className="rounded-xl border border-ink/10 bg-slate-50/90 p-5 text-xs text-ink-muted max-w-sm shrink-0">
                <span className="font-semibold text-ink text-sm block mb-1.5">
                  Governance Record
                </span>
                <p className="leading-relaxed">
                  Contributed pro bono on 18 October 2026. This voluntary community contribution is
                  fully delivered and preserved separate from The Harley Group&apos;s commercial
                  operations.
                </p>
              </div>
            </div>
          </div>
        </section>
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
                <div className="flex items-center gap-2 text-ink">
                  <Phone size={15} className="text-emerald-700" />
                  <a
                    href={`tel:${harleyGroupConfig.contactPhoneTel}`}
                    className="font-bold hover:underline"
                  >
                    {harleyGroupConfig.contactPhone}
                  </a>
                  <span className="text-xs text-ink-muted">(Primary Business Landline)</span>
                </div>
                <div className="flex items-center gap-2 text-ink">
                  <MessageCircle size={15} className="text-emerald-600" />
                  <a
                    href={`${harleyGroupConfig.whatsappUrl}?text=${encodeURIComponent(harleyGroupConfig.whatsappDefaultMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-800 hover:underline"
                  >
                    WhatsApp: {harleyGroupConfig.whatsappDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-ink">
                  <Mail size={15} className="text-ink-muted" />
                  <a
                    href={`mailto:${harleyGroupConfig.contactEmail}`}
                    className="text-xs hover:underline"
                  >
                    {harleyGroupConfig.contactEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs text-ink-muted pt-2 border-t border-ink/10">
                  <MapPin size={14} className="text-emerald-700" />
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
