import type { DraftModeProvider } from "next/dist/server/async-storage/draft-mode-provider";
import { notFound } from "next/navigation";

import { fetchPageByPath } from "../../../services/contentful/assemblies/page/fetch-page-by-path";
import type { Locales } from "../../../utils/locales";
import { ContentArea } from "../../blocks/content-area/content-area";
import type { PageContext } from "../page-context";

// Re-export PageContext for use in other components
export type { PageContext } from "../page-context";

export type ContentPageProps = {
  params: {
    locale: Locales;
    path: string[];
  };
  draft: DraftModeProvider;
};

export async function ContentPage(props: ContentPageProps) {
  const page = await fetchContentPage(props);

  const pageContext: PageContext["pageContext"] = {
    ...props,
  };

  return (
    <>
      <ContentArea
        items={page.topContentAreaCollection?.items}
        pageContext={pageContext}
      />
      <ContentArea
        items={page.bottomContentAreaCollection?.items}
        pageContext={pageContext}
      />
    </>
  );
}

export async function fetchContentPage(props: ContentPageProps) {
  const pagePath = props.params.path ? `/${props.params.path.join("/")}` : "/";
  const contentfulPage = await fetchPageByPath(
    pagePath,
    props.draft.isEnabled,
    props.params.locale
  );

  if (!contentfulPage?.data.pageCollection) {
    notFound();
  }

  const [page] = contentfulPage.data.pageCollection.items;

  if (!page) {
    notFound();
  }

  return page;
}
