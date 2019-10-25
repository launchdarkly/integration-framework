# LaunchDarkly integrations

[![CircleCI](https://circleci.com/gh/launchdarkly/ld-integrations.svg?style=svg&circle-token=c12dfaa51d070b8bbc8dea0c0adf4c402b5b9123)](https://circleci.com/gh/launchdarkly/ld-integrations)

Feature flags not only provide you control over your deployment and rollout, but
also provides context to other related systems -- giving your team visibility
into how your services react due to changes to flags. This repository contains
LaunchDarkly integrations built by our community. Most of these integrations
consume events from LaunchDarkly in order to provide their users more context.

## Building integrations

There are a few steps to creating an integration with LaunchDarkly.

1. Fork this repository.
2. Create a new top level directory named after your organization or
   integration's name (e.g., `spacexyz`).
3. Create a `manifest.json` inside your new directory. [Read the `manifest.json`
   documentation](./MANIFEST.md) for the details.

A LaunchDarkly integration starts with a `manifest.json`. This file describes
the intent and capabilities of your integration.

## Submitting your integrations

Once you're done with your integration, send us a pull request. Your branch will
be validated and reviewed by someone on our team. Once everything checks out,
we'll publish your integration.

## Got issues?

Please visit our [support site](https://support.launchdarkly.com/hc/en-us).
