const schema = require('../manifest.schema.json');

//disallowsAdditionalProperties deeply checks if a json schema ever sets 'additionalProperties'
// to false. This setting is currently incompatible with the integrations framework.
const disallowsAdditionalProperties = schema => {
  for (prop in schema) {
    if (prop === 'additionalProperties' && schema[prop] === false) {
      return true;
    }
    if (
      typeof schema[prop] === 'object' &&
      disallowsAdditionalProperties(schema[prop])
    ) {
      return true;
    }
  }
  return false;
};

test('Does not set additionalProperties:false', () => {
  expect(disallowsAdditionalProperties(schema)).toBe(false);
});
