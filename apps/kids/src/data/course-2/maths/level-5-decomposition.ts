import { z } from "zod";

const translatedTextSchema = z.object({
  es: z.string(),
  en: z.string(),
  de: z.string(),
});

const metadataSchema = z.object({
  level: z.string(),
  title: translatedTextSchema,
  description: translatedTextSchema,
  totalOperations: z.number(),
});

const operationTypeSchema = z.enum([
  "addition",
  "subtraction",
  "doubling",
  "halving",
  "complete",
  "multiplication",
  "decompose",
]);

const operationSchema = z.object({
  id: z.number(),
  num1: z.number(),
  num2: z.number(),
  type: operationTypeSchema,
  answer: z.number(),
});

const levelDataSchema = z.object({
  metadata: metadataSchema,
  operations: z.array(operationSchema),
});

export type Metadata = z.infer<typeof metadataSchema>;
export type OperationType = z.infer<typeof operationTypeSchema>;
export type Operation = z.infer<typeof operationSchema>;
export type LevelData = z.infer<typeof levelDataSchema>;

const levelDataRaw: LevelData = {
  metadata: {
    level: "level-5",
    title: {
      es: "Descomposición",
      en: "Decomposition",
      de: "Zerlegung",
    },
    description: {
      es: "Decenas y unidades",
      en: "Tens and ones",
      de: "Zehner und Einer",
    },
    totalOperations: 40,
  },
  operations: [
    { id: 1, num1: 13, num2: 10, type: "decompose", answer: 3 },
    { id: 2, num1: 15, num2: 10, type: "decompose", answer: 5 },
    { id: 3, num1: 17, num2: 10, type: "decompose", answer: 7 },
    { id: 4, num1: 19, num2: 10, type: "decompose", answer: 9 },
    { id: 5, num1: 23, num2: 20, type: "decompose", answer: 3 },
    { id: 6, num1: 25, num2: 20, type: "decompose", answer: 5 },
    { id: 7, num1: 27, num2: 20, type: "decompose", answer: 7 },
    { id: 8, num1: 29, num2: 20, type: "decompose", answer: 9 },
    { id: 9, num1: 31, num2: 30, type: "decompose", answer: 1 },
    { id: 10, num1: 34, num2: 30, type: "decompose", answer: 4 },
    { id: 11, num1: 36, num2: 30, type: "decompose", answer: 6 },
    { id: 12, num1: 38, num2: 30, type: "decompose", answer: 8 },
    { id: 13, num1: 42, num2: 40, type: "decompose", answer: 2 },
    { id: 14, num1: 45, num2: 40, type: "decompose", answer: 5 },
    { id: 15, num1: 47, num2: 40, type: "decompose", answer: 7 },
    { id: 16, num1: 49, num2: 40, type: "decompose", answer: 9 },
    { id: 17, num1: 51, num2: 50, type: "decompose", answer: 1 },
    { id: 18, num1: 53, num2: 50, type: "decompose", answer: 3 },
    { id: 19, num1: 56, num2: 50, type: "decompose", answer: 6 },
    { id: 20, num1: 58, num2: 50, type: "decompose", answer: 8 },
    { id: 21, num1: 62, num2: 60, type: "decompose", answer: 2 },
    { id: 22, num1: 64, num2: 60, type: "decompose", answer: 4 },
    { id: 23, num1: 67, num2: 60, type: "decompose", answer: 7 },
    { id: 24, num1: 69, num2: 60, type: "decompose", answer: 9 },
    { id: 25, num1: 71, num2: 70, type: "decompose", answer: 1 },
    { id: 26, num1: 73, num2: 70, type: "decompose", answer: 3 },
    { id: 27, num1: 75, num2: 70, type: "decompose", answer: 5 },
    { id: 28, num1: 78, num2: 70, type: "decompose", answer: 8 },
    { id: 29, num1: 82, num2: 80, type: "decompose", answer: 2 },
    { id: 30, num1: 84, num2: 80, type: "decompose", answer: 4 },
    { id: 31, num1: 86, num2: 80, type: "decompose", answer: 6 },
    { id: 32, num1: 89, num2: 80, type: "decompose", answer: 9 },
    { id: 33, num1: 91, num2: 90, type: "decompose", answer: 1 },
    { id: 34, num1: 93, num2: 90, type: "decompose", answer: 3 },
    { id: 35, num1: 95, num2: 90, type: "decompose", answer: 5 },
    { id: 36, num1: 97, num2: 90, type: "decompose", answer: 7 },
    { id: 37, num1: 20, num2: 10, type: "decompose", answer: 10 },
    { id: 38, num1: 50, num2: 10, type: "decompose", answer: 40 },
    { id: 39, num1: 80, num2: 10, type: "decompose", answer: 70 },
    { id: 40, num1: 100, num2: 10, type: "decompose", answer: 90 },
  ],
};

export const levelData = levelDataSchema.parse(levelDataRaw);
