# SignalFx

[User documentation](https://docs.launchdarkly.com/docs/signalfx)

[API documentation](https://developers.signalfx.com/ingest_data_reference.html#operation/Send%20Custom%20Events)

[Webhook (trigger) documentation](https://docs.signalfx.com/en/latest/admin-guide/integrate-notifications.html)

### Set up for testing
You shouldn't need to plug SignalFx into anything to test the SignalFx-Goaltender integration. Instead, just follow the following steps to locate the LD events after logging in to SignalFx:
1. Under the 'Dashboards' tab, expand the 'Built-in Dashboard Groups' section.
2. Expand the 'Sample Data' section.
3. Click into 'Sample Charts'.
4. Once there, click on any of the charts to add LD events.
5. Under 'Plot Editor', select 'Add Metric or Event' and choose 'LaunchDarkly flag change'.
6. Send an event from your local Gonfalon. It should register at the bottom of the chart as a little diamond.

Run `npm run curl signalfx` in the root repository directory to generate a `curl` command to send data to SignalFx.
