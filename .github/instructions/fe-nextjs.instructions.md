---
description: 'Next.js architecture with clean separation between routing and UI'
applyTo: '**'
---

# Custom Next.js Development Instructions

Instructions for building Next.js applications with a clean separation between routing logic and UI components, following a structured adapter pattern.

## Architecture Overview

This architecture enforces a clear separation of concerns:

- **`src/app/`** - Pure routing, contains only Next.js route files
- **`src/ui/`** - All UI components, pages, and layouts
- **Adapters** - Transform API/server data into UI-compatible formats

## Project Structure

```
src/
├── app/                          # Next.js App Router (routing only)
│   ├── [locale]/
│   │   ├── layout.tsx           # Route export only
│   │   └── example/
│   │       └── page.tsx         # Route export only
├── ui/                          # All UI logic
│   ├── layouts/
│   │   └── main-layout/
│   │       ├── main-layout.tsx
│   │       └── main-layout.ui.tsx
│   └── pages/
│       └── example-page/
│           ├── example-page.tsx      # Server component with data fetching
│           ├── example-page.adapter.ts # Data transformation logic
│           └── example-page.ui.tsx    # UI component (server or client)
```

## Implementation Pattern

### 1. Route Files (src/app/)

Route files should **ONLY** export the corresponding UI component. No logic should be implemented here.

```typescript
// src/app/[locale]/example/page.tsx
export { ExamplePage as default } from '../../../ui/pages/example-page/example-page';
```

### 2. Page Component (src/ui/pages/)

The main page component handles:

1. Data fetching from APIs, cookies, etc.
2. Using the adapter to transform data and rendering the UI component

```typescript
// src/ui/pages/example-page/example-page.tsx
import type { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { apiSdk } from '../../../services/api/apiSdk';
import { getDictionary } from '../../../utils/dictionaries/getDictionary';
import { examplePageAdapter } from './example-page.adapter';
import { ExamplePageUI } from './example-page.ui';
import type { Locales } from '../../../utils/locales';

type ExamplePageProps = {
  params: Promise<{
    locale: Locales;
  }>;
};

export async function ExamplePage(props: ExamplePageProps): Promise<ReactNode> {
  const params = await props.params;
  const cookieStore = await cookies();
  const dictionary = await getDictionary(params.locale);

  // 1. Collect all data from various sources
  const [userData, settingsData, productsData] = await Promise.all([
    apiSdk.users.get(),
    apiSdk.settings.get(),
    apiSdk.products.search({ category: 'featured' }),
  ]);

  const userPreferences = cookieStore.get('userPreferences')?.value;
  const sessionId = cookieStore.get('sessionId')?.value;

  // 2. Transform data using adapter and return UI component
  return (
    <ExamplePageUI
      {...examplePageAdapter({
        // Raw API data
        user: userData,
        settings: settingsData,
        products: productsData,

        // Cookie/session data
        userPreferences: userPreferences ? JSON.parse(userPreferences) : null,
        sessionId,

        // Framework data
        locale: params.locale,
        dictionary,
      })}
    />
  );
}
```

### 3. Page Adapter (src/ui/pages/)

The adapter transforms raw server/API data into UI-compatible props.

````typescript
### 3. Page Adapter (src/ui/pages/)

The adapter transforms raw server/API data into UI-compatible props.

```typescript
// src/ui/pages/example-page/example-page.adapter.ts
import type { ComponentProps } from 'react';
import type { ExamplePageUI } from './example-page.ui';
import type { Locales } from '../../../utils/locales';

// UI component props type - automatically derived from the UI component
type ExamplePageUIProps = ComponentProps<typeof ExamplePageUI>;

// Raw input data from server/APIs
interface ExamplePageAdapterInput {
	// API responses
	user: any;
	settings: any;
	products: any;

	// Session/cookie data
	userPreferences: any;
	sessionId?: string;

	// Framework data
	locale: Locales;
	dictionary: any;
}

export function examplePageAdapter(input: ExamplePageAdapterInput): ExamplePageUIProps {
	return {
		// Direct props for UI component
		user: {
			name: input.user?.name || 'Guest',
			email: input.user?.email,
			avatar: input.user?.profilePicture?.url,
			isLoggedIn: !!input.user,
		},
		products: input.products?.items?.map((product: any) => {
			return {
				id: product.code,
				title: product.name,
				price: product.price?.formattedValue || '0',
				imageUrl: product.images?.[0]?.url,
				isAvailable: product.stock?.stockLevel > 0,
			};
		}) || [],
		theme: input.userPreferences?.theme || 'light',
		language: input.locale,
		currency: input.settings?.currency?.code || 'USD',
	};

		// Single dictionary object - UI component accesses nested properties
		dictionary: input.dictionary,

		// Computed flags
		shouldShowWelcome: !!input.user && !input.userPreferences?.hideWelcome,
		isFirstVisit: !input.sessionId,
	};
}
````

### 4. UI Component (src/ui/pages/)

The UI component is purely presentational and can be either server or client component. Props are automatically typed using `ComponentProps`.

```typescript
// src/ui/pages/example-page/example-page.ui.tsx
'use client'; // Optional: only if client interactivity is needed

import { useState } from 'react';
import type { ReactNode } from 'react';

interface ExamplePageUIProps {
  user: {
    name: string;
    email?: string;
    avatar?: string;
    isLoggedIn: boolean;
  };
  products: Array<{
    id: string;
    title: string;
    price: string;
    imageUrl?: string;
    isAvailable: boolean;
  }>;
  theme: string;
  language: string;
  dictionary: Dictionary; // Single dictionary object
  shouldShowWelcome: boolean;
  isFirstVisit: boolean;
}

export function ExamplePageUI(props: ExamplePageUIProps): ReactNode {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <div className={`min-h-screen ${props.theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Welcome section */}
      {props.shouldShowWelcome && (
        <section className="bg-blue-50 p-4 mb-6">
          <h2 className="text-lg font-semibold">
            Welcome back, {props.user.name}!
          </h2>
          {props.isFirstVisit && (
            <p className="text-sm text-gray-600">Thanks for visiting us for the first time!</p>
          )}
        </section>
      )}

      {/* Main content */}
      <main className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">{props.dictionary.examplePage.title}</h1>
        <p className="text-gray-600 mb-8">{props.dictionary.examplePage.subtitle}</p>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {props.products.length > 0 ? (
            props.products.map((product) => (
              <div
                key={product.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedProduct === product.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedProduct(product.id)}
              >
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                )}
                <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                <p className="text-green-600 font-bold mb-2">{product.price}</p>
                <button
                  className={`w-full py-2 px-4 rounded ${
                    product.isAvailable
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!product.isAvailable}
                >
                  {props.dictionary.examplePage.buyButton}
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">{props.dictionary.examplePage.noProducts}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
```

## Development Guidelines

### Route Files Rules

- **NEVER** implement logic in `src/app/` route files
- **ONLY** export the corresponding UI component
- Use the exact component name followed by `as default`

### Page Component Rules

- **Data Fetching**: Collect all required data from APIs, cookies, headers, etc.
- **Inline Adapter Usage**: Use the adapter directly in the JSX return to transform all data
- **Async Operations**: Handle all async operations (await, Promise.all)

### Adapter Rules

- **Input Types**: Define clear interfaces for raw input data
- **Output Types**: Use `ComponentProps<typeof UIComponent>` for output - **NO manual interface definitions**
- **Pure Functions**: No side effects, only data transformation
- **Use `input.PROPERTY`**: Access all input properties consistently
- **Business Logic**: Handle data computation and business rules
- **Single Dictionary**: Pass the complete dictionary object, not individual dictionary properties
- **No Intermediate Variables**: Avoid creating temporary variables like `transformedData` - assign values directly in the return statement

### UI Component Rules

- **Presentational Only**: No data fetching or business logic
- **Client vs Server**: Choose based on interactivity needs
- **Auto-typed Props**: Let TypeScript infer props from the interface - **NO duplicate type definitions**
- **Responsive Design**: Implement using Tailwind breakpoints
- **Accessibility**: Use semantic HTML and ARIA attributes

### TypeScript Best Practices

**✅ DO: Use ComponentProps to avoid boilerplate**

```typescript
// In adapter
import type { ComponentProps } from 'react';
import type { ExamplePageUI } from './example-page.ui';

type ExamplePageUIProps = ComponentProps<typeof ExamplePageUI>;

export function examplePageAdapter(input: AdapterInput): ExamplePageUIProps {
	// Implementation automatically matches UI component interface
}
```

**❌ DON'T: Create duplicate interface definitions**

```typescript
// Don't do this - creates duplicate types
interface ExamplePageUIProps {
	user: UserType;
	products: ProductType[];
	// ... duplicating the UI component interface
}
```

**✅ DO: Keep UI component interfaces clean and minimal**

```typescript
// UI component with simple, direct interface
interface ExamplePageUIProps {
	userName: string;
	products: ProductCard[];
	microcopies: {
		title: string;
		subtitle: string;
	};
}

export function ExamplePageUI(props: ExamplePageUIProps) {
	// Component implementation
}
```

## File Naming Conventions

- **Page Components**: `page-name.tsx` (server component with data logic)
- **Adapters**: `page-name.adapter.ts` (data transformation)
- **UI Components**: `page-name.ui.tsx` (presentational component)
- **Route Files**: Standard Next.js naming (`page.tsx`, `layout.tsx`)

## Benefits

1. **Clear Separation**: Clean boundaries between routing, data, and UI
2. **Testability**: Each layer can be tested independently
3. **Maintainability**: Data transformations are centralized in adapters
4. **Type Safety**: Strong typing between all layers
5. **Performance**: Server components handle data, client components handle interactivity
6. **Consistency**: Standardized pattern across all pages

## Migration Strategy

1. Move existing page logic from `src/app/` to `src/ui/pages/`
2. Create adapters for data transformation
3. Split UI into separate `.ui.tsx` files
4. Update route files to only export UI components
5. Update imports to use new structure

This architecture ensures maintainable, testable, and performant Next.js applications with clear separation of concerns.

```

```
