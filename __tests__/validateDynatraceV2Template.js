const { readFileSync } = require('fs');
const Handlebars = require('handlebars');

const jsonEscape = require('../utils/json-escape');
const flagContext = require('../sample-context/flag/update-all-environments');

const template = Handlebars.compile(
  readFileSync('./integrations/dynatrace-v2/templates/flag.json.hbs', {
    encoding: 'utf-8',
  }),
  { strict: true }
);

const render = ({ tag, values }) => {
  const context = jsonEscape(Object.assign({}, flagContext));
  context.customProperties =
    values === undefined
      ? {}
      : { 'dynatrace-v2': { name: 'Dynatrace tags (V2 API)', values } };
  context.formVariables = {
    apiToken: 'apiToken',
    url: 'url',
    entity: 'SERVICE',
    tag,
  };
  return template(context);
};

const renderSelector = input => JSON.parse(render(input)).entitySelector;

// The entitySelector combines tags from the flag's dynatrace-v2 custom property
// with the integration-level "Dynatrace tag" form variable. Dynatrace matches
// entities that have any of the listed tags.
describe('Dynatrace (V2 API) flag template entitySelector', () => {
  test('includes flag tags and the integration tag, comma-separated', () => {
    expect(
      renderSelector({
        tag: 'ld-global',
        values: ['svc-checkout', 'svc-payments'],
      })
    ).toBe('type(SERVICE),tag("svc-checkout","svc-payments","ld-global")');
  });

  test('includes a single flag tag and the integration tag', () => {
    expect(renderSelector({ tag: 'ld-global', values: ['svc-checkout'] })).toBe(
      'type(SERVICE),tag("svc-checkout","ld-global")'
    );
  });

  test('includes only flag tags when no integration tag is set', () => {
    expect(
      renderSelector({ tag: '', values: ['svc-checkout', 'svc-payments'] })
    ).toBe('type(SERVICE),tag("svc-checkout","svc-payments")');
  });

  test('includes only the integration tag when the flag has no tags', () => {
    expect(renderSelector({ tag: 'ld-global', values: [] })).toBe(
      'type(SERVICE),tag("ld-global")'
    );
    expect(renderSelector({ tag: 'ld-global' })).toBe(
      'type(SERVICE),tag("ld-global")'
    );
  });

  // LaunchDarkly does not send a request when the template renders empty.
  test('renders nothing when neither the flag nor the integration has a tag', () => {
    expect(render({ tag: '', values: [] }).trim()).toBe('');
    expect(render({ tag: '' }).trim()).toBe('');
  });
});
