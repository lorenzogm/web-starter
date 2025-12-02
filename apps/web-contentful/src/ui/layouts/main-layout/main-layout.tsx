import type { ReactNode } from "react";
import type { Locales } from "../../../utils/locales";
import { MainLayoutClient } from "./main-layout.client";

type MainLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: Locales;
  }>;
};

export function MainLayout(props: MainLayoutProps): ReactNode {
  return <MainLayoutClient>{props.children}</MainLayoutClient>;
}
