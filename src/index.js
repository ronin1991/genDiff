import { getСomparisonResult, getUniqKeys } from './utils';
import { parseFilesToStr } from './parsers';

const compareFiles = (firstFile, secondFile) => {
  const [firstDataFile, secondDataFile] = parseFilesToStr(firstFile, secondFile);

  const uniqKeys = getUniqKeys(firstDataFile, secondDataFile);

  return getСomparisonResult(firstDataFile, secondDataFile, uniqKeys);
};


export default compareFiles;
