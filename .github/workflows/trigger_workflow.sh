#!/bin/bash
 
REPO_OWNER="your_username"
REPO_NAME="your_repository"
WORKFLOW_NAME="workflow_name.yml"
TOKEN="your_personal_access_token"
 
curl -X POST \
  -u "${REPO_OWNER}:${TOKEN}" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/${WORKFLOW_NAME}/dispatches" \
  -d '{"ref":"main"}'
