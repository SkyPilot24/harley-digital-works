import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { HarleyGroupHeader } from "@/components/site/HarleyGroupHeader";
import { HarleyGroupFooter } from "@/components/site/HarleyGroupFooter";
import { EnquiryForm } from "@/components/site/EnquiryForm";
export const Route = createFileRoute("/the-harley-group")({
  head: () => ({
    meta: [
      { title: "The Harley Group | Practical digital services" },
      {
        name: "description",
        content:
          "The Harley Group is building practical digital services for independent businesses. Discover Harley Digital Works: websites and ongoing care for UK trades.",
      },
      { property: "og:title", content: "The Harley Group | Practical digital services" },
      {
        property: "og:description",
        content:
          "Thoughtful design. Useful technology. Digital services that support the people doing the work.",
      },
    ],
  }),
  component: TheHarleyGroupPage,
});
export function TheHarleyGroupPage() {
  return (
    <PageShell quiet header={<HarleyGroupHeader />} footer={<HarleyGroupFooter />}>
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
            />
            <figcaption>Built with care. Designed to last.</figcaption>
          </figure>
        </section>
        <section className="group-purpose studio-section" id="digital-works">
          <div className="studio-wrap group-division">
            <div>
              <p className="studio-kicker">OUR FOCUS / HARLEY DIGITAL WORKS</p>
              <h2>
                You do the trade.
                <br />
                <span className="studio-muted">We handle the digital.</span>
              </h2>
              <p>
                Professional websites and ongoing digital care for electricians, builders, heating
                engineers and other local service businesses.
              </p>
              <p>
                An initial build fee creates the right foundations. A monthly subscription keeps the
                website maintained, the information current and the next enquiry easy to make.
              </p>
              <a href="https://harleydigitalworks.com" className="enquiry-submit">
                Visit Harley Digital Works ↗
              </a>
            </div>
            <div className="group-focus-list">
              {[
                [
                  "01",
                  "Present your work",
                  "Design and words that reflect the quality of your business.",
                ],
                [
                  "02",
                  "Make contact simple",
                  "Clear services and a straightforward route to an enquiry.",
                ],
                [
                  "03",
                  "Keep it looked after",
                  "An ongoing service with an agreed scope and a human point of contact.",
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
        <section className="studio-section studio-wrap group-principles" id="approach">
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
        <section className="studio-section group-contact" id="contact">
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
