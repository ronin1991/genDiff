import _ from 'lodash';

const mapper = [
  {
    check: ({ firstData, key }) => !_.has(firstData, key),
    buildLeaf: ({ key, secondData }) => ({ type: 'added', value: secondData[key] }),
  },

  {
    check: ({ secondData, key }) => !(_.has(secondData, key)),
    buildLeaf: ({ key, firstData }) => ({ type: 'deleted', value: firstData[key] }),
  },

  {
    check: ({ firstData, secondData, key }) => (_.isObject(firstData[key]))
      && (_.isObject(secondData[key])),
    buildLeaf: ({
      key, firstData, secondData, buildAst,
    }) => ({ key, type: 'nested', children: buildAst(firstData[key], secondData[key]) }),
  },

  {
    check: ({ firstData, secondData, key }) => (!_.isEqual(firstData[key], secondData[key])),
    buildLeaf: ({ key, firstData, secondData }) => ({ type: 'changed', oldValue: firstData[key], newValue: secondData[key] }),
  },

  {
    check: () => true,
    buildLeaf: ({ key, firstData }) => ({ type: 'unchanged', value: firstData[key] }),
  },
];


const buildAst = (firstData, secondData) => {
  const uniqKeys = _.union(Object.keys(firstData), Object.keys(secondData));

  return uniqKeys.map((key) => {
    const { buildLeaf } = _.find(mapper, ({ check }) => check({ firstData, secondData, key }));

    return {
      key,
      ...buildLeaf({
        key, firstData, secondData, buildAst,
      }),
    };
  });
};

export default buildAst;
