"use client";

import type { ReactNode } from "react";

export type MainLayoutClientProps = {
  children: ReactNode;
};

export function MainLayoutClient(props: MainLayoutClientProps): ReactNode {
  return <main className="flex-1">{props.children}</main>;
}
