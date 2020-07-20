import _ from 'lodash';

const tab = '  ';
const stringify = (value, depth, render) => {
  if (_.isObject(value)) {
    const entries = Object.entries(value);

    return entries.reduce((acc, node) => {
      const [key, val] = node;
      return `{\n${tab.repeat(depth + 3)}${key}: ${stringify(val, depth + 3)}\n${tab.repeat(depth + 1)}}`;
    }, '');
  }

  if (Array.isArray(value)) {
    return `${render(value, depth)}`;
  }

  return value;
};

const renderDefault = (ast) => {
  const iter = (data, lvl = 1) => {
    const result = data.reduce((acc, node) => {
      const { type, name, value } = node;

      switch (type) {
        case 'added':
          return `${acc}\n${tab.repeat(lvl)}+ ${name}: ${stringify(value, lvl, iter)}`;
        case 'deleted':
          return `${acc}\n${tab.repeat(lvl)}- ${name}: ${stringify(value, lvl, iter)}`;
        case 'unchanged':
          return `${acc}\n${tab.repeat(lvl)}  ${name}: ${stringify(value, lvl, iter)}`;
        case 'changed':
          return `${acc}\n${tab.repeat(lvl)}- ${name}: ${stringify(value.oldValue, lvl, iter)}\n${tab.repeat(lvl)}+ ${name}: ${stringify(value.newValue, lvl, iter)}`;
        case 'nested':
          return `${acc}\n${tab.repeat(lvl)}  ${name}: {${stringify(value, lvl + 2, iter)}\n${tab.repeat(lvl + 1)}}`;
        default:
          throw new Error('no parser for this type');
      }
    }, '');
    return result;
  };
  return `{${iter(ast)}\n}`;
};


export default renderDefault;
