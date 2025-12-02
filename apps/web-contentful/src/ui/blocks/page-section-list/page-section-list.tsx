import { logger } from "@repo/logger";
import {
  NewsListCards,
  ProductGridFour,
  ProductGridThree,
} from "@repo/ui/client";

import { pageSectionListAdapter } from "../../../services/contentful/assemblies/page-section-list/page-section-list.adapter";
import type { PageSectionList } from "../../../services/contentful/generated/contentful-sdk.generated";
import { BlockPlaceholder } from "../block-placeholder/block-placeholder";

export function PageSectionListComponent(props: PageSectionList) {
  const uiProps = pageSectionListAdapter(props);

  if (!uiProps) {
    logger.error("No data found", undefined, { props });

    if (process.env.NODE_ENV === "development") {
      return <BlockPlaceholder data={props} />;
    }

    return null;
  }

  switch (props.userInterface) {
    case "product-grid-three":
    case "product-list-grid":
    case "product-list-carousel":
      return (
        <ProductGridThree
          products={uiProps.products || []}
          title={uiProps.title}
        />
      );
    case "product-grid-four":
      return (
        <ProductGridFour
          products={uiProps.products || []}
          title={uiProps.title}
        />
      );
    case "news-list-cards":
    case "news-list-rows":
      return (
        <NewsListCards
          articles={uiProps.articles || []}
          title={uiProps.title}
        />
      );
    case "content-list-vertical":
      logger.warn(`UI component not yet implemented: ${props.userInterface}`);
      if (process.env.NODE_ENV === "development") {
        return <BlockPlaceholder data={props} />;
      }
      return null;
    default:
      logger.error(
        "No ui found",
        new Error(`Unknown UI type: ${props.userInterface}`)
      );
      if (process.env.NODE_ENV === "development") {
        return <BlockPlaceholder data={props} />;
      }
      return null;
  }
}
