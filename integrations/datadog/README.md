# Datadog

[User documentation](https://docs.launchdarkly.com/integrations/datadog)

[API documentation](https://docs.datadoghq.com/api/?lang=bash#events)

Run `npm run curl datadog` in the root repository directory to generate a `curl` command to send data to Datadog.

**Note:** This integration currently lives alongside the "legacy" Datadog integration. This integration should not be enabled in production until all legacy subscriptions have been migrated

### Triggers

Consult the [Datadog documentation](https://docs.datadoghq.com/integrations/webhooks/) to set up outgoing webhooks from your Datadog account.

When [configuring a new webhook in Datadog](https://app.datadoghq.com/account/settings#integrations/webhooks), there will be the option to specify the payload. In order for LaunchDarkly to parse the payload correctly, it will need to be as follows:

```json
{
  "title": "$EVENT_TITLE",
  "url": "$LINK"
}
```

If we wish to change this in the future, the full list of fields we can configure in Datadog webhooks can be found [here](https://docs.datadoghq.com/integrations/webhooks/).

To test, you'll have to attach the webhook to a monitor by putting `{{#is_alert}}@webhook-<webhook_name>{{/is_alert}}` into the text of the alert you want and then test from the monitor configuration page by clicking the 'Test Notifications' button at the bottom.
