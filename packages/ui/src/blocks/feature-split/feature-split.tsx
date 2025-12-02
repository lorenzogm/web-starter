"use client";

import type { ReactNode } from "react";
import { Image } from "../../components/image/image";
import { Text } from "../../components/text/text";

type TextProps = {
  text: string;
  data?: Record<string, unknown>;
};

type ImageProps = {
  src: string;
  alt: string;
  data?: Record<string, unknown>;
};

export type FeatureSplitProps = {
  title: TextProps;
  description?: TextProps;
  image?: ImageProps;
  ctaText?: string;
  ctaUrl?: string;
  imagePosition?: "left" | "right";
};

export function FeatureSplit(props: FeatureSplitProps): ReactNode {
  const imagePosition = props.imagePosition || "right";

  return (
    <section className="w-full bg-gradient-to-b from-white to-slate-50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div
          className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20 ${imagePosition === "left" ? "lg:flex-row-reverse" : ""}`}
        >
          <div
            className={`space-y-8 ${imagePosition === "left" ? "lg:order-2" : ""}`}
          >
            <div>
              <div className="mb-4 inline-block rounded-lg bg-orange-100 px-4 py-2">
                <Text variant="caption">
                  <span className="text-orange-600">Feature</span>
                </Text>
              </div>
              <div className="text-slate-900">
                <Text variant="h2" {...props.title.data}>
                  {props.title.text}
                </Text>
              </div>
            </div>
            {props.description && (
              <div className="text-slate-600">
                <Text variant="body-lg" {...props.description.data}>
                  {props.description.text}
                </Text>
              </div>
            )}
            {props.ctaText && props.ctaUrl && (
              <div className="pt-4">
                <a
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-8 py-4 font-semibold text-base text-white shadow-lg shadow-orange-500/25 transition-all duration-200 hover:scale-105 hover:shadow-orange-500/40 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                  href={props.ctaUrl}
                >
                  {props.ctaText}
                  <svg
                    aria-label="Arrow right icon"
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    role="img"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Arrow right icon</title>
                    <path
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
          {props.image && (
            <div
              className={`group relative ${imagePosition === "left" ? "lg:order-1" : ""}`}
              {...props.image.data}
            >
              <div className="-inset-4 absolute rounded-3xl bg-gradient-to-br from-orange-500/20 to-blue-500/20 blur-2xl transition-opacity group-hover:opacity-75" />
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-slate-200/50 transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  alt={props.image.alt}
                  className="h-full w-full object-cover"
                  height={600}
                  src={props.image.src}
                  width={800}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
