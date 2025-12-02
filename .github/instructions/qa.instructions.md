---
description: 'Quality Assurance instructions for comprehensive testing'
applyTo: '**'
---

# QA Instructions

This file shows the exact commands to run local QA checks (TypeScript, linters, and Storybook) and quick troubleshooting steps to resolve the most common failures.

Summary (fast path)

- Run the workspace quality checks:

```bash
# from repo root
pnpm install
pnpm check
```

- If `pnpm check` reports auto-fixable issues, run:

```bash
pnpm fix
```

Notes: `pnpm check` is an alias that runs the configured checks across the monorepo. `pnpm fix` runs autofixers (eslint --fix, prettier, stylelint fixes) where configured.

Recommended QA flow (detailed)

1. Install dependencies (once per machine or after changes to package manifests):

```bash
pnpm install
```

2. Run the monorepo checks:

```bash
pnpm check
```

3. If the checks report issues that are fixable automatically, run:

```bash
pnpm fix
```

4. Re-run `pnpm check` to ensure all issues are resolved.

5. If TypeScript or build issues remain, run the package-specific check to see package-level errors. Example:

```bash
pnpm check --filter @ring/ui
```
