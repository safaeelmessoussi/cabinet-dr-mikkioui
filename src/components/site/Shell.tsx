import { useEffect, type ReactNode } from "react";
import { localeMeta, type Locale } from "@/lib/clinic";
import { getDict, rememberLocale } from "@/lib/i18n";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Shell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const d = getDict(locale);

  useEffect(() => {
    rememberLocale(locale);
  }, [locale]);

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-primary-foreground"
      >
        {d.skipToContent}
      </a>
      {d.reviewNotice && (
        <p
          className="bg-accent-soft px-4 py-2 text-center text-sm text-foreground"
          dir={localeMeta[locale].dir}
        >
          {d.reviewNotice}
        </p>
      )}
      <Header locale={locale} d={d} />
      <main id="contenu">{children}</main>
      <Footer locale={locale} d={d} />
    </>
  );
}
