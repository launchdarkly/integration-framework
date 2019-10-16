echo $CIRCLE_SHA1 > latest
aws s3 rm --recursive s3://launchdarkly-integrations-dev/integrations
aws s3 cp --recursive integrations s3://launchdarkly-integrations-dev/integrations
aws s3 cp latest s3://launchdarkly-integrations-dev/integrations/latest.txt