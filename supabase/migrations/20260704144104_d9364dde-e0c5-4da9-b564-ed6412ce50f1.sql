-- Bootstrap: if no admin exists yet, promote all existing auth users to admin.
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'::public.app_role
FROM auth.users u
WHERE NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Attach the existing bootstrap function to auth.users so the first future signup
-- becomes admin automatically when no admin exists.
DROP TRIGGER IF EXISTS on_auth_user_created_bootstrap ON auth.users;
CREATE TRIGGER on_auth_user_created_bootstrap
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_bootstrap();