---
description: 'UI Development standards and best practices'
applyTo: '**'
---

# UI Development

It's important to follow these instructions when creating UI components and blocks:

- `.github/instructions/_custom-reactjs.instructions.md`
- `.github/instructions/a11y.instructions.md`
- `.github/instructions/reactjs.instructions.md`

- Use the Figma MCP to generate UI designs.
- Only work in the `packages/ui` workspace
- The UI should be displaying in storybook based on mocks.
- **Tailwind CSS Only**: Use Tailwind CSS for all styling - never use inline styles
- **Localization**: Always include a `microcopies` prop containing all text that needs to be translated
- **Component Props**: Follow the exact prop structure defined by shared components - avoid unsupported props like `style`

## Design Requirements

- **Pixel Perfect Design**: UI must match the Figma design exactly, including spacing, typography, colors, and layout
- **Component Usage**: ALWAYS use components from `packages/ui/src/components` - never create custom HTML elements when a component exists
- **Interactive Stories**: Include state management in Storybook stories (outside the component) to make all clickable items functional
- **Image Assets**: Store images in the block's `images` folder and ensure proper paths for both development and Storybook

## UI Components

Create the blocks as pure UI components in `packages/ui/src/components`

```
packages/ui/src/components
├── button
│   ├── button.tsx
│   ├── button.mocks.ts
│   ├── button.stories.tsx
│   └── button.test.tsx
└── input
    ├── input.tsx
    ├── input.mocks.ts
    ├── input.stories.tsx
    └── input.test.tsx
```

## UI Blocks

Create the blocks as pure UI components in `packages/ui/src/blocks`, make sure you use the components from `packages/ui/src/components`.

- **Pixel Perfect**: Match Figma designs exactly with precise spacing, typography, and colors
- **Component Usage**: MANDATORY - Use existing components from `packages/ui/src/components` (Button, Heading, etc.)

### Styling and `className` guidance for `packages/ui` components

- It's very important to only use the `className` prop when using components from `packages/ui/src/components` to apply utility classes that affect positioning and spacing (for example: `mb-2`, `mt-4`, `ml-1`, `px-2`).
- Do NOT use `className` to override visual tokens of the component such as text color, background color, font weight, or other stylistic defaults. Those visual changes must be handled via the component's public props (for example `color`, `variant`, `tone`, `size`) so the component's design tokens and accessibility constraints remain intact.
- If a shared component does not expose the prop you need (for example to change color or variant), open a small PR to add a well-defined prop rather than using `className` to override styles.

Example (allowed):

```tsx
// OK — use className for spacing only
<Button className="mb-2" onClick={...}>Save</Button>
```

Example (NOT allowed):

```tsx
// NOT OK — do not change color or background via className on shared components
<Button className="bg-red-500 text-white">Danger</Button>
// Instead, use a prop exposed by the component:
<Button variant="danger">Danger</Button>
```

- **Storybook State**: Include interactive state management in stories to demonstrate all functionality
- Include mocked content in a .mocks.ts file
- Include tests in a .test.tsx file
- Include story in a .stories.tsx file
- Do not create index.ts files - export directly from component files
- Include the images in an "images" folder in the block, avoid global folders

This is the structure of the blocks folder:

```
packages/ui/src/blocks
├── block-01
│   ├── block-01.tsx
│   ├── block-01.mocks.ts
│   ├── block-01.stories.tsx
│   ├── block-01.test.tsx
│   └── images
│       ├── block-01-image-01.png
│       ├── block-01-image-02.png
│       └── block-01-image-03.png
```

### Storybook Story Requirements

Stories must include state management to make interactive elements functional:

```typescript
export const Interactive: Story = {
  render: (args) => {
    const [state, setState] = useState({
      selectedColor: args.selectedColor,
      selectedSize: args.selectedSize,
		});

    return (
      <ComponentName
        {...args}
        selectedColor={state.selectedColor}
        selectedSize={state.selectedSize}
        onColorChange={(color) => setState((prev) => ({ ...prev, selectedColor: color }))}
        onSizeChange={(size) => setState((prev) => ({ ...prev, selectedSize: size }))}
      />
    );
  },
};
```

### Component Implementation Requirements

- Use `Heading` component instead of `<h1>`, `<h2>`, etc.
- Use `Button` component instead of `<button>`
- Use `Body` component instead of `<p>`
- Use appropriate icon components from the shared components
- Match exact spacing, colors, and typography from Figma
- Ensure responsive design follows Figma breakpoints
- **Tailwind Only**: Use Tailwind CSS classes exclusively - never use inline `style` props
- **Localization**: Include `microcopies` prop with all translatable text:

```typescript
interface ComponentProps {
	microcopies: {
		title: string;
		description: string;
		buttonText: string;
		// ... all text content
	};
	// ... other props
}
```

### Props handling convention

- Avoid destructuring the `props` object at the top of a component (for example, do not use `const { data, onClick } = props;`).
- Instead, reference values directly from `props` (for example, `props.data`, `props.onClick`).

Rationale: keeping the `props` object intact makes it easier for Storybook stories and external wrappers to pass and control props (particularly when stories spread `...args`), avoids accidental loss of defaults, and simplifies debugging and patch-based edits.

```

```
