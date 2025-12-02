import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function seed(environment: Environment) {
  logger.info("Creating news products...");

  const newsDoc1 = await environment.createEntry("product", {
    fields: {
      internalName: { en: "News - Platform Launch Announcement" },
      slug: { en: "platform-launch-announcement" },
      name: {
        en: "Exciting New Platform Launch Announcement",
        de: "Spannende neue Plattform-Ankündigung",
        fr: "Annonce passionnante du lancement de la nouvelle plateforme",
      },
      description: {
        en: "November 20, 2025",
        de: "20. November 2025",
        fr: "20 novembre 2025",
      },
    },
  });
  await newsDoc1.publish();
  logger.info("  ✓ News document 1 created");

  const newsDoc2 = await environment.createEntry("product", {
    fields: {
      internalName: { en: "News - Industry Trends Report" },
      slug: { en: "industry-trends-report-2025" },
      name: {
        en: "Industry Trends Report: What to Expect in 2025",
        de: "Branchentrends-Bericht: Was uns 2025 erwartet",
        fr: "Rapport sur les tendances de l'industrie : à quoi s'attendre en 2025",
      },
      description: {
        en: "September 29, 2025",
        de: "29. September 2025",
        fr: "29 septembre 2025",
      },
    },
  });
  await newsDoc2.publish();
  logger.info("  ✓ News document 2 created");

  const newsDoc3 = await environment.createEntry("product", {
    fields: {
      internalName: { en: "News - Community Milestone" },
      slug: { en: "community-milestone-celebration" },
      name: {
        en: "Celebrating a Major Community Milestone",
        de: "Feier eines wichtigen Community-Meilensteins",
        fr: "Célébration d'une étape importante de la communauté",
      },
      description: {
        en: "August 19, 2025",
        de: "19. August 2025",
        fr: "19 août 2025",
      },
    },
  });
  await newsDoc3.publish();
  logger.info("  ✓ News document 3 created");

  return {
    newsDocuments: {
      newsDoc1,
      newsDoc2,
      newsDoc3,
    },
  };
}
