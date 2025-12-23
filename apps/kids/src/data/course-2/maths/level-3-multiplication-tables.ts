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
    level: "level-3",
    title: {
      es: "Tablas del 2, 5 y 10",
      en: "Times Tables 2, 5 and 10",
      de: "Einmaleins 2, 5 und 10",
    },
    description: {
      es: "Multiplicación básica",
      en: "Basic multiplication",
      de: "Grundlegende Multiplikation",
    },
    totalOperations: 30,
  },
  operations: [
    { id: 1, num1: 2, num2: 1, type: "multiplication", answer: 2 },
    { id: 2, num1: 2, num2: 2, type: "multiplication", answer: 4 },
    { id: 3, num1: 2, num2: 3, type: "multiplication", answer: 6 },
    { id: 4, num1: 2, num2: 4, type: "multiplication", answer: 8 },
    { id: 5, num1: 2, num2: 5, type: "multiplication", answer: 10 },
    { id: 6, num1: 2, num2: 6, type: "multiplication", answer: 12 },
    { id: 7, num1: 2, num2: 7, type: "multiplication", answer: 14 },
    { id: 8, num1: 2, num2: 8, type: "multiplication", answer: 16 },
    { id: 9, num1: 2, num2: 9, type: "multiplication", answer: 18 },
    { id: 10, num1: 2, num2: 10, type: "multiplication", answer: 20 },
    { id: 11, num1: 5, num2: 1, type: "multiplication", answer: 5 },
    { id: 12, num1: 5, num2: 2, type: "multiplication", answer: 10 },
    { id: 13, num1: 5, num2: 3, type: "multiplication", answer: 15 },
    { id: 14, num1: 5, num2: 4, type: "multiplication", answer: 20 },
    { id: 15, num1: 5, num2: 5, type: "multiplication", answer: 25 },
    { id: 16, num1: 5, num2: 6, type: "multiplication", answer: 30 },
    { id: 17, num1: 5, num2: 7, type: "multiplication", answer: 35 },
    { id: 18, num1: 5, num2: 8, type: "multiplication", answer: 40 },
    { id: 19, num1: 5, num2: 9, type: "multiplication", answer: 45 },
    { id: 20, num1: 5, num2: 10, type: "multiplication", answer: 50 },
    { id: 21, num1: 10, num2: 1, type: "multiplication", answer: 10 },
    { id: 22, num1: 10, num2: 2, type: "multiplication", answer: 20 },
    { id: 23, num1: 10, num2: 3, type: "multiplication", answer: 30 },
    { id: 24, num1: 10, num2: 4, type: "multiplication", answer: 40 },
    { id: 25, num1: 10, num2: 5, type: "multiplication", answer: 50 },
    { id: 26, num1: 10, num2: 6, type: "multiplication", answer: 60 },
    { id: 27, num1: 10, num2: 7, type: "multiplication", answer: 70 },
    { id: 28, num1: 10, num2: 8, type: "multiplication", answer: 80 },
    { id: 29, num1: 10, num2: 9, type: "multiplication", answer: 90 },
    { id: 30, num1: 10, num2: 10, type: "multiplication", answer: 100 },
  ],
};

export const levelData = levelDataSchema.parse(levelDataRaw);
