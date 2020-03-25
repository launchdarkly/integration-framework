const fs = require('fs');
const $RefParser = require('@apidevtools/json-schema-ref-parser');

const baseSchema = require('./schemas/base.json');

const bundle = async () => {
  try {
    const schema = await $RefParser.bundle(baseSchema);
    fs.writeFileSync(
      'manifest.schema.json',
      JSON.stringify(schema, null, 2) + '\n'
    );
  } catch (e) {
    console.error(e);
  }
};

bundle();
