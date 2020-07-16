import _ from 'lodash';

const tab = ' '.repeat(2);
const stringify = (value, lvl, render) => {
  if (Array.isArray(value)) {
    return `${render(value, lvl)}`;
  }

  if (_.isObject(value)) {
    const entries = Object.entries(value);

    return entries.reduce((acc, e) => {
      const [key, val] = e;
      return `{\n${tab.repeat(lvl + 3)}${key}: ${stringify(val, lvl + 3)}\n${tab.repeat(lvl + 1)}}`;
    }, '');
  }

  return value;
};

const renderDefault = (ast) => {
  const iter = (data, lvl = 1) => {
    const result = data.reduce((acc, e) => {
      const { type, name, value } = e;

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
