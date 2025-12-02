import type { Article } from "../../../generated/contentful-sdk.generated";

export function productFromArticleAdapter(item: Article) {
  const contentEntryId = item.sys.id;
  const featuredImage = item.featuredImage;

  return {
    id: item.sys.id,
    name: {
      text: item.title || "",
      data: {
        "data-contentful-entry-id": contentEntryId,
        "data-contentful-field-id": "title",
      },
    },
    description: item.excerpt
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
    price: undefined,
    slug: item.slug || "",
  };
}
