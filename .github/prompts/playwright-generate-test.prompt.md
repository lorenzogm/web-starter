---
mode: agent
description: 'Generate Playwright E2E tests for the Web application using Playwright MCP'
tools: ['runCommands', 'runTasks', 'editFiles', 'search', 'new', 'extensions', 'codebase', 'usages', 'vscodeAPI', 'problems', 'changes', 'testFailure', 'openSimpleBrowser', 'fetch', 'findTestFiles', 'searchResults', 'githubRepo', 'todos', 'runTests', 'filesystem', 'memory', 'sequentialthinking', 'playwright']
model: 'Claude Sonnet 4'
---

# Web E2E Test Generation with Playwright MCP

Your goal is to generate end-to-end Playwright tests for the Web application based on the provided scenario after completing all prescribed steps.

## Project Context

 - **Target Application**: Web (`apps/web`) - A Next.js application
 - **Test Location**: Save all generated tests in `apps/web-e2e/tests/` directory
 - **Test Framework**: Uses `@playwright/test` with TypeScript configuration in `apps/web-e2e/`


## Specific Instructions

- You are given a scenario, and you need to generate a playwright test for it. If the user does not provide a scenario, you will ask them to provide one.
 - **IMPORTANT**: Always examine the existing test structure in `apps/web-e2e/tests/` and follow the same patterns and helpers
- DO NOT generate test code prematurely or based solely on the scenario without completing all prescribed steps.
- DO run steps one by one using the tools provided by the Playwright MCP.
 - Use existing helper functions from `apps/web-e2e/helpers/` when available
 - Check `apps/web-e2e/playwright.config.ts` for configuration details (baseURL, authentication, etc.)
- **Test Structure Requirements**:
  - Create just one single comprehensive test for the whole page
  - Assert all visible data using `getByRole` as the primary option for element selection
  - Test all possible actions like clicking buttons, form interactions, navigation, etc.
  - Ensure the test covers the complete user journey and interactions available on the page
- Only after all steps are completed, emit a Playwright TypeScript test that uses `@playwright/test` based on message history
 - Save generated test file in the `apps/web-e2e/tests/` directory with a descriptive filename
- Execute the test file and iterate until the test passes
