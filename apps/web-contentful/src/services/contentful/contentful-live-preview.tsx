"use client";

import { ContentfulLivePreview as ContentfulLivePreviewSDK } from "@contentful/live-preview";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";

import type { Locales } from "../../utils/locales";

export type ContentfulLivePreviewProps = PropsWithChildren<{
  locale: Locales;
}>;

export function ContentfulLivePreview(props: ContentfulLivePreviewProps) {
  useEffect(() => {
    ContentfulLivePreviewSDK.init({
      locale: props.locale,
      debugMode: true,
      enableLiveUpdates: true,
      enableInspectorMode: true,
      targetOrigin: "https://app.contentful.com",
    });

    ContentfulLivePreviewSDK.subscribe("save", {
      callback: async () => {
        const { pathname } = window.location;
        await fetch(`/api/revalidate-preview?pathname=${pathname}`);
        window.location.reload();
      },
    });
  }, [props.locale]);

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
