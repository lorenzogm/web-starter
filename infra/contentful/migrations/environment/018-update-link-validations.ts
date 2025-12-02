import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info("  → Updating [Component] Link page field validations...");

  try {
    let contentType = await environment.getContentType("link");

    if (contentType.isPublished()) {
      await contentType.unpublish();
      contentType = await environment.getContentType("link");
    }

    const pageField = contentType.fields.find((field) => field.id === "page");
    if (pageField && pageField.type === "Link") {
      pageField.validations = [
        {
          linkContentType: ["page"],
        },
      ];
    }

    const updatedContentType = await contentType.update();
    await updatedContentType.publish();

    logger.info("    ✓ [Component] Link page field validations updated");
  } catch (error: unknown) {
    logger.error("    ✗ Failed to update [Component] Link:", error);
    throw error;
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info("  → Rolling back [Component] Link page field validations...");

  try {
    const contentType = await environment.getContentType("link");

    if (contentType.isPublished()) {
      await contentType.unpublish();
    }

    const pageField = contentType.fields.find((field) => field.id === "page");
    if (pageField && pageField.type === "Link") {
      pageField.validations = [];
    }

    const updatedContentType = await contentType.update();
    await updatedContentType.publish();

    logger.info("    ✓ [Component] Link page field validations rolled back");
  } catch (error: unknown) {
    logger.error("    ✗ Failed to rollback [Component] Link:", error);
    throw error;
  }
}
