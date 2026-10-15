-- Service-only payment records; unapplied until the reviewed staging release.
CREATE TABLE public.payment_contracts (
 session_id text PRIMARY KEY CHECK (session_id LIKE 'cs_%'),
 reference text NOT NULL UNIQUE CHECK (length(reference) BETWEEN 1 AND 200),
 client_id uuid NOT NULL REFERENCES public.clients(id),
 milestone text NOT NULL CHECK (milestone IN ('deposit','balance')),
 amount_pence bigint NOT NULL CHECK (amount_pence > 0),
 currency text NOT NULL CHECK (currency = 'gbp'),
 livemode boolean NOT NULL,
 status text NOT NULL DEFAULT 'unpaid' CHECK (status IN ('unpaid','paid')),
 created_at timestamptz NOT NULL DEFAULT now(),
 paid_at timestamptz
);
CREATE TABLE public.payment_receipts (
 session_id text PRIMARY KEY REFERENCES public.payment_contracts(session_id),
 event_id text NOT NULL UNIQUE CHECK (event_id LIKE 'evt_%'),
 payment_intent_id text NOT NULL UNIQUE CHECK (payment_intent_id LIKE 'pi_%'),
 amount_pence bigint NOT NULL CHECK (amount_pence > 0),
 currency text NOT NULL CHECK (currency = 'gbp'),
 livemode boolean NOT NULL,
 recorded_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.payment_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_receipts ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.payment_contracts,public.payment_receipts FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT,UPDATE ON public.payment_contracts TO service_role;
GRANT SELECT,INSERT ON public.payment_receipts TO service_role;

CREATE FUNCTION public.record_payment_receipt(
 p_session_id text,p_event_id text,p_payment_intent_id text,p_reference text,
 p_amount_pence bigint,p_currency text,p_livemode boolean
) RETURNS text LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
DECLARE contract public.payment_contracts; receipt public.payment_receipts;
BEGIN
 SELECT * INTO contract FROM public.payment_contracts WHERE session_id=p_session_id FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Unknown payment contract'; END IF;
 IF p_reference IS DISTINCT FROM contract.reference
 OR p_amount_pence IS DISTINCT FROM contract.amount_pence
 OR p_currency IS DISTINCT FROM contract.currency
 OR p_livemode IS DISTINCT FROM contract.livemode
 THEN RAISE EXCEPTION 'Payment contract mismatch'; END IF;
 SELECT * INTO receipt FROM public.payment_receipts WHERE session_id=p_session_id;
 IF FOUND THEN
  IF receipt.payment_intent_id IS DISTINCT FROM p_payment_intent_id
  OR receipt.amount_pence IS DISTINCT FROM p_amount_pence
  OR receipt.currency IS DISTINCT FROM p_currency
  OR receipt.livemode IS DISTINCT FROM p_livemode
  THEN RAISE EXCEPTION 'Conflicting payment receipt'; END IF;
  RETURN 'duplicate';
 END IF;
 INSERT INTO public.payment_receipts(session_id,event_id,payment_intent_id,amount_pence,currency,livemode)
 VALUES(p_session_id,p_event_id,p_payment_intent_id,p_amount_pence,p_currency,p_livemode);
 UPDATE public.payment_contracts SET status='paid',paid_at=now() WHERE session_id=p_session_id;
 RETURN 'recorded';
END;
$$;
REVOKE ALL ON FUNCTION public.record_payment_receipt(text,text,text,text,bigint,text,boolean) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.record_payment_receipt(text,text,text,text,bigint,text,boolean) TO service_role;
