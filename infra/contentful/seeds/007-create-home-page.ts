import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function seed(
  environment: Environment,
  context: { sections: Record<string, unknown> }
) {
  logger.info("Creating home page...");

  const homePage = await environment.createEntry("page", {
    fields: {
      internalName: { en: "Home Page" },
      path: { en: "/" },
      topContentArea: {
        en: [
          {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: context.sections.heroSection.sys.id,
            },
          },
          {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: context.sections.productsSection.sys.id,
            },
          },
          {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: context.sections.newsSection.sys.id,
            },
          },
          {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: context.sections.teamSection.sys.id,
            },
          },
          {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: context.sections.aboutSection.sys.id,
            },
          },
        ],
      },
      bottomContentArea: { en: [] },
      seoTitle: {
        en: "Home | Web Starter",
        de: "Startseite | Web Starter",
        fr: "Accueil | Web Starter",
      },
      seoDescription: {
        en: "Welcome to our platform. Discover our products, services, and the team behind our success.",
        de: "Willkommen auf unserer Plattform. Entdecken Sie unsere Produkte und unser Team.",
        fr: "Bienvenue sur notre plateforme. Découvrez nos produits et notre équipe.",
      },
    },
  });
  await homePage.publish();
  logger.info("  ✓ Home page created");

  return { homePage };
}
