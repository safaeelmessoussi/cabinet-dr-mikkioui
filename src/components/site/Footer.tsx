import { Link } from "@tanstack/react-router";
import { Facebook, Instagram } from "lucide-react";
import { clinic, type Locale } from "@/lib/clinic";
import type { Dict } from "@/lib/i18n";
import { pagePath } from "@/lib/seo";
import logoMark from "@/assets/logo-mark.png";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer({ locale, d }: { locale: Locale; d: Dict }) {
  const home = pagePath("home", locale);

  return (
    <footer className="border-t border-border bg-surface-strong">
      <div className="shell grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4">
            <img
              src={logoMark}
              alt={`${clinic.doctorName} — ${d.footer.tagline}`}
              width={72}
              height={72}
              className="h-16 w-16 shrink-0 object-contain"
            />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg font-semibold text-primary">{clinic.doctorName}</span>
              <span className="text-[0.7rem] font-bold tracking-[0.12em] text-muted-foreground uppercase">
                {d.footer.tagline}
              </span>
            </span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={clinic.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Facebook — ${clinic.doctorName}`}
              className="btn btn-quiet !min-h-11 !w-11 !px-0"
            >
              <Facebook aria-hidden="true" className="h-5 w-5" />
            </a>
            <a
              href={clinic.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram — ${clinic.doctorName}`}
              className="btn btn-quiet !min-h-11 !w-11 !px-0"
            >
              <Instagram aria-hidden="true" className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">{d.footer.disclaimer}</p>
        </div>

        <div>
          <h2 className="eyebrow mb-3">{d.footer.contactTitle}</h2>
          <address className="space-y-2 text-sm not-italic">
            <p>{clinic.address.full}</p>
            <p>
              <a href={clinic.phone.href} className="link-underline font-bold" dir="ltr">
                {clinic.phone.display}
              </a>
            </p>
            <p>
              <a
                href={clinic.google.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                {d.hero.directions}
                <span className="sr-only"> ({d.footer.externalHint})</span>
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="eyebrow mb-3">{d.footer.navTitle}</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/$lang" params={{ lang: locale }} className="link-underline">
                {d.nav.home}
              </Link>
            </li>
            <li>
              <a href={`${home}#infos-pratiques`} className="link-underline">
                {d.nav.practical}
              </a>
            </li>
            <li>
              <a href={`${home}#questions`} className="link-underline">
                {d.nav.faq}
              </a>
            </li>
            <li>
              <Link to="/$lang/mentions-legales" params={{ lang: locale }} className="link-underline">
                {d.footer.legal}
              </Link>
            </li>
            <li>
              <Link to="/$lang/confidentialite" params={{ lang: locale }} className="link-underline">
                {d.footer.privacy}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-col gap-4 py-5 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {clinic.doctorName}. {d.footer.rights}
          </p>
          <LanguageSwitcher current={locale} label={d.nav.chooseLanguage} />
        </div>
      </div>
    </footer>
  );
}
