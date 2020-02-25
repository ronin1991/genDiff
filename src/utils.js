const fs = require('fs');
const path = require('path');

const fileParseToString = (file) => {
  const result = JSON.parse(fs.readFileSync(file, 'utf-8'));
  return result;
};

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);


export { fileParseToString, getFixturePath };
