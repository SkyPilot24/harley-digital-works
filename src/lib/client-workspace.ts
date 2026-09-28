import type { Database } from "../integrations/supabase/types.ts";

type Lead = Database["public"]["Tables"]["leads"]["Row"];
type Client = Database["public"]["Tables"]["clients"]["Row"];
type ClientInsert = Database["public"]["Tables"]["clients"]["Insert"];

export function clientWorkspaceForLead(lead: Lead): ClientInsert {
  return {
    // A stable primary key makes retries and concurrent clicks converge on one workspace.
    id: lead.id,
    name: lead.company || lead.name,
    contact_name: lead.name,
    contact_email: lead.email,
    status: "lead",
    monthly_value_cents: 0,
    notes: `Source lead: ${lead.id}\nPackage interest: ${lead.package || "Not specified"}\nNo agreement or payment is implied by this workspace.\n\nOriginal message:\n${lead.message}`,
  };
}

export async function ensureClientWorkspace(
  lead: Lead,
  storage: {
    find: (id: string) => Promise<Client | null>;
    insert: (client: ClientInsert) => Promise<Client>;
  },
) {
  const verify = (client: Client) => {
    if (!client.notes?.includes(`Source lead: ${lead.id}`)) {
      throw new Error(
        "An existing client record needs manual reconciliation. No records were overwritten.",
      );
    }
    return client;
  };
  const existing = await storage.find(lead.id);
  if (existing) return verify(existing);
  try {
    return await storage.insert(clientWorkspaceForLead(lead));
  } catch (error) {
    if (typeof error !== "object" || error === null || !("code" in error) || error.code !== "23505")
      throw error;
    const concurrent = await storage.find(lead.id);
    if (!concurrent) throw error;
    return verify(concurrent);
  }
}

export function recordedActiveMonthlyValue(
  clients: Pick<Client, "status" | "monthly_value_cents">[],
) {
  return clients.reduce((total, client) => {
    const amount = client.monthly_value_cents;
    return client.status === "active" &&
      typeof amount === "number" &&
      Number.isSafeInteger(amount) &&
      amount > 0
      ? total + amount
      : total;
  }, 0);
}
