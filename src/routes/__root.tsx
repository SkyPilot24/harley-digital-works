import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  redirect,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "sonner";
import { canonicalUrlForPath, siteConfig } from "@/lib/site-config";
import { deferredServiceForPath } from "@/lib/launch-scope";

const siteTitle = "Harley Digital Works | Websites for Trades & Small Businesses";
const siteDescription =
  "You run your business. We’ll handle your website. Done-for-you websites, professional copywriting, and managed monthly care for UK trades and small businesses.";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: ({ location }) => {
    // In development mode, allow direct preview of prototype pages.
    // In production, defer unfinished public prototypes to the structured contact form.
    if (import.meta.env.DEV) return;

    const service = deferredServiceForPath(location.pathname);
    if (service)
      throw redirect({
        to: "/contact",
        search: { service, package: undefined, domain: undefined, websiteUrl: undefined },
        replace: true,
      });
  },
  head: ({ matches }) => {
    const leafMatch = matches[matches.length - 1];
    const pathname = leafMatch?.pathname || "/";
    const canonical = canonicalUrlForPath(pathname);
    const isGroupPage = pathname === "/the-harley-group";
    const isPrivateRoute = pathname === "/auth" || pathname.startsWith("/admin");

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: siteTitle },
        { name: "description", content: siteDescription },
        { name: "author", content: "Harley Digital Works" },
        ...(isPrivateRoute
          ? [{ name: "robots", content: "noindex, nofollow, noarchive" }]
          : [
              { property: "og:title", content: siteTitle },
              { property: "og:description", content: siteDescription },
              { property: "og:url", content: canonical },
              {
                property: "og:site_name",
                content: isGroupPage ? "The Harley Group" : siteConfig.name,
              },
              { property: "og:type", content: "website" },
              { property: "og:image", content: siteConfig.ogImage },
              { name: "twitter:card", content: "summary_large_image" },
              {
                name: "twitter:title",
                content: isGroupPage ? "The Harley Group | Practical digital services" : siteTitle,
              },
              {
                name: "twitter:description",
                content: isGroupPage
                  ? "Practical digital services for independent businesses. Discover Harley Digital Works."
                  : siteDescription,
              },
              { name: "twitter:image", content: siteConfig.ogImage },
            ]),
        { name: "theme-color", content: "#081B30" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        ...(!isPrivateRoute ? [{ rel: "canonical", href: canonical }] : []),
        {
          rel: "icon",
          href: "/brand/2026-10-13/icons/favicon-32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          rel: "icon",
          href: "/brand/2026-10-13/icons/favicon-16.png",
          sizes: "16x16",
          type: "image/png",
        },
        { rel: "apple-touch-icon", href: "/brand/2026-10-13/icons/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap",
        },
      ],
      scripts: [
        ...(!isPrivateRoute
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify(
                  isGroupPage
                    ? {
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        name: "The Harley Group",
                        url: "https://theharleygroup.org/the-harley-group",
                        description: "Practical digital services for independent businesses.",
                      }
                    : {
                        "@context": "https://schema.org",
                        "@type": "ProfessionalService",
                        name: siteConfig.name,
                        url: siteConfig.url,
                        description: siteDescription,
                        email: siteConfig.contactEmail,
                        areaServed: { "@type": "Country", name: "United Kingdom" },
                        hasOfferCatalog: {
                          "@type": "OfferCatalog",
                          name: "Website build and monthly care",
                          itemListElement: [
                            { "@type": "Service", name: "Managed website design and build" },
                            { "@type": "Service", name: "Monthly website care" },
                          ],
                        },
                      },
                ),
              },
            ]
          : []),
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    if (import.meta.env.DEV) return;
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    const registerServiceWorker = () => {
      void navigator.serviceWorker.register("/sw.js").catch((registrationError) => {
        console.warn("Service worker registration failed:", registrationError);
      });
    };

    if (document.readyState === "complete") {
      registerServiceWorker();
      return;
    }

    window.addEventListener("load", registerServiceWorker, { once: true });
    return () => window.removeEventListener("load", registerServiceWorker);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </QueryClientProvider>
  );
}
