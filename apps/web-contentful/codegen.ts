import type { CodegenConfig } from "@graphql-codegen/cli";

if (!process.env.CONTENTFUL_API_BASE_URL) {
  throw new Error("Missing environment variable CONTENTFUL_API_BASE_URL");
}
if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error("Missing environment variable CONTENTFUL_SPACE_ID");
}
if (!process.env.CONTENTFUL_ENVIRONMENT) {
  throw new Error("Missing environment variable CONTENTFUL_ENVIRONMENT");
}
if (!process.env.CONTENTFUL_PREVIEW_API_ACCESS_TOKEN) {
  throw new Error(
    "Missing environment variable CONTENTFUL_PREVIEW_API_ACCESS_TOKEN"
  );
}

const config: CodegenConfig = {
  schema: [
    {
      [`${process.env.CONTENTFUL_API_BASE_URL}/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`]:
        {
          headers: {
            Authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_API_ACCESS_TOKEN}`,
          },
        },
    },
  ],
  documents: [
    // Add local GraphQL files
    "src/**/*!(generated).gql",

    // Add Definitions from components (We don’t plan to use this approach)
    // 'src/**/!(*.d).{ts,tsx}',
  ],
  generates: {
    "./src/services/contentful/generated/contentful-sdk.generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
        {
          add: {
            content: "// @ts-nocheck",
          },
        },
      ],
      config: {
        rawRequest: true,
      },
    },
    "./src/services/contentful/generated/schema.generated.gql": {
      plugins: ["schema-ast"],
    },
  },
  ignoreNoDocuments: true,
  // hooks: {
  //   afterOneFileWrite: ["prettier --write"],
  // },
  verbose: true,
  watchConfig: {
    // Passed directly through to chokidar's file watch configuration
    usePolling: true,
    interval: 1000,
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
