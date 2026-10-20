CREATE FUNCTION public.guard_payment_contract_update() RETURNS trigger
 LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
BEGIN
 IF ROW(NEW.session_id,NEW.reference,NEW.client_id,NEW.milestone,NEW.amount_pence,NEW.currency,NEW.livemode,NEW.created_at)
 IS DISTINCT FROM ROW(OLD.session_id,OLD.reference,OLD.client_id,OLD.milestone,OLD.amount_pence,OLD.currency,OLD.livemode,OLD.created_at)
 THEN RAISE EXCEPTION 'Payment contract terms are immutable'; END IF;
 IF OLD.project_id IS NOT NULL AND NEW.project_id IS DISTINCT FROM OLD.project_id
 THEN RAISE EXCEPTION 'Payment project link is immutable'; END IF;
 IF OLD.status='paid' AND (NEW.status IS DISTINCT FROM OLD.status OR NEW.paid_at IS DISTINCT FROM OLD.paid_at)
 THEN RAISE EXCEPTION 'Verified payment state is immutable'; END IF;
 IF NEW.status='paid' AND NOT EXISTS(SELECT 1 FROM public.payment_receipts WHERE session_id=NEW.session_id)
 THEN RAISE EXCEPTION 'Payment receipt required'; END IF;
 RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.guard_payment_contract_update() FROM PUBLIC,anon,authenticated;
CREATE TRIGGER payment_contract_update_guard BEFORE UPDATE ON public.payment_contracts
 FOR EACH ROW EXECUTE FUNCTION public.guard_payment_contract_update();

CREATE FUNCTION public.bind_payment_project(p_session_id text,p_project_id uuid,p_user_id uuid)
 RETURNS text LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
DECLARE contract public.payment_contracts; project_client uuid;
BEGIN
 IF NOT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id=p_user_id AND role='admin')
 THEN RAISE EXCEPTION 'Administrator required'; END IF;
 SELECT client_id INTO project_client FROM public.projects WHERE id=p_project_id;
 IF NOT FOUND OR project_client IS NULL THEN RAISE EXCEPTION 'Project unavailable'; END IF;
 SELECT * INTO contract FROM public.payment_contracts WHERE session_id=p_session_id FOR UPDATE;
 IF NOT FOUND OR contract.client_id IS DISTINCT FROM project_client
 THEN RAISE EXCEPTION 'Payment project client mismatch'; END IF;
 IF contract.project_id=p_project_id THEN RETURN 'linked'; END IF;
 UPDATE public.payment_contracts SET project_id=p_project_id WHERE session_id=p_session_id;
 RETURN 'linked';
END;
$$;
REVOKE ALL ON FUNCTION public.bind_payment_project(text,uuid,uuid) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.bind_payment_project(text,uuid,uuid) TO service_role;
