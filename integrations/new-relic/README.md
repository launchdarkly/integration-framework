# LaunchDarkly New Relic Flag Events Integration
Please note that this integration requires a New Relic Pro account to function.
You should be able to see all LaunchDarkly flag events by running `SELECT * FROM LaunchDarkly` in your New Relic Insights Data Explorer.

If you want to see all the Event Types that have been posted in the last day, run `SHOW EVENT TYPES SINCE 1 day ago`


## Troubleshooting the New Relic Events API
curl -X POST -d '{"eventType": "test", "message": "testing testing 123"}' -H "Content-Type:application/json" -H "X-Insert-Key: <API_KEY>" https://insights-collector.newrelic.com/v1/accounts/<ACCOUNT_ID>/events

run `SELECT * FROM test` in New Relic Insights Data Explorer to see if your test event showed up!

