---
description: 'Instructions for building Contentful blocks with live updates and inspector mode'
applyTo: '**'
---

# Contentful Blocks Development

This guide covers how to build UI blocks and their corresponding Contentful adapters with full support for **live updates** and **inspector mode** in the Contentful preview environment.

## Architecture Overview

The architecture consists of three layers:

1. **UI Blocks** (`packages/ui/src/blocks/`) - Pure, CMS-agnostic presentational components
2. **Adapters** (`apps/web-contentful/src/services/contentful/assemblies/`) - Transform Contentful data to UI props
3. **Live Preview** - Real-time content updates via `useContentfulLiveUpdates` hook

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Contentful CMS                               │
│  (Content entries with sys.id, fields like title, description)      │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Adapter Layer (web-contentful)                    │
│  - Transforms Contentful data to UI props                           │
│  - Adds data-contentful-entry-id & data-contentful-field-id         │
│  - Returns TextProps { text, data } and ImageProps { src, alt, data }│
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      UI Blocks (packages/ui)                         │
│  - CMS-agnostic, pure presentational components                     │
│  - Uses Text, Image components from packages/ui/src/components      │
│  - Spreads data props onto elements for inspector mode              │
└─────────────────────────────────────────────────────────────────────┘
```

## Props Pattern for Live Updates & Inspector Mode

### TextProps Structure

All text content must use the `TextProps` structure to support inspector mode:

```typescript
type TextProps = {
  text: string;
  data?: Record<string, unknown>;
};
```

### ImageProps Structure

All images must use the `ImageProps` structure:

```typescript
type ImageProps = {
  src: string;
  alt: string;
  data?: Record<string, unknown>;
};
```

### Why This Pattern?

- **`text`/`src`**: The actual content value
- **`data`**: Contains `data-contentful-entry-id` and `data-contentful-field-id` attributes
- When spread onto elements, these attributes enable Contentful's inspector mode (blue edit buttons)

## Building UI Blocks (packages/ui)

### Required Components

**ALWAYS** use components from `packages/ui/src/components/` instead of native HTML elements:

| Instead of | Use |
|------------|-----|
| `<h1>`, `<h2>`, `<h3>`, `<h4>` | `<Text variant="h1">`, `<Text variant="h2">`, etc. |
| `<p>` | `<Text variant="body-md">` |
| `<img>` | `<Image>` component |

### Text Component Usage

The `Text` component from `packages/ui/src/components/text/text.tsx` supports:

```typescript
import { Text } from "../../components/text/text";

// Variants available:
// - "h1" - Main heading
// - "h2" - Section heading
// - "h3" - Subsection heading
// - "h4" - Minor heading
// - "body-md" - Body text (default)

<Text variant="h1" {...props.title.data}>
  {props.title.text}
</Text>

<Text variant="body-md" {...props.description.data}>
  {props.description.text}
</Text>
```

### Image Component Usage

The `Image` component from `packages/ui/src/components/image/image.tsx` supports:

```typescript
import { Image } from "../../components/image/image";

// Standard size mode
<Image
  src={props.image.src}
  alt={props.image.alt}
  width={1280}
  height={720}
  className="h-full w-full object-cover"
  {...props.image.data}
/>

// Fill mode with aspect ratio
<Image
  src={props.image.src}
  alt={props.image.alt}
  fill
  aspectRatio="16:9"
  objectFit="cover"
  {...props.image.data}
/>
```

### Block Structure

```
packages/ui/src/blocks/
└── feature-example/
    ├── feature-example.tsx        # Main component
    ├── feature-example.mocks.ts   # Mock data for Storybook
    ├── feature-example.stories.tsx # Storybook stories
    ├── feature-example.test.tsx   # Unit tests
    └── images/                    # Local images (if needed)
```

### Example UI Block

```typescript
// packages/ui/src/blocks/feature-example/feature-example.tsx
"use client";

import type { ReactNode } from "react";
import { Image } from "../../components/image/image";
import { Text } from "../../components/text/text";

type TextProps = {
  text: string;
  data?: Record<string, unknown>;
};

type ImageProps = {
  src: string;
  alt: string;
  data?: Record<string, unknown>;
};

export type FeatureExampleProps = {
  title: TextProps;
  description?: TextProps;
  image?: ImageProps;
  ctaText?: string;
  ctaUrl?: string;
};

export function FeatureExample(props: FeatureExampleProps): ReactNode {
  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-4">
        {/* Title - spread data for inspector mode */}
        <Text variant="h2" {...props.title.data}>
          {props.title.text}
        </Text>

        {/* Description - conditionally render with data spread */}
        {props.description && (
          <Text variant="body-md" {...props.description.data}>
            {props.description.text}
          </Text>
        )}

        {/* Image - wrapper div gets data attributes for inspector */}
        {props.image && (
          <div {...props.image.data}>
            <Image
              src={props.image.src}
              alt={props.image.alt}
              width={1280}
              height={720}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* CTA - no inspector mode needed for static strings */}
        {props.ctaText && props.ctaUrl && (
          <a href={props.ctaUrl}>{props.ctaText}</a>
        )}
      </div>
    </section>
  );
}
```

### Key Rules for UI Blocks

1. **Use `Text` component** for all text content (headings and paragraphs)
2. **Use `Image` component** for all images
3. **Spread `data` props** onto elements to enable inspector mode: `{...props.title.data}`
4. **Keep blocks CMS-agnostic** - no Contentful-specific code in UI blocks
5. **Define local `TextProps` and `ImageProps`** types in each block file
6. **Use `"use client"`** directive for blocks that use the Image component

## Building Adapters (web-contentful)

Adapters transform Contentful data into the UI block props format, adding inspector mode attributes.

### Adapter Structure

```
apps/web-contentful/src/services/contentful/assemblies/
└── page-section-item/
    ├── page-section-item.adapter.tsx       # Main adapter router
    ├── page-section-item.adapter.types.ts  # Shared types
    └── adapters/
        ├── article.adapter.tsx             # Article content type
        ├── product.adapter.tsx             # Product content type
        └── document.adapter.tsx            # Document content type
```

### Types File

```typescript
// page-section-item.adapter.types.ts
type TextProps = {
  text: string;
  data?: Record<string, unknown>;
};

type ImageProps = {
  src: string;
  alt: string;
  data?: Record<string, unknown>;
};

export type PageSectionItemAdapterResult = {
  title: TextProps;
  description?: TextProps;
  image?: ImageProps;
  ctaText?: string;
  ctaUrl?: string;
} | null;
```

### Example Adapter

```typescript
// adapters/article.adapter.tsx
import type { Article } from "../../../generated/contentful-sdk.generated";

export function articleAdapter(content: Article) {
  // Get the entry ID for inspector mode
  const contentEntryId = content.sys?.id;
  const featuredImage = content.featuredImage;

  return {
    // Text field with inspector attributes
    title: {
      text: content.title ?? "",
      data: {
        "data-contentful-entry-id": contentEntryId,
        "data-contentful-field-id": "title",  // Must match Contentful field ID
      },
    },

    // Optional text field
    description: content.excerpt
      ? {
          text: content.excerpt,
          data: {
            "data-contentful-entry-id": contentEntryId,
            "data-contentful-field-id": "excerpt",
          },
        }
      : undefined,

    // Image field with inspector attributes
    image: featuredImage?.image?.url
      ? {
          src: featuredImage.image.url,
          alt: featuredImage?.alternativeText || featuredImage?.image?.title || "",
          data: {
            "data-contentful-entry-id": contentEntryId,
            "data-contentful-field-id": "featuredImage",
          },
        }
      : undefined,

    // Static values (no inspector mode)
    ctaText: undefined,
    ctaUrl: undefined,
  };
}
```

### Main Adapter Router

```typescript
// page-section-item.adapter.tsx
import type { PageSectionItem } from "../../generated/contentful-sdk.generated";
import { articleAdapter } from "./adapters/article.adapter";
import { productAdapter } from "./adapters/product.adapter";
import type { PageSectionItemAdapterResult } from "./page-section-item.adapter.types";

export function pageSectionItemAdapter(
  props: PageSectionItem
): PageSectionItemAdapterResult {
  const content = props.content;

  if (!content) {
    return null;
  }

  switch (content.__typename) {
    case "Article":
      return articleAdapter(content);
    case "Product":
      return productAdapter(content);
    default:
      return null;
  }
}
```

### Key Rules for Adapters

1. **Always include `data-contentful-entry-id`** from `content.sys.id`
2. **Always include `data-contentful-field-id`** matching the Contentful field API name
3. **Return `TextProps` format** for all text: `{ text: string, data: { ... } }`
4. **Return `ImageProps` format** for images: `{ src: string, alt: string, data: { ... } }`
5. **Handle optional fields** by returning `undefined` if the field is empty
6. **Split complex adapters** into separate files per content type

## Live Preview Setup

### Page-Level Live Updates

Live updates are handled at the page level using `useContentfulLiveUpdates`:

```typescript
// content-page-live-preview.tsx
"use client";

import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

export function ContentPageLivePreview(props: ContentPageLivePreviewProps) {
  // This hook automatically updates the page when content changes in Contentful
  const updatedPage = useContentfulLiveUpdates(props.page);

  return (
    <ContentArea items={updatedPage.topContentAreaCollection?.items} />
  );
}
```

### Provider Configuration

The `ContentfulPreviewProvider` wraps pages in draft mode:

```typescript
// contentful-preview-provider.tsx
"use client";

import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";

export function ContentfulPreviewProvider(props: ContentfulPreviewProviderProps) {
  return (
    <ContentfulLivePreviewProvider
      debugMode                    // Shows debug info in console
      enableInspectorMode          // Enables blue edit buttons
      enableLiveUpdates            // Enables real-time content updates
      locale={props.locale}
      targetOrigin="https://app.contentful.com"
    >
      {props.children}
    </ContentfulLivePreviewProvider>
  );
}
```

### GraphQL Requirements

For live updates to work, your GraphQL queries must include `__typename`:

```graphql
fragment Page on Page {
  __typename  # Required for live updates detection
  sys {
    id
  }
  title
  # ... other fields
}
```

## Inspector Mode

Inspector mode displays blue edit buttons when hovering over content in the Contentful preview.

### How It Works

1. Adapters add `data-contentful-entry-id` and `data-contentful-field-id` attributes
2. UI blocks spread these attributes onto DOM elements
3. Contentful's inspector script detects these attributes and shows edit buttons

### Attribute Requirements

```html
<!-- The inspector looks for these attributes -->
<h2
  data-contentful-entry-id="abc123"
  data-contentful-field-id="title"
>
  Content here
</h2>
```

### Field ID Mapping

The `data-contentful-field-id` must exactly match the field's API identifier in Contentful:

| Contentful Field | data-contentful-field-id |
|-----------------|--------------------------|
| Title (API: `title`) | `"title"` |
| Description (API: `description`) | `"description"` |
| Featured Image (API: `featuredImage`) | `"featuredImage"` |
| Body Content (API: `bodyContent`) | `"bodyContent"` |

## Checklist for New Blocks

### UI Block Checklist

- [ ] Created in `packages/ui/src/blocks/[block-name]/`
- [ ] Uses `Text` component instead of `<h1>`, `<h2>`, `<p>`, etc.
- [ ] Uses `Image` component instead of `<img>`
- [ ] Defines local `TextProps` and `ImageProps` types
- [ ] All text props use `{ text: string; data?: Record<string, unknown> }` structure
- [ ] All image props use `{ src: string; alt: string; data?: Record<string, unknown> }` structure
- [ ] Spreads `{...props.field.data}` on elements for inspector mode
- [ ] Includes `.mocks.ts`, `.stories.tsx`, and `.test.tsx` files
- [ ] Uses `"use client"` directive if using Image component
- [ ] No Contentful-specific code in the block

### Adapter Checklist

- [ ] Created in `apps/web-contentful/src/services/contentful/assemblies/[assembly-name]/`
- [ ] Returns `TextProps` format for all text fields
- [ ] Returns `ImageProps` format for all image fields
- [ ] Includes `data-contentful-entry-id` from `sys.id`
- [ ] Includes `data-contentful-field-id` matching Contentful field API name
- [ ] Handles optional fields by returning `undefined`
- [ ] Has explicit return type annotation
- [ ] Complex adapters split into separate files per content type

### GraphQL Query Checklist

- [ ] Includes `__typename` in fragments for live updates
- [ ] Includes `sys { id }` for inspector mode entry ID
- [ ] All required fields are queried

## Common Mistakes to Avoid

### ❌ Don't Use Native HTML Elements

```typescript
// BAD - using native elements
<h2>{props.title.text}</h2>
<p>{props.description.text}</p>
<img src={props.image.src} alt={props.image.alt} />
```

### ✅ Use UI Components

```typescript
// GOOD - using Text and Image components
<Text variant="h2" {...props.title.data}>{props.title.text}</Text>
<Text variant="body-md" {...props.description.data}>{props.description.text}</Text>
<Image src={props.image.src} alt={props.image.alt} width={800} height={600} />
```

### ❌ Don't Forget Data Spread

```typescript
// BAD - missing data spread (inspector won't work)
<Text variant="h2">{props.title.text}</Text>
```

### ✅ Always Spread Data Props

```typescript
// GOOD - data spread enables inspector mode
<Text variant="h2" {...props.title.data}>{props.title.text}</Text>
```

### ❌ Don't Use Wrong Field IDs

```typescript
// BAD - field ID doesn't match Contentful
data: {
  "data-contentful-field-id": "headline",  // Wrong if Contentful field is "title"
}
```

### ✅ Match Contentful Field API Names

```typescript
// GOOD - matches Contentful field API name exactly
data: {
  "data-contentful-field-id": "title",  // Matches Contentful field
}
```
