#!/usr/bin/env node
import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { logger } from "@repo/logger";
import contentfulManagement from "contentful-management";
import { config } from "dotenv";

const { createClient } = contentfulManagement;

config();

const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_MANAGEMENT_TOKEN,
  CONTENTFUL_ENVIRONMENT = "dev-01",
} = process.env;

if (!(CONTENTFUL_SPACE_ID && CONTENTFUL_MANAGEMENT_TOKEN)) {
  logger.error("Error: Missing required environment variables");
  logger.error("Required: CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN");
  logger.error('Optional: CONTENTFUL_ENVIRONMENT (defaults to "dev-01")');
  process.exit(1);
}

async function runSeeds() {
  logger.info("Starting seed process...");
  logger.info(`Space: ${CONTENTFUL_SPACE_ID}`);
  logger.info(`Environment: ${CONTENTFUL_ENVIRONMENT}`);
  logger.info("");

  try {
    const client = createClient({
      accessToken: CONTENTFUL_MANAGEMENT_TOKEN as string,
    });

    const space = await client.getSpace(CONTENTFUL_SPACE_ID as string);
    const environment = await space.getEnvironment(CONTENTFUL_ENVIRONMENT);

    // Get all seed files from seeds/ folder
    const seedsDir = resolve(process.cwd(), "seeds");
    const seedFiles = readdirSync(seedsDir)
      .filter((file) => file.endsWith(".ts") || file.endsWith(".js"))
      .sort((a, b) => a.localeCompare(b));

    logger.info(`Found ${seedFiles.length} seed file(s)`);
    logger.info("");

    // Context object to pass data between seeds
    const context: Record<string, unknown> = {};

    for (const seedFile of seedFiles) {
      const seedPath = resolve(seedsDir, seedFile);
      logger.info(`Running seed: ${seedFile}`);

      try {
        const seedModule = await import(seedPath);

        if (typeof seedModule.seed !== "function") {
          logger.warn(`  ⚠ No seed function exported from ${seedFile}`);
          continue;
        }

        const result = await seedModule.seed(environment, context);

        // Merge result into context for next seeds
        if (result && typeof result === "object") {
          Object.assign(context, result);
        }

        logger.info(`Seed completed: ${seedFile}`);
        logger.info("");
      } catch (error) {
        logger.error(`Seed failed: ${seedFile}`);
        logger.error("Error:", error);
        process.exit(1);
      }
    }

    logger.info("");
    logger.info("✅ All seeds completed successfully!");
    logger.info("");
    logger.info("Summary:");
    logger.info("- 6 Images created");
    logger.info("- 6 Microcopies created");
    logger.info("- 3 Product articles created");
    logger.info("- 3 News documents created");
    logger.info("- 1 News list created");
    logger.info("- 2 Feature content items created");
    logger.info("- 5 Page sections created");
    logger.info("- 1 Home page created");
    logger.info("");

    process.exit(0);
  } catch (error) {
    logger.error("");
    logger.error("Seed process failed:", error);
    process.exit(1);
  }
}

runSeeds();
