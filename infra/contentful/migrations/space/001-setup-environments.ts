import { logger } from "@repo/logger";
import type { Space } from "contentful-management";

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Complex migration logic creating and configuring multiple environments
export async function up(space: Space): Promise<void> {
  logger.info("  → Setting up environments...");

  try {
    // Create prod-01 environment from master
    let prod01Env: Awaited<ReturnType<typeof space.getEnvironment>> | undefined;
    try {
      prod01Env = await space.getEnvironment("prod-01");
      logger.info("    ✓ prod-01 environment already exists");
    } catch (_error: unknown) {
      logger.info("    → Creating prod-01 environment from master...");
      try {
        prod01Env = await space.createEnvironment({
          name: "Production 01",
        });
        logger.info(
          `    ✓ prod-01 environment created (ID: ${prod01Env.sys.id})`
        );
      } catch (createError: unknown) {
        if (
          createError &&
          typeof createError === "object" &&
          "message" in createError &&
          typeof createError.message === "string" &&
          createError.message.includes("already taken")
        ) {
          // Environment exists but with different name, get it
          prod01Env = await space.getEnvironment("prod-01");
          logger.info("    ✓ prod-01 environment found");
        } else {
          throw createError;
        }
      }
    }

    // Create dev-01 environment from master
    let dev01Env: Awaited<ReturnType<typeof space.getEnvironment>> | undefined;
    try {
      dev01Env = await space.getEnvironment("dev-01");
      logger.info("    ✓ dev-01 environment already exists");
    } catch (_error: unknown) {
      logger.info("    → Creating dev-01 environment from master...");
      try {
        dev01Env = await space.createEnvironmentWithId(
          "dev-01",
          {
            name: "Development 01",
          },
          "master"
        );
        logger.info(
          `    ✓ dev-01 environment created (ID: ${dev01Env.sys.id})`
        );

        // Wait for environment to be ready
        logger.info("    → Waiting for dev-01 environment to be ready...");
        let isReady = false;
        let retries = 0;
        const maxRetries = 30;
        const pollingIntervalMs = 2000;

        while (!isReady && retries < maxRetries) {
          await new Promise((resolve) =>
            setTimeout(resolve, pollingIntervalMs)
          );
          try {
            const env = await space.getEnvironment("dev-01");
            if (env.sys.status?.sys.id === "ready") {
              isReady = true;
              logger.info("    ✓ dev-01 environment is ready");
            }
          } catch {
            // Continue waiting
          }
          retries++;
        }

        if (!isReady) {
          logger.warn(
            "    ⚠ Environment may not be fully ready yet, proceeding anyway"
          );
        }
      } catch (createError: unknown) {
        if (
          createError &&
          typeof createError === "object" &&
          "message" in createError &&
          typeof createError.message === "string" &&
          createError.message.includes("already taken")
        ) {
          // Environment exists but with different name, get it
          dev01Env = await space.getEnvironment("dev-01");
          logger.info("    ✓ dev-01 environment found");
        } else {
          throw createError;
        }
      }
    }

    // Create environment aliases (requires feature to be enabled)
    const aliases = [
      { id: "master", environmentId: "prod-01" },
      { id: "staging", environmentId: "prod-01" },
      { id: "development", environmentId: "dev-01" },
    ];

    try {
      for (const alias of aliases) {
        try {
          await space.getEnvironmentAlias(alias.id);
          logger.info(`    ✓ Alias '${alias.id}' already exists`);
        } catch {
          logger.info(
            `    → Creating alias '${alias.id}' → ${alias.environmentId}...`
          );
          await space.createEnvironmentAliasWithId(alias.id, {
            environment: {
              sys: {
                type: "Link",
                linkType: "Environment",
                id: alias.environmentId,
              },
            },
          });
          logger.info(`    ✓ Alias '${alias.id}' created`);
        }
      }
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "name" in error &&
        error.name === "EnvironmentAliasNotOptedIn"
      ) {
        logger.warn(
          "    ⚠ Environment aliases feature not enabled in this space"
        );
        logger.warn(
          "      Aliases need to be enabled in Contentful space settings"
        );
      } else {
        throw error;
      }
    }

    logger.info("    ✓ Environment setup completed");
  } catch (error) {
    logger.error("    ✗ Failed to set up environments:", error);
    throw error;
  }
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Complex rollback logic deleting multiple environments and aliases with error handling
export async function down(space: Space): Promise<void> {
  logger.info("  → Rolling back environment setup...");

  try {
    // Delete aliases (except master which is protected)
    const aliasIds = ["development", "staging"];

    for (const aliasId of aliasIds) {
      try {
        const alias = await space.getEnvironmentAlias(aliasId);
        await alias.delete();
        logger.info(`    ✓ Deleted alias '${aliasId}'`);
      } catch (error: unknown) {
        if (
          error &&
          typeof error === "object" &&
          "name" in error &&
          error.name === "NotFound"
        ) {
          logger.info(`    ○ Alias '${aliasId}' not found (already deleted)`);
        } else {
          logger.warn(
            `    ⚠ Could not delete alias '${aliasId}':`,
            error && typeof error === "object" && "message" in error
              ? error.message
              : error
          );
        }
      }
    }

    // Delete environments (except prod-01 which is referenced by master)
    const environmentIds = ["dev-01"];

    for (const envId of environmentIds) {
      try {
        const env = await space.getEnvironment(envId);
        await env.delete();
        logger.info(`    ✓ Deleted environment '${envId}'`);
      } catch (error: unknown) {
        if (
          error &&
          typeof error === "object" &&
          "name" in error &&
          error.name === "NotFound"
        ) {
          logger.info(
            `    ○ Environment '${envId}' not found (already deleted)`
          );
        } else {
          logger.warn(
            `    ⚠ Could not delete environment '${envId}':`,
            error && typeof error === "object" && "message" in error
              ? error.message
              : error
          );
        }
      }
    }

    logger.info("    ✓ Environment rollback completed");
  } catch (error) {
    logger.error("    ✗ Failed to rollback environment setup:", error);
    throw error;
  }
}
