
const fs = require('fs');
const yaml = require('js-yaml');
const ini = require('ini');

const parseIni = (file) => ini.parse(fs.readFileSync(file, 'utf-8'));

const parseYaml = (file) => yaml.safeLoad(fs.readFileSync(file), 'utf-8');

const parseJson = (file) => JSON.parse(fs.readFileSync(file, 'utf-8'));

const parserToFiles = (firstFilePath, secondFilePath, format) => {
  if (format === '.json') {
    return [parseJson(firstFilePath), parseJson(secondFilePath)];
  }
};


export {
  parseYaml, parseJson, parseIni,
  parserToFiles,
};
