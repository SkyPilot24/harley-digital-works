import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { approveDeliveryRevision, getDeliveryReview } from "@/lib/delivery-approval.functions";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/client-review_/$projectId")({
  validateSearch: (search) => ({
    kind: search.kind === "preview" ? ("preview" as const) : ("proposal" as const),
  }),
  head: () => ({
    meta: [
      { title: "Review your project | Harley Digital Works" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ClientReview,
});

function ClientReview() {
  const { projectId } = Route.useParams();
  const { kind } = Route.useSearch();
  const { user, loading } = useAuth();
  const fetchReview = useServerFn(getDeliveryReview);
  const approve = useServerFn(approveDeliveryRevision);
  const cache = useQueryClient();
  const [confirmedRevision, setConfirmedRevision] = useState<string | null>(null);
  const queryKey = ["delivery-review", user?.id, projectId, kind];
  const review = useQuery({
    queryKey,
    queryFn: () => fetchReview({ data: { projectId, kind } }),
    enabled: Boolean(user) && z.string().uuid().safeParse(projectId).success,
    retry: false,
    gcTime: 0,
  });
  const approval = useMutation({
    mutationFn: () => {
      const current = review.data;
      if (!current || confirmedRevision !== current.id)
        throw new Error("Please confirm this version.");
      return approve({
        data: {
          projectId,
          revisionId: current.id,
          contentSha256: current.content_sha256,
          confirmed: true,
        },
      });
    },
    onSuccess: async () => {
      setConfirmedRevision(null);
      await cache.invalidateQueries({ queryKey });
    },
  });
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Review your project</h1>
      {loading ? (
        <p role="status" className="mt-6">
          Checking your sign-in…
        </p>
      ) : !user ? (
        <div className="mt-6">
          <p>Sign in with the account invited to your project.</p>
          <Link
            to="/auth"
            search={{ redirect: `/client-review/${projectId}?kind=${kind}` }}
            className="mt-4 inline-block underline"
          >
            Sign in
          </Link>
        </div>
      ) : review.isPending && review.fetchStatus === "fetching" ? (
        <p role="status" className="mt-6">
          Loading your review…
        </p>
      ) : !review.data ? (
        <div className="mt-6">
          <p role="alert">
            This review is unavailable. Check your project invitation or contact Harley Digital
            Works.
          </p>
          <Button className="mt-4" onClick={() => review.refetch()}>
            Try again
          </Button>
        </div>
      ) : (
        <>
          <h2 className="mt-8 text-xl font-semibold">
            {kind === "proposal" ? "Proposal" : "Website review"} · Version {review.data.revision}
          </h2>
          <div className="mt-6 whitespace-pre-wrap break-words rounded-lg border p-6">
            {review.data.review_text}
          </div>
          {review.data.approved ? (
            <p role="status" className="mt-6">
              Your approval of this version is recorded.
            </p>
          ) : (
            <form
              className="mt-6"
              onSubmit={(event) => {
                event.preventDefault();
                approval.mutate();
              }}
            >
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={confirmedRevision === review.data.id}
                  disabled={approval.isPending}
                  onChange={(event) =>
                    setConfirmedRevision(event.target.checked ? review.data!.id : null)
                  }
                />
                <span>I have reviewed this version and approve the content shown above.</span>
              </label>
              <p className="mt-3 text-sm">
                Approval applies to this version only. Launch remains subject to payment and final
                checks.
              </p>
              <Button
                type="submit"
                className="mt-4"
                disabled={approval.isPending || confirmedRevision !== review.data.id}
              >
                {approval.isPending ? "Recording approval…" : "Approve this version"}
              </Button>
              {approval.isError && (
                <p role="alert" className="mt-4">
                  Approval could not be recorded. Reload the review and try again; your approval is
                  not confirmed.
                </p>
              )}
              {approval.isError && (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-3"
                  onClick={() => {
                    setConfirmedRevision(null);
                    approval.reset();
                    review.refetch();
                  }}
                >
                  Reload review
                </Button>
              )}
            </form>
          )}
        </>
      )}
    </main>
  );
}
