# incident.io Alert Source

This integration sends LaunchDarkly alerts, for example from observability alerts, to incident.io [HTTP alert sources](https://docs.incident.io/alerts/alert-sources).

Each configuration connects one HTTP alert source, using the alert source's URL (`https://api.incident.io/v2/alert_events/http/<id>`) and bearer token. incident.io shows the bearer token when you create the alert source, and LaunchDarkly sends it as `Authorization: Bearer <token>`. Both values are stored as secrets. Add a configuration for each alert source you want LaunchDarkly to send to.

This first version declares no capabilities: LaunchDarkly Observability reads the configuration and sends alert events to incident.io itself.
