import type { DraftModeProvider } from "next/dist/server/async-storage/draft-mode-provider";

import type { Locales } from "../../utils/locales";

export type PageContext = {
  pageContext: {
    params?: { path: string[]; locale: Locales };
    searchParams?: Record<string, string>;
    draft?: DraftModeProvider;
    isDraft?: boolean;
  };
};
