import { useRouterState } from "@tanstack/react-router";
import { locales, localeMeta, type Locale } from "@/lib/clinic";
import { rememberLocale } from "@/lib/i18n";

function swapLocale(pathname: string, next: Locale) {
  const rest = pathname.replace(/^\/(fr|ar|en|zgh)/, "");
  return `/${next}${rest}`;
}

/**
 * Uses real anchors on purpose: switching language also switches text
 * direction and font, which a full document load applies reliably.
 */
const shortLabel: Record<Locale, string> = { fr: "FR", ar: "ع", en: "EN", zgh: "ⵣ" };

export function LanguageSwitcher({
  current,
  label,
  className = "",
  compact = false,
}: {
  current: Locale;
  label: string;
  className?: string;
  compact?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav aria-label={label} className={className}>
      <ul className={`flex items-center gap-1 ${compact ? "flex-nowrap" : "flex-wrap"}`}>
        {locales.map((locale) => {
          const active = locale === current;
          return (
            <li key={locale}>
              <a
                href={swapLocale(pathname, locale)}
                hrefLang={localeMeta[locale].htmlLang}
                lang={localeMeta[locale].htmlLang}
                aria-current={active ? "true" : undefined}
                onClick={() => rememberLocale(locale)}
                className={`inline-flex min-h-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${compact ? "min-w-9 px-2" : "px-3"} ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className={compact ? "sr-only" : undefined}>{localeMeta[locale].label}</span>
                {compact ? <span aria-hidden="true">{shortLabel[locale]}</span> : null}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
