import { clinic, locales, localeMeta, type Locale } from "./clinic";
import { getDict } from "./i18n";

type PageKey = "home" | "legal" | "privacy";

const paths: Record<PageKey, Record<Locale, string>> = {
  home: { fr: "/fr", ar: "/ar", en: "/en", zgh: "/zgh" },
  legal: {
    fr: "/fr/mentions-legales",
    ar: "/ar/mentions-legales",
    en: "/en/mentions-legales",
    zgh: "/zgh/mentions-legales",
  },
  privacy: {
    fr: "/fr/confidentialite",
    ar: "/ar/confidentialite",
    en: "/en/confidentialite",
    zgh: "/zgh/confidentialite",
  },
};

export function pagePath(page: PageKey, locale: Locale) {
  return paths[page][locale];
}

/** Schema.org Physician node — verified facts only. */
export function physicianSchema(locale: Locale) {
  const d = getDict(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: clinic.doctorName,
    medicalSpecialty: "https://schema.org/PrimaryCare",
    url: `${clinic.siteUrl}${pagePath("home", locale)}`,
    telephone: clinic.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.city,
      postalCode: clinic.address.postalCode,
      addressCountry: clinic.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.geo.lat,
      longitude: clinic.geo.lng,
    },
    hasMap: clinic.google.mapsUrl,
    openingHoursSpecification: clinic.hours
      .filter((h) => h.open)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${
          ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][h.day]
        }`,
        opens: h.open,
        closes: h.close,
      })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: clinic.google.rating,
      reviewCount: clinic.google.reviewCount,
    },
    description: d.meta.description,
  };
}

export function faqSchema(locale: Locale) {
  const d = getDict(locale);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: d.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function headFor(page: PageKey, locale: Locale) {
  const d = getDict(locale);
  const isHome = page === "home";
  const title = isHome
    ? d.meta.title
    : `${page === "legal" ? d.legal.title : d.privacy.title} — ${clinic.doctorName}`;
  const description = isHome ? d.meta.description : d.meta.ogDescription;
  const path = pagePath(page, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: isHome ? d.meta.ogTitle : title },
      { property: "og:description", content: isHome ? d.meta.ogDescription : description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: localeMeta[locale].htmlLang },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: path },
      ...locales.map((l) => ({
        rel: "alternate",
        hrefLang: localeMeta[l].htmlLang,
        href: pagePath(page, l),
      })),
      { rel: "alternate", hrefLang: "x-default", href: pagePath(page, "fr") },
    ],
  };
}
