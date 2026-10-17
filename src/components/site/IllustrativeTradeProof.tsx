/** Demonstration content must never be represented as customer evidence. */
export function IllustrativeTradeProof() {
  return (
    <section className="studio-section bg-stone-50" aria-labelledby="illustrative-proof-heading">
      <div className="studio-wrap">
        <p className="studio-kicker">FICTIONAL EXAMPLE · NOT A PAST CLIENT PROJECT</p>
        <h2
          id="illustrative-proof-heading"
          className="text-3xl font-semibold tracking-tight text-ink"
        >
          From a list of services to a clear next step.
        </h2>
        <p className="mt-4 max-w-2xl text-ink-muted">
          This invented electrical business shows the sort of change we can plan. It is a design
          demonstration, with no customer endorsement or measured results.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-ink/15 bg-white p-6">
            <p className="text-sm font-semibold text-ink-muted">
              Before · fictional starting point
            </p>
            <h3 className="mt-4 text-xl font-semibold">Example Electrical</h3>
            <p className="mt-4 text-ink-muted">
              All electrical work undertaken. Domestic and commercial.
            </p>
            <p className="mt-6 text-sm text-ink-muted">
              Unclear coverage, little project detail, no obvious enquiry route.
            </p>
          </article>
          <article className="rounded-xl bg-ink p-6 text-white">
            <p className="text-sm font-semibold text-white/70">After · proposed design direction</p>
            <h3 className="mt-4 text-xl font-semibold">
              Electrical work for your home and workplace.
            </h3>
            <p className="mt-4 text-white/80">
              Clear service pages, confirmed service areas, genuine project photographs and a short
              enquiry form.
            </p>
            <p className="mt-6 text-sm text-white/70">
              Sample enquiry action: Tell us about your electrical project.
            </p>
          </article>
        </div>
        <aside
          className="mt-6 rounded-xl border border-dashed border-ink/25 bg-white p-6"
          aria-label="Fictional review layout preview"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
            SAMPLE REVIEW LAYOUT · FICTIONAL WORDING
          </p>
          <blockquote className="mt-3 text-lg text-ink">
            “The services are easy to find, and it is clear how to get in touch.”
          </blockquote>
          <p className="mt-3 text-sm text-ink-muted">
            Invented example for design review — not a customer quote. Genuine reviews will only be
            added with permission and a verified source.
          </p>
        </aside>
      </div>
    </section>
  );
}
