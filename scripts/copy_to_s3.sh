REV=$(git rev-parse HEAD | cut -c1-8)#!/bin/bash
python -c 'import glob, json, os; print json.dumps({"sha": os.environ["REV"], "integrations": [dir.split("/")[1] for dir in glob.glob("**/*/manifest.json")]})' > latest
aws s3 cp --recursive integrations s3://$BUCKET_NAME/integrations/$REV
aws s3 cp latest s3://$BUCKET_NAME/latest.json