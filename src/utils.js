import path from 'path';
import fs from 'fs';

const getFormat = (file) => path.extname(file);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

export { getFormat, readFile, getFixturePath };
