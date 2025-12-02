import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info("  → Creating [Component] Image content type...");

  try {
    const contentType = await environment.createContentTypeWithId("image", {
      name: "[Component] 🖼️ Image",
      description: "Image assets with metadata and accessibility features",
      displayField: "internalName",
      fields: [
        {
          id: "internalName",
          name: "Internal Name",
          type: "Text",
          required: true,
          localized: false,
        },
        {
          id: "image",
          name: "Image",
          type: "Link",
          required: true,
          localized: false,
          linkType: "Asset",
          validations: [
            {
              linkMimetypeGroup: ["image"],
            },
          ],
        },
        {
          id: "alternativeText",
          name: "Alternative Text",
          type: "Symbol",
          required: false,
          localized: true,
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
    logger.info("    ✓ [Component] Image content type created and published");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("already exists")
    ) {
      logger.info("    ✓ [Component] Image content type already exists");
    } else {
      throw error;
    }
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info("  → Rolling back [Component] Image content type...");

  try {
    const contentType = await environment.getContentType("image");

    if (contentType.isPublished()) {
      await contentType.unpublish();
      logger.info("    ✓ [Component] Image content type unpublished");
    }

    await contentType.delete();
    logger.info("    ✓ [Component] Image content type deleted");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "NotFound"
    ) {
      logger.info("    ○ [Component] Image content type not found");
    } else {
      logger.error(
        "    ✗ Failed to rollback [Component] Image content type:",
        error
      );
      throw error;
    }
  }
}
