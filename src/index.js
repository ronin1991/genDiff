import renderJson from './render-json';
import buildAst from './buildAst';

const fs = require('fs');
// НУжно сделать выборку типа файла
// Input
const compareFiles = (firstFile, secondFile) => {
  const firstFileData = JSON.parse(fs.readFileSync(firstFile));
  const secondFileData = JSON.parse(fs.readFileSync(secondFile));
  // logic
  const ast = buildAst(firstFileData, secondFileData);

  // output
  return `{${renderJson(ast)}\n}`;
};

export default compareFiles;
