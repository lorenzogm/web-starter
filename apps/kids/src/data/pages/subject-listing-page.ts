import { z } from "zod";

const translatedTextSchema = z.object({
  es: z.string(),
  en: z.string(),
  de: z.string(),
});

const subjectListingPageSchema = z.object({
  title: translatedTextSchema,
  subtitle: translatedTextSchema,
  backButton: translatedTextSchema,
});

export type TranslatedText = z.infer<typeof translatedTextSchema>;
export type SubjectListingPage = z.infer<typeof subjectListingPageSchema>;

const subjectListingPageData: SubjectListingPage = {
  title: {
    es: "{course} - Selecciona una materia",
    en: "{course} - Select a subject",
    de: "{course} - Wähle ein Fach",
  },
  subtitle: {
    es: "Elige la materia que quieres practicar",
    en: "Choose the subject you want to practice",
    de: "Wähle das Fach, das du üben möchtest",
  },
  backButton: {
    es: "Volver a Cursos",
    en: "Back to Grades",
    de: "Zurück zu Klassen",
  },
};

export const subjectListingPage = subjectListingPageSchema.parse(
  subjectListingPageData
);
