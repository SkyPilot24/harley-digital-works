
-- Remove public SELECT policy that exposed all columns (including email) via row-level access
DROP POLICY IF EXISTS "Active team members are viewable by everyone" ON public.team_members;

-- Revoke column grants that made email-adjacent data readable by anon/authenticated
REVOKE SELECT ON public.team_members FROM anon, authenticated;

-- Re-grant admin-side access (admins operate via RLS "Admins manage team")
GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT ALL ON public.team_members TO service_role;

-- Public-safe view excluding email and user_id
CREATE OR REPLACE VIEW public.public_team_members
WITH (security_invoker = true) AS
SELECT id, full_name, role_title, bio, avatar_url, active, created_at, updated_at
FROM public.team_members
WHERE active = true;

-- Allow public read of the safe view
GRANT SELECT ON public.public_team_members TO anon, authenticated;

-- Add an admin-only SELECT policy so admins can still read the base table
DROP POLICY IF EXISTS "Admins can view team" ON public.team_members;
CREATE POLICY "Admins can view team"
ON public.team_members
FOR SELECT
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'::app_role));
