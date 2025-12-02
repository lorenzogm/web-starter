import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { ContentfulPreviewProvider } from "../../../../services/contentful/contentful-preview-provider";
import {
  ContentPage,
  fetchContentPage,
} from "../../../../ui/pages/content-page/content-page";
import { ContentPageLivePreview } from "../../../../ui/pages/content-page/content-page-live-preview";
import type { Locales } from "../../../../utils/locales";
import { generateMetadata as genMetadata } from "./generate-metadata";
import { getPageType } from "./get-page-type";

export const generateMetadata = genMetadata;
export const revalidate = 3600;

export type PageProps = {
  params: Promise<{
    locale: Locales;
    path: string[];
  }>;
};

export default async function Page(props: PageProps) {
  const params = await props.params;
  const draft = await draftMode();

  const pageType = await getPageType({ params, draft });

  // For draft mode with content pages, use the live preview version
  if (draft.isEnabled && pageType === "contentPage") {
    const page = await fetchContentPage({ params, draft });
    // Only pass serializable data to client component (no class instances)
    const pageContext = { params, isDraft: true };

    return (
      <ContentfulPreviewProvider locale={params.locale}>
        <ContentPageLivePreview page={page} pageContext={pageContext} />
      </ContentfulPreviewProvider>
    );
  }

  let render: ReactElement | string | undefined;

  switch (pageType) {
    case "contentPage":
      render = <ContentPage draft={draft} params={params} />;
      break;

    case "productDetailPage":
      render = "PDP not implemented yet";
      break;

    default:
      notFound();
  }

  return render;
}
