CREATE TABLE public.lead_notification_jobs (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 lead_id uuid NOT NULL UNIQUE REFERENCES public.leads(id) ON DELETE CASCADE,
 source text NOT NULL CHECK (source IN ('contact_form','group_contact_form')),
 status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','accepted','failed')),
 attempts integer NOT NULL DEFAULT 0 CHECK (attempts BETWEEN 0 AND 5),
 next_attempt_at timestamptz NOT NULL DEFAULT now(),
 lease_token uuid, lease_until timestamptz,
 last_error text, accepted_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX lead_notification_due ON public.lead_notification_jobs(next_attempt_at) WHERE status IN ('pending','processing');
ALTER TABLE public.lead_notification_jobs ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.lead_notification_jobs FROM PUBLIC,anon,authenticated;
GRANT SELECT ON public.lead_notification_jobs TO authenticated;
CREATE POLICY admin_read_notification_jobs ON public.lead_notification_jobs FOR SELECT TO authenticated
 USING (app_private.has_role(auth.uid(),'admin'::public.app_role));
GRANT SELECT,INSERT,UPDATE,DELETE ON public.lead_notification_jobs TO service_role;

-- The lead and its alert commit together. No historical leads are backfilled.
CREATE FUNCTION app_private.enqueue_lead_notification() RETURNS trigger
 LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
BEGIN
 IF current_user = 'service_role' AND NEW.source IN ('contact_form','group_contact_form') THEN
  INSERT INTO public.lead_notification_jobs(lead_id,source) VALUES(NEW.id,NEW.source);
 END IF;
 RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION app_private.enqueue_lead_notification() FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION app_private.enqueue_lead_notification() TO service_role;
CREATE TRIGGER enqueue_lead_notification AFTER INSERT ON public.leads FOR EACH ROW EXECUTE FUNCTION app_private.enqueue_lead_notification();

CREATE FUNCTION public.claim_lead_notifications()
 RETURNS TABLE(id uuid,lead_id uuid,source text,lease_token uuid,attempts integer)
 LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
BEGIN
 -- A crash after the fifth claim must become visible rather than remain stuck.
 UPDATE public.lead_notification_jobs j SET status='failed',lease_token=NULL,lease_until=NULL,
 last_error='Final delivery attempt expired without acknowledgement.'
 WHERE j.status='processing' AND j.lease_until < now() AND j.attempts >= 5;
 RETURN QUERY
 WITH due AS (
  SELECT j.id FROM public.lead_notification_jobs j WHERE j.attempts < 5
  AND ((j.status='pending' AND j.next_attempt_at <= now()) OR (j.status='processing' AND j.lease_until < now()))
  ORDER BY j.next_attempt_at,j.id FOR UPDATE SKIP LOCKED LIMIT 5
 )
 UPDATE public.lead_notification_jobs j SET status='processing',attempts=j.attempts+1,
 lease_token=gen_random_uuid(),lease_until=now()+interval '2 minutes'
 FROM due WHERE j.id=due.id RETURNING j.id,j.lead_id,j.source,j.lease_token,j.attempts;
END;
$$;
CREATE FUNCTION public.finish_lead_notification(p_id uuid,p_lease_token uuid,p_accepted boolean,p_error text)
 RETURNS boolean LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
DECLARE affected integer;
BEGIN
 IF p_accepted IS NULL THEN RETURN false; END IF;
 UPDATE public.lead_notification_jobs j SET
 status=CASE WHEN p_accepted THEN 'accepted' WHEN j.attempts>=5 THEN 'failed' ELSE 'pending' END,
 accepted_at=CASE WHEN p_accepted THEN now() ELSE NULL END,
 last_error=CASE WHEN p_accepted THEN NULL ELSE left(coalesce(p_error,'Delivery failed.'),300) END,
 next_attempt_at=now()+make_interval(secs=>CASE j.attempts WHEN 1 THEN 60 WHEN 2 THEN 300 WHEN 3 THEN 900 ELSE 3600 END),
 lease_token=NULL,lease_until=NULL
 WHERE j.id=p_id AND j.status='processing' AND j.lease_token=p_lease_token AND j.lease_until>now();
 GET DIAGNOSTICS affected=ROW_COUNT;
 RETURN affected=1;
END;
$$;
REVOKE ALL ON FUNCTION public.claim_lead_notifications() FROM PUBLIC,anon,authenticated;
REVOKE ALL ON FUNCTION public.finish_lead_notification(uuid,uuid,boolean,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.claim_lead_notifications() TO service_role;
GRANT EXECUTE ON FUNCTION public.finish_lead_notification(uuid,uuid,boolean,text) TO service_role;
