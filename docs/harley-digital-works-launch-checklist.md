# Harley Digital Works Launch Checklist

## Before Deploy

- Confirm `harleydigitalworks.com` DNS is ready for hosting.
- Add `harleydigitalworks.com` and `www.harleydigitalworks.com` to hosting.
- Confirm production environment variables are present.
- Add Supabase Auth redirect URLs for `https://harleydigitalworks.com/auth` and required preview URLs.
- Confirm public domain sales remain enquiry-only until the documented Payment Release Gate passes.
- Verify email sender domain for `harleydigitalworks.com`.
- Add analytics and Search Console properties for the new domain.
- Configure OAuth callback URLs for the new domain.

## Deploy And Verify

- Run lint and production build.
- Deploy the branch through the existing hosting flow.
- Check homepage, services, domains, resources, contact, onboarding, auth and admin routes.
- Verify contact forms create leads and do not send test emails unexpectedly.
- Verify PWA manifest, icons, offline page and service-worker update behaviour.
- Verify canonical URL, Open Graph image, sitemap and robots on production.
- Check mobile, tablet and desktop layouts.

## After Launch

- Add 301 redirects from old agency URLs to matching Harley Digital Works URLs.
- Submit sitemap in Search Console.
- Run Control Centre Diagnostics and create Revenue OS tasks for any warnings.
- Update external profiles, email signatures, payment/support labels and documentation links.
