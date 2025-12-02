# Contentful Infrastructure

This package manages Contentful content model migrations and data seeding using the Contentful Management API.

## Setup

1. Copy `.env.example` to `.env` and fill in your Contentful credentials:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
pnpm install
```

## Environment Variables

- `CONTENTFUL_SPACE_ID`: Your Contentful space ID
- `CONTENTFUL_MANAGEMENT_TOKEN`: Your Contentful Content Management API token
- `CONTENTFUL_ENVIRONMENT`: Target environment (defaults to `master`)

## Usage

### Running Migrations

Run all migrations in order (automatically discovers all migration files):

```bash
pnpm migrate
```

Migrations are executed in alphabetical order by filename timestamp.

### Creating New Migrations

Generate a new migration file with a timestamp:

```bash
pnpm migrate:create create-article-content-type
```

This creates a new file like `migrations/20241126-create-article-content-type.ts` with a template.

### Seeding Content

After running migrations to create content types, seed initial content entries:

```bash
pnpm seed
```

This creates a default config entry with initial values for all slug fields.

## Migration Files

Migration files are written in TypeScript and use the Contentful Management API directly. Each migration exports a default async function that receives an `Environment` object.

Example:

```typescript
import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export default async function migrate(environment: Environment): Promise<void> {
  logger.info("  → Creating Article content type...");

  try {
    const contentType = await environment.createContentTypeWithId("article", {
      name: "Article",
      description: "Blog article content type",
      displayField: "title",
      fields: [
        {
          id: "title",
          name: "Title",
          type: "Symbol",
          required: true,
        },
        {
          id: "content",
          name: "Content",
          type: "Text",
          required: true,
        },
      ],
    });

    await contentType.publish();
    logger.info("    ✓ Article content type created and published");
  } catch (error) {
    logger.error("    ✗ Failed to create Article content type:", error);
    throw error;
  }
}
```

## Migration Tracking

The system automatically creates a `[Assembly] Migrations` content type to track executed migrations. This helps prevent duplicate executions and provides an audit trail.

## Documentation

- [Contentful Management API](https://contentful.github.io/contentful-management.js/)
- [Content Model Documentation](../../docs/contentful/)

## TypeScript Support

This package is configured to run TypeScript migrations directly using `tsx`. No build step is required.
