# GitHub Repository Terraform Configuration

This Terraform configuration manages GitHub repository settings for the ai-toolbox repository.

## Features

This configuration manages the following:

- **Branch Protection**: Protects the `main` branch with pull request requirements
- **Merge Settings**: Only allows squash and merge (no merge commits or rebase)
- **Auto-cleanup**: Automatically deletes branches after merge
- **Security**: Enables vulnerability alerts

## Requirements

- Terraform >= 1.0
- GitHub provider ~> 6.0
- GitHub Personal Access Token with the following scopes:
  - `repo` (full control of private repositories)
  - `admin:repo_hook` (write repository hooks)

## Setup Instructions

### 1. Create a GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "Terraform GitHub Management")
4. Select the following scopes:
   - `repo` (all sub-scopes)
   - `admin:repo_hook` (all sub-scopes)
5. Generate the token and save it securely

### 2. Configure GitHub Actions Secret

For automated workflows, add the token as a GitHub Actions secret:

1. Go to your repository Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `GH_TERRAFORM_TOKEN`
4. Value: Paste your GitHub Personal Access Token
5. Click "Add secret"

### 3. Local Development Setup

For local testing and development:

```bash
# Set environment variables
export TF_VAR_github_owner="your-github-username-or-org"
export TF_VAR_github_token="your-github-personal-access-token"
export TF_VAR_repository_name="ai-toolbox"  # Optional, defaults to ai-toolbox
```

Alternatively, create a `terraform.tfvars` file (this file is gitignored):

```bash
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
```

**Note**: Never commit `terraform.tfvars` to version control if it contains sensitive data.

## Usage

### Initialize Terraform

```bash
cd infra/github
terraform init
```

### Plan Changes

```bash
terraform plan
```

### Apply Changes

```bash
terraform apply
```

### Destroy Resources (Use with caution)

```bash
terraform destroy
```

## CI/CD Integration

This configuration is automatically applied via GitHub Actions:

- **Pull Requests**: Runs `terraform plan` to preview changes
- **Main Branch**: Runs `terraform apply` to apply changes automatically

### State Management

The Terraform state is securely managed using GitHub Actions artifacts:

- **Storage**: State files are stored as GitHub Actions artifacts with 90-day retention
- **Security**: State files are never committed to the repository (gitignored)
- **Persistence**: The apply workflow uploads the state after each run
- **Retrieval**: The plan and apply workflows download the latest state before running

This approach provides:
- Secure storage within GitHub (no external dependencies)
- Version history through artifact retention
- Access control through GitHub Actions permissions
- No additional infrastructure costs

## Branch Protection Settings

The following branch protection rules are applied to the `main` branch:

- Pull requests are required before merging
- Stale reviews are automatically dismissed
- Status checks must pass before merging
- Force pushes are disabled
- Branch deletions are disabled

## Repository Settings

The following repository settings are configured:

- Squash merge only (merge commits and rebase disabled)
- Branches are automatically deleted after merge
- Vulnerability alerts are enabled
- Wiki and Projects are disabled

## Security Considerations

- The GitHub token is marked as sensitive and won't be displayed in output
- State files are stored securely as GitHub Actions artifacts
- State files should never be committed to version control (they are gitignored)
- Use repository secrets in GitHub Actions to store the GitHub token

## Troubleshooting

### State File Issues

If the state file becomes corrupted or lost:

1. Download the latest state artifact from GitHub Actions
2. Place it in the `infra/github` directory
3. Run `terraform plan` to verify the state is correct

### Permission Errors

Ensure your GitHub token has the required scopes:
- `repo` (full control of private repositories)
- `admin:repo_hook` (write repository hooks)

You can verify and update token scopes at: https://github.com/settings/tokens
