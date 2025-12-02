import type { Product } from "../../../generated/contentful-sdk.generated";

export function articleFromProductAdapter(item: Product) {
  const contentEntryId = item.sys.id;
  const firstImageComponent = item.imagesCollection?.items[0];
  const firstImage = firstImageComponent?.image;

  return {
    id: item.sys.id,
    title: {
      text: item.name || "",
      data: {
        "data-contentful-entry-id": contentEntryId,
        "data-contentful-field-id": "name",
      },
    },
    excerpt: item.description
      ? {
          text: item.description,
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
    slug: item.slug || "",
  };
}
