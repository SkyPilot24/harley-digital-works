-- Restrict Auth-table access to one server-only operation. Locking the session
-- makes logout's session deletion serialize with the approval transaction.
CREATE FUNCTION public.approve_delivery_revision_session(
 p_project_id uuid,p_user_id uuid,p_session_id uuid,p_revision_id uuid,p_content_sha256 text
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
BEGIN
 PERFORM 1 FROM auth.sessions s WHERE s.id=p_session_id AND s.user_id=p_user_id
 AND (s.not_after IS NULL OR s.not_after>clock_timestamp()) FOR KEY SHARE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Active delivery session required'; END IF;
 RETURN public.approve_delivery_revision(p_project_id,p_user_id,p_revision_id,p_content_sha256);
END;
$$;
REVOKE ALL ON FUNCTION public.approve_delivery_revision_session(uuid,uuid,uuid,uuid,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.approve_delivery_revision_session(uuid,uuid,uuid,uuid,text) TO service_role;
