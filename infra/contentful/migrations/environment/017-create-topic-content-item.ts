import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info("  → Creating [Topic] Content Item content type...");

  try {
    const contentType = await environment.createContentTypeWithId(
      "contentItem",
      {
        name: "[Topic] 📦 Content Item",
        description: "Generic content item for various use cases",
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
            id: "slug",
            name: "Slug",
            type: "Symbol",
            required: true,
            localized: false,
          },
          {
            id: "title",
            name: "Title",
            type: "Symbol",
            required: true,
            localized: true,
          },
          {
            id: "description",
            name: "Description",
            type: "Text",
            required: false,
            localized: true,
          },
          {
            id: "body",
            name: "Body",
            type: "RichText",
            required: false,
            localized: true,
          },
          {
            id: "image",
            name: "Image",
            type: "Link",
            required: false,
            localized: false,
            linkType: "Entry",
            validations: [
              {
                linkContentType: ["image"],
              },
            ],
          },
          {
            id: "link",
            name: "Link",
            type: "Link",
            required: false,
            localized: false,
            linkType: "Entry",
            validations: [
              {
                linkContentType: ["link"],
              },
            ],
          },
        ],
      }
    );

    await contentType.publish();
    logger.info(
      "    ✓ [Topic] Content Item content type created and published"
    );
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("already exists")
    ) {
      logger.info("    ✓ [Topic] Content Item content type already exists");
    } else {
      throw error;
    }
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info("  → Rolling back [Topic] Content Item content type...");

  try {
    const contentType = await environment.getContentType("contentItem");

    if (contentType.isPublished()) {
      await contentType.unpublish();
      logger.info("    ✓ [Topic] Content Item content type unpublished");
    }

    await contentType.delete();
    logger.info("    ✓ [Topic] Content Item content type deleted");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "NotFound"
    ) {
      logger.info("    ○ [Topic] Content Item content type not found");
    } else {
      logger.error(
        "    ✗ Failed to rollback [Topic] Content Item content type:",
        error
      );
      throw error;
    }
  }
}
