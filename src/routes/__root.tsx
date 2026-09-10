import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { clinic, isLocale, localeMeta } from "../lib/clinic";
import { getDict } from "../lib/i18n";
import logoIcon from "../assets/dr-zineb-mikkioui-icon.jpg.asset.json";

function NotFoundComponent() {
  const d = getDict("fr");
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <img src={logoIcon.url} alt="" aria-hidden="true" width={56} height={56} className="mx-auto h-14 w-14 rounded-full object-cover" />
        <h1 className="mt-6 font-display text-2xl text-primary">{d.notFound.title}</h1>
        <p className="mt-3 text-muted-foreground">{d.notFound.body}</p>
        <a href="/fr" className="btn btn-primary mt-8">
          {d.notFound.cta}
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const d = getDict("fr");
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl text-primary">Cette page n'a pas pu s'afficher</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Vous pouvez réessayer, ou appeler directement le cabinet au {clinic.phone.display}.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn btn-primary !min-h-11 text-sm"
          >
            Réessayer
          </button>
          <a href="/fr" className="btn btn-quiet !min-h-11 text-sm">
            {d.notFound.cta}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dr Zineb Mikkioui — Médecin généraliste à Marrakech" },
      {
        name: "description",
        content:
          "Cabinet de médecine générale du Dr Zineb Mikkioui à Marrakech : adresse, horaires, téléphone et itinéraire.",
      },
      { property: "og:site_name", content: "Dr Zineb Mikkioui" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#F7F3E9" },
      { name: "geo.region", content: "MA-MAR" },
      { name: "geo.placename", content: "Marrakech" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Karla:wght@400;500;700&family=Noto+Kufi+Arabic:wght@400;500;700&family=Noto+Sans+Tifinagh&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const segment = pathname.split("/")[1] ?? "";
  const locale = isLocale(segment) ? segment : "fr";
  const { htmlLang, dir } = localeMeta[locale];

  return (
    <html lang={htmlLang} dir={dir}>
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

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
