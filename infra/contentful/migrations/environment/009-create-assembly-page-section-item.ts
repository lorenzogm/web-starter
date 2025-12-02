import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info("  → Creating [Assembly] Page Section Item content type...");

  try {
    const contentType = await environment.createContentTypeWithId(
      "pageSectionItem",
      {
        name: "[Assembly] 🏗️ Page Section Item",
        description: "Page section for a single content entry",
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
                  "hero-large",
                  "hero-medium",
                  "product-grid-three",
                  "product-grid-four",
                  "feature-full-width",
                  "feature-split",
                  "content-centered",
                ],
              },
            ],
          },
        ],
      }
    );

    await contentType.publish();
    logger.info(
      "    ✓ [Assembly] Page Section Item content type created and published"
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
        "    ✓ [Assembly] Page Section Item content type already exists"
      );
    } else {
      throw error;
    }
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info("  → Rolling back [Assembly] Page Section Item content type...");

  try {
    const contentType = await environment.getContentType("pageSectionItem");

    if (contentType.isPublished()) {
      await contentType.unpublish();
      logger.info(
        "    ✓ [Assembly] Page Section Item content type unpublished"
      );
    }

    await contentType.delete();
    logger.info("    ✓ [Assembly] Page Section Item content type deleted");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "NotFound"
    ) {
      logger.info("    ○ [Assembly] Page Section Item content type not found");
    } else {
      logger.error(
        "    ✗ Failed to rollback [Assembly] Page Section Item content type:",
        error
      );
      throw error;
    }
  }
}
