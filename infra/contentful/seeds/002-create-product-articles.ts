import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function seed(
  environment: Environment,
  context: { images: Record<string, unknown> }
) {
  logger.info("Creating product articles...");

  const product1Article = await environment.createEntry("article", {
    fields: {
      internalName: { en: "Product Article - Product One" },
      slug: { en: "product-one" },
      title: {
        en: "Product One",
        de: "Produkt Eins",
        fr: "Produit Un",
      },
      excerpt: {
        en: "Our flagship product designed with quality and reliability in mind, perfect for everyday use.",
        de: "Unser Flaggschiffprodukt, entwickelt mit Qualität und Zuverlässigkeit.",
        fr: "Notre produit phare conçu avec qualité et fiabilité à l'esprit.",
      },
      featuredImage: {
        en: {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: context.images.product1Image.sys.id,
          },
        },
      },
    },
  });
  await product1Article.publish();
  logger.info("  ✓ Product One article created");

  const product2Article = await environment.createEntry("article", {
    fields: {
      internalName: { en: "Product Article - Product Two" },
      slug: { en: "product-two" },
      title: {
        en: "Product Two",
        de: "Produkt Zwei",
        fr: "Produit Deux",
      },
      excerpt: {
        en: "A versatile solution that adapts to your needs, offering seamless integration and great value.",
        de: "Eine vielseitige Lösung, die sich an Ihre Bedürfnisse anpasst.",
        fr: "Une solution polyvalente qui s'adapte à vos besoins.",
      },
      featuredImage: {
        en: {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: context.images.product2Image.sys.id,
          },
        },
      },
    },
  });
  await product2Article.publish();
  logger.info("  ✓ Product Two article created");

  const product3Article = await environment.createEntry("article", {
    fields: {
      internalName: { en: "Product Article - Product Three" },
      slug: { en: "product-three" },
      title: {
        en: "Product Three",
        de: "Produkt Drei",
        fr: "Produit Trois",
      },
      excerpt: {
        en: "Premium quality meets innovative design. Experience the difference with our latest offering.",
        de: "Premium-Qualität trifft auf innovatives Design.",
        fr: "La qualité premium rencontre le design innovant.",
      },
      featuredImage: {
        en: {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: context.images.product3Image.sys.id,
          },
        },
      },
    },
  });
  await product3Article.publish();
  logger.info("  ✓ Product Three article created");

  return {
    articles: {
      product1Article,
      product2Article,
      product3Article,
    },
  };
}
