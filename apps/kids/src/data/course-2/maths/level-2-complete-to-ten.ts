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
    level: "level-2",
    title: {
      es: "Completar a la Decena",
      en: "Complete to Ten",
      de: "Auf Zehn ergänzen",
    },
    description: {
      es: "Completar hasta 10, 20, 30... 100",
      en: "Complete up to 10, 20, 30... 100",
      de: "Ergänzen bis 10, 20, 30... 100",
    },
    totalOperations: 50,
  },
  operations: [
    { id: 1, num1: 10, num2: 1, type: "complete", answer: 9 },
    { id: 2, num1: 10, num2: 2, type: "complete", answer: 8 },
    { id: 3, num1: 10, num2: 3, type: "complete", answer: 7 },
    { id: 4, num1: 10, num2: 4, type: "complete", answer: 6 },
    { id: 5, num1: 10, num2: 5, type: "complete", answer: 5 },
    { id: 6, num1: 10, num2: 6, type: "complete", answer: 4 },
    { id: 7, num1: 10, num2: 7, type: "complete", answer: 3 },
    { id: 8, num1: 10, num2: 8, type: "complete", answer: 2 },
    { id: 9, num1: 10, num2: 9, type: "complete", answer: 1 },
    { id: 10, num1: 10, num2: 0, type: "complete", answer: 10 },
    { id: 11, num1: 20, num2: 11, type: "complete", answer: 9 },
    { id: 12, num1: 20, num2: 12, type: "complete", answer: 8 },
    { id: 13, num1: 20, num2: 13, type: "complete", answer: 7 },
    { id: 14, num1: 20, num2: 14, type: "complete", answer: 6 },
    { id: 15, num1: 20, num2: 15, type: "complete", answer: 5 },
    { id: 16, num1: 20, num2: 16, type: "complete", answer: 4 },
    { id: 17, num1: 20, num2: 17, type: "complete", answer: 3 },
    { id: 18, num1: 20, num2: 18, type: "complete", answer: 2 },
    { id: 19, num1: 20, num2: 19, type: "complete", answer: 1 },
    { id: 20, num1: 20, num2: 10, type: "complete", answer: 10 },
    { id: 21, num1: 30, num2: 21, type: "complete", answer: 9 },
    { id: 22, num1: 30, num2: 22, type: "complete", answer: 8 },
    { id: 23, num1: 30, num2: 23, type: "complete", answer: 7 },
    { id: 24, num1: 30, num2: 24, type: "complete", answer: 6 },
    { id: 25, num1: 30, num2: 25, type: "complete", answer: 5 },
    { id: 26, num1: 30, num2: 26, type: "complete", answer: 4 },
    { id: 27, num1: 30, num2: 27, type: "complete", answer: 3 },
    { id: 28, num1: 30, num2: 28, type: "complete", answer: 2 },
    { id: 29, num1: 30, num2: 29, type: "complete", answer: 1 },
    { id: 30, num1: 30, num2: 20, type: "complete", answer: 10 },
    { id: 31, num1: 40, num2: 31, type: "complete", answer: 9 },
    { id: 32, num1: 40, num2: 32, type: "complete", answer: 8 },
    { id: 33, num1: 40, num2: 33, type: "complete", answer: 7 },
    { id: 34, num1: 40, num2: 34, type: "complete", answer: 6 },
    { id: 35, num1: 40, num2: 35, type: "complete", answer: 5 },
    { id: 36, num1: 50, num2: 41, type: "complete", answer: 9 },
    { id: 37, num1: 50, num2: 42, type: "complete", answer: 8 },
    { id: 38, num1: 50, num2: 43, type: "complete", answer: 7 },
    { id: 39, num1: 50, num2: 44, type: "complete", answer: 6 },
    { id: 40, num1: 50, num2: 45, type: "complete", answer: 5 },
    { id: 41, num1: 60, num2: 51, type: "complete", answer: 9 },
    { id: 42, num1: 60, num2: 52, type: "complete", answer: 8 },
    { id: 43, num1: 60, num2: 53, type: "complete", answer: 7 },
    { id: 44, num1: 70, num2: 61, type: "complete", answer: 9 },
    { id: 45, num1: 70, num2: 62, type: "complete", answer: 8 },
    { id: 46, num1: 80, num2: 71, type: "complete", answer: 9 },
    { id: 47, num1: 80, num2: 72, type: "complete", answer: 8 },
    { id: 48, num1: 90, num2: 81, type: "complete", answer: 9 },
    { id: 49, num1: 100, num2: 91, type: "complete", answer: 9 },
    { id: 50, num1: 100, num2: 90, type: "complete", answer: 10 },
  ],
};

export const levelData = levelDataSchema.parse(levelDataRaw);
