import type { Locale } from "@/lib/clinic";
import { getDict } from "@/lib/i18n";

export function TextPage({ locale, page }: { locale: Locale; page: "legal" | "privacy" }) {
  const d = getDict(locale);
  const content = page === "legal" ? d.legal : d.privacy;
  const intro = page === "privacy" ? d.privacy.intro : null;

  return (
    <article className="section">
      <div className="shell max-w-3xl">
        <h1 className="text-3xl text-primary sm:text-4xl">{content.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {content.updated} : 2026-09-10
        </p>
        {intro && <p className="mt-6 text-lg">{intro}</p>}
        <div className="mt-10 space-y-8">
          {content.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl text-primary">{section.title}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
