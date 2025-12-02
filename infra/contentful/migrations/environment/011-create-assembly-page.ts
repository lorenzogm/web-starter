import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info("  → Creating [Assembly] Page content type...");

  try {
    const contentType = await environment.createContentTypeWithId("page", {
      name: "[Assembly] 🏗️ Page",
      description: "Page assembly with sections, SEO and metadata",
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
          id: "path",
          name: "Path",
          type: "Symbol",
          required: true,
          localized: false,
        },
        {
          id: "topContentArea",
          name: "Top Content Area",
          type: "Array",
          required: false,
          localized: false,
          items: {
            type: "Link",
            linkType: "Entry",
            validations: [
              {
                linkContentType: ["pageSectionItem", "pageSectionList"],
              },
            ],
          },
        },
        {
          id: "bottomContentArea",
          name: "Bottom Content Area",
          type: "Array",
          required: false,
          localized: false,
          items: {
            type: "Link",
            linkType: "Entry",
            validations: [
              {
                linkContentType: ["pageSectionItem", "pageSectionList"],
              },
            ],
          },
        },
        {
          id: "microcopies",
          name: "Microcopies",
          type: "Array",
          required: false,
          localized: false,
          items: {
            type: "Link",
            linkType: "Entry",
            validations: [
              {
                linkContentType: ["microcopy"],
              },
            ],
          },
        },
        {
          id: "seoTitle",
          name: "SEO Title",
          type: "Symbol",
          required: false,
          localized: true,
        },
        {
          id: "seoDescription",
          name: "SEO Description",
          type: "Symbol",
          required: false,
          localized: true,
        },
      ],
    });

    await contentType.publish();
    logger.info("    ✓ [Assembly] Page content type created and published");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("already exists")
    ) {
      logger.info("    ✓ [Assembly] Page content type already exists");
    } else {
      throw error;
    }
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info("  → Rolling back [Assembly] Page content type...");

  try {
    const contentType = await environment.getContentType("page");

    if (contentType.isPublished()) {
      await contentType.unpublish();
      logger.info("    ✓ [Assembly] Page content type unpublished");
    }

    await contentType.delete();
    logger.info("    ✓ [Assembly] Page content type deleted");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "NotFound"
    ) {
      logger.info("    ○ [Assembly] Page content type not found");
    } else {
      logger.error(
        "    ✗ Failed to rollback [Assembly] Page content type:",
        error
      );
      throw error;
    }
  }
}
