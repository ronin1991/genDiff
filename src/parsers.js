import { getFormatFile } from './utils';

const fs = require('fs');
const yaml = require('js-yaml');
const ini = require('ini');

const parseIni = (file) => ini.parse(fs.readFileSync(file, 'utf-8'));

const parseYaml = (file) => yaml.safeLoad(fs.readFileSync(file), 'utf-8');

const parseJson = (file) => JSON.parse(fs.readFileSync(file, 'utf-8'));

const parseFilesToStr = (firstFile, secondFile) => {
  if (getFormatFile(firstFile) === '.yaml' && getFormatFile(secondFile) === '.yaml') {
    const firstDataFile = parseYaml(firstFile);
    const secondDataFile = parseYaml(secondFile);

    return [firstDataFile, secondDataFile];
  }

  if (getFormatFile(firstFile) === '.json' && getFormatFile(secondFile) === '.json') {
    const firstDataFile = parseJson(firstFile);
    const secondDataFile = parseJson(secondFile);

    return [firstDataFile, secondDataFile];
  }

  if (getFormatFile(firstFile) === '.ini' && getFormatFile(secondFile) === '.ini') {
    const firstDataFile = parseIni(firstFile);
    const secondDataFile = parseIni(secondFile);

    return [firstDataFile, secondDataFile];
  }
};

export {
  parseYaml, parseJson, parseIni,
  parseFilesToStr,
};
