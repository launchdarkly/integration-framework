const jsonEscape = require('../utils/json-escape');

describe('jsonEscape escapes a variety of data shapes', () => {
  test('escapes strings', () => {
    const input = `slash\-string
    newline`;
    expect(jsonEscape(input)).toEqual('slash-string\\n    newline');
  });
  test('escapes arrays', () => {
    const input = [`slash\\string`, `another\\one`];
    expect(jsonEscape(input)).toEqual(['slash\\\\string', 'another\\\\one']);
  });
  test('escapes complex object', () => {
    const input = {
      str: `slash\-string`,
      arr: [`slash\\string`, `another\\one`],
      obj: {
        nested: `nest\-dash`,
        number: 42,
        bool: false,
      },
    };
    expect(jsonEscape(input)).toEqual({
      str: 'slash-string',
      arr: ['slash\\\\string', 'another\\\\one'],
      obj: {
        nested: 'nest-dash',
        number: 42,
        bool: false,
      },
    });
  });
});
