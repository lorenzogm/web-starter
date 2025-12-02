type TextProps = {
  text: string;
  data?: Record<string, unknown>;
};

type ImageProps = {
  src: string;
  alt: string;
  data?: Record<string, unknown>;
};

export type ProductItem = {
  id: string;
  name: TextProps;
  description?: TextProps;
  image?: ImageProps;
  price?: TextProps;
  slug: string;
};

export type ArticleItem = {
  id: string;
  title: TextProps;
  excerpt?: TextProps;
  image?: ImageProps;
  publishDate?: string;
  slug: string;
};

export type PageSectionListAdapterResult = {
  title?: TextProps;
  products?: ProductItem[];
  articles?: ArticleItem[];
} | null;
