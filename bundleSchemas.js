const fs = require('fs');
const $RefParser = require('@apidevtools/json-schema-ref-parser');

const manifestBaseSchema = require('./schemas/base.json');

const bundle = async () => {
  try {
    const bundledManifestSchema = await $RefParser.bundle(manifestBaseSchema);
    const dereferencedManifestSchema = await $RefParser.dereference(
      bundledManifestSchema
    );
    fs.writeFileSync(
      'manifest.schema.json',
      JSON.stringify(dereferencedManifestSchema, null, 2) + '\n'
    );
  } catch (e) {
    console.error(e);
  }
};

bundle();
