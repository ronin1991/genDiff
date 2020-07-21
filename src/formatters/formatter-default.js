import _ from 'lodash';

const tab = '  ';
const stringify = (value, depth, render) => {
  if (Array.isArray(value)) {
    return `${render(value, depth)}`;
  }

  if (_.isObject(value)) {
    const entries = Object.entries(value);

    return entries.reduce((acc, node) => {
      const [key, val] = node;
      return `{\n${tab.repeat(depth + 3)}${key}: ${stringify(val, depth + 3)}\n${tab.repeat(depth + 1)}}`;
    }, '');
  }

  return value;
};

const renderDefault = (ast) => {
  const iter = (data, depth = 1) => {
    const result = data.reduce((acc, node) => {
      const { type, name, value } = node;

      switch (type) {
        case 'added':
          return `${acc}\n${tab.repeat(depth)}+ ${name}: ${stringify(value, depth, iter)}`;
        case 'deleted':
          return `${acc}\n${tab.repeat(depth)}- ${name}: ${stringify(value, depth, iter)}`;
        case 'unchanged':
          return `${acc}\n${tab.repeat(depth)}  ${name}: ${stringify(value, depth, iter)}`;
        case 'changed':
          return `${acc}\n${tab.repeat(depth)}- ${name}: ${stringify(value.oldValue, depth, iter)}\n${tab.repeat(depth)}+ ${name}: ${stringify(value.newValue, depth, iter)}`;
        case 'nested':
          return `${acc}\n${tab.repeat(depth)}  ${name}: {${stringify(value, depth + 2, iter)}\n${tab.repeat(depth + 1)}}`;
        default:
          throw new Error('no parser for this type');
      }
    }, '');
    return result;
  };
  return `{${iter(ast)}\n}`;
};


export default renderDefault;
