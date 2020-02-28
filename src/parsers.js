
const fs = require('fs');
const yaml = require('js-yaml');

const parseYamlFile = (file) => yaml.safeLoad(fs.readFileSync(file));

const parseJsonFile = (file) => {
  const result = JSON.parse(fs.readFileSync(file, 'utf-8'));
  return result;
};

export { parseYamlFile, parseJsonFile };
