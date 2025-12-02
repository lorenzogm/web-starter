import type { Article } from "../../../generated/contentful-sdk.generated";

export function articleAdapter(content: Article) {
  const contentEntryId = content.sys?.id;
  const featuredImage = content.featuredImage;

  return {
    title: {
      text: content.title ?? "",
      data: {
        "data-contentful-entry-id": contentEntryId,
        "data-contentful-field-id": "title",
      },
    },
    description: content.excerpt
      ? {
          text: content.excerpt,
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
    ctaText: undefined,
    ctaUrl: undefined,
  };
}
