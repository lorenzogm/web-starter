import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { fetchContentPage } from "../../../../ui/pages/content-page/content-page";
import { getPageType } from "./get-page-type";
import type { PageProps } from "./page";

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const draft = await draftMode();

  let pageType: string | undefined;
  try {
    pageType = await getPageType({ params, draft });
  } catch (_error) {
    // Return basic metadata for error cases
    return {
      title: "Page not found",
      description: "The page you are looking for does not exist.",
    };
  }

  let page: { seoTitle?: string; seoDescription?: string } | undefined;

  switch (pageType) {
    case "contentPage":
      try {
        const contentPage = await fetchContentPage({ params, draft });
        page = {
          seoTitle: contentPage?.seoTitle ?? undefined,
          seoDescription: contentPage?.seoDescription ?? undefined,
        };
      } catch (_error) {
        page = {
          seoTitle: "Content not available",
          seoDescription:
            "The content for this page is currently not available.",
        };
      }
      break;

    case "productDetailPage":
      page = {
        seoTitle: "Product not found",
        seoDescription: "The product you are looking for is not available.",
      };
      break;

    default:
      page = {
        seoTitle: "Page not found",
        seoDescription: "The page you are looking for does not exist.",
      };
  }

  return {
    title: page?.seoTitle || "Page not found",
    description:
      page?.seoDescription || "The page you are looking for does not exist.",
  };
}
