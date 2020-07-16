import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const isNumber = (value) => !Number.isNaN(Number(value));


const fixIniParse = (data) => {
  const iniParseData = ini.parse(data);

  const iter = (iniData) => {
    const keyValue = Object.entries(iniData);

    return keyValue.reduce((acc, [key, value]) => {
      if (_.isObject(value)) {
        return { ...acc, [key]: iter(value) };
      }
      const newValue = typeof value !== 'boolean' && isNumber(value) ? Number(value) : value;
      return { ...acc, [key]: newValue };
    }, {});
  };

  return iter(iniParseData);
};


const getParse = (format) => {
  switch (format) {
    case 'json':
      return JSON.parse;
    case 'ini':
      return fixIniParse;
    case 'yaml':
      return yaml.safeLoad;
    default:
      throw new Error('no parser for this type');
  }
};


export default getParse;
