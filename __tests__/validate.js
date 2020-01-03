const { readdirSync, existsSync } = require('fs');
const Ajv = require('ajv');
const _ = require('lodash');

const schema = require('../manifest.schema.json');

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);

let manifests = [];
const ajv = new Ajv();
const validate = ajv.compile(schema);

const integrationDirs = getDirectories('integrations');
integrationDirs.forEach(dir => {
  const manifest = require(`../integrations/${dir}/manifest.json`);
  manifests.push([dir, manifest]);
});

describe('All integrations', () => {
  test.each(manifests)('Validate %s/manifest.json', (key, manifest) => {
    const res = validate(manifest);
    expect(validate.errors).toBe(null);
    expect(res).toBe(true);
  });

  test.each(manifests)('Icons exist for %s', (key, manifest) => {
    expect(existsSync(`./integrations/${key}/${manifest.icons.square}`)).toBe(
      true
    );
    expect(
      existsSync(`./integrations/${key}/${manifest.icons.horizontal}`)
    ).toBe(true);
  });

  test.each(manifests)('Templates exist for %s', (key, manifest) => {
    const flagTemplatePath = _.get(
      manifest,
      'capabilities.auditLogEventsHook.templates.flag',
      null
    );
    const projectTemplatePath = _.get(
      manifest,
      'capabilities.auditLogEventsHook.templates.project',
      null
    );
    const environmentTemplatePath = _.get(
      manifest,
      'capabilities.auditLogEventsHook.templates.environment',
      null
    );
    const metricTemplatePath = _.get(
      manifest,
      'capabilities.auditLogEventsHook.templates.metric',
      null
    );
    if (flagTemplatePath) {
      expect(existsSync(`./integrations/${key}/${flagTemplatePath}`)).toBe(
        true
      );
    }
    if (projectTemplatePath) {
      expect(existsSync(`./integrations/${key}/${projectTemplatePath}`)).toBe(
        true
      );
    }
    if (environmentTemplatePath) {
      expect(
        existsSync(`./integrations/${key}/${environmentTemplatePath}`)
      ).toBe(true);
    }
    if (metricTemplatePath) {
      expect(existsSync(`./integrations/${key}/${metricTemplatePath}`)).toBe(
        true
      );
    }
  });
});
