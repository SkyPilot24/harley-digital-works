ALTER TABLE public.projects ADD UNIQUE(id,client_id);
ALTER TABLE public.payment_contracts ADD COLUMN project_id uuid;
ALTER TABLE public.payment_contracts ADD CONSTRAINT payment_project_matches_client
 FOREIGN KEY(project_id,client_id) REFERENCES public.projects(id,client_id);
CREATE UNIQUE INDEX payment_project_milestone ON public.payment_contracts(project_id,milestone)
 WHERE project_id IS NOT NULL;

CREATE TABLE public.delivery_launch_evidence (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 project_id uuid NOT NULL REFERENCES public.projects(id),
 revision_id uuid NOT NULL,
 source_commit text NOT NULL CHECK(source_commit ~ '^[0-9a-f]{40}$'),
 live_url text NOT NULL CHECK(live_url ~ '^https://[^/@[:space:]]+'),
 deployment_id text NOT NULL CHECK(length(deployment_id) BETWEEN 1 AND 200),
 onboarding_evidence text NOT NULL CHECK(length(onboarding_evidence) BETWEEN 1 AND 2000),
 qa_evidence text NOT NULL CHECK(length(qa_evidence) BETWEEN 1 AND 2000),
 dns_email_evidence text NOT NULL CHECK(length(dns_email_evidence) BETWEEN 1 AND 2000),
 rollback_evidence text NOT NULL CHECK(length(rollback_evidence) BETWEEN 1 AND 2000),
 reviewed_by uuid NOT NULL REFERENCES auth.users(id),
 verified_at timestamptz NOT NULL DEFAULT now(),
 FOREIGN KEY(revision_id,project_id) REFERENCES public.delivery_revisions(id,project_id)
);
ALTER TABLE public.delivery_launch_evidence ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.delivery_launch_evidence FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT ON public.delivery_launch_evidence TO service_role;
GRANT USAGE,SELECT ON SEQUENCE public.delivery_launch_evidence_id_seq TO service_role;

CREATE FUNCTION public.guard_project_launch() RETURNS trigger
 LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE preview public.delivery_revisions; evidence public.delivery_launch_evidence;
BEGIN
 IF NEW.status::text<>'launched' THEN RETURN NEW; END IF;
 IF TG_OP='UPDATE' AND OLD.status::text='launched' AND NEW.client_id IS NOT DISTINCT FROM OLD.client_id
 THEN RETURN NEW; END IF;
 IF NEW.client_id IS NULL THEN RAISE EXCEPTION 'Launch requires a client'; END IF;
 SELECT * INTO preview FROM public.delivery_revisions
 WHERE project_id=NEW.id AND kind='preview' ORDER BY revision DESC LIMIT 1;
 IF NOT FOUND OR NOT EXISTS(SELECT 1 FROM public.delivery_approvals WHERE revision_id=preview.id)
 THEN RAISE EXCEPTION 'Launch requires approval of the latest website version'; END IF;
 SELECT * INTO evidence FROM public.delivery_launch_evidence WHERE project_id=NEW.id ORDER BY id DESC LIMIT 1;
 IF NOT FOUND OR evidence.revision_id<>preview.id OR evidence.source_commit<>preview.source_commit
 OR evidence.verified_at>now()
 OR NOT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id=evidence.reviewed_by AND role='admin')
 THEN RAISE EXCEPTION 'Launch requires matching verified release evidence'; END IF;
 IF (SELECT count(*) FROM public.payment_contracts c JOIN public.payment_receipts r USING(session_id)
 WHERE c.project_id=NEW.id AND c.client_id=NEW.client_id AND c.status='paid'
 AND c.livemode AND r.livemode AND c.amount_pence=r.amount_pence AND c.currency=r.currency
 AND c.milestone IN ('deposit','balance'))<>2
 THEN RAISE EXCEPTION 'Launch requires linked live deposit and balance receipts'; END IF;
 RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.guard_project_launch() FROM PUBLIC,anon,authenticated;
CREATE TRIGGER project_launch_guard BEFORE INSERT OR UPDATE OF status,client_id ON public.projects
 FOR EACH ROW EXECUTE FUNCTION public.guard_project_launch();
