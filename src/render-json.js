import { stringify } from './utils';

const _ = require('lodash');


const types1 = [
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

const renderJson = (data, lvl = 0) => data.reduce((acc, e) => {
  const { process } = _.find(types1, ({ check }) => check(e.type));
  return process(e, acc, lvl, renderJson);
}, '');


export default renderJson;
