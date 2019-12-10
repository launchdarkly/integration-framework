# LaunchDarkly integrations

[![CircleCI](https://circleci.com/gh/launchdarkly/ld-integrations.svg?style=svg&circle-token=c12dfaa51d070b8bbc8dea0c0adf4c402b5b9123)](https://circleci.com/gh/launchdarkly/ld-integrations)

Feature flags not only provide you control over your deployment and rollout but
also provides context to other related systems -- giving your team visibility
into how your services react due to changes to flags. This repository contains
LaunchDarkly integrations built by our community. Most of these integrations
consume events from LaunchDarkly to provide their users with more context.

## Getting started: Building an integration

There are a few steps to creating an integration with LaunchDarkly.

1. Fork this repository.
2. Create a new directory inside `[integrations](./integrations)` named after
   your organization or integration's name (e.g., `spacexyz`). Make sure the
   directory has no spaces and uses
   [kebab-casing](https://wiki.c2.com/?KebabCase).
3. Create a `manifest.json` inside your new directory. The `manifest.json` file
   will describe your integration's details and capabilities. We'll describe how
   to fill out this file in the next section.

Aside from the `manifest.json` file, you can create a `README.md` inside your
integration's directory that provides additional information about your
integration. Your directory can also include additional directories and assets
to support your integration -- more on this in the following section.

LaunchDarkly's integration manifest is described through
[schema](./manifest.schema.json). When you submit a pull-request to LaunchDarkly
with your new `manifest.json`, your manifest will be validated against this
schema. To aid you in writing your schema, you can register the
[schema](./manifest.schema.json) in your IDE. If you use
[VSCode](https://code.visualstudio.com/) to create your manifest, VSCode will
automatically provide you with helpful hints and validate your manifest while
you edit.

![vscode-hints](https://gist.githubusercontent.com/rmanalan/447b78a8c00a46c8638cca834c3009a3/raw/264fafe547a82ada8e5c134832bf35508a6b6458/manifest-vscode.png)

### Describing your integration basic information through the Manifest

A LaunchDarkly integration starts with a `manifest.json` file. This file
describes the intent and capabilities of your integration. It also describes
basic information about your organization:

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

The `description` property can contain basic
[markdown](https://daringfireball.net/projects/markdown/) and is used in the
LaunchDarkly UI. The schema will validate the formatting of all properties.

Notice that the `icons` described above are in SVG format. This is intentional.
Your organization's (or integration's) logo will be used in the LaunchDarkly UI
but also inside a public facing integrations listing on <launchdarkly.com>. SVG
files allow your logo to scale nicely on different formats.

### Collecting integration configuration data from LaunchDarkly users

Most integrations will need to collect one or more pieces of configuration data
that supports the integration. Some examples are:

* API token
* Webhook endpoint
* URLs

To support these configurations, you can describe a set of `formVariables` that
describe these configuration properties. Here's an example:

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
            "key": "apiKey",
            "name": "Honeycomb API Key",
            "description": "Enter your [API key](https://example.com/api) here",
            "type": "string",
            "isSecret": true
        }
    ],
    ...
}
```

The `formVariables` entry above will yield the following UI inside of the
[LaunchDarkly Integration
page](https://app.launchdarkly.com/default/integrations):

![Example configuration form](https://gist.githubusercontent.com/rmanalan/447b78a8c00a46c8638cca834c3009a3/raw/810d8941f29c0306021a973bd6cf10c42bdea03b/goaltender-config-ui.png)

## Submitting your integrations

Once you're done with your integration, send us a pull request. Your branch will
be validated and reviewed by someone on our team. Once everything checks out,
we'll publish your integration.

## Got issues?

Please visit our [support site](https://support.launchdarkly.com/hc/en-us).
