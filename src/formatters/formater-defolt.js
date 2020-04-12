const _ = require('lodash');

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
      return `${acc} \n${' '.repeat(space)}${e.name}: {${fn(e.children, space + 1)}\n${' '.repeat(space)}}`;
    },
  },
  {
    type: 'addKey',
    check: (type) => type === 'addKey',
    process: (e, acc, lvl) => {
      const space = (lvl === 0) ? 2 : lvl + 1;
      return `${acc}\n${' '.repeat(space)}+ ${e.name}: ${stringify(e.value, space)}`;
    },
  },
  {
    type: 'deletedKey',
    check: (type) => type === 'deletedKey',
    process: (e, acc, lvl) => {
      const space = (lvl === 0) ? 2 : lvl + 1;
      return `${acc}\n${' '.repeat(space)}- ${e.name}: ${stringify(e.value, space)}`;
    },
  },
  {
    type: 'changeValue',
    check: (type) => type === 'changeValue',
    process: (e, acc, lvl) => `${acc}\n${' '.repeat(lvl + 1)}- ${e.name}: ${stringify(e.value[0], lvl + 1)}\n${' '.repeat(lvl + 1)}+ ${e.name}: ${stringify(e.value[1], lvl + 1)}`,
  },
  {
    type: 'notChange',
    check: (type) => type === 'notChange',
    process: (e, acc, lvl) => `${acc} \n${' '.repeat(lvl + 3)}${e.name}: ${e.value}`,
  },
];

const renderDefalt = (data, lvl = 0) => data.reduce((acc, e) => {
  const { process } = _.find(types, ({ check }) => check(e.type));
  return process(e, acc, lvl, renderDefalt);
}, '');


export default renderDefalt;
