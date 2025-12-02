import { GraphQLClient } from "graphql-request";

import type { Sdk } from "./generated/contentful-sdk.generated";
import { getSdk } from "./generated/contentful-sdk.generated";

export function contentful(): Sdk {
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

  const client = new GraphQLClient(
    `${process.env.CONTENTFUL_API_BASE_URL}/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_API_ACCESS_TOKEN}`,
      },
    }
  );

  return getSdk(client);
}
