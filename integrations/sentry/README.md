# Sentry

[User documentation](https://example.com)

[API documentation](https://docs.sentry.io/api/)

[API endpoint documentation](https://forum.sentry.io/t/how-can-i-post-with-curl-a-sentry-event-which-authentication-credentials/4759) - It should be noted that the latest version this endpoint functions with is version 7 (header `X-Sentry-Auth: Sentry sentry_version=7`), i.e. it does not seem to have been brought along with more [recent releases](https://github.com/getsentry/sentry/releases). We were also not able to locate documentation of it in the official Sentry docs. This may eventually cause issues if the endpoint is either deprecated or no longer maintained.

Run `npm run curl sentry` in the root repository directory to generate a `curl` command to send data to Sentry.
