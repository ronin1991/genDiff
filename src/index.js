import fs from 'fs';
import path from 'path';
import buildAst from './buildAst';
import getParse from './parse';
import getRender from './formatters';

const getData = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const formatFile = path.extname(filePath).slice(1);
  const parse = getParse(formatFile);
  return parse(data);
};

const genDiff = (firstFilePath, secondFilePath, formatOutput) => {
  const firstData = getData(firstFilePath);
  const secondData = getData(secondFilePath);
  const ast = buildAst(firstData, secondData);

  const render = getRender(formatOutput);
  return render(ast);
};

export default genDiff;
