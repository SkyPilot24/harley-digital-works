ALTER TABLE public.delivery_revisions ADD UNIQUE(id,content_sha256);
CREATE TABLE public.delivery_review_artifacts (
 revision_id uuid PRIMARY KEY,
 content_sha256 text NOT NULL,
 review_text text NOT NULL CHECK(length(review_text) BETWEEN 1 AND 65536),
 FOREIGN KEY(revision_id,content_sha256) REFERENCES public.delivery_revisions(id,content_sha256),
 CHECK(content_sha256=encode(sha256(convert_to(review_text,'UTF8')),'hex'))
);
ALTER TABLE public.delivery_review_artifacts ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.delivery_review_artifacts FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT ON public.delivery_review_artifacts TO service_role;

CREATE FUNCTION public.require_delivery_artifact() RETURNS trigger
 LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
BEGIN
 IF NOT EXISTS(SELECT 1 FROM public.delivery_review_artifacts WHERE revision_id=NEW.revision_id)
 THEN RAISE EXCEPTION 'Readable review artifact required'; END IF;
 RETURN NEW;
END;
$$;
CREATE TRIGGER approval_requires_artifact BEFORE INSERT ON public.delivery_approvals
 FOR EACH ROW EXECUTE FUNCTION public.require_delivery_artifact();
REVOKE ALL ON FUNCTION public.require_delivery_artifact() FROM PUBLIC,anon,authenticated;

CREATE FUNCTION public.get_delivery_review(p_project_id uuid,p_user_id uuid,p_kind text)
 RETURNS TABLE(id uuid,kind text,revision integer,content_sha256 text,source_commit text,review_text text,approved boolean)
 LANGUAGE sql SECURITY INVOKER SET search_path='' AS $$
 SELECT r.id,r.kind,r.revision,r.content_sha256,r.source_commit,a.review_text,
 EXISTS(SELECT 1 FROM public.delivery_approvals d WHERE d.revision_id=r.id AND d.approver_user_id=p_user_id)
 FROM public.delivery_revisions r
 JOIN public.delivery_review_artifacts a ON a.revision_id=r.id
 JOIN public.delivery_project_access m ON m.project_id=r.project_id AND m.user_id=p_user_id AND m.active
 WHERE r.project_id=p_project_id AND r.kind=p_kind
 AND NOT EXISTS(SELECT 1 FROM public.delivery_revisions newer
 WHERE newer.project_id=r.project_id AND newer.kind=r.kind AND newer.revision>r.revision);
$$;
REVOKE ALL ON FUNCTION public.get_delivery_review(uuid,uuid,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.get_delivery_review(uuid,uuid,text) TO service_role;
