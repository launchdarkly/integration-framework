# Capabilities

Your integration's `capabilities` describe how it interacts with LaunchDarkly.

We support the following capabilities:

- [Audit log events hook](#audit-log-events-hook-auditlogeventshook) (`auditLogEventsHook`)
- [Trigger](#trigger-trigger) (`trigger`)
- [Flag link](#flag-link-flaglink) (`flagLink`)
- [Reserved custom properties](#reserved-custom-properties-reservedcustomproperties) (`reservedCustomProperties`)
- [Feature store](#feature-store-featurestore) (`featureStore`)

## Audit log events hook (`auditLogEventsHook`)

An audit log events hook is a webhook that LaunchDarkly sends whenever an event happens inside of LaunchDarkly. Each of these events result in an event being published to LaunchDarkly's audit log. You can use this capability to send data to or trigger an event in another service.

The `auditLogEventsHook` has three properties:

1. [`endpoint`](#endpoint):
   The HTTP handler that will receive the webhook.
2. [`templates`](#templates):
   A map of template paths relative to your integration's directory. You can use templates to transform the raw audit log events to a format that your integration expects. These templates can be any file type.
3. [`defaultPolicy`](#default-policy):
   An array of LaunchDarkly policies. The policies determine which events to send to your webhook endpoint. To learn more, read [Using policies](https://docs.launchdarkly.com/home/members/role-policies).

Here's an example of an audit log events hook capability that subscribes to flag events in a LaunchDarkly account:

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

Every `auditLogEventsHook` capability must specify the [endpoint](endpoint.md) to which LaunchDarkly should send webhook data.

### Templates

Before the `auditLogEventsHook` capability sends the request to the endpoint handling your webhook, you can transform the body of the request sent to your handler.

In your manifest, you can specify templates to be executed when webhook events are of kinds `flag`, `project`, and `environment`. Additionally, you can specify a `default` template as a catch-all for any event without a more specific template. You can also specify a `validation` template to provide users with the ability to validate their connection by sending a test event from LaunchDarkly to your service.

Here is an example:

```json
    "templates": {
      "default": "templates/default.json.hbs",
      "flag": "templates/flag.json.hbs",
      "project": "templates/project.json.hbs",
      "environment": "templates/environment.json.hbs",
      "validation": "templates/default.json.hbs"
    },
```

If you don't provide one or more templates, LaunchDarkly sends you a default JSON payload that looks like this:

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

If you choose to provide one or more templates, LaunchDarkly renders your template using the context data above. Your template can be any text-based format, but you must specify the appropriate `Content-Type` header in your `endpoint.headers` property to match the content type of your template body.

We use a basic subset of the Handlebars template syntax to render your template. To learn more about Handlebars syntax, read [Handlebars Language Guide](https://handlebarsjs.com/guide/).

In addition to the basic language syntax, we support the following [built-in helpers](https://handlebarsjs.com/guide/builtin-helpers.html):

- `if`
- `unless`
- `each`
- `with`
- `lookup`

We also support the following custom helpers:

- `equal`: renders a block if the string version of both arguments are equal
- `pathEncode` - URL path encodes the string version of the argument
- `queryEncode` - URL query encodes the string version of the argument
- `basicAuthHeaderValue`: transforms `username` and `password` arguments into the `Authorization` header value required for a basic auth, including the `Basic ` prefix
- `formatWithOffset`: adds an offset in seconds to a unix milliseconds timestamp and formats the timestamp using one of the supported formats detailed below

We support the following timestamp formats:

- `milliseconds`: Unix milliseconds
- `seconds`: Unix seconds
- `rfc3339`: [RFC3339 format](https://datatracker.ietf.org/doc/html/rfc3339), for example, `2020-02-04T01:02:14Z`
- `simple`: timestamp string formatted as `yyyy-mm-dd h:MM:ss`, for example, `2020-02-04 01:03:59`

To test your templates, you can run `npm run preview $INTEGRATION_NAME` or use the [Handlebars Sandbox](http://tryhandlebarsjs.com/).

### Default policy

Users of your integration can specify an array of [LaunchDarkly policies](https://docs.launchdarkly.com/home/members/role-policies) to filter which events to send to your webhook endpoint.

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

### Include error response body (`includeErrorResponseBody`)

A static domain is one in which the domain part of the endpoint is not a template variable. For endpoints defined with static domains, you can specify the optional property `includeErrorResponseBody` in your `auditLogEventsHook` configuration to view any errors LaunchDarkly receives when it sends events to your endpoint. This is particularly useful for users troubleshooting issues with their integration.

Here is an example:

```json
    "includeErrorResponseBody": true,
    "endpoint": {
        "url": "https://static-domian.com/apiToken?={{apiToken}}",
        "method": "POST"
    },
```

### Validation

To preview your integration's templates with sample data, run `npm run preview $INTEGRATION_NAME`.

Alternatively, to produce a sample `curl` command, run `npm run curl $INTEGRATION_NAME`. This returns data with your integration's service as if it was sent by the audit log event hook capability.

## Trigger (`trigger`)

The trigger capability is used to generate a unique webhook URL that your service can request to generate a user-defined flag change in LaunchDarkly. By default, the trigger URL contains a globally unique path parameter to provide security in the form of an [unguessable URL](https://www.schneier.com/blog/archives/2015/07/googles_unguess.html).

The required `documentation` field must be a link to documentation outlining how webhooks should be configured in your service.

If the integration offers the option to send test events or webhook requests, the optional `testEventNameRegexp` field lets you to specify regex to match the expected `eventName` value. This tells our integration framework not to make any real flag or resource changes associated with matching events.

If your webhooks' request bodies are non-empty, you can specify the optional `parser` object with one or more of `eventName`, `value`, and `url`. The provided values will flow through LaunchDarkly into the resulting audit log messages when your service invokes a trigger in LaunchDarkly.

Here is an example `trigger` capability:

```json
    "trigger": {
      "documentation": "https://example.com/configuring-webhooks",
      "parser": {
        "eventName": "/event",
        "value": "/value",
        "url": "/links/self/href"
      },
    }
```

If an integration only has the trigger capability, the word "trigger" will be added to its name in the LaunchDarkly UI. For this reason, do not include the word "trigger" in the manifest name. Review the [generic-trigger manifest](/integrations/generic-trigger/manifest.json) for an example.

## Flag link (`flagLink`)

The [flag link](https://docs.launchdarkly.com/home/flags/links) capability gives LaunchDarkly users the ability to associate feature flags with resources contained in external services, such as Slack messages and Jira issues. This capability is used to apply custom formatting and metadata to flag links that originate from your integration service.

For complete examples, see the [Slack App manifest](/integrations/slack-app/manifest.json) and the [Jira integration manifest](/integrations/jira/manifest.json).

![The flag "links" tab showcasing Jira and Slack links.](./assets/flag%20links.png)
_The flag "links" tab showcasing Jira and Slack links._

The flag link capability has the following properties:

### `header` (string)

This property specifies the sentence-cased title to show for all flag links for the integration, e.g. "Jira issue", "Slack conversation".

### `metadata` (object)

The `metadata` object specifies the shape of the data the [flag link POST body and API response](<https://apidocs.launchdarkly.com/tag/Flag-links-(beta)#operation/createFlagLink>). Additionally, the metadata can be referenced in the visual representation of the flag link and may be indexed for search purposes. In the integration manifest, the `metadata` object is a mapping of a metadata key to a metadata value object that specifies the format of the metadata item.

For example, the [Jira integration](/integrations/jira/manifest.json) has the following `metadata` object:

```json
"metadata": {
  "creator": {
    "type": "string"
  },
  "iconUrl": {
    "type": "uri"
  },
  "issueKey": {
    "type": "string"
  },
  "issueTitle": {
    "type": "string"
  }
},

```

### `uiBlocks` (object)

The `uiBlocks` object specifies the look and feel of the integration's flag links in the LaunchDarkly UI. Any combination of the following properties can be specified:

- `image` - an object specifying the icon or avatar used to represent the link. Handlebars templating can be utilized in the `sourceUrl` field to reference metadata submitted by the integration when the link is created.

- `title` - an object specifying the flag link title. UI block `elements` are used to provide design flexibility.

- `context` - an object specifying additional information about the flag link. UI block `elements` are used to shape the message.

### UI block elements

The `title` and `context` UI blocks take advantage of UI block elements to provide flexible formatting. A UI block element is an object comprised of a required `text` field and may contain one or more of the following properties:

- `isBold` (boolean) - Whether or not the text should be rendered in bold face.
- `isTimestamp` (boolean) - Whether or not the text should be converted from unix milliseconds to a human-readable format
- `url` (string) - If provided, the block element will link to the rendered URL.

Both the `text` and `url` properties can include handlebars template variables to reference metadata submitted by the integration when the link is created.

For example, the [Slack App integration](/integrations/slack-app/manifest.json)'s `context` UI block is specified as follows:

```json
"context": {
  "elements": [
    { "text": "Posted in" },
    { "text": "#{{{metadata.channelName}}}", "isBold": true },
    { "text": "View message", "url": "{{{deepLink}}}" }
  ]
}
```

This results in flag links context messages in the following format:

> Posted in **#example-channel** [View message](https://example.com)

### `emptyState` (object)

This `emptyState` object species the message used to assist users when there have not been any flag links created for the integration. The `emptyState` object contains two properties:

- `title` - The title heading of the empty state message.
- `leadText` - Text or markup content detailing how users can create flag links for this integration.

For example, the [Jira integration](/integrations/jira/manifest.json)'s `emptyState` object is as follows:

```json
"emptyState": {
  "title": "There are no Jira issues that link to this flag.",
  "leadText": "Jira issues connected to this feature flag will automatically appear here. To learn how to enable the Jira integration or to connect an issue to a feature flag, [read our documentation](https://docs.launchdarkly.com/home/flags/links#creating-jira-flag-links)"
},
```

## Reserved custom properties (`reservedCustomProperties`)

Custom properties allow you to store data in LaunchDarkly alongside a feature flag. For example, you can use custom properties to indicate flag-level associations with data on your service. If you don't have any flag-level associations or configurations, you don't need to use this capability.

To learn more, read [Custom properties](https://docs.launchdarkly.com/home/connecting/custom-properties).

By default, users must specify a custom property name and key when they attach the custom property value to a feature flag. This step introduces the possibility of user error. To prevent this, developers can _reserve_ a custom property for their integration, which makes it much easier for users to correctly add the property's value to feature flags.

Reserved custom properties require a `name` and `key`. Adding a `description` is optional.

After your integration is configured by a user, the custom property starts appearing in the dropdown on the flag's **Settings** page.

Here is an example `reservedCustomProperties` capability:

```json
    "reservedCustomProperties": [
      {
        "name": "Foobar Entities",
        "description": "Foobar Description",
        "key": "foobar"
      }
    ],
```

## Feature store (`featureStore`)

**LaunchDarkly's feature store functionality is only available to customers who have opted in to an Early Access Program (EAP). To access to this feature, [join the EAP](https://launchdarkly.com/eap).**

The feature store capability allows you to specify an endpoint that can receive a payload containing up-to-date flag data from LaunchDarkly.

In addition to [`formVariables`](form-variables.md), the `featureStore` has two properties, a required `featureStoreRequest` and an optional `validationRequest`.

### `featureStoreRequest`

This specifies the request [`endpoint`](endpoint.md) that LaunchDarkly makes when flag data are updated. You can do this using an [`endpoint`](endpoint.md) and a `parser`.

In addition to the form variables defined in your manifest, you can use the special variable `_featureStoreKey`. `_featureStoreKey` is provided by LaunchDarkly, and is unique per environment.

### `validationRequest` (optional)

Specifying a validation request allows customers to verify that they have properly filled out the details to correctly make a request.

The `parser` object allows LaunchDarkly to interpret the response of the validation request. It allows a mapping of success and errors for the given response body of the request in the form of a [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901). The `parser` object has two properties: a required `success` and an optional `error`.

Here is an example `parse` object:

```json
    "parser": {
      "success": "/success",
      "error": "/error"
    },
```

Choose an endpoint that will indicate by its response that the specified form variables are correct, but which has no side effects.

Here is an example `featureStore` capability:

```json
    "featureStoreRequest": {
      "endpoint": {
        "url": "https://example.com/{{accountId}}/dictionary/{{dictId}}/item/{{_featureStoreKey}}",
        "method": "PUT",
        "headers": [
          {
            "name": "Authorization",
            "value": "Bearer {{apiToken}}"
          },
          {
            "name": "Content-Type",
            "value": "text/plain"
          }
        ]
      }
    },
    "validationRequest": {
      "endpoint": {
        "url": "https://example.com/{{accountId}}/dictionary/{{dictId}}/items",
        "method": "GET",
        "headers": [
          {
            "name": "Authorization",
            "value": "Bearer {{apiToken}}"
          }
        ]
      },
      "parser": {
        "success": "/success"
      }
    }
```
