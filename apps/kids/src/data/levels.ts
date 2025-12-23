import { z } from "zod";

const translatedTextSchema = z.object({
  es: z.string(),
  en: z.string(),
  de: z.string(),
});

const levelItemSchema = z.object({
  id: z.string(),
  order: z.number(),
  name: translatedTextSchema,
  description: translatedTextSchema,
  dataFile: z.string(),
  enabled: z.boolean(),
});

const courseLevelsSchema = z.object({
  courseId: z.string(),
  subjectId: z.string(),
  levels: z.array(levelItemSchema),
});

const levelsSchema = z.object({
  levels: z.array(courseLevelsSchema),
});

export type TranslatedText = z.infer<typeof translatedTextSchema>;
export type LevelItem = z.infer<typeof levelItemSchema>;
export type CourseLevels = z.infer<typeof courseLevelsSchema>;
export type Levels = z.infer<typeof levelsSchema>;

const levelsData: CourseLevels[] = [
  {
    courseId: "course-2",
    subjectId: "maths",
    levels: [
      {
        id: "level-1",
        order: 1,
        name: {
          es: "Números hasta 20",
          en: "Numbers up to 20",
          de: "Zahlen bis 20",
        },
        description: {
          es: "Sumas, restas, duplicar y dividir hasta 20",
          en: "Addition, subtraction, doubling and halving up to 20",
          de: "Addition, Subtraktion, Verdoppeln und Halbieren bis 20",
        },
        dataFile: "course-2/maths/level-1-numbers-to-20.ts",
        enabled: true,
      },
      {
        id: "level-2",
        order: 2,
        name: {
          es: "Completar a diez",
          en: "Complete to ten",
          de: "Ergänzen auf zehn",
        },
        description: {
          es: "Completar números para llegar a 10",
          en: "Complete numbers to make 10",
          de: "Zahlen ergänzen, um 10 zu erreichen",
        },
        dataFile: "course-2/maths/level-2-complete-to-ten.ts",
        enabled: true,
      },
      {
        id: "level-3",
        order: 3,
        name: {
          es: "Tablas de multiplicar",
          en: "Multiplication tables",
          de: "Einmaleins",
        },
        description: {
          es: "Tablas del 2, 5 y 10",
          en: "2, 5 and 10 times tables",
          de: "2er-, 5er- und 10er-Reihe",
        },
        dataFile: "course-2/maths/level-3-multiplication-tables.ts",
        enabled: true,
      },
      {
        id: "level-4",
        order: 4,
        name: {
          es: "Duplicar y dividir",
          en: "Doubling and halving",
          de: "Verdoppeln und Halbieren",
        },
        description: {
          es: "Duplicar y dividir números hasta 20",
          en: "Double and halve numbers up to 20",
          de: "Zahlen bis 20 verdoppeln und halbieren",
        },
        dataFile: "course-2/maths/level-4-doubling-halving.ts",
        enabled: true,
      },
      {
        id: "level-5",
        order: 5,
        name: {
          es: "Descomposición",
          en: "Decomposition",
          de: "Zerlegung",
        },
        description: {
          es: "Descomponer números en decenas y unidades",
          en: "Break down numbers into tens and units",
          de: "Zahlen in Zehner und Einer zerlegen",
        },
        dataFile: "course-2/maths/level-5-decomposition.ts",
        enabled: true,
      },
    ],
  },
];

export const levels = z.array(courseLevelsSchema).parse(levelsData);
