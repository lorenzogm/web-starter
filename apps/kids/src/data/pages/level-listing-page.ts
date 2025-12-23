import { z } from "zod";

const translatedTextSchema = z.object({
  es: z.string(),
  en: z.string(),
  de: z.string(),
});

const levelListingPageSchema = z.object({
  title: translatedTextSchema,
  subtitle: translatedTextSchema,
  backButton: translatedTextSchema,
  exercises: translatedTextSchema,
  completed: translatedTextSchema,
});

export type TranslatedText = z.infer<typeof translatedTextSchema>;
export type LevelListingPage = z.infer<typeof levelListingPageSchema>;

const levelListingPageData: LevelListingPage = {
  title: {
    es: "{subject} - {course}",
    en: "{subject} - {course}",
    de: "{subject} - {course}",
  },
  subtitle: {
    es: "Selecciona un nivel para practicar",
    en: "Select a level to practice",
    de: "Wähle ein Level zum Üben",
  },
  backButton: {
    es: "Volver a materias",
    en: "Back to subjects",
    de: "Zurück zu Fächern",
  },
  exercises: {
    es: "ejercicios",
    en: "exercises",
    de: "Übungen",
  },
  completed: {
    es: "COMPLETADO",
    en: "COMPLETED",
    de: "ABGESCHLOSSEN",
  },
};

export const levelListingPage =
  levelListingPageSchema.parse(levelListingPageData);
