import yaml from 'js-yaml';
import ini from 'ini';

const getData = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case 'ini':
      return ini.parse(data);
    case 'yaml':
      return yaml.safeLoad(data);
    default:
      return console.error('not found "getData"');
  }
};


export default getData;
