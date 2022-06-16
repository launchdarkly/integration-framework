# LaunchDarkly Integration Framework

[![CircleCI](https://circleci.com/gh/launchdarkly/integration-framework.svg?style=svg&circle-token=9a44436c3b22e7fb6a22df1ad9a2455a0d6f2d34)](https://circleci.com/gh/launchdarkly/integration-framework)

Feature flags give you control over your deployment and rollout. They can also provide context to third-party tools that show you how your application reacts to flag changes. You can integrate these tools with LaunchDarkly using the LaunchDarkly integration framework. For additional background, read [Using the LaunchDarkly integration framework](https://docs.launchdarkly.com/integrations/building-integrations) in our LaunchDarkly product documentation.

This repository contains LaunchDarkly integrations built by our community. Most of these integrations consume events from LaunchDarkly to provide the external tools with more context.

LaunchDarkly's integration framework lets you build one-way integrations from LaunchDarkly to a third-party service. We support a small subset of actions that let you subscribe to LaunchDarkly events to trigger an action or event in your service. You can think of this capability as a webhook, with the added convenience of not having to write your own service to manage the integration. LaunchDarkly manages the configuration, authentication, and transformation of our events to what your service expects without having to create an intermediary service.

## Building your own integrations

We've provided step-by-step instructions to help you build integrations.

To learn more, read [Getting started](https://docs.launchdarkly.com/integrations/partner-integrations/getting-started).

## The LaunchDarkly Technology Partner Program

Using the LaunchDarkly integration framework is just one way to create a relationship with LaunchDarkly. You can unlock more benefits by joining our Technology Partner Program.

To learn more, read [Building partner integrations](https://docs.launchdarkly.com/integrations/partner-integrations). To join the program, visit our [Partners page](https://launchdarkly.com/partners/).

## Submitting bug reports and feature requests

The LaunchDarkly integrations team monitors this repository's [issue tracker](https://github.com/launchdarkly/integration-framework/issues). We respond to all new issues within two business days. Use the issue tracker to file bug reports and feature requests specific to the platform and integrations.

If you want to reach out in private, email [integrations@launchdarkly.com](mailto:integrations@launchdarkly.com).

## Submitting pull requests

We encourage pull requests and other contributions from the community. The LaunchDarkly integrations team responds to all new pull requests within two business days.

Before you submit pull requests, make sure that all temporary or unintended code is removed. Don't worry about adding reviewers to the pull request. The LaunchDarkly integrations team will add themselves.
