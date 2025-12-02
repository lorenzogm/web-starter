import { Roboto } from "next/font/google";
import NextImage from "next/image";
import type { ReactNode } from "react";

import "./styles.css";
import { ImageProvider } from "../ui/providers/image-provider";

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export default function HtmlLayout({ children }: { children: ReactNode }) {
  return (
    <html className={roboto.variable} lang="en">
      <head>
        <title>Web Starter</title>
        <meta content="Web Starter Description" name="description" />
        <link href="/favicon.ico" rel="icon" sizes="any" />
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          crossOrigin="use-credentials"
          href="/manifest.json"
          rel="manifest"
        />
        <link color="#BA172B" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#da532c" name="msapplication-TileColor" />
        <meta content="#ffffff" name="theme-color" />
      </head>

      <body className={`${roboto.className}`}>
        <ImageProvider component={NextImage}>{children}</ImageProvider>
      </body>
    </html>
  );
}
