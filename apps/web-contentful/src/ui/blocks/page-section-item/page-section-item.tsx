import { logger } from "@repo/logger";
import { FeatureFullWidth, FeatureSplit, HeroLarge } from "@repo/ui/client";
import { pageSectionItemAdapter } from "../../../services/contentful/assemblies/page-section-item/page-section-item.adapter";
import type { PageSectionItem } from "../../../services/contentful/generated/contentful-sdk.generated";
import type { PageContext } from "../../pages/content-page/content-page";
import { BlockPlaceholder } from "../block-placeholder/block-placeholder";

export function PageSectionItemComponent(props: PageSectionItem & PageContext) {
  const uiProps = pageSectionItemAdapter(props);

  if (!uiProps) {
    logger.warn("No valid entry found for PageSectionItem", props);
    if (process.env.NODE_ENV === "development") {
      return <BlockPlaceholder data={props} />;
    }
    return null;
  }

  switch (props.userInterface) {
    case "hero-large":
      return <HeroLarge {...uiProps} />;
    case "hero-medium":
      return <HeroLarge {...uiProps} />;
    case "feature-full-width":
      return <FeatureFullWidth {...uiProps} />;
    case "feature-split":
      return <FeatureSplit {...uiProps} />;
    case "product-grid-three":
    case "product-grid-four":
    case "content-centered":
    case "unknown":
      logger.warn(`UI component not yet implemented: ${props.userInterface}`);
      if (process.env.NODE_ENV === "development") {
        return <BlockPlaceholder data={props} />;
      }
      return null;
    default:
      logger.error(
        `PageSectionItem with UI "${props.userInterface}" cannot be displayed`,
        undefined,
        {
          userInterface: props.userInterface,
          internalName: props.internalName,
          contentType: props.content?.__typename,
        }
      );
      if (process.env.NODE_ENV === "development") {
        return <BlockPlaceholder data={props} />;
      }
      return null;
  }
}
