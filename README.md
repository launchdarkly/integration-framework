# LaunchDarkly Integration Framework

[![CircleCI](https://circleci.com/gh/launchdarkly/integration-framework.svg?style=svg&circle-token=9a44436c3b22e7fb6a22df1ad9a2455a0d6f2d34)](https://circleci.com/gh/launchdarkly/integration-framework)

Feature flags give you control over your deployment and rollout, but that's not all they do. They also provide context to other related systems, giving your team visibility into how your services react due to flag changes.

This repository contains
LaunchDarkly integrations built by our community. Most of these integrations
consume events from LaunchDarkly to provide their users with more context.

LaunchDarkly's integration framework lets you build one-way integrations from LaunchDarkly to a third party service. We support a small subset of actions that let you subscribe to LaunchDarkly events to trigger an action or event in your service. You can think of this capability as a webhook, with the added convenience of not having to write your own service to manage the integration. LaunchDarkly manages the configuration, authentication, and transformation of our events to what your service expects without having to create an intermediary service.

## Building your own integrations

We've provided step-by-step instructions to help you build integrations.

To learn more, read [Getting started](docs/getting-started.md).

## The LaunchDarkly Technology Partner Program

Using the LaunchDarkly Integration Framework is just one way to create a relationship with LaunchDarkly. You can unlock even more benefits by joining our Technology Partner Program.

To join the program, email us at [partnerships@launchdarkly.com](mailto:partnerships@launchdarkly.com).

## Submitting bug reports and feature requests

The LaunchDarkly integration team monitors this repository's [issue tracker](https://github.com/launchdarkly/integration-framework/issues). We respond to all new issues within two business days. Use the issue tracker to file bug reports and feature requests specific to the platform and integrations.

If you want to reach out in private, email [integrations@launchdarkly.com](mailto:integrations@launchdarkly.com).

## Submitting pull requests

We encourage pull requests and other contributions from the community. The integration team responds to all new pull requests within two business days.

Before you submit pull requests, make sure that all temporary or unintended code is removed. Don't worry about adding reviewers to the pull request; the LaunchDarkly integration team can add themselves.
