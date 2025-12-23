import { execSync } from "node:child_process";
import fs from "node:fs";
import { config } from "dotenv";

import { z } from "zod";

// Load .env file
config();

const [, , environmentArg, actionArg, ...argv] = process.argv;

const environmentSchema = z.enum(["production"]);
const environmentResult = environmentSchema.safeParse(environmentArg);

const actionSchema = z.enum(["plan", "apply", "destroy"]);
const actionResult = actionSchema.safeParse(actionArg);

runCommand()
  .then(() => {
    console.log("Command executed successfully");
  })
  .catch((error) => {
    console.error(error);
    console.error("Error running command");
    console.error("Please check the command and try again");
    console.error(
      `Example: pnpm --filter infra-vercel-kids tf ${actionSchema.options[0]} ${environmentSchema.options[0]} ${argv.join(" ")}`
    );
    console.error(`Valid actions are: ${actionSchema.options.join(", ")}`);
    console.error(
      `Valid environments are: ${environmentSchema.options.join(", ")}`
    );
  });

async function runCommand() {
  if (!environmentResult.success) {
    console.error(`Invalid environment: ${environmentArg}`);
    console.error(
      `Valid environments are: ${environmentSchema.options.join(", ")}`
    );
    process.exit(1);
  }
  const environment = environmentResult.data;

  if (!actionResult.success) {
    console.error(`Invalid action: ${actionArg}`);
    console.error(`Valid actions are: ${actionSchema.options.join(", ")}`);
    process.exit(1);
  }
  const action = actionResult.data;

  // checks
  // await runCommand('tfsec .');
  await run("tflint --init");
  await run("tflint --config=.tflint.hcl");

  const tfEnv = process.platform === "win32" ? "tenv tf" : "tfenv";
  await run(`${tfEnv} install 1.4.5`);
  await run(`${tfEnv} use 1.4.5`);

  // Copy the environment-specific state file to terraform.tfstate if it exists
  if (fs.existsSync(`src/${environment}.tfstate`)) {
    await run(`cp src/${environment}.tfstate src/terraform.tfstate`);
  }

  await run(
    `terraform -chdir=src init -input=false -var-file=config.${environment}.json`
  );

  await run(
    `terraform -chdir=src ${action} -input=false -var-file=config.${environment}.json ${argv.join(" ")}`
  );

  // Only copy state file if it exists (apply/destroy create state, plan doesn't)
  if (fs.existsSync("src/terraform.tfstate")) {
    await run(`cp src/terraform.tfstate src/${environment}.tfstate`);
    await run("rm src/terraform.tfstate");
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
// biome-ignore lint/suspicious/useAwait: Function signature requires async for consistent interface
export async function run(command: string, captureOutput = false) {
  console.log(command);

  // Prepare Terraform environment variables
  const tfVars: Record<string, string> = {
    TF_VAR_ENVIRONMENT: environmentArg,
    TF_VAR_VERCEL_TOKEN: process.env.VERCEL_TOKEN || "",
    TF_VAR_VERCEL_ORG_ID: process.env.VERCEL_ORG_ID || "",
  };

  // Add all environment variables with TF_VAR_ prefix
  for (const [key, value] of Object.entries(process.env)) {
    if (!key.startsWith("TF_VAR_") && value !== undefined) {
      tfVars[`TF_VAR_${key}`] = value;
    }
  }

  return execSync(command, {
    stdio: captureOutput ? "pipe" : "inherit",
    encoding: captureOutput ? "utf-8" : null,
    env: {
      ...process.env,
      ...tfVars,
    },
  });
}
