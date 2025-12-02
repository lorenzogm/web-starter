/* eslint-disable react/no-unstable-nested-components */
import {
  documentToReactComponents,
  type Options,
} from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

// Simple type definition to replace the missing Typography variants
type TypographyVariants =
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "heading-4"
  | "heading-5"
  | "heading-6"
  | "body-lg"
  | "body-md"
  | "body-sm";

export type RichTextEditorAdapterProps =
  | null
  | string
  | {
      json?: Document;
      links?: {
        entries?: {
          hyperlink: Array<{
            sys: {
              id: string;
            };
            page: {
              sys: {
                id: string;
                urlGenerated: string;
              };
            };
          } | null>;
        };
        assets?: {
          hyperlink: Array<{
            sys: {
              id: string;
            };
            url?: string | null;
          } | null>;
        };
      };
      typographyVariant?: TypographyVariants;
    };

export function richTextEditorAdapter(props?: RichTextEditorAdapterProps) {
  if (!props) {
    return null;
  }

  // Handle string content
  if (typeof props === "string") {
    return <p className="text-base">{props}</p>;
  }

  // Handle rich text object
  if (!props.json) {
    return null;
  }

  const entryMap = new Map();
  if (props.links?.entries?.hyperlink) {
    for (const entry of props.links.entries.hyperlink) {
      entryMap.set(entry?.sys.id, entry?.page?.sys.urlGenerated);
    }
  }

  const assetMap = new Map();
  if (props.links?.assets?.hyperlink) {
    for (const asset of props.links.assets.hyperlink) {
      assetMap.set(asset?.sys.id, asset?.url);
    }
  }

  const options: Partial<Options> = {
    renderNode: {
      [BLOCKS.HEADING_1]: (_, children) => (
        <h1 className="font-bold text-4xl">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (_, children) => (
        <h2 className="font-bold text-3xl">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (_, children) => (
        <h3 className="font-bold text-2xl">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (_, children) => (
        <h4 className="font-bold text-xl">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (_, children) => (
        <h5 className="font-bold text-lg">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (_, children) => (
        <h6 className="font-bold text-base">{children}</h6>
      ),
      [BLOCKS.PARAGRAPH]: (_, children) => (
        <p className="text-base leading-relaxed">{children}</p>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <a
          href={node.data.uri}
          style={{ color: "#3b82f6", textDecoration: "underline" }}
        >
          {children}
        </a>
      ),
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        const entryId = node.data.target.sys.id;
        const slug = entryMap.get(entryId as string) || "";
        const href = slug.startsWith("/") ? slug : `/${slug}`;
        return (
          <a
            href={href}
            style={{ color: "#3b82f6", textDecoration: "underline" }}
          >
            {children}
          </a>
        );
      },
      [INLINES.ASSET_HYPERLINK]: (node, children) => {
        const assetId = node.data.target.sys.id;
        const url = assetMap.get(assetId as string) || "";
        return (
          <a
            download
            href={url}
            rel="noopener noreferrer"
            style={{ color: "#3b82f6", textDecoration: "underline" }}
            target="_blank"
          >
            {children}
          </a>
        );
      },
      // [BLOCKS.OL_LIST]: (_, children) => <List isOrdered>{children}</List>,
      // [BLOCKS.UL_LIST]: (_, children) => <List isOrdered={false}>{children}</List>,
      // [BLOCKS.QUOTE]: (_, children) => <Blockquote>{children}</Blockquote>,
    },
  };

  return <>{documentToReactComponents(props.json, options)}</>;
}
