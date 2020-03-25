const { readdirSync, existsSync, readFileSync } = require('fs');
const Handlebars = require('handlebars');
const Ajv = require('ajv');
const _ = require('lodash');

const { registerHelpers } = require('../helpers');
const jsonEscape = require('../utils/json-escape');
const schema = require('../manifest.schema.json');
const flagContext = require('../sample-context/flag/update-all-environments');
const projectContext = require('../sample-context/project/update');
const environmentContext = require('../sample-context/environment/update');

registerHelpers();

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);

const getFormVariableContext = formVariables => {
  const endpointContext = {};
  if (formVariables) {
    formVariables.forEach(formVariable => {
      switch (formVariable.type) {
        case 'string':
          endpointContext[formVariable.key] = formVariable.key;
          break;
        case 'boolean':
          endpointContext[formVariable.key] = true;
          break;
        case 'uri':
          endpointContext[formVariable.key] = `https://${formVariable.key}.com`;
          break;
        case 'enum':
          endpointContext[formVariable.key] = formVariable.key;
          break;
      }
    });
  }
  return endpointContext;
};

const isJSONTemplate = templateFilename => {
  const lowercase = templateFilename.toLowerCase();
  return lowercase.endsWith('.json') || lowercase.endsWith('.json.hbs');
};

let manifests = [];
const ajv = new Ajv();
const validate = ajv.compile(schema);

const integrationDirs = getDirectories('integrations');
integrationDirs.forEach(dir => {
  const manifest = require(`../integrations/${dir}/manifest.json`);
  manifests.push([dir, manifest]);
});

const getTemplate = path => {
  const templateString = readFileSync(path, { encoding: 'utf-8' });
  const template = Handlebars.compile(templateString, {
    strict: true,
  });
  return template;
};

const getFullContext = (manifest, context, isJSON) => {
  const formVariables = _.get(manifest, 'formVariables', null);
  const formVariableContext = getFormVariableContext(formVariables);
  const fullContext = isJSON
    ? jsonEscape(Object.assign({}, context))
    : Object.assign({}, context);
  fullContext.formVariables = formVariableContext;
  return fullContext;
};

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

  test.each(manifests)(
    'Referenced form variables exist for %s',
    (key, manifest) => {
      const formVariables = _.get(manifest, 'formVariables', null);
      const endpoint = _.get(
        manifest,
        'capabilities.auditLogEventsHook.endpoint',
        null
      );
      if (endpoint) {
        const endpointContext = getFormVariableContext(formVariables);
        endpointContext.context = flagContext;
        const urlTemplate = Handlebars.compile(endpoint.url, {
          strict: true,
        });
        expect(
          () => urlTemplate(endpointContext),
          `${key}: request URL template must render successfully`
        ).not.toThrow();
        endpoint.headers.forEach(header => {
          const headerTemplate = Handlebars.compile(header.value, {
            strict: true,
          });
          expect(
            () => headerTemplate(endpointContext),
            `${key}: request header (${header.name}) value template must render successfully`
          ).not.toThrow();
        });
      }
    }
  );

  test.each(manifests)(
    'defaultValue types match the type of the formVariable for %s',
    (key, manifest) => {
      const formVariables = _.get(manifest, 'formVariables', null);
      if (formVariables) {
        formVariables.forEach(formVariable => {
          if (!_.isUndefined(formVariable.defaultValue)) {
            if (formVariable.type === 'string' || formVariable.type === 'uri') {
              expect(_.isString(formVariable.defaultValue)).toBe(true);
            } else if (formVariable.type === 'boolean') {
              expect(_.isBoolean(formVariable.defaultValue)).toBe(true);
            }
          }
        });
      }
    }
  );

  test.each(manifests)(
    'Templates can be successfully rendered for %s',
    (key, manifest) => {
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
      const defaultTemplatePath = _.get(
        manifest,
        'capabilities.auditLogEventsHook.templates.default',
        null
      );
      if (flagTemplatePath) {
        const path = `./integrations/${key}/${flagTemplatePath}`;
        expect(existsSync(path)).toBe(true);

        const template = getTemplate(path);
        const isJSON = isJSONTemplate(flagTemplatePath);
        const fullContext = getFullContext(manifest, flagContext, isJSON);
        expect(
          () => template(fullContext),
          `${key}: flag template must render successfully`
        ).not.toThrow();
        // Validate json templates render to valid json
        if (isJSON) {
          const rendered = template(fullContext);
          expect(
            () => JSON.parse(rendered),
            `${key} .json templates must render valid JSON\n${rendered}`
          ).not.toThrow();
        }
      }
      if (projectTemplatePath) {
        const path = `./integrations/${key}/${projectTemplatePath}`;
        expect(existsSync(path)).toBe(true);

        const template = getTemplate(path);
        const isJSON = isJSONTemplate(projectTemplatePath);
        const fullContext = getFullContext(manifest, projectContext, isJSON);
        expect(
          () => template(fullContext),
          `${key}: project template must render successfully`
        ).not.toThrow();
        // Validate json templates render to valid json
        if (isJSON) {
          const rendered = template(fullContext);
          expect(
            () => JSON.parse(rendered),
            `${key} project .json templates must render valid JSON\n${rendered}`
          ).not.toThrow();
        }
      }
      if (environmentTemplatePath) {
        const path = `./integrations/${key}/${environmentTemplatePath}`;
        expect(existsSync(path)).toBe(true);

        const template = getTemplate(path);
        const isJSON = isJSONTemplate(environmentTemplatePath);
        const fullContext = getFullContext(
          manifest,
          environmentContext,
          isJSON
        );
        expect(
          () => template(fullContext),
          `${key}: environment template must render successfully`
        ).not.toThrow();
        // Validate json templates render to valid json
        if (isJSON) {
          const rendered = template(fullContext);
          expect(
            () => JSON.parse(rendered),
            `${key} environment .json templates must render valid JSON\n${rendered}`
          ).not.toThrow();
        }
      }
      if (defaultTemplatePath) {
        const path = `./integrations/${key}/${defaultTemplatePath}`;
        expect(existsSync(path)).toBe(true);
        expect(existsSync(path)).toBe(true);

        const template = getTemplate(path);
        const isJSON = isJSONTemplate(defaultTemplatePath);
        const fullContext = getFullContext(manifest, flagContext, isJSON);
        expect(
          () => template(fullContext),
          `${key}: default template must render successfully`
        ).not.toThrow();
        // Validate json templates render to valid json
        if (isJSON) {
          const rendered = template(fullContext);
          expect(
            () => JSON.parse(rendered),
            `${key} default .json templates must render valid JSON\n${rendered}`
          ).not.toThrow();
        }
      }
    }
  );
});
