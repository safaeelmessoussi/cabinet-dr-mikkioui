import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { isLocale, type Locale } from "@/lib/clinic";
import { Shell } from "@/components/site/Shell";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.lang)) throw notFound();
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  const { lang } = Route.useParams();
  return (
    <Shell locale={lang as Locale}>
      <Outlet />
    </Shell>
  );
}
