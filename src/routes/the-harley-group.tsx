import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { HarleyGroupHeader } from "@/components/site/HarleyGroupHeader";
import { HarleyGroupFooter } from "@/components/site/HarleyGroupFooter";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { buildPageSeoHead } from "@/lib/site-config";

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
            <p className="studio-kicker">THE HARLEY GROUP / INDEPENDENT THINKING</p>
            <h1>
              Good businesses.
              <br />
              <span>Better possibilities.</span>
            </h1>
            <p>
              We build practical digital services for people who take pride in their work.
              Thoughtful design, useful technology and the care to see things through.
            </p>
            <a href="#digital-works" className="enquiry-submit">
              Discover what we do ↗
            </a>
          </div>
          <figure>
            <img
              src="/images/home/architecture.jpg"
              alt="Architectural detail of a timber and glass home at dusk"
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
                Ratified commercial model: £1,495 setup (50% deposit £747.50, 50% completion balance
                £747.50, 14-day delivery SLA) plus £249 / month ongoing managed care. Zero-rated VAT
                under statutory HMRC threshold; onboarding capacity strictly capped at 2–3
                concurrent builds.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="https://harleydigitalworks.com" className="enquiry-submit">
                  Visit Harley Digital Works ↗
                </a>
                <a href="/labs" className="studio-text-link">
                  Explore Harley Labs ↗
                </a>
              </div>
            </div>
            <div className="group-focus-list">
              {[
                [
                  "01",
                  "Harley Digital Works",
                  "Turnkey trade websites, 100% DFY copywriting, and managed Cloudflare edge care.",
                ],
                [
                  "02",
                  "Harley Labs",
                  "Automation workflows, sub-50ms edge rendering, and operational software systems.",
                ],
                [
                  "03",
                  "Domain Services",
                  "A curated portfolio of high-conviction digital brand assets and assisted transfers.",
                ],
              ].map(([n, t, p]) => (
                <div key={n}>
                  <span>{n}</span>
                  <h3>{t}</h3>
                  <p>{p}</p>
                </div>
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
            </div>
            <EnquiryForm source="group_contact_form" />
          </div>
        </section>
      </div>
    </PageShell>
  );
}
