import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info("  → Creating [Assembly] Layout content type...");

  try {
    const contentType = await environment.createContentTypeWithId("layout", {
      name: "[Assembly] 🏗️ Layout",
      description:
        "Layout structure with header, footer and navigation configuration",
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
          id: "headerLogo",
          name: "Header Logo",
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
          id: "headerMicrocopies",
          name: "Header Microcopies",
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
          id: "footerMicrocopies",
          name: "Footer Microcopies",
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
      ],
    });

    await contentType.publish();
    logger.info("    ✓ [Assembly] Layout content type created and published");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("already exists")
    ) {
      logger.info("    ✓ [Assembly] Layout content type already exists");
    } else {
      throw error;
    }
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info("  → Rolling back [Assembly] Layout content type...");

  try {
    const contentType = await environment.getContentType("layout");

    if (contentType.isPublished()) {
      await contentType.unpublish();
      logger.info("    ✓ [Assembly] Layout content type unpublished");
    }

    await contentType.delete();
    logger.info("    ✓ [Assembly] Layout content type deleted");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "NotFound"
    ) {
      logger.info("    ○ [Assembly] Layout content type not found");
    } else {
      logger.error(
        "    ✗ Failed to rollback [Assembly] Layout content type:",
        error
      );
      throw error;
    }
  }
}
