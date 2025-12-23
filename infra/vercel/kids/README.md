# Vercel Infrastructure - Kids App

This directory contains the Terraform configuration for deploying the Kids app to Vercel.

## Prerequisites

- [Terraform](https://www.terraform.io/) or [tfenv](https://github.com/tfutils/tfenv)
- [tflint](https://github.com/terraform-linters/tflint)
- Vercel account with API token
- Node.js and pnpm

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in the required environment variables in `.env`:
   - `VERCEL_TOKEN`: Your Vercel API token
   - `VERCEL_ORG_ID`: Your Vercel organization/team ID

## Available Environment

This infrastructure supports only the **production** environment.

## Usage

### Install Dependencies

```bash
pnpm install
```

### Plan Changes

Preview what Terraform will do:

```bash
pnpm tf production plan
```

### Apply Changes

Apply the infrastructure changes:

```bash
pnpm tf production apply
```

You can auto-approve with:

```bash
pnpm tf production apply -auto-approve
```

### Destroy Infrastructure

Remove all infrastructure:

```bash
pnpm tf production destroy
```

## Configuration

The project configuration is defined in [`src/config.production.json`](src/config.production.json).

### Project Settings

- **Name**: `kids`
- **Framework**: Vite
- **Root Directory**: `apps/kids`
- **Build Command**: `cd ../.. && npx turbo@^2 run build --filter=kids`
- **Install Command**: `pnpm install --frozen-lockfile --ignore-scripts --prefer-offline`

## Project Structure

```
kids/
├── .env                          # Environment variables (gitignored)
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── .tflint.hcl                   # TFLint configuration
├── package.json                  # Node.js dependencies
├── README.md                     # This file
├── scripts/
│   └── terraform.ts              # Terraform wrapper script
└── src/
    ├── config.production.json    # Production environment config
    ├── main.tf                   # Main Terraform resources
    ├── providers.tf              # Terraform providers
    └── variables.tf              # Terraform variables
```

## Vercel Project

Once applied, this will create a Vercel project named `kids-prod` with:

- Automatic deployment from your Git repository
- Production environment configured
- Custom domain support (if configured)
- Skew protection enabled (12 hours)

## Troubleshooting

### Authentication Issues

Ensure your `VERCEL_TOKEN` and `VERCEL_ORG_ID` are correct in the `.env` file.

### State File Issues

The state files are stored as `src/production.tfstate`. Make sure not to commit these files to Git.

### Build Failures

Check that the build command and root directory are correct in `config.production.json`.
