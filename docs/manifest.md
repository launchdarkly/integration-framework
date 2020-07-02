# Integration manifest

Each integration contains a manifest defining basic concepts about your
integration and organization. Manifests also instruct LaunchDarkly in how to
interact with your integration.

Defining your manifest is the single most important step in contributing your
integration to LaunchDarkly's platform. It's important to configure your
manifest correctly.

## Introduction

Create an empty `manifest.json` file inside your new directory. You will use the
`manifest.json` to describe your integration's details and capabilities.

The properties of LaunchDarkly's integration manifests are defined through a
[JSON schema](../manifest.schema.json). Many IDEs can provide you inline help
and validation while editing your manifest. You can register the JSON schema in
your IDE to enable this kind of help.

If you use [VSCode](https://code.visualstudio.com/), it detects the settings in
this repository and aplies the schema validation without any additional
configuration.

![vscode-hints](https://gist.githubusercontent.com/rmanalan/447b78a8c00a46c8638cca834c3009a3/raw/264fafe547a82ada8e5c134832bf35508a6b6458/manifest-vscode.png)

## Getting started

The first part of the manifest describes your organization, contacts, URLs, and
a few items LaunchDarkly needs to list your integration properly.

We use most of this information when we render your integration card and
configuration form in the LaunchDarkly UI.

```json
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
  "requiresOAuth": false
}
```

There are a few properties in the manifest that can accept simple
[markdown](https://daringfireball.net/projects/markdown/). One of them is the
`description`.

LaunchDarkly's UI converts markdown to HTML. To get the best results, only use
simple markdown, like links and basic text formatting.

Notice that the `icons` described above are in SVG format. This is intentional.
We do not accept other image formats.

We use your organization's or integration's logo in the LaunchDarkly UI and a
public facing integrations listing on
[launchdarkly.com/integrations](https://launchdarkly.com/integrations/). SVG
files allow your logo to scale nicely on different devices. To make sure your
logo appears correctly everywhere we use it, make sure that your SVG logos don't
have any padding around the image.

Also, notice that the `icon.square` and `icon.horizontal` properties point to
relative paths. These paths are relative to your integration's directory. You
are free to create any directories and files that support your integration.

## OAuth

Many integrations in LaunchDarkly today use API Tokens. However, if your API
requires OAuth for authentication, we can support that as well. Currently, we
support two types of OAuth:

* [Authorization Code Flow](https://oauth.net/2/grant-types/authorization-code/)
  (aka, 3-legged OAuth)
* [Client Credentials Flow](https://oauth.net/2/grant-types/client-credentials/)
  (aka, 2-legged OAuth)

With these flows, LaunchDarkly acts as the OAuth consumer. In order for this to
work, LaunchDarkly will need to store a consumer ID and secret. Please contact
us at <integrations@launchdarkly.com> to register your OAuth consumer details.
You'll also need to set the `requiresOAuth` root-level property in your manifest
to `true`. At runtime, LaunchDarkly will lookup your OAuth consumer ID and
secret from our registry based on your integration key. **Simply setting the
`requiresOAuth` property to `true` will not enable OAuth on your integration --
you'll need to provide us with the OAuth consumer details first.**

## Form variables and capabilities

Form variables and capabilities are the most important part of the manifest.
They define the primary interactions that LaunchDarkly and users will have with
your integration.

Read more about [form variables](form-variables.md) and
[capabilities](capabilities.md).
