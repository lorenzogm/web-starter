import type { ReactNode } from "react";
import { MainLayout } from "../../../ui/layouts/main-layout/main-layout";
import type { Locales } from "../../../utils/locales";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: Locales;
  }>;
};

export default function Layout(props: LayoutProps): ReactNode {
  return <MainLayout params={props.params}>{props.children}</MainLayout>;
}
