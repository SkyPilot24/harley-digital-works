-- Observations are audit evidence. They do not by themselves clear launch holds.
CREATE TABLE public.payment_reconciliation_observations (
 id uuid PRIMARY KEY,
 event_id text NOT NULL REFERENCES public.payment_adverse_events(event_id),
 expected_event_count bigint NOT NULL CHECK(expected_event_count>0),
 charge_id text NOT NULL CHECK(charge_id LIKE 'ch_%'),
 payment_intent_id text CHECK(payment_intent_id LIKE 'pi_%'),
 status text NOT NULL CHECK(status IN ('refunded','warning_needs_response','warning_under_review','warning_closed','needs_response','under_review','won','lost','prevented')),
 amount_pence bigint NOT NULL CHECK(amount_pence>0),
 refunded_pence bigint NOT NULL CHECK(refunded_pence>=0),
 blocked boolean NOT NULL,
 observed_at timestamptz NOT NULL DEFAULT clock_timestamp()
);
ALTER TABLE public.payment_reconciliation_observations ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.payment_reconciliation_observations FROM PUBLIC,anon,authenticated;
GRANT SELECT ON public.payment_reconciliation_observations TO service_role;

-- Serialize signed event ingestion with observation commits for each provider object.
CREATE FUNCTION public.lock_payment_adverse_object() RETURNS trigger
 LANGUAGE plpgsql SET search_path='' AS $$
BEGIN
 PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(NEW.livemode::text||':'||NEW.provider_object_id,0));
 RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.lock_payment_adverse_object() FROM PUBLIC,anon,authenticated;
CREATE TRIGGER payment_adverse_object_lock BEFORE INSERT ON public.payment_adverse_events
 FOR EACH ROW EXECUTE FUNCTION public.lock_payment_adverse_object();

CREATE FUNCTION public.record_payment_reconciliation(p_id uuid,p_event_id text,p_expected_count bigint,
 p_charge_id text,p_intent text,p_status text,p_amount bigint,p_refunded bigint,p_blocked boolean)
 RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE source public.payment_adverse_events; stored public.payment_reconciliation_observations; actual_count bigint;
BEGIN
 SELECT * INTO source FROM public.payment_adverse_events WHERE event_id=p_event_id;
 IF NOT FOUND THEN RAISE EXCEPTION 'Stored financial event unavailable'; END IF;
 PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(source.livemode::text||':'||source.provider_object_id,0));
 SELECT * INTO stored FROM public.payment_reconciliation_observations WHERE id=p_id;
 IF FOUND THEN
  IF ROW(stored.event_id,stored.expected_event_count,stored.charge_id,stored.payment_intent_id,stored.status,stored.amount_pence,stored.refunded_pence,stored.blocked)
   IS DISTINCT FROM ROW(p_event_id,p_expected_count,p_charge_id,p_intent,p_status,p_amount,p_refunded,p_blocked)
  THEN RAISE EXCEPTION 'Conflicting reconciliation retry'; END IF;
  RETURN 'duplicate';
 END IF;
 SELECT count(*) INTO actual_count FROM public.payment_adverse_events
  WHERE livemode=source.livemode AND provider_object_id=source.provider_object_id;
 IF actual_count<>p_expected_count THEN RAISE EXCEPTION 'Financial event changed during reconciliation'; END IF;
 IF source.payment_intent_id IS NOT NULL AND source.payment_intent_id IS DISTINCT FROM p_intent
 THEN RAISE EXCEPTION 'Reconciliation payment identity mismatch'; END IF;
 IF source.kind='refund' AND (p_charge_id<>source.provider_object_id OR p_status<>'refunded' OR p_refunded<source.amount_pence OR p_amount<>p_refunded)
 THEN RAISE EXCEPTION 'Reconciliation refund mismatch'; END IF;
 IF source.kind='dispute' AND p_status='refunded' THEN RAISE EXCEPTION 'Reconciliation dispute mismatch'; END IF;
 IF p_blocked IS DISTINCT FROM (p_refunded>0 OR p_status NOT IN ('won','prevented','warning_closed'))
 THEN RAISE EXCEPTION 'Reconciliation financial hold mismatch'; END IF;
 INSERT INTO public.payment_reconciliation_observations(id,event_id,expected_event_count,charge_id,payment_intent_id,status,amount_pence,refunded_pence,blocked)
 VALUES(p_id,p_event_id,p_expected_count,p_charge_id,p_intent,p_status,p_amount,p_refunded,p_blocked);
 RETURN 'recorded';
END;
$$;
REVOKE ALL ON FUNCTION public.record_payment_reconciliation(uuid,text,bigint,text,text,text,bigint,bigint,boolean) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.record_payment_reconciliation(uuid,text,bigint,text,text,text,bigint,bigint,boolean) TO service_role;
