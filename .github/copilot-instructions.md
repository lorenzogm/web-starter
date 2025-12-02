# GitHub Copilot Instructions

## Project Overview

This project is a frontend application built with modern web technologies following strict conventions for maintainability and consistency.

## Instructions

Always reference the instructions with the "generic" prefix. Then reference instructions according to the task: "fe" and "ui" for front-end development, "qa" for quality assurance.

## Monorepo

- Always run commands from the root of the monorepo.
- Use `pnpm` for package management.
- Use filters for running commands in specific packages, e.g., `pnpm --filter @ring/* build`.
- Use `pnpm check` for quality control checks.
- Use `pnpm fix` to automatically fix issues.

### Guidance on global flags (`-w`, `-s`) and command scope

- Avoid using the shorthand workspace/global flags (`-w`) and silent flag (`-s`) by default in documentation and automation scripts. They can change command scope and suppress important output, which makes debugging CI and local failures harder.
- Prefer explicit, readable commands that make the intended scope and verbosity obvious. Examples:

  - Run a package-scoped check (recommended when troubleshooting one package):

    ```bash
    pnpm --filter ./shared/ui check
    ```

  - Run the workspace-level check deliberately and with full output when you mean to operate on the entire monorepo:

    ```bash
    pnpm -w check
    ```

- Use `-w` (workspace) only when you intentionally want the command to run across the entire monorepo. Prefer the explicit `-w` form instead of hiding it in scripts that are frequently edited by engineers who may not expect workspace-wide side effects.
- Use `-s` (silent) only in automated CI steps where you intentionally want to suppress non-essential output; avoid it during local development and when triaging failures.
- When writing examples in docs or prompts for developers and bots, prefer the explicit `--filter` style or fully spelled flags to reduce ambiguity.

These small changes make troubleshooting and automation more predictable and reduce accidental workspace-wide operations.

## Application Folder Structure

- **Always use kebab-case** for all file and directory names
- Examples: `user-profile.tsx`, `navigation-bar.ts`, `api-client.js`

```
├── apps/
│   ├── next-js-app/
│   │   └── src/
│   │       ├── app/
│   │       │   ├── layout.tsx                 # Root layout
│   │       │   ├── page.tsx                   # Home page
│   │       │   ├── loading.tsx                # Global loading UI
│   │       │   ├── error.tsx                  # Global error UI
│   │       │   ├── not-found.tsx              # 404 page
│   │       │   └── globals.css                # Global styles
│   │       └── ui/
│   │          ├── blocks/
│   │          │   ├── hero.tsx
│   │          │   ├── carousel.tsx
│   │          │   └── ...
│   │          ├── layouts/
│   │          │   ├── main-layout
│   │          │   │   ├── main-layout.tsx
│   │          │   │   ├── header.tsx
│   │          │   │   └── footer.tsx
│   │          │   ├── checkout-layout
│   │          │   │   ├── checkout-layout.tsx
│   │          │   │   ├── header.tsx
│   │          │   │   └── footer.tsx
│   │          │   └── ...
│   │          ├── pages/
│   │          │   ├── home-page
│   │          │   │   └── home-page.tsx
│   │          │   ├── user-profile-page
│   │          │   │   └── user-profile-page.tsx
│   │          │   └── ...
│   │          └── types/
│   │              ├── user.ts
│   │              └── ...
│   └── ...                       # Other apps
└── shared/
    ├── ui/
    │   └── src/
    │       ├── components/
    │       │   ├── button/button.tsx
    │       │   ├── input/input.tsx
    │       │   ├── heading/heading.tsx
    │       └── utils/
    └── ...                       # Other libs

```

### File Collocation Principles

- **Avoid global utility folders**: Instead of centralized `hooks/` or `utils/` folders, collocate related files near where they are used
- **Keep related code together**: Place helper functions, custom hooks, and utilities in the same directory as the components that use them
- **Example**: If a `ui/pages/user-profile/user-profile-page.tsx` needs a custom hook, create `user-profile-page.ts` in the same directory

## AI Files

### Script Creation Guidelines

- **Always create analysis and automation scripts in the `.ai/` directory**
- Create a subdirectory based on the ticket number (if known) or a timestamp (year, month, day, hour, minute) to group the files by task
- **Use Python for all analysis scripts** for consistency and reliability
- The `.ai/` folder is for summary files, documentation, scripts, or any helper files used by AI to achieve tasks
- Scripts should be well-documented with docstrings and usage instructions
- Include error handling and progress indicators
- Save analysis results in Markdown format for easy review
- The `.ai/` directory is included in `.gitignore` for local-only AI assistance
