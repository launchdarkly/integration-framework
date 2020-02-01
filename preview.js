const { readFileSync } = require('fs');
const Handlebars = require('handlebars');
const _ = require('lodash');

const jsonEscape = require('./utils/json-escape');

const testFileName = 'flag-update.client-side-sdk.json';
const flagUpdateContext = require(`./sample-context/${testFileName}`);

const args = process.argv;

const getFormVariableContext = formVariables => {
  const endpointContext = {};
  if (formVariables) {
    formVariables.forEach(formVariable => {
      const unsubstitutedKey = '$' + _.toUpper(formVariable.key);
      switch (formVariable.type) {
        case 'string':
          endpointContext[formVariable.key] = unsubstitutedKey;
          break;
        case 'boolean':
          endpointContext[formVariable.key] = true;
          break;
        case 'uri':
          endpointContext[formVariable.key] = unsubstitutedKey;
          break;
      }
    });
  }
  return endpointContext;
};

const curl = _.includes(args, '--curl');
const integrationNameIndex = curl ? 3 : 2;

if (args.length <= integrationNameIndex) {
  console.log('Provide an integration directory name:');
  console.log('    npm run preview <INTEGRATION_NAME>');
  console.log('    npm run curl <INTEGRATION_NAME>\n');
  process.exit(1);
}

const integrationName = args[integrationNameIndex];

let manifest;
try {
  manifest = require(`./integrations/${integrationName}/manifest.json`);
} catch (e) {
  console.log(`The "${integrationName}" integration does not exist.\n`);
  process.exit(1);
}
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

  const flagTemplatePath = _.get(
    manifest,
    'capabilities.auditLogEventsHook.templates.flag',
    null
  );

  const path = `./integrations/${integrationName}/${flagTemplatePath}`;
  const headers = endpoint.headers.map(header => {
    const headerTemplate = Handlebars.compile(header.value, {
      strict: true,
    });
    return {
      name: header.name,
      value: headerTemplate(endpointContext)
    };
  });

  const fullContext = jsonEscape(Object.assign({}, flagUpdateContext));
  fullContext.formVariables = getFormVariableContext(formVariables);

  const templateString = readFileSync(path, { encoding: 'utf-8' });
  const flagTemplate = Handlebars.compile(templateString, { strict: true });
  const body = flagTemplate(fullContext);
  
  if (curl) {
    let command = `curl -X ${endpoint.method} \\\n` + `  ${urlTemplate(endpointContext)} \\\n`;
    headers.forEach(header => {
      command += `  -H '${header.name}: ${header.value}' \\\n`;
    });
    command += `  -d '${_.trimEnd(body)}'`;

    console.log('Before running the following curl command, be sure to replace all variables denoted with $.');
    console.log(`The following command was generated with the test file ${testFileName}.\n`);
    console.log(command);
  } else {
    console.log('URL:   ', urlTemplate(endpointContext));
    console.log('METHOD:', endpoint.method);
    headers.forEach(header => {
      console.log(`HEADER: ${header.name}: ${header.value}`);
    });
    console.log(`BODY:\t${testFileName}.json`);
    console.log(body);
  }
} else {
  console.log(`The "${integrationName}" integration does not make any outbound requests from LaunchDarkly.\n`);
  process.exit(0);
}