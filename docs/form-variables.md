# Form variables

Most integrations need to collect one or more pieces of configuration data that support the integration, such as API tokens or webhook endpoints.

To support these configurations, describe a set of `formVariables` that define these configuration properties. The `formVariables` populate a form in the LaunchDarkly user interface (UI) that users complete to add your integration.

Here's an example:

```json
    "formVariables": [
        {
            "key": "endpointUrl",
            "name": "Webhook endpoint URL",
            "description": "Enter the URL to the webhook endpoint",
            "defaultValue": "https://example.com/inbound_webhook",
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

The `formVariables` entry above displays as the following UI on the [LaunchDarkly Integrations page](https://app.launchdarkly.com/default/integrations):

![Example configuration form](https://gist.githubusercontent.com/rmanalan/447b78a8c00a46c8638cca834c3009a3/raw/810d8941f29c0306021a973bd6cf10c42bdea03b/goaltender-config-ui.png)

Form variables apply to the entire integration configuration. There are no capability-specific form variables.

The `key`, `name`, `description`, and `type` are required.

The `formVariables[].description` is used as a field label on the UI. You can use simple Markdown to link a word or phrase to an external URL.

Accepted form variable `type`s are `string`, `boolean`, `uri`, `enum`, and `dynamicEnum`.

Optionally, you can set `isSecret` or `isOptional` if necessary, or provide guidance with `placeholder` and `defaultValue`. If you provide a `defaultValue`, you must also set `isOptional` to `true` and vice versa.

To learn more, read the [manifest schema](../manifest.schema.json).
