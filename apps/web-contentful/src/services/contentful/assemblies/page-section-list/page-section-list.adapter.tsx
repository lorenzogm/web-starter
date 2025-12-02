import type {
  ListEntriesItem,
  PageSectionList,
} from "../../generated/contentful-sdk.generated";
import { articleFromArticleAdapter } from "./adapters/article-from-article.adapter";
import { articleFromDocumentAdapter } from "./adapters/article-from-document.adapter";
import { articleFromProductAdapter } from "./adapters/article-from-product.adapter";
import { productFromArticleAdapter } from "./adapters/product-from-article.adapter";
import { productFromDocumentAdapter } from "./adapters/product-from-document.adapter";
import { productFromProductAdapter } from "./adapters/product-from-product.adapter";
import type {
  ArticleItem,
  PageSectionListAdapterResult,
  ProductItem,
} from "./page-section-list.adapter.types";

function mapItemToProduct(item: ListEntriesItem | null): ProductItem | null {
  if (!item) {
    return null;
  }

  switch (item.__typename) {
    case "Product":
      return productFromProductAdapter(item);
    case "Article":
      return productFromArticleAdapter(item);
    case "Document":
      return productFromDocumentAdapter(item);
    default:
      return null;
  }
}

function mapItemToArticle(item: ListEntriesItem | null): ArticleItem | null {
  if (!item) {
    return null;
  }

  switch (item.__typename) {
    case "Product":
      return articleFromProductAdapter(item);
    case "Article":
      return articleFromArticleAdapter(item);
    case "Document":
      return articleFromDocumentAdapter(item);
    default:
      return null;
  }
}

export function pageSectionListAdapter(
  props: PageSectionList
): PageSectionListAdapterResult {
  if (!props.content || props.content.__typename !== "List") {
    return null;
  }

  const items = props.content.entriesCollection?.items || [];
  const isProductList = props.userInterface?.includes("product");
  const isNewsList = props.userInterface?.includes("news");
  const title = props.internalName
    ? { text: props.internalName, data: {} }
    : undefined;

  if (isProductList) {
    const products = items
      .map(mapItemToProduct)
      .filter((item): item is ProductItem => item !== null);

    return {
      title,
      products: products.length > 0 ? products : undefined,
      articles: undefined,
    };
  }

  if (isNewsList) {
    const articles = items
      .map(mapItemToArticle)
      .filter((item): item is ArticleItem => item !== null);

    return {
      title,
      products: undefined,
      articles: articles.length > 0 ? articles : undefined,
    };
  }

  return null;
}
