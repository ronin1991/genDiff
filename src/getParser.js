import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const isNumber = (value) => !Number.isNaN(Number(value));


const formatIniParse = (data) => {
  const keyValue = Object.entries(data);

  return keyValue.reduce((acc, [key, value]) => {
    if (_.isObject(value)) {
      return { ...acc, [key]: formatIniParse(value) };
    }

    if (typeof value !== 'boolean' && isNumber(value)) {
      return { ...acc, [key]: Number(value) };
    }

    return { ...acc, [key]: value };
  }, {});
};


const getParser = (format) => {
  switch (format) {
    case 'json':
      return JSON.parse;
    case 'ini':
      return _.flowRight(formatIniParse, ini.parse);
    case 'yaml':
      return yaml.safeLoad;
    default:
      throw new Error(`Unknown format ${format}`);
  }
};


export default getParser;
