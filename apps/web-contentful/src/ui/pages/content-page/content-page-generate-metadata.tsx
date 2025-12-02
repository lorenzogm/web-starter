import type { Metadata } from "next";

import { type ContentPageProps, fetchContentPage } from "./content-page";

export async function contentPageGenerateMetadata(
  props: ContentPageProps
): Promise<Metadata> {
  const page = await fetchContentPage(props);

  return {
    title: page.seoTitle,
    description: page.seoDescription,
  };
}
