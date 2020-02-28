import { parseYamlFile, parseJsonFile } from './parsers';

const path = require('path');
const _ = require('lodash');


const getFormatFile = (file) => {
  const format = path.extname(file);
  return format;
};

const getUniqKeys = (...rest) => _.uniq(rest.reduce((acc, e) => [...acc, ...Object.keys(e)], []));

const getPath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const getСomparisonResult = (firstFileData, secondFileData, uniqKeys) => {
  const result = uniqKeys.reduce((acc, key) => {
    let resAcc = acc;
    if (_.has(firstFileData, key) && _.has(secondFileData, key)
      && firstFileData[key] === secondFileData[key]) {
      resAcc = `${acc}   ${key}: ${firstFileData[key]}\n`;
    }
    if (_.has(firstFileData, key) && _.has(secondFileData, key)
      && firstFileData[key] !== secondFileData[key]) {
      resAcc = `${resAcc} + ${key}: ${secondFileData[key]}\n - ${key}: ${firstFileData[key]}\n`;
    }
    if (_.has(firstFileData, key) && !_.has(secondFileData, key)) {
      resAcc = `${resAcc} + ${key}: ${firstFileData[key]}\n`;
    }
    if (!_.has(firstFileData, key) && _.has(secondFileData, key)) {
      resAcc = `${resAcc} - ${key}: ${secondFileData[key]}\n`;
    }
    return resAcc;
  }, '');
  return `{\n${result}}`;
};

const compareFiles = (firstFile, secondFile) => {
  let firstDataFile;
  let secondDataFile;

  if (getFormatFile(firstFile) === '.yaml' && getFormatFile(secondFile) === '.yaml') {
    firstDataFile = parseYamlFile(firstFile);
    secondDataFile = parseYamlFile(secondFile);
  }

  if (getFormatFile(firstFile) === '.json' && getFormatFile(secondFile) === '.json') {
    firstDataFile = parseJsonFile(firstFile);
    firstDataFile = parseJsonFile(secondFile);
  }
  const firstFileKeys = Object.keys(firstDataFile);
  const secondFileKeys = Object.keys(secondDataFile);
  const uniqKeys = _.uniq([...firstFileKeys, ...secondFileKeys]);
  // compareFiles - rename

  return getСomparisonResult(firstDataFile, secondDataFile, uniqKeys);
};

export {
  parseJsonFile, getPath, getUniqKeys,
  getFormatFile, compareFiles, getСomparisonResult,
};
