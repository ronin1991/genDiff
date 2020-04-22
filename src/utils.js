import path from 'path';

const getFormat = (file) => path.extname(file);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

export { getFormat, getFixturePath };
