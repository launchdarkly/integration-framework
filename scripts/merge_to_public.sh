#!/bin/bash
#
# This script merges forward from the private mirror to the public one,
# one main branch to the other while squashing commits.
#
# Usage: ./merge_to_public.sh <commit_message> <branch_name>
#

set -x

COMMIT_MSG=${1:-Releasing changes publicly}
BRANCH_NAME=${2:-$(date +%B-%d-%Y)-release}

# Convert BRANCH_NAME to lowercase
BRANCH_NAME=$(echo "$BRANCH_NAME" | tr '[:upper:]' '[:lower:]')

echo
echo "Using branch ${BRANCH_NAME}"
echo "Merging to the public mirror with message: ${COMMIT_MSG}"
echo "NOTE: merge conflicts will be automatically resolved by preferring changes from the private mirror."
echo

mkdir -p temp
git clone git@github.com:launchdarkly/integration-framework.git temp/repo
cd temp/repo
git remote add private git@github.com:launchdarkly/integration-framework-private.git
git checkout main
git fetch private

# Create a new branch from public main
git checkout -b "${BRANCH_NAME}" main

# Remove all existing files to ensure a clean slate
git rm -rf .
git clean -fdx

# Checkout files from private/main
git checkout private/main -- .
git add -A      # Stage all changes, including deletions
git commit -m "${COMMIT_MSG}"

# Push the changes to the new branch
git push --set-upstream origin ${BRANCH_NAME}

cd ../..
rm -rf temp

echo
echo "All done merging to the public mirror!"
