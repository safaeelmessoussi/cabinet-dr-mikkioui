import { createFileRoute, redirect } from "@tanstack/react-router";
import { isLocale } from "@/lib/clinic";

/** French is the default language; a stored preference wins on the client. */
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    let target = "/fr";
    if (typeof window !== "undefined") {
      try {
        const stored = window.localStorage.getItem("dzm.locale");
        if (stored && isLocale(stored)) target = `/${stored}`;
      } catch {
        /* ignore */
      }
    }
    throw redirect({ to: target, replace: true });
  },
});
