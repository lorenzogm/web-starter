import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info("  → Creating [Topic] Document content type...");

  try {
    const contentType = await environment.createContentTypeWithId("document", {
      name: "[Topic] 📄 Document",
      description: "Document content with file attachments and metadata",
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
          id: "file",
          name: "File",
          type: "Link",
          required: false,
          localized: false,
          linkType: "Asset",
        },
        {
          id: "publishDate",
          name: "Publish Date",
          type: "Date",
          required: false,
          localized: false,
        },
        {
          id: "thumbnail",
          name: "Thumbnail",
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
      ],
    });

    await contentType.publish();
    logger.info("    ✓ [Topic] Document content type created and published");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("already exists")
    ) {
      logger.info("    ✓ [Topic] Document content type already exists");
    } else {
      throw error;
    }
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info("  → Rolling back [Topic] Document content type...");

  try {
    const contentType = await environment.getContentType("document");

    if (contentType.isPublished()) {
      await contentType.unpublish();
      logger.info("    ✓ [Topic] Document content type unpublished");
    }

    await contentType.delete();
    logger.info("    ✓ [Topic] Document content type deleted");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "NotFound"
    ) {
      logger.info("    ○ [Topic] Document content type not found");
    } else {
      logger.error(
        "    ✗ Failed to rollback [Topic] Document content type:",
        error
      );
      throw error;
    }
  }
}
