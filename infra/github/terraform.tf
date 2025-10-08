terraform {
  # Using local backend for GitHub Actions with state stored as artifacts
  # The state will be uploaded/downloaded as GitHub Actions artifacts
  backend "local" {
    path = "terraform.tfstate"
  }
}
