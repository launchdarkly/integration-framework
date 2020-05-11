# Integration manifest

Each integration contains a manifest defining the basics about your integration and organization,
and instructing how LaunchDarkly should interact with your service. Defining your manifest is the single most important step in contributing your integration to LaunchDarkly's platform.

## Introduction

Create an empty
`manifest.json` file inside your new directory. The `manifest.json` file will describe your
integration's information and capabilities.

The properties of LaunchDarkly's integration manifests are defined through a
[JSON schema](../manifest.schema.json).
Many IDEs can provide you inline help and validation while editing your
manifest. To enable this you can register the JSON
schema in your IDE. If you use
[VSCode](https://code.visualstudio.com/), VSCode will detect the settings in
this repository and apply the schema validation without any additional
configuration.

![vscode-hints](https://gist.githubusercontent.com/rmanalan/447b78a8c00a46c8638cca834c3009a3/raw/264fafe547a82ada8e5c134832bf35508a6b6458/manifest-vscode.png)

## Basics

The first part of the manifest describes your organization, contacts, URLs, and
a few things we need to list your integration properly. We will use most of this
information when rendering your integration card and configuration form
inside the LaunchDarkly UI.

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
  }
}
```


There are a few properties in the manifest that can accept simple
[markdown](https://daringfireball.net/projects/markdown/). One of them is the
`description`.
This markdown format will get converted to HTML in LaunchDarkly's UI. Only use
simple markdown structures like links and basic text formatting.

Notice that the `icons` described above are in SVG format. This is intentional. Your organization's (or
integration's) logo will be used in the LaunchDarkly UI but also inside a public
facing integrations listing on
[launchdarkly.com/integrations](https://launchdarkly.com/integrations/). SVG
files allow your logo to scale nicely on different devices. We do not accept other image formats.
In order for your logos to look great wherever we use them in LaunchDarkly, make sure your
SVG logos don't have any padding around the logo.

Also, notice that the `icon.square` and `icon.horizontal` properties point to
relative paths. These paths are relative to your integration's directory. You are
free to create any directories and files that support your integration.

## Form variables and capabilities

Form variables and capabilities make up the most important part of the manifest as they
define the primary interactions that LaunchDarkly and users will have with your integration.

Read more about [form variables](form-variables.md) and [capabilities](capabilities.md).
