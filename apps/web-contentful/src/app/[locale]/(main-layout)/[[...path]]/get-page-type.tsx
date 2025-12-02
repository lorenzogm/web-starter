import { logger } from "@repo/logger";
import { notFound } from "next/navigation";
import { cache } from "react";

import { contentful } from "../../../../services/contentful/contentful";
import type { Locales } from "../../../../utils/locales";
import { LOCALES } from "../../../../utils/locales";

type GetPageTypeProps = {
  params: {
    locale: Locales;
    path: string[];
  };
  draft: {
    isEnabled: boolean;
  };
};

export async function getPageType(props: GetPageTypeProps) {
  if (LOCALES.indexOf(props.params.locale) === -1) {
    logger.error("❌ Unsupported locale requested");
    notFound();
  }

  let contentfulConfig:
    | Awaited<ReturnType<typeof fetchConfigWithCache>>
    | undefined;
  try {
    contentfulConfig = await fetchConfigWithCache(
      props.draft.isEnabled,
      props.params.locale
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    logger.error(`❌ Failed to fetch Contentful config: ${msg}`);
    notFound();
  }

  const config = contentfulConfig.data.configCollection?.items[0];
  const slug = props.params.path ? props.params.path[0] : "";

  if (!config) {
    logger.error("❌ Configuration not found in Contentful CMS");
    notFound();
  }

  switch (slug) {
    case config.slugProductDetailPage:
      return "productDetailPage";

    case config.slugProductListingPage:
      return "productLsitingPage";

    default:
      return "contentPage";
  }
}

export const fetchConfigWithCache = cache((preview: boolean, locale: string) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  contentful().config({ preview, locale })
);
