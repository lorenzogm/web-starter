import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";
import { LOCALE_DEFAULT, LOCALES } from "../locales";
import type { MiddlewareFactory } from "./stack-middlewares";

// eslint-disable-next-line func-style
export const localesMiddleware: MiddlewareFactory = (next) =>
  ((request: NextRequest, _next: NextFetchEvent) => {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;

    const pathnameHasLocale = LOCALES.some(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (
      pathnameHasLocale ||
      ["graphiql"].some((path) => pathname.includes(path))
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return next(request, _next);
    }

    const localeFromReferer = request.headers.get("referer")?.split("/")[3];

    // @ts-expect-error not-today
    if (localeFromReferer && LOCALES.includes(localeFromReferer)) {
      request.nextUrl.pathname = `/${localeFromReferer}${pathname}`;
    } else {
      request.nextUrl.pathname = `/${LOCALE_DEFAULT}${pathname}`;
    }

    // e.g. incoming request is /products
    // The new URL is now /en-CH/products
    return Response.redirect(request.nextUrl);
  }) as NextMiddleware;
