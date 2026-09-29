import { Link } from "@tanstack/react-router";
import { Webhook } from "lucide-react";

export function StagingAutoProvisionerDesk() {
  return (
    <section className="border-y border-ink/10 py-6" aria-labelledby="provisioning-title">
      <div className="flex items-center gap-2">
        <Webhook className="h-5 w-5 text-ink-muted" aria-hidden="true" />
        <h2 id="provisioning-title" className="text-lg font-semibold text-ink">
          Payment and provisioning
        </h2>
      </div>
      <p className="mt-2 text-sm text-ink-muted">
        Not connected. Payment confirmation and preview deployment require manual verification.
      </p>
      <Link to="/admin/leads" className="mt-3 inline-block text-sm font-medium underline">
        Review enquiries
      </Link>
    </section>
  );
}
