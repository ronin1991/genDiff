import fs from 'fs';
import path from 'path';
import buildAst from './buildAst.js';
import getParser from './getParser.js';
import render from './formatters/index.js';

const getData = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const format = path.extname(filePath).slice(1);
  const parse = getParser(format);
  return parse(data);
};

const genDiff = (firstFilePath, secondFilePath, formatOutput) => {
  const firstData = getData(firstFilePath);
  const secondData = getData(secondFilePath);
  const ast = buildAst(firstData, secondData);
  return render(ast, formatOutput);
};

export default genDiff;
