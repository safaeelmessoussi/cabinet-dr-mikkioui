import { createFileRoute } from "@tanstack/react-router";
import { isLocale, type Locale } from "@/lib/clinic";
import { TextPage } from "@/components/site/TextPage";
import { headFor } from "@/lib/seo";

export const Route = createFileRoute("/$lang/confidentialite")({
  head: ({ params }) => (isLocale(params.lang) ? headFor("privacy", params.lang) : {}),
  component: PrivacyRoute,
});

function PrivacyRoute() {
  const { lang } = Route.useParams();
  return <TextPage locale={lang as Locale} page="privacy" />;
}
