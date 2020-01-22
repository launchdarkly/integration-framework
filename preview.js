const { readFileSync } = require('fs');
const Handlebars = require('handlebars');
const _ = require('lodash');

const flagUpdateContext = require('./sample-context/flag-update');

const args = process.argv;

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

if (args.length <= 2) {
  console.log('please provide an integration directory name');
  process.exit(1);
}

const integrationName = args[2];

const manifest = require(`./integrations/${integrationName}/manifest.json`);
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
  console.log('URL:   ', urlTemplate(endpointContext));
  console.log('METHOD:', endpoint.method);
  endpoint.headers.forEach(header => {
    const headerTemplate = Handlebars.compile(header.value, {
      strict: true,
    });
    console.log(`HEADER: ${header.name}: ${headerTemplate(endpointContext)}`);
  });

  const flagTemplatePath = _.get(
    manifest,
    'capabilities.auditLogEventsHook.templates.flag',
    null
  );

  const path = `./integrations/${integrationName}/${flagTemplatePath}`;
  const templateString = readFileSync(path, { encoding: 'utf-8' });
  const flagTemplate = Handlebars.compile(templateString, { strict: true });

  const fullContext = Object.assign({}, flagUpdateContext);
  fullContext.formVariables = getFormVariableContext(formVariables);
  console.log('BODY:\tflag-update.json');
  console.log(flagTemplate(fullContext));
}
