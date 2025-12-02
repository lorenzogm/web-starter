import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlockPlaceholder } from "./block-placeholder";
import {
  mockBlockPlaceholderMinimal,
  mockBlockPlaceholderProps,
  mockBlockPlaceholderWithData,
} from "./block-placeholder.mocks";

const DEBUG_DATA_REGEX = /Debug Data/i;

describe("BlockPlaceholder", () => {
  describe("FR01: Basic rendering and content display", () => {
    it("renders with auto-generated title", () => {
      render(<BlockPlaceholder {...mockBlockPlaceholderProps} />);

      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        'ContentPlaceholder with UI "default" cannot be displayed'
      );
    });

    it("renders with auto-generated description", () => {
      render(<BlockPlaceholder {...mockBlockPlaceholderProps} />);

      expect(screen.getByText("Check the CMS")).toBeInTheDocument();
    });

    it("generates title from data __typename and ui", () => {
      render(<BlockPlaceholder {...mockBlockPlaceholderMinimal} />);

      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        'EmptyContent with UI "minimal" cannot be displayed'
      );
    });
  });

  describe("FR02: Debug data display", () => {
    it("always shows debug data section", () => {
      render(<BlockPlaceholder {...mockBlockPlaceholderWithData} />);

      expect(screen.getByText(DEBUG_DATA_REGEX)).toBeInTheDocument();
    });

    it("displays data in JSON format", () => {
      render(<BlockPlaceholder {...mockBlockPlaceholderMinimal} />);

      expect(screen.getByText(DEBUG_DATA_REGEX)).toBeInTheDocument();
      const debugSection = screen.getByText(DEBUG_DATA_REGEX).parentElement;
      expect(debugSection?.querySelector("pre")).toBeInTheDocument();
    });
  });

  describe("FR03: Styling and customization", () => {
    it("applies custom className", () => {
      const customClass = "custom-test-class";
      const { container } = render(
        <BlockPlaceholder
          {...mockBlockPlaceholderProps}
          className={customClass}
        />
      );

      const placeholderDiv = container.querySelector(`.${customClass}`);
      expect(placeholderDiv).toBeInTheDocument();
    });

    it("has default styling classes", () => {
      const { container } = render(
        <BlockPlaceholder {...mockBlockPlaceholderProps} />
      );

      const placeholderDiv = container.querySelector(".border-dashed");
      expect(placeholderDiv).toBeInTheDocument();
    });
  });

  describe("FR04: Accessibility", () => {
    it("has semantic heading element", () => {
      render(<BlockPlaceholder {...mockBlockPlaceholderProps} />);

      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toBeInTheDocument();
    });

    it("uses details/summary for collapsible debug section", () => {
      render(<BlockPlaceholder {...mockBlockPlaceholderWithData} />);

      const summary = screen.getByText(DEBUG_DATA_REGEX);
      expect(summary.tagName).toBe("SUMMARY");
    });
  });
});
