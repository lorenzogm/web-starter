import { localesMiddleware } from "./utils/middlewares/locales-middleware";
import { stackMiddlewares } from "./utils/middlewares/stack-middlewares";

const middlewares: ReturnType<typeof stackMiddlewares> = stackMiddlewares([
  localesMiddleware,
]);
// eslint-disable-next-line import/no-default-export
export default middlewares;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest.json (manifest file)
     * - robots.txt (robots file)
     * - android-chrome (android-chrome files)
     * - apple-touch (apple-touch files)
     * - browserconfig.xml (browserconfig file)
     * - mstile (mstile files)
     * - safari (safari files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|favicon|assets|android-chrome-|apple-touch-icon|browserconfig.xml|mstile-|safari-pinned-tab.svg).*)",
  ],
};
