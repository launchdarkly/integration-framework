# New Relic

**Important:** This integration requires a New Relic Pro account, including a paid Insights subscription.

User documentation for this integration is available on the LaunchDarkly documentation site: [New Relic](https://example.com)

API documentation for this integration is available at the New Relic documentation site: [New Relic](https://docs.newrelic.com/docs/insights/insights-data-sources/custom-data/introduction-event-api)

## Getting started with the New Relic integration

Run `npm run curl new-relic` in the root repository directory to generate a `curl` command to send data to New Relic.

You can display all LaunchDarkly flag events by running `SELECT * FROM LaunchDarkly` in the New Relic Insights Data Explorer.

If you want to display all the Event Types that have been posted in the last day, run `SHOW EVENT TYPES SINCE 1 day ago`.
