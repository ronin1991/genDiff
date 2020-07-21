import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const isNumber = (value) => !Number.isNaN(Number(value));


const fixIniParse = (data) => {
  const keyValue = Object.entries(data);

  return keyValue.reduce((acc, [key, value]) => {
    if (_.isObject(value)) {
      return { ...acc, [key]: fixIniParse(value) };
    }
    const newValue = typeof value !== 'boolean' && isNumber(value) ? Number(value) : value;
    return { ...acc, [key]: newValue };
  }, {});
};


const getParse = (format) => {
  switch (format) {
    case 'json':
      return JSON.parse;
    case 'ini':
      return _.flowRight([fixIniParse, ini.parse]);
    case 'yaml':
      return yaml.safeLoad;
    default:
      throw new Error('no parser for this type');
  }
};


export default getParse;
