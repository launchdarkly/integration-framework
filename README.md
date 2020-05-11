# LaunchDarkly Integration Framework

[![CircleCI](https://circleci.com/gh/launchdarkly/ld-integrations.svg?style=svg&circle-token=c12dfaa51d070b8bbc8dea0c0adf4c402b5b9123)](https://circleci.com/gh/launchdarkly/ld-integrations)

Feature flags not only provide you control over your deployment and rollout but
also provides context to other related systems -- giving your team visibility
into how your services react due to changes to flags. This repository contains
LaunchDarkly integrations built by our community. Most of these integrations
consume events from LaunchDarkly to provide their users with more context.

Currently, LaunchDarkly's integration framework allows you to build one-way integrations (LaunchDarkly to 3rd party). We currently support a small subset of capabilities that allow you to subscribe to events in LaunchDarkly to trigger an action or event in your service. You can think of this capability as a webhook, but with the added convenience of not having to write your own service to manage the integration. LaunchDarkly will manage the configuration, authentication, and transformation of our events to what your service expects without having to create an intermediary service.

## Getting started

Read our [step-by-step instructions](docs/getting-started.md) on getting started with building an integration.

## Partnership program

Leveraging the Integration Framework is just one step in creating a technology partnership with LaunchDarkly. Join our Technology Partner Program in order to unlock all of the partner benefits by emailing us at [partnerships@launchdarkly.com](mailto:partnerships@launchdarkly.com).

## Submitting bug reports and feature requests

The LaunchDarkly integration team monitors the [issue tracker](https://github.com/launchdarkly/ld-integrations/issues) in this repository. Bug reports and feature requests specific to the platform and integrations should be filed in this issue tracker. The integration team will respond to all newly filed issues within two business days.

If you want to reach out more privately, email [integrations@launchdarkly.com](mailto:integrations@launchdarkly.com).

## Submitting pull requests

We encourage pull requests and other contributions from the community. Before submitting pull requests, ensure that all temporary or unintended code is removed. Don't worry about adding reviewers to the pull request; the LaunchDarkly integration team will add themselves. The integration team will acknowledge all pull requests within two business days.
