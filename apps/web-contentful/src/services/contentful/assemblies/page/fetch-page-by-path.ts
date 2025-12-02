import { cache } from "react";

import { contentful } from "../../contentful";

export const fetchPageByPath = cache(
  (path: string, preview: boolean, locale: string) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    contentful().pageByPath({ path, preview, locale })
);
