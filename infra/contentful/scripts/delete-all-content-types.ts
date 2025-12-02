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

async function deleteAllContentTypes() {
  logger.info("Starting content type deletion process...");
  logger.info(`Space: ${CONTENTFUL_SPACE_ID}`);
  logger.info(`Environment: ${CONTENTFUL_ENVIRONMENT}`);
  logger.info("");

  try {
    const client = createClient({
      accessToken: CONTENTFUL_MANAGEMENT_TOKEN as string,
    });

    const space = await client.getSpace(CONTENTFUL_SPACE_ID as string);
    const environment = await space.getEnvironment(CONTENTFUL_ENVIRONMENT);

    // Get all content types
    logger.info("Fetching all content types...");
    const contentTypes = await environment.getContentTypes({ limit: 1000 });
    logger.info(`Found ${contentTypes.items.length} content types`);

    // Unpublish and delete all content types
    logger.info("Unpublishing and deleting all content types...");
    for (const contentType of contentTypes.items) {
      try {
        if (contentType.isPublished()) {
          await contentType.unpublish();
          logger.info(`  ✓ Unpublished content type: ${contentType.sys.id}`);
        }
        await contentType.delete();
        logger.info(`  ✓ Deleted content type: ${contentType.sys.id}`);
      } catch (error) {
        logger.error(
          `  ✗ Failed to delete content type ${contentType.sys.id}:`,
          error
        );
      }
    }

    logger.info("");
    logger.info("✅ All content types deleted successfully!");
    logger.info("");
    logger.info("Summary:");
    logger.info(`- ${contentTypes.items.length} content types deleted`);
    logger.info("");

    process.exit(0);
  } catch (error) {
    logger.error("");
    logger.error("Deletion process failed:", error);
    process.exit(1);
  }
}

deleteAllContentTypes();
