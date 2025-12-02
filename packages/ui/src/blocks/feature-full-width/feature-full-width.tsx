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

export type FeatureFullWidthProps = {
  title: TextProps;
  description?: TextProps;
  image?: ImageProps;
  ctaText?: string;
  ctaUrl?: string;
};

export function FeatureFullWidth(props: FeatureFullWidthProps): ReactNode {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-20 md:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 text-white">
            <Text variant="h2" {...props.title.data}>
              {props.title.text}
            </Text>
          </div>
          {props.description && (
            <div className="mx-auto mb-12 max-w-3xl text-slate-300">
              <Text variant="body-lg" {...props.description.data}>
                {props.description.text}
              </Text>
            </div>
          )}
          {props.image && (
            <div
              className="group relative mx-auto mb-12 max-w-5xl"
              {...props.image.data}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/20 to-blue-500/20 blur-2xl transition-opacity group-hover:opacity-75" />
              <div className="relative aspect-video overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  alt={props.image.alt}
                  className="h-full w-full object-cover"
                  height={720}
                  src={props.image.src}
                  width={1280}
                />
              </div>
            </div>
          )}
          {props.ctaText && props.ctaUrl && (
            <div className="flex justify-center">
              <a
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-8 py-4 font-semibold text-base text-white shadow-lg shadow-orange-500/25 transition-all duration-200 hover:scale-105 hover:shadow-orange-500/40 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-900"
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
      </div>
    </section>
  );
}
