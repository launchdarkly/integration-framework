# AppDynamics

[LaunchDarkly documentation](https://docs.launchdarkly.com/integrations/appdynamics)

## Setup

1. Create a new OAuth API client within AppDynamics following the instructions outlined [in the AppDynamics documentation](https://docs.appdynamics.com/display/PRO45/API+Clients). Your client needs the **Create Events** permission.

2. Navigate the the integrations page within LaunchDarkly and configure new AppDynamics integration. You are prompted to connect using OAuth.

3. You are prompted to enter your **base URL**, **client_id**, and **client_secret**:

- **base URL**: this is something similar to https://launchdarkly-nfr.saas.appdynamics.com
- **client_id**: this is your AppDynamics account name and the name of your newly created API client in the format: `<apiClientName>@<accountName>`
- **client_secret**: this is the secret generated in step 1

[API documentation](https://docs.appdynamics.com/display/PRO45/Events+and+Action+Suppression+API)

AppDynamics requires that you send the client credentials OAuth 2.0 flow and event information as query parameters. Ensure all query parameters utilize the `queryEncode` helper to avoid 400s.

Run `npm run curl appdynamics` in the root repository directory to generate a `curl` command to send data to AppDynamics.
