import type { Article } from "../../../generated/contentful-sdk.generated";

export function articleFromArticleAdapter(item: Article) {
  const contentEntryId = item.sys.id;
  const featuredImage = item.featuredImage;

  return {
    id: item.sys.id,
    title: {
      text: item.title || "",
      data: {
        "data-contentful-entry-id": contentEntryId,
        "data-contentful-field-id": "title",
      },
    },
    excerpt: item.excerpt
      ? {
          text: item.excerpt,
          data: {
            "data-contentful-entry-id": contentEntryId,
            "data-contentful-field-id": "excerpt",
          },
        }
      : undefined,
    image: featuredImage?.image?.url
      ? {
          src: featuredImage.image.url,
          alt:
            featuredImage?.alternativeText || featuredImage?.image?.title || "",
          data: {
            "data-contentful-entry-id": contentEntryId,
            "data-contentful-field-id": "featuredImage",
          },
        }
      : undefined,
    publishDate: item.publishDate ?? undefined,
    slug: item.slug || "",
  };
}
