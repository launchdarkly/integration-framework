# incident.io

Each configuration of this integration connects one incident.io [HTTP alert source](https://docs.incident.io/alerts/alert-sources) to LaunchDarkly, using the alert source's URL (`https://api.incident.io/v2/alert_events/http/<id>`) and secret token. Both are stored as secrets.

LaunchDarkly uses the configuration to create and resolve alerts on the source, for example from observability alerts.

This first version declares no capabilities: LaunchDarkly Observability reads the configuration and sends alert events to incident.io itself.
