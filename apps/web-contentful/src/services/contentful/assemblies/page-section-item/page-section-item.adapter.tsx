import type { PageSectionItem } from "../../generated/contentful-sdk.generated";
import { articleAdapter } from "./adapters/article.adapter";
import { productAdapter } from "./adapters/product.adapter";

export function pageSectionItemAdapter(props: PageSectionItem) {
  if (!props.content) {
    return null;
  }

  if (props.content.__typename === "Article") {
    return articleAdapter(props.content);
  }

  if (props.content.__typename === "Product") {
    return productAdapter(props.content);
  }

  return null;
}
