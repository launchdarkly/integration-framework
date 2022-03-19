### Test the integration

1. Setup a cloud instance (app.posthog.com) or a [self-hosted instance](https://posthog.com/docs) of Posthog
2. Get the Posthog's instance URL (app.posthog.com if cloud, otherwise your instance's domain, e.g. myposthoginstance.com)
3. Inside Posthog, go to your Project's settings and retrieve an API Key
4. Go to LaunchDarkly and configure the integration by including the Posthog's Instance URL and API Key
5. Trigger a flag event in LaunchDarkly
6. Go to Posthog's Live Events tab, you should be able to see the flag event there

### User documentation

Find the user documentation on [LaunchDarkly Docs](https://docs.launchdarkly.com/integrations/posthog)