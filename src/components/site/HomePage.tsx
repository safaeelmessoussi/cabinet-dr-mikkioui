import { useEffect, useState } from "react";
import { Clock, MapPin, Phone, Star, Stethoscope, ExternalLink, AlertTriangle } from "lucide-react";
import { clinic, localeMeta, type Locale } from "@/lib/clinic";
import { getDict } from "@/lib/i18n";
import consultationRoom from "@/assets/consultation-room.jpg";
import archTexture from "@/assets/arch-texture.jpg";

export function HomePage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const rtl = localeMeta[locale].dir === "rtl";
  const [todayIndex, setTodayIndex] = useState<number | null>(null);

  // Resolved after mount so the server and client markup stay identical.
  useEffect(() => {
    const marrakech = new Date().toLocaleString("en-US", { timeZone: "Africa/Casablanca" });
    setTodayIndex(new Date(marrakech).getDay());
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="shell grid items-center gap-10 py-12 md:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">{d.hero.eyebrow}</p>
            <h1 className="mt-4 text-3xl leading-tight text-primary sm:text-4xl lg:text-5xl">
              {d.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">{d.hero.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={clinic.phone.href} className="btn btn-primary">
                <Phone aria-hidden="true" className="h-4 w-4" />
                {d.hero.call}
              </a>
              <a
                href={clinic.google.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <MapPin aria-hidden="true" className="h-4 w-4" />
                {d.hero.directions}
                <span className="sr-only"> ({d.footer.externalHint})</span>
              </a>
              <a href="#infos-pratiques" className="btn btn-quiet">
                <Clock aria-hidden="true" className="h-4 w-4" />
                {d.hero.hours}
              </a>
            </div>
            <p className="mt-6 text-sm font-bold text-primary" dir="ltr">
              {clinic.phone.display}
            </p>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-card)] border border-border">
            <img
              src={consultationRoom}
              alt={d.hero.imageAlt}
              width={1600}
              height={1200}
              fetchPriority="high"
              className="aspect-4/3 w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Practical strip */}
      <section aria-label={d.practical.title} className="border-b border-border bg-background">
        <div className="shell grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          <StripItem icon={<Stethoscope aria-hidden="true" className="h-5 w-5" />} title={d.strip.specialty} detail={d.strip.specialtyDetail} />
          <StripItem icon={<MapPin aria-hidden="true" className="h-5 w-5" />} title={d.strip.location} detail={d.strip.locationDetail} />
          <StripItem icon={<Clock aria-hidden="true" className="h-5 w-5" />} title={d.strip.schedule} detail={d.strip.scheduleDetail} />
          <StripItem icon={<Star aria-hidden="true" className="h-5 w-5" />} title={d.strip.reviews} detail={d.strip.reviewsDetail} />
        </div>
      </section>

      {/* About */}
      <section id="cabinet" className="section scroll-mt-24">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <p className="eyebrow">{d.nav.about}</p>
            <h2 className="mt-3 text-2xl text-primary sm:text-3xl">{d.about.title}</h2>
          </div>
          <div className="space-y-5">
            {d.about.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
            <p className="text-sm text-muted-foreground">{d.about.note}</p>
          </div>
        </div>
      </section>

      {/* General medicine */}
      <section id="medecine-generale" className="section scroll-mt-24 border-y border-border bg-surface">
        <div className="shell">
          <p className="eyebrow">{d.nav.practice}</p>
          <h2 className="mt-3 max-w-2xl text-2xl text-primary sm:text-3xl">{d.practice.title}</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{d.practice.lead}</p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {d.practice.items.map((item) => (
              <li key={item.title} className="card">
                <h3 className="text-lg text-primary">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl rounded-[var(--radius-card)] border border-sand bg-background p-5 text-sm text-muted-foreground">
            {d.practice.disclaimer}
          </p>
        </div>
      </section>

      {/* Consultation */}
      <section id="consultation" className="section scroll-mt-24">
        <div className="shell">
          <p className="eyebrow">{d.nav.approach}</p>
          <h2 className="mt-3 max-w-2xl text-2xl text-primary sm:text-3xl">{d.approach.title}</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{d.approach.lead}</p>
          <ol className="mt-10 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
            {d.approach.steps.map((step, i) => (
              <li key={step.title} className="card">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-soft font-display text-base font-bold text-primary"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base text-primary">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Practical information */}
      <section id="infos-pratiques" className="section scroll-mt-24 border-y border-border bg-surface">
        <div className="shell">
          <p className="eyebrow">{d.nav.practical}</p>
          <h2 className="mt-3 text-2xl text-primary sm:text-3xl">{d.practical.title}</h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-base text-primary">{d.practical.addressTitle}</h3>
                <address className="mt-2 not-italic">
                  {clinic.address.street}
                  <br />
                  {clinic.address.city} {clinic.address.postalCode}, {clinic.address.countryName}
                </address>
                <p className="mt-2 text-sm text-muted-foreground" dir="ltr">
                  {d.practical.plusCode} · {clinic.address.plusCode}
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={clinic.google.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary !min-h-11 text-sm"
                  >
                    <MapPin aria-hidden="true" className="h-4 w-4" />
                    {d.practical.directions}
                    <span className="sr-only"> ({d.footer.externalHint})</span>
                  </a>
                  <a
                    href={clinic.google.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-quiet !min-h-11 text-sm"
                  >
                    <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    {d.practical.viewOnMaps}
                    <span className="sr-only"> ({d.footer.externalHint})</span>
                  </a>
                </div>
              </div>

              <div className="card">
                <h3 className="text-base text-primary">{d.practical.phoneTitle}</h3>
                <p className="mt-2">
                  <a href={clinic.phone.href} className="link-underline font-display text-2xl text-primary" dir="ltr">
                    {clinic.phone.display}
                  </a>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{d.practical.phoneHelp}</p>
              </div>

              <div className="overflow-hidden rounded-[var(--radius-card)] border border-border">
                <img
                  src={archTexture}
                  alt={d.practical.mapAlt}
                  width={1600}
                  height={912}
                  loading="lazy"
                  className="aspect-16/9 w-full object-cover"
                />
              </div>
            </div>

            <div className="card">
              <h3 className="text-base text-primary">{d.practical.hoursTitle}</h3>
              <table className="mt-4 w-full text-start">
                <caption className="sr-only">{d.practical.hoursTitle}</caption>
                <tbody>
                  {clinic.hours.map((h) => {
                    const isToday = todayIndex === h.day;
                    return (
                      <tr key={h.day} className="border-b border-border last:border-0">
                        <th
                          scope="row"
                          className={`py-3 text-start font-medium ${isToday ? "text-primary" : ""}`}
                        >
                          {d.practical.days[h.day]}
                          {isToday && (
                            <span className="ms-2 rounded-full bg-sage-soft px-2 py-0.5 text-xs font-bold text-primary">
                              {d.practical.today}
                            </span>
                          )}
                        </th>
                        <td className={`py-3 text-end ${h.open ? "" : "text-muted-foreground"}`} dir="ltr">
                          {h.open ? `${h.open} – ${h.close}` : <span dir={rtl ? "rtl" : "ltr"}>{d.practical.closed}</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="mt-4 text-sm text-muted-foreground">{d.practical.hoursSource}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment */}
      <section id="rendez-vous" className="section scroll-mt-24">
        <div className="shell">
          <div className="rounded-[var(--radius-card)] bg-primary px-6 py-10 text-primary-foreground sm:px-12 sm:py-14">
            <h2 className="max-w-2xl text-2xl text-primary-foreground sm:text-3xl">{d.appointment.title}</h2>
            <p className="mt-4 max-w-2xl text-lg opacity-90">{d.appointment.body}</p>
            <a
              href={clinic.phone.href}
              className="btn mt-8 bg-background text-primary hover:bg-surface-strong"
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              {d.appointment.cta}
              <span dir="ltr" className="font-display">
                {clinic.phone.display}
              </span>
            </a>
            <p className="mt-6 max-w-2xl text-sm opacity-80">{d.appointment.noForm}</p>
          </div>
        </div>
      </section>

      {/* Emergency */}
      <section id="urgences" className="scroll-mt-24 border-y border-border bg-accent-soft">
        <div className="shell py-12">
          <h2 className="flex items-center gap-3 text-xl text-foreground sm:text-2xl">
            <AlertTriangle aria-hidden="true" className="h-6 w-6 text-accent" />
            {d.emergency.title}
          </h2>
          <p className="mt-3 max-w-3xl">{d.emergency.body}</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clinic.emergency.map((item) => (
              <li key={item.key} className="rounded-[var(--radius-card)] border border-border bg-background p-4">
                <p className="text-sm text-muted-foreground">
                  {d.emergency.labels[item.key as keyof typeof d.emergency.labels]}
                </p>
                <a
                  href={`tel:${item.number}`}
                  className="link-underline mt-1 inline-block font-display text-3xl font-bold text-primary"
                  dir="ltr"
                >
                  {item.number}
                </a>
                <span className="sr-only">
                  {d.emergency.callLabel} {item.number}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="questions" className="section scroll-mt-24">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="eyebrow">{d.nav.faq}</p>
            <h2 className="mt-3 text-2xl text-primary sm:text-3xl">{d.faq.title}</h2>
          </div>
          <dl className="divide-y divide-border border-y border-border">
            {d.faq.items.map((item) => (
              <div key={item.q} className="py-5">
                <dt className="font-display text-lg text-primary">{item.q}</dt>
                <dd className="mt-2 text-muted-foreground">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}

function StripItem({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-soft text-primary">
        {icon}
      </span>
      <span>
        <span className="block font-bold text-foreground">{title}</span>
        <span className="block text-sm text-muted-foreground">{detail}</span>
      </span>
    </div>
  );
}
