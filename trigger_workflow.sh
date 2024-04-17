#!/bin/bash
 
REPO_OWNER="anilmadala94@gmail.com"
REPO_NAME="injurymapping"
WORKFLOW_NAME="reusableworkflow.yml"
TOKEN="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"
 
curl -X POST \
  -u "${REPO_OWNER}:${TOKEN}" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/${WORKFLOW_NAME}/dispatches" \
  -d '{"ref":"main"}'
