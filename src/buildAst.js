import _ from 'lodash';

const mapper = [
  {
    check: (firstData, secondData, key) => (_.isObject(firstData[key]))
      && (_.isObject(secondData[key])),
    buildLeaf: (firstObj, secondObj, getFormatValue, key) => ({ key, type: 'nested', children: getFormatValue(firstObj, secondObj) }),
  },

  {
    check: (firstData, secondData, key) => (_.has(firstData, key) && !(_.has(secondData, key))),
    buildLeaf: (firstValue) => ({ type: 'deleted', value: firstValue }),
  },

  {
    check: (firstValue, secondValue, key) => (_.has(firstValue, key) && _.has(secondValue, key))
      && (firstValue[key] !== secondValue[key]),
    buildLeaf: (firstValue, secondValue) => ({ type: 'changed', oldValue: firstValue, newValue: secondValue }),
  },

  {
    check: (firstValue, secondValue, key) => !_.has(firstValue, key) && _.has(secondValue, key),
    buildLeaf: (_firstValue, secondValue) => ({ type: 'added', value: secondValue }),
  },

  {
    check: (firstValue, secondValue, key) => _.has(firstValue, key) && _.has(secondValue, key)
      && firstValue[key] === secondValue[key],
    buildLeaf: (firstValue) => ({ type: 'unchanged', value: firstValue }),
  },
];


const buildAst = (firstData, secondData) => {
  const uniqKeys = _.union(Object.keys(firstData), Object.keys(secondData));

  return uniqKeys.map((key) => {
    const { buildLeaf } = _.find(mapper, ({ check }) => check(firstData, secondData, key));

    return {
      key,
      ...buildLeaf(firstData[key], secondData[key], buildAst, key),
    };
  });
};

export default buildAst;
