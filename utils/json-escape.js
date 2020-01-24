const _ = require('lodash');

const jsonEscapeString = str => {
  return JSON.stringify(str).slice(1, -1);
};

const jsonEscapeObject = obj => {
  const ret = {};
  Object.keys(obj).forEach(key => {
    ret[key] = jsonEscape(obj[key]);
  });
  return ret;
};

const jsonEscapeArray = arr => {
  return _.map(arr, value => jsonEscape(value));
};

const jsonEscape = value => {
  if (_.isString(value)) {
    return jsonEscapeString(value);
  }
  if (_.isPlainObject(value)) {
    return jsonEscapeObject(value);
  }
  if (_.isArray(value)) {
    return jsonEscapeArray(value);
  }
  return value;
};

module.exports = jsonEscape;
