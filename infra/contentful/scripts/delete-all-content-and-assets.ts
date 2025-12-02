#!/usr/bin/env node
import { logger } from "@repo/logger";
import contentfulManagement from "contentful-management";
import { config } from "dotenv";

const { createClient } = contentfulManagement;

config();

const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_MANAGEMENT_TOKEN,
  CONTENTFUL_ENVIRONMENT = "development",
} = process.env;

if (!(CONTENTFUL_SPACE_ID && CONTENTFUL_MANAGEMENT_TOKEN)) {
  logger.error("Error: Missing required environment variables");
  logger.error("Required: CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN");
  logger.error('Optional: CONTENTFUL_ENVIRONMENT (defaults to "development")');
  process.exit(1);
}

async function deleteAllContentAndAssets() {
  logger.info("Starting deletion process...");
  logger.info(`Space: ${CONTENTFUL_SPACE_ID}`);
  logger.info(`Environment: ${CONTENTFUL_ENVIRONMENT}`);
  logger.info("");

  try {
    const client = createClient({
      accessToken: CONTENTFUL_MANAGEMENT_TOKEN as string,
    });

    const space = await client.getSpace(CONTENTFUL_SPACE_ID as string);
    const environment = await space.getEnvironment(CONTENTFUL_ENVIRONMENT);

    // Step 1: Get all entries
    logger.info("Fetching all entries...");
    const entries = await environment.getEntries({ limit: 1000 });
    logger.info(`Found ${entries.items.length} entries`);

    // Step 2: Unpublish and delete all entries
    logger.info("Unpublishing and deleting all entries...");
    for (const entry of entries.items) {
      try {
        if (entry.isPublished()) {
          await entry.unpublish();
          logger.info(`  ✓ Unpublished entry: ${entry.sys.id}`);
        }
        await entry.delete();
        logger.info(`  ✓ Deleted entry: ${entry.sys.id}`);
      } catch (error) {
        logger.error(`  ✗ Failed to delete entry ${entry.sys.id}:`, error);
      }
    }

    // Step 3: Get all assets
    logger.info("");
    logger.info("Fetching all assets...");
    const assets = await environment.getAssets({ limit: 1000 });
    logger.info(`Found ${assets.items.length} assets`);

    // Step 4: Unpublish and delete all assets
    logger.info("Unpublishing and deleting all assets...");
    for (const asset of assets.items) {
      try {
        if (asset.isPublished()) {
          await asset.unpublish();
          logger.info(`  ✓ Unpublished asset: ${asset.sys.id}`);
        }
        await asset.delete();
        logger.info(`  ✓ Deleted asset: ${asset.sys.id}`);
      } catch (error) {
        logger.error(`  ✗ Failed to delete asset ${asset.sys.id}:`, error);
      }
    }

    logger.info("");
    logger.info("✅ All content and assets deleted successfully!");
    logger.info("");
    logger.info("Summary:");
    logger.info(`- ${entries.items.length} entries deleted`);
    logger.info(`- ${assets.items.length} assets deleted`);
    logger.info("");

    process.exit(0);
  } catch (error) {
    logger.error("");
    logger.error("Deletion process failed:", error);
    process.exit(1);
  }
}

deleteAllContentAndAssets();
