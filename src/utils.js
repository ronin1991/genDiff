const path = require('path');
const _ = require('lodash');
const fs = require('fs');


const getFormatFile = (file) => path.extname(file);

const getUniqKeys = (...rest) => _.uniq(rest.reduce((acc, e) => [...acc, ...Object.keys(e)], []));

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

export {
  getUniqKeys,
  getFormatFile, getСomparisonResult,
};
