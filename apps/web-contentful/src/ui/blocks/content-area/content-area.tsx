import { logger } from "@repo/logger";

import type { PageContext } from "../../pages/page-context";
import { PageSectionItemComponent } from "../page-section-item/page-section-item";
import { PageSectionListComponent } from "../page-section-list/page-section-list";

type ContentAreaItem = {
  __typename: string;
  _id: string;
  sys?: { id: string };
};

type ContentAreaProps = PageContext & {
  items?: Array<ContentAreaItem | null>;
};

export function ContentArea(props: ContentAreaProps) {
  if (!props) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return props.items?.map((item) => {
    if (!item?.__typename) {
      logger.error("No __typename found", undefined, { item });
      return null;
    }

    const Feature = features[item.__typename];

    if (!Feature) {
      logger.error("No feature found", undefined, {
        typename: item.__typename,
      });
      return null;
    }

    // @ts-expect-error - TODO: Fix component prop typing
    return <Feature key={item._id} {...item} pageContext={props.pageContext} />;
  });
}

const features: Record<
  string,
  typeof PageSectionItemComponent | typeof PageSectionListComponent
> = {
  PageSectionItem: PageSectionItemComponent,
  PageSectionList: PageSectionListComponent,
};
