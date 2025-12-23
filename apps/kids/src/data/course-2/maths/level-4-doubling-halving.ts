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
    level: "level-4",
    title: {
      es: "Duplicar y Dividir",
      en: "Doubling and Halving",
      de: "Verdoppeln und Halbieren",
    },
    description: {
      es: "Duplicar y dividir por la mitad",
      en: "Doubling and halving",
      de: "Verdoppeln und halbieren",
    },
    totalOperations: 25,
  },
  operations: [
    { id: 1, num1: 5, num2: 2, type: "doubling", answer: 10 },
    { id: 2, num1: 10, num2: 2, type: "doubling", answer: 20 },
    { id: 3, num1: 15, num2: 2, type: "doubling", answer: 30 },
    { id: 4, num1: 20, num2: 2, type: "doubling", answer: 40 },
    { id: 5, num1: 25, num2: 2, type: "doubling", answer: 50 },
    { id: 6, num1: 30, num2: 2, type: "doubling", answer: 60 },
    { id: 7, num1: 35, num2: 2, type: "doubling", answer: 70 },
    { id: 8, num1: 40, num2: 2, type: "doubling", answer: 80 },
    { id: 9, num1: 45, num2: 2, type: "doubling", answer: 90 },
    { id: 10, num1: 50, num2: 2, type: "doubling", answer: 100 },
    { id: 11, num1: 12, num2: 2, type: "doubling", answer: 24 },
    { id: 12, num1: 13, num2: 2, type: "doubling", answer: 26 },
    { id: 13, num1: 14, num2: 2, type: "doubling", answer: 28 },
    { id: 14, num1: 10, num2: 2, type: "halving", answer: 5 },
    { id: 15, num1: 20, num2: 2, type: "halving", answer: 10 },
    { id: 16, num1: 30, num2: 2, type: "halving", answer: 15 },
    { id: 17, num1: 40, num2: 2, type: "halving", answer: 20 },
    { id: 18, num1: 50, num2: 2, type: "halving", answer: 25 },
    { id: 19, num1: 60, num2: 2, type: "halving", answer: 30 },
    { id: 20, num1: 70, num2: 2, type: "halving", answer: 35 },
    { id: 21, num1: 80, num2: 2, type: "halving", answer: 40 },
    { id: 22, num1: 90, num2: 2, type: "halving", answer: 45 },
    { id: 23, num1: 100, num2: 2, type: "halving", answer: 50 },
    { id: 24, num1: 24, num2: 2, type: "halving", answer: 12 },
    { id: 25, num1: 26, num2: 2, type: "halving", answer: 13 },
  ],
};

export const levelData = levelDataSchema.parse(levelDataRaw);
