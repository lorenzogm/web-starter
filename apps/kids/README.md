# Kids Math Practice App

A responsive math practice application for second-grade students built with TanStack Router and Tailwind CSS v4.

## Features

- 📚 Course selection (Segundo de Primaria)
- 🔢 Subject selection (Matemáticas)
- ✨ Interactive math exercises
- 📱 Mobile-first responsive design
- ♿ Accessible interface
- 🎯 40 curated math operations appropriate for 2nd graders

## Getting Started

### Install Dependencies

```bash
pnpm install
```

### Development

From the monorepo root, always use the filtered command:

```bash
pnpm dev --filter kids
```

Or from within the `apps/kids` directory:

```bash
pnpm dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (Vite default port)

### Testing

#### Run Unit Tests

```bash
pnpm test
```

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Project Structure

```
apps/kids/
├── src/
│   ├── routes/              # TanStack Router routes
│   │   ├── __root.tsx       # Root layout
│   │   ├── index.tsx        # Color selection page
│   │   ├── course.tsx       # Course selection
│   │   ├── subject.tsx      # Subject selection
│   │   └── exercise.tsx     # Math exercise screen
│   ├── components/
│   │   └── ui/              # shadcn UI components
│   ├── data/
│   │   └── operations.json  # Math operations database
│   ├── types/
│   │   ├── operations.ts    # TypeScript types for operations
│   │   └── colors.ts        # Color definitions
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles (Tailwind)
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── USER_FLOW.md             # Complete user flow documentation
└── package.json
```

## Tech Stack

- **Framework**: React 19
- **Router**: TanStack Router v1.87
- **UI Components**: React Aria Components + shadcn/ui
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite v6
- **Testing**: Vitest
- **Language**: TypeScript 5.7
- **Icons**: Lucide React

## Responsive Design

The application follows a mobile-first approach with breakpoints for:

- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## Accessibility

The application is built with accessibility in mind:

- Semantic HTML
- ARIA labels
- Keyboard navigation support
- Screen reader friendly
- High contrast colors

## Database

The `operations.json` file contains 40 math operations:

- 17 additions
- 13 subtractions
- 10 multiplications

Operations are categorized by difficulty:

- **Easy**: Single-digit operations
- **Medium**: Double-digit operations

All operations are appropriate for second-grade students.
