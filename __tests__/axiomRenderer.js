const { readFileSync, readdirSync } = require('fs');
const Handlebars = require('handlebars');
const { cloneDeep } = require('lodash');
const jsonEscape = require('../utils/json-escape');

const render = Handlebars.compile(
  readFileSync('integrations/axiom/templates/flag.json.hbs', 'utf8'),
  { strict: true }
);
const samples = readdirSync('sample-context/flag').map(file => [
  file,
  JSON.parse(readFileSync(`sample-context/flag/${file}`, 'utf8')),
]);

function renderBody(context, hideMemberDetails) {
  const escaped = jsonEscape(context);
  escaped.formVariables = { datasetName: 'production-logs', hideMemberDetails };
  return JSON.parse(render(escaped));
}

describe.each(samples)('Axiom renderer: %s', (_file, sample) => {
  test.each([false, true])('renders sample with hideMemberDetails=%s', hide => {
    const body = renderBody(sample, hide);
    expect(body.datasets).toEqual(['production-logs']);
    expect(body.time).toBe(sample.timestamp.rfc3339);
    expect(body.url).toBe(sample._links.details.href);
    expect(body.title).toBe(
      sample.titleVerb
        ? `${sample.titleVerb} ${sample.name} in ${sample.project.environment.name}`
        : hide
        ? `${sample.name} changed in ${sample.project.environment.name}`
        : sample.title.plainText
    );
    if (hide)
      expect(JSON.stringify(body)).not.toContain(sample.member.displayName);
  });

  for (const hide of [false, true]) {
    for (const verb of [undefined, '', 'turned "on" \\ now\nnext']) {
      for (const comment of [
        undefined,
        '',
        'Comment "quoted" \\ path\nsecond line',
      ]) {
        test(`preserves text: hide=${hide}, verb=${JSON.stringify(
          verb
        )}, comment=${JSON.stringify(comment)}`, () => {
          const context = cloneDeep(sample);
          context.titleVerb = verb;
          context.comment = comment;
          context.title.plainText = 'Oliver "Test" changed flag \\ path\nnext';
          context.name = 'Flag "hi" \\ now\nnext <tag> & é 😀';
          context.member.displayName = 'Oliver "Test"';
          context.project.environment.name = 'Test "env" \\ path\nnext';
          context.project.key = 'my_project';
          context.project.environment.key = 'test.env';
          context.key = 'my_flag';
          const body = renderBody(context, hide);
          expect(body.title).toBe(
            verb
              ? `${verb} ${context.name} in ${context.project.environment.name}`
              : hide
              ? `${context.name} changed in ${context.project.environment.name}`
              : context.title.plainText
          );
          expect(body.description).toBe(
            `${
              hide ? '' : `by ${context.member.displayName} · `
            }\`my_project/test.env\` · \`my_flag\`${
              comment ? '\n\n' + comment : ''
            }`
          );
          if (hide)
            expect(JSON.stringify(body)).not.toContain(
              context.member.displayName
            );
        });
      }
    }
  }

  test('hides member details when the member object is absent', () => {
    const context = cloneDeep(sample);
    delete context.member;
    delete context.titleVerb;
    const body = renderBody(context, true);
    expect(body.title).toBe(
      `${context.name} changed in ${context.project.environment.name}`
    );
    expect(body.description).not.toMatch(/^by /);
  });
});
