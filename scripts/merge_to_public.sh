#!/bin/bash
#
# This script merges forward from the private mirror to the public one,
# one main branch to the other while squashing commits.
#
# Usage: ./merge_to_public.sh <commit_message>
#

set -x

COMMIT_MSG=${1:-Releasing changes publicly}

echo
echo "Merging to the public mirror with message: ${COMMIT_MSG}"
echo "NOTE: merge conflicts will be automatically resolved by preferring changes from the private mirror."
echo

mkdir -p temp
git clone git@github.com:launchdarkly/integration-framework.git temp/repo
cd temp/repo
git remote add private git@github.com:launchdarkly/integration-framework-private.git
git checkout main
git fetch private
git merge private/main --squash --strategy-option=theirs
git commit -a -m "${COMMIT_MSG}" # Merge conflicts will need to be resolved manually
git push origin main

cd ../..
rm -rf temp

echo
echo "All done merging to the public mirror!"
