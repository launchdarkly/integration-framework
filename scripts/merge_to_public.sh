#!/bin/bash
#
# This script merges forward from the private mirror to the public one,
# one master branch to the other while squashing commits.
#
# Usage: ./merge_to_public.sh <commit_message>
#

COMMIT_MSG=${1:-Releasing changes publicly}

echo "Merging to the public mirror with message: ${COMMIT_MSG}"

mkdir -p temp
git clone git@github.com:launchdarkly/integration-framework.git temp/repo
cd temp/repo
git remote add private git@github.com:launchdarkly/integration-framework-private.git
git checkout master
git fetch private
git merge private/master --squash
git commit -a -m "${1}" # Merge conflicts will need to be resolved manually
git push origin master

cd ../..
rm -rf temp
