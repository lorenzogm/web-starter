import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info("  → Creating [Component] Microcopy content type...");

  try {
    const contentType = await environment.createContentTypeWithId("microcopy", {
      name: "[Component] 🌐 Microcopy",
      description:
        "Translation keys and localized text content for multi-language support",
      displayField: "key",
      fields: [
        {
          id: "key",
          name: "Key",
          type: "Symbol",
          required: true,
          localized: false,
          validations: [
            {
              unique: true,
            },
          ],
        },
        {
          id: "value",
          name: "Value",
          type: "Text",
          required: true,
          localized: true,
        },
      ],
    });

    await contentType.publish();
    logger.info(
      "    ✓ [Component] Microcopy content type created and published"
    );
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("already exists")
    ) {
      logger.info("    ✓ [Component] Microcopy content type already exists");
    } else {
      throw error;
    }
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info("  → Rolling back [Component] Microcopy content type...");

  try {
    const contentType = await environment.getContentType("microcopy");

    if (contentType.isPublished()) {
      await contentType.unpublish();
      logger.info("    ✓ [Component] Microcopy content type unpublished");
    }

    await contentType.delete();
    logger.info("    ✓ [Component] Microcopy content type deleted");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "NotFound"
    ) {
      logger.info("    ○ [Component] Microcopy content type not found");
    } else {
      logger.error(
        "    ✗ Failed to rollback [Component] Microcopy content type:",
        error
      );
      throw error;
    }
  }
}
