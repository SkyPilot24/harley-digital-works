ALTER TABLE public.delivery_revisions ADD COLUMN published_by uuid REFERENCES auth.users(id);
CREATE FUNCTION public.publish_delivery_review(
 p_project_id uuid,p_user_id uuid,p_kind text,p_review_text text,p_source_commit text,p_expected_revision integer
) RETURNS uuid LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
DECLARE latest public.delivery_revisions; new_id uuid; next_revision integer; digest text;
BEGIN
 IF NOT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id=p_user_id AND role='admin')
 THEN RAISE EXCEPTION 'Administrator required'; END IF;
 IF p_expected_revision IS NULL OR p_expected_revision<0
 OR p_kind IS NULL OR p_kind NOT IN ('proposal','preview')
 OR p_review_text IS NULL OR length(p_review_text) NOT BETWEEN 1 AND 65536
 THEN RAISE EXCEPTION 'Invalid review'; END IF;
 PERFORM 1 FROM public.projects WHERE id=p_project_id FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Project unavailable'; END IF;
 digest:=encode(sha256(convert_to(p_review_text,'UTF8')),'hex');
 SELECT * INTO latest FROM public.delivery_revisions
 WHERE project_id=p_project_id AND kind=p_kind ORDER BY revision DESC LIMIT 1;
 IF FOUND AND latest.revision=p_expected_revision+1
 AND latest.content_sha256=digest AND latest.source_commit IS NOT DISTINCT FROM p_source_commit
 AND latest.published_by=p_user_id
 AND EXISTS(SELECT 1 FROM public.delivery_review_artifacts WHERE revision_id=latest.id)
 THEN RETURN latest.id; END IF;
 IF coalesce(latest.revision,0)<>p_expected_revision
 THEN RAISE EXCEPTION 'Review changed; reload before publishing'; END IF;
 next_revision:=coalesce(latest.revision,0)+1;
 INSERT INTO public.delivery_revisions(project_id,kind,revision,content_sha256,source_commit,published_by)
 VALUES(p_project_id,p_kind,next_revision,digest,p_source_commit,p_user_id) RETURNING id INTO new_id;
 INSERT INTO public.delivery_review_artifacts(revision_id,content_sha256,review_text)
 VALUES(new_id,digest,p_review_text);
 RETURN new_id;
END;
$$;
REVOKE ALL ON FUNCTION public.publish_delivery_review(uuid,uuid,text,text,text,integer) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.publish_delivery_review(uuid,uuid,text,text,text,integer) TO service_role;
