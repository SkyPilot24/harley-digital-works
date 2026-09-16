import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./admin.index";

export const Route = createFileRoute("/_authenticated/admin/playbooks")({
  component: PlaybooksPage,
});

const DAILY = [
  [
    "Check leads",
    "Open Leads. Reply to every new enquiry. If a lead is unclear, ask one direct question and suggest a 15-minute call.",
  ],
  [
    "Pick one sales action",
    "Use ChatGPT to draft one outreach email, LinkedIn message, or follow-up. Send it to a real person.",
  ],
  [
    "Create one asset",
    "Use Google AI Pro or ChatGPT to draft a useful post, checklist, or client explanation. Publish or save it in Resources.",
  ],
  [
    "Run one research task",
    "Use Manus for competitor research, local niche research, or prospect list building. Turn the result into a Revenue OS task.",
  ],
  [
    "Review Diagnostics",
    "Fix red items first. Turn warnings into Revenue OS tasks only if they block sales, trust, or lead capture.",
  ],
];

const RUNBOOKS = [
  {
    title: "New lead response",
    steps: [
      "Read the lead and identify the requested outcome.",
      "Reply within one working day using plain language.",
      "Offer the smallest useful next step: Launch Plan, Automation Audit, Care Plan, or a fit call.",
      "Create a project only when the client has agreed to scope, price, and next action.",
    ],
  },
  {
    title: "Daily content machine",
    steps: [
      "Ask ChatGPT for 5 post ideas based on one service page.",
      "Use Google AI Pro to expand the best idea into a short article or checklist.",
      "Use Manus to research examples, pain points, or search intent.",
      "Publish the clearest version as a resource or social post.",
    ],
  },
  {
    title: "Weekly offer review",
    steps: [
      "Open Revenue OS and sort by highest priority.",
      "Check whether each offer has a page, price, CTA, and next action.",
      "Update one package based on real conversations from the week.",
      "Create no more than three execution tasks for the next week.",
    ],
  },
];

function PlaybooksPage() {
  return (
    <div>
      <PageHeader
        title="Playbooks"
        subtitle="Plain-English operating steps for selling, delivery, content, and daily execution."
      />

      <section className="mt-8 rounded-2xl border border-ink/10 bg-white p-6">
        <h2 className="text-lg font-semibold text-ink">Daily agency rhythm</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Do these in order. Stop when the highest-value work is done.
        </p>
        <div className="mt-5 grid gap-3">
          {DAILY.map(([title, body], index) => (
            <div key={title} className="rounded-xl bg-ink/[0.03] p-4">
              <div className="font-mono text-[11px] text-ink-muted">STEP {index + 1}</div>
              <h3 className="mt-1 font-semibold text-ink">{title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {RUNBOOKS.map((runbook) => (
          <article key={runbook.title} className="rounded-2xl border border-ink/10 bg-white p-5">
            <h2 className="text-lg font-semibold text-ink">{runbook.title}</h2>
            <ol className="mt-4 space-y-3 text-sm text-ink-muted">
              {runbook.steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="font-mono text-[11px] text-ink/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-ink/10 bg-surface-sage p-6">
        <h2 className="text-lg font-semibold text-ink">Tool rules</h2>
        <ul className="mt-4 grid gap-3 text-sm text-ink-muted md:grid-cols-3">
          <li>
            <strong className="text-ink">Manus:</strong> research, prospect lists, competitor scans,
            repeatable web tasks.
          </li>
          <li>
            <strong className="text-ink">ChatGPT:</strong> sales copy, replies, service
            descriptions, SOP drafts, offer thinking.
          </li>
          <li>
            <strong className="text-ink">Google AI Pro:</strong> long-form drafting, research
            synthesis, content expansion, docs.
          </li>
        </ul>
      </section>
    </div>
  );
}
