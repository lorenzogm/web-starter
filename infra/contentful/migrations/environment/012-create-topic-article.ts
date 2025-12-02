import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info("  → Creating [Topic] Article content type...");

  try {
    const contentType = await environment.createContentTypeWithId("article", {
      name: "[Topic] 📝 Article",
      description: "Article content with rich text body and metadata",
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
          id: "excerpt",
          name: "Excerpt",
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
          id: "publishDate",
          name: "Publish Date",
          type: "Date",
          required: false,
          localized: false,
        },
        {
          id: "featuredImage",
          name: "Featured Image",
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
    logger.info("    ✓ [Topic] Article content type created and published");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("already exists")
    ) {
      logger.info("    ✓ [Topic] Article content type already exists");
    } else {
      throw error;
    }
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info("  → Rolling back [Topic] Article content type...");

  try {
    const contentType = await environment.getContentType("article");

    if (contentType.isPublished()) {
      await contentType.unpublish();
      logger.info("    ✓ [Topic] Article content type unpublished");
    }

    await contentType.delete();
    logger.info("    ✓ [Topic] Article content type deleted");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "NotFound"
    ) {
      logger.info("    ○ [Topic] Article content type not found");
    } else {
      logger.error(
        "    ✗ Failed to rollback [Topic] Article content type:",
        error
      );
      throw error;
    }
  }
}
