import { createFileRoute } from "@tanstack/react-router";
import { isLocale, type Locale } from "@/lib/clinic";
import { TextPage } from "@/components/site/TextPage";
import { headFor } from "@/lib/seo";

export const Route = createFileRoute("/$lang/mentions-legales")({
  head: ({ params }) => (isLocale(params.lang) ? headFor("legal", params.lang) : {}),
  component: LegalRoute,
});

function LegalRoute() {
  const { lang } = Route.useParams();
  return <TextPage locale={lang as Locale} page="legal" />;
}
