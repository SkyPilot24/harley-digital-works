import type { Database } from "@/integrations/supabase/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BillingUnavailable } from "@/components/admin/BillingUnavailable";

type ClientRow = Database["public"]["Tables"]["clients"]["Row"];

interface ClientInvoiceModalProps {
  client: ClientRow;
  onClose: () => void;
}

export function ClientInvoiceModal({ client, onClose }: ClientInvoiceModalProps) {
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Billing for {client.name}</DialogTitle>
        </DialogHeader>
        <BillingUnavailable />
      </DialogContent>
    </Dialog>
  );
}
