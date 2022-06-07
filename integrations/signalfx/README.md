# SignalFx

User documentation for this integration is available on the LaunchDarkly documentation site: [SignalFx](https://docs.launchdarkly.com/integrations/signalfx)

API documentation for this integration is available on the SignalFx documentation site: [SignalFx](https://developers.signalfx.com/ingest_data_reference.html#operation/Send%20Custom%20Events)

Trigger documentation for this integration is available on the SignalFx documentation site: [Webhook (trigger) documentation](https://docs.signalfx.com/en/latest/admin-guide/integrate-notifications.html)

## Testing the SignalFx integration

You can verify that the SignalFx integration is working correctly by locating LaunchDarkly events in SignalFx.

Here's how:

1. Log in to SignalFx and navigate to the **Dashboards** tab.
2. Expand the "Buit-in Dashboard Groups" section.
3. Expand the "Sample Data" section.
4. Click into "Sample Charts." You can add LaunchDarkly events to any of these charts.
5. Under "Plot Editor," select "Add Metric or Event" and choose "LaunchDarkly flag change."
6. Send an event from your local LaunchDarkly instance. It appears at the bottom of the chart as a diamond shape.

Run `npm run curl signalfx` in the root repository directory to generate a `curl` command to send data to SignalFx.
