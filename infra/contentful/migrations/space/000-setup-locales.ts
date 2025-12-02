import { logger } from "@repo/logger";
import type { Space } from "contentful-management";

export async function up(space: Space): Promise<void> {
  logger.info("  → Setting up locales...");

  try {
    // Get the master environment to work with locales (locales are at space level)
    const environment = await space.getEnvironment("master");

    // Get all existing locales
    const locales = await environment.getLocales();
    const existingLocaleCodes = locales.items.map((locale) => locale.code);

    // Create English (en) locale if it doesn't exist
    if (existingLocaleCodes.includes("en")) {
      logger.info("    ✓ English (en) locale already exists");
    } else {
      logger.info("    → Creating English (en) locale...");
      await environment.createLocale({
        name: "English",
        code: "en",
        fallbackCode: "en-US",
        optional: false,
      });
      logger.info("    ✓ English (en) locale created");
    }

    // Create German locale if it doesn't exist
    if (existingLocaleCodes.includes("de")) {
      logger.info("    ✓ German (de) locale already exists");
    } else {
      logger.info("    → Creating German (de) locale...");
      await environment.createLocale({
        name: "German",
        code: "de",
        fallbackCode: "en",
        optional: false,
      });
      logger.info("    ✓ German (de) locale created");
    }

    // Create French locale if it doesn't exist
    if (existingLocaleCodes.includes("fr")) {
      logger.info("    ✓ French (fr) locale already exists");
    } else {
      logger.info("    → Creating French (fr) locale...");
      await environment.createLocale({
        name: "French",
        code: "fr",
        fallbackCode: "en",
        optional: false,
      });
      logger.info("    ✓ French (fr) locale created");
    }

    logger.info("    ✓ Locale setup completed");
  } catch (error) {
    logger.error("    ✗ Failed to setup locales:", error);
    throw error;
  }
}

export async function down(space: Space): Promise<void> {
  logger.info("  → Rolling back locale setup...");

  try {
    // Get the master environment to work with locales
    const environment = await space.getEnvironment("master");

    const locales = await environment.getLocales();

    // Delete locales in reverse order of their dependencies
    // French and German have English as fallback, so delete them first
    const deletionOrder = ["fr", "de", "en"];

    for (const localeCode of deletionOrder) {
      const locale = locales.items.find((l) => l.code === localeCode);
      if (locale) {
        logger.info(`    → Removing ${locale.name} (${locale.code}) locale...`);
        await locale.delete();
        logger.info(`    ✓ ${locale.name} locale removed`);
      }
    }

    logger.info("    ✓ Locale rollback completed");
  } catch (error) {
    logger.error("    ✗ Failed to rollback locales:", error);
    throw error;
  }
}
