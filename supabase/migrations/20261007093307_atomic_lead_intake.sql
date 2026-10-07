-- Trusted server intake only. Invoker rights: no new RLS bypass.
-- Fixed lock order: fingerprint first, duplicate identity second.
CREATE FUNCTION public.submit_public_lead(
  p_fingerprint text, p_started_at bigint, p_lead jsonb
) RETURNS text LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE
  intake_time timestamptz;
  attempts integer;
  email_value text := lower(p_lead->>'email');
  message_value text := p_lead->>'message';
BEGIN
  IF p_fingerprint IS NULL OR p_fingerprint !~ '^[a-f0-9]{64}$'
     OR p_started_at IS NULL OR p_lead IS NULL
     OR coalesce(length(trim(p_lead->>'name')),0) NOT BETWEEN 1 AND 100
     OR coalesce(length(email_value),0) NOT BETWEEN 3 AND 255
     OR coalesce(length(message_value),0) NOT BETWEEN 5 AND 4000
     OR coalesce(p_lead->>'source','') NOT IN ('contact_form','group_contact_form') THEN
    RAISE EXCEPTION 'Invalid intake payload' USING ERRCODE = '22023';
  END IF;

  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('lead-ip:' || p_fingerprint, 0));
  intake_time := pg_catalog.clock_timestamp();
  SELECT count(*) INTO attempts FROM public.lead_submission_attempts
    WHERE fingerprint = p_fingerprint AND created_at >= intake_time - interval '10 minutes';
  IF attempts >= 5 THEN RETURN 'rate_limited'; END IF;
  INSERT INTO public.lead_submission_attempts(fingerprint,created_at)
    VALUES (p_fingerprint,intake_time);
  -- Return rather than raise: rejected timing still consumes an attempt.
  IF p_started_at > extract(epoch FROM intake_time)*1000 + 60000
     OR extract(epoch FROM intake_time)*1000 - p_started_at < 1200 THEN
    RETURN 'too_fast';
  END IF;

  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(
    'lead-duplicate:' || pg_catalog.jsonb_build_array(email_value,message_value)::text, 0));
  IF EXISTS (SELECT 1 FROM public.leads WHERE email = email_value
      AND message = message_value AND created_at >= pg_catalog.clock_timestamp() - interval '15 minutes') THEN
    RETURN 'duplicate';
  END IF;
  INSERT INTO public.leads(name,email,company,package,message,source)
    VALUES (p_lead->>'name',email_value,p_lead->>'company',p_lead->>'package',message_value,p_lead->>'source');
  RETURN 'saved';
END;
$$;
REVOKE ALL ON FUNCTION public.submit_public_lead(text,bigint,jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_public_lead(text,bigint,jsonb) TO service_role;

-- Invoke hourly from an approved scheduler; no traffic-dependent cleanup.
CREATE FUNCTION public.prune_lead_submission_attempts() RETURNS void
  LANGUAGE sql SECURITY INVOKER SET search_path = '' AS $$
    DELETE FROM public.lead_submission_attempts
    WHERE created_at < pg_catalog.now() - interval '24 hours';
  $$;
REVOKE ALL ON FUNCTION public.prune_lead_submission_attempts() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.prune_lead_submission_attempts() TO service_role;
