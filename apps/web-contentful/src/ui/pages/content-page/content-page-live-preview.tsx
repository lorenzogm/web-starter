"use client";

// biome-ignore lint/nursery/noDeprecatedImports: useContentfulLiveUpdates is the current API
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import type { PageByPathQuery } from "../../../services/contentful/generated/contentful-sdk.generated";
import { ContentArea } from "../../blocks/content-area/content-area";
import type { PageContext } from "../page-context";

type Page = NonNullable<
  NonNullable<PageByPathQuery["pageCollection"]>["items"][number]
>;

export type ContentPageLivePreviewProps = {
  page: Page;
  pageContext: PageContext["pageContext"];
};

export function ContentPageLivePreview(props: ContentPageLivePreviewProps) {
  const updatedPage = useContentfulLiveUpdates(props.page);

  return (
    <>
      <ContentArea
        items={updatedPage.topContentAreaCollection?.items}
        pageContext={props.pageContext}
      />
      <ContentArea
        items={updatedPage.bottomContentAreaCollection?.items}
        pageContext={props.pageContext}
      />
    </>
  );
}
