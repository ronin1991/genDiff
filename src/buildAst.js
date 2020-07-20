import _ from 'lodash';

const mapper = [
  {
    type: 'nested',
    check: (firstData, secondData, key) => (_.isObject(firstData[key]))
      && (_.isObject(secondData[key])),
    process: (firstObj, secondObj, getValue) => getValue(firstObj, secondObj),
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
    process: (firstValue, secondValue) => ({ oldValue: firstValue, newValue: secondValue }),
  },

  {
    type: 'added',
    check: (firstValue, secondValue, key) => !_.has(firstValue, key) && _.has(secondValue, key),
    process: (_firstValue, secondValue) => secondValue,
  },

  {
    type: 'unchanged',
    check: (firstValue, secondValue, key) => _.has(firstValue, key) && _.has(secondValue, key)
      && firstValue[key] === secondValue[key],
    process: (firstValue) => firstValue,
  },
];


const buildAst = (firstData = {}, secondData = {}) => {
  const uniqKeys = _.union(Object.keys(firstData), Object.keys(secondData));

  const result = uniqKeys.map((key) => {
    const { type, process } = _.find(mapper,
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
