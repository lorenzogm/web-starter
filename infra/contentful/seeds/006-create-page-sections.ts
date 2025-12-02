import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function seed(
  environment: Environment,
  context: {
    articles: Record<string, unknown>;
    lists: Record<string, unknown>;
    contentItems: Record<string, unknown>;
  }
) {
  logger.info("Creating page sections...");

  const heroSection = await environment.createEntry("pageSectionItem", {
    fields: {
      internalName: { en: "Home Hero - Welcome" },
      content: {
        en: {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: context.articles.product1Article.sys.id,
          },
        },
      },
      userInterface: { en: "hero-large" },
    },
  });
  await heroSection.publish();
  logger.info("  ✓ Hero section created");

  const productsSection = await environment.createEntry("pageSectionItem", {
    fields: {
      internalName: { en: "Home Products Feature" },
      content: {
        en: {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: context.articles.product1Article.sys.id,
          },
        },
      },
      userInterface: { en: "feature-full-width" },
    },
  });
  await productsSection.publish();
  logger.info("  ✓ Products section created");

  const newsSection = await environment.createEntry("pageSectionList", {
    fields: {
      internalName: { en: "Home News - Latest Updates" },
      content: {
        en: {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: context.lists.newsList.sys.id,
          },
        },
      },
      userInterface: { en: "news-list-cards" },
    },
  });
  await newsSection.publish();
  logger.info("  ✓ News section created");

  const teamSection = await environment.createEntry("pageSectionItem", {
    fields: {
      internalName: { en: "Home Team - Meet Our Team" },
      content: {
        en: {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: context.contentItems.teamContent.sys.id,
          },
        },
      },
      userInterface: { en: "feature-full-width" },
    },
  });
  await teamSection.publish();
  logger.info("  ✓ Team section created");

  const aboutSection = await environment.createEntry("pageSectionItem", {
    fields: {
      internalName: { en: "Home About - Our Company" },
      content: {
        en: {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: context.contentItems.aboutContent.sys.id,
          },
        },
      },
      userInterface: { en: "feature-split" },
    },
  });
  await aboutSection.publish();
  logger.info("  ✓ About section created");

  return {
    sections: {
      heroSection,
      productsSection,
      newsSection,
      teamSection,
      aboutSection,
    },
  };
}
