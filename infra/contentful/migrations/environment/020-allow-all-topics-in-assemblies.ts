import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function up(environment: Environment): Promise<void> {
  logger.info(
    "  → Updating List, PageSectionItem, and PageSectionList to accept all topic types..."
  );

  try {
    // Update List to accept Article, Product, Document, and ContentItem
    const listContentType = await environment.getContentType("list");
    const listEntriesField = listContentType.fields.find(
      (field) => field.id === "entries"
    );

    if (
      listEntriesField &&
      listEntriesField.type === "Array" &&
      listEntriesField.items
    ) {
      listEntriesField.items.validations = [
        {
          linkContentType: ["article", "product", "document", "contentItem"],
        },
      ];
      const updatedList = await listContentType.update();
      await updatedList.publish();
      logger.info("    ✓ Updated List to accept all topic types");
    }

    // Update PageSectionItem content field to accept all topic types
    const pageSectionItemContentType =
      await environment.getContentType("pageSectionItem");
    const pageSectionItemContentField = pageSectionItemContentType.fields.find(
      (field) => field.id === "content"
    );

    if (
      pageSectionItemContentField &&
      pageSectionItemContentField.type === "Link"
    ) {
      pageSectionItemContentField.validations = [
        {
          linkContentType: ["article", "product", "document", "contentItem"],
        },
      ];
      const updatedPageSectionItem = await pageSectionItemContentType.update();
      await updatedPageSectionItem.publish();
      logger.info("    ✓ Updated PageSectionItem to accept all topic types");
    }

    // Update PageSectionList content field to accept List
    const pageSectionListContentType =
      await environment.getContentType("pageSectionList");
    const pageSectionListContentField = pageSectionListContentType.fields.find(
      (field) => field.id === "content"
    );

    if (
      pageSectionListContentField &&
      pageSectionListContentField.type === "Link"
    ) {
      pageSectionListContentField.validations = [
        {
          linkContentType: ["list"],
        },
      ];
      const updatedPageSectionList = await pageSectionListContentType.update();
      await updatedPageSectionList.publish();
      logger.info("    ✓ Updated PageSectionList to accept List");
    }

    logger.info("  ✓ All validations updated successfully");
  } catch (error) {
    logger.error("    ✗ Failed to update validations:", error);
    throw error;
  }
}

export async function down(environment: Environment): Promise<void> {
  logger.info(
    "  → Rolling back List, PageSectionItem, and PageSectionList validations..."
  );

  try {
    // Revert List to accept only Article and Product
    const listContentType = await environment.getContentType("list");
    const listEntriesField = listContentType.fields.find(
      (field) => field.id === "entries"
    );

    if (
      listEntriesField &&
      listEntriesField.type === "Array" &&
      listEntriesField.items
    ) {
      listEntriesField.items.validations = [
        {
          linkContentType: ["article", "product"],
        },
      ];
      const updatedList = await listContentType.update();
      await updatedList.publish();
      logger.info("    ✓ Reverted List validations");
    }

    // Revert PageSectionItem to accept only Article and Product
    const pageSectionItemContentType =
      await environment.getContentType("pageSectionItem");
    const pageSectionItemContentField = pageSectionItemContentType.fields.find(
      (field) => field.id === "content"
    );

    if (
      pageSectionItemContentField &&
      pageSectionItemContentField.type === "Link"
    ) {
      pageSectionItemContentField.validations = [
        {
          linkContentType: ["article", "product"],
        },
      ];
      const updatedPageSectionItem = await pageSectionItemContentType.update();
      await updatedPageSectionItem.publish();
      logger.info("    ✓ Reverted PageSectionItem validations");
    }

    logger.info("  ✓ Rollback completed successfully");
  } catch (error) {
    logger.error("    ✗ Failed to rollback validations:", error);
    throw error;
  }
}
