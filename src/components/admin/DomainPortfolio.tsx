import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  emptyInventory,
  applyImport,
  previewChanges,
  renewalAlerts,
  updateDomain,
  type ImportPreview,
  type InventoryDomain,
} from "@/lib/domain-inventory";
import { loadLocalInventory, saveLocalInventory } from "@/lib/domain-local-store";

const today = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
const money = (pence: number | null) =>
  pence === null
    ? "Unknown"
    : new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(pence / 100);
export function DomainPortfolio() {
  const [snapshot, setSnapshot] = useState(emptyInventory);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<"inventory" | "imports" | "renewals">("inventory");
  const [query, setQuery] = useState("");
  const [observedOn, setObservedOn] = useState(today);
  const [asOf, setAsOf] = useState(today);
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [source, setSource] = useState("");
  const [batchId, setBatchId] = useState("");
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<InventoryDomain | null>(null);
  const workerRef = useRef<Worker | null>(null);
  useEffect(() => {
    try {
      setSnapshot(loadLocalInventory());
      setLoaded(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load local data.");
    }
    return () => workerRef.current?.terminate();
  }, []);
  const changes = useMemo(
    () => previewChanges(preview?.rows || [], snapshot.domains),
    [preview, snapshot.domains],
  );
  const alerts = useMemo(
    () => renewalAlerts(snapshot.domains, asOf, snapshot.acknowledgements),
    [snapshot, asOf],
  );
  function save(next: typeof snapshot) {
    try {
      saveLocalInventory(next, snapshot.revision);
      setSnapshot(next);
      setMessage("Saved on this computer.");
      return true;
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to save. Existing data has been preserved.",
      );
      return false;
    }
  }
  async function readFile(file?: File) {
    setPreview(null);
    setMessage("");
    workerRef.current?.terminate();
    if (!file) return;
    if (file.size > 2 * 1024 * 1024 || !/\.(csv|xls|xlsx)$/i.test(file.name)) {
      setMessage("Choose a CSV, XLS or XLSX file smaller than 2 MB.");
      return;
    }
    setBusy(true);
    setSource(file.name);
    try {
      const bytes = await file.arrayBuffer();
      const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
      setBatchId(
        `${Array.from(digest, (byte) => byte.toString(16).padStart(2, "0")).join("")}:${observedOn}`,
      );
      const worker = new Worker(new URL("../../lib/domain-import.worker.ts", import.meta.url), {
        type: "module",
      });
      workerRef.current = worker;
      const result = await new Promise<ImportPreview>((resolve, reject) => {
        const timer = setTimeout(() => {
          worker.terminate();
          reject(new Error("Import took too long. Use a smaller export."));
        }, 15000);
        worker.onmessage = (event) => {
          clearTimeout(timer);
          worker.terminate();
          if (event.data.error) reject(new Error(event.data.error));
          else resolve(event.data.preview);
        };
        worker.onerror = () => {
          clearTimeout(timer);
          worker.terminate();
          reject(new Error("Unable to read export. No records were saved."));
        };
        worker.postMessage({ bytes, observedOn }, [bytes]);
      });
      setPreview(result);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to read export.");
    } finally {
      setBusy(false);
    }
  }
  function commitImport() {
    if (!preview) return;
    try {
      if (save(applyImport(snapshot, preview, source, observedOn, batchId))) {
        setPreview(null);
        setTab("inventory");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Import failed. No records saved.");
    }
  }
  const filtered = snapshot.domains.filter((domain) =>
    `${domain.name} ${domain.contract} ${domain.purpose}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <main className="mx-auto max-w-7xl space-y-6 p-4 text-ink sm:p-8">
      <header>
        <p className="text-sm text-ink-muted">The Harley Group</p>
        <h1 className="text-3xl font-semibold tracking-tight">Domain Portfolio</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Inventory, registrar imports and upcoming renewals.
        </p>
      </header>
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm">
        Local working copy · Saved only in this browser. No production connection or notifications.
        Back up your working copy before clearing browser data.
      </div>
      {message && (
        <p role="status" className="rounded-xl border border-ink/15 bg-white p-4 text-sm">
          {message}
        </p>
      )}
      {!loaded ? (
        <p>Local storage is unavailable. Existing data has not been overwritten.</p>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Inventory", snapshot.domains.length],
              ["Due within 90 days", alerts.length],
              [
                "Costs awaiting evidence",
                snapshot.domains.filter((domain) => domain.annualCostPence === null).length,
              ],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-ink/10 bg-white p-5">
                <p className="text-sm text-ink-muted">{label}</p>
                <p className="mt-1 text-2xl font-semibold">{value}</p>
              </div>
            ))}
          </div>
          <nav aria-label="Domain portfolio sections" className="flex flex-wrap gap-2">
            {(["inventory", "imports", "renewals"] as const).map((item) => (
              <Button
                key={item}
                variant={tab === item ? "default" : "outline"}
                aria-current={tab === item ? "page" : undefined}
                onClick={() => setTab(item)}
              >
                {item === "renewals"
                  ? "Renewal alerts"
                  : item === "imports"
                    ? "Imports"
                    : "Inventory"}
              </Button>
            ))}
          </nav>
          {tab === "inventory" && (
            <section className="space-y-4" aria-label="Portfolio inventory">
              <Label htmlFor="domain-search">Search names, contracts or purpose</Label>
              <Input
                id="domain-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <div className="overflow-x-auto rounded-xl border border-ink/10 bg-white">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Private domain inventory</caption>
                  <thead>
                    <tr className="border-b bg-ink/5">
                      {[
                        "Domain",
                        "Registrar / contract",
                        "Expiry",
                        "Annual cost (GBP)",
                        "Auto-renew",
                        "Purpose",
                        "Details",
                      ].map((title) => (
                        <th key={title} scope="col" className="whitespace-nowrap p-3">
                          {title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((domain) => (
                      <tr key={domain.name} className="border-b">
                        <th scope="row" className="p-3 font-medium">
                          {domain.name}
                          <span className="block text-xs font-normal text-ink-muted">
                            {domain.registrarStatus} · observed {domain.observedOn}
                          </span>
                        </th>
                        <td className="p-3">
                          {domain.registrar}
                          <span className="block text-xs">
                            {domain.contract || "Unknown contract"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap p-3">{domain.expiresOn || "Unknown"}</td>
                        <td className="p-3">{money(domain.annualCostPence)}</td>
                        <td className="p-3">{domain.autoRenew}</td>
                        <td className="p-3">{domain.purpose}</td>
                        <td className="p-3">
                          <Button
                            variant="outline"
                            size="sm"
                            aria-label={`Edit ${domain.name}`}
                            onClick={() => setEditing({ ...domain })}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!filtered.length && (
                <p className="text-sm text-ink-muted">
                  {snapshot.domains.length
                    ? "No matching domains."
                    : "Import a registrar export to create your local inventory."}
                </p>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  const url = URL.createObjectURL(
                    new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" }),
                  );
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = `domain-portfolio-local-${today()}.json`;
                  link.click();
                  URL.revokeObjectURL(url);
                }}
              >
                Download private working copy
              </Button>
            </section>
          )}
          {tab === "imports" && (
            <section className="space-y-4" aria-label="Registrar imports">
              <h2 className="text-xl font-semibold">Review before saving</h2>
              <p className="text-sm text-ink-muted">
                IONOS CSV, XLS or XLSX. We match complete domain names, preserve your notes and
                never delete absent domains. Older or conflicting observations need review. This
                export cannot establish renewal prices, auto-renew settings or sale status.
              </p>
              <Label htmlFor="observed-date">Export obtained on</Label>
              <Input
                id="observed-date"
                type="date"
                value={observedOn}
                disabled={busy}
                onChange={(event) => {
                  setObservedOn(event.target.value);
                  setPreview(null);
                }}
              />
              <Label htmlFor="registrar-file">Registrar export</Label>
              <Input
                id="registrar-file"
                type="file"
                accept=".csv,.xls,.xlsx"
                disabled={busy || !observedOn}
                onChange={(event) => void readFile(event.target.files?.[0])}
              />
              {busy && <p role="status">Reading export…</p>}
              {preview && (
                <>
                  <p>
                    {changes.filter((change) => change.action === "add").length} new ·{" "}
                    {changes.filter((change) => change.action === "update").length} updated ·{" "}
                    {changes.filter((change) => change.action === "unchanged").length} unchanged ·{" "}
                    {changes.filter((change) => change.action === "conflict").length} conflicts
                  </p>
                  {preview.errors.length > 0 && (
                    <ul role="alert" className="list-disc pl-5 text-sm">
                      {preview.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  )}
                  <div className="max-h-96 overflow-auto rounded-xl border bg-white">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr>
                          <th scope="col" className="p-3">
                            Domain
                          </th>
                          <th scope="col" className="p-3">
                            Previous expiry
                          </th>
                          <th scope="col" className="p-3">
                            Export expiry
                          </th>
                          <th scope="col" className="p-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {changes.map((change) => (
                          <tr key={change.row.name} className="border-t">
                            <th scope="row" className="p-3 font-medium">
                              {change.row.name}
                            </th>
                            <td className="p-3">{change.previous?.expiresOn || "—"}</td>
                            <td className="p-3">{change.row.expiresOn || "Unknown"}</td>
                            <td className="p-3">{change.action}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Button
                    disabled={
                      !!preview.errors.length ||
                      !preview.rows.length ||
                      changes.some((change) => change.action === "conflict")
                    }
                    onClick={commitImport}
                  >
                    Save reviewed import locally
                  </Button>
                  <Button variant="outline" onClick={() => setPreview(null)}>
                    Discard preview
                  </Button>
                </>
              )}
              <h3 className="font-semibold">Import history</h3>
              {snapshot.imports.map((batch) => (
                <p key={batch.id} className="text-sm">
                  {batch.observedOn} · {batch.source} · {batch.count} rows
                </p>
              ))}
            </section>
          )}
          {tab === "renewals" && (
            <section className="space-y-4" aria-label="Renewal alerts">
              <h2 className="text-xl font-semibold">Upcoming renewal decisions</h2>
              <Label htmlFor="renewal-date">Reporting date (UK)</Label>
              <Input
                id="renewal-date"
                type="date"
                value={asOf}
                onChange={(event) => {
                  if (event.target.value) setAsOf(event.target.value);
                }}
              />
              <p className="text-sm text-ink-muted">
                90 / 60 / 30 / 7-day windows, including overdue domains. Acknowledging an alert does
                not renew a domain; a new expiry or a more urgent window creates a fresh alert.
                Dates reflect the last imported observation.
              </p>
              {alerts.map((alert) => (
                <article
                  key={alert.key}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink/10 bg-white p-4"
                >
                  <div>
                    <h3 className="font-medium">{alert.domain.name}</h3>
                    <p className="text-sm">
                      {alert.severity} · {alert.domain.expiresOn} ·{" "}
                      {alert.days < 0
                        ? `${-alert.days} days overdue`
                        : `${alert.days} days remaining`}
                    </p>
                    <p className="text-xs text-ink-muted">
                      Auto-renew: {alert.domain.autoRenew} · Cost:{" "}
                      {money(alert.domain.annualCostPence)} · observed {alert.domain.observedOn}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() =>
                      save({
                        ...snapshot,
                        revision: snapshot.revision + 1,
                        acknowledgements: alert.acknowledged
                          ? snapshot.acknowledgements.filter((key) => key !== alert.key)
                          : [...snapshot.acknowledgements, alert.key],
                      })
                    }
                  >
                    {alert.acknowledged ? "Reopen alert" : "Acknowledge"}
                  </Button>
                </article>
              ))}
              {!alerts.length && <p>No known expiry dates within 90 days.</p>}
              {snapshot.domains.some((domain) => !domain.expiresOn) && (
                <p role="status">Some domains have no expiry date. Review them in Inventory.</p>
              )}
            </section>
          )}
          {editing && (
            <Dialog
              open
              onOpenChange={(open) => {
                if (!open) setEditing(null);
              }}
            >
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogTitle>{editing.name}</DialogTitle>
                <DialogDescription>
                  Private details saved on this computer. Registrar dates remain linked to the
                  import evidence.
                </DialogDescription>
                <form
                  className="grid gap-4 sm:grid-cols-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    try {
                      if (save(updateDomain(snapshot, editing))) setEditing(null);
                    } catch (error) {
                      setMessage(error instanceof Error ? error.message : "Unable to save.");
                    }
                  }}
                >
                  <div>
                    <Label htmlFor="purpose">Purpose</Label>
                    <select
                      id="purpose"
                      className="block w-full rounded-md border p-2"
                      value={editing.purpose}
                      onChange={(event) =>
                        setEditing({
                          ...editing,
                          purpose: event.target.value as InventoryDomain["purpose"],
                        })
                      }
                    >
                      {[
                        "review",
                        "operational",
                        "client",
                        "community",
                        "personal",
                        "investment",
                      ].map((purpose) => (
                        <option key={purpose}>{purpose}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="auto-renew">Auto-renew (confirmed separately)</Label>
                    <select
                      id="auto-renew"
                      className="block w-full rounded-md border p-2"
                      value={editing.autoRenew}
                      onChange={(event) =>
                        setEditing({
                          ...editing,
                          autoRenew: event.target.value as InventoryDomain["autoRenew"],
                        })
                      }
                    >
                      {["unknown", "on", "off"].map((value) => (
                        <option key={value}>{value}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="annual-cost">
                      Expected annual renewal cost, GBP (unknown if blank)
                    </Label>
                    <Input
                      id="annual-cost"
                      type="number"
                      min="0"
                      max="1000000"
                      step="0.01"
                      value={editing.annualCostPence === null ? "" : editing.annualCostPence / 100}
                      onChange={(event) =>
                        setEditing({
                          ...editing,
                          annualCostPence:
                            event.target.value === ""
                              ? null
                              : Math.round(Number(event.target.value) * 100),
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="domain-notes">Evidence and private notes</Label>
                    <textarea
                      id="domain-notes"
                      className="block w-full rounded-md border p-2"
                      maxLength={2000}
                      value={editing.notes}
                      onChange={(event) => setEditing({ ...editing, notes: event.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">Save details locally</Button>
                    <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </>
      )}
    </main>
  );
}
