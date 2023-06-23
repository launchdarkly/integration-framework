# LaunchDarkly Integration Validation Server (beta)

The LaunchDarkly Integration Validation Server is a tool that allows developers to test their integrations with LaunchDarkly using an Express server. This server provides an environment where developers can validate their integrations with LaunchDarkly's feature flag management platform.

## Getting started

To use the LaunchDarkly Integration Validation Server, follow the steps below:

### Prerequisites

- Node.js (version 16 or above)
- npm (Node Package Manager)

### Installation

1. Clone the repository to your local machine:

```shell
git clone https://github.com/launchdarkly/integration-framework.git
```

2. Install the required dependencies:

```shell
npm install
```

### Starting the server

To start the server, run the following command:

```shell
npm run start:server
```

The server starts running and listens on port 3000 by default.

## Usage

After the server is running, you can make HTTP requests to the server endpoints to test your integration. The server provides several routes that simulate LaunchDarkly's API behavior. No authentication token is required to make requests to the endpoints.

### Endpoints
The LaunchDarkly Integration Validation Server exposes the following endpoints:

| Endpoint           | Method | Description                                   |
|--------------------|--------|-----------------------------------------------|
| `/api/v2/segment-target/:integrationKey`                | POST    | Simulates processing a synced segment data from a Customer Data Provider (CDP). |

### Example usage

To validate that a segment from a Customer Data Platform (CDP) will be successfully parsed and processed, you can make the following curl request:

```shell
curl --location 'http://localhost:3000/api/v2/segment-target/example-integration-key' \
--header 'Content-Type: application/json' \
--data '{
  "environmentId": "abcd123",
  "batch": [
    {
      "userId": "user-1234",
		  "cohortName": "Example Segment 1234",
    	"cohortId": "segment-12345",
    	"cohortUrl":  "https://example-cdp.com",
    	"value": true
    }
  ]
}'
```

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the project's GitHub repository.
