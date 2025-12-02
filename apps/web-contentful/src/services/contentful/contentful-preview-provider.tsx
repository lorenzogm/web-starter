"use client";

import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
import type { PropsWithChildren } from "react";
import type { Locales } from "../../utils/locales";

type ContentfulPreviewProviderProps = PropsWithChildren<{
  locale: Locales;
}>;

export function ContentfulPreviewProvider(
  props: ContentfulPreviewProviderProps
) {
  return (
    <ContentfulLivePreviewProvider
      debugMode
      enableInspectorMode
      enableLiveUpdates
      locale={props.locale}
      targetOrigin="https://app.contentful.com"
    >
      {props.children}
    </ContentfulLivePreviewProvider>
  );
}
