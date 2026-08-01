import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "sonner";
import { canonicalUrlForPath, siteConfig } from "@/lib/site-config";

const siteTitle = "Harley Digital Works | Websites, AI & Digital Transformation";
const siteDescription =
  "Harley Digital Works designs high-performing websites, automates repetitive work and modernises digital services for ambitious UK organisations.";

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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
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
  head: ({ matches }) => {
    const leafMatch = matches[matches.length - 1];
    const pathname = leafMatch?.pathname || "/";
    const canonical = canonicalUrlForPath(pathname);
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
              { property: "og:site_name", content: siteConfig.name },
              { property: "og:type", content: "website" },
              { property: "og:image", content: siteConfig.ogImage },
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:title", content: siteTitle },
              { name: "twitter:description", content: siteDescription },
              { name: "twitter:image", content: siteConfig.ogImage },
            ]),
        { name: "theme-color", content: "#0D0D0D" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        ...(!isPrivateRoute ? [{ rel: "canonical", href: canonical }] : []),
        {
          rel: "icon",
          href: "/brand/approved/icons/favicon-32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          rel: "icon",
          href: "/brand/approved/icons/favicon-16.png",
          sizes: "16x16",
          type: "image/png",
        },
        { rel: "apple-touch-icon", href: "/brand/approved/icons/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap",
        },
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
