# Quick Start Guide

This guide will help you get the Terraform GitHub configuration up and running.

## Prerequisites

Before you begin, you'll need:

1. **GitHub Personal Access Token** with these scopes:
   - `repo` (full control of private repositories)
   - `admin:repo_hook` (write repository hooks)

2. **Repository Secret** configured in GitHub Actions:
   - Name: `GH_TERRAFORM_TOKEN`
   - Value: Your GitHub Personal Access Token

## First-Time Setup

### Step 1: Create GitHub Personal Access Token

1. Go to [GitHub Settings → Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Name it "Terraform GitHub Management"
4. Select scopes: `repo` and `admin:repo_hook`
5. Generate and save the token securely

### Step 2: Add Token to GitHub Actions

1. Go to Repository Settings → Secrets and variables → Actions
2. Create new secret:
   - Name: `GH_TERRAFORM_TOKEN`
   - Value: Your token from Step 1
3. Save

### Step 3: Trigger the Workflow

The Terraform configuration will automatically run when:

- **On Pull Request**: Shows what changes will be made (plan only)
- **On Merge to Main**: Applies the changes automatically

To trigger it for the first time:

1. Create a small change to any file in `infra/github/` (e.g., add a comment)
2. Create a pull request
3. The `terraform-plan.yml` workflow will run and post a comment with the plan
4. Review the plan
5. Merge the PR
6. The `terraform-apply.yml` workflow will run and apply the changes

## What Gets Configured

Once applied, your repository will have:

✅ **Branch Protection on `main`**:
- Pull requests required before merging
- Status checks must pass
- Stale reviews automatically dismissed

✅ **Merge Settings**:
- Only squash merge allowed
- Merge commits disabled
- Rebase merge disabled

✅ **Auto-cleanup**:
- Branches automatically deleted after merge

✅ **Security**:
- Vulnerability alerts enabled

## Local Testing (Optional)

To test changes locally before creating a PR:

```bash
# Navigate to the terraform directory
cd infra/github

# Set environment variables
export TF_VAR_github_owner="your-username"
export TF_VAR_github_token="your-token"
export TF_VAR_repository_name="ai-toolbox"

# Initialize Terraform
terraform init

# See what changes would be made
terraform plan

# Apply changes (use with caution!)
terraform apply
```

## Troubleshooting

### "Permission denied" errors

- Check that your GitHub token has the correct scopes
- Verify the `GH_TERRAFORM_TOKEN` secret is set correctly

### "State file not found" on first run

- This is normal for the first run
- The state will be created after the first successful apply
- State is stored as a GitHub Actions artifact

### Workflow doesn't trigger

- Check that you've made changes to files in `infra/github/**`
- Verify the workflow files are in `.github/workflows/`
- Check the Actions tab for any error messages

## Next Steps

After setup:

1. Monitor the first workflow run to ensure it completes successfully
2. Verify branch protection rules are applied in Repository Settings
3. Test creating a PR to ensure branch protection works
4. Customize the configuration in `infra/github/main.tf` as needed

## Need Help?

- Check the [full README](README.md) for detailed documentation
- Review Terraform validation errors in the Actions logs
- Ensure all prerequisites are met
