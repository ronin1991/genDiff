import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const parseIni = (file) => ini.parse(fs.readFileSync(file, 'utf-8'));

const parseYaml = (file) => yaml.safeLoad(fs.readFileSync(file), 'utf-8');

const parseJson = (file) => JSON.parse(fs.readFileSync(file, 'utf-8'));


const getDataParser = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  }
  return console.error('not found "getDataParser"');
};


export {
  parseYaml, parseJson, parseIni,
  getDataParser,
};
