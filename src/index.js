import { fileParseToString } from './utils';

const path = require('path');
const _ = require('lodash');

const compareFiles = (firstPathToFile, secondPathToFile) => {
  const firstFilePath = path.resolve(firstPathToFile);
  const secondFilePath = path.resolve(secondPathToFile);

  const firstFileData = fileParseToString(firstFilePath);
  const secondFileData = fileParseToString(secondFilePath);
  const firstKeyValuesArr = Object.keys(firstFileData);
  const secondKeyVauesArr = Object.keys(secondFileData);
  const uniqKeys = _.uniq([...firstKeyValuesArr, ...secondKeyVauesArr]);

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

export default compareFiles;
