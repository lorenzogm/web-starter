variable "github_owner" {
  description = "GitHub organization or user name"
  type        = string
}

variable "github_token" {
  description = "GitHub personal access token with repo and admin:repo_hook permissions"
  type        = string
  sensitive   = true
}

variable "repository_name" {
  description = "Name of the GitHub repository"
  type        = string
  default     = "ai-toolbox"
}
