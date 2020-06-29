# AppDynamics

[User documentation](https://docs.launchdarkly.com/integrations/appdynamics)

## Setup

1. Create a new OAuth API client within AppDynamics following the documentation outlined [here](https://docs.appdynamics.com/display/PRO45/API+Clients). Your client will need the **Create Events** permission.

2. Navigate the the integrations page within LaunchDarkly and configure new AppDynamics integration. You will be prompted to connect via OAuth. At this point, input you will be prompted to enter your **base URL**, **client_id**, and **client_secret**.

- **base URL**: something like https://launchdarkly-nfr.saas.appdynamics.com
- **client_id**: this will be your AppDynamics account name and name of your newly created API client in the format: `<apiClientName>@<accountName>`
- **client_secret**: This will be the secret generated in step 1.

[API documentation](https://docs.appdynamics.com/display/PRO45/Events+and+Action+Suppression+API)

App dynamics requires the client credentials OAuth 2.0 flow and event information be sent as query parameters. Ensure all query parameters utilize the `queryEncode` helper to avoid 400s.

Run `npm run curl appdynamics` in the root repository directory to generate a `curl` command to send data to AppDynamics.
