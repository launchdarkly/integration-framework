const Handlebars = require('handlebars');

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
};

module.exports = { registerHelpers };
