export const LOCALES = ["de", "en"] as const;
export const LOCALE_DEFAULT = "en";
export type Locales = (typeof LOCALES)[number];
