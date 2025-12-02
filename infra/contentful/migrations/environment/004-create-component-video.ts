import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info("  → Creating [Component] Video content type...");

  try {
    const contentType = await environment.createContentTypeWithId("video", {
      name: "[Component] 🎥 Video",
      description: "Video content sections for page layouts",
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
          id: "video",
          name: "Video",
          type: "Link",
          required: true,
          localized: false,
          linkType: "Asset",
          validations: [
            {
              linkMimetypeGroup: ["video"],
            },
          ],
        },
        {
          id: "caption",
          name: "Caption",
          type: "Symbol",
          required: false,
          localized: true,
        },
      ],
    });

    await contentType.publish();
    logger.info("    ✓ [Component] Video content type created and published");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("already exists")
    ) {
      logger.info("    ✓ [Component] Video content type already exists");
    } else {
      throw error;
    }
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info("  → Rolling back [Component] Video content type...");

  try {
    const contentType = await environment.getContentType("video");

    if (contentType.isPublished()) {
      await contentType.unpublish();
      logger.info("    ✓ [Component] Video content type unpublished");
    }

    await contentType.delete();
    logger.info("    ✓ [Component] Video content type deleted");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "NotFound"
    ) {
      logger.info("    ○ [Component] Video content type not found");
    } else {
      logger.error(
        "    ✗ Failed to rollback [Component] Video content type:",
        error
      );
      throw error;
    }
  }
}
