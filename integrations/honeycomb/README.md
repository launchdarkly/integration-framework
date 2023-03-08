# Honeycomb

Documentation for this integration is available on the LaunchDarkly documentation site: [Honeycomb](https://docs.launchdarkly.com/integrations/honeycomb)

API documentation for this integration is available on the Honeycomb documentation site: [Markers API](https://docs.honeycomb.io/api/markers/)

## Getting started with the Honeycomb integration

Run `npm run curl honeycomb` in the root repository directory to generate a `curl` command to send data to Honeycomb.


### Using flag triggers with Honeycomb.

You can configure triggers/webhooks for your Honeycomb account. To learn more, read the [Honeycomb documentation](https://docs.honeycomb.io/working-with-your-data/triggers/).

To test a webhook integration:

1. Navigate to the Honeycomb Integration Center: `https://ui.honeycomb.io/teams/<your_team_name>/integrations`.
2. Create a new 'Webhook' type integration. You need to enter a shared secret to create the webhook, but it does not affect the request.
3. Choose the 'Test' option.

Next, test the trigger:

1. Navigate to the 'Triggers' tab.
2. Add the integration you just created as a recipient on any one of the triggers.
3. Save the integration and choose the 'Test' option.

Here is an example payload:

```
{
   "version":"v0.1.0",
   "name":"LD Trigger Test",
   "id":"HpPzqZtCNA5",
   "trigger_description":"test trigger to test new LD trigger workflows",
   "status":"TRIGGERED",
   "summary":"TRIGGER TEST: Triggered: LD Trigger Test",
   "description":"Current value greater than threshold value (0)",
   "operator":"greater than",
   "threshold":0,
   "result_url":"https://ui.honeycomb.io/launchdarkly/datasets/sunny-dev/result/g8Pwij7UvK7",
   "result_groups":[
      {
         "Group":{
            "account_id":null
         },
         "Result":0
      }
   ],
   "result_groups_triggered":[],
   "trigger_url":"https://ui.honeycomb.io/launchdarkly/datasets/sunny-dev/triggers/HpPzqZtCNA5",
   "is_test":true
}
```
