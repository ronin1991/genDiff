import fs from 'fs';
import path from 'path';
import buildAst from './buildAst';
import getData from './parsers';
import pickMappingFormat from './formatters';


// Input
const genDiff = (firstFilePath, secondFilePath, formatOutput) => {
  const firstDataFile = fs.readFileSync(firstFilePath, 'utf-8');
  const firstFormatFile = path.extname(firstFilePath);
  const secondDataFile = fs.readFileSync(secondFilePath, 'utf-8');
  const secondFormatfile = path.extname(secondFilePath);

  const firstFileData = getData(firstDataFile, firstFormatFile);
  const secondFileData = getData(secondDataFile, secondFormatfile);
  // logic
  const ast = buildAst(firstFileData, secondFileData);

  // output

  return pickMappingFormat(formatOutput)(ast);
};

export default genDiff;
