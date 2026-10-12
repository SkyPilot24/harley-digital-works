-- Immutable version evidence attached to the existing project, not a second CRM.
CREATE TABLE public.delivery_revisions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 project_id uuid NOT NULL REFERENCES public.projects(id),
 kind text NOT NULL CHECK (kind IN ('proposal','preview')),
 revision integer NOT NULL CHECK (revision > 0),
 content_sha256 text NOT NULL CHECK (content_sha256 ~ '^[0-9a-f]{64}$'),
 source_commit text CHECK (source_commit ~ '^[0-9a-f]{40}$'),
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(project_id,kind,revision),
 UNIQUE(id,project_id),
 CHECK (kind <> 'preview' OR source_commit IS NOT NULL)
);

CREATE TABLE public.delivery_approvals (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 revision_id uuid NOT NULL,
 project_id uuid NOT NULL,
 approver_user_id uuid NOT NULL REFERENCES auth.users(id),
 identity_evidence_id uuid NOT NULL,
 recorded_at timestamptz NOT NULL DEFAULT now(),
 FOREIGN KEY(revision_id,project_id) REFERENCES public.delivery_revisions(id,project_id),
 UNIQUE(revision_id,approver_user_id)
);

-- Identity evidence is recorded by the server after verifying the customer's
-- access to this project. No public insert or browser-supplied approval is allowed.
CREATE TABLE public.delivery_identity_evidence (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 project_id uuid NOT NULL REFERENCES public.projects(id),
 user_id uuid NOT NULL REFERENCES auth.users(id),
 verified_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(id,project_id,user_id)
);
ALTER TABLE public.delivery_approvals ADD CONSTRAINT approval_identity_matches_project
 FOREIGN KEY(identity_evidence_id,project_id,approver_user_id)
 REFERENCES public.delivery_identity_evidence(id,project_id,user_id);

ALTER TABLE public.delivery_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_identity_evidence ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.delivery_revisions,public.delivery_approvals,public.delivery_identity_evidence
 FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT ON public.delivery_revisions,public.delivery_approvals,public.delivery_identity_evidence
 TO service_role;
-- No UPDATE/DELETE grants: corrections create a new revision and approval.
-- A recorded approval is evidence only, not authority to launch or collect money.
