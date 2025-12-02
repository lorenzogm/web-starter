import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info("  → Creating [Topic] Product content type...");

  try {
    const contentType = await environment.createContentTypeWithId("product", {
      name: "[Topic] 🛍️ Product",
      description: "Product information with images, videos and specifications",
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
          id: "name",
          name: "Name",
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
          id: "detailedDescription",
          name: "Detailed Description",
          type: "RichText",
          required: false,
          localized: true,
        },
        {
          id: "price",
          name: "Price",
          type: "Number",
          required: false,
          localized: false,
        },
        {
          id: "inStock",
          name: "In Stock",
          type: "Boolean",
          required: false,
          localized: false,
        },
        {
          id: "images",
          name: "Images",
          type: "Array",
          required: false,
          localized: false,
          items: {
            type: "Link",
            linkType: "Entry",
            validations: [
              {
                linkContentType: ["image"],
              },
            ],
          },
        },
        {
          id: "videos",
          name: "Videos",
          type: "Array",
          required: false,
          localized: false,
          items: {
            type: "Link",
            linkType: "Entry",
            validations: [
              {
                linkContentType: ["video"],
              },
            ],
          },
        },
      ],
    });

    await contentType.publish();
    logger.info("    ✓ [Topic] Product content type created and published");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("already exists")
    ) {
      logger.info("    ✓ [Topic] Product content type already exists");
    } else {
      throw error;
    }
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info("  → Rolling back [Topic] Product content type...");

  try {
    const contentType = await environment.getContentType("product");

    if (contentType.isPublished()) {
      await contentType.unpublish();
      logger.info("    ✓ [Topic] Product content type unpublished");
    }

    await contentType.delete();
    logger.info("    ✓ [Topic] Product content type deleted");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "NotFound"
    ) {
      logger.info("    ○ [Topic] Product content type not found");
    } else {
      logger.error(
        "    ✗ Failed to rollback [Topic] Product content type:",
        error
      );
      throw error;
    }
  }
}
