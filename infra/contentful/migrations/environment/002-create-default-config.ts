import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info("  → Creating default config entry...");

  try {
    // Check if config entry already exists
    const entries = await environment.getEntries({
      content_type: "config",
      "fields.internalName": "Default Config",
    });

    if (entries.items.length > 0) {
      logger.info("    ✓ Default config entry already exists");
      return;
    }

    // Create the config entry
    const entry = await environment.createEntry("config", {
      fields: {
        internalName: {
          en: "Default Config",
        },
        slugProductDetailPage: {
          en: "/products",
        },
        slugProductListingPage: {
          en: "/products",
        },
        slugArticleDetailPage: {
          en: "/articles",
        },
        slugArticleListingPage: {
          en: "/articles",
        },
      },
    });

    await entry.publish();

    logger.info(`    ✓ Default config entry created (ID: ${entry.sys.id})`);
  } catch (error) {
    logger.error("    ✗ Failed to create default config entry:", error);
    throw error;
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info("  → Rolling back default config entry...");

  try {
    const entries = await environment.getEntries({
      content_type: "config",
      "fields.internalName": "Default Config",
    });

    if (entries.items.length === 0) {
      logger.info("    ✓ Default config entry does not exist");
      return;
    }

    const entry = entries.items[0];

    // Unpublish if published
    if (entry.isPublished()) {
      await entry.unpublish();
      logger.info("    ✓ Default config entry unpublished");
    }

    // Delete the entry
    await entry.delete();
    logger.info(`    ✓ Default config entry deleted (ID: ${entry.sys.id})`);
  } catch (error) {
    logger.error("    ✗ Failed to rollback default config entry:", error);
    throw error;
  }
}
