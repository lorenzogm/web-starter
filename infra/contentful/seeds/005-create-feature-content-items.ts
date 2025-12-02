import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function seed(
  environment: Environment,
  context: { images: Record<string, unknown> }
) {
  logger.info("Creating feature articles...");

  const teamContent = await environment.createEntry("article", {
    fields: {
      internalName: { en: "Feature - Meet Our Team" },
      slug: { en: "meet-our-team" },
      title: {
        en: "Meet Our Team: The People Behind the Vision",
        de: "Lernen Sie unser Team kennen: Die Menschen hinter der Vision",
        fr: "Rencontrez notre équipe : Les personnes derrière la vision",
      },
      excerpt: {
        en: "Our dedicated team brings together diverse expertise to deliver exceptional results for our clients.",
        de: "Unser engagiertes Team bringt vielfältige Expertise zusammen.",
        fr: "Notre équipe dévouée réunit une expertise diversifiée.",
      },
      featuredImage: {
        en: {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: context.images.featureImage.sys.id,
          },
        },
      },
    },
  });
  await teamContent.publish();
  logger.info("  ✓ Team content item created");

  const aboutContent = await environment.createEntry("article", {
    fields: {
      internalName: { en: "Feature - About Our Company" },
      slug: { en: "about-our-company" },
      title: {
        en: "About Our Company",
        de: "Über unser Unternehmen",
        fr: "À propos de notre entreprise",
      },
      excerpt: {
        en: "Learn about our mission, values, and the journey that brought us to where we are today.",
        de: "Erfahren Sie mehr über unsere Mission, Werte und unseren Weg.",
        fr: "Découvrez notre mission, nos valeurs et le parcours qui nous a menés là où nous sommes.",
      },
      featuredImage: {
        en: {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: context.images.aboutImage.sys.id,
          },
        },
      },
    },
  });
  await aboutContent.publish();
  logger.info("  ✓ About content item created");

  return {
    contentItems: {
      teamContent,
      aboutContent,
    },
  };
}
