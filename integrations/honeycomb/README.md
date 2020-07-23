# Honeycomb

[User documentation](https://docs.launchdarkly.com/integrations/honeycomb)

[API documentation](https://docs.honeycomb.io/api/markers/)

Run `npm run curl honeycomb` in the root repository directory to generate a `curl` command to send data to Honeycomb.


### Triggers

Please consult the [Honeycomb documentation](https://docs.honeycomb.io/working-with-your-data/triggers/) to configure webhooks/triggers from your Honeycomb account.

To test, go to the [Honeycomb Integration Center](https://ui.honeycomb.io/teams/launchdarkly/integrations) and create a new integration of type 'Webhook'. You need to enter a shared secret to create the webhook but it will not affect the request. There is the option to 'Test' at this point.

To make sure it works on the trigger itself, you'll have to go to the 'Triggers' tab and add the integration you just created as a recipient on any one of the triggers (all the way at the bottom). Once saved, there should also be the option to 'Test' at this point.

A sample payload looks like this:
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
