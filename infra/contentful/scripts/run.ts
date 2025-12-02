#!/usr/bin/env node
import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { logger } from "@repo/logger";
import type { Environment, Space } from "contentful-management";
import contentfulManagement from "contentful-management";
import { config } from "dotenv";

const { createClient } = contentfulManagement;

config();

const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_MANAGEMENT_TOKEN,
  CONTENTFUL_ENVIRONMENT = "master",
} = process.env;

if (!(CONTENTFUL_SPACE_ID && CONTENTFUL_MANAGEMENT_TOKEN)) {
  logger.error("Error: Missing required environment variables");
  logger.error("Required: CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN");
  logger.error('Optional: CONTENTFUL_ENVIRONMENT (defaults to "master")');
  process.exit(1);
}

type EnvironmentMigrationModule = {
  up: (environment: Environment) => Promise<void>;
  down?: (environment: Environment) => Promise<void>;
};

type SpaceMigrationModule = {
  up: (space: Space) => Promise<void>;
  down?: (space: Space) => Promise<void>;
};

const MIGRATION_ENTRY_ID = "migration-tracker";

async function getExecutedMigrations(
  environment: Environment
): Promise<string[]> {
  try {
    const entries = await environment.getEntries({
      content_type: "migrations",
      "sys.id": MIGRATION_ENTRY_ID,
    });

    if (entries.items.length > 0) {
      const entry = entries.items[0];
      const migrationIds = entry.fields.migrationId?.en;
      return Array.isArray(migrationIds) ? migrationIds : [];
    }
    return [];
  } catch {
    return [];
  }
}

async function updateMigrationTracker(
  environment: Environment,
  migrationId: string,
  operation: "add" | "remove"
): Promise<void> {
  try {
    let entry:
      | Awaited<ReturnType<typeof environment.getEntries>>["items"][0]
      | undefined;
    const entries = await environment.getEntries({
      content_type: "migrations",
      "sys.id": MIGRATION_ENTRY_ID,
    });

    const executedMigrations = await getExecutedMigrations(environment);

    if (entries.items.length > 0) {
      entry = entries.items[0];
    } else {
      // Initialize with bootstrap migrations (000 and 001) for visibility
      entry = await environment.createEntryWithId(
        "migrations",
        MIGRATION_ENTRY_ID,
        {
          fields: {
            internalName: { en: "Migration Tracker" },
            migrationId: {
              en: [
                "000-setup-locales.ts",
                "001-setup-environments.ts",
                "000-create-migrations-tracker.ts",
              ],
            },
            executedAt: { en: new Date().toISOString() },
            status: { en: "success" },
          },
        }
      );
    }

    let updatedMigrations: string[];
    if (operation === "add") {
      updatedMigrations = [...executedMigrations, migrationId];
    } else {
      updatedMigrations = executedMigrations.filter((id) => id !== migrationId);
    }

    // If all migrations are rolled back, delete the tracker entry
    if (updatedMigrations.length === 0) {
      if (entry.isPublished()) {
        await entry.unpublish();
      }
      await entry.delete();
      logger.info(
        "  ✓ Migration tracker entry deleted (all migrations rolled back)"
      );
      return;
    }

    entry.fields.migrationId = { en: updatedMigrations };
    entry.fields.executedAt = { en: new Date().toISOString() };

    const updatedEntry = await entry.update();
    await updatedEntry.publish();
  } catch (error) {
    logger.warn("Failed to update migration tracker:", error);
  }
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Complex orchestration of migration execution with rollback, filtering, and error handling
async function runMigrations() {
  const isRollback = process.argv.includes("--rollback");
  const migrationArg = process.argv.find((arg) =>
    arg.startsWith("--migration=")
  );
  const specificMigration = migrationArg?.split("=")[1];

  const action = isRollback ? "Rolling back" : "Running";

  logger.info(`${action} migrations...`);
  logger.info(`Space: ${CONTENTFUL_SPACE_ID}`);
  logger.info(`Environment: ${CONTENTFUL_ENVIRONMENT}`);
  if (specificMigration) {
    logger.info(`Target: ${specificMigration}`);
  }
  logger.info("");

  try {
    const client = createClient({
      accessToken: CONTENTFUL_MANAGEMENT_TOKEN as string,
    });

    const space = await client.getSpace(CONTENTFUL_SPACE_ID as string);

    // Get all migration files from space/ and environment/ folders
    const migrationsBaseDir = resolve(process.cwd(), "migrations");
    const spaceDir = resolve(migrationsBaseDir, "space");
    const environmentDir = resolve(migrationsBaseDir, "environment");

    // Get space-level migrations
    const spaceMigrations = readdirSync(spaceDir)
      .filter((file) => file.endsWith(".ts") || file.endsWith(".js"))
      .map((file) => ({ file, folder: "space" }))
      .sort((a, b) => a.file.localeCompare(b.file));

    // Get environment-level migrations
    const environmentMigrations = readdirSync(environmentDir)
      .filter((file) => file.endsWith(".ts") || file.endsWith(".js"))
      .map((file) => ({ file, folder: "environment" }))
      .sort((a, b) => a.file.localeCompare(b.file));

    // Combine migrations: space migrations first, then environment migrations
    const allMigrations = [...spaceMigrations, ...environmentMigrations];

    // Filter migrations if specific migration requested
    let filteredMigrations = allMigrations;
    if (specificMigration) {
      filteredMigrations = allMigrations.filter(
        (m) => m.file === specificMigration
      );
      if (filteredMigrations.length === 0) {
        logger.error(`Migration not found: ${specificMigration}`);
        logger.info("\nAvailable migrations:");
        for (const m of allMigrations) {
          logger.info(`  - ${m.file} (${m.folder})`);
        }
        process.exit(1);
      }
    }

    logger.info(`Found ${filteredMigrations.length} migration file(s)`);
    logger.info("");

    // Helper function to resolve environment (with alias support)
    const resolveEnvironment = async () => {
      try {
        // First try to resolve as an alias
        let environmentId = CONTENTFUL_ENVIRONMENT;
        try {
          const alias = await space.getEnvironmentAlias(CONTENTFUL_ENVIRONMENT);
          environmentId = alias.environment.sys.id;
          logger.info(
            `Resolved alias '${CONTENTFUL_ENVIRONMENT}' to environment '${environmentId}'`
          );
        } catch (aliasError: unknown) {
          // Not an alias, use as-is
          if (
            aliasError &&
            typeof aliasError === "object" &&
            "name" in aliasError &&
            aliasError.name !== "NotFound"
          ) {
            throw aliasError;
          }
        }

        return await space.getEnvironment(environmentId);
      } catch (error: unknown) {
        if (
          error &&
          typeof error === "object" &&
          "name" in error &&
          error.name === "NotFound"
        ) {
          logger.warn(
            `Environment '${CONTENTFUL_ENVIRONMENT}' not found, using 'master'`
          );
          return await space.getEnvironment("master");
        }
        throw error;
      }
    };

    // Check if we have space-level migrations
    const hasSpaceLevelMigrations = filteredMigrations.some(
      (m) => m.folder === "space"
    );

    // Resolve environment - will be used after space-level migrations are done
    let environment = await space.getEnvironment("master"); // Start with master for space-level migrations

    // Get executed migrations from the target environment
    // Only check tracker if we don't have space migrations pending (since tracker might not exist yet)
    let executedMigrations: string[] = [];

    if (!hasSpaceLevelMigrations || isRollback) {
      // Forward: No space migrations pending, safe to check tracker
      // Rollback: Always check tracker to see what to rollback
      environment = await resolveEnvironment();
      executedMigrations = await getExecutedMigrations(environment);
    }

    if (isRollback) {
      // Rollback: run migrations in reverse order
      let migrationsToRollback = filteredMigrations
        .filter((m) => executedMigrations.includes(m.file))
        .reverse();

      // If no migrations tracked and no specific migration requested, rollback all migrations
      if (migrationsToRollback.length === 0 && !specificMigration) {
        logger.info(
          "No migration tracker found or no migrations tracked, rolling back all migrations..."
        );
        migrationsToRollback = [...allMigrations].reverse();
      } else if (migrationsToRollback.length === 0) {
        logger.info("No migrations to rollback");
        process.exit(0);
      } else {
        // Add space-level migrations if we're rolling back environment migrations
        // Space migrations aren't tracked but need to be rolled back last
        const hasEnvironmentMigrations = migrationsToRollback.some(
          (m) => m.folder === "environment"
        );
        if (hasEnvironmentMigrations) {
          const spaceMigrationsReversed = spaceMigrations.reverse();
          migrationsToRollback = [
            ...migrationsToRollback,
            ...spaceMigrationsReversed,
          ];
        }
      }

      for (const migration of migrationsToRollback) {
        const migrationPath = resolve(
          migrationsBaseDir,
          migration.folder,
          migration.file
        );
        logger.info(
          `Rolling back migration: ${migration.file} (${migration.folder})`
        );

        try {
          if (migration.folder === "space") {
            // Space migrations run against master
            const migrationModule = (await import(
              migrationPath
            )) as SpaceMigrationModule;
            if (migrationModule.down) {
              await migrationModule.down(space);
            } else {
              logger.warn(
                `  ⚠ No rollback function defined for ${migration.file}`
              );
              continue;
            }
          } else {
            // Environment migrations use CONTENTFUL_ENVIRONMENT
            const migrationModule = (await import(
              migrationPath
            )) as EnvironmentMigrationModule;
            if (migrationModule.down) {
              await migrationModule.down(environment);
            } else {
              logger.warn(
                `  ⚠ No rollback function defined for ${migration.file}`
              );
              continue;
            }
          }

          // Don't remove bootstrap migrations from tracker
          const isBootstrapMigration =
            migration.file.startsWith("000-") ||
            migration.file.startsWith("001-") ||
            migration.file === "002-create-migrations-content-type.ts";
          if (!isBootstrapMigration) {
            await updateMigrationTracker(environment, migration.file, "remove");
          }
          logger.info(`Rollback completed: ${migration.file}`);
          logger.info("");
        } catch (error) {
          logger.error(`Rollback failed: ${migration.file}`);
          logger.error("Error:", error);
          process.exit(1);
        }
      }
    } else {
      // Run: execute migrations that haven't been run yet
      const migrationsToRun = filteredMigrations.filter(
        (m) => !executedMigrations.includes(m.file)
      );

      if (migrationsToRun.length === 0) {
        if (specificMigration) {
          logger.info(`Migration already executed: ${specificMigration}`);
        } else {
          logger.info("All migrations are up to date");
        }
        process.exit(0);
      }

      let resolvedEnvironmentForTracking = false;

      for (const migration of migrationsToRun) {
        const migrationPath = resolve(
          migrationsBaseDir,
          migration.folder,
          migration.file
        );
        logger.info(
          `Running migration: ${migration.file} (${migration.folder})`
        );

        try {
          if (migration.folder === "space") {
            // Space migrations run against master
            const migrationModule = (await import(
              migrationPath
            )) as SpaceMigrationModule;
            await migrationModule.up(space);
          } else {
            // Environment migrations use CONTENTFUL_ENVIRONMENT
            // Resolve environment now if we haven't already (after space-level migrations have run)
            if (!resolvedEnvironmentForTracking) {
              environment = await resolveEnvironment();

              // Check executed migrations in the target environment
              if (!migration.file.startsWith("002-")) {
                executedMigrations = await getExecutedMigrations(environment);
                // Skip this migration if it's already executed in the target environment
                if (executedMigrations.includes(migration.file)) {
                  logger.info(
                    `Migration already executed in target environment: ${migration.file}`
                  );
                  logger.info("");
                  continue;
                }
              }

              resolvedEnvironmentForTracking = true;
            }

            const migrationModule = (await import(
              migrationPath
            )) as EnvironmentMigrationModule;
            await migrationModule.up(environment);
          }

          // Track all migrations in the tracker
          await updateMigrationTracker(environment, migration.file, "add");

          logger.info(`Migration completed: ${migration.file}`);
          logger.info("");
        } catch (error) {
          logger.error(`Migration failed: ${migration.file}`);
          logger.error("Error:", error);
          process.exit(1);
        }
      }
    }

    logger.info("");
    logger.info(
      `All migrations ${isRollback ? "rolled back" : "completed"} successfully`
    );
    process.exit(0);
  } catch (error) {
    logger.error("");
    logger.error("Migration process failed:", error);
    process.exit(1);
  }
}

runMigrations();
