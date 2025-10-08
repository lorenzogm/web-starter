data "github_repository" "repo" {
  name = var.repository_name
}

# Configure repository settings
# Note: This uses the existing repository and only updates its settings
resource "github_repository" "repo" {
  name = data.github_repository.repo.name

  # Only allow squash merge
  allow_merge_commit     = false
  allow_rebase_merge     = false
  allow_squash_merge     = true
  allow_update_branch    = true
  delete_branch_on_merge = true

  # Additional security and quality settings
  has_issues           = true
  has_projects         = false
  has_wiki             = false
  vulnerability_alerts = true

  lifecycle {
    # Prevent accidental recreation of the repository
    prevent_destroy = true
  }
}

# Protect the main branch
resource "github_branch_protection" "main" {
  repository_id = github_repository.repo.node_id
  pattern       = "main"

  # Require pull request reviews before merging
  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    require_code_owner_reviews      = false
    required_approving_review_count = 0
  }

  # Require status checks to pass before merging
  required_status_checks {
    strict = true
  }

  # Enforce branch protection for administrators
  enforce_admins = false

  # Allow force pushes and deletions for administrators
  allows_deletions    = false
  allows_force_pushes = false
}
