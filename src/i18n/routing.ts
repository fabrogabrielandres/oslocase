export const locales = ["en", "es", "no"] as const;
export type Locale = (typeof locales)[number];

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: "en",
});
