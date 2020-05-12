# Getting started

There are several steps to building an integration with LaunchDarkly.

## Step 0: Replicate your desired behavior with `curl`

Prior to connecting LaunchDarkly with a third-party service, you should replicate your integration's desired behavior in an isolated environment (standalone from LaunchDarkly). The easiest way to do this is by using [`curl`](https://curl.haxx.se/docs/manpage.html). A lot of API documentation has `curl` example commands provided for developers to use. Find the API documentation for your third-party service and execute sample commands against it. Take note of the request semantics. This will help streamline your manifest and template definitions.

## Step 1: Fork this Repository

You will need to fork this repository to your own GitHub account. When you've
completed your integration, you can [submit a pull request to
LaunchDarkly](#step-8-submit-your-integration) for it to get approved and
deployed.

## Step 2: Create a new directory inside `./integrations`

Create a new directory inside the [integrations](../integrations) directory named
after your organization or integration's name (e.g., `example-dot-com`). Make
sure the directory has no spaces and uses
[kebab-casing](https://wiki.c2.com/?KebabCase).

You should only change files and directories inside your new directory. Our
validation process will reject any pull requests that attempt to modify content
outside of your directory.

## Step 3: Create your integration manifest

Each integration contains a manifest defining how basics about your integration and organization,
and instructing how LaunchDarkly should interact with your integration. Defining your manifest is the single most important step in contributing your integration to LaunchDarkly's platform.

[Read more](manifest.md).

## Step 4: Collect integration configuration data from LaunchDarkly users

Most integrations will need to collect one or more pieces of configuration data
that supports the integration. Some examples include API tokens or webhook endpoints.

To support these configurations, you can describe a set of
`formVariables` that define these configuration properties.

[Read more](form-variables.md).

## Step 5: Define your integration's capabilities

The third part of defining your LaunchDarkly integration is describing its
`capabilities`. Your integration's `capabilities` describe how it interacts with LaunchDarkly.

[Read more](capabilities.md).

## Step 6: Validate your integration

Run `npm install` to install the validation dependencies. Run `npm test` to run the validation suite. In addition, we
recommend install [pre-commit](https://pre-commit.com/#install) hooks with `pre-commit install` to have the validation suite run before every commit.

Additionally, some of the capabilities have their own validation tools. Refer to the [capabilities documentation](capabilities.md) for more information.

## Step 7: Create your user documentation and README

Now that your integration is built and validated, you'll want to provide documentation --
both for users and integration maintainers.

LaunchDarkly's user documentation is accessible on [docs.launchdarkly.com](https://docs.launchdarkly.com/integrations). Third-party contributions can be submitted to our [LaunchDarkly-Docs repository](https://github.com/launchdarkly/LaunchDarkly-Docs). You'll want to submit a pull request to this repository with a new integrations guide. Follow the pattern and language used by existing integration guides.

In addition to user documentation, you'll want to provide guidance on how to maintain and test your integration. You should specify this developer-focused information in an integration README (`README.md`) in your integration's directory. Additionally
the README should link to your user documentation worked mentioned above.

## Step 8: Submit your integration

Once you're done with your integration, [submit a pull request against this
repo](https://github.com/launchdarkly/integration-framework/pull/new/master). Your
branch will run through some automated validations and will be reviewed by
our team. Once everything checks out, we'll publish your integration
when you give us the green light.

We'll also work with you on submitting and approving your user documentation to our [LaunchDarkly-Docs repository](https://github.com/launchdarkly/LaunchDarkly-Docs).
