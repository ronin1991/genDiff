import getFormat from './utils';
import buildAst from './buildAst';
import { parserToFiles } from './parsers';
import formater from './formatters/formater';


// Input
const compareFiles = (firstFilePath, secondFilePath, formatOutput) => {
  const format = getFormat(firstFilePath, secondFilePath);
  const [firstFileData, secondFileData] = parserToFiles(firstFilePath, secondFilePath, format);

  // logic
  const ast = buildAst(firstFileData, secondFileData);

  // output

  return formater(ast, formatOutput);
};

export default compareFiles;
