# Capabilities

Your integration's `capabilities` describe how it interacts with LaunchDarkly.

We support three capabilities:

- [Audit log events hook](#audit-log-events-hook-auditlogeventshook) (`auditLogEventsHook`)
- [Trigger](#trigger-trigger) (`trigger`)
- [Reserved custom properties](#reserved-custom-properties-reservedcustomproperties) (`reservedCustomProperties`)

## Audit log events hook (`auditLogEventsHook`)

An audit log events hook is a webhook that LaunchDarkly sends whenever an
event happens inside of LaunchDarkly. Each of these events
result in an event being published to LaunchDarkly's audit log.
You can use this capability to send data to or trigger an event in another service.

The `auditLogEventsHook` has three properties:

1. [`endpoint`](#endpoint):
   Describes the HTTP handler that will receive the webhook.
2. [`templates`](#templates):
   A map of template paths relative to your integration's directory. You can use templates to transform the raw audit log events to a format that your integration expects. These templates can be any file type.
3. [`defaultPolicy`](#default-policy):
   An array of [LaunchDarkly
   policies](https://docs.launchdarkly.com/home/account-security/custom-roles/policies) that
   act as a filter determining which events to send to your webhook endpoint.

Here's an example of an audit log events hook capability that subscribes to flag
events in a LaunchDarkly account:

```json
    "capabilities": {
        "auditLogEventsHook": {
            "includeErrorResponseBody": false,
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

Every `auditLogEventsHook` capability must specify the endpoint to which LaunchDarkly should send webhook data. This specification must include all appropriate request semantics including the URL, method, and headers.

In the example
above, a few of the properties (`endpoint.url` and
`endpoint.headers[].value`) accept template variables. These template
variables can reference any `formVariables` you've defined in your manifest.
The templating language we use is based off of a subset of the
Handlebars syntax.

To learn more, read [Handlebars' documentation](https://handlebarsjs.com/).

There are a few properties that allow you to substitute template variables at
runtime. The main ones are the `endpoint.url` and the
`endpoint.headers[].value`. This lets you configure a dynamic endpoint
based on the `formVariables` your integration collects from the user. Examples follow.

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

This example uses the `apiToken` formVariable as a query parameter on the URL:

```json
    "endpoint": {
        "url": "https://example.com/apiToken?={{apiToken}}",
        "method": "POST"
    },
```

### Templates

Before the `auditLogEventsHook` capability sends the request to the endpoint
handling your webhook, you can transform the body of the request
sent to your handler.

In your manifest, you can specify templates to be executed when webhook events are of kinds `flag`, `project`, and `environment`. Additionally, you can specify a `default` template as a catch-all for any event without a more specific template. A `validation` template is also provided in case you want to provide users with the ability to validate their connection by sending a test event from LaunchDarkly to your service.

```json
    "templates": {
      "default": "templates/default.json.hbs",
      "flag": "templates/flag.json.hbs",
      "project": "templates/project.json.hbs",
      "environment": "templates/environment.json.hbs",
      "validation": "templates/default.json.hbs"
    },
```

If you don't provide one or more templates, LaunchDarkly
sends you a default JSON payload that looks like this:

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
    "milliseconds": 1580778134028,
    "seconds": 1580778134,
    "rfc3339": "2020-02-04T01:02:14Z",
    "simple": "2020-02-04 01:02:14"
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

If you choose to provide one or more
`templates`,
LaunchDarkly renders your template using the context data above. Your
template can be any text based format, but you must specify the appropriate
`Content-Type` header in your `endpoint.headers` property to match the content
type of your template body.

We use a basic subset of the Handlebars template syntax to render
your template.

To learn more about Handlebars' sysntax, read [Handlebars' Language
Guide](https://handlebarsjs.com/guide/).

In addition to the basic language syntax, we support the following [built-in
helpers](https://handlebarsjs.com/guide/builtin-helpers.html):

- `if`
- `unless`
- `each`
- `with`
- `lookup`

Furthermore, the following custom helpers are supported:

- `equal` - renders a block if the string version of both arguments are equals
- `pathEncode` - URL path encodes the string version of the argument
- `queryEncode` - URL query encodes the string version of the argument
- `basicAuthHeaderValue` - transforms `username` and `password` arguments into the `Authorization` header value required for a basic auth (including the `Basic ` prefix).
- `formatWithOffset` - adds an offset in seconds to a unix milliseconds timestamp and formats the timestamp using one of the supported formats detailed below.

The following timestamp formats are supported:

- `milliseconds` - unix milliseconds
- `seconds` - unix seconds
- `rfc3339` - [RFC3339 format](https://datatracker.ietf.org/doc/html/rfc3339), e.g., `2020-02-04T01:02:14Z`
- `simple` - timestamp string formatted as `yyyy-mm-dd h:MM:ss`, e.g., `2020-02-04 01:03:59`

To test your templates, you can run `npm run preview $INTEGRATION_NAME` or use the [Handlebars
Sandbox](http://tryhandlebarsjs.com/).

### Default policy

When you configure your integration, customers can specify an array of [LaunchDarkly
policies](https://docs.launchdarkly.com/home/account-security/custom-roles/policies) filter which events to send to your webhook endpoint.

To simplify onboarding your integration, you can specify a default policy which follows best practices for your integration's use case.

Assuming your integration only cares about flag activity, we recommend the following default policy. This policy specifies that LaunchDarkly will notify your integration of all flag activity across production environments from all projects.

Here is the policy:

```json
      "defaultPolicy": [
        {
          "effect": "allow",
          "resources": ["proj/*:env/production:flag/*"],
          "actions": ["*"]
        }
      ]
```

### Include error response body  (`includeErrorResponseBody`)

For endpoints defined with static domains - where the domain part of the endpoint isn't a template variable (see example below), you have the option to specify an optional property `includeErrorResponseBody` in your `auditLogEventsHook` configuration to view any errors LaunchDarkly receives when it sends events to your endpoint. This is particularly useful for users troubleshooting issues with their integration.

Heres the example:

```json
    "includeErrorResponseBody": true,
    "endpoint": {
        "url": "https://static-domian.com/apiToken?={{apiToken}}",
        "method": "POST"
    },
```

### Validation

To preview your integration's templates with sample data, run `npm run preview INTEGRATION_NAME`.

Alternatively, to produce a sample `curl` command, run `npm run curl INTEGRATION_NAME`. This returns data with your integration's service as if it was sent by the audit log event hook capability.

## Trigger (`trigger`)

**At the time of this writing, LaunchDarkly's trigger functionality is only available to customers opted in to an early access program. Email [partnerships@launchdarkly.com](mailto:partnerships@launchdarkly.com) to request access.**

The trigger capability is used to generate a unique webhook URL that your service can request to generate a user-defined flag change in LaunchDarkly.

By default, the trigger URL contains a globally unique path parameter to provide security in the form of an [unguessable URL](https://www.schneier.com/blog/archives/2015/07/googles_unguess.html). However, if your service supports additional security settings such as shared secrets when firing webhooks, you can specify those with the optional `auth` object. **Note**: at launch, the `auth` attribute is unsupported and should be omitted.

The required `documentation` field must be a link to documentation outlining how webhooks should be configured in your service.

If the integration offers the option to send test events / webhook requests, the optional `testEventNameRegexp` fields allows you to specify regex to match the expected `eventName` value below. This will tell our integration framework not to make any real flag or resource changes associated with matching events.

If your webhooks' request bodies are non-empty, you can specify the optional `parser` object with one or more of `eventName`, `value`, and `url`. The provided values will flow through LaunchDarkly into the resulting audit log messages when your service invokes a trigger in LaunchDarkly.

Here is a sample `trigger` capability including all optional properties:

```json
    "trigger": {
      "documentation": "https://example.com/configuring-webhooks",
      "auth": {
        "type": "sharedSecret"
      },
      "parser": {
        "eventName": "/event",
        "value": "/value",
        "url": "/links/self/href"
      },
    }
```

**Note**: if an integration only has the trigger capability, the word "trigger" will be added to its name in the LaunchDarkly UI. For this reason, do not include the word "trigger" in the manifest name. See the [generic-trigger manifest](/integrations/generic-trigger/manifest.json) for an example.

## Reserved custom properties (`reservedCustomProperties`)

Custom properties allow you to store data in LaunchDarkly alongside a feature flag. For example, you can use custom properties to indicate flag-level associations with data on your service. If you don't have any flag-level associations or configurations, you don't need to use this capability.

To learn more, read [Custom properties](https://docs.launchdarkly.com/home/advanced/custom-properties).

By default, users must specify a custom property name and key when they attach the custom property value to a feature flag. This step introduces the possibility of user error. To prevent this, developers can _reserve_ a custom property for their integration, which makes it much easier for users to correctly add the property's value to feature flags.

Reserved custom properties are simple to define. Their only requirements are a `name` and `key`, adding a `description` is optional.

After your integration is configured by a user, the custom property starts appearing in the dropdown on the flag's Settings page.

Here is a sample `reservedCustomProperties` capability:

```json
    "reservedCustomProperties": [
      {
        "name": "Foobar Entities",
        "description": "Foobar Description",
        "key": "foobar"
      }
    ],
```
