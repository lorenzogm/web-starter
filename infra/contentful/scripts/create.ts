#!/usr/bin/env node
import { readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const migrationName = process.argv[2];

if (!migrationName) {
  console.error("Error: Please specify a migration name");
  console.error("Usage: pnpm migrate:create <migration-name>");
  console.error("Example: pnpm migrate:create create-article-content-type");
  process.exit(1);
}

// Get the next sequential number
const migrationsDir = resolve(process.cwd(), "migrations");
const existingFiles = readdirSync(migrationsDir)
  .filter((file) => file.endsWith(".ts") || file.endsWith(".js"))
  .sort();

let nextNumber = 0;
if (existingFiles.length > 0) {
  const lastFile = existingFiles.at(-1);
  if (lastFile) {
    const match = lastFile.match(/^(\d+)-/);
    if (match) {
      nextNumber = Number.parseInt(match[1], 10) + 1;
    }
  }
}

const MIGRATION_NUMBER_PADDING = 3;
const sequentialNumber = String(nextNumber).padStart(
  MIGRATION_NUMBER_PADDING,
  "0"
);
const fileName = `${sequentialNumber}-${migrationName}.ts`;
const filePath = resolve(process.cwd(), "migrations", fileName);

const template = `import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
	logger.info("  → Running migration...");

	try {
		// Your migration code here
		// Example:
		// const contentType = await environment.createContentType({
		//   sys: { id: "yourContentType" },
		//   name: "Your Content Type",
		//   displayField: "title",
		//   fields: [
		//     {
		//       id: "title",
		//       name: "Title",
		//       type: "Symbol",
		//       required: true,
		//     },
		//   ],
		// });
		// await contentType.publish();

		logger.info("    ✓ Migration completed");
	} catch (error) {
		logger.error("    ✗ Migration failed:", error);
		throw error;
	}
}

export async function down(environment: Environment): Promise<void> {
	logger.info("  → Rolling back migration...");

	try {
		// Your rollback code here
		// Example:
		// const contentType = await environment.getContentType("yourContentType");
		// if (contentType.isPublished()) {
		//   await contentType.unpublish();
		// }
		// await contentType.delete();

		logger.info("    ✓ Rollback completed");
	} catch (error) {
		logger.error("    ✗ Rollback failed:", error);
		throw error;
	}
}
`;

try {
  writeFileSync(filePath, template, "utf-8");
  console.log(`Migration file created: ${fileName}`);
  console.log(`Location: ${filePath}`);
} catch (error) {
  console.error("Error creating migration file:", error);
  process.exit(1);
}
