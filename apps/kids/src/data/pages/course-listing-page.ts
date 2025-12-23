import { z } from "zod";

const translatedTextSchema = z.object({
  es: z.string(),
  en: z.string(),
  de: z.string(),
});

const courseListingPageSchema = z.object({
  title: translatedTextSchema,
  subtitle: translatedTextSchema,
  backButton: translatedTextSchema,
});

export type TranslatedText = z.infer<typeof translatedTextSchema>;
export type CourseListingPage = z.infer<typeof courseListingPageSchema>;

const courseListingPageData: CourseListingPage = {
  title: {
    es: "Selecciona tu curso",
    en: "Select your grade",
    de: "Wähle deine Klasse",
  },
  subtitle: {
    es: "Elige el curso escolar en el que estás",
    en: "Choose the grade you are in",
    de: "Wähle die Klasse, in der du bist",
  },
  backButton: {
    es: "Volver",
    en: "Back",
    de: "Zurück",
  },
};

export const courseListingPage = courseListingPageSchema.parse(
  courseListingPageData
);
