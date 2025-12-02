import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info("  → Creating [Assembly] Config content type...");

  try {
    // Check if content type already exists
    try {
      await environment.getContentType("config");
      logger.info("    ✓ [Assembly] Config content type already exists");
      return;
    } catch {
      // Content type doesn't exist, continue with creation
    }

    // Create the config content type
    const contentType = await environment.createContentTypeWithId("config", {
      name: "[Assembly] ⚙️ Config",
      description: "Site configuration and URL routing",
      displayField: "internalName",
      fields: [
        {
          id: "internalName",
          name: "Internal Name",
          type: "Symbol",
          required: true,
          localized: false,
          validations: [{ unique: true }],
        },
        {
          id: "slugProductDetailPage",
          name: "[Slug] Product Detail Page",
          type: "Symbol",
          required: false,
          localized: false,
        },
        {
          id: "slugProductListingPage",
          name: "[Slug] Product Listing Page",
          type: "Symbol",
          required: false,
          localized: false,
        },
        {
          id: "slugArticleDetailPage",
          name: "[Slug] Article Detail Page",
          type: "Symbol",
          required: false,
          localized: false,
        },
        {
          id: "slugArticleListingPage",
          name: "[Slug] Article Listing Page",
          type: "Symbol",
          required: false,
          localized: false,
        },
      ],
    });

    await contentType.publish();

    logger.info("    ✓ [Assembly] Config content type created and published");
  } catch (error) {
    logger.error("    ✗ Failed to create Config content type:", error);
    throw error;
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info("  → Rolling back [Assembly] Config content type...");

  try {
    const contentType = await environment.getContentType("config");

    // Unpublish if published
    if (contentType.isPublished()) {
      await contentType.unpublish();
      logger.info("    ✓ [Assembly] Config content type unpublished");
    }

    // Delete the content type
    await contentType.delete();
    logger.info("    ✓ [Assembly] Config content type deleted");
  } catch (error) {
    logger.error("    ✗ Failed to rollback Config content type:", error);
    throw error;
  }
}
