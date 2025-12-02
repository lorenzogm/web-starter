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

export type HeroLargeProps = {
  title: TextProps;
  description?: TextProps;
  image?: ImageProps;
  ctaText?: string;
  ctaUrl?: string;
};

export function HeroLarge(props: HeroLargeProps): ReactNode {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="-left-32 -top-32 absolute h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="-bottom-32 -right-32 absolute h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-20 md:py-28 lg:py-36">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <div className="text-white">
              <Text variant="h1" {...props.title.data}>
                {props.title.text}
              </Text>
            </div>
            {props.description?.text && (
              <div className="max-w-2xl text-slate-300">
                <Text variant="body-lg" {...props.description.data}>
                  {props.description.text}
                </Text>
              </div>
            )}
            {props.ctaText && props.ctaUrl && (
              <div className="flex items-center gap-4 pt-4">
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
          {props.image && (
            <div className="group relative" {...props.image.data}>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/20 to-blue-500/20 blur-2xl transition-opacity group-hover:opacity-75" />
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-[1.02] lg:aspect-square">
                <Image
                  alt={props.image.alt}
                  className="h-full w-full object-cover"
                  height={800}
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
