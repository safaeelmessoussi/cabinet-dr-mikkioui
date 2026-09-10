import { type Locale, isLocale, locales, localeMeta } from "../clinic";
import type { Dict } from "./types";
import { fr } from "./fr";
import { ar } from "./ar";
import { en } from "./en";
import { zgh } from "./zgh";

export const dictionaries: Record<Locale, Dict> = { fr, ar, en, zgh };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

const STORAGE_KEY = "dzm.locale";

export function rememberLocale(locale: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* storage unavailable — the site works without it */
  }
}

export function readStoredLocale(): Locale | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value && isLocale(value) ? value : null;
  } catch {
    return null;
  }
}

export type { Dict };
export { locales, localeMeta, isLocale };
export type { Locale };
