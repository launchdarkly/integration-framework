const pointer = require('jsonpointer');
const { capabilities } = require('../manifest.json');

const { parser, testEventNameRegexp } = capabilities.trigger;
const testEvent = new RegExp(testEventNameRegexp);

describe('Axiom named flag trigger', () => {
  test.each([
    ['Errors above threshold', false],
    ['Errors "quoted" \\ path\nnext <tag> & é 😀', false],
    ['Latest errors', false],
    ['Test checkout latency', false],
    ['Investigate [Axiom test] in logs', false],
    ['[Axiom test] Alert Test: Just Checking In!', true],
    ['[Axiom test] Errors "quoted" \\ path\nnext <tag> & é 😀', true],
  ])('classifies event %s', (eventName, isTest) => {
    const payload = JSON.parse(
      JSON.stringify({
        eventName,
        url: 'https://app.axiom.co/acme/monitors/view/monitor-1',
      })
    );
    expect(pointer.get(payload, parser.eventName)).toBe(eventName);
    expect(pointer.get(payload, parser.url)).toBe(payload.url);
    expect(testEvent.test(pointer.get(payload, parser.eventName))).toBe(isTest);
  });
});
