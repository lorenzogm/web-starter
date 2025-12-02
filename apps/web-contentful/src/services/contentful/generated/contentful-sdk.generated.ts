// @ts-nocheck
import { GraphQLClient, RequestOptions } from 'graphql-request';
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Dimension: { input: any; output: any; }
  HexColor: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Quality: { input: any; output: any; }
};

/** Article content with rich text body and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/article) */
export type Article = Entry & _Node & {
  __typename?: 'Article';
  _id: Scalars['ID']['output'];
  body?: Maybe<ArticleBody>;
  contentfulMetadata: ContentfulMetadata;
  excerpt?: Maybe<Scalars['String']['output']>;
  featuredImage?: Maybe<Image>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ArticleLinkingCollections>;
  publishDate?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** Article content with rich text body and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/article) */
export type ArticleBodyArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Article content with rich text body and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/article) */
export type ArticleExcerptArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Article content with rich text body and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/article) */
export type ArticleFeaturedImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ImageFilter>;
};


/** Article content with rich text body and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/article) */
export type ArticleInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Article content with rich text body and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/article) */
export type ArticleLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Article content with rich text body and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/article) */
export type ArticlePublishDateArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Article content with rich text body and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/article) */
export type ArticleSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Article content with rich text body and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/article) */
export type ArticleTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ArticleBody = {
  __typename?: 'ArticleBody';
  json: Scalars['JSON']['output'];
  links: ArticleBodyLinks;
};

export type ArticleBodyAssets = {
  __typename?: 'ArticleBodyAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type ArticleBodyEntries = {
  __typename?: 'ArticleBodyEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type ArticleBodyLinks = {
  __typename?: 'ArticleBodyLinks';
  assets: ArticleBodyAssets;
  entries: ArticleBodyEntries;
  resources: ArticleBodyResources;
};

export type ArticleBodyResources = {
  __typename?: 'ArticleBodyResources';
  block: Array<ArticleBodyResourcesBlock>;
  hyperlink: Array<ArticleBodyResourcesHyperlink>;
  inline: Array<ArticleBodyResourcesInline>;
};

export type ArticleBodyResourcesBlock = ResourceLink & {
  __typename?: 'ArticleBodyResourcesBlock';
  sys: ResourceSys;
};

export type ArticleBodyResourcesHyperlink = ResourceLink & {
  __typename?: 'ArticleBodyResourcesHyperlink';
  sys: ResourceSys;
};

export type ArticleBodyResourcesInline = ResourceLink & {
  __typename?: 'ArticleBodyResourcesInline';
  sys: ResourceSys;
};

export type ArticleCollection = {
  __typename?: 'ArticleCollection';
  items: Array<Maybe<Article>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ArticleFilter = {
  AND?: InputMaybe<Array<InputMaybe<ArticleFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ArticleFilter>>>;
  body_contains?: InputMaybe<Scalars['String']['input']>;
  body_exists?: InputMaybe<Scalars['Boolean']['input']>;
  body_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  excerpt_contains?: InputMaybe<Scalars['String']['input']>;
  excerpt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  excerpt_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  excerpt_not?: InputMaybe<Scalars['String']['input']>;
  excerpt_not_contains?: InputMaybe<Scalars['String']['input']>;
  excerpt_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  featuredImage?: InputMaybe<CfImageNestedFilter>;
  featuredImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  publishDate?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ArticleLinkingCollections = {
  __typename?: 'ArticleLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  listCollection?: Maybe<ListCollection>;
  pageSectionItemCollection?: Maybe<PageSectionItemCollection>;
};


export type ArticleLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ArticleLinkingCollectionsListCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ArticleLinkingCollectionsListCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ArticleLinkingCollectionsPageSectionItemCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ArticleLinkingCollectionsPageSectionItemCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ArticleLinkingCollectionsListCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ArticleLinkingCollectionsPageSectionItemCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UserInterfaceAsc = 'userInterface_ASC',
  UserInterfaceDesc = 'userInterface_DESC'
}

export enum ArticleOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PublishDateAsc = 'publishDate_ASC',
  PublishDateDesc = 'publishDate_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  transform?: InputMaybe<ImageTransformOptions>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  contentType_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentType_not?: InputMaybe<Scalars['String']['input']>;
  contentType_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileName_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName_not?: InputMaybe<Scalars['String']['input']>;
  fileName_not_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  height?: InputMaybe<Scalars['Int']['input']>;
  height_exists?: InputMaybe<Scalars['Boolean']['input']>;
  height_gt?: InputMaybe<Scalars['Int']['input']>;
  height_gte?: InputMaybe<Scalars['Int']['input']>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  height_lt?: InputMaybe<Scalars['Int']['input']>;
  height_lte?: InputMaybe<Scalars['Int']['input']>;
  height_not?: InputMaybe<Scalars['Int']['input']>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size?: InputMaybe<Scalars['Int']['input']>;
  size_exists?: InputMaybe<Scalars['Boolean']['input']>;
  size_gt?: InputMaybe<Scalars['Int']['input']>;
  size_gte?: InputMaybe<Scalars['Int']['input']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size_lt?: InputMaybe<Scalars['Int']['input']>;
  size_lte?: InputMaybe<Scalars['Int']['input']>;
  size_not?: InputMaybe<Scalars['Int']['input']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  width?: InputMaybe<Scalars['Int']['input']>;
  width_exists?: InputMaybe<Scalars['Boolean']['input']>;
  width_gt?: InputMaybe<Scalars['Int']['input']>;
  width_gte?: InputMaybe<Scalars['Int']['input']>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  width_lt?: InputMaybe<Scalars['Int']['input']>;
  width_lte?: InputMaybe<Scalars['Int']['input']>;
  width_not?: InputMaybe<Scalars['Int']['input']>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  documentCollection?: Maybe<DocumentCollection>;
  entryCollection?: Maybe<EntryCollection>;
  imageCollection?: Maybe<ImageCollection>;
  videoCollection?: Maybe<VideoCollection>;
};


export type AssetLinkingCollectionsDocumentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsVideoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

/** Site configuration and URL routing [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/config) */
export type Config = Entry & _Node & {
  __typename?: 'Config';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ConfigLinkingCollections>;
  slugArticleDetailPage?: Maybe<Scalars['String']['output']>;
  slugArticleListingPage?: Maybe<Scalars['String']['output']>;
  slugProductDetailPage?: Maybe<Scalars['String']['output']>;
  slugProductListingPage?: Maybe<Scalars['String']['output']>;
  sys: Sys;
};


/** Site configuration and URL routing [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/config) */
export type ConfigInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Site configuration and URL routing [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/config) */
export type ConfigLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Site configuration and URL routing [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/config) */
export type ConfigSlugArticleDetailPageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Site configuration and URL routing [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/config) */
export type ConfigSlugArticleListingPageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Site configuration and URL routing [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/config) */
export type ConfigSlugProductDetailPageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Site configuration and URL routing [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/config) */
export type ConfigSlugProductListingPageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ConfigCollection = {
  __typename?: 'ConfigCollection';
  items: Array<Maybe<Config>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ConfigFilter = {
  AND?: InputMaybe<Array<InputMaybe<ConfigFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ConfigFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slugArticleDetailPage?: InputMaybe<Scalars['String']['input']>;
  slugArticleDetailPage_contains?: InputMaybe<Scalars['String']['input']>;
  slugArticleDetailPage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slugArticleDetailPage_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slugArticleDetailPage_not?: InputMaybe<Scalars['String']['input']>;
  slugArticleDetailPage_not_contains?: InputMaybe<Scalars['String']['input']>;
  slugArticleDetailPage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slugArticleListingPage?: InputMaybe<Scalars['String']['input']>;
  slugArticleListingPage_contains?: InputMaybe<Scalars['String']['input']>;
  slugArticleListingPage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slugArticleListingPage_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slugArticleListingPage_not?: InputMaybe<Scalars['String']['input']>;
  slugArticleListingPage_not_contains?: InputMaybe<Scalars['String']['input']>;
  slugArticleListingPage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slugProductDetailPage?: InputMaybe<Scalars['String']['input']>;
  slugProductDetailPage_contains?: InputMaybe<Scalars['String']['input']>;
  slugProductDetailPage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slugProductDetailPage_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slugProductDetailPage_not?: InputMaybe<Scalars['String']['input']>;
  slugProductDetailPage_not_contains?: InputMaybe<Scalars['String']['input']>;
  slugProductDetailPage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slugProductListingPage?: InputMaybe<Scalars['String']['input']>;
  slugProductListingPage_contains?: InputMaybe<Scalars['String']['input']>;
  slugProductListingPage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slugProductListingPage_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slugProductListingPage_not?: InputMaybe<Scalars['String']['input']>;
  slugProductListingPage_not_contains?: InputMaybe<Scalars['String']['input']>;
  slugProductListingPage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type ConfigLinkingCollections = {
  __typename?: 'ConfigLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ConfigLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ConfigOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SlugArticleDetailPageAsc = 'slugArticleDetailPage_ASC',
  SlugArticleDetailPageDesc = 'slugArticleDetailPage_DESC',
  SlugArticleListingPageAsc = 'slugArticleListingPage_ASC',
  SlugArticleListingPageDesc = 'slugArticleListingPage_DESC',
  SlugProductDetailPageAsc = 'slugProductDetailPage_ASC',
  SlugProductDetailPageDesc = 'slugProductDetailPage_DESC',
  SlugProductListingPageAsc = 'slugProductListingPage_ASC',
  SlugProductListingPageDesc = 'slugProductListingPage_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Generic content item for various use cases [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/contentItem) */
export type ContentItem = Entry & _Node & {
  __typename?: 'ContentItem';
  _id: Scalars['ID']['output'];
  body?: Maybe<ContentItemBody>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  internalName?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Link>;
  linkedFrom?: Maybe<ContentItemLinkingCollections>;
  slug?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** Generic content item for various use cases [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/contentItem) */
export type ContentItemBodyArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Generic content item for various use cases [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/contentItem) */
export type ContentItemDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Generic content item for various use cases [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/contentItem) */
export type ContentItemImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ImageFilter>;
};


/** Generic content item for various use cases [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/contentItem) */
export type ContentItemInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Generic content item for various use cases [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/contentItem) */
export type ContentItemLinkArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LinkFilter>;
};


/** Generic content item for various use cases [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/contentItem) */
export type ContentItemLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Generic content item for various use cases [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/contentItem) */
export type ContentItemSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Generic content item for various use cases [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/contentItem) */
export type ContentItemTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentItemBody = {
  __typename?: 'ContentItemBody';
  json: Scalars['JSON']['output'];
  links: ContentItemBodyLinks;
};

export type ContentItemBodyAssets = {
  __typename?: 'ContentItemBodyAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type ContentItemBodyEntries = {
  __typename?: 'ContentItemBodyEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type ContentItemBodyLinks = {
  __typename?: 'ContentItemBodyLinks';
  assets: ContentItemBodyAssets;
  entries: ContentItemBodyEntries;
  resources: ContentItemBodyResources;
};

export type ContentItemBodyResources = {
  __typename?: 'ContentItemBodyResources';
  block: Array<ContentItemBodyResourcesBlock>;
  hyperlink: Array<ContentItemBodyResourcesHyperlink>;
  inline: Array<ContentItemBodyResourcesInline>;
};

export type ContentItemBodyResourcesBlock = ResourceLink & {
  __typename?: 'ContentItemBodyResourcesBlock';
  sys: ResourceSys;
};

export type ContentItemBodyResourcesHyperlink = ResourceLink & {
  __typename?: 'ContentItemBodyResourcesHyperlink';
  sys: ResourceSys;
};

export type ContentItemBodyResourcesInline = ResourceLink & {
  __typename?: 'ContentItemBodyResourcesInline';
  sys: ResourceSys;
};

export type ContentItemCollection = {
  __typename?: 'ContentItemCollection';
  items: Array<Maybe<ContentItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ContentItemFilter = {
  AND?: InputMaybe<Array<InputMaybe<ContentItemFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ContentItemFilter>>>;
  body_contains?: InputMaybe<Scalars['String']['input']>;
  body_exists?: InputMaybe<Scalars['Boolean']['input']>;
  body_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  image?: InputMaybe<CfImageNestedFilter>;
  image_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  link?: InputMaybe<CfLinkNestedFilter>;
  link_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentItemLinkingCollections = {
  __typename?: 'ContentItemLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  listCollection?: Maybe<ListCollection>;
  pageSectionItemCollection?: Maybe<PageSectionItemCollection>;
};


export type ContentItemLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ContentItemLinkingCollectionsListCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentItemLinkingCollectionsListCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ContentItemLinkingCollectionsPageSectionItemCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentItemLinkingCollectionsPageSectionItemCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ContentItemLinkingCollectionsListCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ContentItemLinkingCollectionsPageSectionItemCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UserInterfaceAsc = 'userInterface_ASC',
  UserInterfaceDesc = 'userInterface_DESC'
}

export enum ContentItemOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  concepts: Array<Maybe<TaxonomyConcept>>;
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataConceptsDescendantsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataConceptsFilter = {
  descendants?: InputMaybe<ContentfulMetadataConceptsDescendantsFilter>;
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataFilter = {
  concepts?: InputMaybe<ContentfulMetadataConceptsFilter>;
  concepts_exists?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *       Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** Document content with file attachments and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/document) */
export type Document = Entry & _Node & {
  __typename?: 'Document';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  file?: Maybe<Asset>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<DocumentLinkingCollections>;
  publishDate?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  thumbnail?: Maybe<Image>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Document content with file attachments and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/document) */
export type DocumentDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Document content with file attachments and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/document) */
export type DocumentFileArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Document content with file attachments and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/document) */
export type DocumentInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Document content with file attachments and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/document) */
export type DocumentLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Document content with file attachments and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/document) */
export type DocumentPublishDateArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Document content with file attachments and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/document) */
export type DocumentSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Document content with file attachments and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/document) */
export type DocumentThumbnailArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ImageFilter>;
};


/** Document content with file attachments and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/document) */
export type DocumentTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DocumentCollection = {
  __typename?: 'DocumentCollection';
  items: Array<Maybe<Document>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type DocumentFilter = {
  AND?: InputMaybe<Array<InputMaybe<DocumentFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<DocumentFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  file_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  publishDate?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  thumbnail?: InputMaybe<CfImageNestedFilter>;
  thumbnail_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type DocumentLinkingCollections = {
  __typename?: 'DocumentLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  listCollection?: Maybe<ListCollection>;
  pageSectionItemCollection?: Maybe<PageSectionItemCollection>;
};


export type DocumentLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type DocumentLinkingCollectionsListCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<DocumentLinkingCollectionsListCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type DocumentLinkingCollectionsPageSectionItemCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<DocumentLinkingCollectionsPageSectionItemCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum DocumentLinkingCollectionsListCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum DocumentLinkingCollectionsPageSectionItemCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UserInterfaceAsc = 'userInterface_ASC',
  UserInterfaceDesc = 'userInterface_DESC'
}

export enum DocumentOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PublishDateAsc = 'publishDate_ASC',
  PublishDateDesc = 'publishDate_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type EntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Image assets with metadata and accessibility features [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/image) */
export type Image = Entry & _Node & {
  __typename?: 'Image';
  _id: Scalars['ID']['output'];
  alternativeText?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  image?: Maybe<Asset>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ImageLinkingCollections>;
  sys: Sys;
};


/** Image assets with metadata and accessibility features [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/image) */
export type ImageAlternativeTextArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Image assets with metadata and accessibility features [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/image) */
export type ImageCaptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Image assets with metadata and accessibility features [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/image) */
export type ImageImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Image assets with metadata and accessibility features [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/image) */
export type ImageInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Image assets with metadata and accessibility features [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/image) */
export type ImageLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ImageCollection = {
  __typename?: 'ImageCollection';
  items: Array<Maybe<Image>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ImageFilter = {
  AND?: InputMaybe<Array<InputMaybe<ImageFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ImageFilter>>>;
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  alternativeText_contains?: InputMaybe<Scalars['String']['input']>;
  alternativeText_exists?: InputMaybe<Scalars['Boolean']['input']>;
  alternativeText_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  alternativeText_not?: InputMaybe<Scalars['String']['input']>;
  alternativeText_not_contains?: InputMaybe<Scalars['String']['input']>;
  alternativeText_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  caption?: InputMaybe<Scalars['String']['input']>;
  caption_contains?: InputMaybe<Scalars['String']['input']>;
  caption_exists?: InputMaybe<Scalars['Boolean']['input']>;
  caption_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  caption_not?: InputMaybe<Scalars['String']['input']>;
  caption_not_contains?: InputMaybe<Scalars['String']['input']>;
  caption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  image_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export enum ImageFormat {
  /** AVIF image format. */
  Avif = 'AVIF',
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export type ImageLinkingCollections = {
  __typename?: 'ImageLinkingCollections';
  articleCollection?: Maybe<ArticleCollection>;
  contentItemCollection?: Maybe<ContentItemCollection>;
  documentCollection?: Maybe<DocumentCollection>;
  entryCollection?: Maybe<EntryCollection>;
  layoutCollection?: Maybe<LayoutCollection>;
  productCollection?: Maybe<ProductCollection>;
};


export type ImageLinkingCollectionsArticleCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImageLinkingCollectionsArticleCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImageLinkingCollectionsContentItemCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImageLinkingCollectionsContentItemCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImageLinkingCollectionsDocumentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImageLinkingCollectionsDocumentCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImageLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImageLinkingCollectionsLayoutCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImageLinkingCollectionsLayoutCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImageLinkingCollectionsProductCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImageLinkingCollectionsProductCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ImageLinkingCollectionsArticleCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PublishDateAsc = 'publishDate_ASC',
  PublishDateDesc = 'publishDate_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum ImageLinkingCollectionsContentItemCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum ImageLinkingCollectionsDocumentCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PublishDateAsc = 'publishDate_ASC',
  PublishDateDesc = 'publishDate_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum ImageLinkingCollectionsLayoutCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ImageLinkingCollectionsProductCollectionOrder {
  InStockAsc = 'inStock_ASC',
  InStockDesc = 'inStock_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PriceAsc = 'price_ASC',
  PriceDesc = 'price_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ImageOrder {
  AlternativeTextAsc = 'alternativeText_ASC',
  AlternativeTextDesc = 'alternativeText_DESC',
  CaptionAsc = 'caption_ASC',
  CaptionDesc = 'caption_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT'
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: InputMaybe<Scalars['HexColor']['input']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']['input']>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']['input']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']['input']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']['input']>;
};

/** Layout structure with header, footer and navigation configuration [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/layout) */
export type Layout = Entry & _Node & {
  __typename?: 'Layout';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  footerMicrocopiesCollection?: Maybe<LayoutFooterMicrocopiesCollection>;
  headerLogo?: Maybe<Image>;
  headerMicrocopiesCollection?: Maybe<LayoutHeaderMicrocopiesCollection>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<LayoutLinkingCollections>;
  slug?: Maybe<Scalars['String']['output']>;
  sys: Sys;
};


/** Layout structure with header, footer and navigation configuration [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/layout) */
export type LayoutFooterMicrocopiesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LayoutFooterMicrocopiesCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<MicrocopyFilter>;
};


/** Layout structure with header, footer and navigation configuration [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/layout) */
export type LayoutHeaderLogoArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ImageFilter>;
};


/** Layout structure with header, footer and navigation configuration [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/layout) */
export type LayoutHeaderMicrocopiesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LayoutHeaderMicrocopiesCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<MicrocopyFilter>;
};


/** Layout structure with header, footer and navigation configuration [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/layout) */
export type LayoutInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Layout structure with header, footer and navigation configuration [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/layout) */
export type LayoutLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Layout structure with header, footer and navigation configuration [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/layout) */
export type LayoutSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LayoutCollection = {
  __typename?: 'LayoutCollection';
  items: Array<Maybe<Layout>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type LayoutFilter = {
  AND?: InputMaybe<Array<InputMaybe<LayoutFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<LayoutFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  footerMicrocopies?: InputMaybe<CfMicrocopyNestedFilter>;
  footerMicrocopiesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  headerLogo?: InputMaybe<CfImageNestedFilter>;
  headerLogo_exists?: InputMaybe<Scalars['Boolean']['input']>;
  headerMicrocopies?: InputMaybe<CfMicrocopyNestedFilter>;
  headerMicrocopiesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type LayoutFooterMicrocopiesCollection = {
  __typename?: 'LayoutFooterMicrocopiesCollection';
  items: Array<Maybe<Microcopy>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum LayoutFooterMicrocopiesCollectionOrder {
  KeyAsc = 'key_ASC',
  KeyDesc = 'key_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type LayoutHeaderMicrocopiesCollection = {
  __typename?: 'LayoutHeaderMicrocopiesCollection';
  items: Array<Maybe<Microcopy>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum LayoutHeaderMicrocopiesCollectionOrder {
  KeyAsc = 'key_ASC',
  KeyDesc = 'key_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type LayoutLinkingCollections = {
  __typename?: 'LayoutLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type LayoutLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum LayoutOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Links and navigation items for buttons and CTAs [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/link) */
export type Link = Entry & _Node & {
  __typename?: 'Link';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<LinkLinkingCollections>;
  page?: Maybe<Page>;
  sys: Sys;
  text?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};


/** Links and navigation items for buttons and CTAs [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/link) */
export type LinkInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Links and navigation items for buttons and CTAs [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/link) */
export type LinkLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Links and navigation items for buttons and CTAs [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/link) */
export type LinkPageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PageFilter>;
};


/** Links and navigation items for buttons and CTAs [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/link) */
export type LinkTextArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Links and navigation items for buttons and CTAs [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/link) */
export type LinkUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LinkCollection = {
  __typename?: 'LinkCollection';
  items: Array<Maybe<Link>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type LinkFilter = {
  AND?: InputMaybe<Array<InputMaybe<LinkFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<LinkFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<CfPageNestedFilter>;
  page_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  text?: InputMaybe<Scalars['String']['input']>;
  text_contains?: InputMaybe<Scalars['String']['input']>;
  text_exists?: InputMaybe<Scalars['Boolean']['input']>;
  text_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text_not?: InputMaybe<Scalars['String']['input']>;
  text_not_contains?: InputMaybe<Scalars['String']['input']>;
  text_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type LinkLinkingCollections = {
  __typename?: 'LinkLinkingCollections';
  contentItemCollection?: Maybe<ContentItemCollection>;
  entryCollection?: Maybe<EntryCollection>;
};


export type LinkLinkingCollectionsContentItemCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LinkLinkingCollectionsContentItemCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type LinkLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum LinkLinkingCollectionsContentItemCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum LinkOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

/** Lists of content entries [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/list) */
export type List = Entry & _Node & {
  __typename?: 'List';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  entriesCollection?: Maybe<ListEntriesCollection>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ListLinkingCollections>;
  sys: Sys;
};


/** Lists of content entries [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/list) */
export type ListEntriesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ListEntriesFilter>;
};


/** Lists of content entries [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/list) */
export type ListInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Lists of content entries [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/list) */
export type ListLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ListCollection = {
  __typename?: 'ListCollection';
  items: Array<Maybe<List>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ListEntriesCollection = {
  __typename?: 'ListEntriesCollection';
  items: Array<Maybe<ListEntriesItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ListEntriesFilter = {
  AND?: InputMaybe<Array<InputMaybe<ListEntriesFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ListEntriesFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type ListEntriesItem = Article | ContentItem | Document | Product;

export type ListFilter = {
  AND?: InputMaybe<Array<InputMaybe<ListFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ListFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  entries?: InputMaybe<CfentriesMultiTypeNestedFilter>;
  entriesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type ListLinkingCollections = {
  __typename?: 'ListLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageSectionListCollection?: Maybe<PageSectionListCollection>;
};


export type ListLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ListLinkingCollectionsPageSectionListCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ListLinkingCollectionsPageSectionListCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ListLinkingCollectionsPageSectionListCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UserInterfaceAsc = 'userInterface_ASC',
  UserInterfaceDesc = 'userInterface_DESC'
}

export enum ListOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Translation keys and localized text content for multi-language support [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/microcopy) */
export type Microcopy = Entry & _Node & {
  __typename?: 'Microcopy';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  key?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<MicrocopyLinkingCollections>;
  sys: Sys;
  value?: Maybe<Scalars['String']['output']>;
};


/** Translation keys and localized text content for multi-language support [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/microcopy) */
export type MicrocopyKeyArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Translation keys and localized text content for multi-language support [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/microcopy) */
export type MicrocopyLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Translation keys and localized text content for multi-language support [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/microcopy) */
export type MicrocopyValueArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MicrocopyCollection = {
  __typename?: 'MicrocopyCollection';
  items: Array<Maybe<Microcopy>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MicrocopyFilter = {
  AND?: InputMaybe<Array<InputMaybe<MicrocopyFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<MicrocopyFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  key?: InputMaybe<Scalars['String']['input']>;
  key_contains?: InputMaybe<Scalars['String']['input']>;
  key_exists?: InputMaybe<Scalars['Boolean']['input']>;
  key_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  key_not?: InputMaybe<Scalars['String']['input']>;
  key_not_contains?: InputMaybe<Scalars['String']['input']>;
  key_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  value?: InputMaybe<Scalars['String']['input']>;
  value_contains?: InputMaybe<Scalars['String']['input']>;
  value_exists?: InputMaybe<Scalars['Boolean']['input']>;
  value_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  value_not?: InputMaybe<Scalars['String']['input']>;
  value_not_contains?: InputMaybe<Scalars['String']['input']>;
  value_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type MicrocopyLinkingCollections = {
  __typename?: 'MicrocopyLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  layoutCollection?: Maybe<LayoutCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type MicrocopyLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MicrocopyLinkingCollectionsLayoutCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<MicrocopyLinkingCollectionsLayoutCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MicrocopyLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<MicrocopyLinkingCollectionsPageCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum MicrocopyLinkingCollectionsLayoutCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum MicrocopyLinkingCollectionsPageCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PathAsc = 'path_ASC',
  PathDesc = 'path_DESC',
  SeoDescriptionAsc = 'seoDescription_ASC',
  SeoDescriptionDesc = 'seoDescription_DESC',
  SeoTitleAsc = 'seoTitle_ASC',
  SeoTitleDesc = 'seoTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum MicrocopyOrder {
  KeyAsc = 'key_ASC',
  KeyDesc = 'key_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Track executed migrations [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/migrations) */
export type Migrations = Entry & _Node & {
  __typename?: 'Migrations';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<MigrationsLinkingCollections>;
  migrationId?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  status?: Maybe<Scalars['String']['output']>;
  sys: Sys;
};


/** Track executed migrations [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/migrations) */
export type MigrationsExecutedAtArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Track executed migrations [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/migrations) */
export type MigrationsInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Track executed migrations [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/migrations) */
export type MigrationsLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Track executed migrations [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/migrations) */
export type MigrationsMigrationIdArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Track executed migrations [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/migrations) */
export type MigrationsStatusArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MigrationsCollection = {
  __typename?: 'MigrationsCollection';
  items: Array<Maybe<Migrations>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MigrationsFilter = {
  AND?: InputMaybe<Array<InputMaybe<MigrationsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<MigrationsFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  executedAt?: InputMaybe<Scalars['DateTime']['input']>;
  executedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  executedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  executedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  executedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  executedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  executedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  executedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  executedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  migrationId_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  migrationId_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  migrationId_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  migrationId_exists?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  status_contains?: InputMaybe<Scalars['String']['input']>;
  status_exists?: InputMaybe<Scalars['Boolean']['input']>;
  status_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status_not?: InputMaybe<Scalars['String']['input']>;
  status_not_contains?: InputMaybe<Scalars['String']['input']>;
  status_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type MigrationsLinkingCollections = {
  __typename?: 'MigrationsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type MigrationsLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum MigrationsOrder {
  ExecutedAtAsc = 'executedAt_ASC',
  ExecutedAtDesc = 'executedAt_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Page assembly with sections, SEO and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/page) */
export type Page = Entry & _Node & {
  __typename?: 'Page';
  _id: Scalars['ID']['output'];
  bottomContentAreaCollection?: Maybe<PageBottomContentAreaCollection>;
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<PageLinkingCollections>;
  microcopiesCollection?: Maybe<PageMicrocopiesCollection>;
  path?: Maybe<Scalars['String']['output']>;
  seoDescription?: Maybe<Scalars['String']['output']>;
  seoTitle?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  topContentAreaCollection?: Maybe<PageTopContentAreaCollection>;
};


/** Page assembly with sections, SEO and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/page) */
export type PageBottomContentAreaCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PageBottomContentAreaFilter>;
};


/** Page assembly with sections, SEO and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/page) */
export type PageInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Page assembly with sections, SEO and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/page) */
export type PageLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Page assembly with sections, SEO and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/page) */
export type PageMicrocopiesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PageMicrocopiesCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<MicrocopyFilter>;
};


/** Page assembly with sections, SEO and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/page) */
export type PagePathArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Page assembly with sections, SEO and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/page) */
export type PageSeoDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Page assembly with sections, SEO and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/page) */
export type PageSeoTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Page assembly with sections, SEO and metadata [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/page) */
export type PageTopContentAreaCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PageTopContentAreaFilter>;
};

export type PageBottomContentAreaCollection = {
  __typename?: 'PageBottomContentAreaCollection';
  items: Array<Maybe<PageBottomContentAreaItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PageBottomContentAreaFilter = {
  AND?: InputMaybe<Array<InputMaybe<PageBottomContentAreaFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageBottomContentAreaFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  userInterface?: InputMaybe<Scalars['String']['input']>;
  userInterface_contains?: InputMaybe<Scalars['String']['input']>;
  userInterface_exists?: InputMaybe<Scalars['Boolean']['input']>;
  userInterface_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userInterface_not?: InputMaybe<Scalars['String']['input']>;
  userInterface_not_contains?: InputMaybe<Scalars['String']['input']>;
  userInterface_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PageBottomContentAreaItem = PageSectionItem | PageSectionList;

export type PageCollection = {
  __typename?: 'PageCollection';
  items: Array<Maybe<Page>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PageFilter = {
  AND?: InputMaybe<Array<InputMaybe<PageFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageFilter>>>;
  bottomContentArea?: InputMaybe<CfbottomContentAreaMultiTypeNestedFilter>;
  bottomContentAreaCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  microcopies?: InputMaybe<CfMicrocopyNestedFilter>;
  microcopiesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  path_contains?: InputMaybe<Scalars['String']['input']>;
  path_exists?: InputMaybe<Scalars['Boolean']['input']>;
  path_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  path_not?: InputMaybe<Scalars['String']['input']>;
  path_not_contains?: InputMaybe<Scalars['String']['input']>;
  path_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoDescription?: InputMaybe<Scalars['String']['input']>;
  seoDescription_contains?: InputMaybe<Scalars['String']['input']>;
  seoDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoDescription_not?: InputMaybe<Scalars['String']['input']>;
  seoDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  seoDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoTitle?: InputMaybe<Scalars['String']['input']>;
  seoTitle_contains?: InputMaybe<Scalars['String']['input']>;
  seoTitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoTitle_not?: InputMaybe<Scalars['String']['input']>;
  seoTitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  seoTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  topContentArea?: InputMaybe<CftopContentAreaMultiTypeNestedFilter>;
  topContentAreaCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PageLinkingCollections = {
  __typename?: 'PageLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  linkCollection?: Maybe<LinkCollection>;
};


export type PageLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PageLinkingCollectionsLinkCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PageLinkingCollectionsLinkCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum PageLinkingCollectionsLinkCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

export type PageMicrocopiesCollection = {
  __typename?: 'PageMicrocopiesCollection';
  items: Array<Maybe<Microcopy>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum PageMicrocopiesCollectionOrder {
  KeyAsc = 'key_ASC',
  KeyDesc = 'key_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum PageOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PathAsc = 'path_ASC',
  PathDesc = 'path_DESC',
  SeoDescriptionAsc = 'seoDescription_ASC',
  SeoDescriptionDesc = 'seoDescription_DESC',
  SeoTitleAsc = 'seoTitle_ASC',
  SeoTitleDesc = 'seoTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Page section for a single content entry [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/pageSectionItem) */
export type PageSectionItem = Entry & _Node & {
  __typename?: 'PageSectionItem';
  _id: Scalars['ID']['output'];
  content?: Maybe<PageSectionItemContent>;
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<PageSectionItemLinkingCollections>;
  sys: Sys;
  userInterface?: Maybe<Scalars['String']['output']>;
};


/** Page section for a single content entry [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/pageSectionItem) */
export type PageSectionItemContentArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PageSectionItemContentFilter>;
};


/** Page section for a single content entry [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/pageSectionItem) */
export type PageSectionItemInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Page section for a single content entry [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/pageSectionItem) */
export type PageSectionItemLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Page section for a single content entry [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/pageSectionItem) */
export type PageSectionItemUserInterfaceArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PageSectionItemCollection = {
  __typename?: 'PageSectionItemCollection';
  items: Array<Maybe<PageSectionItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PageSectionItemContent = Article | ContentItem | Document | Product;

export type PageSectionItemContentFilter = {
  AND?: InputMaybe<Array<InputMaybe<PageSectionItemContentFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageSectionItemContentFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type PageSectionItemFilter = {
  AND?: InputMaybe<Array<InputMaybe<PageSectionItemFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageSectionItemFilter>>>;
  content?: InputMaybe<CfcontentMultiTypeNestedFilter>;
  content_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  userInterface?: InputMaybe<Scalars['String']['input']>;
  userInterface_contains?: InputMaybe<Scalars['String']['input']>;
  userInterface_exists?: InputMaybe<Scalars['Boolean']['input']>;
  userInterface_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userInterface_not?: InputMaybe<Scalars['String']['input']>;
  userInterface_not_contains?: InputMaybe<Scalars['String']['input']>;
  userInterface_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PageSectionItemLinkingCollections = {
  __typename?: 'PageSectionItemLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type PageSectionItemLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PageSectionItemLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PageSectionItemLinkingCollectionsPageCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum PageSectionItemLinkingCollectionsPageCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PathAsc = 'path_ASC',
  PathDesc = 'path_DESC',
  SeoDescriptionAsc = 'seoDescription_ASC',
  SeoDescriptionDesc = 'seoDescription_DESC',
  SeoTitleAsc = 'seoTitle_ASC',
  SeoTitleDesc = 'seoTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum PageSectionItemOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UserInterfaceAsc = 'userInterface_ASC',
  UserInterfaceDesc = 'userInterface_DESC'
}

/** Page section for a list of content entries [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/pageSectionList) */
export type PageSectionList = Entry & _Node & {
  __typename?: 'PageSectionList';
  _id: Scalars['ID']['output'];
  content?: Maybe<List>;
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<PageSectionListLinkingCollections>;
  sys: Sys;
  userInterface?: Maybe<Scalars['String']['output']>;
};


/** Page section for a list of content entries [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/pageSectionList) */
export type PageSectionListContentArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ListFilter>;
};


/** Page section for a list of content entries [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/pageSectionList) */
export type PageSectionListInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Page section for a list of content entries [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/pageSectionList) */
export type PageSectionListLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Page section for a list of content entries [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/pageSectionList) */
export type PageSectionListUserInterfaceArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PageSectionListCollection = {
  __typename?: 'PageSectionListCollection';
  items: Array<Maybe<PageSectionList>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PageSectionListFilter = {
  AND?: InputMaybe<Array<InputMaybe<PageSectionListFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageSectionListFilter>>>;
  content?: InputMaybe<CfListNestedFilter>;
  content_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  userInterface?: InputMaybe<Scalars['String']['input']>;
  userInterface_contains?: InputMaybe<Scalars['String']['input']>;
  userInterface_exists?: InputMaybe<Scalars['Boolean']['input']>;
  userInterface_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userInterface_not?: InputMaybe<Scalars['String']['input']>;
  userInterface_not_contains?: InputMaybe<Scalars['String']['input']>;
  userInterface_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PageSectionListLinkingCollections = {
  __typename?: 'PageSectionListLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type PageSectionListLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PageSectionListLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PageSectionListLinkingCollectionsPageCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum PageSectionListLinkingCollectionsPageCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PathAsc = 'path_ASC',
  PathDesc = 'path_DESC',
  SeoDescriptionAsc = 'seoDescription_ASC',
  SeoDescriptionDesc = 'seoDescription_DESC',
  SeoTitleAsc = 'seoTitle_ASC',
  SeoTitleDesc = 'seoTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum PageSectionListOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UserInterfaceAsc = 'userInterface_ASC',
  UserInterfaceDesc = 'userInterface_DESC'
}

export type PageTopContentAreaCollection = {
  __typename?: 'PageTopContentAreaCollection';
  items: Array<Maybe<PageTopContentAreaItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PageTopContentAreaFilter = {
  AND?: InputMaybe<Array<InputMaybe<PageTopContentAreaFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageTopContentAreaFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  userInterface?: InputMaybe<Scalars['String']['input']>;
  userInterface_contains?: InputMaybe<Scalars['String']['input']>;
  userInterface_exists?: InputMaybe<Scalars['Boolean']['input']>;
  userInterface_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userInterface_not?: InputMaybe<Scalars['String']['input']>;
  userInterface_not_contains?: InputMaybe<Scalars['String']['input']>;
  userInterface_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PageTopContentAreaItem = PageSectionItem | PageSectionList;

/** Product information with images, videos and specifications [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/product) */
export type Product = Entry & _Node & {
  __typename?: 'Product';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  detailedDescription?: Maybe<ProductDetailedDescription>;
  imagesCollection?: Maybe<ProductImagesCollection>;
  inStock?: Maybe<Scalars['Boolean']['output']>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ProductLinkingCollections>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  videosCollection?: Maybe<ProductVideosCollection>;
};


/** Product information with images, videos and specifications [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/product) */
export type ProductDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Product information with images, videos and specifications [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/product) */
export type ProductDetailedDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Product information with images, videos and specifications [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/product) */
export type ProductImagesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ProductImagesCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ImageFilter>;
};


/** Product information with images, videos and specifications [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/product) */
export type ProductInStockArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Product information with images, videos and specifications [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/product) */
export type ProductInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Product information with images, videos and specifications [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/product) */
export type ProductLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Product information with images, videos and specifications [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/product) */
export type ProductNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Product information with images, videos and specifications [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/product) */
export type ProductPriceArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Product information with images, videos and specifications [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/product) */
export type ProductSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Product information with images, videos and specifications [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/product) */
export type ProductVideosCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ProductVideosCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<VideoFilter>;
};

export type ProductCollection = {
  __typename?: 'ProductCollection';
  items: Array<Maybe<Product>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ProductDetailedDescription = {
  __typename?: 'ProductDetailedDescription';
  json: Scalars['JSON']['output'];
  links: ProductDetailedDescriptionLinks;
};

export type ProductDetailedDescriptionAssets = {
  __typename?: 'ProductDetailedDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type ProductDetailedDescriptionEntries = {
  __typename?: 'ProductDetailedDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type ProductDetailedDescriptionLinks = {
  __typename?: 'ProductDetailedDescriptionLinks';
  assets: ProductDetailedDescriptionAssets;
  entries: ProductDetailedDescriptionEntries;
  resources: ProductDetailedDescriptionResources;
};

export type ProductDetailedDescriptionResources = {
  __typename?: 'ProductDetailedDescriptionResources';
  block: Array<ProductDetailedDescriptionResourcesBlock>;
  hyperlink: Array<ProductDetailedDescriptionResourcesHyperlink>;
  inline: Array<ProductDetailedDescriptionResourcesInline>;
};

export type ProductDetailedDescriptionResourcesBlock = ResourceLink & {
  __typename?: 'ProductDetailedDescriptionResourcesBlock';
  sys: ResourceSys;
};

export type ProductDetailedDescriptionResourcesHyperlink = ResourceLink & {
  __typename?: 'ProductDetailedDescriptionResourcesHyperlink';
  sys: ResourceSys;
};

export type ProductDetailedDescriptionResourcesInline = ResourceLink & {
  __typename?: 'ProductDetailedDescriptionResourcesInline';
  sys: ResourceSys;
};

export type ProductFilter = {
  AND?: InputMaybe<Array<InputMaybe<ProductFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ProductFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  detailedDescription_contains?: InputMaybe<Scalars['String']['input']>;
  detailedDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  detailedDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<CfImageNestedFilter>;
  imagesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  inStock?: InputMaybe<Scalars['Boolean']['input']>;
  inStock_exists?: InputMaybe<Scalars['Boolean']['input']>;
  inStock_not?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_exists?: InputMaybe<Scalars['Boolean']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  price_exists?: InputMaybe<Scalars['Boolean']['input']>;
  price_gt?: InputMaybe<Scalars['Float']['input']>;
  price_gte?: InputMaybe<Scalars['Float']['input']>;
  price_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  price_lt?: InputMaybe<Scalars['Float']['input']>;
  price_lte?: InputMaybe<Scalars['Float']['input']>;
  price_not?: InputMaybe<Scalars['Float']['input']>;
  price_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  videos?: InputMaybe<CfVideoNestedFilter>;
  videosCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProductImagesCollection = {
  __typename?: 'ProductImagesCollection';
  items: Array<Maybe<Image>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum ProductImagesCollectionOrder {
  AlternativeTextAsc = 'alternativeText_ASC',
  AlternativeTextDesc = 'alternativeText_DESC',
  CaptionAsc = 'caption_ASC',
  CaptionDesc = 'caption_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ProductLinkingCollections = {
  __typename?: 'ProductLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  listCollection?: Maybe<ListCollection>;
  pageSectionItemCollection?: Maybe<PageSectionItemCollection>;
};


export type ProductLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ProductLinkingCollectionsListCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ProductLinkingCollectionsListCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ProductLinkingCollectionsPageSectionItemCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ProductLinkingCollectionsPageSectionItemCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ProductLinkingCollectionsListCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ProductLinkingCollectionsPageSectionItemCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UserInterfaceAsc = 'userInterface_ASC',
  UserInterfaceDesc = 'userInterface_DESC'
}

export enum ProductOrder {
  InStockAsc = 'inStock_ASC',
  InStockDesc = 'inStock_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PriceAsc = 'price_ASC',
  PriceDesc = 'price_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ProductVideosCollection = {
  __typename?: 'ProductVideosCollection';
  items: Array<Maybe<Video>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum ProductVideosCollectionOrder {
  CaptionAsc = 'caption_ASC',
  CaptionDesc = 'caption_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Query = {
  __typename?: 'Query';
  _node?: Maybe<_Node>;
  _nodes: Array<Maybe<_Node>>;
  article?: Maybe<Article>;
  articleCollection?: Maybe<ArticleCollection>;
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  config?: Maybe<Config>;
  configCollection?: Maybe<ConfigCollection>;
  contentItem?: Maybe<ContentItem>;
  contentItemCollection?: Maybe<ContentItemCollection>;
  document?: Maybe<Document>;
  documentCollection?: Maybe<DocumentCollection>;
  entryCollection?: Maybe<EntryCollection>;
  image?: Maybe<Image>;
  imageCollection?: Maybe<ImageCollection>;
  layout?: Maybe<Layout>;
  layoutCollection?: Maybe<LayoutCollection>;
  link?: Maybe<Link>;
  linkCollection?: Maybe<LinkCollection>;
  list?: Maybe<List>;
  listCollection?: Maybe<ListCollection>;
  microcopy?: Maybe<Microcopy>;
  microcopyCollection?: Maybe<MicrocopyCollection>;
  migrations?: Maybe<Migrations>;
  migrationsCollection?: Maybe<MigrationsCollection>;
  page?: Maybe<Page>;
  pageCollection?: Maybe<PageCollection>;
  pageSectionItem?: Maybe<PageSectionItem>;
  pageSectionItemCollection?: Maybe<PageSectionItemCollection>;
  pageSectionList?: Maybe<PageSectionList>;
  pageSectionListCollection?: Maybe<PageSectionListCollection>;
  product?: Maybe<Product>;
  productCollection?: Maybe<ProductCollection>;
  video?: Maybe<Video>;
  videoCollection?: Maybe<VideoCollection>;
};


export type Query_NodeArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type Query_NodesArgs = {
  ids: Array<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryArticleArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryArticleCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ArticleOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ArticleFilter>;
};


export type QueryAssetArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<AssetFilter>;
};


export type QueryConfigArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryConfigCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ConfigOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ConfigFilter>;
};


export type QueryContentItemArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryContentItemCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentItemOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ContentItemFilter>;
};


export type QueryDocumentArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryDocumentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<DocumentOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<DocumentFilter>;
};


export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<EntryFilter>;
};


export type QueryImageArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImageOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ImageFilter>;
};


export type QueryLayoutArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryLayoutCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LayoutOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LayoutFilter>;
};


export type QueryLinkArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryLinkCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LinkOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LinkFilter>;
};


export type QueryListArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryListCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ListOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ListFilter>;
};


export type QueryMicrocopyArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryMicrocopyCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<MicrocopyOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<MicrocopyFilter>;
};


export type QueryMigrationsArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryMigrationsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<MigrationsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<MigrationsFilter>;
};


export type QueryPageArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PageOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PageFilter>;
};


export type QueryPageSectionItemArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPageSectionItemCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PageSectionItemOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PageSectionItemFilter>;
};


export type QueryPageSectionListArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPageSectionListCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PageSectionListOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PageSectionListFilter>;
};


export type QueryProductArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryProductCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ProductOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ProductFilter>;
};


export type QueryVideoArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryVideoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<VideoOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<VideoFilter>;
};

export type ResourceLink = {
  sys: ResourceSys;
};

export type ResourceSys = {
  __typename?: 'ResourceSys';
  linkType: Scalars['String']['output'];
  urn: Scalars['String']['output'];
};

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  /** The locale that was requested. */
  locale?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  publishedVersion?: Maybe<Scalars['Int']['output']>;
  spaceId: Scalars['String']['output'];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_exists?: InputMaybe<Scalars['Boolean']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedVersion?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  publishedVersion_lt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

/**
 * Represents a taxonomy concept entity for finding and organizing content easily.
 *         Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-concepts
 */
export type TaxonomyConcept = {
  __typename?: 'TaxonomyConcept';
  id?: Maybe<Scalars['String']['output']>;
};

export type TimelineFilterInput = {
  /** Preview content starting from a given release date */
  release_lte?: InputMaybe<Scalars['String']['input']>;
  /** Preview content starting from a given timestamp */
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Video content sections for page layouts [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/video) */
export type Video = Entry & _Node & {
  __typename?: 'Video';
  _id: Scalars['ID']['output'];
  caption?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<VideoLinkingCollections>;
  sys: Sys;
  video?: Maybe<Asset>;
};


/** Video content sections for page layouts [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/video) */
export type VideoCaptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Video content sections for page layouts [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/video) */
export type VideoInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Video content sections for page layouts [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/video) */
export type VideoLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Video content sections for page layouts [See type definition](https://app.contentful.com/spaces/b8owvpy209qu/content_types/video) */
export type VideoVideoArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VideoCollection = {
  __typename?: 'VideoCollection';
  items: Array<Maybe<Video>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type VideoFilter = {
  AND?: InputMaybe<Array<InputMaybe<VideoFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<VideoFilter>>>;
  caption?: InputMaybe<Scalars['String']['input']>;
  caption_contains?: InputMaybe<Scalars['String']['input']>;
  caption_exists?: InputMaybe<Scalars['Boolean']['input']>;
  caption_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  caption_not?: InputMaybe<Scalars['String']['input']>;
  caption_not_contains?: InputMaybe<Scalars['String']['input']>;
  caption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  video_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VideoLinkingCollections = {
  __typename?: 'VideoLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  productCollection?: Maybe<ProductCollection>;
};


export type VideoLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type VideoLinkingCollectionsProductCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<VideoLinkingCollectionsProductCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum VideoLinkingCollectionsProductCollectionOrder {
  InStockAsc = 'inStock_ASC',
  InStockDesc = 'inStock_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PriceAsc = 'price_ASC',
  PriceDesc = 'price_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum VideoOrder {
  CaptionAsc = 'caption_ASC',
  CaptionDesc = 'caption_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type _Node = {
  _id: Scalars['ID']['output'];
};

export type CfImageNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfImageNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfImageNestedFilter>>>;
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  alternativeText_contains?: InputMaybe<Scalars['String']['input']>;
  alternativeText_exists?: InputMaybe<Scalars['Boolean']['input']>;
  alternativeText_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  alternativeText_not?: InputMaybe<Scalars['String']['input']>;
  alternativeText_not_contains?: InputMaybe<Scalars['String']['input']>;
  alternativeText_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  caption?: InputMaybe<Scalars['String']['input']>;
  caption_contains?: InputMaybe<Scalars['String']['input']>;
  caption_exists?: InputMaybe<Scalars['Boolean']['input']>;
  caption_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  caption_not?: InputMaybe<Scalars['String']['input']>;
  caption_not_contains?: InputMaybe<Scalars['String']['input']>;
  caption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  image_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type CfLinkNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfLinkNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfLinkNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  text?: InputMaybe<Scalars['String']['input']>;
  text_contains?: InputMaybe<Scalars['String']['input']>;
  text_exists?: InputMaybe<Scalars['Boolean']['input']>;
  text_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text_not?: InputMaybe<Scalars['String']['input']>;
  text_not_contains?: InputMaybe<Scalars['String']['input']>;
  text_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfListNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfListNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfListNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  entriesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type CfMicrocopyNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfMicrocopyNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfMicrocopyNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  key?: InputMaybe<Scalars['String']['input']>;
  key_contains?: InputMaybe<Scalars['String']['input']>;
  key_exists?: InputMaybe<Scalars['Boolean']['input']>;
  key_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  key_not?: InputMaybe<Scalars['String']['input']>;
  key_not_contains?: InputMaybe<Scalars['String']['input']>;
  key_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  value?: InputMaybe<Scalars['String']['input']>;
  value_contains?: InputMaybe<Scalars['String']['input']>;
  value_exists?: InputMaybe<Scalars['Boolean']['input']>;
  value_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  value_not?: InputMaybe<Scalars['String']['input']>;
  value_not_contains?: InputMaybe<Scalars['String']['input']>;
  value_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfPageNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfPageNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfPageNestedFilter>>>;
  bottomContentAreaCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  microcopiesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  path_contains?: InputMaybe<Scalars['String']['input']>;
  path_exists?: InputMaybe<Scalars['Boolean']['input']>;
  path_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  path_not?: InputMaybe<Scalars['String']['input']>;
  path_not_contains?: InputMaybe<Scalars['String']['input']>;
  path_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoDescription?: InputMaybe<Scalars['String']['input']>;
  seoDescription_contains?: InputMaybe<Scalars['String']['input']>;
  seoDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoDescription_not?: InputMaybe<Scalars['String']['input']>;
  seoDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  seoDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoTitle?: InputMaybe<Scalars['String']['input']>;
  seoTitle_contains?: InputMaybe<Scalars['String']['input']>;
  seoTitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoTitle_not?: InputMaybe<Scalars['String']['input']>;
  seoTitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  seoTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  topContentAreaCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CfVideoNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfVideoNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfVideoNestedFilter>>>;
  caption?: InputMaybe<Scalars['String']['input']>;
  caption_contains?: InputMaybe<Scalars['String']['input']>;
  caption_exists?: InputMaybe<Scalars['Boolean']['input']>;
  caption_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  caption_not?: InputMaybe<Scalars['String']['input']>;
  caption_not_contains?: InputMaybe<Scalars['String']['input']>;
  caption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  video_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CfbottomContentAreaMultiTypeNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfbottomContentAreaMultiTypeNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfbottomContentAreaMultiTypeNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  userInterface?: InputMaybe<Scalars['String']['input']>;
  userInterface_contains?: InputMaybe<Scalars['String']['input']>;
  userInterface_exists?: InputMaybe<Scalars['Boolean']['input']>;
  userInterface_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userInterface_not?: InputMaybe<Scalars['String']['input']>;
  userInterface_not_contains?: InputMaybe<Scalars['String']['input']>;
  userInterface_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfcontentMultiTypeNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfcontentMultiTypeNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfcontentMultiTypeNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type CfentriesMultiTypeNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfentriesMultiTypeNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfentriesMultiTypeNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type CftopContentAreaMultiTypeNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CftopContentAreaMultiTypeNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CftopContentAreaMultiTypeNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  userInterface?: InputMaybe<Scalars['String']['input']>;
  userInterface_contains?: InputMaybe<Scalars['String']['input']>;
  userInterface_exists?: InputMaybe<Scalars['Boolean']['input']>;
  userInterface_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userInterface_not?: InputMaybe<Scalars['String']['input']>;
  userInterface_not_contains?: InputMaybe<Scalars['String']['input']>;
  userInterface_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ConfigFragment = { __typename: 'Config', _id: string, slugProductListingPage?: string | null, slugProductDetailPage?: string | null, sys: { __typename?: 'Sys', id: string } };

export type ConfigQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type ConfigQuery = { __typename?: 'Query', configCollection?: { __typename?: 'ConfigCollection', items: Array<{ __typename: 'Config', _id: string, slugProductListingPage?: string | null, slugProductDetailPage?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null };

export type PageSectionItemFragment = { __typename: 'PageSectionItem', _id: string, internalName?: string | null, userInterface?: string | null, sys: { __typename?: 'Sys', id: string }, content?:
    | { __typename: 'Article', title?: string | null, excerpt?: string | null, sys: { __typename?: 'Sys', id: string }, featuredImage?: { __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null } | null }
    | { __typename?: 'ContentItem' }
    | { __typename?: 'Document' }
    | { __typename: 'Product', slug?: string | null, name?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string }, imagesCollection?: { __typename?: 'ProductImagesCollection', items: Array<{ __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null } | null> } | null }
   | null };

export type PageSectionListFragment = { __typename: 'PageSectionList', _id: string, internalName?: string | null, userInterface?: string | null, sys: { __typename?: 'Sys', id: string }, content?: { __typename: 'List', sys: { __typename?: 'Sys', id: string }, entriesCollection?: { __typename?: 'ListEntriesCollection', items: Array<
        | { __typename?: 'Article' }
        | { __typename?: 'ContentItem' }
        | { __typename?: 'Document' }
        | { __typename: 'Product', slug?: string | null, name?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string }, imagesCollection?: { __typename?: 'ProductImagesCollection', items: Array<{ __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null } | null> } | null }
       | null> } | null } | null };

export type PageByPathQueryVariables = Exact<{
  path: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type PageByPathQuery = { __typename?: 'Query', pageCollection?: { __typename?: 'PageCollection', items: Array<{ __typename: 'Page', _id: string, internalName?: string | null, path?: string | null, seoTitle?: string | null, seoDescription?: string | null, sys: { __typename?: 'Sys', locale?: string | null, id: string }, topContentAreaCollection?: { __typename?: 'PageTopContentAreaCollection', items: Array<
          | { __typename: 'PageSectionItem', _id: string, internalName?: string | null, userInterface?: string | null, sys: { __typename?: 'Sys', id: string }, content?:
              | { __typename: 'Article', title?: string | null, excerpt?: string | null, sys: { __typename?: 'Sys', id: string }, featuredImage?: { __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null } | null }
              | { __typename?: 'ContentItem' }
              | { __typename?: 'Document' }
              | { __typename: 'Product', slug?: string | null, name?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string }, imagesCollection?: { __typename?: 'ProductImagesCollection', items: Array<{ __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null } | null> } | null }
             | null }
          | { __typename: 'PageSectionList', _id: string, internalName?: string | null, userInterface?: string | null, sys: { __typename?: 'Sys', id: string }, content?: { __typename: 'List', sys: { __typename?: 'Sys', id: string }, entriesCollection?: { __typename?: 'ListEntriesCollection', items: Array<
                  | { __typename?: 'Article' }
                  | { __typename?: 'ContentItem' }
                  | { __typename?: 'Document' }
                  | { __typename: 'Product', slug?: string | null, name?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string }, imagesCollection?: { __typename?: 'ProductImagesCollection', items: Array<{ __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null } | null> } | null }
                 | null> } | null } | null }
         | null> } | null, bottomContentAreaCollection?: { __typename?: 'PageBottomContentAreaCollection', items: Array<
          | { __typename: 'PageSectionItem', _id: string, internalName?: string | null, userInterface?: string | null, sys: { __typename?: 'Sys', id: string }, content?:
              | { __typename: 'Article', title?: string | null, excerpt?: string | null, sys: { __typename?: 'Sys', id: string }, featuredImage?: { __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null } | null }
              | { __typename?: 'ContentItem' }
              | { __typename?: 'Document' }
              | { __typename: 'Product', slug?: string | null, name?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string }, imagesCollection?: { __typename?: 'ProductImagesCollection', items: Array<{ __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null } | null> } | null }
             | null }
          | { __typename: 'PageSectionList', _id: string, internalName?: string | null, userInterface?: string | null, sys: { __typename?: 'Sys', id: string }, content?: { __typename: 'List', sys: { __typename?: 'Sys', id: string }, entriesCollection?: { __typename?: 'ListEntriesCollection', items: Array<
                  | { __typename?: 'Article' }
                  | { __typename?: 'ContentItem' }
                  | { __typename?: 'Document' }
                  | { __typename: 'Product', slug?: string | null, name?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string }, imagesCollection?: { __typename?: 'ProductImagesCollection', items: Array<{ __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null } | null> } | null }
                 | null> } | null } | null }
         | null> } | null } | null> } | null };

export type PageFragment = { __typename: 'Page', internalName?: string | null, path?: string | null, seoTitle?: string | null, seoDescription?: string | null, sys: { __typename?: 'Sys', locale?: string | null, id: string }, topContentAreaCollection?: { __typename?: 'PageTopContentAreaCollection', items: Array<
      | { __typename: 'PageSectionItem', _id: string, internalName?: string | null, userInterface?: string | null, sys: { __typename?: 'Sys', id: string }, content?:
          | { __typename: 'Article', title?: string | null, excerpt?: string | null, sys: { __typename?: 'Sys', id: string }, featuredImage?: { __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null } | null }
          | { __typename?: 'ContentItem' }
          | { __typename?: 'Document' }
          | { __typename: 'Product', slug?: string | null, name?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string }, imagesCollection?: { __typename?: 'ProductImagesCollection', items: Array<{ __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null } | null> } | null }
         | null }
      | { __typename: 'PageSectionList', _id: string, internalName?: string | null, userInterface?: string | null, sys: { __typename?: 'Sys', id: string }, content?: { __typename: 'List', sys: { __typename?: 'Sys', id: string }, entriesCollection?: { __typename?: 'ListEntriesCollection', items: Array<
              | { __typename?: 'Article' }
              | { __typename?: 'ContentItem' }
              | { __typename?: 'Document' }
              | { __typename: 'Product', slug?: string | null, name?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string }, imagesCollection?: { __typename?: 'ProductImagesCollection', items: Array<{ __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null } | null> } | null }
             | null> } | null } | null }
     | null> } | null, bottomContentAreaCollection?: { __typename?: 'PageBottomContentAreaCollection', items: Array<
      | { __typename: 'PageSectionItem', _id: string, internalName?: string | null, userInterface?: string | null, sys: { __typename?: 'Sys', id: string }, content?:
          | { __typename: 'Article', title?: string | null, excerpt?: string | null, sys: { __typename?: 'Sys', id: string }, featuredImage?: { __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null } | null }
          | { __typename?: 'ContentItem' }
          | { __typename?: 'Document' }
          | { __typename: 'Product', slug?: string | null, name?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string }, imagesCollection?: { __typename?: 'ProductImagesCollection', items: Array<{ __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null } | null> } | null }
         | null }
      | { __typename: 'PageSectionList', _id: string, internalName?: string | null, userInterface?: string | null, sys: { __typename?: 'Sys', id: string }, content?: { __typename: 'List', sys: { __typename?: 'Sys', id: string }, entriesCollection?: { __typename?: 'ListEntriesCollection', items: Array<
              | { __typename?: 'Article' }
              | { __typename?: 'ContentItem' }
              | { __typename?: 'Document' }
              | { __typename: 'Product', slug?: string | null, name?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string }, imagesCollection?: { __typename?: 'ProductImagesCollection', items: Array<{ __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null } | null> } | null }
             | null> } | null } | null }
     | null> } | null };

export type ImageFragment = { __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null };

export type LinkFragment = { __typename?: 'Link', text?: string | null, url?: string | null, page?: { __typename?: 'Page', path?: string | null } | null };

export type ListFragment = { __typename: 'List', sys: { __typename?: 'Sys', id: string }, entriesCollection?: { __typename?: 'ListEntriesCollection', items: Array<
      | { __typename?: 'Article' }
      | { __typename?: 'ContentItem' }
      | { __typename?: 'Document' }
      | { __typename: 'Product', slug?: string | null, name?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string }, imagesCollection?: { __typename?: 'ProductImagesCollection', items: Array<{ __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null } | null> } | null }
     | null> } | null };

export type ArticleFragment = { __typename: 'Article', title?: string | null, excerpt?: string | null, sys: { __typename?: 'Sys', id: string }, featuredImage?: { __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null } | null };

export type ContentItemFragment = { __typename: 'ContentItem', _id: string, title?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string } };

export type ProductFragment = { __typename: 'Product', slug?: string | null, name?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string }, imagesCollection?: { __typename?: 'ProductImagesCollection', items: Array<{ __typename?: 'Image', alternativeText?: string | null, caption?: string | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null } | null> } | null };

export const ConfigFragmentDoc = gql`
    fragment Config on Config {
  __typename
  _id
  sys {
    id
  }
  slugProductListingPage
  slugProductDetailPage
}
    `;
export const ImageFragmentDoc = gql`
    fragment Image on Image {
  alternativeText
  caption
  image {
    url
    title
    width
    height
  }
}
    `;
export const ArticleFragmentDoc = gql`
    fragment Article on Article {
  __typename
  sys {
    id
  }
  title
  excerpt
  featuredImage {
    ...Image
  }
}
    ${ImageFragmentDoc}`;
export const ProductFragmentDoc = gql`
    fragment Product on Product {
  __typename
  sys {
    id
  }
  slug
  name
  description
  imagesCollection(limit: 5) {
    items {
      ...Image
    }
  }
}
    ${ImageFragmentDoc}`;
export const PageSectionItemFragmentDoc = gql`
    fragment PageSectionItem on PageSectionItem {
  __typename
  _id
  sys {
    id
  }
  internalName
  userInterface
  content {
    ... on Article {
      ...Article
    }
    ... on Product {
      ...Product
    }
  }
}
    ${ArticleFragmentDoc}
${ProductFragmentDoc}`;
export const ListFragmentDoc = gql`
    fragment List on List {
  __typename
  sys {
    id
  }
  entriesCollection(limit: 10) {
    items {
      ... on Product {
        ...Product
      }
    }
  }
}
    ${ProductFragmentDoc}`;
export const PageSectionListFragmentDoc = gql`
    fragment PageSectionList on PageSectionList {
  __typename
  _id
  sys {
    id
  }
  internalName
  userInterface
  content {
    ... on List {
      ...List
    }
  }
}
    ${ListFragmentDoc}`;
export const PageFragmentDoc = gql`
    fragment Page on Page {
  __typename
  sys {
    locale
    id
  }
  internalName
  path
  seoTitle
  seoDescription
  topContentAreaCollection(limit: 20) {
    items {
      __typename
      ... on PageSectionItem {
        ...PageSectionItem
      }
      ... on PageSectionList {
        ...PageSectionList
      }
    }
  }
  bottomContentAreaCollection(limit: 20) {
    items {
      __typename
      ... on PageSectionItem {
        ...PageSectionItem
      }
      ... on PageSectionList {
        ...PageSectionList
      }
    }
  }
}
    ${PageSectionItemFragmentDoc}
${PageSectionListFragmentDoc}`;
export const LinkFragmentDoc = gql`
    fragment Link on Link {
  text
  url
  page {
    path
  }
}
    `;
export const ContentItemFragmentDoc = gql`
    fragment ContentItem on ContentItem {
  __typename
  _id
  sys {
    id
  }
  title
  description
}
    `;
export const ConfigDocument = gql`
    query config($locale: String, $preview: Boolean) {
  configCollection(limit: 1, preview: $preview, locale: $locale) {
    items {
      ...Config
    }
  }
}
    ${ConfigFragmentDoc}`;
export const PageByPathDocument = gql`
    query pageByPath($path: String!, $locale: String, $preview: Boolean) {
  pageCollection(
    limit: 1
    locale: $locale
    preview: $preview
    where: {path: $path}
  ) {
    items {
      _id
      ...Page
    }
  }
}
    ${PageFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();
const ConfigDocumentString = print(ConfigDocument);
const PageByPathDocumentString = print(PageByPathDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    config(variables?: ConfigQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: ConfigQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<ConfigQuery>(ConfigDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'config', 'query', variables);
    },
    pageByPath(variables: PageByPathQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: PageByPathQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<PageByPathQuery>(PageByPathDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'pageByPath', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;