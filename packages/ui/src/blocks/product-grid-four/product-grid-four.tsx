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

export type ProductGridFourProps = {
  title?: TextProps;
  products: Array<{
    id: string;
    name: TextProps;
    description?: TextProps;
    image?: ImageProps;
    price?: TextProps;
    slug: string;
  }>;
};

export function ProductGridFour(props: ProductGridFourProps): ReactNode {
  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white py-20 md:py-28">
      <div className="container mx-auto px-4">
        {props.title && (
          <div className="mb-16 text-center text-slate-900">
            <Text variant="h2" {...props.title.data}>
              {props.title.text}
            </Text>
            <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-orange-600" />
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {props.products.map((product) => (
            <article
              className="group hover:-translate-y-2 flex flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-md transition-all duration-300 hover:border-orange-200 hover:shadow-slate-200/50 hover:shadow-xl"
              key={product.id}
            >
              {product.image && (
                <div
                  className="relative aspect-square w-full overflow-hidden bg-slate-100"
                  {...product.image.data}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <Image
                    alt={product.image.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    height={600}
                    src={product.image.src}
                    width={600}
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 text-slate-900 transition-colors group-hover:text-orange-600">
                  <Text variant="h4" {...product.name.data}>
                    {product.name.text}
                  </Text>
                </div>
                {product.description && (
                  <div className="mb-3 line-clamp-2 flex-1 text-slate-600">
                    <Text variant="body-sm" {...product.description.data}>
                      {product.description.text}
                    </Text>
                  </div>
                )}
                <div className="mt-auto flex items-center justify-between border-slate-100 border-t pt-3">
                  {product.price && (
                    <span
                      className="font-extrabold text-orange-600 text-xl"
                      {...product.price.data}
                    >
                      {product.price.text}
                    </span>
                  )}
                  <a
                    className="group/link inline-flex items-center gap-1 font-semibold text-orange-600 text-xs transition-all hover:gap-2 hover:text-orange-700"
                    href={`/products/${product.slug}`}
                  >
                    View
                    <svg
                      aria-label="Arrow right icon"
                      className="h-3 w-3 transition-transform group-hover/link:translate-x-1"
                      fill="none"
                      role="img"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Arrow right icon</title>
                      <path
                        d="M9 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
