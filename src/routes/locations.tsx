import { createFileRoute, Link } from "@tanstack/react-router";
import { UK_LOCATIONS } from "@/lib/location-data";
import { PageShell } from "@/components/site/PageShell";
import { WebsitePackagesSection } from "@/components/site/WebsitePackagesSection";
export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "Websites for UK businesses | Harley Digital Works" },
      {
        name: "description",
        content:
          "Explore website design and ongoing digital care for UK trades and local service businesses.",
      },
    ],
  }),
  component: Page,
});
function Page() {
  return (
    <PageShell quiet>
      <div className="studio-home">
        <section className="studio-section studio-wrap">
          <p className="studio-kicker">LOCAL BUSINESSES. THOUGHTFUL WEBSITES.</p>
          <h1 className="directory-heading">
            Wherever you work.
            <br />
            <span className="studio-muted">We’ll handle your website.</span>
          </h1>
          <p className="directory-intro">
            Clear services, real project work and a straightforward route to an enquiry. An initial
            build fee and ongoing monthly care, with the details agreed before we start.
          </p>
          <div className="directory-grid">
            {Object.values(UK_LOCATIONS).map((item) => (
              <Link key={item.slug} to="/locations/$slug" params={{ slug: item.slug }}>
                <span>{item.cityName}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>
        <WebsitePackagesSection />
      </div>
    </PageShell>
  );
}
