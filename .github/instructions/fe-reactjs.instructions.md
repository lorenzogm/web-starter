---
description: 'ReactJS development standards and best practices'
applyTo: '**'
---

## React

- Use PascalCase for React component names
- Component files should match the component name but in kebab-case
- Examples: `UserProfile` component in `user-profile.tsx`, `NavigationBar` component in `navigation-bar.tsx`
- Use `props` directly in the component
- Have a single `useState` per component/file.
- Avoid `isMobile` or similar JavaScript-based responsive detection - handle responsiveness with CSS classes and Tailwind breakpoints instead.
- Avoid `useEffect`, `useCallback` and `useMemo` unless necessary.
- Check in `components` directory for existing components before creating new ones.

## Component Architecture Patterns

### Main UI Component with Children Pattern

For complex pages, use a main UI component that provides layout and orchestrates multiple child components:

```typescript
// Main component that provides layout and coordinates children
export function ProductDetailPage(props: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = !props.product.stock ||
    getStockStatus(props.product.stock) === props.microcopies.outOfStock;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Child components */}
        <ProductImages images={props.product.images} productName={props.product.name} />

        <div className="space-y-6">
          <ProductInformation microcopies={props.microcopies} product={props.product} />
          <QuantitySelector
            disabled={isOutOfStock}
            microcopies={props.microcopies}
            onQuantityChange={setQuantity}
          />
          <ProductActions disabled={isOutOfStock} microcopies={props.microcopies} />
        </div>
      </div>

      <ProductDetails microcopies={props.microcopies} product={props.product} />
    </div>
  );
}
```

### Props Structure and Type Composition

The parent component should compose its props interface using child component props, not duplicate them:

#### ✅ DO: Use Type Composition

```typescript
// Child components export their props interfaces
export interface ProductInformationProps {
	product: ProductDetailPageProduct;
	microcopies: {
		productCode: string;
		availability: string;
		stock: string;
		// ... other microcopies
	};
}

export interface QuantitySelectorProps {
	initialQuantity: number;
	disabled?: boolean;
	microcopies: {
		quantity: string;
	};
}

// Parent component composes props from children
export interface ProductDetailPageProps {
	product: ProductDetailPageProduct;
	breadcrumbItems: Array<BreadcrumbItem>;
	microcopies: ProductInformationProps['microcopies'] &
		QuantitySelectorProps['microcopies'] &
		ProductActionsProps['microcopies'] & {
			productNotFound: string;
			errorLoadingProduct: string;
		};
}
```

#### ❌ DON'T: Duplicate Interface Definitions

```typescript
// Don't duplicate microcopies or other props that children already define
export interface ProductDetailPageProps {
	product: ProductDetailPageProduct;
	microcopies: {
		// Don't repeat what child components already define
		productCode: string;
		availability: string;
		quantity: string;
		// ...
	};
}
```

### Shared Types Architecture

Create a dedicated types file for shared interfaces to avoid circular dependencies:

```typescript
// component-name.types.ts - Centralized shared types
export interface ProductImage {
	url: string;
	altText: string;
}

export interface ProductPrice {
	formattedValue: string;
	value: number;
	currencyIso: string;
}

export interface ProductStock {
	stockLevel?: number;
	stockLevelStatus: 'inStock' | 'outOfStock' | 'unknown';
}

export interface ProductDetailPageProduct {
	code: string;
	name: string;
	description?: string;
	images?: Array<ProductImage>;
	price?: ProductPrice;
	stock?: ProductStock;
	// ... other product properties
}

export interface BreadcrumbItem {
	href?: string;
	label: string;
	isCurrentPage?: boolean;
}
```

### Microcopies Pattern

Always use microcopies objects for all text content, even if only one text property is needed:

#### ✅ DO: Always Use Microcopies Object

```typescript
// Even for single text values, use microcopies object
export interface QuantitySelectorProps {
  initialQuantity: number;
  microcopies: {
    quantity: string; // Always use object, never just a string
  };
}

export function QuantitySelector(props: QuantitySelectorProps) {
  return (
    <div>
      <Body>{props.microcopies.quantity}:</Body>
      {/* Component implementation */}
    </div>
  );
}
```

#### ❌ DON'T: Use Direct String Props for Text

```typescript
// Don't use direct string props for user-facing text
export interface QuantitySelectorProps {
	label: string; // Avoid this - not localization-friendly
}
```

### Directory Structure for Complex Components

```
component-name/
├── component-name.tsx          # Main component with layout
├── component-name.types.ts     # Shared types
├── component-name.mocks.ts     # Mock data
├── component-name.stories.tsx  # Storybook stories
├── child-component-1/
│   └── child-component-1.tsx   # Child component
├── child-component-2/
│   └── child-component-2.tsx   # Child component
└── child-component-3/
    └── child-component-3.tsx   # Child component
```

## UI Components Architecture

UI components should be purely presentational and follow these guidelines:

### Core Principles

1. **Presentational Only**: UI components should be purely presentational
2. **No Data Fetching**: Components should not perform API calls or data fetching
3. **No Global State**: Components should not manage or access global state
4. **No Framework Dependencies**: UI components should not depend on routing or other framework-specific features
5. **Use Existing Components**: Always check and use components from `packages/ui/src/components` before creating new ones
6. **Direct Imports**: Import components directly from their `.tsx` files rather than using barrel exports
7. **Microcopies Objects**: Always use microcopies objects for text content, never direct string props
8. **Type Composition**: Parent components should compose props from child components, not duplicate them

### HTML Tag Component Mapping

Every HTML tag used in the application should have a corresponding React component:

- `<button>` → `Button` component
- `<input>` → `Input` component
- `<p>` → `Paragraph` component
- `<h1>`, `<h2>`, etc. → `Heading` component with size prop
- `<img>` → `Image` component
- `<a>` → `Link` component
- `<form>` → `Form` component
- `<select>` → `Select` component
- `<textarea>` → `Textarea` component

### Component Structure

All UI components should follow this structure:

```typescript
import React from 'react';

interface ComponentNameProps {
  // Props with descriptive names using camelCase
  children?: React.ReactNode;
  className?: string;
  microcopies: {
    // Always include microcopies for any user-facing text
    label: string;
    placeholder?: string;
  };
  // Other props...
}

export function ComponentName(props: ComponentNameProps) {
  return (
    <div className={`base-styles ${props.className || ''}`}>
      <label>{props.microcopies.label}</label>
      {props.children}
    </div>
  );
}
```

### Styling Guidelines

- Use Tailwind CSS classes for all styling
- Create reusable component variants using props
- Avoid inline styles
- Use conditional classes for different states

Example:

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  microcopies?: {
    loadingText?: string;
  };
}

export function Button(props: ButtonProps) {
  const variant = props.variant || 'primary';
  const size = props.size || 'medium';
  const disabled = props.disabled || false;
  const className = props.className || '';

  const baseClasses = 'font-medium rounded focus:outline-none focus:ring-2';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  };
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
}
```

### Single useState Pattern

When components need state, use a single `useState` call to manage related state:

```typescript
interface ComponentState {
	isLoading: boolean;
	data: any[];
	error: string | null;
}

export function DataComponent(props: DataComponentProps) {
	const [state, setState] = React.useState<ComponentState>({
		isLoading: false,
		data: [],
		error: null,
	});

	const updateState = (updates: Partial<ComponentState>) => {
		setState((prevState) => ({ ...prevState, ...updates }));
	};

	// Use state.isLoading, state.data, state.error
	// Update with updateState({ isLoading: true })
}
```

### Responsive Design Best Practices

- **Avoid JavaScript-based responsiveness**: Do not use `isMobile`, `window.innerWidth`, resize listeners, or similar JavaScript methods for responsive behavior
- **Use CSS-first approach**: Handle all responsive behavior using Tailwind CSS breakpoint classes (`sm:`, `md:`, `lg:`, etc.)
- **Single state management**: Use only one `useState` per component to manage all related state
- **CSS-driven visibility**: Use responsive utility classes like `hidden md:flex`, `md:hidden`, etc. for showing/hiding elements

Example of proper responsive component:

```typescript
interface ResponsiveComponentProps {
  isOpen: boolean;
  microcopies: {
    toggleButton: string;
  };
}

export function ResponsiveComponent(props: ResponsiveComponentProps) {
  // Single useState for component state
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className={cn(
      // Base styles
      'fixed left-0 top-0 z-40 flex h-screen flex-col transition-all duration-300',
      // Responsive behavior with CSS
      'w-16 md:w-64', // Mobile: collapsed, Desktop: expanded
      isCollapsed && 'md:w-16', // Desktop: collapsible
      'hidden md:flex', // Mobile: hidden by default, Desktop: visible
      !isCollapsed && 'flex', // Mobile: show when not collapsed
    )}>
      {/* Content */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="md:hidden" // Mobile-only button
      >
        {props.microcopies.toggleButton}
      </button>
    </div>
  );
}
```

## ESLint

Follow these ESLint rules:

- Use function declarations instead of arrow functions.
- Prefer const over let when variables are not reassigned
- Use function declarations for component definitions
- Always use semicolons
- Use single quotes for strings
- No unused variables or imports
- Proper TypeScript type annotations
- Avoid props destructuring
- Do not create index.ts barrel files
