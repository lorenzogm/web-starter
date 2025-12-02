import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info(
    "  → Updating [Assembly] Page Section Item content field validations..."
  );

  try {
    let contentType = await environment.getContentType("pageSectionItem");

    if (contentType.isPublished()) {
      await contentType.unpublish();
      contentType = await environment.getContentType("pageSectionItem");
    }

    const contentField = contentType.fields.find(
      (field) => field.id === "content"
    );
    if (contentField && contentField.type === "Link") {
      contentField.validations = [
        {
          linkContentType: ["article", "product"],
        },
      ];
    }

    const updatedContentType = await contentType.update();
    await updatedContentType.publish();

    logger.info(
      "    ✓ [Assembly] Page Section Item content field validations updated"
    );
  } catch (error: unknown) {
    logger.error("    ✗ Failed to update [Assembly] Page Section Item:", error);
    throw error;
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info(
    "  → Rolling back [Assembly] Page Section Item content field validations..."
  );

  try {
    const contentType = await environment.getContentType("pageSectionItem");

    if (contentType.isPublished()) {
      await contentType.unpublish();
    }

    const contentField = contentType.fields.find(
      (field) => field.id === "content"
    );
    if (contentField && contentField.type === "Link") {
      contentField.validations = [];
    }

    const updatedContentType = await contentType.update();
    await updatedContentType.publish();

    logger.info(
      "    ✓ [Assembly] Page Section Item content field validations rolled back"
    );
  } catch (error: unknown) {
    logger.error(
      "    ✗ Failed to rollback [Assembly] Page Section Item:",
      error
    );
    throw error;
  }
}
