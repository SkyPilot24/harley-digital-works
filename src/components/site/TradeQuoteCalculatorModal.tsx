import { Calculator } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function FloatingQuoteCalculatorBadge({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="View package pricing"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#081B30] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#0F2642] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10B981]"
    >
      <Calculator className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
      <span>Package pricing</span>
    </button>
  );
}

export function TradeQuoteCalculatorModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto border-[#dce9ff] bg-[#F7F5EE] text-[#081B30] sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Managed website package</DialogTitle>
          <DialogDescription className="text-[#44474d]">
            Clear pricing for our standard package. We will confirm the agreed scope and schedule
            before work begins.
          </DialogDescription>
        </DialogHeader>

        <dl className="divide-y divide-[#dce9ff] rounded-lg border border-[#dce9ff] bg-white px-4">
          <div className="flex items-center justify-between gap-4 py-4">
            <dt className="font-medium">Website setup</dt>
            <dd className="font-mono text-lg font-bold">£1,495</dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-4">
            <dt className="font-medium">Ongoing managed care</dt>
            <dd className="font-mono text-lg font-bold">£249 / month</dd>
          </div>
        </dl>

        <Link
          to="/contact"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#081B30] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0F2642] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006c49]"
        >
          Tell us about your project
        </Link>
      </DialogContent>
    </Dialog>
  );
}
