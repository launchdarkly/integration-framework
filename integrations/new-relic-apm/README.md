# New Relic One

**Important:** This integration requires a New Relic APM account and a New Relic [user API key](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/#user-key).

User documentation for this integration is available on the LaunchDarkly documentation site: [New Relic One](https://launchdarkly.com/docs/integrations/new-relic).

API documentation for this integration is available on the New Relic API documentation site: [Change tracking with NerdGraph](https://docs.newrelic.com/docs/change-tracking/config/nerdgraph/).

## How it works

The integration calls the NerdGraph `changeTrackingCreateEvent` mutation for each LaunchDarkly flag change. Each change is recorded as a `FEATURE_FLAG` change tracking event on the APM application that matches the configured application ID. The LaunchDarkly flag key is used as the `featureFlagId`.

## Migrating from the REST API version

Earlier versions of this integration created deployment markers through the New Relic REST API v2 and used a REST API key. New Relic no longer accepts REST API keys, and the REST API v2 deployment endpoints reach end of life on July 31, 2027.

To migrate an existing configuration, replace the REST API key with a user API key (starts with `NRAK-`). The application ID and data center settings do not change. Flag changes now appear under **Change tracking** on the APM entity instead of as deployment markers.

## Getting started with the New Relic One integration

Run `npm run curl new-relic-apm` in the root repository directory to generate a `curl` command to send data to New Relic.

After you configure the integration, you should be able to see all LaunchDarkly flag events under **Change tracking** on your APM entity.
