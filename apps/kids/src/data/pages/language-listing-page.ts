import { z } from "zod";

const translatedTextSchema = z.object({
  es: z.string(),
  en: z.string(),
  de: z.string(),
});

const languageListingPageSchema = z.object({
  title: translatedTextSchema,
  subtitle: translatedTextSchema,
});

export type TranslatedText = z.infer<typeof translatedTextSchema>;
export type LanguageListingPage = z.infer<typeof languageListingPageSchema>;

const languageListingPageData: LanguageListingPage = {
  title: {
    es: "Selecciona tu idioma",
    en: "Choose your language",
    de: "Wähle deine Sprache",
  },
  subtitle: {
    es: "Elige el idioma en el que quieres aprender",
    en: "Choose the language you want to learn in",
    de: "Wähle die Sprache, in der du lernen möchtest",
  },
};

export const languageListingPage = languageListingPageSchema.parse(
  languageListingPageData
);
