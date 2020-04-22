import fs from 'fs';
import path from 'path';
import buildAst from './buildAst';
import { getDataParser } from './parsers';
import mapping from './formatters';


// Input
const compareFiles = (firstFilePath, secondFilePath, formatOutput) => {
  const firstDataFile = fs.readFileSync(firstFilePath, 'utf-8');
  const firstFormatFile = path.extname(firstFilePath);
  const secondDataFile = fs.readFileSync(secondFilePath, 'utf-8');
  const secondFormatfile = path.extname(secondFilePath);


  const firstFileData = getDataParser(firstDataFile, firstFormatFile);
  const secondFileData = getDataParser(secondDataFile, secondFormatfile);
  // logic
  const ast = buildAst(firstFileData, secondFileData);

  // output

  return mapping(formatOutput)(ast);
};

export default compareFiles;
