import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info("  → Creating [Assembly] Page Section List content type...");

  try {
    const contentType = await environment.createContentTypeWithId(
      "pageSectionList",
      {
        name: "[Assembly] 🏗️ Page Section List",
        description: "Page section for a list of content entries",
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
            id: "content",
            name: "Content",
            type: "Link",
            required: false,
            localized: false,
            linkType: "Entry",
            validations: [],
          },
          {
            id: "userInterface",
            name: "User Interface",
            type: "Symbol",
            required: false,
            localized: false,
            validations: [
              {
                in: [
                  "news-list-cards",
                  "news-list-rows",
                  "product-list-grid",
                  "product-list-carousel",
                  "content-list-vertical",
                ],
              },
            ],
          },
        ],
      }
    );

    await contentType.publish();
    logger.info(
      "    ✓ [Assembly] Page Section List content type created and published"
    );
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("already exists")
    ) {
      logger.info(
        "    ✓ [Assembly] Page Section List content type already exists"
      );
    } else {
      throw error;
    }
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info("  → Rolling back [Assembly] Page Section List content type...");

  try {
    const contentType = await environment.getContentType("pageSectionList");

    if (contentType.isPublished()) {
      await contentType.unpublish();
      logger.info(
        "    ✓ [Assembly] Page Section List content type unpublished"
      );
    }

    await contentType.delete();
    logger.info("    ✓ [Assembly] Page Section List content type deleted");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "NotFound"
    ) {
      logger.info("    ○ [Assembly] Page Section List content type not found");
    } else {
      logger.error(
        "    ✗ Failed to rollback [Assembly] Page Section List content type:",
        error
      );
      throw error;
    }
  }
}
