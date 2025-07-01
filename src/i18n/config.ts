export const locales = ["en", "es", "no"] as const;
export type Locale = (typeof locales)[number];


export const defaultLocale: Locale = 'en';

