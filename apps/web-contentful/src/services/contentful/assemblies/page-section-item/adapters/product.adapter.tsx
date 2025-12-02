import type { Product } from "../../../generated/contentful-sdk.generated";

export function productAdapter(content: Product) {
  const contentEntryId = content.sys?.id;
  const firstImageComponent = content.imagesCollection?.items[0];
  const firstImage = firstImageComponent?.image;

  return {
    title: {
      text: content.name ?? "",
      data: {
        "data-contentful-entry-id": contentEntryId,
        "data-contentful-field-id": "name",
      },
    },
    description: content.description
      ? {
          text: content.description,
          data: {
            "data-contentful-entry-id": contentEntryId,
            "data-contentful-field-id": "description",
          },
        }
      : undefined,
    image: firstImage?.url
      ? {
          src: firstImage.url,
          alt: firstImageComponent?.alternativeText || firstImage?.title || "",
          data: {
            "data-contentful-entry-id": contentEntryId,
            "data-contentful-field-id": "images",
          },
        }
      : undefined,
    ctaText: undefined,
    ctaUrl: undefined,
  };
}
