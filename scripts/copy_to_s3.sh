#!/bin/bash
REV=$(git rev-parse HEAD | cut -c1-8)
echo $REV > latest
aws s3 cp --recursive integrations s3://$BUCKET_NAME/integrations/$REV
aws s3 cp latest s3://$BUCKET_NAME/latest.txt