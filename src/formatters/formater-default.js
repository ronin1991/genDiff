import _ from 'lodash';

const stringify = (value, lvl) => {
  if (value instanceof Object) {
    const space = lvl + 6;
    const key = Object.keys(value);
    const objValue = Object.values(value);
    return `{ \n${' '.repeat(space)}${key[0]}: ${stringify(objValue[0], space)}\n${' '.repeat(space - 4)}}`;
  }
  return value;
};

const types = [
  {
    type: 'nested',
    check: (type) => type === 'nested',
    process: (e, acc, lvl, fn) => {
      const space = (lvl === 0) ? 4 : lvl + 3;
      return `${acc} \n${' '.repeat(space)}${e.name}: {${fn(e.value, space + 1)}\n${' '.repeat(space)}}`;
    },
  },
  {
    type: 'added',
    check: (type) => type === 'added',
    process: (e, acc, lvl) => {
      const space = (lvl === 0) ? 2 : lvl + 1;
      return `${acc}\n${' '.repeat(space)}+ ${e.name}: ${stringify(e.value, space)}`;
    },
  },
  {
    type: 'deleted',
    check: (type) => type === 'deleted',
    process: (e, acc, lvl) => {
      const space = (lvl === 0) ? 2 : lvl + 1;
      return `${acc}\n${' '.repeat(space)}- ${e.name}: ${stringify(e.value, space)}`;
    },
  },
  {
    type: 'changed',
    check: (type) => type === 'changed',
    process: (e, acc, lvl) => `${acc}\n${' '.repeat(lvl + 1)}- ${e.name}: ${stringify(e.value[0], lvl + 1)}\n${' '.repeat(lvl + 1)}+ ${e.name}: ${stringify(e.value[1], lvl + 1)}`,
  },
  {
    type: 'notModified',
    check: (type) => type === 'notModified',
    process: (e, acc, lvl) => `${acc} \n${' '.repeat(lvl + 3)}${e.name}: ${e.value}`,
  },
];

const renderDefault = (data) => {
  const render = (data1, lvl = 0) => data1.reduce((acc, e) => {
    const { process } = _.find(types, ({ check }) => check(e.type));
    return process(e, acc, lvl, render);
  }, '');
  const result = render(data);
  return `{${result}\n}`;
};


export default renderDefault;
