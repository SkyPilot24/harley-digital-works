import type { Database } from "@/integrations/supabase/types";
import { currentStrategy } from "@/lib/current-strategy";
type LeadRow = Database["public"]["Tables"]["leads"]["Row"];
export function LeadProposalModal({ lead, onClose }: { lead: LeadRow; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="proposal-title"
        className="max-h-[90vh] max-w-xl space-y-4 overflow-y-auto rounded-2xl bg-white p-8"
      >
        <h2 id="proposal-title" className="text-xl font-semibold">
          Proposal preparation — {lead.company || lead.name}
        </h2>
        <p className="text-sm leading-6">{currentStrategy.offer}</p>
        <p className="text-sm leading-6">{currentStrategy.approval}</p>
        <h3 className="font-semibold">Proposed build scope</h3>
        <p className="text-sm leading-6">{currentStrategy.build}</p>
        <h3 className="font-semibold">Proposed monthly scope</h3>
        <p className="text-sm leading-6">{currentStrategy.care}</p>
        <p className="text-sm leading-6">
          Prepare the customer-specific agreement in the approved document and billing workflow.
          This planning summary is not a quote, contract, invoice or payment request.
        </p>
        <button autoFocus onClick={onClose} className="rounded-full bg-ink px-5 py-2 text-white">
          Close
        </button>
      </section>
    </div>
  );
}
