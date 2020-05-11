# Form variables

Most integrations will need to collect one or more pieces of configuration data
that supports the integration. Some examples include API tokens or webhook endpoints.

To support these configurations, you can describe a set of
`formVariables` that define these configuration properties.

Here's an example:

```json
    "formVariables": [
        {
            "key": "endpointUrl",
            "name": "Webhook endpoint URL",
            "description": "Enter the URL to the webhook endpoint",
            "default": "https://example.com/inbound_webhook",
            "type": "url"
        },
        {
            "key": "apiToken",
            "name": "API Key",
            "description": "Enter your [API key](https://example.com/api) here",
            "type": "string",
            "isSecret": true
        }
    ],
```

The `formVariables` entry above will yield the following UI inside of the [LaunchDarkly Integrations
page](https://app.launchdarkly.com/default/integrations):

![Example configuration
form](https://gist.githubusercontent.com/rmanalan/447b78a8c00a46c8638cca834c3009a3/raw/810d8941f29c0306021a973bd6cf10c42bdea03b/goaltender-config-ui.png)

Form variables apply to the entire integration configuration. There are no capability-specific form variables at this time.

The `formVariables[].description` will be used as a field label on the UI. You
can use simple markdown to link a word or phrase to an external URL.

Accepted form variable `type`s are `string`, `boolean`, `uri`, and `enum`.
You may optionally set `isSecret` or `isOptional` as appropriate or provide guidance with `placeholder` and `defaultValue`.

Refer to the [manifest schema](../manifest.schema.json) for more information.
