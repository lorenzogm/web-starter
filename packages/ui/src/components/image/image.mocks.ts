import type { ImageProps } from "./image";

export const mockImageProps: ImageProps = {
  src: "https://example.com/test-image.png",
  alt: "Test graphic",
  loading: "lazy",
  className: "rounded-md",
};

export const mockDecorativeImageProps: ImageProps = {
  src: "https://example.com/decorative.png",
  alt: "Should be ignored when decorative",
  decorativeLabel: "Ignored decorative",
  decorative: true,
  className: "opacity-80",
};
