
-- Allow clients to view their own projects (matched via their contact_email)
CREATE POLICY "Clients can view their own projects"
ON public.projects
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.clients c
    WHERE c.id = projects.client_id
      AND c.contact_email IS NOT NULL
      AND lower(c.contact_email) = lower((auth.jwt() ->> 'email'))
  )
);

-- Publicly display active team member bios, but hide sensitive columns (email, user_id)
CREATE POLICY "Active team members are viewable by everyone"
ON public.team_members
FOR SELECT
TO anon, authenticated
USING (active = true);

REVOKE SELECT ON public.team_members FROM anon, authenticated;
GRANT SELECT (id, full_name, role_title, bio, avatar_url, active, created_at, updated_at)
  ON public.team_members TO anon, authenticated;
