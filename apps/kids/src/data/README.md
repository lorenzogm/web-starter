# Data Directory

This directory contains all application data in **TypeScript format with Zod schemas** for type safety and runtime validation.

## Structure

```
data/
├── courses.ts            # Available grade levels/courses with Zod schema
├── languages.ts          # Supported languages with Zod schema
├── subjects.ts           # Academic subjects with Zod schema
├── levels.ts             # Learning levels within each course and subject
├── index.ts              # Centralized exports and helper functions
├── pages/                # Page-specific text content (TypeScript)
│   ├── course-listing-page.ts
│   ├── language-listing-page.ts
│   ├── level-listing-page.ts
│   ├── subject-listing-page.ts
│   └── exercise.ts
└── course-2/             # Math exercises for 2nd grade (TypeScript)
    └── maths/
        ├── level-1-numbers-to-20.ts
        ├── level-2-complete-to-ten.ts
        ├── level-3-multiplication-tables.ts
        ├── level-4-doubling-halving.ts
        └── level-5-decomposition.ts
```

## Type Safety Features

All data files include:

1. **Zod schemas** - Runtime validation ensuring data integrity
2. **TypeScript types** - Compile-time type checking inferred from schemas
3. **Exported validated data** - All data is parsed through schemas before export

### Example Structure

```typescript
import { z } from 'zod';

// 1. Define Zod schema
const languageSchema = z.object({
	id: z.string(),
	name: z.string(),
	nativeName: z.string(),
	flag: z.string(),
	enabled: z.boolean(),
});

// 2. Infer TypeScript type
export type Language = z.infer<typeof languageSchema>;

// 3. Create and validate data
const languagesData = { ... };
export const languages = languagesSchema.parse(languagesData);
```

## Usage

### Basic Usage

```typescript
import { courses, subjects, levels } from '@/data';
import type { Course, Subject, LevelItem } from '@/data';

// Data is already validated and type-safe
const enabledCourses = courses.courses.filter((course) => course.enabled);
const mathSubject = subjects.subjects.find((s) => s.id === 'maths');
```

### Helper Functions

```typescript
import {
	getLanguage,
	getCourse,
	getSubject,
	getCourseLevels,
	getEnabledLanguages,
	getEnabledCourses,
	getEnabledSubjects,
	getEnabledLevels,
	getLevelOperations,
	getUIText,
	replaceVariables,
} from '@/data';

// Get specific items
const spanish = getLanguage('es');
const course2 = getCourse('course-2');
const mathsSubject = getSubject('maths');

// Get filtered lists
const enabledLanguages = getEnabledLanguages();
const enabledCourses = getEnabledCourses();

// Get course levels
const mathsLevels = getCourseLevels('course-2', 'maths');
const enabledMathsLevels = getEnabledLevels('course-2', 'maths');

// Load level operations dynamically
const levelData = await getLevelOperations(
	'course-2/maths/level-1-numbers-to-20.ts'
);

// Get UI text with translations
const title = getUIText('languageListing', 'title', 'es');
// "Selecciona tu idioma"

// Replace variables in text
const welcomeText = replaceVariables(getUIText('subjectListing', 'title', 'es'), {
	course: 'Segundo',
});
// "Segundo - Selecciona una materia"
```

## Data Schema Reference

### Languages

```typescript
type Language = {
	id: string; // ISO code: 'es', 'en', 'de'
	name: string; // English name
	nativeName: string; // Native name
	flag: string; // Emoji flag
	enabled: boolean;
};
```

### Courses

```typescript
type Course = {
	id: string; // 'course-1', 'course-2', etc.
	grade: number; // 1-6
	name: {
		es: string;
		en: string;
		de: string;
	};
	ageRange: string; // e.g., '7-8'
	enabled: boolean;
};
```

### Subjects

```typescript
type Subject = {
	id: string; // 'maths', 'language', etc.
	icon: string; // Emoji icon
	name: {
		es: string;
		en: string;
		de: string;
	};
	enabled: boolean;
	color: string; // Hex color code
};
```

### Levels

```typescript
type LevelItem = {
	id: string; // 'level-1', 'level-2', etc.
	order: number;
	name: {
		es: string;
		en: string;
		de: string;
	};
	description: {
		es: string;
		en: string;
		de: string;
	};
	dataFile: string; // Path to data file
	enabled: boolean;
};
```

### Operations

```typescript
type OperationType =
	| 'addition'
	| 'subtraction'
	| 'doubling'
	| 'halving'
	| 'complete'
	| 'multiplication'
	| 'decompose';

type Operation = {
	id: number;
	num1: number;
	num2: number;
	type: OperationType;
	answer: number;
};

type LevelData = {
	metadata: {
		level: string;
		title: string;
		description: string;
		totalOperations: number;
	};
	operations: Operation[];
};
```

## Adding New Data

### 1. Create TypeScript File with Zod Schema

```typescript
import { z } from 'zod';

// Define schema
const newDataSchema = z.object({
	id: z.string(),
	value: z.number(),
	// ... more fields
});

// Infer type
export type NewData = z.infer<typeof newDataSchema>;

// Create and validate data
const newDataRaw: NewData = {
	id: 'example',
	value: 42,
};

export const newData = newDataSchema.parse(newDataRaw);
```

### 2. Export from index.ts

```typescript
export { newData } from './new-data';
export type { NewData } from './new-data';
```

### 3. Use with Full Type Safety

```typescript
import { newData } from '@/data';
import type { NewData } from '@/data';

// TypeScript will catch any type errors
// Zod will catch any runtime validation errors
```

## Benefits of TypeScript + Zod

✅ **Compile-time type checking** - Catch errors before runtime
✅ **Runtime validation** - Ensure data integrity at runtime
✅ **Auto-completion** - Better IDE support
✅ **Refactoring safety** - TypeScript tracks all usages
✅ **Self-documenting** - Types serve as documentation
✅ **Schema evolution** - Easy to update and validate changes

## Current Status

### Active ✅

- **Languages**: Spanish, English, German
- **Course**: Second Grade (course-2)
- **Subject**: Mathematics
- **Math Levels**: 5 complete levels with operations

### Inactive 🔒

- **Courses**: 1st, 3rd, 4th, 5th, 6th grade
- **Subjects**: Language, Natural Science, Social Science, English, Physical Education
