-- Additive and UNAPPLIED. Existing public listings/enquiries remain unchanged.
BEGIN;
CREATE TABLE public.domain_portfolio_imports (
  id uuid PRIMARY KEY,
  source_name text NOT NULL CHECK (length(source_name) BETWEEN 1 AND 200),
  observed_on date NOT NULL,
  row_count integer NOT NULL CHECK (row_count BETWEEN 1 AND 5000),
  created_by uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.domain_portfolio_inventory (
  name text PRIMARY KEY CHECK (name = lower(name) AND length(name) <= 253 AND name ~ '^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$'),
  registrar text NOT NULL CHECK (length(registrar) BETWEEN 1 AND 200),
  contract text NOT NULL DEFAULT '' CHECK (length(contract) <= 200),
  registrar_status text NOT NULL CHECK (length(registrar_status) <= 200),
  expires_on date,
  observed_on date NOT NULL,
  auto_renew text NOT NULL DEFAULT 'unknown' CHECK (auto_renew IN ('unknown','on','off')),
  annual_cost_pence bigint CHECK (annual_cost_pence BETWEEN 0 AND 100000000),
  purpose text NOT NULL DEFAULT 'review' CHECK (purpose IN ('review','operational','client','community','personal','investment')),
  notes text NOT NULL DEFAULT '' CHECK (length(notes) <= 2000),
  import_id uuid NOT NULL REFERENCES public.domain_portfolio_imports(id),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX domain_portfolio_expiry_idx ON public.domain_portfolio_inventory(expires_on) WHERE expires_on IS NOT NULL;
CREATE TABLE public.domain_portfolio_alert_acknowledgements (
  domain_name text NOT NULL REFERENCES public.domain_portfolio_inventory(name),
  expires_on date NOT NULL,
  renewal_window text NOT NULL CHECK (renewal_window IN ('90','60','30','7','expired')),
  acknowledged_by uuid NOT NULL DEFAULT auth.uid(),
  acknowledged_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(domain_name,expires_on,renewal_window)
);
ALTER TABLE public.domain_portfolio_imports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.domain_portfolio_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.domain_portfolio_alert_acknowledgements ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.domain_portfolio_imports, public.domain_portfolio_inventory, public.domain_portfolio_alert_acknowledgements FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT ON public.domain_portfolio_imports TO authenticated;
GRANT SELECT,INSERT,UPDATE ON public.domain_portfolio_inventory TO authenticated;
GRANT SELECT,INSERT,DELETE ON public.domain_portfolio_alert_acknowledgements TO authenticated;
CREATE POLICY domain_import_admin ON public.domain_portfolio_imports FOR ALL TO authenticated USING (app_private.has_role(auth.uid(),'admin'::public.app_role)) WITH CHECK (app_private.has_role(auth.uid(),'admin'::public.app_role) AND created_by=auth.uid());
CREATE POLICY domain_inventory_admin ON public.domain_portfolio_inventory FOR ALL TO authenticated USING (app_private.has_role(auth.uid(),'admin'::public.app_role)) WITH CHECK (app_private.has_role(auth.uid(),'admin'::public.app_role));
CREATE POLICY domain_alert_admin ON public.domain_portfolio_alert_acknowledgements FOR ALL TO authenticated USING (app_private.has_role(auth.uid(),'admin'::public.app_role)) WITH CHECK (app_private.has_role(auth.uid(),'admin'::public.app_role) AND acknowledged_by=auth.uid());

-- Invoker security: the caller's verified Auth identity and RLS apply. No service key.
CREATE FUNCTION public.import_domain_portfolio(p_id uuid,p_source text,p_observed_on date,p_rows jsonb)
RETURNS integer LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
DECLARE item jsonb; existing public.domain_portfolio_inventory%ROWTYPE; total integer;
BEGIN
  IF NOT app_private.has_role(auth.uid(),'admin'::public.app_role) THEN RAISE EXCEPTION 'Administrator access required' USING ERRCODE='42501'; END IF;
  IF jsonb_typeof(p_rows) IS DISTINCT FROM 'array' OR p_observed_on IS NULL THEN RAISE EXCEPTION 'Invalid import'; END IF;
  total := jsonb_array_length(p_rows);
  IF total NOT BETWEEN 1 AND 5000 THEN RAISE EXCEPTION 'Invalid row count'; END IF;
  -- Serialize imports so a concurrent stale snapshot cannot overwrite newer observations.
  PERFORM pg_advisory_xact_lock(71241012);
  IF EXISTS (SELECT 1 FROM public.domain_portfolio_imports WHERE id=p_id) THEN RETURN 0; END IF;
  IF (SELECT count(DISTINCT value->>'name') FROM jsonb_array_elements(p_rows)) <> total THEN RAISE EXCEPTION 'Duplicate domain names'; END IF;
  INSERT INTO public.domain_portfolio_imports(id,source_name,observed_on,row_count) VALUES(p_id,p_source,p_observed_on,total);
  FOR item IN SELECT value FROM jsonb_array_elements(p_rows) LOOP
    IF jsonb_typeof(item) IS DISTINCT FROM 'object' OR item->>'name' IS NULL OR item->>'registrar' IS NULL OR item->>'registrar_status' IS NULL THEN RAISE EXCEPTION 'Invalid domain row'; END IF;
    SELECT * INTO existing FROM public.domain_portfolio_inventory WHERE name=item->>'name' FOR UPDATE;
    IF FOUND AND (existing.observed_on > p_observed_on OR (existing.observed_on = p_observed_on AND (existing.expires_on IS DISTINCT FROM (item->>'expires_on')::date OR existing.contract IS DISTINCT FROM coalesce(item->>'contract','') OR existing.registrar_status IS DISTINCT FROM item->>'registrar_status' OR existing.registrar IS DISTINCT FROM item->>'registrar'))) THEN RAISE EXCEPTION 'Older or conflicting observation requires review'; END IF;
    INSERT INTO public.domain_portfolio_inventory(name,registrar,contract,registrar_status,expires_on,observed_on,import_id)
    VALUES(item->>'name',item->>'registrar',coalesce(item->>'contract',''),item->>'registrar_status',(item->>'expires_on')::date,p_observed_on,p_id)
    ON CONFLICT(name) DO UPDATE SET registrar=excluded.registrar,contract=excluded.contract,registrar_status=excluded.registrar_status,expires_on=excluded.expires_on,observed_on=excluded.observed_on,import_id=excluded.import_id,updated_at=now();
  END LOOP;
  RETURN total;
END;
$$;
REVOKE ALL ON FUNCTION public.import_domain_portfolio(uuid,text,date,jsonb) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.import_domain_portfolio(uuid,text,date,jsonb) TO authenticated;
COMMIT;
