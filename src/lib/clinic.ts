/**
 * Single source of truth for every verified fact about the practice.
 * Nothing here may be changed without a public, checkable source.
 * See SOURCES.md at the repository root for the verification trail.
 */

export const clinic = {
  doctorName: "Dr Zineb Mikkioui",
  specialty: "medecine_generale",
  city: "Marrakech",
  address: {
    street: "202C Av. El Moutanabi",
    postalCode: "40000",
    city: "Marrakech",
    country: "MA",
    countryName: "Maroc",
    full: "202C Av. El Moutanabi, Marrakech 40000, Maroc",
    plusCode: "JWRM+96 Marrakech, Maroc",
  },
  geo: { lat: 31.6409612, lng: -8.066959 },
  phone: {
    display: "+212 5 24 34 50 84",
    e164: "+212524345084",
    href: "tel:+212524345084",
  },
  /** Google Business Profile — public listing used as the reference source. */
  google: {
    mapsUrl: "https://maps.app.goo.gl/Jv9G8Zg3xmMWLquv8",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=31.6409612,-8.066959&destination_place_id=ChIJO5hYhVCe-goRV_y7MXmcntg",
    rating: 4.9,
    reviewCount: 42,
  },
  /** 0 = Sunday … 6 = Saturday. `null` = closed. Times are Africa/Casablanca. */
  hours: [
    { day: 1, open: "09:00", close: "16:00" },
    { day: 2, open: "09:00", close: "16:00" },
    { day: 3, open: "09:00", close: "16:00" },
    { day: 4, open: "09:00", close: "16:00" },
    { day: 5, open: "09:00", close: "16:00" },
    { day: 6, open: "09:00", close: "13:00" },
    { day: 0, open: null, close: null },
  ] as const,
  /** Verified Moroccan emergency numbers (see SOURCES.md). */
  emergency: [
    { key: "samu", number: "141" },
    { key: "civil", number: "15" },
    { key: "police", number: "19" },
    { key: "gendarmerie", number: "177" },
  ],
  /** Official public pages of the practice. */
  social: {
    facebook:
      "https://www.facebook.com/p/cabinet-de-M%C3%A9decine-Dr-Mikkioui-Zineb-61553445114888/",
    instagram: "https://www.instagram.com/zinebmikkioui/",
  },
  siteUrl: "https://cabinet-dr-mikkioui.lovable.app",
} as const;

export type Locale = "fr" | "ar" | "en" | "zgh";

export const locales: Locale[] = ["fr", "ar", "en", "zgh"];

export const localeMeta: Record<
  Locale,
  { label: string; htmlLang: string; dir: "ltr" | "rtl"; fontClass: string }
> = {
  fr: { label: "Français", htmlLang: "fr", dir: "ltr", fontClass: "font-latin" },
  ar: { label: "العربية", htmlLang: "ar", dir: "rtl", fontClass: "font-arabic" },
  en: { label: "English", htmlLang: "en", dir: "ltr", fontClass: "font-latin" },
  zgh: { label: "ⵜⴰⵎⴰⵣⵉⵖⵜ", htmlLang: "zgh", dir: "ltr", fontClass: "font-tifinagh" },
};

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}
