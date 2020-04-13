const path = require('path');

const getFormat = (firstFile, secondFile) => {
  if (path.extname(firstFile) === path.extname(secondFile)) {
    return path.extname(firstFile);
  }
};

export default getFormat;
