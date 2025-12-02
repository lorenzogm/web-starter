import type { Document } from "../../../generated/contentful-sdk.generated";

export function articleFromDocumentAdapter(item: Document) {
  const contentEntryId = item.sys.id;
  const thumbnail = item.thumbnail;

  return {
    id: item.sys.id,
    title: {
      text: item.title || "",
      data: {
        "data-contentful-entry-id": contentEntryId,
        "data-contentful-field-id": "title",
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
    publishDate: item.publishDate ?? undefined,
    slug: item.slug || "",
  };
}
