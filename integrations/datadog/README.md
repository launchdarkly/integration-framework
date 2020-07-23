# Datadog

[User documentation](https://docs.launchdarkly.com/integrations/datadog)

[API documentation](https://docs.datadoghq.com/api/?lang=bash#events)

Run `npm run curl datadog` in the root repository directory to generate a `curl` command to send data to Datadog.


**Note:** This integration currently lives alongside the "legacy" Datadog integration. This integration should not be enabled in production until all legacy subscriptions have been migrated

### Triggers

Consult the [Datadog documentation](https://docs.datadoghq.com/integrations/webhooks/) to set up outgoing webhooks from your Datadog account.

When configuring a new webhook in Datadog, there will be the option to specify the payload. In order for LaunchDarkly to parse the payload correctly, it will need to be as follows:
```
{
"alert_name": "$ALERT_METRIC",
"url": "$LINK",
}
```
