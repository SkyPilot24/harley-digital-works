// Public prototypes remain in source for future completion; customers get a real contact path.
const deferredServices: Record<string, string> = {
  "/calculator": "Website scope and investment",
  "/audit": "Free Website Health Check Consultation",
  "/tools/seo-inspector": "Website and search visibility consultation",
  "/tools/review-booster": "Customer feedback support",
  "/care-desk": "Website care support",
  "/onboarding": "Project onboarding",
  "/proposals": "Website proposal",
  "/partners": "Partnership enquiry",
  "/track": "Project support",
};

export function deferredServiceForPath(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  return deferredServices[path] || (path.startsWith("/track/") ? "Project support" : undefined);
}
