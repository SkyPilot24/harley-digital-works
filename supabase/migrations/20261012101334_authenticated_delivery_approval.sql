CREATE TABLE public.delivery_project_access (
 project_id uuid NOT NULL REFERENCES public.projects(id),
 user_id uuid NOT NULL REFERENCES auth.users(id),
 active boolean NOT NULL DEFAULT true,
 granted_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(project_id,user_id)
);
ALTER TABLE public.delivery_project_access ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.delivery_project_access FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT,UPDATE ON public.delivery_project_access TO service_role;

CREATE FUNCTION public.approve_delivery_revision(
 p_project_id uuid,p_user_id uuid,p_revision_id uuid,p_content_sha256 text
) RETURNS uuid LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
DECLARE revision public.delivery_revisions; approval_id uuid; evidence_id uuid;
BEGIN
 -- Serialize approval with membership changes. The server supplies the user ID
 -- only after verifying a current Supabase Auth session.
 PERFORM 1 FROM public.delivery_project_access
 WHERE project_id=p_project_id AND user_id=p_user_id AND active FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Project access denied'; END IF;
 SELECT * INTO revision FROM public.delivery_revisions
 WHERE id=p_revision_id AND project_id=p_project_id;
 IF NOT FOUND OR revision.content_sha256 IS DISTINCT FROM p_content_sha256
 THEN RAISE EXCEPTION 'Revision mismatch'; END IF;
 -- Approval records always name a version. A later insert cannot transfer it.
 IF EXISTS(SELECT 1 FROM public.delivery_revisions
 WHERE project_id=p_project_id AND kind=revision.kind AND delivery_revisions.revision>revision.revision)
 THEN RAISE EXCEPTION 'Revision superseded'; END IF;
 SELECT id INTO approval_id FROM public.delivery_approvals
 WHERE revision_id=p_revision_id AND approver_user_id=p_user_id;
 IF FOUND THEN RETURN approval_id; END IF;
 INSERT INTO public.delivery_identity_evidence(project_id,user_id)
 VALUES(p_project_id,p_user_id) RETURNING id INTO evidence_id;
 INSERT INTO public.delivery_approvals(revision_id,project_id,approver_user_id,identity_evidence_id)
 VALUES(p_revision_id,p_project_id,p_user_id,evidence_id) RETURNING id INTO approval_id;
 RETURN approval_id;
END;
$$;
REVOKE ALL ON FUNCTION public.approve_delivery_revision(uuid,uuid,uuid,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.approve_delivery_revision(uuid,uuid,uuid,text) TO service_role;
