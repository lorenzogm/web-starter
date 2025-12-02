---
description: 'TypeScript Conventions and Guidelines'
applyTo: '**'
---

# TypeScript Conventions

## General Instructions

- Use TypeScript interfaces for all component props
- Have a single export per file.
- Use kebab-case for all file and folder names.
  - Example: login-form.tsx
- For page-level files, use the following structure:
  1. page.tsx - Main page component
  2. page.actions.ts - Server actions
  3. page.query.gql - Page-specific GraphQL queries
- **Use camelCase** for variables, functions, properties, and methods
- Examples: `userData`, `handleUserLogin()`, `isLoggedIn`, `fetchUserProfile()`
- When using abbreviations, always write them in camel-case
  - Example: Vpv instead of VPV
- Props
  - Do not destructure props (neither in signature nor in body)
  - Always use the props. prefix when accessing values.
  - Example: `props.userName`, `props.onClick()`
  - Props should be named and structured from the UI perspective, based on what the component needs to render, not based on API responses.
- Avoid barrel files (index.ts files).
- Avoid single-use variables
- Use `interface` for defining types.
- Use `type` for defining unions or complex types.
- Export always using named exports
- Data transformation:
  - Should happen on the server, not the client
  - Transform and adapt API responses in the server/page layer (.tsx page) instead of inside UI components.
  - Data preparation (filtering, mapping, restructuring) should happen before passing props.
  - Components should focus solely on rendering and only receive the data they need to render.
  - Use adapters to convert raw API data into a UI-ready format.
- Cookies:
  - Avoid cookies for values that belong to API
    - Example: currency should be fetched via sapSdk (and optionally cached) instead of being stored/retrieved from cookies.
