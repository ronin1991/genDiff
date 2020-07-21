import _ from 'lodash';

const mapper = [
  {
    check: (firstData, secondData, key) => (_.isObject(firstData[key]))
      && (_.isObject(secondData[key])),
    process: (firstObj, secondObj, getValue, key) => ({ key, type: 'nested', value: getValue(firstObj, secondObj) }),
  },

  {
    check: (firstData, secondData, key) => (_.has(firstData, key) && !(_.has(secondData, key))),
    process: (firstValue) => ({ type: 'deleted', value: firstValue }),
  },

  {
    check: (firstValue, secondValue, key) => (_.has(firstValue, key) && _.has(secondValue, key))
      && (firstValue[key] !== secondValue[key]),
    process: (firstValue, secondValue) => ({ type: 'changed', value: { oldValue: firstValue, newValue: secondValue } }),
  },

  {
    check: (firstValue, secondValue, key) => !_.has(firstValue, key) && _.has(secondValue, key),
    process: (_firstValue, secondValue) => ({ type: 'added', value: secondValue }),
  },

  {
    check: (firstValue, secondValue, key) => _.has(firstValue, key) && _.has(secondValue, key)
      && firstValue[key] === secondValue[key],
    process: (firstValue) => ({ type: 'unchanged', value: firstValue }),
  },
];


const buildAst = (firstData, secondData) => {
  const uniqKeys = _.union(Object.keys(firstData), Object.keys(secondData));

  return uniqKeys.map((key) => {
    const { process } = _.find(mapper, ({ check }) => check(firstData, secondData, key));

    return {
      key,
      ...process(firstData[key], secondData[key], buildAst, key),
    };
  });
};

export default buildAst;
