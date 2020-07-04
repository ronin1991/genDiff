import _ from 'lodash';

const types = [
  {
    type: 'nested',
    check: (firstData, secondData, key) => (firstData[key] instanceof Object)
      && (secondData[key] instanceof Object),
    process: (firstObj, secondObj, fn) => fn(firstObj, secondObj),
  },

  {
    type: 'deleted',
    check: (firstData, secondData, key) => (_.has(firstData, key) && !(_.has(secondData, key))),
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


const buildAst = (firstData = {}, secondData = {}) => {
  const uniqKeys = _.union(Object.keys(firstData), Object.keys(secondData));

  const result = uniqKeys.map((key) => {
    const { type, process } = _.find(types,
      ({ check }) => check(firstData, secondData, key));

    const value = process(firstData[key], secondData[key], buildAst);
    return {
      type,
      name: key,
      value,
    };
  });
  return result;
};

export default buildAst;
