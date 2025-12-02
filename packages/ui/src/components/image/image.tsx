"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/utils";
import { useImage } from "./use-image";

const ALT_TEXT_VALIDATION_REGEX = /\b(image|picture|photo)\b/i;

// Global override mechanism via context so apps (e.g. b2b-portal) can provide Next.js Image
// without adding a next/image dependency to the ui package.
// The override component must accept the base ImageProps defined below.
// WHY: This avoids coupling while enabling advanced image optimization features in consuming apps.

// Default blur placeholder for better loading experience
const blurDataURLDefault =
  "data:image/webp;base64,UklGRo4CAABXRUJQVlA4IIICAAAQKgCdASp3AfoAPpFInkulpKKho71oILASCWlu4XVRCPNpCJbwVQN+IIaWsb8Zo434zRxvxmjjfjNHG/GaON+M0cb8Zo434zRxvxmjjfjNHG/GaON+M0cb8ZomePP8ODRlzb/YOZni5Gcmj8srDPfHluhGz6gTs24ruEWcizaN+uQMUstDHFp+JHD0p/5UN2HOiZ2SKmnGUiLX1Eyrf/nr3aUWGB5avMZiQfhl3qkk2XBg0lAXsVL9TkWn4icY6okvhOvAAoBSh0hFjQeVD3PSzS2YD1E0e3Y0N7ozFBUt6QJZw24uhZGTOr5Q9ZiKn6y71SNQ1qg4tPxj3XIaMkOxsjwoGz1fDn5dkyKFxo48GDeWsb8Si3V4pseA8tGtcpOtqw1PYzE/GaON+NSVPxqnBzYHlrG/GaON+M0cb8Zo434zRxvxmjjfjNHG/GaON+M0cb8Zo434zKgA/v7fuTtGx44AAAAAAArRHe040lnx/brHO5gLQxTurpq4s3vGazXsQFvSqHPqoI9BhrFC2a0mPSx2N5UWIo0FapPdes2GdjzThSl8M9kzLCFSkhG+c39OQIUR3Uy+H6png8dNk18pq5fcF9OGodLLcSOOq6K47j/V0L040oeYBYSe/El4BnSkGaJsrF6R508BbJPOqFwmg8Q52QVTPoL2lNYDoT7RKuJLo51qB2ziCFFsbaH0yVC4AsDm002VdCvBVLvF5c/Q7NIVttJBazlaj90txmOBx0ATzd/BCV6TNtWO1GXHTgu2ZHcnzpIJ/JjDn8bdNv5gBDLPmFYfzq65Q+191AedUbfixAtR0LS0lVEzk3ig+9xskURR5IA6DBIDhdFBvmAAAAA=";

export type AspectRatioSquare = "1:1";
export type AspectRatioFourThree = "4:3";
export type AspectRatioSixteenNine = "16:9";

interface BaseImageProps
  extends Omit<
    ComponentProps<"img">,
    "width" | "height" | "loading" | "onError" | "onLoad" | "sizes"
  > {
  src: string;
  alt: string;
  loading?: "lazy" | "eager";
  onError?: () => void;
  onLoad?: () => void;
  onLoadingComplete?: () => void;
  quality?: number;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
  decorative?: boolean;
  decorativeLabel?: string;
  className?: string;
}

interface ImageSizeProps extends BaseImageProps {
  fill?: false;
  width?: number;
  height?: number;
  objectFit?: never;
  aspectRatio?: never;
}

interface ImageFillProps extends BaseImageProps {
  fill: true;
  width?: never;
  height?: never;
  objectFit?: "contain" | "cover" | "none";
  aspectRatio?:
    | AspectRatioSquare
    | AspectRatioFourThree
    | AspectRatioSixteenNine;
}

export type ImageProps = ImageSizeProps | ImageFillProps;

function sanitizeAlt(
  alt: string,
  decorative: boolean | undefined,
  decorativeLabel?: string
): string {
  if (decorative) {
    return ""; // Decorative images must have empty alt.
  }
  if (!alt || ALT_TEXT_VALIDATION_REGEX.test(alt)) {
    // Provide a minimal fallback but keep it meaningful.
    return decorativeLabel && !ALT_TEXT_VALIDATION_REGEX.test(decorativeLabel)
      ? decorativeLabel
      : ""; // Empty signals developer to supply proper alt; tests can catch.
  }
  return alt;
}

export function Image(props: ImageProps): ReactNode {
  const Comp = useImage();

  if (Comp) {
    // Use sizes string directly
    const sizesWithBreakpoints = props.sizes || "100vw";

    const blurDataURL = props.blurDataURL || blurDataURLDefault;
    // Use placeholder directly or default to 'blur'
    const placeholderValue: "blur" | "empty" | undefined =
      props.placeholder || "blur";

    // Handle fill mode with aspect ratio wrapper
    if ("fill" in props && props.fill === true) {
      const {
        fill: _fill,
        aspectRatio,
        objectFit,
        sizes: _sizes,
        placeholder: _placeholderProp,
        blurDataURL: _blurDataURL,
        ...restProps
      } = props;
      return (
        <div
          data-testid="image-fill-wrapper"
          style={{
            aspectRatio: aspectRatio
              ? aspectRatio.replace(":", "/")
              : undefined,
            position: "relative",
            height: aspectRatio ? "auto" : "100%",
          }}
        >
          <Comp
            {...restProps}
            blurDataURL={blurDataURL}
            fill={true}
            placeholder={placeholderValue}
            sizes={sizesWithBreakpoints}
            style={{ objectFit: objectFit || "cover" }}
          />
        </div>
      );
    }

    // Standard size mode
    const {
      sizes: _sizes2,
      placeholder: _placeholder2,
      blurDataURL: _blurDataURL2,
      ...restPropsStandard
    } = props;
    return (
      <Comp
        {...restPropsStandard}
        blurDataURL={blurDataURL}
        placeholder={placeholderValue}
        sizes={sizesWithBreakpoints}
      />
    );
  }

  // Fallback to standard img tag - remove Next.js-specific props
  const {
    alt,
    decorative,
    decorativeLabel,
    className,
    width,
    height,
    quality: _quality,
    priority: _priority,
    placeholder: _placeholder3,
    blurDataURL: _blurDataURL3,
    sizes: _sizes3,
    onLoadingComplete: _onLoadingComplete,
    fill: _fill2,
    aspectRatio: _aspectRatio,
    objectFit: _objectFit,
    ...rest
  } = props;

  return (
    // biome-ignore lint/performance/noImgElement: Intentional fallback for non-Next.js environments
    <img
      {...rest}
      alt={sanitizeAlt(alt, Boolean(decorative), decorativeLabel)}
      aria-hidden={decorative ? true : undefined}
      className={cn("inline-block", className)}
      height={height}
      src={props.src}
      width={width}
    />
  );
}
