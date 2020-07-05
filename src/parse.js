import yaml from 'js-yaml';
import ini from 'ini';

const parse = (format) => {
  switch (format) {
    case 'json':
      return JSON.parse;
    case 'ini':
      return ini.parse;
    case 'yaml':
      return yaml.safeLoad;
    default:
      throw new Error('no parser for this type');
  }
};


export default parse;
