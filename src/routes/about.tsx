import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Harley Digital Works" },
      {
        name: "description",
        content:
          "The dependable digital partner for UK trades and small businesses. We build, write, and manage your website so you can run your business.",
      },
    ],
  }),
  component: Page,
});

const principles = [
  [
    "100% Done-For-You",
    "We write the sales copy, curate professional images, and build your site. No homework or technical tasks for you.",
  ],
  [
    "Zero Tech Jargon",
    "We explain everything in plain English. You never have to worry about DNS records, servers, or confusing software.",
  ],
  [
    "Fixed Upfront Pricing",
    "Clear, transparent packages (£1,495 / £2,995) with no surprise hourly bills or unexpected extras.",
  ],
  [
    "Ongoing Peace of Mind",
    "Our Care Plans cover fast UK hosting, security, backups, and monthly updates. Message us on WhatsApp whenever you need a change.",
  ],
];

function Page() {
  return (
    <PageShell>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-background to-white/40 border-b border-ink/10">
        <Container>
          <p className="eyebrow">About Us</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.8rem,6.5vw,5.5rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-ink">
            The dependable digital partner for{" "}
            <span className="text-primary block">hard-working UK businesses.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Harley Digital Works was founded to solve a simple problem: most small business owners
            and tradespeople just want their website sorted without getting bogged down in
            technology.
          </p>
        </Container>
      </section>

      <section className="border-y border-ink/10 bg-white py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Our Philosophy</p>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] md:text-4xl text-ink">
                You run your business. We’ll take care of the website.
              </h2>
            </div>
            <div className="space-y-6 text-base leading-relaxed text-ink-muted">
              <p>
                We believe getting a website shouldn't feel like a second job. You shouldn't have to
                spend your evenings fighting with DIY templates, writing sales text, or chasing
                unreliable freelancers.
              </p>
              <p>
                Led by <strong>Dr Robbie Harley, MBA</strong> (part of The Harley Group), our team
                combines disciplined delivery, commercial copywriting, and high-performance design
                to give trades and local businesses a world-class digital presence that genuinely
                wins new customers.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <p className="eyebrow">How We Work</p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {principles.map(([title, copy]) => (
              <article
                key={title}
                className="rounded-2xl border border-ink/10 bg-white p-7 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-ink">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="rounded-3xl bg-ink p-8 md:p-14 text-white shadow-2xl border border-white/10">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              Ready to get your digital presence sorted?
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/70">
              Get in touch today for a free 15-minute consultation. We’ll show you exactly how we
              can help your business look world-class.
            </p>
            <div className="mt-8">
              <PillButton as="link" to="/contact" variant="light" size="md">
                Get a Free Website Quote
              </PillButton>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
