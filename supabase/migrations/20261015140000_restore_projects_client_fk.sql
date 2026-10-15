-- Restore the projects -> clients relationship that the admin dashboard embeds
-- (PostgREST error PGRST200 when it is missing). Idempotent and non-destructive:
-- NOT VALID avoids failing on or rewriting any pre-existing orphaned rows.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.projects'::regclass
      AND contype = 'f'
      AND confrelid = 'public.clients'::regclass
      AND conkey = ARRAY[(
        SELECT attnum FROM pg_attribute
        WHERE attrelid = 'public.projects'::regclass AND attname = 'client_id'
      )]
  ) THEN
    ALTER TABLE public.projects
      ADD CONSTRAINT projects_client_id_fkey
      FOREIGN KEY (client_id) REFERENCES public.clients(id) ON DELETE SET NULL
      NOT VALID;
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';
