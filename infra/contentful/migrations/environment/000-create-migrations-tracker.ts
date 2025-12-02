import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info("  → Creating [Assembly] Migrations content type...");

  try {
    // Check if content type already exists
    try {
      await environment.getContentType("migrations");
      logger.info("    ✓ [Assembly] Migrations content type already exists");
      return;
    } catch {
      // Content type doesn't exist, continue with creation
    }

    // Create the migrations content type
    const contentType = await environment.createContentTypeWithId(
      "migrations",
      {
        name: "[Assembly] ⚙️ Migrations",
        description: "Track executed migrations",
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
            id: "migrationId",
            name: "Migration IDs",
            type: "Array",
            required: true,
            localized: false,
            items: {
              type: "Symbol",
            },
          },
          {
            id: "executedAt",
            name: "Last Executed At",
            type: "Date",
            required: true,
            localized: false,
          },
          {
            id: "status",
            name: "Status",
            type: "Symbol",
            required: true,
            localized: false,
            validations: [
              {
                in: ["success", "failed"],
              },
            ],
          },
        ],
      }
    );

    await contentType.publish();

    logger.info(
      "    ✓ [Assembly] Migrations content type created and published"
    );
  } catch (error) {
    logger.error("    ✗ Failed to create Migrations content type:", error);
    throw error;
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info("  → Removing [Assembly] Migrations content type...");

  try {
    const contentType = await environment.getContentType("migrations");

    // Delete all entries first
    const entries = await environment.getEntries({
      content_type: "migrations",
    });

    for (const entry of entries.items) {
      if (entry.isPublished()) {
        await entry.unpublish();
      }
      await entry.delete();
      logger.info(`    ✓ Deleted migration entry: ${entry.sys.id}`);
    }

    // Unpublish content type
    if (contentType.isPublished()) {
      await contentType.unpublish();
    }

    // Delete the content type
    await contentType.delete();

    logger.info("    ✓ [Assembly] Migrations content type removed");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "NotFound"
    ) {
      logger.info("    ○ Migrations content type not found (already deleted)");
    } else {
      logger.error("    ✗ Failed to remove Migrations content type:", error);
      throw error;
    }
  }
}
