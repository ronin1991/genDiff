const fs = require('fs');

export default (file) => {
  const result = JSON.parse(fs.readFileSync(file).toString());
  return result;
};
