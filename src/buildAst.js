import _ from 'lodash';

const types = [
  {
    type: 'nested',
    check: (firstFile, secondFile, key) => (firstFile[key] instanceof Object)
      && (secondFile[key] instanceof Object),
    process: (firstObj, secondObj, fn) => fn(firstObj, secondObj),
  },

  {
    type: 'deletedKey',
    check: (firstFile, secondFile, key) => (_.has(firstFile, key) && !(_.has(secondFile, key))),
    process: (firstValue) => firstValue,
  },

  {
    type: 'changeValue',
    check: (firstValue, secondValue, key) => (_.has(firstValue, key) && _.has(secondValue, key))
      && (firstValue[key] !== secondValue[key]),
    process: (firstValue, secondValue) => [firstValue, secondValue],
  },

  {
    type: 'addKey',
    check: (firstValue, secondValue, key) => !_.has(firstValue, key) && _.has(secondValue, key),
    process: (_firstValue, secondValue) => secondValue,
  },

  {
    type: 'notChange',
    check: (firstValue, secondValue, key) => _.has(firstValue, key) && _.has(secondValue, key)
      && firstValue[key] === secondValue[key],
    process: (firstValue) => _.identity(firstValue),
  },
];


const buildAst = (firstFile = {}, secondFile = {}) => {
  const uniqKeys = _.union(Object.keys(firstFile), Object.keys(secondFile));

  const result = uniqKeys.map((key) => {
    const { type, process } = _.find(types, ({ check }) => check(firstFile, secondFile, key));
    if (type === 'nested') {
      const children = process(firstFile[key], secondFile[key], buildAst);
      return { type, name: key, children };
    }
    const value = process(firstFile[key], secondFile[key], buildAst);
    return { type, name: key, value };
  });
  return result;
};

export default buildAst;
