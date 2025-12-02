import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Image } from "./image";
import { mockDecorativeImageProps, mockImageProps } from "./image.mocks";
import { ImageProvider } from "./image-provider";

const TEST_GRAPHIC_REGEX = /Test graphic/i;

describe("Image Component", () => {
  describe("FR01: Basic rendering and accessibility", () => {
    it("renders default <img> with alt text", () => {
      render(<Image {...mockImageProps} />);
      const img = screen.getByRole("img", { name: TEST_GRAPHIC_REGEX });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", mockImageProps.src);
    });
  });

  describe("FR02: Decorative mode behavior", () => {
    it("renders empty alt and aria-hidden when decorative", () => {
      const { container } = render(<Image {...mockDecorativeImageProps} />);
      const img = container.querySelector("img");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("aria-hidden", "true");
      expect(img).toHaveAttribute("alt", "");
    });
  });

  describe("FR03: Provider override component", () => {
    it("uses override component from provider when supplied", () => {
      // Custom component logs props via data attributes for assertion
      function CustomImage(p: React.ComponentProps<typeof Image>) {
        return (
          <div
            aria-label={p.alt}
            data-src={p.src}
            data-testid="custom-image"
            role="img"
          />
        );
      }
      render(
        <ImageProvider component={CustomImage}>
          <Image {...mockImageProps} />
        </ImageProvider>
      );
      const custom = screen.getByTestId("custom-image");
      expect(custom).toBeInTheDocument();
      expect(custom).toHaveAttribute("data-src", mockImageProps.src);
      // Ensure original img not present
      expect(screen.queryByTestId("mock-image")).not.toBeInTheDocument();
    });
  });
});
