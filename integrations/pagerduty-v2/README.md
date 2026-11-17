# PagerDuty

Each configuration of this integration connects one PagerDuty service to LaunchDarkly, using the integration key of an [Events API v2 integration](https://support.pagerduty.com/main/docs/services-and-integrations#add-integrations-to-an-existing-service) on that service. The key is stored as a secret.

LaunchDarkly uses the configuration to create and resolve incidents on the service, for example from observability alerts.

This first version declares no capabilities: LaunchDarkly Observability reads the configuration and sends events to PagerDuty itself.
