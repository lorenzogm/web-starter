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
    level: "level-1",
    title: {
      es: "Números hasta 20",
      en: "Numbers up to 20",
      de: "Zahlen bis 20",
    },
    description: {
      es: "Sumas, restas, duplicar y dividir hasta 20",
      en: "Addition, subtraction, doubling and halving up to 20",
      de: "Addition, Subtraktion, Verdoppeln und Halbieren bis 20",
    },
    totalOperations: 40,
  },
  operations: [
    { id: 1, num1: 5, num2: 3, type: "addition", answer: 8 },
    { id: 2, num1: 7, num2: 4, type: "addition", answer: 11 },
    { id: 3, num1: 9, num2: 6, type: "addition", answer: 15 },
    { id: 4, num1: 8, num2: 7, type: "addition", answer: 15 },
    { id: 5, num1: 6, num2: 8, type: "addition", answer: 14 },
    { id: 6, num1: 9, num2: 9, type: "addition", answer: 18 },
    { id: 7, num1: 7, num2: 8, type: "addition", answer: 15 },
    { id: 8, num1: 5, num2: 9, type: "addition", answer: 14 },
    { id: 9, num1: 8, num2: 6, type: "addition", answer: 14 },
    { id: 10, num1: 9, num2: 7, type: "addition", answer: 16 },
    { id: 11, num1: 12, num2: 5, type: "subtraction", answer: 7 },
    { id: 12, num1: 15, num2: 7, type: "subtraction", answer: 8 },
    { id: 13, num1: 13, num2: 6, type: "subtraction", answer: 7 },
    { id: 14, num1: 16, num2: 9, type: "subtraction", answer: 7 },
    { id: 15, num1: 14, num2: 8, type: "subtraction", answer: 6 },
    { id: 16, num1: 17, num2: 9, type: "subtraction", answer: 8 },
    { id: 17, num1: 18, num2: 9, type: "subtraction", answer: 9 },
    { id: 18, num1: 15, num2: 6, type: "subtraction", answer: 9 },
    { id: 19, num1: 14, num2: 7, type: "subtraction", answer: 7 },
    { id: 20, num1: 16, num2: 8, type: "subtraction", answer: 8 },
    { id: 21, num1: 2, num2: 2, type: "doubling", answer: 4 },
    { id: 22, num1: 3, num2: 2, type: "doubling", answer: 6 },
    { id: 23, num1: 4, num2: 2, type: "doubling", answer: 8 },
    { id: 24, num1: 5, num2: 2, type: "doubling", answer: 10 },
    { id: 25, num1: 6, num2: 2, type: "doubling", answer: 12 },
    { id: 26, num1: 7, num2: 2, type: "doubling", answer: 14 },
    { id: 27, num1: 8, num2: 2, type: "doubling", answer: 16 },
    { id: 28, num1: 9, num2: 2, type: "doubling", answer: 18 },
    { id: 29, num1: 10, num2: 2, type: "doubling", answer: 20 },
    { id: 30, num1: 1, num2: 2, type: "doubling", answer: 2 },
    { id: 31, num1: 4, num2: 2, type: "halving", answer: 2 },
    { id: 32, num1: 6, num2: 2, type: "halving", answer: 3 },
    { id: 33, num1: 8, num2: 2, type: "halving", answer: 4 },
    { id: 34, num1: 10, num2: 2, type: "halving", answer: 5 },
    { id: 35, num1: 12, num2: 2, type: "halving", answer: 6 },
    { id: 36, num1: 14, num2: 2, type: "halving", answer: 7 },
    { id: 37, num1: 16, num2: 2, type: "halving", answer: 8 },
    { id: 38, num1: 18, num2: 2, type: "halving", answer: 9 },
    { id: 39, num1: 20, num2: 2, type: "halving", answer: 10 },
    { id: 40, num1: 2, num2: 2, type: "halving", answer: 1 },
  ],
};

export const levelData = levelDataSchema.parse(levelDataRaw);
