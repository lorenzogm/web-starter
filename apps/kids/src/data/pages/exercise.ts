import { z } from "zod";

const translatedTextSchema = z.object({
  es: z.string(),
  en: z.string(),
  de: z.string(),
});

const feedbackSchema = z.object({
  correct: translatedTextSchema,
  incorrect: translatedTextSchema,
});

const buttonsSchema = z.object({
  clear: translatedTextSchema,
  verify: translatedTextSchema,
  retry: translatedTextSchema,
});

const operationsSchema = z.object({
  doubling: translatedTextSchema,
  halving: translatedTextSchema,
  decomposition: translatedTextSchema,
  completeToTen: translatedTextSchema,
});

const exercisePageSchema = z.object({
  backButton: translatedTextSchema,
  completed: translatedTextSchema,
  loading: translatedTextSchema,
  feedback: feedbackSchema,
  buttons: buttonsSchema,
  operations: operationsSchema,
});

export type TranslatedText = z.infer<typeof translatedTextSchema>;
export type Feedback = z.infer<typeof feedbackSchema>;
export type Buttons = z.infer<typeof buttonsSchema>;
export type Operations = z.infer<typeof operationsSchema>;
export type ExercisePage = z.infer<typeof exercisePageSchema>;

const exercisePageData: ExercisePage = {
  backButton: {
    es: "Volver",
    en: "Back",
    de: "Zurück",
  },
  completed: {
    es: "completado",
    en: "completed",
    de: "abgeschlossen",
  },
  loading: {
    es: "Cargando...",
    en: "Loading...",
    de: "Lädt...",
  },
  feedback: {
    correct: {
      es: "¡Correcto!",
      en: "Correct!",
      de: "Richtig!",
    },
    incorrect: {
      es: "Inténtalo de nuevo",
      en: "Try again",
      de: "Versuche es nochmal",
    },
  },
  buttons: {
    clear: {
      es: "Borrar",
      en: "Clear",
      de: "Löschen",
    },
    verify: {
      es: "Verificar Respuesta",
      en: "Verify Answer",
      de: "Antwort prüfen",
    },
    retry: {
      es: "Reintentar",
      en: "Retry",
      de: "Nochmal",
    },
  },
  operations: {
    doubling: {
      es: "Duplica {num}",
      en: "Double {num}",
      de: "Verdoppele {num}",
    },
    halving: {
      es: "Mitad de {num}",
      en: "Half of {num}",
      de: "Hälfte von {num}",
    },
    decomposition: {
      es: "{num} = ? decenas + ? unidades",
      en: "{num} = ? tens + ? ones",
      de: "{num} = ? Zehner + ? Einer",
    },
    completeToTen: {
      es: "{num} + ? = {answer}",
      en: "{num} + ? = {answer}",
      de: "{num} + ? = {answer}",
    },
  },
};

export const exercisePage = exercisePageSchema.parse(exercisePageData);
