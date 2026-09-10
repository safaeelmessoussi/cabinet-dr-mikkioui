import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { clinic, type Locale } from "@/lib/clinic";
import type { Dict } from "@/lib/i18n";
import { pagePath } from "@/lib/seo";
import { LanguageSwitcher } from "./LanguageSwitcher";

const sections = [
  { id: "cabinet", key: "about" },
  { id: "medecine-generale", key: "practice" },
  { id: "consultation", key: "approach" },
  { id: "infos-pratiques", key: "practical" },
  { id: "questions", key: "faq" },
] as const;

export function Header({ locale, d }: { locale: Locale; d: Dict }) {
  const [open, setOpen] = useState(false);
  const home = pagePath("home", locale);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="shell flex items-center justify-between gap-4 py-3">
        <Link to="/$lang" params={{ lang: locale }} className="flex items-center gap-3" aria-label={d.nav.home}>
          <img
            src="/logo-icon.svg"
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-semibold whitespace-nowrap text-primary sm:text-lg">
              {clinic.doctorName}
            </span>
            <span className="text-[0.68rem] font-bold tracking-[0.12em] text-muted-foreground uppercase">
              {d.footer.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label={d.nav.menu} className="hidden items-center xl:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`${home}#${s.id}`}
              className="rounded-full px-2.5 py-2 text-[0.9rem] font-medium whitespace-nowrap text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {d.nav[s.key]}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher current={locale} label={d.nav.chooseLanguage} compact className="hidden md:block" />
          <a href={clinic.phone.href} className="btn btn-primary hidden !min-h-11 !px-4 text-sm whitespace-nowrap sm:inline-flex xl:!px-3.5">
            <Phone aria-hidden="true" className="h-4 w-4" />
            {d.nav.call}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? d.nav.closeMenu : d.nav.openMenu}
            className="btn btn-quiet !min-h-11 !w-11 !px-0 xl:hidden"
          >
            {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-surface xl:hidden">
          <div className="shell flex flex-col gap-4 py-5">
            <nav aria-label={d.nav.menu}>
              <ul className="flex flex-col">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`${home}#${s.id}`}
                      onClick={() => setOpen(false)}
                      className="block border-b border-border py-3 text-base font-medium"
                    >
                      {d.nav[s.key]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <a href={clinic.phone.href} className="btn btn-primary w-full">
              <Phone aria-hidden="true" className="h-4 w-4" />
              {d.nav.call}
            </a>
            <div>
              <p className="eyebrow mb-2">{d.nav.language}</p>
              <LanguageSwitcher current={locale} label={d.nav.chooseLanguage} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
