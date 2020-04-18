import { getFormat } from './utils';
import buildAst from './buildAst';
import { parserToFile } from './parsers';
import mapping from './formatters';


// Input
const compareFiles = (firstFilePath, secondFilePath, formatOutput) => {
  const formatFirstFile = getFormat(firstFilePath);
  const formatSecondFile = getFormat(secondFilePath);

  const firstFileData = parserToFile(firstFilePath, formatFirstFile);
  const secondFileData = parserToFile(secondFilePath, formatSecondFile);

  // logic
  const ast = buildAst(firstFileData, secondFileData);

  // output

  return mapping[formatOutput](ast);
};

export default compareFiles;
