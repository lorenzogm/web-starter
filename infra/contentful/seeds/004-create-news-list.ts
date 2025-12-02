import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function seed(
  environment: Environment,
  context: { newsDocuments: Record<string, unknown> }
) {
  logger.info("Creating news list...");

  const newsList = await environment.createEntry("list", {
    fields: {
      internalName: { en: "News List - Latest Updates" },
      entries: {
        en: [
          {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: context.newsDocuments.newsDoc1.sys.id,
            },
          },
          {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: context.newsDocuments.newsDoc2.sys.id,
            },
          },
          {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: context.newsDocuments.newsDoc3.sys.id,
            },
          },
        ],
      },
    },
  });
  await newsList.publish();
  logger.info("  ✓ News list created");

  return {
    lists: {
      newsList,
    },
  };
}
