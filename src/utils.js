const path = require('path');

const getFormat = (firstFile, secondFile) => {
  if (path.extname(firstFile) === path.extname(secondFile)) {
    return path.extname(firstFile);
  }
  console.log('errorFormat');
};
// const getUniqKeys = (...rest) =>
// _.uniq(rest.reduce((acc, e) => [...acc, ...Object.keys(e)], []));


export default getFormat;
