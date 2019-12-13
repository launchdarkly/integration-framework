The LaunchDarkly integration lets you insert feature flag actions directly into your Pipeline's continuous delivery flow. Bitbucket Pipelines is a continuous delivery platform that lets your team build, test, and deploy from Bitbucket. It exists within Bitbucket, giving you end-to-end visibility from coding to deployment.

We provide two scripts you can add to your pipelines:

- Create feature flags in your Pipelines build: This lets you create feature flags within a specified project. The feature flag will be created in all environments for that project.
- Enable a feature flag in your Pipelines build: This lets you turn on a specific feature flag for a specific environment within a project.