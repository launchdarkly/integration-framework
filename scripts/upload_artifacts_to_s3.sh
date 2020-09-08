#!/bin/bash
set -uxe

cd "${0%/*}/.."

export REV=$(git rev-parse HEAD | cut -c1-8)

DEST=./pkg
mkdir -p $DEST

rm -rf $DEST/*

BUCKET=launchdarkly-artifacts

python -c 'import glob, json, os; print(json.dumps({"sha": os.environ["REV"], "integrations": [dir.split("/")[1] for dir in glob.glob("**/*/manifest.json")]}))' > $DEST/latest.json
cp -r integrations $DEST/integrations
cp manifest.schema.json $DEST/manifest.schema.json

ARCHIVE=goaltender_manifests_$REV.zip
cd $DEST
zip -r $ARCHIVE .
cd ..

aws s3 cp $DEST/$ARCHIVE s3://launchdarkly-artifacts/goaltender-manifests/$ARCHIVE
