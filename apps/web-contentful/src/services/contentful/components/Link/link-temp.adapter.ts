import { logger } from "@repo/logger";
import { z } from "zod";

import type {
  LinkFragment,
  Maybe,
} from "../../generated/contentful-sdk.generated";

const LinkSchema = z.object({
  text: z.string(),
  url: z.string().nullable(),
  page: z
    .object({
      path: z.string(),
      sys: z.object({
        locale: z.string(),
      }),
    })
    .nullable(),
});

export function linkAdapter(link?: Maybe<LinkFragment>) {
  if (!link) {
    logger.warn("Invalid link - neither internal or external data available", {
      link,
    });
    return null;
  }

  const { data, success, error } = LinkSchema.safeParse(link);

  // no link
  if (!success) {
    logger.warn("Link validation failed", error);
    return { href: "/", text: "PLACEHOLDER LINK" };
  }

  // internal link
  if (data.page) {
    return {
      href: `/${data.page.sys.locale}${data.page.path}`,
      text: data.text,
    };
  }

  // external link
  if (data.url) {
    return {
      href: data.url,
      text: data.text,
    };
  }

  logger.error(
    "Invalid link - neither internal or external data available",
    undefined,
    { data }
  );
  return { href: "/", text: data.text };
}
