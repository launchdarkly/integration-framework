const { readFileSync } = require('fs');
const Handlebars = require('handlebars');
const jsonEscape = require('../../../utils/json-escape');

const render = Handlebars.compile(
  readFileSync('integrations/axiom/templates/flag.json.hbs', 'utf8'),
  { strict: true }
);
const context = {
  timestamp: { rfc3339: '2026-11-12T12:00:00Z' },
  name: 'Flag "hi" \\ path\n<tag> & é 😀',
  key: 'my_flag',
  project: {
    key: 'my_project',
    environment: { key: 'test.env', name: 'Test "env"' },
  },
  member: { displayName: 'Oliver "Test"' },
  titleVerb: 'turned on',
  title: { plainText: 'Oliver "Test" changed the flag' },
  comment: 'Oliver "Test" wrote: \\ path\n<tag> & é 😀',
  _links: { details: { href: 'https://app.launchdarkly.com/audit/change' } },
};

describe('Axiom annotation payload', () => {
  test.each([
    {
      name: 'member, verb, and comment',
      hideMemberDetails: false,
      changes: {},
      title: 'turned on Flag "hi" \\ path\n<tag> & é 😀 in Test "env"',
      description:
        'by Oliver "Test" · `my_project/test.env` · `my_flag`\n\nOliver "Test" wrote: \\ path\n<tag> & é 😀',
    },
    {
      name: 'hidden member with original comment text',
      hideMemberDetails: true,
      changes: {},
      title: 'turned on Flag "hi" \\ path\n<tag> & é 😀 in Test "env"',
      description:
        '`my_project/test.env` · `my_flag`\n\nOliver "Test" wrote: \\ path\n<tag> & é 😀',
    },
    {
      name: 'plain-text title without a verb or comment',
      hideMemberDetails: false,
      changes: { titleVerb: undefined, comment: '' },
      title: 'Oliver "Test" changed the flag',
      description: 'by Oliver "Test" · `my_project/test.env` · `my_flag`',
    },
    {
      name: 'neutral title without a verb, member, or comment',
      hideMemberDetails: true,
      changes: { titleVerb: undefined, member: undefined, comment: undefined },
      title: 'Flag "hi" \\ path\n<tag> & é 😀 changed in Test "env"',
      description: '`my_project/test.env` · `my_flag`',
    },
  ])('$name', ({ hideMemberDetails, changes, title, description }) => {
    const escaped = jsonEscape({ ...context, ...changes });
    escaped.formVariables = {
      datasetName: 'production-logs',
      hideMemberDetails,
    };

    expect(JSON.parse(render(escaped))).toEqual({
      time: '2026-11-12T12:00:00Z',
      type: 'launchdarkly-flag',
      datasets: ['production-logs'],
      title,
      description,
      url: 'https://app.launchdarkly.com/audit/change',
    });
  });
});
