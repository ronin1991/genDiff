import { getFormatFile, getСomparisonResult, getUniqKeys } from './utils';
import { parseYamlFile, parseJsonFile } from './parsers';

// const _ = require('lodash');

const compareFiles = (firstFile, secondFile) => {
  let firstDataFile;
  let secondDataFile;

  if (getFormatFile(firstFile) === '.yaml' && getFormatFile(secondFile) === '.yaml') {
    firstDataFile = parseYamlFile(firstFile);
    secondDataFile = parseYamlFile(secondFile);
  }

  if (getFormatFile(firstFile) === '.json' && getFormatFile(secondFile) === '.json') {
    firstDataFile = parseJsonFile(firstFile);
    secondDataFile = parseJsonFile(secondFile);
  }
  const uniqKeys = getUniqKeys(firstDataFile, secondDataFile);

  return getСomparisonResult(firstDataFile, secondDataFile, uniqKeys);
};
export default compareFiles;
