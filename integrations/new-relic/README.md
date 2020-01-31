# New Relic

[User documentation](https://example.com)

[API documentation](https://docs.newrelic.com/docs/insights/insights-data-sources/custom-data/introduction-event-api)

Run `npm run curl new-relic` in the root repository directory to generate a `curl` command to send data to New Relic.

Please note that this integration requires a New Relic Pro account to function.
You should be able to see all LaunchDarkly flag events by running `SELECT * FROM LaunchDarkly` in your New Relic Insights Data Explorer.

If you want to see all the Event Types that have been posted in the last day, run `SHOW EVENT TYPES SINCE 1 day ago`
