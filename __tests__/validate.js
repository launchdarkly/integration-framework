const { readdirSync, existsSync, readFileSync } = require('fs');
const Handlebars = require('handlebars');
const Ajv = require('ajv');
const _ = require('lodash');

const jsonEscape = require('../utils/json-escape');
const schema = require('../manifest.schema.json');
const flagUpdateContext = require('../sample-context/flag-update.client-side-sdk');

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
        endpointContext.context = flagUpdateContext;
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
            if (formVariable.type === "string" || formVariable.type === "uri") {
              expect(_.isString(formVariable.defaultValue)).toBe(true)
            } else if (formVariable.type === "boolean") {
              expect(_.isBoolean(formVariable.defaultValue)).toBe(true)
            }
          }
        })
      }
    }
  )

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
      const metricTemplatePath = _.get(
        manifest,
        'capabilities.auditLogEventsHook.templates.metric',
        null
      );
      if (flagTemplatePath) {
        const path = `./integrations/${key}/${flagTemplatePath}`;
        expect(existsSync(path)).toBe(true);
        const templateString = readFileSync(path, { encoding: 'utf-8' });
        const flagTemplate = Handlebars.compile(templateString, {
          strict: true,
        });

        const formVariables = _.get(manifest, 'formVariables', null);
        const formVariableContext = getFormVariableContext(formVariables);
        const isJSON = isJSONTemplate(flagTemplatePath);
        const fullContext = isJSON
          ? jsonEscape(Object.assign({}, flagUpdateContext))
          : Object.assign({}, flagUpdateContext);
        fullContext.formVariables = formVariableContext;
        expect(
          () => flagTemplate(fullContext),
          `${key}: flag template must render successfully`
        ).not.toThrow();
        // Validate json templates render to valid json
        if (isJSON) {
          const rendered = flagTemplate(fullContext);
          expect(
            () => JSON.parse(rendered),
            `.json templates must render valid JSON\n${rendered}`
          ).not.toThrow();
        }
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
    }
  );
});
