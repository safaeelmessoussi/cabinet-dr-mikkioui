import { createFileRoute } from "@tanstack/react-router";
import { isLocale, type Locale } from "@/lib/clinic";
import { HomePage } from "@/components/site/HomePage";
import { faqSchema, headFor, physicianSchema } from "@/lib/seo";

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => {
    if (!isLocale(params.lang)) return {};
    const locale: Locale = params.lang;
    const base = headFor("home", locale);
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(physicianSchema(locale)) },
        { type: "application/ld+json", children: JSON.stringify(faqSchema(locale)) },
      ],
    };
  },
  component: LocaleHome,
});

function LocaleHome() {
  const { lang } = Route.useParams();
  return <HomePage locale={lang as Locale} />;
}
