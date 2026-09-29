import type { Database } from "@/integrations/supabase/types";
type ClientRow = Database["public"]["Tables"]["clients"]["Row"];
export function ClientMonthlyReportModal({
  client,
  onClose,
}: {
  client: ClientRow;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-title"
        className="max-w-lg space-y-4 rounded-2xl bg-white p-8"
      >
        <h2 id="report-title" className="text-xl font-semibold">
          Monthly report — {client.name}
        </h2>
        <p className="text-sm leading-6">
          Verified analytics, enquiry activity, maintenance and support records are not connected. A
          customer report cannot be generated from the monthly fee.
        </p>
        <p className="text-sm leading-6">
          Prepare the report from actual provider data, work completed and the next agreed
          improvement. Mark unavailable measurements as unknown.
        </p>
        <button autoFocus onClick={onClose} className="rounded-full bg-ink px-5 py-2 text-white">
          Close
        </button>
      </section>
    </div>
  );
}
