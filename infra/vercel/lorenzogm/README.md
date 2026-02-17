# Lorenzogm Vercel Infrastructure

This directory contains Terraform configuration for deploying the lorenzogm application to Vercel.

## Overview

The infrastructure is managed using Terraform and deployed via GitHub Actions workflows. It supports multiple environments (development, staging, production) with environment-specific configurations.

## Prerequisites

- [Terraform](https://www.terraform.io/downloads) >= 1.0
- [Vercel Account](https://vercel.com)
- Vercel API Token
- Vercel Organization ID

## Directory Structure

```
lorenzogm/
├── .env.example              # Example environment variables
├── .gitignore               # Git ignore rules
├── .tflint.hcl              # TFLint configuration
├── package.json             # NPM scripts for local development
├── README.md                # This file
└── src/
    ├── config.development.json   # Development environment config
    ├── config.staging.json       # Staging environment config
    ├── config.production.json    # Production environment config
    ├── main.tf                   # Main Terraform configuration
    ├── providers.tf              # Provider configuration
    ├── variables.tf              # Variable definitions
    └── terraform-*.tfstate.enc   # Encrypted Terraform state files
```

## Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit the `.env` file with your Vercel credentials:

```env
TF_VAR_ENVIRONMENT=development
TF_VAR_VERCEL_TOKEN=your-vercel-token
TF_VAR_VERCEL_ORG_ID=your-vercel-org-id
```

### Environment-Specific Configuration

Each environment has its own configuration file:

- `config.development.json` - Development environment settings
- `config.staging.json` - Staging environment settings
- `config.production.json` - Production environment settings

These files configure:
- Project name
- Build commands
- Framework settings
- Password protection
- Environment variables

## Local Development

### Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables in `.env` file

3. Initialize Terraform:
   ```bash
   pnpm tf:init
   ```

### Common Commands

```bash
# Format Terraform files
pnpm tf:format

# Validate configuration
pnpm tf:validate

# Plan changes (development)
TF_VAR_ENVIRONMENT=development pnpm tf:plan

# Apply changes (development)
TF_VAR_ENVIRONMENT=development pnpm tf:apply

# Destroy infrastructure (development)
TF_VAR_ENVIRONMENT=development pnpm tf:destroy
```

### State Management

Terraform state is encrypted and stored in the repository. To work with state files:

```bash
# Decrypt state file
TERRAFORM_STATE_ENCRYPT_KEY=your-key TF_VAR_ENVIRONMENT=development pnpm state:decrypt

# Encrypt state file
TERRAFORM_STATE_ENCRYPT_KEY=your-key TF_VAR_ENVIRONMENT=development pnpm state:encrypt
```

## GitHub Actions Workflows

Two workflows manage the infrastructure and application deployment:

### 1. Infrastructure Deployment

**Workflow:** `.github/workflows/lorenzogm-vercel-infra-deploy.yml`

**Triggers:**
- Push to `main` branch (when infrastructure files change)
- Manual workflow dispatch

**What it does:**
1. Decrypts Terraform state
2. Plans and applies infrastructure changes
3. Exports Vercel Project ID as GitHub variable
4. Encrypts and commits state file

### 2. Application Deployment

**Workflow:** `.github/workflows/lorenzogm-vercel-app-deploy.yml`

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch

**What it does:**
1. Builds the application using Turbo
2. Deploys to Vercel production

## Required GitHub Secrets

Configure these in your GitHub repository settings:

- `VERCEL_TOKEN` - Vercel API token
- `VERCEL_ORG_ID` - Vercel organization ID
- `TERRAFORM_STATE_ENCRYPT_KEY` - Key for encrypting state files
- `GH_BOT_TOKEN` - GitHub token with permissions to set variables

## Required GitHub Variables

The infrastructure workflow automatically sets:

- `LORENZOGM_VERCEL_PROJECT_ID` - Vercel project ID (set by infrastructure workflow)

## Deployment Process

1. **First-time setup:**
   ```bash
   # Run infrastructure workflow to create Vercel project
   # This can be triggered manually from GitHub Actions
   ```

2. **Subsequent deployments:**
   - Push to `main` branch automatically triggers both workflows
   - Infrastructure deploys only if infrastructure files change
   - Application deploys on every push

## Troubleshooting

### State file issues

If you encounter state file corruption:

1. Download the encrypted state file
2. Decrypt it locally
3. Fix any issues
4. Re-encrypt and commit

### Vercel project not found

Ensure the infrastructure workflow has run successfully and set the `LORENZOGM_VERCEL_PROJECT_ID` variable.

### Build failures

Check:
- Build command in environment config matches the app's build script
- All dependencies are correctly specified
- Environment variables are properly configured

## Security Notes

- Never commit unencrypted state files
- Keep encryption keys secure
- Rotate Vercel tokens regularly
- Use password protection for non-production deployments

## Support

For issues or questions:
1. Check workflow logs in GitHub Actions
2. Review Terraform plan output
3. Consult Vercel deployment logs
