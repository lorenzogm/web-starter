import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info("  → Creating [Component] List content type...");

  try {
    const contentType = await environment.createContentTypeWithId("list", {
      name: "[Component] 🛠 List",
      description: "Lists of content entries",
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
          id: "entries",
          name: "Entries",
          type: "Array",
          required: false,
          localized: false,
          items: {
            type: "Link",
            linkType: "Entry",
            validations: [],
          },
        },
      ],
    });

    await contentType.publish();
    logger.info("    ✓ [Component] List content type created and published");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("already exists")
    ) {
      logger.info("    ✓ [Component] List content type already exists");
    } else {
      throw error;
    }
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info("  → Rolling back [Component] List content type...");

  try {
    const contentType = await environment.getContentType("list");

    if (contentType.isPublished()) {
      await contentType.unpublish();
      logger.info("    ✓ [Component] List content type unpublished");
    }

    await contentType.delete();
    logger.info("    ✓ [Component] List content type deleted");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "NotFound"
    ) {
      logger.info("    ○ [Component] List content type not found");
    } else {
      logger.error(
        "    ✗ Failed to rollback [Component] List content type:",
        error
      );
      throw error;
    }
  }
}
