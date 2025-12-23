import { z } from "zod";

const translatedTextSchema = z.object({
  es: z.string(),
  en: z.string(),
  de: z.string(),
});

const subjectSchema = z.object({
  id: z.string(),
  icon: z.string(),
  name: translatedTextSchema,
  enabled: z.boolean(),
  color: z.string(),
});

const subjectsSchema = z.object({
  subjects: z.array(subjectSchema),
});

export type TranslatedText = z.infer<typeof translatedTextSchema>;
export type Subject = z.infer<typeof subjectSchema>;
export type Subjects = z.infer<typeof subjectsSchema>;

const subjectsData: Subject[] = [
  {
    id: "maths",
    icon: "➕",
    name: {
      es: "Matemáticas",
      en: "Mathematics",
      de: "Mathematik",
    },
    enabled: true,
    color: "#4F46E5",
  },
  {
    id: "language",
    icon: "📖",
    name: {
      es: "Lengua",
      en: "Language",
      de: "Sprache",
    },
    enabled: false,
    color: "#DC2626",
  },
  {
    id: "natural-science",
    icon: "🔬",
    name: {
      es: "Ciencias Naturales",
      en: "Natural Science",
      de: "Naturwissenschaften",
    },
    enabled: false,
    color: "#059669",
  },
  {
    id: "social-science",
    icon: "🌍",
    name: {
      es: "Ciencias Sociales",
      en: "Social Science",
      de: "Sozialwissenschaften",
    },
    enabled: false,
    color: "#D97706",
  },
  {
    id: "english",
    icon: "🇬🇧",
    name: {
      es: "Inglés",
      en: "English",
      de: "Englisch",
    },
    enabled: false,
    color: "#7C3AED",
  },
  {
    id: "physical-education",
    icon: "⚽",
    name: {
      es: "Educación Física",
      en: "Physical Education",
      de: "Sportunterricht",
    },
    enabled: false,
    color: "#0891B2",
  },
];

export const subjects = z.array(subjectSchema).parse(subjectsData);
