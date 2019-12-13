This integration allows you to use a persistent feature store to keep flag data.

In their default configuration, LaunchDarkly's server-side SDKs:

- connect to LaunchDarkly and receive feature flag data
- store the flags in memory
- update the in-memory state if LaunchDarkly sends updates

Flag evaluations always refer to the last known state in memory. This collection of last known flag data is the "feature store."

This integration allows you to use Consul for this purpose.

There are two ways to use it:

- Exactly like the default configuration, except substituting a database for the in-memory store, or
- Using only the database as a source of flag data, without connecting to LaunchDarkly