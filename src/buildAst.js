import _ from 'lodash';

const types = [
  {
    type: 'nested',
    check: (firstFile, secondFile, key) => (firstFile[key] instanceof Object)
      && (secondFile[key] instanceof Object),
    process: (firstObj, secondObj, fn) => fn(firstObj, secondObj),
  },

  {
    type: 'deleted',
    check: (firstFile, secondFile, key) => (_.has(firstFile, key) && !(_.has(secondFile, key))),
    process: (firstValue) => firstValue,
  },

  {
    type: 'changed',
    check: (firstValue, secondValue, key) => (_.has(firstValue, key) && _.has(secondValue, key))
      && (firstValue[key] !== secondValue[key]),
    process: (firstValue, secondValue) => [firstValue, secondValue],
  },

  {
    type: 'added',
    check: (firstValue, secondValue, key) => !_.has(firstValue, key) && _.has(secondValue, key),
    process: (_firstValue, secondValue) => secondValue,
  },

  {
    type: 'notModified',
    check: (firstValue, secondValue, key) => _.has(firstValue, key) && _.has(secondValue, key)
      && firstValue[key] === secondValue[key],
    process: (firstValue) => firstValue,
  },
];


const buildAst = (firstFileData = {}, secondFileData = {}) => {
  const uniqKeys = _.union(Object.keys(firstFileData), Object.keys(secondFileData));

  const result = uniqKeys.map((key) => {
    const { type, process } = _.find(types,
      ({ check }) => check(firstFileData, secondFileData, key));

    const value = process(firstFileData[key], secondFileData[key], buildAst);
    return {
      type,
      name: key,
      value,
    };
  });
  return result;
};

export default buildAst;
