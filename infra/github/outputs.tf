output "repository_name" {
  description = "The name of the repository"
  value       = github_repository.repo.name
}

output "repository_full_name" {
  description = "The full name of the repository (owner/repo)"
  value       = github_repository.repo.full_name
}

output "repository_url" {
  description = "The URL of the repository"
  value       = github_repository.repo.html_url
}

output "protected_branch" {
  description = "The protected branch pattern"
  value       = github_branch_protection.main.pattern
}

output "branch_protection_enabled" {
  description = "Whether branch protection is enabled on main branch"
  value       = true
}
