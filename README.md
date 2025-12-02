# Web Starter

This repository is a web starter template designed to help you quickly set up a modern web application with a monorepo structure.

## Install Node.js

Node.js is a requirement to run the project. The recommended way to use it is via
[nvm, Node Version Manager](https://github.com/nvm-sh/nvm).

After installing nvm, run the following command to install the correct version for this project.

```sh
nvm use
```

Enable `pnpm`:

```sh
corepack enable pnpm
```

Running the install command from the root of the repository

```sh
pnpm install
```

## Common commands

| Description | Command                          |                       |
| ----------- | -------------------------------- | --------------------- |
| Check       | pnpm check                       | Quality Control check |
| Storybook   | pnpm dev --filter web-contentful |                      |

> **_WARNING:_**
> Because of the monorepo setup, all the commands must be run from the root of this repository, not from any subfolder.
>
> Use [PNPM](https://pnpm.io/pnpm-cli) to install, upgrade and uninstall dependencies. Use pnpm to run scripts from the workspace that doesn't need to be cached by Turborepo.
>
> Use [Turborepo](https://turbo.build/repo/docs/crafting-your-repository/running-tasks#using-filters) to run your applications locally.
>
> More information about the monorepo setup with Turborepo can be found [here](https://turbo.build/repo/docs).
