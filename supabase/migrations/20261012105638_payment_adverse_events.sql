CREATE TABLE public.payment_adverse_events (
 event_id text PRIMARY KEY CHECK(event_id LIKE 'evt_%'),
 payment_intent_id text CHECK(payment_intent_id LIKE 'pi_%'),
 provider_object_id text NOT NULL CHECK(length(provider_object_id) BETWEEN 1 AND 200),
 kind text NOT NULL CHECK(kind IN ('refund','dispute')),
 status text NOT NULL CHECK(status IN ('refunded','warning_needs_response','warning_under_review','warning_closed','needs_response','under_review','won','lost','prevented')),
 amount_pence bigint NOT NULL CHECK(amount_pence>0),
 currency text NOT NULL CHECK(currency='gbp'),
 livemode boolean NOT NULL,
 provider_created bigint NOT NULL CHECK(provider_created>0),
 CHECK((kind='refund')=(status='refunded'))
);
ALTER TABLE public.payment_adverse_events ENABLE ROW LEVEL SECURITY;
CREATE INDEX payment_adverse_intent ON public.payment_adverse_events(livemode,payment_intent_id,kind);
CREATE INDEX payment_adverse_object ON public.payment_adverse_events(livemode,provider_object_id,provider_created DESC);
REVOKE ALL ON public.payment_adverse_events FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT ON public.payment_adverse_events TO service_role;

CREATE FUNCTION public.record_payment_adverse_event(p_event_id text,p_payment_intent_id text,p_provider_object_id text,
 p_kind text,p_status text,p_amount_pence bigint,p_currency text,p_livemode boolean,p_created bigint)
 RETURNS text LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
DECLARE stored public.payment_adverse_events;
BEGIN
 INSERT INTO public.payment_adverse_events VALUES(p_event_id,p_payment_intent_id,p_provider_object_id,p_kind,p_status,p_amount_pence,p_currency,p_livemode,p_created)
 ON CONFLICT(event_id) DO NOTHING;
 IF FOUND THEN RETURN 'recorded'; END IF;
 SELECT * INTO stored FROM public.payment_adverse_events WHERE event_id=p_event_id;
 IF ROW(stored.payment_intent_id,stored.provider_object_id,stored.kind,stored.status,stored.amount_pence,stored.currency,stored.livemode,stored.provider_created)
 IS DISTINCT FROM ROW(p_payment_intent_id,p_provider_object_id,p_kind,p_status,p_amount_pence,p_currency,p_livemode,p_created)
 THEN RAISE EXCEPTION 'Conflicting financial event'; END IF;
 RETURN 'duplicate';
END;
$$;
REVOKE ALL ON FUNCTION public.record_payment_adverse_event(text,text,text,text,text,bigint,text,boolean,bigint) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.record_payment_adverse_event(text,text,text,text,text,bigint,text,boolean,bigint) TO service_role;

CREATE FUNCTION public.payment_intent_blocked(p_intent text,p_live boolean) RETURNS boolean
 LANGUAGE sql SECURITY DEFINER SET search_path='' AS $$
 SELECT EXISTS(SELECT 1 FROM public.payment_adverse_events
 WHERE kind='refund' AND livemode=p_live AND (payment_intent_id=p_intent OR payment_intent_id IS NULL))
 OR EXISTS(SELECT 1 FROM (
 SELECT DISTINCT ON(provider_object_id) * FROM public.payment_adverse_events
 WHERE kind='dispute' AND livemode=p_live ORDER BY provider_object_id,provider_created DESC,
 CASE WHEN status IN ('won','prevented','warning_closed') THEN 0 ELSE 1 END DESC,event_id DESC
 ) latest WHERE (payment_intent_id=p_intent OR payment_intent_id IS NULL)
 AND status NOT IN ('won','prevented','warning_closed'));
$$;
REVOKE ALL ON FUNCTION public.payment_intent_blocked(text,boolean) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.payment_intent_blocked(text,boolean) TO service_role;

CREATE FUNCTION public.guard_launch_payment_health() RETURNS trigger
 LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
BEGIN
 IF NEW.status::text<>'launched' THEN RETURN NEW; END IF;
 IF TG_OP='UPDATE' AND OLD.status::text='launched' AND NEW.client_id IS NOT DISTINCT FROM OLD.client_id THEN RETURN NEW; END IF;
 IF EXISTS(SELECT 1 FROM public.payment_contracts c JOIN public.payment_receipts r USING(session_id)
 WHERE c.project_id=NEW.id AND public.payment_intent_blocked(r.payment_intent_id,true))
 THEN RAISE EXCEPTION 'Launch blocked by refund or unresolved dispute'; END IF;
 RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.guard_launch_payment_health() FROM PUBLIC,anon,authenticated;
CREATE TRIGGER launch_payment_health_guard BEFORE INSERT OR UPDATE OF status,client_id ON public.projects
 FOR EACH ROW EXECUTE FUNCTION public.guard_launch_payment_health();
