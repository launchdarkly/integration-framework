# incident.io

This integration connects incident.io to LaunchDarkly. Its current use is sending alerts to incident.io [HTTP alert sources](https://docs.incident.io/alerts/alert-sources), for example from observability alerts.

Each configuration connects one HTTP alert source, using the alert source's URL (`https://api.incident.io/v2/alert_events/http/<id>`) and bearer token. incident.io shows the bearer token when you create the alert source, and LaunchDarkly sends it as `Authorization: Bearer <token>`. Both values are stored as secrets. To send alerts to several alert sources, add a configuration for each one.

This first version declares no capabilities: LaunchDarkly Observability reads the configuration and sends alert events to incident.io itself.
