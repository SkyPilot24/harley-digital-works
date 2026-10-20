import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ExternalLink, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SocialMediaContentGuide } from "@/components/admin/SocialMediaContentGuide";
import {
  headquartersUrl,
  headquartersAsOf,
  headquartersLinks,
  groupPortfolio,
  groupPriorities,
} from "@/lib/group-headquarters";

const linkStyle =
  "inline-flex items-center gap-2 rounded-lg border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink";

export function GroupHeadquartersSummary() {
  return (
    <section
      className="rounded-xl border border-ink/10 bg-white p-5"
      aria-labelledby="group-hq-summary"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src="/brand/social/hdw-guild-seal-badge.jpg"
            alt="Trade Quality Guild Seal Stamp"
            className="h-12 w-12 rounded-full border border-amber-600/30 shadow-md shrink-0 hidden sm:block"
            loading="lazy"
          />
          <div>
            <h2
              id="group-hq-summary"
              className="flex items-center gap-2 text-lg font-bold text-ink"
            >
              <Building2 size={20} /> Group Headquarters & Control Centre
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Companies, priorities, brand assets, operational KB, and marketing in one place.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/brand" className={linkStyle}>
            Brand & Guild Seal ↗
          </Link>
          <Link to="/admin/knowledge-base" className={linkStyle}>
            Knowledge Base
          </Link>
          <Link to="/admin/headquarters" className={linkStyle}>
            Open group overview
          </Link>
          <a href={headquartersUrl} target="_blank" rel="noopener noreferrer" className={linkStyle}>
            Open shared Drive <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function GroupHeadquarters() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All links");
  const [companySearch, setCompanySearch] = useState("");
  const groups = ["All links", ...new Set(headquartersLinks.map((item) => item.group))];
  const links = headquartersLinks.filter(
    (item) =>
      (category === "All links" || item.group === category) &&
      `${item.title} ${item.description} ${item.url}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );
  const companies = groupPortfolio.filter((item) =>
    `${item.name} ${item.relationship} ${item.focus} ${item.status}`
      .toLowerCase()
      .includes(companySearch.trim().toLowerCase()),
  );

  return (
    <div className="space-y-6 pb-12">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
          Group Headquarters
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-ink-muted">
          Oversee The Harley Group, Harley Digital Works, Harley Labs and associated projects.
          Reference snapshot: {headquartersAsOf}. Records and links are not live monitoring; open
          the operational views for current data.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={headquartersUrl} target="_blank" rel="noopener noreferrer" className={linkStyle}>
            Shared headquarters <ExternalLink size={14} aria-hidden="true" />
          </a>
          <Link to="/admin" className={linkStyle}>
            Live operations
          </Link>
          <Link to="/admin/diagnostics" className={linkStyle}>
            Automation & health
          </Link>
          <Link to="/admin/revenue-os" className={linkStyle}>
            Sales & marketing
          </Link>
          <Link to="/admin/invoices" className={linkStyle}>
            Finance
          </Link>
          <a href="#marketing-socials" className={linkStyle}>
            Marketing & socials
          </a>
        </div>
      </header>

      <section className="rounded-xl border border-ink/10 bg-white p-5" aria-labelledby="hq-links">
        <h2 id="hq-links" className="text-lg font-bold text-ink">
          Company links & workspaces
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          Headquarters documents, all ten departments, source records and repository references.
          External services require your existing access.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
          <div>
            <label htmlFor="hq-link-search" className="mb-1 block text-sm font-medium text-ink">
              Find a link
            </label>
            <Input
              id="hq-link-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search automation, marketing, domains…"
            />
          </div>
          <div>
            <label htmlFor="hq-link-category" className="mb-1 block text-sm font-medium text-ink">
              Link category
            </label>
            <select
              id="hq-link-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-9 w-full rounded-md border border-input bg-white px-3 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              {groups.map((group) => (
                <option key={group}>{group}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="my-3 text-xs text-ink-muted" role="status">
          {links.length} of {headquartersLinks.length} links
        </p>
        <div className="max-h-[32rem] overflow-y-auto rounded-lg border border-ink/10">
          {links.length === 0 ? (
            <p className="p-5 text-sm text-ink-muted">
              No links match. Try another search or category.
            </p>
          ) : (
            <ul className="divide-y divide-ink/10">
              {links.map((item) => (
                <li key={`${item.group}-${item.url}`}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 p-4 hover:bg-ink/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink"
                  >
                    <div className="min-w-0">
                      <span className="block break-words text-sm font-semibold text-ink">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-xs text-ink-muted">
                        {item.group} · {item.description}
                      </span>
                    </div>
                    <ExternalLink
                      size={15}
                      className="mt-1 shrink-0 text-ink-muted"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <details className="rounded-xl border border-ink/10 bg-white p-5" open>
        <summary className="cursor-pointer text-lg font-bold text-ink">
          Companies & projects ({groupPortfolio.length})
        </summary>
        <p className="mt-2 text-sm text-ink-muted">
          Recorded relationships and next actions. Associated and historical projects are labelled
          separately from Group brands.
        </p>
        <label htmlFor="hq-company-search" className="mb-1 mt-4 block text-sm font-medium text-ink">
          Find a company or project
        </label>
        <Input
          id="hq-company-search"
          type="search"
          value={companySearch}
          onChange={(event) => setCompanySearch(event.target.value)}
          placeholder="Search Works, Labs, ContentFlow…"
        />
        <p className="my-3 text-xs text-ink-muted" role="status">
          {companies.length} of {groupPortfolio.length} records
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {companies.map((item) => (
            <article key={item.id} className="rounded-lg border border-ink/10 p-4">
              <h3 className="font-semibold text-ink">{item.name}</h3>
              <p className="mt-1 text-xs text-ink-muted">
                {item.relationship} · {item.priority} priority
              </p>
              <p className="mt-3 text-sm text-ink">{item.status}</p>
              <p className="mt-2 text-sm text-ink-muted">{item.focus}</p>
              <p className="mt-3 text-sm text-ink">
                <strong>Next:</strong> {item.next_action}
              </p>
              <p className="mt-2 text-xs text-ink-muted">
                <strong>Blockers:</strong> {item.blockers}
              </p>
            </article>
          ))}
        </div>
        {companies.length === 0 && (
          <p className="py-4 text-sm text-ink-muted">No companies or projects match your search.</p>
        )}
      </details>

      <details className="rounded-xl border border-ink/10 bg-white p-5">
        <summary className="cursor-pointer text-lg font-bold text-ink">Next ten priorities</summary>
        <p className="mt-2 text-sm text-ink-muted">
          Planning snapshot from {headquartersAsOf}; consult the current backlog before acting.
        </p>
        <ol className="mt-4 space-y-4">
          {groupPriorities.map((item) => (
            <li key={item.rank} className="border-b border-ink/10 pb-4 last:border-0">
              <h3 className="text-sm font-semibold text-ink">
                {item.rank}. {item.action}
              </h3>
              <p className="mt-1 text-xs text-ink-muted">
                {item.ids} · {item.owner} · {item.timing}
              </p>
              <p className="mt-2 text-sm text-ink-muted">{item.work}</p>
            </li>
          ))}
        </ol>
      </details>

      <section
        id="marketing-socials"
        className="scroll-mt-20 rounded-xl border border-ink/10 bg-white p-5"
        aria-labelledby="hq-socials"
      >
        <h2 id="hq-socials" className="text-lg font-bold text-ink">
          Marketing & socials
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          Plan content and set up profiles here. Company social accounts have not yet been set up. A
          publishing scheduler and social analytics are not connected.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {["LinkedIn", "Instagram", "Facebook"].map((platform) => (
            <div key={platform} className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h3 className="text-sm font-semibold text-ink">{platform}</h3>
              <p className="mt-1 text-xs text-amber-900">Not yet set up</p>
            </div>
          ))}
        </div>
        <details className="mt-5">
          <summary className="cursor-pointer text-sm font-semibold text-ink">
            Open weekly content and profile setup guide
          </summary>
          <SocialMediaContentGuide />
        </details>
      </section>
    </div>
  );
}
