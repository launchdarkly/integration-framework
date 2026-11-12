const pointer = require('jsonpointer');
const { capabilities } = require('../manifest.json');

const { parser, testEventNameRegexp } = capabilities.trigger;
const testEvent = new RegExp(testEventNameRegexp);

test('reads the named Axiom trigger protocol and recognizes only test prefixes', () => {
  const requests = [
    {
      eventName: 'Latest errors: Test checkout with [Axiom test] in logs',
      url: 'https://app.axiom.co/acme/monitors/view/monitor-1',
    },
    {
      eventName: '[Axiom test] Alert Test: Just Checking In!',
      url: 'https://app.axiom.co/acme/monitors/view/monitor-1',
    },
  ];

  expect(
    requests.map(request => ({
      eventName: pointer.get(request, parser.eventName),
      url: pointer.get(request, parser.url),
      isTest: testEvent.test(pointer.get(request, parser.eventName)),
    }))
  ).toEqual([
    {
      eventName: 'Latest errors: Test checkout with [Axiom test] in logs',
      url: 'https://app.axiom.co/acme/monitors/view/monitor-1',
      isTest: false,
    },
    {
      eventName: '[Axiom test] Alert Test: Just Checking In!',
      url: 'https://app.axiom.co/acme/monitors/view/monitor-1',
      isTest: true,
    },
  ]);
});
