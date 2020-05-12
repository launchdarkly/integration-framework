const { readdirSync, existsSync, readFileSync } = require('fs');
const _ = require('lodash');
const jsonpointer = require('jsonpointer');

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);

let manifests = [];

const integrationDirs = getDirectories('integrations');
integrationDirs.forEach(dir => {
  const manifest = require(`../integrations/${dir}/manifest.json`);
  manifests.push([dir, manifest]);
});

externalConditionManifests = manifests.filter(manifest => {
  return _.get(manifest[1], 'capabilities.externalCondition', null) !== null;
});

describe('All externalCondition integrations', () => {
  test.each(externalConditionManifests)(
    'Validate %s externalCondition',
    (key, manifest) => {
      // Validate creation parser is defined
      const creationParser = _.get(
        manifest,
        'capabilities.externalCondition.creation.parser',
        undefined
      );
      expect(
        creationParser,
        `${key}: creation parser must be defined`
      ).toBeDefined();

      // Validate sample response exists and matches up with the parser
      const sampleResponsePath = _.get(
        manifest,
        'capabilities.externalCondition.creation.sampleResponse',
        undefined
      );
      const fullResponsePath = `./integrations/${key}/${sampleResponsePath}`;
      expect(
        existsSync(fullResponsePath),
        `${key}: sample response file must exist`
      ).toBe(true);

      const sampleResponse = require('.' + fullResponsePath);
      _.forIn(creationParser, (pointer, k) => {
        responseValue = jsonpointer.get(sampleResponse, pointer);
        expect(
          responseValue,
          `${key}: ${k} pointer ${pointer} must point to a value in the sample response`
        ).toBeDefined();
      });

      // Validate the template path is correct
      const templatePath = _.get(
        manifest,
        'capabilities.externalCondition.creation.template',
        undefined
      );
      const fullTemplatePath = `./integrations/${key}/${templatePath}`;
      expect(
        existsSync(fullTemplatePath),
        `${key}: creation template file must exist`
      ).toBe(true);
    }
  );
});
