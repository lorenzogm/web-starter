---
mode: 'agent'
model: Claude Sonnet 4
tools: ['runCommands', 'runTasks', 'editFiles', 'search', 'new', 'extensions', 'codebase', 'usages', 'vscodeAPI', 'problems', 'changes', 'testFailure', 'openSimpleBrowser', 'fetch', 'searchResults', 'githubRepo', 'todos', 'runTests', 'filesystem', 'memory', 'sequentialthinking', 'figma', 'playwright', 'atlassian']
---
# Working with tickets

## Get ticket from Jira

Use the atlassian MCP to find the ticket number.

Create a ticket in markdown in `docs/tickets/<ticket-number><ticket-title>/01-ticket.md` with the content of the ticket from Jira, include a section with the comments in the ticket.

## Create a branch

Create a branch from `develop` with the name `feature/<ticket-number>-<ticket-title>`.

## Implementation Planning
Create a file `docs/tickets/<ticket-number><ticket-title>/02-planning.md` to describe how you plan to implement the ticket. Follow `../instructions/task-implementation.instructions.md`

## Implementation

Follow Test-Driven Development (TDD), start creating tests in playwright following `../instructions/qa-playwright.instructions.md` in the application `apps/web-e2e` to cover the implementation of the ticket. All the tests should fail before starting the implementation.

Use `pnpm --filter @ring/web-e2e dev` to run the complete E2E test suite during development.

Start the implementation of the ticket, use the folder `docs/tickets/<ticket-number><ticket-title>/.temp` to store any temporary files you need during the implementation.

If the ticket provides a figma design, use the figma MCP to open the design and follow it. Use `.github/instructions/fe-ui-dev.instructions.md` to follow best practices. And `.github/instructions/fe-ui-qa.instructions.md` to follow quality assurance best practices.

Keep iterating between tests and implementation until all the tests pass and the implementation is complete.
