import { z } from "zod";

const translatedTextSchema = z.object({
  es: z.string(),
  en: z.string(),
  de: z.string(),
});

const courseSchema = z.object({
  id: z.string(),
  grade: z.number(),
  name: translatedTextSchema,
  ageRange: z.string(),
  enabled: z.boolean(),
});

const coursesSchema = z.object({
  courses: z.array(courseSchema),
});

export type TranslatedText = z.infer<typeof translatedTextSchema>;
export type Course = z.infer<typeof courseSchema>;
export type Courses = z.infer<typeof coursesSchema>;

const coursesData: Course[] = [
  {
    id: "course-1",
    grade: 1,
    name: {
      es: "Primero de Primaria",
      en: "First Grade",
      de: "Erste Klasse",
    },
    ageRange: "6-7",
    enabled: false,
  },
  {
    id: "course-2",
    grade: 2,
    name: {
      es: "Segundo de Primaria",
      en: "Second Grade",
      de: "Zweite Klasse",
    },
    ageRange: "7-8",
    enabled: true,
  },
  {
    id: "course-3",
    grade: 3,
    name: {
      es: "Tercero de Primaria",
      en: "Third Grade",
      de: "Dritte Klasse",
    },
    ageRange: "8-9",
    enabled: false,
  },
  {
    id: "course-4",
    grade: 4,
    name: {
      es: "Cuarto de Primaria",
      en: "Fourth Grade",
      de: "Vierte Klasse",
    },
    ageRange: "9-10",
    enabled: false,
  },
  {
    id: "course-5",
    grade: 5,
    name: {
      es: "Quinto de Primaria",
      en: "Fifth Grade",
      de: "Fünfte Klasse",
    },
    ageRange: "10-11",
    enabled: false,
  },
  {
    id: "course-6",
    grade: 6,
    name: {
      es: "Sexto de Primaria",
      en: "Sixth Grade",
      de: "Sechste Klasse",
    },
    ageRange: "11-12",
    enabled: false,
  },
];

export const courses = z.array(courseSchema).parse(coursesData);
