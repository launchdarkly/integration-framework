# Capabilities

The third part of defining your LaunchDarkly integration is describing its
`capabilities`. Your integration's `capabilities` describe how it interacts with LaunchDarkly.

We currently support two capabilities:

* [Audit log events hook](#audit-log-events-hook-auditlogeventshook) (`auditLogEventsHook`)
* [Reserved custom properties](#reserved-custom-properties-reservedcustomproperties) (`reservedCustomProperties`)

## Audit log events hook (`auditLogEventsHook`)

An audit log events hook is a webhook that's sent by LaunchDarkly whenever an
event happens inside of LaunchDarkly. The name comes from the fact that each of these events will
result in an event being published to LaunchDarkly's audit log.
This capability can be used to send data to or trigger an event in another service.

The `auditLogEventsHook` has three properties:

1. [`endpoint`](#endpoint):
   Describes the HTTP handler that will receive the webhook.
2. [`templates`](#templates):
   A map of template paths relative to your integration's directory. Templates are used to transform the raw audit log events to a format that your integration expects. These templates can be any file type.
3. [`defaultPolicy`](#default-policy):
   An array of [LaunchDarkly
   policies](https://docs.launchdarkly.com/home/account-security/custom-roles/policies) that
   act as a filter for which events to send to your webhook endpoint.

Here's an example of an audit log events hook capability that subscribes to flag
events in a LaunchDarkly account:

```json
    "capabilities": {
        "auditLogEventsHook": {
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
            "templates": {
                "flag": "templates/flag.json"
            },
            "defaultPolicy": [
                {
                    "effect": "allow",
                    "resources": ["proj/*:env/production:flag/*"],
                    "actions": ["*"]
                }
            ]
        }
    }
```

### Endpoint

Every `auditLogEventsHook` capability must specify the endpoint to which webhook data should be sent. This specification must include all appropriate request semantics including the URL, method, and headers.

In the example
above, you'll notice that a few of the properties (`endpoint.url` and
`endpoint.headers[].value`) will accept template variables. These template
variables can reference any `formVariables` you've defined in your manifest.
The templating language we use is based off of a subset of the
[Handlebars](https://handlebarsjs.com/) syntax.

There are a few properties that allow template variables to be substituted at
runtime. The main ones are the `endpoint.url` and the
`endpoint.headers[].value`. This will allow you to configure a dynamic endpoint
based on the `formVariables` your integration collects from the user.

Here are some examples. This first example will utilize the `endpointUrl` form variable as the URL of the endpoint and use the `apiToken` as a `Bearer` token in the `Authorization` header.

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

This next example uses the `apiToken` formVariable as a query parameter on the URL.

```json
    "endpoint": {
        "url": "https://example.com/apiToken?={{apiToken}}",
        "method": "POST"
    },
```

### Templates

Before the `auditLogEventsHook` capability sends the request to the endpoint
handling your webhook, you have the option to transform the body of the request
sent to your handler. If you don't provide one or more templates, LaunchDarkly
will send you a default JSON payload that looks like this:

```json
{
   "_links": {
      "canonical": {
         "href": "/api/v2/flags/always-snippet/example-test",
         "type": "application/json"
      },
      "parent": {
         "href": "/api/v2/auditlog",
         "type": "application/json"
      },
      "self": {
         "href": "/api/v2/auditlog/5defebd006121dd9f7ea90d0",
         "type": "application/json"
      },
      "site": {
         "href": "/always-snippet/production/features/example-test",
         "type": "text/html"
      }
   },
   "_id": "5defebd006121dd9f7ea90d0",
   "_accountId": "",
   "timestamp": {
       "milliseconds": 1576004560130,
       "seconds": 1576004560,
   },
   "kind": "flag",
   "name": "Example test",
   "description": "",
   "shortDescription": "",
   "comment": "This is just a test",
   "member": {
      "_links": {
         "parent": {
            "href": "/api/v2/members",
            "type": "application/json"
         },
         "self": {
            "href": "/api/v2/members/569f514183f2164430000002",
            "type": "application/json"
         }
      },
      "_id": "569f514183f2164430000002",
      "email": "testing@example.com",
      "firstName": "Henry",
      "lastName": "Barrow"
   },
   "titleVerb": "",
   "markdownTitle": "[Henrietta Powell](mailto:testing@example.com) turned on the flag [Example test](http://app.launchdarkly/exampledotcom/production/features/example-test) in `Production`",
   "title": "Henrietta Powell turned on the flag Example test in 'Production'",
   "target": {
      "_links": null,
      "name": ""
   }
}
```

However, if you choose to provide one or more
`templates`,
LaunchDarkly will render your template using the context data above. Your
template can be any text based format, but make sure you specify the appropriate
`Content-Type` header in your `endpoint.headers` property to match the content
type of your template body.

We use a basic subset of the [Handlebars](https://handlebarsjs.com/) template syntax to render
your template. Check out [Handlebars' Language
Guide](https://handlebarsjs.com/guide/) for more information on its syntax. In
addition to the basic language syntax, we support the following [built-in
helpers](https://github.com/aymerick/raymond#built-in-helpers): `if`, `unless`,
`each`, `with`, `lookup`, and `equal`.

To test your templates, you can use the [Handlebars
Sandbox](http://tryhandlebarsjs.com/).

### Default policy

When configuring your integration, customers can specify an array of [LaunchDarkly
policies](https://docs.launchdarkly.com/home/account-security/custom-roles/policies) that
act as a filter for which events to send to your webhook endpoint. To simplify your integration's onboarding, you can specify a default policy which follows best practices for your integration's use case.

Assuming your integration only cares about flag activity, we recommend the following default policy which specifies that LaunchDarkly will notify your integration of all flag activity across production environments from all projects:

```json
      "defaultPolicy": [
        {
          "effect": "allow",
          "resources": ["proj/*:env/production:flag/*"],
          "actions": ["*"]
        }
      ]
```

### Validation

Run `npm run preview YOUR_INTEGRATION_DIR_NAME` to preview your integration's templates with sample data.

Alternatively run `npm run curl YOUR_INTEGRATION_DIR_NAME` to produce a sample `curl` command to send data with your integration's service as if it was sent by the audit log event hook capability.

## Reserved custom properties (`reservedCustomProperties`)

Custom properties allow for data to be stored in LaunchDarkly alongside a feature flag. For example, custom properties are a great place to indicate flag-level associations with data on your service. If you don't have any flag-level associations or configurations, you don't need to use this capability. Read more about custom properties in [our documentation](https://docs.launchdarkly.com/home/advanced/custom-properties).

By default, users need to specify a custom property name and key when attaching the custom property value to a feature flag. This step adds a bit of friction to using custom properties and introduces the opportunity for user error. As a result, developers can _reserve_ a custom property for their integration which makes it much easier for users to correctly add the property's value to feature flags.

Reserved custom properties are simple to define -- they require a `name` and `key`. That's all.

Once your integration is configured by a user, the custom property will start appearing in the dropdown on the flag settings page.
