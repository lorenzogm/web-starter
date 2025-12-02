---
mode: 'agent'
model: Claude Sonnet 4
tools: ['runCommands', 'runTasks', 'editFiles', 'search', 'new', 'extensions', 'codebase', 'usages', 'vscodeAPI', 'problems', 'changes', 'testFailure', 'openSimpleBrowser', 'fetch', 'searchResults', 'githubRepo', 'todos', 'runTests', 'filesystem', 'memory', 'sequentialthinking', 'atlassian']
description: 'Generate comprehensive Jira sprint reports with completion charts, blockers analysis, and status breakdown'
---

# Jira Sprint Report Generator - Simple Ticket List

This prompt generates simple sprint reports showing tickets organized by status using the Atlassian MCP server integration.

## Instructions

1. **Get Sprint Data**
   - Use `mcp_atlassian_jira_get_sprints_from_board` to find the target sprint
   - Use `mcp_atlassian_jira_get_sprint_issues` with fields: `summary,status,issuetype`
   - **Exclude subtasks** - filter out issue type "Sub-task"

2. **Generate Simple Report**
   - Group tickets by status: Done, In QA, In Progress, To Do
   - **Identify Tech Debt**: Look for tickets with "Debt" in title or from previous sprints
   - **Identify Blocked Tickets**: Use `flagged = "Impediment"` in JQL to find blocked/flagged tickets
   - Create a table for each status with ticket number and title
   - Keep it simple - no analytics, no team data, no complex analysis

## File Naming & Output
- Save as: `sprint-SPRINT-NAME.md` in `docs/sprint-reports/`
- **Privacy:** Do not include individual names or team analytics

3. **Generate DOCX Version**
   - After creating the markdown report, convert it to DOCX format
   - Use the existing Python script: `docs/sprint-reports/generate_docx_with_mermaid.py`
   - Save as: `sprint-SPRINT-NAME.docx` in the same directory

## Report Template Structure

```markdown
# Sprint [NAME]

**Sprint Period:** [dates]
**Total Tickets:** [X] (excluding subtasks)

## Sprint Summary

| Status      | Tickets | Percentage |
| ----------- | ------- | ---------- |
| Done        | X       | X.X%       |
| In QA       | X       | X.X%       |
| In Progress | X       | X.X%       |
| To Do       | X       | X.X%       |
| **Total**   | **X**   | **100.0%** |

## Tech Debt (From Previous Sprints)

| Ticket      | Summary                                                           |
| ----------- | ----------------------------------------------------------------- |
| PROJ-123    | Example debt ticket - refactoring from previous sprint           |
| PROJ-124    | Another tech debt item                                            |

## Blocked Tickets

| Ticket      | Summary                                                           |
| ----------- | ----------------------------------------------------------------- |
| PROJ-125    | Example blocked/flagged ticket with impediment                    |
| PROJ-126    | Another blocked ticket                                            |

## Done

| Ticket      | Summary                                 |
| ----------- | --------------------------------------- |
| PROJ-127    | Example completed ticket               |
| PROJ-128    | Another completed item                  |

## In QA

| Ticket      | Summary                                 |
| ----------- | --------------------------------------- |
| PROJ-129    | Example QA ticket                       |

## In Progress

| Ticket      | Summary                                 |
| ----------- | --------------------------------------- |
| PROJ-130    | Example in progress ticket              |

## To Do

| Ticket      | Summary                                 |
| ----------- | --------------------------------------- |
| PROJ-131    | Example pending ticket                  |
```

