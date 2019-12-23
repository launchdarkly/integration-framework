# LaunchDarkly integrations

[![CircleCI](https://circleci.com/gh/launchdarkly/ld-integrations.svg?style=svg&circle-token=c12dfaa51d070b8bbc8dea0c0adf4c402b5b9123)](https://circleci.com/gh/launchdarkly/ld-integrations)

Feature flags not only provide you control over your deployment and rollout but
also provides context to other related systems -- giving your team visibility
into how your services react due to changes to flags. This repository contains
LaunchDarkly integrations built by our community. Most of these integrations
consume events from LaunchDarkly to provide their users with more context.

## Getting started

There are several steps to creating an integration with LaunchDarkly.

### Step 1: Fork this Repository

You will need to fork this repository to your own Github account. When you've
completed your integration, you can [submit a pull request to
LaunchDarkly](#step-7-submitting-your-integration) for it to get approved and
deployed.

### Step 2: Create a new directory inside `./integrations`

Create a new directory inside the [integrations](./integrations) directory named
after your organization or integration's name (e.g., `example-dot-com`). Make
sure the directory has no spaces and uses
[kebab-casing](https://wiki.c2.com/?KebabCase).

You should only change files and directories inside your new directory. Our
validation process will reject any pull requests that attempt to modify content
outside of your directory.

### Step 3: Create your integration manifest

Create an empty
[`manifest.json`](https://github.com/launchdarkly/ld-integrations/blob/master/MANIFEST.md#launchdarkly-integrations-manifest-properties)
file inside your new directory. The `manifest.json` file will describe your
integration's information and capabilities.

The properties of LaunchDarkly's integration manifest are defined through a
[JSON schema](./manifest.schema.json) and has a [corresponding schema
documentation](https://github.com/launchdarkly/ld-integrations/blob/master/MANIFEST.md).
Many IDEs can provide you inline help and validation while editing your
manifest. To enable this you can register the [JSON
schema](./manifest.schema.json) in your IDE. If you use
[VSCode](https://code.visualstudio.com/), VSCode will detect the settings in
this repository and apply the schema validation without any additional
configuration.

![vscode-hints](https://gist.githubusercontent.com/rmanalan/447b78a8c00a46c8638cca834c3009a3/raw/264fafe547a82ada8e5c134832bf35508a6b6458/manifest-vscode.png)

### Step 4: Describe your integration's basic information inside the manifest

The first part of the manifest describes your organization, contacts, URLs, and
a few things we need to list your integration properly:

```
{
  "name": "Sample Integration",
  "version": "1.0.0",
  "overview": "Short one-liner describing your integration",
  "description": "Send flag data to space. Markdown based description.",
  "author": "Example Dot Com",
  "supportEmail": "support@example.com",
  "links": {
    "site": "https://example.com",
    "privacyPolicy": "https://example.com/privacy"
  },
  "categories": ["apm", "monitoring", "alerts"],
  "icons": {
    "square": "assets/images/square.svg",
    "horizontal": "assets/images/horizontal.svg"
  },
  ...
}
```

The example above describes the basic information about your integration. We
will use most of the information above when rendering your integration
configuration form inside the LaunchDarkly UI.

There are a few properties in the manifest that can accept simple
[markdown](https://daringfireball.net/projects/markdown/). One of them is the
[`description`](https://github.com/launchdarkly/ld-integrations/blob/master/MANIFEST.md#description).
This markdown format will get converted to HTML in LaunchDarkly's UI. Only use
simple markdown structures like links and basic text formatting.

Notice that the
[`icons`](https://github.com/launchdarkly/ld-integrations/blob/master/MANIFEST.md#icons)
described above are in SVG format. This is intentional. Your organization's (or
integration's) logo will be used in the LaunchDarkly UI but also inside a public
facing integrations listing on
[launchdarkly.com/integrations](https://launchdarkly.com/integrations/). SVG
files allow your logo to scale nicely on different devices. We do not accept
other image formats.

Also, notice that the `icon.square` and `icon.horizontal` properties point to a
relative path. This path is relative to your integration's directory. You are
free to create any directories and files that support your integration.

You can also create a `README.md` inside your integration's directory that
provides additional information about your integration. If provided, we may use
your `README.md` as documentation to your integration.

### Step 5: Collecting integration configuration data from LaunchDarkly users

Most integrations will need to collect one or more pieces of configuration data
that supports the integration. Some examples include:

- API token
- Webhook endpoint
- URLs

To support these configurations, you can describe a set of
[`formVariables`](https://github.com/launchdarkly/ld-integrations/blob/master/MANIFEST.md#formvariables)
that define these configuration properties. Here's an example:

```
{
    ...
    "formVariables": [
        {
            "key": "endpointUrl",
            "name": "Webhook endpoint URL",
            "description": "Enter the URL to the webhook endpoint",
            "default": "https://example.com/inbound_webhook",
            "type": "url",
            "isSecret": false
        },
        {
            "key": "apiToken",
            "name": "API Key",
            "description": "Enter your [API key](https://example.com/api) here",
            "type": "string",
            "isSecret": true
        }
    ],
    ...
}
```

The
[`formVariables`](https://github.com/launchdarkly/ld-integrations/blob/master/MANIFEST.md#formvariables)
entry above will yield the following UI inside of the [LaunchDarkly Integration
page](https://app.launchdarkly.com/default/integrations):

![Example configuration
form](https://gist.githubusercontent.com/rmanalan/447b78a8c00a46c8638cca834c3009a3/raw/810d8941f29c0306021a973bd6cf10c42bdea03b/goaltender-config-ui.png)

The `formVariables[].description` will be used as a field label on the UI. You
can use simple markdown to link a word or phrase to an external URL.

### Step 6: Define your integration's capabilities

The third part of defining your LaunchDarkly integration is describing its
[capabilities](https://github.com/launchdarkly/ld-integrations/blob/master/MANIFEST.md#capabilities).

As of today, we support only one capability, [Audit Log Event
Hook](https://github.com/launchdarkly/ld-integrations/blob/master/MANIFEST.md#auditlogeventshook).
An Audit Log Event Hook is a webhook that's sent by LaunchDarkly whenever an
event happens inside of LaunchDarkly. This capability can be used to trigger an
event in another service.

Here's an example of an Audit Log Event Hook capability that subscribes to flag
events in a LaunchDarkly account:

```
{
    ...
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
    ...
}
```

The
[`auditLogEventsHook`](https://github.com/launchdarkly/ld-integrations/blob/master/MANIFEST.md#auditlogeventshook)
has three properties:

1. [`endpoint`](https://github.com/launchdarkly/ld-integrations/blob/master/MANIFEST.md#endpoint):
   Describes the HTTP handler that will receive the webhook. In the example
   above, you'll notice that a few of the properties (`endpoint.url` and
   `endpoint.headers[].value`) will accept template variables. These template
   variables can reference any `formVariables` you've defined in your manifest.
   The templating language we use is based off of
   [Handlebars](https://handlebarsjs.com/) syntax.
2. [`templates`](https://github.com/launchdarkly/ld-integrations/blob/master/MANIFEST.md#templates):
   A map of template paths relative to your integration's directory. These
   templates can be any file type.
3. [`defaultPolicy`](https://github.com/launchdarkly/ld-integrations/blob/master/MANIFEST.md#defaultpolicy):
   An array of [LaunchDarkly
   policies](https://docs.launchdarkly.com/docs/policies-in-custom-roles) that
   act as a filter for which events to send to your webhook endpoint. These
   policies can be overriden by users subscribing to your integration.

#### Endpoint template variables

There are a few properties that allow template variables to be substituted at
runtime. The main ones are the `endpoint.url` and the
`endpoint.headers[].value`. This will allow you to configure a dynamic endpoint
based on the `formVariables` your integration collects from the user. Here are
some examples:

```
This first example will utilize the `endpointUrl` formVariable as the URL of the endpoint and use the `apiToken` as a `Bearer` token in the `Authorization` header.
...
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
...

This next example uses the `apiToken` formVariable as a query parameter on the URL.
...
    "endpoint": {
        "url": "https://example.com/apiToken?={{apiToken}}",
        "method": "POST"
    },
...

```

#### Template files

Before the `auditLogEventsHook` capability sends the request to the endpoint
handling your webhook, you have the option to transform the body of the request
sent to your handler. If you don't provide one or more templates, LaunchDarkly
will send you a default JSON payload that looks like this:

```
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
[`templates`](https://github.com/launchdarkly/ld-integrations/blob/master/MANIFEST.md#templates),
LaunchDarkly will render your template using the context data above. Your
template can be any text based format, but make sure you specify the appropriate
`Content-Type` header in your `endpoint.headers` property to match the content
type of your template body.

We use basic [Handlerbars](https://handlebarsjs.com/) template syntax to render
your template. Check out [Handlebars' Language
Guide](https://handlebarsjs.com/guide/) for more information on its syntax. In
addition to the basic language syntax, we support the following [built-in
helpers](https://github.com/aymerick/raymond#built-in-helpers): `if`, `unless`,
`each`, `with`, `lookup`, and `equal`.

To test your templates, you can use the [Handlebars
Sandbox](http://tryhandlebarsjs.com/).

### Step 7: Validating your integration

Run `npm install` to install the validation dependencies. Run `npm test` to run the validation suite. In addition, we
recommend install pre-commit hooks with `pre-commit install` to have the validation suite run before every commit.

### Step 8: Submitting your integration

Once you're done with your integration, [submit a pull request against this
repo](https://github.com/launchdarkly/ld-integrations/pull/new/master). Your
branch will run through some automated validations and will be reviewed by
someone on our team. Once everything checks out, we'll publish your integration
when you give us the green light.

## Comments, suggestions, bug reports?

Visit us in our Slack channel
[#ext-integrations](https://slack.com/share/IRL109MRU/5xRnR28csBsnn6zMDRlXHLAf/enQtODcwMDM0MzI3ODc4LWVkYzZkOTMwNGZkZGMxNjczYzdkNTMzMzE5M2ZmZjFiY2NkZjg3N2FlZjAwYWU1NjZkYzdhYzY1NzI5M2RiZjQhttps://slack.com/share/IRL109MRU/5xRnR28csBsnn6zMDRlXHLAf/enQtODcwMDM0MzI3ODc4LWVkYzZkOTMwNGZkZGMxNjczYzdkNTMzMzE5M2ZmZjFiY2NkZjg3N2FlZjAwYWU1NjZkYzdhYzY1NzI5M2RiZjQ)
or log an issue or request
[here](https://github.com/launchdarkly/ld-integrations/issues).
