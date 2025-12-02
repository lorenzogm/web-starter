import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info("  → Creating [Component] Link content type...");

  try {
    const contentType = await environment.createContentTypeWithId("link", {
      name: "[Component] 🔗 Link",
      description: "Links and navigation items for buttons and CTAs",
      displayField: "internalName",
      fields: [
        {
          id: "internalName",
          name: "Internal Name",
          type: "Symbol",
          required: true,
          localized: false,
        },
        {
          id: "text",
          name: "Text",
          type: "Symbol",
          required: true,
          localized: true,
        },
        {
          id: "page",
          name: "Page",
          type: "Link",
          required: false,
          localized: false,
          linkType: "Entry",
          validations: [],
        },
        {
          id: "url",
          name: "URL",
          type: "Symbol",
          required: false,
          localized: false,
        },
      ],
    });

    await contentType.publish();
    logger.info("    ✓ [Component] Link content type created and published");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("already exists")
    ) {
      logger.info("    ✓ [Component] Link content type already exists");
    } else {
      throw error;
    }
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info("  → Rolling back [Component] Link content type...");

  try {
    const contentType = await environment.getContentType("link");

    if (contentType.isPublished()) {
      await contentType.unpublish();
      logger.info("    ✓ [Component] Link content type unpublished");
    }

    await contentType.delete();
    logger.info("    ✓ [Component] Link content type deleted");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "NotFound"
    ) {
      logger.info("    ○ [Component] Link content type not found");
    } else {
      logger.error(
        "    ✗ Failed to rollback [Component] Link content type:",
        error
      );
      throw error;
    }
  }
}
