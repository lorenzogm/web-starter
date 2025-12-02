import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

export type TextProps = Omit<
  HTMLAttributes<
    HTMLParagraphElement | HTMLLIElement | HTMLHeadingElement | HTMLQuoteElement
  >,
  "className"
> & {
  children: ReactNode;
  variant?: VariantProps<typeof textVariants>["variant"];
};

const textVariants = cva("", {
  variants: {
    variant: {
      // Headings
      h1: "font-extrabold text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl",
      h2: "font-extrabold text-3xl tracking-tight md:text-4xl lg:text-5xl",
      h3: "font-bold text-xl leading-snug md:text-2xl",
      h4: "font-bold text-lg leading-snug",
      h5: "font-semibold text-base",
      h6: "font-semibold text-sm uppercase tracking-wide",
      // Body text
      "body-lg": "text-lg leading-relaxed md:text-xl",
      "body-md": "text-base leading-relaxed",
      "body-sm": "text-sm leading-relaxed",
      // Utility variants
      caption: "font-semibold text-xs uppercase tracking-wide",
      label: "font-medium text-sm",
    },
  },
  defaultVariants: {
    variant: "body-md",
  },
});

export function Text({ children, variant = "body-md", ...props }: TextProps) {
  const Tag = getTag(variant);
  const variantClasses = textVariants({ variant });

  return (
    <Tag
      className={variantClasses}
      {...props}
      {...(Tag === "h1" ? { id: "main-content", tabIndex: -1 } : {})}
    >
      {children}
    </Tag>
  );
}

function getTag(
  variant: TextProps["variant"]
): "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" {
  switch (variant) {
    case "h1":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    case "h4":
      return "h4";
    case "h5":
      return "h5";
    case "h6":
      return "h6";
    case "caption":
    case "label":
      return "span";
    default:
      return "p";
  }
}
