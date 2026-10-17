import { ADMIN_PAGE_SIZE } from "@/lib/admin-records";

export function AdminPagination({
  page,
  total,
  pending,
  label,
  onChange,
}: {
  page: number;
  total?: number;
  pending: boolean;
  label: string;
  onChange: (page: number) => void;
}) {
  return (
    <nav
      aria-label={`${label} pages`}
      className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm"
    >
      <p role="status">
        {total === undefined
          ? "Results unavailable"
          : `${total} matching ${label} · Page ${page + 1}`}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded-full border border-ink/20 px-4 py-2 disabled:opacity-40"
          disabled={page === 0 || pending}
          onClick={() => onChange(page - 1)}
        >
          Previous
        </button>
        <button
          type="button"
          className="rounded-full border border-ink/20 px-4 py-2 disabled:opacity-40"
          disabled={total === undefined || pending || (page + 1) * ADMIN_PAGE_SIZE >= total}
          onClick={() => onChange(page + 1)}
        >
          Next
        </button>
      </div>
    </nav>
  );
}
