# Splunk Observability Cloud

User documentation for this integration is available on the LaunchDarkly documentation site: [Splunk Observability Cloud](https://docs.launchdarkly.com/integrations/splunk-observability)

API documentation for this integration is available on the Splunk Observability Cloud documentation site: [Splunk Observability Cloud](https://dev.splunk.com/observability/reference/api/ingest_data/latest)

Trigger documentation for this integration is available on the Splunk Observability Cloud documentation site: [Webhook (trigger) documentation](https://docs.splunk.com/Observability/admin/notif-services/webhook.html#webhook)

## Testing the Splunk Observability Cloud integration

You can verify that the Splunk Observability Cloud integration is working correctly by locating LaunchDarkly events in Splunk Observability Cloud.

Here's how:

1. Log in to Splunk Observability Cloud and navigate to the **Dashboards** tab.
2. Expand the "Buit-in Dashboard Groups" section.
3. Expand the "Sample Data" section.
4. Click into "Sample Charts." You can add LaunchDarkly events to any of these charts.
5. Under "Plot Editor," select "Add Metric or Event" and choose "LaunchDarkly flag change."
6. Send an event from your local LaunchDarkly instance. It appears at the bottom of the chart as a diamond shape.

Run `npm run curl signalfx` in the root repository directory to generate a `curl` command to send data to Splunk Observability Cloud.
