import { logger } from "@repo/logger";
import type { Environment } from "contentful-management";

export async function seed(environment: Environment) {
  logger.info("Creating image components with placeholder assets...");

  // Helper function to create and process an asset
  const createAsset = async (title: string, imageUrl: string) => {
    const asset = await environment.createAsset({
      fields: {
        title: { en: title },
        description: { en: `${title} - Placeholder image` },
        file: {
          en: {
            contentType: "image/png",
            fileName: `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`,
            upload: imageUrl,
          },
        },
      },
    });

    // Trigger processing without waiting
    asset.processForLocale("en").catch((error: unknown) => {
      // Processing errors are expected and will be retried in the polling loop below
      logger.debug("Asset processing triggered, polling for completion", error);
    });

    // Wait for URL to be available
    const assetProcessingRetryDelayMs = 1000;
    let processed = asset;
    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) =>
        setTimeout(resolve, assetProcessingRetryDelayMs)
      );
      processed = await environment.getAsset(asset.sys.id);
      if (processed.fields.file?.en?.url) {
        await processed.publish();
        return processed;
      }
    }

    // If still not available, publish anyway
    await asset.publish();
    return asset;
  };

  // Create individual assets for each image using Unsplash
  logger.info("  Creating hero asset...");
  const heroAsset = await createAsset(
    "Hero Banner - Welcome",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=530&fit=crop&q=80"
  );

  logger.info("  Creating product 1 asset...");
  const product1Asset = await createAsset(
    "Product One Image",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&q=80"
  );

  logger.info("  Creating product 2 asset...");
  const product2Asset = await createAsset(
    "Product Two Image",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop&q=80"
  );

  logger.info("  Creating product 3 asset...");
  const product3Asset = await createAsset(
    "Product Three Image",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop&q=80"
  );

  logger.info("  Creating feature asset...");
  const featureAsset = await createAsset(
    "Feature Section Image",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&q=80"
  );

  logger.info("  Creating about asset...");
  const aboutAsset = await createAsset(
    "About Section Image",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&h=1080&fit=crop&q=80"
  );

  logger.info("  ✓ All assets created and published");

  const heroImage = await environment.createEntry("image", {
    fields: {
      internalName: { en: "Hero - Welcome Banner" },
      image: {
        en: { sys: { type: "Link", linkType: "Asset", id: heroAsset.sys.id } },
      },
      alternativeText: {
        en: "Welcome to our platform",
        de: "Willkommen auf unserer Plattform",
        fr: "Bienvenue sur notre plateforme",
      },
      caption: {
        en: "Discover what we have to offer",
        de: "Entdecken Sie, was wir zu bieten haben",
        fr: "Découvrez ce que nous avons à offrir",
      },
    },
  });
  await heroImage.publish();
  logger.info("  ✓ Hero image created");

  const product1Image = await environment.createEntry("image", {
    fields: {
      internalName: { en: "Product - Item One" },
      image: {
        en: {
          sys: { type: "Link", linkType: "Asset", id: product1Asset.sys.id },
        },
      },
      alternativeText: {
        en: "Product one showcase image",
        de: "Produktbild eins",
        fr: "Image du produit un",
      },
    },
  });
  await product1Image.publish();
  logger.info("  ✓ Product 1 image created");

  const product2Image = await environment.createEntry("image", {
    fields: {
      internalName: { en: "Product - Item Two" },
      image: {
        en: {
          sys: { type: "Link", linkType: "Asset", id: product2Asset.sys.id },
        },
      },
      alternativeText: {
        en: "Product two showcase image",
        de: "Produktbild zwei",
        fr: "Image du produit deux",
      },
    },
  });
  await product2Image.publish();
  logger.info("  ✓ Product 2 image created");

  const product3Image = await environment.createEntry("image", {
    fields: {
      internalName: { en: "Product - Item Three" },
      image: {
        en: {
          sys: { type: "Link", linkType: "Asset", id: product3Asset.sys.id },
        },
      },
      alternativeText: {
        en: "Product three showcase image",
        de: "Produktbild drei",
        fr: "Image du produit trois",
      },
    },
  });
  await product3Image.publish();
  logger.info("  ✓ Product 3 image created");

  const featureImage = await environment.createEntry("image", {
    fields: {
      internalName: { en: "Feature - Our Team" },
      image: {
        en: {
          sys: { type: "Link", linkType: "Asset", id: featureAsset.sys.id },
        },
      },
      alternativeText: {
        en: "Team collaboration in modern workspace",
        de: "Teamzusammenarbeit im modernen Arbeitsbereich",
        fr: "Collaboration d'équipe dans un espace de travail moderne",
      },
    },
  });
  await featureImage.publish();
  logger.info("  ✓ Feature image created");

  const aboutImage = await environment.createEntry("image", {
    fields: {
      internalName: { en: "Feature - About Us" },
      image: {
        en: {
          sys: { type: "Link", linkType: "Asset", id: aboutAsset.sys.id },
        },
      },
      alternativeText: {
        en: "About our company and mission",
        de: "Über unser Unternehmen und unsere Mission",
        fr: "À propos de notre entreprise et notre mission",
      },
    },
  });
  await aboutImage.publish();
  logger.info("  ✓ About image created");

  return {
    images: {
      heroImage,
      product1Image,
      product2Image,
      product3Image,
      featureImage,
      aboutImage,
    },
  };
}
