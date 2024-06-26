#!/bin/bash
 
REPO_OWNER="anilmadala"
REPO_NAME="injurymapping"
QS_WORKFLOW_NAME="QS.yml"
TEST_WORKFLOW_NAME="reusableworkflow.yml"
#ENVIRONMENT ="$ENVIRONMENT"
echo "Selected Envronment is: $ENVIRONMENT"

if [ "$ENVIRONMENT" = 'QS' ]; then
echo "Running tests on QS Environment"
curl -X POST \
  -u "${REPO_OWNER}:${TOKEN}" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/${QS_WORKFLOW_NAME}/dispatches" \
  -d '{"ref":"master"}'
  elif [ $ENVIRONMENT = 'Test' ]; then
  echo "Running tests on Staging Environment"
  curl -X POST \
  -u "${REPO_OWNER}:${TOKEN}" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/${TEST_WORKFLOW_NAME}/dispatches" \
  -d '{"ref":"master"}'
  else 
  echo "Unspecified Environment : $ENVIRONMENT"
  exit 1
  fi
