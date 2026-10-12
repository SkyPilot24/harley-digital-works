import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminDeliveryReview,
  publishDeliveryReview,
  setDeliveryProjectAccess,
} from "@/lib/delivery-approval.functions";
import { listAdminUsers } from "@/lib/admin-users.functions";
import { Button } from "@/components/ui/button";

export function DeliveryReviewPanel({ projectId }: { projectId: string }) {
  const [kind, setKind] = useState<"proposal" | "preview">("proposal");
  const [text, setText] = useState("");
  const [commit, setCommit] = useState("");
  const [userId, setUserId] = useState("");
  const [notice, setNotice] = useState("");
  const read = useServerFn(getAdminDeliveryReview);
  const publish = useServerFn(publishDeliveryReview);
  const setAccess = useServerFn(setDeliveryProjectAccess);
  const usersFn = useServerFn(listAdminUsers);
  const cache = useQueryClient();
  const key = ["admin-delivery-review", projectId, kind];
  const current = useQuery({
    queryKey: key,
    queryFn: () => read({ data: { projectId, kind } }),
    retry: false,
    gcTime: 0,
    refetchOnWindowFocus: false,
  });
  const users = useQuery({
    queryKey: ["delivery-review-users"],
    queryFn: () => usersFn(),
    enabled: current.isSuccess,
    retry: false,
    gcTime: 0,
  });
  const publication = useMutation({
    mutationFn: () => {
      if (!current.data) throw new Error("Review unavailable");
      return publish({
        data: {
          projectId,
          kind,
          reviewText: text,
          sourceCommit: kind === "preview" ? commit : null,
          expectedRevision: current.data.revision,
        },
      });
    },
    onSuccess: async () => {
      setNotice("Review version saved. No invitation has been sent.");
      await cache.invalidateQueries({ queryKey: key });
    },
  });
  const access = useMutation({
    mutationFn: (active: boolean) => setAccess({ data: { projectId, userId, active } }),
    onSuccess: (result) =>
      setNotice(
        result.active
          ? "Project access granted. No invitation has been sent."
          : "Project access revoked.",
      ),
  });
  const busy = publication.isPending || access.isPending;
  return (
    <section
      className="rounded-lg border border-ink/10 p-4 space-y-4"
      aria-label="Client review controls"
    >
      <h4 className="font-semibold">Client review</h4>
      {!current.data ? (
        <>
          <p role={current.isError ? "alert" : "status"}>
            {current.isError
              ? "Review controls are unavailable. Check the staging configuration and sign-in."
              : "Loading review controls…"}
          </p>
          <Button variant="outline" onClick={() => current.refetch()}>
            Retry
          </Button>
        </>
      ) : (
        <>
          <label className="block text-sm">
            Review type
            <select
              className="mt-1 block w-full rounded border p-2"
              value={kind}
              disabled={busy}
              onChange={(e) => {
                setKind(e.target.value as "proposal" | "preview");
                setText("");
                setCommit("");
                setNotice("");
                publication.reset();
              }}
            >
              <option value="proposal">Proposal</option>
              <option value="preview">Website review</option>
            </select>
          </label>
          <p className="text-sm">
            {current.data.revision
              ? `Latest saved version: ${current.data.revision}`
              : "No version saved yet."}
          </p>
          {current.data.reviewText && (
            <details>
              <summary className="cursor-pointer">Read saved version</summary>
              <p className="mt-3 whitespace-pre-wrap break-words">{current.data.reviewText}</p>
            </details>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setNotice("");
              publication.mutate();
            }}
            className="space-y-3"
          >
            <label className="block text-sm">
              Content for the customer
              <textarea
                className="mt-1 block min-h-40 w-full rounded border p-2"
                required
                maxLength={65536}
                value={text}
                disabled={busy}
                onChange={(e) => setText(e.target.value)}
              />
            </label>
            {kind === "preview" && (
              <label className="block text-sm">
                Website source version
                <input
                  className="mt-1 block w-full rounded border p-2"
                  required
                  pattern="[0-9a-f]{40}"
                  value={commit}
                  disabled={busy}
                  onChange={(e) => setCommit(e.target.value)}
                />
                <span className="text-xs">
                  Use the full source commit from the verified website build.
                </span>
              </label>
            )}
            <p className="text-xs">
              Saving creates an immutable review version. It does not approve or launch the website.
            </p>
            <Button disabled={busy || !text.trim()} type="submit">
              {publication.isPending ? "Saving…" : "Save new review version"}
            </Button>
            {publication.isError && (
              <p role="alert">
                Could not save. Your draft is still here. Reload the latest version before retrying.
              </p>
            )}
          </form>
          <Button
            variant="outline"
            disabled={busy}
            onClick={() => {
              publication.reset();
              current.refetch();
            }}
          >
            Reload latest version
          </Button>
          <label className="block text-sm">
            Customer account
            <select
              className="mt-1 block w-full rounded border p-2"
              value={userId}
              disabled={busy}
              onChange={(e) => setUserId(e.target.value)}
            >
              <option value="">Select an existing signed-up account</option>
              {users.data?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.email ?? "Account without email"}
                </option>
              ))}
            </select>
          </label>
          {users.isError && <p role="alert">Customer accounts could not be loaded.</p>}
          <div className="flex flex-wrap gap-2">
            <Button
              disabled={busy || !userId}
              onClick={() => {
                setNotice("");
                access.mutate(true);
              }}
            >
              Grant project access
            </Button>
            <Button
              variant="outline"
              disabled={busy || !userId}
              onClick={() => {
                setNotice("");
                access.mutate(false);
              }}
            >
              Revoke project access
            </Button>
          </div>
          {access.isError && (
            <p role="alert">Access could not be changed. No change is confirmed.</p>
          )}
          <a
            className="inline-block underline text-sm"
            href={`/client-review/${projectId}?kind=${kind}`}
          >
            Open customer review
          </a>
          {notice && <p role="status">{notice}</p>}
        </>
      )}
    </section>
  );
}

export function ProjectReviewDetails({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  return (
    <details onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary className="cursor-pointer text-sm font-semibold">
        Manage customer review and access
      </summary>
      {open && <DeliveryReviewPanel projectId={projectId} />}
    </details>
  );
}
