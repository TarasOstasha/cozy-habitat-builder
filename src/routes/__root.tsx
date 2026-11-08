import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { defaultSettings } from "@/lib/sanity/defaults";
import { loadSiteSettings } from "@/lib/sanity/fetch";
import {
  googleTrackingScripts,
  parseGoogleTagManagerId,
} from "@/lib/sanity/seo-head";
import type { SiteSettings } from "@/lib/sanity/types";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

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

function ErrorComponent({ error, reset }: ErrorComponentProps) {
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
  loader: async () => {
    const settings = await loadSiteSettings();
    return { settings };
  },
  head: ({ loaderData }) => {
    const scripts = googleTrackingScripts(loaderData?.settings?.googleAnalyticsSnippet);
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: defaultSettings.seoTitle! },
        { name: "description", content: defaultSettings.seoDescription! },
        { name: "author", content: defaultSettings.brandName! },
        { property: "og:title", content: defaultSettings.seoTitle! },
        { property: "og:description", content: defaultSettings.seoDescription! },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: defaultSettings.ogSiteName! },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
        { rel: "preconnect", href: "https://cdn.sanity.io", crossOrigin: "anonymous" },
        { rel: "dns-prefetch", href: "https://cdn.sanity.io" },
        {
          rel: "preload",
          href: "/fonts/inter-latin.woff2",
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/fonts/cormorant-garamond-latin-400.woff2",
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: appCss,
        },
      ],
      // Root head scripts are merged across every matched route (home, portfolio, designers, 404, etc.)
      ...(scripts ? { scripts } : {}),
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function useRootGtmId() {
  const snippet = useRouterState({
    select: (state) => {
      const rootMatch = state.matches.find((match) => match.routeId === "__root__");
      const data = rootMatch?.loaderData as { settings?: SiteSettings } | undefined;
      return data?.settings?.googleAnalyticsSnippet ?? null;
    },
  });
  return parseGoogleTagManagerId(snippet);
}

function GtmNoscript() {
  const gtmId = useRootGtmId();
  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <GtmNoscript />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
