const Handlebars = require('handlebars');
const dateFormat = require('dateformat');
const { flatMap } = require('lodash');

const registerHelpers = () => {
  Handlebars.registerHelper('equal', function (v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  Handlebars.registerHelper('pathEncode', function (v) {
    return encodeURI(v);
  });
  Handlebars.registerHelper('queryEncode', function (v) {
    return encodeURIComponent(v);
  });
  Handlebars.registerHelper(
    'basicAuthHeaderValue',
    function (username, password) {
      return `Basic ${Buffer.from(`${username}:${password}`).toString(
        'base64'
      )}`;
    }
  );
  Handlebars.registerHelper(
    'formatWithOffset',
    function (milliseconds, offset, format) {
      const ts = new Date(milliseconds + 1000 * offset);
      switch (format) {
        case 'milliseconds':
          return ts.getTime();
        case 'seconds':
          return Math.round(ts.getTime() / 1000);
        case 'rfc3339':
          return ts.toISOString();
        case 'simple':
          return dateFormat(ts, 'yyyy-mm-dd h:MM:ss');
      }
      return ts.getTime();
    }
  );
};

module.exports = { registerHelpers };
