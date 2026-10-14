-- Restricted boolean lookup: do not expose auth.sessions through the Data API.
CREATE FUNCTION public.delivery_session_active(p_user_id uuid,p_session_id uuid)
 RETURNS boolean LANGUAGE sql SECURITY DEFINER SET search_path='' AS $$
 SELECT EXISTS(SELECT 1 FROM auth.sessions s
 WHERE s.id=p_session_id AND s.user_id=p_user_id
 AND (s.not_after IS NULL OR s.not_after>now()));
$$;
REVOKE ALL ON FUNCTION public.delivery_session_active(uuid,uuid) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.delivery_session_active(uuid,uuid) TO service_role;
