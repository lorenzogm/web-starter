import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info("  → Updating [Component] List entries field validations...");

  try {
    let contentType = await environment.getContentType("list");

    if (contentType.isPublished()) {
      await contentType.unpublish();
      contentType = await environment.getContentType("list");
    }

    const entriesField = contentType.fields.find(
      (field) => field.id === "entries"
    );
    if (entriesField && entriesField.type === "Array" && entriesField.items) {
      entriesField.items.validations = [
        {
          linkContentType: ["product"],
        },
      ];
    }

    const updatedContentType = await contentType.update();
    await updatedContentType.publish();

    logger.info("    ✓ [Component] List entries field validations updated");
  } catch (error: unknown) {
    logger.error("    ✗ Failed to update [Component] List:", error);
    throw error;
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info("  → Rolling back [Component] List entries field validations...");

  try {
    const contentType = await environment.getContentType("list");

    if (contentType.isPublished()) {
      await contentType.unpublish();
    }

    const entriesField = contentType.fields.find(
      (field) => field.id === "entries"
    );
    if (entriesField && entriesField.type === "Array" && entriesField.items) {
      entriesField.items.validations = [];
    }

    const updatedContentType = await contentType.update();
    await updatedContentType.publish();

    logger.info("    ✓ [Component] List entries field validations rolled back");
  } catch (error: unknown) {
    logger.error("    ✗ Failed to rollback [Component] List:", error);
    throw error;
  }
}
