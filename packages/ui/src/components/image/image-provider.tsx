"use client";

import { type ComponentType, createContext, type ReactNode } from "react";
import type { ImageProps } from "./image";

type ImageContextValue = {
  Override?: ComponentType<ImageProps>;
};

export const ImageContext = createContext<ImageContextValue>({});

export function ImageProvider(props: {
  component: ComponentType<ImageProps>;
  children: ReactNode;
}): ReactNode {
  return (
    <ImageContext.Provider value={{ Override: props.component }}>
      {props.children}
    </ImageContext.Provider>
  );
}
