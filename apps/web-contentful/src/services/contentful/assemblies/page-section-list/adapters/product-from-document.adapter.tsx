import type { Document } from "../../../generated/contentful-sdk.generated";

export function productFromDocumentAdapter(item: Document) {
  const contentEntryId = item.sys.id;
  const thumbnail = item.thumbnail;

  return {
    id: item.sys.id,
    name: {
      text: item.title || "",
      data: {
        "data-contentful-entry-id": contentEntryId,
        "data-contentful-field-id": "title",
      },
    },
    description: item.description
      ? {
          text: item.description,
          data: {
            "data-contentful-entry-id": contentEntryId,
            "data-contentful-field-id": "description",
          },
        }
      : undefined,
    image: thumbnail?.image?.url
      ? {
          src: thumbnail.image.url,
          alt: thumbnail?.alternativeText || thumbnail?.image?.title || "",
          data: {
            "data-contentful-entry-id": contentEntryId,
            "data-contentful-field-id": "thumbnail",
          },
        }
      : undefined,
    price: undefined,
    slug: item.slug || "",
  };
}
