# LaunchDarkly Integration Validation Server (beta)

The LaunchDarkly Integration Validation Server is a tool that allows users to test their integration capabilities with LaunchDarkly using an Express server. This server provides an environment where developers can validate their integrations with LaunchDarkly's feature flag management platform.

## Getting Started

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

### Starting the Server

To start the server, run the following command:

```shell
npm run start:server
```

The server will start running and will be listening on port 3000 by default.

## Usage

Once the server is running, you can make HTTP requests to the server endpoints to test your integration. The server provides several routes that simulate LaunchDarkly's API behavior. No authentication token is required to make requests to the endpoints.

### Endpoints

The following endpoints are available:

- POST /api/v2/segment-target/:integrationKey: Simulates processing a segment data from a Customer Data Provider (CDP).

### Endpoints
The LaunchDarkly Integration Validation Server exposes the following endpoints:

| Endpoint           | Method | Description                                   |
|--------------------|--------|-----------------------------------------------|
| `/api/v2/segment-target/:integrationKey`                | POST    | Simulates processing a synced segment data from a Customer Data Provider (CDP). |

### Example Usage

To validate segment from a Customer Data Platform (CDP) will be successfully parsed and processed, you can make a curl request as shown below

```shell
curl --location 'http://localhost:3000/api/v2/segment-target/amplitude' \
--header 'Content-Type: application/json' \
--data '{
  "environmentId": "abcd123",
  "batch": [
    {
      "userId": "user-1234",
		  "cohortName": "Amplitude Segment 1235",
    	"cohortId": "segment-12345",
    	"cohortUrl":  "https://example-cdp.com",
    	"value": true
    }
  ]
}'
```

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the project's GitHub repository.
