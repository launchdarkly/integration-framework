# Endpoint

Some capabilities require specifying an endpoint that LaunchDarkly can make requests to. For example, an endpoint could be specified as follows:

```json
    "endpoint": {
        "url": "{{endpointUrl}}",
        "method": "POST",
        "headers": [
            {
                "name": "Content-Type",
                "value": "application/json"
            },
            {
                "name": "Authorization",
                "value": "Bearer {{apiToken}}"
            }
        ]
    },
```

This specification must include all appropriate request semantics including the URL, method, and headers.

In the example above, the properties `endpoint.url` and `endpoint.headers[].value` accept template variables. These template variables can reference any [`formVariables`](form-variables.md) you've defined in your manifest. This lets you configure a dynamic endpoint based on the `formVariables` your integration collects from the user.

The templating language LaunchDarkly uses is based off of a subset of the Handlebars syntax. To learn more, read the [Handlebars documentation](https://handlebarsjs.com/).

This example uses the `endpointUrl` form variable as the URL of the endpoint and the `apiToken` as a `Bearer` token in the `Authorization` header:

```json
    "endpoint": {
        "url": "{{endpointUrl}}",
        "method": "POST",
        "headers": [
            {
                "name": "Content-Type",
                "value": "application/json"
            },
            {
                "name": "Authorization",
                "value": "Bearer {{apiToken}}"
            }
        ]
    },
```

This example uses the `apiToken` form variable as a query parameter on the URL:

```json
    "endpoint": {
        "url": "https://example.com/apiToken?={{apiToken}}",
        "method": "POST"
    },
```
