export interface Dict {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string };
  skipToContent: string;
  nav: {
    home: string;
    about: string;
    practice: string;
    approach: string;
    practical: string;
    faq: string;
    call: string;
    openMenu: string;
    closeMenu: string;
    menu: string;
    language: string;
    chooseLanguage: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    call: string;
    directions: string;
    hours: string;
    imageAlt: string;
  };
  strip: {
    specialty: string;
    specialtyDetail: string;
    location: string;
    locationDetail: string;
    reviews: string;
    reviewsDetail: string;
    schedule: string;
    scheduleDetail: string;
  };
  about: { title: string; body: string[]; note: string | null };
  practice: {
    title: string;
    lead: string;
    items: { title: string; body: string }[];
    disclaimer: string | null;
  };
  approach: { title: string; lead: string; steps: { title: string; body: string }[] };
  practical: {
    title: string;
    addressTitle: string;
    plusCode: string;
    hoursTitle: string;
    hoursSource: string | null;
    phoneTitle: string;
    phoneHelp: string;
    directions: string;
    viewOnMaps: string;
    mapAlt: string;
    closed: string;
    days: string[];
    today: string;
  };
  appointment: { title: string; body: string; cta: string; noForm: string | null };
  emergency: {
    title: string;
    body: string;
    labels: { samu: string; civil: string; police: string; gendarmerie: string };
    callLabel: string;
  };
  faq: { title: string; items: { q: string; a: string }[] };
  footer: {
    tagline: string;
    navTitle: string;
    contactTitle: string;
    legalTitle: string;
    legal: string;
    privacy: string;
    disclaimer: string;
    rights: string;
    externalHint: string;
  };
  legal: { title: string; updated: string; sections: { title: string; body: string }[] };
  privacy: {
    title: string;
    updated: string;
    intro: string;
    sections: { title: string; body: string }[];
  };
  notFound: { title: string; body: string; cta: string };
  /** Shown as a banner when the translation still awaits human validation. */
  reviewNotice: string | null;
}
