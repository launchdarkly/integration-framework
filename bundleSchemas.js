const fs = require('fs');
const $RefParser = require('@apidevtools/json-schema-ref-parser');

const manifestBaseSchema = require('./schemas/base.json');

const bundle = async () => {
  try {
    const manifestSchema = await $RefParser.bundle(manifestBaseSchema);
    fs.writeFileSync(
      'manifest.schema.json',
      JSON.stringify(manifestSchema, null, 2) + '\n'
    );
  } catch (e) {
    console.error(e);
  }
};

bundle();
