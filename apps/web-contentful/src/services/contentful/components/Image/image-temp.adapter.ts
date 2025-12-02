import type {
  ImageFragment,
  Maybe,
} from "../../generated/contentful-sdk.generated";

export function imageAdapter(image?: Maybe<ImageFragment>): {
  src: string;
  alt: string;
  caption?: string;
} {
  return {
    src: "",
    alt: image?.alternativeText ?? "Placeholder image",
    caption: image?.caption ?? "",
  };
}
