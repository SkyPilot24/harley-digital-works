export function BillingUnavailable() {
  return (
    <section className="border-y border-ink/10 py-6" aria-label="Billing status">
      <h2 className="text-base font-semibold text-ink">Invoice issuing is unavailable</h2>
      <p className="mt-2 text-sm text-ink-muted">
        Issue invoices through your verified accounting provider. Business identity, payment details
        and tax settings must be confirmed before billing is connected here.
      </p>
      <p className="mt-2 text-sm text-ink-muted">
        No invoice has been issued or sent, and no payment has been recorded.
      </p>
    </section>
  );
}
