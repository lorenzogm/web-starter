"use client";

import { type ComponentType, useContext } from "react";
import type { ImageProps } from "./image";
import { ImageContext } from "./image-provider";

export function useImage(): ComponentType<ImageProps> | undefined {
  return useContext(ImageContext).Override;
}
