const { getManifests } = require('./__utils__');

const manifests = getManifests();

const [_, akamaiEdgeWorkerManifest] = manifests.find(
  ([dir, mfst]) => dir === 'akamai-edgeworkers'
);

// We're validating Akamai specific manifest because it uses a custom handlebar helper
// called edgeGridAuth which expects certain arguments to generate a valid auth token
describe("Validate Akamai EdgeWorker's edgeGrid auth helper ", () => {
  test('manifest exists', () => {
    expect(akamaiEdgeWorkerManifest).toBeDefined();
  });

  // currently the edgeGridAuth helper does not support http POST, this is because for POST requests
  // the request body needs to be included in the header signature and we dont have the request body
  // available when the template is being rendered. To support POST methods the edgeGridAuth helper needs to refactored.
  test('validation and feature request endpoint method is not POST', () => {
    const unsupportedMethod = ['POST'];
    const validationHttpMethod =
      akamaiEdgeWorkerManifest.capabilities.featureStore.validationRequest
        .endpoint.method;
    expect(unsupportedMethod.includes(validationHttpMethod.toUpperCase())).toBe(
      false
    );

    const featureStoreHttpMethod =
      akamaiEdgeWorkerManifest.capabilities.featureStore.featureStoreRequest
        .endpoint.method;
    expect(
      unsupportedMethod.includes(featureStoreHttpMethod.toUpperCase())
    ).toBe(false);
  });

  test('validation endpoint path and http method matches edgegrid host', () => {
    const httpMethod =
      akamaiEdgeWorkerManifest.capabilities.featureStore.validationRequest
        .endpoint.method;
    const endpointUrl =
      akamaiEdgeWorkerManifest.capabilities.featureStore.validationRequest
        .endpoint.url;
    const urlPath = endpointUrl.replace('https://{{hostname}}', '');

    const authHeader =
      akamaiEdgeWorkerManifest.capabilities.featureStore.validationRequest
        .endpoint.headers[0].value;
    expect(authHeader).toEqual(
      `{{edgeGridAuth '${httpMethod}' '${urlPath}' hostname network namespaceId groupId _featureStoreKey clientSecret clientToken accessToken}}`
    );
  });

  test('feature store endpoint path and http method matches edgegrid host', () => {
    const httpMethod =
      akamaiEdgeWorkerManifest.capabilities.featureStore.featureStoreRequest
        .endpoint.method;
    const endpointUrl =
      akamaiEdgeWorkerManifest.capabilities.featureStore.featureStoreRequest
        .endpoint.url;
    const urlPath = endpointUrl.replace('https://{{hostname}}', '');

    const authHeader =
      akamaiEdgeWorkerManifest.capabilities.featureStore.featureStoreRequest
        .endpoint.headers[0].value;
    expect(authHeader).toEqual(
      `Bearer {{edgeGridAuth '${httpMethod}' '${urlPath}' hostname network namespaceId groupId _featureStoreKey clientSecret clientToken accessToken}}`
    );
  });
});
